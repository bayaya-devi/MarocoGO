import type { Locale } from '../i18n';

export type Place = {
  slug: string;
  name: Record<Locale, string>;
  line: Record<Locale, string>;
  description: Record<Locale, string>;
  region: string;
  coordinates: [number, number];
  tags: string[];
  image: string;
  source: string;
};

const all = <T,>(fr: T, ar: T, en: T, es: T, pt: T): Record<Locale, T> => ({ fr, ar, en, es, pt });

export const places: Place[] = [
  {
    slug: 'chefchaouen', name: all('Chefchaouen', 'شفشاون', 'Chefchaouen', 'Chefchaouen', 'Chefchaouen'),
    line: all('La ville bleue entre deux montagnes.', 'المدينة الزرقاء بين جبلين.', 'The blue city between two mountains.', 'La ciudad azul entre dos montañas.', 'A cidade azul entre duas montanhas.'),
    description: all('Une médina paisible, des ruelles bleues et les reliefs du Rif.', 'مدينة عتيقة هادئة وأزقة زرقاء وجبال الريف.', 'A peaceful medina, blue lanes and the Rif mountains.', 'Una medina serena, callejones azules y las montañas del Rif.', 'Uma medina tranquila, ruelas azuis e as montanhas do Rif.'),
    region: 'Tanger-Tétouan-Al Hoceïma', coordinates: [35.1688, -5.2636], tags: ['heritage', 'nature', 'rest'], image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chefchaouen-the-blue-city-of-morocco-with-palm-trees-and-the-mountain-view-in-the-backrgound.jpg?width=1800', source: 'Wikimedia Commons · Badr Rachadi · CC BY-SA 4.0',
  },
  {
    slug: 'merzouga', name: all('Merzouga', 'مرزوكة', 'Merzouga', 'Merzouga', 'Merzouga'),
    line: all('Le silence doré de l’Erg Chebbi.', 'سكون كثبان عرق الشبي الذهبية.', 'The golden silence of Erg Chebbi.', 'El silencio dorado de Erg Chebbi.', 'O silêncio dourado de Erg Chebbi.'),
    description: all('Aux portes du Sahara, les dunes changent avec chaque lumière.', 'عند أبواب الصحراء، تتغير الكثبان مع كل ضوء.', 'At the edge of the Sahara, dunes shift with every light.', 'A las puertas del Sáhara, las dunas cambian con cada luz.', 'Às portas do Saara, as dunas mudam com cada luz.'),
    region: 'Drâa-Tafilalet', coordinates: [31.0802, -4.0134], tags: ['nature', 'rest', 'family'], image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/The%20Merzouga%20dunes%20of%20Morocco.jpg?width=1800', source: 'Wikimedia Commons · Mustang Joe · CC0',
  },
  {
    slug: 'essaouira', name: all('Essaouira', 'الصويرة', 'Essaouira', 'Esauira', 'Essaouira'),
    line: all('L’Atlantique, le vent et les remparts.', 'المحيط والرياح والأسوار.', 'Atlantic air, wind and ramparts.', 'Atlántico, viento y murallas.', 'Atlântico, vento e muralhas.'),
    description: all('Une cité portuaire lumineuse, à parcourir lentement.', 'مدينة ساحلية مضيئة تُكتشف على مهل.', 'A bright port city, best explored slowly.', 'Una luminosa ciudad portuaria para recorrer sin prisa.', 'Uma luminosa cidade portuária para descobrir devagar.'),
    region: 'Marrakech-Safi', coordinates: [31.5085, -9.7595], tags: ['heritage', 'food', 'rest'], image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Remparts%20essaouira%2010-01-2007.jpg?width=1800', source: 'Wikimedia Commons · Tonperenstring · CC BY-SA 2.5',
  },
  {
    slug: 'marrakech', name: all('Marrakech', 'مراكش', 'Marrakech', 'Marrakech', 'Marraquexe'),
    line: all('Jardins, couleurs et savoir-faire.', 'حدائق وألوان وفنون أصيلة.', 'Gardens, colour and craft.', 'Jardines, color y artesanía.', 'Jardins, cor e artesanato.'),
    description: all('Une ville intense où les jardins répondent aux murs ocre.', 'مدينة نابضة حيث تتناغم الحدائق مع الأسوار الحمراء.', 'A vivid city where gardens meet ochre walls.', 'Una ciudad intensa donde los jardines se unen a los muros ocres.', 'Uma cidade intensa onde jardins encontram muralhas ocres.'),
    region: 'Marrakech-Safi', coordinates: [31.6295, -7.9811], tags: ['heritage', 'food', 'leisure'], image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Panoramica%20Fna%20-%20panoramio.jpg?width=1800', source: 'Wikimedia Commons · Creative Commons',
  },
  {
    slug: 'akchour', name: all('Akchour', 'أقشور', 'Akchour', 'Akchour', 'Akchour'),
    line: all('Rivières claires et sentiers du Rif.', 'أنهار صافية ومسالك جبال الريف.', 'Clear rivers and Rif trails.', 'Ríos claros y senderos del Rif.', 'Rios límpidos e trilhos do Rif.'),
    description: all('Un paysage de montagne propice à la marche et à la fraîcheur.', 'مشهد جبلي مثالي للمشي والاستمتاع بالهواء النقي.', 'A mountain landscape made for walking and fresh air.', 'Un paisaje de montaña para caminar y respirar aire fresco.', 'Uma paisagem de montanha para caminhar e respirar ar puro.'),
    region: 'Tanger-Tétouan-Al Hoceïma', coordinates: [35.2498, -5.1768], tags: ['nature', 'leisure'], image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cascade%20d%27Akchour.jpg?width=1800', source: 'Wikimedia Commons · Houssain tork · Creative Commons',
  },
  {
    slug: 'fes', name: all('Fès', 'فاس', 'Fez', 'Fez', 'Fez'),
    line: all('Un héritage vivant, ruelle après ruelle.', 'تراث حي في كل زقاق.', 'Living heritage, lane after lane.', 'Patrimonio vivo, calle tras calle.', 'Património vivo, rua após rua.'),
    description: all('Une médina historique faite de gestes, de matières et de patience.', 'مدينة عتيقة تاريخية تنبض بالحرف والمواد والصبر.', 'A historic medina shaped by craft, material and patience.', 'Una medina histórica hecha de oficios, materias y paciencia.', 'Uma medina histórica feita de ofícios, materiais e paciência.'),
    region: 'Fès-Meknès', coordinates: [34.0181, -5.0078], tags: ['heritage', 'food'], image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Panoramic%20view%20of%20the%20Medina%20of%20Fes.jpg?width=1800', source: 'Wikimedia Commons · Mustang Joe · CC0',
  },
];
