# Agentenradar

## Unterstützte Sprachen

🇬🇧 Englisch | [🇺🇦 Українська](./README.uk-UA.md) | [🇸🇦 العربية](./README.ar-SA.md) | [🇷🇺 Русский](./README.ru-RU.md) | [🇮🇳 हिन्दी](./README.hi-IN.md) | [🇩🇪 Deutsch](./README.de-DE.md) | [🇹🇷 Türkçe](./README.tr-TR.md) | [🇹🇭 ไทย](./README.th-TH.md) | [🇵🇱 Polski](./README.pl-PL.md) | [🇮🇹 Italiano](./README.it-IT.md) | [🇫🇷 Français](./README.fr-FR.md) | [🇨🇳 中文](./README.zh-CN.md) | [🇧🇷 Português](./README.pt-BR.md) | [🇻🇳 Tiếng Việt](./README.vi-VN.md) | [🇧🇩 বাংলা](./README.bn-BD.md) | [🇪🇸 Español](./README.es-ES.md) | [🇮🇩 Bahasa Indonesia](./README.id-ID.md) | [🇷🇴 Română](./README.ro-RO.md) | [🇰🇷 한국어](./README.ko-KR.md) | [🇳🇱 Nederlands](./README.nl-NL.md) | [🇯🇵 Japanisch](./README.ja-JP.md)

Informationen zur Aktivierung weiterer Sprachen für die Berichtserstellung finden Sie unter [Mehrsprachige Unterstützung](./docs/setup.md#multi-language-support).

Ein GitHub Actions-Workflow, der täglich um 8:00 Uhr CST ausgeführt wird. Er aggregiert Signale des KI-Ökosystems aus 10 Datenquellen und veröffentlicht anschließend tägliche Zusammenfassungen (in allen konfigurierten Sprachen) als GitHub-Issues und Commits in Markdown. Wöchentliche und monatliche Rollup-Berichte werden ebenfalls automatisch generiert.

## Datenquellen

| Quelle | Typ | Daten |

--------|------|------|

[GitHub-Repos](https://github.com) | API | Issues, Pull Requests, Releases aus über 17 verfolgten KI-Tool-Repos |

[Claude Code Skills](https://github.com/anthropics/skills) | API | Trendkompetenzen sortiert nach Community-Engagement |

[GitHub Trending](https://github.com/trending) | HTML + API | Täglich trendige Repositories + KI-Themensuche (7-Tage-Fenster) |

[Hacker News](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | Die 30 wichtigsten KI-News der letzten 24 Stunden, 6 parallele Abfragen |

[Product Hunt](https://www.producthunt.com) | GraphQL API | Die beliebtesten KI-Produkte von gestern (nach Stimmen) |

[ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | Neueste Veröffentlichungen aus cs.AI, cs.CL und cs.LG (letzte 48 Stunden) |

[Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 Trendmodelle, sortiert nach wöchentlichen Likes |

[Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | Top-Artikel zu KI/ML aus 5 Tags |

[Lobste.rs](https://lobste.rs) | JSON API | Artikel zu KI/ML der letzten 7 Tage |

[Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Sitemap | Neue Artikel werden über `lastmod`-Diff erkannt |

## Web-UI

**`PAGES_URL`** – Legen Sie diese Variable im Repository fest, um die Basis-URL der Web-UI für Ihren Fork zu konfigurieren.

Durchsuchen Sie alle historischen Digests in einer übersichtlichen, dunklen Oberfläche – keine Anmeldung erforderlich. Die Berichte werden aus den Markdown-Dateien dieses Repos über GitHub Pages generiert.

Die Web-Oberfläche ist eine Vite-basierte Single-Page-Anwendung (SPA) mit TypeScript im Verzeichnis `packages/web/`. Sie lädt die `manifest.json`-Datei und die einzelnen Digest-Dateien zur Laufzeit – neue tägliche Digests werden ohne Neuaufbau der Benutzeroberfläche angezeigt.
...```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```

![Web UI](assets/web-en.png)

## Telegram-Kanal & Feishu-Gruppe

Abonnieren Sie den Kanal, um täglich Zusammenfassungen direkt auf Ihrer bevorzugten Plattform zu erhalten. Jede Nachricht enthält Links zu allen Berichten des Tages sowie zur Web-Oberfläche und zum RSS-Feed.

<table>
<tr>

<td align="center"><b><a href="https://t.me/agents_radar">Telegram-Kanal beitreten</a></b></td>

<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Feishu-Gruppe beitreten</a></b></td>

</tr>

<tr>

<td><img src="assets/telegram.jpg" width="300" alt="Telegram-Benachrichtigung"></td>

<td><img src="assets/feishu.jpg" width="300" alt="Feishu-Benachrichtigung"></td>

</tr>

</table>

## RSS Feed

**`PAGES_URL`/feed.xml** – Abonnieren Sie diesen Feed in einem beliebigen RSS-Reader (Feedly, Reeder, NewsBlur usw.), um automatisch neue Zusammenfassungen zu erhalten. Die Feed-URL wird aus Ihrer `PAGES_URL`-Einstellung abgeleitet. Der Feed enthält die 30 neuesten Berichte aller Berichtstypen, die täglich zusammen mit der `manifest.json` aktualisiert werden.

## MCP-Server

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Ein gehosteter Server des Model Context Protocol (MCP) (https://modelcontextprotocol.io), der Daten von agents-radar als Tools bereitstellt. Jeder MCP-kompatible Client (Claude Desktop, OpenClaw usw.) kann die neuesten Berichte des KI-Ökosystems direkt abfragen.

**Verfügbare Tools:**

| Tool | Beschreibung |

|------|-------------|

| `list_reports` | Verfügbare Daten und Berichtstypen der letzten N Tage auflisten |

| `get_latest` | Den neuesten Bericht eines bestimmten Typs abrufen |

| `get_report` | Einen bestimmten Bericht nach Datum und Typ abrufen |

| `search` | Stichwortsuche in den letzten Berichten |

**Claude Desktop-Einrichtung** – Fügen Sie Folgendes zu `~/Library/Application Support/Claude/claude_desktop_config.json` hinzu:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
Starten Sie Claude Desktop nach dem Speichern neu. Anschließend können Sie Claude beispielsweise folgende Fragen stellen:

- *„Was gibt es Neues bei KI-CLI-Tools?“* → Aufruf von `get_latest`

- *„Suche nach Erwähnungen von Claude Code in dieser Woche“* → Aufruf von `search`

* „Zeig mir den KI-Trendbericht vom 05.03.2026“* → Aufruf von `get_report`

**OpenClaw-Einrichtung** – Führen Sie folgenden Befehl aus:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
Oder fügen Sie es manuell zu `~/.openclaw/openclaw.json` hinzu:

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
Sie können OpenClaw dann beispielsweise folgende Fragen stellen:

- *„Was ist das Neueste bei KI-CLI-Tools?“* → Aufruf von `get_latest`

- *„Suche nach Erwähnungen von Claude Code in dieser Woche“* → Aufruf von `search`

* „Zeig mir den KI-Trendbericht vom 05.03.2026“* → Aufruf von `get_report`

**Selbsthosting** – Stellen Sie Ihre eigene Instanz aus dem Verzeichnis `mcp/` bereit:

```bash
cd mcp
pnpm install
wrangler deploy
```
## Erfasste Quellen

10 Datenquellen aus GitHub-Repos, News, Forschungsarbeiten und Community-Feeds. Die vollständige Liste mit Repository-Links und Details zu den einzelnen Quellen finden Sie in [docs/sources.md](./docs/sources.md).

**Kurzfassung:** 9 KI-CLI-Repos + OpenClaw + 12 Peer-Agenten (GitHub-API) · Claude Code Skills · GitHub Trending (HTML + Such-API) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + OpenAI-Sitemaps.

## Funktionen

- Ruft Issues, Pull Requests und Releases der letzten 24 Stunden aus allen überwachten Repositories ab.

- Verfolgt die aktuellen Claude Code Skills – sortiert nach Community-Engagement, nicht nach Aktualität.

- Generiert eine Tool-spezifische Zusammenfassung für jedes CLI-Repository sowie eine Tool-übergreifende Vergleichsanalyse.

- Generiert einen detaillierten OpenClaw-Projektbericht sowie einen Ökosystem-übergreifenden Vergleich mit 11 vergleichbaren Projekten.

- Durchsucht offizielle Webinhalte von Anthropic und OpenAI über Sitemaps und erkennt neue Artikel inkrementell.

- Überwacht täglich die GitHub-Trends und durchsucht 6 KI-Themen-Tags; klassifiziert Repositories nach Dimension und extrahiert Trendsignale.

- Ruft die Top-30-KI-Artikel von Hacker News (letzte 24 Stunden, nach Punkten sortiert) ab und generiert einen Bericht zur Community-Stimmung.

- Veröffentlicht GitHub-Issues für jeden Berichtstyp und speichert Markdown-Dateien in `assets/digests/YYYY-MM-DD/`.
- Wird täglich über GitHub Actions ausgeführt. Unterstützt manuelle Auslösung

- Alle überwachten Repositories sind über `config.yml` konfigurierbar – keine Codeänderungen erforderlich
- Zentrales Gebietsschema-System über `locales/*.json` – 21 unterstützte Sprachen mit `t()`-Katalog in `packages/core/src/locales/t.ts`

## Einrichtung

1. **Forken Sie** dieses Repository.

2. Fügen Sie Ihren LLM-Provider-Schlüssel als Repository-Secret hinzu (z. B. `ANTHROPIC_API_KEY`).

3. Aktivieren Sie den Workflow im Tab **Aktionen** – er wird anschließend automatisch ausgeführt.

Die vollständige Anleitung – Secrets-Referenz, LLM-Provider, Anpassung von `config.yml`, lokale Entwicklung, Mehrsprachigkeitskonfiguration und Zeitplan – finden Sie in [docs/setup.md](./docs/setup.md).

## Ausgabeformat

Eine Datei pro Berichtstyp und aktivierter Sprache, gespeichert in `assets/digests/YYYY-MM-DD/`. Historische Digests befinden sich in [`assets/digests/`](./assets/digests/). Die vollständige Dateiliste, die Berichtsstruktur und eine Referenz der GitHub-Issue-Labels finden Sie in [docs/output-format.md](./docs/output-format.md).

## FAQ

Häufig gestellte Fragen – warum ein Bericht übersprungen wurde, wie hoch die Kosten für die Ausführung sind, Hinzufügen von Repositories, Ändern des Zeitplans, Behebung von 429-Fehlern – werden in [docs/faq.md](./docs/faq.md) beantwortet.

## Mitwirken

Beiträge sind willkommen. Informationen zur Branch-Strategie, zu Codierungsstandards, Commit-Konventionen und Anweisungen zum Hinzufügen neuer Sprachen oder Berichtstypen finden Sie in [CONTRIBUTING.md](./CONTRIBUTING.md).


Mitwirken ## Sternengeschichte

[![Sternengeschichte-Diagramm](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)

