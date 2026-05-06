import Link from "next/link";
import { Domain, formatPrice } from "@/data/domain-types";

export default function DomainCard({ domain }: { domain: Domain }) {
  const isSold = domain.status === "sold";

  return (
    <Link
      href={`/domain/${domain.slug}`}
      className={`group relative block rounded-2xl border bg-bg-card p-6 transition-all duration-300 ${
        isSold
          ? "border-accent/40 bg-gradient-to-br from-accent/8 to-bg-card shadow-[0_0_30px_rgba(124,58,237,0.10)] hover:border-accent/60 hover:shadow-[0_0_50px_rgba(124,58,237,0.18)]"
          : "border-border hover:border-border-hover hover:bg-bg-card-hover hover:shadow-[0_0_40px_rgba(124,58,237,0.10)]"
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-full border border-border px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
            {domain.category}
          </span>
          {isSold && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Sold
            </span>
          )}
        </div>
        <svg
          className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      <h3 className="text-2xl font-semibold tracking-tight text-text mb-2 group-hover:text-accent transition-colors duration-300">
        {domain.name}
      </h3>
      {domain.description && (
        <p className="text-sm text-text-tertiary mb-8 line-clamp-2 leading-relaxed">
          {domain.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-sm font-mono font-medium text-accent">
          {isSold ? "Closed deal" : formatPrice(domain.askingPrice)}
        </span>
        {!isSold && (
          <span className="text-xs text-text-tertiary group-hover:text-text-secondary transition-colors">
            View details
          </span>
        )}
      </div>
    </Link>
  );
}
