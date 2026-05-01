export interface Domain {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  askingPrice: number | null;
  highlights: string[];
  status: "visible" | "hidden" | "sold";
  sortOrder: number;
}

export function formatPrice(price: number | null): string {
  if (price === null) return "Make an Offer";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
