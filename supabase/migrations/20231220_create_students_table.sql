-- Create students table
create table if not exists public.students (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  class text not null,
  status text not null default 'active' check (status in ('active', 'inactive')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table public.students enable row level security;

create policy "Students are viewable by everyone"
  on public.students for select
  using (true);

create policy "Students are insertable by authenticated users only"
  on public.students for insert
  with check (auth.role() = 'authenticated');

create policy "Students are updatable by authenticated users only"
  on public.students for update
  using (auth.role() = 'authenticated');

-- Create indexes
create index if not exists students_name_idx on public.students (name);
create index if not exists students_email_idx on public.students (email);
create index if not exists students_status_idx on public.students (status);

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Create trigger to automatically update updated_at
create trigger handle_students_updated_at
  before update on public.students
  for each row
  execute function public.handle_updated_at();
