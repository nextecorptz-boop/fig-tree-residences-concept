# Fig Tree Residences — Page Architecture
### Phase 4: Master Build Specification — v1.0

This document defines, for every route in `02_SITE_MAP.md`, its rendering strategy, section order, and data dependencies. Section-level detail (headline, content, animation, CTA) is specified per-section in `04_SECTION_BLUEPRINT.md`; this document is the skeleton those sections are hung on.

## 1. Rendering Strategy by Page Type

| Page type | Strategy | Reason |
|---|---|---|
| Home, Our Story, Amenities, Gardens, Dining, Location, Experiences | Static Generation (SSG) at build time, revalidated on content change | Content changes rarely; these pages should be the fastest in the site for the Performance Budget in `09_PERFORMANCE_PLAN.md` |
| Rooms (index + `[slug]`), Long Stay | Incremental Static Regeneration (ISR), revalidate on a short interval (e.g. 5 minutes) | Room availability/rate context can shift; content itself is near-static |
| Gallery, Journal (index + `[slug]`) | SSG with on-demand revalidation triggered by Supabase content updates | New media/posts should appear without a full redeploy |
| Reviews | ISR, revalidate periodically | Testimonials table changes occasionally; the TripAdvisor pull is fetched server-side on a schedule, not client-side on every visit |
| Contact | Static shell, client-side form submission to a server action/API route | The page itself never changes; only the submission is dynamic |
| Booking | Server-rendered (SSR) or client-rendered with server actions for the Pesapal handoff | Rates and availability must be current at the moment of a booking attempt; this is the one page where staleness is unacceptable |

## 2. Home (`/`)

Section order: Hero → Our Story teaser (one paragraph + link) → Rooms teaser (2–3 featured room types) → Gardens teaser (single strong image + link) → Reviews (2–3 pulled testimonials) → Location teaser (distance highlights + link to full page) → Departure/Footer moment (per `10_HIGGSFIELD_PREP.md` Section 8).

Data: mostly static/CMS copy, plus a light Supabase read for the 2–3 featured room types and 2–3 featured testimonials. No Booking form embedded directly on Home — the CTA is a link to `/booking`, keeping Home's JS payload light per the Performance Budget.

## 3. Our Story (`/our-story`)

Section order: opening narrative (2018 origin) → the three pillars (privacy, security, calm) reframed as reassurance, not a feature list → Cicero quotation, used once, exactly as `09_COPY_DIRECTION.md` specifies → link through to Long Stay for guests reading with a long-stay intent → link through to Journal.

Data: fully static CMS content; no database reads required.

## 4. Rooms (`/rooms`) and Room Detail (`/rooms/[slug]`)

Index page: a filterable grid (short stay / long stay, if the room count justifies filtering; otherwise a simple full list per `04_COMPONENT_LIBRARY.md`'s Room Experience component) pulling from Supabase `room_types`. Each card links to its own detail page rather than expanding inline, so every room type has its own indexable, shareable URL for SEO purposes.

Detail page: one room type in full — gallery, feature list, rate reference (a "from" rate, with the authoritative current rate always confirmed at Booking), and a direct CTA into `/booking` pre-filtered to that room type via query parameter.

Data: Supabase `room_types` (list query for index, single-row query by slug for detail).

## 5. Long Stay (`/rooms/long-stay`)

A narrative-led page (not just a filtered room list) addressing the Long-Stay Resident persona specifically: what daily life in the property looks like, kitchen/laundry/workspace detail, then a filtered subset of `room_types` eligible for long-stay terms.

Data: static CMS narrative + a filtered Supabase `room_types` query.

## 6. Amenities (`/amenities`)

Section order: a short framing paragraph → amenity groups (pool, gym, BBQ garden, breakfast, WiFi/workspace, laundry, kitchenette, parking, security) each using the icon system from `08_ICONOGRAPHY.md` → links out to Gardens and Dining for the two amenities significant enough to be their own pages → an FAQ accordion (practical questions only) at the page's base, per `02_SITE_MAP.md` Section 5.

Data: static CMS content.

## 7. Gardens (`/gardens`) and Dining (`/dining`)

Both are photography-and-mood-led single-scroll pages, deliberately simpler in structure than Amenities: a short piece of copy, the Garden Experience or Restaurant component defined in Design Language, and a closing link back to Amenities and forward to Booking. Dining renders in the Dusk visual register defined in `03_DESIGN_TOKENS.md`; Gardens renders in the standard Daylight register.

Data: static CMS content plus a curated media set from Supabase `media`, filtered by category.

## 8. Location (`/location`)

Section order: the proximity narrative (verified distances from Phase 1's Content Database) → the custom-styled map component → a link into Experiences for guests wanting to know what's nearby beyond logistics.

Data: static CMS content (facts verified in Discovery) + the map component's own tile/style data (not a database read).

## 9. Experiences (`/experiences`)

A CMS-driven list of local activities and points of interest, grouped loosely by type (waterfront/leisure, dining out, culture) — a genuinely new content category this project introduces, addressing personas (Family, Returning Guest) who want more than a distance chart.

Data: static CMS content; could migrate to a Supabase table in a later phase if the list grows large enough to need admin editing without a redeploy.

## 10. Gallery (`/gallery`)

A categorised grid (by space type: Rooms, Gardens, Dining, Amenities, Exterior) pulling every approved image from Supabase `media`, opening into a lightbox on selection. This is the one page where the signature ring cursor defined in `07_CURSOR_SYSTEM.md` is active.

Data: Supabase `media` table, paginated or virtualised if the approved library grows large.

## 11. Reviews (`/reviews`)

A full testimonial list from Supabase `testimonials`, supplemented by a periodically-synced pull of the property's TripAdvisor rating and review count (fetched server-side on a schedule, not live per page-load, to avoid a third-party dependency inside the Performance Budget's critical path).

Data: Supabase `testimonials` + a cached TripAdvisor snapshot.

## 12. Journal (`/journal`) and Journal Post (`/journal/[slug]`)

Index: a simple chronological list from Supabase `journal_posts`. Detail: full post content, rendered from the same table. Given Discovery found only two posts in seven years, this architecture is deliberately simple — no tagging/category system is specified unless the client commits to a genuine publishing cadence; over-building this page now would be speculative scope.

Data: Supabase `journal_posts`.

## 13. Contact (`/contact`)

A static page with a working form (directly replacing the current site's broken, falsely-successful form) submitting to a server action that writes to Supabase `contact_submissions` and triggers a notification (email, at minimum) to the property. Includes the verified address, a real map link, and the WhatsApp link repeated from the navigation utility element.

Data: write-only Supabase `contact_submissions`; no read dependency for page render.

## 14. Rates & Booking (`/booking`)

The highest-stakes page in the site, per `05_EXPERIENCE_MAP.md`. Section order: room-type selector (pre-filtered if arriving from a Rooms detail page) → date/guest selector → live rate display sourced from Supabase `room_types` → Pesapal handoff for payment → a confirmation state. This page carries the heaviest accessibility and performance obligations in the entire project (see `11_ACCESSIBILITY_PLAN.md` and `09_PERFORMANCE_PLAN.md`) and is the one page in this architecture that is explicitly not a candidate for static generation.

Data: Supabase `room_types` (rates/availability context) + the Pesapal API for the actual payment transaction.

## 15. Shared Layout Elements

Every page shares one root layout: the navigation bar (with the six primary links plus the phone/WhatsApp utility element from `02_SITE_MAP.md`), and the footer (secondary navigation, corrected social links, and the Departure-moment closing treatment on Home specifically, per `10_HIGGSFIELD_PREP.md`). No page-specific header/footer variants are specified — consistency here is a deliberate constraint, not an oversight, matching Design Language's instruction that navigation itself should never call attention to itself.
