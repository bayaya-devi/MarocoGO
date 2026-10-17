# VoyageGo

VoyageGo est une expérience mondiale de voyage. L’accueil permet de manipuler une planisphère légère, de sélectionner des pays et d’entrer dans les expériences nationales publiées. Le Maroc est le premier pays actif de cette nouvelle architecture.

## Expériences opérationnelles

- Accueil mondial cinématographique avec globe SVG manipulable, zoom, rotation et liste de pays accessible sans WebGL.
- Registre extensible de pays avec statuts explicites : Maroc publié, autres pays en préparation.
- Paysage national uniquement lorsqu’un média authentique et licencié a été validé.
- Expérience Maroc avec les pôles Explorer, Planifier et Découvrir.
- Navigation nationale flottante, responsive, distincte du retour mondial.
- Recherche Maroc, bascule FR/EN/AR, arabe RTL et VoyageGo Info.
- Carte Leaflet/OpenStreetMap des destinations marocaines.
- Brouillon de voyage local migré depuis l’ancienne clé MarocoGO.
- Médias responsives WebP avec JPEG de repli, sans personne ni animal visible.

## Limites explicites

Les comptes, réservations, paiements, disponibilités, prix, synchronisation multi-appareils et services prestataires ne sont pas connectés. L’interface ne simule aucun succès transactionnel. Les autres pays restent sélectionnables mais n’ouvrent aucune ancienne expérience nationale.

## Développement

    npm ci
    npm run dev
    npm test
    npm run build
    npm run test:e2e

Le projet utilise React, TypeScript, Vite, React Router, Leaflet, Vitest, Playwright et axe-core. GitHub Pages publie le dossier dist sous le chemin technique /MarocoGO/ via .github/workflows/deploy.yml.

## Documentation

- [Frontend Constitution](FRONTEND-CONSTITUTION.md)
- [Architecture cible](docs/01-ARCHITECTURE-CIBLE.md)
- [Design system](docs/design-system/README.md)
- [Crédits média](CREDITS.md)
- [Rapport d’implémentation du Prompt 03](PROMPT-03-REPORT.md)
