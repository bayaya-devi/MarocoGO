import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { voyageGoLocales, type VoyageGoLocale } from './design-system/contracts';

export type Locale = VoyageGoLocale;

const fr = {
  skip: 'Aller au contenu', language: 'Langue', globalTitle: 'Le monde vous attend', globalKicker: 'VoyageGo · Accueil mondial',
  globalLead: 'Faites tourner le monde, choisissez un pays et entrez dans une expérience construite avec soin.',
  globeLabel: 'Globe interactif des pays VoyageGo', rotateLeft: 'Tourner vers l’ouest', rotateRight: 'Tourner vers l’est',
  zoomIn: 'Agrandir le globe', zoomOut: 'Réduire le globe', resetGlobe: 'Réinitialiser le globe',
  globeLoading: 'Chargement de la Terre en 3D…', globeUnavailable: 'Le rendu 3D n’est pas disponible sur cet appareil.',
  globeFallback: 'Utiliser la sélection de pays accessible', retry3d: 'Réessayer la 3D',
  chooseCountry: 'Choisir un pays', countrySearch: 'Rechercher un pays', available: 'Expérience disponible',
  comingSoon: 'Expérience en préparation', enterCountry: 'Entrer au Maroc',
  landscapeUnavailable: 'Aucun paysage national vérifié n’est publié pour ce pays.',
  worldSignature: 'VoyageGo — une fenêtre ouverte sur le monde.', countrySignature: 'VoyageGo Maroc — le pays, dans toute sa profondeur.',
  voyageInfo: 'VoyageGo Info', information: 'Informations VoyageGo', close: 'Fermer', about: 'À propos', contact: 'Contact',
  help: 'Aide', legal: 'Mentions légales', privacy: 'Confidentialité', terms: 'Conditions d’utilisation',
  cookies: 'Gestion des cookies', credits: 'Crédits photographiques', moroccoKicker: 'VoyageGo · Maroc',
  moroccoTitle: 'Le Maroc, de l’horizon au détail.',
  moroccoLead: 'Paysages, villes et récits se répondent dans une expérience unique, intégrée à VoyageGo.',
  explore: 'Explorer', plan: 'Planifier', discover: 'Découvrir',
  exploreLead: 'Lire les régions, comparer les atmosphères et situer les destinations.',
  planLead: 'Construire un brouillon de voyage sans compte, réservation ni paiement simulé.',
  discoverLead: 'Approcher le patrimoine, les langues et les savoir-faire dans leur géographie.',
  open: 'Ouvrir', destinations: 'Destinations marocaines',
  destinationsLead: 'Une sélection éditoriale vérifiée, structurée pour s’étendre sans devenir un catalogue.',
  searchPlaces: 'Rechercher une destination', noResults: 'Aucune destination ne correspond à cette recherche.',
  mapLabel: 'Carte des destinations marocaines', startPlan: 'Commencer mon parcours',
  localDraftNotice: 'Ce brouillon reste uniquement sur cet appareil. Il n’est ni synchronisé, ni réservé.',
  destination: 'Destination', startDate: 'Date d’arrivée', endDate: 'Date de départ', travellers: 'Voyageurs',
  transport: 'Transport', accommodation: 'Hébergement', activities: 'Activités', itinerary: 'Itinéraire',
  budget: 'Budget indicatif', notes: 'Notes', savedLocal: 'Brouillon enregistré localement',
  transportPlaceholder: 'Ex. train, voiture, transports locaux', accommodationPlaceholder: 'Préférences, sans réservation',
  activitiesPlaceholder: 'Idées à vérifier avant le départ', itineraryPlaceholder: 'Étapes et rythme envisagés',
  budgetPlaceholder: 'Montant personnel, sans prix simulé', discoverTitle: 'Comprendre avant de parcourir.',
  discoverIntro: 'Des portes d’entrée éditoriales, sans prétendre remplacer les sources locales ou institutionnelles.',
  details: 'Voir le lieu', addToTrip: 'Ajouter au brouillon', addedToTrip: 'Ajouté au brouillon',
  backMorocco: 'Retour à l’accueil Maroc', backWorld: 'Retour à l’accueil mondial',
  accountUnavailable: 'Les comptes VoyageGo ne sont pas encore connectés. Le brouillon local reste utilisable sans compte.',
  searchSite: 'Recherche VoyageGo Maroc', searchHint: 'Rechercher Fès, désert, patrimoine…',
  notFound: 'Cette page n’existe pas.',
  infoPreparation: 'Cette section institutionnelle est préparée mais doit être validée avant toute exploitation commerciale.',
  mediaCreditsIntro: 'Médias authentiques audités : aucun humain ni animal visible. Les licences et sources sont indiquées ci-dessous.',
};

export type TranslationKey = keyof typeof fr;

const en: Record<TranslationKey, string> = {
  skip: 'Skip to content', language: 'Language', globalTitle: 'The world is waiting', globalKicker: 'VoyageGo · World home',
  globalLead: 'Turn the world, choose a country and enter an experience built with care.', globeLabel: 'Interactive VoyageGo country globe',
  rotateLeft: 'Rotate west', rotateRight: 'Rotate east', zoomIn: 'Zoom in', zoomOut: 'Zoom out', resetGlobe: 'Reset globe',
  globeLoading: 'Loading the 3D Earth…', globeUnavailable: '3D rendering is not available on this device.',
  globeFallback: 'Use the accessible country selector', retry3d: 'Try 3D again',
  chooseCountry: 'Choose a country', countrySearch: 'Search for a country', available: 'Experience available',
  comingSoon: 'Experience in preparation', enterCountry: 'Enter Morocco',
  landscapeUnavailable: 'No verified national landscape is published for this country.',
  worldSignature: 'VoyageGo — a window onto the world.', countrySignature: 'VoyageGo Morocco — the country in all its depth.',
  voyageInfo: 'VoyageGo Info', information: 'VoyageGo information', close: 'Close', about: 'About', contact: 'Contact', help: 'Help',
  legal: 'Legal notice', privacy: 'Privacy', terms: 'Terms of use', cookies: 'Cookie management', credits: 'Photo credits',
  moroccoKicker: 'VoyageGo · Morocco', moroccoTitle: 'Morocco, from horizon to detail.',
  moroccoLead: 'Landscapes, cities and stories come together in one experience within VoyageGo.',
  explore: 'Explore', plan: 'Plan', discover: 'Discover',
  exploreLead: 'Read the regions, compare atmospheres and locate destinations.',
  planLead: 'Build a trip draft without an account, booking or simulated payment.',
  discoverLead: 'Approach heritage, languages and craft through their geography.', open: 'Open',
  destinations: 'Moroccan destinations', destinationsLead: 'A verified editorial selection, structured to grow without becoming a catalogue.',
  searchPlaces: 'Search destinations', noResults: 'No destination matches this search.', mapLabel: 'Map of Moroccan destinations',
  startPlan: 'Start planning', localDraftNotice: 'This draft stays on this device only. It is not synced or booked.',
  destination: 'Destination', startDate: 'Arrival date', endDate: 'Departure date', travellers: 'Travellers',
  transport: 'Transport', accommodation: 'Accommodation', activities: 'Activities', itinerary: 'Itinerary',
  budget: 'Indicative budget', notes: 'Notes', savedLocal: 'Draft saved locally',
  transportPlaceholder: 'E.g. train, car, local transport', accommodationPlaceholder: 'Preferences, without booking',
  activitiesPlaceholder: 'Ideas to verify before departure', itineraryPlaceholder: 'Planned stages and pace',
  budgetPlaceholder: 'Personal amount, without simulated prices', discoverTitle: 'Understand before you travel.',
  discoverIntro: 'Editorial entry points that do not claim to replace local or institutional sources.', details: 'View place',
  addToTrip: 'Add to draft', addedToTrip: 'Added to draft', backMorocco: 'Back to Morocco home', backWorld: 'Back to world home',
  accountUnavailable: 'VoyageGo accounts are not connected yet. The local draft remains available without an account.',
  searchSite: 'Search VoyageGo Morocco', searchHint: 'Search Fez, desert, heritage…', notFound: 'This page does not exist.',
  infoPreparation: 'This institutional section is prepared but requires validation before commercial use.',
  mediaCreditsIntro: 'Audited authentic media: no visible people or animals. Licences and sources are listed below.',
};

const ar: Record<TranslationKey, string> = {
  skip: 'انتقل إلى المحتوى', language: 'اللغة', globalTitle: 'العالم ينتظرك', globalKicker: 'فوياج غو · الصفحة العالمية',
  globalLead: 'حرّك العالم واختر بلداً وادخل تجربة صُممت بعناية.', globeLabel: 'كرة تفاعلية لبلدان فوياج غو',
  rotateLeft: 'تدوير نحو الغرب', rotateRight: 'تدوير نحو الشرق', zoomIn: 'تكبير الكرة', zoomOut: 'تصغير الكرة',
  resetGlobe: 'إعادة ضبط الكرة', chooseCountry: 'اختر بلداً', countrySearch: 'ابحث عن بلد', available: 'التجربة متاحة',
  globeLoading: 'جارٍ تحميل الأرض ثلاثية الأبعاد…', globeUnavailable: 'العرض ثلاثي الأبعاد غير متاح على هذا الجهاز.',
  globeFallback: 'استخدم قائمة البلدان المتاحة', retry3d: 'أعد محاولة العرض ثلاثي الأبعاد',
  comingSoon: 'التجربة قيد الإعداد', enterCountry: 'ادخل إلى المغرب', landscapeUnavailable: 'لا توجد صورة وطنية موثقة منشورة لهذا البلد.',
  worldSignature: 'فوياج غو — نافذة مفتوحة على العالم.', countrySignature: 'فوياج غو المغرب — البلد بكل أعماقه.',
  voyageInfo: 'معلومات فوياج غو', information: 'معلومات فوياج غو', close: 'إغلاق', about: 'من نحن', contact: 'اتصل بنا',
  help: 'مساعدة', legal: 'إشعار قانوني', privacy: 'الخصوصية', terms: 'شروط الاستخدام',
  cookies: 'إدارة ملفات الارتباط', credits: 'حقوق الصور', moroccoKicker: 'فوياج غو · المغرب',
  moroccoTitle: 'المغرب، من الأفق إلى التفاصيل.',
  moroccoLead: 'تتجاوب المناظر والمدن والحكايات في تجربة واحدة داخل فوياج غو.',
  explore: 'استكشف', plan: 'خطط', discover: 'اكتشف', exploreLead: 'اقرأ الجهات وقارن الأجواء وحدد الوجهات.',
  planLead: 'أنشئ مسودة رحلة دون حساب أو حجز أو دفع وهمي.',
  discoverLead: 'اقترب من التراث واللغات والمهارات ضمن جغرافيتها.', open: 'افتح',
  destinations: 'وجهات مغربية', destinationsLead: 'اختيار تحريري موثق قابل للتوسع دون أن يتحول إلى كتالوج.',
  searchPlaces: 'ابحث عن وجهة', noResults: 'لا توجد وجهة مطابقة للبحث.', mapLabel: 'خريطة الوجهات المغربية',
  startPlan: 'ابدأ التخطيط', localDraftNotice: 'تبقى هذه المسودة على هذا الجهاز فقط. لا تتم مزامنتها ولا حجزها.',
  destination: 'الوجهة', startDate: 'تاريخ الوصول', endDate: 'تاريخ المغادرة', travellers: 'المسافرون',
  transport: 'النقل', accommodation: 'الإقامة', activities: 'الأنشطة', itinerary: 'المسار',
  budget: 'ميزانية تقديرية', notes: 'ملاحظات', savedLocal: 'حُفظت المسودة محلياً',
  transportPlaceholder: 'مثال: قطار، سيارة، نقل محلي', accommodationPlaceholder: 'تفضيلات دون حجز',
  activitiesPlaceholder: 'أفكار للتحقق قبل السفر', itineraryPlaceholder: 'المراحل والإيقاع المقترحان',
  budgetPlaceholder: 'مبلغ شخصي دون أسعار وهمية', discoverTitle: 'افهم قبل أن تسافر.',
  discoverIntro: 'مداخل تحريرية لا تدعي أنها بديل للمصادر المحلية أو الرسمية.', details: 'عرض المكان',
  addToTrip: 'أضف إلى المسودة', addedToTrip: 'أضيف إلى المسودة', backMorocco: 'العودة إلى صفحة المغرب',
  backWorld: 'العودة إلى الصفحة العالمية',
  accountUnavailable: 'حسابات فوياج غو غير متصلة بعد. تبقى المسودة المحلية متاحة دون حساب.',
  searchSite: 'البحث في فوياج غو المغرب', searchHint: 'ابحث عن فاس، الصحراء، التراث…',
  notFound: 'هذه الصفحة غير موجودة.',
  infoPreparation: 'هذا القسم المؤسسي مُعدّ لكنه يحتاج إلى المصادقة قبل أي استخدام تجاري.',
  mediaCreditsIntro: 'صور أصلية مدققة: لا أشخاص ولا حيوانات ظاهرة. التراخيص والمصادر مذكورة أدناه.',
};

export const labels: Record<Locale, Record<TranslationKey, string>> = { fr, en, ar };
export const supported = voyageGoLocales;
export const localeNames: Record<Locale, string> = { fr: 'Français', en: 'English', ar: 'العربية' };

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  localeNames: typeof localeNames;
} | null>(null);

const STORAGE_KEY = 'voyagego.locale.v1';

function readLocale(): Locale {
  const current = localStorage.getItem(STORAGE_KEY);
  if (voyageGoLocales.includes(current as Locale)) return current as Locale;
  const legacy = localStorage.getItem('marocogo.locale');
  return voyageGoLocales.includes(legacy as Locale) ? legacy as Locale : 'fr';
}

export function I18nProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [locale, setLocaleState] = useState<Locale>(readLocale);
  const setLocale = (value: Locale) => {
    localStorage.setItem(STORAGE_KEY, value);
    setLocaleState(value);
  };
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);
  const value = useMemo(() => ({ locale, setLocale, t: (key: TranslationKey) => labels[locale][key], localeNames }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}
