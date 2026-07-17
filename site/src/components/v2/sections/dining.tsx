"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media } from "@/lib/v2/media";
import { dining } from "@/lib/v2/copy";
import { Reveal } from "@/components/v2/primitives/reveal";
import { CanopyFrame } from "@/components/v2/primitives/canopy-frame";
import { BranchShadow } from "@/components/v2/primitives/branch-shadow";

/**
 * 06 — Dining at sunset.
 *
 * This uses the single best photograph the property owns: the rooftop at golden
 * hour, string lights, terracotta, the sun coming through the canopy. It was
 * filed in the inherited tree as "gardens/garden-living-wall.jpg", which is how
 * close it came to never being used at all.
 *
 * The one warm section on an otherwise green page — the palette turns to gold
 * and terracotta here and nowhere else, which is what makes six o'clock feel
 * like an event.
 */
export function Dining() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.5, 0.15]);

  const img = media("rooftop-sunset");

  return (
    <section
      id="dining"
      ref={ref}
      className="relative isolate overflow-hidden bg-(--ft-abyss) py-[clamp(6rem,15vh,12rem)]"
    >
      {/* The sun, off-frame */}
      <motion.div
        aria-hidden
        style={{ opacity: reduced ? 0.3 : glow }}
        className="pointer-events-none absolute -top-[10%] right-[-10%] -z-10 h-[70vh] w-[70vw] blur-3xl"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--ft-sun) 26%, transparent), transparent 70%)",
          }}
        />
      </motion.div>

      <div className="shell relative">
        <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          {/* Text */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="type-label flex items-center gap-4 text-(--ft-gold)">
                <span className="h-px w-8 bg-(--ft-gold)/40" />
                {dining.label}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="type-headline mt-7 text-(--ft-cream)">
                The roof, <em className="text-(--ft-sun)">at six</em>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="type-lede mt-8 max-w-[36ch] text-pretty text-(--ft-cream)/62">{dining.body}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="type-body mt-7 max-w-[38ch] border-l border-(--ft-gold)/25 pl-5 text-pretty text-(--ft-cream)/55">
                {dining.detail}
              </p>
            </Reveal>
          </div>

          {/* Image — landscape, so it gets the low wide crown: the proportion the
                signboard itself draws, broader than it is tall. */}
          <div className="lg:col-span-7">
            <Reveal y={40}>
              <figure className="group relative" data-cursor="view" data-cursor-label="The rooftop">
                <CanopyFrame variant="wide" hairline="var(--ft-gold)" hairlineOpacity={0.16} className="aspect-[4/3] w-full bg-(--ft-canopy) lg:aspect-[3/2]">
                  <motion.div style={{ y: reduced ? 0 : imgY }} className="absolute inset-[-6%]">
                    <Image
                      src={img.src}
                      alt="The rooftop terrace at sunset, string lights strung between the canopy and the bay beyond."
                      fill
                      sizes="(max-width: 1024px) 92vw, 56vw"
                      placeholder="blur"
                      blurDataURL={img.blurDataURL}
                      className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
                      style={{ filter: "saturate(1.02) contrast(1.04)" }}
                    />
                  </motion.div>
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--ft-abyss) 62%, transparent) 100%)",
                    }}
                  />
                  <BranchShadow seed={67} intensity={0.16} />
                </CanopyFrame>
                <figcaption className="type-label mt-4 flex items-center justify-between text-[0.5rem] text-(--ft-sage)/72">
                  <span>The rooftop restaurant &amp; bar</span>
                  <span>Overlooking Leopard Cove Bay</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
