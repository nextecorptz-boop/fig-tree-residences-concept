"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media, type MediaEntry } from "@/lib/v2/media";
import { reception } from "@/lib/v2/copy";
import { Reveal } from "@/components/v2/primitives/reveal";
import { CanopyFrame } from "@/components/v2/primitives/canopy-frame";
import { LuxuryVideo } from "@/components/v2/primitives/luxury-video";
import { BranchShadow } from "@/components/v2/primitives/branch-shadow";

/**
 * Reception.
 *
 * Two frames from the same room — the desk and the lounge seating — pulled from
 * numbered JPEGs the inherited library never labelled as reception at all
 * (195248625.jpg, 159693170.jpg). Both frames include two framed portraits of
 * Tanzanian public figures on the wall; per docs/BRAND_INTELLIGENCE.md this is a
 * deliberate styling decision for the property, not an artifact, so the crop
 * leaves them in rather than staging around them.
 */
export function Reception() {
  const desk = media("reception-desk");
  const lounge = media("reception-lounge");

  return (
    <section id="reception" className="relative isolate overflow-hidden bg-(--ft-forest) py-[clamp(6rem,14vh,11rem)]">
      <div className="shell">
        <div className="grid grid-cols-1 items-end gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="type-label flex items-center gap-4 text-(--ft-verdigris)">
                <span className="h-px w-8 bg-(--ft-verdigris)/40" />
                {reception.label}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="type-headline mt-7 text-(--ft-cream)">{reception.headline}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="type-body max-w-[42ch] text-pretty text-(--ft-cream)/55">{reception.body}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-[clamp(3rem,7vh,5rem)] grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            { img: desk, label: "The desk", cursor: "The desk", video: "/media/video/reception.mp4" },
            { img: lounge, label: "The lounge", cursor: "The lounge", video: undefined },
          ].map(({ img, label, cursor, video }, i) => (
            <Reveal key={label} delay={i * 0.08} y={36}>
              <ReceptionCard img={img} label={label} cursor={cursor} video={video} variant={i === 0 ? "window" : "root"} seed={i * 23 + 11} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * A single reception frame with a subtle scroll-linked drift and zoom on the
 * photograph — matching the treatment given to the large room images
 * elsewhere on the page, so Reception doesn't feel static by comparison.
 */
function ReceptionCard({
  img,
  label,
  cursor,
  video,
  variant,
  seed,
}: {
  img: MediaEntry & { src: string };
  label: string;
  cursor: string;
  video?: string;
  variant: "window" | "root";
  seed: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <figure ref={ref} className="group relative" data-cursor="view" data-cursor-label={cursor}>
      <CanopyFrame variant={variant} hairlineOpacity={0.14} className="aspect-[4/3] w-full bg-(--ft-canopy)">
        <motion.div className="absolute inset-[-6%]" style={reduced ? undefined : { y, scale }}>
          {video ? (
            <LuxuryVideo
              src={video}
              poster={{ src: img.src, blurDataURL: img.blurDataURL }}
              alt={img.subject}
              sizes="(max-width: 640px) 92vw, 46vw"
              className="absolute inset-0"
              mediaClassName="transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
            />
          ) : (
            <Image
              src={img.src}
              alt={img.subject}
              fill
              sizes="(max-width: 640px) 92vw, 46vw"
              placeholder="blur"
              blurDataURL={img.blurDataURL}
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
            />
          )}
        </motion.div>
        <BranchShadow seed={seed} intensity={0.16} />
        <div className="absolute inset-x-0 bottom-0 z-10 p-5">
          <p className="font-display text-[1.125rem] leading-tight font-light text-(--ft-cream)">{label}</p>
        </div>
      </CanopyFrame>
    </figure>
  );
}
