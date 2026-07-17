"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * The signature ring cursor, design/07_CURSOR_SYSTEM.md. Active only inside
 * Gallery's ImageGrid and GardenSection, only over non-interactive
 * photography, and only on non-touch devices (Section 4) — never over the
 * Booking flow. Each qualifying zone mounts its own instance, scoped to
 * that zone's own bounding box, rather than one global cursor tracked
 * app-wide.
 */
export function RingCursorZone({
  children,
  label,
  className = "",
}: {
  children: React.ReactNode;
  label: "View" | "Explore";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isNonTouch, setIsNonTouch] = useState(false);

  useEffect(() => {
    setIsNonTouch(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!isNonTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`${className} cursor-none`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={(event) => {
        const bounds = containerRef.current?.getBoundingClientRect();
        if (!bounds) return;
        setPosition({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
      }}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="pointer-events-none absolute z-10 flex items-center justify-center rounded-full border-[1.5px] border-(--color-accent-primary)/70"
            style={{
              left: position.x - 18,
              top: position.y - 18,
              width: 36,
              height: 36,
            }}
          >
            <span className="h-1 w-1 rounded-full bg-(--color-accent-primary)" />
            <span className="absolute text-(length:--text-caption) text-(--color-accent-primary-text) whitespace-nowrap left-full ml-2">
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
