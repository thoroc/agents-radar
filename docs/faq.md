# FAQ

## General

### What is agents-radar?

A GitHub Actions workflow that aggregates AI ecosystem signals from 10 data sources daily and publishes digests as GitHub Issues and committed Markdown files. See the [README](../README.md) for an overview.

### Is it free and open source?

Yes. The Web UI requires no login, the Telegram/Feishu/RSS feeds are free to subscribe to, and the MCP server is publicly hosted. The source code is MIT licensed — fork it, customise it, run your own instance.

### How can I access the digests?

- **Web UI** — browse all historical digests at your `PAGES_URL` (defaults to the upstream instance)
- **Telegram** — [t.me/agents_radar](https://t.me/agents_radar) for push notifications
- **RSS** — `PAGES_URL/feed.xml` in any RSS reader (Feedly, Reeder, NewsBlur, etc.)
- **GitHub Issues** — tagged by report type in the host repository
- **MCP server** — query reports directly from Claude Desktop or OpenClaw (see [README](../README.md#mcp-server))

---

## Setup and configuration

### How do I add my own repositories?

Edit `config.yml` in the repo root — add entries under `cli_repos` or `openclaw_peers`. No code changes needed; the pipeline reads the file on every run. See [docs/setup.md](./setup.md) for the full config reference.

### How do I enable more languages?

Add BCP-47 tags to the `languages` list in `config.yml`. All 21 locales are pre-translated — just enable them. Note that each additional language multiplies LLM calls per run, which increases cost and run time. See [docs/setup.md#multi-language-support](./setup.md#multi-language-support).

### How do I change the run schedule?

Edit the cron expressions in `.github/workflows/`. The default schedules are documented in [docs/setup.md#schedule](./setup.md#schedule).

### Can I use a different LLM provider?

Yes — set `LLM_PROVIDER` to `anthropic`, `openai`, `github-copilot`, or `openrouter` and add the corresponding API key as a repository secret. See [docs/setup.md#llm-providers](./setup.md#llm-providers) for the full provider table.

---

## Troubleshooting

### The workflow ran but no GitHub Issue was created — why?

`DIGEST_REPO` is not set. Add it as a repository secret (format: `owner/repo`). Without it, reports are written to `digests/` as files but no issue is posted.

### A report was skipped today — why?

Some report types are conditional:

| Report | File prefix | Skipped when |
|--------|-------------|--------------|
| Web | `ai-web` | No new or updated URLs detected in the Anthropic/OpenAI sitemaps |
| Trending | `ai-trending` | Both the GitHub Trending HTML scrape and the Search API query fail |
| Hacker News | `ai-hn` | The Algolia Hacker News Search API fetch fails |
| Product Hunt | `ai-ph` | The Product Hunt API fetch fails |
| ArXiv | `ai-arxiv` | The ArXiv API fetch fails |
| Hugging Face | `ai-hf` | The Hugging Face Hub API fetch fails |
| Community | `ai-community` | Both Dev.to and Lobste.rs fetches fail |

The `ai-cli` and `ai-agents` reports are always generated.

### The web report ran on the first run but hasn't run since — is that normal?

Yes. On the first run, up to 25 recent articles per site are fetched and a full overview is generated. After that, only articles with a new or changed `lastmod` timestamp in the sitemap trigger a report. If Anthropic and OpenAI haven't published anything new, the step is skipped. The persisted state lives in `digests/web-state.json`.

### How much does it cost to run?

Cost depends on the LLM provider, number of enabled languages, and which data sources return results. A typical daily run with two languages (EN + ZH) makes roughly 40–50 LLM calls. With five languages and all data sources active, that rises to 100+. GitHub Copilot as the provider uses your existing `GITHUB_TOKEN` at no extra cost.

### The workflow failed with a 429 error — what should I do?

The pipeline has built-in retry logic with exponential backoff (5 s / 10 s / 20 s, up to 3 retries) and a concurrency limiter of 5 parallel LLM calls. If you're still hitting 429s consistently, reduce the number of enabled languages in `config.yml` or switch to a provider with a higher rate limit.

---

## Contributing and support

### How can I contribute?

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the branch strategy, coding standards, PR process, and commit conventions.

### Where can I get help?

- **GitHub Issues** — [github.com/duanyytop/agents-radar/issues](https://github.com/duanyytop/agents-radar/issues)
- **Discussions** — open a discussion for questions that aren't bugs
