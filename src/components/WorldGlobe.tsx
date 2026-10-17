import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Minus, Plus, RotateCcw, RotateCw, RotateCcw as RotateLeft } from 'lucide-react';
import type { Country } from '../countries/registry';
import type { VoyageGoLocale } from '../design-system/contracts';
import type { Globe3DHandle } from './WorldGlobeScene';

const WorldGlobeScene = lazy(() => import('./WorldGlobeScene').then((module) => ({ default: module.WorldGlobeScene })));

type GlobeLabels = {
  globe: string;
  rotateLeft: string;
  rotateRight: string;
  zoomIn: string;
  zoomOut: string;
  reset: string;
  loading: string;
  unavailable: string;
  fallback: string;
  retry: string;
};

type RendererStatus = 'checking' | 'loading' | 'ready' | 'unavailable';

function canCreateWebGLContext(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const options: WebGLContextAttributes = { failIfMajorPerformanceCaveat: true };
    const context = canvas.getContext('webgl2', options) || canvas.getContext('webgl', options);
    if (!context) return false;
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

function isLowPowerDevice(): boolean {
  const deviceNavigator = navigator as Navigator & { deviceMemory?: number };
  return window.innerWidth < 600
    || (deviceNavigator.deviceMemory !== undefined && deviceNavigator.deviceMemory <= 4)
    || (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4);
}

class GlobeErrorBoundary extends Component<{
  children: ReactNode;
  onError: () => void;
}, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  componentDidCatch(): void {
    this.props.onError();
  }

  render(): ReactNode {
    return this.state.failed ? null : this.props.children;
  }
}

function GlobeFallback({ labels, onRetry }: { labels: GlobeLabels; onRetry: () => void }): React.JSX.Element {
  return (
    <div className="globe-fallback" role="status">
      <div className="globe-fallback-orbit" aria-hidden="true"><span /></div>
      <strong>{labels.unavailable}</strong>
      <a href="#country-index-title">{labels.fallback}</a>
      <button type="button" onClick={onRetry}>{labels.retry}</button>
    </div>
  );
}

export function WorldGlobe({
  countries,
  locale: _locale,
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
  const scene = useRef<Globe3DHandle>(null);
  const drag = useRef<{ x: number; y: number; moved: boolean } | undefined>(undefined);
  const [status, setStatus] = useState<RendererStatus>('checking');
  const [zoom, setZoom] = useState(.35);
  const [rendererKey, setRendererKey] = useState(0);
  const [lowPower, setLowPower] = useState(false);
  const reducedMotion = useReducedMotion();
  const selectedCountry = countries.find((country) => country.code === selectedCode);

  const detectSupport = useCallback(() => {
    setStatus('checking');
    window.setTimeout(() => {
      const supported = canCreateWebGLContext();
      setLowPower(isLowPowerDevice());
      setStatus(supported ? 'loading' : 'unavailable');
    }, 0);
  }, []);

  useEffect(detectSupport, [detectSupport]);

  const retry = () => {
    setRendererKey((value) => value + 1);
    detectSupport();
  };
  const changeZoom = (delta: number) => setZoom((value) => Math.min(1, Math.max(0, value + delta)));
  const ready = status === 'ready';

  return (
    <section className="world-globe" aria-label={labels.globe} data-renderer={status}>
      <div
        className="globe-canvas-shell"
        onPointerDownCapture={(event) => {
          if (!ready) return;
          drag.current = { x: event.clientX, y: event.clientY, moved: false };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMoveCapture={(event) => {
          if (!drag.current || !ready) return;
          const deltaX = event.clientX - drag.current.x;
          const deltaY = event.clientY - drag.current.y;
          if (Math.abs(deltaX) + Math.abs(deltaY) > 2) drag.current.moved = true;
          scene.current?.dragBy(deltaX, deltaY);
          drag.current.x = event.clientX;
          drag.current.y = event.clientY;
        }}
        onPointerUpCapture={(event) => {
          if (!drag.current || !ready) return;
          if (!drag.current.moved) {
            const bounds = event.currentTarget.getBoundingClientRect();
            scene.current?.selectAt((event.clientX - bounds.left) / bounds.width, (event.clientY - bounds.top) / bounds.height);
          }
          drag.current = undefined;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancelCapture={() => { drag.current = undefined; }}
        onWheel={(event) => {
          if (!ready) return;
          event.preventDefault();
          changeZoom(event.deltaY > 0 ? -.08 : .08);
        }}
      >
        {(status === 'checking' || status === 'loading') && <div className="globe-loading" role="status"><span aria-hidden="true" />{labels.loading}</div>}
        {status === 'unavailable' && <GlobeFallback labels={labels} onRetry={retry} />}
        {(status === 'loading' || status === 'ready') && (
          <GlobeErrorBoundary key={rendererKey} onError={() => setStatus('unavailable')}>
            <Suspense fallback={null}>
              <WorldGlobeScene
                ref={scene}
                countries={countries}
                selectedCountry={selectedCountry}
                zoom={zoom}
                reducedMotion={reducedMotion}
                lowPower={lowPower}
                onSelect={onSelect}
                onReady={() => setStatus('ready')}
                onContextLost={() => setStatus('unavailable')}
              />
            </Suspense>
          </GlobeErrorBoundary>
        )}
      </div>
      <div className="globe-controls" aria-label={labels.globe}>
        <button type="button" disabled={!ready} onClick={() => scene.current?.rotate(-.28)} aria-label={labels.rotateLeft} title={labels.rotateLeft}><RotateLeft aria-hidden="true" /></button>
        <button type="button" disabled={!ready} onClick={() => scene.current?.rotate(.28)} aria-label={labels.rotateRight} title={labels.rotateRight}><RotateCw aria-hidden="true" /></button>
        <button type="button" disabled={!ready || zoom >= 1} onClick={() => changeZoom(.12)} aria-label={labels.zoomIn} title={labels.zoomIn}><Plus aria-hidden="true" /></button>
        <button type="button" disabled={!ready || zoom <= 0} onClick={() => changeZoom(-.12)} aria-label={labels.zoomOut} title={labels.zoomOut}><Minus aria-hidden="true" /></button>
        <button type="button" disabled={!ready} onClick={() => { setZoom(.35); scene.current?.reset(); }} aria-label={labels.reset} title={labels.reset}><RotateCcw aria-hidden="true" /></button>
      </div>
    </section>
  );
}
