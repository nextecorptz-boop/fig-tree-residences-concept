/**
 * Local stand-in for the Supabase `media` table.
 *
 * Points at the colour-corrected, correctly-labelled set in public/media/
 * (see lib/v2/media.ts and docs/PHOTO_USAGE_REPORT.md), not at public/images/.
 * That tree's filenames are roughly half wrong — a file called
 * "bedroom-arched-headboard-2.avif" is in fact the kitchenette, and
 * "kitchenette-styled.avif" is in fact a bedroom. Every entry below was
 * reassigned by looking at the actual photograph, not by trusting its old name.
 */

export type MediaCategory = "rooms" | "gardens" | "dining" | "amenities" | "exterior" | "reception";

export type MediaItem = {
  id: string;
  src: string;
  alt: string;
  category: MediaCategory;
  span?: "wide" | "tall" | "normal";
};

export const mediaLibrary: MediaItem[] = [
  { id: "hero-facade", src: "/media/facade-tree.webp", alt: "Fig Tree Residences building facade among mature trees", category: "exterior", span: "wide" },

  { id: "rooms-arch-palm", src: "/media/bedroom-arch-palm.webp", alt: "Arched palm-motif headboard, Garden View Studio", category: "rooms", span: "tall" },
  { id: "rooms-arch-green", src: "/media/bedroom-arch-green.webp", alt: "Garden View Studio, alternate unit, cooler palette", category: "rooms" },
  { id: "rooms-white-arch", src: "/media/bedroom-white-arch.webp", alt: "Garden View Studio, white-finish variant", category: "rooms" },
  { id: "rooms-blue", src: "/media/bedroom-blue.webp", alt: "Garden View Studio, blue-cushion variant", category: "rooms" },
  { id: "rooms-classic-lighthouse", src: "/media/bedroom-classic-lighthouse.webp", alt: "Classic Residence bedroom, original finish", category: "rooms" },
  { id: "rooms-classic-attic", src: "/media/bedroom-classic-attic.webp", alt: "Classic Residence, top-floor bedroom under the roofline", category: "rooms" },
  { id: "rooms-kitchenette-full", src: "/media/kitchenette-full.webp", alt: "Fully equipped kitchenette, full view", category: "rooms" },
  { id: "rooms-kitchenette-bar", src: "/media/kitchenette-bar.webp", alt: "Kitchenette breakfast bar", category: "rooms" },
  { id: "rooms-kitchen-detail", src: "/media/kitchen-detail.webp", alt: "Kitchen counter detail", category: "rooms" },
  { id: "rooms-bathroom", src: "/media/bathroom-full-view.webp", alt: "Bathroom with rain shower, full view", category: "rooms" },
  { id: "rooms-living-cream", src: "/media/living-cream.webp", alt: "Living room, cream sofas", category: "rooms" },
  { id: "rooms-living-desk", src: "/media/living-cream-desk.webp", alt: "Living room with writing desk", category: "rooms" },

  { id: "garden-wall", src: "/media/garden-living-wall.webp", alt: "Living wall of tropical greenery in the garden", category: "gardens", span: "wide" },
  { id: "garden-lounge", src: "/media/garden-lounge.webp", alt: "Garden lounge seating", category: "gardens" },
  { id: "garden-lounge-bench", src: "/media/garden-lounge-bench.webp", alt: "Garden bench seating, green cushions", category: "gardens" },
  { id: "garden-breakfast", src: "/media/breakfast-garden.webp", alt: "Breakfast laid on a balcony table overlooking the garden", category: "gardens" },

  { id: "dining-golden-hour", src: "/media/rooftop-sunset.webp", alt: "Rooftop terrace at golden hour, string lights, tables set", category: "dining", span: "wide" },
  { id: "dining-dusk-guests", src: "/media/rooftop-dusk-guests.webp", alt: "Rooftop restaurant at dusk, guests seated beneath string lights", category: "dining" },
  { id: "dining-bar-detail", src: "/media/dining-bar-detail.webp", alt: "Rooftop bar, wine service and orchids", category: "dining" },

  { id: "amenities-pool-wide", src: "/media/pool-wide.webp", alt: "Swimming pool, wide view", category: "amenities" },
  { id: "amenities-pool-trees", src: "/media/pool-through-trees.webp", alt: "Pool and building exterior, seen through trees", category: "amenities" },
  { id: "amenities-pool-garden", src: "/media/pool-garden-angle.webp", alt: "Swimming pool, garden angle", category: "amenities" },
  { id: "amenities-gym", src: "/media/gym.webp", alt: "Indoor gym, cardio and free weights", category: "amenities" },
  { id: "amenities-lounge", src: "/media/lounge-dim.webp", alt: "Interior lounge, low light", category: "amenities" },

  { id: "reception-desk", src: "/media/reception-desk.webp", alt: "Reception desk", category: "reception" },
  { id: "reception-lounge", src: "/media/reception-lounge.webp", alt: "Reception lounge seating", category: "reception" },
  { id: "reception-detail", src: "/media/reception-detail.webp", alt: "Reception, alternate angle", category: "reception" },

  { id: "exterior-pool-1", src: "/media/pool-exterior-1.webp", alt: "Pool and building exterior", category: "exterior" },
  { id: "exterior-pool-2", src: "/media/pool-exterior-2.webp", alt: "Pool and building exterior, alternate angle", category: "exterior" },

  { id: "staff-portrait", src: "/media/staff-portrait.webp", alt: "Fig Tree team member", category: "amenities" },
];

export function getMediaByCategory(category: MediaCategory | "all"): MediaItem[] {
  if (category === "all") return mediaLibrary;
  return mediaLibrary.filter((m) => m.category === category);
}
