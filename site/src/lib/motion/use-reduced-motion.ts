"use client";

import { useEffect, useState } from "react";

/**
 * Single shared reduced-motion check (website/06_ANIMATION_MAP.md Section 4),
 * implemented once and consumed by every motion pattern rather than
 * reimplemented per component.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}
