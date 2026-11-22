-- LCM calendar feeds: one-time setup (run once, by her, in her own Supabase project).
-- Run in the Supabase dashboard: SQL Editor > New query > paste this whole file > Run.
--
-- WHAT IT DOES
--   Every 15 minutes her own Supabase fetches her clinic calendar links (read only) and keeps the latest copy of
--   each in a table that only her signed-in LCM login can read. LCM reads that table and draws the bookings
--   on the Appointments calendar next to her own. Nothing is ever written back to a clinic app.
--
-- WHAT IT TOUCHES
--   ADDITIVE ONLY. Two NEW tables (lcm_cal_feed, lcm_cal_raw), four NEW functions and two cron jobs.
--   It does not change lcm_me, the shared settings table, or any other app's table or key. It only READS the
--   members list of the lcm_me row 'linh' (to know whose login may read the copy). Safe to run again.
--
-- THE CALENDAR LINKS ARE SECRETS (anyone holding one can read every booking, with patient names).
--   They live ONLY in the table lcm_cal_feed, which has row level security on and NO policy, so no login (not
--   even hers, not the public key) can read it: only this database's own scheduled jobs can. They are never
--   in LCM's code, a note or a message. Paste them in step 3 below, then do not save this file with them in it.
--
-- BEFORE YOU RUN: Database > Extensions: switch ON "pg_cron" and "pg_net" if they are not already on.

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- ---------- 1. where the links live (nobody can read this table from the app) ----------
create table if not exists public.lcm_cal_feed (
  source  text primary key check (source in ('cliniko', 'zanda', 'halaxy')),
  url     text not null,
  req_id  bigint,
  req_at  timestamptz
);
alter table public.lcm_cal_feed enable row level security;
revoke all on public.lcm_cal_feed from anon, authenticated;

-- ---------- 2. the latest copy of each calendar (only her signed-in login can read this) ----------
create table if not exists public.lcm_cal_raw (
  source     text primary key check (source in ('cliniko', 'zanda', 'halaxy')),
  ics        text,
  fetched_at timestamptz,          -- the last time a good copy arrived
  tried_at   timestamptz,          -- the last time a fetch finished, good or not
  ok         boolean not null default false,
  members    text[] not null default '{}'
);
alter table public.lcm_cal_raw enable row level security;
revoke all on public.lcm_cal_raw from anon, authenticated;
grant select on public.lcm_cal_raw to authenticated;
drop policy if exists lcm_cal_raw_members_read on public.lcm_cal_raw;
create policy lcm_cal_raw_members_read on public.lcm_cal_raw
  for select to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = any (members));

-- ---------- 3. save a link (she runs this three times in step 3 of her list) ----------
create or replace function public.lcm_cal_set_feed(p_source text, p_url text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare m text[];
begin
  if p_source not in ('cliniko', 'zanda', 'halaxy') then
    raise exception 'source must be cliniko, zanda or halaxy';
  end if;
  if p_url !~* '^https://' then
    raise exception 'the link must start with https://';
  end if;
  select coalesce(members, '{}') into m from public.lcm_me where id = 'linh';
  insert into public.lcm_cal_feed (source, url) values (p_source, p_url)
    on conflict (source) do update set url = excluded.url, req_id = null, req_at = null;
  insert into public.lcm_cal_raw (source, members) values (p_source, coalesce(m, '{}'))
    on conflict (source) do update set members = excluded.members;
end;
$$;
revoke all on function public.lcm_cal_set_feed(text, text) from public, anon, authenticated;

-- ---------- 4. the two scheduled steps: ask (minute 0, 15, 30, 45), then collect one minute later ----------
create or replace function public.lcm_cal_fire()
returns void
language plpgsql
security definer
set search_path = public, net, extensions
as $$
declare r record; rid bigint;
begin
  for r in select source, url from public.lcm_cal_feed loop
    begin
      select net.http_get(url := r.url, timeout_milliseconds := 15000) into rid;
      update public.lcm_cal_feed set req_id = rid, req_at = now() where source = r.source;
    exception when others then
      update public.lcm_cal_raw set tried_at = now(), ok = false where source = r.source;
    end;
  end loop;
end;
$$;
revoke all on function public.lcm_cal_fire() from public, anon, authenticated;

create or replace function public.lcm_cal_collect()
returns void
language plpgsql
security definer
set search_path = public, net, extensions
as $$
declare r record; resp record;
begin
  for r in select source, req_id from public.lcm_cal_feed where req_id is not null loop
    select status_code, content, timed_out, error_msg into resp from net._http_response where id = r.req_id;
    if not found then continue; end if;   -- not back yet: the next collect picks it up
    if resp.status_code = 200 and coalesce(resp.timed_out, false) = false and resp.content like '%BEGIN:VCALENDAR%' then
      update public.lcm_cal_raw set ics = resp.content, fetched_at = now(), tried_at = now(), ok = true where source = r.source;
    else
      update public.lcm_cal_raw set tried_at = now(), ok = false where source = r.source;   -- the old copy stays
    end if;
    update public.lcm_cal_feed set req_id = null where source = r.source;
  end loop;
end;
$$;
revoke all on function public.lcm_cal_collect() from public, anon, authenticated;

-- run again safely: remove the old jobs of the same name first
do $$ begin
  perform cron.unschedule(jobid) from cron.job where jobname in ('lcm-cal-fire', 'lcm-cal-collect');
end $$;
select cron.schedule('lcm-cal-fire',    '*/15 * * * *',      $$select public.lcm_cal_fire()$$);
select cron.schedule('lcm-cal-collect', '1-59/15 * * * *',   $$select public.lcm_cal_collect()$$);

-- ---------- STEP 3 OF HER LIST: paste each link between the quotes, one line each, then Run. ----------
-- (Leave a line out if she does not use that clinic. Do not keep this file with the links in it.)
-- select public.lcm_cal_set_feed('cliniko', 'PASTE THE CLINIKO LINK HERE');
-- select public.lcm_cal_set_feed('halaxy',  'PASTE THE HALAXY LINK HERE');
-- select public.lcm_cal_set_feed('zanda',   'PASTE THE GOOGLE SECRET ICAL LINK FOR ZANDA HERE');
--
-- To fetch straight away instead of waiting up to 15 minutes, then again a minute later:
--   select public.lcm_cal_fire();        -- wait one minute
--   select public.lcm_cal_collect();
