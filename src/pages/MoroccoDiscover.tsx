import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { discoveryTopics, moroccoPlaces } from '../countries/ma/content';
import { ResponsiveMedia } from '../components/ResponsiveMedia';
import { useI18n } from '../i18n';

export default function MoroccoDiscover(): React.JSX.Element {
  const { locale, t } = useI18n();
  return (
    <div className="national-page discover-view">
      <header className="national-intro"><p className="kicker">{t('discover')}</p><h1>{t('discoverTitle')}</h1><p>{t('discoverIntro')}</p></header>
      <section className="topic-ribbon">{discoveryTopics.map((topic, index) => <article key={topic.id}><span>0{index + 1}</span><h2>{topic.title[locale]}</h2><p>{topic.description[locale]}</p></article>)}</section>
      <section className="story-grid">
        {moroccoPlaces.map((place) => <Link to={`/ma/decouvrir/lieux/${place.slug}`} key={place.slug} className="story-tile">
          <ResponsiveMedia media={place.media} locale={locale} /><span><small>{place.region[locale]}</small><strong>{place.name[locale]}</strong><em>{t('details')}<ArrowRight aria-hidden="true" /></em></span>
        </Link>)}
      </section>
    </div>
  );
}
