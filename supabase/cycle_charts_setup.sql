-- LCM: patient cycle charting ("My Cycle") -- one-time Supabase setup.
-- Run this once: Supabase dashboard -> Project -> SQL Editor -> New query ->
-- paste this whole file -> Run. Safe to re-run (everything is if-not-exists
-- or create-or-replace).
--
-- Built on exactly the same shape as intake_forms (see intake_forms_setup.sql):
-- Linh signs in and owns her rows; the patient's browser is NEVER signed in
-- and never touches a table directly. Three narrow SECURITY DEFINER functions
-- are the only door in, and each one only ever reaches the rows belonging to
-- the single token in that patient's link.
--
-- Difference from intake: an intake link is used ONCE, a chart link is used
-- every morning for months. So chart_links has no "already used" wall -- the
-- protection is that the token is a random uuid, it only ever reaches one
-- patient's own days, and Linh can revoke it by setting status = 'revoked'.

-- ---------------------------------------------------------------------------
-- 1. One row per patient Linh invites to chart.
-- ---------------------------------------------------------------------------
create table if not exists public.chart_links (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users(id) on delete cascade,
  patient_name text not null,
  patient_key text,                     -- matches LCM's phPatientKey(name)
  goal text not null default 'ttc'
    check (goal in ('ttc', 'ivf', 'health', 'preg')),
  status text not null default 'active'
    check (status in ('active', 'paused', 'revoked')),
  reminder_time text,                   -- 'HH:MM' in her own timezone, null = off
  reminder_tz text,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz,
  last_entry_on date
);

create index if not exists chart_links_owner_idx
  on public.chart_links (owner, status, last_entry_on desc);

-- ---------------------------------------------------------------------------
-- 2. One row per patient per day. Everything she taps lives in `entry` as
--    jsonb so new questions never need a migration -- except the handful we
--    sort and triage on, which are real columns for speed at 50+ patients.
-- ---------------------------------------------------------------------------
create table if not exists public.chart_days (
  link_id uuid not null references public.chart_links(id) on delete cascade,
  day date not null,
  temp_c numeric(4,2),                  -- null = no temperature that day
  period_flow text,                     -- null / spot / light / medium / heavy
  entry jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (link_id, day)
);

create index if not exists chart_days_link_day_idx
  on public.chart_days (link_id, day desc);

alter table public.chart_links enable row level security;
alter table public.chart_days  enable row level security;

-- ---------------------------------------------------------------------------
-- 3. Linh's own access (signed in). She can create links, read her queue,
--    pause or revoke, and read every day her own patients have entered.
-- ---------------------------------------------------------------------------
drop policy if exists "owner reads own chart links" on public.chart_links;
create policy "owner reads own chart links"
  on public.chart_links for select to authenticated
  using (owner = auth.uid());

drop policy if exists "owner creates own chart links" on public.chart_links;
create policy "owner creates own chart links"
  on public.chart_links for insert to authenticated
  with check (owner = auth.uid());

drop policy if exists "owner updates own chart links" on public.chart_links;
create policy "owner updates own chart links"
  on public.chart_links for update to authenticated
  using (owner = auth.uid()) with check (owner = auth.uid());

drop policy if exists "owner deletes own chart links" on public.chart_links;
create policy "owner deletes own chart links"
  on public.chart_links for delete to authenticated
  using (owner = auth.uid());

-- Days are reachable to her only through the link she owns.
drop policy if exists "owner reads own patients days" on public.chart_days;
create policy "owner reads own patients days"
  on public.chart_days for select to authenticated
  using (exists (
    select 1 from public.chart_links l
    where l.id = chart_days.link_id and l.owner = auth.uid()
  ));

drop policy if exists "owner writes own patients days" on public.chart_days;
create policy "owner writes own patients days"
  on public.chart_days for all to authenticated
  using (exists (
    select 1 from public.chart_links l
    where l.id = chart_days.link_id and l.owner = auth.uid()
  ))
  with check (exists (
    select 1 from public.chart_links l
    where l.id = chart_days.link_id and l.owner = auth.uid()
  ));

-- No policy anywhere grants the anonymous "anon" role access to either table.
-- With RLS on and no anon policy, a patient's browser hitting the tables
-- directly gets a flat wall. The three functions below are the only door.

-- ---------------------------------------------------------------------------
-- 4. The patient's three calls. Each takes her token and can only ever
--    reach the one link row it names, and the days hanging off it.
-- ---------------------------------------------------------------------------

-- Opening the app: confirm the link is real, greet her, and hand back the
-- settings her app needs. Returns nothing about anyone else, and nothing
-- about her practitioner beyond the name she already knows.
create or replace function public.get_chart_link(p_token uuid)
returns table (patient_name text, goal text, status text,
               reminder_time text, reminder_tz text, settings jsonb)
language sql security definer set search_path = public
as $$
  select patient_name, goal, status, reminder_time, reminder_tz, settings
  from public.chart_links
  where id = p_token and status <> 'revoked';
$$;

grant execute on function public.get_chart_link(uuid) to anon, authenticated;

-- Saving a day. Upsert, so she can correct this morning's temperature all day
-- without creating duplicates. A revoked or paused link silently saves
-- nothing and returns false, so the app can tell her to contact the clinic.
create or replace function public.save_chart_day(
  p_token uuid, p_day date, p_temp numeric, p_flow text, p_entry jsonb
) returns boolean
language plpgsql security definer set search_path = public
as $$
declare
  ok boolean;
begin
  select true into ok from public.chart_links
   where id = p_token and status = 'active';
  if ok is not true then return false; end if;

  -- a patient can only ever write today or the recent past, never the future
  -- and never further back than a year (typo protection, not security)
  if p_day > (current_date + 1) or p_day < (current_date - 400) then
    return false;
  end if;

  insert into public.chart_days (link_id, day, temp_c, period_flow, entry, updated_at)
  values (p_token, p_day, p_temp, p_flow, coalesce(p_entry, '{}'::jsonb), now())
  on conflict (link_id, day) do update
    set temp_c = excluded.temp_c,
        period_flow = excluded.period_flow,
        entry = excluded.entry,
        updated_at = now();

  update public.chart_links
     set last_seen_at = now(),
         last_entry_on = greatest(coalesce(last_entry_on, p_day), p_day)
   where id = p_token;

  return true;
end;
$$;

grant execute on function public.save_chart_day(uuid, date, numeric, text, jsonb) to anon, authenticated;

-- Reading her own chart back. Bounded window so a long-running patient never
-- pulls years of rows onto a phone.
create or replace function public.get_chart_days(
  p_token uuid, p_from date, p_to date
) returns table (day date, temp_c numeric, period_flow text, entry jsonb)
language sql security definer set search_path = public
as $$
  select d.day, d.temp_c, d.period_flow, d.entry
  from public.chart_days d
  join public.chart_links l on l.id = d.link_id
  where d.link_id = p_token
    and l.status <> 'revoked'
    and d.day between p_from and p_to
  order by d.day;
$$;

grant execute on function public.get_chart_days(uuid, date, date) to anon, authenticated;

-- Her reminder time is hers to change from her own phone.
create or replace function public.set_chart_reminder(
  p_token uuid, p_time text, p_tz text
) returns boolean
language plpgsql security definer set search_path = public
as $$
declare n int;
begin
  if p_time is not null and p_time !~ '^[0-2][0-9]:[0-5][0-9]$' then
    return false;
  end if;
  update public.chart_links
     set reminder_time = p_time, reminder_tz = p_tz
   where id = p_token and status = 'active';
  get diagnostics n = row_count;
  return n > 0;
end;
$$;

grant execute on function public.set_chart_reminder(uuid, text, text) to anon, authenticated;
