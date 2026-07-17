# Fig Tree Residences — Component Library
### Phase 3: Luxury Design Language — v2.0

This document defines the visual and behavioural language of every major component, built exclusively from the tokens in `03_DESIGN_TOKENS.md`. It describes anatomy, states, and content rules — not pixel layouts or code. Each component should be checked against the four governing principles in `01_DESIGN_LANGUAGE.md` before it is considered finished.

## 1. Navigation

**Anatomy.** A slim, single-row bar: wordmark/mark on the left, five to six text links centred or right-aligned, and a single quiet "Rates & Booking" link treated with slightly more visual weight than its siblings but never as a loud, filled button in the resting state. Uses `glass-nav` when scrolled over photography, and a flat `color-surface-canvas` background once past the hero.

**States.** Resting: text in `color-text-primary` (or `color-text-inverse` over dark photography), no underline. Hover: a slow, 1px underline draw-in using `color-accent-primary` — never a colour flash or background fill, which would read as a generic UI pattern rather than an editorial one. Active/current page: the underline present permanently, at reduced opacity.

**Content rule.** Never more than six top-level links, matching the Information Architecture from Phase 2 (Our Story, Rooms, Amenities, Gardens, Location, Rates & Booking) — no dropdown mega-menus, which would immediately read as corporate-hotel-chain scale rather than boutique intimacy.

## 2. Hero

**Anatomy.** One full-bleed, full-viewport-height photograph (the property's own January 2025 drone image is the reference asset) with a short headline in `type-display-xl`, optionally the Fraunces-italic signature quote beneath it, and a single, quiet scroll indicator — no button stack, no carousel, no autoplaying slideshow of five different images competing for the same three seconds of attention.

**States.** A slow, held entrance (image present, near-static, for at least a full second before any text begins to appear) rather than an immediate slide-in — see `06_MOTION_LANGUAGE.md` for exact timing. No looping animation of any kind plays continuously in this component; it is a photograph, held, not a moving background.

**Content rule.** One image, one headline, one optional supporting line. This component's entire job, per Phase 2's Storytelling Flow Act One, is arrival — it should never be asked to also sell, explain, or convert.

## 3. Gallery

**Anatomy.** An asymmetric, editorial grid — varying image proportions across a row, the way a magazine spread mixes a large plate with two smaller supporting frames — rather than a uniform square-thumbnail grid, which is the single most common "hotel website" gallery pattern this brand is explicitly trying not to resemble. Categorised by the room/space type it belongs to (per Phase 2's Information Architecture), never presented as one undifferentiated flat stream of every photo on the property.

**States.** A gentle zoom (no more than a few percent scale, never a jarring pop) on hover for desktop pointer users; a simple, unhurried full-screen viewer on click/tap, with soft cross-fade transitions between images rather than a hard cut or a sliding-carousel motion.

**Content rule.** Every image requires a caption identifying what it is (which room, which garden feature) — Phase 1's Photo Audit found the current gallery has no captions and duplicates several images; this component's anatomy makes that omission structurally impossible going forward.

## 4. Room Experience

**Anatomy.** One dedicated, generously spaced module per room type — full-width hero image for that specific room, a short specific description (square-metreage, bed configuration, view), and a small set of iconographic amenity markers (per `08_ICONOGRAPHY.md`) rather than a repeated bulleted list. Multiple room types are presented as a sequence of distinct modules, not a dense comparison table.

**States.** A "select this room" action that visually matches the restrained button language defined for Booking below — never a bright, urgent "Book Now" badge stamped across the image itself.

**Content rule.** Per Phase 2's Content Hierarchy, this component may never ship without a visible starting rate and a real, distinct photograph for the specific room type it represents — a placeholder or a shared generic image is a content violation, not a visual-polish issue to fix later.

## 5. Amenities

**Anatomy.** A restrained grid of considered "moments" rather than a checklist — each amenity (pool, gym, BBQ gardens, conference room, rooftop, shopping concierge, security) gets a small photograph or icon, a short reassurance-framed line (per Phase 2's Content Hierarchy translation of the brochure's amenities list), not a bare noun.

**States.** Static; this component should not require hover interaction to reveal its content, since every amenity's core fact should already be visible at rest — quiet luxury does not hide information behind interaction.

**Content rule.** Security is never presented as its own alarming, separate "features" list (nine bullet points, as in the current brochure) — it is folded into the same calm visual register as every other amenity, per the reassurance-not-checklist principle established in Phase 2.

## 6. Garden Experience

**Anatomy.** A dedicated, slow-paced module (or full page, per the Information Architecture) built around the property's living wall, mature trees, and outdoor seating — generous full-bleed photography with unusually wide margins and spacing compared to other components, deliberately built to feel slower to scroll through than any other section on the site, directly implementing the "slowing down" emotional target from Phase 2's Guest Journey.

**States.** Minimal — this is the one component in the entire library where the absence of interaction is itself the point.

**Content rule.** No amenity icons or booking prompts inside this component — it exists purely as an atmospheric, sensory moment in the five-act storytelling flow, with any call-to-action deferred to the section that follows it.

## 7. Restaurant

**Anatomy.** The one component permitted to use the `color-surface-dusk` register by default, built around the property's genuinely strong golden-hour and string-light rooftop photography. Full-bleed imagery, warm typography set in `color-text-inverse`, and a short, sensory description rather than a menu-style listing.

**States.** A subtle, slow warm-light "breathing" quality is acceptable here specifically (see `06_MOTION_LANGUAGE.md`), because it is the one place in the system where the dusk atmosphere the photography already captures should be allowed to feel alive rather than static.

**Content rule.** Should reference the specific, verifiable view (the bay, the Yacht Club) rather than generic "stunning views" language, per Phase 2's Copy Direction.

## 8. Location

**Anatomy.** A map-and-narrative pairing: a restrained, custom-styled map (matching the system's colour palette rather than a default embedded map's clashing colours) alongside the specific proximity facts already confirmed in Phase 1 (200m to the Yacht Club, walking distance to the Slipway, proximity to two international schools and two clinics), presented as a short list of specific distances rather than paragraph copy.

**States.** Static informational component; no interactive filtering or search needed at this scale.

**Content rule.** Every distance claim must be a verified fact from the brochure/Discovery record, never a rounded or invented approximation — this component's entire value proposition is its specificity.

## 9. Booking

**Anatomy.** A single, calm, clearly labelled module: dates, room type, a visible rate, and one clear action — never the triplicated payment-icon pattern Phase 1 found on the live site today. Payment provider marks, if shown at all, appear once, small, and only at the final confirmation step, not repeated across every page.

**States.** A real, honest loading state on submission (never a static, always-visible false "success" message, which Phase 1 flagged as a live trust problem on the current contact form) and a genuine, distinct confirmation state once a booking actually completes.

**Content rule.** This component is the highest-risk moment identified in Phase 2's Experience Map — it must always show a real rate before asking for any commitment, with no exceptions.

## 10. Footer

**Anatomy.** Quiet and information-dense without being visually loud: address, phone, correctly labelled social links (Phase 1 found the current site's icons linked to the wrong destinations), a short repeat of the signature quote or brand line, and — as the one truly new component this system introduces — a small, warm "until next time" moment addressing the Departure stage of the Guest Journey, which currently has no digital touchpoint at all.

**States.** Static.

**Content rule.** Every link must go where its icon claims it goes — a direct, structural fix for the mislabeled-icon problem identified in Discovery.

## 11. Testimonials

**Anatomy.** A small number of real, attributed quotations (sourced from the property's genuine TripAdvisor and guest history per Phase 2's Content Hierarchy) set in `type-quote`, presented one at a time or in a slow, gentle sequence — never a dense wall of star ratings and review-snippet cards, which is the generic OTA pattern this brand should read as distinct from.

**States.** If sequenced, transitions are slow cross-fades on a long interval (measured in many seconds, not a fast auto-rotating carousel) — see `06_MOTION_LANGUAGE.md`.

**Content rule.** Every testimonial requires real attribution (a name, or at minimum a guest type — "Long-stay guest, 2025") — anonymous, unverifiable-feeling quotes would undercut the validation purpose this component exists to serve.

## 12. FAQ

**Anatomy.** A simple, fully populated accordion — Phase 1 found the current site's FAQ has only one working category out of eight labelled ones; this component's specification requires every category shown to have real, complete content behind it before it ships, with no exceptions for placeholder labels.

**States.** Single-item-open-at-a-time accordion behaviour, with a slow, smooth height transition rather than an abrupt snap — consistent with the unhurried motion philosophy defined in `06_MOTION_LANGUAGE.md`.

**Content rule.** No category may be published without complete content — a visibly empty accordion category, which Phase 1 found is the current site's actual live state, is treated in this system as equivalent to a broken component, not an acceptable placeholder.
