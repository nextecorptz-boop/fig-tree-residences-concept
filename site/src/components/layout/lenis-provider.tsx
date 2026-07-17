"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/use-reduced-motion";

/** Smooth scroll (Lenis), disabled entirely under prefers-reduced-motion. */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let lenis: import("lenis").default | undefined;
    let rafId: number;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
