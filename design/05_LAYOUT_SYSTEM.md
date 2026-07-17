# Fig Tree Residences — Layout System
### Phase 3: Luxury Design Language — v2.0

This document defines how the grid, spacing, and container tokens from `03_DESIGN_TOKENS.md` combine into an actual page rhythm. It governs proportion and pacing, not visual styling — colour and type are addressed elsewhere.

## 1. The Twelve-Column Grid

The system uses a standard 12-column grid at `container-max` (1440px), with `gutter-desktop` (32px) between columns and `margin-desktop` (80px) on either side of the content area. Components are never required to fill all twelve columns — in an editorial layout, a component that only occupies seven or eight columns, leaving the remainder as deliberate whitespace, is a normal and often preferred choice, not a mistake to be filled in.

| Breakpoint | Columns | Gutter | Margin |
|---|---|---|---|
| `bp-mobile` (375px) | 4 | `space-md` (16px) | `space-lg` (24px) |
| `bp-tablet` (768px) | 8 | `space-lg` (24px) | `margin-tablet` (48px) |
| `bp-laptop` (1024px) and above | 12 | `gutter-desktop` (32px) | `margin-desktop` (80px) |

## 2. Container Widths by Content Type

Not every section should use the same container width — width itself is a rhythm device in this system.

- **Full-bleed** (no container) — the hero, the Garden Experience module, the Restaurant module, and any other section built around a single dominant photograph. Width is the full viewport; text set over these images is constrained internally, never the image itself.
- **`container-max`** (1440px) — galleries, amenity grids, room-experience modules, and any section presenting several items side by side.
- **`container-content`** (1120px) — Our Story's narrative copy, Journal entries, and any long-form reading content. Line length here should sit close to the 65–75 character guideline regardless of the container's outer width, achieved by internal text-column constraints rather than shrinking the whole section.

## 3. Vertical Rhythm

Section-to-section spacing uses `space-4xl` (96px) as its default unit — the primary heartbeat of the page. Sections that deserve extra emotional weight (immediately after the hero, before the Rates & Booking module, around the signature Cicero quotation) may step up to `space-5xl` (128px) or, in the rarest case, `space-6xl` (192px), but this should be used no more than once or twice per page — if every section uses the largest gap, none of them read as special. Inside a section, related elements use the smaller `space-lg` to `space-2xl` range; only section boundaries use the large 4xl-plus values. This distinction — small gaps within a thought, large gaps between thoughts — is what makes the page read as paced rather than simply spaced-out.

## 4. Responsive Collapse Rules

Multi-column layouts collapse to a single column below `bp-tablet`, never to a cramped two-column phone layout — on a small screen, one full-width item at a time, in the same order as desktop, is more consistent with this brand's unhurried pacing than trying to preserve a grid at a size it was never designed for. Full-bleed photography components retain their full-bleed treatment at every breakpoint down to mobile; they should never gain a container margin on small screens, since the whole point of a full-bleed moment is that it has none. Navigation collapses to a simple, single-panel menu below `bp-tablet` — no nested accordion menu, consistent with the six-link maximum already set in `04_COMPONENT_LIBRARY.md`.

## 5. Alignment and Symmetry

The system favours deliberate asymmetry over centred, symmetrical layouts wherever a component involves both an image and text — an image occupying seven columns with text occupying the remaining four or five, offset rather than centred beneath it, is the default editorial pattern for this brand, echoing the "premium architectural magazine" reference in `01_DESIGN_LANGUAGE.md`. Centred, symmetrical layouts are reserved specifically for moments of maximum calm and focus — the hero headline, the signature quote, the booking confirmation — where symmetry itself reads as stillness rather than as a default habit applied everywhere.

## 6. What This Layout System Should Never Produce

A page that feels evenly, mechanically spaced from top to bottom, with every section the same width and the same gap from its neighbour, is a failure of this system, not a safe, acceptable default — that evenness is precisely what makes template-driven corporate hotel sites feel interchangeable. Every page built from this layout system should have a visible rhythm of wide and narrow, full-bleed and contained, quick and slow, when looked at as a whole scroll from top to bottom.
