# CLAUDE.md

## Instructions

@.agents/instructions/code-review-graph.md
@.agents/instructions/context-mode.md
@.agents/instructions/dotenv.md
@.agents/instructions/qmd.md
@.agents/instructions/rtk.md
@.agents/instructions/typescript-standards.md

## Project overview

agents-radar is a daily digest generator for the AI open-source ecosystem. A GitHub Actions scheduler workflow (`.github/workflows/scheduler.yml`) ticks hourly, reads `config.yml` for schedule configuration, and runs the daily digest, weekly rollup, or monthly rollup when their cron expressions match the current UTC time. Reports are produced in configured languages (default: English + Chinese, 21 supported) and published as GitHub Issues and committed Markdown files.

## Branch

Default branch is **`main`** (not `master`). All PRs target `main`. **Never commit directly to `main`** — always work from a feature branch and merge via PR.

## Workflow

1. Create a new branch from `main` before making changes.
2. Commit all changes to that branch.
3. When done, ask the user whether to push and create a PR.
4. After the PR is merged, switch back to `main` and pull.

## Release

[release-please](https://github.com/googleapis/release-please) automates changelog generation and versioning. On each merge to `main`, it creates/updates a Release PR with an aggregated changelog. Merging that Release PR tags a new version, bumps `package.json`, and creates a GitHub Release.

Configuration: `release-please-config.json` | Workflow: `.github/workflows/release-please.yml`

## Commands

```bash
bun run start       # run the full digest locally  (packages/cli/cli.ts daily)
bun run scheduler   # run the scheduled digest     (packages/cli/cli.ts scheduler)
bun run weekly      # run the weekly rollup        (packages/cli/cli.ts weekly)
bun run monthly     # run the monthly rollup       (packages/cli/cli.ts monthly)
bun test            # bun test (unit tests)
bun run typecheck   # tsc --noEmit
bun run lint        # Biome check packages/ mcp/
bun run lint:fix    # Biome --fix
bun run format      # Biome format --write packages/ mcp/
bun run format:check # Biome format packages/ mcp/
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

## Workspace layout

This repo is a Bun workspace with five packages:

| Package | Path | Purpose |
|---------|------|---------|
| `@agents-radar/config` | `packages/config/` | Config loading — YAML/JSON/TOML parsers, format detection, auto-discovery, env, defaults |
| `@agents-radar/locales` | `packages/locales/` | Locale system — Zod schema, JSON loader, `t()` accessor, `generate`/`validate` CLI helpers |
| `@agents-radar/providers` | `packages/providers/` | LLM provider adapters (Anthropic, OpenAI, etc.) |
| `@agents-radar/core` | `packages/core/` | Digest pipeline — phases, fetchers, prompts, savers |
| `@agents-radar/cli` | `packages/cli/` | CLI entry point (`cli.ts`) with daily/weekly/monthly/scheduler subcommands |

All active code lives under `packages/`. There is no legacy `src/` directory.

## Architecture

The pipeline runs in four sequential phases, split into separate modules under `packages/core/src/phases/`:

1. **`fetchAllData`** (`packages/core/src/phases/fetch.ts`) — all network I/O in parallel: GitHub API (issues/PRs/releases) for 17 repos, Claude Code Skills, Anthropic/OpenAI sitemaps, GitHub Trending HTML + Search API, Hacker News Algolia API, ArXiv, Hugging Face, Product Hunt, Dev.to, Lobste.rs.
2. **`generateSummaries`** (`packages/core/src/phases/summarize.ts`) — per-repo LLM calls, all in parallel, rate-limited to 5 concurrent requests by a queue in `packages/core/src/report/call-llm.ts`.
3. **Comparison** (`packages/core/src/phases/compare.ts`) — two LLM calls: cross-tool CLI comparison and OpenClaw cross-ecosystem comparison.
4. **Save phase** (`packages/core/src/phases/save.ts`) — delegates to `buildCliReportContent` / `buildOpenclawReportContent` (in `packages/core/src/report/`) for Markdown formatting, then to savers in `packages/core/src/save/` for LLM call + file write + optional GitHub Issue.

## Source files

| File | Responsibility |
|------|---------------|
| `packages/cli/cli.ts` | CLI entry point — wires daily/weekly/monthly/scheduler/manifest subcommands |
| `packages/core/src/phases/run-daily.ts` | `runDaily` — orchestrates the full daily digest pipeline |
| `packages/core/src/phases/bootstrap-context.ts` | Loads config, resolves env vars, initialises run context |
| `packages/core/src/phases/classify-fetch-results.ts` | Splits raw fetch results into CLI / OpenClaw / peers buckets |
| `packages/core/src/phases/fetch.ts` | Phase 1 — all network I/O in parallel |
| `packages/core/src/phases/summarize.ts` | Phase 2 — per-repo LLM calls |
| `packages/core/src/phases/compare.ts` | Phase 3 — cross-tool + cross-ecosystem comparisons |
| `packages/core/src/phases/save.ts` | Phase 4 — report output + GitHub Issues |
| `packages/locales/src/t.ts` | `t(lang)` locale accessor — returns the full `LocaleData` object for a given locale |
| `packages/locales/src/data.ts` | Lazy-loads all locale JSON files; exports `STRINGS`, `SUPPORTED_LOCALES` |
| `packages/locales/src/schema.ts` | Zod schema for locale file validation; derives `LocaleData` type |
| `packages/locales/src/validate-locale.ts` | `validateLocale(lang)` — falls back to `"en-US"` if locale is not supported |
| `packages/locales/src/get-enabled-langs.ts` | Re-exports `getEnabledLangs` from `@agents-radar/config` |
| `packages/locales/src/prompt-lang.ts` | `PromptLang` type + `toPromptLang()` converter |
| `packages/locales/src/generate.ts` | `generate(repoRoot)` — writes `locale-schema.json` and `packages/locales/src/types/locale.ts` |
| `packages/locales/src/validate.ts` | `validate(repoRoot)` — validates all locale JSON files against `locale-schema.json` via AJV |
| `packages/locales/src/types/locale.ts` | `Locale` type (21-locale BCP-47 union, auto-generated from `locales/`) |
| `packages/config/src/load.ts` | `loadConfig` — auto-discovers config file, parses YAML/JSON/TOML, returns `RadarConfig` |
| `packages/config/src/detect-format.ts` | `detectFormat(filePath)` — derives format from extension (`.yml`/`.yaml`/`.json`/`.toml`) |
| `packages/config/src/find-config.ts` | `findConfig(dir?)` — probes `config.yml` → `config.yaml` → `config.json` → `config.toml` |
| `packages/config/src/parse/yaml.ts` | `parseYaml(content)` — parses YAML into `RawConfig` |
| `packages/config/src/parse/json.ts` | `parseJson(content)` — parses JSON into `RawConfig` |
| `packages/config/src/parse/toml.ts` | `parseToml(content)` — parses TOML into `RawConfig` via `smol-toml` |
| `packages/config/src/types.ts` | `RawConfig`, `RadarConfig`, `RepoConfig`, `ScheduleConfig` and related interfaces |
| `packages/config/src/constants.ts` | Default values: `DEFAULT_CLI_REPOS`, `DEFAULT_OPENCLAW`, `DEFAULT_SCHEDULES`, etc. |
| `packages/config/src/env.ts` | `env` — central source of truth for env vars (`GITHUB_TOKEN`, `DIGEST_REPO`, `LLM_PROVIDER`) |
| `packages/config/src/get-enabled-langs.ts` | `getEnabledLangs(langConfig?, env?)` — resolves active languages from config + `REPORT_LANGS` |
| `packages/core/src/utils/to-cst-date-str.ts` | `toCstDateStr(date)` — formats a date as CST string |
| `packages/core/src/utils/to-utc-str.ts` | `toUtcStr(date)` — formats a date as UTC string |
| `packages/core/src/utils/sleep.ts` | `sleep(ms)` utility |
| `packages/core/src/utils/constants.ts` | Shared constants (e.g. `PAGES_URL_DEFAULT`) |
| `packages/core/src/utils/cron.ts` | Cron expression matching helpers |
| `packages/core/src/utils/logger.ts` | Structured logger instance |
| `packages/core/src/github/fetch-recent-items.ts` | `fetchRecentItems` — GitHub issues/PRs for a repo |
| `packages/core/src/github/fetch-recent-releases.ts` | `fetchRecentReleases` — GitHub releases for a repo |
| `packages/core/src/github/fetch-skills-data.ts` | `fetchSkillsData` — Claude Code Skills repo data |
| `packages/core/src/github/create-issue.ts` | `createGitHubIssue` — creates a GitHub issue |
| `packages/core/src/github/ensure-label.ts` | `ensureLabel` — creates a label if it doesn't exist |
| `packages/core/src/github/labels.ts` | GitHub issue label colors (`LABEL_COLORS`) |
| `packages/core/src/github/types.ts` | Shared `RepoFetch`, `GitHubItem`, `RepoConfig` types |
| `packages/core/src/prompts/cli.ts` | `buildCliPrompt` — CLI repo summary prompt |
| `packages/core/src/prompts/peer.ts` | `buildPeerPrompt` — OpenClaw peer repo prompt |
| `packages/core/src/prompts/comparison.ts` | `buildComparisonPrompt` — cross-tool CLI comparison prompt |
| `packages/core/src/prompts/peers-comparison.ts` | `buildPeersComparisonPrompt` — cross-ecosystem comparison prompt |
| `packages/core/src/prompts/skills.ts` | `buildSkillsPrompt` — Claude Code Skills prompt |
| `packages/core/src/prompts/trending.ts` | `buildTrendingPrompt` |
| `packages/core/src/prompts/web-report.ts` | `buildWebReportPrompt` |
| `packages/core/src/prompts/hackernews.ts` | `buildHnPrompt` |
| `packages/core/src/prompts/arxiv.ts` | `buildArxivPrompt` |
| `packages/core/src/prompts/hugging-face.ts` | `buildHfPrompt` |
| `packages/core/src/prompts/product-hunt.ts` | `buildPhPrompt` |
| `packages/core/src/prompts/community.ts` | `buildCommunityPrompt` |
| `packages/core/src/prompts/weekly.ts` | `buildWeeklyPrompt` |
| `packages/core/src/prompts/monthly.ts` | `buildMonthlyPrompt` |
| `packages/core/src/prompts/highlights.ts` | `buildHighlightsPrompt` — Telegram highlights prompt |
| `packages/core/src/prompts/sample-note.ts` | `sampleNote(total, sampled)` — formats the sampling note |
| `packages/core/src/report/call-llm.ts` | `callLlm` with concurrency limiter (`LLM_CONCURRENCY = 5`) and retry logic |
| `packages/core/src/report/save-file.ts` | `saveFile` — writes a report file to `digests/YYYY-MM-DD/` |
| `packages/core/src/report/auto-gen-footer.ts` | `autoGenFooter` — generates the report footer |
| `packages/core/src/report/constants.ts` | LLM token budget constants |
| `packages/core/src/report/build-cli-content.ts` | `buildCliReportContent` — final CLI Markdown assembler |
| `packages/core/src/report/build-openclaw-content.ts` | `buildOpenclawReportContent` — final OpenClaw Markdown assembler |
| `packages/core/src/save/report.ts` | `saveReport` — generic LLM call + file write + optional GitHub Issue |
| `packages/core/src/save/data-source-report.ts` | `saveDataSourceReport` — shared wrapper with skip/error handling |
| `packages/core/src/save/web-report.ts` | `saveWebReport` |
| `packages/core/src/save/trending-report.ts` | `saveTrendingReport` |
| `packages/core/src/save/hacker-news-report.ts` | `saveHackerNewsReport` |
| `packages/core/src/save/product-hunt-report.ts` | `saveProductHuntReport` |
| `packages/core/src/save/arxiv-report.ts` | `saveArxivReport` |
| `packages/core/src/save/hugging-face-report.ts` | `saveHuggingFaceReport` |
| `packages/core/src/save/community-report.ts` | `saveCommunityReport` |
| `packages/core/src/rollup/run-weekly.ts` | `runWeekly` — weekly rollup entry point |
| `packages/core/src/rollup/run-monthly.ts` | `runMonthly` — monthly rollup entry point |
| `packages/core/src/rollup/generate-highlights.ts` | Telegram highlights generation for rollups |
| `packages/core/src/fetchers/fetch-site-content.ts` | Sitemap-based web content fetching; state persisted to `digests/web-state.json` |
| `packages/core/src/fetchers/trending.ts` | GitHub Trending HTML scraper |
| `packages/core/src/fetchers/fetch-github-trending.ts` | GitHub Search API topic queries (6 AI topics, 7-day window) |
| `packages/core/src/fetchers/hacker-news.ts` | Hacker News top AI stories via Algolia HN Search API |
| `packages/core/src/fetchers/arxiv.ts` | ArXiv paper fetcher (cs.AI, cs.CL, cs.LG) |
| `packages/core/src/fetchers/hugging-face.ts` | Hugging Face Hub model fetcher |
| `packages/core/src/fetchers/product-hunt.ts` | Product Hunt fetcher |
| `packages/core/src/fetchers/dev-to.ts` | Dev.to community articles fetcher |
| `packages/core/src/fetchers/lobste-rs.ts` | Lobste.rs stories fetcher |
| `packages/providers/types.ts` | `LlmProvider` interface, `ProviderFactory` type |
| `packages/providers/openai-compatible.ts` | `createOpenAICompatibleProvider` — shared factory for OpenAI-compatible providers |
| `packages/providers/anthropic.ts` | `createAnthropicProvider` — Anthropic SDK wrapper |
| `packages/providers/openai.ts` | `createOpenAIProvider` — extends `createOpenAICompatibleProvider` |
| `packages/providers/github-copilot.ts` | `createGitHubCopilotProvider` — extends `createOpenAICompatibleProvider` |
| `packages/providers/openrouter.ts` | `createOpenRouterProvider` — extends `createOpenAICompatibleProvider` |
| `packages/providers/deepseek.ts` | `createDeepSeekProvider` — 403 fallback provider |
| `packages/providers/index.ts` | `createProvider` factory + barrel re-exports |
| `packages/core/src/notifications/notify/` | Primary notification dispatch (Telegram) |
| `packages/core/src/notifications/feishu/` | Feishu (Lark) notification channel |
| `packages/core/src/notifications/social/` | Social media posting (CLI command + action) |
| `packages/core/src/types/locale.ts` | Re-exports `Locale` from `@agents-radar/locales` (kept for backwards-compatible relative imports within core) |
| `packages/core/src/generate-manifest/constants.ts` | `REPORT_FILES` list, `DIGESTS_DIR` |
| `packages/core/src/generate-manifest/report-label.ts` | `reportLabel(reportId)` — human label for a report type |
| `packages/core/src/generate-manifest/scan-digest-dirs.ts` | `scanDigestDirs()` — scans `digests/` for date directories and report files |
| `packages/core/src/generate-manifest/build-feed-xml.ts` | `buildFeedXml()` — generates RSS feed XML |
| `packages/cli/manifest/action.ts` | `generateManifestAction` — generates `manifest.json` + `feed.xml` |
| `locales/*.json` | 21 locale files using BCP-47 tags (ar-SA, bn-BD, de-DE, en-US, es-ES, fr-FR, hi-IN, id-ID, it-IT, ja-JP, ko-KR, nl-NL, pl-PL, pt-BR, ro-RO, ru-RU, th-TH, tr-TR, uk-UA, vi-VN, zh-CN) — drop a new file to add a language |

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

Where `{locale}` is empty for the primary language (default: `en-US`, e.g. `ai-cli.md`) and the BCP-47 code for all other languages (e.g. `ai-cli.zh-CN.md`, `ai-cli.ja-JP.md`). The primary language is set via `defaultPrimaryLanguage` in `config.yml`.

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

- Config loading lives in `@agents-radar/config`. `loadConfig(path?)` supports YAML (`.yml`/`.yaml`), JSON (`.json`), and TOML (`.toml`). When called without an explicit path it auto-discovers the first config file found in the working directory by probing `config.yml` → `config.yaml` → `config.json` → `config.toml`. If none exist, built-in defaults are returned. The format is inferred from the file extension via `detectFormat`.
- All locale strings are stored in `locales/*.json` files (21 languages, BCP-47 tags). Access them via `t(lang)` from `@agents-radar/locales` (import directly, or through `@agents-radar/core/utils`). To add a new language, drop a valid JSON file into `locales/` and add its BCP-47 tag to the `languages` list in `config.yml` — no code changes needed.
- Each report type has its own prompt builder in `packages/core/src/prompts/`. Repo-level prompts live in `cli.ts`, `peer.ts`, etc. Data-source prompts live in `trending.ts`, `hackernews.ts`, etc. Note: prompt files use the domain name directly (no `build-` prefix).
- `callLlm(prompt, maxTokens?)` in `packages/core/src/report/call-llm.ts` defaults to 4096 tokens. Web report uses 8192, trending uses 6144. HN report uses the default 4096.
- On 429 rate-limit errors `callLlm` retries up to 3 times with exponential backoff (5 s / 10 s / 20 s); the concurrency slot is released during the wait.
- The concurrency limiter (`LLM_CONCURRENCY = 5` in `packages/core/src/report/call-llm.ts`) prevents 429s when many parallel LLM calls fire. Do not bypass it by calling SDK clients directly.
- LLM provider is selected via `LLM_PROVIDER` env var (default: `anthropic`). Valid values: `anthropic`, `openai`, `github-copilot`, `openrouter`, `deepseek`.
- Provider implementations live in `packages/providers/`. Each file implements the `LlmProvider` interface. The factory in `packages/providers/index.ts` validates the provider name and logs only the provider name — never API keys or endpoint URLs. DeepSeek is also available as a 403 fallback provider (requires `DEEPSEEK_API_KEY`).
- GitHub issue label colors are defined in `LABEL_COLORS` in `packages/core/src/github/labels.ts`. Add new labels there.
- `sampleNote(total, sampled)` in `packages/core/src/prompts/sample-note.ts` formats the "(共 N 条，展示前 M 条)" note. Reuse it — do not inline the same string format.
- Web state (`digests/web-state.json`) is committed to git on every run. It is the source of truth for which URLs have been seen.

## Web UI & RSS Feed

- Web UI: `index.html` reads `manifest.json` to build the sidebar, then fetches `digests/YYYY-MM-DD/report.md` on demand.
- RSS Feed: `feed.xml` at the repo root. Generated by `packages/cli/manifest/action.ts` in the same `bun run manifest` step. Contains the latest 30 items (newest first) across all report types. Item links use hash routing: `https://duanyytop.github.io/agents-radar/#YYYY-MM-DD/report`.
- Both `manifest.json` and `feed.xml` are committed together in the "Commit manifest and feed" GHA step.
- Report labels are generated from JSON locale files via `reportLabel()` in `packages/core/src/generate-manifest/report-label.ts`. They must be kept in sync with the `LABELS` object in `index.html` when adding new report types.

## Adding a new report type

1. Create a data fetcher in `packages/core/src/fetchers/` (or add to an existing one).
2. Add a `buildXxxPrompt` function as a new file `packages/core/src/prompts/xxx.ts` (no `build-` prefix). Re-export it from `packages/core/src/prompts/index.ts`.
3. Add fields for all strings (titles, labels, etc.) to `packages/locales/src/schema.ts` and all 21 `locales/*.json` files.
4. Add a `saveXxxReport` function as a new file `packages/core/src/save/xxx-report.ts` (no `save-` prefix). Re-export it from `packages/core/src/save/index.ts`.
5. Wire into `fetchAllData`, `generateSummaries`, and the save phase in `packages/core/src/phases/`.
6. Add a label color entry in `LABEL_COLORS` in `packages/core/src/github/labels.ts`.
7. Add the report ID and label fields to `locales/*.json` files and `LABELS` in `index.html`.
8. Add the report file name to `REPORT_FILES` in `packages/core/src/generate-manifest/constants.ts`.
9. Update both README files and this file.
