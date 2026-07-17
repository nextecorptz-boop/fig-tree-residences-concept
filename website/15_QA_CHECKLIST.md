# Fig Tree Residences — Pre-Launch QA Checklist
### Phase 4: Master Build Specification — v1.0

This is the gate the finished build must pass before Milestone 8 (Launch) in `13_IMPLEMENTATION_ROADMAP.md` is considered complete. Every item below traces back to a specific defect Discovery found on the current site or a target set elsewhere in this folder — this checklist exists to prove those defects are actually fixed, not to restate generic QA boilerplate.

## 1. Broken Links & Navigation

- [ ] Every link in `02_SITE_MAP.md`'s full route table resolves (no 404s), tested with an automated link-checker crawl of the full sitemap, not spot-checked by hand.
- [ ] Every internal cross-link specified in `10_SEO_PLAN.md` Section 6 (Room→Booking, Amenities→Gardens/Dining, Location→Experiences, Our Story→Long Stay/Journal) is present and points to the correct destination.
- [ ] The primary nav never exceeds six links on any breakpoint (per `04_COMPONENT_LIBRARY.md`'s constraint) — verified visually at every breakpoint in `12_RESPONSIVE_SPEC.md`'s testing matrix.
- [ ] Outbound Experiences-page links open in a new tab with `rel="noopener"`.

## 2. Animations

- [ ] Every pattern in `06_ANIMATION_MAP.md` fires correctly on its assigned section and resolves to a no-motion state under `prefers-reduced-motion: reduce`.
- [ ] No animation blocks or delays perceived page readiness (i.e., content is never hidden behind an animation that hasn't fired yet — checked specifically on slow connections).
- [ ] GSAP-driven parallax (Gardens, Restaurant, Location) is confirmed disabled on mobile per its documented fallback, not merely slow.
- [ ] The signature `RingCursor` appears only on Gallery and Garden Experience, only on non-touch devices, and never over text, buttons, or the Booking flow.

## 3. Accessibility (WCAG 2.1 AA)

- [ ] Automated axe-core scan passes on every page template with zero critical/serious violations.
- [ ] Full keyboard-only pass completed on the entire site, with particular focus on the Booking flow, `FAQAccordion`, and `Lightbox`.
- [ ] Screen-reader pass (VoiceOver and NVDA, at minimum) completed on the Booking flow specifically.
- [ ] The `teal.bright`-on-`cream.base` contrast correction from `11_ACCESSIBILITY_PLAN.md` Section 1 is verified in the actual rendered UI, not just the token documentation — no small body or label text renders in `teal.bright`.
- [ ] Every image has a specific, descriptive `alt` attribute; no filename-derived or blank alt text remains on any informational image.
- [ ] Every form field (`ContactForm`, `BookingWidget`) has a visible label and correctly wired error announcement.

## 4. Performance

- [ ] Lighthouse Performance ≥95 (mobile, throttled) on Home, a Room detail page, Gallery, and Booking — the four pages flagged as representative/highest-risk in `09_PERFORMANCE_PLAN.md`.
- [ ] LCP ≤2.5s, CLS ≤0.1, INP ≤200ms confirmed via field data (not lab data alone) once the site has real traffic, with a plan to re-check 2–4 weeks post-launch.
- [ ] Initial JS payload ≤170KB gzipped per route, confirmed via the CI bundle-budget check with no failing routes.
- [ ] Video (Gardens, Restaurant) confirmed muted-autoplay-only, disabled on mobile/cellular, and never blocking first paint.

## 5. SEO

- [ ] Every page's title tag is generated from the shared template (no literal domain-name text artifacts, directly re-checking the "Www.figtree.co.tz" defect is gone).
- [ ] `LodgingBusiness`, `LocalBusiness`, and (where applicable) `Review`/`AggregateRating` schema validated with a schema-testing tool on every relevant page.
- [ ] OpenGraph/Twitter Card preview images render correctly cropped when a real link is shared on at least one major platform, checked manually, not assumed from the meta tags alone.
- [ ] `sitemap.xml` and `robots.txt` both live and correctly scoped.
- [ ] The non-canonical domain 301-redirects every path, verified with a crawl of a sample of both old-site URLs and new-site URLs, not just the homepage.
- [ ] NAP (name/address/phone) consistency checked across the site, the Google Business Profile, and at least one major OTA listing.

## 6. Responsive

- [ ] Every item in `12_RESPONSIVE_SPEC.md` Section 10's testing matrix (375px, 428px portrait+landscape, 768px both orientations, 1024px, 1440px, 1920px) checked on the Booking flow specifically, given its flagged landscape risk in Section 7.
- [ ] Navigation, Hero, Rooms grid, Gallery, and Booking each visually confirmed at every breakpoint against their specified behaviour in `12_RESPONSIVE_SPEC.md`.

## 7. Forms

- [ ] `ContactForm` produces a genuine success state on real successful submission and a genuine, distinct error state on a simulated failure — directly disproving the current site's static false-success message defect.
- [ ] Submitted contact messages are confirmed to actually arrive (a real end-to-end test, not just a "write succeeded" check against Supabase).
- [ ] All form validation messages are specific and actionable, not generic ("Please enter a valid email," not "Error").

## 8. Booking

- [ ] A complete sandbox booking end-to-end (room selection → date/guest entry → live rate display → Pesapal handoff → confirmation) succeeds without manual workaround.
- [ ] Rates displayed match Supabase `room_types` exactly at the moment of booking — no stale cached rate shown to a guest.
- [ ] The single, correctly labelled Pesapal payment icon set displays exactly once — directly re-checking the triplicated-icon defect from the current site is gone.
- [ ] A real production booking (not sandbox) is placed successfully before Milestone 8 is considered closed, per `13_IMPLEMENTATION_ROADMAP.md`.

## 9. Image Quality

- [ ] Every "Correct-and-retain" image from `07_HIGGSFIELD_SHOTLIST.md` passes the neutral-wall test from `09_VISUAL_DIRECTION.md` after colour correction.
- [ ] No "Replace" or "Reference-only" image from `07_HIGGSFIELD_SHOTLIST.md` appears live on the site.
- [ ] Every image serves through the AVIF→WebP→JPEG fallback chain with no layout shift on load, confirmed via a CLS trace, not visual inspection alone.
- [ ] The re-vectorised logo (not the painted-sign photograph) is confirmed live in the navigation, footer, and favicon/app-icon set.

## 10. Content Accuracy

- [ ] Every fact in `14_CONTENT_MAPPING.md`'s "Requires Client Confirmation" section (Facebook page identity, room-features list per actual room type, current phone/email) has been confirmed with the client and updated if it had drifted.
- [ ] No brochure or website copy ships with its original typos ("Tulius," "Accomodation," "aray") anywhere on the new site.
- [ ] The "happy, bright and friendly collection of professionals" claim (or its rewritten equivalent) is not published until the new staff/human photography from `07_HIGGSFIELD_SHOTLIST.md` Section 6 exists to support it, per `14_CONTENT_MAPPING.md`'s explicit hold on that item.
- [ ] The reception-wall-portraits decision from `LUXURY_OPPORTUNITIES.md` has been made and reflected consistently (image either used deliberately or excluded entirely — not left as an unexamined leftover).
- [ ] Every page's rates, address, and contact details match across the site, the Booking flow, and the Contact page — no inconsistent figures anywhere.

## 11. Sign-Off

This checklist is considered passed only when every item above is checked by someone other than the person who implemented the corresponding feature — a self-signed QA pass on the highest-risk items (Booking, Accessibility, Performance) is not sufficient given how directly this project's stated purpose (closing the trust gaps Discovery found) depends on these specific items actually working, not merely appearing to work in a quick demo.
