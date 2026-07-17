/**
 * Free/open basemap by default (MapLibre demo style, no API key required),
 * per the build's decision to ship Mapbox-ready without blocking on a
 * token. Set NEXT_PUBLIC_MAP_STYLE_URL to a Mapbox (or other custom)
 * style URL to upgrade — no component code needs to change.
 */
export const MAP_STYLE_URL =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ?? "https://demotiles.maplibre.org/style.json";
