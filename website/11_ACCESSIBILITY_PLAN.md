# Fig Tree Residences — Accessibility Plan
### Phase 4: Master Build Specification — v1.0

This plan makes WCAG 2.1 AA a checked, verified constraint rather than an aspiration, including one specific correction to Design Language's own colour token set that this phase's contrast calculation caught.

## 1. Contrast Verification (Not Just a Restated Target)

Design Language's `03_DESIGN_TOKENS.md` flagged its hex values as field-sampled starting points needing confirmation. Running the actual WCAG contrast formula against the two token pairs most likely to be used for text produced a concrete finding:

| Pair | Computed ratio | WCAG AA result |
|---|---|---|
| `teal.bright` (#2E8C82) text on `cream.base` (#F8F3EA) | ≈ 3.66:1 | **Fails** for normal text (needs 4.5:1); **passes** only for large text (18pt+/14pt bold+, needs 3:1) |
| `teal.deep` (#1E3B36) text on `cream.base` (#F8F3EA) | ≈ 10.96:1 | Passes comfortably |
| `ink.primary` (#1B211F) text on `cream.base` (#F8F3EA) | Well above 15:1 (near-black on near-white) | Passes comfortably |
| `cream.base` (#F8F3EA) text on `color-surface-dusk` / `teal.deep` (#1E3B36) | ≈ 10.96:1 | Passes comfortably |

**Rule this produces for the build:** `color-accent-primary` (`teal.bright`) may be used for links, active states, and focus rings at normal text sizes only if paired with a bold weight and treated as "large text," for icons, for borders, and for any UI element evaluated under the 3:1 non-text contrast requirement — but it must not be used as the colour of small body-size link or label text on the cream register. Where small teal-coloured text is wanted (e.g. a teal caption or metadata label), use `teal.deep`, not `teal.bright`. This is a one-line correction to how the tokens get applied in components, not a change to the token values themselves, and it should be written directly into the `Button`/link component's text-colour logic rather than left to per-component judgment calls.

## 2. Keyboard Navigation

Every interactive element in `05_COMPONENT_TREE.md` — nav links, the mobile menu, `FAQAccordion` items, `Lightbox` navigation, `BookingWidget`'s date picker and room selector, `ContactForm` fields — must be reachable and operable via Tab/Shift+Tab/Enter/Space/Arrow keys alone, with no keyboard trap. The mobile navigation menu, when open, traps focus within itself until closed (Escape key closes it and returns focus to the toggle button). The `Lightbox` similarly traps focus and returns it to the triggering thumbnail on close.

## 3. Visible Focus States

Every focusable element has a visible focus indicator using `color-accent-primary` (acceptable here since focus rings are evaluated as non-text UI elements under the 3:1 standard, not the 4.5:1 text standard) at sufficient thickness to be clearly visible against both the daylight and dusk registers — never removed via a blanket `outline: none` without a replacement, which is a common and specifically disallowed shortcut in this build.

## 4. Reduced Motion

Every animation pattern in `06_ANIMATION_MAP.md` resolves to an opacity-only, near-instant state when `prefers-reduced-motion: reduce` is detected — no parallax drift, no ambient loops, no staggered entrance delays. This is implemented once, globally, per `06_ANIMATION_MAP.md` Section 4, not per-component.

## 5. Touch Targets

Every interactive element meets a minimum 44×44px touch target on mobile, per the accessibility floor already stated in `02_DESIGN_SYSTEM.md` — including icon-only controls like the Gallery filter chips and the Lightbox's close/navigation buttons, which are the elements most likely to be built too small by default.

## 6. Alt Text Policy

Every image ships with a specific, descriptive `alt` attribute written to describe what the image actually shows and, where relevant, why it matters in context (e.g. "Arched palm-motif headboard in the garden-view studio," not "bedroom" or a blank string) — this is both an accessibility requirement and, per `10_SEO_PLAN.md` Section 5, an SEO one. Purely decorative images (background textures with no informational content) use an empty `alt=""` so screen readers correctly skip them rather than reading a meaningless filename-derived string.

## 7. Forms

`ContactForm` and every `BookingWidget` field has a visible, programmatically associated label (not a placeholder used as a label substitute), and every validation error is associated with its field via `aria-describedby` and announced via an `aria-live` region — directly correcting the current site's broken contact form, which gives no real feedback at all today.

## 8. Focus Management on Route/State Changes

Client-side navigation (Next.js App Router transitions) moves focus to the new page's main heading on route change, so keyboard and screen-reader users are not left with focus stranded on a now-removed element. The `BookingWidget`'s state changes (rate loading → shown, payment redirect, confirmation) each announce their state change via `aria-live="polite"` (or `"assertive"` for the error state specifically), since this is the single highest-risk flow identified in Experience Strategy's `05_EXPERIENCE_MAP.md`.

## 9. Color Is Never the Only Signal

The Gallery's `CategoryFilter` active state, `FAQAccordion`'s expanded/collapsed state, and any form validation state are each indicated by more than colour alone (an underline/icon/text change accompanies any colour change), so the system remains usable for colour-blind visitors without relying on `teal.bright` vs. `ink.primary` alone to carry meaning.

## 10. Verification Method

Automated axe-core (or equivalent) checks run in CI against every page template; a manual full keyboard-only pass and a screen-reader pass (VoiceOver and NVDA, at minimum) are run specifically against the Booking flow before each milestone sign-off in `13_IMPLEMENTATION_ROADMAP.md`, and a full WCAG AA audit is the second item (after the performance sweep) in `15_QA_CHECKLIST.md` before launch.
