"use client";

import { useState } from "react";
import { Domain } from "@/data/domain-types";
import DomainCard from "./DomainCard";

export default function SearchableDomainGrid({
  domains,
}: {
  domains: Domain[];
}) {
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const filtered = query
    ? domains.filter((d) => {
        const haystack = `${d.name} ${d.category} ${d.description}`.toLowerCase();
        return haystack.includes(query);
      })
    : domains;

  return (
    <>
      <div className="mb-10 max-w-xl mx-auto">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary"
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((domain) => (
            <DomainCard key={domain.slug} domain={domain} />
          ))}
        </div>
      )}
    </>
  );
}
