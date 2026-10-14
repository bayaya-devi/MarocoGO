# MarocoGO

Portail national marocain de l’écosystème VoyageGo. Cette version transforme le prototype initial en une expérience frontend premium, multilingue et installable, tout en restant honnête sur les services externes qui ne sont pas encore connectés.

## Fonctionnalités opérationnelles

- Accueil éditorial avec carrousel accessible, pause et préférences facultatives.
- Navigation supérieure unique, compacte et rétractable.
- Cinq langues : français, arabe RTL, anglais, espagnol et portugais.
- Explorer avec carte Leaflet/OpenStreetMap réelle, recherche locale et géolocalisation sur demande.
- Préparation guidée en sept étapes et mode libre utilisant le même modèle de voyage.
- Carnet sauvegardé localement, vues simple/détaillée, réorganisation sans glisser-déposer et export PDF.
- Favoris et ajout de lieux au voyage.
- Service worker et reprise hors connexion de l’application et du carnet déjà chargé.
- Interface prestataire responsive clairement identifiée comme non connectée.
- Pages légales avec champs institutionnels restant à compléter.

## Fonctions préparées, non connectées

Les comptes VoyageGo, réservations, paiements, offres partenaires, taux de change, itinéraires routiers, notifications serveur, synchronisation multi-appareils et liens privés exigent des services backend validés. L’interface ne simule aucune confirmation réelle.

## Développement

```bash
npm ci
npm run dev
npm test
npm run build
npm run test:e2e
```

Le projet utilise React, TypeScript, Vite, React Router, Leaflet, jsPDF, Vitest, Playwright et axe-core. GitHub Pages publie le contenu de `dist` sous `/MarocoGO/` via `.github/workflows/deploy.yml`.

## Données et confidentialité

Le brouillon de voyage, la langue et les préférences restent dans le stockage local du navigateur. Aucun mot de passe, paiement ou jeton d’authentification n’est collecté. Consultez [CREDITS.md](CREDITS.md) pour les licences des visuels et de la cartographie.
