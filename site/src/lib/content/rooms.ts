/**
 * Local stand-in for the Supabase `room_types` table (website/03_PAGE_ARCHITECTURE.md).
 * Shape mirrors the eventual table schema so swapping in a live query later
 * is a data-source change, not a component rewrite.
 *
 * Only two visually distinct room types exist in the asset library today
 * (docs/ASSET_INVENTORY.md, docs/LUXURY_OPPORTUNITIES.md #5): the newer
 * arched palm-headboard studio and an older-style room. The brochure's
 * feature list (docs/CONTENT_DATABASE.md) describes what appears to be a
 * single room type; per website/14_CONTENT_MAPPING.md Section 4 this must
 * be reconfirmed against every actual unit sold before launch.
 *
 * `nightlyRateUSD` is a PLACEHOLDER — no real rate was ever found anywhere
 * in Discovery (the single most-cited defect on the live site). Do not
 * treat this number as real; it exists so RateDisplay/BookingWidget have a
 * value to render during development. Replace before launch.
 */

export type RoomType = {
  slug: string;
  name: string;
  differentiator: string;
  description: string;
  sizeSqm: number;
  bedConfiguration: string;
  occupancy: number;
  features: string[];
  heroImage: { src: string; alt: string };
  images: { src: string; alt: string }[];
  longStayEligible: boolean;
  nightlyRateUSD: number;
  isPlaceholderRate: true;
  needsClientConfirmation: boolean;
};

/**
 * Image paths below point at the colour-corrected, correctly-labelled set in
 * public/media/ (see lib/v2/media.ts and docs/PHOTO_USAGE_REPORT.md) — not at
 * public/images/, whose filenames are roughly half wrong (a file called
 * "kitchenette-styled.avif" is in fact a bedroom; "bathroom-styled.jpg" is the
 * garden wall). Every image below was assigned by looking at the photograph.
 */

export const roomTypes: RoomType[] = [
  {
    slug: "garden-view-studio",
    name: "Garden View Studio",
    differentiator: "The arched palm-motif headboard, and a private balcony onto the garden.",
    description:
      "Forty-three square metres, arranged the way a home is arranged — its own kitchen, its own balcony, its own quiet. A queen bed sits beneath a carved, arch-motif headboard, with a sofa bed for a second guest and a desk for the days that need one.",
    sizeSqm: 43,
    bedConfiguration: "Queen bed plus sofa bed",
    occupancy: 2,
    features: [
      "Rain shower",
      "Desk with office chair",
      "Private balcony",
      "Free high-speed WiFi",
      "Flat-screen TV, satellite channels",
      "Fully equipped kitchenette",
      "Kettle, toaster, coffee press",
      "Daily housekeeping",
      "Laundry facilities available",
    ],
    heroImage: { src: "/media/bedroom-arch-palm.webp", alt: "Garden View Studio, arched palm-motif headboard, queen bed" },
    images: [
      { src: "/media/bedroom-arch-palm.webp", alt: "Garden View Studio bedroom, arched palm-motif headboard, queen bed" },
      { src: "/media/bedroom-arch-green.webp", alt: "Garden View Studio, alternate unit, same carved headboard" },
      { src: "/media/bedroom-white-arch.webp", alt: "Garden View Studio, the white-finish variant" },
      { src: "/media/kitchenette-full.webp", alt: "Garden View Studio's fully equipped kitchenette" },
      { src: "/media/bathroom-full-view.webp", alt: "Garden View Studio bathroom with rain shower" },
    ],
    longStayEligible: true,
    nightlyRateUSD: 145,
    isPlaceholderRate: true,
    needsClientConfirmation: true,
  },
  {
    slug: "classic-residence",
    name: "Classic Residence",
    differentiator: "The property's original room style, quieter and set toward the garden's older trees.",
    description:
      "The same considered layout as every Fig Tree residence — a queen bed, a sofa bed, a kitchenette of its own — in the property's original interior finish, for guests who prefer the quieter, established corner of the garden.",
    sizeSqm: 43,
    bedConfiguration: "Queen bed plus sofa bed",
    occupancy: 2,
    features: [
      "Rain shower",
      "Desk with office chair",
      "Private balcony",
      "Free high-speed WiFi",
      "Flat-screen TV, satellite channels",
      "Fully equipped kitchenette",
      "Kettle, toaster, coffee press",
      "Daily housekeeping",
      "Laundry facilities available",
    ],
    heroImage: { src: "/media/bedroom-classic-lighthouse.webp", alt: "Classic Residence bedroom, original finish" },
    images: [
      { src: "/media/bedroom-classic-lighthouse.webp", alt: "Classic Residence bedroom, original finish" },
      { src: "/media/bedroom-classic-attic.webp", alt: "Classic Residence, top-floor variant under the roofline" },
      { src: "/media/kitchenette-bar.webp", alt: "Classic Residence kitchenette counter" },
      { src: "/media/kitchen-detail.webp", alt: "Classic Residence breakfast bar" },
      { src: "/media/bathroom-full-view.webp", alt: "Classic Residence bathroom with rain shower" },
    ],
    longStayEligible: true,
    nightlyRateUSD: 125,
    isPlaceholderRate: true,
    needsClientConfirmation: true,
  },
];

export function getRoomBySlug(slug: string): RoomType | undefined {
  return roomTypes.find((r) => r.slug === slug);
}

export function getLongStayRooms(): RoomType[] {
  return roomTypes.filter((r) => r.longStayEligible);
}
