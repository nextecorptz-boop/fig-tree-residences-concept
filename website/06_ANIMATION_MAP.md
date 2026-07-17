# Fig Tree Residences — Animation Map
### Phase 4: Master Build Specification — v1.0

Rather than restate eight identical fields thirty-five times, this document defines a small library of named motion patterns — each fully specified against Animation type, Scroll trigger, Library (GSAP vs. Framer Motion), Duration, Ease, Delay, Exit, and Mobile fallback — then maps every section from `04_SECTION_BLUEPRINT.md` onto one pattern. Building thirty-five near-identical animation specs by hand is exactly the kind of drift-prone duplication that produces inconsistent motion in production; a shared, named pattern library is the correct engineering answer, and it is also what `06_MOTION_LANGUAGE.md` already implies by defining shared easing/duration tokens rather than per-section values.

## 1. Library Split Rule

Framer Motion handles all discrete, component-level animation: entrance reveals, staggered lists, hover/tap states, accordion expand/collapse, modal/lightbox transitions, and page-level transitions. GSAP with ScrollTrigger is reserved specifically for continuous, scroll-linked effects that Framer Motion's viewport-triggered model handles less naturally: the Hero/Gardens slow parallax drift, and the Restaurant section's ambient light-flicker loop tied to scroll position. If a section's motion can be expressed as "animate once when it enters the viewport," it is Framer Motion; if it is "continuously tied to scroll position or time," it is GSAP.

## 2. Pattern Library

### Pattern A — `reveal-standard`
- **Animation type:** Opacity 0→1 + 24px upward translate.
- **Scroll trigger:** Fires once when the element crosses ~80% up the viewport.
- **Library:** Framer Motion (`whileInView`).
- **Duration:** 700ms.
- **Ease:** `ease-settle` (cubic-bezier(0.22, 1, 0.36, 1)).
- **Delay:** 0ms unless part of a staggered group (see Pattern B).
- **Exit:** None — entrance-only, does not reverse on scroll-up.
- **Mobile fallback:** Identical; this pattern is lightweight enough to run unchanged on mobile.

### Pattern B — `reveal-staggered`
- **Animation type:** `reveal-standard` applied to each child in a group (cards, list items).
- **Scroll trigger:** Parent container crossing ~80% up the viewport.
- **Library:** Framer Motion (`staggerChildren`).
- **Duration:** 700ms per child.
- **Ease:** `ease-settle`.
- **Delay:** 80–120ms offset per child, per `06_MOTION_LANGUAGE.md`.
- **Exit:** None.
- **Mobile fallback:** Identical, capped at a maximum of 6 staggered children at once to avoid jank on lower-end devices; additional items reveal in the next batch as the user scrolls.

### Pattern C — `hero-drift`
- **Animation type:** Extremely slow background image/video scale or position drift (near-imperceptible push-in).
- **Scroll trigger:** None — runs on a timer from mount, independent of scroll, for the Hero specifically; runs on scroll position for the Gardens full-bleed section specifically (see Pattern D distinction below).
- **Library:** CSS animation or Framer Motion `animate`, not GSAP (this is a fixed, non-scroll-linked drift for Hero).
- **Duration:** 8–12 seconds per cycle, looped seamlessly if video; a single static frame is an acceptable substitute per `10_HIGGSFIELD_PREP.md`.
- **Ease:** Linear (a drift should not accelerate/decelerate perceptibly).
- **Delay:** 0ms.
- **Exit:** N/A (continuous while mounted).
- **Mobile fallback:** Static poster image only, no motion, to protect the Performance Budget on cellular.

### Pattern D — `scroll-parallax-slow`
- **Animation type:** Slow, scroll-position-linked image translate/scale (Gardens full-bleed section, Location tracking shot if used as background).
- **Scroll trigger:** Continuous, tied to scroll position within the section's bounds.
- **Library:** GSAP + ScrollTrigger.
- **Duration:** N/A (scroll-driven, not time-driven); effective range mapped across the section's full scroll distance.
- **Ease:** `ease-quiet` (cubic-bezier(0.4, 0, 0.2, 1)) applied to the scrub smoothing, not a fixed-duration ease.
- **Delay:** N/A.
- **Exit:** Reverses naturally as the user scrolls back up (this is the one pattern in the system where reverse motion is expected and correct).
- **Mobile fallback:** Disabled; mobile renders the same image static, full-bleed, no scrub.

### Pattern E — `ambient-loop`
- **Animation type:** Very subtle, continuous looped motion (string-light sway, light flicker) for the Restaurant/Dining section specifically.
- **Scroll trigger:** Starts when the section enters the viewport, pauses when it leaves (to avoid wasted cycles off-screen).
- **Library:** GSAP (timeline-based loop), started/stopped via a Framer Motion/Intersection Observer viewport check.
- **Duration:** 6000ms+ per cycle (`motion-ambient` token range).
- **Ease:** Sine in-out, looped.
- **Delay:** 0ms.
- **Exit:** Pauses (not abruptly stops) when scrolled out of view.
- **Mobile fallback:** Static image, loop disabled.

### Pattern F — `card-hover-lift`
- **Animation type:** Shadow token transition (`shadow-whisper` → `shadow-lifted`) + 4px upward translate.
- **Scroll trigger:** None — pointer-triggered, not scroll-triggered.
- **Library:** Framer Motion (`whileHover`, `whileFocus`).
- **Duration:** 450ms.
- **Ease:** `ease-quiet`.
- **Delay:** 0ms.
- **Exit:** Reverses on hover/focus end, same duration.
- **Mobile fallback:** Replaced with a `whileTap` press-state (since there is no hover on touch); focus-visible state remains for keyboard users on any device.

### Pattern G — `accordion-toggle`
- **Animation type:** Height auto-expand/collapse + chevron rotate.
- **Scroll trigger:** None — click/tap/keyboard-triggered.
- **Library:** Framer Motion (`AnimatePresence` + height animation).
- **Duration:** 300ms.
- **Ease:** `ease-quiet`.
- **Delay:** 0ms.
- **Exit:** Symmetric collapse animation, same duration/ease as expand.
- **Mobile fallback:** Identical.

### Pattern H — `lightbox-transition`
- **Animation type:** Backdrop fade + image scale-in (from the clicked thumbnail's position where feasible).
- **Scroll trigger:** None — click/tap-triggered.
- **Library:** Framer Motion (`AnimatePresence` + shared layout animation).
- **Duration:** 400ms in, 300ms out (matching the page-transition asymmetry in `06_MOTION_LANGUAGE.md`).
- **Ease:** `ease-settle` in, `ease-quiet` out.
- **Delay:** 0ms.
- **Exit:** Reverse scale/fade.
- **Mobile fallback:** Identical, with swipe-to-dismiss added as a supplementary gesture.

### Pattern I — `filter-reflow`
- **Animation type:** Grid item cross-fade + reflow when a Gallery/Rooms filter changes.
- **Scroll trigger:** None — filter-control-triggered.
- **Library:** Framer Motion (`layout` animations on the grid).
- **Duration:** 300ms.
- **Ease:** `ease-quiet`.
- **Delay:** 0ms, or a 20ms stagger for items re-entering the filtered set.
- **Exit:** Cross-fade out for items leaving the filtered set.
- **Mobile fallback:** Identical.

### Pattern J — `form-state-transition`
- **Animation type:** Calm cross-fade between form states (idle → submitting → success/error) — explicitly no spinner, per `06_MOTION_LANGUAGE.md`'s loading-behaviour rule.
- **Scroll trigger:** None — submission-triggered.
- **Library:** Framer Motion (`AnimatePresence`).
- **Duration:** 400ms.
- **Ease:** `ease-settle`.
- **Delay:** 0ms.
- **Exit:** Cross-fade out of the prior state.
- **Mobile fallback:** Identical.

### Pattern K — `page-transition`
- **Animation type:** Route-level transition between pages.
- **Scroll trigger:** None — navigation-triggered.
- **Library:** Framer Motion (Next.js App Router transition wrapper).
- **Duration:** 300ms out / 400ms in.
- **Ease:** `ease-quiet` out / `ease-settle` in.
- **Delay:** 0ms.
- **Exit:** As above.
- **Mobile fallback:** Identical, but capped to a simple cross-fade (no slide) to minimise jank on lower-end devices.

## 3. Section-to-Pattern Map

| Section (from `04_SECTION_BLUEPRINT.md`) | Pattern(s) applied |
|---|---|
| 1. Hero | `hero-drift`; page-load reveal on headline/CTA via `reveal-standard` |
| 2. Our Story Teaser | `reveal-standard` |
| 3. Rooms Teaser | `reveal-staggered` on cards, `card-hover-lift` on each |
| 4. Gardens Teaser | `scroll-parallax-slow` (desktop) / static (mobile) |
| 5. Reviews Strip | `reveal-standard`; manual-advance cross-fade if rotating |
| 6. Location Teaser | `reveal-standard` |
| 7. Departure Moment | `reveal-standard`, held longer (900ms) than the default |
| 8. Origin Narrative | `reveal-standard` per paragraph/image pair |
| 9. Three Pillars | `reveal-staggered` |
| 10. Cicero Quotation | `reveal-standard`, extended duration (~1000ms), no stagger |
| 11. Long Stay / Journal Links | `reveal-standard`, `card-hover-lift` |
| 12. Rooms Index Grid | `reveal-staggered`, `card-hover-lift`, `filter-reflow` on toggle |
| 13. Room Detail | `reveal-standard`; gallery uses a simple cross-fade, not `lightbox-transition` (no backdrop) |
| 14. Long Stay Narrative | `reveal-standard` |
| 15. Long Stay Room List | `reveal-staggered`, `card-hover-lift` |
| 16. Amenity Groups | `reveal-staggered` |
| 17. Gardens & Dining Links | `reveal-standard`, `card-hover-lift` |
| 18. Amenities FAQ | `accordion-toggle` |
| 19. Garden Experience | `scroll-parallax-slow` (desktop) / static (mobile) |
| 20. Restaurant/Rooftop | `ambient-loop` (desktop) / static (mobile) |
| 21. Proximity Narrative | `reveal-standard` |
| 22. Custom Map | `reveal-standard` on entrance; no continuous animation on the map itself beyond native pan/zoom |
| 23. Local Experience List | `reveal-staggered` |
| 24. Category Filter | `filter-reflow` |
| 25. Image Grid + Lightbox | `reveal-staggered` on grid load, `lightbox-transition` on open/close |
| 26. Rating Summary | `reveal-standard` |
| 27. Testimonial List | `reveal-staggered` |
| 28. Post Index | `reveal-staggered` |
| 29. Post Detail | `reveal-standard` |
| 30. Contact Form | `form-state-transition` |
| 31. Contact Details | `reveal-standard` |
| 32. Room & Date Selector | `reveal-standard` on entrance; no animation on the functional controls themselves beyond standard focus states |
| 33. Live Rate Display | `form-state-transition` (loading → shown) |
| 34. Pesapal Handoff | `form-state-transition` |
| 35. Confirmation | `form-state-transition`, extended duration (~600ms), no celebratory motion |

Every route change across all thirty-five sections' parent pages uses `page-transition`; this is a layout-level concern, not a per-section one, and is therefore stated once here rather than repeated in the table.

## 4. Reduced Motion

Every pattern above must resolve to an instant, no-motion state (opacity change only, no translate/scale/parallax/loop) when `prefers-reduced-motion: reduce` is set, per the accessibility floor established in `02_DESIGN_SYSTEM.md` and detailed fully in `11_ACCESSIBILITY_PLAN.md`. This is a single global check implemented once (a shared `useReducedMotion` hook or GSAP's own `matchMedia` reduced-motion handling), not a per-pattern reimplementation.
