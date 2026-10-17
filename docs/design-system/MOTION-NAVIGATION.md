# Mouvement et navigation

## Échelle

| Token | Usage |
| --- | --- |
| instant, 80 ms | retour pressé/focus |
| fast, 140 ms | survol, apparition d’une commande |
| normal, 240 ms | disclosure, changement d’état local |
| slow, 480 ms | transition de scène justifiée |

Le rebond est réservé aux petites commandes et ne dépasse pas quelques pixels. Aucun mouvement essentiel ne dure plus de 600 ms.

## Règles

- Entrée : opacité + translation courte, jamais un départ hors écran qui retarde l’accès.
- Sortie : plus courte que l’entrée.
- Changement de page : laisser React Router et l’historique effectuer la navigation immédiatement ; l’animation est une amélioration progressive.
- Défilement : aucun verrouillage ni `preventDefault` global. Les révélations utilisent IntersectionObserver avec contenu visible par défaut en cas d’échec.
- Profondeur : activée seulement si le contenu reste lisible et si le mécanisme de repli est chargé.
- Réduction du mouvement : durée quasi instantanée, aucune parallaxe, aucun rebond, aucun défilement doux imposé.

## Noyau au scroll

Une progression vers le bas masque visuellement le noyau. Une progression vers le haut, la fin native du scroll, un focus interne ou le retour au haut de page le révèle. Le mécanisme ne modifie pas le DOM, ne décale pas la mise en page et ne crée pas de temporisation de confort arbitraire.

## Métamorphoses

Le Prompt 03 choisira une transition selon la paire de contextes : photo vers détail (élément partagé), hub vers outil (déplacement de perspective), pays vers autre pays (atmosphère), parcours utilitaire (fondu court). Une matrice de transition doit être testée avec retour navigateur, lien profond, clavier et mouvement réduit avant activation.
