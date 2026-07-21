/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Fig Tree asset pipeline.
 *
 * The inherited public/images tree is roughly half mislabelled (the file called
 * "rooftop-dining-dusk" is the gym; "bathroom-styled" is the garden wall). Every
 * mapping below was set by eye against a contact sheet, not by trusting filenames.
 *
 * Source stays untouched in public/images. Output goes to public/media.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'public', 'images');
const OUT = path.join(__dirname, '..', 'public', 'media');

// from -> { to, subject, wb }
// wb: neutralise white balance via white-patch normalisation.
const CATALOGUE = [
  { from: 'hero/home-hero-interim.jpg',            to: 'facade-tree',            subject: 'The residence beneath the fig tree' },
  { from: 'gardens/garden-living-wall.jpg',        to: 'rooftop-sunset',         subject: 'Rooftop terrace at sunset' },
  { from: 'rooms/bathroom-styled.jpg',             to: 'garden-living-wall',     subject: 'Living wall and garden seating' },
  { from: 'gallery/garden-alternate-view.jpg',     to: 'garden-lounge',          subject: 'Garden lounge' },
  { from: 'amenities/pool-daylight.jpg',           to: 'pool-wide',              subject: 'Swimming pool, wide' },
  { from: 'amenities/gym-equipment.jpg',           to: 'pool-through-trees',     subject: 'Pool seen through the trees' },
  { from: 'amenities/outdoor-breakfast-tray.jpg',  to: 'breakfast-garden',       subject: 'Breakfast laid in the garden' },
  { from: 'dining/rooftop-dining-dusk.jpg',        to: 'gym',                    subject: 'Gym' },
  { from: 'dining/rooftop-dining-sunset.jpg',      to: 'living-balcony',         subject: 'Apartment living room and balcony' },
  { from: 'gardens/garden-rattan-seating.jpg',     to: 'living-desk',            subject: 'Apartment living room with desk' },
  { from: 'amenities/lounge-seating.jpg',          to: 'lounge-dim',             subject: 'Interior lounge, low light' },
  // These two carry the same warm cast as the AVIF batch (B/G 0.75 and 0.63).
  // The kitchen is genuinely warm — wood units, sunflowers — but sitting beside
  // the corrected bedrooms in the same row it read as a different building.
  { from: 'rooms/kitchenette-counter.jpg',         to: 'kitchenette-bar',        subject: 'Kitchenette with breakfast bar', wb: true },
  { from: 'rooms/kitchenette-breakfast-bar.jpg',   to: 'kitchen-detail',         subject: 'Kitchen counter detail', wb: true },
  { from: 'brand/logo-temporary.jpg',              to: 'logo-sign',              subject: 'Fig Tree signboard' },

  // AVIF set — measured B/G 0.62-0.81, a consistent yellow-green cast.
  { from: 'gallery/common-area-interior.avif',     to: 'staff-portrait',         subject: 'Fig Tree team member', wb: true },
  { from: 'rooms/bedroom-arched-headboard-1.avif', to: 'bedroom-arch-palm',      subject: 'Bedroom, arched palm headboard', wb: true },
  { from: 'rooms/bedroom-wide-view.avif',          to: 'bedroom-white-arch',     subject: 'Bedroom, white arched headboard', wb: true },
  { from: 'rooms/kitchenette-styled.avif',         to: 'bedroom-arch-green',     subject: 'Bedroom, green bedspread', wb: true },
  { from: 'our-story/staff-member-portrait.avif',  to: 'bedroom-blue',           subject: 'Bedroom, blue cushion', wb: true },
  { from: 'rooms/bedroom-arched-headboard-2.avif', to: 'kitchenette-full',       subject: 'Kitchenette, full view', wb: true },
  { from: 'amenities/living-room-styled.avif',     to: 'living-cream',           subject: 'Living room, cream sofas', wb: true },
  { from: 'gallery/interior-detail.avif',          to: 'living-cream-desk',      subject: 'Living room with writing desk', wb: true },

  // our-story/building-facade-daylight.jpg is a byte-identical duplicate of the
  // hero and is deliberately not carried across.
];

/**
 * Per-channel gamma white balance.
 *
 * A flat gain is the wrong instrument here. Measured on this batch, the
 * highlights are already near-neutral (bedroom-arch-palm: 195/209/189) while
 * the midtones are badly blue-deficient (152/161/117). Blue is crushed by a
 * curve, not shifted by an offset, so gain either does nothing to the mids or
 * blows the highlights out reaching them. A per-channel gamma pivots the
 * midtones while leaving 0 and 255 pinned.
 *
 * Reference is each channel's median. The target holds a deliberate 0.94 on
 * blue: these are cream-walled rooms with wood floors and they should read
 * faintly warm, not laboratory-neutral.
 */
const WARMTH = { r: 1.0, g: 1.0, b: 0.94 };
const DAMP = 0.8; // pull back toward the original; a full correction reads clinical

function median(hist, total) {
  let acc = 0;
  for (let v = 0; v < 256; v++) {
    acc += hist[v];
    if (acc >= total / 2) return v;
  }
  return 128;
}

async function gammaFactors(file) {
  const { data, info } = await sharp(file).resize(400, null, { fit: 'inside' }).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  const hists = [new Array(256).fill(0), new Array(256).fill(0), new Array(256).fill(0)];
  let n = 0;
  for (let i = 0; i < data.length; i += ch) {
    hists[0][data[i]]++; hists[1][data[i + 1]]++; hists[2][data[i + 2]]++;
    n++;
  }
  const med = hists.map((h) => median(h, n));
  const ref = Math.max(...med);
  const targets = [ref * WARMTH.r, ref * WARMTH.g, ref * WARMTH.b];

  return med.map((m, i) => {
    if (m <= 2 || m >= 253) return 1;
    const inN = m / 255;
    const outN = Math.min(0.99, Math.max(0.01, targets[i] / 255));
    // out = in^(1/gamma)  =>  1/gamma = ln(out)/ln(in)
    let inv = Math.log(outN) / Math.log(inN);
    inv = 1 + (inv - 1) * DAMP;
    return 1 / Math.max(0.4, Math.min(2.5, inv));
  });
}

/** Apply a per-channel gamma through a LUT. */
async function applyGamma(buf, gammas) {
  const luts = gammas.map((g) => {
    const t = new Uint8Array(256);
    for (let v = 0; v < 256; v++) t[v] = Math.round(255 * Math.pow(v / 255, 1 / g));
    return t;
  });
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    data[i] = luts[0][data[i]];
    data[i + 1] = luts[1][data[i + 1]];
    data[i + 2] = luts[2][data[i + 2]];
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const manifest = [];
  for (const item of CATALOGUE) {
    const src = path.join(SRC, item.from);
    if (!fs.existsSync(src)) { console.warn('MISSING', item.from); continue; }

    const meta = await sharp(src).metadata();
    const beforeStats = await sharp(src).stats();
    let note = '';
    let buf = await sharp(src).toBuffer();

    if (item.wb) {
      const gammas = await gammaFactors(src);
      buf = await applyGamma(buf, gammas);
      note = `gamma r${gammas[0].toFixed(2)} g${gammas[1].toFixed(2)} b${gammas[2].toFixed(2)}  B/G ${(beforeStats.channels[2].mean / beforeStats.channels[1].mean).toFixed(3)} ->`;
    }
    await sharp(buf).webp({ quality: 90, effort: 6 }).toFile(path.join(OUT, `${item.to}.webp`));
    await sharp(buf).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(OUT, `${item.to}.jpg`));

    const blur = await sharp(buf).resize(16, null, { fit: 'inside' }).webp({ quality: 30 }).toBuffer();
    const after = await sharp(buf).stats();

    manifest.push({
      key: item.to,
      subject: item.subject,
      width: meta.width,
      height: meta.height,
      blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
      bg: +(after.channels[2].mean / after.channels[1].mean).toFixed(3),
    });
    console.log(`${item.to.padEnd(22)} ${meta.width}x${meta.height}  B/G ${(after.channels[2].mean / after.channels[1].mean).toFixed(3)}  ${note}`);
  }

  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\n${manifest.length} images -> public/media`);
}

main();
