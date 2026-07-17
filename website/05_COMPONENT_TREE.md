# Fig Tree Residences — Component Tree
### Phase 4: Master Build Specification — v1.0

This document names and defines every component the build requires, reconciling the component names used in this brief against the twelve components already defined in Design Language's `04_COMPONENT_LIBRARY.md`. Where a name differs (this brief's "VideoHero," "Dining" as a page label vs. Design Language's "Restaurant" component name), the reconciliation is stated explicitly rather than left ambiguous.

## 1. Naming Reconciliation

| This brief's term | Resolution |
|---|---|
| VideoHero | Not a separate component. It is a **mode** of the single `Hero` component — `Hero` accepts a `media` prop that is either a static image or a looped video source; the component's layout, headline treatment, and CTA behaviour are identical either way. Building a second, parallel Hero component would violate Design Language's restraint principle and create two things to keep visually consistent instead of one. |
| Dining (page label) | Maps to the `Restaurant` component defined in Design Language `04_COMPONENT_LIBRARY.md`. The component's internal name stays `Restaurant` in code (matching the design system it was specified in); only the route (`/dining`) and nav label use "Dining," which is the term this brief and, presumably, the client use in conversation. |
| Everything | Resolved into the full tree below — every UI element in the site belongs to one of these named components or a small shared primitive. |

## 2. Top-Level Component Tree

```
Layout
├── Navigation
│   ├── Logo
│   ├── NavLinks (primary, max 6)
│   └── UtilityContact (phone + WhatsApp)
├── Footer
│   ├── FooterNav (secondary links)
│   ├── SocialLinks (corrected, verified)
│   └── DepartureMoment (Home only)
│
├── Hero (modes: image | video)
├── Gallery
│   ├── CategoryFilter
│   ├── ImageGrid
│   └── Lightbox
├── RoomCard
├── RoomDetail
│   ├── RoomGallery
│   └── RoomFeatureList
├── AmenityCard
├── AmenityGroup (a set of AmenityCard)
├── GardenSection
├── Restaurant
├── LocationMap
├── ExperienceListItem
├── BookingWidget
│   ├── RoomDateSelector
│   ├── RateDisplay
│   ├── PesapalHandoff
│   └── BookingConfirmation
├── Testimonials
│   ├── TestimonialCard
│   └── RatingSummary
├── FAQAccordion
│   └── FAQItem
├── ContactForm
└── JournalPost
    ├── JournalListItem
    └── JournalBody
```

## 3. Shared Primitives (used across multiple components above, not listed separately per-page)

`Button` (primary/secondary/text variants per Design Language), `Card` (the base surface `RoomCard`, `AmenityCard`, and `TestimonialCard` all extend), `SectionHeading`, `Container` (wraps `container-max`/`container-content` per `05_LAYOUT_SYSTEM.md`), `Icon` (renders the base icon set and the four custom brand marks from `08_ICONOGRAPHY.md`), `ImageWithFallback` (handles the AVIF/WebP/JPEG fallback chain from `08_IMAGE_OPTIMIZATION_PLAN.md`), and `RingCursor` (the signature cursor from `07_CURSOR_SYSTEM.md`, mounted once at the layout level and activated contextually by `Gallery` and `GardenSection`).

## 4. Component Specifications

### Navigation
- **Composition:** `Logo` (links to Home) + `NavLinks` (the six primary routes from `02_SITE_MAP.md`) + `UtilityContact`.
- **Behaviour:** Transparent over the Hero, transitioning to the `glass-nav` token (82% opacity, 16px blur) on scroll, per Design Language `03_DESIGN_TOKENS.md`.
- **States:** Default, scrolled, mobile-menu-open.
- **Accessibility:** Skip-to-content link precedes it in the DOM; mobile menu is a real dialog with focus trapping, not a CSS-only reveal.

### Footer
- **Composition:** `FooterNav`, `SocialLinks`, and — on Home only — `DepartureMoment`.
- **Behaviour:** Static, no motion beyond the standard section reveal.

### Hero
- **Props:** `media` (image | video source), `headline`, `subline`, `cta`.
- **Behaviour:** Per `04_SECTION_BLUEPRINT.md` Section 1 — video disabled on mobile/cellular by default, falling back to the poster image.
- **States:** Loading (poster shown immediately, video swaps in once buffered), loaded.

### Gallery (`CategoryFilter` + `ImageGrid` + `Lightbox`)
- **Behaviour:** Filtering re-flows the grid with a short cross-fade; selecting an image opens `Lightbox`, which traps focus and supports arrow-key/swipe navigation.
- **Data:** Supabase `media`, paginated.
- **Cursor:** `RingCursor` active over `ImageGrid` on non-touch devices only.

### RoomCard
- **Props:** `name`, `image`, `differentiator`, `fromRate`, `slug`.
- **States:** Default, hover (`shadow-whisper` → `shadow-lifted`, per `06_MOTION_LANGUAGE.md`), focus-visible (keyboard).

### RoomDetail (`RoomGallery` + `RoomFeatureList`)
- **Data:** Supabase `room_types`, single row by slug.
- **Behaviour:** `RoomGallery` cross-fades only, no parallax, per the accuracy-over-atmosphere rule for Rooms.

### AmenityCard / AmenityGroup
- **Props:** `icon`, `label`, `description`.
- **Rule:** Every `AmenityCard` pairs an icon with a visible text label at rest — never icon-only, per `08_ICONOGRAPHY.md` Section 5.

### GardenSection
- **Behaviour:** The slowest parallax/drift treatment in the system; `RingCursor` active here as in Gallery.
- **Media:** Video preferred (High priority) with a still fallback.

### Restaurant
- **Behaviour:** Renders in the Dusk visual register (`03_DESIGN_TOKENS.md`); `motion-ambient` light-flicker/string-light treatment.

### LocationMap
- **Behaviour:** Custom-styled map (Mapbox GL or equivalent), fixed aspect-ratio container to protect CLS, pins for verified landmarks with accessible labels.

### ExperienceListItem
- **Props:** `name`, `category`, `description`, `externalLink` (optional, opens in a new tab with `rel="noopener"`).

### BookingWidget (`RoomDateSelector` + `RateDisplay` + `PesapalHandoff` + `BookingConfirmation`)
- **Data:** Supabase `room_types` (live rate/availability context) + Pesapal API.
- **Behaviour:** The single most accessibility- and performance-critical component in the tree; every sub-component must be independently keyboard-operable and announce state changes to assistive technology (see `11_ACCESSIBILITY_PLAN.md`).
- **States:** Selecting, rate-loading, rate-shown, payment-redirect, confirmed, error (each visually and programmatically distinct — directly correcting the current site's false-success defect).

### Testimonials (`TestimonialCard` + `RatingSummary`)
- **Data:** Supabase `testimonials` + a cached TripAdvisor snapshot for `RatingSummary`.

### FAQAccordion (`FAQItem`)
- **Behaviour:** Keyboard-operable, correct `aria-expanded`/`aria-controls` wiring on every item; content scoped per-page (Amenities vs. Booking) rather than duplicated wholesale.

### ContactForm
- **Behaviour:** Real success and error states tied to actual submission results, replacing the current static false-success message; writes to Supabase `contact_submissions`.

### JournalPost (`JournalListItem` + `JournalBody`)
- **Data:** Supabase `journal_posts`.

## 5. Ownership Note for the Build Team

Every component above should be built once, in one location, and reused — the Rooms Teaser on Home and the Rooms Index page both render `RoomCard`; the Restaurant page and any future Home teaser both render `Restaurant`. No page-specific duplicate of a component listed here should be created; if a page needs a variant, it should be a documented prop/variant on the existing component, consistent with how `Hero` handles its image/video modes.
