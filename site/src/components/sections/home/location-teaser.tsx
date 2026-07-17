"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { proximityFacts } from "@/lib/content/location";
import { homeCopy } from "@/lib/content/copy";

/** Section 6 — Location Teaser. 2–3 verified distance facts, side by side on desktop. */
export function LocationTeaser() {
  const facts = proximityFacts.slice(0, 3);

  return (
    <Reveal as={motion.section} className="py-(--space-4xl)">
      <Container className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">{homeCopy.locationTeaser.headline}</h2>
          <ul className="mt-6 space-y-3">
            {facts.map((fact) => (
              <li key={fact.label} className="flex gap-3 text-(length:--text-body)">
                <span className="text-(--color-accent-primary-text) font-medium whitespace-nowrap">{fact.distance}</span>
                <span className="text-(--color-text-muted)">{fact.label}</span>
              </li>
            ))}
          </ul>
          <Link href="/location" className="mt-6 inline-block text-(length:--text-nav) border-b border-(--color-accent-primary) pb-0.5">
            {homeCopy.locationTeaser.cta}
          </Link>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 aspect-[4/3] bg-(--color-surface-raised) rounded-(--radius-md) flex items-center justify-center text-(--color-text-muted) text-(length:--text-caption)">
          Map preview — see full Location page
        </div>
      </Container>
    </Reveal>
  );
}
