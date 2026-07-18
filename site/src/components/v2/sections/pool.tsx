"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media } from "@/lib/v2/media";
import { pool } from "@/lib/v2/copy";
import { Reveal, RevealGroup, RevealItem } from "@/components/v2/primitives/reveal";
import { LuxuryVideo } from "@/components/v2/primitives/luxury-video";

/**
 * 05 — Pool & wellness. The page's one full-bleed moment.
 *
 * It gets to be the full-bleed one because water can afford it: the source is
 * 1024px and a 1440+ viewport is a real upscale, but open water and sky are
 * smooth gradients with no fine detail to lose, so they hold up where a room
 * interior or a face would visibly fall apart. Grain and a firm grade cover the
 * rest. This is the only place on the page where a photograph is drawn past its
 * native size, and it's a deliberate choice, not an oversight.
 */
export function Pool() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  const img = media("pool-wide");

  return (
    <section ref={ref} className="relative isolate">
      {/* Cinematic band */}
      <div className="grain vignette relative h-[clamp(420px,78vh,760px)] w-full overflow-hidden bg-(--ft-abyss)">
        <motion.div style={{ y: reduced ? 0 : y, scale: reduced ? 1 : scale }} className="absolute inset-[-8%]">
          <LuxuryVideo
            src="/media/video/pool.mp4"
            poster={{ src: img.src, blurDataURL: img.blurDataURL }}
            alt={img.subject}
            sizes="100vw"
            className="absolute inset-0"
            filterStyle={{ filter: "saturate(0.82) contrast(1.06) brightness(0.82)" }}
          />
        </motion.div>

        {/* Grade toward the brand's water rather than the photograph's chlorine blue */}
        <div aria-hidden className="absolute inset-0 bg-(--ft-canopy)/28 mix-blend-color" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--ft-abyss) 70%, transparent) 0%, transparent 38%, transparent 58%, color-mix(in srgb, var(--ft-abyss) 82%, transparent) 100%)",
          }}
        />

        <div className="shell relative z-[2] flex h-full flex-col justify-center">
          <div className="max-w-[34ch]">
            <Reveal>
              <p className="type-label text-(--ft-verdigris)">{pool.label}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="type-headline mt-6 text-(--ft-cream) [text-shadow:0_2px_30px_rgba(4,18,15,0.55)]">
                {pool.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="type-body mt-7 text-pretty text-(--ft-cream)/70 [text-shadow:0_1px_16px_rgba(4,18,15,0.6)]">
                {pool.body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Amenity ledger */}
      <div className="bg-(--ft-abyss) pb-[clamp(4rem,10vh,8rem)]">
        <div className="shell">
          <RevealGroup className="grid grid-cols-1 border-t border-(--ft-sage)/12 sm:grid-cols-2 lg:grid-cols-4">
            {pool.items.map((item, i) => (
              <RevealItem
                key={item.name}
                className={`border-(--ft-sage)/12 py-8 lg:px-8 ${i > 0 ? "border-t sm:border-t-0 lg:border-l" : ""} ${i === 1 ? "sm:border-l" : ""} ${i === 2 ? "sm:border-t" : ""} ${i === 3 ? "sm:border-t sm:border-l" : ""}`}
              >
                <p className="font-display text-[1.375rem] leading-tight font-light text-(--ft-cream)">{item.name}</p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed font-light text-(--ft-cream)/55">{item.note}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
