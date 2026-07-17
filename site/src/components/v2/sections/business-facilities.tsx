"use client";

import { businessFacilities } from "@/lib/v2/copy";
import { Reveal } from "@/components/v2/primitives/reveal";
import { BranchDivider } from "@/components/v2/primitives/branch-divider";

/**
 * Business facilities.
 *
 * The brochure lists a small private meeting room as an amenity
 * (docs/CONTENT_DATABASE.md), and docs/ASSET_INVENTORY.md is explicit that no
 * photograph of it exists anywhere in the project — "no photography of the
 * conference room the brochure lists as an amenity." Per this phase's own
 * instruction not to invent architecture, this section stays text-only rather
 * than pairing the copy with a stand-in image of some other room. Swap this
 * for a real photograph the moment one exists.
 */
export function BusinessFacilities() {
  return (
    <section id="business-facilities" className="relative isolate bg-(--ft-abyss) py-[clamp(5rem,12vh,9rem)]">
      <div className="shell">
        <div className="mx-auto max-w-[52ch] text-center">
          <Reveal>
            <p className="type-label flex items-center justify-center gap-4 text-(--ft-verdigris)">
              <span className="h-px w-8 bg-(--ft-verdigris)/40" />
              {businessFacilities.label}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="type-headline mt-6 text-(--ft-cream)">{businessFacilities.headline}</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="type-body mt-7 text-pretty text-(--ft-cream)/55">{businessFacilities.body}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="type-label mt-8 text-(--ft-cream)/35 italic">{businessFacilities.note}</p>
          </Reveal>
        </div>
        <div className="mt-12">
          <BranchDivider seed={41} color="var(--ft-sage)" />
        </div>
      </div>
    </section>
  );
}
