# Fig Tree Residences — Photo Usage Report
### Phase 2: Premium Visual Experience — Asset Reconciliation

This supersedes the *categorisation* in `PHOTO_AUDIT.md` and `ASSET_INVENTORY.md` (Phase 1A), which were produced without opening every file and got a meaningful number of subjects wrong. Every claim below was checked by opening the actual photograph. It does not replace those documents' resolution and colour-cast findings, which are correct and still hold.

## 1. Corrections to the Phase 1A subject table

Nine files were catalogued under the wrong subject in Phase 1A, and the same wrong labels were carried into the original `site/public/images/` folder names. `site/scripts/build-assets.js` (an earlier pass) had already caught and fixed six of these; this phase verified all nine directly and found three more.

| File | Old label (wrong) | Actual subject (verified) |
|---|---|---|
| `159693127.jpg` | Rooftop restaurant, dusk | **Gym** — full equipment room |
| `159693132.jpg` | Rooftop restaurant, sunset | **Living room**, balcony, sailboat painting |
| `159693119.jpg` | Gym equipment | **Pool / building exterior**, second angle |
| `159693155.jpg` | Bathroom, styled | **Garden living wall** + rattan seating |
| `159693142.jpg` | Garden, living wall | **Rooftop terrace, golden hour** — the strongest dusk shot in the library |
| `159693146.jpg` | (unlisted / merged with 137) | **Classic Residence bedroom**, framed lighthouse print |
| `159693137.jpg` | Bedroom, older-style | **Rooftop restaurant at dusk, with guests seated** — string lights, the single best dining photo found |
| `159693109.jpg` | Pool / exterior | **Rooftop bar detail** — wine service, orchids |
| `195248625.jpg` | Pool / exterior | **Reception**, lounge seating |

`bedroom-arched-headboard-2.avif` (old filename) and `kitchenette-styled.avif` (old filename) were also swapped — the first is the kitchenette, the second is a bedroom. `our-story/staff-member-portrait.avif` is not a portrait; it's a bedroom. The genuine staff portrait was filed as `gallery/common-area-interior.avif`. All corrected in `public/media/manifest.json`.

## 2. Newly integrated photographs (previously unused)

Fifteen real photographs existed in the project root but were never wired into any page. All are now in `public/media/` with corrected names:

| Key | Subject | Where it's used |
|---|---|---|
| `rooftop-dusk-guests` | Rooftop restaurant, dusk, guests seated, string lights | Recommended alt/secondary Dining image (see §4) |
| `rooftop-golden-hour` | Rooftop terrace, golden hour, tables set | Recommended alt Dining image |
| `dining-bar-detail` | Bar counter, wine service, orchids | Available for Dining gallery / Higgsfield focus-pull |
| `reception-desk`, `reception-lounge`, `reception-detail` | Reception, three angles | New Reception section |
| `bathroom-full-view` | Bathroom, full room | Room galleries (both room types) |
| `bedroom-classic-attic` | Top-floor bedroom, sloped ceiling | Room gallery: Classic Residence |
| `bedroom-classic-lighthouse` | Classic Residence bedroom | Room hero + gallery: Classic Residence |
| `garden-lounge-bench` | Garden bench, green cushions | Available for Gardens gallery |
| `pool-garden-angle`, `pool-exterior-1`, `pool-exterior-2` | Pool, three angles | Available for Pool gallery expansion |
| `living-room-alt-2`, `living-room-alt-3` | Living room, two further angles | Available for Living Areas gallery |

## 3. Colour correction

The eight AVIF files and two kitchen JPEGs carry a yellow-green cast (documented in `PHOTO_AUDIT.md`). `scripts/build-assets.js`'s per-channel gamma correction was re-implemented in Python (the project's `sharp` binary is broken in this environment) and re-run across the full, corrected catalogue. Every `public/media/*.jpg` / `*.webp` pair is now colour-corrected. **This is a real fix, not an upscale** — no pixel dimension changed, no detail was invented; only white balance shifted. `bedroom-blue` still reads slightly warm after correction (the source cast on that file was the most severe); a professional reshoot remains the correct long-term fix, per the original audit.

## 4. Resolution — what this phase did and did not do

No image in the library exceeds ~1330 px on its longest edge (brochure photos of paper excepted). Nothing was AI-upscaled in this pass. Reasoning: super-resolution on interior photography risks inventing plausible-looking texture and edges that were never in the original photograph — precisely what this phase's brief prohibits ("do not invent architecture," "the image is the truth"). If you want AI upscaling applied anyway as a stopgap before a real shoot, say so explicitly and specify which images (hero candidates first); it should be scoped and reviewed image-by-image, not run in bulk.

## 5. Still missing (no photography exists)

- **Business/conference room** — brochure-listed amenity, zero photographs anywhere in the project. The new Business Facilities section is text-only rather than paired with a stand-in image of some other room.
- **Security features** (coded access, perimeter fence, cameras) — brochure-marketed, unphotographed.
- **Night exterior**, **aerial/drone at full resolution**, **floor plans** — all absent.
- Four distinct "unit types" (Studio / Executive Studio / One Bedroom / Two Bedroom) were requested for this phase but do not exist at this property — every discovery document and the brochure itself describe ~24 uniform 43 m² studio apartments in two interior finishes. The room pages built in this phase reflect that (Garden View Studio, Classic Residence), each now with a fuller, accurate gallery instead of an invented third or fourth category.

## 6. Recommended hero images (by section, from confirmed-authentic photography only)

| Section | Recommended hero |
|---|---|
| Home | `facade-tree` (unchanged) |
| Garden View Studio | `bedroom-arch-palm` |
| Classic Residence | `bedroom-classic-lighthouse` |
| Gym | `gym` |
| Pool | `pool-wide` |
| Gardens | `garden-living-wall` |
| Dining | `rooftop-sunset` (current) or `rooftop-dusk-guests` if a warmer, people-present image is preferred — a design call, not a factual one |
| Reception | `reception-desk` |
