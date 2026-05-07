-- Run once in Supabase SQL Editor. Idempotent — safe to re-run.
-- Sets asking_price (USD) on every visible listing. Tiered by:
--   * TLD strength (.ai > .app >> Web3 TLDs)
--   * Word quality (dictionary words / sharp acronyms > coined / typos)
--   * Category demand (finance, healthcare, AI infra, commerce)
-- Prices are list prices — buyers expect to negotiate ~20–40% off.
--
-- Sold rows are intentionally skipped (already gone). Hidden rows are
-- included so they re-surface with a price if unhidden later.

-- ─── Tier S: 2-letter .ai + headline commerce/finance verbs ($400k–$750k)
update public.domains set asking_price = 750000 where slug = 'buy-ai';
update public.domains set asking_price = 500000 where slug = 'pe-ai';
update public.domains set asking_price = 500000 where slug = 'fx-ai';
update public.domains set asking_price = 500000 where slug = 'privateequity-ai';
update public.domains set asking_price = 500000 where slug = 'warren-ai';
update public.domains set asking_price = 400000 where slug = 'steel-ai';
update public.domains set asking_price = 400000 where slug = 'transport-ai';
update public.domains set asking_price = 400000 where slug = 'training-ai';

-- ─── Tier A: premium dictionary .ai + 3-letter financial acronyms ($200k–$350k)
update public.domains set asking_price = 350000 where slug = 'forex-ai';
update public.domains set asking_price = 350000 where slug = 'stockmarket-ai';
update public.domains set asking_price = 350000 where slug = 'radiology-ai';
update public.domains set asking_price = 300000 where slug = 'university-ai';
update public.domains set asking_price = 300000 where slug = 'count-ai';
update public.domains set asking_price = 300000 where slug = 'truck-ai';
update public.domains set asking_price = 300000 where slug = 'kyc-ai';
update public.domains set asking_price = 300000 where slug = 'etf-ai';
update public.domains set asking_price = 275000 where slug = 'mentor-ai';
update public.domains set asking_price = 275000 where slug = 'receptionist-ai';
update public.domains set asking_price = 275000 where slug = 'inventory-ai';
update public.domains set asking_price = 250000 where slug = 'equities-ai';
update public.domains set asking_price = 250000 where slug = 'drone-ai';
update public.domains set asking_price = 250000 where slug = 'hq-ai';
update public.domains set asking_price = 250000 where slug = 'diet-ai';
update public.domains set asking_price = 225000 where slug = 'kpi-ai';
update public.domains set asking_price = 225000 where slug = 'notes-ai';
update public.domains set asking_price = 225000 where slug = 'documents-ai';
update public.domains set asking_price = 225000 where slug = 'currency-ai';
update public.domains set asking_price = 220000 where slug = 'stockbroker-ai';
update public.domains set asking_price = 220000 where slug = 'secretary-ai';
update public.domains set asking_price = 220000 where slug = 'inspect-ai';
update public.domains set asking_price = 200000 where slug = 'familyoffice-ai';
update public.domains set asking_price = 200000 where slug = 'brokers-ai';

-- ─── Tier B: solid dictionary nouns/verbs + niche acronyms ($100k–$175k)
update public.domains set asking_price = 175000 where slug = 'document-ai';
update public.domains set asking_price = 175000 where slug = 'metals-ai';
update public.domains set asking_price = 175000 where slug = 'inspector-ai';
update public.domains set asking_price = 165000 where slug = 'gdp-ai';
update public.domains set asking_price = 165000 where slug = 'marriage-ai';
update public.domains set asking_price = 150000 where slug = 'worker-ai';
update public.domains set asking_price = 125000 where slug = 'reconcile-ai';
update public.domains set asking_price = 110000 where slug = 'transporter-ai';
update public.domains set asking_price = 100000 where slug = 'mybroker-ai';
update public.domains set asking_price = 100000 where slug = 'mybrokers-ai';
update public.domains set asking_price = 100000 where slug = 'shipper-ai';

-- ─── Tier C: brandable singletons + decent acronyms ($50k–$95k)
update public.domains set asking_price = 95000  where slug = 'organizer-ai';
update public.domains set asking_price = 90000  where slug = 'pillbox-ai';
update public.domains set asking_price = 90000  where slug = 'available-ai';
update public.domains set asking_price = 90000  where slug = 'erica-ai';
update public.domains set asking_price = 85000  where slug = 'set-ai';
update public.domains set asking_price = 85000  where slug = 'tubes-ai';
update public.domains set asking_price = 85000  where slug = 'xl-ai';
update public.domains set asking_price = 85000  where slug = 'vq-ai';
update public.domains set asking_price = 85000  where slug = 'pmi-ai';
update public.domains set asking_price = 85000  where slug = 'statement-ai';
update public.domains set asking_price = 85000  where slug = 'statements-ai';
update public.domains set asking_price = 85000  where slug = 'hauler-ai';
update public.domains set asking_price = 85000  where slug = 'loadboard-ai';
update public.domains set asking_price = 80000  where slug = 'certs-ai';
update public.domains set asking_price = 75000  where slug = 'resident-ai';
update public.domains set asking_price = 75000  where slug = 'receiver-ai';
update public.domains set asking_price = 70000  where slug = 'sku-ai';
update public.domains set asking_price = 65000  where slug = 'vl-ai';
update public.domains set asking_price = 65000  where slug = 'deduct-ai';
update public.domains set asking_price = 60000  where slug = 'loadboards-ai';
update public.domains set asking_price = 55000  where slug = 'snapship-ai';
update public.domains set asking_price = 55000  where slug = 'nfp-ai';
update public.domains set asking_price = 55000  where slug = 'tmec-ai';
update public.domains set asking_price = 55000  where slug = 'monterrey-ai';
update public.domains set asking_price = 55000  where slug = 'radiologia-ai';
update public.domains set asking_price = 55000  where slug = 'energias-ai';
update public.domains set asking_price = 55000  where slug = 'electrico-ai';
update public.domains set asking_price = 50000  where slug = 'xt-ai';

-- ─── Tier D: 3-letter & sub-premium acronyms, descriptive composites ($25k–$45k)
update public.domains set asking_price = 45000  where slug = 'mtr-ai';
update public.domains set asking_price = 45000  where slug = 'tq-ai';
update public.domains set asking_price = 45000  where slug = '3pl-ai';
update public.domains set asking_price = 45000  where slug = 'crosscheck-ai';
update public.domains set asking_price = 45000  where slug = 'octg-ai';
update public.domains set asking_price = 45000  where slug = 'freemium-ai';
update public.domains set asking_price = 45000  where slug = 'jorge-ai';
update public.domains set asking_price = 45000  where slug = 'estadio-ai';
update public.domains set asking_price = 45000  where slug = 'manufactura-ai';
update public.domains set asking_price = 45000  where slug = 'litio-ai';
update public.domains set asking_price = 45000  where slug = 'cobre-ai';
update public.domains set asking_price = 45000  where slug = 'baterias-ai';
update public.domains set asking_price = 45000  where slug = 'ahorro-ai';
update public.domains set asking_price = 45000  where slug = 'vacaciones-ai';
update public.domains set asking_price = 40000  where slug = 'verifyit-ai';
update public.domains set asking_price = 40000  where slug = 'trk-ai';
update public.domains set asking_price = 40000  where slug = 'logyx-ai';
update public.domains set asking_price = 40000  where slug = 'tport-ai';
update public.domains set asking_price = 35000  where slug = 'aeiou-ai';
update public.domains set asking_price = 35000  where slug = 'consignee-ai';
update public.domains set asking_price = 35000  where slug = 'tpi-ai';
update public.domains set asking_price = 35000  where slug = 'reconcileit-ai';
update public.domains set asking_price = 35000  where slug = 'analyzeit-ai';
update public.domains set asking_price = 35000  where slug = 'auditit-ai';
update public.domains set asking_price = 35000  where slug = 'immunitypass-ai';
update public.domains set asking_price = 35000  where slug = 'linepipe-ai';
update public.domains set asking_price = 35000  where slug = 'inyectables-ai';
update public.domains set asking_price = 35000  where slug = 'mantenimiento-ai';
update public.domains set asking_price = 35000  where slug = 'enfermeria-ai';
update public.domains set asking_price = 35000  where slug = 'iluminacion-ai';
update public.domains set asking_price = 35000  where slug = 'produccion-ai';
update public.domains set asking_price = 35000  where slug = 'integracion-ai';
update public.domains set asking_price = 30000  where slug = 'snapcount-ai';
update public.domains set asking_price = 30000  where slug = 'inspectit-ai';
update public.domains set asking_price = 30000  where slug = 'countit-ai';
update public.domains set asking_price = 30000  where slug = 'fieldaudit-ai';
update public.domains set asking_price = 30000  where slug = 'visualaudit-ai';
update public.domains set asking_price = 30000  where slug = 'kycit-ai';
update public.domains set asking_price = 30000  where slug = 'vcount-ai';
update public.domains set asking_price = 30000  where slug = 'usmca-ai';
update public.domains set asking_price = 30000  where slug = '2do-ai';
update public.domains set asking_price = 30000  where slug = 'bizapp-ai';
update public.domains set asking_price = 30000  where slug = '4pl-ai';
update public.domains set asking_price = 30000  where slug = 'krgo-ai';
update public.domains set asking_price = 30000  where slug = 't-mec-ai';
update public.domains set asking_price = 30000  where slug = 'electricista-ai';
update public.domains set asking_price = 30000  where slug = 'enfermera-ai';
update public.domains set asking_price = 30000  where slug = 'instalacion-ai';
update public.domains set asking_price = 30000  where slug = 'peptidos-ai';
update public.domains set asking_price = 25000  where slug = 'icount-ai';
update public.domains set asking_price = 25000  where slug = 'analizeit-ai';
update public.domains set asking_price = 25000  where slug = 'brokenclock-ai';
update public.domains set asking_price = 25000  where slug = 'vqueue-ai';
update public.domains set asking_price = 25000  where slug = 'kyh-ai';
update public.domains set asking_price = 25000  where slug = 'hpn-ai';
update public.domains set asking_price = 25000  where slug = 'immucert-ai';
update public.domains set asking_price = 25000  where slug = '5pl-ai';
update public.domains set asking_price = 25000  where slug = 'plomero-ai';
update public.domains set asking_price = 25000  where slug = 'socialdensity-ai';

-- ─── Tier E: niche / coined / typo variants ($5k–$20k)
update public.domains set asking_price = 20000  where slug = 'phosterity-ai';
update public.domains set asking_price = 20000  where slug = 'freesbie-ai';
update public.domains set asking_price = 15000  where slug = 'socialdensityscore-ai';
update public.domains set asking_price = 8000   where slug = 'brok3nclock-ai';

-- ─── .app domains: priced ~30–40% of equivalent .ai
update public.domains set asking_price = 95000  where slug = 'documents-app';
update public.domains set asking_price = 90000  where slug = 'equities-app';
update public.domains set asking_price = 85000  where slug = 'university-app';
update public.domains set asking_price = 65000  where slug = 'steel-app';
update public.domains set asking_price = 55000  where slug = 'transport-app';
update public.domains set asking_price = 35000  where slug = 'tubes-app';
update public.domains set asking_price = 32000  where slug = 'inspections-app';

-- ─── Web3 / alt-TLDs: small market, speculative; brand-match names higher.
--     heb.x stands out — HEB the Texas grocer is a likely matched buyer.
update public.domains set asking_price = 5000   where slug = 'heb-x';
update public.domains set asking_price = 3500   where slug = 'estadioazteca-x';
update public.domains set asking_price = 3500   where slug = 'estadioazteca-coin';
update public.domains set asking_price = 3500   where slug = 'estadioazteca-nft';
update public.domains set asking_price = 3000   where slug = 'hospital-bitcoin';
update public.domains set asking_price = 2500   where slug = 'lithium-bitcoin';
update public.domains set asking_price = 2500   where slug = 'tequila-bitcoin';
update public.domains set asking_price = 2500   where slug = 'estadio-bitcoin';
update public.domains set asking_price = 2500   where slug = 'estadio-x';
update public.domains set asking_price = 2500   where slug = 'estadio-coin';
update public.domains set asking_price = 2500   where slug = 'estadio-crypto';
update public.domains set asking_price = 2000   where slug = 'fanfest-bitcoin';
update public.domains set asking_price = 2000   where slug = 'tortillas-bitcoin';
update public.domains set asking_price = 2000   where slug = 'cervezas-wallet';
update public.domains set asking_price = 1800   where slug = 'portovita-crypto';
update public.domains set asking_price = 1800   where slug = 'portovita-bitcoin';
update public.domains set asking_price = 1800   where slug = 'portovita-x';
update public.domains set asking_price = 1800   where slug = 'portovita-nft';
update public.domains set asking_price = 1500   where slug = 'tortillas-coin';
update public.domains set asking_price = 1500   where slug = 'supermercado-coin';
update public.domains set asking_price = 1500   where slug = 'diseno-crypto';
update public.domains set asking_price = 1500   where slug = 'electrico-bitcoin';
update public.domains set asking_price = 1500   where slug = 'electrico-x';
update public.domains set asking_price = 1500   where slug = 'electrico-wallet';
update public.domains set asking_price = 1200   where slug = 'electrico-coin';
update public.domains set asking_price = 1200   where slug = 'electrico-nft';
update public.domains set asking_price = 1200   where slug = 'tomate-crypto';
update public.domains set asking_price = 1200   where slug = 'tomates-crypto';
update public.domains set asking_price = 1000   where slug = 'iluminacion-x';
update public.domains set asking_price = 1000   where slug = 'iluminacion-coin';
update public.domains set asking_price = 1000   where slug = 'iluminacion-crypto';
update public.domains set asking_price = 800    where slug = 'iluminacion-nft';
