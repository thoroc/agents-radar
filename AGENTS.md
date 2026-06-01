# CLAUDE.md

## Project overview

agents-radar is a daily digest generator for the AI open-source ecosystem. A GitHub Actions scheduler workflow (`.github/workflows/scheduler.yml`) ticks hourly, reads `config.yml` for schedule configuration, and runs the daily digest, weekly rollup, or monthly rollup when their cron expressions match the current UTC time. Reports are produced in configured languages (default: English + Chinese, 21 supported) and published as GitHub Issues and committed Markdown files.

## Branch

Default branch is **`main`** (not `master`). All PRs target `main`.

## Release

[release-please](https://github.com/googleapis/release-please) automates changelog generation and versioning. On each merge to `main`, it creates/updates a Release PR with an aggregated changelog. Merging that Release PR tags a new version, bumps `package.json`, and creates a GitHub Release.

Configuration: `release-please-config.json` | Workflow: `.github/workflows/release-please.yml`

## Commands

```bash
bun run start       # run the full digest locally
bun run scheduler   # run the scheduled digest (checks config.yml, cron-matched)
bun test            # bun test (unit tests)
bun run typecheck   # tsc --noEmit
bun run lint        # Biome
bun run lint:fix    # Biome --fix
bun run format      # Biome format --write src
bun run format:check # Biome format --check src
```

Required env vars for local runs:

```bash
export GITHUB_TOKEN=ghp_xxxxx
export DIGEST_REPO=owner/repo   # omit to skip GitHub issue creation

# LLM provider (default: anthropic)
export LLM_PROVIDER=anthropic   # anthropic | openai | github-copilot | openrouter | deepseek

# Anthropic (default)
export ANTHROPIC_API_KEY=sk-ant-xxxxx
export ANTHROPIC_BASE_URL=https://api.kimi.com/coding/  # omit for Anthropic

# OpenAI
# export OPENAI_API_KEY=sk-xxxxx

# GitHub Copilot — uses GITHUB_TOKEN

# OpenRouter
# export OPENROUTER_API_KEY=sk-or-xxxxx
```

## Architecture

The pipeline runs in four sequential phases, split into separate modules under `src/phases/`:

1. **`fetchAllData`** (`src/phases/fetch.ts`) — all network I/O in parallel: GitHub API (issues/PRs/releases) for 17 repos, Claude Code Skills, Anthropic/OpenAI sitemaps, GitHub Trending HTML + Search API, Hacker News Algolia API, ArXiv, Hugging Face, Product Hunt, Dev.to, Lobste.rs.
2. **`generateSummaries`** (`src/phases/summarize.ts`) — per-repo LLM calls, all in parallel, rate-limited to 5 concurrent requests by a queue in `src/report.ts`.
3. **Comparison** (`src/phases/compare.ts`) — two LLM calls: cross-tool CLI comparison and OpenClaw cross-ecosystem comparison.
4. **Save phase** (`src/phases/save.ts`) — delegates to `buildCliReportContent` / `buildOpenclawReportContent` (in `src/report-builders.ts`) for Markdown formatting, then to savers in `src/report-savers.ts` for LLM call + file write + optional GitHub Issue.

## Source files

| File | Responsibility |
|------|---------------|
| `src/index.ts` | Orchestration: repo config, `main()` entry point |
| `src/phases/fetch.ts` | Phase 1 — all network I/O in parallel |
| `src/phases/summarize.ts` | Phase 2 — per-repo LLM calls |
| `src/phases/compare.ts` | Phase 3 — cross-tool + cross-ecosystem comparisons |
| `src/phases/save.ts` | Phase 4 — report output + GitHub Issues |
| `src/utils/i18n.ts` | Locale system: lazy-loaded JSON reader, `t(lang)` accessor, `Locale` type, `toPromptLang()`, `SUPPORTED_LOCALES` |
| `src/utils/config.ts` | YAML config loader; `getEnabledLangs()`, `RadarConfig` interface |
| `src/utils/date.ts` | Date and timing utilities: `toCstDateStr`, `toUtcStr`, `sleep` |
| `src/utils/locale-schema.ts` | Zod schema for locale file validation; derives `LocaleData` type |
| `src/github/api.ts` | GitHub API helpers: `fetchRecentItems`, `fetchRecentReleases`, `fetchSkillsData`, `createGitHubIssue` |
| `src/github/issues.ts` | GitHub issue formatting helpers |
| `src/github/labels.ts` | GitHub issue label colors (`LABEL_COLORS`) |
| `src/github/types.ts` | Shared `RepoFetch`, `GitHubItem`, `RepoConfig` types |
| `src/prompts/prompts.ts` | LLM prompt builders for repo reports: `buildCliPrompt`, `buildPeerPrompt`, `buildComparisonPrompt`, `buildPeersComparisonPrompt`, `buildSkillsPrompt` |
| `src/prompts/prompts-data.ts` | LLM prompt builders for data-source reports: `buildTrendingPrompt`, `buildWebReportPrompt`, `buildHnPrompt`, `buildArxivPrompt`, `buildHfPrompt`, `buildPhPrompt`, `buildCommunityPrompt`, `buildWeeklyPrompt`, `buildMonthlyPrompt` |
| `src/report.ts` | `callLlm` (with concurrency limiter), `saveFile`, `autoGenFooter`, LLM token budget constants |
| `src/report-builders.ts` | `buildCliReportContent`, `buildOpenclawReportContent` — final Markdown assemblers |
| `src/report-savers.ts` | `saveReport` generic + `saveWebReport`, `saveTrendingReport`, `saveHnReport`, `savePhReport`, `saveArxivReport`, `saveHfReport`, `saveCommunityReport` |
| `src/rollup.ts` | Weekly and monthly rollup report generator |
| `src/fetchers/web.ts` | Sitemap-based web content fetching; state persisted to `digests/web-state.json` |
| `src/fetchers/trending.ts` | GitHub Trending HTML scraper + Search API topic queries |
| `src/fetchers/hn.ts` | Hacker News top AI stories via Algolia HN Search API |
| `src/fetchers/arxiv.ts` | ArXiv paper fetcher (cs.AI, cs.CL, cs.LG) |
| `src/fetchers/hf.ts` | Hugging Face Hub model fetcher |
| `src/fetchers/ph.ts` | Product Hunt fetcher |
| `src/fetchers/devto.ts` | Dev.to community articles fetcher |
| `src/fetchers/lobsters.ts` | Lobste.rs stories fetcher |
| `src/providers/types.ts` | `LlmProvider` interface, `ProviderFactory` type |
| `src/providers/openai-compatible.ts` | `createOpenAICompatibleProvider` — shared factory for OpenAI-compatible providers |
| `src/providers/anthropic.ts` | `createAnthropicProvider` — Anthropic SDK wrapper |
| `src/providers/openai.ts` | `createOpenAIProvider` — extends `createOpenAICompatibleProvider` |
| `src/providers/github-copilot.ts` | `createGitHubCopilotProvider` — extends `createOpenAICompatibleProvider` |
| `src/providers/openrouter.ts` | `createOpenRouterProvider` — extends `createOpenAICompatibleProvider` |
| `src/providers/deepseek.ts` | `createDeepSeekProvider` — 403 fallback provider |
| `src/providers/index.ts` | `createProvider` factory + barrel re-exports |
| `src/notifications/notify.ts` | Primary notification dispatch |
| `src/notifications/feishu.ts` | Feishu (Lark) notification channel |
| `src/notifications/social/` | Social media posting (CLI command + action) |
| `src/types/locale.ts` | `Locale` type (21-locale union) |
| `src/types/prompt-lang.ts` | `PromptLang` type + `toPromptLang()` converter |
| `src/generate-manifest.ts` | Generates `manifest.json` (sidebar) + `feed.xml` (RSS 2.0) |
| `locales/*.json` | 21 locale files (ar, bn, de, en, es, fr, hi, id, it, ja, ko, nl, pl, pt, ro, ru, th, tr, uk, vi, zh) — drop a new file to add a language |

## Report outputs

Files written to `digests/YYYY-MM-DD/`. Each report type generates one file per enabled language:

| File pattern | Label | Notes |
|------|-------|-------|
| `ai-cli.{locale}.md` | `digest.{locale}` | Always generated |
| `ai-agents.{locale}.md` | `openclaw.{locale}` | Always generated |
| `ai-web.{locale}.md` | `web.{locale}` | Skipped if no new sitemap content |
| `ai-trending.{locale}.md` | `trending.{locale}` | Skipped if both data sources fail |
| `ai-hn.{locale}.md` | `hn.{locale}` | Skipped if Algolia fetch fails |
| `ai-ph.{locale}.md` | `ph.{locale}` | Skipped if Product Hunt fetch fails |
| `ai-arxiv.{locale}.md` | `arxiv.{locale}` | Skipped if ArXiv fetch fails |
| `ai-hf.{locale}.md` | `hf.{locale}` | Skipped if Hugging Face fetch fails |
| `ai-community.{locale}.md` | `community.{locale}` | Skipped if both Dev.to and Lobste.rs fail |

Where `{locale}` is empty for Chinese (default, e.g. `ai-cli.md`) and the language code for other languages (e.g. `ai-cli.en.md`, `ai-cli.ja.md`).

## Tracked sources

- **CLI_REPOS** (9): claude-code, codex, gemini-cli, copilot-cli, kimi-cli, opencode, pi, qwen-code, deepseek-tui
- **OPENCLAW** + **OPENCLAW_PEERS** (13): openclaw/openclaw + 12 peer projects (sorted by stars)
- **CLAUDE_SKILLS_REPO**: anthropics/skills — no date filter, sorted by popularity
- **Web**: anthropic.com + openai.com via sitemap, state in `digests/web-state.json`
- **Trending**: github.com/trending (HTML) + GitHub Search API (6 AI topics, 7-day window)
- **HN**: Algolia HN Search API — 6 parallel queries, top-30 AI stories by points, last 24h
- **ArXiv**: cs.AI, cs.CL, cs.LG papers via arXiv API
- **Hugging Face**: Trending models via Hugging Face Hub API
- **Product Hunt**: Featured products via Product Hunt API
- **Dev.to**: Top AI articles via Dev.to API
- **Lobste.rs**: Top AI stories via Lobste.rs API

## Key conventions

- All locale strings are stored in `locales/*.json` files (21 languages). Access them via `t(lang)` from `src/utils/i18n.ts`. To add a new language, drop a valid JSON file into `locales/` and add its ISO code to the `languages` list in `config.yml` — no code changes needed.
- LLM prompt builders are split across two files: `src/prompts/prompts.ts` (repo-level prompts) and `src/prompts/prompts-data.ts` (data-source and rollup prompts). Each report type has its own builder function.
- `callLlm(prompt, maxTokens?)` defaults to 4096 tokens. Web report uses 8192, trending uses 6144. HN report uses the default 4096.
- On 429 rate-limit errors `callLlm` retries up to 3 times with exponential backoff (5 s / 10 s / 20 s); the concurrency slot is released during the wait.
- The concurrency limiter (`LLM_CONCURRENCY = 5`) prevents 429s when many parallel LLM calls fire. Do not bypass it by calling SDK clients directly.
- LLM provider is selected via `LLM_PROVIDER` env var (default: `anthropic`). Valid values: `anthropic`, `openai`, `github-copilot`, `openrouter`, `deepseek`.
- Provider implementations live in `src/providers/`. Each file implements the `LlmProvider` interface. The factory in `src/providers/index.ts` validates the provider name and logs only the provider name — never API keys or endpoint URLs. DeepSeek is also available as a 403 fallback provider (requires `DEEPSEEK_API_KEY`).
- GitHub issue label colors are defined in `LABEL_COLORS` in `src/github/labels.ts`. Add new labels there.
- `sampleNote(total, sampled)` in `src/prompts/prompts.ts` formats the "(共 N 条，展示前 M 条)" note. Reuse it — do not inline the same string format.
- Web state (`digests/web-state.json`) is committed to git on every run. It is the source of truth for which URLs have been seen.

## Web UI & RSS Feed

- Web UI: `index.html` reads `manifest.json` to build the sidebar, then fetches `digests/YYYY-MM-DD/report.md` on demand.
- RSS Feed: `feed.xml` at the repo root. Generated by `src/generate-manifest.ts` in the same `bun run manifest` step. Contains the latest 30 items (newest first) across all report types. Item links use hash routing: `https://duanyytop.github.io/agents-radar/#YYYY-MM-DD/report`.
- Both `manifest.json` and `feed.xml` are committed together in the "Commit manifest and feed" GHA step.
- Report labels are generated from JSON locale files via `reportLabel()` in `src/generate-manifest.ts`. They must be kept in sync with the `LABELS` object in `index.html` when adding new report types.

## Adding a new report type

1. Create a data fetcher (or add to an existing one).
2. Add a `buildXxxPrompt` function in `src/prompts-data.ts` (for data-source prompts) or `src/prompts.ts` (for repo-level prompts).
3. Add fields for all strings (titles, labels, etc.) to `src/locale-schema.ts` and all 21 `locales/*.json` files.
4. Add a `saveXxxReport` function in `src/report-savers.ts`.
5. Wire into `fetchAllData`, `generateSummaries`, and the save phase in `src/index.ts`.
6. Add a label color entry in `LABEL_COLORS` in `src/github.ts`.
7. Add the report ID and label fields to `locales/*.json` files and `LABELS` in `index.html`.
8. Add the report file name to `REPORT_FILES` in `src/generate-manifest.ts`.
9. Update both README files and this file.
