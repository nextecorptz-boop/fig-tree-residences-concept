/**
 * Fig Tree geometry.
 *
 * Every organic shape on the site is generated here, from four parts of one
 * tree: canopy, branches, trunk, roots. Nothing is traced from the logo — the
 * signboard is the source of the *geometry*, not a graphic to paste in. A site
 * wearing its own logo as a cut-out reads as merchandise; a site whose curves
 * all happen to belong to the same tree reads as a place.
 *
 * Two generators do all the work:
 *   canopyPath() — the crown silhouette, used as a clip for every image frame.
 *   grow()       — a recursive branch/root structure, used for the loader, the
 *                  decorative tracery, the dividers and the footer roots.
 *
 * Both are deterministic. Same seed, same tree, every render — which matters,
 * because these run on the server and again on the client.
 */

/* ------------------------------------------------------------------ canopy */

export type CanopyOpts = {
  /** Fraction of the box height the crown occupies. */
  crown?: number;
  /** Lobe depth. The fig leaf is deeply lobed; the crown only hints at it. */
  amp?: number;
  /** Shifts the lobes. This is what keeps the silhouette off-symmetric. */
  phase?: number;
  /** Root-edge amplitude along the bottom. 0 leaves it straight. */
  root?: number;
  steps?: number;
};

/** Catmull-Rom through the sampled points, emitted as cubic beziers. */
function smooth(pts: [number, number][]): string {
  let d = `M${pts[0][0].toFixed(4)} ${pts[0][1].toFixed(4)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(4)} ${c1y.toFixed(4)},${c2x.toFixed(4)} ${c2y.toFixed(4)},${p2[0].toFixed(4)} ${p2[1].toFixed(4)}`;
  }
  return d;
}

/**
 * The crown silhouette, in objectBoundingBox space (0..1), so one path clips a
 * box of any size.
 *
 * The lobes are three summed sines at non-harmonic frequencies — that's what
 * stops it repeating and reading as a scallop border. An envelope pins the
 * modulation to zero at both sides so the crown always meets the box edges
 * exactly, and the radius only ever subtracts, so the silhouette can never
 * blow outside the box and get square-clipped.
 */
export function canopyPath({
  crown = 0.32,
  amp = 0.06,
  phase = 0.6,
  root = 0,
  steps = 72,
}: CanopyOpts = {}): string {
  const pts: [number, number][] = [];

  for (let i = 0; i <= steps; i++) {
    const th = Math.PI * (1 - i / steps); // PI -> 0, left to right over the top
    const env = Math.sin(th); // 0 at the shoulders, 1 at the apex
    const n =
      0.55 * Math.sin(3.3 * th + phase) +
      0.3 * Math.sin(6.1 * th + phase * 2.1) +
      0.15 * Math.sin(9.7 * th + phase * 3.7);
    const r = 1 - amp * env * (0.5 + 0.5 * n);
    pts.push([0.5 + 0.5 * Math.cos(th) * r, crown * (1 - Math.sin(th) * r)]);
  }

  let d = smooth(pts);

  if (root > 0) {
    // The bottom edge lifts between root tips, so the frame reads as gripping
    // the ground rather than resting on a ruled line.
    const rpts: [number, number][] = [];
    const rsteps = 36;
    for (let i = 0; i <= rsteps; i++) {
      const t = i / rsteps;
      const x = 1 - t;
      const g =
        0.6 * Math.cos(4.2 * Math.PI * t + phase * 1.3) +
        0.4 * Math.cos(7.1 * Math.PI * t + phase * 2.9);
      rpts.push([x, 1 - root * (0.5 + 0.5 * g)]);
    }
    // Down the right side to the first root tip, along the bottom, then close.
    // smooth() emits its own leading moveto; drop it and keep the curves.
    d += `L${rpts[0][0].toFixed(4)} ${rpts[0][1].toFixed(4)}`;
    d += smooth(rpts).replace(/^M[^C]*/, "");
    d += "Z";
  } else {
    d += "L1 1L0 1Z";
  }

  return d;
}

/* ------------------------------------------------- branches, trunk & roots */

/** mulberry32 — small, fast, and stable across server and client. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Limb = {
  d: string;
  /** 0 at the trunk, rising outward. Drives reveal order and stroke weight. */
  order: number;
  /** Fraction of the way to the tips, 0..1. */
  t: number;
};

export type GrowOpts = {
  x: number;
  y: number;
  /** Radians. -PI/2 grows up (branches), PI/2 grows down (roots). */
  angle: number;
  length: number;
  depth: number;
  seed?: number;
  /** Half-angle between siblings. Roots want this wider than branches. */
  spread?: number;
  shrink?: number;
  /** Sideways bow on each limb. Straight limbs look machined. */
  curve?: number;
};

/**
 * Recursive limb structure. Used for branches (growing up) and, with the angle
 * flipped and the spread widened, for roots — which is exactly how the
 * signboard draws them: the same structure mirrored under the ground line.
 */
export function grow({
  x,
  y,
  angle,
  length,
  depth,
  seed = 7,
  spread = 0.52,
  shrink = 0.74,
  curve = 0.22,
}: GrowOpts): Limb[] {
  const rnd = rng(seed);
  const out: Limb[] = [];
  const maxDepth = depth;

  const rec = (px: number, py: number, pa: number, len: number, d: number) => {
    if (d <= 0 || len < 1.2) return;

    const ex = px + Math.cos(pa) * len;
    const ey = py + Math.sin(pa) * len;
    const bow = (rnd() - 0.5) * curve * len;
    const cx = (px + ex) / 2 + Math.cos(pa + Math.PI / 2) * bow;
    const cy = (py + ey) / 2 + Math.sin(pa + Math.PI / 2) * bow;

    const order = maxDepth - d;
    out.push({
      d: `M${px.toFixed(2)} ${py.toFixed(2)}Q${cx.toFixed(2)} ${cy.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}`,
      order,
      t: order / maxDepth,
    });

    // An occasional third limb keeps the structure from reading as a binary
    // fractal, which is the tell that a tree was generated rather than grown.
    const n = rnd() < 0.22 ? 3 : 2;
    for (let i = 0; i < n; i++) {
      const off = i / (n - 1) - 0.5; // -0.5 .. 0.5 across the fork
      const na = pa + off * spread * 2 + (rnd() - 0.5) * 0.3;
      rec(ex, ey, na, len * shrink * (0.82 + rnd() * 0.34), d - 1);
    }
  };

  rec(x, y, angle, length, depth);
  return out;
}

/**
 * A near-flat limb for use as a rule: one long horizontal line that forks once
 * and tapers away. Drawn in a 1000x10 box and stretched horizontally, so keep
 * everything shallow — steep angles shear when the box is non-uniformly scaled.
 */
export function branchRule(seed = 3): { spine: string; twigs: string[] } {
  const rnd = rng(seed);
  const forkAt = 320 + rnd() * 240;
  const spine = `M0 6Q${(forkAt * 0.5).toFixed(0)} ${(6 + (rnd() - 0.5) * 1.2).toFixed(2)} ${forkAt.toFixed(0)} 5.6Q${(forkAt + 300).toFixed(0)} ${(5 + (rnd() - 0.5) * 1.2).toFixed(2)} 1000 5.2`;
  const twigs = [
    `M${forkAt.toFixed(0)} 5.6Q${(forkAt + 70).toFixed(0)} 4.2 ${(forkAt + 168).toFixed(0)} 3.1`,
    `M${(forkAt + 168).toFixed(0)} 3.1Q${(forkAt + 210).toFixed(0)} 2.6 ${(forkAt + 250).toFixed(0)} 2.4`,
  ];
  return { spine, twigs };
}
