"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/primitives/container";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { Reveal } from "@/components/primitives/reveal";
import { homeCopy } from "@/lib/content/copy";

/** Section 2 — Our Story Teaser. Image + text asymmetric split on desktop. */
export function OurStoryTeaser() {
  return (
    <Reveal as={motion.section} className="py-(--space-4xl)">
      <Container className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-[16/10]">
          <ImageWithFallback
            src="/images/our-story/building-facade-daylight.jpg"
            alt="Fig Tree Residences building facade among mature trees"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <h2 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">
            {homeCopy.ourStoryTeaser.headline}
          </h2>
          <p className="mt-4 text-(length:--text-body-l) text-(--color-text-muted)">
            {homeCopy.ourStoryTeaser.body}
          </p>
          <Link
            href="/our-story"
            className="mt-6 inline-block text-(length:--text-nav) border-b border-(--color-accent-primary) pb-0.5"
          >
            {homeCopy.ourStoryTeaser.cta}
          </Link>
        </div>
      </Container>
    </Reveal>
  );
}
