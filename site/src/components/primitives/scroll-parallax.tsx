"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/use-reduced-motion";

/**
 * Pattern D — scroll-parallax-slow (GSAP + ScrollTrigger). Reserved for
 * Gardens/Location full-bleed sections per website/06_ANIMATION_MAP.md.
 * GSAP is dynamically imported and scoped to this component only, per
 * website/09_PERFORMANCE_PLAN.md Section 3 — most routes never load it.
 * Disabled entirely on mobile/reduced-motion; the image renders static.
 */
export function ScrollParallax({
  children,
  className,
  speed = 0.18,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ref.current!.querySelector("[data-parallax-target]"),
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }, ref);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reducedMotion, speed]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <div data-parallax-target style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
