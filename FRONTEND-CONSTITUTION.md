# MarocoGO — Frontend Constitution V1

## Identité
MarocoGO est l'expérience numérique de voyage dédiée au Maroc au sein de l'écosystème VoyageGO. Son interface doit être premium, chic, contemporaine, légèrement vive et surtout laisser le voyage dominer visuellement.

## Mission UX
**Voir → ressentir → découvrir → explorer → planifier → voyager.**

L'interface accompagne ; elle ne prend jamais la place des destinations, des photos ou de l'intention de l'utilisateur.

## Les 10 principes MarocoGO
1. Le voyage avant l'interface.
2. Montrer avant d'expliquer.
3. Une action principale à la fois.
4. Révéler progressivement la complexité.
5. Toujours permettre de revenir ou annuler.
6. Données personnelles minimales et explicites.
7. Même langage visuel partout.
8. L'animation doit expliquer ou accompagner.
9. Mobile ≠ desktop réduit.
10. Chaque élément doit justifier sa présence.

> Si retirer un élément améliore l'expérience, on le retire.

## Palette
- Fond : `#F7F7F5`
- Encre : `#111111`
- Argent : `#B8BBC0`
- Rouge signature du logo : `#E91D2B`
- Vert signature du logo : `#087A39`
- Vert secondaire : `#149F55`

Les accents rouge/vert ne doivent pas saturer l'interface. Le Maroc est d'abord raconté par la photographie.

## Typographie
Pile système moderne inspirée des interfaces OS : Inter, UI Sans, San Francisco/Segoe UI en fallback. Échelle fluide via `clamp()` pour les grands titres. Maximum une famille principale dans cette V1.

## Liquid Glass
Trois niveaux :
- Glass 01 : navigation et contrôles flottants.
- Glass 02 : panneaux, recherche, widgets.
- Glass 03 : modales/drawers nécessitant une forte lisibilité.

Toujours prévoir un fallback opaque lorsque `backdrop-filter` n'est pas disponible.

## Boutons et iconographie
Lucide est l'unique famille d'icônes. Les actions secondaires utilisent des boutons icône qui peuvent révéler leur libellé au survol desktop. Sur mobile, aucune action essentielle ne dépend du hover.

## Cards
Photo dominante, bordures légères, peu d'ombres, grandes surfaces tactiles. Les cartes destinations privilégient l'immersion. Les cartes fonctionnelles prestataires privilégient la lecture et l'action.

## Navigation
- Voyageur desktop : header permanent, transparent puis glass au scroll.
- Voyageur mobile : dock bas persistant.
- Prestataire desktop : sidebar compacte extensible.
- Prestataire mobile : dock bas avec action centrale.

## Formulaires
Labels explicites, erreurs lisibles, champs confortables, confirmation de sauvegarde. Ne jamais transformer un formulaire en mur de champs : utiliser des groupes et la divulgation progressive.

## Modales / sheets
Fermeture évidente, Escape clavier si implémenté, action d'annulation disponible. Sur mobile, préférer bottom sheets pour les actions contextuelles.

## Animations
Durée simple : 100–200 ms. Les transitions longues sont réservées aux changements de contexte. `prefers-reduced-motion` est respecté. Pas de scroll hijacking.

## Responsive
La V1 vise 320, 375, 390, 430, 768, 1024, 1280, 1440 px et plus. Le mobile est une expérience réorganisée, pas un desktop compressé.

## Accessibilité
Objectif WCAG AA : focus visible, contrastes, aria-labels pour les boutons icônes, zones tactiles confortables, information non dépendante de la couleur.

## Internationalisation / RTL
La V1 est française. Les composants doivent rester indépendants de la langue. Une future couche i18n gérera l'arabe et `dir="rtl"`, y compris les chevrons, drawers et alignements.

## Photos
Médias grands, immersifs, ratios cohérents, `object-fit: cover`, lazy loading à compléter lors du branchement backend/CDN. Les photos ne doivent jamais être purement décoratives lorsqu'elles portent une information destination.

## Voyageur
Priorités : découvrir, comparer sans bruit, sauvegarder, planifier, retrouver. La localisation est demandée uniquement après une action volontaire.

## Prestataire
Même ADN MarocoGO, mais hiérarchie plus opérationnelle : réservations, messages, disponibilités et qualité de la fiche avant les statistiques. Pas de dashboard SaaS surchargé.

## Données & backend
Les données de cette V1 sont des mocks. L'UI ne doit pas prétendre effectuer une authentification réelle ou une réservation serveur. Les futurs services API remplaceront la couche mock sans réécriture du design system.
