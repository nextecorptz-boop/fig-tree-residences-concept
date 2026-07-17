# Fig Tree Residences — Performance Plan
### Phase 4: Master Build Specification — v1.0

This document gives full detail behind the performance budget summarised in `01_MASTER_BUILD_SPEC.md`, and states exactly how each target is achieved and verified, not just what the target number is.

## 1. Lighthouse Target

95+ Performance score on mobile, for every page in `02_SITE_MAP.md`, measured in an incognito/throttled run (Lighthouse's own "Mobile" preset: simulated 4G, mid-tier device CPU throttling) rather than an unrepresentative desktop/unthrottled run. Booking and Gallery are flagged as the two pages most at risk of missing this target (Booking due to the Pesapal handoff's third-party script weight; Gallery due to image volume) and receive explicit mitigation below.

## 2. Core Web Vitals

| Metric | Target | Primary levers |
|---|---|---|
| LCP ≤ 2.5s (throttled 4G) | Every page | Class 1 hero images use `priority`/`fetchpriority="high"` (`08_IMAGE_OPTIMIZATION_PLAN.md`); no render-blocking web font swap (see Section 4); server-rendered HTML for above-the-fold content, no client-side-only hero render |
| CLS ≤ 0.1 | Every page | Explicit `width`/`height`/`aspect-ratio` on every image and embed (map, Pesapal iframe); no ad-style layout insertion; font loading uses `font-display: optional` or matched fallback metrics to avoid reflow on web-font load |
| INP ≤ 200ms | Every page, especially Booking | No long synchronous tasks on the main thread during the Booking flow's rate calculation; heavy client logic (date-range validation, rate computation) either runs server-side or is chunked; Framer Motion animations use GPU-friendly transform/opacity properties only, never layout-triggering properties |

## 3. Bundle Budget

Initial JS payload ≤170KB gzipped per route, enforced via: route-level code splitting (Next.js App Router's default per-route chunking), dynamic `import()` for anything not needed for first paint (the `Lightbox`, `LocationMap`'s underlying map library, and the Pesapal SDK all load on-demand rather than in the initial bundle), and a CI budget check (see Section 6) that fails the build if a route's first-load JS exceeds budget rather than catching it after deploy.

GSAP and its ScrollTrigger plugin — used only on Gardens, Restaurant, and Location per `06_ANIMATION_MAP.md` — are loaded via dynamic import scoped to those specific components, not included in the global bundle, since most routes never use GSAP at all.

## 4. Font Loading

Fraunces and Inter (both Google Fonts, per `03_DESIGN_TOKENS.md`) are self-hosted via `next/font` rather than a runtime Google Fonts `<link>`, eliminating a render-blocking third-party request and giving automatic font-display and fallback-metric matching to prevent layout shift when the web font swaps in.

## 5. Video Optimization

Per `07_HIGGSFIELD_SHOTLIST.md` and `10_HIGGSFIELD_PREP.md`, video is used sparingly (Gardens, Restaurant primarily) and every instance follows: served muted, autoplay only via the `muted` + `playsinline` attributes (never with audio autoplay), disabled entirely on mobile/cellular in favour of the poster-image fallback (per `04_SECTION_BLUEPRINT.md`), served in a modern codec (H.265/AV1 where supported, H.264 fallback), and never blocking first paint — video is always a progressive enhancement loaded after the poster image is already visible.

## 6. Third-Party Script Budget

The Pesapal integration script is the one unavoidable third-party dependency on the Booking page and is loaded only on that route (never globally), deferred until the user reaches the payment step rather than on initial page load, and measured explicitly in Lighthouse runs during QA so it cannot silently regress the Booking page's score without being caught.

## 7. Caching and Revalidation

Static/ISR pages (per the rendering strategy table in `03_PAGE_ARCHITECTURE.md`) are served from Vercel's edge cache; the Supabase-backed pages (Rooms, Gallery, Journal, Reviews) use ISR revalidation windows tuned per content volatility (rates/availability shortest, Journal/Gallery longest) so most requests are served from cache rather than hitting the database on every visit.

## 8. Verification Method

Performance is checked at three points, not assumed from the plan alone: automated Lighthouse CI runs on every pull request against a fixed set of representative pages (Home, a Room detail page, Gallery, Booking); a manual throttled-4G pass on a real mid-tier Android device before each milestone sign-off in `13_IMPLEMENTATION_ROADMAP.md`; and a final full-site Lighthouse sweep as the first item in `15_QA_CHECKLIST.md` before launch.
