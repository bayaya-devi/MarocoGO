import { lazy, Suspense, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { NationalLayout } from './components/NationalLayout';
import { countries } from './countries/registry';
import { useI18n } from './i18n';

const WorldHome = lazy(() => import('./pages/WorldHome'));
const MoroccoHome = lazy(() => import('./pages/MoroccoHome'));
const MoroccoExplore = lazy(() => import('./pages/MoroccoExplore'));
const MoroccoPlan = lazy(() => import('./pages/MoroccoPlan'));
const MoroccoDiscover = lazy(() => import('./pages/MoroccoDiscover'));
const MoroccoPlace = lazy(() => import('./pages/MoroccoPlace'));
const Institutional = lazy(() => import('./pages/Institutional'));

function NotFound(): React.JSX.Element {
  const { t } = useI18n();
  return <main id="main-content" className="not-found"><p>404</p><h1>{t('notFound')}</h1><Link to="/">{t('backWorld')}</Link></main>;
}

function RouteEffects(): null {
  const { pathname } = useLocation();
  const { locale, t } = useI18n();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const pageName = pathname === '/'
      ? t('globalTitle')
      : pathname.startsWith('/ma')
        ? countries.find((country) => country.code === 'MA')?.name[locale]
        : pathname.startsWith('/info/')
          ? t('information')
          : t('notFound');
    document.title = `VoyageGo — ${pageName ?? 'VoyageGo'}`;
  }, [locale, pathname, t]);
  return null;
}

export default function App(): React.JSX.Element {
  const { t } = useI18n();
  return (
    <>
      <RouteEffects />
      <a className="skip-link" href="#main-content">{t('skip')}</a>
      <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">VoyageGo…</div>}>
        <Routes>
          <Route path="/" element={<WorldHome />} />
          <Route path="/ma" element={<NationalLayout />}>
            <Route index element={<MoroccoHome />} />
            <Route path="explorer" element={<MoroccoExplore />} />
            <Route path="planifier" element={<MoroccoPlan />} />
            <Route path="decouvrir" element={<MoroccoDiscover />} />
            <Route path="decouvrir/lieux/:slug" element={<MoroccoPlace />} />
          </Route>
          <Route path="/info/:section" element={<Institutional />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
