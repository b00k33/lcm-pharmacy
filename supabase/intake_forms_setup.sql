-- LCM Pharmacy: patient self-fill intake link -- one-time Supabase setup.
-- Run this once in the Supabase dashboard: Project -> SQL Editor -> New query
-- -> paste this whole file -> Run. Safe to run only once; running it again
-- will error on "already exists" (harmless -- nothing to fix, just skip it).
--
-- What this creates:
--   1. A new table, intake_forms, holding one row per link she generates.
--   2. Row Level Security so she can only ever see/manage HER OWN rows
--      (never another practitioner's, if this project is ever shared).
--   3. Two narrow functions that let an anonymous patient (no login) read
--      and fill in ONLY the one row their link points to -- they can never
--      see or touch the table directly, or see any other patient's data.

create table if not exists public.intake_forms (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users(id) on delete cascade,
  patient_name text not null,
  status text not null default 'pending' check (status in ('pending', 'submitted', 'applied', 'dismissed')),
  demographics jsonb,
  history jsonb,
  cycle jsonb,
  created_at timestamptz not null default now(),
  submitted_at timestamptz,
  applied_at timestamptz
);

create index if not exists intake_forms_owner_status_idx on public.intake_forms (owner, status);

alter table public.intake_forms enable row level security;

-- She (signed in to the pharmacy app) can create links, see her own queue,
-- and mark rows applied/dismissed once reviewed.
drop policy if exists "owner can select own intake forms" on public.intake_forms;
create policy "owner can select own intake forms"
  on public.intake_forms for select
  to authenticated
  using (owner = auth.uid());

drop policy if exists "owner can insert own intake forms" on public.intake_forms;
create policy "owner can insert own intake forms"
  on public.intake_forms for insert
  to authenticated
  with check (owner = auth.uid());

drop policy if exists "owner can update own intake forms" on public.intake_forms;
create policy "owner can update own intake forms"
  on public.intake_forms for update
  to authenticated
  using (owner = auth.uid())
  with check (owner = auth.uid());

-- Deliberately NO policy grants the anonymous "anon" role any access to the
-- table itself -- a patient's browser is never signed in, so with RLS on and
-- no anon policy, direct table access is a flat wall. The two functions
-- below are the ONLY door in, and each only ever touches the one row whose
-- id matches the token in the patient's link.

-- Lets the patient's browser confirm the link is real and greet her by name,
-- before she's typed anything -- returns nothing else about her record.
create or replace function public.get_intake_form(p_token uuid)
returns table (patient_name text, status text)
language sql
security definer
set search_path = public
as $$
  select patient_name, status from public.intake_forms where id = p_token;
$$;

grant execute on function public.get_intake_form(uuid) to anon, authenticated;

-- The only way an anonymous visitor can ever write anything. Only succeeds
-- once: the where clause requires status = 'pending', so a link can't be
-- resubmitted or replayed after the fact. Returns true on success, false if
-- the token was invalid or already used (so the page can show a clear
-- message either way).
create or replace function public.submit_intake_form(
  p_token uuid,
  p_demographics jsonb,
  p_history jsonb,
  p_cycle jsonb
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  n int;
begin
  update public.intake_forms
  set demographics = p_demographics,
      history = p_history,
      cycle = p_cycle,
      status = 'submitted',
      submitted_at = now()
  where id = p_token and status = 'pending';
  get diagnostics n = row_count;
  return n > 0;
end;
$$;

grant execute on function public.submit_intake_form(uuid, jsonb, jsonb, jsonb) to anon, authenticated;
