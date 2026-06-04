# Output Format

Files are written to `digests/YYYY-MM-DD/`. For each report type, the pipeline generates one file per enabled language.

## Report types

| File pattern | Content | GitHub Issue label |
|------|---------|-------------------|
| `ai-cli.{locale}.md` | CLI digest — cross-tool comparison + per-tool details | `digest.{locale}` |
| `ai-agents.{locale}.md` | OpenClaw deep report + cross-ecosystem comparison + peer details | `openclaw.{locale}` |
| `ai-web.{locale}.md` | Official web content report (only written when new content exists) | `web.{locale}` |
| `ai-trending.{locale}.md` | GitHub AI trending report — repos classified by dimension + trend signals | `trending.{locale}` |
| `ai-hn.{locale}.md` | Hacker News AI community digest — top stories + sentiment analysis | `hn.{locale}` |
| `ai-ph.{locale}.md` | Product Hunt AI products digest | `ph.{locale}` |
| `ai-arxiv.{locale}.md` | ArXiv AI research digest — key papers from cs.AI/cs.CL/cs.LG | `arxiv.{locale}` |
| `ai-hf.{locale}.md` | Hugging Face trending models digest — sorted by weekly likes | `hf.{locale}` |
| `ai-community.{locale}.md` | Tech community AI digest — Dev.to articles + Lobste.rs stories combined | `community.{locale}` |
| `ai-weekly.{locale}.md` | Weekly rollup — generated every Monday | `weekly.{locale}` |
| `ai-monthly.{locale}.md` | Monthly rollup — generated on the 1st of each month | `monthly.{locale}` |

`{locale}` is empty for the primary language (default: `en-US`, e.g. `ai-cli.md`) and the BCP-47 tag for all others (e.g. `ai-cli.zh-CN.md`). The primary language is set via `defaultPrimaryLanguage` in `config.yml`.

A shared state file `digests/web-state.json` tracks which web URLs have been seen; it is committed alongside the daily digests.

Historical digests are stored in [`digests/`](../digests/). Published issues are tagged by type: [`digest`](../../issues?label=digest) · [`openclaw`](../../issues?label=openclaw) · [`web`](../../issues?label=web) · [`trending`](../../issues?label=trending) · [`hn`](../../issues?label=hn) · [`ph`](../../issues?label=ph) · [`arxiv`](../../issues?label=arxiv) · [`hf`](../../issues?label=hf) · [`community`](../../issues?label=community) · [`weekly`](../../issues?label=weekly) · [`monthly`](../../issues?label=monthly).

## Report structures

### `ai-cli.md`

```text
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
```text

### `ai-agents.md`

```text
Issues: N | PRs: N | Projects covered: 10

## OpenClaw Deep Dive
  Today's summary / Releases / Project progress / Community highlights /
  Bug stability / Feature requests / User feedback / Backlog

## Cross-Ecosystem Comparison
  Ecosystem overview / Activity table / OpenClaw positioning /
  Shared technical directions / Differentiation / Community maturity / Trend signals

## Peer Project Reports
  <details> ZeroClaw    — Today's summary / Releases / Progress / ... (8 sections)
  <details> EasyClaw    — ...
  <details> LobsterAI   — ...
  <details> ZeptoClaw   — ...
  <details> NanoBot     — ...
  <details> Hermes Agent — ...
  <details> PicoClaw    — ...
  <details> NanoClaw    — ...
  <details> IronClaw    — ...
  <details> TinyClaw    — ...
  <details> CoPaw       — ...
```text

### `ai-web.md`

```text
Sources: anthropic.com (N articles) + openai.com (N articles)

Today's summary
Anthropic / Claude highlights  (news / research / engineering / learn)
OpenAI highlights              (research / release / company / safety / ...)
Strategic signals
Notable details
[First full crawl also includes: Content landscape overview]
```text

### `ai-trending.md`

```text
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
```text

### `ai-hn.md`

```text
Sources: Hacker News (top-30 AI stories, last 24h)

Today's summary
Top stories & discussions
  🔬 Models & Research  — new model releases / papers / benchmarks
  🛠️ Tools & Engineering — open-source projects / frameworks / engineering practice
  🏢 Industry news      — company news / funding / product launches
  💬 Opinions & debate  — Ask HN / Show HN / hot threads
Community sentiment signals
Worth reading
```text

### `ai-weekly.md`

```text
Coverage: YYYY-MM-DD ~ YYYY-MM-DD  (last 7 daily digests)

Weekly highlights
Key trends & developments
Notable releases
Community momentum
Outlook
```text

### `ai-monthly.md`

```text
Sources: N weekly reports  (or sampled daily reports if fewer than 2 weeklies available)

Month in review
Major themes
Ecosystem shifts
Top projects & releases
Looking ahead
```text
