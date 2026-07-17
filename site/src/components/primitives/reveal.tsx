"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/use-reduced-motion";
import { reducedMotionVariants, revealExtended, revealStandard } from "@/lib/motion/variants";

/** Pattern A — reveal-standard. Fires once when ~80% up the viewport. */
export function Reveal({
  children,
  className,
  extended = false,
  as: Component = motion.div,
}: {
  children: ReactNode;
  className?: string;
  extended?: boolean;
  as?: typeof motion.div;
}) {
  const reduced = usePrefersReducedMotion();
  const variants = reduced ? reducedMotionVariants : extended ? revealExtended : revealStandard;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </Component>
  );
}
