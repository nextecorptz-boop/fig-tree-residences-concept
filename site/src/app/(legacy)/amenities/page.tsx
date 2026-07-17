import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Card } from "@/components/primitives/card";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { Reveal } from "@/components/primitives/reveal";
import { StaggerGroup, StaggerItem } from "@/components/primitives/stagger-group";
import { AmenityCard } from "@/components/shared/amenity-card";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { amenities } from "@/lib/content/amenities";
import { amenitiesCopy } from "@/lib/content/copy";
import { amenitiesFaq } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "Amenities",
  description: "Pool, gardens, gym, rooftop dining, and quiet, dependable security — the amenities at Fig Tree Residences, Msasani Peninsula.",
};

export default function AmenitiesPage() {
  return (
    <>
      <Container className="py-(--space-4xl)">
        <Reveal>
          <h1 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">{amenitiesCopy.headline}</h1>
          <p className="mt-4 text-(length:--text-body-l) text-(--color-text-muted) max-w-2xl">{amenitiesCopy.intro}</p>
        </Reveal>

        <StaggerGroup className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-10">
          {amenities.map((amenity) => (
            <StaggerItem key={amenity.id}>
              <AmenityCard amenity={amenity} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-(--space-4xl) grid sm:grid-cols-2 gap-6">
          <Card className="p-0 overflow-hidden">
            <Link href="/gardens" className="block">
              <div className="relative aspect-[16/10]">
                <ImageWithFallback src="/images/gardens/garden-living-wall.jpg" alt="Living wall of tropical greenery" fill className="object-cover" sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
              <div className="p-6">
                <p className="text-(length:--text-heading-3) font-semibold">Explore the Garden</p>
              </div>
            </Link>
          </Card>
          <Card className="p-0 overflow-hidden">
            <Link href="/dining" className="block">
              <div className="relative aspect-[16/10]">
                <ImageWithFallback src="/images/dining/rooftop-dining-dusk.jpg" alt="Rooftop restaurant at dusk" fill className="object-cover" sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
              <div className="p-6">
                <p className="text-(length:--text-heading-3) font-semibold">Explore Dining</p>
              </div>
            </Link>
          </Card>
        </Reveal>
      </Container>

      <div className="bg-(--color-surface-raised)">
        <Container width="content" className="py-(--space-4xl)">
          <h2 className="font-display text-[28px] leading-[1.2] mb-4">Questions.</h2>
          <FaqAccordion items={amenitiesFaq} />
        </Container>
      </div>
    </>
  );
}
