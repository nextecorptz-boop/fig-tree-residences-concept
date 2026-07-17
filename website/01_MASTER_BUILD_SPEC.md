# Fig Tree Residences — Master Build Specification
### Phase 4: Master Build Specification — v1.0

This is the top-level engineering brief for the Fig Tree Residences rebuild. It sets the technical stack, the goals every later decision is measured against, and the budgets that make those goals checkable rather than aspirational. It assumes everything established in Discovery, Experience Strategy, and Design Language as fixed input, and it produces no code — this document and the fourteen that follow it are the specification a build team implements against, not the implementation itself.

## 1. Project Vision

Rebuild Fig Tree Residences' digital presence as a calm, specific, editorial boutique-residence experience — replacing a thin, partially broken Wix site with a fast, accessible, content-complete site that closes every gap Discovery identified (missing rates, no brand story, colour-cast photography, a Departure moment that has never existed) while carrying forward the Design Language defined in Phase 3 without deviation.

## 2. Assumed Technical Stack — and Why

No stack was specified by the client in any document this project has produced to date, so the following is a recommendation with stated rationale, to be confirmed before Milestone 1 begins (see `13_IMPLEMENTATION_ROADMAP.md`).

| Layer | Recommendation | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router), TypeScript | Server-rendered pages for SEO-critical content (rates, location), file-based routing that maps cleanly to the sitemap in `02_SITE_MAP.md`, and first-class image optimisation needed for `08_IMAGE_OPTIMIZATION_PLAN.md` |
| Styling | Tailwind CSS, configured directly from the tokens in Design Language `03_DESIGN_TOKENS.md` | Keeps every colour, spacing, and radius value traceable to one source rather than duplicated across components |
| Animation | Framer Motion (primary) + GSAP with ScrollTrigger (scroll-linked parallax only) | See `06_ANIMATION_MAP.md` for the exact split; using both without a rule produces inconsistent, hard-to-maintain motion code |
| Data / content | Supabase (Postgres) | Rooms, rates, testimonials, and Journal entries need to be editable by the client without a redeploy; Supabase gives a real database and auth without committing to a full third-party CMS subscription |
| Payments | Pesapal, retained | Discovery found Pesapal already integrated and functioning as the property's payment processor — this is the regionally correct choice for a Tanzania-based property and should not be replaced without a specific client reason. Stripe may be added later as a secondary option for international card guests, but is not required for launch |
| Image/media hosting | Next.js Image pipeline, source assets in Supabase Storage or a CDN bucket | Keeps optimisation (AVIF/WebP, responsive `srcset`) automatic rather than manually maintained per image |
| Hosting | Vercel | The natural deployment target for a Next.js app of this size, with good defaults for the Core Web Vitals budget in `09_PERFORMANCE_PLAN.md` |
| Maps | A custom-styled map provider (Mapbox GL or an equivalent that supports full style customisation) | A default embedded Google Map's colours clash with the palette in Design Language `03_DESIGN_TOKENS.md`; the Location section specifically requires a brand-matched map per Design Language `04_COMPONENT_LIBRARY.md` |

## 3. Experience Goals (Carried Forward, Not Renegotiated)

Every experience goal below was established in Phase 2 and Phase 3 and is restated here as a build constraint, not a new decision: the site must produce the feeling "I never want to leave" (Experience Thesis); it must never resemble a corporate hotel chain (Design Language); it must resolve the Departure stage that currently has no digital touchpoint at all (Guest Journey, Storytelling Flow); and it must never ship a page missing Tier One content — rates, real room differentiation, a working booking path — as defined in Phase 2's Content Hierarchy.

## 4. Technical Goals

Ship a site that is fast and stable enough that its own performance never becomes a second trust problem layered on top of the ones Discovery already found (the current site's broken contact form, triplicated payment icons). Concretely: every page passes the Lighthouse and Core Web Vitals budgets in `09_PERFORMANCE_PLAN.md`; every page meets WCAG AA per `11_ACCESSIBILITY_PLAN.md`; every page is correctly indexable and structured per `10_SEO_PLAN.md`; and the codebase's component structure matches `05_COMPONENT_TREE.md` closely enough that a new engineer can locate any given piece of UI without guesswork.

## 5. Performance Budget (Summary — Full Detail in `09_PERFORMANCE_PLAN.md`)

| Metric | Target |
|---|---|
| Lighthouse Performance | 95+ on mobile, for every page in the sitemap |
| Largest Contentful Paint (LCP) | ≤ 2.5s on a throttled 4G profile |
| Cumulative Layout Shift (CLS) | ≤ 0.1 |
| Interaction to Next Paint (INP) | ≤ 200ms |
| Initial JS payload (per route, gzipped) | ≤ 170KB |

## 6. Accessibility Targets (Summary — Full Detail in `11_ACCESSIBILITY_PLAN.md`)

WCAG 2.1 AA across the entire site, non-negotiably including the Booking flow — the single highest-risk stage identified in Experience Strategy's `05_EXPERIENCE_MAP.md`. Full keyboard operability, visible focus states on every interactive element, and complete respect for `prefers-reduced-motion` across every animation defined in `06_ANIMATION_MAP.md`.

## 7. SEO Targets (Summary — Full Detail in `10_SEO_PLAN.md`)

Correct, complete metadata on every page (directly fixing the "Www.figtree.co.tz"-in-title-tag defect Discovery found on the current live site); structured data (`LodgingBusiness`/`Hotel` and `LocalBusiness` schema) on every page where applicable; a resolved, singular canonical domain (see Section 8); and a genuine internal-linking structure connecting Location, Rooms, and Rates & Booking, none of which meaningfully cross-link today.

## 8. Open Decision Carried From Experience Strategy: The Domain Question

Phase 2's `NEXT_PHASE.md` flagged that figtreeresidences.com and figtree.co.tz cannot both remain the property's address of record. This build specification assumes the rebuild will launch on a single, confirmed canonical domain, with the other permanently redirected (301) to it. This decision must be confirmed before `10_SEO_PLAN.md`'s metadata and canonical-tag work begins, since building SEO infrastructure against an unconfirmed domain is wasted effort.

## 9. Mobile Targets

Given Discovery found no evidence the current site was ever specifically audited on a real device, and given a meaningful share of this property's guests (embassy staff, NGO professionals, business travellers booking on the move) will arrive on mobile, this build treats mobile as the primary design target, not a secondary breakpoint adaptation of a desktop layout — consistent with `12_RESPONSIVE_SPEC.md`. Every section blueprint in `04_SECTION_BLUEPRINT.md` specifies mobile behaviour with equal weight to desktop behaviour, not as an afterthought column.

## 10. How the Rest of This Folder Is Organised

`02_SITE_MAP.md` through `05_COMPONENT_TREE.md` define structure; `06_ANIMATION_MAP.md` and `07_HIGGSFIELD_SHOTLIST.md` define motion and media production; `08_IMAGE_OPTIMIZATION_PLAN.md` through `12_RESPONSIVE_SPEC.md` define the non-functional engineering requirements; `13_IMPLEMENTATION_ROADMAP.md` sequences the work; `14_CONTENT_MAPPING.md` connects real content to real components; and `15_QA_CHECKLIST.md` is the gate the finished build must pass before launch.
