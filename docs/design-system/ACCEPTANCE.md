# Critères d’acceptation

## Revue d’une nouvelle page

- [ ] Contexte déclaré : mondial, national touristique, professionnel ou administration.
- [ ] Aucun noyau national sur l’accueil mondial.
- [ ] Maison et Terre ont des destinations et noms accessibles distincts.
- [ ] Explorer, Planifier, Découvrir gardent le même ordre et la même signification.
- [ ] Tous les états chargement, vide, erreur, succès pertinents existent.
- [ ] Aucune donnée de démonstration ne ressemble à une donnée de production.
- [ ] Tout média a source, licence, dimensions et contrôle humain/animal documentés.
- [ ] FR, EN et AR complets ; arabe vérifié en RTL.
- [ ] Parcours entièrement utilisable au clavier, focus visible et rendu à son déclencheur.
- [ ] Aucun blocage avec `prefers-reduced-motion: reduce`.
- [ ] Pas de débordement à 320, 768, 1024 et 1440 px.
- [ ] Contrastes WCAG 2.2 AA ; axe sans violation sérieuse ou critique.
- [ ] Navigation arrière, lien profond et historique préservés.
- [ ] Build TypeScript, tests unitaires et parcours Playwright réussis.

## Contrôles automatisés du socle

`npm test` vérifie les contrats de locale, l’ordre des pôles et les interactions accessibles des primitives. `npm run build` vérifie les types et l’intégration CSS. `npm run test:e2e` conserve les parcours de non-régression de l’expérience actuelle. Une vérification visuelle manuelle reste obligatoire pour média, contraste réel, RTL et compositions intermédiaires.
