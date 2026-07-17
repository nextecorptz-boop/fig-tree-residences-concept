# Fig Tree Residences — Cursor System
### Phase 3: Luxury Design Language — v2.0

A signature cursor treatment, designed to whisper rather than perform. This document specifies where and how the cursor changes, and — just as importantly — the much larger set of places where it should remain exactly what a visitor's operating system already gives them.

## 1. The Governing Rule: Restraint First

The single biggest risk in any "custom cursor" design is that it becomes the thing a visitor notices instead of the thing that helps them move calmly through the site — a direct violation of the "luxury through subtlety" instruction for this component. The rule this system follows is narrow and strict: the custom cursor treatment appears in exactly one context (large, non-interactive photography, described below) and nowhere else. Every text field, button, link, and form control uses its normal, expected system cursor and interaction affordance at all times, per the accessibility and touch-target baseline already established in `02_DESIGN_SYSTEM.md`.

## 2. The Signature Mark

Where the custom cursor does appear, it takes the form of a small, soft, hollow ring — approximately 36px in diameter, a 1.5px stroke in `color-accent-primary` (`teal.bright`) at 70% opacity, with a single, tiny solid dot at its centre no larger than 4px. This shape is a deliberate, quiet echo of the property's own fig-fruit motif from the logo — a small, round, softly bordered form — reduced to its simplest possible geometry rather than reproduced as a literal illustrated fruit or leaf, which would tip the treatment from subtle into decorative.

## 3. Where It Appears

The ring cursor replaces the default pointer only when hovering full-bleed, non-interactive photography inside the Gallery and Garden Experience components defined in `04_COMPONENT_LIBRARY.md` — moments where a visitor is looking, not acting. In this state, the ring is accompanied by a single small word in `type-caption`, positioned just inside the ring ("View" for gallery images, "Explore" for the Garden Experience's panoramic frames) — never an icon, never more than one word, and always in the same restrained tone as the rest of the system's copy direction.

## 4. Where It Never Appears

Over any text, the cursor remains the standard system text-selection (I-beam) cursor — the ring never overlays or replaces it, since doing so would actively work against reading. Over any button, link, form field, or other interactive control, the cursor remains the standard system pointer, and that control's own hover state (as defined in `04_COMPONENT_LIBRARY.md` and `06_MOTION_LANGUAGE.md`) carries the entire feedback burden — the cursor should never be relied on as the only signal that something is clickable. On touch devices, where no cursor exists at all, this entire system is inactive by definition and requires no separate touch equivalent; inventing one (a persistent on-screen ring following a finger) would be exactly the kind of gimmick this document exists to avoid.

## 5. Behaviour

The ring fades in over `motion-quick` (200ms, `ease-quiet`) as the pointer enters a qualifying photography zone, and follows the pointer's position with a very slight, soft trailing delay (roughly 80–120ms) rather than locking rigidly to the pointer's exact coordinate — enough lag to feel organic and unhurried, not enough to feel laggy or unresponsive. It fades out over the same 200ms the instant the pointer leaves the qualifying zone or the visitor begins scrolling. It never changes size or shape on click; a click inside a qualifying zone triggers the Gallery's own transition behaviour (per `06_MOTION_LANGUAGE.md`), not a separate cursor animation.

## 6. What This System Explicitly Rejects

No cursor trail, particle effect, colour-cycling, or magnetic "snap to nearest button" behaviour appears anywhere in this system — all four are common in flashy, tech-forward portfolio sites and all four would read as performance rather than hospitality. No custom cursor of any kind appears on the Booking component; that is the single highest-stakes moment in the entire experience per `05_EXPERIENCE_MAP.md`, and it should feel as plain, standard, and trustworthy as possible, with zero novelty introduced at the exact moment a visitor is being asked to commit.
