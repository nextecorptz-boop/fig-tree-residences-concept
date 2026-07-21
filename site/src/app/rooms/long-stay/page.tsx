import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLongStayRooms } from "@/lib/content/rooms";
import { longStayCopy } from "@/lib/content/copy";
import { CanopyFrame } from "@/components/v2/primitives/canopy-frame";
import { Reveal, RevealGroup, RevealItem } from "@/components/v2/primitives/reveal";

export const metadata: Metadata = {
  title: "Long-Stay Apartments",
  description: "Long-stay apartments at Fig Tree Residences — kitchen, laundry, and workspace, for guests who need daily infrastructure.",
};

export default function LongStayPage() {
  const rooms = getLongStayRooms();

  return (
    <div className="py-[clamp(4rem,10vh,7rem)] bg-(--ft-forest)">
      <div className="shell">
        <Reveal className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="type-label text-(--ft-verdigris)">Extended Residency</span>
            <h1 className="font-display text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-light text-(--ft-cream) mt-4">
              {longStayCopy.headline}
            </h1>
            {longStayCopy.body.map((p, i) => (
              <p key={i} className="mt-6 type-body text-(--ft-cream)/70 max-w-[48ch]">
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <CanopyFrame variant="crown" hairlineOpacity={0.15} className="aspect-[4/3] w-full bg-(--ft-canopy)">
              <Image
                src="/media/kitchen-detail.webp"
                alt="Kitchen breakfast bar, suited to an extended stay"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
              />
            </CanopyFrame>
          </div>
        </Reveal>

        <div className="mt-20 border-t border-(--ft-sage)/10 pt-16">
          <Reveal>
            <h2 className="type-headline text-(--ft-cream)">Eligible Residences</h2>
            <p className="type-body text-(--ft-cream)/60 mt-2">The following residences support extended stay terms.</p>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {rooms.map((room, i) => (
              <RevealItem key={room.slug} y={24}>
                <Link
                  href={`/rooms/${room.slug}`}
                  className="group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ft-verdigris) focus-visible:ring-offset-4 focus-visible:ring-offset-(--ft-forest) rounded-sm"
                  aria-label={`Explore ${room.name}`}
                >
                  <CanopyFrame
                    variant={i % 2 === 0 ? "window" : "root"}
                    hairlineOpacity={0.16}
                    className="aspect-[4/3] w-full bg-(--ft-canopy) sm:aspect-[16/11]"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={room.heroImage.src}
                        alt={room.heroImage.alt}
                        fill
                        sizes="(max-width: 768px) 92vw, 46vw"
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-700 group-hover:opacity-90"
                      />
                      <div className="absolute inset-x-0 bottom-0 z-10 p-6 lg:p-8">
                        <p className="font-display text-[1.5rem] leading-tight font-light text-(--ft-cream) lg:text-[1.85rem]">
                          {room.name}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed font-light text-(--ft-cream)/70 max-w-[42ch]">
                          {room.differentiator}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-[0.8125rem] font-light text-(--ft-verdigris) transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                          <span>Explore residence</span>
                          <span aria-hidden>→</span>
                        </div>
                      </div>
                    </div>
                  </CanopyFrame>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </div>
  );
}
