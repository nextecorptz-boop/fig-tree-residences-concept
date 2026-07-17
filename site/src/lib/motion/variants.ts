/**
 * The named motion pattern library from website/06_ANIMATION_MAP.md Section 2.
 * Every entrance/hover/transition animation in the build should reference
 * one of these rather than defining a bespoke one-off — this is the
 * mechanism that keeps thirty-five sections' worth of motion consistent.
 */
import type { Transition, Variants } from "framer-motion";

export const EASE_SETTLE = [0.22, 1, 0.36, 1] as const;
export const EASE_QUIET = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
  instant: 0.12,
  quick: 0.2,
  settle: 0.45,
  reveal: 0.7,
  arrive: 1.2,
} as const;

/** Pattern A — reveal-standard */
export const revealStandard: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE_SETTLE },
  },
};

/** Pattern A variant — extended hold, for Departure moment / Cicero quote */
export const revealExtended: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_SETTLE },
  },
};

/** Pattern B — reveal-staggered (parent) */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0 },
  },
};

/** Pattern B — reveal-staggered (child) reuses revealStandard per-item */
export const staggerItem = revealStandard;

/** Pattern F — card-hover-lift */
export const cardHoverLift = {
  rest: { y: 0, boxShadow: "var(--shadow-whisper)" },
  hover: {
    y: -4,
    boxShadow: "var(--shadow-lifted)",
    transition: { duration: DURATION.settle, ease: EASE_SETTLE },
  },
};

/** Pattern G — accordion-toggle */
export const accordionTransition: Transition = { duration: 0.3, ease: EASE_QUIET };

/** Pattern H — lightbox-transition */
export const lightboxVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_SETTLE } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3, ease: EASE_QUIET } },
};

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_SETTLE } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE_QUIET } },
};

/** Pattern J — form-state-transition */
export const formStateVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_SETTLE } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE_QUIET } },
};

/** Pattern K — page-transition */
export const pageTransitionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_SETTLE } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE_QUIET } },
};

/** Reduced-motion equivalents: opacity-only, near-instant, no translate/scale */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};
