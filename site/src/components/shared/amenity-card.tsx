import { Car, Circle, Dumbbell, Leaf, Presentation, Shield, ShoppingBasket, Sunset, Waves, type LucideIcon } from "lucide-react";
import type { Amenity } from "@/lib/content/amenities";

/**
 * design/04_COMPONENT_LIBRARY.md Section 5 + design/08_ICONOGRAPHY.md.
 * Static — every fact visible at rest, no hover-to-reveal. Icon + visible
 * label always paired, never icon-only. Icons are imported individually
 * (not via a namespace import) so the bundle only carries what's used,
 * per website/09_PERFORMANCE_PLAN.md's bundle budget.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  waves: Waves,
  dumbbell: Dumbbell,
  leaf: Leaf,
  presentation: Presentation,
  sunset: Sunset,
  "shopping-basket": ShoppingBasket,
  car: Car,
  shield: Shield,
};

export function AmenityCard({ amenity }: { amenity: Amenity }) {
  const Icon = ICON_MAP[amenity.icon] ?? Circle;

  return (
    <div className="flex gap-4 items-start">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-(--radius-sm) bg-(--color-surface-raised) text-(--color-text-primary)">
        <Icon size={22} strokeWidth={1.5} aria-hidden />
      </span>
      <div>
        <h3 className="text-(length:--text-heading-3) font-semibold">{amenity.label}</h3>
        <p className="mt-1 text-(length:--text-body) text-(--color-text-muted)">{amenity.description}</p>
      </div>
    </div>
  );
}
