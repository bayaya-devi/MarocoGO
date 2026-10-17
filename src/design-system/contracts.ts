export const voyageGoLocales = ['fr', 'en', 'ar'] as const;
export type VoyageGoLocale = (typeof voyageGoLocales)[number];

export const nationalHubIds = ['explore', 'plan', 'discover'] as const;
export type NationalHubId = (typeof nationalHubIds)[number];

export const experienceContexts = ['global', 'national', 'professional', 'administration'] as const;
export type ExperienceContext = (typeof experienceContexts)[number];

export const asyncUiStates = ['loading', 'empty', 'error', 'success'] as const;
export type AsyncUiState = (typeof asyncUiStates)[number];

export type NavigationLabels = {
  navigation: string;
  globalHome: string;
  countryHome: string;
  explore: string;
  plan: string;
  discover: string;
  more: string;
  closeMore: string;
  search: string;
  language: string;
  account: string;
};

export const navigationLabels: Record<VoyageGoLocale, NavigationLabels> = {
  fr: {
    navigation: 'Navigation du pays',
    globalHome: 'Accueil mondial VoyageGo',
    countryHome: 'Accueil du pays',
    explore: 'Explorer',
    plan: 'Planifier',
    discover: 'Découvrir',
    more: 'Plus',
    closeMore: 'Fermer les options',
    search: 'Recherche',
    language: 'Langue',
    account: 'Compte',
  },
  en: {
    navigation: 'Country navigation',
    globalHome: 'VoyageGo world home',
    countryHome: 'Country home',
    explore: 'Explore',
    plan: 'Plan',
    discover: 'Discover',
    more: 'More',
    closeMore: 'Close options',
    search: 'Search',
    language: 'Language',
    account: 'Account',
  },
  ar: {
    navigation: 'التنقل داخل البلد',
    globalHome: 'الصفحة العالمية لرحلات غو',
    countryHome: 'الصفحة الرئيسية للبلد',
    explore: 'استكشف',
    plan: 'خطط',
    discover: 'اكتشف',
    more: 'المزيد',
    closeMore: 'إغلاق الخيارات',
    search: 'بحث',
    language: 'اللغة',
    account: 'الحساب',
  },
};
