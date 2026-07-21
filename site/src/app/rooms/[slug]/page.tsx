import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getRoomBySlug, roomTypes } from "@/lib/content/rooms";
import { RoomGallery } from "@/components/v2/rooms/room-gallery";
import { CanopyFrame } from "@/components/v2/primitives/canopy-frame";
import { LuxuryVideo } from "@/components/v2/primitives/luxury-video";
import { Reveal } from "@/components/v2/primitives/reveal";
import { BranchShadow } from "@/components/v2/primitives/branch-shadow";

const ROOM_HERO_VIDEO: Record<string, string> = {
  "garden-view-studio": "/media/video/garden-view-studio.mp4",
  "classic-residence": "/media/video/classic-residence.mp4",
};

export function generateStaticParams() {
  return roomTypes.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return {};
  return {
    title: room.name,
    description: room.differentiator,
  };
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  // Find the other room for the "Next Residence" switcher
  const nextRoom = roomTypes.find((r) => r.slug !== slug) || roomTypes[0];

  // Separate hero, signature, story and gallery images to keep pagination authentic
  const heroImage = room.heroImage;
  const signatureImage = room.images[1] || room.images[0];
  const storyImage = room.images[2] || room.images[0];
  const storyImage2 = room.images[3] || room.images[0];
  const galleryImages = room.images;

  return (
    <article className="min-h-screen">
      {/* 01 — Immersive Room Hero */}
      <section className="relative h-[90vh] w-full overflow-hidden flex flex-col justify-end pb-16">
        <div aria-hidden className="absolute inset-0 z-0">
          <LuxuryVideo
            src={ROOM_HERO_VIDEO[room.slug]}
            poster={{ src: heroImage.src }}
            alt={heroImage.alt}
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,18,15,0.4) 0%, rgba(4,18,15,0.2) 50%, rgba(4,18,15,0.85) 100%)",
          }}
        />

        <div className="shell relative z-20">
          <div className="max-w-[70ch]">
            <span className="type-label text-(--ft-verdigris) tracking-[0.3em]">Serviced Apartment</span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] font-light text-(--ft-cream) mt-4">
              {room.name}
            </h1>
            <p className="type-lede text-(--ft-cream)/80 mt-6 max-w-[42ch]">
              {room.differentiator}
            </p>
            <div className="mt-8 flex items-center gap-3 text-[0.8125rem] text-(--ft-verdigris)">
              <span className="animate-bounce">↓</span>
              <span className="type-label text-[0.625rem]">Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Editorial Introduction */}
      <section className="py-[clamp(5rem,12vh,9rem)] bg-(--ft-forest)">
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 items-start">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="type-label text-(--ft-verdigris)">The Residence</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="type-headline mt-6 text-(--ft-cream) font-light">
                  Forty-three square metres,<br />arranged like a home.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={0.14}>
                <p className="type-body text-(--ft-cream)/70 leading-relaxed">
                  {room.description}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Signature Image Moment */}
      <section className="py-6 bg-(--ft-abyss)">
        <div className="shell">
          <Reveal y={36}>
            <CanopyFrame variant="crown" hairlineOpacity={0.15} className="aspect-[16/10] w-full bg-(--ft-canopy)">
              <div className="relative h-full w-full">
                <Image
                  src={signatureImage.src}
                  alt={signatureImage.alt}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTYgOSI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjkiIGZpbGw9IiMwYjNhMzAiLz48L3N2Zz4="
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <BranchShadow seed={42} intensity={0.2} />
              </div>
            </CanopyFrame>
          </Reveal>
        </div>
      </section>

      {/* 04 — Room Story / Details (Split Layouts) */}
      <section className="py-[clamp(5rem,12vh,9rem)] bg-(--ft-forest) space-y-24 lg:space-y-36">
        {/* Story Row 1 */}
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 items-center">
            <div className="lg:col-span-6">
              <Reveal y={32}>
                <CanopyFrame variant="window" hairlineOpacity={0.14} className="aspect-[4/3] w-full bg-(--ft-canopy)">
                  <Image
                    src={storyImage.src}
                    alt={storyImage.alt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 46vw"
                    className="object-cover"
                  />
                </CanopyFrame>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={0.1}>
                <p className="type-label text-(--ft-verdigris)">The Layout</p>
                <h3 className="type-title mt-4 text-(--ft-cream)">A space designed to sit, cook, and rest in absolute privacy.</h3>
                <p className="type-body text-(--ft-cream)/70 mt-6 leading-relaxed">
                  Unlike traditional hotel layouts, every room at Fig Tree is oriented around independent living. A dedicated seating area balances leisure, while the custom kitchenette provides complete culinary autonomy during your stay.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Story Row 2 (Reversed) */}
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 items-center lg:flex-row-reverse">
            <div className="lg:col-span-5 lg:col-start-1 lg:order-2 lg:col-end-6">
              <Reveal delay={0.1}>
                <p className="type-label text-(--ft-verdigris)">Specifications</p>
                <h3 className="type-title mt-4 text-(--ft-cream)">Considered details, measured for long-stay comfort.</h3>
                <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-(--ft-sage)/10 pt-8">
                  <div>
                    <dt className="type-label text-[0.5625rem] text-(--ft-sage)/60">Dimensions</dt>
                    <dd className="font-display text-[1.5rem] text-(--ft-cream) mt-1">{room.sizeSqm} m²</dd>
                  </div>
                  <div>
                    <dt className="type-label text-[0.5625rem] text-(--ft-sage)/60">Occupancy</dt>
                    <dd className="font-display text-[1.5rem] text-(--ft-cream) mt-1">{room.occupancy} Guests</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="type-label text-[0.5625rem] text-(--ft-sage)/60">Bed Configuration</dt>
                    <dd className="font-display text-[1.5rem] text-(--ft-cream) mt-1">{room.bedConfiguration}</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:order-1">
              <Reveal y={32}>
                <CanopyFrame variant="root" hairlineOpacity={0.14} className="aspect-[4/3] w-full bg-(--ft-canopy)">
                  <Image
                    src={storyImage2.src}
                    alt={storyImage2.alt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 46vw"
                    className="object-cover"
                  />
                </CanopyFrame>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Cinematic Gallery */}
      <section className="py-[clamp(5rem,12vh,9rem)] bg-(--ft-abyss)">
        <div className="shell">
          <div className="mb-12">
            <Reveal>
              <p className="type-label text-(--ft-verdigris)">Residence Gallery</p>
              <h2 className="type-headline mt-4 text-(--ft-cream)">A quiet look inside.</h2>
            </Reveal>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <RoomGallery images={galleryImages} />

            {/* Factual features beside gallery */}
            <div className="lg:col-span-4 lg:col-start-9 bg-(--ft-forest)/40 border border-(--ft-sage)/10 p-8 rounded-sm">
              <p className="type-label text-(--ft-verdigris)">Factual Amenities</p>
              <h4 className="type-title mt-2 text-(--ft-cream) text-[1.5rem]">Included features.</h4>
              <ul className="mt-6 space-y-4 text-[0.9375rem] font-light text-(--ft-cream)/80">
                {room.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 border-b border-(--ft-sage)/5 pb-3">
                    <span className="text-(--ft-verdigris) text-xs mt-0.5" aria-hidden>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {room.needsClientConfirmation && (
                <p className="mt-6 text-[0.75rem] text-(--ft-sage)/60 italic leading-relaxed">
                  Specifications and rates shown are interim, pending confirmation against the actual unit sold.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 07 — Rate / Enquiry CTA */}
      <section className="py-[clamp(6rem,14vh,11rem)] bg-(--ft-forest) border-t border-(--ft-sage)/10 relative">
        <div className="shell text-center relative z-10">
          <Reveal>
            <p className="type-label text-(--ft-verdigris)">Reservations</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-tight font-light text-(--ft-cream) mt-6">
              Stay at Fig Tree
            </h2>
            <p className="type-body text-(--ft-cream)/60 max-w-[42ch] mx-auto mt-4 leading-relaxed">
              Rates for short and long-term stays are confirmed individually based on season and duration.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href={`/booking?room=${room.slug}`}
                className="group relative overflow-hidden border border-(--ft-verdigris) bg-transparent px-10 py-4 inline-block tracking-widest text-xs uppercase text-(--ft-cream) transition-colors duration-500 hover:text-(--ft-forest)"
              >
                <span className="relative z-10">Enquire about availability</span>
                <span className="absolute inset-0 -translate-x-full bg-(--ft-verdigris) transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
              </Link>
              <Link
                href="/#apartments"
                className="type-label text-[0.6875rem] text-(--ft-sage) hover:text-(--ft-cream) transition-colors py-2 border-b border-transparent hover:border-(--ft-cream)/20"
              >
                Back to all residences
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 08 — Next Residence Switcher */}
      <section className="border-t border-(--ft-sage)/10 bg-(--ft-abyss) py-[clamp(4rem,10vh,7rem)] relative overflow-hidden group">
        <Link href={`/rooms/${nextRoom.slug}`} className="block absolute inset-0 z-0">
          <Image
            src={nextRoom.heroImage.src}
            alt={nextRoom.heroImage.alt}
            fill
            className="object-cover opacity-15 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-(--ft-abyss) via-(--ft-abyss)/80 to-transparent" />
        </Link>

        <div className="shell relative z-10 pointer-events-none">
          <div className="max-w-[48ch]">
            <p className="type-label text-(--ft-verdigris)">Explore another residence</p>
            <h3 className="font-display text-[2rem] lg:text-[2.75rem] leading-tight font-light text-(--ft-cream) mt-4">
              {nextRoom.name}
            </h3>
            <p className="text-sm font-light text-(--ft-cream)/60 mt-2">
              {nextRoom.differentiator}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 text-xs text-(--ft-verdigris) pointer-events-auto">
              <Link href={`/rooms/${nextRoom.slug}`} className="type-label text-[0.6875rem] tracking-[0.2em] border-b border-(--ft-verdigris)/45 pb-1 hover:text-(--ft-cream) hover:border-(--ft-cream)">
                View Residence →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
