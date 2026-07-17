# Fig Tree Residences — Iconography
### Phase 3: Luxury Design Language — v2.0

This document defines the icon style used across the system, where icons are used at all, and where custom, brand-specific marks are worth commissioning versus where a standard library icon is the right, restrained choice.

## 1. The Principle: Icons Support, They Never Decorate

Discovery's Photo Audit and Website Analysis both found the current site leaning on generic bullet-point amenity lists with no visual language at all, and this system's job is not to overcorrect into an icon-heavy dashboard aesthetic in the other direction. Icons in this system exist only to make a specific, repeated piece of information (an amenity, a room feature, a social link) faster to scan — never as filler, and never doubled up with the exact same information already fully spelled out in adjacent text.

## 2. Base Icon Style

| Property | Specification |
|---|---|
| Grid | 24×24px base grid, single consistent size used everywhere per the pre-delivery checklist's consistent-icon-sizing rule |
| Stroke weight | 1.5px, uniform across the entire set — never mixing stroke weights within the same icon or between icons |
| Corner treatment | Softly rounded line caps and joins (matching the `radius-sm`/`radius-md` softness established in `03_DESIGN_TOKENS.md`), never sharp mitred corners, which would feel too technical/corporate for this brand |
| Fill | Outline-only by default; a single filled variant (solid `teal.bright`) is reserved for active/selected states only (a selected room-filter icon, an active nav icon) |
| Colour | `color-text-primary` at rest, `color-accent-primary` on hover/active — never a rainbow of different icon colours across one screen |

## 3. Sourcing Approach

The base functional set (navigation, form, social, and UI icons — menu, close, arrow, phone, email, WhatsApp, Facebook, Instagram) should be drawn from a single consistent open-source icon library matching the stroke-weight and corner specification above (a set in the Feather/Lucide family is the closest existing match to this system's softness and weight) rather than mixed from multiple sources, which is one of the most common causes of an inconsistent, unprofessional-feeling icon set. Brand-specific amenity icons (see Section 4) should be custom-drawn to the same 24×24 grid and 1.5px stroke specification, so a custom fig-leaf icon and a library-sourced phone icon sit together without visibly clashing.

## 4. Custom, Brand-Specific Icon Opportunities

A small set of icons is worth commissioning as bespoke marks rather than pulled from a generic library, because they represent facts unique to this property rather than generic hospitality concepts:

- **A simplified fig-leaf mark** — derived directly from the leaf shapes already present in the logo's border pattern — used as the amenities section's default bullet/divider mark in place of a generic dot or dash.
- **A simplified root-and-canopy silhouette** — a minimal, two-line abstraction of the full logo — reserved for the Our Story page as a single, quiet visual anchor, not repeated elsewhere as a decorative watermark.
- **A security/coded-access glyph** built specifically to feel calm rather than alarming (a soft rounded shield or a simple key-and-circle form, never a heavy padlock or barbed-wire-adjacent shape) — directly addressing Phase 2's instruction that security be translated into reassurance, not a hardware checklist.
- **A garden/living-wall glyph** — a small, abstracted cluster of leaves distinct from the fig-leaf bullet mark above — used specifically for the Garden Experience component's own wayfinding, not interchangeably with the general fig-leaf mark.

Every other amenity (pool, gym, WiFi, kitchenette, parking, laundry) should use a standard, well-recognised library icon at the same stroke weight — inventing a custom icon for a universally understood concept like "WiFi" adds cost and inconsistency risk without adding any brand value.

## 5. Where Icons Should Not Appear

Icons should never be used to represent the three load-bearing brand pillars — privacy, security, calm — as decorative flourishes floating in a hero or Our Story section; those ideas are carried by photography, typography, and copy per `02_BRAND_STORY.md` and `09_COPY_DIRECTION.md`, and reducing them to a small pictogram would trivialise exactly the ideas this brand depends on. Icons also should never replace a caption or label entirely — every icon in this system is paired with a short text label at rest (not only on hover), consistent with the accessibility floor already established in `02_DESIGN_SYSTEM.md`.
