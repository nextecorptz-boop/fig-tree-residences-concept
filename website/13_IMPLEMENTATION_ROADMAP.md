# Fig Tree Residences — Implementation Roadmap
### Phase 4: Master Build Specification — v1.0

Eight milestones, each with scope, dependencies, and exit criteria. This roadmap assumes the open decisions flagged elsewhere in this folder (the domain choice in `01_MASTER_BUILD_SPEC.md` Section 8, the stack confirmation in Section 2, and the reception-wall-portrait decision in `LUXURY_OPPORTUNITIES.md`) are resolved at or before Milestone 1 — building past them unresolved only defers the same blocking conversation to a more expensive point in the project.

## Milestone 1 — Foundation

- **Scope:** Repository and Next.js 14 project scaffold; Tailwind configured directly from `03_DESIGN_TOKENS.md`; Supabase project provisioned with the schema implied by `03_PAGE_ARCHITECTURE.md` (`room_types`, `media`, `testimonials`, `journal_posts`, `contact_submissions`); base layout (`Navigation`, `Footer`) built per `05_COMPONENT_TREE.md`; font loading configured per `09_PERFORMANCE_PLAN.md` Section 4; CI pipeline with the Lighthouse and bundle-budget checks from `09_PERFORMANCE_PLAN.md` Section 6/8 wired up before any page content exists, not after.
- **Dependencies:** Confirmed tech stack (Section 2 of `01_MASTER_BUILD_SPEC.md`), confirmed canonical domain, Supabase and Vercel accounts provisioned, Pesapal credentials available.
- **Exit criteria:** An empty but correctly styled and performant shell deploys to a Vercel preview; Lighthouse CI passes on the empty shell; the design token set renders correctly in both the Daylight and Dusk registers.

## Milestone 2 — Homepage

- **Scope:** All seven Home sections from `04_SECTION_BLUEPRINT.md`; the Hero component's image mode (video mode may follow once the new commissioned hero footage exists, per `07_HIGGSFIELD_SHOTLIST.md`); the shared components this milestone first exercises (`RoomCard`, `Testimonials`, `LocationMap` at reduced scale).
- **Dependencies:** Milestone 1 complete; at minimum the corrected/retained image set from `07_HIGGSFIELD_SHOTLIST.md` available in Supabase Storage per `08_IMAGE_OPTIMIZATION_PLAN.md` Section 5's housekeeping step.
- **Exit criteria:** Home passes its Lighthouse/CWV budget on a real throttled-4G device test, not just CI; content matches `14_CONTENT_MAPPING.md`'s Home mapping with no placeholder Lorem Ipsum remaining.

## Milestone 3 — Rooms

- **Scope:** Rooms index, Room detail (`[slug]`), and Long Stay pages; `room_types` table populated with real data; `RoomDetail`/`RoomGallery`/`RoomFeatureList` components.
- **Dependencies:** Milestone 1; the per-room-type commissioned photography from `07_HIGGSFIELD_SHOTLIST.md` Section 6 (or, at minimum, the corrected existing AVIF room photography as an interim substitute, explicitly flagged as interim if used).
- **Exit criteria:** Every actual room type the property sells has its own working detail page with accurate, non-distorted imagery and a working "Check Rates" handoff into the (not-yet-live) Booking flow.

## Milestone 4 — Amenities

- **Scope:** Amenities, Gardens, Dining, Location, and Experiences pages; `AmenityCard`/`GardenSection`/`Restaurant`/`LocationMap` (full) components; the Amenities-page `FAQAccordion` instance.
- **Dependencies:** Milestone 1; the custom map style/provider decision confirmed; the security-feature imagery from `07_HIGGSFIELD_SHOTLIST.md` Section 6 if the client wants that content live at this stage (otherwise deferred without blocking the milestone).
- **Exit criteria:** All five pages live with accurate content per `14_CONTENT_MAPPING.md`; the Dusk register renders correctly and passes the contrast check from `11_ACCESSIBILITY_PLAN.md` on the Dining page specifically.

## Milestone 5 — Gallery

- **Scope:** The `/gallery` page, `CategoryFilter`/`ImageGrid`/`Lightbox` components, the signature `RingCursor` (Gallery and Gardens are its only two activation contexts, so this is the natural milestone to build it in), and the Reviews page (`RatingSummary`/`TestimonialCard`, the cached TripAdvisor snapshot job).
- **Dependencies:** The image optimisation pipeline from `08_IMAGE_OPTIMIZATION_PLAN.md` fully wired (Classes 1–4 all exercised by this point); `testimonials` table populated.
- **Exit criteria:** Gallery passes its Lighthouse budget despite its image volume (the highest-risk page for this per `09_PERFORMANCE_PLAN.md` Section 1); the ring cursor behaves correctly on non-touch devices and is absent entirely on touch devices, per `07_CURSOR_SYSTEM.md`.

## Milestone 6 — Booking

- **Scope:** The full `BookingWidget` (`RoomDateSelector`, `RateDisplay`, `PesapalHandoff`, `BookingConfirmation`); the Contact page and `ContactForm`; the Journal index/detail pages (grouped into this milestone since they share the "functional, lower-atmosphere page" profile with Contact and are lower risk than Booking itself, filling out the milestone's capacity).
- **Dependencies:** Live Pesapal credentials and a sandbox/test mode confirmed with the client; `contact_submissions` write path and a real notification mechanism (email at minimum) configured.
- **Exit criteria:** A complete, successful end-to-end test booking (sandbox payment) with correct confirmation state; a real test submission through the Contact form produces a genuine success state and a genuine failure state (simulated) — directly proving the false-success defect from the current site cannot recur; full keyboard and screen-reader pass on the Booking flow specifically, per `11_ACCESSIBILITY_PLAN.md` Section 10.

## Milestone 7 — Optimization

- **Scope:** A dedicated milestone (not an afterthought folded into earlier ones) to run the full site against `09_PERFORMANCE_PLAN.md`, `10_SEO_PLAN.md`, and `11_ACCESSIBILITY_PLAN.md` as complete checklists rather than page-by-page spot checks; fix whatever the aggregate site-wide pass surfaces that individual-page milestones didn't catch (cumulative bundle growth, cross-page structured-data consistency, site-wide contrast sweep).
- **Dependencies:** Milestones 2–6 complete.
- **Exit criteria:** Every page individually meets the Lighthouse/CWV/WCAG AA targets; sitemap.xml and robots.txt verified; all structured data validated with a schema-testing tool, not just visually inspected.

## Milestone 8 — Launch

- **Scope:** Final canonical-domain cutover and 301 redirect configuration from the non-canonical domain; `15_QA_CHECKLIST.md` executed in full; DNS/SSL cutover; monitoring (uptime, error tracking) configured; a rollback plan documented in case the cutover surfaces an unexpected regression.
- **Dependencies:** Milestone 7 complete and signed off.
- **Exit criteria:** The confirmed canonical domain serves the new build in production; the old domain redirects correctly on every path; `15_QA_CHECKLIST.md` fully checked with no open items; a real booking has been placed successfully in production (not just sandbox) before the milestone is called complete.

## Cross-Milestone Note

No milestone after Milestone 1 should be treated as "content can be finalised later" — per `06_CONTENT_HIERARCHY.md`'s Tier One rule from Experience Strategy, a milestone that ships a page without its real rates, real room differentiation, or a working booking path is not actually done, even if the code is. This roadmap deliberately sequences Rooms and Booking earlier than a typical marketing-site build might, specifically because Discovery's single most-cited defect on the current site was the absence of visible rates.
