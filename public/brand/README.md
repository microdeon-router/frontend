# Banque d’images: Microdeon

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
│   ├── cline/
│   ├── codex/
│   ├── continue/
│   ├── cursor/
│   ├── omp/
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
│   ├── openclaw/
│   ├── orca-router/
│   ├── volatility/
│   ├── wazuh/
│   └── wireshark/
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
| `ext`     | `svg` (préféré), `png`, `jpg`, `webp` | `svg` |

Chemins publics :

```tsx
<img src="/brand/microdeon/logo-wordmark-transparent.png" alt="Microdeon" />
<img src="/brand/vendors/wazuh/mark.svg" alt="Wazuh" />
```

## Marque Microdeon

| Fichier | Rôle | Fond | Usage | Notes |
|---------|------|------|-------|-------|
| `microdeon/logo-wordmark-transparent.png` | wordmark | transparent | source | 1024×341, marges |
| `microdeon/logo-wordmark-trim.png` | wordmark | transparent | header, footer | recadré 637×286 |
| `microdeon/mark.png` | mark | transparent | favicon, icône | M rouge + carré blanc ; 1024×1024 |

## Vendors: catalogue

### Agents / AI

| Slug | Fichier | Rôle | Fond | Usage | Notes |
|------|---------|------|------|-------|-------|
| `hermes` | `vendors/hermes/mark-avatar.jpg` | mark | clair | avatar / carte agent | Portrait anime B&W + casque, « N » sur col |
| `hermes` | `vendors/hermes/mark-diff.png` | mark | clair | variante courte | Même personnage, crop différent |
| `hermes` | `vendors/hermes/mark-long.jpg` | mark | clair | variante carrée | Portrait plus large |
| `goose` | `vendors/goose/mark.svg` | mark | transparent | icône agent (fond sombre) | Silhouette oie, `#F4F4F4` |
| `goose` | `vendors/goose/mark.png` | mark | clair | archive | Oie noire (ne plus brancher) |
| `huihui` | `vendors/huihui/mark.webp` | mark | sombre | icône modèle / provider | Lettres « AI » bleu cyan, motif circuit |
| `orca-router` | `vendors/orca-router/mark.jpg` | mark | clair | provider / modèle | Orque 3D bleue (OrcaRouter) |
| `claude-code` | `vendors/claude-code/wordmark.jpg` | wordmark | sombre | badge produit | Texte « CLAUDE CODE » terracotta |
| `claude-code` | `vendors/claude-code/mark.svg` | mark | transparent | icône agent (fond sombre) | Robot Claude Code, terracotta `#D97757` |
| `claude-code` | `vendors/claude-code/mark-mascot.jpg` | mark | sticker | archive | Pixel art orange (mascotte, ne plus brancher) |
| `codex` | `vendors/codex/mark.svg` | mark | transparent | icône agent (fond sombre) | Nœud Codex, `#F4F4F4` |
| `openclaw` | `vendors/openclaw/mark.svg` | mark | transparent | icône agent (fond sombre) | Pince OpenClaw, `#FF4D4D` |
| `continue` | `vendors/continue/mark.svg` | mark | transparent | icône agent (fond sombre) | Losanges Continue, `#F4F4F4` |
| `cline` | `vendors/cline/mark.svg` | mark | transparent | icône agent (fond sombre) | Bot Cline, `#F0F4FF` |
| `omp` | `vendors/omp/mark.svg` | mark | transparent | icône agent (fond sombre) | π officiel omp.sh, dégradé `#ed4abf` → `#9b4dff` → `#5ad8e6` |
| `omp` | `vendors/omp/mark.png` | mark | sombre | archive | Raster du π (ne plus brancher) |
| `cursor` | `vendors/cursor/mark.svg` | mark | transparent | icône éditeur (fond sombre) | Cube 2.5D officiel (triangle blanc) |
| `cursor` | `vendors/cursor/mark.png` | mark | sombre | archive | Raster du cube (ne plus brancher) |
| `cursor` | `vendors/cursor/logo-with-text.jpg` | logo | transparent / clair | badge éditeur | Cube + wordmark « CURSOR » |

### Plateformes

| Slug | Fichier | Rôle | Fond | Usage | Notes |
|------|---------|------|------|-------|-------|
| `github` | `vendors/github/mark.svg` | mark | transparent | OAuth / social (fond sombre) | Octocat, `#F4F4F4` |
| `github` | `vendors/github/mark.png` | mark | clair | archive | Raster (ne plus brancher) |
| `google` | `vendors/google/mark.svg` | mark | transparent | OAuth / social | « G » 4 couleurs officiel |
| `google` | `vendors/google/mark.png` | mark | clair | archive | Raster (ne plus brancher) |
| `microsoft` | `vendors/microsoft/mark.svg` | mark | transparent | OAuth / social | 4 carrés officiels |
| `microsoft` | `vendors/microsoft/mark.webp` | mark | clair | archive | Raster (ne plus brancher) |
| `huggingface` | `vendors/huggingface/mark.svg` | mark | transparent | provider modèles | Logo officiel huggingface.co |
| `huggingface` | `vendors/huggingface/mark.png` | mark | clair | archive | Raster (ne plus brancher) |

### Outils cyber / observabilité

| Slug | Fichier | Rôle | Fond | Usage | Notes |
|------|---------|------|------|-------|-------|
| `wazuh` | `vendors/wazuh/mark.svg` | wordmark | transparent | **intégration SIEM/XDR** | Wordmark officiel `#F4F4F4` + pastille `#3585F9` |
| `wazuh` | `vendors/wazuh/mark.png` | mark | sombre | archive | Raster aileron Wireshark classé à tort (ne plus brancher) |
| `wireshark` | `vendors/wireshark/mark.svg` | mark | transparent | capture réseau | Icône officielle app (carré bleu + aileron) |
| `wireshark` | `vendors/wireshark/mark.png` | mark | sombre | archive | Aileron 3D raster (ne plus brancher) |
| `burp-suite` | `vendors/burp-suite/mark.svg` | mark | transparent | icône outil (fond sombre) | Cercle gris `#999` / pêche `#FFAC76`, zigzag blanc |
| `burp-suite` | `vendors/burp-suite/mark.png` | mark | sombre | archive | Raster du cercle (ne plus brancher) |
| `caido` | `vendors/caido/mark.svg` | mark | transparent | proxy / pentest | Logo officiel Caido (`brand/svg/logo.svg`) |
| `caido` | `vendors/caido/mark.png` | mark | sombre | archive | Raster (ne plus brancher) |
| `ida` | `vendors/ida/logo.png` | logo | transparent | icône outil (fond sombre) | Wordmark cyan « IDA » au-dessus du portrait officiel — pas de SVG produit |
| `ida` | `vendors/ida/mark.png` | mark | transparent | archive | Portrait seul (ne plus brancher) |
| `ida` | `vendors/ida/logo-with-text.jpg` | logo | clair | archive | Portrait + « IDA » (ne plus brancher) |
| `nmap` | `vendors/nmap/mark.png` | mark | sombre | scan réseau | Œil wireframe cadré (le SVG officiel nmap.org est un lockup trop large pour les badges) |
| `nmap` | `vendors/nmap/mark.svg` | logo | transparent | archive | SVG officiel nmap.org (œil + NMAP.ORG), trop large en badge |
| `nmap` | `vendors/nmap/logo-with-text.png` | logo | sombre | archive | Œil + wordmark « NMAP » |
| `elasticsearch` | `vendors/elasticsearch/mark.svg` | mark | transparent | stack Elastic | Cluster officiel Elastic (cellules colorées + contour blanc) |
| `elasticsearch` | `vendors/elasticsearch/mark-on-dark.png` | mark | sombre | archive | Cluster multicolore (ne plus brancher) |
| `elasticsearch` | `vendors/elasticsearch/mark-transparent.png` | mark | transparent | archive | Même cluster, fond transparent |
| `volatility` | `vendors/volatility/mark.svg` | mark | transparent | icône outil (fond sombre) | Power clair + ECG `#CF2E3D` |
| `volatility` | `vendors/volatility/mark.jpg` | mark | clair | archive | Raster (ne plus brancher) |

## Misc (ne pas utiliser comme logo produit)

| Fichier | Description |
|---------|-------------|
| `misc/burp-suite-dashboard-screenshot.png` | Capture UI Burp Suite Community: démo / doc uniquement |
| `misc/orca-router-landing-screenshot.png` | Capture landing orcarouter.ai: référence concurrent / inspiration, pas un logo |

## Règles pour l’agent front

1. **Lire ce README** avant d’ajouter ou de référencer un asset.
2. Une seule source : `public/brand/`: pas de copie dans `src/assets/`.
3. Microdeon → `microdeon/` ; tiers → `vendors/{slug}/` ; captures → `misc/`.
4. Choisir la variante selon le **fond réel** (clair / sombre).
5. `alt` = nom lisible (`Microdeon`, `Wazuh`, …) ; décoratif → `alt=""`.
6. Respecter les marques tierces (tailles raisonnables, pas de déformation, pas de recoloration abusive).
7. Nouveau fichier → le placer au bon slug, le renommer selon la convention, **mettre à jour ce tableau**.

## Corrections déjà appliquées

| Erreur initiale | Correction |
|-----------------|------------|
| Fichier `wazuhicon…` = logo WorkOS (« W. » bleu) | Supprimé (pas Wazuh) |
| Fichier `wiresharklogo…` classé comme Wazuh | → `vendors/wireshark/mark.png` (archive) ; Wazuh = wordmark SVG officiel |
| Fichier `ompicon…` classé à tort comme Cursor | → `vendors/omp/mark.svg` (omp.sh). Cursor = cube facettes. |

## Statut

- [x] Logos classés (dont Wazuh pour intégration)
- [x] Catalogue README à jour
- [x] WorkOS retiré (mauvais fichier)
- [x] Brancher header / favicon Microdeon
- [x] Brancher grilles intégrations (vendors), dont Wazuh
