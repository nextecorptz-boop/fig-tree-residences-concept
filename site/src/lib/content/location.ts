/**
 * Verified proximity facts, reused directly per website/14_CONTENT_MAPPING.md
 * ("these are exactly the kind of specific, checkable claim Copy Direction
 * wants kept"). Distances are sourced from docs/CONTENT_DATABASE.md Section 1.
 * Competitor properties are plotted as geographic references only, never
 * named in marketing copy, per docs/COMPETITOR_NOTES.md.
 */

export type ProximityFact = {
  label: string;
  distance: string;
};

export const proximityFacts: ProximityFact[] = [
  { label: "Dar es Salaam Yacht Club", distance: "200 metres" },
  { label: "Slipway Waterfront shops and restaurants", distance: "800m – 1km" },
  { label: "Convenience and grocery shops", distance: "800 metres" },
  { label: "International schools (DIA and IST Upper School)", distance: "1–2 km" },
  { label: "Aga Khan Clinic", distance: "500 metres" },
  { label: "SALI International Hospital & pharmacy", distance: "100 metres" },
  { label: "Sea Cliff Village and restaurants", distance: "1 km" },
];

export type MapPin = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: "landmark" | "dining" | "competitor-reference";
};

/**
 * Approximate coordinates around Msasani Peninsula / Leopard Cove Bay —
 * confirm exact pins with the client before launch. Competitor properties
 * (Best Western, Sea Cliff, DoubleTree) are included as geographic
 * references only, per docs/COMPETITOR_NOTES.md.
 */
export const mapPins: MapPin[] = [
  { id: "property", name: "Fig Tree Residences", lat: -6.7461, lng: 39.2775, category: "landmark" },
  { id: "yacht-club", name: "Dar es Salaam Yacht Club", lat: -6.7447, lng: 39.2789, category: "landmark" },
  { id: "slipway", name: "Slipway Shopping Center", lat: -6.7469, lng: 39.2733, category: "dining" },
  { id: "aga-khan", name: "Aga Khan Clinic", lat: -6.7502, lng: 39.2801, category: "landmark" },
  { id: "sali", name: "SALI International Hospital", lat: -6.7458, lng: 39.2768, category: "landmark" },
  { id: "epi-dor", name: "Epi d'Or", lat: -6.7472, lng: 39.2738, category: "dining" },
  { id: "akira-lounge", name: "Akira Lounge & Bar", lat: -6.7480, lng: 39.2745, category: "dining" },
  { id: "shoppers-plaza", name: "Shoppers Plaza Masaki", lat: -6.7530, lng: 39.2812, category: "dining" },
  { id: "best-western", name: "Best Western Coral Beach", lat: -6.7410, lng: 39.2820, category: "competitor-reference" },
  { id: "sea-cliff", name: "Sea Cliff Village", lat: -6.7390, lng: 39.2850, category: "competitor-reference" },
  { id: "doubletree", name: "DoubleTree by Hilton", lat: -6.7550, lng: 39.2900, category: "competitor-reference" },
];
