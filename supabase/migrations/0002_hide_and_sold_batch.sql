-- Run once in Supabase SQL Editor. Idempotent — safe to re-run.

-- Hide a batch of domains from the public site.
update public.domains
set status = 'hidden'
where slug in (
  'csp-ai',
  'corpac-ai',
  'vlx-ai',
  'tranzport-app',
  'nucor-app',
  'tubacero-app',
  'corpac-app',
  'visualogyx-ai',
  'kypit-ai',
  'vlgxkypit-ai',
  'vlgxcountit-ai',
  'vlgxproveit-ai',
  'vlgx-ai'
);

-- Add t.ai and speed.ai as sold (or update if they already exist).
insert into public.domains (slug, name, category, status, sort_order) values
  ('t-ai', 't.ai', 'AI', 'sold', 0),
  ('speed-ai', 'speed.ai', 'AI', 'sold', 0)
on conflict (slug) do update set
  status = excluded.status,
  sort_order = excluded.sort_order;
