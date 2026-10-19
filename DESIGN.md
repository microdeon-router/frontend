# Design system: Microdeon

Identité : noire, technique, précise. Le rouge du M (`#FB000F`) est le seul signal.
Inspirations : Apple (hiérarchie, silence, typo), OrcaRouter (hero + snippet), OpenRouter (catalogue développeur).
Hors périmètre visuel : dégradés décoratifs, glassmorphism, illustrations stock, SaaS violet.

## Couleur

| Jeton | Valeur | Usage |
|---|---|---|
| `--ink` | `#050505` | fond page |
| `--panel` | `#0e0e0e` | cartes, code, dialogs |
| `--line` | `#1c1c1c` | filets |
| `--mute` | `#8a8a8a` | légendes |
| `--text` | `#f4f4f4` | corps |
| `--signal` | `#FB000F` | CTA, M, états actifs |

Pas d’autre accent. Le blanc du wordmark n’est pas un second brand color.

## Type

- Corps / UI : Inter 400–600, tracking légèrement négatif sur les titres.
- Code : JetBrains Mono 400.
- Titres hero : 2.6–4.2 rem, `letter-spacing: -0.04em`, `font-weight: 600`.
- Une seule taille de filet : 1 px `var(--line)`.

## Composition

- Largeur max contenu : 1120 px. Header / footer : 1280 px.
- Grille 12. Cartes modèles : 1 / 2 / 3 colonnes.
- Espacement vertical des sections : 96–128 px desktop, 64 px mobile.
- Rayon : 12 px panneaux, 999 px boutons pill (CTA seulement).

## Motion

- 150–220 ms, `ease`.
- Respect `prefers-reduced-motion`.
- Pas d’animations d’entrée en cascade.

## i18n

Locales dans `src/i18n/locales/<code>.ts`. Ajouter une langue :

1. Créer le fichier en recopiant `en.ts`.
2. L’enregistrer dans `src/i18n/locales.ts` (`locales` + `messages`).
3. Native name + `dir` (ltr/rtl).

Routes : `/:locale/...`. La clé `microdeon.locale` mémorise le choix.

## Auth / paiements

Pages `/signin` et `/signup` : UI seulement (GitHub, Google, Microsoft, e-mail).
Stripe et WorkOS : placeholders, pas de SDK.
