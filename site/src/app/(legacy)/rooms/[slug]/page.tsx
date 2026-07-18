import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";
import { getRoomBySlug, roomTypes } from "@/lib/content/rooms";
import { RoomHero } from "@/components/legacy/room-hero";
import { RoomGallery } from "@/components/legacy/room-gallery";

/**
 * Higgsfield micro-interaction clips exist for these two room types only —
 * the full production library (37 shots) lives in
 * deliverables/higgsfield_production/ for a future longer-form film, but the
 * website itself only gets a clip where one has actually been generated and
 * verified against its source photograph.
 */
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

  return (
    <>
      {/* Fullscreen hero — parallax, gentle scale-on-scroll, and the sticky
          title bar that pins once you've scrolled past it live in this
          client component; markup/branding are otherwise unchanged. */}
      <RoomHero name={room.name} differentiator={room.differentiator} image={room.heroImage} video={ROOM_HERO_VIDEO[room.slug]} />

      <Container className="py-(--space-4xl)">
      <div className="mt-2 grid lg:grid-cols-12 gap-10">
        {/* RoomGallery — still cross-fade only on the photographs themselves
            (accuracy over atmosphere); the grid as a whole now drifts at a
            slightly slower rate than the text column beside it. */}
        <RoomGallery images={room.images} />

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
    </>
  );
}
