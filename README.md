# agents-radar

## Supported languages

🇬🇧 English · 🇨🇳 中文 · 🇯🇵 日本語 · 🇰🇷 한국어 · 🇪🇸 Español · 🇧🇷 Português · 🇫🇷 Français · 🇩🇪 Deutsch · 🇮🇹 Italiano · 🇵🇱 Polski · 🇷🇺 Русский · 🇸🇦 العربية · 🇹🇷 Türkçe · 🇻🇳 Tiếng Việt · 🇹🇭 ไทย · 🇳🇱 Nederlands · 🇮🇳 हिन्दी · 🇷🇴 Română · 🇮🇩 Bahasa Indonesia · 🇺🇦 Українська · 🇧🇩 বাংলা

English | [中文](./README.zh.md)

A GitHub Actions workflow that runs every morning at 08:00 CST. It aggregates AI ecosystem signals from 10 data sources, then publishes daily digests (in all configured languages) as GitHub Issues and committed Markdown files. Weekly and monthly rollup reports are also generated automatically.

## Data Sources

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

The web UI is a Vite + TypeScript SPA in `packages/web/`. It fetches `manifest.json` and individual digest files at runtime — new daily digests appear without any UI rebuild.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```

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

10 data sources across GitHub repos, news, research, and community feeds. See [docs/sources.md](./docs/sources.md) for the full list with repository links and per-source details.

**Quick summary:** 9 AI CLI repos + OpenClaw + 12 peer agents (GitHub API) · Claude Code Skills · GitHub Trending (HTML + Search API) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + OpenAI sitemaps.

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
- Centralized locale system via `locales/*.json` — 21 supported languages with `t()` catalog in `packages/core/src/locales/t.ts`

## Setup

1. **Fork** this repository
2. Add your LLM provider key as a repository secret (e.g. `ANTHROPIC_API_KEY`)
3. Enable the workflow in the **Actions** tab — it runs automatically from then on

For the full guide — secrets reference, LLM providers, `config.yml` customisation, local development, multi-language configuration, and schedule — see [docs/setup.md](./docs/setup.md).

## Output format

Files are written to `digests/YYYY-MM-DD/` — one file per report type per enabled language. See [docs/output-format.md](./docs/output-format.md) for the full file listing, per-report structure, and GitHub Issue label reference.

**Example:** with `["en-US", "zh-CN"]` configured, `digests/2026-05-28/` contains `ai-cli.md` (English, primary) and `ai-cli.zh-CN.md` (Chinese).

Historical digests are stored in [`digests/`](./digests/). Published issues are tagged by type: [`digest`](../../issues?label=digest) · [`openclaw`](../../issues?label=openclaw) · [`web`](../../issues?label=web) · [`trending`](../../issues?label=trending) · [`hn`](../../issues?label=hn) · [`ph`](../../issues?label=ph) · [`arxiv`](../../issues?label=arxiv) · [`hf`](../../issues?label=hf) · [`community`](../../issues?label=community) · [`weekly`](../../issues?label=weekly) · [`monthly`](../../issues?label=monthly).

## FAQ

Common questions — why a report was skipped, how much it costs to run, adding repos, changing the schedule, troubleshooting 429s — answered in [docs/faq.md](./docs/faq.md).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)
