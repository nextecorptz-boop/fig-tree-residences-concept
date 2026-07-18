"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media } from "@/lib/v2/media";
import { hero } from "@/lib/v2/copy";
import { RevealLines } from "@/components/v2/primitives/reveal";
import { CanopyFrame } from "@/components/v2/primitives/canopy-frame";
import { LuxuryVideo } from "@/components/v2/primitives/luxury-video";
import { Tracery } from "@/components/v2/primitives/tracery";
import { BookingBar } from "@/components/v2/sections/booking-bar";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 01 — The arrival.
 *
 * Type left, doorway right, divided by a single hairline. Asymmetric on purpose:
 * a centred stack of eyebrow-headline-standfirst-image is the house style of
 * every hotel template on the internet, and the whole point here is to not read
 * as one. It also puts every word on the dark ground where it's actually legible
 * rather than floating over a busy green wall.
 *
 * The arch is the property's own shape — its rooms have arched, palm-carved
 * headboards — and recurs as the frame for photography down the page.
 *
 * On the brief's "large looping video": there is no footage of this property, of
 * any kind. This is the best still under a 26s push. The frame is shaped so a
 * real plate drops in later without a redesign.
 *
 * The frame is load-bearing in a second way. Every photograph in the library
 * tops out at ~1024px, so a full-bleed hero would be a 2.5x upscale on a large
 * display and look it. At ~460px the image draws near its native size and stays
 * sharp. The constraint picked the composition, and the composition is better.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const archY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const archScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const img = media("garden-living-wall");

  return (
    <section
      ref={ref}
      className="relative grain isolate h-[100svh] min-h-[640px] overflow-hidden bg-(--ft-abyss)"
    >
      {/* Ground */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(80% 60% at 72% 100%, color-mix(in srgb, var(--ft-canopy) 70%, transparent) 0%, transparent 68%), linear-gradient(165deg, var(--ft-abyss) 0%, var(--ft-forest) 62%, var(--ft-abyss) 100%)",
        }}
      />

      {/* Mobile: the canopy composition needs two columns it doesn't have here,
          so the garden goes full-bleed behind the type instead. No loss of sharpness
          either — at 390px wide the 1024px source is finally being downscaled. */}
      <div aria-hidden className="absolute inset-0 -z-[15] lg:hidden">
        <LuxuryVideo
          src="/media/video/homepage-hero.mp4"
          poster={{ src: img.src, blurDataURL: img.blurDataURL }}
          alt=""
          priority
          sizes="100vw"
          className="absolute inset-0"
          filterStyle={{ filter: "saturate(0.85) brightness(0.7)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--ft-abyss) 88%, transparent) 0%, color-mix(in srgb, var(--ft-abyss) 62%, transparent) 42%, color-mix(in srgb, var(--ft-abyss) 92%, transparent) 100%)",
          }}
        />
      </div>

      <div className="shell relative z-10 grid h-full grid-cols-1 items-end gap-y-8 lg:grid-cols-12 lg:gap-x-10">
        {/* ---- Type column ---- */}
        <motion.div
          style={{ y: reduced ? 0 : typeY, opacity: reduced ? 1 : fade }}
          className="relative z-10 col-span-1 flex h-full flex-col justify-center pt-24 pb-28 lg:col-span-7 lg:pt-0 lg:pb-14"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            className="type-label flex items-center gap-4 text-(--ft-sage)"
          >
            <span className="h-px w-8 bg-(--ft-sage)/40" />
            {hero.eyebrow}
          </motion.p>

          <h1 className="type-display mt-7 text-(--ft-cream)">
            <RevealLines lines={[hero.line1, hero.line2]} delay={0.45} lineClassName="[&:nth-child(2)]:italic [&:nth-child(2)]:pl-[0.09em]" />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.05, ease: EASE }}
            className="type-body mt-8 max-w-[44ch] text-pretty text-(--ft-cream)/58"
          >
            {hero.standfirst}
          </motion.p>

          <motion.figure
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.35, ease: EASE }}
            className="mt-10 hidden max-w-[30ch] border-l border-(--ft-sage)/22 pl-5 lg:block"
          >
            <blockquote className="font-display text-[1.0625rem] leading-snug font-light text-(--ft-cream)/52 italic">
              &ldquo;{hero.quote}&rdquo;
            </blockquote>
            <figcaption className="type-label mt-2.5 text-[0.5rem] text-(--ft-sage)/72">
              {hero.quoteAttribution}
            </figcaption>
          </motion.figure>
        </motion.div>

        {/* ---- The doorway ---- */}
        <div className="relative col-span-1 hidden h-full lg:col-span-5 lg:block">
          {/* The dividing hairline — architectural, and it does the work the
              empty space can't do on its own. It doubles as the scroll cue: a
              light travels down it, which says "keep going" without another
              label competing for the corner. */}
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.8, delay: 0.6, ease: EASE }}
            className="absolute -left-5 top-0 h-full w-px origin-top overflow-hidden bg-gradient-to-b from-transparent via-(--ft-sage)/18 to-(--ft-sage)/8"
          >
            <motion.span
              className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-(--ft-verdigris) to-transparent"
              animate={reduced ? {} : { y: ["-100%", "900%"] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2, delay: 2.4 }}
            />
          </motion.span>

          <motion.div
            style={{ y: reduced ? 0 : archY }}
            className="absolute right-0 bottom-0 h-[78svh] w-[clamp(300px,32vw,460px)]"
          >
            {/* The reveal wipe lives on this wrapper, not on the frame itself:
                two clip-paths can't share an element, and an inset() would
                simply replace the canopy with a rectangle. */}
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.9, delay: 0.35, ease: EASE }}
              className="relative h-full w-full"
            >
            {/* The doorway is the crown of the tree. A border-radius can only
                draw an arc; this silhouette is lobed and off-symmetric. */}
            <CanopyFrame variant="crown" className="h-full w-full">
              <motion.div className="absolute inset-0" style={{ scale: reduced ? 1 : archScale }}>
                <LuxuryVideo
                  src="/media/video/homepage-hero.mp4"
                  poster={{ src: img.src, blurDataURL: img.blurDataURL }}
                  alt=""
                  priority
                  sizes="480px"
                  className="absolute inset-0"
                  filterStyle={{ filter: "saturate(0.88) contrast(1.04) brightness(0.94)" }}
                />
              </motion.div>
              {/* Seat it into the ground rather than letting it stop dead. */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, color-mix(in srgb, var(--ft-abyss) 30%, transparent) 0%, transparent 26%, transparent 62%, color-mix(in srgb, var(--ft-abyss) 55%, transparent) 100%)",
                }}
              />
              <div aria-hidden className="absolute inset-0 bg-(--ft-emerald)/12 mix-blend-color" />
            </CanopyFrame>
            </motion.div>

            {/* Magazine caption */}
            <motion.figcaption
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.6, ease: EASE }}
              className="type-label absolute top-1/2 -left-9 origin-center -translate-y-1/2 rotate-180 text-[0.5rem] whitespace-nowrap text-(--ft-sage)/72 [writing-mode:vertical-rl]"
            >
              The living wall · North garden
            </motion.figcaption>
          </motion.div>
        </div>
      </div>

      {/* Branch structure in the empty left margin, at 3%. */}
      <Tracery
        variant="branch"
        seed={11}
        opacity={0.03}
        color="var(--ft-sage)"
        className="-left-[6%] bottom-0 h-[62svh] w-[38vw] xl:left-[-2%]"
      />

      {/* Light pooling at the foot of the doorway */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6vw] bottom-0 -z-10 h-[22svh] w-[min(46vw,560px)] blur-3xl"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, color-mix(in srgb, var(--ft-verdigris) 22%, transparent), transparent 70%)",
        }}
      />

      {/* Enquiry, on the dark ground where glass actually reads */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <BookingBar />
      </div>

    </section>
  );
}
