/**
 * Narrative copy per website/04_SECTION_BLUEPRINT.md, written to
 * docs/09_COPY_DIRECTION.md's voice (calm, specific, rooted — never
 * "hotel," never superlative-stacked, never urgency language). Facts are
 * drawn from docs/CONTENT_DATABASE.md and docs/02_BRAND_STORY.md; nothing
 * here invents a fact Discovery didn't already confirm.
 */

export const homeCopy = {
  hero: {
    headline: "A Garden Residence on the Msasani Peninsula",
    subline: "Two hundred metres from the water. Private, quiet, and rooted since 2018.",
    cta: "Explore the Residence",
  },
  ourStoryTeaser: {
    headline: "A Place That Has Simply Been Trusted",
    body: "Fig Tree Residences opened quietly in 2018, on a stretch of the Msasani Peninsula it has never left. What's grown here since is less a brand than a habit — guests who found it once, and came back.",
    cta: "Read Our Story",
  },
  roomsTeaser: {
    headline: "Where You'll Stay.",
    cta: "View All Rooms",
  },
  gardensTeaser: {
    headline: "Step into a garden that has had years to grow.",
    cta: "Step Into the Garden",
  },
  reviewsStrip: {
    headline: "From Guests Who've Stayed.",
    cta: "Read More Reviews",
  },
  locationTeaser: {
    headline: "200 Metres From the Yacht Club.",
    cta: "See the Neighbourhood",
  },
  departure: {
    headline: "Until next time.",
  },
} as const;

export const ourStoryCopy = {
  headline: "Our Story",
  origin: [
    "Fig Tree Residences opened quietly — a soft launch in May 2018, fully operational by that August — on the Msasani Peninsula, in Leopard Cove Bay, two hundred metres from the Dar es Salaam Yacht Club.",
    "There was no launch campaign. What's here now is the same thing that was here then: a small, rooted garden residence, built the way a fig tree grows — patiently, and meant to be returned to, not just visited.",
  ],
  pillarsHeadline: "What We Protect.",
  pillars: [
    {
      title: "Privacy",
      body: "Our premises are reserved exclusively for our guests. A residence, not a hotel corridor — your stay is yours alone.",
    },
    {
      title: "Security",
      body: "Coded access, a watched property, and the kind of quiet dependability that lets you exhale on arrival — not a checklist to read through.",
    },
    {
      title: "Calm",
      body: "The pursuit, even of the best things, ought to be calm and tranquil — the instruction this residence has followed since it opened.",
    },
  ],
  longStayLink: {
    headline: "Staying longer?",
    body: "Kitchen, laundry, and quiet — read about daily life at Fig Tree.",
    cta: "Read About Long Stay",
  },
  journalLink: {
    headline: "The Journal",
    body: "Occasional writing from the residence, since 2018.",
    cta: "Visit the Journal",
  },
} as const;

export const longStayCopy = {
  headline: "Living at Fig Tree.",
  body: [
    "A long stay asks something different of a place than a weekend does. Every residence here has its own kitchen, its own laundry, its own workspace — the kind of daily infrastructure that turns a room into somewhere you actually live.",
    "Guests who stay a month find the same quiet that guests who stay three nights do, just with more time inside it.",
  ],
  cta: "See Long-Stay Rooms",
} as const;

export const amenitiesCopy = {
  headline: "Amenities.",
  intro: "Every comfort here is meant to be used, not just listed.",
} as const;

export const gardensCopy = {
  body: "A living wall, mature trees, rattan seating worn soft by years of use. This is the slowest part of the property to move through, on purpose.",
} as const;

export const diningCopy = {
  body: "Dinner, or a sundowner, on the rooftop — string lights at dusk, and a view of the bay and the Yacht Club below.",
} as const;

export const locationCopy = {
  headline: "200 Metres From the Yacht Club.",
  intro: "We are on the Msasani Peninsula, in Leopard Cove Bay — close enough to everything worth walking to.",
} as const;

export const galleryCopy = {
  headline: "Gallery.",
} as const;

export const reviewsCopy = {
  headline: "From Guests Who've Stayed.",
  emptyState: "Guest reviews are being gathered from our TripAdvisor listing and will appear here shortly.",
} as const;

export const journalCopy = {
  headline: "Journal.",
} as const;

export const contactCopy = {
  headline: "Get in Touch.",
  intro: "Our premises suit both long and short stays — send a message below, or reach us directly on WhatsApp.",
} as const;

export const bookingCopy = {
  headline: "Check Rates & Availability.",
  rateDisplayHeadline: "Your Rate.",
  paymentHeadline: "Payment.",
  paymentIntro: "Payment completes securely through Pesapal, our payment partner.",
  confirmationHeadline: "You're Booked.",
} as const;
