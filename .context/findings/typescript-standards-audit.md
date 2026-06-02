# TypeScript Standards Audit

> **Date:** 2026-06-01
> **Last updated:** 2026-06-02 (all items resolved — Rule 2 extraction complete, Rule 4 coverage at ~77%, rollup tests fixed)
> **Scope:** All files under `src/` (~151 non-test `.ts` files)
> **Method:** Grep + directory analysis + source inspection
> **Status:** 13 PASS / 1 N/A / 1 PARTIAL (Rule 4 coverage still below 90%)

---

## Summary

| # | Rule | Description | Result | Priority |
|---|------|-------------|--------|----------|
| 1 | — | Arrow Functions Only | ✅ PASS | — |
| 2 | — | One Function Per Module | ✅ RESOLVED | — |
| 3 | — | Barrel Modules Always | ✅ PASS | — |
| 4 | — | Test Collocation + ≥90% Coverage | ⚠️ PARTIAL (~77% test ratio) | Low |
| 5 | — | Group Modules by Domain | ✅ PASS (resolved 2026-06-01) | — |
| 6 | — | Cliffy for CLI | ✅ PASS | — |
| 7 | — | Dependency Injection via Parameters | ✅ PASS | — |
| 8 | — | stderr for Diagnostics | ✅ PASS | — |
| 9 | — | Luxon for All Date/Time | ✅ PASS | — |
| 10 | — | TDD | ⏭ N/A (new code only) | — |
| 11 | — | Extension-free Imports | ✅ PASS | — |
| 12 | — | dotenvx for Env Loading | ✅ PASS | — |
| 13 | — | Verbose Flag (`-V, --verbose`) | ✅ PASS | — |
| 14 | — | Command/Action Separation | ✅ PASS | — |
| 15 | — | Avoid Abbreviations | ✅ PASS (resolved 2026-06-01) | — |

---

## Rule 1: Arrow Functions Only — ✅ PASS

Zero `function` keyword declarations found in `src/` production code. All functions use `const` arrow syntax.

---

## Rule 2: One Function Per Module — ✅ RESOLVED

All multi-function files have been split into individual modules:

| Phase | Files | Resolution |
|-------|-------|-----------|
| Initial (2026-06-02) | `prompts.ts`, `rollup-utils.ts`, `trending.ts`, `index.ts`, `save-data-source-report.ts` | 5 multi-function files split |
| R#2 extraction | 3 `action.ts` files | `reportLabel`→`report-label.ts`, `getReportContent`→`get-report-content.ts`, `getWebhookUrls`→`get-webhook-urls.ts`, `sendToOneWebhook`→`send-to-one-webhook.ts`, `sendFeishu`→`send-feishu.ts`, `sendTelegram`→`send-telegram.ts` (+ `constants.ts`) |

All `action.ts` files now contain exactly **one** exported function. Barrels updated.

---

## Rule 3: Barrel Modules Always — ✅ PASS

All 15 directories have `index.ts` barrel files. The previously missing `src/report/`, `src/rollup/`, and `src/save/` directories now have correct barrel files.

---

## Rule 4: Test Collocation + ≥90% Coverage — ⚠️ PARTIAL

### Collocation ✅

**Previously mislocated tests (first wave)** — all resolved:

| Original location | Resolution | Status |
|-------------------|-----------|--------|
| `src/report.test.ts` | Split into 7 collocated tests in `src/report/` | ✅ |
| `src/report-builders.test.ts` | Split into 2 collocated tests in `src/report/` | ✅ |
| `src/generate-manifest.test.ts` | Split into 2 collocated tests in `src/generate-manifest/` | ✅ |
| `src/notifications/feishu.test.ts` | Moved to `src/notifications/feishu/feishu.test.ts` | ✅ |
| `src/notifications/notify.test.ts` | Moved to `src/notifications/notify/notify.test.ts` | ✅ |
| `src/rollup/rollup.test.ts` | Split into 4 collocated tests in `src/rollup/` | ✅ |
| `src/save/report-savers.test.ts` | Split into 5 collocated tests in `src/save/` | ✅ |
| `src/github/api.test.ts` | Split into 5 individual tests in `src/github/` | ✅ |
| `src/github/issues.test.ts` | Split into individual tests in `src/github/` | ✅ |
| `src/utils/config.test.ts` | Split into multiple individual tests in `src/utils/` | ✅ |
| `src/utils/date.test.ts` | Split into individual tests in `src/utils/` | ✅ |
| `src/prompts/prompts-data.test.ts` | Split into 14 individual prompt tests in `src/prompts/` | ✅ |

**No remaining mislocated tests.** All test files are co-located with their corresponding source files.

### Coverage ⚠️

**~77% of source files have a co-located test** (117 tests for 151 source files, up from ~70%). All previously untested modules now have tests:

| Area | Tests added | Files |
|------|-------------|-------|
| Save wrappers | 4 files (12 tests) | `save-hugging-face-report`, `save-product-hunt-report`, `save-trending-report`, `save-web-report` |
| Extracted R#2 modules | 6 files (24 tests) | `report-label`, `get-report-content`, `get-webhook-urls`, `send-to-one-webhook`, `send-feishu`, `send-telegram` |
| Rollup helpers | 4 files (12 tests) | `get-date-dirs`, `read-daily-digest`, `read-weekly-digest`, `generate-rollup-highlights` |
| Constants + utils | 2 files (6 tests) | `rollup-constants`, `require-env` |

**Remaining gaps** (low-effort targets with real logic):
- `src/fetchers/fetch-github-trending.ts` — HTML scraping (needs HTTP mock)
- `src/fetchers/search-ai-repos.ts` — GitHub Search API (needs HTTP mock)
- `src/save/build-source-header.ts` — already tested indirectly via `save-data-source-report.test.ts`
- `src/prompts/repo-digest.ts` — may be simple

---

## Rule 5: Group Modules by Domain — ✅ PASS

**Resolved 2026-06-01.** All flat root files moved into domain subdirectories:

| File | Moved to |
|------|----------|
| `src/scheduler.ts` | `src/phases/scheduler.ts` |
| `src/scheduler.test.ts` | `src/phases/scheduler.test.ts` |
| `src/social.ts` | `src/notifications/social/main.ts` (deleted root) |
| `src/social.test.ts` | `src/notifications/social/main.test.ts` |
| `src/weekly.ts` | `src/rollup/weekly.ts` |
| `src/weekly.test.ts` | `src/rollup/weekly.test.ts` |
| `src/monthly.ts` | `src/rollup/monthly.ts` |
| `src/monthly.test.ts` | `src/rollup/monthly.test.ts` |
| `src/constants.ts` | `src/utils/constants.ts` |
| `src/constants.test.ts` | `src/utils/constants.test.ts` |

`src/index.ts` retained at root as orchestrator entry point.

**Additional fixes:** `.gitignore` had `social/` glob that was unintentionally ignoring `src/notifications/social/` — added `!src/notifications/social/` exception. Updated `package.json` scripts and all cross-references.

---

## Rule 6: Cliffy for CLI — ✅ PASS

All CLI scripts use `@cliffy/command`. Zero `process.argv` parsing, zero `useRawArgs()`.

---

## Rule 7: Dependency Injection via Parameters — ✅ PASS

All files use the standard DI pattern with `env: NodeJS.ProcessEnv = process.env` as an injectable parameter default — `process.env` is only accessed to set the default, never inside the function body. Previously flagged files are now compliant after refactoring.

---

## Rule 8: stderr for Diagnostics — ✅ PASS

Zero `console.log()` calls in production code. All diagnostics use `console.error`.

---

## Rule 9: Luxon for All Date/Time — ✅ PASS

Luxon `DateTime` used across 20+ files. Zero `new Date()` or `Date.now()` in production code.

---

## Rule 10: TDD — ⏭ N/A

Process rule — applies to new code going forward. Not auditable on existing codebase.

---

## Rule 11: Extension-free Imports — ✅ PASS

Zero violations — no `from "./*.ts"` or `/index` patterns found in `src/`.

---

## Rule 12: dotenvx for Env Loading — ✅ PASS

All 4 entry points (`src/index.ts`, `src/phases/scheduler.ts`, `src/rollup/weekly.ts`, `src/rollup/monthly.ts`) now have `dotenvx.config({ quiet: true })` as the first statement.

---

## Rule 13: Verbose Flag — ✅ PASS

All 5 CLI scripts implement `-V, --verbose` with `{ collect: true }`:
- `src/close-stale-issues/command.ts`
- `src/generate-manifest/command.ts`
- `src/notifications/notify/command.ts`
- `src/notifications/feishu/command.ts`
- `src/notifications/social/command.ts`

---

## Rule 14: Command/Action Separation — ✅ PASS

All 5 CLI directories (`close-stale-issues/`, `generate-manifest/`, `notifications/feishu/`, `notifications/notify/`, `notifications/social/`) use the correct `action.ts` + `command.ts` + `main.ts` pattern with `import.meta.main` guard. Action files were renamed from `{name}-action.ts` to `action.ts`. No `.useRawArgs()` anti-patterns found. No `parse-args.ts` files exist.

---

## Rule 15: Avoid Abbreviations — ✅ PASS

**Resolved 2026-06-01.** All abbreviated names replaced with full forms:

- **Fetcher files** renamed (14 files via `git mv`):
  - `hn.ts` → `hacker-news.ts`, `hf.ts` → `hugging-face.ts`, `ph.ts` → `product-hunt.ts`
  - `devto.ts` → `dev-to.ts`, `lobsters.ts` → `lobste-rs.ts`
  - `save-hn-report.ts` → `save-hacker-news-report.ts`
  - `save-hf-report.ts` → `save-hugging-face-report.ts`
  - `save-ph-report.ts` → `save-product-hunt-report.ts`

- **Functions/types** renamed (22+ occurrences across 31 files):
  - `HnStory`→`HackerNewsStory`, `HnData`→`HackerNewsData`, `fetchHnData`→`fetchHackerNewsData`
  - `HfModel`→`HuggingFaceModel`, `HfData`→`HuggingFaceData`, `fetchHfData`→`fetchHuggingFaceData`
  - `PhProduct`→`ProductHuntProduct`, `PhData`→`ProductHuntData`, `fetchPhData`→`fetchProductHuntData`
  - `DevtoArticle`→`DevToArticle`, `DevtoData`→`DevToData`, `fetchDevtoData`→`fetchDevToData`
  - `buildHnPrompt`→`buildHackerNewsPrompt`, `saveHnReport`→`saveHackerNewsReport`
  - `buildHfPrompt`→`buildHuggingFacePrompt`, `saveHfReport`→`saveHuggingFaceReport`
  - `buildPhPrompt`→`buildProductHuntPrompt`, `savePhReport`→`saveProductHuntReport`

All barrels, imports, mocks, and test references updated in sync. Verified via `tsc --noEmit` and targeted test runs.

---

## Overall Assessment

All immediate priorities from the initial audit have been resolved:
- **Rule 2** — All action.ts files have exactly one function each
- **Rollup tests** — Stale `vi.mock("./rollup-utils", ...)` removed, mocks wired to individual module paths
- **Coverage** — Pushed from ~70% to ~77% (117 tests / 151 source files)

### Remaining
- Coverage to 90% — remaining untested files are more complex (HTTP mocking needed) or already tested indirectly
- Pre-existing `rollup-utils.test.ts` still uses `as any` casts (2 lint warnings)
