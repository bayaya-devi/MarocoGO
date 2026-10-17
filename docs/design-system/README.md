# Architecture du design system VoyageGo

## Sources de vérité

| Couche | Emplacement | Responsabilité |
| --- | --- | --- |
| Constitution | `FRONTEND-CONSTITUTION.md` | règles produit non négociables |
| Tokens | `src/design-system/tokens.css` | valeurs primitives, sémantiques, pays et mouvement |
| Contrats | `src/design-system/contracts.ts` | langues, pôles, contextes et états autorisés |
| Primitives | `src/design-system/*.tsx` | structure, clavier, ARIA et variantes réutilisables |
| Compositions | `src/components` | branchement aux routes, contenus et données d’une application |
| Fonctionnalités | `src/pages` | comportements et données propres à un parcours |

Une primitive ne connaît ni API, ni analytique, ni donnée nationale. Un contrôleur d’application traduit les routes et libellés locaux vers ses props.

## Familles de tokens

- `--vg-ref-*` : palette brute interne ; interdite dans les composants.
- `--vg-color-*` : rôles de fond, texte, bordure, action et état.
- `--vg-country-*` : accents nationaux, jamais utilisés comme état universel.
- `--vg-type-*`, `--vg-font-*` : rôles typographiques.
- `--vg-space-*`, `--vg-size-*`, `--vg-radius-*`, `--vg-shadow-*` : géométrie.
- `--vg-motion-*` : durées et courbes ; toutes neutralisées par réduction du mouvement.
- `--vg-z-*` : couches partagées.

Les variables historiques `--country-*` et `--go-*` restent des alias temporaires pour éviter une régression de MarocoGO. Elles sont dépréciées et seront retirées après migration contrôlée.

## Thèmes

Le thème clair est la base. Le thème sombre s’active automatiquement sauf choix explicite `data-theme="light"`; `data-theme="dark"` force le sombre. Un pays définit `data-country` sur un ancêtre et ne remplace que les accents `--vg-country-*`.

## Pages nationales

Une page touristique nationale compose : scène immersive, contenu éditorial naturel, noyau de navigation national et signature VoyageGo Info. Une page professionnelle conserve la même couleur, typographie, focus et sémantique, mais peut adopter une grille dense et une navigation persistante. L’accueil mondial constitue un contexte distinct (`global`) et ne monte jamais `NavigationCore`.

## Stratégie d’adoption

1. Prompt 02 : tokens, contrats, primitives et tests isolés — aucun remplacement des expériences existantes.
2. Prompt 03 : composer le nouveau Maroc avec ces primitives et seulement trois langues.
3. Après validation : migrer les expériences historiques une par une, avec tests visuels et fonctionnels.
4. Une fois toute dépendance supprimée : retirer les alias `--go-*` et `--country-*`.
