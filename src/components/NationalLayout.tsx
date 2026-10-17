import { Search, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { discoveryTopics, moroccoPlaces } from '../countries/ma/content';
import { navigationLabels } from '../design-system/contracts';
import { NavigationCore } from '../design-system/NavigationCore';
import { VoyageGoInfo } from '../design-system/VoyageGoInfo';
import { useI18n } from '../i18n';

export function NationalLayout(): React.JSX.Element {
  const { locale, setLocale, localeNames, t } = useI18n();
  const searchRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const [accountNotice, setAccountNotice] = useState(false);
  const normalized = query.trim().toLocaleLowerCase(locale);
  const results = normalized
    ? [
      ...moroccoPlaces.filter((place) => [place.name[locale], place.line[locale], place.region[locale]].some((value) => value.toLocaleLowerCase(locale).includes(normalized)))
        .map((place) => ({ to: `/ma/decouvrir/lieux/${place.slug}`, label: place.name[locale], detail: place.region[locale] })),
      ...discoveryTopics.filter((topic) => [topic.title[locale], topic.description[locale]].some((value) => value.toLocaleLowerCase(locale).includes(normalized)))
        .map((topic) => ({ to: '/ma/decouvrir', label: topic.title[locale], detail: topic.description[locale] })),
    ] : [];

  const closeSearch = () => searchRef.current?.close();
  const infoLinks = [
    { to: '/info/about', label: t('about') }, { to: '/info/contact', label: t('contact') },
    { to: '/info/help', label: t('help') }, { to: '/info/legal', label: t('legal') },
    { to: '/info/privacy', label: t('privacy') }, { to: '/info/terms', label: t('terms') },
    { to: '/info/cookies', label: t('cookies') }, { to: '/info/credits', label: t('credits') },
  ];

  return (
    <>
      <NavigationCore
        routes={{ globalHome: '/', countryHome: '/ma', explore: '/ma/explorer', plan: '/ma/planifier', discover: '/ma/decouvrir' }}
        labels={navigationLabels[locale]}
        locale={locale}
        localeOptions={Object.entries(localeNames).map(([value, label]) => ({ value: value as typeof locale, label }))}
        onLocaleChange={setLocale}
        onSearch={() => searchRef.current?.showModal()}
        onAccount={() => setAccountNotice(true)}
      />
      <main id="main-content"><Outlet /></main>
      <VoyageGoInfo signature={t('countrySignature')} buttonLabel={t('voyageInfo')} panelTitle={t('information')} closeLabel={t('close')} links={infoLinks} />
      <dialog ref={searchRef} className="search-dialog" aria-labelledby="search-title">
        <div className="search-dialog-head">
          <h2 id="search-title">{t('searchSite')}</h2>
          <button type="button" onClick={closeSearch} aria-label={t('close')}><X aria-hidden="true" /></button>
        </div>
        <label className="site-search"><Search aria-hidden="true" /><span className="sr-only">{t('searchSite')}</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('searchHint')} autoFocus />
        </label>
        <div className="search-results">
          {results.map((result) => <Link key={result.to + result.label} to={result.to} onClick={closeSearch}><strong>{result.label}</strong><small>{result.detail}</small></Link>)}
          {normalized && results.length === 0 && <p>{t('noResults')}</p>}
        </div>
      </dialog>
      {accountNotice && <div className="account-notice" role="status"><p>{t('accountUnavailable')}</p><button type="button" onClick={() => setAccountNotice(false)} aria-label={t('close')}><X aria-hidden="true" /></button></div>}
    </>
  );
}
