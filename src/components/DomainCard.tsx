import Link from "next/link";
import { Domain, formatPrice } from "@/data/domain-types";

export default function DomainCard({ domain }: { domain: Domain }) {
  const isSold = domain.status === "sold";

  return (
    <Link
      href={`/domain/${domain.slug}`}
      className={`group relative block rounded-2xl border bg-bg-card p-6 transition-all duration-300 ${
        isSold
          ? "border-border opacity-70"
          : "border-border hover:border-border-hover hover:bg-bg-card-hover hover:shadow-[0_0_60px_rgba(0,232,123,0.06)]"
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-full border border-border px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
            {domain.category}
          </span>
          {isSold && (
            <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-red-400">
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
          {isSold ? "—" : formatPrice(domain.askingPrice)}
        </span>
        <span className="text-xs text-text-tertiary group-hover:text-text-secondary transition-colors">
          View details
        </span>
      </div>
    </Link>
  );
}
