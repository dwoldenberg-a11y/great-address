-- Run once in Supabase SQL Editor. Idempotent — safe to re-run.
-- Adds Wengrowsky's crypto/Web3 batch (.crypto / .x / .coin / .bitcoin /
-- .nft / .wallet TLDs).

insert into public.domains (slug, name, category, owner, sort_order) values
  ('tomate-crypto',          'tomate.crypto',          'Crypto',  'Wengrowsky', 228),
  ('tomates-crypto',         'tomates.crypto',         'Crypto',  'Wengrowsky', 229),
  ('estadio-x',              'estadio.x',              'X',       'Wengrowsky', 230),
  ('estadio-coin',           'estadio.coin',           'Coin',    'Wengrowsky', 231),
  ('estadio-crypto',         'estadio.crypto',         'Crypto',  'Wengrowsky', 232),
  ('estadio-bitcoin',        'estadio.bitcoin',        'Bitcoin', 'Wengrowsky', 233),
  ('cervezas-wallet',        'cervezas.wallet',        'Wallet',  'Wengrowsky', 234),
  ('estadioazteca-coin',     'estadioazteca.coin',     'Coin',    'Wengrowsky', 235),
  ('estadioazteca-x',        'estadioazteca.x',        'X',       'Wengrowsky', 236),
  ('estadioazteca-nft',      'estadioazteca.nft',      'NFT',     'Wengrowsky', 237),
  ('diseno-crypto',          'diseno.crypto',          'Crypto',  'Wengrowsky', 238),
  ('supermercado-coin',      'supermercado.coin',      'Coin',    'Wengrowsky', 239),
  ('tortillas-bitcoin',      'tortillas.bitcoin',      'Bitcoin', 'Wengrowsky', 240),
  ('tortillas-coin',         'tortillas.coin',         'Coin',    'Wengrowsky', 241),
  ('portovita-crypto',       'portovita.crypto',       'Crypto',  'Wengrowsky', 242),
  ('portovita-bitcoin',      'portovita.bitcoin',      'Bitcoin', 'Wengrowsky', 243),
  ('portovita-x',            'portovita.x',            'X',       'Wengrowsky', 244),
  ('portovita-nft',          'portovita.nft',          'NFT',     'Wengrowsky', 245),
  ('heb-x',                  'heb.x',                  'X',       'Wengrowsky', 246),
  ('electrico-bitcoin',      'electrico.bitcoin',      'Bitcoin', 'Wengrowsky', 247),
  ('electrico-x',            'electrico.x',            'X',       'Wengrowsky', 248),
  ('electrico-coin',         'electrico.coin',         'Coin',    'Wengrowsky', 249),
  ('electrico-wallet',       'electrico.wallet',       'Wallet',  'Wengrowsky', 250),
  ('electrico-nft',          'electrico.nft',          'NFT',     'Wengrowsky', 251),
  ('iluminacion-x',          'iluminacion.x',          'X',       'Wengrowsky', 252),
  ('iluminacion-nft',        'iluminacion.nft',        'NFT',     'Wengrowsky', 253),
  ('iluminacion-coin',       'iluminacion.coin',       'Coin',    'Wengrowsky', 254),
  ('iluminacion-crypto',     'iluminacion.crypto',     'Crypto',  'Wengrowsky', 255)
on conflict (slug) do update set
  owner    = excluded.owner,
  category = excluded.category;
