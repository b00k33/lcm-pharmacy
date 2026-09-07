-- LCM Pharmacy: phone -> desktop photo relay -- one-time Supabase setup.
-- Run this once in the Supabase dashboard: Project -> SQL Editor -> New query
-- -> paste this whole file -> Run. Safe to run again (every step is
-- "if not exists" / "drop if exists").
--
-- Why this exists (found 2026-09-07): the app has relayed patient photos
-- through a private storage bucket called ren-photo-inbox since 2026-09-01,
-- but the bucket itself was never created in this project, so every upload
-- answered "Bucket not found" and the photos stayed on the phone.
--
-- What this creates:
--   1. The private bucket ren-photo-inbox (JPEG only, 10 MB per file).
--   2. Row Level Security on its objects so each signed-in login can only
--      see, add and remove files inside its OWN folder (<user id>/...).
--      The app writes every file under that folder, so a second clinic
--      login can never see the first clinic's photos.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('ren-photo-inbox', 'ren-photo-inbox', false, 10485760, array['image/jpeg'])
on conflict (id) do nothing;

drop policy if exists "relay: read own folder" on storage.objects;
create policy "relay: read own folder"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'ren-photo-inbox' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "relay: add to own folder" on storage.objects;
create policy "relay: add to own folder"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'ren-photo-inbox' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "relay: remove from own folder" on storage.objects;
create policy "relay: remove from own folder"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'ren-photo-inbox' and (storage.foldername(name))[1] = auth.uid()::text);

-- Check (optional): both rows should come back.
-- select id, public, allowed_mime_types from storage.buckets where id = 'ren-photo-inbox';
-- select policyname from pg_policies where tablename = 'objects' and policyname like 'relay:%';
