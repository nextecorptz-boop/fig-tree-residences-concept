"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { RingCursorZone } from "@/components/primitives/ring-cursor";
import { backdropVariants, lightboxVariants } from "@/lib/motion/variants";
import type { MediaCategory, MediaItem } from "@/lib/content/media";

const CATEGORIES: { value: MediaCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "rooms", label: "Rooms" },
  { value: "gardens", label: "Gardens" },
  { value: "dining", label: "Dining" },
  { value: "amenities", label: "Amenities" },
  { value: "exterior", label: "Exterior" },
];

/** design/04_COMPONENT_LIBRARY.md Section 3 + website/04_SECTION_BLUEPRINT.md Sections 24–25. */
export function Gallery({ items }: { items: MediaItem[] }) {
  const [filter, setFilter] = useState<MediaCategory | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      {/* CategoryFilter — Pattern I filter-reflow */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0" role="group" aria-label="Filter gallery by category">
        {CATEGORIES.map((cat) => {
          const active = filter === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(cat.value)}
              className={`shrink-0 min-h-11 px-4 rounded-(--radius-sm) text-(length:--text-nav) border transition-colors ${
                active
                  ? "border-(--color-accent-primary) bg-(--color-surface-raised) font-medium underline underline-offset-4"
                  : "border-(--color-border-hairline) hover:border-(--color-accent-primary)"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ImageGrid */}
      <RingCursorZone label="View" className="block">
        <motion.div layout className="mt-8 columns-2 lg:columns-3 gap-3 space-y-3">
          <AnimatePresence>
            {filtered.map((item) => {
              const globalIndex = items.indexOf(item);
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => setLightboxIndex(globalIndex)}
                  className="relative block w-full break-inside-avoid overflow-hidden rounded-(--radius-sm)"
                >
                  <ImageWithFallback
                    src={item.src}
                    alt={item.alt}
                    width={600}
                    height={item.span === "tall" ? 800 : item.span === "wide" ? 400 : 600}
                    className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-450"
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </RingCursorZone>

      <Lightbox items={items} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
    </div>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: MediaItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const open = index !== null;
  const current = open ? items[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNavigate((index! + 1) % items.length);
            if (e.key === "ArrowLeft") onNavigate((index! - 1 + items.length) % items.length);
          }}
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          <motion.div
            variants={lightboxVariants}
            className="relative max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={current.src}
              alt={current.alt}
              width={1600}
              height={1200}
              className="w-full h-auto max-h-[85vh] object-contain"
              sizes="90vw"
            />
            <p className="mt-2 text-center text-(length:--text-caption) text-white/80">{current.alt}</p>
          </motion.div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-4 right-4 min-h-11 min-w-11 flex items-center justify-center text-white"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index! - 1 + items.length) % items.length);
            }}
            className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 min-h-11 min-w-11 flex items-center justify-center text-white"
          >
            <ChevronLeft size={32} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index! + 1) % items.length);
            }}
            className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 min-h-11 min-w-11 flex items-center justify-center text-white"
          >
            <ChevronRight size={32} strokeWidth={1.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
