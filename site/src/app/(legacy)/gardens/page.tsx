import type { Metadata } from "next";
import { Button } from "@/components/primitives/button";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { ScrollParallax } from "@/components/primitives/scroll-parallax";
import { Reveal } from "@/components/primitives/reveal";
import { RingCursorZone } from "@/components/primitives/ring-cursor";
import { gardensCopy } from "@/lib/content/copy";

export const metadata: Metadata = {
  title: "The Gardens",
  description: "A living wall, mature trees, and rattan garden seating — the slowest, quietest part of Fig Tree Residences.",
};

/** design/04_COMPONENT_LIBRARY.md Section 6 — the one component where the absence of interaction is itself the point. */
export default function GardensPage() {
  return (
    <>
      <RingCursorZone label="Explore" className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
        <ScrollParallax className="absolute inset-0" speed={0.2}>
          <div className="relative h-[calc(85vh+160px)] min-h-[680px] -mt-[80px] w-full">
            <ImageWithFallback
              src="/images/gardens/garden-living-wall.jpg"
              alt="Living wall of tropical greenery in the garden"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </ScrollParallax>
      </RingCursorZone>

      <Reveal extended className="py-(--space-5xl) text-center">
        <p className="font-display italic text-2xl lg:text-4xl max-w-2xl mx-auto px-6">
          {gardensCopy.body}
        </p>
      </Reveal>

      <div className="relative h-[60vh] min-h-[400px] w-full">
        <ImageWithFallback
          src="/images/gardens/garden-rattan-seating.jpg"
          alt="Rattan garden seating beneath mature trees"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="flex justify-center gap-4 py-(--space-4xl)">
        <Button href="/amenities" variant="secondary">Explore Amenities</Button>
        <Button href="/booking">Check Rates</Button>
      </div>
    </>
  );
}
