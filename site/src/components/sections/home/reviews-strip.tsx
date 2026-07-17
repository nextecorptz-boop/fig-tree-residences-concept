import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { StaggerGroup, StaggerItem } from "@/components/primitives/stagger-group";
import { testimonials } from "@/lib/content/testimonials";
import { homeCopy, reviewsCopy } from "@/lib/content/copy";

/** Section 5 — Reviews Strip. No autoplay carousel; manual only, per website/10_MOTION_STRATEGY.md. */
export function ReviewsStrip() {
  const featured = testimonials.slice(0, 3);

  return (
    <Reveal className="py-(--space-4xl)">
      <Container width="content" className="text-center">
        <h2 className="font-display text-[28px] lg:text-[36px] leading-[1.2] mb-10">{homeCopy.reviewsStrip.headline}</h2>

        {featured.length === 0 ? (
          <p className="text-(length:--text-body-l) text-(--color-text-muted) max-w-lg mx-auto">{reviewsCopy.emptyState}</p>
        ) : (
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {featured.map((t) => (
              <StaggerItem key={t.id}>
                <blockquote className="font-display text-(length:--text-quote) italic">&ldquo;{t.quote}&rdquo;</blockquote>
                <cite className="mt-3 block not-italic text-(length:--text-caption) text-(--color-text-muted)">
                  {t.attribution}
                </cite>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}

        <Link href="/reviews" className="mt-10 inline-block text-(length:--text-nav) border-b border-(--color-accent-primary) pb-0.5">
          {homeCopy.reviewsStrip.cta}
        </Link>
      </Container>
    </Reveal>
  );
}
