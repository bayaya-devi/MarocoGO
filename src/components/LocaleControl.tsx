import { Languages } from 'lucide-react';
import { useI18n } from '../i18n';

export function LocaleControl({ tone = 'dark' }: { tone?: 'dark' | 'light' }): React.JSX.Element {
  const { locale, setLocale, localeNames, t } = useI18n();
  return (
    <label className="locale-control" data-tone={tone}>
      <Languages aria-hidden="true" />
      <span className="sr-only">{t('language')}</span>
      <select value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)} aria-label={t('language')}>
        {Object.entries(localeNames).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
      </select>
    </label>
  );
}
