
-- Payments Table
create table payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  order_id text not null,
  payment_id text,
  amount numeric not null,
  status text default 'pending', -- pending, success, failed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table payments enable row level security;

create policy "Users can view own payments." on payments
  for select using (auth.uid() = user_id);

create policy "Service role and admins can manage payments." on payments
  for all using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );
