-- Run this once: Supabase dashboard -> SQL Editor -> New query -> paste -> Run.
-- "Me" (2026-10-25, her "i want things to be in one place"): her own events, routines,
-- birthdays and to-dos live in LCM, and BOTH clinic logins (CBD and Acupreg) read and
-- write the same row. One row, keyed 'linh'; only the two addresses in `members` can
-- see it or change it. A signed-in client may change `data` and `rev` only, never who
-- the members are, and can neither add nor delete a row.

create table if not exists public.lcm_me (
  id          text primary key,
  members     text[] not null,
  data        jsonb  not null default '{}'::jsonb,
  rev         bigint not null default 0,
  updated_at  timestamptz not null default now()
);

alter table public.lcm_me enable row level security;

drop policy if exists "lcm_me members read" on public.lcm_me;
create policy "lcm_me members read" on public.lcm_me
  for select to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = any (members));

drop policy if exists "lcm_me members write" on public.lcm_me;
create policy "lcm_me members write" on public.lcm_me
  for update to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = any (members))
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = any (members));

revoke all on public.lcm_me from anon, authenticated;
grant select on public.lcm_me to authenticated;
grant update (data, rev) on public.lcm_me to authenticated;

create or replace function public.lcm_me_touch() returns trigger
language plpgsql as $$ begin new.updated_at := now(); return new; end $$;
drop trigger if exists lcm_me_touch on public.lcm_me;
create trigger lcm_me_touch before update on public.lcm_me
  for each row execute function public.lcm_me_touch();

insert into public.lcm_me (id, members)
values ('linh', array['linhchinesemedicine28@gmail.com', 'linhdinh2026@gmail.com'])
on conflict (id) do nothing;
