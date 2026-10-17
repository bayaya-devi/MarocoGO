import { Minus, Plus, RotateCcw, RotateCw, RotateCcw as RotateLeft } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import type { Country } from '../countries/registry';
import type { VoyageGoLocale } from '../design-system/contracts';

type GlobeLabels = {
  globe: string;
  rotateLeft: string;
  rotateRight: string;
  zoomIn: string;
  zoomOut: string;
  reset: string;
};

export function WorldGlobe({
  countries,
  locale,
  selectedCode,
  onSelect,
  labels,
}: {
  countries: readonly Country[];
  locale: VoyageGoLocale;
  selectedCode?: string;
  onSelect: (country: Country) => void;
  labels: GlobeLabels;
}): React.JSX.Element {
  const [rotation, setRotation] = useState(-12);
  const [zoom, setZoom] = useState(1);
  const drag = useRef<{ x: number; rotation: number } | null>(null);

  const projected = useMemo(() => countries.map((country) => {
    const [latitude, longitude] = country.coordinates;
    const lambda = (longitude - rotation) * Math.PI / 180;
    const phi = latitude * Math.PI / 180;
    const center = 18 * Math.PI / 180;
    const x = Math.cos(phi) * Math.sin(lambda);
    const y = Math.cos(center) * Math.sin(phi) - Math.sin(center) * Math.cos(phi) * Math.cos(lambda);
    const z = Math.sin(center) * Math.sin(phi) + Math.cos(center) * Math.cos(phi) * Math.cos(lambda);
    return { country, x: 50 + x * 42 * zoom, y: 50 - y * 42 * zoom, visible: z > .05 };
  }), [countries, rotation, zoom]);

  const rotate = (delta: number) => setRotation((value) => value + delta);
  const changeZoom = (delta: number) => setZoom((value) => Math.min(1.28, Math.max(.82, value + delta)));

  return (
    <section className="world-globe" aria-label={labels.globe}>
      <div
        className="globe-stage"
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, rotation };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current) setRotation(drag.current.rotation + (event.clientX - drag.current.x) * .35);
        }}
        onPointerUp={() => { drag.current = null; }}
      >
        <svg className="globe-sphere" viewBox="0 0 600 600" aria-hidden="true">
          <defs>
            <radialGradient id="ocean" cx="34%" cy="28%">
              <stop offset="0" stopColor="#a8d8dc" stopOpacity=".78" />
              <stop offset=".55" stopColor="#276979" stopOpacity=".9" />
              <stop offset="1" stopColor="#081b24" />
            </radialGradient>
            <clipPath id="sphere-clip"><circle cx="300" cy="300" r="244" /></clipPath>
          </defs>
          <circle cx="300" cy="300" r="252" className="globe-halo" />
          <circle cx="300" cy="300" r="244" fill="url(#ocean)" className="globe-ocean" />
          <g clipPath="url(#sphere-clip)" className="globe-grid" style={{ transform: `rotate(${rotation * .08}deg)`, transformOrigin: '300px 300px' }}>
            <ellipse cx="300" cy="300" rx="244" ry="82" />
            <ellipse cx="300" cy="300" rx="244" ry="155" />
            <ellipse cx="300" cy="300" rx="82" ry="244" />
            <ellipse cx="300" cy="300" rx="155" ry="244" />
            <path d="M85 340 C180 160 420 160 515 340 C420 455 180 455 85 340Z" className="globe-land" />
            <path d="M225 120 C285 180 320 245 292 330 C255 420 185 435 155 335 C140 250 170 165 225 120Z" className="globe-land secondary" />
            <path d="M390 355 C455 350 505 395 470 450 C420 482 362 442 390 355Z" className="globe-land secondary" />
          </g>
        </svg>
        {projected.filter((item) => item.visible).map(({ country, x, y }) => (
          <button
            key={country.code}
            type="button"
            className="globe-country"
            data-selected={selectedCode === country.code}
            data-status={country.status}
            style={{ insetInlineStart: `${x}%`, insetBlockStart: `${y}%` }}
            onClick={() => onSelect(country)}
            aria-pressed={selectedCode === country.code}
          >
            <span>{country.code}</span>
            <strong>{country.name[locale]}</strong>
          </button>
        ))}
      </div>
      <div className="globe-controls" aria-label={labels.globe}>
        <button type="button" onClick={() => rotate(-18)} aria-label={labels.rotateLeft} title={labels.rotateLeft}><RotateLeft aria-hidden="true" /></button>
        <button type="button" onClick={() => rotate(18)} aria-label={labels.rotateRight} title={labels.rotateRight}><RotateCw aria-hidden="true" /></button>
        <button type="button" onClick={() => changeZoom(.1)} aria-label={labels.zoomIn} title={labels.zoomIn}><Plus aria-hidden="true" /></button>
        <button type="button" onClick={() => changeZoom(-.1)} aria-label={labels.zoomOut} title={labels.zoomOut}><Minus aria-hidden="true" /></button>
        <button type="button" onClick={() => { setRotation(-12); setZoom(1); }} aria-label={labels.reset} title={labels.reset}><RotateCcw aria-hidden="true" /></button>
      </div>
    </section>
  );
}
