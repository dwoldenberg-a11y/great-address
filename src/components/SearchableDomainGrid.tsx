"use client";

import { useState, useMemo } from "react";
import { Domain } from "@/data/domain-types";
import DomainCard from "./DomainCard";

function getTld(name: string): string {
  const parts = name.split(".");
  return (parts[parts.length - 1] ?? "").toLowerCase();
}

// Show common TLDs in a stable order; everything else trails alphabetically.
const TLD_ORDER = ["ai", "com", "app", "io", "co"];
function tldRank(tld: string): number {
  const i = TLD_ORDER.indexOf(tld);
  return i === -1 ? TLD_ORDER.length : i;
}

export default function SearchableDomainGrid({
  domains,
}: {
  domains: Domain[];
}) {
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!query) return domains;
    return domains.filter((d) => {
      const haystack =
        `${d.name} ${d.category} ${d.description}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [domains, query]);

  const sold = filtered.filter((d) => d.status === "sold");
  const available = filtered.filter((d) => d.status !== "sold");

  // Group available by TLD, ordered by TLD_ORDER then alphabetical.
  const grouped = useMemo(() => {
    const groups = new Map<string, Domain[]>();
    for (const d of available) {
      const tld = getTld(d.name);
      if (!groups.has(tld)) groups.set(tld, []);
      groups.get(tld)!.push(d);
    }
    return Array.from(groups.entries()).sort(([a], [b]) => {
      const ra = tldRank(a);
      const rb = tldRank(b);
      if (ra !== rb) return ra - rb;
      return a.localeCompare(b);
    });
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
            <section className="mb-16 rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-bg-card to-bg-card p-6 sm:p-10">
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

          {grouped.map(([tld, items]) => (
            <section key={tld} className="mb-12 last:mb-0">
              <div className="flex items-end justify-between mb-5 px-1">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  <span className="text-text-tertiary font-mono">.</span>
                  <span className="text-text font-mono">{tld}</span>
                  <span className="ml-3 text-sm font-medium text-text-tertiary">
                    {items.length} {items.length === 1 ? "domain" : "domains"}
                  </span>
                </h3>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((domain) => (
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
