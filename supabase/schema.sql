-- Run this once in the Supabase SQL Editor.

create table if not exists public.domains (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  category text not null default 'General',
  asking_price numeric,
  highlights text[] not null default '{}',
  status text not null default 'visible' check (status in ('visible', 'hidden', 'sold')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists domains_status_idx on public.domains(status);
create index if not exists domains_sort_idx on public.domains(sort_order);

create or replace function public.touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists domains_touch_updated_at on public.domains;
create trigger domains_touch_updated_at
before update on public.domains
for each row execute function public.touch_updated_at();

alter table public.domains enable row level security;

drop policy if exists "public read visible or sold" on public.domains;
create policy "public read visible or sold" on public.domains
  for select using (status in ('visible', 'sold'));

drop policy if exists "authenticated read all" on public.domains;
create policy "authenticated read all" on public.domains
  for select to authenticated using (true);

drop policy if exists "authenticated write" on public.domains;
create policy "authenticated write" on public.domains
  for all to authenticated using (true) with check (true);
