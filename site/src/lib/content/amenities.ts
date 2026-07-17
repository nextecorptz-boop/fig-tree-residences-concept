/**
 * Amenity copy rewritten from docs/CONTENT_DATABASE.md's brochure bullet
 * list per docs/09_COPY_DIRECTION.md (calm, specific, reassurance-framed —
 * never a bare hardware checklist) and design/08_ICONOGRAPHY.md (icon +
 * visible label pairs, never icon-only). Icon names reference the lucide
 * icon set per the iconography spec.
 */

export type Amenity = {
  id: string;
  label: string;
  description: string;
  icon: string;
  image?: string;
};

export const amenities: Amenity[] = [
  {
    id: "pool",
    label: "Swimming Pool",
    description: "A quiet lap in the morning, or a slow float through the afternoon heat — the pool sits at the garden's centre, not tucked behind it.",
    icon: "waves",
    image: "/images/amenities/pool-daylight.jpg",
  },
  {
    id: "gym",
    label: "Gym",
    description: "A full indoor and outdoor set-up for guests who keep their routine on the road, open at whatever hour suits your day.",
    icon: "dumbbell",
    image: "/images/amenities/gym-equipment.jpg",
  },
  {
    id: "gardens",
    label: "Gardens & BBQ",
    description: "Mature trees, quiet recesses, and a BBQ area for the evenings you'd rather not leave the residence at all.",
    icon: "leaf",
    image: "/images/gardens/garden-living-wall.jpg",
  },
  {
    id: "conference",
    label: "Conference Room",
    description: "A small, private room for the meetings that don't belong in a hotel lobby.",
    icon: "presentation",
  },
  {
    id: "rooftop",
    label: "Rooftop Restaurant & Bar",
    description: "Dinner, or a sundowner, over the bay and the Yacht Club — the property's own dusk light at its best.",
    icon: "sunset",
    image: "/images/dining/rooftop-dining-dusk.jpg",
  },
  {
    id: "shopping",
    label: "Shopping Concierge",
    description: "For guests who'd rather cook than dine out, a shopping service brings the groceries to your kitchenette.",
    icon: "shopping-basket",
  },
  {
    id: "parking",
    label: "Secured Parking",
    description: "On-site, monitored parking — one less thing to think about after a long drive in from the airport.",
    icon: "car",
  },
  {
    id: "security",
    label: "Quiet, Dependable Security",
    description: "Coded access to every residence, and a property watched around the clock — the kind of security that lets you exhale on arrival, not think about it again.",
    icon: "shield",
  },
];
