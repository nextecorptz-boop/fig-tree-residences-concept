# Fig Tree Residences — Design System
### Phase 3: Luxury Design Language — v2.0

This document defines how the design language in `01_DESIGN_LANGUAGE.md` is organised into a usable system: its layered architecture, naming conventions, theming approach, and the non-negotiable baseline every component must meet. It is the connective structure between philosophy and the concrete values in `03_DESIGN_TOKENS.md`.

## 1. System Architecture — Four Layers

The system is organised bottom-up, and no layer should be skipped when building anything new:

1. **Primitives** — raw values with no meaning attached (a specific hex code, a specific pixel size). Defined in `03_DESIGN_TOKENS.md`.
2. **Semantic tokens** — primitives given a purpose (`color-surface-canvas`, `color-text-primary`, `space-section-gap`). Also defined in `03_DESIGN_TOKENS.md`, one layer up from primitives.
3. **Components** — navigation, hero, gallery, and the rest of `04_COMPONENT_LIBRARY.md` — built exclusively from semantic tokens, never from raw primitive values directly.
4. **Patterns/Pages** — full page assemblies (Home, Our Story, Rooms, Rates & Booking, and the rest of the information architecture from Phase 2) built exclusively from components.

The rule that makes this system maintainable is simple: a component is never allowed to reach past its own layer and hard-code a primitive value directly. If a hero section needs a colour, it asks for a semantic token, not a hex code. This is what allows the entire visual language to be adjusted later — a warmer cream, a slightly deeper teal — from a single source rather than hunting through every component individually.

## 2. Naming Convention

Tokens are named `category-role-variant`, read left to right from general to specific: `color-surface-canvas` (category: colour, role: surface, variant: canvas/base background), `color-accent-terracotta`, `space-md`, `radius-lg`, `shadow-soft`. Component-level names follow `Component.Element.State`: `Hero.Headline.Default`, `RoomCard.Image.Hover`. This convention is chosen specifically so that engineers can predict a token's name from its purpose without needing to consult a lookup table for every single value.

## 3. Theming Approach: One Brand, Two Registers, Not Two Brands

This is not a light-mode/dark-mode system in the conventional software sense — Fig Tree is a single, warm, daylight-forward brand, and a literal inverted dark mode would work against the "warm natural light" reference in `01_DESIGN_LANGUAGE.md`. Instead, the system defines two **registers** of the same palette:

- **Daylight register** (default) — cream and warm-white surfaces, used for Home, Our Story, Rooms, Gardens, Location, and Rates & Booking. This is the register a visitor spends most of their time in.
- **Dusk register** — a deeper, warmer, teal-forward surface treatment reserved specifically for the Restaurant/rooftop section and any full-bleed evening photography, matching the property's own strongest existing photography (the golden-hour rooftop shots flagged as a strength in Phase 1's Photo Audit). This register should be used sparingly and only where the content is genuinely about the evening/rooftop experience — never as a generic "dark mode" toggle available everywhere.

Both registers share the same type scale, spacing scale, and component anatomy; only the colour and shadow tokens shift between them. This keeps the two registers feeling like one brand in two lights, rather than two different products.

## 4. Non-Negotiable Baseline

Every component in this system, regardless of register, must meet a fixed floor before any visual refinement is considered: text must maintain at least a 4.5:1 contrast ratio against its background; every interactive element must expose a visible focus state; every touch target must be at least 44×44px; and motion must respect a visitor's `prefers-reduced-motion` setting, per the guardrails already set out in Phase 2's Motion Strategy. These are treated as floor requirements, not aspirational goals — a beautiful component that fails any one of these is a broken component, not a finished one with a caveat.

## 5. Consistency Rule Across Components

Every component defined in `04_COMPONENT_LIBRARY.md` must be traceable to the same small set of primitives in `03_DESIGN_TOKENS.md`. If a new component seems to need a colour, spacing value, or corner radius that does not already exist in the token set, that is a signal the token set is incomplete and should be extended deliberately — it is never a licence to introduce a one-off value used nowhere else. This is the mechanism that keeps twelve very different components (a hero, a footer, a testimonial, a FAQ accordion) reading as one coherent, restrained system instead of twelve separately designed pieces stitched together.

## 6. What Belongs in Which Document From Here

`03_DESIGN_TOKENS.md` supplies the actual primitive and semantic values. `04_COMPONENT_LIBRARY.md` defines each component's anatomy and states using those values. `05_LAYOUT_SYSTEM.md` defines the grid and spacing rhythm those components sit inside. `06_MOTION_LANGUAGE.md`, `07_CURSOR_SYSTEM.md`, and `08_ICONOGRAPHY.md` extend the system into motion, pointer, and symbol language respectively. `09_VISUAL_DIRECTION.md` and `10_HIGGSFIELD_PREP.md` govern the photography and video that will fill this system once it is built.
