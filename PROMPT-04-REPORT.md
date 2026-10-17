# VoyageGo — rapport d’implémentation du Prompt 04

**Date :** 17 octobre 2026  
**État :** implémentation et validation locales terminées ; publication en attente du workflow GitHub Pages

## Technologie

Le globe utilise Three.js 0.186.1 avec React Three Fiber 9.8.2, compatibles avec React 19.3 et Vite 8. La scène est isolée dans un import dynamique : le moteur 3D n’alourdit pas le chargement initial de l’accueil.

World Atlas 2.0.2 fournit les frontières Natural Earth 1:110m et leurs identifiants ISO numériques. Un clic est converti par raycasting en longitude/latitude, puis testé contre les polygones réels des pays publiés dans le registre VoyageGo. La sélection ne dépend donc pas d’un marqueur approximatif.

## Fonctionnalités

- Terre texturée avec la mosaïque NASA Blue Marble, convertie localement en WebP 1024 × 512 de 48 Ko.
- Frontières mondiales regroupées dans une seule géométrie de lignes pour limiter les appels GPU.
- Rotation automatique lente, glisser au pointeur ou au tactile, commandes de rotation et zoom progressif limité.
- Orientation douce vers un pays choisi depuis la liste et surbrillance de sa frontière.
- Sélection directe des pays enregistrés par polygone géographique.
- Paysage marocain et entrée `/ma` conservés.
- Réduction du mouvement : arrêt de la rotation automatique et rendu à la demande.
- Niveau de détail, anticrénelage et DPR réduits sur les petits écrans ou appareils modestes.
- Détection WebGL, repli vers la liste accessible et récupération après perte du contexte.

## Sources et intégrité

La texture provient de NASA/Goddard Space Flight Center SVS. Les frontières proviennent de Natural Earth via World Atlas. Les crédits sont consignés dans `CREDITS.md`. Aucun média ajouté ne contient de personne ou d’animal.

## Vérifications

- `npm test` : 13 tests unitaires réussis, dont la correspondance ISO des 12 pays et les inclusions point-dans-polygone.
- `npm run build` : compilation TypeScript et build Vite réussis. Le moteur 3D constitue un chunk asynchrone séparé de 285 Ko gzip ; il n’est pas dans le chargement initial.
- `npm run test:e2e` : 30 scénarios Playwright réussis, 15 sur desktop et 15 sur mobile.
- Accessibilité : 12 audits axe réussis sur les six pages principales, en desktop et mobile, sans violation sérieuse.
- Parcours 3D : rotation automatique, rotation manuelle, zoom, sélection géographique du Maroc, perte de contexte WebGL, récupération et entrée dans l’expérience Maroc vérifiés.
- Contrôle visuel : 320 × 800, 768 × 900, 1024 × 900 et 1440 × 900 vérifiés, sans débordement horizontal ni masquage des textes essentiels.

## Déploiement

Le déploiement n’est déclaré réussi qu’après validation du workflow GitHub Pages et ouverture effective de la page publique et d’un lien direct.
