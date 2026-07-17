import manifestJson from "../../../public/media/manifest.json";

/**
 * Typed access to the corrected image set produced by scripts/build-assets.js.
 *
 * Do not reach into /public/images directly. That tree's filenames are roughly
 * half wrong — the file named "rooftop-dining-dusk" is a photograph of the gym,
 * "bathroom-styled" is the garden wall, and "gardens/garden-living-wall" is in
 * fact the rooftop terrace at sunset. Every key below was assigned by looking at
 * the picture. The pipeline also corrects the yellow-green cast measured across
 * the AVIF batch, so these are the only colour-accurate copies in the project.
 */

export type MediaKey =
  | "facade-tree"
  | "rooftop-sunset"
  | "garden-living-wall"
  | "garden-lounge"
  | "pool-wide"
  | "pool-through-trees"
  | "breakfast-garden"
  | "gym"
  | "living-balcony"
  | "living-desk"
  | "lounge-dim"
  | "kitchenette-bar"
  | "kitchen-detail"
  | "logo-sign"
  | "staff-portrait"
  | "bedroom-arch-palm"
  | "bedroom-white-arch"
  | "bedroom-arch-green"
  | "bedroom-blue"
  | "kitchenette-full"
  | "living-cream"
  | "living-cream-desk"
  | "dining-bar-detail"
  | "rooftop-dusk-guests"
  | "rooftop-golden-hour"
  | "living-room-alt-2"
  | "living-room-alt-3"
  | "pool-garden-angle"
  | "reception-lounge"
  | "reception-desk"
  | "reception-detail"
  | "bedroom-classic-attic"
  | "bathroom-full-view"
  | "garden-lounge-bench"
  | "pool-exterior-1"
  | "pool-exterior-2"
  | "bedroom-classic-lighthouse";

export type MediaEntry = {
  key: MediaKey;
  subject: string;
  width: number;
  height: number;
  blurDataURL: string;
  bg: number;
};

const manifest = manifestJson as MediaEntry[];

const byKey = new Map<MediaKey, MediaEntry>(manifest.map((m) => [m.key, m]));

export function media(key: MediaKey): MediaEntry & { src: string } {
  const entry = byKey.get(key);
  if (!entry) throw new Error(`Unknown media key "${key}". Run: node scripts/build-assets.js`);
  return { ...entry, src: `/media/${key}.webp` };
}

/**
 * Largest sensible display width for a source image.
 *
 * Nothing in this library exceeds ~1054px on its long edge, so any frame wider
 * than the source is upscaling. Layouts call this to stay honest about how big
 * a given photograph is allowed to be drawn.
 */
export function nativeWidth(key: MediaKey): number {
  return media(key).width;
}
