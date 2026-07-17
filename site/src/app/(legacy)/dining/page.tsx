import type { Metadata } from "next";
import { Button } from "@/components/primitives/button";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { AmbientLoop } from "@/components/primitives/ambient-loop";
import { Reveal } from "@/components/primitives/reveal";
import { diningCopy } from "@/lib/content/copy";

export const metadata: Metadata = {
  title: "Rooftop Dining",
  description: "Dinner, or a sundowner, on the rooftop at Fig Tree Residences — string lights at dusk, over the bay and the Dar es Salaam Yacht Club.",
};

/** design/04_COMPONENT_LIBRARY.md Section 7 — the one component permitted the dusk register by default. */
export default function DiningPage() {
  return (
    <div className="surface-dusk">
      <AmbientLoop className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
        <ImageWithFallback
          src="/images/dining/rooftop-dining-dusk.jpg"
          alt="Rooftop restaurant at dusk with string lights, overlooking the bay"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-surface-dusk) via-transparent to-transparent" />
      </AmbientLoop>

      <Reveal className="py-(--space-4xl) text-center px-6">
        <p className="font-display text-2xl lg:text-4xl max-w-xl mx-auto text-(--color-text-inverse)">
          {diningCopy.body}
        </p>
      </Reveal>

      <div className="flex justify-center gap-4 pb-(--space-4xl)">
        <Button href="/booking">Check Rates</Button>
        <Button href="/contact" variant="secondary" className="border-white/40 text-(--color-text-inverse)">
          Contact Us
        </Button>
      </div>
    </div>
  );
}
