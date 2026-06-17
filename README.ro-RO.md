# agenti-radar

## Limbi acceptate

🇬🇧 engleză · 🇨🇳 中文 · 🇯🇵 日本語 · 🇰🇷 한국어 · 🇪🇸 Español · 🇧🇷 Português · 🇷 · Deutsch · 🇷 · Deutsch 🇮🇹 Italiano · 🇵🇱 Polski · 🇷🇺 Русский · 🇸🇦 العربية · 🇹🇷 Türkçe · 🇻🇳 Tiếng ViỢ🇹🇹 🇳🇱 Nederlands · 🇮🇳 हिन्दी · 🇷🇴 Română · 🇮🇩 Bahasa Indonesia · 🇺🇦 Українська · 🇧🇩 বাংলা

Engleză | [中文](./README.zh-CN.md)

Pentru a activa limbi suplimentare pentru generarea de rapoarte, consultați [Suport multilingv](./docs/setup.md#multi-language-support).

Un flux de lucru GitHub Actions care rulează în fiecare dimineață la ora 08:00 CST. Acesta agregă semnale ale ecosistemului AI din 10 surse de date, apoi publică rezumate zilnice (în toate limbile configurate) ca probleme GitHub și fișiere Markdown validate. Rapoartele cumulative săptămânale și lunare sunt, de asemenea, generate automat.

## Surse de date

| Sursă | Tip | Date |
|--------|------|------|
| [Depozite GitHub](https://github.com) | API | Probleme, PR-uri, lansări din peste 17 depozite de instrumente AI urmărite |
| [Abilități de cod Claude](https://github.com/anthropics/skills) | API | Abilități în tendințe, sortate în funcție de implicarea comunității |
| [Tendințe GitHub](https://github.com/trending) | HTML + API | Depozite zilnice în tendințe + căutare de subiecte AI (fereastră de 7 zile) |
| [Știri despre hackeri](https://news.ycombinator.com) | [API Algolia](https://hn.algolia.com/api) | Top 30 de știri despre AI din ultimele 24 de ore, 6 interogări paralele |
| [Vânătoare de produse](https://www.producthunt.com) | API GraphQL | Cele mai bune produse AI de ieri, după voturi |
| [ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | Cele mai recente articole de la cs.AI, cs.CL, cs.LG (ultimele 48 de ore) |
| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 de modele în tendințe, sortate după aprecieri săptămânale |
| [Dev.to](https://dev.to) | [Forum API](https://dev.to/api) | Articole de top AI/LLM din 5 etichete |
| [Lobste.rs](https://lobste.rs) | JSON API | Articole etichetate AI/ML din ultimele 7 zile |
| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Harta site-ului | Articole noi detectate prin `lastmod` diff |

## Interfață web

**`PAGES_URL`** — Setați aceasta ca variabilă de repozitoriu pentru a configura adresa URL de bază a interfeței web pentru fork-ul dvs.

Răsfoiți toate rezumatele istorice într-o interfață curată, cu tematică întunecată — nu este necesară autentificarea. Rapoartele sunt redate din fișierele Markdown din acest repozitoriu prin intermediul GitHub Pages.

Interfața web este un SPA Vite + TypeScript în `packages/web/`. Preia `manifest.json` și fișierele rezumat individuale la momentul execuției — noile rezumate zilnice apar fără nicio reconstrucție a interfeței.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```

![Interfață web](assets/web-en.png)

## Canalul Telegram și Grupul Feishu

Abonați-vă pentru a primi notificări zilnice de rezumat direct pe platforma preferată. Fiecare mesaj trimite către toate rapoartele din ziua respectivă, plus interfața web și fluxul RSS.

<table>
<tr>
<td align="center"><b><a href="https://t.me/agents_radar">Alătură-te canalului Telegram</a></b></td>
<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Alătură-te grupului Feishu</a></b></td>
</tr>
<tr>
<td><img src="assets/telegram.jpg" width="300" alt="Notificare Telegram"></td>
<td><img src="assets/feishu.jpg" width="300" alt="Notificare Feishu"></td>
</tr>
</table>

## Flux RSS

**`PAGES_URL`/feed.xml** — Abonați-vă la orice cititor RSS (Feedly, Reeder, NewsBlur etc.) pentru a primi automat noi rezumate. URL-ul fluxului este derivat din setarea dvs. `PAGES_URL`. Fluxul include cele mai recente 30 de rapoarte pentru toate tipurile de rapoarte, actualizate zilnic împreună cu `manifest.json`.

## Server MCP

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Un server găzduit [Model Context Protocol](https://modelcontextprotocol.io) care expune datele agent-radar ca instrumente. Orice client compatibil cu MCP (Claude Desktop, OpenClaw etc.) poate interoga direct cele mai recente rapoarte ale ecosistemului AI.

**Instrumente disponibile:**

| Instrument | Descriere |
|------|-------------|
| `list_reports` | Listează datele și tipurile de rapoarte disponibile (ultimele N zile) |
| `get_latest` | Preia cel mai recent raport de un anumit tip |
| `get_report` | Preluare raport specific după dată și tip |
| `căutare` | Căutare după cuvinte cheie în rapoarte recente |

**Configurare Claude Desktop** — adăugare la `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```

Reporniți Claude Desktop după salvare. Apoi, îl puteți întreba pe Claude lucruri precum:

- *„Care sunt cele mai recente noutăți în instrumentele CLI AI?”* → apelează `get_latest`
- *„Căutați mențiuni despre codul Claude săptămâna aceasta”* → apelează `search`
- *„Arată-mi raportul de tendințe AI pentru 05.03.2026”* → apelează `get_report`

**Configurare OpenClaw** — executați următoarea comandă:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
Sau adăugați-l manual la `~/.openclaw/openclaw.json`:

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

Apoi puteți adresa întrebări OpenClaw precum:

- *„Care sunt cele mai recente noutăți în instrumentele CLI AI?”* → apelează `get_latest`
- *„Căutați mențiuni despre codul Claude săptămâna aceasta”* → apelează `search`
- *„Arată-mi raportul de tendințe AI pentru 05.03.2026”* → apelează `get_report`

**Găzduire automată** — implementați propria instanță din directorul `mcp/`:

```bash
cd mcp
pnpm install
wrangler deploy
```

## Surse urmărite

10 surse de date din repozitoriile GitHub, știri, cercetări și fluxuri comunitare. Consultați [docs/sources.md](./docs/sources.md) pentru lista completă cu linkuri către repozitori și detalii pentru fiecare sursă.

**Rezumat rapid:** 9 repozitorii AI CLI + OpenClaw + 12 agenți peer (API GitHub) · Abilități de cod Claude · Tendințe GitHub (HTML + API de căutare) · Știri despre hackeri · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Hărți de site Anthropic + OpenAI.

## Funcții

- Preia probleme, cereri de extragere și versiuni actualizate în ultimele 24 de ore din toate depozitele urmărite
- Urmărește tendințele Claude Code Skills — sortate după implicarea comunității, nu după recență
- Generează un rezumat per instrument pentru fiecare depozit CLI și o analiză comparativă inter-instrumente
- Generează un raport detaliat al proiectului OpenClaw plus o comparație inter-ecosistem cu 11 proiecte similare
- Extrage conținut web oficial Anthropic și OpenAI prin intermediul sitemap-urilor; detectează articole noi incremental
- Monitorizează zilnic tendințele GitHub + caută 6 etichete de subiecte AI; clasifică depozitele după dimensiune și extrage semnale de tendință
- Preia top 30 de știri AI din Hacker News (ultimele 24 de ore, clasate după puncte); generează un raport de sentiment al comunității
- Publică probleme GitHub pentru fiecare tip de raport; salvează fișierele Markdown în `assets/digests/AAAA-LL-ZZ/`
- Rulează zilnic prin intermediul GitHub Actions; acceptă declanșarea manuală
- Toate depozitele urmărite sunt configurabile prin `config.yml` — nu sunt necesare modificări de cod
- Sistem centralizat de localizare prin `locales/*.json` — 21 de limbi acceptate cu catalogul `t()` în `packages/core/src/locales/t.ts`

## Configurare

1. **Creați o bifurcație** pentru acest depozit
2. Adăugați cheia furnizorului LLM ca secret al depozitului (de exemplu, `ANTHROPIC_API_KEY`)
3. Activați fluxul de lucru în fila **Acțiuni** — acesta rulează automat de atunci

Pentru ghidul complet — referință secrete, furnizori LLM, personalizare `config.yml`, dezvoltare locală, configurare multilingvă și programare — consultați [docs/setup.md](./docs/setup.md).

## Format de ieșire

Un fișier per tip de raport per limbă activată, scris în `assets/digests/AAAA-LL-ZZ/`. Rezumatele istorice se află în [`assets/digests/`](./assets/digests/). Consultați [docs/output-format.md](./docs/output-format.md) pentru lista completă de fișiere, structura per raport și referința etichetelor de probleme GitHub.

## Întrebări frecvente

Întrebările frecvente — de ce a fost omis un raport, cât costă rularea, adăugarea de repozitorii, modificarea programării, depanarea erorilor 429 — au răspuns în [docs/faq.md](./docs/faq.md).

## Contribuții

Contribuțiile sunt binevenite. Consultați [CONTRIBUTING.md](./CONTRIBUTING.md) pentru strategia de ramificare, standardele de codare, convențiile de validare și instrucțiuni pentru adăugarea de noi limbaje sau tipuri de rapoarte.

## Istoricul stelelor

[![Diagramă istorică stelară](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)
