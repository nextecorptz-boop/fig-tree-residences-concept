/**
 * A new content category this project introduces (website/03_PAGE_ARCHITECTURE.md
 * Section 9), seeded from the verified landmark list in
 * docs/CONTENT_DATABASE.md rather than invented wholesale.
 */

export type Experience = {
  id: string;
  name: string;
  category: "Waterfront & Leisure" | "Dining Out" | "Culture";
  description: string;
  externalLink?: string;
};

export const experiences: Experience[] = [
  {
    id: "yacht-club",
    name: "Dar es Salaam Yacht Club",
    category: "Waterfront & Leisure",
    description: "Two hundred metres from the residence — sailing, sundowners, and a clubhouse view of the bay.",
  },
  {
    id: "slipway",
    name: "Slipway Waterfront",
    category: "Waterfront & Leisure",
    description: "A walkable stretch of shops, cafés, and a weekend craft market on the water's edge.",
  },
  {
    id: "epi-dor",
    name: "Epi d'Or",
    category: "Dining Out",
    description: "A bakery-café a short walk from the residence, good for a quiet breakfast before the day starts.",
  },
  {
    id: "grill-house",
    name: "Grill House Dar es Salaam",
    category: "Dining Out",
    description: "A relaxed dinner spot within easy reach of Masaki.",
  },
  {
    id: "akira-lounge",
    name: "Akira Lounge & Bar",
    category: "Dining Out",
    description: "An evening-out option a short drive from the residence.",
  },
  {
    id: "the-slow-leopard",
    name: "The Slow Leopard",
    category: "Culture",
    description: "A design and lifestyle shop worth an afternoon browse in Masaki.",
  },
  {
    id: "george-and-dragon",
    name: "George and Dragon",
    category: "Dining Out",
    description: "A long-standing Masaki gathering spot for guests who want a familiar evening out.",
  },
];
