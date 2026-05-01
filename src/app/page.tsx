import DomainCard from "@/components/DomainCard";
import { domains } from "@/data/domains";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your Next Great{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Address
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Premium domains available for purchase — or pitch us your business
            plan and we&apos;ll loan you the domain in exchange for equity.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-6 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold tracking-tight mb-12">
            Two Ways to Get Your Domain
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xl font-bold">
                $
              </div>
              <h3 className="mb-2 text-lg font-semibold">Buy It Outright</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Submit an offer to purchase the domain. We review all offers and
                respond within 48 hours. Ownership transfers immediately upon
                agreement.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xl font-bold">
                &amp;
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Pitch a Business Plan
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Have a great idea for a domain? Submit your business plan.
                We&apos;ll loan you the domain and retain negotiated equity in
                your venture. Build your dream — we&apos;ll supply the address.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Listings */}
      <section className="py-16 px-6 bg-zinc-50 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold tracking-tight mb-2">
            Available Domains
          </h2>
          <p className="text-center text-zinc-500 dark:text-zinc-400 mb-10">
            Browse our portfolio and find your perfect address
          </p>

          {domains.length === 0 ? (
            <p className="text-center text-zinc-400 py-12">
              No domains listed yet. Check back soon!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {domains.map((domain) => (
                <DomainCard key={domain.slug} domain={domain} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
