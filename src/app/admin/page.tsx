import { requireAdmin } from "@/lib/supabase/require-admin";
import { signOut } from "./actions";
import AdminDomainRow, { AdminDomain } from "./AdminDomainRow";

export const metadata = { title: "Admin — Great Address" };

type DomainRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  asking_price: number | string | null;
  status: "visible" | "hidden" | "sold";
  owner: string | null;
  sort_order: number;
};

export default async function AdminPage() {
  const { user, supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("domains")
    .select("*")
    .order("sort_order", { ascending: true });

  const domains: AdminDomain[] = ((data as DomainRow[]) ?? []).map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.description,
    category: r.category,
    askingPrice: r.asking_price === null ? null : Number(r.asking_price),
    status: r.status,
    owner: r.owner ?? "",
  }));

  const ownerCounts = domains.reduce<Record<string, number>>((acc, d) => {
    const key = d.owner || "Unassigned";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const counts = {
    total: domains.length,
    visible: domains.filter((d) => d.status === "visible").length,
    sold: domains.filter((d) => d.status === "sold").length,
    hidden: domains.filter((d) => d.status === "hidden").length,
  };

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-text-tertiary mb-3">
              Admin
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Domain Manager
            </h1>
            <p className="text-sm text-text-tertiary mt-2">
              Signed in as {user.email}
            </p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-border px-5 py-2 text-sm font-medium text-text-secondary hover:text-text hover:border-border-hover transition-all"
            >
              Sign out
            </button>
          </form>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 mb-6 text-sm text-red-400">
            {error.message}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl border border-border bg-border overflow-hidden mb-3">
          {[
            { label: "Total", value: counts.total },
            { label: "Visible", value: counts.visible },
            { label: "Sold", value: counts.sold },
            { label: "Hidden", value: counts.hidden },
          ].map((s) => (
            <div key={s.label} className="bg-bg-card px-5 py-4">
              <p className="text-xs text-text-tertiary uppercase tracking-wider">
                {s.label}
              </p>
              <p className="text-2xl font-bold font-mono mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(ownerCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([owner, count]) => (
              <span
                key={owner}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-3 py-1 text-xs text-text-secondary"
              >
                <span className="font-medium text-text">{owner}</span>
                <span className="font-mono text-text-tertiary">{count}</span>
              </span>
            ))}
        </div>

        <div className="rounded-2xl border border-border bg-bg-card overflow-hidden">
          <div className="hidden md:grid grid-cols-[1fr_120px_110px_110px_110px_120px] gap-4 px-5 py-3 border-b border-border bg-bg-elevated text-xs font-medium uppercase tracking-wider text-text-tertiary">
            <div>Domain</div>
            <div>Owner</div>
            <div>Category</div>
            <div>Price (USD)</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>
          {domains.length === 0 ? (
            <div className="px-5 py-12 text-center text-text-tertiary text-sm">
              No domains yet. Run the seed SQL in Supabase to add some.
            </div>
          ) : (
            <ul>
              {domains.map((d) => (
                <li
                  key={d.id}
                  className="border-b border-border last:border-b-0"
                >
                  <AdminDomainRow domain={d} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
