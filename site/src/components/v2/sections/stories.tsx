"use client";

import Image from "next/image";
import { media } from "@/lib/v2/media";
import { testimonials } from "@/lib/content/testimonials";
import { Reveal } from "@/components/v2/primitives/reveal";
import { CanopyFrame } from "@/components/v2/primitives/canopy-frame";
import { BranchDivider } from "@/components/v2/primitives/branch-divider";

/**
 * 08 — Guest stories.
 *
 * The brief asked for guest stories. There are none — not in the brochure, not
 * on the live site, not anywhere in this project. Writing plausible ones would
 * be fabricating reviews for a real business that real people will book on the
 * strength of, so the component renders a designed empty state instead and reads
 * from the (deliberately empty) testimonials source. Drop verified, consented
 * reviews into lib/content/testimonials.ts and this section fills itself in.
 *
 * What it *can* carry honestly is the property's own voice and the one
 * photograph of a person that exists in the entire library — a member of the
 * team, in uniform. The quotation is Fig Tree's own published About copy,
 * attributed as such. The audit's note was that this image should be treated as
 * a seed rather than a curiosity, so it leads the section.
 */
export function Stories() {
  const portrait = media("staff-portrait");
  const hasReal = testimonials.length > 0;

  return (
    <section className="relative overflow-hidden bg-(--ft-linen) py-[clamp(6rem,14vh,11rem)]">
      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-12 lg:gap-x-14">
          {/* The one human being in the library */}
          <div className="lg:col-span-5">
            <Reveal y={40}>
              <figure className="relative" data-cursor="view" data-cursor-label="The team">
                <CanopyFrame variant="root" hairline="var(--ft-stone)" hairlineOpacity={0.4} className="aspect-[4/5] w-full bg-(--ft-travertine)">
                  <Image
                    src={portrait.src}
                    alt="A member of the Fig Tree Residences team in uniform, setting a table in one of the apartments."
                    fill
                    sizes="(max-width: 1024px) 92vw, 40vw"
                    placeholder="blur"
                    blurDataURL={portrait.blurDataURL}
                    className="object-cover object-[62%_center]"
                  />
                </CanopyFrame>
              </figure>
            </Reveal>
          </div>

          {/* Their own words */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="type-label flex items-center gap-4 text-(--ft-emerald)">
                <span className="h-px w-8 bg-(--ft-emerald)/40" />
                07 — The People
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <blockquote className="mt-8">
                <p className="type-headline text-balance text-(--ft-ink)">
                  &ldquo;A happy, bright and friendly collection of{" "}
                  <em className="text-(--ft-emerald)">professionals</em> who anticipate our guest&rsquo;s
                  expectations of service.&rdquo;
                </p>
                <footer className="type-label mt-8 text-[0.5625rem] text-(--text-muted)">
                  Fig Tree Residences · in their own words
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>

        {/* Guest stories */}
        <div className="mt-[clamp(4rem,10vh,8rem)]">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 pb-5">
              <h2 className="type-title text-(--ft-ink)">In their words</h2>
              <p className="type-label text-[0.5rem] text-(--text-caption)">Guest stories</p>
            </div>
            <BranchDivider seed={14} color="var(--ft-emerald)" />
          </Reveal>

          {hasReal ? (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.slice(0, 3).map((t) => (
                <Reveal key={t.id}>
                  <figure className="flex h-full flex-col justify-between border border-(--hairline) bg-(--ft-cream) p-7">
                    <blockquote className="font-display text-[1.25rem] leading-snug font-light text-(--ft-ink) italic">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="type-label mt-8 text-[0.5rem] text-(--text-muted)">
                      {t.attribution}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <figure className="flex h-full min-h-[210px] flex-col justify-between border border-dashed border-(--ft-stone)/50 p-7">
                    <span aria-hidden className="font-display text-[2.5rem] leading-none text-(--ft-stone)/45">
                      &ldquo;
                    </span>
                    <figcaption className="type-label text-[0.5rem] leading-relaxed text-(--text-caption)">
                      Reserved for a verified guest review
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          )}

          {!hasReal && (
            <Reveal delay={0.2}>
              <p className="type-body mt-7 max-w-[60ch] text-[0.8125rem] text-(--text-muted)">
                Fig Tree is listed on TripAdvisor, Booking.com, Hotels.com and Expedia. Real reviews should be
                pulled from those listings, with attribution and consent, before this section goes live —
                these slots are intentionally empty rather than filled with invented quotations.
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
