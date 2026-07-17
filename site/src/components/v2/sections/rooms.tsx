"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { media, type MediaKey } from "@/lib/v2/media";
import { rooms } from "@/lib/v2/copy";
import { Reveal, RevealGroup, RevealItem } from "@/components/v2/primitives/reveal";
import { CanopyFrame } from "@/components/v2/primitives/canopy-frame";
import { BranchShadow } from "@/components/v2/primitives/branch-shadow";
import { BranchDivider } from "@/components/v2/primitives/branch-divider";

/**
 * 03 — The apartments.
 *
 * Canopy-framed cards in a row, each opening on hover — the same crown as the
 * hero's doorway, alternating silhouettes so no two are identical.
 *
 * These are not room *types*. The property sells ~24 units at a single 43 m²
 * spec and the library contains one clearly differentiated older room and two
 * newer arched-headboard rooms — not enough to honestly present four distinct
 * categories. So the cards are framed as views of one apartment rather than as
 * a menu to choose from, which is also what the brochure actually claims.
 */
export function Rooms() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="apartments" className="relative overflow-hidden bg-(--ft-forest) py-[clamp(6rem,14vh,11rem)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, var(--ft-forest) 0%, var(--ft-abyss) 100%)" }}
      />

      <div className="shell">
        <div className="grid grid-cols-1 items-end gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="type-label flex items-center gap-4 text-(--ft-verdigris)">
                <span className="h-px w-8 bg-(--ft-verdigris)/40" />
                {rooms.label}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="type-headline mt-7 text-(--ft-cream)">{rooms.headline}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="type-body max-w-[42ch] text-pretty text-(--ft-cream)/55">{rooms.standfirst}</p>
            </Reveal>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-[clamp(3rem,7vh,5rem)] grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {rooms.cards.map((card, i) => (
            <RoomCard
              key={card.key}
              card={card}
              index={i}
              dimmed={active !== null && active !== i}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>

        {/* The brochure's feature list, set as a specimen rather than a bullet list */}
        <div className="mt-[clamp(3.5rem,8vh,6rem)]">
          <BranchDivider seed={8} color="var(--ft-sage)" />
        </div>
        <RevealGroup className="grid grid-cols-1 gap-x-12 gap-y-0 pt-10 sm:grid-cols-2 lg:grid-cols-2">
          {rooms.features.map((f) => (
            <RevealItem key={f} y={12}>
              <p className="flex items-baseline gap-4 border-b border-(--ft-sage)/8 py-3.5 text-(--ft-cream)/70">
                <span className="type-label text-[0.5rem] text-(--ft-verdigris)/70">·</span>
                <span className="type-body text-[0.9375rem]">{f}</span>
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function RoomCard({
  card,
  index,
  dimmed,
  onEnter,
  onLeave,
}: {
  card: { key: MediaKey; name: string; note: string };
  index: number;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const img = media(card.key);

  return (
    <Reveal delay={index * 0.07} y={36}>
      <motion.figure
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        animate={{ opacity: dimmed ? 0.42 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative cursor-pointer"
        data-cursor="view"
        data-cursor-label={card.name}
      >
        {/* Alternating crowns and seeds — four cards, four silhouettes, so a row
            of frames reads as four views of one tree rather than one shape
            stamped out four times. */}
        <CanopyFrame
          variant={index % 2 === 0 ? "window" : "root"}
          hairlineOpacity={0.14}
          className="aspect-[3/4] w-full bg-(--ft-canopy)"
        >
          <Image
            src={img.src}
            alt={img.subject}
            fill
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 46vw, 22vw"
            placeholder="blur"
            blurDataURL={img.blurDataURL}
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
          />
          <div
            aria-hidden
            className="absolute inset-0 transition-opacity duration-700 ease-in-out group-hover:opacity-70"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, color-mix(in srgb, var(--ft-abyss) 88%, transparent) 100%)",
            }}
          />
          <BranchShadow seed={index * 13 + 5} intensity={0.2} />

          {/* The note rises on hover */}
          <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden p-5">
            <p className="font-display text-[1.25rem] leading-tight font-light text-(--ft-cream)">
              {card.name}
            </p>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
              <p className="overflow-hidden text-[0.8125rem] leading-relaxed font-light text-(--ft-cream)/0 transition-colors duration-700 group-hover:text-(--ft-cream)/70">
                <span className="block pt-2">{card.note}</span>
              </p>
            </div>
          </div>
        </CanopyFrame>
      </motion.figure>
    </Reveal>
  );
}
