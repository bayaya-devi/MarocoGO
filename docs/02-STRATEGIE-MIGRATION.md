# VoyageGo — stratégie de migration et nettoyage

## Règle de sécurité

Chaque lot est réversible par Git. Avant un retrait : inventaire des imports, build, tests unitaires et tests E2E ciblés. Les secrets, données de production, services externes et configurations de déploiement ne sont jamais supprimés sans vérification explicite. Aucun déploiement ne fait partie des prompts 01–03 sans instruction distincte.

## Séquence proposée

1. **Prompt 02 — socle neutre.** Créer le registre pays, les types de domaine, le registre `fr/en/ar`, la couche de données/repositories et les routes de contexte sans supprimer l'ancien flux. Ajouter des tests de résolution pays, parité des traductions et sauvegarde/migration du brouillon.
2. **Prompt 02 — accueil mondial.** Construire l'accueil VoyageGo et l'abstraction de géographie. La première version doit avoir une liste/recherche de pays accessible avant d'introduire un rendu globe plus ambitieux. Réemployer les patterns Leaflet seulement après avoir séparé les coordonnées du contenu marocain.
3. **Prompt 03 — extraction Maroc.** Déplacer `places.ts` et ses médias vers `countries/ma`, migrer les URLs marocaines vers `/ma/...`, conserver les redirections si la stratégie de publication l'exige, puis adapter les trois pôles.
4. **Prompt 03 — retrait contrôlé.** Retirer les composants non importés (`mock.ts`, anciens docks/hubs/thème) uniquement après `rg` des importations, `tsc -b`, tests et revue du diff. Remplacer les chemins, cache PWA, manifeste et métadonnées MarocoGO par VoyageGo dans un lot cohérent.
5. **Après intégration backend.** Implémenter comptes, services prestataires et administration derrière des contrats d'API, autorisations et journalisation ; aucun état simulé ne devient une promesse de réservation.

## Matrice de disposition

| Élément actuel | Action | Condition de sortie |
| --- | --- | --- |
| Carte `MapCanvas` | conserver le mécanisme, extraire un adaptateur géo | alternative clavier + contrat géo + attribution |
| `places.ts` | migrer dans `countries/ma` | schéma commun, FR/EN/AR, médias validés |
| `trip.ts` | migrer dans `features/plan` | migration de la clé locale testée |
| `i18n.tsx` | refactorer | ES/PT retirés, catalogues séparés, RTL vérifié |
| `Shell.tsx` et styles | refactorer | trois pôles officiels et contexte pays |
| `mock.ts`, `types.ts` | supprimer | zéro import, build et tests verts |
| `GoDock.tsx`, `Hubs.tsx`, `themes.ts` | supprimer ou absorber | fonctionnalités utiles extraites ; zéro import |
| logos/manifeste/SW/base `/MarocoGO` | migrer en dernier | chemin d'hébergement confirmé, liens directs testés |
| `FRONTEND-CONSTITUTION.md` | archiver/remplacer | constitution VoyageGo validée |

## Tests de non-régression à maintenir / ajouter

- résolution d'un pays et des routes monde/pays ; retour 404 pour pays/slug inconnus ;
- parité non vide des catalogues FR/EN/AR et `dir=rtl` sans débordement ;
- liste de pays entièrement utilisable sans pointeur ni WebGL ;
- sélection carte/globe, zoom et attribution ;
- migration du brouillon `marocogo.trip.v1` vers la clé VoyageGo sans perte ;
- aucune action de réservation/paiement/authentification ne simule un succès ;
- audit axe sur les routes monde, pays et trois pôles ;
- deep links sous le chemin de publication final et mode hors ligne.

## Critères de préparation pour le Prompt 02

- L'audit et l'inventaire sont consignés dans `docs/`.
- La carte marocaine est identifiée comme référence, et l'absence de globe mondial est explicite.
- Les zones à conserver, migrer et retirer ont des conditions de sortie.
- La correction d'accessibilité de la carte est en place et Playwright est vert (24/24).
- Le dépôt est prêt à recevoir le socle multi-pays sans suppression prématurée.
