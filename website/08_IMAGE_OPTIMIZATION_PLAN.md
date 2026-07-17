# Fig Tree Residences — Image Optimization Plan
### Phase 4: Master Build Specification — v1.0

Following the same logic as `06_ANIMATION_MAP.md`, this plan defines a small number of image classes by role, specifies Compression/WebP/AVIF/Responsive sizes/Lazy loading/Priority loading for each class, and then maps every image category from `07_HIGGSFIELD_SHOTLIST.md` onto a class. All classes are served through the Next.js Image pipeline defined in `01_MASTER_BUILD_SPEC.md`, backed by Supabase Storage/CDN as the source bucket.

## 1. Image Classes

### Class 1 — Hero / Full-Bleed
- **Used by:** Home Hero, Gardens full-bleed, Restaurant full-bleed.
- **Compression:** Source retained at highest quality in Storage; served quality ~80 (visually lossless at this content type, meaningfully smaller than 90+).
- **WebP:** Generated automatically as a fallback tier.
- **AVIF:** Primary format for supporting browsers (smallest payload, matches the source format already used for the newest photography).
- **Responsive sizes:** 640 / 828 / 1200 / 1920 / 2560px wide variants, `sizes="100vw"`.
- **Lazy loading:** Not lazy — this is always above the fold.
- **Priority loading:** `priority` / `fetchpriority="high"` set explicitly; this is the LCP candidate on every page it appears on, making its optimisation directly load-bearing for the `09_PERFORMANCE_PLAN.md` LCP budget.

### Class 2 — Section/Teaser Images
- **Used by:** Our Story teaser, Rooms teaser cards, Location teaser, Reviews strip imagery.
- **Compression:** Quality ~75.
- **WebP/AVIF:** Both generated; AVIF preferred where supported.
- **Responsive sizes:** 400 / 600 / 900 / 1200px, `sizes` matched to the card's actual rendered width per breakpoint (never serving a 1200px image into a 300px card).
- **Lazy loading:** Lazy, since these sit below the Hero on every page that has one.
- **Priority loading:** None, except the first teaser image on Home if it renders high enough to be the actual LCP element on a given viewport — confirmed via Lighthouse during QA (`15_QA_CHECKLIST.md`), not assumed.

### Class 3 — Room / Amenity Detail Images
- **Used by:** Room detail galleries, Amenity vignettes, Gardens/Dining supporting stills.
- **Compression:** Quality ~80 (accuracy matters more here than on atmospheric imagery, per Visual Direction's Rooms brief).
- **WebP/AVIF:** Both generated.
- **Responsive sizes:** 500 / 800 / 1100 / 1600px.
- **Lazy loading:** Lazy for every image beyond the first in a gallery; the first (default-shown) gallery image loads eagerly.
- **Priority loading:** Only the first image in a Room detail gallery, if that page's LCP element.

### Class 4 — Gallery Grid Thumbnails
- **Used by:** the `/gallery` page's `ImageGrid`.
- **Compression:** Quality ~70 for the grid thumbnail tier specifically (a deliberately smaller/lower-quality tier from the same source image, not a separate asset) — the full-quality version loads only inside the `Lightbox`.
- **WebP/AVIF:** Both.
- **Responsive sizes:** 300 / 450 / 600px for the grid; the Lightbox itself requests a separate 1200/1920px tier on open.
- **Lazy loading:** All grid thumbnails lazy-load except the first 6–8 above the fold, matched to actual viewport at build/runtime.
- **Priority loading:** None.

### Class 5 — Testimonial / Small Supporting Images
- **Used by:** Guest photos on Testimonials (where consented), small inline Journal images.
- **Compression:** Quality ~70.
- **WebP/AVIF:** Both.
- **Responsive sizes:** A single small tier (150 / 300px) is sufficient given the display size.
- **Lazy loading:** Always lazy.
- **Priority loading:** Never.

### Class 6 — Logo / Icon Assets
- **Used by:** Navigation logo, favicon, app icons, custom brand icons from `08_ICONOGRAPHY.md`.
- **Compression:** N/A in the photographic sense — these should ship as SVG (vector) once the logo is re-vectorised per `07_HIGGSFIELD_SHOTLIST.md` Section 5, not as a compressed raster.
- **WebP/AVIF:** Not applicable to SVG; a PNG fallback tier only for the favicon/app-icon sizes that require raster formats by platform convention.
- **Responsive sizes:** SVG scales natively; raster favicon/app-icon exports at the fixed sizes each platform requires (16/32/180/512px, etc.).
- **Lazy loading:** Never — this is always immediately visible in the navigation.
- **Priority loading:** Loaded as part of the initial layout shell, not deferred.

## 2. Asset Category Mapping

| Category (from `07_HIGGSFIELD_SHOTLIST.md`) | Class |
|---|---|
| Home Hero (new commissioned exterior) | Class 1 |
| Gardens / Restaurant full-bleed sections | Class 1 |
| Our Story / Rooms / Location teaser images on Home | Class 2 |
| Room type gallery images (existing AVIFs + new commissioned per-room shots) | Class 3 |
| Amenity vignettes (pool, gym, BBQ, breakfast tray) | Class 3 |
| Gardens/Dining supporting stills beyond the primary full-bleed shot | Class 3 |
| Full `/gallery` page grid | Class 4 |
| Testimonial guest photos | Class 5 |
| Journal inline images | Class 5 |
| Logo, favicon, app icons, custom iconography | Class 6 |

## 3. Format Fallback Chain

Every raster image (Classes 1–5) is requested through the `ImageWithFallback` primitive named in `05_COMPONENT_TREE.md`, which relies on the browser's own `<picture>`-equivalent negotiation via the Next.js Image component: AVIF first, WebP second, JPEG last. No image ships as a bare, unoptimised JPEG in production — this directly replaces the current site's practice of serving raw ~1024px JPEGs with no responsive variants at all, which Discovery's Photo Audit flagged as inadequate for a modern high-density display.

## 4. Placeholder Strategy (CLS Protection)

Every image of Class 1–4 renders with a low-quality blurred placeholder (Next.js `blurDataURL`, generated at build time from a tiny base64-encoded thumbnail) and a reserved, explicit `width`/`height` (or `aspect-ratio`) so no image ever causes layout shift on load — directly supporting the CLS ≤0.1 target in `09_PERFORMANCE_PLAN.md`. Class 5 and 6 images are small and fixed enough not to require a blur placeholder, but still reserve explicit dimensions.

## 5. Source Asset Housekeeping

Per Discovery's Asset Inventory finding that every image currently sits loose in the project root rather than in the prepared folder structure, all corrected/final source images should be organised into Supabase Storage buckets mirroring the categories in this plan (hero, rooms, amenities, gardens, dining, gallery, testimonials) before the build begins ingesting them — this is a five-minute housekeeping step that prevents the same "everything loose in one folder" disorganisation from simply migrating into the new system.
