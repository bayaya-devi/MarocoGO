# Responsive, langues et RTL

## Composition mobile-first

- 320–47.99 rem : une colonne, navigation nationale en bas, cibles de 44 px minimum.
- 48–63.99 rem : composition tablette, espaces et grilles enrichis selon le contenu.
- 64–89.99 rem : navigation en haut, scènes multi-plans possibles.
- 90 rem et plus : largeur de lecture plafonnée ; l’image peut s’étendre sans allonger les lignes.

Ces valeurs sont des garde-fous, pas des listes d’appareils. Un composant ajoute un point de rupture seulement à l’endroit où son contenu cesse de fonctionner.

Les images utilisent au moins trois candidats de largeur, un ratio réservé et `loading="lazy"` hors première scène. Aucun élément ne doit imposer un scroll horizontal à 320 px.

## FR / EN / AR

Les nouveaux parcours n’acceptent que `fr`, `en`, `ar`. Les dictionnaires partagent exactement les mêmes clés et aucune traduction vide. Les formats de date, nombre et devise passent par `Intl` avec la locale active.

## RTL

- Appliquer `dir="rtl"` à `html`, pas composant par composant.
- Employer `margin-inline`, `padding-inline`, `inset-inline`, `border-inline`, `text-align: start`.
- L’ordre DOM suit l’ordre de lecture. Grid/Flex ne sert pas à simuler une inversion visuelle contradictoire.
- Inverser seulement les flèches précédent/suivant, chevrons de progression et gestes directionnels.
- Ne pas inverser logo, globe, lecture média, cartes ou icônes sans direction sémantique.
- Tester zoom 200 %, clavier, lecteur d’écran et chaînes arabes longues.
