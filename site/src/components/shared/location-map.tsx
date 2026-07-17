"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_STYLE_URL } from "@/lib/map-config";
import { mapPins } from "@/lib/content/location";
import { siteConfig } from "@/lib/content/site";

/**
 * design/04_COMPONENT_LIBRARY.md Section 8. Custom-styled map (never a
 * default embedded-Google-Maps look), fixed aspect-ratio container to
 * protect CLS per website/09_PERFORMANCE_PLAN.md. Loaded via dynamic
 * import from the page level so the map library never enters the shared
 * initial bundle (website/09_PERFORMANCE_PLAN.md Section 3).
 */
export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    let map: MapLibreMap | undefined;
    let cancelled = false;

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      if (cancelled || !containerRef.current) return;

      map = new maplibregl.Map({
        container: containerRef.current,
        style: MAP_STYLE_URL,
        center: [siteConfig.geo.lng, siteConfig.geo.lat],
        zoom: 14,
        attributionControl: false,
      });
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
      map.addControl(new maplibregl.AttributionControl({ compact: true }));

      mapPins.forEach((pin) => {
        const el = document.createElement("button");
        el.type = "button";
        el.setAttribute("aria-label", pin.name);
        el.className =
          "block h-4 w-4 rounded-full border-2 border-white shadow" +
          (pin.category === "landmark" ? " bg-[#2E8C82]" : pin.category === "dining" ? " bg-[#B9673C]" : " bg-[#8A8A8A]");
        el.addEventListener("click", () => setSelected(pin.name));

        new maplibregl.Marker({ element: el }).setLngLat([pin.lng, pin.lat]).addTo(map!);
      });
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div className="relative">
      <div ref={containerRef} className="aspect-[4/3] lg:aspect-[16/9] w-full rounded-(--radius-lg) overflow-hidden" role="application" aria-label="Map of Fig Tree Residences and nearby landmarks" />
      {selected && (
        <div className="absolute bottom-4 left-4 bg-(--color-surface-canvas) rounded-(--radius-sm) px-4 py-2 shadow-(--shadow-floating) text-(length:--text-caption)">
          {selected}
        </div>
      )}
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${siteConfig.geo.lat},${siteConfig.geo.lng}`}
        target="_blank"
        rel="noopener"
        className="mt-4 inline-block text-(length:--text-nav) border-b border-(--color-accent-primary) pb-0.5"
      >
        Get Directions
      </a>
    </div>
  );
}
