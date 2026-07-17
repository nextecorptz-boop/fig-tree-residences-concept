"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media } from "@/lib/v2/media";
import { welcome } from "@/lib/v2/copy";
import { Reveal, RevealGroup, RevealItem } from "@/components/v2/primitives/reveal";
import { CanopyFrame } from "@/components/v2/primitives/canopy-frame";
import { BranchShadow } from "@/components/v2/primitives/branch-shadow";
import { BranchDivider } from "@/components/v2/primitives/branch-divider";
import { Tracery } from "@/components/v2/primitives/tracery";

/**
 * 02 — Welcome to the Garden.
 *
 * Cream, wide margins, and a single photograph carried on a slow parallax. The
 * building shot lives here rather than in the hero: it says "residence", which
 * is the second thing to say, not the first.
 */
export function Welcome() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  const facade = media("facade-tree");
  const [l1, l2] = welcome.headline.split("\n");

  return (
    <section
      ref={ref}
      id="garden"
      className="relative overflow-hidden bg-(--ft-cream) py-[clamp(6rem,14vh,11rem)]"
    >
      {/* Branch structure in the margin, at 4%. Was an oversized leaf cut-out;
          a silhouette that size is a decal no matter how low you take the
          opacity. Line art recedes into the paper instead. */}
      <Tracery
        variant="branch"
        seed={23}
        opacity={0.04}
        color="var(--ft-emerald)"
        className="-right-[10%] top-[2%] h-[clamp(320px,46vw,620px)] w-[clamp(320px,46vw,620px)]"
      />

      <div className="shell relative">
        <div className="grid grid-cols-1 items-start gap-y-14 lg:grid-cols-12 lg:gap-x-12">
          {/* Text */}
          <div className="lg:col-span-6 lg:pt-10">
            <Reveal>
              <p className="type-label flex items-center gap-4 text-(--ft-emerald)">
                <span className="h-px w-10 bg-(--ft-emerald)/40" />
                {welcome.label}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="type-headline mt-7 text-(--ft-ink)">
                {l1}
                <br />
                <em className="text-(--ft-emerald)">{l2}</em>
              </h2>
            </Reveal>

            <div className="mt-9 max-w-[46ch] space-y-6">
              {welcome.body.map((p, i) => (
                <Reveal key={i} delay={0.14 + i * 0.06}>
                  <p className="type-body text-pretty text-(--text-muted)">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Image, hung slightly low and off the text baseline */}
          <div className="lg:col-span-6 lg:pl-8">
            <Reveal y={40}>
              <figure className="group relative" data-cursor="view" data-cursor-label="The residence">
                <CanopyFrame
                  variant="root"
                  hairline="var(--ft-stone)"
                  hairlineOpacity={0.4}
                  className="aspect-[4/5] w-full bg-(--ft-travertine) sm:aspect-[5/6]"
                >
                  <motion.div style={{ y: reduced ? 0 : imgY }} className="absolute inset-[-7%]">
                    <Image
                      src={facade.src}
                      alt="The Fig Tree Residences building, its teal façade seen through the canopy of the mature tree the property is named for."
                      fill
                      sizes="(max-width: 1024px) 92vw, 560px"
                      placeholder="blur"
                      blurDataURL={facade.blurDataURL}
                      className="object-cover object-[60%_center] transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
                    />
                  </motion.div>
                  <BranchShadow />
                </CanopyFrame>
                <figcaption className="type-label mt-4 flex items-center justify-between text-[0.5625rem] text-(--text-muted)">
                  <span>13 Yacht Club Road</span>
                  <span className="text-(--text-caption)">Msasani Peninsula</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* Facts. Every number is the property's own published claim. */}
        <div className="mt-[clamp(4rem,9vh,7rem)] -mb-[10px]">
          <BranchDivider seed={3} color="var(--ft-emerald)" />
        </div>
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4">
          {welcome.stats.map((s, i) => (
            <RevealItem
              key={s.label}
              className={`border-(--hairline) px-1 py-8 lg:px-8 ${i % 2 === 1 ? "border-l" : ""} lg:border-l lg:first:border-l-0 ${i < 2 ? "border-b lg:border-b-0" : ""}`}
            >
              <p className="font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-none font-light text-(--ft-emerald)">
                {s.value}
              </p>
              <p className="type-label mt-3 text-[0.5625rem] text-(--text-muted)">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
