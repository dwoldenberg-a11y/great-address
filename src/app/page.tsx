import SearchableDomainGrid from "@/components/SearchableDomainGrid";
import BusinessPlanForm from "@/components/BusinessPlanForm";
import { getPublicDomains } from "@/data/domains";

export default async function Home() {
  const { domains, error: domainsError } = await getPublicDomains();
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient relative pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <div className="animate-fade-up">
            <span className="inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-text-tertiary mb-8">
              Premium Domain Marketplace
            </span>
          </div>
          <h1 className="animate-fade-up-delay-1 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Your next great
            <br />
            <span className="text-accent">address</span> starts here
          </h1>
          <p className="animate-fade-up-delay-2 mx-auto mt-8 max-w-xl text-lg text-text-secondary leading-relaxed">
            Acquire premium domains outright, or pitch us your vision and
            we&apos;ll loan you the domain in exchange for equity.
          </p>
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="#domains"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-bg hover:bg-accent-dim transition-colors"
            >
              Browse Domains
            </a>
            <a
              href="#submit"
              className="rounded-full border border-border px-8 py-3.5 text-sm font-medium text-text-secondary hover:text-text hover:border-border-hover transition-all"
            >
              Submit a Business Plan
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mx-auto max-w-3xl mt-20 grid grid-cols-3 gap-px rounded-2xl border border-border bg-border overflow-hidden">
          {[
            { value: `${domains.filter((d) => d.status !== "sold").length}+`, label: "Available" },
            { value: `${domains.filter((d) => d.status === "sold").length}`, label: "Sold" },
            { value: "48hr", label: "Response" },
          ].map((stat) => (
            <div key={stat.label} className="bg-bg-card px-6 py-5 text-center">
              <p className="text-2xl font-bold text-text font-mono">{stat.value}</p>
              <p className="text-xs text-text-tertiary mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-bg">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-text-tertiary mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Two paths to your domain
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Buy card */}
            <div className="group rounded-2xl border border-border bg-bg-card p-8 md:p-10 transition-all duration-300 hover:border-border-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-6">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Buy Outright</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Submit an offer to purchase any domain in our portfolio. We review all
                offers and respond within 48 hours. Full ownership transfers on agreement.
              </p>
              <div className="space-y-3 text-sm">
                {["Browse available domains", "Submit your offer", "Transfer in 48 hours"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-text-tertiary">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs font-mono">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Pitch card */}
            <div className="group rounded-2xl border border-accent/20 bg-bg-card p-8 md:p-10 transition-all duration-300 hover:border-accent/40 glow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-6">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Pitch Your Vision</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Have a great idea? Submit your business plan. We&apos;ll loan you
                the domain and retain negotiated equity. You build — we supply the address.
              </p>
              <div className="space-y-3 text-sm">
                {["Submit your business plan", "We review & negotiate equity", "Launch on your new domain"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-text-tertiary">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent/30 text-accent text-xs font-mono">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Listings */}
      <section id="domains" className="py-24 px-6 bg-bg-elevated">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-text-tertiary mb-4">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Available domains
            </h2>
            <p className="text-text-secondary mt-3">
              Browse our collection and find your perfect address
            </p>
          </div>

          {domainsError ? (
            <div className="text-center py-20 rounded-2xl border border-red-500/30 bg-red-500/5">
              <p className="text-red-600 font-mono text-sm px-4 break-all">
                Database error: {domainsError}
              </p>
            </div>
          ) : domains.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-border bg-bg-card">
              <p className="text-text-tertiary">
                No domains listed yet. Check back soon.
              </p>
            </div>
          ) : (
            <SearchableDomainGrid domains={domains} />
          )}
        </div>
      </section>

      {/* Business Plan Submission */}
      <section id="submit" className="py-24 px-6 bg-bg">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent mb-4">
              Partner With Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Submit your business plan
            </h2>
            <p className="text-text-secondary mt-3 max-w-md mx-auto">
              Tell us your vision. If it&apos;s a fit, we&apos;ll loan you the domain
              and partner for equity.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-10">
            <BusinessPlanForm />
          </div>
        </div>
      </section>
    </div>
  );
}
