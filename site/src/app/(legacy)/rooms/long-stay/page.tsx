import type { Metadata } from "next";
import { Container } from "@/components/primitives/container";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { Reveal } from "@/components/primitives/reveal";
import { StaggerGroup, StaggerItem } from "@/components/primitives/stagger-group";
import { RoomCard } from "@/components/shared/room-card";
import { getLongStayRooms } from "@/lib/content/rooms";
import { longStayCopy } from "@/lib/content/copy";

export const metadata: Metadata = {
  title: "Long-Stay Apartments",
  description: "Long-stay apartments at Fig Tree Residences — kitchen, laundry, and workspace, for guests who need daily infrastructure, not just a room.",
};

export default function LongStayPage() {
  const rooms = getLongStayRooms();

  return (
    <Container className="py-(--space-4xl)">
      <Reveal className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <h1 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">{longStayCopy.headline}</h1>
          {longStayCopy.body.map((p) => (
            <p key={p} className="mt-4 text-(length:--text-body-l) text-(--color-text-muted)">{p}</p>
          ))}
        </div>
        <div className="lg:col-span-5 lg:col-start-8 relative aspect-[4/3]">
          <ImageWithFallback
            src="/images/rooms/kitchenette-breakfast-bar.jpg"
            alt="Kitchenette breakfast bar, suited to an extended stay"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 42vw, 100vw"
          />
        </div>
      </Reveal>

      <h2 className="sr-only">{longStayCopy.cta}</h2>
      <StaggerGroup className="mt-16 grid sm:grid-cols-2 gap-6 lg:gap-8">
        {rooms.map((room) => (
          <StaggerItem key={room.slug}>
            <RoomCard room={room} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Container>
  );
}
