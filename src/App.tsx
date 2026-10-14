import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppShell } from './components/Shell';
import { useI18n } from './i18n';
import Home from './pages/Home';
const Explore = lazy(() => import('./pages/Explore'));
const PlacePage = lazy(() => import('./pages/Place'));
const Planner = lazy(() => import('./pages/Planner'));
const Profile = lazy(() => import('./pages/Profile'));
const Provider = lazy(() => import('./pages/Provider'));
const InfoPage = lazy(() => import('./pages/Info'));

function NotFound() {
  const { t } = useI18n();
  return <section className="status-page"><span>404</span><h1>{t('notFound')}</h1><a href="/MarocoGO/">{t('goHome')}</a></section>;
}

export default function App() {
  return <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">MarocoGO…</div>}><Routes>
    <Route path="/" element={<AppShell><Home /></AppShell>} />
    <Route path="/prepare" element={<AppShell><Planner /></AppShell>} />
    <Route path="/explore" element={<AppShell footer={false}><Explore /></AppShell>} />
    <Route path="/place/:slug" element={<AppShell><PlacePage /></AppShell>} />
    <Route path="/profile" element={<AppShell><Profile /></AppShell>} />
    <Route path="/provider/*" element={<Provider />} />
    <Route path="/legal" element={<AppShell><InfoPage /></AppShell>} />
    <Route path="/privacy" element={<AppShell><InfoPage /></AppShell>} />
    <Route path="/contact" element={<AppShell><InfoPage /></AppShell>} />
    <Route path="*" element={<AppShell><NotFound /></AppShell>} />
  </Routes></Suspense>;
}
