import { Check, Heart, MapPin, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { places } from '../data/places';
import { useI18n } from '../i18n';
import { addPlaceToTrip, useTrip } from '../lib/trip';

export default function PlacePage() {
  const { slug } = useParams();
  const { t, locale } = useI18n();
  const { trip, setTrip } = useTrip();
  const place = places.find((item) => item.slug === slug);
  const [favorite, setFavorite] = useState(() => localStorage.getItem(`marocogo.favorite.${slug}`) === '1');
  if (!place) return <section className="status-page"><h1>{t('notFound')}</h1><Link to="/">{t('goHome')}</Link></section>;
  const added = trip.days.some((day) => day.steps.some((step) => step.placeSlug === place.slug));
  const toggleFavorite = () => { const value = !favorite; setFavorite(value); localStorage.setItem(`marocogo.favorite.${place.slug}`, value ? '1' : '0'); };
  return <article className="place-detail">
    <header style={{ backgroundImage: `linear-gradient(0deg, rgba(7,16,11,.72), transparent 60%), url(${place.image})` }}><div><p><MapPin aria-hidden="true" />{place.region}</p><h1>{place.name[locale]}</h1><p>{place.line[locale]}</p></div></header>
    <section className="place-body"><div><p className="eyebrow">MarocoGO</p><h2>{place.description[locale]}</h2><p>{t('practical')} · {place.source}</p></div><aside><button className="primary-action" disabled={added} onClick={() => setTrip((value) => addPlaceToTrip(value, place.slug))}>{added ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}{t('addToTrip')}</button><button className="secondary-action" aria-pressed={favorite} onClick={toggleFavorite}><Heart aria-hidden="true" fill={favorite ? 'currentColor' : 'none'} />{t('favorite')}</button></aside></section>
  </article>;
}
