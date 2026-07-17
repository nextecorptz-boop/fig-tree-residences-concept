import Image, { type ImageProps } from "next/image";

/**
 * Thin wrapper over next/image, which already negotiates AVIF → WebP → JPEG
 * automatically (next.config.ts `images.formats`) per
 * website/08_IMAGE_OPTIMIZATION_PLAN.md Section 3. `alt` is required (no
 * default) so a filename-derived or missing alt can never silently ship,
 * per website/11_ACCESSIBILITY_PLAN.md Section 6.
 *
 * `correctionPending` applies a mild neutralising filter for assets flagged
 * "Correct-and-retain" in website/07_HIGGSFIELD_SHOTLIST.md whose real
 * colour-cast correction hasn't been produced yet — an interim
 * approximation only, not a substitute for the production colour-grade
 * pass.
 */
export function ImageWithFallback({
  alt,
  correctionPending = false,
  className = "",
  ...props
}: ImageProps & { alt: string; correctionPending?: boolean }) {
  return (
    <Image
      alt={alt}
      className={`${correctionPending ? "saturate-95 hue-rotate-[-3deg]" : ""} ${className}`}
      {...props}
    />
  );
}
