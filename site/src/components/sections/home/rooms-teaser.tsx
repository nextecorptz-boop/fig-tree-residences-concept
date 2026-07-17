"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/primitives/container";
import { StaggerGroup, StaggerItem } from "@/components/primitives/stagger-group";
import { RoomCard } from "@/components/shared/room-card";
import { roomTypes } from "@/lib/content/rooms";
import { homeCopy } from "@/lib/content/copy";

/** Section 3 — Rooms Teaser. Reuses RoomCard, per website/05_COMPONENT_TREE.md Section 5's ownership note. */
export function RoomsTeaser() {
  const featured = roomTypes.slice(0, 3);

  return (
    <motion.section className="py-(--space-4xl) bg-(--color-surface-raised)">
      <Container>
        <div className="flex items-end justify-between gap-4 mb-10">
          <h2 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">{homeCopy.roomsTeaser.headline}</h2>
          <Link href="/rooms" className="hidden sm:inline text-(length:--text-nav) border-b border-(--color-accent-primary) pb-0.5 whitespace-nowrap">
            {homeCopy.roomsTeaser.cta}
          </Link>
        </div>
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((room) => (
            <StaggerItem key={room.slug}>
              <RoomCard room={room} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Link href="/rooms" className="sm:hidden mt-8 inline-block text-(length:--text-nav) border-b border-(--color-accent-primary) pb-0.5">
          {homeCopy.roomsTeaser.cta}
        </Link>
      </Container>
    </motion.section>
  );
}
