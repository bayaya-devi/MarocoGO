import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function InfoPage() {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const title = pathname.includes('privacy') ? t('footerPrivacy') : pathname.includes('contact') ? t('contact') : t('legal');
  return <article className="info-page"><p className="eyebrow">MarocoGO · VoyageGo</p><h1>{title}</h1><p>{t('legalPlaceholder')}</p><section><h2>{t('privacy')}</h2><p>{t('authUnavailable')}</p><p>{t('directUnavailable')}</p></section><Link className="secondary-action" to="/">{t('goHome')}</Link></article>;
}
