"use client";

import Image from "next/image";
import { media } from "@/lib/v2/media";
import { gym } from "@/lib/v2/copy";
import { Reveal } from "@/components/v2/primitives/reveal";
import { CanopyFrame } from "@/components/v2/primitives/canopy-frame";
import { BranchShadow } from "@/components/v2/primitives/branch-shadow";

/**
 * Gym.
 *
 * A single, static frame — per 04_COMPONENT_LIBRARY.md / 10_HIGGSFIELD_PREP.md,
 * amenity sections are low priority for motion and high priority for accuracy.
 * The photograph itself was inherited under the filename
 * "dining/rooftop-dining-dusk.jpg"; it is, in fact, the only gym photograph in
 * the entire asset library (see docs/PHOTO_USAGE_REPORT.md).
 */
export function Gym() {
  const img = media("gym");

  return (
    <section id="gym" className="relative isolate overflow-hidden bg-(--ft-abyss) py-[clamp(6rem,14vh,11rem)]">
      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="type-label flex items-center gap-4 text-(--ft-verdigris)">
                <span className="h-px w-8 bg-(--ft-verdigris)/40" />
                {gym.label}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="type-headline mt-7 text-(--ft-cream)">{gym.headline}</h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="type-body mt-7 max-w-[38ch] text-pretty text-(--ft-cream)/55">{gym.body}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal y={40}>
              <figure className="group relative" data-cursor="view" data-cursor-label="The gym">
                <CanopyFrame variant="wide" hairlineOpacity={0.14} className="aspect-[4/3] w-full bg-(--ft-canopy) lg:aspect-[3/2]">
                  <Image
                    src={img.src}
                    alt={img.subject}
                    fill
                    sizes="(max-width: 1024px) 92vw, 56vw"
                    placeholder="blur"
                    blurDataURL={img.blurDataURL}
                    className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--ft-abyss) 55%, transparent) 100%)",
                    }}
                  />
                  <BranchShadow seed={19} intensity={0.16} />
                </CanopyFrame>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
