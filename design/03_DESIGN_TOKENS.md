# Fig Tree Residences — Design Tokens
### Phase 3: Luxury Design Language — v2.0

This document is the primitive and semantic value layer described in `02_DESIGN_SYSTEM.md`. Every value below is grounded in what Phase 1 discovery actually observed on the property, its logo, and its printed collateral. Hex values are field-sampled starting points from the existing photography and should be confirmed against a physical paint swatch or a colour-calibrated re-shoot before final production use — they are precise enough to build and test against today, not yet certified Pantone references.

## 1. Colour — Primitives

| Token | Hex (starting value) | Source |
|---|---|---|
| `teal.deep` | `#1E3B36` | Logo wordmark and tree trunk |
| `teal.bright` | `#2E8C82` | Building exterior paint, rooftop bar structure, pool tile |
| `terracotta.base` | `#B9673C` | Logo fig fruit, "RESIDENCES" wordmark, garden stone walls |
| `terracotta.soft` | `#D9A47E` | Lighter garden stone, warm accent tint |
| `cream.base` | `#F8F3EA` | Brochure background, interior wall colour (colour-cast corrected) |
| `cream.deep` | `#EFE6D6` | Recessed surfaces, card backgrounds on cream register |
| `sand.stone` | `#D6C6AF` | Neutral border and divider tone, echoes garden stonework |
| `navy.accent` | `#26405A` | Recurring nautical cushions, bed runners, wall art |
| `ink.primary` | `#1B211F` | Primary text — near-black with a warm, teal-adjacent undertone rather than pure black |
| `ink.muted` | `#4C5652` | Secondary/supporting text |
| `white.pure` | `#FFFFFF` | Reserved for glass highlights and rare high-contrast moments only |

## 2. Colour — Semantic Tokens

| Semantic token | Maps to | Usage |
|---|---|---|
| `color-surface-canvas` | `cream.base` | Default page background, daylight register |
| `color-surface-raised` | `cream.deep` | Cards, panels, raised surfaces on daylight register |
| `color-surface-dusk` | `teal.deep` | Background for the Restaurant/rooftop dusk register |
| `color-text-primary` | `ink.primary` | Headlines, body copy on daylight register |
| `color-text-inverse` | `cream.base` | Text set on the dusk register or over photography |
| `color-text-muted` | `ink.muted` | Captions, metadata, secondary copy |
| `color-accent-primary` | `teal.bright` | Primary interactive accent — links, active nav state, focus rings |
| `color-accent-secondary` | `terracotta.base` | Secondary accent — used sparingly, for warmth (badges, highlighted facts, the signature quote treatment) |
| `color-border-hairline` | `sand.stone` at 60% opacity | Dividers, hairline rules, input borders |
| `color-feedback-success` | a muted sage derived by blending `teal.bright` toward `cream.base` | Booking confirmation states — deliberately muted, never a clinical bright green |
| `color-feedback-error` | a muted, desaturated `terracotta.base` | Form validation — firm but never alarming or corporate-red |

Two colours are deliberately absent from this system: a bright, saturated "safety orange" and a cool clinical blue. Both are common in conventional hotel-booking UI (urgency banners, generic link-blue) and both would violate the "never resemble a corporate hotel chain" instruction in `01_DESIGN_LANGUAGE.md`.

## 3. Typography

**Display/headline typeface: Fraunces** (variable, available via Google Fonts) — a warm, editorial serif with soft, slightly organic terminals rather than the cold precision of a typical corporate serif. Its optical-size axis should be set to its "soft" end for large display use, giving headlines the same unhurried, warm character as the brand's photography. Fraunces' italic cut is reserved specifically for the Cicero line and any other signature quotations, per Phase 2's Copy Direction — used sparingly, never as a general-purpose style.

**Body/UI typeface: Inter** (variable, Google Fonts) — chosen for its neutrality and legibility at small sizes, so that the warmth of the brand lives in the serif headlines and photography, not in a body font trying to do too much work. Inter never competes with Fraunces for character; it simply gets out of the way.

| Token | Typeface | Size (desktop) | Size (mobile) | Weight | Line-height | Letter-spacing | Usage |
|---|---|---|---|---|---|---|---|
| `type-display-xl` | Fraunces | 72px | 40px | 400 | 1.05 | -0.01em | Homepage hero headline only |
| `type-display-l` | Fraunces | 48px | 32px | 400 | 1.1 | -0.01em | Section-opening headlines (Our Story, Gardens, Location) |
| `type-heading-1` | Fraunces | 36px | 28px | 500 | 1.2 | normal | Page titles |
| `type-heading-2` | Fraunces | 28px | 22px | 500 | 1.25 | normal | Sub-section titles |
| `type-heading-3` | Inter | 20px | 18px | 600 | 1.3 | normal | Component titles (card headings, amenity names) |
| `type-quote` | Fraunces Italic | 32px | 24px | 400 | 1.35 | normal | The Cicero line and other signature quotations only |
| `type-body-l` | Inter | 18px | 17px | 400 | 1.65 | normal | Lead paragraphs, Our Story narrative copy |
| `type-body` | Inter | 16px | 16px | 400 | 1.6 | normal | Default body copy — never smaller than 16px on mobile, per accessibility floor |
| `type-caption` | Inter | 14px | 14px | 500 | 1.5 | 0.01em | Captions, metadata, form labels |
| `type-nav` | Inter | 15px | 15px | 500 | 1.4 | 0.02em | Navigation labels |

## 4. Spacing Scale

A single base-4 scale, used everywhere so that rhythm stays consistent between typography, layout, and component padding.

| Token | Value | Typical use |
|---|---|---|
| `space-xs` | 4px | Icon-to-label gaps |
| `space-sm` | 8px | Tight internal padding |
| `space-md` | 16px | Default internal component padding |
| `space-lg` | 24px | Card padding, gutter on mobile |
| `space-xl` | 32px | Gutter on desktop, gaps between related elements |
| `space-2xl` | 48px | Gaps between distinct components on a page |
| `space-3xl` | 64px | Sub-section spacing |
| `space-4xl` | 96px | Section-to-section spacing (the primary rhythm unit of the site) |
| `space-5xl` | 128px | Spacing around the most important full-bleed moments (hero, signature quote) |
| `space-6xl` | 192px | Reserved for the rare, deliberate "held breath" moment described in the storytelling flow |

## 5. Grid and Containers

| Token | Value |
|---|---|
| `grid-columns` | 12 |
| `container-max` | 1440px |
| `container-content` | 1120px (used for long-form reading — Our Story, Journal) |
| `gutter-desktop` | `space-xl` (32px) |
| `gutter-mobile` | `space-lg` (24px) |
| `margin-desktop` | 80px |
| `margin-tablet` | 48px |
| `margin-mobile` | `space-lg` (24px) |

## 6. Corners and Borders

Corner treatment is deliberately restrained rather than either sharp-cornered corporate or heavily rounded and playful — quiet luxury sits between those two extremes.

| Token | Value | Usage |
|---|---|---|
| `radius-none` | 0px | Full-bleed and framed photography — kept architecturally sharp, echoing a magazine plate |
| `radius-sm` | 4px | Buttons, inputs, tags |
| `radius-md` | 12px | Cards, panels |
| `radius-lg` | 20px | Large feature panels, the booking widget container |
| `border-hairline` | 1px solid `color-border-hairline` | The only border weight in the system — no heavy or double borders anywhere |

## 7. Elevation, Shadow, and Glass

Shadows in this system behave like ambient natural light, not like a hard studio drop-shadow — soft, warm-tinted, and low in opacity.

| Token | Values | Usage |
|---|---|---|
| `shadow-whisper` | `0 1px 2px rgba(30,59,54,0.04), 0 2px 8px rgba(30,59,54,0.04)` | Resting state for cards on the cream register |
| `shadow-lifted` | `0 4px 12px rgba(30,59,54,0.08), 0 8px 24px rgba(30,59,54,0.06)` | Hover/active state for interactive cards |
| `shadow-floating` | `0 12px 32px rgba(30,59,54,0.12)` | Sticky navigation, modal/booking overlays |
| `glass-nav` | Background `cream.base` at 82% opacity, backdrop blur 16px | Sticky navigation over hero photography — warm-tinted, never the cold blue-white of a generic glassmorphism trend, and always kept above the 80% opacity floor needed for text legibility in daylight conditions |

Reflection is used in exactly one place in this system: a soft, low-opacity vertical reflection beneath standalone product-style shots of the pool or water features, echoing the actual reflective water already visible in Phase 1's pool photography. It is never applied to logos, buttons, or text.

## 8. Texture and Natural Materials

Texture in this system is sourced from the property itself, not from generic digital patterns: a very low-opacity paper/linen grain may be applied to large cream backgrounds to keep them from reading as flat digital colour; teal ceramic tile, terracotta stone, rattan weave, and timber grain are treated as photographic and material reference points for `09_VISUAL_DIRECTION.md`, not as illustrated icons or CSS patterns. Nothing in this token set should be recreated as an abstract tropical-leaf pattern or stock texture unconnected to the real building.

## 9. Responsive Breakpoints

| Token | Value | Target |
|---|---|---|
| `bp-mobile` | 375px | Small phones |
| `bp-mobile-l` | 428px | Large phones |
| `bp-tablet` | 768px | Tablets, small laptops in split view |
| `bp-laptop` | 1024px | Laptops |
| `bp-desktop` | 1440px | Standard desktop |
| `bp-wide` | 1920px | Large displays — content should stop growing past `container-max` and let whitespace expand instead |
