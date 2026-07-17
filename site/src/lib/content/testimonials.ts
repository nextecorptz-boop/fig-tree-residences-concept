/**
 * Local stand-in for the Supabase `testimonials` table.
 *
 * Deliberately empty: Component Library (design/04_COMPONENT_LIBRARY.md
 * Section 11) requires every testimonial to carry real, verifiable
 * attribution sourced from the property's actual TripAdvisor listing and
 * guest history. No such source material exists anywhere in this project's
 * documentation — inventing quotations here would be fabricating reviews,
 * which this build must never do. Populate this array (or point it at a
 * live Supabase query) once real, consented guest testimonials are
 * collected.
 */

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  guestType?: "Business" | "Family" | "Long Stay";
  consentedPhoto?: string;
};

export const testimonials: Testimonial[] = [];

/** Cached TripAdvisor snapshot — populate from a scheduled server-side pull once live. */
export const tripAdvisorSnapshot: { rating: number; reviewCount: number; url: string } | null = null;
