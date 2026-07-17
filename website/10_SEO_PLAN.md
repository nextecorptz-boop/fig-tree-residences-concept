# Fig Tree Residences — SEO Plan
### Phase 4: Master Build Specification — v1.0

This plan fixes every SEO-relevant defect Discovery found on the live site and specifies the structured data, metadata, and internal-linking architecture the new build ships with.

## 1. The Domain Decision (Blocking)

As stated in `01_MASTER_BUILD_SPEC.md` Section 8, this plan assumes a single confirmed canonical domain before implementation begins. Every metadata and schema example below uses `https://www.figtreeresidences.com` as a placeholder; every literal instance must be replaced with the confirmed domain before launch, and the non-canonical domain must 301-redirect in full (every path, not just the homepage) to preserve any existing link equity and OTA-listing consistency.

## 2. Per-Page Metadata

| Page | Title tag pattern | Meta description pattern |
|---|---|---|
| Home | `Fig Tree Residences — Boutique Garden Apartments, Msasani Peninsula, Dar es Salaam` | One sentence naming the property type, setting, and its core promise (privacy, calm, garden setting) — specific, not superlative-stacked, per `09_COPY_DIRECTION.md` |
| Our Story | `Our Story — Fig Tree Residences` | The 2018 origin + the three pillars in one sentence |
| Rooms | `Rooms & Suites — Fig Tree Residences` | Names the actual room types available |
| Room detail | `[Room Type Name] — Fig Tree Residences` | The room's specific differentiator, not a generic description |
| Long Stay | `Long-Stay Apartments — Fig Tree Residences` | Targets long-stay/serviced-apartment search intent specifically |
| Amenities | `Amenities — Fig Tree Residences` | Lists the standout amenities (pool, gardens, rooftop dining) |
| Gardens | `The Gardens — Fig Tree Residences` | Evocative, still accurate |
| Dining | `Rooftop Dining — Fig Tree Residences` | Names the rooftop restaurant experience specifically |
| Location | `Location — Fig Tree Residences, Msasani Peninsula` | States verified proximity facts (Yacht Club, Slipway) directly in the description, since these are genuine differentiators worth surfacing in search snippets |
| Experiences | `Things to Do Near Fig Tree Residences` | Targets "things to do in Msasani/Dar es Salaam"–adjacent search intent |
| Gallery | `Photo Gallery — Fig Tree Residences` | Simple, accurate |
| Reviews | `Guest Reviews — Fig Tree Residences` | References the property's actual TripAdvisor standing |
| Journal | `Journal — Fig Tree Residences` | Simple |
| Contact | `Contact — Fig Tree Residences` | Includes the verified address/phone in the description |
| Booking | `Rates & Booking — Fig Tree Residences` | States that rates and availability are shown live, directly countering the previous site's missing-rates defect |

Every title tag is generated from a single template function, not hand-typed per page, specifically to prevent a recurrence of the literal "Www.figtree.co.tz" text-artifact defect Discovery found baked into the current site's titles.

## 3. Structured Data (Schema.org)

Every page carries base `LodgingBusiness` (a more specific subtype of `Hotel`/`LocalBusiness` appropriate to a serviced-apartment property) JSON-LD with: verified name, address, geo-coordinates, telephone, the corrected single canonical URL, price range, and amenity list. The Rooms pages additionally carry nested `Room`/`Offer` schema per room type once real rates are live. The Reviews page carries `AggregateRating` and individual `Review` schema sourced from the Supabase `testimonials` table (only for testimonials with explicit consent to be used publicly). The Location page carries a `GeoCoordinates` and `Place` reference matching the same address as the top-level `LodgingBusiness` entry, so there is exactly one consistent address across every schema instance on the site — Discovery's Website Analysis found no structured data at all on the current site, so this is a net-new capability, not a fix.

## 4. OpenGraph and Twitter Cards

Every page carries OpenGraph `og:title`, `og:description`, `og:image` (a correctly graded, purpose-cropped image per `08_IMAGE_OPTIMIZATION_PLAN.md`, never a raw uncropped photo), `og:type` (`website` site-wide, `article` for Journal posts), and `og:url` pointing to the canonical domain. Twitter Card metadata mirrors OpenGraph via `summary_large_image`, ensuring shared links on any platform render a correctly cropped, on-brand preview image rather than an arbitrary auto-selected one.

## 5. Image SEO

Every image ships with a specific, descriptive `alt` attribute (never a filename-derived default like "159693066") written to describe what the image actually shows, both for SEO image-search value and as the primary requirement of `11_ACCESSIBILITY_PLAN.md`. Image filenames themselves are renamed during the housekeeping step in `08_IMAGE_OPTIMIZATION_PLAN.md` Section 5 to descriptive slugs (e.g. `rooftop-dining-dusk.avif`) rather than shipped under their numeric or media-hash source names.

## 6. Internal Linking

Every page links to at least two others in a way that reflects genuine user intent, not a boilerplate footer dump alone: Room detail pages link to Booking (pre-filtered) and to Long Stay where applicable; Location links to Experiences; Our Story links to Long Stay and Journal; Amenities links to Gardens and Dining. This directly fixes Discovery's finding that Location, Rooms, and Rates & Booking do not meaningfully cross-link on the current site today.

## 7. Sitemap and Robots

An auto-generated `sitemap.xml` (via Next.js's built-in sitemap generation) covers every route in `02_SITE_MAP.md`'s full route table, regenerated on each deploy and whenever a new Journal post or Room type is added. `robots.txt` allows full crawling of all public pages and explicitly disallows any internal/preview routes (draft Journal posts, any staging subdomain).

## 8. Local SEO

A Google Business Profile claim/verification (if not already held by the client) should list the confirmed canonical domain, matching phone number, and matching address exactly as they appear in the site's `LodgingBusiness` schema — inconsistent NAP (name/address/phone) data across a Google Business Profile, OTA listings, and the site itself is a common, avoidable local-SEO defect worth explicitly checking during `15_QA_CHECKLIST.md`.
