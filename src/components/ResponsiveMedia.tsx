import type { MediaRef } from '../countries/registry';
import type { VoyageGoLocale } from '../design-system/contracts';

export function ResponsiveMedia({ media, locale, className, eager = false }: {
  media: MediaRef;
  locale: VoyageGoLocale;
  className?: string;
  eager?: boolean;
}): React.JSX.Element {
  const base = `${import.meta.env.BASE_URL}${media.basePath}`;
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${base}-480.webp 480w, ${base}-960.webp 960w, ${base}-1600.webp 1600w`} sizes="(max-width: 48rem) 100vw, 80vw" />
      <img src={`${import.meta.env.BASE_URL}${media.fallbackPath}`} alt={media.alt[locale]} width="1200" height="800"
        loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />
    </picture>
  );
}
