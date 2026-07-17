# Fig Tree Residences — Site Map
### Phase 4: Master Build Specification — v1.0

This document reconciles the full page list this project needs with Design Language's own constraint that primary navigation never exceed six links and never use dropdown mega-menus (`04_COMPONENT_LIBRARY.md`, Navigation). The result is a small primary nav, a larger set of pages reachable contextually, and a complete URL routing table for engineers.

## 1. Primary Navigation (6 links, plus Home via the wordmark)

| Label | Route |
|---|---|
| Our Story | `/our-story` |
| Rooms | `/rooms` |
| Amenities | `/amenities` |
| Location | `/location` |
| Gallery | `/gallery` |
| Rates & Booking | `/booking` |

A persistent, small utility element (phone number and WhatsApp link) sits in the navigation bar itself, outside the six-link count, directly closing the "no WhatsApp contact anywhere" gap Discovery found on the current site.

## 2. Contextual Pages (reachable from within primary pages, not from the top nav)

| Label | Route | Reached from |
|---|---|---|
| Long Stay | `/rooms/long-stay` | A tab/filter within Rooms, plus a direct link from the Our Story page's long-stay narrative |
| Gardens | `/gardens` | Linked from Amenities and from Home |
| Dining | `/dining` | Linked from Amenities and from Home |
| Experiences | `/experiences` | Linked from Location and from Amenities |
| Reviews | `/reviews` | A homepage section, plus a standalone page linked from the footer |
| Journal | `/journal` | Footer link; also linked from Our Story |
| Contact | `/contact` | Footer link, plus the utility phone/WhatsApp element in every page's header |

This structure keeps the primary nav small and calm, per Design Language, while ensuring every page this project has identified as necessary (including the new pages this phase introduces — Long Stay, Gardens, Dining, and Experiences as dedicated destinations rather than folded-in paragraphs) is genuinely reachable within two clicks from anywhere on the site.

## 3. Full Route Table

| Route | Page | Primary content source |
|---|---|---|
| `/` | Home | Static/CMS hero + curated links to Our Story, Rooms, Location, Booking |
| `/our-story` | Our Story | CMS (brand narrative, 2018 opening, Cicero line) |
| `/rooms` | Rooms (index) | Supabase `room_types` table |
| `/rooms/[slug]` | Individual room type | Supabase `room_types` table, one row per slug |
| `/rooms/long-stay` | Long Stay | CMS narrative + Supabase `room_types` filtered for long-stay-eligible units |
| `/amenities` | Amenities | CMS (translated from the brochure's amenity list per Experience Strategy's Content Hierarchy) |
| `/gardens` | Gardens | CMS + media, mostly photography-led per Design Language |
| `/dining` | Dining | CMS + media, dusk-register page per Design Language |
| `/location` | Location | CMS (verified proximity facts) + custom-styled map component |
| `/experiences` | Experiences | CMS, local activity content — a new content category this project introduces |
| `/gallery` | Gallery | Supabase `media` table, categorised by space type |
| `/reviews` | Reviews | Supabase `testimonials` table + a live/periodically synced pull from the property's TripAdvisor listing |
| `/journal` | Journal (index) | Supabase `journal_posts` table |
| `/journal/[slug]` | Individual journal post | Supabase `journal_posts` table |
| `/contact` | Contact | Static form + Supabase `contact_submissions` table |
| `/booking` | Rates & Booking | Supabase `room_types` (rates) + Pesapal payment integration |

## 4. Footer Navigation

The footer repeats Our Story, Rooms, Amenities, Location, and Rates & Booking as text links (for SEO internal-linking value per `10_SEO_PLAN.md`), and adds the contextual pages not present in the primary nav: Gardens, Dining, Experiences, Reviews, Journal, and Contact — plus corrected, verified social links (Facebook, Instagram), directly fixing the mislabelled-icon defect Discovery found on the live site.

## 5. What Is Deliberately Not a Separate Page

FAQ content is not a standalone page in this site map; per Design Language's Component Library, it is an accordion component embedded at the bottom of the Amenities and Rates & Booking pages specifically (the two pages where practical questions are most likely to arise), rather than a thirteenth navigation destination. This keeps the FAQ content close to the questions it answers instead of isolated on its own page where it is easy to forget to finish, which is the exact failure state Discovery found on the current live site (seven of eight FAQ categories effectively empty).
