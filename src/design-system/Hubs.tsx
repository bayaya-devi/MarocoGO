import { BedDouble, CalendarDays, Compass, Languages, Map, MapPin, Route, Sparkles, TicketCheck, Utensils } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

type HubItem = { to: string; label: string; description: string; icon: LucideIcon };

const prepareItems: HubItem[] = [
  { to: '/planifier', label: 'Itinéraire', description: 'Construire un séjour à votre rythme.', icon: Route },
  { to: '/hebergements', label: 'Hébergements', description: 'Retrouver les adresses adaptées au voyage.', icon: BedDouble },
  { to: '/reservations', label: 'Réservations', description: 'Regrouper les éléments déjà choisis.', icon: TicketCheck },
  { to: '/voyages', label: 'Mon voyage', description: 'Continuer une préparation en cours.', icon: CalendarDays },
];

const exploreItems: HubItem[] = [
  { to: '/destinations', label: 'Destinations', description: 'Villes, régions et paysages.', icon: MapPin },
  { to: '/experiences', label: 'Expériences', description: 'Gestes, culture et rencontres.', icon: Sparkles },
  { to: '/restaurants', label: 'Gastronomie', description: 'Tables, cafés et savoir-faire.', icon: Utensils },
  { to: '/carte', label: 'Guide interactif', description: 'Lire le pays dans son contexte.', icon: Map },
  { to: '/guides', label: 'Guides', description: 'Explorer avec une voix locale.', icon: Languages },
  { to: '/explorer', label: 'Toutes les envies', description: 'Laisser l’inspiration ouvrir le chemin.', icon: Compass },
];

function HubLinks({ items }: { items: HubItem[] }) {
  return <div className="hub-links">{items.map(({ to, label, description, icon: Icon }) =>
    <NavLink key={`${to}-${label}`} to={to} className="hub-link">
      <Icon aria-hidden="true" />
      <span><strong>{label}</strong><small>{description}</small></span>
    </NavLink>)}</div>;
}

export function PrepareHub() {
  return <section className="hub-scene prepare-hub">
    <div className="hub-intro"><p className="eyebrow">PRÉPARER</p><h1>Quelques décisions.<br />Un voyage qui tient ensemble.</h1><p>Les outils utiles apparaissent au moment où vous en avez besoin.</p></div>
    <HubLinks items={prepareItems} />
  </section>;
}

export function ExplorerHub() {
  return <section className="hub-scene explorer-hub">
    <div className="hub-intro"><p className="eyebrow">EXPLORER</p><h1>Le Maroc se découvre par couches.</h1><p>Commencez par une ville, une envie ou une histoire.</p></div>
    <HubLinks items={exploreItems} />
  </section>;
}
