# agents-radar

## Langues prises en charge

🇫🇷 Français · 🇩🇪 Deutsch · 🇮🇹 Italiano · 🇵🇱 Polski · 🇷🇺 Русский · 🇸🇦 العربية · 🇹🇷 Türkçe · 🇻🇳 Tiếng Việt · 🇹🇭 Thaï · 🇳🇱 Néerlandais · 🇮🇳 Hindi · 🇷🇴 Roumain · 🇮🇩 Indonésien · 🇺🇦 Ukrainien · 🇧🇩 Bengali

Anglais | [Chinois](./README.zh-CN.md)

Pour activer d'autres langues pour la génération de rapports, consultez la section [Prise en charge multilingue](./docs/setup.md#multi-language-support).

Un workflow GitHub Actions s'exécute chaque matin à 8 h 00 CST. Il agrège les signaux de l'écosystème de l'IA provenant de 10 sources de données, puis publie des synthèses quotidiennes (dans toutes les langues configurées) sous forme de tickets GitHub et de fichiers Markdown. Des rapports de synthèse hebdomadaires et mensuels sont également générés automatiquement.

## Sources de données

| Source | Type | Données |

|--------|------|------|

| [Dépôts GitHub](https://github.com) | API | Tickets, demandes de tirage et versions de plus de 17 dépôts d'outils d'IA suivis |

| [Claude Code Skills](https://github.com/anthropics/skills) | API | Compétences populaires classées par engagement communautaire |

| [Tendances GitHub](https://github.com/trending) | HTML + API | Dépôts populaires du jour + recherche de sujets d'IA (période de 7 jours) |

| [Hacker News](https://news.ycombinator.com) | [API Algolia](https://hn.algolia.com/api) | Top 30 des articles IA des dernières 24h, 6 requêtes parallèles |

| [Product Hunt](https://www.producthunt.com) | API GraphQL | Meilleurs produits IA d'hier (par votes) |

| [ArXiv](https://arxiv.org) | [API ArXiv](https://export.arxiv.org/api/query) | Publications récentes de cs.AI, cs.CL et cs.LG (48h) |

| [Hugging Face](https://huggingface.co) | [API Hub](https://huggingface.co/api/models) | 30 modèles populaires (classés par popularité hebdomadaire) |

| [Dev.to](https://dev.to) | [API Forem](https://dev.to/api) | Meilleurs articles IA/LLM (5 tags) | | [Lobste.rs](https://lobste.rs) | API JSON | Articles étiquetés IA/ML des 7 derniers jours |

| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Plan du site | Nouveaux articles détectés via la commande `lastmod` diff |

## Interface web

**`PAGES_URL`** — Définissez cette variable de dépôt pour configurer l'URL de base de l'interface web de votre fork.

Parcourez tous les résumés historiques dans une interface épurée au thème sombre — aucune connexion requise. Les rapports sont générés à partir des fichiers Markdown de ce dépôt via GitHub Pages.

L'interface web est une application monopage (SPA) Vite + TypeScript située dans `packages/web/`. Elle récupère `manifest.json` et les fichiers de résumés individuels à l'exécution — les nouveaux résumés quotidiens s'affichent sans reconstruction de l'interface.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```


![Interface Web](assets/web-en.png)

## Chaîne Telegram et Groupe Feishu

Abonnez-vous pour recevoir chaque jour un récapitulatif directement sur votre plateforme préférée. Chaque message contient un lien vers tous les rapports du jour, ainsi que vers l'interface Web et le flux RSS.

<table>

<tr>

<td align="center"><b><a href="https://t.me/agents_radar">Rejoindre le canal Telegram</a></b></td>

<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Rejoindre le groupe Feishu</a></b></td>

</tr>

<tr>

<td><img src="assets/telegram.jpg" width="300" alt="Notification Telegram"></td>

<td><img src="assets/feishu.jpg" width="300" alt="Notification Feishu"></td>

</tr>
</table>

## Flux RSS

**`PAGES_URL`/feed.xml` — Abonnez-vous via n'importe quel lecteur RSS (Feedly, Reeder, NewsBlur, etc.) pour recevoir automatiquement les nouveaux résumés. L'URL du flux est dérivée de votre paramètre `PAGES_URL`. Le flux inclut les 30 derniers rapports, tous types confondus, mis à jour quotidiennement avec `manifest.json`.

## Serveur MCP

**`https://agents-radar-mcp.duanyytop.workers.dev``**

Serveur hébergé [Model Context Protocol](https://modelcontextprotocol.io) exposant les données agents-radar sous forme d'outils. Tout client compatible MCP (Claude Desktop, OpenClaw, etc.) peut interroger directement les derniers rapports de l'écosystème d'IA.

**Outils disponibles :**

| Outil | Description |

|------|-------------|

| `list_reports` | Liste des dates et types de rapports disponibles (N derniers jours) |

| `get_latest` | Récupérer le rapport le plus récent d'un type donné |

| `get_report` | Récupérer un rapport spécifique par date et type |

| `search` | Recherche par mot-clé dans les rapports récents |

**Configuration de Claude Desktop** — ajoutez les lignes suivantes à `~/Library/Application Support/Claude/claude_desktop_config.json` :

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
Redémarrez Claude Desktop après avoir enregistré. Vous pourrez ensuite interroger Claude sur des sujets tels que :

- *« Quelles sont les dernières nouveautés en matière d’outils CLI d’IA ? »* → appelle `get_latest`

- *« Rechercher les mentions de Claude Code cette semaine »* → appelle `search`

- *« Afficher le rapport sur les tendances IA du 05/03/2026 »* → appelle `get_report`

**Configuration d’OpenClaw** — exécutez la commande suivante :

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
Vous pouvez aussi l'ajouter manuellement à `~/.openclaw/openclaw.json` :

```json
{
  "mcpServers": {
    "agents-radar": {
      "type": "http",
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
Vous pouvez ensuite interroger OpenClaw sur des sujets tels que :

- *« Quelles sont les dernières nouveautés en matière d’outils CLI d’IA ? »* → appelle `get_latest`

- *« Rechercher les mentions de Claude Code cette semaine »* → appelle `search`

- *« Afficher le rapport sur les tendances IA du 05/03/2026 »* → appelle `get_report`

**Auto-hébergement** — déployez votre propre instance depuis le répertoire `mcp/` :

```bash
cd mcp
pnpm install
wrangler deploy
```


## Sources suivies

10 sources de données issues de dépôts GitHub, d'actualités, de recherches et de flux communautaires. Consultez [docs/sources.md](./docs/sources.md) pour la liste complète avec les liens vers les dépôts et les détails de chaque source.

**Résumé rapide :** 9 dépôts d'interfaces de ligne de commande d'IA + OpenClaw + 12 agents pairs (API GitHub) · Claude Code Skills · Tendances GitHub (HTML + API de recherche) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Plans de site Anthropic + OpenAI.

## Fonctionnalités

- Récupère les tickets, les demandes de fusion et les versions mises à jour au cours des dernières 24 heures dans tous les dépôts suivis.

- Suit les compétences Claude Code les plus populaires, triées par engagement communautaire, et non par date de publication.
- Génère un résumé par outil pour chaque dépôt CLI et une analyse comparative inter-outils.
- Génère un rapport détaillé sur le projet OpenClaw ainsi qu'une comparaison inter-écosystèmes avec 11 projets similaires.
- Extrait le contenu web officiel d'Anthropic et d'OpenAI via les sitemaps ; détecte les nouveaux articles de manière incrémentale.
- Surveille quotidiennement les tendances GitHub et effectue des recherches sur 6 tags thématiques IA ; classe les dépôts par dimension et extrait les signaux de tendance.
- Récupère les 30 articles les plus importants sur l'IA sur Hacker News (dernières 24 h, classés par points) ; génère un rapport sur le sentiment de la communauté.
- Publie les tickets GitHub pour chaque type de rapport ; enregistre les fichiers Markdown dans `assets/digests/AAAA-MM-JJ/`.

- S'exécute quotidiennement via GitHub Actions. Prise en charge du déclenchement manuel

- Tous les dépôts suivis sont configurables via `config.yml` — aucune modification de code n'est nécessaire

- Système de localisation centralisé via `locales/*.json` — 21 langues prises en charge avec le catalogue `t()` dans `packages/core/src/locales/t.ts`

## Configuration

1. **Dupliquez** ce dépôt

2. Ajoutez votre clé de fournisseur LLM comme secret de dépôt (par exemple, `ANTHROPIC_API_KEY`)

3. Activez le flux de travail dans l'onglet **Actions** — il s'exécutera automatiquement ensuite

Pour le guide complet — référence des secrets, fournisseurs LLM, personnalisation de `config.yml`, développement local, configuration multilingue et planification — consultez [docs/setup.md](./docs/setup.md).

## Format de sortie

Un fichier par type de rapport et par langue activée, enregistré dans `assets/digests/AAAA-MM-JJ/`. Les résumés historiques se trouvent dans [`assets/digests/`](./assets/digests/). Consultez [docs/output-format.md](./docs/output-format.md) pour obtenir la liste complète des fichiers, la structure de chaque rapport et la référence des étiquettes des problèmes GitHub.

## FAQ

Questions fréquentes — pourquoi un rapport a été ignoré, combien coûte son exécution, ajouter des dépôts, modifier la planification, résoudre les erreurs 429 — les réponses se trouvent dans [docs/faq.md](./docs/faq.md).

## Contribuer

Les contributions sont les bienvenues. Consultez [CONTRIBUTING.md](./CONTRIBUTING.md) pour connaître la stratégie de gestion des branches, les normes de codage, les conventions de commit et les instructions pour ajouter de nouveaux langages ou types de rapports.

## Historique des étoiles

[![Graphique de l'historique des étoiles](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)

