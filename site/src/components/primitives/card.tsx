"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cardHoverLift } from "@/lib/motion/variants";

/** Base surface RoomCard/AmenityCard/TestimonialCard extend. Pattern F — card-hover-lift. */
export function Card({
  children,
  className = "",
  as: Component = motion.div,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  as?: typeof motion.div;
  interactive?: boolean;
}) {
  return (
    <Component
      className={`bg-(--color-surface-raised) rounded-(--radius-md) p-6 ${className}`}
      initial="rest"
      whileHover={interactive ? "hover" : undefined}
      whileFocus={interactive ? "hover" : undefined}
      variants={interactive ? cardHoverLift : undefined}
      style={{ boxShadow: "var(--shadow-whisper)" }}
    >
      {children}
    </Component>
  );
}
