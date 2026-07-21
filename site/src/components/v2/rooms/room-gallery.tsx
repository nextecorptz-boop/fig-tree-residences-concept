"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";

/**
 * Room detail gallery — 2-column grid with subtle scroll motion and
 * a lightweight, accessible full-screen Lightbox viewer.
 */
export function RoomGallery({ images }: { images: { src: string; alt: string }[] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  }, [images.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, handleClose, handleNext, handlePrev]);

  return (
    <>
      <motion.div
        ref={ref}
        style={reduced ? undefined : { y }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: reduced ? 0 : undefined }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-7 grid grid-cols-2 gap-3.5"
      >
        {images.map((img, i) => (
          <button
            type="button"
            key={img.src}
            onClick={() => setSelectedIndex(i)}
            className={`group relative overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ft-verdigris) ${
              i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"
            }`}
            aria-label={`View ${img.alt} in fullscreen`}
          >
            <ImageWithFallback
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
              sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 29vw, 50vw"}
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
            <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/60 backdrop-blur-md text-white text-[0.75rem] px-2.5 py-1 rounded">
              Expand ↗
            </div>
          </button>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-8"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery fullscreen view"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close fullscreen view"
            >
              <span className="text-xl">✕</span>
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/70 text-xs tracking-widest uppercase font-sans">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Prev Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 sm:left-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous image"
              >
                <span className="text-xl">←</span>
              </button>
            )}

            {/* Active Image */}
            <div
              className="relative max-h-[85vh] max-w-[90vw] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="relative h-[75vh] w-full max-w-5xl"
              >
                <ImageWithFallback
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>
              <p className="mt-4 text-center text-sm text-white/80 max-w-xl font-light">
                {images[selectedIndex].alt}
              </p>
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 sm:right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next image"
              >
                <span className="text-xl">→</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
