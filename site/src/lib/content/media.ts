/**
 * Local stand-in for the Supabase `media` table. Only "Correct-and-retain"
 * assets from website/07_HIGGSFIELD_SHOTLIST.md are included — every
 * "Replace" or "Reference-only" file is deliberately excluded, and the
 * reception-wall portrait frame is held pending the open decision in
 * docs/LUXURY_OPPORTUNITIES.md #11.
 */

export type MediaCategory = "rooms" | "gardens" | "dining" | "amenities" | "exterior";

export type MediaItem = {
  id: string;
  src: string;
  alt: string;
  category: MediaCategory;
  span?: "wide" | "tall" | "normal";
};

export const mediaLibrary: MediaItem[] = [
  { id: "hero-facade", src: "/images/hero/home-hero-interim.jpg", alt: "Fig Tree Residences building facade among mature trees", category: "exterior", span: "wide" },
  { id: "rooms-arch-1", src: "/images/rooms/bedroom-arched-headboard-1.avif", alt: "Arched palm-motif headboard in the Garden View Studio", category: "rooms", span: "tall" },
  { id: "rooms-arch-2", src: "/images/rooms/bedroom-arched-headboard-2.avif", alt: "Garden View Studio sitting area beside the private balcony", category: "rooms" },
  { id: "rooms-wide", src: "/images/rooms/bedroom-wide-view.avif", alt: "Classic Residence bedroom, wide view", category: "rooms" },
  { id: "rooms-kitchenette", src: "/images/rooms/kitchenette-styled.avif", alt: "Styled kitchenette with rattan detailing", category: "rooms" },
  { id: "rooms-kitchen-counter", src: "/images/rooms/kitchenette-counter.jpg", alt: "Kitchenette sink and counter detail", category: "rooms" },
  { id: "rooms-breakfast-bar", src: "/images/rooms/kitchenette-breakfast-bar.jpg", alt: "Kitchenette breakfast bar", category: "rooms" },
  { id: "rooms-bathroom", src: "/images/rooms/bathroom-styled.jpg", alt: "Bathroom styled with plants and a rain shower", category: "rooms" },
  { id: "garden-wall", src: "/images/gardens/garden-living-wall.jpg", alt: "Living wall of tropical greenery in the garden", category: "gardens", span: "wide" },
  { id: "garden-rattan", src: "/images/gardens/garden-rattan-seating.jpg", alt: "Rattan garden seating beneath mature trees", category: "gardens" },
  { id: "garden-alt", src: "/images/gallery/garden-alternate-view.jpg", alt: "Garden path beneath the tree canopy", category: "gardens" },
  { id: "dining-dusk", src: "/images/dining/rooftop-dining-dusk.jpg", alt: "Rooftop restaurant at dusk with string lights", category: "dining", span: "wide" },
  { id: "dining-sunset", src: "/images/dining/rooftop-dining-sunset.jpg", alt: "Rooftop bar at sunset overlooking the bay", category: "dining" },
  { id: "amenities-pool", src: "/images/amenities/pool-daylight.jpg", alt: "Swimming pool in daylight", category: "amenities" },
  { id: "amenities-gym", src: "/images/amenities/gym-equipment.jpg", alt: "Indoor gym equipment", category: "amenities" },
  { id: "amenities-breakfast", src: "/images/amenities/outdoor-breakfast-tray.jpg", alt: "Breakfast tray on a private balcony overlooking the garden", category: "amenities" },
  { id: "amenities-lounge", src: "/images/amenities/lounge-seating.jpg", alt: "Living room lounge seating", category: "amenities" },
  { id: "amenities-living-room", src: "/images/amenities/living-room-styled.avif", alt: "Styled living room with nautical accents", category: "amenities" },
  { id: "exterior-facade", src: "/images/our-story/building-facade-daylight.jpg", alt: "Fig Tree Residences building facade in daylight", category: "exterior" },
  { id: "interior-detail", src: "/images/gallery/interior-detail.avif", alt: "Interior material detail", category: "rooms" },
  { id: "common-area", src: "/images/gallery/common-area-interior.avif", alt: "Shared common area interior", category: "amenities" },
];

export function getMediaByCategory(category: MediaCategory | "all"): MediaItem[] {
  if (category === "all") return mediaLibrary;
  return mediaLibrary.filter((m) => m.category === category);
}
