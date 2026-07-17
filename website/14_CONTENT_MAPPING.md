# Fig Tree Residences — Content Mapping
### Phase 4: Master Build Specification — v1.0

This document maps every piece of content recovered in `CONTENT_DATABASE.md` (Phase 1) into a specific page, section, and CMS field on the new build, and flags which pieces can be reused near-verbatim versus which must be rewritten per `09_COPY_DIRECTION.md`'s voice principles before they touch the new site. Nothing in the current copy ships forward unexamined — several passages carry the exact typos and vague superlatives Copy Direction specifically instructs against.

## 1. Brochure Content

| Source content | Destination | Treatment |
|---|---|---|
| Cover Cicero quotation | `10_HIGGSFIELD_PREP.md`/Our Story page, `type-quote` component, Section 10 in `04_SECTION_BLUEPRINT.md` | **Correct the misspelling** ("Tullius," not "Tulius") and use exactly once, per Copy Direction — do not repeat it in a footer or elsewhere as decorative filler |
| Amenities bullet list (pool, gym, BBQ, conference room, rooftop, shopping service, parking, secure code access, cameras/electric fence/response teams) | Amenities page, `AmenityGroup`/`AmenityCard` content field, Section 16 in `04_SECTION_BLUEPRINT.md` | **Rewrite each line** from a bare bullet into the "specificity beats template" register Design Language requires — e.g. security items are reframed as reassurance per Copy Direction and `08_ICONOGRAPHY.md` Section 4, not listed as a bare hardware checklist |
| Location header + distance list (200m Yacht Club, 800m–1km Slipway, 800m groceries, 1–2km schools, 500m Aga Khan/100m SALI, 1km Sea Cliff) | Location page narrative, Section 21 in `04_SECTION_BLUEPRINT.md`; also feeds Home's Location teaser (Section 6) and `LodgingBusiness`/`Place` schema in `10_SEO_PLAN.md` | **Reuse the verified distances directly** — these are exactly the kind of specific, checkable claim Copy Direction wants kept; only the surrounding sentence structure is rewritten for voice, not the facts themselves |
| Map landmark list (Yacht Club, Slipway Shopping Center, Best Western Coral Beach, Sea Cliff, Aga Khan, SALI, DIA, Epi d'Or, Marrybrown, Grill House, Akira Lounge, Shoppers Plaza Masaki, DoubleTree, The Slow Leopard, George and Dragon) | `LocationMap` component pins, Section 22; several entries also seed the Experiences page (Section 23) as "nearby dining/leisure" content | Reuse as map pin data directly; competitor properties (Best Western, Sea Cliff, DoubleTree) are plotted as geographic references only, never named in marketing copy, consistent with `COMPETITOR_NOTES.md` |
| Room features bullet list (43m², Queen + sofa beds, rain shower, desk/office chair, private balcony, WiFi, satellite TV, kitchenette, kettle/toaster/press, laundry) | Room detail pages, `RoomFeatureList` component, Section 13 | Reuse the factual specs directly per room type once real per-room-type data is confirmed with the client (the brochure describes what appears to be one room type — this must be confirmed against every actual room type sold, not assumed universal) |
| Back-cover contact block (address, both phone numbers, both emails, Facebook) | Contact page (Section 31), Footer, `LodgingBusiness` schema | Reuse verbatim — these are verified facts, not voice-dependent copy |
| Handwritten "0713095103 / Name: Hellen" annotation | **Not used anywhere on the site** | Per `NEXT_PHASE.md`'s open question, this is almost certainly a personal annotation on one physical brochure copy, not brand content — confirm with the client before treating it as a real alternate contact channel |

## 2. Live Website Copy

| Source content | Destination | Treatment |
|---|---|---|
| Site-wide meta description ("Accomodation long or short term...") | — | **Discard.** Replaced entirely by the per-page metadata patterns in `10_SEO_PLAN.md` Section 2, which also fixes the "Accomodation" misspelling |
| Home Rooms & Rates teaser ("fully stocked... soft relaxing ocean colours...") | Rooms Teaser section (Section 3) | **Rewrite** — "soft relaxing ocean colours" is exactly the vague, unspecific phrasing Copy Direction flags; replace with a specific differentiator per actual room type |
| Home Location teaser ("200 meters... aray of restaurants...") | Home Location Teaser (Section 6) | **Rewrite**, correcting "aray" to "array," and prefer the fuller, more specific distance set from the brochure over this shorter web version |
| Home Activities teaser (pool, gym, gardens, BBQ, rooftop sun-downer copy) | Amenities Teaser content feeding Section 16 and the Gardens/Dining teasers (Section 4, Section 17) | **Rewrite** — reusable factual core (pool, gym, gardens, rooftop), but the sentence structure is generic-hospitality voice and should be replaced per Copy Direction's before/after example |
| FAQ Amenities answer (the one populated FAQ category) | Seed content for the Amenities-page `FAQAccordion` (Section 18) | Reuse the factual content as a starting point, rewritten to match the new FAQ's specific-question format, and supplemented with the seven categories Discovery found empty |
| Rooms & Rates page copy ("unique, relaxing and comfortable boutique residence... home away from home...") | Our Story narrative (Section 8) and/or Rooms index intro | **Rewrite** — "home away from home" is a generic hospitality phrase Copy Direction would flag; the underlying claim (boutique, tropical garden setting, guest-exclusive premises) is legitimate and specific enough to keep once rewritten |
| Activities page copy ("you may never see another guest"... rooftop over the Indian Ocean) | Amenities/Gardens narrative | The "you may never see another guest" line is actually a strong, specific claim worth keeping (it supports the privacy pillar directly) — retain the idea, tighten the sentence |
| About Us copy ("happy, bright and friendly collection of professionals") | Our Story, Three Pillars section (Section 9) | **This is the line Photo Audit found unsupported by the actual asset library** (only one human photo existed against this claim). Keep the sentiment but do not publish it until the new commissioned staff photography from `07_HIGGSFIELD_SHOTLIST.md` Section 6 exists to back it up — publishing an aspirational claim the imagery still doesn't support repeats the exact credibility gap Discovery flagged |
| Contact page copy (long/short-term stay framing) | Contact page intro (Section 30) | Reuse the core message (flexible stay length), rewritten for voice; the contact block itself maps per Section 1 above |
| Footer copy (phone numbers, domain, address, email) | Footer component (Section 4 of `05_COMPONENT_TREE.md`) | Reuse verbatim once the canonical-domain decision from `01_MASTER_BUILD_SPEC.md` Section 8 is resolved — the current footer literally advertises "www.figtreeresidences.com," which must match whichever domain is actually chosen as canonical |

## 3. Blog / Journal Posts

| Source content | Destination | Treatment |
|---|---|---|
| "Quite the auspicious opening.." (30 Jul 2018) | Migrated into `journal_posts` as the first historical entry | Reuse as a historical artifact — this is the property's own founding-era voice and has genuine archival value; light copyedit only, no rewrite of its voice |
| "Benefits of Long-Term Stays in Serviced Apartments" (13 Oct 2025) | Migrated into `journal_posts` | Reuse, light copyedit; also cross-link from the new Long Stay page (Section 14), since this post's subject matter directly supports that page |
| Author attribution ("Fig Tree Residences," display name "teresa") | `journal_posts.author` field | Carry forward as-is unless the client wants a different author presentation going forward |

## 4. Facts That Require Client Confirmation Before Publishing (Not Assumed)

The two Facebook page references (`facebook.com/Fig-Tree-Residences-991957590976391` vs. `facebook.com/figtree.co.tz`) must be confirmed as one page or two before `SocialLinks` in the Footer links to either — publishing an unconfirmed guess here would repeat exactly the mislabelled-social-icon defect Discovery found on the live site, just with a different specific error. Similarly, the room-features list should be confirmed against every actual room type sold (the brochure appears to describe one room type only), and the exact current phone/email set should be reconfirmed as still live before this content mapping is treated as final, since the brochure and website were produced at different times and could have drifted.

## 5. What This Mapping Deliberately Leaves Open

No new marketing copy is invented wholesale in this document — every destination above is sourced from something Discovery actually found, rewritten for voice where needed, or explicitly flagged as needing client confirmation. Net-new content categories this project introduces (Experiences page entries, floor-plan captions, the Departure-moment closing copy) are seeded from the same verified location/room facts above but will need their own first-draft copy pass during the relevant implementation milestone in `13_IMPLEMENTATION_ROADMAP.md`, not retrofitted from source material that doesn't exist yet.
