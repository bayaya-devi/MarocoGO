import { ArrowRight, Check, Clock3 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { countries, type Country } from '../countries/registry';
import { LocaleControl } from '../components/LocaleControl';
import { ResponsiveMedia } from '../components/ResponsiveMedia';
import { WorldGlobe } from '../components/WorldGlobe';
import { VoyageGoInfo } from '../design-system/VoyageGoInfo';
import { useI18n } from '../i18n';

export default function WorldHome(): React.JSX.Element {
  const { locale, t } = useI18n();
  const [selected, setSelected] = useState<Country>();
  const [query, setQuery] = useState('');

  const filteredCountries = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    return normalized ? countries.filter((country) => country.name[locale].toLocaleLowerCase(locale).includes(normalized)) : countries;
  }, [locale, query]);

  const infoLinks = [
    { to: '/info/about', label: t('about') }, { to: '/info/contact', label: t('contact') },
    { to: '/info/help', label: t('help') }, { to: '/info/legal', label: t('legal') },
    { to: '/info/privacy', label: t('privacy') }, { to: '/info/terms', label: t('terms') },
    { to: '/info/cookies', label: t('cookies') }, { to: '/info/credits', label: t('credits') },
  ];

  return (
    <div className="world-page" data-has-landscape={Boolean(selected?.landscape)}>
      {selected?.landscape && <ResponsiveMedia media={selected.landscape} locale={locale} className="world-landscape" eager />}
      <header className="world-utility">
        <Link to="/" className="voyagego-wordmark" aria-label="VoyageGo">Voyage<span>Go</span></Link>
        <LocaleControl tone="light" />
      </header>
      <main id="main-content">
        <section className="world-hero">
          <div className="world-copy">
            <p className="kicker">{t('globalKicker')}</p>
            <h1>{t('globalTitle')}</h1>
            <p>{t('globalLead')}</p>
            {selected && (
              <div className="selected-country" aria-live="polite">
                <span>{selected.status === 'published' ? <Check aria-hidden="true" /> : <Clock3 aria-hidden="true" />}{selected.status === 'published' ? t('available') : t('comingSoon')}</span>
                <h2>{selected.name[locale]}</h2>
                {!selected.landscape && <p>{t('landscapeUnavailable')}</p>}
                {selected.route && <Link className="light-cta" to={selected.route}>{t('enterCountry')}<ArrowRight aria-hidden="true" /></Link>}
              </div>
            )}
          </div>
          <WorldGlobe
            countries={countries}
            locale={locale}
            selectedCode={selected?.code}
            onSelect={setSelected}
            labels={{ globe: t('globeLabel'), rotateLeft: t('rotateLeft'), rotateRight: t('rotateRight'), zoomIn: t('zoomIn'), zoomOut: t('zoomOut'), reset: t('resetGlobe') }}
          />
        </section>
        <section className="country-index" aria-labelledby="country-index-title">
          <div className="country-index-heading">
            <div><p className="kicker">{t('chooseCountry')}</p><h2 id="country-index-title">{t('chooseCountry')}</h2></div>
            <label><span className="sr-only">{t('countrySearch')}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('countrySearch')} /></label>
          </div>
          <div className="country-list">
            {filteredCountries.map((country) => (
              <button type="button" key={country.code} onClick={() => setSelected(country)} aria-pressed={selected?.code === country.code}>
                <span>{country.code}</span><strong>{country.name[locale]}</strong>
                <small>{country.status === 'published' ? t('available') : t('comingSoon')}</small>
              </button>
            ))}
          </div>
        </section>
      </main>
      <VoyageGoInfo signature={t('worldSignature')} buttonLabel={t('voyageInfo')} panelTitle={t('information')} closeLabel={t('close')} links={infoLinks} />
    </div>
  );
}
