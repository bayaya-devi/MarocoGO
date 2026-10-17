import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { media } from '../countries/registry';
import { LocaleControl } from '../components/LocaleControl';
import { useI18n, type TranslationKey } from '../i18n';

const sections: Record<string, TranslationKey> = {
  about: 'about', contact: 'contact', help: 'help', legal: 'legal', privacy: 'privacy',
  terms: 'terms', cookies: 'cookies', credits: 'credits',
};

export default function Institutional(): React.JSX.Element {
  const { section = 'about' } = useParams();
  const { t } = useI18n();
  const key = sections[section] ?? 'about';
  return (
    <div className="info-view">
      <header><Link to="/" className="voyagego-wordmark">Voyage<span>Go</span></Link><LocaleControl /></header>
      <main id="main-content"><p className="kicker">{t('information')}</p><h1>{t(key)}</h1>
        {key === 'credits' ? <><p>{t('mediaCreditsIntro')}</p><ul className="credit-list">{Object.values(media).map((item) => <li key={item.id}><strong>{item.alt.fr}</strong><span>{item.credit} · {item.license}</span><a href={item.sourceUrl} target="_blank" rel="noreferrer">Wikimedia Commons</a></li>)}</ul></>
          : <p>{t('infoPreparation')}</p>}
        <Link className="text-link" to="/"><ArrowLeft aria-hidden="true" />{t('backWorld')}</Link>
      </main>
    </div>
  );
}
