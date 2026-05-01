-- Run this once in Supabase SQL Editor to add speed.ai and t.ai as sold.
-- Idempotent — safe to re-run.

insert into public.domains (slug, name, category, status, sort_order) values
  ('speed-ai', 'speed.ai', 'AI', 'sold', 0),
  ('t-ai', 't.ai', 'AI', 'sold', 0)
on conflict (slug) do update set
  status = excluded.status,
  sort_order = excluded.sort_order;
