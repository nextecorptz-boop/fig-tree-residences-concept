"use client";

import { useId } from "react";
import { canopyPath, type CanopyOpts } from "@/lib/v2/tree";

/**
 * The frame every photograph on the site sits in.
 *
 * Replaces the plain border-radius arch. A radius can only ever be an arc; the
 * crown of a fig tree is a lobed, off-symmetric mound, and that difference is
 * the whole point of this pass. The silhouette is generated (see lib/v2/tree.ts)
 * and applied as a clip-path in objectBoundingBox space, so one path fits any
 * box without a second asset.
 *
 * Variants exist so no two frames are quite the same shape — each is the same
 * tree seen from a different angle rather than a component reused four times.
 *
 * The hairline can't be a CSS border (a border follows the box, not the clip),
 * so it's the same path stroked over the top.
 */

export type CanopyVariant = "crown" | "window" | "wide" | "root";

const VARIANTS: Record<CanopyVariant, CanopyOpts> = {
  /** Tall frames — the hero doorway. Near-semicircular crown. */
  crown: { crown: 0.34, amp: 0.055, phase: 0.6 },
  /** Portrait cards. Slightly flatter, lobes a touch deeper. */
  window: { crown: 0.3, amp: 0.07, phase: 2.4 },
  /** Landscape frames. A low, wide mound — the signboard's own proportion. */
  wide: { crown: 0.2, amp: 0.05, phase: 4.1 },
  /** Portrait, gripping the ground. */
  root: { crown: 0.29, amp: 0.065, phase: 1.7, root: 0.022 },
};

export function CanopyFrame({
  variant = "window",
  className = "",
  hairline = "var(--ft-sage)",
  hairlineOpacity = 0.2,
  children,
}: {
  variant?: CanopyVariant;
  className?: string;
  hairline?: string | false;
  hairlineOpacity?: number;
  children: React.ReactNode;
}) {
  // useId returns colons, which are invalid in a CSS url(#…) reference.
  const clipId = `canopy-${useId().replace(/:/g, "")}`;
  const d = canopyPath(VARIANTS[variant]);

  return (
    <div className={`relative ${className}`}>
      <svg aria-hidden className="pointer-events-none absolute h-0 w-0" focusable="false">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={d} />
          </clipPath>
        </defs>
      </svg>

      <div className="relative h-full w-full overflow-hidden" style={{ clipPath: `url(#${clipId})` }}>
        {children}
      </div>

      {hairline !== false && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            d={d}
            fill="none"
            stroke={hairline}
            strokeOpacity={hairlineOpacity}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}
