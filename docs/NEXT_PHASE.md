# Fig Tree Residences — Next Phase
### Phase 1A: Discovery & Asset Intelligence — Closing Recommendations

This document sets out what should happen between this discovery phase and the start of any visual design work. It is written on the assumption that design should not begin until the open questions below have real answers, not assumptions.

## 1. Questions Only the Client Can Answer

This audit was produced entirely from files and public web sources, with no interview or stakeholder input. Before Phase 1B (visual design) begins, the following need direct answers from whoever owns or manages Fig Tree Residences and from the Nextec Corp team leading the redesign:

- Which domain — figtreeresidences.com or figtree.co.tz — is meant to be the permanent public address going forward, and who currently controls the registration and DNS for each?
- Is the current Wix platform being kept, or is this redesign expected to move to a new stack (the project's own tooling suggests Next.js/Supabase/Stripe as the likely target — that decision has budget, timeline, and integration consequences that should be confirmed explicitly rather than assumed)?
- What is the actual guest profile the redesign should target — short-stay leisure and business travellers, long-stay expatriate residents, or a deliberate mix — given that the property's own recent content (the long-stay blog post) suggests a possible shift in emphasis?
- Is there a redesign budget and timeline already set, and does it include new photography, or is the project expected to work with the existing library?
- Who is "Hellen," whose name and phone number are handwritten on the brochure copy supplied for this audit — is she the correct day-to-day contact for content and asset requests going forward?
- What is the intended relationship between the website and the OTA listings (TripAdvisor, Booking.com, etc.) — should the redesign include a push to correct the "hotel" categorisation on those channels, or is that explicitly out of scope?
- Are there existing brand guidelines, a font license, or a vector logo file that exist outside this project folder and simply were not supplied?

## 2. Research That Still Needs Doing

Two pieces of research were identified in this phase but not completed, and should be scoped as discrete next-phase tasks rather than folded silently into design work: a live, interactive audit of the current website using an actual browser (to confirm whether the FAQ accordion and contact form are functioning, and to check mobile rendering, since this phase's review was limited to fetched page text), and a focused competitive audit of the four named neighbourhood and channel competitors — Sea Cliff, Best Western Coral Beach, DoubleTree by Hilton Dar es Salaam, and Serena Hotels — covering their own websites, pricing transparency, and photography standards.

## 3. Photography Decisions to Make Before Any Shoot Is Commissioned

If new photography is approved, it should be scoped, not simply commissioned generically: a shot list should be built directly from the gaps identified in `PHOTO_AUDIT.md` — one hero-quality exterior/aerial image at full resolution, a representative image of every distinct room type, corrected or reshot versions of the eight colour-cast-affected interiors, genuine staff and guest-experience photography, and documentation of the security features the brochure already markets but never shows. Whether the existing colour-cast AVIF set can be corrected in post-production or needs to be reshot outright is itself a decision that should be made by whoever handles the redesign's asset production, informed by the specific images flagged in this audit.

## 4. Content Work That Can Start Immediately, Independent of Design

Several fixes identified in this phase do not require a redesign at all and could be actioned on the current Wix site immediately, at low cost, while the larger redesign is scoped: publishing real room rates or a deliberate "rates on request" statement, correcting the mislabeled social icons and the triplicated payment button, fixing the contact form's default success message, removing the "Www.figtree.co.tz" fragment from page titles, correcting the Cicero misattribution and the "Accomodation"/"aray" typos, and adding a WhatsApp contact option. None of these require the redesign to be finished first, and fixing them now would remove several of the trust-undermining issues flagged in `LUXURY_OPPORTUNITIES.md` well before any new site exists.

## 5. Housekeeping for This Project Folder

The folder structure already prepared for this project (`assets/brochure`, `assets/logo`, `assets/original`, `assets/references`, `assets/website`) is currently empty while every actual file sits loose in the project root. Before design work begins, the thirty-seven assets catalogued in `ASSET_INVENTORY.md` should be sorted into that structure, the four confirmed duplicate files should be removed, and a single authoritative brochure PDF (rather than five desk photographs) should be requested from whoever holds the original print-ready file, if one exists.

## 6. Suggested Gate Before Phase 1B Begins

This discovery phase should be treated as complete once the client questions in Section 1 have been answered and the two research tasks in Section 2 have either been completed or explicitly deferred. Starting visual design work before the domain question and the platform-migration question are resolved risks producing design decisions that have to be unwound later.
