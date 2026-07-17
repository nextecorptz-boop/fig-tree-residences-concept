"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageTransitionVariants, reducedMotionVariants } from "@/lib/motion/variants";
import { usePrefersReducedMotion } from "@/lib/motion/use-reduced-motion";

/** Pattern K — page-transition, applied once at the layout level. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  return (
    // Not mode="wait": the new route's content is already committed
    // underneath — the old page must never stay on screen waiting on an
    // exit animation that a stalled rAF (backgrounded tab, low-power
    // device) could delay indefinitely.
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={reduced ? reducedMotionVariants : pageTransitionVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
