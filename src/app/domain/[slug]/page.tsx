import Link from "next/link";
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
    <div className="pt-28 pb-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <Link
          href="/#domains"
          className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text transition-colors mb-10"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Domains
        </Link>

        {/* Domain Header */}
        <div className="mb-16">
          <span className="inline-block rounded-full border border-border px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-text-tertiary mb-5">
            {domain.category}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            {domain.name}
          </h1>
          <p className="text-lg text-text-secondary max-w-xl leading-relaxed mb-8">
            {domain.description}
          </p>
          <div className="inline-flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 px-6 py-3">
            <span className="text-sm text-text-secondary">Price</span>
            <span className="text-xl font-bold font-mono text-accent">
              {formatPrice(domain.askingPrice)}
            </span>
          </div>
        </div>

        {/* Highlights */}
        {domain.highlights.length > 0 && (
          <div className="mb-16">
            <h2 className="text-sm font-medium uppercase tracking-wider text-text-tertiary mb-5">
              Highlights
            </h2>
            <div className="flex flex-wrap gap-3">
              {domain.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-border bg-bg-card px-4 py-2 text-sm text-text-secondary"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Forms */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-bg-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Make an Offer</h2>
                <p className="text-xs text-text-tertiary">Purchase this domain</p>
              </div>
            </div>
            <OfferForm domainName={domain.name} />
          </div>

          <div className="rounded-2xl border border-accent/20 bg-bg-card p-8 glow">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Pitch a Business Plan</h2>
                <p className="text-xs text-text-tertiary">We loan the domain, you build the business</p>
              </div>
            </div>
            <ProposalForm domainName={domain.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
