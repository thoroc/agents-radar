# агенти-радар

## Підтримувані мови

🇬🇧 англійська | [🇺🇦 Українська](./README.uk-UA.md) | [🇸🇦 العربية](./README.ar-SA.md) | [🇷🇺 Русский](./README.ru-RU.md) | [🇮🇳 हिन्दी](./README.hi-IN.md) | [🇩🇪 Deutsch](./README.de-DE.md) | [🇹🇷 Türkçe](./README.tr-TR.md) | [🇹🇭 ไทย](./README.th-TH.md) | [🇵🇱 Polski](./README.pl-PL.md) | [🇮🇹 Italiano](./README.it-IT.md) | [🇫🇷 Français](./README.fr-FR.md) | [🇨🇳 中文](./README.zh-CN.md) | [🇧🇷 Português](./README.pt-BR.md) | [🇻🇳 Tiếng Việt](./README.vi-VN.md) | [🇧🇩 বাংলা](./README.bn-BD.md) | [🇪🇸 Español](./README.es-ES.md) | [🇮🇩 Індонезійська](./README.id-ID.md) | [🇷🇴 Ромână](./README.ro-RO.md) | [🇰🇷 Корейська](./README.ko-KR.md) | [🇳🇱 Нідерландська](./README.nl-NL.md) | [🇯🇵 Японська](./README.ja-JP.md)

Щоб увімкнути додаткові мови для створення звітів, див. [Підтримка багатьох мов](./docs/setup.md#multi-language-support).

Рабочий процес GitHub Actions, який запускається щоранку о 08:00 за центральним стандартним часом. Він агрегує сигнали екосистеми ШІ з 10 джерел даних, а потім публікує щоденні дайджести (всіма налаштованими мовами) у вигляді файлів GitHub Issues та зафіксованих Markdown. Щотижневі та щомісячні звіти також генеруються автоматично.

## Джерела даних

| Джерело | Тип | Дані |
|--------|------|------|
| [Репозиторії GitHub](https://github.com) | API | Проблеми, PR, релізи з понад 17 відстежуваних репозиторіїв інструментів ШІ |
| [Навички Claude Code](https://github.com/anthropics/skills) | API | Трендові навички, відсортовані за залученням спільноти |
| [Тренди GitHub](https://github.com/trending) | HTML + API | Щоденні трендові репозиторії + пошук за темами ШІ (7-денне вікно) |
| [Новини хакерів](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | 30 найкращих історій про ШІ за останні 24 години, 6 паралельних запитів |
| [Product Hunt](https://www.producthunt.com) | GraphQL API | Найкращі продукти ШІ за кількістю голосів за вчорашній день |
| [ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | Останні статті від cs.AI, cs.CL, cs.LG (за останні 48 годин) |
| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 трендових моделей, відсортованих за тижневими вподобаннями |
| [Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | Найкращі статті про ШІ/LLM з 5 тегів |
| [Lobste.rs](https://lobste.rs) | JSON API | Історії з тегами AI/ML за останні 7 днів |
| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Карта сайту | Нові статті виявлені через `lastmod` diff |

## Веб-інтерфейс

**`PAGES_URL`** — Встановіть це як змінну репозиторію, щоб налаштувати базову URL-адресу веб-інтерфейсу для вашого форку.

Переглядайте всі історичні дайджести в чистому інтерфейсі з темною тематикою — вхід не потрібен. Звіти відображаються з файлів Markdown у цьому репозиторії через GitHub Pages.

Веб-інтерфейс — це SPA Vite + TypeScript у `packages/web/`. Він отримує `manifest.json` та окремі файли дайджесту під час виконання — нові щоденні дайджести з'являються без будь-якої перебудови інтерфейсу.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```

![Веб-інтерфейс](assets/web-en.png)

## Telegram-канал та група Feishu

Підпишіться, щоб отримувати щоденні дайджести сповіщень безпосередньо на вашу вибрану платформу. Кожне повідомлення містить посилання на всі звіти за цей день, а також на веб-інтерфейс та RSS-канал.

<table>
<tr>
<td align="center"><b><a href="https://t.me/agents_radar">Приєднатися до Telegram-каналу</a></b></td>
<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Приєднатися до групи Feishu</a></b></td>
</tr>
<tr>
<td><img src="assets/telegram.jpg" width="300" alt="Сповіщення Telegram"></td>
<td><img src="assets/feishu.jpg" width="300" alt="Сповіщення Feishu"></td>
</tr>
</table>

## RSS Стрічка

**`PAGES_URL`/feed.xml** — Підпишіться в будь-якій програмі для читання RSS (Feedly, Reeder, NewsBlur тощо), щоб автоматично отримувати нові дайджести. URL-адреса стрічки визначається на основі вашого налаштування `PAGES_URL`. Стрічка містить 30 останніх звітів усіх типів звітів, що оновлюються щодня разом із `manifest.json`.

## Сервер MCP

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Розміщений сервер [Model Context Protocol](https://modelcontextprotocol.io), який надає дані агентів-радарів як інструменти. Будь-який клієнт, сумісний з MCP (Claude Desktop, OpenClaw тощо), може безпосередньо запитувати останні звіти екосистеми ШІ.

**Доступні інструменти:**

| Інструмент | Опис |
|------|-------------|
| `list_reports` | Список доступних дат та типів звітів (за останні N днів) |
| `get_latest` | Отримати найновіший звіт заданого типу |
| `get_report` | Отримати певний звіт за датою та типом |
| `search` | Пошук за ключовими словами серед останніх звітів |

**Налаштування Claude Desktop** — додати до `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```

Перезапустіть робочий стіл Claude після збереження. Ви можете запитати у Claude такі речі, як:

- *"Що найновіше в інструментах AI CLI?"* → викликає `get_latest`
- *"Пошук згадок коду Claude цього тижня"* → викликає `search`
- *"Показати звіт про тенденції AI за 2026-03-05"* → викликає `get_report`

**Налаштування OpenClaw** — виконайте таку команду:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```

Або додайте його вручну до `~/.openclaw/openclaw.json`:

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

Потім ви можете запитати OpenClaw такі речі, як:

- *"Що найновіше в інструментах AI CLI?"* → викликає `get_latest`
- *"Шукати згадки про код Клода цього тижня"* → викликає `search`
- *"Показати звіт про тренди ШІ за 2026-03-05"* → викликає `get_report`

**Самостійне розміщення** — розгорніть власний екземпляр з каталогу `mcp/`:

```bash
cd mcp
pnpm install
wrangler deploy
```

## Відстежувані джерела

10 джерел даних у репозиторіях GitHub, новинах, дослідженнях та стрічках спільноти. Повний список із посиланнями на репозиторії та детальною інформацією про кожне джерело дивіться на [docs/sources.md](./docs/sources.md).

**Короткий огляд:** 9 репозиторіїв AI CLI + OpenClaw + 12 однорангових агентів (GitHub API) · Навички кодування Claude · Тренди GitHub (HTML + Search API) · Новини хакерів · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + карти сайту OpenAI.

## Функції

- Отримує інформацію про проблеми, запити на зняття змін та релізи, оновлені за останні 24 години, у всіх відстежуваних репозиторіях
- Відстежує трендові навички Claude Code — відсортовані за залученням спільноти, а не за новизною
- Генерує зведення для кожного інструменту для кожного репозиторію CLI та порівняльний аналіз між інструментами
- Генерує глибокий звіт про проект OpenClaw, а також порівняння між екосистемами з 11 аналогічними проектами
- Збирає офіційний веб-контент Anthropic та OpenAI за допомогою карт сайту; поступово виявляє нові статті
- Щодня відстежує тренди GitHub + шукає за 6 тегами тем ШІ; класифікує репозиторії за виміром та витягує сигнали трендів
- Отримує 30 найкращих історій про ШІ з Hacker News (за останні 24 години, ранжовані за балами); генерує звіт про настрої спільноти
- Публікує проблеми GitHub для кожного типу звіту; зараховує файли Markdown до `assets/digests/YYYY-MM-DD/`
- Працює за щоденним розкладом через дії GitHub; підтримує ручне запуск
- Усі відстежувані репозиторії налаштовуються через `config.yml` — зміни коду не потрібні
- Централізована система локалізації через `locales/*.json` — 21 підтримувана мова з каталогом `t()` в `packages/core/src/locales/t.ts`

## Налаштування

1. **Створіть форк** цього репозиторію

2. Додайте ключ вашого постачальника LLM як секрет репозиторію (наприклад, `ANTHROPIC_API_KEY`)

3. Увімкніть робочий процес на вкладці **Дії** — з цього моменту він запускається автоматично

Повний посібник — довідка щодо секретів, постачальники LLM, налаштування `config.yml`, локальна розробка, багатомовна конфігурація та розклад — див. [docs/setup.md](./docs/setup.md).

## Формат виводу

Один файл на тип звіту на кожну ввімкнену мову, записаний у `assets/digests/YYYY-MM-DD/`. Історичні дайджести знаходяться в [`assets/digests/`](./assets/digests/). Див. [docs/output-format.md](./docs/output-format.md) для повного списку файлів, структури для кожного звіту та посилання на мітки проблем GitHub.

## FAQ

Поширені запитання — чому звіт було пропущено, скільки коштує його запуск, додавання репозиторіїв, зміна розкладу, усунення несправностей 429 — відповіді в [docs/faq.md](./docs/faq.md).

## Внесок

Внесок вітається. Див. [CONTRIBUTING.md](./CONTRIBUTING.md) для стратегії гілок, стандартів кодування, угод про коміти та інструкцій щодо додавання нових мов або типів звітів.

## Історія зірок

[![Діаграма історії зірок](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)
