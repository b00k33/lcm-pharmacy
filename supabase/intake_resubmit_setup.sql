-- LCM Pharmacy: the patient can open her medical history link again and send it again -- one-time Supabase setup.
-- Her pick 2026-10-26 ("Same link reopens"). Run this once in the Supabase dashboard: Project -> SQL Editor -> New query
-- -> paste this whole file -> Run. Safe to run again (every step is repeatable). Run intake_prefill_setup.sql first
-- if it has never been run (this file needs its prefill column).
--
-- What this changes (nothing is deleted, no existing row is touched):
--   1. get_intake_form also hands the patient's own answers back to her page once she has sent them, so the same
--      link opens her form again with her answers on it. Only for 90 days after she sent it; after that (or once
--      the form is dismissed) the page shows "Already submitted" as before.
--   2. submit_intake_form also accepts a form that was already sent or applied. A resend goes back to Intake
--      review as "Updated", showing only what changed. The question list her app sent with the link is kept, so
--      a resent form asks the same questions; the rest of the prefill is still cleared on send.
-- Until this is run, links work exactly as before: a sent link shows "Already submitted".

drop function if exists public.get_intake_form(uuid);

create function public.get_intake_form(p_token uuid)
returns table (patient_name text, status text, prefill jsonb, demographics jsonb, history jsonb, cycle jsonb, submitted_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select f.patient_name,
         f.status,
         case when f.status = 'pending' then f.prefill
              when f.status in ('submitted', 'applied') and f.prefill ? 'qs' then jsonb_build_object('qs', f.prefill -> 'qs')
              else null end,
         case when f.status in ('submitted', 'applied') and f.submitted_at > now() - interval '90 days' then f.demographics else null end,
         case when f.status in ('submitted', 'applied') and f.submitted_at > now() - interval '90 days' then f.history else null end,
         case when f.status in ('submitted', 'applied') and f.submitted_at > now() - interval '90 days' then f.cycle else null end,
         f.submitted_at
  from public.intake_forms f
  where f.id = p_token;
$$;

grant execute on function public.get_intake_form(uuid) to anon, authenticated;

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
      prefill = case when prefill ? 'qs' then jsonb_build_object('qs', prefill -> 'qs') else null end,
      status = 'submitted',
      submitted_at = now()
  where id = p_token
    and (status = 'pending'
         or (status in ('submitted', 'applied') and submitted_at > now() - interval '90 days'));
  get diagnostics n = row_count;
  return n > 0;
end;
$$;

grant execute on function public.submit_intake_form(uuid, jsonb, jsonb, jsonb) to anon, authenticated;
