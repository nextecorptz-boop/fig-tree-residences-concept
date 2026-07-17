"use client";

import { grow } from "@/lib/v2/tree";

/**
 * What happens when you hover a photograph: a branch shadow falls across it and
 * light comes through the gaps.
 *
 * Drop inside a CanopyFrame on a `group`. Both layers cross-fade over 700ms
 * ease-in-out — the frame's own 2% scale runs on the same curve, so the whole
 * gesture reads as one thing: the canopy shifting slightly in wind, not a card
 * responding to a mouse.
 *
 * The limbs are heavily blurred on purpose. Sharp branches read as a graphic
 * pasted on top; blurred, they read as something out of frame casting shade,
 * which is the only version that feels like weather rather than UI.
 */
export function BranchShadow({
  seed = 5,
  intensity = 0.22,
}: {
  seed?: number;
  intensity?: number;
}) {
  const limbs = grow({
    x: 190,
    y: 430,
    angle: -Math.PI / 2,
    length: 88,
    depth: 5,
    seed,
    spread: 0.62,
    shrink: 0.72,
    curve: 0.26,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
    >
      {/* Light through the gaps */}
      <div
        className="absolute inset-0"
        style={{
          mixBlendMode: "soft-light",
          background:
            "radial-gradient(22% 16% at 24% 18%, color-mix(in srgb, var(--ft-sun) 70%, transparent), transparent 70%), radial-gradient(18% 13% at 68% 34%, color-mix(in srgb, var(--ft-sun) 55%, transparent), transparent 70%), radial-gradient(26% 18% at 46% 72%, color-mix(in srgb, var(--ft-cream) 45%, transparent), transparent 72%)",
        }}
      />

      {/* Shade */}
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
        focusable="false"
      >
        <g
          fill="none"
          stroke="var(--ft-abyss)"
          strokeOpacity={intensity}
          strokeLinecap="round"
          style={{ filter: "blur(3px)" }}
        >
          {limbs.map((l, i) => (
            <path key={i} d={l.d} strokeWidth={Math.max(1.4, 7 - l.order * 1.1)} />
          ))}
        </g>
      </svg>
    </div>
  );
}
