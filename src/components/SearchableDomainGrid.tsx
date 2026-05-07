"use client";

import { useMemo, useState } from "react";
import { Domain } from "@/data/domain-types";
import DomainCard from "./DomainCard";

// ─── Curated theme membership ────────────────────────────────────────────────
// A domain can belong to multiple themes — every section it matches will list
// it. The "more" catch-all picks up anything no other theme claimed.

// Order matters here: items inside Top Picks render in this order, and the
// first entry is the headliner.
const TOP_PICKS_ORDER = [
  "buy.ai",
  "receptionist.ai", "training.ai", "mentor.ai", "warren.ai",
  "inventory.ai", "documents.ai", "notes.ai", "marriage.ai", "reconcile.ai",
  "tmec.ai", "t-mec.ai", "mtr.ai", "etf.ai", "kpi.ai", "pmi.ai",
  "gdp.ai", "kyc.ai", "fx.ai", "pe.ai", "hq.ai", "tq.ai",
  "set.ai", "vq.ai",
];
const TOP_PICKS = new Set(TOP_PICKS_ORDER);
const TOP_PICK_RANK = new Map(TOP_PICKS_ORDER.map((n, i) => [n, i]));

const SPANISH = new Set([
  "manufactura.ai", "litio.ai", "cobre.ai", "monterrey.ai",
  "radiologia.ai", "baterias.ai", "energias.ai", "inyectables.ai",
  "electrico.ai", "mantenimiento.ai", "ahorro.ai", "enfermeria.ai",
  "iluminacion.ai", "vacaciones.ai", "produccion.ai", "integracion.ai",
  "electricista.ai", "enfermera.ai", "estadio.ai", "instalacion.ai",
  "plomero.ai",
]);

const METALS = new Set([
  "steel.ai", "metals.ai", "tubes.ai", "octg.ai", "linepipe.ai",
  "tubacero.ai", "certs.ai", "crosscheck.ai",
  "steel.app", "tubes.app", "tubacero.app", "nucor.app",
]);

const TRANSPORT = new Set([
  "transport.ai", "truck.ai", "hauler.ai", "tranzport.ai",
  "logyx.ai", "krgo.ai", "trk.ai", "shipper.ai", "receiver.ai",
  "consignee.ai", "snapship.ai", "transporter.ai", "tport.ai",
  "3pl.ai", "4pl.ai", "5pl.ai", "loadboards.ai", "loadboard.ai",
  "sku.ai", "transport.app", "tranzport.app",
]);

const FINANCE = new Set([
  "equities.ai", "stockmarket.ai", "stockbroker.ai", "brokers.ai",
  "mybroker.ai", "mybrokers.ai", "statements.ai", "statement.ai",
  "currency.ai", "forex.ai", "privateequity.ai",
  "familyoffice.ai", "nfp.ai", "reconcile.ai", "reconcileit.ai",
  "deduct.ai", "equities.app",
]);

const HEALTH = new Set([
  "radiology.ai", "pillbox.ai", "peptidos.ai", "kyh.ai", "hpn.ai",
  "immucert.ai", "immunitypass.ai", "diet.ai", "marriage.ai",
  "socialdensity.ai", "socialdensityscore.ai",
]);

const AUDIT = new Set([
  "inspector.ai", "inspect.ai", "fieldaudit.ai", "vcount.ai",
  "icount.ai", "snapcount.ai", "countit.ai", "count.ai",
  "auditit.ai", "verifyit.ai", "inspectit.ai", "analizeit.ai",
  "analyzeit.ai", "kycit.ai", "tpi.ai", "phosterity.ai",
  "visualaudit.ai", "inspections.app",
]);

const PERSONAS = new Set([
  "receptionist.ai", "secretary.ai", "resident.ai", "mentor.ai",
  "worker.ai", "warren.ai", "jorge.ai", "erica.ai", "drone.ai",
  "training.ai", "university.ai", "freesbie.ai", "university.app",
]);

type Theme = {
  id: string;
  label: string;
  tagline: string;
  match: (d: Domain) => boolean;
};

const THEMES: Theme[] = [
  {
    id: "top",
    label: "Top Picks",
    tagline: "Two- and three-letter premiums and category-defining names.",
    match: (d) => TOP_PICKS.has(d.name),
  },
  {
    id: "spanish",
    label: "Colección Española",
    tagline: "Brandable Spanish-language addresses for LATAM and Hispanic markets.",
    match: (d) => SPANISH.has(d.name),
  },
  {
    id: "metals",
    label: "Metals & Industrial",
    tagline: "Steel, copper, and the supply chain that moves them.",
    match: (d) => METALS.has(d.name),
  },
  {
    id: "transport",
    label: "Transport & Logistics",
    tagline: "Trucks, ships, and the connective tissue between them.",
    match: (d) => TRANSPORT.has(d.name),
  },
  {
    id: "finance",
    label: "Finance & Markets",
    tagline: "Wall Street vocabulary, on the right side of the dot.",
    match: (d) => FINANCE.has(d.name),
  },
  {
    id: "health",
    label: "Health & Pharma",
    tagline: "From peptides to pillboxes.",
    match: (d) => HEALTH.has(d.name),
  },
  {
    id: "audit",
    label: "Audit & Verify",
    tagline: "Inspect, count, prove — the trust layer.",
    match: (d) => AUDIT.has(d.name),
  },
  {
    id: "personas",
    label: "AI Personas",
    tagline: "Names that already feel like teammates.",
    match: (d) => PERSONAS.has(d.name),
  },
  {
    id: "bitcoin",
    label: "·bitcoin",
    tagline: "Native handles for the on-chain web.",
    match: (d) => d.name.endsWith(".bitcoin"),
  },
  {
    id: "apps",
    label: "·app",
    tagline: "Brand-ready application domains.",
    match: (d) => d.name.endsWith(".app"),
  },
  {
    id: "more",
    label: "More AI",
    tagline: "The rest of the catalog — odds, ends, and overlooked gems.",
    match: () => true,
  },
];

// "more" is the catch-all for anything no other theme claimed.
const NON_MORE_THEMES = () => THEMES.filter((t) => t.id !== "more");

export default function SearchableDomainGrid({
  domains,
}: {
  domains: Domain[];
}) {
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!query) return domains;
    return domains.filter((d) =>
      `${d.name} ${d.category} ${d.description}`
        .toLowerCase()
        .includes(query),
    );
  }, [domains, query]);

  const sold = filtered.filter((d) => d.status === "sold");
  const available = filtered.filter((d) => d.status !== "sold");

  // A domain can show in every theme that matches it. "more" gets whatever
  // no other theme claimed.
  const sections = useMemo(() => {
    const others = NON_MORE_THEMES();
    return THEMES.map((t) => {
      let items =
        t.id === "more"
          ? available.filter((d) => !others.some((o) => o.match(d)))
          : available.filter(t.match);
      if (t.id === "top") {
        items = [...items].sort(
          (a, b) =>
            (TOP_PICK_RANK.get(a.name) ?? Infinity) -
            (TOP_PICK_RANK.get(b.name) ?? Infinity),
        );
      }
      return { ...t, items };
    }).filter((s) => s.items.length > 0);
  }, [available]);

  return (
    <>
      <div className="mb-12 max-w-xl mx-auto">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search domains..."
            className="w-full rounded-full border border-border bg-bg-card pl-12 pr-4 py-3 text-base text-text placeholder:text-text-tertiary"
            aria-label="Search domains"
          />
        </div>
        {query && (
          <p className="mt-3 text-center text-xs text-text-tertiary">
            {filtered.length} {filtered.length === 1 ? "match" : "matches"}
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-border bg-bg-card">
          <p className="text-text-tertiary">
            No domains match &ldquo;{q}&rdquo;.
          </p>
        </div>
      ) : (
        <>
          {sold.length > 0 && (
            <section className="mb-20 rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-bg-card to-bg-card p-6 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Recently Sold
                </span>
                <p className="text-sm text-text-secondary">
                  Real deals from our portfolio
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sold.map((domain) => (
                  <DomainCard key={domain.slug} domain={domain} />
                ))}
              </div>
            </section>
          )}

          {/* Editorial table of contents */}
          {!query && sections.length > 1 && (
            <nav className="mb-16 rounded-3xl border border-border bg-bg-card/60 backdrop-blur p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-5">
                Index
              </p>
              <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#theme-${s.id}`}
                      className="group flex items-baseline gap-3 py-1.5 border-b border-border/60 hover:border-accent/40 transition-colors"
                    >
                      <span className="font-mono text-[11px] tracking-widest text-text-tertiary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium text-text-secondary group-hover:text-accent transition-colors flex-1">
                        {s.label}
                      </span>
                      <span className="font-mono text-xs text-text-tertiary">
                        {s.items.length}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {sections.map((section, idx) => (
            <section
              id={`theme-${section.id}`}
              key={section.id}
              className="mb-20 last:mb-0 scroll-mt-24"
            >
              <header className="mb-8 border-t border-border pt-8 flex items-end justify-between gap-6 flex-wrap">
                <div className="flex items-baseline gap-5 max-w-2xl">
                  <span className="font-mono text-xs text-text-tertiary tracking-[0.2em] mt-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                      {section.label}
                    </h3>
                    <p className="text-sm text-text-tertiary mt-1.5 leading-relaxed">
                      {section.tagline}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-text-tertiary tracking-[0.2em] uppercase">
                  {section.items.length}{" "}
                  {section.items.length === 1 ? "address" : "addresses"}
                </span>
              </header>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((domain) => (
                  <DomainCard key={domain.slug} domain={domain} />
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </>
  );
}
