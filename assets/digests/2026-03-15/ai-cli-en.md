# AI CLI Tools Community Digest 2026-03-15

> Generated: 2026-03-15 00:10 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# Cross-Tool AI CLI Ecosystem Report — 2026-03-15

## 1. Ecosystem Overview

The AI CLI tools landscape has matured from experimental prototypes to production-critical infrastructure, with all major players now grappling with enterprise-scale concerns: session lifecycle management, cost predictability, and cross-platform reliability. The field has bifurcated between **model-integrated tools** (Claude Code, Codex, Gemini CLI, Copilot CLI) backed by frontier labs and **model-agnostic tools** (OpenCode, Kimi CLI, Qwen Code) emphasizing flexibility and local-first workflows. Community velocity remains high across all projects, though pain points have shifted from "does it work?" to "can I trust it in production?"—reflecting broader industry maturation from demo-driven to reliability-driven development.

---

## 2. Activity Comparison

| Tool | Issues (24h) | PRs (24h) | Releases (24h) | Release Status |
|------|-------------|-----------|----------------|----------------|
| **Claude Code** | 50 active | 5 | v2.1.76 | ✅ Stable, MCP-focused |
| **OpenAI Codex** | ~15 tracked | 10 | 3 alphas (v0.115.0-alpha.22–24) | 🔧 Rust rewrite in progress |
| **Gemini CLI** | 50 | 50 | v0.35.0-nightly (changelog sync) | 🔧 Nightly cadence |
| **GitHub Copilot CLI** | 20 | 0 | None | ⚠️ Maintenance mode signals |
| **Kimi CLI** | 6 | 4 | None (v1.22.0 stable) | ⚠️ Low velocity |
| **OpenCode** | ~10 tracked | 10 | None | ✅ Active development |
| **Qwen Code** | 34 | 17 | v0.12.3-nightly | 🔧 Rapid iteration |

*Sources: Community digests compiled 2026-03-15*

---

## 3. Shared Feature Directions

| Requirement | Tools | Specific Needs |
|-------------|-------|--------------|
| **Session Lifecycle Management** | Claude Code [#13514], OpenCode [#2159, #14602], Codex [#12450, #14713] | Delete sessions, chat trees/branching, portable history, session count efficiency |
| **Performance Observability** | Gemini CLI [#22483, #22485], Claude Code [#16021], OpenCode [#17482] | Token/cost transparency, memory dashboards, compression metrics |
| **Timeout/Reliability Configurability** | Kimi CLI [#625], OpenCode [#17307, #17318], Codex [#14346] | Task-specific timeouts, local model tuning, compaction control |
| **MCP Ecosystem Maturity** | Claude Code [v2.1.76], Copilot CLI [#288, #2036, #2037], Gemini CLI [#22484] | Repo-scoped configs, OAuth deduplication, security granularity |
| **Cross-Platform Terminal Stability** | Claude Code [#826, #769], Kimi CLI [#1437, #1436, #1434], OpenCode [#5361, #17458] | TUI rendering, keycode handling, Windows async I/O |
| **Subagent/Agent Orchestration** | Codex [#14671, #13678, #13679], Claude Code [#13898], Qwen Code [#1912, #2203] | Config propagation, runtime monitoring, worktree isolation |
| **Model Heterogeneity** | Codex [#13825, #2032], Copilot CLI [#2032, #2041], Qwen Code [#2376, #2356] | Per-task model selection, custom aliases, multi-model arbitration |

---

## 4. Differentiation Analysis

| Dimension | Claude Code | OpenAI Codex | Gemini CLI | Copilot CLI | Kimi CLI | OpenCode | Qwen Code |
|-----------|-------------|--------------|------------|-------------|----------|----------|-----------|
| **Core Identity** | Anthropic model integration; "agentic pair programmer" | OpenAI model stack; unified TUI/app-server architecture | Google model integration; Plan mode + ACP focus | GitHub ecosystem integration; enterprise policy alignment | Moonshot API wrapper; cross-platform parity | Model-agnostic IDE; local-first flexibility | Alibaba Qwen models; skills ecosystem + multi-model |
| **Technical Approach** | TypeScript/Node; MCP-native from inception | Rust rewrite for performance; RPC-layer unification | TypeScript; Ink-based TUI; bubblewrap sandboxing | TypeScript; tight GitHub/Copilot API coupling | Python; asyncio; ACP terminal API | TypeScript; VS Code extension parity; plugin architecture | TypeScript; skills YAML; git worktree experiments |
| **Target User** | Individual developers, small teams | Enterprise scale, multi-device workflows | Google Cloud ecosystem, ACP adopters | GitHub Enterprise, policy-constrained orgs | China market, API consumers | Local model enthusiasts, cost-sensitive teams | Qwen model users, multi-model quality assurance |
| **Key Differentiator** | MCP elicitation (v2.1.76); session management PRs | Subagent runtime TUI; watchdog patterns; custom model aliases | Debug Companion competition; `/perf` dashboard; Plan mode | Native GitHub integration; enterprise policy handling | Rapid macOS/Windows parity fixes | Vim motions, Ctrl+R search; mobile UX; i18n | Built-in skills (`/review`); multi-model arena; 10 event hooks |
| **Current Risk** | TUI rendering debt; context inflation | Token billing opacity; alpha instability | Plan mode reliability crisis; model-specific hangs | Velocity stall; no releases; UI flicker unaddressed | Low community momentum; timeout rigidity | Copilot billing bug; macOS kernel panics; resource leaks | Tool sequencing P0 bugs; VS Code race conditions |

---

## 5. Community Momentum & Maturity

| Tier | Tools | Indicators |
|------|-------|------------|
| **🔥 Highest Velocity** | Qwen Code, Gemini CLI, OpenCode | 17 PRs/34 issues (Qwen), 50 PRs/50 issues (Gemini), 10 PRs with feature shipping (OpenCode) |
| **📈 Active Iteration** | Claude Code, OpenAI Codex | Regular releases, architectural refactors (Codex Rust, Claude MCP), high comment engagement |
| **⚠️ Concerning Stagnation** | GitHub Copilot CLI, Kimi CLI | Zero PRs (Copilot), 4 PRs with narrow scope (Kimi); maintenance-mode signals |

**Maturity Signals:**
- **Production-ready reliability**: Claude Code (session management PRs), OpenCode (resource hardening needed)
- **Architectural experimentation**: Codex (TUI/app-server unification), Qwen Code (skills extensibility, arena)
- **Enterprise policy integration**: Copilot CLI (unique but stalled), Gemini CLI (ACP focus)

---

## 6. Trend Signals

| Industry Trend | Evidence | Developer Value |
|--------------|----------|---------------|
| **Cost predictability as first-class concern** | Codex token burn [#14593], OpenCode Copilot misclassification [#8030], Claude Code silent context inflation [#16021] | Demand for real-time spend dashboards, per-task budgets, provider-agnostic cost controls |
| **Agent observability > agent capability** | Gemini `/perf` [#22485], Codex subagent TUI panel [#13679], Claude Code agent-status plugin [#34251], Qwen event hooks [#2203] | Shift from "can it run?" to "can I debug it?"—production deployment requires introspection |
| **Terminal-native UX as competitive moat** | OpenCode Vim motions [#12679] + Ctrl+R [#17525], Claude Code TUI instability as critical blocker [#826] | Developers investing in CLI ergonomics comparable to IDE comfort; rendering stability is table stakes |
| **Model-agnostic tooling accelerating** | OpenCode multi-provider, Qwen auto-detect `max_tokens` [#2356], Codex custom aliases [#13825] | Vendor lock-in resistance; teams optimizing cost/quality via model routing |
| **Sandboxing as security primitive** | Gemini bubblewrap [#22399], Claude Code sensitive-file-guard [#34257], Codex guardian session caching [#14668] | Enterprise adoption requires hardened execution; zero-dependency isolation preferred |
| **Skills/MCP as extensibility layer** | Qwen skills ecosystem [#2348, #2380], Claude Code MCP elicitation, Copilot CLI MCP config [#288] | Community-contribuable capabilities replacing hardcoded agent behaviors |

---

*Report compiled from 7 community digests covering 190+ issues, 96+ PRs, and 5 releases. Data current as of 2026-03-15.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of 2026-03-15 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking (Most-Discussed PRs)

| Rank | Skill | Status | Description | Discussion Highlights |
|:---|:---|:---|:---|:---|
| 1 | **[document-typography](https://github.com/anthropics/skills/pull/514)** | 🔵 OPEN | Typographic quality control for AI-generated documents—prevents orphans, widows, and numbering misalignment | Addresses universal pain point; "affects every document Claude generates" |
| 2 | **[skill-quality-analyzer + skill-security-analyzer](https://github.com/anthropics/skills/pull/83)** | 🔵 OPEN | Meta-skills for evaluating Skill quality across 5 dimensions and security posture | Long-running PR; positions Skills ecosystem for self-improvement |
| 3 | **[frontend-design](https://github.com/anthropics/skills/pull/210)** | 🔵 OPEN | Revised guidance for actionable, single-conversation frontend design workflows | Focus on "clarity, actionability, and internal coherence" |
| 4 | **[system documentation & flowcharts](https://github.com/anthropics/skills/pull/95)** | 🔵 OPEN | Comprehensive evidence management system docs with architecture diagrams | Enterprise documentation pattern |
| 5 | **[shodh-memory](https://github.com/anthropics/skills/pull/154)** | 🔵 OPEN | Persistent memory system for AI agents with proactive context surfacing | Addresses core limitation: cross-conversation context |
| 6 | **[ODT skill](https://github.com/anthropics/skills/pull/486)** | 🔵 OPEN | OpenDocument creation, template filling, and ODT→HTML parsing | ISO standard format support for LibreOffice/enterprise workflows |
| 7 | **[masonry-generate-image-and-videos](https://github.com/anthropics/skills/pull/335)** | 🔵 OPEN | AI-powered image (Imagen 3.0) and video (Veo 3.1) generation via Masonry CLI | Multimedia generation pipeline |
| 8 | **[SAP-RPT-1-OSS predictor](https://github.com/anthropics/skills/pull/181)** | 🔵 OPEN | SAP's open-source tabular foundation model for predictive analytics on SAP data | Enterprise ERP integration; Apache 2.0 model |

---

## 2. Community Demand Trends (From Issues)

| Trend | Evidence | Implication |
|:---|:---|:---|
| **Agent Governance & Safety** | [#412](https://github.com/anthropics/skills/issues/412) "agent-governance — safety patterns for AI agent systems" (4 comments, now closed) | Growing demand for production-grade AI safety controls |
| **MCP Integration** | [#16](https://github.com/anthropics/skills/issues/16) "Expose Skills as MCPs" (4 comments) | Community wants Skills ↔ Model Context Protocol bridge |
| **Enterprise Auth & Deployment** | [#29](https://github.com/anthropics/skills/issues/29) Bedrock support; [#532](https://github.com/anthropics/skills/issues/532) SSO/API key friction | Skills must work in locked-down enterprise environments |
| **Trust & Security Boundaries** | [#492](https://github.com/anthropics/skills/issues/492) "Community skills distributed under anthropic/ namespace enable trust boundary abuse" (3 comments, 👍2) | Namespace verification urgently needed |
| **Reliability & Debugging** | [#556](https://github.com/anthropics/skills/issues/556) 0% skill trigger rate in evals; [#62](https://github.com/anthropics/skills/issues/62) skills disappearing | Core infrastructure stability concerns |

---

## 3. High-Potential Pending Skills

These active PRs show strong engagement and clear utility—likely candidates for merge:

| Skill | PR | Why It Matters |
|:---|:---|:---|
| **document-typography** | [#514](https://github.com/anthropics/skills/pull/514) | Solves universal output quality problem; zero dependencies |
| **skill-quality-analyzer** | [#83](https://github.com/anthropics/skills/pull/83) | Enables self-regulating Skills ecosystem |
| **shodh-memory** | [#154](https://github.com/anthropics/skills/pull/154) | Fills critical gap in persistent agent context |
| **ODT skill** | [#486](https://github.com/anthropics/skills/pull/486) | Enterprise document interoperability (ISO standard) |
| **x402 BSV micropayments** | [#374](https://github.com/anthropics/skills/pull/374) | Novel economic layer for AI service discovery/payment |

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is for production-hardened infrastructure: persistent memory, deterministic output quality, enterprise security boundaries, and governance controls—shifting focus from "what Skills can do" to "how Skills can be trusted at scale."**

---

---

# Claude Code Community Digest — 2026-03-15

---

## 1. Today's Highlights

Anthropics shipped **v2.1.76** with significant MCP enhancements, including interactive elicitation support that allows MCP servers to request structured input mid-task. The community continues to grapple with persistent TUI rendering issues on macOS and Windows, while session management and sensitive file protection emerge as major themes in community contributions.

---

## 2. Releases

### [v2.1.76](https://github.com/anthropics/claude-code/releases/tag/v2.1.76)
- **MCP Elicitation Support**: MCP servers can now request structured input mid-task via interactive dialogs (form fields or browser URLs)
- **New Hooks**: Added `Elicitation` and `ElicitationResult` hooks for intercepting and overriding responses before transmission
- **CLI Enhancement**: Added `-n` / `--name` flag (description truncated in source)

---

## 3. Hot Issues

| Issue | Why It Matters | Community Reaction |
|-------|--------------|-------------------|
| [#826](https://github.com/anthropics/claude-code/issues/826) Console scrolling resets to top of history — **324 comments, 586 👍** | Critical UX regression affecting every macOS user; breaks workflow continuity | Extremely high engagement; users reporting daily friction |
| [#769](https://github.com/anthropics/claude-code/issues/769) In-progress calls cause screen flickering — **291 comments, 281 👍** | Photosensitivity concern; flickering occurs 2-3×/second on Windows/Ubuntu | Long-running issue with cross-platform impact |
| [#27302](https://github.com/anthropics/claude-code/issues/27302) Multiple Connector accounts support — **46 comments, 50 👍** | Enterprise blocker: users need separate Google/GitHub accounts for work/personal | Strong demand from multi-tenant workflows |
| [#28951](https://github.com/anthropics/claude-code/issues/28951) Remote control unsupported in VS Code extension — **41 comments, 24 👍** | Feature parity gap between CLI and IDE extension limits mobile/browser workflows | VS Code users feel second-class |
| [#2990](https://github.com/anthropics/claude-code/issues/2990) Automatic light/dark theme selection — **32 comments, 174 👍** | System integration expectation; manual switching causes unreadable output | High 👍/comment ratio = broad appeal, low controversy |
| [#34229](https://github.com/anthropics/claude-code/issues/34229) Phone verification issues — **30 comments, 51 👍** | Account access blocker; marked `invalid` but high engagement suggests docs/UX problem | Support-related friction |
| [#13514](https://github.com/anthropics/claude-code/issues/13514) Delete Claude Code sessions — **30 comments, 49 👍** | Privacy/compliance requirement; session accumulation is unbounded | Long-standing request with security implications |
| [#23472](https://github.com/anthropics/claude-code/issues/23472) Opus 4.6 [1m] context "not available" on Max subscription — **28 comments, 15 👍** | Paying customers blocked from advertised features; billing trust issue | Subscription-tier confusion |
| [#16021](https://github.com/anthropics/claude-code/issues/16021) Modified file notes injected into every message — **24 comments** | Silent context bloat causing cost/performance degradation; `<system-reminder>` spam | Developer discovered via token inspection |
| [#13898](https://github.com/anthropics/claude-code/issues/13898) Custom subagents cannot access project-scoped MCP servers — **13 comments, 8 👍** | Agent architecture limitation; subagents hallucinate instead of calling tools | MCP ecosystem maturity issue |

---

## 4. Key PR Progress

| PR | Feature/Fix | Significance |
|----|-------------|------------|
| [#34168](https://github.com/anthropics/claude-code/pull/34168) Sessions plugin: `/sessions:list` and `/sessions:delete` | Directly addresses [#13514](https://github.com/anthropics/claude-code/issues/13514); project-scoped by default, `--all` flag for global cleanup | Most-requested session management feature |
| [#34257](https://github.com/anthropics/claude-code/pull/34257) Sensitive-file-guard plugin | Protects `.env`, infrastructure configs from accidental overwrites via `PreToolUse` hook | Safety-critical for production workflows |
| [#34286](https://github.com/anthropics/claude-code/pull/34286) Harden sensitive-file-guard confirmation flow | Structured risk levels (deny/ask/allow), allowlist after success only, failure state cleanup | Defense-in-depth for file operations |
| [#34251](https://github.com/anthropics/claude-code/pull/34251) Agent-status plugin for subagent monitoring | Audits subagent status and last message; addresses silent subagent failures | Observability gap in agent orchestration |
| [#34399](https://github.com/anthropics/claude-code/pull/34399) Claude/AI fitness optimization | Details unclear from summary; appears to be performance-related | Requires maintainer review |

---

## 5. Feature Request Trends

**Session Lifecycle Management** — Unbounded session accumulation and inability to delete sessions ([13514](https://github.com/anthropics/claude-code/issues/13514)) drives demand for granular control. Community PR [#34168](https://github.com/anthropics/claude-code/pull/34168) responds directly.

**Multi-Account/Connector Flexibility** — Enterprise users need same-connector, different-account support ([27302](https://github.com/anthropics/claude-code/issues/27302)) for work/personal boundaries.

**TUI/UX Polish** — System theme integration ([2990](https://github.com/anthropics/claude-code/issues/2990)), banner disable ([2254](https://github.com/anthropics/claude-code/issues/2254)), and terminal scrolling stability ([826](https://github.com/anthropics/claude-code/issues/826)) dominate quality-of-life requests.

**Safety & Guardrails** — Sensitive file protection ([34257](https://github.com/anthropics/claude-code/pull/34257), [34286](https://github.com/anthropics/claude-code/pull/34286)) and permission flow improvements ([34484](https://github.com/anthropics/claude-code/issues/34484)) reflect production-deployment maturity needs.

---

## 6. Developer Pain Points

| Pain Point | Evidence | Impact |
|------------|----------|--------|
| **TUI Rendering Instability** | [#826](https://github.com/anthropics/claude-code/issues/826), [#769](https://github.com/anthropics/claude-code/issues/769), [#18084](https://github.com/anthropics/claude-code/issues/18084) | Daily workflow disruption; accessibility concerns |
| **Silent Context/Cost Inflation** | [#16021](https://github.com/anthropics/claude-code/issues/16021), [#24147](https://github.com/anthropics/claude-code/issues/24147), [#27599](https://github.com/anthropics/claude-code/issues/27599) | Unexpected API costs; performance degradation |
| **MCP/Agent Architecture Gaps** | [#13898](https://github.com/anthropics/claude-code/issues/13898), [#25200](https://github.com/anthropics/claude-code/issues/25200) | Subagent reliability; tool access scoping |
| **Cross-Platform Parity** | [#28951](https://github.com/anthropics/claude-code/issues/28951), [#27791](https://github.com/anthropics/claude-code/issues/27791), [#32450](https://github.com/anthropics/claude-code/issues/32450) | VS Code and Windows users experience degraded functionality |
| **Subscription/Access Confusion** | [#23472](https://github.com/anthropics/claude-code/issues/23472), [#30854](https://github.com/anthropics/claude-code/issues/30854) | Paying customers blocked from advertised capabilities |

---

*Digest compiled from 50 active issues, 5 PRs, and 1 release in the 24-hour period ending 2026-03-15.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-03-15

---

## 1. Today's Highlights

The Codex team is actively shipping Rust CLI alphas (v0.115.0-alpha.22–24) while major architectural work lands to unify the TUI and app-server infrastructure. Community frustration remains elevated around token burn rates, context compaction failures, and persistent gaps in Windows/WSL support—issues drawing 100+ comment threads and urgent demand for production stability.

---

## 2. Releases

| Version | Notes |
|---------|-------|
| [rust-v0.115.0-alpha.24](https://github.com/openai/codex/releases/tag/rust-v0.115.0-alpha.24) | Rapid-fire alpha cadence continues; no detailed changelogs provided. Pattern suggests iterative sandbox and CLI hardening. |
| [rust-v0.115.0-alpha.23](https://github.com/openai/codex/releases/tag/rust-v0.115.0-alpha.23) | — |
| [rust-v0.115.0-alpha.22](https://github.com/openai/codex/releases/tag/rust-v0.115.0-alpha.22) | — |

---

## 3. Hot Issues

| # | Issue | Why It Matters | Community Reaction |
|---|-------|--------------|------------------|
| [#10410](https://github.com/openai/codex/issues/10410) | **macOS Intel (x86_64) support** | Blocks enterprise adoption on legacy Mac fleets. 163 👍, 121 comments. | Intense demand; users report being forced to Rosetta-emulate or abandon Codex. |
| [#14593](https://github.com/openai/codex/issues/14593) | **Token burn rate regression in VS Code extension** | Business-tier users seeing 2–3x expected consumption post-update. 37 comments, 19 👍. | Urgent; "Am I the only one?" framing signals alarm. |
| [#10384](https://github.com/openai/codex/issues/10384) | **`request_user_input` in code mode** | Closed—enables interactive agent workflows without full-agent mode. 99 👍. | Celebrated as flexibility win; closes long-standing gap. |
| [#14331](https://github.com/openai/codex/issues/14331) | **GPT-5.3-Codex unavailable on paid accounts** | Auth/tier gating bug blocking Plus users. | Rapidly closed; indicates backend config drift. |
| [#12661](https://github.com/openai/codex/issues/12661) | **Markdown `file://` links open in browser (Windows)** | Breaks internal documentation workflows. 25 👍. | Frustration with Windows-native behavior gaps. |
| [#14346](https://github.com/openai/codex/issues/14346) | **Context compaction hanging** | "Extra High" context users deadlocked at <16% compaction. 13 👍. | Critical reliability issue for long sessions. |
| [#14681](https://github.com/openai/codex/issues/14681) | **Double token drain on `/review`** | `/review` task consuming 2x expected quota. | Closed quickly—suggests hotfix deployed. |
| [#13864](https://github.com/openai/codex/issues/13864) | **gpt-5.4 responds to stale messages** | Model hallucinating earlier context, ignoring latest prompt. | Quality regression concern for agent reliability. |
| [#14671](https://github.com/openai/codex/issues/14671) | **Subagent config ignored** | Custom model/reasoning settings not propagating to child agents. | Blocks sophisticated multi-agent orchestration. |
| [#14694](https://github.com/openai/codex/issues/14694) | **`apply_patch` fails with symlinked `~/.codex`** | Sandbox path resolution breaks dotfile management patterns. | Niche but breaking for power users with partitioned setups. |

---

## 4. Key PR Progress

| # | PR | Description | Impact |
|---|-----|-------------|--------|
| [#14710](https://github.com/openai/codex/pull/14710) | **Move TUI on top of app server (in-place)** | Migrates TUI from direct-core to app-server RPC layer. | Foundation for unified client architecture; enables server-pushed events. |
| [#14717](https://github.com/openai/codex/pull/14717) | **Move TUI on top of app server (parallel)** | Feature-flagged parallel implementation for safe rollout. | Risk mitigation for TUI refactor; allows A/B validation. |
| [#14699](https://github.com/openai/codex/pull/14699) | **Route fresh-session lifecycle through app-server** | Eliminates DirectCore transport for new sessions. | Prerequisites for skills-changed notifications and `$` prompt completions. |
| [#14711](https://github.com/openai/codex/pull/14711) | **Route resume/fork through app-server** | Completes [#14699](https://github.com/openai/codex/pull/14699) by covering resume and fork paths. | Full session lifecycle now server-mediated; unifies mobile/desktop/CLI state. |
| [#14668](https://github.com/openai/codex/pull/14668) | **Reuse guardian session across approvals** | Caches guardian subagent to preserve prompt cache keys and reduce startup overhead. | Latency win for high-frequency approval workflows. |
| [#13678](https://github.com/openai/codex/pull/13678) | **Watchdog runtime and prompts** | Adds watchdog agent lifecycle + model overrides. | Enables supervisor-pattern multi-agent topologies. |
| [#13679](https://github.com/openai/codex/pull/13679) | **Subagent runtime TUI panel** | Live subagent monitoring pinned outside transcript history. | Critical UX for debugging agent swarms. |
| [#14615](https://github.com/openai/codex/pull/14615) | **Skills loading onto app-server** | Deduplicates skills API between TUI and other clients. | Reduces tech debt; unifies `$` prompt behavior. |
| [#13825](https://github.com/openai/codex/pull/13825) | **Custom model aliases in config.toml** | User-defined aliases with context window overrides. | Power-user flexibility; org-specific model routing. |
| [#14602](https://github.com/openai/codex/pull/14602) | **Preserve background terminals on interrupt; rename cleanup to `/stop`** | Ctrl+C no longer kills dev servers; explicit `/stop` command. | UX polish for long-running local workflows. |

---

## 5. Feature Request Trends

| Theme | Evidence | Momentum |
|-------|----------|----------|
| **Session management & chat trees** | [#12450](https://github.com/openai/codex/issues/12450) (chat tree/branching), [#6500](https://github.com/openai/codex/issues/6500) (tmux-like sessions), [#14713](https://github.com/openai/codex/issues/14713) (safe delete flows) | High—users want Claude-like conversation archaeology |
| **Cross-device session sync** | [#14722](https://github.com/openai/codex/issues/14722) (CLI/app sync), [#14721](https://github.com/openai/codex/issues/14721) (remote control/teleport) | Emerging—competitive response to Claude's mobile control |
| **Configurable TUI/UX** | [#3049](https://github.com/openai/codex/issues/3049) (hotkeys), [#4550](https://github.com/openai/codex/issues/4550) (disable folding/truncation) | Steady—power users rejecting opinionated defaults |
| **Custom compaction hooks** | [#11912](https://github.com/openai/codex/issues/11912) | Niche but deep—enterprise context engineering needs |
| **Multi-root workspace support** | [#2909](https://github.com/openai/codex/issues/2909) | Stagnant at 77 👍—monorepo users blocked |

---

## 6. Developer Pain Points

| Category | Symptoms | Severity |
|----------|----------|----------|
| **Token economics opacity** | [#14593](https://github.com/openai/codex/issues/14593), [#14681](https://github.com/openai/codex/issues/14681) | 🔴 Critical—paid users losing trust in billing |
| **Context compaction reliability** | [#14346](https://github.com/openai/codex/issues/14346), [#14425](https://github.com/openai/codex/issues/14425) | 🔴 Critical—long sessions unusable |
| **Windows/WSL second-class citizenship** | [#12661](https://github.com/openai/codex/issues/12661), [#13618](https://github.com/openai/codex/issues/13618), [#13755](https://github.com/openai/codex/issues/13755), [#14230](https://github.com/openai/codex/issues/14230), [#14182](https://github.com/openai/codex/issues/14182), [#14703](https://github.com/openai/codex/issues/14703) | 🟡 High—path handling, encoding, worktree detection all flaky |
| **Sandbox edge cases** | [#14694](https://github.com/openai/codex/issues/14694), [#13635](https://github.com/openai/codex/issues/13635) | 🟡 High—symlinks, permissions break core workflows |
| **Model routing/tier gating bugs** | [#14331](https://github.com/openai/codex/issues/14331) | 🟡 High—paid access intermittently denied |
| **Subagent observability** | [#14671](https://github.com/openai/codex/issues/14671) | 🟢 Moderate—advanced users hitting orchestration limits |

---

*Digest compiled from github.com/openai/codex activity 2026-03-14.*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-03-15

---

## 1. Today's Highlights

The Gemini CLI team shipped **v0.35.0-nightly.20260314**, a routine changelog update, while community momentum surged around **performance observability** and **debugging infrastructure**. Notably, two competing implementations of a **Debug Companion** subsystem landed simultaneously, alongside a new `/perf` performance dashboard—signaling strong community interest in production-grade tooling. Meanwhile, critical stability issues around **context loss in Plan mode** and **infinite hangs with gemini-3.1-pro-preview** are drawing urgent maintainer attention.

---

## 2. Releases

| Version | Date | Summary |
|---------|------|---------|
| [v0.35.0-nightly.20260314.3038fdce2](https://github.com/google-gemini/gemini-cli/releases/tag/v0.35.0-nightly.20260314.3038fdce2) | 2026-03-14 | Changelog synchronization for v0.33.1; no functional changes. |

---

## 3. Hot Issues

| Issue | Why It Matters | Community Signal |
|-------|--------------|----------------|
| [#22266](https://github.com/google-gemini/gemini-cli/issues/22266) — Agent silently drops context ("ghosts") after `/plan` approval | **Critical workflow breakage**: Plan mode is unusable for complex tasks if approved plans evaporate. 6 comments indicate rapid triage. | 🔴 High urgency; maintainer-tagged `workstream-rollup` |
| [#22415](https://github.com/google-gemini/gemini-cli/issues/22415) — CLI hangs indefinitely with gemini-3.1-pro-preview | Blocks adoption of latest model; retry-loop behavior suggests systemic streaming/reliability issues. | 4 comments; `need-triage` status |
| [#21925](https://github.com/google-gemini/gemini-cli/issues/21925) — False "action required" hand icon on long shell scripts | UX friction erodes trust in agent state indicators; affects daily interactive use. | 5 comments; `help wanted` |
| [#22458](https://github.com/google-gemini/gemini-cli/issues/22458) — Complete unresponsiveness in interactive mode | Total failure state with no error surfacing—worst-case user experience. | 4 comments; fresh report |
| [#22028](https://github.com/google-gemini/gemini-cli/issues/22028) — Terminal scrolls to top on any click (VS Code) | Breaks flow in primary IDE environment; video evidence attached. | 3 comments; +1 upvote |
| [#22307](https://github.com/google-gemini/gemini-cli/issues/22307) — Plan mode shows stale previous plan | Data consistency bug undermines Plan mode reliability; history pollution suspected. | 2 comments; bug report JSON attached |
| [#21792](https://github.com/google-gemini/gemini-cli/issues/21792) — Epic: Session Continuity and Coherence | **Strategic roadmap item**; aggregates context degradation, compression, and long-session failures. | 2 comments; maintainer-authored |
| [#22483](https://github.com/google-gemini/gemini-cli/issues/22483) — Feature: `/perf` performance monitoring dashboard | Community-driven observability request; aligns with production readiness needs. | 2 comments; PR already filed (#22485) |
| [#22191](https://github.com/google-gemini/gemini-cli/issues/22191) — Plan Mode broken under ACP | Enterprise/IDE integration blocker; file permission loop breaks automation workflows. | 0 comments but +1 upvote; high severity |
| [#22464](https://github.com/google-gemini/gemini-cli/issues/22464) — Epic: Paper cuts and misbehaviors | **Catch-all for agent reliability**; maintainer consolidating behavioral debt. | Fresh; expect rapid child issues |

---

## 4. Key PR Progress

| PR | Status | Feature/Fix | Significance |
|----|--------|-------------|--------------|
| [#22485](https://github.com/google-gemini/gemini-cli/pull/22485) | 🟢 Open | `/perf` performance dashboard | Community-contributed observability: memory, timing, tool stats. Closes #22483. |
| [#22472](https://github.com/google-gemini/gemini-cli/pull/22472) | 🟢 Open | **Debug Companion** — AI-powered debugging (v2) | 9 debug tools, DAP support, crash analytics. Competing implementation of #22469. |
| [#22469](https://github.com/google-gemini/gemini-cli/pull/22469) | 🔴 Closed | Debug Companion (v1) | Superseded by #22472; demonstrates intense community interest in debugging infra. |
| [#22484](https://github.com/google-gemini/gemini-cli/pull/22484) | 🟢 Open | Fix MCP server settings merge | Unblocks extension users with `excludeTools` overrides. |
| [#22399](https://github.com/google-gemini/gemini-cli/pull/22399) | 🟢 Open | Native **bubblewrap sandbox** for Linux | Zero-dependency isolation; replaces Podman/Docker for hardened local execution. |
| [#22456](https://github.com/google-gemini/gemini-cli/pull/22456) | 🟢 Open | Interactive `/policies` dialog | Replaces text output with searchable, tabbed UI—polish milestone. |
| [#22467](https://github.com/google-gemini/gemini-cli/pull/22467) | 🟢 Open | Cap shell output at 10 MB | Prevents `RangeError` crashes on verbose commands; production stability. |
| [#22480](https://github.com/google-gemini/gemini-cli/pull/22480) | 🟢 Open | Handle `ENAMETOOLONG` in `robustRealpath` | Fixes crash on `@`-prefixed long strings; edge-case hardening. |
| [#21212](https://github.com/google-gemini/gemini-cli/pull/21212) | 🟢 Open | **Refreshed Composer UX** (default) | Promotes modern 2-row layout to default; major UI milestone. |
| [#22412](https://github.com/google-gemini/gemini-cli/pull/22412) | 🟢 Open | Full "GEMINI CLI" ASCII logo | Brand identity polish for logged-out state. |

---

## 5. Feature Request Trends

| Trend | Evidence | Implication |
|-------|----------|-------------|
| **Observability & Performance** | #22483 `/perf`, #22472/#22469 Debug Companion, #21890 compression fixes | Users need production-grade introspection; CLI maturing beyond prototyping |
| **Session Continuity Architecture** | #21792 Epic, #21887–21892 compression/coherence roadmap, #22098 memory overhaul | Long-running sessions are a priority; context window management is strategic |
| **Sandboxing & Security** | #22399 bubblewrap, #21901 subagent tool isolation | Enterprise adoption driving hardened execution environments |
| **Agent Self-Awareness** | #21432 accurate flags/hotkeys, #21421 skill auto-recommendation | Reducing user onboarding friction through meta-cognitive agents |
| **Non-Interactive/ACP Hardening** | #22191 Plan Mode + ACP, #21942 skill conflicts, #22484 MCP settings | CI/CD and IDE integration becoming first-class |

---

## 6. Developer Pain Points

| Pain Point | Frequency | Manifestations | Mitigation in Flight |
|------------|-----------|----------------|----------------------|
| **Plan Mode Reliability** | 🔴 Critical | #22266 context ghosts, #22307 stale plans, #22191 ACP breakage | `workstream-rollup` tagged; expect hotfix |
| **Model-Specific Hangs/Loops** | 🔴 High | #22415 gemini-3.1-pro-preview infinite wait, #22458 total unresponsiveness | `need-triage` → likely retry/streaming fixes |
| **TUI/Terminal Glitches** | 🟡 Moderate | #22028 scroll jumps, #21688 concatenated subagent thoughts, #21924 resize flicker | Ink/RenderStatic migration (#21924) |
| **Context Window Degradation** | 🟡 Moderate | Compression threshold tuning (#21888), stale output elision (#21891), guided compression (#21892) | Joshualitt's coherence roadmap (#21792) |
| **Shell Integration Edge Cases** | 🟢 Emerging | #21461 aliases unsupported, #21102 `!` paste corruption, #21925 false hand icons | Incremental fixes; bracketed paste guard landed |

---

*Digest compiled from 50 issues and 50 PRs updated 2026-03-14. For real-time updates: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-03-15

---

## 1. Today's Highlights

No new releases dropped in the last 24h, but the community filed **20 fresh issues** revealing intense focus on **model configurability**, **MCP ecosystem maturity**, and **automation edge cases**. The #1599 UI flicker bug and #288 MCP config layering request are drawing significant engagement, signaling that power users are pushing the CLI toward production-grade reliability.

---

## 2. Releases

*No releases in the last 24 hours.*

---

## 3. Hot Issues

| # | Issue | Why It Matters | Community Pulse |
|---|-------|--------------|-----------------|
| [#1599](https://github.com/github/copilot-cli/issues/1599) | UI flicker/stutter during streaming | Critical UX degradation affecting readability; likely terminal rendering bug | 7 👍, 5 comments — users confirming across environments |
| [#288](https://github.com/github/copilot-cli/issues/288) | Repo-specific/folder-specific MCP configs | Enables team-scale MCP adoption without global pollution; essential for monorepos | 5 👍, 8 comments — long-running, high-priority |
| [#2032](https://github.com/github/copilot-cli/issues/2032) | Configurable models for sub-tasks (compaction, agents) | Cost/performance optimization: use cheap models for summarization, powerful ones for reasoning | Fresh, zero votes but architecturally significant |
| [#2041](https://github.com/github/copilot-cli/issues/2041) | Model flag ignored mid-session change | Breaks user trust in `/usage` reporting; state management bug | Just filed, needs triage |
| [#2040](https://github.com/github/copilot-cli/issues/2040) | Skills not loaded in `-p/--prompt` mode | Blocks headless/automated workflows; discrepancy between interactive and scripted behavior | Zero engagement yet, but automation-critical |
| [#2037](https://github.com/github/copilot-cli/issues/2037) | Sub-command granularity in `--allow-tool` shell filter | Security hardening: current `deno:*` too permissive for production | Zero votes, security-focused |
| [#2036](https://github.com/github/copilot-cli/issues/2036) | Deduplicate MCP OAuth flows | UX friction with multiple MCP servers sharing client IDs | Zero engagement, infrastructure polish |
| [#2035](https://github.com/github/copilot-cli/issues/2035) | `XDG_CONFIG_HOME` ignored for agent creation | Linux/Unix compliance bug; hardcoded paths break portable setups | Zero votes, standards-compliance issue |
| [#2033](https://github.com/github/copilot-cli/issues/2033) | Markdown links → OSC 8 hyperlinks broken | Terminal integration polish; trailing `)` breaks URL detection | Zero engagement, terminal emulator compatibility |
| [#2029](https://github.com/github/copilot-cli/issues/2029) | Autopilot mode blocked by elicitation prompts | Core automation promise broken; `ask_user` tool needs graceful degradation | Zero votes, CI/CD critical |

---

## 4. Key PR Progress

*No pull requests updated in the last 24 hours.*

---

## 5. Feature Request Trends

| Trend | Evidence | Implication |
|-------|----------|-------------|
| **Model heterogeneity** | #1263, #2032, #2041 | Users want fine-grained model selection per task, not global defaults |
| **MCP ecosystem maturity** | #288, #2036, #2037 | From "does it work?" to "how do we scale it securely across teams?" |
| **Headless/automation hardening** | #2029, #2040, #2028 (closed) | CLI increasingly used in CI/CD; interactive assumptions breaking |
| **XDG/spec compliance** | #2035 | Enterprise Linux users expect standard config paths |
| **Terminal integration depth** | #1599, #2033, #2038 | Rich TUI expectations from modern terminal apps |

---

## 6. Developer Pain Points

1. **Streaming UI instability** — #1599's flicker effect is actively degrading daily workflows; likely needs renderer refactor.

2. **Configuration sprawl & portability** — MCP configs (#288), XDG paths (#2035), and model overrides (#2041) lack composable, environment-aware resolution.

3. **Automation brittleness** — Gap between interactive and scripted modes (#2040, #2029) forces workarounds; autopilot mode needs deterministic behavior guarantees.

4. **Security granularity** — `--allow-tool` wildcarding (#2037) and OAuth repetition (#2036) reveal enterprise readiness gaps.

5. **Session state coherence** — Model switching (#2041) and bookmark navigation (#2038) suggest state management complexity outpacing UX design.

---

*Digest compiled from 20 issues, 0 PRs, 0 releases. Data source: github.com/github/copilot-cli*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-03-15

---

## 1. Today's Highlights

The Kimi CLI community is actively addressing terminal compatibility gaps, with three PRs landing in 24 hours targeting macOS Cmd+V image paste, Windows async file locking, and ACP 0.8 API migration. Cross-platform robustness remains the dominant theme as developers report environment-specific edge cases in VS Code integrated terminals, Git Bash, and clipboard handling.

---

## 2. Releases

*No new releases in the last 24 hours. Latest stable remains v1.22.0.*

---

## 3. Hot Issues

| # | Issue | Why It Matters | Community Signal |
|---|-------|--------------|----------------|
| [#625](https://github.com/MoonshotAI/kimi-cli/issues/625) | Configurable `/timeout` for long-running tasks | 60s default kills package installations and build processes; users need task-specific control | 3 comments, persistent since Jan—indicates ongoing friction |
| [#1433](https://github.com/MoonshotAI/kimi-cli/issues/1433) | macOS Cmd+V ignored for image paste | Platform parity gap; macOS users expect native shortcut support | 👍 1, active discussion with PR already drafted |
| [#1437](https://github.com/MoonshotAI/kimi-cli/issues/1437) | Enter key emits `[13u` in VS Code terminal | Breaks core UX in popular IDE environment; suggests keycode parsing regression | Fresh report, no comments yet—needs triage |
| [#1436](https://github.com/MoonshotAI/kimi-cli/issues/1436) | Git Bash startup failure | Windows subsystem compatibility gap blocks enterprise users | Fresh report, stack trace truncated—needs repro details |
| [#1427](https://github.com/MoonshotAI/kimi-cli/issues/1427) | Verbose log output on startup | Noise degrades UX; may indicate debug logging leaking to production | 1 comment, macOS-specific |
| [#1435](https://github.com/MoonshotAI/kimi-cli/issues/1435) | PicoClaw API integration request | Signals ecosystem expansion demand; third-party agent frameworks seeking Kimi For Coding access | Fresh enhancement request |

---

## 4. Key PR Progress

| # | PR | Description | Impact |
|---|-----|-------------|--------|
| [#1434](https://github.com/MoonshotAI/kimi-cli/pull/1434) | Handle Cmd+V via BracketedPaste event | Detects bracketed paste sequences to trigger `_try_paste_media()` on macOS | Fixes #1433; unblocks macOS image workflow |
| [#1438](https://github.com/MoonshotAI/kimi-cli/pull/1438) | `asyncio.Lock` for Context file writes | Prevents `PermissionError` on Windows when concurrent coroutines access `context.jsonl` | Fixes #1429; critical for Windows stability |
| [#1400](https://github.com/MoonshotAI/kimi-cli/pull/1400) | Migrate ACP 0.8 terminal API | Replaces deprecated `acp.TerminalHandle` with `CreateTerminalResponse` + `Client` methods | Keeps CLI aligned with ACP evolution; affects `tools.py`, `kaos.py` |
| [#1439](https://github.com/MoonshotAI/kimi-cli/pull/1439) | Clarify Web UI dev setup in CONTRIBUTING.md | Documents hot reload and build prerequisites | Lowers contributor friction |

---

## 5. Feature Request Trends

| Direction | Evidence | Momentum |
|-----------|----------|----------|
| **Timeout configurability** | #625 (long-standing), related to build/install workflows | High—blocks CI/automation use cases |
| **Third-party agent integration** | #1435 (PicoClaw) | Emerging—ecosystem API openness |
| **Cross-platform clipboard parity** | #1433, #1434 | Active—macOS/Windows/Linux coverage gaps being closed |

---

## 6. Developer Pain Points

| Category | Symptoms | Frequency |
|----------|----------|-----------|
| **Terminal emulator compatibility** | VS Code `[13u]` keycodes (#1437), Git Bash crashes (#1436), bracketed paste variance | High—3 reports in 24h across distinct environments |
| **Windows file system concurrency** | `PermissionError` on `context.jsonl` (#1429, #1438) | Recurring—async I/O + Windows locking semantics |
| **Opaque defaults** | Hard 60s timeout (#625), verbose startup logs (#1427) | Moderate—configuration surface area too narrow |
| **Platform-native shortcuts** | macOS Cmd+V image paste ignored until #1434 | Moderate—suggests Linux-first development bias |

---

*Digest compiled from github.com/MoonshotAI/kimi-cli activity 2026-03-14.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-03-15

## Today's Highlights

The community is grappling with critical reliability issues as GitHub Copilot integration faces a major billing bug burning through premium quotas, while macOS users report severe memory leaks causing kernel panics during extended sessions. On the development front, contributors are actively landing TUI improvements including Vim motions and reverse search, alongside mobile UX fixes and Italian localization.

---

## Releases

*No releases in the past 24 hours.*

---

## Hot Issues

| # | Issue | Why It Matters | Community Signal |
|---|-------|--------------|----------------|
| [#8030](https://github.com/anomalyco/opencode/issues/8030) | Copilot auth misclassifies agent requests as "user," rapidly consuming premium quotas | **Critical cost impact**: Users report losing half their monthly quota from ~60 misclassified agent requests. Affects enterprise billing directly. | 179 comments, 62 👍 — highest engagement by far |
| [#12687](https://github.com/anomalyco/opencode/issues/12687) | Severe memory leak and disk swell causing macOS kernel panic | **System stability crisis**: TypeScript implementation's resource management leads to forced restarts after "a few hours of intensive use." | 28 comments, actively discussed |
| [#5361](https://github.com/anomalyco/opencode/issues/5361) | TUI freezes 2-10 seconds periodically on WSL2 (v1.0.129 regression) | **Productivity killer**: Input buffering during freezes disrupts flow state; WSL2 is a primary dev environment. | 30 comments, 12 👍, regression tag |
| [#17318](https://github.com/anomalyco/opencode/issues/17318) | SSE read timed out during file operations | **Core reliability**: Breaks planning-with-files workflow, new in v1.2.25. | 22 comments, 14 👍 |
| [#16470](https://github.com/anomalyco/opencode/issues/16470) | Code output unreadable in light mode | **Accessibility**: Formatted code invisible due to color scheme bug — basic UX broken. | 21 comments, 16 👍 |
| [#13217](https://github.com/anomalyco/opencode/issues/13217) | Stops after compaction mid-task | **Workflow interruption**: Long-running tasks halt unexpectedly; "keep going" workaround acknowledged. | 10 comments, 12 👍 |
| [#17307](https://github.com/anomalyco/opencode/issues/17307) | v1.2.25 timeouts too aggressive for large local models | **Local-first AI broken**: 100k context sessions fail with 2-minute default; requires manual config override. | 5 comments, emerging pattern |
| [#17516](https://github.com/anomalyco/opencode/issues/17516) | `opencode run` hangs after completing tool calls | **Automation blocked**: Process never exits, breaking CI/scripting use cases. | 3 comments, fresh (Mar 14) |
| [#17458](https://github.com/anomalyco/opencode/issues/17458) | Windows bash tool crashes with `ERR_INVALID_ARG_TYPE` | **Cross-platform regression**: Fails before execution even with Git Bash correctly installed. | 2 comments, Windows-specific |
| [#17531](https://github.com/anomalyco/opencode/issues/17531) | Copilot session auto-titling fails when enterprise policy disables gpt-5-mini | **Enterprise compatibility**: Hard dependency on specific model breaks in locked-down environments. | 2 comments, fresh (Mar 14) |

---

## Key PR Progress

| # | PR | Contribution | Status |
|---|-----|------------|--------|
| [#16625](https://github.com/anomalyco/opencode/pull/16625) | Prevent mobile scroll flickering during AI streaming | Fixes infinite scroll jitter on touch devices during streaming responses | Open |
| [#12679](https://github.com/anomalyco/opencode/pull/12679) | Vim motions in prompt input | Adds optional `tui.vim: true` for keyboard-native navigation; closes long-standing [#1764](https://github.com/anomalyco/opencode/issues/1764) | Open |
| [#17525](https://github.com/anomalyco/opencode/pull/17525) | Ctrl+R reverse search for prompt history | bash-style history search; only arrow-key navigation existed before | **Closed** — merged |
| [#17529](https://github.com/anomalyco/opencode/pull/17529) | Fix DeepSeek API `reasoning_content` transformation | Resolves Error 400 with thinking mode; fixes [#17523](https://github.com/anomalyco/opencode/issues/17523), [#9397](https://github.com/anomalyco/opencode/issues/9397), [#5577](https://github.com/anomalyco/opencode/issues/5577) | Open |
| [#17520](https://github.com/anomalyco/opencode/pull/17520) | Desktop app & Safari comment button fix | Enables file comments in "all files" view on macOS/Safari; closes [#11947](https://github.com/anomalyco/opencode/issues/11947) | Open |
| [#17517](https://github.com/anomalyco/opencode/pull/17517) | Await plugin event hooks, handle DB effect errors | Fixes silent failures in plugin initialization; closes [#14808](https://github.com/anomalyco/opencode/issues/14808) | Open |
| [#13795](https://github.com/anomalyco/opencode/pull/13795) | `Session.messageCount()` endpoint | Efficient `SELECT COUNT(*)` vs. loading all messages; closes [#14602](https://github.com/anomalyco/opencode/issues/14602) | Open |
| [#13004](https://github.com/anomalyco/opencode/pull/13004) | Custom session ID on creation | `POST /session {"id": "ses_<valid>"}` for external orchestration; closes [#2159](https://github.com/anomalyco/opencode/issues/2159) | Open |
| [#15685](https://github.com/anomalyco/opencode/pull/15685) | `--command` flag support in TUI | Parity with `run --command`; closes [#15571](https://github.com/anomalyco/opencode/issues/15571) | Open |
| [#17527](https://github.com/anomalyco/opencode/pull/17527) | Italian (it) translation and glossary | Full UI localization; community i18n contribution | **Closed** — merged |

---

## Feature Request Trends

| Theme | Evidence | Momentum |
|-------|----------|----------|
| **Mobile/Web expansion** | [#6536](https://github.com/anomalyco/opencode/issues/6536) (29 👍), [#10288](https://github.com/anomalyco/opencode/issues/10288) (32 👍) — "access on the go" | Strongest signal; 61 combined 👍 |
| **Context/token efficiency** | [#17482](https://github.com/anomalyco/opencode/issues/17482) dynamic MCP schema loading, [#10017](https://github.com/anomalyco/opencode/issues/10017) custom compaction thresholds | Performance-conscious power users |
| **Prompt/UX enhancement** | [#10237](https://github.com/anomalyco/opencode/issues/10237) context-aware prompt enhancement (Kilo Code/Augment parity), [#8619](https://github.com/anomalyco/opencode/issues/8619) native StatusLine hooks | Workflow optimization focus |
| **Vim/terminal ergonomics** | [#12679](https://github.com/anomalyco/opencode/pull/12679) Vim motions merged, [#17525](https://github.com/anomalyco/opencode/pull/17525) Ctrl+R search | Terminal-native developer priority |
| **Enterprise scalability** | [#9088](https://github.com/anomalyco/opencode/issues/9088) sidebar project list scaling, [#17389](https://github.com/anomalyco/opencode/issues/17389) configurable session limit (hardcoded 100) | Organizational adoption blockers |

---

## Developer Pain Points

| Category | Symptoms | Root Indicators |
|----------|----------|---------------|
| **Billing/cost unpredictability** | Copilot quota drain ([#8030](https://github.com/anomalyco/opencode/issues/8030)), rate limit surprises ([#2244](https://github.com/anomalyco/opencode/issues/2244)) | Provider integration edge cases, enterprise policy mismatches |
| **Timeout/reliability tuning** | SSE timeouts ([#17318](https://github.com/anomalyco/opencode/issues/17318), [#17307](https://github.com/anomalyco/opencode/issues/17307)), hanging processes ([#17516](https://github.com/anomalyco/opencode/issues/17516)) | v1.2.25 aggression, local model neglect |
| **Resource management (macOS)** | Memory leaks → kernel panic ([#12687](https://github.com/anomalyco/opencode/issues/12687)) | TypeScript runtime limits, scale testing gaps |
| **TUI/platform stability** | WSL2 freezes ([#5361](https://github.com/anomalyco/opencode/issues/5361)), Windows bash crashes ([#17458](https://github.com/anomalyco/opencode/issues/17458)), vim terminal conflicts ([#15166](https://github.com/anomalyco/opencode/issues/15166)) | Cross-platform terminal emulation debt |
| **Input/clipboard friction** | Paste failures ([#8100](https://github.com/anomalyco/opencode/issues/8100), [#10780](https://github.com/anomalyco/opencode/issues/10780)), text selection overrides ([#2845](https://github.com/anomalyco/opencode/issues/2845)) | Terminal integration vs. native OS expectations |
| **Context/compaction control** | Stops after compaction ([#13217](https://github.com/anomalyco/opencode/issues/13217)), no early threshold config ([#10017](https://github.com/anomalyco/opencode/issues/10017)) | Opaque automation, power user configurability gaps |

---

*Digest compiled from github.com/anomalyco/opencode — 2026-03-15*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-03-15

---

## 1. Today's Highlights

The Qwen Code team shipped **v0.12.3-nightly** with critical fixes for tool-call sequencing errors that have been plaguing users with `Internal error (code: -32603)` messages. Community momentum is strong with **17 active PRs** and **34 updated issues**, led by prolific contributor `@wenshao` who opened 5 feature PRs including multi-model code review and skill extensibility. The VS Code extension received major UX improvements with new sidebar positioning options after months of user requests.

---

## 2. Releases

| Version | Notes |
|---------|-------|
| [v0.12.3-nightly.20260314.f1ee4638](https://github.com/QwenLM/qwen-code/compare/v0.12.3...v0.12.3-nightly.20260314.f1ee4638) | Nightly build; full changelog pending stable release |

---

## 3. Hot Issues

| # | Issue | Why It Matters | Community Reaction |
|---|-------|--------------|------------------|
| [#2198](https://github.com/QwenLM/qwen-code/issues/2198) | **CLI spacebar input broken** — users cannot type spaces in CLI | Critical usability blocker; fixed and closed quickly | 6 comments, rapid resolution |
| [#1870](https://github.com/QwenLM/qwen-code/issues/1870) | **VS Code sidebar positioning** — no option for primary/secondary sidebar | Long-standing UX pain point; addressed in PR #2188 | 6 comments, marked closed |
| [#2194](https://github.com/QwenLM/qwen-code/issues/2194) | **Git worktree isolation for parallel sessions** | Enterprise/DevOps need for concurrent operations without conflicts | 3 comments, open feature request |
| [#2338](https://github.com/QwenLM/qwen-code/issues/2338) | **Skills auto-activation confusion** — shadcn skill doesn't auto-trigger | Reveals discoverability problems in skills system | 3 comments, user education gap |
| [#2329](https://github.com/QwenLM/qwen-code/issues/2329) | **`AskUserQuestion` array wrapping bug** | Breaks skill development workflow | 3 comments, needs triage |
| [#2360](https://github.com/QwenLM/qwen-code/issues/2360) | **P0: Tool message sequencing API error** | High-frequency crash affecting core functionality | 1 comment, linked to multiple similar reports |
| [#2249](https://github.com/QwenLM/qwen-code/issues/2249) | **Internal error during documentation editing** | Same root cause as #2360 — tool_calls/tool message mismatch | 1 comment, pattern emerging |
| [#2342](https://github.com/QwenLM/qwen-code/issues/2342) | **`/undo` command missing** — "every CLI agentic tool has this" | Fundamental UX gap; emotionally charged request | 1 comment, high priority sentiment |
| [#2377](https://github.com/QwenLM/qwen-code/issues/2377) | **Windows install script token/auth issues** | Blocking new user onboarding | 1 comment, fresh report |
| [#2382](https://github.com/QwenLM/qwen-code/issues/2382) | **VS Code extension broken in 0.12.3** (Russian report) | Regression concern; cross-version compatibility issue | 1 comment, needs verification |

---

## 4. Key PR Progress

| # | PR | Description | Status |
|---|-----|-------------|--------|
| [#2380](https://github.com/QwenLM/qwen-code/pull/2380) | **`extends: bundled` for skills** — append to bundled skills without full override | Enables customization of built-in `/review` skill | Open |
| [#2376](https://github.com/QwenLM/qwen-code/pull/2376) | **Multi-model code review with arbitration** — parallel LLM review + unified report | Major quality assurance feature; leverages model diversity | Open |
| [#2188](https://github.com/QwenLM/qwen-code/pull/2188) | **VS Code sidebar view + multi-position chat** — Activity Bar, bottom panel, Secondary Side Bar | Closes #1870, #1308, #1972; huge UX win | **Merged** |
| [#2367](https://github.com/QwenLM/qwen-code/pull/2367) | **Fix orphaned user entries causing API errors** — P0 bugfix for tool message sequencing | Addresses #2360, #2249, #2381 crash reports | Open |
| [#2374](https://github.com/QwenLM/qwen-code/pull/2374) | **Fix VS Code race conditions in cancellation/streaming** | Prevents malformed chat history on prompt cancel | Open |
| [#2371](https://github.com/QwenLM/qwen-code/pull/2371) | **`/btw` slash command** — ephemeral side questions without history pollution | Productivity feature for contextual lookups | Open |
| [#2348](https://github.com/QwenLM/qwen-code/pull/2348) | **Bundled `/review` skill** — out-of-the-box code review | Ships with 4 dimensions; extensible via #2380 | **Merged** |
| [#1912](https://github.com/QwenLM/qwen-code/pull/1912) | **Agent collaboration arena** — multi-model competitive execution with git worktrees | Experimental; pairs with #2194 feature request | Open |
| [#2203](https://github.com/QwenLM/qwen-code/pull/2203) | **10 core event hooks** — session lifecycle, tool execution, subagent hooks | Major extensibility infrastructure | Open |
| [#2356](https://github.com/QwenLM/qwen-code/pull/2356) | **Auto-detect `max_tokens` from model** — fixes truncation for non-Qwen models | Reliability fix for multi-provider setups | Open |

---

## 5. Feature Request Trends

| Direction | Evidence | Momentum |
|-----------|----------|----------|
| **Skills ecosystem maturity** | Built-in skills (#1645, #2346), skill extension (#2379, #2380), auto-activation clarity (#2338) | High — core differentiator vs. competitors |
| **Multi-model workflows** | Arena (#1912), multi-model review (#2375, #2376), model switching (#1119) | High — leveraging Qwen's model diversity |
| **Conversation/history management** | `/undo` (#2342), portable history (#2373), auto-save (#330), ephemeral `/btw` (#2370, #2371) | Medium-high — UX polish gap |
| **VS Code workspace integration** | Sidebar positioning (#1870, #1308, #1972, #2188), Activity Bar icon (#1972) | **Resolved** — shipped in #2188 |
| **Git worktree / isolation** | Parallel sessions (#2194), arena worktrees (#1912) | Medium — enterprise/DevOps need |

---

## 6. Developer Pain Points

| Issue | Frequency | Impact | Tracking |
|-------|-----------|--------|----------|
| **Tool message sequencing errors** (`tool_calls` → `tool` message validation) | **Critical** — #2360, #2190, #2249, #2381, #2384 | Blocks core functionality; P0 priority | PRs #2367, #2374 in progress |
| **VS Code extension stability** | High — #2382, #2378 (UI glitches), #2198 | Platform-specific regressions | Needs triage queue |
| **CLI input handling** | Medium — #2198 (spacebar), #2383 (paste API key) | Onboarding friction | Fix pattern needed |
| **Skills discoverability & documentation** | Medium — #2338 (auto-activation confusion), #2309 (@file not working) | Feature adoption barrier | Docs + UX improvements |
| **Windows-specific issues** | Medium — #2377 (install), #2378 (UI glitches), #2383 | Platform parity gap | Needs dedicated testing |
| **Memory/QWEN.md precedence confusion** | Low — #968 | Configuration complexity | PR #2368 addresses partial fix |

---

*Digest compiled from 34 issues and 17 PRs updated 2026-03-14. For real-time updates: [github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/duanyytop/agents-radar).*