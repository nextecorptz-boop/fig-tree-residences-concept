import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { Reveal } from "@/components/primitives/reveal";
import { homeCopy } from "@/lib/content/copy";

/**
 * Section 7 — Departure/Footer Moment. The site's first-ever "I never want
 * to leave" touchpoint (website/04_SECTION_BLUEPRINT.md), closing the
 * emotional loop the Hero opened. Slow fade only, held longer (900ms) than
 * the default per website/06_ANIMATION_MAP.md's section-to-pattern map.
 */
export function DepartureMoment() {
  return (
    <div className="relative">
      <Reveal extended>
        <div className="relative h-[60vh] min-h-[420px] w-full">
          <ImageWithFallback
            src="/images/dining/rooftop-dining-sunset.jpg"
            alt="Rooftop at sunset, the last light over the bay"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--color-surface-dusk) via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 pb-16 px-6 text-center">
            <p className="font-display italic text-2xl lg:text-4xl text-(--color-text-inverse)">
              {homeCopy.departure.headline}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
