# MarocoGO Frontend V1

Frontend complet de démonstration pour MarocoGO : expérience Voyageur française + espace Prestataire français + constitution frontend.

## Installation
```bash
npm install
```

## Développement
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Preview
```bash
npm run preview
```

## Architecture
- `docs/FRONTEND-CONSTITUTION.md` : règles UX/UI officielles.
- `public/logo/` : logo complet et symbole officiels fournis.
- `src/data/` : données de démonstration séparées de l'UI.
- `src/components/` : composants partagés.
- `src/App.tsx` : routes et écrans V1.
- `src/styles/global.css` : design tokens, Liquid Glass, responsive et animations.

## Frontend Voyageur
Routes principales : accueil, explorer, destinations, expériences, hébergements, restaurants, guides, activités, carte, planificateur, favoris, recherche, authentification simulée, profil, voyages, réservations, aide et pages légales.

## Frontend Prestataire
Routes principales : connexion, tableau de bord, établissement, services, réservations, disponibilités, messages, avis, statistiques, promotions, médias, profil, paramètres et aide.

## Données mock
Les prix, notes, disponibilités et prestataires sont fictifs et servent uniquement à démontrer le frontend.

## Internationalisation
La V1 est en français. L'architecture CSS et les composants sont préparés pour l'ajout futur d'une vraie couche i18n et du RTL arabe.

## Préparation backend
L'authentification, les réservations, les messages et les sauvegardes sont simulés côté frontend. Ils devront être remplacés par des services API lors de l'intégration backend.
