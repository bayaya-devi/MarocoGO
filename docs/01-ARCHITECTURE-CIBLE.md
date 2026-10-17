# VoyageGo — architecture cible

## Principes structurants

Une seule application VoyageGo porte l'accueil mondial et toutes les expériences nationales. Un pays est une configuration, du contenu et éventuellement des modules déclarés compatibles ; ce n'est jamais un fork de l'application. Les trois pôles partagés sont **EXPLORER**, **PLANIFIER** et **DÉCOUVRIR**. La présentation ne lit pas de données brutes ni de mocks directement.

```
App VoyageGo
├── accueil mondial
├── navigation contextuelle (monde / pays / pôle)
├── expériences nationales configurées
│   └── ma (Maroc : contenu et thème, pas une app MarocoGO)
├── pôles partagés : explorer | planifier | découvrir
├── espaces futurs : traveler | provider | admin
└── plateformes : i18n | données | design system | cartographie | analytics
```

## Structure recommandée

```text
src/
  app/                 # routeur, providers, bootstrap et erreurs
  features/
    explore/           # recherche, comparaison, carte et sélection
    plan/              # itinéraire, budget, transport, réservations
    discover/          # guides, culture, lieux, activités, gastronomie
  countries/
    registry.ts        # index des pays publiés et capacités
    ma/
      country.ts       # métadonnées, thème et navigation locale
      content/         # lieux, régions, guides, médias validés
      translations/    # compléments éditoriaux par langue
  entities/            # types de domaine : Country, Place, Offer, Trip…
  services/
    repositories/      # contrats et implémentations local/api
    geo/               # fournisseur de carte/globe et adaptateurs
  shared/
    ui/                # composants accessibles génériques
    design/            # tokens neutres + thèmes pays
    i18n/              # FR/EN/AR, RTL et chargement des catalogues
    lib/               # fonctions pures et outils
  routes/              # composants de route fins uniquement
```

Le dossier `countries/ma` hébergera l'existant marocain extrait, sous l'identifiant ISO `MA`. Une page ne devra plus importer `countries/ma/content` directement : elle recevra un `CountryRepository` selon le pays résolu par la route.

## Routage cible

| Contexte | Exemple | Objet |
| --- | --- | --- |
| Monde | `/` | accueil, globe/carte, sélection de pays |
| Pôle monde | `/explorer`, `/planifier`, `/decouvrir` | découverte multi-pays et outils partagés |
| Pays | `/ma` | accueil national |
| Pôle pays | `/ma/explorer`, `/ma/planifier`, `/ma/decouvrir` | contenu et services contextualisés |
| Contenu pays | `/ma/decouvrir/lieux/fes` | fiche de contenu stable et localisée |
| Futur voyageur | `/compte/...` | compte, favoris, voyages, réservations |
| Futur prestataire | `/pro/...` | offres, disponibilités, demandes |
| Futur administration | `/admin/...` | modération et publication, derrière contrôle d'accès |

Les slugs contenus ne sont pas traduits ; les libellés, titres, descriptions et métadonnées le sont. La route d'un pays inconnu doit avoir une erreur explicite, et non réutiliser silencieusement le Maroc.

## Données et contrats

Les interfaces de domaine doivent précéder les sources de données :

```ts
type Country = { code: 'MA'; status: 'published'; name: LocalizedText; theme: CountryTheme };
type Place = { id: string; countryCode: string; regionId: string; name: LocalizedText; geo: GeoPoint; media: MediaRef[] };
interface CountryRepository { getCountry(code: string): Promise<Country | null>; listPlaces(country: string): Promise<Place[]>; }
```

`LocalizedText` est strictement `fr | en | ar`. Les repositories locaux servent au développement ; leur interface reste identique lorsqu'une API remplace les fichiers de contenu. Les données de réservation, comptes et prestataires restent absentes tant qu'un backend authentifié n'est pas approuvé.

## Internationalisation et accessibilité

- Un registre unique de langues : `fr`, `en`, `ar` ; aucune page dupliquée par langue.
- Le fournisseur applique `lang` et `dir`, charge les catalogues de manière centralisée et teste la parité de clés.
- Les contenus nationaux sont eux aussi disponibles dans les trois langues avant l'état `published`, ou signalent explicitement leur état éditorial hors production.
- Toute carte/globe possède une alternative au clavier (liste/recherche de pays), un nom accessible et un état sélectionné annoncé.
- Les transitions respectent `prefers-reduced-motion`; le contraste et la navigation au clavier font partie des tests de sortie.

## Design et médias

Le design system expose des tokens mondiaux (couleur, espace, typo, élévation, mouvement) puis une petite couche de thème pays. Aucun composant ne contient une palette ou un logo Maroc codé en dur. Chaque média référencé doit avoir : pays, lieu, licence/source, texte alternatif éditorial, état de revue, et confirmation qu'il ne montre ni personne ni animal.

## Évolution des rôles

Les rôles n'apparaissent pas dans le client actuel. Prévoir des capacités côté API (`traveler`, `provider`, `admin`) et des routes protégées, sans dupliquer le compte. Un même sujet authentifié peut obtenir les capacités voyageur et prestataire ; l'interface bascule de mode sans créer un second compte.

