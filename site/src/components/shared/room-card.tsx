import Link from "next/link";
import { Card } from "@/components/primitives/card";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import type { RoomType } from "@/lib/content/rooms";

/** RoomCard — design/04_COMPONENT_LIBRARY.md Section 4. Shared by Home's Rooms Teaser and the Rooms index. */
export function RoomCard({ room }: { room: RoomType }) {
  return (
    <Card className="p-0 overflow-hidden flex flex-col" interactive>
      <Link href={`/rooms/${room.slug}`} className="flex flex-col h-full">
        <div className="relative aspect-[4/3]">
          <ImageWithFallback
            src={room.images[0].src}
            alt={room.images[0].alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </div>
        <div className="p-6 flex flex-col gap-2 flex-1">
          <h3 className="font-sans text-(length:--text-heading-3) font-semibold">{room.name}</h3>
          <p className="text-(length:--text-body) text-(--color-text-muted)">{room.differentiator}</p>
          <p className="mt-auto pt-4 text-(length:--text-caption) text-(--color-text-muted)">
            From{" "}
            <span className="text-(length:--text-heading-3) font-semibold text-(--color-text-primary)">
              ${room.nightlyRateUSD}
            </span>{" "}
            / night
          </p>
        </div>
      </Link>
    </Card>
  );
}
