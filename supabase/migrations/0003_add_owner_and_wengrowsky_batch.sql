-- Run once in Supabase SQL Editor. Idempotent — safe to re-run.

-- 1. Add owner column (nullable first so backfill can run on existing rows).
alter table public.domains
  add column if not exists owner text;

-- 2. Backfill all existing rows to Woldenberg.
update public.domains
set owner = 'Woldenberg'
where owner is null;

-- 3. Lock it down: every row must have an owner going forward.
alter table public.domains
  alter column owner set not null,
  alter column owner set default 'Woldenberg';

create index if not exists domains_owner_idx on public.domains(owner);

-- 4. Insert Wengrowsky's batch (deduped from the source list).
insert into public.domains (slug, name, category, owner, sort_order) values
  ('tmec-ai',          'tmec.ai',          'AI',      'Wengrowsky', 200),
  ('t-mec-ai',         't-mec.ai',         'AI',      'Wengrowsky', 201),
  ('manufactura-ai',   'manufactura.ai',   'AI',      'Wengrowsky', 202),
  ('litio-ai',         'litio.ai',         'AI',      'Wengrowsky', 203),
  ('cobre-ai',         'cobre.ai',         'AI',      'Wengrowsky', 204),
  ('monterrey-ai',     'monterrey.ai',     'AI',      'Wengrowsky', 205),
  ('radiologia-ai',    'radiologia.ai',    'AI',      'Wengrowsky', 206),
  ('baterias-ai',      'baterias.ai',      'AI',      'Wengrowsky', 207),
  ('energias-ai',      'energias.ai',      'AI',      'Wengrowsky', 208),
  ('inyectables-ai',   'inyectables.ai',   'AI',      'Wengrowsky', 209),
  ('electrico-ai',     'electrico.ai',     'AI',      'Wengrowsky', 210),
  ('mantenimiento-ai', 'mantenimiento.ai', 'AI',      'Wengrowsky', 211),
  ('ahorro-ai',        'ahorro.ai',        'AI',      'Wengrowsky', 212),
  ('enfermeria-ai',    'enfermeria.ai',    'AI',      'Wengrowsky', 213),
  ('iluminacion-ai',   'iluminacion.ai',   'AI',      'Wengrowsky', 214),
  ('vacaciones-ai',    'vacaciones.ai',    'AI',      'Wengrowsky', 215),
  ('produccion-ai',    'produccion.ai',    'AI',      'Wengrowsky', 216),
  ('integracion-ai',   'integracion.ai',   'AI',      'Wengrowsky', 217),
  ('electricista-ai',  'electricista.ai',  'AI',      'Wengrowsky', 218),
  ('enfermera-ai',     'enfermera.ai',     'AI',      'Wengrowsky', 219),
  ('estadio-ai',       'estadio.ai',       'AI',      'Wengrowsky', 220),
  ('instalacion-ai',   'instalacion.ai',   'AI',      'Wengrowsky', 221),
  ('plomero-ai',       'plomero.ai',       'AI',      'Wengrowsky', 222),
  ('peptidos-ai',      'peptidos.ai',      'AI',      'Wengrowsky', 223),
  ('lithium-bitcoin',  'lithium.bitcoin',  'Bitcoin', 'Wengrowsky', 224),
  ('tequila-bitcoin',  'tequila.bitcoin',  'Bitcoin', 'Wengrowsky', 225),
  ('fanfest-bitcoin',  'fanfest.bitcoin',  'Bitcoin', 'Wengrowsky', 226),
  ('hospital-bitcoin', 'hospital.bitcoin', 'Bitcoin', 'Wengrowsky', 227)
on conflict (slug) do update set
  owner = excluded.owner,
  category = excluded.category;
