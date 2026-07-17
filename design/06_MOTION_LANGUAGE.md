# Fig Tree Residences — Motion Language
### Phase 3: Luxury Design Language — v2.0

Phase 2's Motion Strategy set the philosophy: motion supports calm, never demonstrates capability. This document converts that philosophy into concrete, engineer-usable specification — exact durations, easing, and behaviour per interaction type. Every value below should be implemented respecting `prefers-reduced-motion`, per the non-negotiable baseline in `02_DESIGN_SYSTEM.md`.

## 1. The Easing Vocabulary

Two easing curves cover the entire system; no third curve should be introduced without a specific, documented reason.

- **`ease-settle`** — cubic-bezier(0.22, 1, 0.36, 1) — a slow-in, gentle-out curve used for anything entering the screen (section reveals, image fades, menu open). It should feel like something settling into place, not snapping to a stop.
- **`ease-quiet`** — cubic-bezier(0.4, 0, 0.2, 1) — a standard, symmetrical curve used for small, reversible micro-interactions (hover states, button presses) where `ease-settle`'s asymmetry would be imperceptible at such short durations.

## 2. Duration Scale

| Token | Duration | Usage |
|---|---|---|
| `motion-instant` | 120ms | Button press feedback, focus ring appearance |
| `motion-quick` | 200ms | Hover colour/opacity changes, link underline draw-in |
| `motion-settle` | 450ms | Card lift on hover, small image zoom |
| `motion-reveal` | 700ms | Section entrance as it scrolls into view |
| `motion-arrive` | 1200ms | The hero's initial entrance on page load — deliberately the slowest single moment in the entire system |
| `motion-ambient` | 6000ms+ | The Restaurant section's slow warm-light "breathing" treatment and any testimonial cross-fade sequence |

## 3. Scroll Rhythm and Section Reveals

Content enters the viewport with a combined opacity fade (0 to 1) and a small upward translation (starting 24px below final position), using `ease-settle` at `motion-reveal` (700ms), triggered once per element the first time it enters the viewport — never re-triggered on scroll-back, which would read as a gimmick rather than a considered entrance. Elements within the same section should stagger by roughly 80–120ms each, so a row of three amenity cards settles in sequence rather than all at once, echoing the "one held breath at a time" principle from `01_DESIGN_LANGUAGE.md`. Parallax is used in exactly one context — large full-bleed photography (hero, Gardens, Restaurant) — moving at no more than 15–20% of scroll speed relative to the foreground content, so the effect reads as depth, not as a distracting drift.

## 4. Fade Timing

Cross-fades between images (gallery viewer, testimonial sequence) use a 500–600ms simultaneous fade-out/fade-in with `ease-quiet`, never a hard cut and never a sliding-carousel motion, which reads as a generic UI pattern rather than an editorial one. Full-page or full-section background transitions (moving from the daylight register into the Restaurant's dusk register) use a slower 800ms fade, giving the colour shift room to feel deliberate rather than abrupt.

## 5. Page Transitions

Navigating between pages uses a brief, shared cross-fade (300ms out, 400ms in, `ease-settle`) rather than a hard reload-style cut or a directional slide — the goal is continuity of calm from one page to the next, not a demonstration of a fancy transition effect. No page transition should exceed 700ms total, since a visitor waiting on a transition animation for longer than that will experience it as latency, not elegance.

## 6. Hover Behaviour

Hover states change opacity, colour, or shadow — never layout-shifting scale beyond a very small range (a maximum 2–3% image zoom inside a fixed-size frame, per the Gallery component in `04_COMPONENT_LIBRARY.md`) and never a transform that could nudge surrounding content. Duration is `motion-quick` (200ms) with `ease-quiet` for colour and opacity changes, and `motion-settle` (450ms) with `ease-settle` for the slightly slower, more deliberate card-lift shadow transition described below.

## 7. Card Interactions

A card (room card, amenity card, journal entry) at rest sits at `shadow-whisper`. On hover, it transitions to `shadow-lifted` and rises 4px, using `motion-settle` (450ms) and `ease-settle` — slow enough to feel considered, fast enough not to feel laggy. Cards never rotate, tilt, or apply a 3D perspective effect on hover; that pattern reads as a tech-product flourish, not a boutique-residence one.

## 8. Loading Behaviour

Loading states never use a generic spinner. Image content reserves its final aspect-ratio space before loading (preventing layout jump, per the accessibility baseline in `02_DESIGN_SYSTEM.md`) and fades in over `motion-settle` (450ms) once loaded, rather than popping in abruptly. The Booking component's submission state replaces its action label with a small, calm, static "confirming your stay" message rather than a spinning icon — consistent with the unhurried tone of the rest of the system, and a direct, structural fix for the false, always-visible "success" message Phase 1 found on the current live contact form.

## 9. Video Integration

Where video is used (see `10_HIGGSFIELD_PREP.md` for per-section briefs), it never autoplays with sound, and it is used to replace still photography only where genuine movement adds meaning — the rooftop's string lights swaying gently at dusk, a curtain moving in an ocean breeze — never as generic ambient background motion behind text a visitor is trying to read. Any video used behind text must be paired with a `color-surface-dusk`-toned overlay strong enough to keep text at the 4.5:1 contrast floor at every frame of the video, not just its brightest or darkest moment.

## 10. What Never Moves — Restated as a Build Rule

Body text, navigation labels, and form fields do not animate on entrance beyond the standard section-reveal fade described in Section 3. No element auto-advances, auto-plays, or times out without direct visitor interaction, with the single deliberate exception of the slow, many-second testimonial cross-fade described in Section 2 — and even that should pause automatically the moment a visitor interacts with it manually.
