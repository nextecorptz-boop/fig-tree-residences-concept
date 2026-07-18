"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * LuxuryVideo — a still photograph that quietly becomes a five-second loop.
 *
 * The photograph (`poster`) is always the base layer: it's what paints
 * first, what stays under `prefers-reduced-motion`, what covers slow
 * connections and playback failures, and what the video crossfades on top
 * of once it's actually ready to play. Nothing about the page's existing
 * crop, filter grade, or layout changes — this is a drop-in replacement for
 * a plain `<Image fill />`, meant to sit inside the same wrapper (a
 * `CanopyFrame`, a parallax `motion.div`, whatever the section already
 * uses).
 *
 * Network and CPU discipline:
 * - The `<video>` element isn't mounted at all until the section first
 *   enters the viewport — combined with `preload="none"`, this means zero
 *   video bytes are requested for a section a visitor never scrolls to.
 * - Once mounted, playback is driven entirely by IntersectionObserver:
 *   play on enter, pause on leave, resume (not restart) on re-enter. The
 *   browser's own `autoPlay`/`muted` handling is a secondary safety net,
 *   not the primary trigger.
 * - `prefers-reduced-motion` skips video entirely — the component never
 *   mounts a `<video>` tag, so there's no autoplay to suppress and no
 *   bytes fetched for a visitor who won't see the motion anyway.
 */
export function LuxuryVideo({
  src,
  poster,
  alt,
  sizes,
  priority = false,
  className = "",
  mediaClassName = "",
  filterStyle,
}: {
  /** Path to the mp4, e.g. "/media/video/pool.mp4". */
  src: string;
  poster: { src: string; blurDataURL?: string };
  /** Empty string for a purely decorative background image, per existing site convention. */
  alt: string;
  sizes: string;
  priority?: boolean;
  /**
   * Applied to the wrapper alongside its own `overflow-hidden` — the caller
   * is responsible for position + sizing (e.g. "absolute inset-0" inside an
   * already-positioned parent, or "relative h-full w-full" as its own box),
   * exactly as it would size a plain `<Image fill />` wrapper.
   */
  className?: string;
  /** Extra classes for the poster/video themselves — e.g. a group-hover scale that already exists on the plain Image this replaces. */
  mediaClassName?: string;
  /** The same grading filter already applied to the still elsewhere on the site, so the video matches it exactly. */
  filterStyle?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (reduced) return; // Never observe, never mount the video, under reduced motion.
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasIntersected(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  // Play/pause follows viewport membership, not mount/unmount — pausing
  // and resuming a still-mounted element is instant and costs nothing,
  // versus tearing down and re-requesting the source on every scroll pass.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {
        // Autoplay can be rejected by the browser (rare, given muted+playsInline);
        // the poster stays visible underneath either way, so this is silent.
      });
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <Image
        src={poster.src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        placeholder={poster.blurDataURL ? "blur" : undefined}
        blurDataURL={poster.blurDataURL}
        className={`object-cover object-center ${mediaClassName}`}
        style={filterStyle}
      />

      {!reduced && hasIntersected && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            videoReady ? "opacity-100" : "opacity-0"
          } ${mediaClassName}`}
          style={filterStyle}
          src={src}
          poster={poster.src}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden
          onPlaying={() => setVideoReady(true)}
        />
      )}
    </div>
  );
}
