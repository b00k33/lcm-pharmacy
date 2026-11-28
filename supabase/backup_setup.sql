-- LCM cloud backups: one-time setup (run once, by her, in her own Supabase project).
-- Supabase dashboard: SQL Editor > New query > paste this whole file > Run.
--
-- WHAT IT DOES
--   Before the first change of each day (Sydney time), the database keeps a copy of the clinic data as it was,
--   and holds the newest 7 copies. LCM lists them under Cloud history and can restore one.
--
-- WHAT IT TOUCHES
--   ADDITIVE ONLY. One NEW table (lcm_backups), one NEW function and one trigger on settings. Each login reads
--   only its own copies; no login can write or delete them from the app. If making a copy ever fails, the save
--   itself still goes through. Safe to run again.

create table if not exists public.lcm_backups as
  select owner, current_date as day, data, now() as saved_at from public.settings with no data;
create unique index if not exists lcm_backups_owner_day on public.lcm_backups (owner, day);
alter table public.lcm_backups enable row level security;
revoke all on public.lcm_backups from anon, authenticated;
grant select on public.lcm_backups to authenticated;
drop policy if exists lcm_backups_own_read on public.lcm_backups;
create policy lcm_backups_own_read on public.lcm_backups
  for select to authenticated using (owner::text = auth.uid()::text);

create or replace function public.lcm_backup_keep()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare d date := (now() at time zone 'Australia/Sydney')::date;
begin
  begin
    if old.data is not null and not exists (select 1 from public.lcm_backups b where b.owner = old.owner and b.day = d) then
      insert into public.lcm_backups (owner, day, data, saved_at) values (old.owner, d, old.data, now())
        on conflict (owner, day) do nothing;
      delete from public.lcm_backups b where b.owner = old.owner and b.day not in
        (select k.day from public.lcm_backups k where k.owner = old.owner order by k.day desc limit 7);
    end if;
  exception when others then
    raise warning 'lcm backup not kept: %', sqlerrm;
  end;
  return new;
end $$;

revoke all on function public.lcm_backup_keep() from public, anon, authenticated;
drop trigger if exists lcm_backup_keep on public.settings;
create trigger lcm_backup_keep before update on public.settings
  for each row execute function public.lcm_backup_keep();
