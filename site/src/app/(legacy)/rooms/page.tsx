import type { Metadata } from "next";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/primitives/stagger-group";
import { RoomCard } from "@/components/shared/room-card";
import { roomTypes } from "@/lib/content/rooms";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description: "Every room type Fig Tree Residences sells, shown honestly — real photography, real specifications, no shared generic image standing in for the whole property.",
};

export default function RoomsPage() {
  return (
    <Container className="py-(--space-4xl)">
      <SectionHeading as="h1" size="1">Rooms &amp; Suites.</SectionHeading>
      <p className="mt-4 text-(length:--text-body-l) text-(--color-text-muted) max-w-2xl">
        Every residence has its own kitchen, its own balcony, its own quiet — forty-three square metres, arranged the way a home is arranged.
      </p>

      <StaggerGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {roomTypes.map((room) => (
          <StaggerItem key={room.slug}>
            <RoomCard room={room} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Container>
  );
}
