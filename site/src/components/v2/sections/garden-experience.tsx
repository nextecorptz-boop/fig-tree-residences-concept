"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media } from "@/lib/v2/media";
import { canopyPath } from "@/lib/v2/tree";
import { garden } from "@/lib/v2/copy";
import { Reveal } from "@/components/v2/primitives/reveal";
import { CanopyFrame } from "@/components/v2/primitives/canopy-frame";
import { BranchShadow } from "@/components/v2/primitives/branch-shadow";

/**
 * Canopy shadows, drifting.
 *
 * These were leaf cut-outs. Even large and blurred, a leaf silhouette is a
 * literal object floating in a section about stillness — you read it as a
 * graphic that someone placed. A crown, blurred past recognition, reads as
 * shade moving across a wall, which is what a garden actually does at four in
 * the afternoon.
 *
 * Positions are hand-placed so they hang in the margins and never cross type.
 */
const SHADOWS = [
  { x: "-4%", y: "6%", w: 34, h: 26, d: 0, dur: 19, o: 0.085, blur: 26, phase: 0.6 },
  { x: "78%", y: "14%", w: 42, h: 30, d: 3.5, dur: 24, o: 0.07, blur: 34, phase: 2.4 },
  { x: "4%", y: "62%", w: 26, h: 20, d: 1.6, dur: 17, o: 0.075, blur: 20, phase: 4.1 },
  { x: "70%", y: "70%", w: 36, h: 26, d: 4.8, dur: 22, o: 0.06, blur: 30, phase: 1.7 },
  { x: "40%", y: "-4%", w: 30, h: 22, d: 6.2, dur: 27, o: 0.045, blur: 38, phase: 3.3 },
];

/**
 * 04 — The garden experience.
 *
 * The slowest thing on the page, deliberately: this section's whole job is to
 * lower the heart rate, so it gets the longest parallax throw and the softest
 * light. Two photographs on opposing parallax with a pull-quote between them.
 */
export function GardenExperience() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const leftY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-10%", "14%"]);
  const lightO = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]);
  // The slowest section on the page keeps the smallest scale throw — the
  // garden should feel like it's settling, not zooming.
  const gentleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.03, 1, 1.03]);

  const lounge = media("garden-lounge");
  /**
   * The breakfast-tray shot was the obvious candidate here and is out on
   * purpose: its table is dressed in a vivid blue-and-magenta cloth that
   * dominates the frame and fights every other colour on the page. It couldn't
   * be cropped out either — in a portrait frame on a landscape source, only the
   * horizontal object-position does anything, and the cloth spans the full
   * width. It's worth reshooting on plain linen; it isn't worth this section.
   *
   * The pool glimpsed through the trees does the job better anyway: it earns the
   * full-bleed pool that follows, so the water is a promise before it's a place.
   */
  const glimpse = media("pool-through-trees");

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-(--ft-abyss) py-[clamp(7rem,18vh,14rem)]"
    >
      {/* Dappled light through the canopy */}
      <motion.div
        aria-hidden
        style={{ opacity: reduced ? 0.35 : lightO }}
        className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(28% 20% at 18% 22%, color-mix(in srgb, var(--ft-verdigris) 30%, transparent), transparent 70%), radial-gradient(24% 18% at 82% 62%, color-mix(in srgb, var(--ft-gold) 16%, transparent), transparent 70%), radial-gradient(30% 24% at 54% 88%, color-mix(in srgb, var(--ft-teal) 20%, transparent), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Canopy shadows drifting, on the longest cycles anywhere on the site
          (17–27s). Wind through branches, not a carousel. */}
      {!reduced &&
        SHADOWS.map((s, i) => (
          <motion.svg
            key={i}
            aria-hidden
            focusable="false"
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -z-[5] text-(--ft-sage)"
            style={{
              left: s.x,
              top: s.y,
              width: `${s.w}vw`,
              height: `${s.h}vw`,
              opacity: s.o,
              filter: `blur(${s.blur}px)`,
            }}
            animate={{ y: [0, -16, 0], x: [0, 10, 0], rotate: [0, 1.6, 0] }}
            transition={{ duration: s.dur, delay: s.d, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d={canopyPath({ crown: 0.62, amp: 0.1, phase: s.phase })} fill="currentColor" />
          </motion.svg>
        ))}

      <div className="shell relative">
        <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          {/* Left image, hung high */}
          <div className="lg:col-span-4">
            <Reveal y={40}>
              <motion.figure style={{ y: reduced ? 0 : leftY }} data-cursor="view" data-cursor-label="Garden lounge">
                <CanopyFrame variant="window" hairlineOpacity={0.12} className="group aspect-[4/5] w-full bg-(--ft-canopy)">
                  <motion.div className="absolute inset-[-5%]" style={{ scale: reduced ? 1 : gentleScale }}>
                    <Image
                      src={lounge.src}
                      alt={lounge.subject}
                      fill
                      sizes="(max-width: 1024px) 92vw, 30vw"
                      placeholder="blur"
                      blurDataURL={lounge.blurDataURL}
                      className="object-cover"
                      style={{ filter: "saturate(0.9) brightness(0.92)" }}
                    />
                  </motion.div>
                  <BranchShadow seed={31} intensity={0.18} />
                </CanopyFrame>
              </motion.figure>
            </Reveal>
          </div>

          {/* Centre text */}
          <div className="text-center lg:col-span-4 lg:px-4">
            <Reveal>
              <p className="type-label text-(--ft-verdigris)">{garden.label}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="type-headline mt-6 text-(--ft-cream) [&>em]:text-(--ft-verdigris)">
                {garden.headline.split("\n").map((l, i) => (
                  <span key={i} className="block">
                    {i === 1 ? <em>{l}</em> : l}
                  </span>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="type-body mx-auto mt-8 max-w-[38ch] text-pretty text-(--ft-cream)/55">{garden.body}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-display mt-10 text-[clamp(1.5rem,2vw,1.875rem)] leading-snug font-light text-(--ft-sage) italic">
                {garden.pull}
              </p>
            </Reveal>
          </div>

          {/* Right image, hung low */}
          <div className="lg:col-span-4">
            <Reveal y={40} delay={0.1}>
              <motion.figure style={{ y: reduced ? 0 : rightY }} data-cursor="view" data-cursor-label="Through the trees">
                <CanopyFrame variant="root" hairlineOpacity={0.12} className="group aspect-[4/5] w-full bg-(--ft-canopy)">
                  <motion.div className="absolute inset-[-5%]" style={{ scale: reduced ? 1 : gentleScale }}>
                    <Image
                      src={glimpse.src}
                      alt={glimpse.subject}
                      fill
                      sizes="(max-width: 1024px) 92vw, 30vw"
                      placeholder="blur"
                      blurDataURL={glimpse.blurDataURL}
                      className="object-cover object-[38%_center]"
                      style={{ filter: "saturate(0.85) brightness(0.9)" }}
                    />
                  </motion.div>
                  <BranchShadow seed={47} intensity={0.18} />
                </CanopyFrame>
              </motion.figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
