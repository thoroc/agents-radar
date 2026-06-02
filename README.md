# agents-radar

**Supported languages**

🇬🇧 English · 🇨🇳 中文 · 🇯🇵 日本語 · 🇰🇷 한국어 · 🇪🇸 Español · 🇧🇷 Português · 🇫🇷 Français · 🇩🇪 Deutsch · 🇮🇹 Italiano · 🇵🇱 Polski · 🇷🇺 Русский · 🇸🇦 العربية · 🇹🇷 Türkçe · 🇻🇳 Tiếng Việt · 🇹🇭 ไทย · 🇳🇱 Nederlands · 🇮🇳 हिन्दी · 🇷🇴 Română · 🇮🇩 Bahasa Indonesia · 🇺🇦 Українська · 🇧🇩 বাংলা

English | [中文](./README.zh.md)

A GitHub Actions workflow that runs every morning at 08:00 CST. It aggregates AI ecosystem signals from 10 data sources, then publishes daily digests (in all configured languages) as GitHub Issues and committed Markdown files. Weekly and monthly rollup reports are also generated automatically.

### Data Sources

| Source | Type | Data |
|--------|------|------|
| [GitHub Repos](https://github.com) | API | Issues, PRs, releases from 17+ tracked AI tool repos |
| [Claude Code Skills](https://github.com/anthropics/skills) | API | Trending skills sorted by community engagement |
| [GitHub Trending](https://github.com/trending) | HTML + API | Daily trending repos + AI topic search (7-day window) |
| [Hacker News](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | Top 30 AI stories from last 24h, 6 parallel queries |
| [Product Hunt](https://www.producthunt.com) | GraphQL API | Yesterday's top AI products by votes |
| [ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | Latest papers from cs.AI, cs.CL, cs.LG (last 48h) |
| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 trending models sorted by weekly likes |
| [Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | Top AI/LLM articles from 5 tags |
| [Lobste.rs](https://lobste.rs) | JSON API | AI/ML tagged stories from last 7 days |
| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Sitemap | New articles detected via `lastmod` diff |

## Web UI

**`PAGES_URL`** — Set this as a repository variable to configure the Web UI base URL for your fork.

Browse all historical digests in a clean, dark-themed interface — no login required. Reports are rendered from the Markdown files in this repo via GitHub Pages.

![Web UI](assets/web-en.png)

## Telegram Channel & Feishu Group

Subscribe to get daily digest notifications pushed directly to your preferred platform. Each message links to all reports for that day plus the Web UI and RSS feed.

<table>
  <tr>
    <td align="center"><b><a href="https://t.me/agents_radar">Join Telegram Channel</a></b></td>
    <td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Join Feishu Group</a></b></td>
  </tr>
  <tr>
    <td><img src="assets/telegram.jpg" width="300" alt="Telegram notification"></td>
    <td><img src="assets/feishu.jpg" width="300" alt="Feishu notification"></td>
  </tr>
</table>

## RSS Feed

**`PAGES_URL`/feed.xml** — Subscribe in any RSS reader (Feedly, Reeder, NewsBlur, etc.) to receive new digests automatically. The feed URL is derived from your `PAGES_URL` setting. The feed includes the latest 30 reports across all report types, updated daily alongside `manifest.json`.

## MCP Server

**`https://agents-radar-mcp.duanyytop.workers.dev`**

A hosted [Model Context Protocol](https://modelcontextprotocol.io) server that exposes agents-radar data as tools. Any MCP-compatible client (Claude Desktop, OpenClaw, etc.) can query the latest AI ecosystem reports directly.

**Available tools:**

| Tool | Description |
|------|-------------|
| `list_reports` | List available dates and report types (last N days) |
| `get_latest` | Fetch the most recent report of a given type |
| `get_report` | Fetch a specific report by date and type |
| `search` | Keyword search across recent reports |

**Claude Desktop setup** — add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```

Restart Claude Desktop after saving. You can then ask Claude things like:
- *"What's the latest in AI CLI tools?"* → calls `get_latest`
- *"Search for Claude Code mentions this week"* → calls `search`
- *"Show me the AI trending report for 2026-03-05"* → calls `get_report`

**OpenClaw setup** — run the following command:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```

Or add it manually to `~/.openclaw/openclaw.json`:

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

You can then ask OpenClaw things like:
- *"What's the latest in AI CLI tools?"* → calls `get_latest`
- *"Search for Claude Code mentions this week"* → calls `search`
- *"Show me the AI trending report for 2026-03-05"* → calls `get_report`

**Self-hosting** — deploy your own instance from the `mcp/` directory:

```bash
cd mcp
pnpm install
wrangler deploy
```

## Tracked sources

### AI CLI tools (GitHub)

| Tool | Repository |
|------|-----------|
| Claude Code | [anthropics/claude-code](https://github.com/anthropics/claude-code) |
| OpenAI Codex | [openai/codex](https://github.com/openai/codex) |
| Gemini CLI | [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) |
| GitHub Copilot CLI | [github/copilot-cli](https://github.com/github/copilot-cli) |
| Kimi Code CLI | [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli) |
| OpenCode | [anomalyco/opencode](https://github.com/anomalyco/opencode) |
| Pi | [badlogic/pi-mono](https://github.com/badlogic/pi-mono) |
| Qwen Code | [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) |
| DeepSeek TUI | [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI) |

### Claude Code Skills (GitHub)

| Source | Repository |
|--------|-----------|
| Claude Code Skills | [anthropics/skills](https://github.com/anthropics/skills) |

PRs and issues are fetched without a date filter and sorted by popularity (comment count), so the report always reflects the most actively discussed skills — not just the newest.

### OpenClaw + AI agent ecosystem (GitHub)

OpenClaw is tracked as the primary reference project, alongside several peer projects in the personal AI assistant / autonomous agent space for cross-ecosystem comparison.

| Project | Repository | Stars |
|---------|-----------|-------|
| OpenClaw | [openclaw/openclaw](https://github.com/openclaw/openclaw) | 348.1k |
| NanoBot | [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | 37.9k |
| Hermes Agent | [nousresearch/hermes-agent](https://github.com/nousresearch/hermes-agent) | 32.3k |
| PicoClaw | [sipeed/picoclaw](https://github.com/sipeed/picoclaw) | 27.5k |
| NanoClaw | [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw) | 26.5k |
| ZeroClaw | [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw) | 30.1k |
| CoPaw | [agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw) | 14.4k |
| IronClaw | [nearai/ironclaw](https://github.com/nearai/ironclaw) | 11.4k |
| NullClaw | [nullclaw/nullclaw](https://github.com/nullclaw/nullclaw) | 7.0k |
| LobsterAI | [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI) | 4.8k |
| TinyClaw | [TinyAGI/tinyagi](https://github.com/TinyAGI/tinyagi) | 3.5k |
| Moltis | [moltis-org/moltis](https://github.com/moltis-org/moltis) | 2.5k |
| ZeptoClaw | [qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw) | 567 |

### GitHub AI Trending

Two data sources are fetched in parallel every day:

| Source | Details |
|--------|---------|
| [github.com/trending](https://github.com/trending?since=daily) | Today's trending repos — parsed from HTML; includes today's new star count |
| GitHub Search API | Repos active in the last 7 days matching 6 AI topics: `llm`, `ai-agent`, `rag`, `vector-database`, `large-language-model`, `machine-learning` |

The LLM filters out non-AI repos from the trending list, classifies the rest by dimension (AI infrastructure / agents / applications / models / RAG), and extracts trend signals.

### Hacker News

Top AI stories from the last 24 hours, fetched via the [Algolia HN Search API](https://hn.algolia.com/api). Six queries run in parallel (`AI`, `LLM`, `Claude`, `OpenAI`, `Anthropic`, `machine learning`), results are deduplicated and ranked by points. The top 30 stories are passed to the LLM for analysis.

### Official web content (sitemap-based)

| Organization | Site | Tracked sections |
|---|---|---|
| Anthropic | [anthropic.com](https://www.anthropic.com) | `/news/`, `/research/`, `/engineering/`, `/learn/` |
| OpenAI | [openai.com](https://openai.com) | research, publication, release, company, engineering, milestone, learn-guides, safety, product |

New articles are detected by comparing sitemap `lastmod` timestamps against a persisted state file (`digests/web-state.json`). On the **first run**, up to 25 recent articles per site are fetched and a comprehensive overview report is generated. On subsequent runs, only new or updated URLs trigger a report; if nothing changed, the web report step is skipped entirely.

## Features

- Fetches issues, pull requests, and releases updated in the last 24 hours across all tracked repos
- Tracks trending Claude Code Skills — sorted by community engagement, not recency
- Generates a per-tool summary for each CLI repository and a cross-tool comparative analysis
- Generates a deep OpenClaw project report plus a cross-ecosystem comparison against 11 peer projects
- Scrapes official Anthropic and OpenAI web content via sitemaps; detects new articles incrementally
- Monitors GitHub Trending daily + searches 6 AI topic tags; classifies repos by dimension and extracts trend signals
- Fetches top-30 AI stories from Hacker News (last 24h, ranked by points); generates community sentiment report
- Publishes GitHub Issues for each report type; commits Markdown files to `digests/YYYY-MM-DD/`
- Runs on a daily schedule via GitHub Actions; supports manual triggering
- All tracked repositories are configurable via `config.yml` — no code changes needed
- Centralized locale system via `locales/*.json` — 21 supported languages with `t()` catalog in `src/utils/t.ts`

## Setup

### 1. Fork this repository

### 2. Customize `config.yml` (optional)

Edit `config.yml` in the repo root to add, remove, or replace the tracked repositories. The file is fully commented. No code changes are needed — the pipeline reads it on every run and falls back to built-in defaults if the file is absent.

```yaml
# Add a new CLI tool
cli_repos:
  - id: my-tool
    repo: owner/my-ai-cli
    name: My AI Tool

# Add a new peer project to the OpenClaw ecosystem comparison
openclaw_peers:
  - id: my-agent
    repo: owner/my-agent
    name: My Agent
```

> The `languages` field at the top of `config.yml` controls which locales are active. Defaults to `["en-US", "zh-CN"]` if absent. To enable additional languages, add their BCP-47 tags to the list (e.g. `["en-US", "zh-CN", "ja-JP", "ko-KR"]`). See the full list of 21 supported languages at the top of this page. Each enabled language multiplies the LLM calls per run — be mindful of API costs when enabling many languages.

### 3. Add Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret / Variable | Required | Description |
|--------|----------|-------------|
| `LLM_PROVIDER` | optional | `anthropic` (default), `openai`, `github-copilot`, or `openrouter` |
| `ANTHROPIC_API_KEY` | if Anthropic | API key — works with both Anthropic and Kimi Code |
| `ANTHROPIC_BASE_URL` | optional | API endpoint override. Set to `https://api.kimi.com/coding/` for Kimi Code; leave unset for Anthropic |
| `OPENAI_API_KEY` | if OpenAI | OpenAI API key |
| `OPENAI_BASE_URL` | optional | OpenAI endpoint override |
| `OPENROUTER_API_KEY` | if OpenRouter | OpenRouter API key |
| `TELEGRAM_BOT_TOKEN` | optional | Telegram bot token from [@BotFather](https://t.me/BotFather). If set, a message is sent after each digest run |
| `TELEGRAM_CHAT_ID` | optional | Telegram chat/channel/group ID to send notifications to |
| `FEISHU_WEBHOOK_URLS` | optional | Comma-separated Feishu custom bot webhook URLs. If set, a card message is sent to each group after each digest run |
| `PAGES_URL` | **Actions variable** | GitHub Pages base URL for notifications, RSS, and manifest links. Set as a [repository variable](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#creating-configuration-variables-for-a-repository) (e.g. `https://your-username.github.io/agents-radar`). Falls back to the centralized default in `src/constants.ts` if unset. |

> `GITHUB_TOKEN` is provided automatically by GitHub Actions. When using `github-copilot` as the provider, the same `GITHUB_TOKEN` is used for LLM calls.

**Setting up Telegram notifications** (optional):
1. Message [@BotFather](https://t.me/BotFather) on Telegram, create a bot, and copy the token
2. Add the bot to your channel/group, or start a DM with it
3. Get the chat ID via [@userinfobot](https://t.me/userinfobot) or the [getUpdates](https://core.telegram.org/bots/api#getupdates) API
4. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as repository secrets

> If neither secret is set, the notification step is silently skipped.

### 3. Enable the workflow

Confirm the workflow is enabled in the **Actions** tab.

To test immediately, go to **Actions → Daily Agents Radar → Run workflow**.

> **First run note**: The web content step will fetch up to 50 articles (25 per site) and may take a few extra minutes. Subsequent runs are fast — only new articles are processed.

## LLM providers

Set `LLM_PROVIDER` to choose which model backend powers the digest generation. Defaults to `anthropic`.

| Provider | `LLM_PROVIDER` | Required env vars | Default model |
|----------|---------------|-------------------|---------------|
| Anthropic | `anthropic` | `ANTHROPIC_API_KEY` | `claude-sonnet-4-6` |
| OpenAI | `openai` | `OPENAI_API_KEY` | `gpt-4o` |
| GitHub Copilot | `github-copilot` | `GITHUB_TOKEN` | `gpt-4o` |
| OpenRouter | `openrouter` | `OPENROUTER_API_KEY` | `anthropic/claude-sonnet-4` |

Override the model name with `ANTHROPIC_MODEL`, `OPENAI_MODEL`, `GITHUB_COPILOT_MODEL`, or `OPENROUTER_MODEL` respectively.

The provider abstraction lives in `src/providers/` — each provider is a separate file implementing the `LlmProvider` interface. Adding a new provider only requires creating a new file and registering it in the factory.

## Running locally

```bash
bun install

export GITHUB_TOKEN=ghp_xxxxx

# Option A: Anthropic (default)
export ANTHROPIC_API_KEY=sk-ant-xxxxxxxx

# Option B: OpenAI
# export LLM_PROVIDER=openai
# export OPENAI_API_KEY=sk-xxxxxxxx

# Option C: GitHub Copilot (uses GITHUB_TOKEN)
# export LLM_PROVIDER=github-copilot

# Option D: OpenRouter
# export LLM_PROVIDER=openrouter
# export OPENROUTER_API_KEY=sk-or-xxxxxxxx

export DIGEST_REPO=your-username/agents-radar  # optional; omit to only write files

bun run start
```

## Running tests

```bash
bun test        # run all tests
bun test --watch  # run in watch mode during development
```

## Multi-language support

Reports are generated for every language listed under `languages` in `config.yml`. All 21 pre-translated locales are ready to use — add a BCP-47 tag to enable one:

```yaml
languages:
  - en-US     # primary language — empty file suffix (ai-cli.md)
  - zh-CN
  - ja-JP     # add any of the 21 supported BCP-47 tags
  - ko-KR
```

The first entry (or `defaultPrimaryLanguage` if set explicitly) is the **primary language** and gets an empty file suffix. All other languages use the BCP-47 tag as a suffix (`ai-cli.zh-CN.md`, `ai-cli.ja-JP.md`).

To add a language that isn't pre-translated yet, drop a `locales/xx-XX.json` file (see existing files for the schema) and add its BCP-47 tag to `config.yml`.

You can also override enabled languages at runtime without editing `config.yml`:

```bash
export REPORT_LANGS=en-US,ja-JP
```

> Each additional language multiplies LLM calls per run. With 5 languages and 10 data sources, a single run makes roughly 100+ LLM calls. Quality may vary for languages with less training data.

## Output format

Files are written to `digests/YYYY-MM-DD/`. For each report type, the pipeline generates one file per enabled language:

| File pattern | Content | GitHub Issue label |
|------|---------|-------------------|
| `ai-cli.{locale}.md` | CLI digest — cross-tool comparison + per-tool details | `digest.{locale}` |
| `ai-agents.{locale}.md` | OpenClaw deep report + cross-ecosystem comparison + 11 peer details | `openclaw.{locale}` |
| `ai-web.{locale}.md` | Official web content report (only written when new content exists) | `web.{locale}` |
| `ai-trending.{locale}.md` | GitHub AI trending report — repos classified by dimension + trend signals (only written when data is available) | `trending.{locale}` |
| `ai-hn.{locale}.md` | Hacker News AI community digest — top stories + sentiment analysis (only written when fetch succeeds) | `hn.{locale}` |
| `ai-ph.{locale}.md` | Product Hunt AI products digest (only written when data is available) | `ph.{locale}` |
| `ai-arxiv.{locale}.md` | ArXiv AI research digest — key papers from cs.AI/cs.CL/cs.LG | `arxiv.{locale}` |
| `ai-hf.{locale}.md` | Hugging Face trending models digest — sorted by weekly likes | `hf.{locale}` |
| `ai-community.{locale}.md` | Tech community AI digest — Dev.to articles + Lobste.rs stories combined | `community.{locale}` |

Where `{locale}` is empty for the primary language (default: `en-US`, e.g. `ai-cli.md`) and the BCP-47 tag for all other languages (e.g. `ai-cli.zh-CN.md`, `ai-cli.ja-JP.md`). The primary language is set via `defaultPrimaryLanguage` in `config.yml`.

For example, with `["en-US", "zh-CN"]` configured, `digests/2026-05-28/` would contain:
- `ai-cli.md` (English, primary), `ai-cli.zh-CN.md` (Chinese)

A shared state file `digests/web-state.json` tracks which web URLs have been seen; it is committed alongside the daily digests.

---

`ai-cli.md` / `ai-cli.zh-CN.md` structure:
```
## Cross-Tool Comparison
  Ecosystem overview / Activity comparison table / Shared themes / Differentiation / Trend signals

## Per-Tool Reports
  <details> Claude Code    — [Claude Code Skills Highlights]
                             Top skills / Community demand trends / High-potential pending skills
                             ---
                             Today's summary / Hot issues / PR progress / Trends
  <details> OpenAI Codex   — Today's summary / Hot issues / PR progress / Trends
  <details> Gemini CLI     — ...
  <details> GitHub Copilot CLI — ...
  <details> Kimi Code CLI  — ...
  <details> OpenCode       — ...
  <details> Qwen Code      — ...
  <details> DeepSeek TUI   — ...
```

`ai-agents.md` / `ai-agents.zh-CN.md` structure:
```
Issues: N | PRs: N | Projects covered: 10

## OpenClaw Deep Dive
  Today's summary / Releases / Project progress / Community highlights /
  Bug stability / Feature requests / User feedback / Backlog

## Cross-Ecosystem Comparison
  Ecosystem overview / Activity table / OpenClaw positioning /
  Shared technical directions / Differentiation / Community maturity / Trend signals

## Peer Project Reports
  <details> Zeroclaw   — Today's summary / Releases / Progress / ... (8 sections)
  <details> EasyClaw   — ...
  <details> LobsterAI  — ...
  <details> ZeptoClaw  — ...
  <details> NanoBot      — ...
  <details> Hermes Agent — ...
  <details> PicoClaw     — ...
  <details> NanoClaw   — ...
  <details> IronClaw   — ...
  <details> TinyClaw   — ...
  <details> CoPaw      — ...
```

`ai-web.md` / `ai-web.zh-CN.md` structure:
```
Sources: anthropic.com (N articles) + openai.com (N articles)

Today's summary
Anthropic / Claude highlights  (news / research / engineering / learn)
OpenAI highlights              (research / release / company / safety / ...)
Strategic signals
Notable details
[First full crawl also includes: Content landscape overview]
```

`ai-trending.md` / `ai-trending.zh-CN.md` structure:
```
Sources: GitHub Trending + GitHub Search API

Today's summary
Top repos by dimension
  🔧 AI Infrastructure  — frameworks / SDKs / inference engines / CLIs
  🤖 AI Agents          — agent frameworks / multi-agent / automation
  📦 AI Applications    — vertical products / solutions
  🧠 Models & Training  — model weights / training frameworks / fine-tuning
  🔍 RAG & Knowledge    — vector databases / retrieval augmentation
Trend signal analysis
Community focus
```

`ai-hn.md` / `ai-hn.zh-CN.md` structure:
```
Sources: Hacker News (top-30 AI stories, last 24h)

Today's summary
Top stories & discussions
  🔬 Models & Research  — new model releases / papers / benchmarks
  🛠️ Tools & Engineering — open-source projects / frameworks / engineering practice
  🏢 Industry news      — company news / funding / product launches
  💬 Opinions & debate  — Ask HN / Show HN / hot threads
Community sentiment signals
Worth reading
```

`ai-weekly.md` / `ai-weekly.zh-CN.md` structure (generated every Monday):
```
Coverage: YYYY-MM-DD ~ YYYY-MM-DD  (last 7 daily digests)

Weekly highlights
Key trends & developments
Notable releases
Community momentum
Outlook
```

`ai-monthly.md` / `ai-monthly.zh-CN.md` structure (generated on the 1st of each month):
```
Sources: N weekly reports  (or sampled daily reports if fewer than 2 weeklies available)

Month in review
Major themes
Ecosystem shifts
Top projects & releases
Looking ahead
```

Historical digests are stored in [`digests/`](./digests/). Published issues are tagged by type: [`digest`](../../issues?label=digest) · [`openclaw`](../../issues?label=openclaw) · [`web`](../../issues?label=web) · [`trending`](../../issues?label=trending) · [`hn`](../../issues?label=hn) · [`ph`](../../issues?label=ph) · [`arxiv`](../../issues?label=arxiv) · [`hf`](../../issues?label=hf) · [`community`](../../issues?label=community) · [`weekly`](../../issues?label=weekly) · [`monthly`](../../issues?label=monthly).

## Schedule

| Workflow | Cron | UTC | CST |
|----------|------|-----|-----|
| Daily digest | `0 0 * * *` | 00:00 daily | 08:00 daily |
| Weekly rollup | `0 1 * * 1` | 01:00 Monday | 09:00 Monday |
| Monthly rollup | `0 2 1 * *` | 02:00 on the 1st | 10:00 on the 1st |

To change the schedule, edit the cron expressions in the corresponding workflow files under `.github/workflows/`.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)
