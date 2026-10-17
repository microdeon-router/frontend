# Banque d’images — Microdeon

Assets prêts pour le front (`web/`).  
Servis en statique depuis `public/brand/` → URL `/brand/...`.

## Arborescence

```
web/public/brand/
├── README.md                 ← source de vérité pour l’agent front
├── microdeon/                ← marque Microdeon (logo produit)
├── vendors/                  ← logos tiers (intégrations, outils, agents)
│   ├── burp-suite/
│   ├── caido/
│   ├── claude-code/
│   ├── cursor/
│   ├── elasticsearch/
│   ├── github/
│   ├── google/
│   ├── goose/
│   ├── hermes/
│   ├── huggingface/
│   ├── huihui/
│   ├── ida/
│   ├── microsoft/
│   ├── nmap/
│   ├── orca-router/
│   ├── volatility/
│   └── wazuh/
└── misc/                     ← captures / fichiers non classés (pas pour UI brand)
```

## Convention de nommage

```
{role}[-{variant}][-{bg}].{ext}
```

| Segment   | Valeurs | Exemple |
|-----------|---------|---------|
| `role`    | `logo` (symbole+texte), `mark` (symbole), `wordmark` (texte) | `mark` |
| `variant` | `avatar`, `mascot`, `diff`, `long`, `with-text`, … | `mascot` |
| `bg`      | `transparent`, `on-dark`, `on-light` (si pertinent) | `on-dark` |
| `ext`     | `png`, `jpg`, `webp` (SVG préféré si dispo plus tard) | `png` |

Chemins publics :

```tsx
<img src="/brand/microdeon/logo-wordmark-transparent.png" alt="Microdeon" />
<img src="/brand/vendors/wazuh/mark.png" alt="Wazuh" />
```

## Marque Microdeon

| Fichier | Rôle | Fond | Usage | Notes |
|---------|------|------|-------|-------|
| `microdeon/logo-wordmark-transparent.png` | wordmark | transparent | source | 1024×341, marges |
| `microdeon/logo-wordmark-trim.png` | wordmark | transparent | header, footer | recadré 637×286 |
| `microdeon/mark.png` | mark | transparent | favicon, icône | M rouge + carré blanc ; 1024×1024 |

## Vendors — catalogue

### Agents / AI

| Slug | Fichier | Rôle | Fond | Usage | Notes |
|------|---------|------|------|-------|-------|
| `hermes` | `vendors/hermes/mark-avatar.jpg` | mark | clair | avatar / carte agent | Portrait anime B&W + casque, « N » sur col |
| `hermes` | `vendors/hermes/mark-diff.png` | mark | clair | variante courte | Même personnage, crop différent |
| `hermes` | `vendors/hermes/mark-long.jpg` | mark | clair | variante carrée | Portrait plus large |
| `goose` | `vendors/goose/mark.png` | mark | clair | icône agent | Silhouette oie noire (Block Goose) |
| `huihui` | `vendors/huihui/mark.webp` | mark | sombre | icône modèle / provider | Lettres « AI » bleu cyan, motif circuit |
| `orca-router` | `vendors/orca-router/mark.jpg` | mark | clair | provider / modèle | Orque 3D bleue (OrcaRouter) |
| `claude-code` | `vendors/claude-code/wordmark.jpg` | wordmark | sombre | badge produit | Texte « CLAUDE CODE » terracotta |
| `claude-code` | `vendors/claude-code/mark-mascot.jpg` | mark | sticker | mascotte | Pixel art orange (mascotte Claude Code) |
| `cursor` | `vendors/cursor/mark.png` | mark | sombre | icône éditeur | Symbole π dégradé rose→cyan (fichier source `ompicon…`) |
| `cursor` | `vendors/cursor/logo-with-text.jpg` | logo | transparent / clair | badge éditeur | Hexagone facettes + wordmark « CURSOR » |

### Plateformes

| Slug | Fichier | Rôle | Fond | Usage | Notes |
|------|---------|------|------|-------|-------|
| `github` | `vendors/github/mark.png` | mark | clair | OAuth / social | Octocat |
| `google` | `vendors/google/mark.png` | mark | clair | OAuth / social | « G » multicolore |
| `microsoft` | `vendors/microsoft/mark.webp` | mark | clair | OAuth / social | 4 carrés (grille Microsoft) |
| `huggingface` | `vendors/huggingface/mark.png` | mark | clair | provider modèles | Emoji hugging face |

### Outils cyber / observabilité

| Slug | Fichier | Rôle | Fond | Usage | Notes |
|------|---------|------|------|-------|-------|
| `wazuh` | `vendors/wazuh/mark.png` | mark | sombre | **intégration SIEM/XDR** | Aileron bleu + vagues binaires — *fichier source nommé `wiresharklogo…`* |
| `burp-suite` | `vendors/burp-suite/mark.png` | mark | sombre | outil pentest | Cercle gris / pêche, ligne en zigzag |
| `caido` | `vendors/caido/mark.png` | mark | sombre | proxy / pentest | Traces circuit dégradé rose→orange |
| `ida` | `vendors/ida/logo-with-text.jpg` | logo | clair | reverse / désassembleur | Portrait Ada Lovelace + « IDA » cyan |
| `nmap` | `vendors/nmap/mark.png` | mark | sombre | scan réseau | Œil wireframe + réticule (sans texte) |
| `nmap` | `vendors/nmap/logo-with-text.png` | logo | sombre | listes / about | Œil + wordmark « NMAP » |
| `elasticsearch` | `vendors/elasticsearch/mark-on-dark.png` | mark | sombre | stack Elastic | Cluster multicolore, bord blanc |
| `elasticsearch` | `vendors/elasticsearch/mark-transparent.png` | mark | transparent | fond clair ou sombre | Même marque, fond transparent |
| `volatility` | `vendors/volatility/mark.jpg` | mark | clair | forensics mémoire | Symbole power + ECG rouge (Volatility) |

## Misc (ne pas utiliser comme logo produit)

| Fichier | Description |
|---------|-------------|
| `misc/burp-suite-dashboard-screenshot.png` | Capture UI Burp Suite Community — démo / doc uniquement |
| `misc/orca-router-landing-screenshot.png` | Capture landing orcarouter.ai — référence concurrent / inspiration, pas un logo |

## Règles pour l’agent front

1. **Lire ce README** avant d’ajouter ou de référencer un asset.
2. Une seule source : `public/brand/` — pas de copie dans `src/assets/`.
3. Microdeon → `microdeon/` ; tiers → `vendors/{slug}/` ; captures → `misc/`.
4. Choisir la variante selon le **fond réel** (clair / sombre).
5. `alt` = nom lisible (`Microdeon`, `Wazuh`, …) ; décoratif → `alt=""`.
6. Respecter les marques tierces (tailles raisonnables, pas de déformation, pas de recoloration abusive).
7. Nouveau fichier → le placer au bon slug, le renommer selon la convention, **mettre à jour ce tableau**.

## Corrections déjà appliquées

| Erreur initiale | Correction |
|-----------------|------------|
| Fichier `wazuhicon…` = logo WorkOS (« W. » bleu) | Supprimé (pas Wazuh) |
| Fichier `wiresharklogo…` = vrai logo Wazuh | → `vendors/wazuh/mark.png` |
| Fichier `ompicon…` = mark Cursor (doublon) | Conservé une seule fois : `vendors/cursor/mark.png` |

## Statut

- [x] Logos classés (dont Wazuh pour intégration)
- [x] Catalogue README à jour
- [x] WorkOS retiré (mauvais fichier)
- [x] Brancher header / favicon Microdeon
- [x] Brancher grilles intégrations (vendors), dont Wazuh
