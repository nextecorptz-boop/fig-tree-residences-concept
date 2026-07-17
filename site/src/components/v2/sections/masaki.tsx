"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { masaki } from "@/lib/v2/copy";
import { Reveal } from "@/components/v2/primitives/reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 07 — Explore Masaki.
 *
 * An illustrated map, drawn rather than tiled. A real slippy map would be a
 * claim of survey accuracy this project can't back: the only coordinates on file
 * are flagged "approximate — confirm before shipping". A hand-drawn diagram is
 * honest about being a diagram, and it's the only version of this section that
 * can carry the brochure's own distances without implying a precision nobody has
 * verified.
 *
 * Every distance is the property's own published figure. Positions are
 * schematic — they show relationships, not survey coordinates.
 */
export function Masaki() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <section id="masaki" className="relative overflow-hidden bg-(--ft-cream) py-[clamp(6rem,14vh,11rem)]">
      <div className="shell">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="type-label flex items-center gap-4 text-(--ft-emerald)">
                <span className="h-px w-8 bg-(--ft-emerald)/40" />
                {masaki.label}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="type-headline mt-7 text-(--ft-ink)">{masaki.headline}</h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="type-body mt-7 max-w-[38ch] text-pretty text-(--text-muted)">{masaki.standfirst}</p>
            </Reveal>

            {/* The list is the accessible source of truth; the map is a view of it. */}
            <Reveal delay={0.2}>
              <ul className="mt-9 border-t border-(--hairline)">
                {masaki.places.map((p, i) => (
                  <li key={p.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(i)}
                      onBlur={() => setActive(null)}
                      data-cursor="link"
                      className={`flex w-full items-baseline justify-between gap-4 border-b border-(--hairline) py-3.5 text-left transition-colors duration-500 ${
                        active === i ? "text-(--ft-emerald)" : "text-(--ft-ink)"
                      }`}
                    >
                      <span className="type-body text-[0.9375rem]">{p.name}</span>
                      <span className="type-label shrink-0 text-[0.5625rem] text-(--text-caption)">{p.distance}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Map */}
          <div className="lg:col-span-8">
            <Reveal y={40}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-(--hairline) bg-(--ft-linen)">
                <svg viewBox="0 0 100 75" className="h-full w-full" role="img" aria-label="Illustrated map of the Msasani Peninsula showing Fig Tree Residences and nearby landmarks with their distances.">
                  <defs>
                    <pattern id="ft-water" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="4" stroke="var(--ft-pool)" strokeWidth="0.35" opacity="0.28" />
                    </pattern>
                  </defs>

                  {/* Bay */}
                  <path
                    d="M0 75 L0 46 Q 12 40 22 48 Q 30 55 26 66 Q 22 75 14 75 Z"
                    fill="url(#ft-water)"
                    stroke="var(--ft-pool)"
                    strokeWidth="0.3"
                    strokeOpacity="0.4"
                  />
                  <text x="7" y="69" fontSize="1.7" letterSpacing="0.28" fill="var(--ft-pool)" fontFamily="var(--font-jost)">
                    LEOPARD COVE
                  </text>

                  {/* Peninsula edge */}
                  <path
                    d="M0 44 Q 14 37 24 45 Q 34 53 30 66 Q 27 75 18 75"
                    fill="none"
                    stroke="var(--ft-stone)"
                    strokeWidth="0.4"
                    strokeDasharray="1.2 1"
                    opacity="0.7"
                  />

                  {/* Roads */}
                  <path d="M34 75 Q 40 52 46 34 Q 50 20 58 6" fill="none" stroke="var(--ft-stone)" strokeWidth="0.9" opacity="0.5" />
                  <path d="M18 40 Q 40 44 68 38 Q 84 34 96 22" fill="none" stroke="var(--ft-stone)" strokeWidth="0.7" opacity="0.4" />
                  <path d="M30 72 Q 52 66 72 58" fill="none" stroke="var(--ft-stone)" strokeWidth="0.5" opacity="0.35" />
                  <text x="47" y="26" fontSize="1.5" letterSpacing="0.2" fill="var(--text-caption)" fontFamily="var(--font-jost)" transform="rotate(-64 47 26)">
                    YACHT CLUB RD
                  </text>

                  {/* Fig Tree — the anchor */}
                  <g>
                    {!reduced && (
                      <circle cx="44" cy="52" r="3" fill="none" stroke="var(--ft-emerald)" strokeWidth="0.3">
                        <animate attributeName="r" values="3;9;3" dur="4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle cx="44" cy="52" r="2.2" fill="var(--ft-emerald)" />
                    <text x="44" y="47.4" fontSize="2.2" textAnchor="middle" fill="var(--ft-emerald)" fontFamily="var(--font-cormorant)" fontStyle="italic">
                      Fig Tree
                    </text>
                  </g>

                  {/* Landmarks */}
                  {masaki.places.map((p, i) => {
                    const on = active === i;
                    return (
                      <g
                        key={p.name}
                        onMouseEnter={() => setActive(i)}
                        onMouseLeave={() => setActive(null)}
                        style={{ cursor: "pointer" }}
                      >
                        <line
                          x1="44"
                          y1="52"
                          x2={p.x}
                          y2={p.y}
                          stroke="var(--ft-emerald)"
                          strokeWidth={on ? 0.4 : 0.2}
                          strokeDasharray="0.8 0.8"
                          opacity={on ? 0.9 : 0.18}
                          style={{ transition: "all 400ms" }}
                        />
                        <circle cx={p.x} cy={p.y} r={on ? 1.5 : 0.9} fill={on ? "var(--ft-terracotta)" : "var(--ft-stone)"} style={{ transition: "all 400ms" }} />
                        {/* Generous invisible hit area — 0.9 units is unclickable. */}
                        <circle cx={p.x} cy={p.y} r="4" fill="transparent" />
                        <text
                          x={p.x}
                          y={p.y - 2.6}
                          fontSize="1.7"
                          textAnchor="middle"
                          fill={on ? "var(--ft-ink)" : "var(--text-caption)"}
                          fontFamily="var(--font-jost)"
                          style={{ transition: "all 400ms" }}
                        >
                          {p.short}
                        </text>
                        <text
                          x={p.x}
                          y={p.y + 3.6}
                          fontSize="1.5"
                          textAnchor="middle"
                          fill="var(--ft-terracotta)"
                          opacity={on ? 1 : 0}
                          fontFamily="var(--font-jost)"
                          style={{ transition: "all 400ms" }}
                        >
                          {p.distance}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Caption */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4, ease: EASE }}
                  className="type-label absolute right-4 bottom-4 text-[0.5rem] text-(--text-caption)"
                >
                  Schematic · distances as published
                </motion.p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
