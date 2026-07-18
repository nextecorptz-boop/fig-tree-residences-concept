"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { LuxuryVideo } from "@/components/v2/primitives/luxury-video";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { Container } from "@/components/primitives/container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Room detail hero — unchanged in structure (same fullscreen image, same
 * gradient, same title block) but with three additions layered on top via
 * transform-only motion:
 *
 * 1. A gentle parallax on the hero image (~30% of scroll speed) as the
 *    section scrolls past.
 * 2. A very subtle scale-up (1 → ~1.06) over the same scroll range, so the
 *    image feels like it's slowly settling rather than sitting static.
 * 3. A slim sticky title bar that fades in once the full hero has scrolled
 *    out of view, keeping the room name legible while browsing the gallery
 *    and details below — released back into the page once the room detail
 *    section itself ends.
 *
 * Everything here is `transform`/`opacity` only (no layout properties), and
 * every motion value collapses to a static 1/0 state under
 * prefers-reduced-motion.
 */
export function RoomHero({
  name,
  differentiator,
  image,
  video,
}: {
  name: string;
  differentiator: string;
  image: { src: string; alt: string };
  /** Optional mp4 — only Garden View Studio and Classic Residence have one today. */
  video?: string;
}) {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [pastHero, setPastHero] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // ~30% of scroll speed — inside the 25–35% band requested.
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sticky title — pinned to the top edge only once the hero has
          scrolled past, so it never competes with the hero's own title. */}
      <AnimatePresence>
        {pastHero && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="sticky top-0 z-30 border-b border-(--color-border-hairline) bg-white/85 backdrop-blur-md"
          >
            <Container className="flex items-center justify-between py-3">
              <p className="font-display text-[18px] leading-none">{name}</p>
              <p className="hidden max-w-[36ch] truncate text-(length:--text-caption) text-(--color-text-muted) sm:block">
                {differentiator}
              </p>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={heroRef} className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute inset-[-6%]"
          style={reduced ? undefined : { y: parallaxY, scale }}
        >
          {video ? (
            <LuxuryVideo src={video} poster={{ src: image.src }} alt={image.alt} priority sizes="100vw" className="absolute inset-0" />
          ) : (
            <ImageWithFallback src={image.src} alt={image.alt} fill priority className="object-cover" sizes="100vw" />
          )}
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.55) 100%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 p-(--space-lg)">
          <Container>
            <motion.h1
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-display text-[32px] lg:text-[44px] leading-[1.1] text-white"
            >
              {name}
            </motion.h1>
            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="mt-2 max-w-xl text-(length:--text-body-l) text-white/80"
            >
              {differentiator}
            </motion.p>
          </Container>
        </div>
        {/* Marks the end of the hero for the sticky-title observer. */}
        <div ref={sentinelRef} aria-hidden className="absolute inset-x-0 bottom-0 h-px" />
      </div>
    </>
  );
}
