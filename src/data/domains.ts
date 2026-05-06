import { createClient } from "@/lib/supabase/server";
import { Domain } from "./domain-types";

export type { Domain };
export { formatPrice } from "./domain-types";

type DomainRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  asking_price: number | string | null;
  highlights: string[];
  status: "visible" | "hidden" | "sold";
  owner: string;
  sort_order: number;
};

function rowToDomain(row: DomainRow): Domain {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    category: row.category,
    askingPrice: row.asking_price === null ? null : Number(row.asking_price),
    highlights: row.highlights,
    status: row.status,
    owner: row.owner,
    sortOrder: row.sort_order,
  };
}

// Public listing: visible + sold (sold rows are shown with a SOLD badge).
// Hidden rows are filtered out by RLS.
export async function getPublicDomains(): Promise<{
  domains: Domain[];
  error?: string;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("domains")
    .select("*")
    .in("status", ["visible", "sold"])
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getPublicDomains error", error);
    return { domains: [], error: error.message };
  }
  return { domains: (data as DomainRow[]).map(rowToDomain) };
}

export async function getPublicDomain(slug: string): Promise<Domain | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("domains")
    .select("*")
    .eq("slug", slug)
    .in("status", ["visible", "sold"])
    .maybeSingle();

  if (error) {
    console.error("getPublicDomain error", error);
    return null;
  }
  return data ? rowToDomain(data as DomainRow) : null;
}
