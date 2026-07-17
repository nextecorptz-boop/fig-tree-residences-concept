import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { ImageWithFallback } from "@/components/primitives/image-with-fallback";
import { Reveal } from "@/components/primitives/reveal";
import { StaggerGroup, StaggerItem } from "@/components/primitives/stagger-group";
import { Card } from "@/components/primitives/card";
import { ourStoryCopy } from "@/lib/content/copy";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Fig Tree Residences opened quietly in 2018 on the Msasani Peninsula — the true origin story, and the three pillars the residence has always stood on.",
};

export default function OurStoryPage() {
  return (
    <>
      <Container width="content" className="py-(--space-4xl)">
        <Reveal>
          <h1 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">Our Story</h1>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-7 relative aspect-[4/3] lg:aspect-[16/10]">
            <ImageWithFallback
              src="/images/our-story/staff-member-portrait.avif"
              alt="A smiling Fig Tree Residences staff member in branded uniform"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </Reveal>
          <div className="lg:col-span-4 lg:col-start-9 space-y-4">
            {ourStoryCopy.origin.map((p) => (
              <p key={p} className="text-(length:--text-body-l) text-(--color-text-muted)">{p}</p>
            ))}
          </div>
        </div>
      </Container>

      <div className="bg-(--color-surface-raised) py-(--space-4xl)">
        <Container>
          <h2 className="font-display text-[28px] leading-[1.2] text-center mb-12">{ourStoryCopy.pillarsHeadline}</h2>
          <StaggerGroup className="grid sm:grid-cols-3 gap-8">
            {ourStoryCopy.pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <h3 className="text-(length:--text-heading-3) font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-(length:--text-body) text-(--color-text-muted)">{pillar.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </div>

      <Reveal extended className="py-(--space-5xl) text-center px-6">
        <p className="font-display italic text-2xl lg:text-4xl max-w-2xl mx-auto">&ldquo;{siteConfig.cicero}&rdquo;</p>
        <p className="mt-4 text-(length:--text-caption) text-(--color-text-muted)">— {siteConfig.ciceroAttribution}</p>
      </Reveal>

      <Container className="pb-(--space-4xl)">
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="p-0 overflow-hidden">
            <Link href="/rooms/long-stay" className="block p-6">
              <p className="font-display text-[20px]">{ourStoryCopy.longStayLink.headline}</p>
              <p className="mt-1 text-(length:--text-body) text-(--color-text-muted)">{ourStoryCopy.longStayLink.body}</p>
              <span className="mt-3 inline-block text-(length:--text-nav) border-b border-(--color-accent-primary)">
                {ourStoryCopy.longStayLink.cta}
              </span>
            </Link>
          </Card>
          <Card className="p-0 overflow-hidden">
            <Link href="/journal" className="block p-6">
              <p className="font-display text-[20px]">{ourStoryCopy.journalLink.headline}</p>
              <p className="mt-1 text-(length:--text-body) text-(--color-text-muted)">{ourStoryCopy.journalLink.body}</p>
              <span className="mt-3 inline-block text-(length:--text-nav) border-b border-(--color-accent-primary)">
                {ourStoryCopy.journalLink.cta}
              </span>
            </Link>
          </Card>
        </div>
      </Container>
    </>
  );
}
