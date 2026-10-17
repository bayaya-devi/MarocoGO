# VoyageGo — audit d'initialisation

**Phase :** Prompt 01/03 — cadrage uniquement  
**Date :** 17 octobre 2026  
**Portée :** état du dépôt `codex/voyagego-foundation` avant toute migration fonctionnelle.

## Décision de cadrage

Le dépôt est aujourd'hui une application nationale MarocoGO, malgré quelques libellés `VoyageGo`. Il ne contient ni accueil mondial réel, ni planisphère/globe mondial, ni expériences africaines distinctes à migrer. La carte existante est une carte Leaflet limitée au Maroc. Son interaction (sélection de lieu, marqueurs, zoom animé, recherche et géolocalisation explicite) est utile comme référence technique, mais ne constitue pas la planisphère à conserver telle quelle.

Les éléments nationaux ne seront ni supprimés ni refondus pendant cette phase. Les changements locaux déjà présents au début de l'audit ont été conservés intacts. Une correction non-visuelle a été appliquée dans `src/components/MapCanvas.tsx` : le conteneur de carte a reçu `role="region"`, afin que son `aria-label` soit conforme.

## Stack et exécution

| Domaine | État constaté |
| --- | --- |
| Client | React 19 + TypeScript 7, Vite 8 |
| Routage | React Router 7, `BrowserRouter`, base codée en dur `/MarocoGO` |
| Cartographie | Leaflet 1.9 + tuiles OpenStreetMap publiques |
| Icônes / export | Lucide React, jsPDF chargé à la demande |
| Persistance | `localStorage` seulement (langue, favoris, brouillon de voyage) |
| PWA | service worker maison et manifeste, avec cache `marocogo-v2` |
| Qualité | Vitest, Playwright, axe-core |
| Publication | GitHub Pages depuis `main`, artefact `dist` |

Il n'y a ni API, ni base de données, ni authentification, ni paiement, ni système de réservation connecté. Les interfaces le signalent généralement correctement.

## Cartographie des routes actives

| Route | Module | Rôle actuel | Destination cible |
| --- | --- | --- | --- |
| `/` | `pages/Home.tsx` | accueil éditorial marocain et carrousel | remplacer par accueil mondial |
| `/explore` | `pages/Explore.tsx` | recherche de six lieux marocains + carte Leaflet | pôle **EXPLORER** contextualisé par pays |
| `/place/:slug` | `pages/Place.tsx` | fiche d'un lieu marocain | route nationale générique `/:country/decouvrir/...` |
| `/prepare` | `pages/Planner.tsx` | brouillon local et PDF | pôle **PLANIFIER** partagé |
| `/profile` | `pages/Profile.tsx` | façade de compte non connectée | futur espace voyageur |
| `/provider/*` | `pages/Provider.tsx` | façade prestataire non connectée | futur espace prestataire séparé |
| `/legal`, `/privacy`, `/contact` | `pages/Info.tsx` | pages informatives | socle mondial |

`App.tsx` centralise le routage et `components/Shell.tsx` la navigation voyageur. Les écrans Provider sont hors shell et devront rejoindre une séparation d'espaces plus explicite.

## Données, composants et mécanismes

### À conserver et généraliser

- `src/lib/trip.ts` : modèle de brouillon, contexte React, persistance locale et ajout idempotent d'un lieu ; à renommer et versionner sous le domaine commun.
- `src/i18n.tsx` : fournisseur centralisé, bascule `lang`/`dir`, et test de parité des clés ; à réduire aux trois langues officielles et sortir les catalogues du code du composant.
- `src/components/MapCanvas.tsx` : intégration Leaflet, couches de marqueurs, sélection, zoom et nettoyage de cycle de vie ; à adapter à une donnée géographique mondiale.
- `src/pages/Home.tsx` et `src/lib/hero-selection.ts` : carrousel, respect de `prefers-reduced-motion` et sélection évitant la répétition immédiate ; à rendre indépendant du Maroc.
- `src/components/Shell.tsx`, tokens CSS, styles responsive, tests Playwright/Vitest et workflow Pages : base utile après découplage des marques et des chemins.

### À migrer ou encapsuler

- `src/data/places.ts` : six fiches du Maroc, actuellement couplées au type `Locale` et à des URLs Wikimedia. À devenir un paquet de contenu `countries/ma` validé.
- Logos `marocogo-*`, `CREDITS.md`, manifeste, service worker, `404.html`, `index.html`, Vite et `main.tsx` : passer d'identifiants et chemins MarocoGO à VoyageGo, mais seulement lorsque la nouvelle base est prête.
- `src/pages/Planner.tsx`, `Profile.tsx`, `Provider.tsx` : interfaces exploratoires à découper en fonctionnalités réutilisables, sans faire croire à des services connectés.

### À retirer après vérification au Prompt 03

- `src/data/mock.ts` et `src/types.ts` : ancien jeu de destinations, expériences, offres, réservations et messages. Aucun import depuis le code actif n'a été trouvé ; conserver jusqu'à un contrôle TypeScript après retrait.
- `src/design-system/GoDock.tsx`, `Hubs.tsx`, `themes.ts` : composants/thème MarocoGO non importés, avec routes obsolètes (`/explorer`, `/preparer`, `/carte`, etc.). `tokens.css` reste importé et doit être trié plutôt que supprimé en bloc.
- Le branding MarocoGO et les routes exclusivement marocaines, après extraction du contenu marocain dans l'expérience nationale commune.

## Écarts avec la cible VoyageGo

- Les langues actives sont FR/AR/EN/**ES/PT** : espagnol et portugais doivent sortir du produit cible. RTL arabe existe déjà.
- La navigation expose Accueil, Préparer, Explorer et Profil ; le pôle officiel **DÉCOUVRIR** n'existe pas encore, et la terminologie doit devenir exactement EXPLORER / PLANIFIER / DÉCOUVRIR.
- Les données et la présentation sont mélangées dans les pages et `places.ts`.
- L'expérience Maroc est l'application entière ; elle n'est pas une configuration nationale sous VoyageGo.
- Aucun système de pays, de contenu géographique, de navigation contextuelle, de rôles ou de contrats API n'est défini.
- Le document `FRONTEND-CONSTITUTION.md` est une constitution MarocoGO antérieure et entre en contradiction avec les langues et la navigation de ce cadrage. Il est conservé comme historique jusqu'à son remplacement contrôlé.

## Risques et protections

| Risque | Protection requise |
| --- | --- |
| Casser les liens Pages lors du changement de base | rendre le `basename`, manifeste, service worker, 404 et Vite cohérents ; tester les liens directs avant publication |
| Perdre le brouillon local des visiteurs | lire l'ancienne clé `marocogo.trip.v1` une fois, migrer vers une clé versionnée VoyageGo, puis conserver un rollback documenté |
| Régression RTL | tests sur `dir=rtl`, ordre visuel, focus, icônes directionnelles et débordement horizontal |
| Globe coûteux ou inaccessible | conserver une version non-WebGL / liste de pays utilisable au clavier, limiter le chargement et respecter la réduction de mouvement |
| Photos inexactes ou non conformes | registre média avec pays, licence, source, validation « sans personne/animal » et revue éditoriale avant publication |
| Tuiles et images externes fragiles | attribution, politique de confidentialité, erreurs de chargement, CDN/provider approuvé avant mise en production |
| Suppression trop large | une PR/commit dédié, recherche d'importations, compilation + tests, et possibilité de retour Git avant chaque lot |
| Fausses promesses de réservation | maintenir des états « non connecté » jusqu'à contrats backend, autorisations et paiements réellement disponibles |

## Validation exécutée

- `npm test` : **4/4** tests unitaires passent.
- `npm run build` : **réussit** (TypeScript et build Vite).
- Playwright/axe : la première exécution a détecté une violation sérieuse sur `/explore` (`aria-prohibited-attr` du conteneur Leaflet). Après correction, la suite complète est **verte : 24/24** scénarios desktop/mobile, dont les audits axe.

## Blocages réels

Il n'y a pas de blocage technique à démarrer le Prompt 02. Les décisions ultérieures qui exigeront une validation humaine sont : fournisseur de données géographiques/globe, sources photographiques approuvées, contrats backend (comptes/réservations), identité finale de déploiement et règles éditoriales de chaque pays.

