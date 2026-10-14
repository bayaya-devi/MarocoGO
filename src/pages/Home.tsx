import { ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { places } from '../data/places';
import { useI18n } from '../i18n';

const interestKeys = ['nature', 'heritage', 'food', 'leisure', 'rest', 'family'] as const;

export default function Home() {
  const { t, locale } = useI18n();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showPreferences, setShowPreferences] = useState(() => localStorage.getItem('marocogo.preferences.seen') !== '1');
  const [preferences, setPreferences] = useState<string[]>(() => JSON.parse(localStorage.getItem('marocogo.preferences') || '[]'));
  const heroRef = useRef<HTMLElement>(null);
  const featured = [...places].sort((a, b) => Number(preferences.some((tag) => b.tags.includes(tag))) - Number(preferences.some((tag) => a.tags.includes(tag))));
  const slides = featured.slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (paused || !visible || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = window.setInterval(() => setSlide((value) => (value + 1) % slides.length), 7000);
    return () => window.clearInterval(interval);
  }, [paused, visible, slides.length]);

  const finishPreferences = () => {
    localStorage.setItem('marocogo.preferences', JSON.stringify(preferences));
    localStorage.setItem('marocogo.preferences.seen', '1');
    setShowPreferences(false);
  };

  return <>
    <section className="story-hero" ref={heroRef} aria-roledescription="carousel" aria-label={t('heroTitle')}>
      {slides.map((place, index) => <article key={place.slug} className={`hero-slide ${index === slide ? 'active' : ''}`} aria-hidden={index !== slide} style={{ backgroundImage: `linear-gradient(90deg, rgba(8,18,13,.66), rgba(8,18,13,.05)), url(${place.image})` }}>
        <div className="hero-copy">
          <p className="eyebrow light">{t('heroEyebrow')} · {index + 1}/3</p>
          <h1>{index === 0 ? t('heroTitle') : place.name[locale]}</h1>
          <p>{place.line[locale]}</p>
          <Link className="primary-action light-action" to={`/place/${place.slug}`}>{t('heroCta')}<ArrowRight aria-hidden="true" /></Link>
        </div>
      </article>)}
      <div className="carousel-controls">
        <div role="group" aria-label={t('heroTitle')}>{slides.map((place, index) => <button key={place.slug} aria-label={`${place.name[locale]} ${index + 1}/3`} aria-current={index === slide} onClick={() => { setSlide(index); setPaused(true); }} />)}</div>
        <button className="pause-button" aria-label={paused ? t('play') : t('pause')} onClick={() => setPaused((value) => !value)}>{paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}<span>{paused ? t('play') : t('pause')}</span></button>
      </div>
    </section>

    {showPreferences && <section className="preference-panel" aria-labelledby="preference-title">
      <div><p className="eyebrow">{t('optional')}</p><h2 id="preference-title">{t('preferencesTitle')}</h2><p>{t('preferencesLead')}</p></div>
      <fieldset><legend className="sr-only">{t('preferencesTitle')}</legend>{interestKeys.map((key) => <label key={key} className={preferences.includes(key) ? 'selected' : ''}><input type="checkbox" checked={preferences.includes(key)} onChange={() => setPreferences((values) => values.includes(key) ? values.filter((value) => value !== key) : [...values, key])} /><span>{t(key)}</span></label>)}</fieldset>
      <div className="panel-actions"><button className="text-button" onClick={finishPreferences}>{t('skip')}</button><button className="primary-action" onClick={finishPreferences}>{t('save')}</button></div>
    </section>}

    <section className="editorial-section">
      <header><p className="eyebrow"><Sparkles aria-hidden="true" /> MarocoGO</p><h2>{t('selectedForYou')}</h2><p>{t('selectedLead')}</p></header>
      <div className="editorial-grid">{featured.slice(0, 3).map((place, index) => <Link to={`/place/${place.slug}`} className={`editorial-place place-${index + 1}`} key={place.slug}><img src={place.image} alt="" loading="lazy" /><span><small>{place.region}</small><strong>{place.name[locale]}</strong><em>{place.line[locale]}</em></span></Link>)}</div>
    </section>

    <section className="prepare-invitation"><div><p className="eyebrow">01—07</p><h2>{t('prepareTrip')}</h2><p>{t('prepareLead')}</p></div><Link className="primary-action" to="/prepare">{t('prepareTrip')}<ArrowRight aria-hidden="true" /></Link></section>
  </>;
}
