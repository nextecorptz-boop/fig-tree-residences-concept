# Fig Tree Residences — Section Blueprint
### Phase 4: Master Build Specification — v1.0

Every section below is specified against ten fields: Purpose, Headline, Content, Images, Animation, Video, Interaction, CTA, Mobile behaviour, Desktop behaviour. Animation and Video fields name a treatment; the exact timing/easing values are defined in `06_ANIMATION_MAP.md` and the exact production brief for imagery is defined in `07_HIGGSFIELD_SHOTLIST.md` — this document is the bridge between the two.

## Home

### 1. Hero
- **Purpose:** The first held breath; establish place and calm immediately.
- **Headline:** A short, specific line naming the property and its setting (e.g. "A garden residence on the Msasani Peninsula") — never a generic tagline.
- **Content:** Minimal — headline, one supporting line, a single primary CTA.
- **Images:** The aerial/exterior hero per `10_HIGGSFIELD_PREP.md` Section 1.
- **Animation:** `motion-ambient` slow image drift only; headline fades in once, no repeat.
- **Video:** Optional looped background per the Hero brief; a static image is an acceptable substitute.
- **Interaction:** None beyond the CTA and a scroll cue.
- **CTA:** "Explore the Residence" → scrolls to Our Story teaser (not a hard link to Booking — the Hero's job is arrival, not conversion).
- **Mobile behaviour:** Static image only (no video) to protect the Performance Budget on cellular connections; headline and CTA stack vertically.
- **Desktop behaviour:** Full-bleed image/video, headline left- or right-aligned per the asymmetry principle in `05_LAYOUT_SYSTEM.md`.

### 2. Our Story Teaser
- **Purpose:** Establish the brand's rootedness in one paragraph before asking for anything.
- **Headline:** A line drawn from `02_BRAND_STORY.md`'s working narrative statement.
- **Content:** One short paragraph + "Read Our Story" link.
- **Images:** A single still from the Our Story shot list.
- **Animation:** Standard `motion-reveal` section entrance (opacity + 24px translate).
- **Video:** None.
- **Interaction:** None beyond the link.
- **CTA:** "Read Our Story" → `/our-story`.
- **Mobile behaviour:** Image above text, full width.
- **Desktop behaviour:** Image and text side by side, asymmetric split (not 50/50).

### 3. Rooms Teaser
- **Purpose:** Prove specificity — real, distinct room types exist.
- **Headline:** "Where You'll Stay."
- **Content:** 2–3 room cards (name, one-line differentiator, "from" rate reference).
- **Images:** Correctly colour-graded room photography per `09_VISUAL_DIRECTION.md`.
- **Animation:** Cards stagger in on scroll, 80–120ms offset per `06_MOTION_LANGUAGE.md`.
- **Video:** None.
- **Interaction:** Card hover lifts shadow (`shadow-whisper` → `shadow-lifted`).
- **CTA:** Each card links to its own `/rooms/[slug]`; section-level "View All Rooms" link to `/rooms`.
- **Mobile behaviour:** Cards stack in a single column, swipeable if more than 2 shown.
- **Desktop behaviour:** 3-column grid within `container-content`.

### 4. Gardens Teaser
- **Purpose:** Signal the property's most emotionally proven asset early.
- **Headline:** A short evocative line, not a feature description.
- **Content:** Minimal — near-wordless, image-led.
- **Images:** The strongest single Garden Experience still.
- **Animation:** The slowest drift/parallax on the Home page, matching Gardens' own motion priority.
- **Video:** Preferred if produced (High video priority per `10_HIGGSFIELD_PREP.md`); still image otherwise.
- **Interaction:** None.
- **CTA:** "Step Into the Garden" → `/gardens`.
- **Mobile behaviour:** Full-width image, video disabled on cellular (static fallback).
- **Desktop behaviour:** Full-bleed with subtle parallax.

### 5. Reviews Strip
- **Purpose:** Reassurance through other guests' words.
- **Headline:** "From Guests Who've Stayed."
- **Content:** 2–3 short pulled testimonials, attributed by first name and guest type where available.
- **Images:** None required; a small guest photo is acceptable if consented.
- **Animation:** Simple fade/cross-fade if presented as a rotating strip; otherwise static.
- **Video:** None.
- **Interaction:** Manual advance only if rotating (no forced autoplay carousel, per `10_MOTION_STRATEGY.md`'s ban on autoplay carousels).
- **CTA:** "Read More Reviews" → `/reviews`.
- **Mobile behaviour:** One testimonial visible at a time, swipeable.
- **Desktop behaviour:** 2–3 shown side by side.

### 6. Location Teaser
- **Purpose:** Ground the property in verified, specific proximity.
- **Headline:** A specific distance claim (e.g. "200 Metres From the Yacht Club").
- **Content:** 2–3 verified distance/landmark facts.
- **Images:** A still from the Location shot list, or the map component at reduced scale.
- **Animation:** Standard `motion-reveal`.
- **Video:** None on Home (reserved for the full Location page).
- **Interaction:** None.
- **CTA:** "See the Neighbourhood" → `/location`.
- **Mobile behaviour:** Stacked, image above facts.
- **Desktop behaviour:** Side by side.

### 7. Departure / Footer Moment
- **Purpose:** Close the emotional loop the Hero opened; the site's first-ever "I never want to leave" touchpoint.
- **Headline:** A quiet closing line, not a CTA-style headline.
- **Content:** Minimal.
- **Images:** The Departure still per `10_HIGGSFIELD_PREP.md` Section 8.
- **Animation:** Slow fade only.
- **Video:** Low priority; still image is the default.
- **Interaction:** None.
- **CTA:** None required here — the footer navigation beneath it carries all remaining links.
- **Mobile behaviour:** Full-width image, generous whitespace above the footer nav.
- **Desktop behaviour:** Same, wider canvas.

## Our Story

### 8. Origin Narrative
- **Purpose:** Tell the true 2018 origin story.
- **Headline:** Drawn from `02_BRAND_STORY.md`.
- **Content:** Full narrative copy, edited per `09_COPY_DIRECTION.md` voice principles.
- **Images:** Our Story sequence stills.
- **Animation:** Cross-fade between accompanying images as the reader scrolls (`motion-reveal` per image, not a locked carousel).
- **Video:** Medium priority per `10_HIGGSFIELD_PREP.md` Section 2.
- **Interaction:** None.
- **CTA:** None mid-narrative; a single CTA at the section's end.
- **Mobile behaviour:** Single column, images full width between paragraphs.
- **Desktop behaviour:** Alternating image/text asymmetric layout.

### 9. The Three Pillars
- **Purpose:** Reframe privacy/security/calm as reassurance, not a feature checklist.
- **Headline:** "What We Protect."
- **Content:** Three short blocks, each pillar in its own voice, no icons per `08_ICONOGRAPHY.md` Section 5.
- **Images:** Optional supporting texture/material shots.
- **Animation:** Staggered `motion-reveal`.
- **Video:** None.
- **Interaction:** None.
- **CTA:** None.
- **Mobile behaviour:** Stacked.
- **Desktop behaviour:** Three-column.

### 10. Cicero Quotation
- **Purpose:** The single moment the brand's signature line is used.
- **Headline:** None — the quotation is the headline.
- **Content:** The Cicero line, set in Fraunces Italic, per `03_DESIGN_TOKENS.md`.
- **Images:** None, or a single quiet background texture.
- **Animation:** Slow fade-in only, held longer than any other text reveal in the system.
- **Video:** None.
- **Interaction:** None.
- **CTA:** None.
- **Mobile behaviour:** Centred, generous whitespace above/below.
- **Desktop behaviour:** Same, larger type per the display type scale.

### 11. Long Stay / Journal Links
- **Purpose:** Route two specific reader intents forward.
- **Headline:** None required — simple linked cards.
- **Content:** Two short link cards.
- **Images:** One supporting image each.
- **Animation:** Standard `motion-reveal`.
- **Video:** None.
- **Interaction:** Hover lift, matching the card interaction spec.
- **CTA:** "Read About Long Stay" / "Visit the Journal."
- **Mobile behaviour:** Stacked.
- **Desktop behaviour:** Side by side.

## Rooms

### 12. Rooms Index Grid
- **Purpose:** Let a guest compare every room type honestly.
- **Headline:** "Rooms & Suites."
- **Content:** A card per room type: name, one differentiator line, from-rate.
- **Images:** One representative, colour-accurate image per room type.
- **Animation:** Staggered entrance on scroll.
- **Video:** Low priority per `10_HIGGSFIELD_PREP.md` Section 3.
- **Interaction:** Card hover lift; optional short-stay/long-stay filter toggle.
- **CTA:** Each card → its detail page.
- **Mobile behaviour:** Single column.
- **Desktop behaviour:** 2–3 column grid.

### 13. Room Detail
- **Purpose:** Let a guest fully evaluate one specific room type.
- **Headline:** The room type's name.
- **Content:** Full feature list, size, occupancy, bed configuration.
- **Images:** A short gallery (3–6 images), one consistent angle set per room per `09_VISUAL_DIRECTION.md`.
- **Animation:** Gallery cross-fade only; no parallax (accuracy over atmosphere).
- **Video:** Low priority.
- **Interaction:** Gallery navigation (arrows/dots, keyboard-operable).
- **CTA:** "Check Rates" → `/booking?room=[slug]`.
- **Mobile behaviour:** Swipeable gallery, stacked feature list.
- **Desktop behaviour:** Gallery and feature list side by side.

## Long Stay

### 14. Long Stay Narrative
- **Purpose:** Address the Long-Stay Resident persona's specific needs.
- **Headline:** "Living at Fig Tree."
- **Content:** Daily-life detail — kitchen, laundry, workspace, quiet.
- **Images:** Kitchen/workspace/material detail shots per `09_VISUAL_DIRECTION.md` Section 6.
- **Animation:** Standard `motion-reveal`.
- **Video:** Low priority.
- **Interaction:** None.
- **CTA:** "See Long-Stay Rooms" → filtered room list below.
- **Mobile behaviour:** Single column.
- **Desktop behaviour:** Alternating image/text.

### 15. Long Stay Room List
- **Purpose:** Show only rooms genuinely suited to extended stays.
- **Headline:** None — a direct continuation of Section 14.
- **Content:** Filtered room cards, same format as Section 12.
- **Images:** As Section 12.
- **Animation:** As Section 12.
- **Video:** None.
- **Interaction:** As Section 12.
- **CTA:** As Section 13.
- **Mobile behaviour:** As Section 12.
- **Desktop behaviour:** As Section 12.

## Amenities

### 16. Amenity Groups
- **Purpose:** Communicate practical comfort without a generic bullet list.
- **Headline:** "Amenities."
- **Content:** Grouped amenities, each with a short line beyond just a name (specificity per Design Language's fourth principle).
- **Images:** One vignette per amenity group per `10_HIGGSFIELD_PREP.md` Section 4.
- **Animation:** Staggered `motion-reveal`; slight push-in on the pool vignette specifically if video is used.
- **Video:** Low-to-medium; pool motion prioritised.
- **Interaction:** Icon + label pairs (never icon-only) per `08_ICONOGRAPHY.md`.
- **CTA:** None mid-section; links to Gardens/Dining at section end.
- **Mobile behaviour:** Single column groups.
- **Desktop behaviour:** Multi-column grid.

### 17. Gardens & Dining Links
- **Purpose:** Route the two amenities significant enough to be their own pages.
- **Headline:** None — two linked feature cards.
- **Content:** Short teaser text per card.
- **Images:** One strong image each.
- **Animation:** Standard reveal.
- **Video:** None here (reserved for the destination pages).
- **Interaction:** Hover lift.
- **CTA:** "Explore the Garden" / "Explore Dining."
- **Mobile behaviour:** Stacked.
- **Desktop behaviour:** Side by side.

### 18. Amenities FAQ
- **Purpose:** Answer practical questions where they arise, closing Discovery's empty-FAQ gap.
- **Headline:** "Questions."
- **Content:** Accordion, practical-only categories (check-in, parking, WiFi, kitchenette use).
- **Images:** None.
- **Animation:** Accordion expand/collapse, `motion-instant`–`motion-quiet` range.
- **Video:** None.
- **Interaction:** Keyboard-operable accordion, one open panel at a time or multiple — engineering discretion, but must be announced correctly to assistive tech per `11_ACCESSIBILITY_PLAN.md`.
- **CTA:** None.
- **Mobile behaviour:** Full width, single column.
- **Desktop behaviour:** Constrained to `container-content` width, not full-bleed.

## Gardens

### 19. Garden Experience
- **Purpose:** Slow the visitor down; the site's calmest single moment.
- **Headline:** Minimal or none — image-led per Design Language.
- **Content:** A short paragraph at most.
- **Images/Video:** Per `10_HIGGSFIELD_PREP.md` Section 5 — the longest held shot in the system, High video priority.
- **Animation:** The slowest parallax/drift in the entire site.
- **Interaction:** The signature ring cursor is active here.
- **CTA:** "Explore Amenities" or "Check Rates" at the section's end only — no CTA interrupting the experience itself.
- **Mobile behaviour:** Video disabled by default on cellular; still image fallback with the same crop.
- **Desktop behaviour:** Full-bleed, slow drift.

## Dining

### 20. Restaurant / Rooftop Experience
- **Purpose:** Convey the day's most special moment, in the Dusk register.
- **Headline:** Minimal, evocative.
- **Content:** Short paragraph; hours/reservation note if applicable.
- **Images/Video:** Per `10_HIGGSFIELD_PREP.md` Section 6 — High video priority, golden-hour/dusk grading.
- **Animation:** `motion-ambient` string-light/light-flicker treatment.
- **Interaction:** None beyond standard scroll.
- **CTA:** "Check Rates" / "Contact Us" for reservation-adjacent enquiries.
- **Mobile behaviour:** Video disabled on cellular by default; still fallback.
- **Desktop behaviour:** Full-bleed, ambient motion active.

## Location

### 21. Proximity Narrative
- **Purpose:** Ground the property in verified specifics.
- **Headline:** A specific distance claim.
- **Content:** Verified facts from `CONTENT_DATABASE.md`, never vague ("close to everything" is explicitly disallowed per `09_COPY_DIRECTION.md`).
- **Images/Video:** Per `10_HIGGSFIELD_PREP.md` Section 7.
- **Animation:** Standard reveal; the walking-pace tracking shot if video is produced.
- **Interaction:** None.
- **CTA:** None mid-section.
- **Mobile behaviour:** Stacked.
- **Desktop behaviour:** Side by side with the map.

### 22. Custom Map
- **Purpose:** Provide a brand-consistent, practically useful map.
- **Headline:** None.
- **Content:** The map itself plus a short legend if multiple landmarks are pinned.
- **Images:** N/A (map tiles, custom-styled).
- **Animation:** None beyond standard map interaction.
- **Video:** None.
- **Interaction:** Pan/zoom, pin taps revealing landmark names.
- **CTA:** "Get Directions" (deep-links to the user's own maps app).
- **Mobile behaviour:** Full width, fixed aspect ratio to prevent layout shift (CLS budget).
- **Desktop behaviour:** Constrained to `container-content`, or full-bleed if paired with side content.

## Experiences

### 23. Local Experience List
- **Purpose:** Answer "what is there to do" beyond logistics.
- **Headline:** "Nearby."
- **Content:** Grouped local activities/points of interest.
- **Images:** Supporting images where available; text-led where not.
- **Animation:** Standard staggered reveal.
- **Video:** None required.
- **Interaction:** None beyond standard scroll/links.
- **CTA:** Outbound links where relevant (e.g. a venue's own site), opening in a new tab.
- **Mobile behaviour:** Single column list.
- **Desktop behaviour:** Grouped multi-column layout.

## Gallery

### 24. Category Filter
- **Purpose:** Let a visitor navigate the photo library by space type.
- **Headline:** "Gallery."
- **Content:** Filter controls (Rooms/Gardens/Dining/Amenities/Exterior).
- **Images:** N/A (controls only).
- **Animation:** Grid re-flows with a short cross-fade on filter change.
- **Video:** None.
- **Interaction:** Filter buttons, keyboard-operable, current filter clearly indicated (not colour-alone, per accessibility).
- **CTA:** None.
- **Mobile behaviour:** Horizontally scrollable filter chips.
- **Desktop behaviour:** Inline filter row.

### 25. Image Grid + Lightbox
- **Purpose:** Present the full approved library.
- **Headline:** None.
- **Content:** Grid of images from Supabase `media`.
- **Images:** The full approved library, optimised per `08_IMAGE_OPTIMIZATION_PLAN.md`.
- **Animation:** Staggered fade-in as images load; lightbox open/close cross-fade.
- **Video:** N/A.
- **Interaction:** Click/tap to open lightbox; the signature ring cursor active on the grid itself (desktop, non-touch only).
- **CTA:** None; a persistent "Check Rates" link may sit at the page's end.
- **Mobile behaviour:** 2-column grid, tap opens full-screen lightbox with swipe navigation.
- **Desktop behaviour:** 3–4 column grid, lightbox with arrow-key navigation.

## Reviews

### 26. Rating Summary
- **Purpose:** Establish credibility at a glance.
- **Headline:** The aggregate rating and review count.
- **Content:** A short summary line, the cached TripAdvisor snapshot.
- **Images:** None required.
- **Animation:** Simple fade-in.
- **Video:** None.
- **Interaction:** Link out to the TripAdvisor listing itself.
- **CTA:** None.
- **Mobile behaviour:** Stacked, centred.
- **Desktop behaviour:** Inline summary bar.

### 27. Testimonial List
- **Purpose:** Let guests speak in their own words at length.
- **Headline:** None.
- **Content:** Full testimonial list from Supabase `testimonials`.
- **Images:** Guest photos only where consented.
- **Animation:** Staggered reveal as the list loads/scrolls.
- **Video:** None.
- **Interaction:** Optional filter by guest type (Business, Family, Long Stay) if volume warrants it.
- **CTA:** "Check Rates" at the list's end.
- **Mobile behaviour:** Single column.
- **Desktop behaviour:** 2-column masonry or single column at a wider measure — engineering discretion within the grid system in `05_LAYOUT_SYSTEM.md`.

## Journal

### 28. Post Index
- **Purpose:** Surface the property's occasional long-form writing.
- **Headline:** "Journal."
- **Content:** A simple chronological list, title + date + short excerpt.
- **Images:** One per post if available.
- **Animation:** Standard staggered reveal.
- **Video:** None.
- **Interaction:** None beyond links.
- **CTA:** Each entry links to its own post.
- **Mobile behaviour:** Single column.
- **Desktop behaviour:** Single column at a comfortable reading measure, not a dense multi-column grid (this is a reading page, not a gallery).

### 29. Post Detail
- **Purpose:** Deliver one piece of writing well.
- **Headline:** The post's own title.
- **Content:** Full post body.
- **Images:** As embedded in the post content.
- **Animation:** None beyond standard page-level reveal.
- **Video:** None.
- **Interaction:** None.
- **CTA:** "Back to Journal" + a single Booking link at the post's end.
- **Mobile behaviour:** Single column, generous line length control.
- **Desktop behaviour:** Constrained reading-width column, not full-bleed.

## Contact

### 30. Contact Form
- **Purpose:** Provide a form that genuinely works, replacing the current false-success defect.
- **Headline:** "Get in Touch."
- **Content:** Name, email, message fields; a real success and a real error state, each visually and programmatically distinct.
- **Images:** None required.
- **Animation:** Minimal — a calm confirmation message, no spinner, per `06_MOTION_LANGUAGE.md` loading-behaviour rule.
- **Video:** None.
- **Interaction:** Standard form interaction; every field has a visible label and error message tied to it via `aria-describedby`.
- **CTA:** "Send Message."
- **Mobile behaviour:** Full-width stacked fields.
- **Desktop behaviour:** Form beside contact details/map.

### 31. Contact Details
- **Purpose:** Give every practical way to reach the property, including channels currently missing.
- **Headline:** None.
- **Content:** Address, phone, WhatsApp, email, a real embedded/linked map — directly fixing Discovery's "no address/map" finding.
- **Images:** None required.
- **Animation:** None.
- **Video:** None.
- **Interaction:** Tap-to-call and tap-to-WhatsApp on mobile.
- **CTA:** None beyond the contact channels themselves.
- **Mobile behaviour:** Stacked below the form.
- **Desktop behaviour:** Beside the form.

## Rates & Booking

### 32. Room & Date Selector
- **Purpose:** Let a guest specify exactly what they want to book.
- **Headline:** "Check Rates & Availability."
- **Content:** Room-type selector (pre-filled if arriving via a room detail page), date range picker, guest count.
- **Images:** None required in this section.
- **Animation:** Minimal; this is a functional section, not an atmospheric one.
- **Video:** None.
- **Interaction:** Fully keyboard-operable date picker, clear validation messaging.
- **CTA:** "See Rates."
- **Mobile behaviour:** Full-width stacked controls, native date input where it improves usability.
- **Desktop behaviour:** Inline horizontal control bar.

### 33. Live Rate Display
- **Purpose:** Show the actual, current rate — closing Discovery's single highest-priority defect (no rates shown anywhere on the current site).
- **Headline:** None — the rate itself is the content.
- **Content:** Rate breakdown (nightly rate, length of stay, any applicable long-stay adjustment), sourced live from Supabase `room_types`.
- **Images:** A small room thumbnail for confirmation context.
- **Animation:** None beyond a calm loading state while the rate is fetched.
- **Video:** None.
- **Interaction:** None beyond the CTA.
- **CTA:** "Continue to Payment."
- **Mobile behaviour:** Full width, rate figure large and unambiguous.
- **Desktop behaviour:** Beside or below the selector, same visual weight.

### 34. Pesapal Handoff
- **Purpose:** Complete the transaction via the property's existing, regionally correct payment processor.
- **Headline:** "Payment."
- **Content:** A clear explanation that payment completes via Pesapal, with exactly one, correctly labelled payment icon set (directly fixing the triplicated-icon defect Discovery found).
- **Images:** A single, correct set of payment method icons.
- **Animation:** A calm "confirming your stay" loading state, no spinner, per `06_MOTION_LANGUAGE.md`.
- **Video:** None.
- **Interaction:** Redirect or embedded flow per Pesapal's own integration model; must remain fully keyboard-operable and screen-reader-announced at every state change.
- **CTA:** "Pay Now" (Pesapal-branded per their integration requirements).
- **Mobile behaviour:** Full-width, no layout shift on redirect/return.
- **Desktop behaviour:** Centred within `container-content`.

### 35. Confirmation
- **Purpose:** Close the booking loop with genuine, verifiable success feedback — the opposite of the current site's static false-success message.
- **Headline:** "You're Booked."
- **Content:** Booking reference, room, dates, a link to add the stay to a calendar, and the WhatsApp contact for any changes.
- **Images:** Optional single warm image (could reuse the Departure still to connect the emotional loop even at booking).
- **Animation:** A single, calm fade-in — no celebratory animation, consistent with "luxury through subtlety."
- **Video:** None.
- **Interaction:** None beyond the calendar-add and contact links.
- **CTA:** "Add to Calendar" / "Contact Us."
- **Mobile behaviour:** Stacked, full width.
- **Desktop behaviour:** Centred, constrained width.

## FAQ Accordion (Embedded Component, Not a Standalone Section)

Per `02_SITE_MAP.md` Section 5, the FAQ accordion appears embedded at the base of Amenities (Section 18 above) and at the base of Rates & Booking, with content scoped to each page's own likely questions (practical/property questions on Amenities; payment, cancellation, and Pesapal-specific questions on Booking) rather than one undifferentiated FAQ list repeated twice.
