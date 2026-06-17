# radar degli agenti

## Lingue supportate

🇬🇧 Inglese · 🇨🇳 中文 · 🇯🇵 日本語 · 🇰🇷 한국어 · 🇪🇸 Español · 🇧🇷 Português · 🇫🇷 Français · 🇩🇪 Deutsch · 🇮🇹 Italiano · 🇵🇱 Polski · 🇷🇺 Русский · 🇸🇦 العربية · 🇹🇷 Türkçe · 🇻🇳 Tiếng Việt · 🇹🇭 ไทย · 🇳🇱 Nederlands · 🇮🇳 हिन्दी · 🇷🇴 Română · 🇮🇩 Bahasa Indonesia · 🇺🇦 Українська · 🇧🇩 বাংলা

Inglese | [Cina](./README.zh-CN.md)

Per abilitare lingue aggiuntive per la generazione di report, consultare [Supporto multilingue](./docs/setup.md#multi-language-support).

Un flusso di lavoro di GitHub Actions che viene eseguito ogni mattina alle 08:00 CST. Aggrega i segnali dell'ecosistema AI da 10 fonti di dati e pubblica riepiloghi giornalieri (in tutte le lingue configurate) come Issue di GitHub e file Markdown di commit. Vengono inoltre generati automaticamente report riepilogativi settimanali e mensili.

## Fonti di dati

| Fonte | Tipo | Dati |

|--------|------|------|

| [Repository GitHub](https://github.com) | API | Issue, PR, release da oltre 17 repository di strumenti AI monitorati |

| [Competenze di Claude Code](https://github.com/anthropics/skills) | API | Competenze di tendenza ordinate in base al coinvolgimento della community |

| [Tendenze di GitHub](https://github.com/trending) | HTML + API | Repository di tendenza giornalieri + ricerca di argomenti AI (finestra temporale di 7 giorni) |

| [Hacker News](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | Le 30 notizie più importanti sull'IA delle ultime 24 ore, 6 query parallele |

[Product Hunt](https://www.producthunt.com) | GraphQL API | I migliori prodotti IA di ieri in base ai voti |

[ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | Ultimi articoli da cs.AI, cs.CL, cs.LG (ultime 48 ore) |

[Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 modelli di tendenza ordinati per numero di "mi piace" settimanali |

[Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | I migliori articoli su IA/LLM per 5 tag |

[Lobste.rs](https://lobste.rs) | API JSON | Articoli con tag AI/ML degli ultimi 7 giorni |

[Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Sitemap | Nuovi articoli rilevati tramite diff `lastmod` |

# Interfaccia Web

**`PAGES_URL`** — Imposta questa variabile di repository per configurare l'URL di base dell'interfaccia Web per il tuo fork.

Consulta tutti i digest storici in un'interfaccia pulita e con tema scuro, senza bisogno di effettuare l'accesso. I report vengono generati dai file Markdown presenti in questo repository tramite GitHub Pages.

L'interfaccia Web è una SPA Vite + TypeScript in `packages/web/`. Recupera `manifest.json` e i singoli file digest in fase di esecuzione: i nuovi digest giornalieri vengono visualizzati senza dover ricostruire l'interfaccia.


```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```
![Interfaccia Web](assets/web-en.png)

## Canale Telegram e Gruppo Feishu

Iscriviti per ricevere notifiche giornaliere con i riepiloghi direttamente sulla tua piattaforma preferita. Ogni messaggio contiene un link a tutti i report del giorno, all'interfaccia web e al feed RSS.


<table>

<tr>

<td align="center"><b><a href="https://t.me/agents_radar">Unisciti al canale Telegram</a></b></td>

<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Unisciti al gruppo Feishu</a></b></td>

</tr>

<tr>

<td><img src="assets/telegram.jpg" width="300" alt="Notifiche Telegram"></td>

<td><img src="assets/feishu.jpg" width="300" alt="Notifiche Feishu"></td>

</tr>
</table>

## RSS Feed

**`PAGES_URL`/feed.xml** — Iscriviti tramite qualsiasi lettore RSS (Feedly, Reeder, NewsBlur, ecc.) per ricevere automaticamente i nuovi riepiloghi. L'URL del feed viene derivato dall'impostazione `PAGES_URL`. Il feed include gli ultimi 30 report di tutte le tipologie, aggiornati quotidianamente insieme al file `manifest.json`.

## Server MCP

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Un server [Model Context Protocol](https://modelcontextprotocol.io) ospitato che espone i dati di agents-radar come strumenti. Qualsiasi client compatibile con MCP (Claude Desktop, OpenClaw, ecc.) può interrogare direttamente gli ultimi report dell'ecosistema AI.

**Strumenti disponibili:**

| Strumento | Descrizione |

|------|-------------|

| `list_reports` | Elenca le date e le tipologie di report disponibili (ultimi N giorni) |

| `get_latest` | Recupera il report più recente di un determinato tipo |


`get_report` | Recupera un report specifico per data e tipo |

`search` | Ricerca per parola chiave nei report recenti |

**Configurazione di Claude Desktop** — aggiungi a `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
Dopo aver salvato, riavvia Claude Desktop. A quel punto potrai chiedere a Claude cose come:

- *"Quali sono le ultime novità sugli strumenti CLI per l'IA?"* → chiama `get_latest`
- *"Cerca le menzioni di Claude Code di questa settimana"* → chiama `search`
- *"Mostrami il report sulle tendenze dell'IA per il 05/03/2026"* → chiama `get_report`

**Configurazione di OpenClaw** — esegui il seguente comando:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
Oppure aggiungilo manualmente al file `~/.openclaw/openclaw.json`:


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
A questo punto, puoi chiedere a OpenClaw cose come:

- *"Quali sono le ultime novità sugli strumenti CLI per l'IA?"* → chiama `get_latest`
- *"Cerca le menzioni di Claude Code di questa settimana"* → chiama `search`
- *"Mostrami il report sulle tendenze dell'IA per il 05/03/2026"* → chiama `get_report`

**Auto-hosting** — distribuisci la tua istanza dalla directory `mcp/`:

```bash
cd mcp
pnpm install
wrangler deploy
```
## Fonti monitorate

10 fonti di dati provenienti da repository GitHub, notizie, ricerche e feed della community. Consulta [docs/sources.md](./docs/sources.md) per l'elenco completo con i link ai repository e i dettagli per ciascuna fonte.

**Breve riepilogo:** 9 repository AI CLI + OpenClaw + 12 agenti peer (API GitHub) · Claude Code Skills · GitHub Trending (HTML + API di ricerca) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + sitemap di OpenAI.

## Funzionalità

- Recupera problemi, pull request e release aggiornate nelle ultime 24 ore da tutti i repository monitorati
- Monitora le competenze di tendenza di Claude Code — ordinate per coinvolgimento della community, non per data
- Genera un riepilogo per ogni strumento per ogni repository CLI e un'analisi comparativa tra strumenti
- Genera un report approfondito del progetto OpenClaw e un confronto tra ecosistemi con 11 progetti simili
- Estrae i contenuti web ufficiali di Anthropic e OpenAI tramite sitemap; rileva i nuovi articoli in modo incrementale
- Monitora quotidianamente le tendenze di GitHub + cerca 6 tag di argomenti sull'IA; classifica i repository per dimensione ed estrae i segnali di tendenza
- Recupera le 30 notizie più importanti sull'IA da Hacker News (ultime 24 ore, classificate per punteggio); genera un report sul sentiment della community
- Pubblica problemi su GitHub per ogni tipo di report; salva i file Markdown in `assets/digests/AAAA-MM-GG/`
- Esegue l'operazione quotidianamente tramite GitHub Actions; Supporta l'attivazione manuale
- Tutti i repository monitorati sono configurabili tramite `config.yml` — non sono necessarie modifiche al codice
- Sistema di localizzazione centralizzato tramite `locales/*.json` — 21 lingue supportate con catalogo `t()` in `packages/core/src/locales/t.ts`

## Configurazione

1. **Esegui un fork** di questo repository
2. Aggiungi la chiave del tuo provider LLM come segreto del repository (ad esempio, `ANTHROPIC_API_KEY`)
3. Abilita il flusso di lavoro nella scheda **Azioni** — verrà eseguito automaticamente da quel momento in poi

Per la guida completa — riferimento ai segreti, provider LLM, personalizzazione di `config.yml`, sviluppo locale, configurazione multilingue e pianificazione — consulta [docs/setup.md](./docs/setup.md).

## Formato di output

Un file per tipo di report per ogni lingua abilitata, scritto in `assets/digests/AAAA-MM-GG/`. I digest storici si trovano in [`assets/digests/`](./assets/digests/). Consulta [docs/output-format.md](./docs/output-format.md) per l'elenco completo dei file, la struttura per ogni report e il riferimento all'etichetta del problema su GitHub.

## FAQ

Domande frequenti (perché un report è stato saltato, quanto costa eseguirlo, come aggiungere repository, modificare la pianificazione, risolvere i problemi relativi agli errori 429) sono disponibili in [docs/faq.md](./docs/faq.md).

## Contributi

I contributi sono benvenuti. Consulta [CONTRIBUTING.md](./CONTRIBUTING.md) per la strategia dei branch, gli standard di codifica, le convenzioni di commit e le istruzioni per aggiungere nuove lingue o tipi di report.


## Storia delle stelle

[![Grafico della storia delle stelle](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)

