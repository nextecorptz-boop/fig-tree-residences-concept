import Link from "next/link";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { ScrollParallax } from "@/components/primitives/scroll-parallax";
import { homeCopy } from "@/lib/content/copy";

/** Section 4 — Gardens Teaser. Near-wordless, image-led, the slowest drift on Home. */
export function GardensTeaser() {
  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      <ScrollParallax className="absolute inset-0">
        <div className="relative h-[calc(70vh+120px)] min-h-[540px] -mt-[60px] w-full">
          <ImageWithFallback
            src="/images/gardens/garden-living-wall.jpg"
            alt="Living wall of tropical greenery in the garden"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </ScrollParallax>
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <p className="font-display italic text-2xl lg:text-4xl text-white max-w-xl">
          {homeCopy.gardensTeaser.headline}
        </p>
        <Link
          href="/gardens"
          className="mt-6 inline-block text-(length:--text-nav) text-white border-b border-white/70 pb-0.5"
        >
          {homeCopy.gardensTeaser.cta}
        </Link>
      </div>
    </section>
  );
}
