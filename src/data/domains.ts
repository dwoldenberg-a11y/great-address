export interface Domain {
  slug: string;
  name: string;
  description: string;
  category: string;
  askingPrice: number | null; // null = "Make an offer"
  highlights: string[];
}

export const domains: Domain[] = [
  {
    slug: "example-com",
    name: "example.com",
    description:
      "A versatile, memorable domain perfect for any business or project.",
    category: "General",
    askingPrice: null,
    highlights: ["Short and memorable", "Universal appeal", ".com TLD"],
  },
  // Add your real domains here following this pattern:
  // {
  //   slug: "your-domain",
  //   name: "yourdomain.com",
  //   description: "Description of the domain",
  //   category: "Category",
  //   askingPrice: 5000, // or null for "Make an offer"
  //   highlights: ["Highlight 1", "Highlight 2"],
  // },
];

export function getDomain(slug: string): Domain | undefined {
  return domains.find((d) => d.slug === slug);
}

export function formatPrice(price: number | null): string {
  if (price === null) return "Make an Offer";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
