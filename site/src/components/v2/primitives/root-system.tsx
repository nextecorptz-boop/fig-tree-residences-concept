"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { grow } from "@/lib/v2/tree";

/**
 * The root system under the footer.
 *
 * Ultra-low opacity and deliberately slow to arrive: it draws itself over the
 * last stretch of scroll, so it's essentially invisible to anyone skimming and
 * quietly there for anyone who reaches the bottom and stays. That's the brief —
 * something to discover, not something to present.
 *
 * Structurally it's the branch generator with the angle flipped and the spread
 * opened up, which is precisely how the signboard draws its roots: the canopy,
 * mirrored under the ground line.
 */
export function RootSystem({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const draw = useTransform(scrollYProgress, [0.1, 0.95], [0, 1]);
  // Round caps turn an undrawn path into a visible dot; fade them with the draw.
  const ink = useTransform(scrollYProgress, [0.1, 0.18], [0, 1]);

  // Three crowns of root, offset, so the spread reads as a system rather than
  // one specimen sitting dead centre.
  const systems = [
    { x: 500, len: 96, seed: 21, depth: 6 },
    { x: 250, len: 70, seed: 34, depth: 5 },
    { x: 760, len: 76, seed: 57, depth: 5 },
  ];

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute ${className}`}>
      <svg viewBox="0 0 1000 340" preserveAspectRatio="xMidYMin slice" className="h-full w-full" focusable="false">
        <g fill="none" stroke="var(--ft-sage)" strokeLinecap="round" style={{ opacity: 0.05 }}>
          {systems.flatMap((s) =>
            grow({
              x: s.x,
              y: 0,
              angle: Math.PI / 2,
              length: s.len,
              depth: s.depth,
              seed: s.seed,
              spread: 0.78,
              shrink: 0.72,
              curve: 0.34,
            }).map((l, i) => (
              <motion.path
                key={`${s.seed}-${i}`}
                d={l.d}
                strokeWidth={Math.max(0.6, 3.4 - l.order * 0.5)}
                initial={{ pathLength: reduced ? 1 : 0 }}
                style={{ pathLength: reduced ? 1 : draw, opacity: reduced ? 1 : ink }}
              />
            ))
          )}
        </g>
      </svg>
    </div>
  );
}
