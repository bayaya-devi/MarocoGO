import type { VoyageGoLocale } from '../design-system/contracts';

export type LocalizedText = Record<VoyageGoLocale, string>;

export type MediaRef = {
  id: string;
  countryCode: string;
  basePath: string;
  fallbackPath: string;
  alt: LocalizedText;
  credit: string;
  license: string;
  sourceUrl: string;
  reviewed: true;
  containsPeople: false;
  containsAnimals: false;
};

export type CountryStatus = 'published' | 'preview';

export type Country = {
  code: string;
  slug: string;
  name: LocalizedText;
  coordinates: readonly [latitude: number, longitude: number];
  status: CountryStatus;
  route?: string;
  landscape?: MediaRef;
};

export const media = {
  merzouga: {
    id: 'ma-merzouga-dunes',
    countryCode: 'MA',
    basePath: 'media/merzouga',
    fallbackPath: 'media/merzouga-fallback.jpg',
    alt: { fr: 'Dunes de Merzouga éclairées par une lumière dorée', en: 'Merzouga dunes in golden light', ar: 'كثبان مرزوكة تحت ضوء ذهبي' },
    credit: 'Mustang Joe',
    license: 'CC0 1.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:The_Merzouga_dunes_of_Morocco.jpg',
    reviewed: true,
    containsPeople: false,
    containsAnimals: false,
  },
  fes: {
    id: 'ma-fes-panorama',
    countryCode: 'MA',
    basePath: 'media/fes',
    fallbackPath: 'media/fes-fallback.jpg',
    alt: { fr: 'Vue panoramique de la médina de Fès', en: 'Panoramic view of the medina of Fez', ar: 'منظر بانورامي لمدينة فاس العتيقة' },
    credit: 'Mustang Joe',
    license: 'CC0 1.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Panoramic_view_of_the_Medina_of_Fes.jpg',
    reviewed: true,
    containsPeople: false,
    containsAnimals: false,
  },
  essaouira: {
    id: 'ma-essaouira-ramparts',
    countryCode: 'MA',
    basePath: 'media/essaouira',
    fallbackPath: 'media/essaouira-fallback.jpg',
    alt: { fr: 'Remparts d’Essaouira face à l’océan Atlantique', en: 'Essaouira ramparts facing the Atlantic Ocean', ar: 'أسوار الصويرة المطلة على المحيط الأطلسي' },
    credit: 'Tonperenstring',
    license: 'CC BY-SA 2.5',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Remparts_essaouira_10-01-2007.jpg',
    reviewed: true,
    containsPeople: false,
    containsAnimals: false,
  },
  akchour: {
    id: 'ma-akchour-falls',
    countryCode: 'MA',
    basePath: 'media/akchour',
    fallbackPath: 'media/akchour-fallback.jpg',
    alt: { fr: 'Cascade d’Akchour entourée de roche et de végétation', en: 'Akchour waterfall surrounded by rock and vegetation', ar: 'شلال أقشور محاط بالصخور والنباتات' },
    credit: 'Houssain tork',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cascade_d%27Akchour.jpg',
    reviewed: true,
    containsPeople: false,
    containsAnimals: false,
  },
} satisfies Record<string, MediaRef>;

const names = (fr: string, en: string, ar: string): LocalizedText => ({ fr, en, ar });

export const countries: readonly Country[] = [
  { code: 'MA', slug: 'ma', name: names('Maroc', 'Morocco', 'المغرب'), coordinates: [31.8, -7.1], status: 'published', route: '/ma', landscape: media.merzouga },
  { code: 'FR', slug: 'fr', name: names('France', 'France', 'فرنسا'), coordinates: [46.2, 2.2], status: 'preview' },
  { code: 'JP', slug: 'jp', name: names('Japon', 'Japan', 'اليابان'), coordinates: [36.2, 138.3], status: 'preview' },
  { code: 'BR', slug: 'br', name: names('Brésil', 'Brazil', 'البرازيل'), coordinates: [-14.2, -51.9], status: 'preview' },
  { code: 'CA', slug: 'ca', name: names('Canada', 'Canada', 'كندا'), coordinates: [56.1, -106.3], status: 'preview' },
  { code: 'MX', slug: 'mx', name: names('Mexique', 'Mexico', 'المكسيك'), coordinates: [23.6, -102.5], status: 'preview' },
  { code: 'NO', slug: 'no', name: names('Norvège', 'Norway', 'النرويج'), coordinates: [60.5, 8.5], status: 'preview' },
  { code: 'EG', slug: 'eg', name: names('Égypte', 'Egypt', 'مصر'), coordinates: [26.8, 30.8], status: 'preview' },
  { code: 'IN', slug: 'in', name: names('Inde', 'India', 'الهند'), coordinates: [20.6, 79], status: 'preview' },
  { code: 'ID', slug: 'id', name: names('Indonésie', 'Indonesia', 'إندونيسيا'), coordinates: [-0.8, 113.9], status: 'preview' },
  { code: 'AU', slug: 'au', name: names('Australie', 'Australia', 'أستراليا'), coordinates: [-25.3, 133.8], status: 'preview' },
  { code: 'NZ', slug: 'nz', name: names('Nouvelle-Zélande', 'New Zealand', 'نيوزيلندا'), coordinates: [-40.9, 174.9], status: 'preview' },
] as const;

export function getCountry(code: string): Country | undefined {
  return countries.find((country) => country.code === code.toUpperCase());
}
