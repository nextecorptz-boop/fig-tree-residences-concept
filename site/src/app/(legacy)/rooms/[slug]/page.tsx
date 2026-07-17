import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { Button } from "@/components/primitives/button";
import { getRoomBySlug, roomTypes } from "@/lib/content/rooms";

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

  return (
    <Container className="py-(--space-4xl)">
      <h1 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">{room.name}</h1>
      <p className="mt-2 text-(length:--text-body-l) text-(--color-text-muted)">{room.differentiator}</p>

      <div className="mt-10 grid lg:grid-cols-12 gap-10">
        {/* RoomGallery — cross-fade only, no parallax (accuracy over atmosphere) */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-3">
          {room.images.map((img, i) => (
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
        </div>

        {/* RoomFeatureList */}
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-(length:--text-body)">{room.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-(length:--text-body)">
            <div>
              <dt className="text-(length:--text-caption) text-(--color-text-muted)">Size</dt>
              <dd>{room.sizeSqm} m²</dd>
            </div>
            <div>
              <dt className="text-(length:--text-caption) text-(--color-text-muted)">Occupancy</dt>
              <dd>{room.occupancy} guests</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-(length:--text-caption) text-(--color-text-muted)">Bed configuration</dt>
              <dd>{room.bedConfiguration}</dd>
            </div>
          </dl>

          <ul className="mt-6 space-y-2 text-(length:--text-body)">
            {room.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 rounded-full bg-(--color-accent-secondary) shrink-0" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-(--color-border-hairline)">
            <p className="text-(length:--text-caption) text-(--color-text-muted)">From</p>
            <p className="font-display text-[28px]">${room.nightlyRateUSD} <span className="text-(length:--text-caption) font-sans text-(--color-text-muted)">/ night</span></p>
            <Button href={`/booking?room=${room.slug}`} className="mt-4 w-full">
              Check Rates
            </Button>
          </div>

          {room.needsClientConfirmation && (
            <p className="mt-4 text-(length:--text-caption) text-(--color-text-muted) italic">
              Room specifications and rate shown are interim, pending confirmation against the actual unit sold.
            </p>
          )}

          {room.longStayEligible && (
            <p className="mt-4 text-(length:--text-caption)">
              <Link href="/rooms/long-stay" className="border-b border-(--color-accent-primary)">
                Eligible for long-stay terms
              </Link>
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
