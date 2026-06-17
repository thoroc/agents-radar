# agenten-radar

## Ondersteunde talen

🇬🇧 Engels · 🇨🇳 中文 · 🇯🇵 日本語 · 🇰🇷 한국어 · 🇪🇸 Español · 🇧🇷 Português · 🇫🇷 Français · 🇩🇪 Deutsch · 🇮🇹 Italiano · 🇵🇱 Polski · 🇷🇺 Русский · 🇸🇦 العربية · 🇹🇷 Türkçe · 🇻🇳 Tiếng Việt · 🇹🇭 ไทย · 🇳🇱 Nederlands · 🇮🇳 हिन्दी · 🇷🇴 Română · 🇮🇩 Bahasa Indonesia · 🇺🇦 Українська · 🇧🇩 বাংলা

Engels | [中文](./README.zh-CN.md)

Zie [Ondersteuning voor meerdere talen](./docs/setup.md#multi-language-support) voor meer informatie over het inschakelen van extra talen voor het genereren van rapporten.

Een GitHub Actions-workflow die elke ochtend om 08:00 CST wordt uitgevoerd. Deze workflow verzamelt signalen uit het AI-ecosysteem van 10 gegevensbronnen en publiceert vervolgens dagelijkse samenvattingen (in alle geconfigureerde talen) als GitHub Issues en vastgelegde Markdown-bestanden. Wekelijkse en maandelijkse overzichtsrapporten worden ook automatisch gegenereerd.

## Gegevensbronnen

| Bron | Type | Gegevens |

|--------|------|------|

| [GitHub-repositories](https://github.com) | API | Issues, pull requests, releases van meer dan 17 gevolgde AI-toolrepositories |

| [Claude Code Skills](https://github.com/anthropics/skills) | API | Populaire vaardigheden gesorteerd op betrokkenheid van de community |

| [GitHub Trending](https://github.com/trending) | HTML + API | Dagelijkse trending repositories + zoekopdracht naar AI-onderwerpen (venster van 7 dagen) |

| [Hacker News](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | Top 30 AI-verhalen van de afgelopen 24 uur, 6 parallelle zoekopdrachten |

| [Product Hunt](https://www.producthunt.com) | GraphQL API | De beste AI-producten van gisteren op basis van stemmen |

| [ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | Nieuwste papers van cs.AI, cs.CL, cs.LG (afgelopen 48 uur) |

| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 trending modellen gesorteerd op wekelijkse likes |

| [Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | Top AI/LLM-artikelen van 5 tags |

| [Lobste.rs](https://lobste.rs) | JSON API | Verhalen met AI/ML-tags van de afgelopen 7 dagen |

| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Sitemap | Nieuwe artikelen gedetecteerd via `lastmod` diff |

## Web UI

**`PAGES_URL`** — Stel dit in als een repository-variabele om de basis-URL van de web-UI voor uw fork te configureren.

Bekijk alle historische samenvattingen in een overzichtelijke interface met een donker thema — inloggen is niet nodig. Rapporten worden gegenereerd vanuit de Markdown-bestanden in deze repository via GitHub Pages.

De webinterface is een Vite + TypeScript SPA in `packages/web/`. Deze haalt het `manifest.json`-bestand en de afzonderlijke digest-bestanden op tijdens de uitvoering — nieuwe dagelijkse digests verschijnen zonder dat de gebruikersinterface opnieuw hoeft te worden opgebouwd.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```
![Web UI](assets/web-en.png)

## Telegramkanaal & Feishu-groep

Abonneer je om dagelijkse samenvattingen rechtstreeks op je favoriete platform te ontvangen. Elk bericht bevat links naar alle rapporten van die dag, plus de webinterface en de RSS-feed.

<table>

<tr>

<td align="center"><b><a href="https://t.me/agents_radar">Word lid van het Telegram-kanaal</a></b></td>

<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Word lid van de Feishu-groep</a></b></td>

</tr>

<tr>

<td><img src="assets/telegram.jpg" width="300" alt="Telegram-melding"></td>

<td><img src="assets/feishu.jpg" width="300" alt="Feishu-melding"></td>

</tr>
</table>

## RSS Feed

**`PAGES_URL`/feed.xml** — Abonneer u in een RSS-reader (Feedly, Reeder, NewsBlur, enz.) om automatisch nieuwe samenvattingen te ontvangen. De feed-URL is afgeleid van uw `PAGES_URL`-instelling. De feed bevat de 30 meest recente rapporten van alle rapporttypen, die dagelijks worden bijgewerkt samen met `manifest.json`.

## MCP-server

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Een gehoste [Model Context Protocol](https://modelcontextprotocol.io)-server die agents-radar-gegevens beschikbaar stelt als tools. Elke MCP-compatibele client (Claude Desktop, OpenClaw, enz.) kan de meest recente AI-ecosysteemrapporten direct opvragen.

**Beschikbare tools:**

| Tool | Beschrijving |

|------|-------------|

| `list_reports` | Lijst met beschikbare datums en rapporttypen (laatste N dagen) |
| `get_latest` | Haal het meest recente rapport van een bepaald type op |

| `get_report` | Haal een specifiek rapport op op basis van datum en type |

| `search` | Zoeken op trefwoord in recente rapporten |

**Claude Desktop-configuratie** — voeg toe aan `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
Claude Desktop opnieuw opstarten na het opslaan. Je kunt Claude vervolgens vragen stellen zoals:

- *"Wat is de nieuwste versie van AI CLI-tools?"* → roept `get_latest` aan
- *"Zoek naar vermeldingen van Claude Code deze week"* → roept `search` aan
- *"Toon me het AI-trendrapport voor 5 maart 2026"* → roept `get_report` aan

**OpenClaw-installatie** — voer de volgende opdracht uit:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
Of voeg het handmatig toe aan `~/.openclaw/openclaw.json`:

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
Je kunt OpenClaw dan vragen stellen zoals:

- *"Wat is de nieuwste versie van AI CLI-tools?"* → roept `get_latest` aan
- *"Zoek naar vermeldingen van Claude Code deze week"* → roept `search` aan
- *"Toon me het AI-trendrapport voor 5 maart 2026"* → roept `get_report` aan

**Zelfhosting** — implementeer je eigen instantie vanuit de map `mcp/`:

```bash
cd mcp
pnpm install
wrangler deploy
```

## Gevolgde bronnen

10 gegevensbronnen verspreid over GitHub-repositories, nieuws, onderzoek en communityfeeds. Zie [docs/sources.md](./docs/sources.md) voor de volledige lijst met links naar repositories en details per bron.

**Korte samenvatting:** 9 AI CLI-repositories + OpenClaw + 12 peer agents (GitHub API) · Claude Code Skills · GitHub Trending (HTML + Search API) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + OpenAI-sitemaps.

## Functies

- Haalt issues, pull requests en releases op die de afgelopen 24 uur zijn bijgewerkt in alle gevolgde repositories
- Volgt trending Claude Code Skills — gesorteerd op communitybetrokkenheid, niet op recentheid
- Genereert een samenvatting per tool voor elke CLI-repository en een vergelijkende analyse van alle tools
- Genereert een uitgebreid OpenClaw-projectrapport plus een vergelijking met 11 vergelijkbare projecten
- Schraapt officiële Anthropic- en OpenAI-webcontent via sitemaps; detecteert incrementeel nieuwe artikelen
- Monitort dagelijks GitHub Trending + doorzoekt 6 AI-onderwerptags; classificeert repositories op dimensie en extraheert trendsignalen
- Haalt de top 30 AI-verhalen van Hacker News op (laatste 24 uur, gerangschikt op punten); genereert een rapport over het sentiment binnen de community
- Publiceert GitHub Issues voor elk rapporttype; commit Markdown-bestanden naar `assets/digests/YYYY-MM-DD/`
- Draait dagelijks via GitHub Actions; Ondersteunt handmatige activering
- Alle gevolgde repositories zijn configureerbaar via `config.yml` — geen codeaanpassingen nodig
- Gecentraliseerd lokalisatiesysteem via `locales/*.json` — 21 ondersteunde talen met een `t()`-catalogus in `packages/core/src/locales/t.ts`

## Installatie

1. **Fork** deze repository
2. Voeg uw LLM-providersleutel toe als een repositorygeheim (bijv. `ANTHROPIC_API_KEY`)
3. Schakel de workflow in op het tabblad **Acties** — deze wordt vanaf dat moment automatisch uitgevoerd

Voor de volledige handleiding — referentie voor geheimen, LLM-providers, aanpassing van `config.yml`, lokale ontwikkeling, configuratie voor meerdere talen en planning — zie [docs/setup.md](./docs/setup.md).

## Uitvoerformaat

Eén bestand per rapporttype per ingeschakelde taal, geschreven naar `assets/digests/JJJJ-MM-DD/`. Historische samenvattingen bevinden zich in [`assets/digests/`](./assets/digests/). Zie [docs/output-format.md](./docs/output-format.md) voor de volledige bestandslijst, de structuur per rapport en de referentie naar GitHub Issue-labels.

## Veelgestelde vragen

Veelgestelde vragen — waarom een rapport is overgeslagen, wat de kosten zijn, repositories toevoegen, het schema wijzigen, problemen met 429-fouten oplossen — worden beantwoord in [docs/faq.md](./docs/faq.md).

## Bijdragen

Bijdragen zijn welkom. Zie [CONTRIBUTING.md](./CONTRIBUTING.md) voor de branchstrategie, codeerstandaarden, commit-conventies en instructies voor het toevoegen van nieuwe talen of rapporttypen.

## Stargeschiedenis

[![Stargeschiedenisgrafiek](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)

