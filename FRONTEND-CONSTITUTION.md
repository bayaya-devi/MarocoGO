# VoyageGo — Frontend Constitution

**Statut :** norme officielle · **Version :** 2.0 · **Date :** 17 octobre 2026

Cette constitution est la source de vérité de l’interface VoyageGo. Elle s’applique aux pages mondiales, aux expériences nationales et aux futurs espaces utilisateurs. Les détails exécutables se trouvent dans [`docs/design-system`](docs/design-system/README.md).

## 1. Vision et identité

VoyageGo est une fenêtre ouverte sur le monde, pas une succession de pages. L’expérience recherche, dans cet ordre, l’immersion, l’élégance, la simplicité, la fluidité, le réalisme, la performance et l’accessibilité.

L’identité mondiale reste dominante. Un pays peut adapter les paysages, la lumière, les contenus et un accent chromatique documenté ; il ne devient pas une marque indépendante. Les accents nationaux ne remplacent ni le logo, ni les tokens sémantiques, ni les comportements communs.

## 2. Architecture de l’expérience

Les trois pôles nationaux sont, partout et dans cet ordre logique : **Explorer — Planifier — Découvrir**.

- L’accueil mondial ne montre jamais la navigation nationale. Il conserve les seules commandes nécessaires au globe, à la sélection des pays, aux fonctions globales et à VoyageGo Info.
- Une expérience nationale utilise le noyau flottant : Maison, Explorer, Planifier, Découvrir, Plus.
- Maison revient à l’accueil du pays actif. Terre revient à l’accueil mondial. Ces deux actions ne sont jamais fusionnées.
- Plus révèle seulement Recherche, Langue et Compte sous forme de commandes compactes et refermables.
- Les espaces professionnels et administratifs partagent les tokens, mais peuvent employer une navigation stable et plus dense lorsque l’efficacité le justifie.

## 3. Navigation nationale

Le noyau est une capsule organique, transparente, sans libellé permanent. Sur grand écran, il est centré en haut ; sur petit écran, il se place en bas en tenant compte de `safe-area-inset-bottom`.

Chaque action possède un nom accessible, un focus visible, une cible d’au moins 44 × 44 px et une indication contextuelle non dépendante du survol. Le noyau se retire lors d’un défilement vers le bas et revient au retour vers le haut, à la fin du défilement ou dès qu’un de ses éléments reçoit le focus. Le masquage ne retire jamais ses éléments de l’ordre de tabulation.

## 4. VoyageGo Info

Les pages immersives n’utilisent pas de footer conventionnel. Elles terminent leur parcours par une signature discrète et une commande **VoyageGo Info** ouvrant un panneau accessible. À propos, contact, aide, mentions légales, confidentialité, conditions, cookies et crédits restent disponibles au clavier et sur mobile. Une obligation légale ne peut être cachée définitivement ni conditionnée à une animation.

## 5. Image, média et intégrité

Les médias touristiques montrent des paysages, architectures, villes et monuments réels, sans personne, animal ou silhouette identifiable. Une image non vérifiée est remplacée par un emplacement neutre. Les sources, licences, sujets et restrictions sont consignés dans les crédits.

Les photographies sont dominantes, responsives et optimisées (`picture`, AVIF/WebP, dimensions explicites, chargement différé hors écran). Les interfaces ne fabriquent ni photographie documentaire, ni prix, disponibilité, réservation, avis ou transaction. Toute donnée de démonstration porte un libellé explicite et ne peut déclencher un flux présenté comme réel.

## 6. Immersion et mouvement

Le mouvement explique une relation spatiale ou un changement d’état. Il reste interrompable, n’empêche ni l’historique, ni les liens directs, ni la navigation arrière. Le scroll reste natif, sans section forcée ni hijacking.

Les transitions sont choisies selon le contexte : élément partagé, profondeur légère, changement atmosphérique ou simple fondu. Les appareils modestes reçoivent une composition fonctionnelle allégée. `prefers-reduced-motion: reduce` supprime profondeur, parallaxe, rebond et transition non essentielle sans retirer de fonctionnalité.

## 7. Typographie, couleur et composants

Les rôles obligatoires sont : display, titre de page, sous-titre, corps, légende, annotation, bouton, donnée et interface professionnelle. Deux familles au plus sont chargées par expérience, avec une pile système robuste et un équivalent arabe adapté.

Les composants consomment exclusivement les tokens sémantiques `--vg-*`. Une valeur brute n’est admise que pour un média ou une donnée calculée impossible à tokeniser. Les couleurs d’état ne sont jamais l’unique porteur d’information. Le contraste vise WCAG 2.2 AA.

## 8. Responsive, langues et direction

La conception commence à 320 px et réorganise les contenus plutôt que de réduire la composition desktop. Les points de rupture sont déclenchés par le contenu, les cibles tactiles font au moins 44 px, et aucun flux essentiel ne dépend du survol ou d’un glisser-déposer.

Le produit officiel prend en charge **FR, EN et AR uniquement**. Une vue n’emploie qu’une langue. L’arabe applique `lang="ar"` et `dir="rtl"` au document entier. Les propriétés CSS logiques sont obligatoires ; seuls les glyphes directionnels porteurs de sens sont inversés.

## 9. États, qualité et accessibilité

Tout composant asynchrone ou dépendant de données définit ses états chargement, vide, erreur et succès. Les contrôles composites documentent le clavier, le focus initial et le retour de focus. Les interfaces sont vérifiées à 320, 768, 1024 et 1440 px, en FR/EN/AR, au clavier, avec réduction du mouvement et avec un audit automatisé WCAG 2.2 AA.

## 10. Gouvernance

- Une nouvelle page référence cette constitution dans sa revue.
- Un composant partagé vit dans `src/design-system`; un comportement métier reste dans sa fonctionnalité.
- Les tokens, règles de mouvement et contrats de navigation sont centralisés.
- Toute exception indique son besoin fonctionnel, technique, légal ou d’accessibilité, son propriétaire et sa date de révision.
- Une fonctionnalité n’est déclarée opérationnelle qu’après vérification reproductible.

## Références normatives

- [Architecture et tokens](docs/design-system/README.md)
- [Spécifications des composants](docs/design-system/COMPONENTS.md)
- [Mouvement et navigation](docs/design-system/MOTION-NAVIGATION.md)
- [Responsive, langues et RTL](docs/design-system/RESPONSIVE-RTL.md)
- [Critères d’acceptation](docs/design-system/ACCEPTANCE.md)
- [Rapport d’implémentation du Prompt 03](PROMPT-03-REPORT.md)

<!--
La constitution MarocoGO V1 ci-dessous est conservée temporairement comme
historique de migration. Elle n'est plus normative pour les nouveaux écrans.
-->

# Annexe — Constitution MarocoGO V1 historique

> Amendement Premium (octobre 2026) : la navigation client est désormais une barre supérieure unique, flottante et rétractable composée du symbole, de Préparer, Explorer et Profil. Elle remplace le dock inférieur et toute double navigation. Les langues actives sont le français, l’arabe RTL, l’anglais, l’espagnol et le portugais. La palette de référence est `#006233`, `#C1272D` et `#B8BEC1`. Cet amendement prévaut sur les anciennes descriptions de navigation de ce document.

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
