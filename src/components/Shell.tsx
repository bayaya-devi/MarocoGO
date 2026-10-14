import { ArrowLeft, ChevronDown, ChevronUp, Compass, MapPinned, UserRound } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useI18n, type Locale } from '../i18n';

const rootRoutes = ['/', '/prepare', '/explore', '/profile'];

export function AppShell({ children, footer = true }: { children: ReactNode; footer?: boolean }) {
  const { t, locale, setLocale, localeNames } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [manualCompact, setManualCompact] = useState(false);
  const [autoCompact, setAutoCompact] = useState(false);
  const previousY = useRef(0);
  const mainRef = useRef<HTMLElement>(null);
  const isSecondary = !rootRoutes.includes(location.pathname);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 180 && y > previousY.current + 12) setAutoCompact(true);
      if (y < previousY.current - 24 || y < 80) setAutoCompact(false);
      previousY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.title = `MarocoGO — ${location.pathname === '/' ? t('home') : t(location.pathname.startsWith('/prepare') ? 'prepare' : location.pathname.startsWith('/explore') ? 'explore' : location.pathname.startsWith('/profile') ? 'profile' : 'home')}`;
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname, t]);

  const compact = manualCompact || autoCompact;
  const goBack = () => window.history.length > 1 ? navigate(-1) : navigate('/');

  return <>
    <a className="skip-link" href="#main-content">{t('skip')}</a>
    <header className={`topbar ${compact ? 'compact' : ''}`}>
      {isSecondary && <button className="nav-back" onClick={goBack} aria-label={t('back')}><ArrowLeft aria-hidden="true" /><span>{t('back')}</span></button>}
      <nav aria-label={`MarocoGO · ${t('home')}`} className="primary-nav">
        <Link className="symbol-link" to="/" aria-label={t('home')}><img src="/MarocoGO/logo/marocogo-symbol.png" alt="" /></Link>
        <NavLink to="/prepare" aria-label={t('prepare')}><MapPinned aria-hidden="true" /><span>{t('prepare')}</span></NavLink>
        <NavLink to="/explore" aria-label={t('explore')}><Compass aria-hidden="true" /><span>{t('explore')}</span></NavLink>
        <NavLink to="/profile" aria-label={t('profile')}><UserRound aria-hidden="true" /><span>{t('profile')}</span></NavLink>
      </nav>
      <div className="nav-tools">
        <label className="language-control"><span className="sr-only">{t('language')}</span><select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>{Object.entries(localeNames).map(([code, name]) => <option key={code} value={code}>{name}</option>)}</select></label>
        <button className="collapse-control" onClick={() => setManualCompact((value) => !value)} aria-expanded={!compact} aria-label={compact ? t('expand') : t('reduce')}>{compact ? <ChevronDown aria-hidden="true" /> : <ChevronUp aria-hidden="true" />}</button>
      </div>
    </header>
    <main id="main-content" ref={mainRef} tabIndex={-1}>{children}</main>
    {footer && <Footer />}
  </>;
}

function Footer() {
  const { t } = useI18n();
  return <footer className="minimal-footer">
    <Link to="/" className="footer-logo"><img src="/MarocoGO/logo/marocogo-full.png" alt="MarocoGO" /></Link>
    <nav aria-label={t('legal')}><Link to="/legal">{t('legal')}</Link><Link to="/privacy">{t('footerPrivacy')}</Link><Link to="/contact">{t('contact')}</Link></nav>
    <small>© {new Date().getFullYear()} MarocoGO · VoyageGo</small>
  </footer>;
}
