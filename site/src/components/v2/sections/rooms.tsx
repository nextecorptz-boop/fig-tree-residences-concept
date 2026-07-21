"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media, type MediaKey } from "@/lib/v2/media";
import { rooms } from "@/lib/v2/copy";
import { Reveal, RevealGroup, RevealItem } from "@/components/v2/primitives/reveal";
import { CanopyFrame } from "@/components/v2/primitives/canopy-frame";
import { BranchShadow } from "@/components/v2/primitives/branch-shadow";
import { BranchDivider } from "@/components/v2/primitives/branch-divider";

/**
 * 03 — The apartments.
 *
 * Canopy-framed residence cards in an intentional 2-column layout, each
 * linking directly to its verified room detail experience.
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

        {/* 2-Card Editorial Layout */}
        <div className="mt-[clamp(3rem,7vh,5rem)] grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {rooms.cards.map((card, i) => (
            <RoomCard
              key={card.slug}
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
  card: { key: MediaKey; name: string; note: string; href: string; slug: string };
  index: number;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const img = media(card.key);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.03, 1, 1.03]);

  return (
    <Reveal delay={index * 0.12} y={36}>
      <Link
        href={card.href}
        className="group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ft-verdigris) focus-visible:ring-offset-4 focus-visible:ring-offset-(--ft-forest) rounded-sm"
        aria-label={`Explore ${card.name}`}
      >
        <motion.figure
          ref={cardRef}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          animate={{ opacity: dimmed ? 0.5 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative cursor-pointer"
          data-cursor="view"
          data-cursor-label={card.name}
        >
          <CanopyFrame
            variant={index % 2 === 0 ? "window" : "root"}
            hairlineOpacity={0.16}
            className="aspect-[4/3] w-full bg-(--ft-canopy) sm:aspect-[16/11]"
          >
            <motion.div
              className="absolute inset-[-6%]"
              style={reduced ? undefined : { y: parallaxY, scale: scrollScale }}
            >
              <Image
                src={img.src}
                alt={img.subject}
                fill
                sizes="(max-width: 768px) 92vw, 46vw"
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
              />
            </motion.div>
            <div
              aria-hidden
              className="absolute inset-0 transition-opacity duration-700 ease-in-out group-hover:opacity-85"
              style={{
                background:
                  "linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--ft-abyss) 92%, transparent) 100%)",
              }}
            />
            <BranchShadow seed={index * 13 + 5} intensity={0.25} />

            <div className="absolute inset-x-0 bottom-0 z-10 p-6 lg:p-8">
              <p className="font-display text-[1.5rem] leading-tight font-light text-(--ft-cream) lg:text-[1.85rem]">
                {card.name}
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed font-light text-(--ft-cream)/70 max-w-[42ch]">
                {card.note}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[0.8125rem] font-light text-(--ft-verdigris) transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                <span className="tracking-wide">Explore residence</span>
                <span aria-hidden className="text-[0.9375rem]">→</span>
              </div>
            </div>
          </CanopyFrame>
        </motion.figure>
      </Link>
    </Reveal>
  );
}
