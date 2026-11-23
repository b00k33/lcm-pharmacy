-- LCM to-do inbox: one-time setup (run once, by her, in her own Supabase project).
-- Run in the Supabase dashboard: SQL Editor > New query > paste this whole file > Run.
--
-- WHAT IT DOES
--   Her helpers (the PAs and the morning note) can leave a to-do for her through ONE function that checks a secret
--   write-only key. LCM reads the inbox and puts each new item into her Week as a normal to-do. Nothing is read
--   back out through the key: it can only ADD a to-do.
--
-- WHAT IT TOUCHES
--   ADDITIVE ONLY. Two NEW tables (lcm_todo_inbox, lcm_todo_inbox_key), three NEW functions. It does not change
--   lcm_me, the shared settings table, or any other app's table or key. It only READS the members list of the
--   lcm_me row 'linh' (to know whose login may read the inbox). Safe to run again (the key is kept).
--
-- THE KEY IS A SECRET. It is made by step 2 below, shown ONCE, and only its fingerprint is stored (nobody can read
--   it back). Copy it straight to the helper that needs it (Executive PA keeps it in its own task settings). It is
--   never in LCM's code, a note or a message. To replace it (if it ever leaks) run step 2 again: the old key stops.
--
-- LIMITS: at most 40 items a day, a title at most 200 characters, a day must be a real date, an area must be one of
--   work, money, code, fit, home. The same item_key sent twice adds one to-do. A leaked key can add junk to-dos,
--   never read or change anything else.

create extension if not exists pgcrypto with schema extensions;

-- ---------- 1. the inbox (only her signed-in login can read it) ----------
create table if not exists public.lcm_todo_inbox (
  id         uuid primary key default gen_random_uuid(),
  source     text not null,
  item_key   text not null,
  title      text not null check (char_length(title) between 1 and 200),
  day        text check (day ~ '^\d{4}-\d\d-\d\d$'),
  area       text check (area in ('work', 'money', 'code', 'fit', 'home')),
  created_at timestamptz not null default now(),
  members    text[] not null default '{}',
  unique (source, item_key)
);
alter table public.lcm_todo_inbox enable row level security;
revoke all on public.lcm_todo_inbox from anon, authenticated;
grant select on public.lcm_todo_inbox to authenticated;
drop policy if exists lcm_todo_inbox_members_read on public.lcm_todo_inbox;
create policy lcm_todo_inbox_members_read on public.lcm_todo_inbox
  for select to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = any (members));

-- ---------- 2. the key's fingerprint (nobody can read this table from the app) ----------
create table if not exists public.lcm_todo_inbox_key (
  id         int primary key default 1 check (id = 1),
  key_hash   text not null,
  made_at    timestamptz not null default now()
);
alter table public.lcm_todo_inbox_key enable row level security;
revoke all on public.lcm_todo_inbox_key from anon, authenticated;

-- run this by hand to make (or replace) the key: it returns the key ONCE
create or replace function public.lcm_todo_new_key()
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare k text := encode(gen_random_bytes(24), 'hex');
begin
  insert into public.lcm_todo_inbox_key (id, key_hash) values (1, encode(digest(k, 'sha256'), 'hex'))
    on conflict (id) do update set key_hash = excluded.key_hash, made_at = now();
  return k;
end;
$$;
revoke all on function public.lcm_todo_new_key() from public, anon, authenticated;

-- ---------- 3. how a helper adds a to-do (the only door; it checks the key) ----------
create or replace function public.lcm_todo_add(
  p_key text, p_title text, p_day text default null, p_area text default null,
  p_source text default 'helper', p_item_key text default null)
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare h text; m text[]; t text := btrim(coalesce(p_title, '')); ik text;
begin
  select key_hash into h from public.lcm_todo_inbox_key where id = 1;
  if h is null or p_key is null or encode(digest(p_key, 'sha256'), 'hex') <> h then
    return 'no';
  end if;
  if char_length(t) < 1 or char_length(t) > 200 then return 'bad title'; end if;
  if p_day is not null and p_day !~ '^\d{4}-\d\d-\d\d$' then return 'bad day'; end if;
  if p_day is not null then
    begin perform p_day::date; exception when others then return 'bad day'; end;
  end if;
  if p_area is not null and p_area not in ('work', 'money', 'code', 'fit', 'home') then return 'bad area'; end if;
  if (select count(*) from public.lcm_todo_inbox where created_at > now() - interval '1 day') >= 40 then return 'limit'; end if;
  ik := coalesce(nullif(btrim(p_item_key), ''), md5(t || '|' || coalesce(p_day, '')));
  select coalesce(members, '{}') into m from public.lcm_me where id = 'linh';
  delete from public.lcm_todo_inbox where created_at < now() - interval '60 days';
  insert into public.lcm_todo_inbox (source, item_key, title, day, area, members)
    values (left(coalesce(nullif(btrim(p_source), ''), 'helper'), 40), left(ik, 120), t, p_day, p_area, coalesce(m, '{}'))
    on conflict (source, item_key) do nothing;
  return case when found then 'ok' else 'already there' end;
end;
$$;
revoke all on function public.lcm_todo_add(text, text, text, text, text, text) from public;
grant execute on function public.lcm_todo_add(text, text, text, text, text, text) to anon, authenticated;

-- ---------- STEP 2 OF HER LIST: make the key (run this one line, copy the key it shows ONCE) ----------
-- select public.lcm_todo_new_key();
--
-- To test it (replace YOURKEY, then look in Week after a couple of minutes):
--   select public.lcm_todo_add('YOURKEY', 'Test to-do from the inbox', null, null, 'test', 'test-1');
