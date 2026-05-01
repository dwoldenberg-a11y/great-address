import { notFound } from "next/navigation";
import { domains, getDomain, formatPrice } from "@/data/domains";
import OfferForm from "@/components/OfferForm";
import ProposalForm from "@/components/ProposalForm";

export function generateStaticParams() {
  return domains.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const domain = getDomain(slug);
  if (!domain) return { title: "Domain Not Found" };
  return {
    title: `${domain.name} — Great Address`,
    description: domain.description,
  };
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const domain = getDomain(slug);
  if (!domain) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Domain Header */}
      <div className="mb-12">
        <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 mb-4">
          {domain.category}
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-3">
          {domain.name}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
          {domain.description}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatPrice(domain.askingPrice)}
          </span>
        </div>
      </div>

      {/* Highlights */}
      {domain.highlights.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Highlights</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {domain.highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Forms */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold mb-1">Make an Offer</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Submit a purchase offer for this domain
          </p>
          <OfferForm domainName={domain.name} />
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold mb-1">Pitch a Business Plan</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            We loan the domain; you build the business
          </p>
          <ProposalForm domainName={domain.name} />
        </div>
      </div>
    </div>
  );
}
