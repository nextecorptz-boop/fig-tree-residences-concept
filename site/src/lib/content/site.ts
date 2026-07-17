/**
 * Site-wide facts, verified against docs/CONTENT_DATABASE.md Section 4.
 * Domain is a placeholder pending the canonical-domain decision
 * (website/01_MASTER_BUILD_SPEC.md Section 8) — swap CANONICAL_DOMAIN
 * in one place when confirmed.
 */

export const CANONICAL_DOMAIN = "www.figtreeresidences.com";
export const SITE_URL = `https://${CANONICAL_DOMAIN}`;

export const siteConfig = {
  name: "Fig Tree Residences",
  tagline: "A garden residence on the Msasani Peninsula",
  legalName: "Fig Tree Residences",
  address: {
    street: "13 Yacht Club Road",
    area: "Msasani Peninsula, Masaki",
    city: "Dar es Salaam",
    country: "Tanzania",
    postal: "P.O. Box 1520, Dar es Salaam",
  },
  phone: {
    primary: "+255 713 326 000",
    secondary: "+255 762 326 000",
  },
  whatsapp: "+255713326000",
  email: {
    reservations: "reservations@figtree.co.tz",
    info: "info@figtree.co.tz",
  },
  social: {
    // Two candidate Facebook pages were found in Discovery and are not yet
    // confirmed as one page or two — per docs/CONTENT_DATABASE.md Section 4 (NOT_CONFIRMED).
    facebook: null as string | null,
    instagram: null as string | null,
  },
  geo: {
    // Approximate — Msasani Peninsula / Leopard Cove Bay. Confirm exact
    // coordinates before shipping LodgingBusiness schema.
    lat: -6.7461,
    lng: 39.2775,
  },
  cicero:
    "The pursuit, even of the best things, ought to be calm and tranquil.",
  ciceroAttribution: "Marcus Tullius Cicero",
} as const;

export const NAV_LINKS = [
  { label: "Our Story", href: "/our-story" },
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Location", href: "/location" },
  { label: "Gallery", href: "/gallery" },
  { label: "Rates & Booking", href: "/booking" },
] as const;

export const FOOTER_LINKS = [
  { label: "Our Story", href: "/our-story" },
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Location", href: "/location" },
  { label: "Rates & Booking", href: "/booking" },
  { label: "Gardens", href: "/gardens" },
  { label: "Dining", href: "/dining" },
  { label: "Experiences", href: "/experiences" },
  { label: "Reviews", href: "/reviews" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;
