"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { usePrefersReducedMotion } from "@/lib/motion/use-reduced-motion";
import { EASE_SETTLE } from "@/lib/motion/variants";

/**
 * design/04_COMPONENT_LIBRARY.md Section 2. `media` accepts an image or a
 * video source — same component, same layout, per
 * website/05_COMPONENT_TREE.md's naming-reconciliation note that VideoHero
 * is a mode, not a separate component. No commissioned hero video exists
 * yet (website/07_HIGGSFIELD_SHOTLIST.md Section 6), so this build ships
 * the image mode with the interim substitute still and a `videoSrc` prop
 * ready for when real footage lands.
 */
export function Hero({
  imageSrc,
  imageAlt,
  videoSrc,
  headline,
  subline,
  cta,
}: {
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
  headline: string;
  subline?: string;
  cta?: { label: string; href: string };
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <div className={`relative h-full w-full ${reducedMotion ? "" : "motion-hero-drift"}`}>
        <ImageWithFallback
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        {videoSrc && (
          <video
            className="hidden lg:block absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={imageSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 1.2, ease: EASE_SETTLE, delay: reducedMotion ? 0 : 0.4 }}
          className="font-display font-normal text-white text-[40px] lg:text-[72px] leading-[1.05] tracking-[-0.01em] max-w-4xl"
        >
          {headline}
        </motion.h1>
        {subline && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 1.2, ease: EASE_SETTLE, delay: reducedMotion ? 0 : 0.7 }}
            className="mt-4 text-(length:--text-body-l) text-white/90 max-w-xl"
          >
            {subline}
          </motion.p>
        )}
        {cta && (
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 1.2, ease: EASE_SETTLE, delay: reducedMotion ? 0 : 1 }}
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-(--radius-sm) border border-white/70 px-6 py-3 text-white text-(length:--text-nav) hover:bg-white/10 transition-colors"
          >
            {cta.label}
          </motion.a>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.01 : 1, delay: reducedMotion ? 0 : 1.4 }}
        className="absolute bottom-8 inset-x-0 flex justify-center text-white/80"
        aria-hidden
      >
        <ChevronDown size={24} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
