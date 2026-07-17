# Fig Tree Residences — Responsive Specification
### Phase 4: Master Build Specification — v1.0

This spec details behaviour across the six named breakpoint categories, built directly on the breakpoint tokens already defined in Design Language `03_DESIGN_TOKENS.md` Section 9, for every major component in `05_COMPONENT_TREE.md`.

## 1. Breakpoint Reference

| Category | Token | Value |
|---|---|---|
| Mobile | `bp-mobile` | 375px |
| Large mobile | `bp-mobile-l` | 428px |
| Tablet | `bp-tablet` | 768px |
| Laptop | `bp-laptop` | 1024px |
| Desktop | `bp-desktop` | 1440px |
| Landscape | Not a fixed width — a distinct orientation state, handled separately in Section 8 | — |

## 2. Navigation

- **Mobile / Large mobile:** Collapsed into a menu button opening a full-screen dialog with the six primary links stacked and the phone/WhatsApp utility element repeated at the top.
- **Tablet:** Same collapsed pattern as mobile, since six links plus logo plus utility element genuinely do not fit a 768px bar at a comfortable touch-target size without crowding.
- **Laptop / Desktop:** Full horizontal bar — logo, six links inline, utility element right-aligned.
- **Landscape (mobile in landscape):** Collapsed menu pattern retained; the bar itself compresses vertically to reclaim screen height, since landscape phone viewports are height-constrained.

## 3. Hero

- **Mobile / Large mobile:** Static poster image only (per `08_IMAGE_OPTIMIZATION_PLAN.md` Class 1 and the mobile video-disable rule), headline and CTA stacked, generous but not excessive vertical padding.
- **Tablet:** Static image or lightweight video depending on measured network conditions; headline size steps up per the type scale's tablet-intermediate values.
- **Laptop / Desktop:** Full video/drift treatment active, headline at full `type-display-xl` size.
- **Landscape:** Height-constrained; the Hero reduces its vertical padding so the headline and CTA remain visible without excessive scrolling to reach the fold's actual content.

## 4. Rooms Grid / Amenity Groups / Testimonial List (shared grid pattern)

- **Mobile:** Single column, full width.
- **Large mobile:** Single column, slightly larger card padding.
- **Tablet:** Two columns.
- **Laptop:** Two-to-three columns depending on content type (Rooms: 3, Testimonials: 2, per `04_SECTION_BLUEPRINT.md`).
- **Desktop:** Same column count as Laptop; extra width goes to increased whitespace/margins, not more columns, per Design Language's instruction that content should stop growing past `container-max` and let whitespace expand instead.
- **Landscape:** Follows the Tablet/Laptop column count matching the available width, not the phone-portrait single-column pattern.

## 5. Gallery

- **Mobile / Large mobile:** 2-column grid, full-screen swipeable Lightbox.
- **Tablet:** 3-column grid, Lightbox with arrow controls plus swipe.
- **Laptop / Desktop:** 3–4 column grid, Lightbox with keyboard arrow-key navigation as the primary method, click-through as secondary.
- **Landscape:** Lightbox image reflows to use the wider-than-tall viewport efficiently (image constrained by height, not width, in this orientation).

## 6. Room Detail (Gallery + Feature List)

- **Mobile / Large mobile / Tablet:** Gallery stacked above the feature list, full width.
- **Laptop / Desktop:** Side by side within `container-content`.
- **Landscape:** Side-by-side layout retained if width allows (tablet-landscape and larger); phone-landscape falls back to the stacked pattern given limited width even though height is unconstrained.

## 7. Booking Widget

The single most important component to get right across every breakpoint, given its role in `11_ACCESSIBILITY_PLAN.md` and `05_EXPERIENCE_MAP.md`.

- **Mobile / Large mobile:** Fully stacked vertical flow — room/date selector, then rate display, then Pesapal handoff, each its own full-width block, generous tap targets on the date picker specifically (a common mobile usability failure point).
- **Tablet:** Same stacked flow, slightly wider measure.
- **Laptop / Desktop:** Selector and rate display may sit side by side within a constrained container (`radius-lg` panel per `03_DESIGN_TOKENS.md`), with the Pesapal handoff step always full-width beneath, since introducing a side-by-side payment step adds risk for a marginal density gain.
- **Landscape:** Treated as its own explicit test case in `15_QA_CHECKLIST.md` given how easy it is for a date-picker overlay to exceed the available height in this orientation specifically; the date picker must remain fully scrollable/usable rather than clipped off-screen.

## 8. Landscape as a Distinct State (Not Just "Mobile, Rotated")

Every component above is explicitly checked in phone-landscape orientation as its own state, not assumed to inherit correctly from either the portrait-mobile or tablet breakpoint, since landscape phones share mobile's narrow-ish width but tablet's or worse height constraints — the exact combination most likely to expose a component that scrolls fine in one dimension but clips in the other. This is called out explicitly because Discovery found no evidence the current site was ever tested on a real device in any orientation.

## 9. Typography Scaling

All type tokens in `03_DESIGN_TOKENS.md` already define distinct desktop/mobile values; this spec adds one rule connecting them: the step-down from desktop to mobile size happens at the Tablet breakpoint, not at Laptop, so Tablet renders the mobile type scale rather than an intermediate one — simpler to implement and test than a three-tier type scale, and consistent with Design Language's preference for a small number of deliberate states over many finely graduated ones.

## 10. Testing Matrix

Every component in Sections 2–7 is verified at minimum against: an actual small phone (375px), a large phone (428px, both portrait and landscape), a tablet (768px, both orientations), a laptop (1024px and 1440px), and a wide desktop (1920px) — as a concrete device/viewport checklist inside `15_QA_CHECKLIST.md`, not left as an assumption that "responsive" was handled correctly simply because Tailwind breakpoints were used somewhere in the code.
