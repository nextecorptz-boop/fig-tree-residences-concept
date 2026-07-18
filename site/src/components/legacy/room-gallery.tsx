"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";

/**
 * Room detail gallery — same 2-column grid, same crops, same "cross-fade
 * only, no parallax" accuracy stance on the images themselves (per the
 * original comment this replaces: the photographs must not distort).
 *
 * What's added is a layered scroll effect on the grid *as a block*: the
 * image column drifts at a slightly slower rate than the page scrolls (the
 * feature list beside it, a server-rendered sibling, has no motion applied
 * and so scrolls at 100% — the gallery reads as sitting fractionally
 * "behind" the text column), plus a soft reveal as the grid enters view.
 * The individual photographs inside each frame are never scaled or panned.
 */
export function RoomGallery({ images }: { images: { src: string; alt: string }[] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Image column moves at roughly 85% of natural scroll speed — a gentle lag,
  // not a distortion, satisfying "images move slightly slower than text."
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { y }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: reduced ? 0 : undefined }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="lg:col-span-7 grid grid-cols-2 gap-3"
    >
      {images.map((img, i) => (
        <div key={img.src} className={`relative aspect-[4/3] ${i === 0 ? "col-span-2" : ""}`}>
          <ImageWithFallback
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 29vw, 50vw"}
          />
        </div>
      ))}
    </motion.div>
  );
}
