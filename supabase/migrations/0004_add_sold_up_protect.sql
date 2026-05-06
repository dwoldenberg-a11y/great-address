-- Run once in Supabase SQL Editor. Idempotent — safe to re-run.
-- Marks Up.ai and Protect.ai as sold (creates the rows if they don't exist).

insert into public.domains (slug, name, category, status, sort_order) values
  ('up-ai',      'up.ai',      'AI', 'sold', 0),
  ('protect-ai', 'protect.ai', 'AI', 'sold', 0)
on conflict (slug) do update set
  status = excluded.status,
  sort_order = excluded.sort_order;
