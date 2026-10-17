import { ArrowRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapCanvas } from '../components/MapCanvas';
import { ResponsiveMedia } from '../components/ResponsiveMedia';
import { moroccoPlaces } from '../countries/ma/content';
import { useI18n } from '../i18n';

export default function MoroccoExplore(): React.JSX.Element {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(moroccoPlaces[0].slug);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    return normalized ? moroccoPlaces.filter((place) => [place.name[locale], place.region[locale], place.line[locale]].some((value) => value.toLocaleLowerCase(locale).includes(normalized))) : moroccoPlaces;
  }, [locale, query]);
  const active = moroccoPlaces.find((place) => place.slug === selected);

  return (
    <div className="national-page explore-view">
      <header className="national-intro"><p className="kicker">{t('explore')}</p><h1>{t('destinations')}</h1><p>{t('destinationsLead')}</p></header>
      <section className="explore-layout">
        <div className="destination-browser">
          <label className="site-search"><Search aria-hidden="true" /><span className="sr-only">{t('searchPlaces')}</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('searchPlaces')} /></label>
          <div className="destination-list">
            {filtered.map((place) => <button type="button" key={place.slug} onClick={() => setSelected(place.slug)} aria-pressed={selected === place.slug}>
              <ResponsiveMedia media={place.media} locale={locale} /><span><small>{place.region[locale]}</small><strong>{place.name[locale]}</strong><em>{place.line[locale]}</em></span>
            </button>)}
            {filtered.length === 0 && <p>{t('noResults')}</p>}
          </div>
        </div>
        <div className="explore-map">
          <MapCanvas places={moroccoPlaces} selected={selected} locale={locale} positionLabel={t('mapLabel')} onSelect={setSelected} />
          {active && <Link className="map-detail-link" to={`/ma/decouvrir/lieux/${active.slug}`}><span><small>{active.region[locale]}</small><strong>{active.name[locale]}</strong></span>{t('details')}<ArrowRight aria-hidden="true" /></Link>}
        </div>
      </section>
    </div>
  );
}
