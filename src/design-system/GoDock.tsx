import { CircleUserRound, Compass, Map, Route, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/explorer', label: 'Explorer', icon: Compass },
  { to: '/preparer', label: 'Préparer', icon: Sparkles },
  { to: '/carte', label: 'Carte', icon: Map },
  { to: '/voyages', label: 'Voyage', icon: Route },
  { to: '/profil', label: 'Profil', icon: CircleUserRound },
] as const;

export function GoDock() {
  return <nav className="go-dock glass1" aria-label="Navigation principale">
    {items.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} aria-label={label}>
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </NavLink>)}
  </nav>;
}
