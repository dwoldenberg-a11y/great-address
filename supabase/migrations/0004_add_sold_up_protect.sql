-- Run once in Supabase SQL Editor. Idempotent — safe to re-run.
-- Marks up.ai, protect.ai, and ultrasound.ai as sold (creates rows if missing).

insert into public.domains (slug, name, category, status, sort_order) values
  ('up-ai',         'up.ai',         'AI', 'sold', 0),
  ('protect-ai',    'protect.ai',    'AI', 'sold', 0),
  ('ultrasound-ai', 'ultrasound.ai', 'AI', 'sold', 0)
on conflict (slug) do update set
  status = excluded.status,
  sort_order = excluded.sort_order;
