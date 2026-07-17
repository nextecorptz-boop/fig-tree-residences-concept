"use client";

import { useEffect, useRef, useState } from "react";
import { canopyPath } from "@/lib/v2/tree";

/** The crown, drawn once at module scope — the geometry never changes. */
const CANOPY = canopyPath({ crown: 0.62, amp: 0.09, phase: 0.6 });

/**
 * The Fig Tree cursor: a canopy outline that trails a small solid dot.
 *
 * The dot tracks the pointer exactly (so precision never suffers) while the
 * crown lerps behind it and tips toward the direction of travel — the organic
 * part. Over anything marked data-cursor, it opens up and takes a label.
 *
 * Only mounts for a fine pointer on a large viewport. Touch and keyboard users
 * get their native affordances untouched, and prefers-reduced-motion drops the
 * trail entirely.
 */
export function FigCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const leaf = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-hidden");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const trail = { ...pos };
    let angle = 0;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        trail.x = pos.x;
        trail.y = pos.y;
        if (dot.current) dot.current.style.opacity = "1";
        if (leaf.current) leaf.current.style.opacity = "1";
      }

      const hit = (e.target as Element | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      const mode = hit?.dataset.cursor ?? "";
      targetScale = mode ? 2.6 : 1;
      if (label.current) {
        const text = hit?.dataset.cursorLabel ?? "";
        if (label.current.textContent !== text) label.current.textContent = text;
        label.current.style.opacity = text ? "1" : "0";
      }
    };

    const onLeave = () => {
      visible = false;
      if (dot.current) dot.current.style.opacity = "0";
      if (leaf.current) leaf.current.style.opacity = "0";
    };

    const tick = () => {
      const ease = reduced ? 1 : 0.14;
      const dx = pos.x - trail.x;
      const dy = pos.y - trail.y;
      trail.x += dx * ease;
      trail.y += dy * ease;

      // Tip the leaf toward travel, but only once it's actually moving —
      // otherwise it spins on sub-pixel noise when the pointer is at rest.
      const speed = Math.hypot(dx, dy);
      if (speed > 1.5) {
        const target = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        // Wrap into [-180, 180] so the leaf takes the short way round instead of
        // spinning a full turn when travel crosses the 0/360 boundary.
        const delta = ((target - angle + 540) % 360) - 180;
        angle += delta * 0.08;
      }
      scale += (targetScale - scale) * 0.16;

      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (leaf.current) {
        leaf.current.style.transform =
          `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <div
        ref={leaf}
        className="absolute top-0 left-0 opacity-0 transition-opacity duration-500 will-change-transform"
      >
        {/* The crown, at 30px — the same silhouette that frames every photograph
            on the page, small enough to read as an organic arc rather than a
            badge. It tips toward travel, the way a canopy leans into wind.
            Stroked, never filled, so it can't obscure what's under it. */}
        <svg width="30" height="30" viewBox="0 0 1 1" fill="none" preserveAspectRatio="none">
          <path
            d={CANOPY}
            stroke="var(--ft-cream)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            opacity="0.85"
            style={{ mixBlendMode: "difference" }}
          />
        </svg>
        <span
          ref={label}
          className="type-label absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[6px] tracking-[0.3em] text-(--ft-cream) opacity-0 transition-opacity duration-300"
          style={{ mixBlendMode: "difference" }}
        />
      </div>
      <div
        ref={dot}
        className="absolute top-0 left-0 h-[5px] w-[5px] rounded-full bg-(--ft-cream) opacity-0 transition-opacity duration-500 will-change-transform"
        style={{ mixBlendMode: "difference" }}
      />
    </div>
  );
}
