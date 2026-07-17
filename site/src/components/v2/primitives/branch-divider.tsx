"use client";

import { branchRule } from "@/lib/v2/tree";

/**
 * A rule that forks. Replaces the straight border-top separators.
 *
 * 1px, 20% opacity — at a glance it reads as a hairline and nothing more. The
 * fork only registers if you look, which is the intent: the tree language should
 * be discovered, not announced.
 *
 * Drawn in a 1000x10 box stretched horizontally, so the geometry is kept shallow
 * — steep angles shear under non-uniform scale. non-scaling-stroke keeps the
 * line exactly 1px however wide the container gets.
 */
export function BranchDivider({
  seed = 3,
  color = "var(--ft-sage)",
  className = "",
  flip = false,
}: {
  seed?: number;
  color?: string;
  className?: string;
  flip?: boolean;
}) {
  const { spine, twigs } = branchRule(seed);

  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1000 10"
      preserveAspectRatio="none"
      className={`block h-[10px] w-full ${className}`}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g fill="none" stroke={color} strokeOpacity={0.2} strokeWidth={1} vectorEffect="non-scaling-stroke">
        <path d={spine} />
        {twigs.map((t, i) => (
          <path key={i} d={t} strokeOpacity={0.2 - i * 0.06} />
        ))}
      </g>
    </svg>
  );
}
