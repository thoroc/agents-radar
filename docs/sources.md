# Tracked Sources

All sources are configurable via `config.yml` — no code changes needed.

## AI CLI tools (GitHub)

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

## Claude Code Skills (GitHub)

| Source | Repository |
|--------|-----------|
| Claude Code Skills | [anthropics/skills](https://github.com/anthropics/skills) |

PRs and issues are fetched without a date filter and sorted by popularity (comment count), so the report always reflects the most actively discussed skills — not just the newest.

## OpenClaw + AI agent ecosystem (GitHub)

OpenClaw is tracked as the primary reference project, alongside peer projects in the personal AI assistant / autonomous agent space for cross-ecosystem comparison.

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

## GitHub AI Trending

Two data sources are fetched in parallel every day:

| Source | Details |
|--------|---------|
| [github.com/trending](https://github.com/trending?since=daily) | Today's trending repos — parsed from HTML; includes today's new star count |
| GitHub Search API | Repos active in the last 7 days matching 6 AI topics: `llm`, `ai-agent`, `rag`, `vector-database`, `large-language-model`, `machine-learning` |

The LLM filters out non-AI repos from the trending list, classifies the rest by dimension (AI infrastructure / agents / applications / models / RAG), and extracts trend signals.

## Hacker News

Top AI stories from the last 24 hours, fetched via the [Algolia HN Search API](https://hn.algolia.com/api). Six queries run in parallel (`AI`, `LLM`, `Claude`, `OpenAI`, `Anthropic`, `machine learning`), results are deduplicated and ranked by points. The top 30 stories are passed to the LLM for analysis.

## Official web content (sitemap-based)

| Organisation | Site | Tracked sections |
|---|---|---|
| Anthropic | [anthropic.com](https://www.anthropic.com) | `/news/`, `/research/`, `/engineering/`, `/learn/` |
| OpenAI | [openai.com](https://openai.com) | research, publication, release, company, engineering, milestone, learn-guides, safety, product |

New articles are detected by comparing sitemap `lastmod` timestamps against a persisted state file (`digests/web-state.json`). On the **first run**, up to 25 recent articles per site are fetched and a comprehensive overview report is generated. On subsequent runs, only new or updated URLs trigger a report; if nothing changed, the web report step is skipped entirely.

## Other sources

| Source | API | Data |
|--------|-----|------|
| [ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | Latest papers from cs.AI, cs.CL, cs.LG (last 48h) |
| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 trending models sorted by weekly likes |
| [Product Hunt](https://www.producthunt.com) | GraphQL API | Yesterday's top AI products by votes |
| [Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | Top AI/LLM articles from 5 tags |
| [Lobste.rs](https://lobste.rs) | JSON API | AI/ML tagged stories from last 7 days |
