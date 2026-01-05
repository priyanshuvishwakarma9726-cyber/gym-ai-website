
-- Add is_active column to profiles
alter table profiles add column is_active boolean default true;

-- Update RLS for profiles to allow admins to update
create policy "Admins can update any profile." on profiles
  for update using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- Update RLS for progress_logs to allow admins to view all
create policy "Admins can view all progress." on progress_logs
  for select using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- Seed an admin user (You must convert a user to admin manually, but this is a helper comment)
-- update profiles set role = 'admin' where email = 'your_email@example.com';
