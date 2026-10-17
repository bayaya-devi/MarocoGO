import { Check, Plus } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getMoroccoPlace } from '../countries/ma/content';
import { ResponsiveMedia } from '../components/ResponsiveMedia';
import { useI18n } from '../i18n';
import { addPlaceToTrip, useTrip } from '../lib/trip';

export default function MoroccoPlace(): React.JSX.Element {
  const { slug = '' } = useParams();
  const { locale, t } = useI18n();
  const { trip, setTrip } = useTrip();
  const place = getMoroccoPlace(slug);
  if (!place) return <section className="not-found"><h1>{t('notFound')}</h1><Link to="/ma">{t('backMorocco')}</Link></section>;
  const added = trip.days.some((day) => day.steps.some((step) => step.placeSlug === place.slug));
  return (
    <article className="place-story">
      <header><ResponsiveMedia media={place.media} locale={locale} className="place-story-media" eager />
        <div><p className="kicker">{place.region[locale]}</p><h1>{place.name[locale]}</h1><p>{place.line[locale]}</p></div></header>
      <div className="place-story-body"><p>{place.description[locale]}</p>
        <button type="button" className="solid-action" onClick={() => setTrip((current) => addPlaceToTrip(current, place.slug))} disabled={added}>
          {added ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}{added ? t('addedToTrip') : t('addToTrip')}
        </button>
        <Link to="/ma">{t('backMorocco')}</Link>
      </div>
    </article>
  );
}
