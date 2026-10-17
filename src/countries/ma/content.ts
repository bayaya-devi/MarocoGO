import { media, type LocalizedText, type MediaRef } from '../registry';

export type MoroccoPlace = {
  slug: string;
  name: LocalizedText;
  line: LocalizedText;
  description: LocalizedText;
  region: LocalizedText;
  coordinates: [number, number];
  tags: readonly string[];
  media: MediaRef;
};

const text = (fr: string, en: string, ar: string): LocalizedText => ({ fr, en, ar });

export const moroccoPlaces: readonly MoroccoPlace[] = [
  {
    slug: 'merzouga', name: text('Merzouga', 'Merzouga', 'مرزوكة'),
    line: text('Le silence doré de l’Erg Chebbi.', 'The golden silence of Erg Chebbi.', 'سكون كثبان عرق الشبي الذهبية.'),
    description: text('Aux portes du Sahara, les dunes changent avec chaque lumière.', 'At the edge of the Sahara, the dunes change with every light.', 'عند أبواب الصحراء، تتغير الكثبان مع كل ضوء.'),
    region: text('Drâa-Tafilalet', 'Drâa-Tafilalet', 'درعة تافيلالت'), coordinates: [31.0802, -4.0134], tags: ['nature', 'sahara'], media: media.merzouga,
  },
  {
    slug: 'fes', name: text('Fès', 'Fez', 'فاس'),
    line: text('Une médina qui se lit depuis les hauteurs.', 'A medina revealed from the heights.', 'مدينة عتيقة تتكشف من المرتفعات.'),
    description: text('Un paysage urbain historique de toits, de minarets et de collines.', 'A historic urban landscape of roofs, minarets and hills.', 'مشهد حضري تاريخي من الأسطح والمآذن والتلال.'),
    region: text('Fès-Meknès', 'Fez-Meknes', 'فاس مكناس'), coordinates: [34.0181, -5.0078], tags: ['heritage', 'architecture'], media: media.fes,
  },
  {
    slug: 'essaouira', name: text('Essaouira', 'Essaouira', 'الصويرة'),
    line: text('L’Atlantique, le vent et les remparts.', 'Atlantic air, wind and ramparts.', 'المحيط والرياح والأسوار.'),
    description: text('Une cité fortifiée dont la pierre rencontre directement l’océan.', 'A fortified city where stone meets the ocean.', 'مدينة محصنة تلتقي فيها الحجارة بالمحيط.'),
    region: text('Marrakech-Safi', 'Marrakesh-Safi', 'مراكش آسفي'), coordinates: [31.5085, -9.7595], tags: ['coast', 'heritage'], media: media.essaouira,
  },
  {
    slug: 'akchour', name: text('Akchour', 'Akchour', 'أقشور'),
    line: text('L’eau claire au cœur du Rif.', 'Clear water in the heart of the Rif.', 'مياه صافية في قلب الريف.'),
    description: text('Une vallée rocheuse et boisée façonnée par les cascades.', 'A rocky, wooded valley shaped by waterfalls.', 'وادٍ صخري وغابي شكلته الشلالات.'),
    region: text('Tanger-Tétouan-Al Hoceïma', 'Tangier-Tetouan-Al Hoceima', 'طنجة تطوان الحسيمة'), coordinates: [35.2498, -5.1768], tags: ['nature', 'mountains'], media: media.akchour,
  },
] as const;

export const discoveryTopics = [
  { id: 'culture', title: text('Culture', 'Culture', 'الثقافة'), description: text('Arts, matières et traditions dans leur contexte.', 'Arts, materials and traditions in context.', 'الفنون والمواد والتقاليد في سياقها.') },
  { id: 'heritage', title: text('Patrimoine', 'Heritage', 'التراث'), description: text('Médinas, ksour et architectures historiques.', 'Medinas, ksour and historic architecture.', 'المدن العتيقة والقصور والعمارة التاريخية.') },
  { id: 'monuments', title: text('Monuments', 'Monuments', 'المعالم'), description: text('Repères documentés et géographiquement situés.', 'Documented, geographically located landmarks.', 'معالم موثقة ومحددة جغرافياً.') },
  { id: 'gastronomy', title: text('Gastronomie', 'Food', 'فن الطبخ'), description: text('Produits, recettes et savoir-faire régionaux.', 'Regional produce, recipes and craft.', 'منتجات ووصفات ومهارات إقليمية.') },
  { id: 'languages', title: text('Langues', 'Languages', 'اللغات'), description: text('Arabe, amazighe et usages locaux.', 'Arabic, Amazigh and local usage.', 'العربية والأمازيغية والاستعمالات المحلية.') },
  { id: 'cities', title: text('Villes et quartiers', 'Cities and districts', 'المدن والأحياء'), description: text('Comprendre les échelles et les ambiances urbaines.', 'Understand urban scales and atmospheres.', 'فهم المقاييس والأجواء الحضرية.') },
  { id: 'activities', title: text('Activités', 'Activities', 'الأنشطة'), description: text('Marcher, observer et parcourir sans fausse disponibilité.', 'Walk, observe and explore without fake availability.', 'المشي والاستكشاف دون توفر وهمي.') },
  { id: 'practical', title: text('Informations pratiques', 'Practical information', 'معلومات عملية'), description: text('Repères indicatifs à vérifier avant le départ.', 'Indicative guidance to verify before departure.', 'إرشادات ينبغي التحقق منها قبل السفر.') },
] as const;

export function getMoroccoPlace(slug: string): MoroccoPlace | undefined {
  return moroccoPlaces.find((place) => place.slug === slug);
}
