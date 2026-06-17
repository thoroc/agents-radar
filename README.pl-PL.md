#radar agentów

## Obsługiwane języki

🇬🇧 angielski | [🇺🇦 Українська](./README.uk-UA.md) | [🇸🇦 العربية](./README.ar-SA.md) | [🇷🇺 Русский](./README.ru-RU.md) | [🇮🇳 हिन्दी](./README.hi-IN.md) | [🇩🇪 Deutsch](./README.de-DE.md) | [🇹🇷 Türkçe](./README.tr-TR.md) | [🇹🇭 ไทย](./README.th-TH.md) | [🇵🇱 Polski](./README.pl-PL.md) | [🇮🇹 Italiano](./README.it-IT.md) | [🇫🇷 Français](./README.fr-FR.md) | [🇨🇳 中文](./README.zh-CN.md) | [🇧🇷 Português](./README.pt-BR.md) | [🇻🇳 Tiếng Việt](./README.vi-VN.md) | [🇧🇩 বাংলা](./README.bn-BD.md) | [🇪🇸 Español](./README.es-ES.md) | [🇮🇩 Bahasa Indonesia](./README.id-ID.md) | [🇷🇴 Română](./README.ro-RO.md) | [🇰🇷 한국어](./README.ko-KR.md) | [🇳🇱 Nederlands](./README.nl-NL.md) | [🇯🇵 日本語](./README.ja-JP.md)

Aby włączyć dodatkowe języki do generowania raportów, zobacz [Obsługa wielu języków](./docs/setup.md#multi-language-support).

Przepływ pracy GitHub Actions, który jest uruchamiany każdego ranka o 08:00 CST. Agreguje sygnały ekosystemu AI z 10 źródeł danych, a następnie publikuje dzienne podsumowania (we wszystkich skonfigurowanych językach) jako zgłoszenia GitHub i zatwierdzone pliki Markdown. Tygodniowe i miesięczne raporty zbiorcze są również generowane automatycznie.

## Źródła danych

| Źródło | Typ | Dane |
|--------|------|------|
| [Repozytoria GitHub](https://github.com) | API | Zgłoszenia, PR, wydania z ponad 17 śledzonych repozytoriów narzędzi AI |
| [Umiejętności Claude'a w zakresie kodowania](https://github.com/anthropics/skills) | API | Popularne umiejętności posortowane według zaangażowania społeczności |
| [Trendy w GitHubie](https://github.com/trending) | HTML + API | Codzienne repozytoria trendów + wyszukiwanie tematów AI (okno 7-dniowe) |
| [Hacker News](https://news.ycombinator.com) | [API Algolia](https://hn.algolia.com/api) | 30 najważniejszych artykułów o AI z ostatnich 24 godzin, 6 równoległych zapytań |
| [Product Hunt](https://www.producthunt.com) | API GraphQL | Wczorajsze najlepsze produkty AI według głosów |
| [ArXiv](https://arxiv.org) | [API ArXiv](https://export.arxiv.org/api/query) | Najnowsze artykuły z cs.AI, cs.CL, cs.LG (ostatnie 48 godz.) |
| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 popularnych modeli posortowanych według tygodniowych polubień |
| [Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | Najlepsze artykuły z zakresu AI/LLM z 5 tagów |
| [Lobste.rs](https://lobste.rs) | JSON API | Artykuły oznaczone tagami AI/ML z ostatnich 7 dni |
| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Mapa witryny | Nowe artykuły wykryte przez `lastmod` diff |

## Interfejs użytkownika

**`PAGES_URL`** — Ustaw tę zmienną repozytorium, aby skonfigurować podstawowy adres URL interfejsu użytkownika dla forka.

Przeglądaj wszystkie historyczne streszczenia w przejrzystym, ciemnym interfejsie — logowanie nie jest wymagane. Raporty są renderowane z plików Markdown w tym repozytorium za pośrednictwem GitHub Pages.

Interfejs użytkownika to aplikacja SPA oparta na Vite i TypeScript w `packages/web/`. Pobiera `manifest.json` i poszczególne pliki streszczenia w czasie wykonywania — nowe codzienne streszczenia pojawiają się bez konieczności przebudowy interfejsu użytkownika.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```

![Interfejs sieciowy](assets/web-en.png)

## Kanał Telegram i Grupa Feishu

Subskrybuj, aby otrzymywać codzienne powiadomienia z podsumowaniem, wysyłane bezpośrednio na Twoją preferowaną platformę. Każda wiadomość zawiera link do wszystkich raportów z danego dnia, a także do interfejsu sieciowego i kanału RSS.

<table>
<tr>
<td align="center"><b><a href="https://t.me/agents_radar">Dołącz do kanału Telegram</a></b></td>
<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Dołącz do grupy Feishu</a></b></td>
</tr>
<tr>
<td><img src="assets/telegram.jpg" width="300" alt="Powiadomienie Telegram"></td>
<td><img src="assets/feishu.jpg" width="300" alt="Feishu powiadomienie"></td>
</tr>
</table>

## Kanał RSS

**`PAGES_URL`/feed.xml** — Subskrybuj w dowolnym czytniku RSS (Feedly, Reeder, NewsBlur itp.), aby automatycznie otrzymywać nowe streszczenia. Adres URL kanału pochodzi z ustawienia `PAGES_URL`. Kanał zawiera 30 najnowszych raportów ze wszystkich typów raportów, aktualizowanych codziennie wraz z plikiem `manifest.json`.

## Serwer MCP

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Hostowany serwer [Model Context Protocol](https://modelcontextprotocol.io), który udostępnia dane z radaru agentów jako narzędzia. Każdy klient zgodny z MCP (Claude Desktop, OpenClaw itp.) może bezpośrednio pobierać najnowsze raporty ekosystemu AI.

**Dostępne narzędzia:**

| Narzędzie | Opis |
|------|-------------|
| `list_reports` | Wyświetla dostępne daty i typy raportów (ostatnie N dni) |
| `get_latest` | Pobiera najnowszy raport danego typu |
| `get_report` | Pobiera konkretny raport według daty i typu |
| `search` | Wyszukiwanie słów kluczowych w ostatnich raportach |

**Konfiguracja Claude Desktop** — dodaj do `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```

Po zapisaniu uruchom ponownie Claude Desktop. Następnie możesz zadać Claude'owi następujące pytania:

- *„Jakie są najnowsze narzędzia AI CLI?”* → wywołuje `get_latest`
- *„Wyszukaj wzmianki o kodzie Claude w tym tygodniu”* → wywołuje `search`
- *„Pokaż raport o trendach w AI z 05.03.2026”* → wywołuje `get_report`

**Konfiguracja OpenClaw** — uruchom następujące polecenie:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```

Lub dodaj go ręcznie do `~/.openclaw/openclaw.json`:

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

Możesz następnie zadać OpenClaw takie pytania, jak:

- *„Jakie są najnowsze narzędzia AI CLI?”* → wywołuje `get_latest`
- *„Wyszukaj wzmianki o Claude Code w tym tygodniu”* → wywołuje `search`
- *„Pokaż raport o trendach w AI z 05.03.2026”* → wywołuje `get_report`

**Samodzielny hosting** — wdróż własną instancję z katalogu `mcp/`:

```bash
cd mcp
pnpm install
wrangler deploy
```

## Śledzone źródła

10 źródeł danych w repozytoriach GitHub, wiadomościach, badaniach i kanałach społeczności. Pełną listę z linkami do repozytoriów i szczegółowymi informacjami o poszczególnych źródłach można znaleźć w [docs/sources.md](./docs/sources.md).

**Krótkie podsumowanie:** 9 repozytoriów AI CLI + OpenClaw + 12 agentów peer-to-peer (API GitHub) · Claude Code Skills · GitHub Trending (HTML + API wyszukiwania) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + mapy witryn OpenAI.

## Funkcje

- Pobiera zgłoszenia, żądania ściągnięcia i wydania zaktualizowane w ciągu ostatnich 24 godzin ze wszystkich śledzonych repozytoriów
- Śledzi trendy w Claude Code Skills — sortowane według zaangażowania społeczności, a nie aktualności
- Generuje podsumowanie dla każdego narzędzia dla każdego repozytorium CLI oraz analizę porównawczą między narzędziami
- Generuje szczegółowy raport projektu OpenClaw oraz porównanie między ekosystemami z 11 projektami partnerskimi
- Przeszukuje oficjalne treści internetowe Anthropic i OpenAI za pomocą map witryn; stopniowo wykrywa nowe artykuły
- Monitoruje codzienne trendy GitHub + przeszukuje 6 tagów tematycznych AI; klasyfikuje repozytoria według wymiaru i wyodrębnia sygnały trendów
- Pobiera 30 najważniejszych artykułów o AI z Hacker News (z ostatnich 24 godzin, uszeregowanych punktowo); generuje raport nastrojów społeczności
- Publikuje zgłoszenia GitHub dla każdego typu raportu; Zatwierdza pliki Markdown w `assets/digests/RRRR-MM-DD/`
- Działa codziennie za pośrednictwem GitHub Actions; Obsługuje ręczne wyzwalanie
- Wszystkie śledzone repozytoria można konfigurować za pomocą pliku `config.yml` — bez konieczności wprowadzania zmian w kodzie
- Scentralizowany system ustawień regionalnych za pomocą pliku `locales/*.json` — 21 obsługiwanych języków z katalogiem `t()` w pliku `packages/core/src/locales/t.ts`

## Konfiguracja

1. **Forkuj** to repozytorium
2. Dodaj klucz dostawcy LLM jako sekret repozytorium (np. `ANTHROPIC_API_KEY`)
3. Włącz przepływ pracy w zakładce **Akcje** — od tego momentu będzie on uruchamiany automatycznie

Pełny przewodnik — informacje o sekretach, dostawcy LLM, dostosowywanie pliku `config.yml`, rozwój lokalny, konfiguracja wielojęzyczna i harmonogram — znajdziesz w [docs/setup.md](./docs/setup.md).

## Format wyjściowy

Jeden plik na typ raportu na włączony język, zapisany w `assets/digests/RRRR-MM-DD/`. Historyczne streszczenia znajdują się w [`assets/digests/`](./assets/digests/). Zobacz [docs/output-format.md](./docs/output-format.md), aby uzyskać pełną listę plików, strukturę raportu oraz odniesienie do etykiet zgłoszeń GitHub.

## FAQ

Często zadawane pytania — dlaczego raport został pominięty, ile kosztuje jego wygenerowanie, dodawanie repozytoriów, zmiana harmonogramu, rozwiązywanie problemów z błędami 429 — odpowiedzi znajdują się w [docs/faq.md](./docs/faq.md).

## Wkład

Wkład jest mile widziany. Zobacz [CONTRIBUTING.md](./CONTRIBUTING.md), aby zapoznać się ze strategią gałęzi, standardami kodowania, konwencjami zatwierdzania zmian oraz instrukcjami dodawania nowych języków lub typów raportów.

## Historia gwiazd

[![Wykres historii gwiazd](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)
