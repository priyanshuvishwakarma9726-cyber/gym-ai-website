
-- Progress Logs Table
create table progress_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  weight numeric not null,
  chest numeric,
  waist numeric,
  hips numeric,
  date date default CURRENT_DATE,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table progress_logs enable row level security;

create policy "Users can view own progress." on progress_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert own progress." on progress_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own progress." on progress_logs
  for delete using (auth.uid() = user_id);
