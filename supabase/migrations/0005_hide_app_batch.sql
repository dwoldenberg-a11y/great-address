-- Run once in Supabase SQL Editor. Idempotent — safe to re-run.
-- Hide a batch of .app and .ai domains from the public site.

update public.domains
set status = 'hidden'
where slug in (
  'tranzport-ai',
  'corpacsteel-app',
  'csp-app',
  'visualogyx-app',
  'acumen-app',
  'tubacero-ai'
);
