# VoyageGo — rapport d’implémentation du Prompt 03

**Date :** 17 octobre 2026  
**État :** implémentation terminée et vérifiée localement

## Résultat

VoyageGo dispose maintenant d’un accueil mondial et d’une première expérience nationale Maroc intégrée. L’ancienne application MarocGo n’est plus exposée par le routage actif. Le Maroc est le seul pays publié ; les autres pays restent sélectionnables et affichent honnêtement un état « en préparation » sans route nationale ni paysage attribué à tort.

## Modifications réalisées

- Nouvel accueil mondial `/` avec globe SVG manipulable, rotation, zoom, remise à zéro, sélection par marqueurs et liste/recherche accessible.
- Registre pays extensible comprenant identifiants, noms FR/EN/AR, coordonnées, statut, média vérifié facultatif et route facultative.
- Nouvelle expérience Maroc sous `/ma`, avec accueil immersif et pôles `/ma/explorer`, `/ma/planifier` et `/ma/decouvrir`.
- Pages de détail géographique sous `/ma/decouvrir/lieux/:slug`.
- Capsule nationale commune avec retours Monde et Maroc distincts, trois pôles et menu Plus pour Recherche, Langue et Compte.
- FR, EN et AR centralisés ; `lang` et `dir` s’appliquent au document entier, avec RTL arabe.
- Brouillon de voyage versionné et persistant en local, avec migration de l’ancienne clé et ajout idempotent d’une destination.
- VoyageGo Info et routes institutionnelles accessibles depuis les contextes mondial et national.
- Médias locaux responsifs WebP/JPEG, dimensions explicites et chargement différé hors scène principale.
- Métadonnées, manifeste, service worker, titre et documentation passés à l’identité VoyageGo.

## Éléments retirés de l’application active

- Anciennes pages `Home`, `Explore`, `Place`, `Planner`, `Profile`, `Provider` et `Info`.
- Anciennes routes `/prepare`, `/explore`, `/profile` et `/provider`, désormais rendues en 404.
- Ancien shell, anciens composants UI, docks, hubs, thèmes et mocks devenus inutiles.
- Anciennes données de lieux et anciens types monolithiques, remplacés par `src/countries` et les contrats VoyageGo.
- Logos MarocGo, bundles compilés racine et copie technique racine de `404.html`.

Le mécanisme Leaflet/OpenStreetMap, React Router, le socle de tokens, la configuration GitHub Pages et la migration du brouillon local ont été conservés parce qu’ils restent utiles à l’architecture commune.

## Médias

Quatre photographies Wikimedia Commons ont été inspectées visuellement et documentées : Merzouga, panorama de Fès, remparts d’Essaouira et cascade d’Akchour. Le registre les marque comme revues, sans personne ni animal visible. Les sources, auteurs et licences figurent dans `CREDITS.md`. Aucun paysage n’est affiché pour un pays sans média national vérifié.

## Fonctionnalités opérationnelles

- Navigation mondiale et nationale, liens directs et historique du navigateur.
- Globe au pointeur et au tactile, plus commandes explicites utilisables au clavier.
- Sélection de pays et entrée dans le Maroc.
- Carte Maroc réelle avec attribution OpenStreetMap.
- Recherche nationale et recherche de destinations.
- Planification locale : destination, dates, voyageurs, transport, hébergement, activités, itinéraire, budget et notes.
- Traductions FR/EN/AR, RTL, responsive desktop/mobile et réduction de mouvement.
- Panneau VoyageGo Info et pages institutionnelles.

## Fonctionnalités préparées mais non connectées

Les comptes, réservations, paiements, prix, disponibilités, synchronisation multi-appareils, espaces prestataires et administration ne sont reliés à aucun service réel. L’interface ne simule aucun succès. Les contenus juridiques restent des textes de préparation à faire valider avant un usage commercial.

## Vérifications exécutées

- `npm test` : **10/10 tests unitaires réussis**.
- `npm run build` : **build TypeScript/Vite réussi**, 1 927 modules transformés.
- `npm run test:e2e` : **28/28 scénarios Playwright réussis** sur Chrome desktop et Pixel 5.
- Audits axe WCAG 2 A/AA/2.2 AA sur accueil monde, accueil Maroc, les trois pôles et mentions légales : **aucune violation sérieuse ou critique**.
- Parcours vérifiés : rotation/zoom, disponibilité pays, entrée Maroc, retours Monde/Maroc, capsule, Plus, recherche, compte non connecté, carte, brouillon local, arabe RTL, VoyageGo Info, anciennes routes, mobile, desktop et mouvement réduit.

## Déploiement

L’état de publication est renseigné à la fin de l’intervention, après vérification de l’accès GitHub, de la divergence de la branche, du workflow réel et du site publié. Aucun succès de déploiement ne doit être inféré de la seule réussite locale.

## Recommandations suivantes

1. Faire valider et versionner les contenus juridiques avant ouverture commerciale.
2. Brancher un service de comptes seulement avec contrats d’API, autorisations et états d’erreur explicites.
3. Ajouter les prochains pays par le registre commun, après audit géographique, éditorial et média.
4. Mettre en place un contrôle visuel de référence pour les scènes à 320, 768, 1 024 et 1 440 px.
