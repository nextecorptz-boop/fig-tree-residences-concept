import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { StaggerGroup, StaggerItem } from "@/components/primitives/stagger-group";
import { testimonials, tripAdvisorSnapshot } from "@/lib/content/testimonials";
import { reviewsCopy } from "@/lib/content/copy";

export const metadata: Metadata = {
  title: "Guest Reviews",
  description: "What guests say about staying at Fig Tree Residences.",
};

export default function ReviewsPage() {
  return (
    <Container width="content" className="py-(--space-4xl)">
      <Reveal className="text-center">
        <h1 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">{reviewsCopy.headline}</h1>

        {tripAdvisorSnapshot ? (
          <a
            href={tripAdvisorSnapshot.url}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex items-center gap-2 text-(length:--text-body-l)"
          >
            <Star size={20} className="fill-(--color-accent-secondary) text-(--color-accent-secondary)" aria-hidden />
            {tripAdvisorSnapshot.rating.toFixed(1)} · {tripAdvisorSnapshot.reviewCount} reviews on TripAdvisor
          </a>
        ) : (
          <p className="mt-4 text-(length:--text-body) text-(--color-text-muted)">
            Our TripAdvisor rating will appear here once the live feed is connected.
          </p>
        )}
      </Reveal>

      {testimonials.length === 0 ? (
        <p className="mt-16 text-center text-(length:--text-body-l) text-(--color-text-muted) max-w-lg mx-auto">
          {reviewsCopy.emptyState}
        </p>
      ) : (
        <StaggerGroup className="mt-16 space-y-10">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <blockquote className="font-display text-(length:--text-quote) italic">&ldquo;{t.quote}&rdquo;</blockquote>
              <cite className="mt-3 block not-italic text-(length:--text-caption) text-(--color-text-muted)">
                {t.attribution}
                {t.guestType && ` · ${t.guestType}`}
              </cite>
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </Container>
  );
}
