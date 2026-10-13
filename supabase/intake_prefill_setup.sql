-- LCM Pharmacy: pre-fill the patient's intake form from her file -- one-time Supabase setup.
-- Run this once in the Supabase dashboard: Project -> SQL Editor -> New query
-- -> paste this whole file -> Run. Safe to run again (every step is repeatable).
--
-- What this changes (nothing is deleted, no existing row is touched):
--   1. intake_forms gets one new column, prefill (jsonb): the details already in
--      her file (sex, date of birth, mobile, email, address) saved with the link
--      when she generates it.
--   2. get_intake_form now also hands that prefill to the patient's page, but
--      only while the link is still pending -- once it is submitted, applied or
--      dismissed it returns nothing.
--   3. submit_intake_form clears the prefill the moment the patient submits, so
--      a copy of her details is not left sitting in the row (her own answers
--      are saved in the demographics column as before).
-- Until this is run, links still work exactly as before -- the form is just not
-- pre-filled (the pharmacy app says so when it generates a link).

alter table public.intake_forms add column if not exists prefill jsonb;

-- the return shape changes (a third column), so the old function is replaced,
-- not altered in place
drop function if exists public.get_intake_form(uuid);

create function public.get_intake_form(p_token uuid)
returns table (patient_name text, status text, prefill jsonb)
language sql
security definer
set search_path = public
as $$
  select patient_name,
         status,
         case when status = 'pending' then prefill else null end
  from public.intake_forms
  where id = p_token;
$$;

grant execute on function public.get_intake_form(uuid) to anon, authenticated;

-- same signature as before; the only difference is prefill = null
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
      prefill = null,
      status = 'submitted',
      submitted_at = now()
  where id = p_token and status = 'pending';
  get diagnostics n = row_count;
  return n > 0;
end;
$$;

grant execute on function public.submit_intake_form(uuid, jsonb, jsonb, jsonb) to anon, authenticated;
