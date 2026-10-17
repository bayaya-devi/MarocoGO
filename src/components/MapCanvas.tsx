import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { MoroccoPlace } from "../countries/ma/content";
import type { Locale } from "../i18n";

export function MapCanvas({
  places,
  selected,
  locale,
  userPosition,
  positionLabel,
  onSelect,
}: {
  places: readonly MoroccoPlace[];
  selected?: string;
  locale: Locale;
  userPosition?: [number, number] | null;
  positionLabel: string;
  onSelect: (slug: string) => void;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!elementRef.current || mapRef.current) return;
    const map = L.map(elementRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([31.7917, -7.0926], 5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    mapRef.current = map;
    layerRef.current = L.layerGroup().addTo(map);
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    places.forEach((place) => {
      const active = selected === place.slug;
      const marker = L.circleMarker(place.coordinates, {
        radius: active ? 11 : 8,
        color: "#fff",
        weight: 3,
        fillColor: active ? "#C1272D" : "#006233",
        fillOpacity: 1,
      })
        .bindTooltip(place.name[locale], { direction: "top", offset: [0, -8] })
        .on("click", () => onSelect(place.slug));
      marker.addTo(layer);
    });
    if (userPosition) {
      L.circleMarker(userPosition, {
        radius: 8,
        color: "#fff",
        weight: 3,
        fillColor: "#2678d8",
        fillOpacity: 1,
      })
        .bindTooltip(positionLabel)
        .addTo(layer);
      map.flyTo(userPosition, Math.max(map.getZoom(), 10), { duration: 0.8 });
    } else if (selected) {
      const place = places.find((item) => item.slug === selected);
      if (place)
        map.flyTo(place.coordinates, Math.max(map.getZoom(), 8), {
          duration: 0.7,
        });
    }
  }, [places, selected, locale, userPosition, positionLabel, onSelect]);

  return (
    <div
      className="real-map"
      ref={elementRef}
      role="region"
      aria-label={`VoyageGo · ${places.length}`}
    />
  );
}
