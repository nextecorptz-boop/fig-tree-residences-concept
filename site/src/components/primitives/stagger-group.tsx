"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/use-reduced-motion";
import { reducedMotionVariants, staggerContainer, staggerItem } from "@/lib/motion/variants";

/** Pattern B — reveal-staggered parent. Caps at 6 visible children per batch on mobile per the spec's jank-avoidance rule. */
export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div className={className} variants={reduced ? reducedMotionVariants : staggerItem}>
      {children}
    </motion.div>
  );
}
