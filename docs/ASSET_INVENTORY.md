# Fig Tree Residences — Asset Inventory
### Phase 1A: Discovery & Asset Intelligence

Every file inside the connected project folder was opened and inspected. This document catalogues what exists, in what format, at what resolution, and where it most likely originated. Counts below were produced by manual visual review rather than automated metadata extraction, so category totals are presented as close approximations rather than a guaranteed exact index; file names, formats, and pixel dimensions are exact, taken directly from the file system.

## 1. Folder Structure as Found

The project root contains 33 JPEGs, 8 AVIF files, and six subfolders. Five of those subfolders — `animations`, `assets/brochure`, `assets/logo`, `assets/original`, `assets/references`, `assets/website`, `deliverables`, `design`, `docs`, and `website` — are empty. Every actual image asset sits loose in the project root rather than inside the folder structure that has been prepared for it. This is the first, simplest recommendation to come out of this audit: the existing folder scaffolding should be populated as part of the next phase rather than left as an empty shell.

## 2. Deduplication

Four pairs of files are byte-for-byte identical, confirmed by checksum:

| Original | Duplicate | Status |
|---|---|---|
| `159693119.jpg` | `159693119 (1).jpg` | Identical, safe to delete one copy |
| `159693132.jpg` | `159693132 (1).jpg` | Identical, safe to delete one copy |
| `159693176.jpg` | `159693176 (1).jpg` | Identical, safe to delete one copy |
| `159709240.jpg` | `159709240 (1).jpg` | Identical, safe to delete one copy |

After removing these duplicates, the JPEG set reduces from 33 files to 29 unique images (23 numbered web-sourced photos, 5 brochure photographs, and 1 logo photograph).

## 3. The Numbered Web-Sourced Photographs (23 unique JPEGs)

These files carry short numeric filenames (for example `159693066.jpg`, `195248625.jpg`) with no descriptive naming, no EXIF camera data, and no GPS data — consistent with images that were downloaded from a website's content-delivery network rather than exported from a camera. All are compressed to a maximum dimension of 1024 pixels, which is standard for web display but is not sufficient resolution for large-format print, hero banners on a modern high-density display, or any luxury print collateral. File sizes range from roughly 49 KB to 189 KB. By subject, this set breaks down approximately as follows:

| Subject | Approx. count | Representative files | Resolution | Notes |
|---|---|---|---|---|
| Pool and exterior building (daylight) | 4 | `159693066`, `159693109`, `159709993`, `195248625` | ~1024×683 | Several near-duplicate angles of the same pool; no single hero-quality exterior shot |
| Rooftop restaurant / bar (dusk & sunset) | 2 | `159693127`, `159693132` | ~1024×683 | Genuinely atmospheric — golden-hour and string-light shots are the strongest images in this set |
| Building facade (day, no pool in frame) | 1 | `159693098` | 1024×678 | Clean shot of the teal building against mature trees |
| Bedroom | 1 | `159693137` | 1024×683 | Older-style room with framed lighthouse photography; does not match the newer arched-headboard rooms found in the AVIF set (see Photo Audit) |
| Living / lounge areas | 4 | `159693146`, `159693170`, `159695946`, `159709240` | ~1024×683–768 | Heavy repetition — a sailboat/nautical painting recurs across at least three separate shots, suggesting the same room photographed from different angles rather than four distinct spaces |
| Garden and outdoor lounge seating | 3 | `159693142`, `159693163`, `228320058` | ~1024×683–649 | Includes a green living wall feature and rattan garden furniture |
| Kitchen | 3 | `159693073`, `159695695`, `159709085` | ~1024×683 | All close-range, functional shots (sink, microwave, breakfast bar) rather than styled hero images |
| Bathroom | 2 | `159693155`, `159709650` | 1024×683 | Styled with plants and folded towels; competent but not distinctive |
| Outdoor breakfast / dining tray | 1 | `159693081` | 1024×610 | Strong styling — fruit, coffee, juice on a balcony table with garden backdrop |
| Gym | 1 | `159693119` | 1024×683 | Functional equipment shot, indoor gym |
| Reception / lobby / office | 2 | `159693176`, `195248625` | 1024×744 / 1024×683 | Both frames include two framed portraits of Tanzanian public figures on the wall — a detail worth a deliberate brand decision rather than an accidental holdover (see Brand Intelligence) |

## 4. The Brochure Photographs (5 JPEGs, `IMG_4611.jpg` through `IMG_4615.jpg`)

These are the only record of the property's printed brochure. They are not scans or a PDF; they are five photographs, taken on an iPhone 15 Plus on 16 July 2026, of a physical booklet lying on a desk. Embedded EXIF GPS data places the capture location at approximately 6.82°S, 39.27°E — the Msasani Peninsula in Dar es Salaam, consistent with the property's own address. The photographs are high resolution (2268×4032, 1.6–2.2 MB each) but were shot at an angle, with visible desk clutter, a laptop, a stress-ball, and a competitor's branded mousepad (Serena Hotels) in frame — see `COMPETITOR_NOTES.md`. They capture, in order: the brochure cover and opening quote; an amenities page; a location page with an embedded map; a room-features page; and the back cover with full contact details. Because no digital brochure file exists, every word of marketing copy in the printed piece had to be transcribed by hand from these photographs; that transcription is recorded in full in `CONTENT_DATABASE.md`.

## 5. The Logo File

`FIG TREE LOGO.jpg` (858×1326, 225 KB) is not a vector logo or a transparent PNG. It is a photograph of a physical painted sign — the logo mounted on a teal-painted wall — shot straight-on and cropped tightly. It is a clean, usable reference for the mark's proportions and colour, but there is no vector master file (AI, EPS, SVG) or even a high-resolution PNG-with-transparency anywhere in the project. Any redesign work, print collateral, or favicon/app-icon production will need the logo redrawn or professionally re-vectorised from this photograph before it can be used cleanly at other sizes or on other backgrounds.

## 6. The AVIF Files (8 files)

Eight images are stored in the modern AVIF format with filenames prefixed `b07255_`, which is the internal media-hash naming convention used by Wix's content-delivery network. Cross-referencing these hashes against the live site's Photo Gallery page confirms that at least six of the eight are the same images currently published on figtreeresidences.com; the remaining two likely serve other pages not directly checked. These are the newest and highest-quality photographs in the project, at roughly 1054×703 with better composition and styling than the numbered JPEG set — including a striking arched, palm-motif carved headboard used in at least two bedrooms, a well-composed living room, a kitchenette, and one photograph of a smiling staff member in a Fig Tree–branded uniform, which is the only human presence anywhere in the asset library. Their one significant flaw — a strong yellow-green colour cast affecting most of the interior shots — is detailed in `PHOTO_AUDIT.md`.

## 7. What Is Missing

No floor plans. No drone or aerial photography as a standalone file (a drone still appears only as a compressed banner image on the live website, sourced from a file named `DJI_20250131080928_0028_D_K15DRN`, which is itself a strong asset but is not present in this project folder at full resolution). No video of any kind. No exterior night photography. No signage or street-frontage photography beyond the single close-cropped logo shot. No imagery of the security features the brochure specifically markets (electrified fence, camera monitoring, coded access). No wide, styled hero shot that could anchor a homepage on a modern display. No brand style guide, font specimen, or colour-value reference document of any kind.
