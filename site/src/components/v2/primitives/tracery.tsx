"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { grow, canopyPath } from "@/lib/v2/tree";

const EASE = [0.4, 0, 0.2, 1] as const;

/**
 * Decorative line art — branch and root structure, drawn at 2–5% opacity.
 *
 * Desktop only. At 2% these are barely there on a 27" display and would be pure
 * bandwidth on a phone, where the margins they live in don't exist.
 *
 * The limbs draw themselves in as the section passes, slowly. Nothing here
 * should ever catch the eye mid-scroll; it should only be noticed by someone who
 * has already stopped.
 */
export function Tracery({
  variant = "branch",
  seed = 11,
  className = "",
  color = "var(--ft-emerald)",
  opacity = 0.04,
}: {
  variant?: "branch" | "root";
  seed?: number;
  className?: string;
  color?: string;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Roots emerge as the section arrives and recede as it leaves.
  const draw = useTransform(scrollYProgress, [0, 0.42, 0.72, 1], [0, 1, 1, 0.55]);
  // Round caps render a zero-length path as a dot, so the limbs have to be
  // faded, not just undrawn — otherwise the section opens on a spray of specks.
  const ink = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const drift = useTransform(scrollYProgress, [0, 1], variant === "root" ? ["6%", "-6%"] : ["-5%", "5%"]);

  const limbs =
    variant === "root"
      ? grow({ x: 200, y: 20, angle: Math.PI / 2, length: 62, depth: 5, seed, spread: 0.72, shrink: 0.7, curve: 0.3 })
      : grow({ x: 200, y: 380, angle: -Math.PI / 2, length: 74, depth: 6, seed, spread: 0.5, shrink: 0.75, curve: 0.2 });

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ y: reduced ? 0 : drift }}
      className={`pointer-events-none absolute hidden lg:block ${className}`}
    >
      <svg viewBox="0 0 400 400" className="h-full w-full" focusable="false">
        <g fill="none" stroke={color} strokeLinecap="round" style={{ opacity }}>
          {limbs.map((l, i) => (
            <motion.path
              key={i}
              d={l.d}
              strokeWidth={Math.max(0.5, 2.6 - l.order * 0.42)}
              initial={{ pathLength: reduced ? 1 : 0 }}
              style={{ pathLength: reduced ? 1 : draw, opacity: reduced ? 1 : ink }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

/**
 * A canopy silhouette used as a shadow — the thing a booking card sits under.
 * Blurred and barely tinted; it should read as shade, never as a shape.
 */
export function CanopyShade({
  className = "",
  color = "var(--ft-abyss)",
  opacity = 0.5,
  phase = 1.1,
}: {
  className?: string;
  color?: string;
  opacity?: number;
  phase?: number;
}) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity }}
    >
      <path d={canopyPath({ crown: 0.62, amp: 0.09, phase })} fill={color} />
    </svg>
  );
}
