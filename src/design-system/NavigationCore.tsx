import {
  CircleUserRound,
  Compass,
  Earth,
  House,
  Languages,
  MoreHorizontal,
  Route,
  Search,
  Sparkles,
} from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { NavigationLabels, VoyageGoLocale } from './contracts';
import './foundations.css';

export type NavigationRoutes = {
  globalHome: string;
  countryHome: string;
  explore: string;
  plan: string;
  discover: string;
};

type LocaleOption = { value: VoyageGoLocale; label: string };

export type NavigationCoreProps = {
  routes: NavigationRoutes;
  labels: NavigationLabels;
  locale: VoyageGoLocale;
  localeOptions: readonly LocaleOption[];
  onLocaleChange: (locale: VoyageGoLocale) => void;
  onSearch: () => void;
  onAccount: () => void;
};

export function NavigationCore({
  routes,
  labels,
  locale,
  localeOptions,
  onLocaleChange,
  onSearch,
  onAccount,
}: NavigationCoreProps): React.JSX.Element {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isScrollHidden, setIsScrollHidden] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const actionsId = useId();

  useEffect(() => {
    let previousY = window.scrollY;
    let sampledY = previousY;
    let stableFrames = 0;
    let settlingFrame = 0;

    const detectScrollEnd = () => {
      const currentY = window.scrollY;
      if (currentY === sampledY) stableFrames += 1;
      else stableFrames = 0;
      sampledY = currentY;
      if (stableFrames >= 2) {
        setIsScrollHidden(false);
        settlingFrame = 0;
        return;
      }
      settlingFrame = window.requestAnimationFrame(detectScrollEnd);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      if (currentY <= 8 || delta < 0) setIsScrollHidden(false);
      else if (delta > 4 && !isMoreOpen) setIsScrollHidden(true);
      previousY = currentY;
      if (!settlingFrame) settlingFrame = window.requestAnimationFrame(detectScrollEnd);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (settlingFrame) window.cancelAnimationFrame(settlingFrame);
    };
  }, [isMoreOpen]);

  useEffect(() => {
    if (!isMoreOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsMoreOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMoreOpen(false);
        moreButtonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMoreOpen]);

  return (
    <div className="vg-navigation-layer">
      <NavLink className="vg-global-home" to={routes.globalHome} aria-label={labels.globalHome} title={labels.globalHome}>
        <Earth aria-hidden="true" />
      </NavLink>
      <nav
        ref={rootRef}
        className="vg-navigation-core"
        aria-label={labels.navigation}
        data-scroll-hidden={isScrollHidden}
        onFocus={() => setIsScrollHidden(false)}
      >
        <NavItem to={routes.countryHome} label={labels.countryHome} end icon={House} />
        <NavItem to={routes.explore} label={labels.explore} icon={Compass} />
        <NavItem to={routes.plan} label={labels.plan} icon={Route} />
        <NavItem to={routes.discover} label={labels.discover} icon={Sparkles} />
        <button
          ref={moreButtonRef}
          type="button"
          aria-label={isMoreOpen ? labels.closeMore : labels.more}
          title={isMoreOpen ? labels.closeMore : labels.more}
          aria-expanded={isMoreOpen}
          aria-controls={actionsId}
          onClick={() => setIsMoreOpen((open) => !open)}
        >
          <MoreHorizontal aria-hidden="true" />
        </button>
        {isMoreOpen && (
          <div id={actionsId} className="vg-secondary-actions" role="group" aria-label={labels.more}>
            <button type="button" aria-label={labels.search} title={labels.search} onClick={onSearch}>
              <Search aria-hidden="true" />
            </button>
            <label className="vg-language-action" title={labels.language}>
              <span className="sr-only">{labels.language}</span>
              <Languages aria-hidden="true" />
              <select
                aria-label={labels.language}
                value={locale}
                onChange={(event) => onLocaleChange(event.target.value as VoyageGoLocale)}
              >
                {localeOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
            <button type="button" aria-label={labels.account} title={labels.account} onClick={onAccount}>
              <CircleUserRound aria-hidden="true" />
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
  end = false,
}: {
  to: string;
  label: string;
  icon: typeof House;
  end?: boolean;
}): React.JSX.Element {
  return (
    <NavLink to={to} end={end} aria-label={label} title={label}>
      <Icon aria-hidden="true" />
    </NavLink>
  );
}
