import Link from "next/link";
import { Domain, formatPrice } from "@/data/domains";

export default function DomainCard({ domain }: { domain: Domain }) {
  return (
    <Link
      href={`/domain/${domain.slug}`}
      className="group block rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-700"
    >
      <div className="mb-3">
        <span className="inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {domain.category}
        </span>
      </div>
      <h3 className="mb-1 text-xl font-semibold tracking-tight text-zinc-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 transition-colors">
        {domain.name}
      </h3>
      <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
        {domain.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
          {formatPrice(domain.askingPrice)}
        </span>
        <span className="text-sm font-medium text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          View Details &rarr;
        </span>
      </div>
    </Link>
  );
}
