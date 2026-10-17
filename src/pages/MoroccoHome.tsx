import { ArrowRight, Compass, Route, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { media } from '../countries/registry';
import { ResponsiveMedia } from '../components/ResponsiveMedia';
import { useI18n } from '../i18n';

export default function MoroccoHome(): React.JSX.Element {
  const { locale, t } = useI18n();
  const hubs = [
    { to: '/ma/explorer', title: t('explore'), lead: t('exploreLead'), icon: Compass, media: media.akchour },
    { to: '/ma/planifier', title: t('plan'), lead: t('planLead'), icon: Route, media: media.essaouira },
    { to: '/ma/decouvrir', title: t('discover'), lead: t('discoverLead'), icon: Sparkles, media: media.fes },
  ];
  return (
    <div className="morocco-home">
      <section className="country-hero">
        <ResponsiveMedia media={media.merzouga} locale={locale} className="country-hero-media" eager />
        <div className="country-hero-copy"><p className="kicker">{t('moroccoKicker')}</p><h1>{t('moroccoTitle')}</h1><p>{t('moroccoLead')}</p></div>
      </section>
      <section className="hub-journey" aria-label={t('moroccoTitle')}>
        {hubs.map(({ to, title, lead, icon: Icon, media: hubMedia }, index) => (
          <article className="hub-scene" key={to}>
            <ResponsiveMedia media={hubMedia} locale={locale} />
            <div><span className="hub-number">0{index + 1}</span><Icon aria-hidden="true" /><h2>{title}</h2><p>{lead}</p>
              <Link to={to}>{t('open')}<ArrowRight aria-hidden="true" /></Link></div>
          </article>
        ))}
      </section>
    </div>
  );
}
