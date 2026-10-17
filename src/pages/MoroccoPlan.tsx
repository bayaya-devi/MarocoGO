import { CheckCircle2 } from 'lucide-react';
import { moroccoPlaces } from '../countries/ma/content';
import { useI18n } from '../i18n';
import { useTrip, type TripDraft } from '../lib/trip';

export default function MoroccoPlan(): React.JSX.Element {
  const { locale, t } = useI18n();
  const { trip, setTrip } = useTrip();
  const update = <K extends keyof TripDraft>(key: K, value: TripDraft[K]) => setTrip((current) => ({ ...current, [key]: value }));
  return (
    <div className="national-page plan-view">
      <header className="national-intro"><p className="kicker">{t('plan')}</p><h1>{t('startPlan')}</h1><p>{t('planLead')}</p></header>
      <div className="local-notice"><CheckCircle2 aria-hidden="true" /><div><strong>{t('savedLocal')}</strong><p>{t('localDraftNotice')}</p></div></div>
      <form className="trip-form" onSubmit={(event) => event.preventDefault()}>
        <label><span>{t('destination')}</span><select value={trip.destination} onChange={(event) => update('destination', event.target.value)}>
          <option value="">—</option>{moroccoPlaces.map((place) => <option key={place.slug} value={place.slug}>{place.name[locale]}</option>)}
        </select></label>
        <label><span>{t('travellers')}</span><input type="number" min="1" max="20" value={trip.travellers} onChange={(event) => update('travellers', Number(event.target.value) || 1)} /></label>
        <label><span>{t('startDate')}</span><input type="date" value={trip.startDate} onChange={(event) => update('startDate', event.target.value)} /></label>
        <label><span>{t('endDate')}</span><input type="date" value={trip.endDate} onChange={(event) => update('endDate', event.target.value)} /></label>
        <label><span>{t('transport')}</span><textarea value={trip.transport} onChange={(event) => update('transport', event.target.value)} placeholder={t('transportPlaceholder')} /></label>
        <label><span>{t('accommodation')}</span><textarea value={trip.accommodation} onChange={(event) => update('accommodation', event.target.value)} placeholder={t('accommodationPlaceholder')} /></label>
        <label><span>{t('activities')}</span><textarea value={trip.activities} onChange={(event) => update('activities', event.target.value)} placeholder={t('activitiesPlaceholder')} /></label>
        <label><span>{t('itinerary')}</span><textarea value={trip.itinerary} onChange={(event) => update('itinerary', event.target.value)} placeholder={t('itineraryPlaceholder')} /></label>
        <label><span>{t('budget')}</span><input value={trip.budget} onChange={(event) => update('budget', event.target.value)} placeholder={t('budgetPlaceholder')} /></label>
        <label className="full-field"><span>{t('notes')}</span><textarea value={trip.notes} onChange={(event) => update('notes', event.target.value)} /></label>
      </form>
    </div>
  );
}
