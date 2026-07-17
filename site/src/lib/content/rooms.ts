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
  images: { src: string; alt: string }[];
  longStayEligible: boolean;
  nightlyRateUSD: number;
  isPlaceholderRate: true;
  needsClientConfirmation: boolean;
};

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
    images: [
      { src: "/images/rooms/bedroom-arched-headboard-1.avif", alt: "Garden View Studio bedroom, arched palm-motif headboard, queen bed" },
      { src: "/images/rooms/bedroom-arched-headboard-2.avif", alt: "Garden View Studio, alternate angle of the arched headboard and sitting area" },
      { src: "/images/rooms/kitchenette-styled.avif", alt: "Garden View Studio's fully equipped kitchenette" },
      { src: "/images/rooms/bathroom-styled.jpg", alt: "Garden View Studio bathroom with rain shower" },
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
    images: [
      { src: "/images/rooms/bedroom-wide-view.avif", alt: "Classic Residence bedroom, wide view" },
      { src: "/images/rooms/kitchenette-counter.jpg", alt: "Classic Residence kitchenette counter" },
      { src: "/images/rooms/kitchenette-breakfast-bar.jpg", alt: "Classic Residence breakfast bar" },
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
