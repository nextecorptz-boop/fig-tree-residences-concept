"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/use-reduced-motion";

/**
 * Pattern E — ambient-loop (GSAP timeline). The Restaurant/Dining section's
 * slow warm-light "breathing" treatment. Starts when the section enters the
 * viewport, pauses (not stops) when it leaves, per
 * website/06_ANIMATION_MAP.md Pattern E.
 */
export function AmbientLoop({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    let timeline: gsap.core.Timeline | undefined;
    let observer: IntersectionObserver | undefined;
    let cancelled = false;

    (async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !ref.current) return;

      const target = ref.current.querySelector<HTMLElement>("[data-ambient-target]");
      if (!target) return;

      timeline = gsap
        .timeline({ paused: true, repeat: -1, yoyo: true })
        .to(target, { opacity: 0.85, duration: 3, ease: "sine.inOut" });

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) timeline?.play();
          else timeline?.pause();
        },
        { threshold: 0.1 }
      );
      observer.observe(ref.current);
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      timeline?.kill();
    };
  }, [reducedMotion]);

  return (
    <div ref={ref} className={className}>
      <div data-ambient-target>{children}</div>
    </div>
  );
}
