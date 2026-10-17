# Spécifications des composants

## NavigationCore

Contexte : pages nationales touristiques uniquement.

- Contenu fixe : Maison, Explorer, Planifier, Découvrir, Plus.
- Maison reçoit la route d’accueil du pays ; Terre est un lien indépendant vers l’accueil mondial.
- Plus expose Recherche, Langue, Compte ; `Escape`, un second clic sur Plus ou un clic extérieur le referment.
- `aria-current="page"` identifie la destination active. Les icônes sont décoratives ; les noms accessibles sont portés par les liens/boutons.
- Desktop : haut-centre. Mobile : bas-centre, au-dessus de la zone sûre.
- Le masquage au scroll est seulement visuel. Le focus clavier rappelle immédiatement le noyau.

États : repos, survol/focus, actif, menu secondaire ouvert, masqué au scroll, mouvement réduit. Le composant n’interprète pas les droits de compte et ne déclenche aucune authentification réelle.

## GlobalHomeLink

Petit symbole Terre indépendant. Son nom accessible mentionne explicitement l’accueil mondial. Il ne remplace jamais Maison et ne doit pas être placé à l’intérieur de la liste des cinq destinations nationales.

## VoyageGoInfo

Signature de fin de parcours suivie d’une commande ouvrant un dialogue institutionnel.

- Le dialogue possède un titre, une fermeture explicite, `Escape` natif et un retour de focus vers la commande d’ouverture.
- Les huit catégories prévues sont affichées si leurs routes existent : à propos, contact, aide, mentions légales, confidentialité, conditions, cookies, crédits.
- En l’absence de route légale validée, le contrôleur doit signaler le blocage ; il ne fournit pas de faux document.

## MediaFrame

Primitive prévue pour le Prompt 03. Contrat minimal : source vérifiée, texte alternatif, largeur/hauteur, licence/crédit et variante de recadrage. Un média non conforme à la règle sans humains/animaux ne franchit pas la revue éditoriale.

## États communs

Les primitives de données devront exposer `LoadingState`, `EmptyState`, `ErrorState` et `SuccessNotice`. Un squelette respecte la réduction du mouvement ; une erreur offre une action de reprise lorsqu’elle est possible ; un succès important utilise une région `aria-live="polite"`.
