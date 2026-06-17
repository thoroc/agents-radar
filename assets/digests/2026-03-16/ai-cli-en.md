# AI CLI Tools Community Digest 2026-03-16

> Generated: 2026-03-16 00:10 UTC | Tools covered: 7

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

# AI CLI Tools Ecosystem Report — 2026-03-16

## 1. Ecosystem Overview

The AI CLI tools landscape has matured into a competitive multi-polar ecosystem with six major players actively vying for developer mindshare. Today's activity reveals a sector in aggressive stabilization mode—teams are prioritizing reliability fixes over feature expansion, with multiple critical patches in flight for streaming parsers, retry logic, and terminal rendering. Windows compatibility remains a persistent blind spot across the board, while cross-platform session management and cost transparency have emerged as universal differentiators. The market is segmenting between enterprise-focused offerings (Claude Code, Codex) and open, extensible alternatives (OpenCode, Qwen Code) that emphasize local model support and provider flexibility.

---

## 2. Activity Comparison

| Tool | Issues (24h) | PRs (24h) | Release | Key Activity Signal |
|------|-------------|-----------|---------|-------------------|
| **Claude Code** | 10+ tracked | 8 | None | Community workarounds for Windows; telemetry regression |
| **OpenAI Codex** | 10+ tracked | 10 | None | Major architectural migration (TUI → app server) |
| **Gemini CLI** | 10+ tracked | 10 | None | Session continuity "ghosting" fixes; task tracker integration |
| **GitHub Copilot CLI** | 10+ tracked | 0 | None | v1.0.5 rendering regressions dominate discussion |
| **Kimi Code CLI** | 4 | 2 | None | Documentation fixes; terminal compatibility patches |
| **OpenCode** | 10+ tracked | 10+ | None | Stability firefighting: circuit breakers, memory leaks |
| **Qwen Code** | 9 | 10 | **v0.12.3-nightly** | Bundled `/review` skill; critical streaming parser fixes |

*Note: "10+ tracked" indicates issues explicitly featured in digests; actual counts likely higher.*

---

## 3. Shared Feature Directions

| Requirement | Tools | Specific Community Needs |
|-------------|-------|-------------------------|
| **Session Management & Continuity** | Claude Code [#16901], Codex [#11325, #7727], Gemini CLI [#21792, #22266], Qwen Code [#2373, #2262] | `/list-sessions`, `/delete-session`, `/compact`, checkpoint/rollback, cross-device history sync |
| **Cross-Platform Parity (CLI ↔ IDE ↔ App)** | Claude Code [#22218], Codex [#11325, #3049, #3962], Copilot CLI [#1703] | Model availability consistency, feature parity between CLI and VS Code extension, sound notifications |
| **Cost Control & Transparency** | Codex [#11189, #14593, #14681], Claude Code [#34685], Qwen Code [#2384] | Explicit model confirmation, token usage visibility, rate limit handling, context window accuracy |
| **Windows Platform Stability** | Claude Code, Codex [#10601], Gemini CLI, Copilot CLI [#1202], Kimi [#1436], Qwen Code [#2382, #2401, #2395] | Sandbox setup, terminal rendering, input handling, CRLF preservation, Git Bash compatibility |
| **MCP/Tool Ecosystem Reliability** | Claude Code [#32450], Gemini CLI [#22579, #22574], Copilot CLI [#1886] | Stale client cleanup, input blocker leaks, OAuth flows, LSP integration |
| **Global/Portable Configuration** | Copilot CLI [#252], Qwen Code [#2373, #2396], OpenCode [#6217] | Cross-repo instructions, workspace-local storage, multi-account support |
| **Granular Safety Controls** | Copilot CLI [#1973], OpenCode [#16331, #17607], Qwen Code [#2255] | Tool whitelisting, per-agent permissions, config-enforced rules vs. suggestions |

---

## 4. Differentiation Analysis

| Dimension | Claude Code | OpenAI Codex | Gemini CLI | Copilot CLI | Kimi Code | OpenCode | Qwen Code |
|-----------|-------------|--------------|------------|-------------|-----------|----------|-----------|
| **Primary Target** | Enterprise teams, power users | Business/Pro developers, OpenAI ecosystem | Google Cloud/Workspace users | GitHub-centric developers, orgs | Chinese market, JetBrains users | Open-source advocates, local-LLM users | Alibaba Cloud users, multi-provider setups |
| **Technical Approach** | Closed, Anthropic models only; deep IDE integration | Closed, OpenAI models; sandboxed execution | Closed, Gemini models; Chrome automation | Closed, multi-model (GitHub-hosted); tight GitHub integration | Closed, Moonshot models; ACP protocol | Open-source, multi-provider; Effect-TS architecture | Open-source, multi-provider; skills-based architecture |
| **Key Differentiator** | 1M context window, `CLAUDE.md` system | `/review` task type, realtime v2 session flow | Chrome agent automation, Google service integration | GitHub-native auth, Copilot subscription bundle | Kimi k1.5 reasoning model integration | Provider flexibility, local LLM focus | Bundled skills, OpenRouter compatibility, workspace portability |
| **Current Pain Point** | Windows second-class status, telemetry regressions | Cost surprises, Windows sandbox failures | "Ghosting" session drops, auth for paid users | v1.0.5 terminal regressions, org token limitations | Billing transparency, Windows shell gaps | Memory leaks, SSE timeouts, permission system gaps | VS Code extension stability, streaming parser bugs |
| **Extensibility Model** | MCP servers | MCP servers + sandboxed tools | MCP + Chrome extensions | MCP + GitHub Actions | ACP (IDE protocol) | Native multi-provider + MCP | Skills system + MCP |

---

## 5. Community Momentum & Maturity

| Tier | Tools | Assessment |
|------|-------|------------|
| **High Momentum, High Maturity** | **Claude Code**, **OpenAI Codex** | Largest issue volumes, sustained engagement (180+ 👍 on multi-account request), enterprise feature depth. Codex showing architectural ambition (TUI → app server); Claude Code community compensating for official Windows gaps with patches. |
| **High Momentum, Stabilizing** | **Gemini CLI**, **OpenCode**, **Qwen Code** | Active firefighting on core reliability. Gemini CLI tackling systemic session continuity; OpenCode addressing memory leaks and retry loops with large contributor waves; Qwen Code shipping nightly builds with bundled skills. |
| **Moderate Momentum, Niche Focus** | **Copilot CLI** | Strong GitHub ecosystem lock-in but slower iteration (no PRs in 24h). Community frustration with recent regressions outpacing response velocity. |
| **Emerging, Regional** | **Kimi Code CLI** | Lower absolute activity, China-market focus. Activity concentrated on IDE integration (JetBrains) and terminal compatibility rather than core AI features. |

**Velocity Signal**: Qwen Code's nightly release with bundled `/review` skill and coordinated parser fixes demonstrates fastest iteration cycle. OpenCode's 20+ contributors on memory leaks indicates healthy open-source momentum.

---

## 6. Trend Signals

| Trend | Evidence | Developer Implications |
|-------|----------|------------------------|
| **Context Window Transparency Crisis** | Claude Code [#34685, #34763], Codex cost complaints, Qwen [#2384] | Marketing of "1M context" outpaces engineering reality; developers should benchmark actual effective context, not advertised limits |
| **The Windows Tax** | Universal across all tools | AI CLI tools remain Unix-first; Windows developers should budget for WSL or expect friction |
| **Skills/Subagent Architecture Maturation** | Qwen bundled `/review`, Gemini task tracker, Claude `opusplan`, OpenCode self-improving prompts | Industry converging on composable, observable agent primitives rather than monolithic assistants |
| **Local LLM Integration Pressure** | OpenCode [#17670], Qwen [#2385], Codex model routing transparency demands | Developer demand for provider flexibility and cost control driving open-source alternatives; closed tools face substitution risk |
| **Enterprise Hygiene as Differentiator** | Global configs, audit logs, org token support, invoice UIs | Tools lacking enterprise-grade access control and billing transparency losing B2B evaluations |
| **Real-time Collaboration & Remote Control** | Codex [#9224] mobile control, Qwen [#2330] HTTP server, Claude Teams | CLI tools evolving from solo coding aids to team-orchestrated agents; headless/CI operation becoming table stakes |

---

*Report compiled from community digest data dated 2026-03-16. Metrics approximate based on featured activity; consult individual repositories for precise counts.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of 2026-03-16 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking

| Rank | Skill | PR | Status | Functionality | Discussion Focus |
|:---|:---|:---|:---|:---|:---|
| 1 | **Document Typography** | [#514](https://github.com/anthropics/skills/pull/514) | 🟡 Open | Quality control for AI-generated documents: prevents orphans, widows, and numbering misalignment | Addresses universal pain point in Claude's document output; zero thumbs but high implicit demand |
| 2 | **Skill Quality & Security Analyzers** | [#83](https://github.com/anthropics/skills/pull/83) | 🟡 Open | Meta-skills for evaluating Skills across 5 quality dimensions and security posture | Enterprise governance angle; long-running PR since Nov 2025 suggests review complexity |
| 3 | **Frontend Design** (Improved) | [#210](https://github.com/anthropics/skills/pull/210) | 🟡 Open | Revised guidance for actionable, single-conversation design instructions | Focus on token efficiency and executable clarity |
| 4 | **System Documentation** | [#95](https://github.com/anthropics/skills/pull/95) | 🟡 Open | Evidence management system docs: architecture, flowcharts, lifecycle workflows | Enterprise audit/compliance use case |
| 5 | **Masonry Image/Video Generation** | [#335](https://github.com/anthropics/skills/pull/335) | 🟡 Open | CLI wrapper for Imagen 3.0 and Veo 3.1 generation with job management | Multimedia content pipeline integration |
| 6 | **SAP-RPT-1-OSS Predictor** | [#181](https://github.com/anthropics/skills/pull/181) | 🟡 Open | Tabular foundation model for SAP business data predictive analytics | Enterprise ERP integration; SAP TechEd 2025 release |
| 7 | **ODT Processing** | [#486](https://github.com/anthropics/skills/pull/486) | 🟡 Open | OpenDocument creation, template filling, and HTML parsing | LibreOffice/enterprise document workflow bridge |
| 8 | **Codebase Inventory Audit** | [#147](https://github.com/anthropics/skills/pull/147) | 🟡 Open | 10-step workflow for orphaned code, unused files, documentation gaps | Technical debt management at scale |

---

## 2. Community Demand Trends

From high-activity Issues, four dominant Skill direction requests emerge:

| Trend | Evidence | Representative Issues |
|:---|:---|:---|
| **Agent Governance & Safety** | 4 comments on [#412](https://github.com/anthropics/skills/issues/412) (now closed as skill proposal) | Policy enforcement, threat detection, trust scoring, audit trails for multi-agent systems |
| **MCP Interoperability** | 4 comments on [#16](https://github.com/anthropics/skills/issues/16) | Expose Skills as Model Context Protocol servers for standardized API surfaces |
| **Enterprise SSO/Auth Integration** | 3 comments, 5 👍 on [#556](https://github.com/anthropics/skills/issues/556); 2 comments on [#532](https://github.com/anthropics/skills/issues/532) | `claude -p` skill triggering failures; API key requirements blocking enterprise users |
| **Cloud Platform Integration** | 4 comments on [#29](https://github.com/anthropics/skills/issues/29) | AWS Bedrock compatibility for Skills deployment |

Secondary demand: **persistent memory** ([#154](https://github.com/anthropics/skills/pull/154)), **workspace automation** ([#299](https://github.com/anthropics/skills/pull/299) Google Workspace skills), and **Windows-native UX** ([#646](https://github.com/anthropics/skills/pull/646) screenshot paste).

---

## 3. High-Potential Pending Skills

Active PRs with sustained engagement likely to merge:

| Skill | PR | Last Activity | Blocker/Status |
|:---|:---|:---|:---|
| **Shodh Memory** (persistent context) | [#154](https://github.com/anthropics/skills/pull/154) | 2026-03-03 | Core infrastructure gap; cross-conversation state management |
| **Buildr** (Telegram bridge) | [#419](https://github.com/anthropics/skills/pull/419) | 2026-02-19 | Mobile remote control for Claude Code sessions |
| **Windows Screenshot Paste** | [#646](https://github.com/anthropics/skills/pull/646) | 2026-03-14 | Platform-specific UX fix; AutoHotkey dependency |
| **YAML Validation Fixes** (cluster of 3 PRs) | [#359](https://github.com/anthropics/skills/pull/359), [#361](https://github.com/anthropics/skills/pull/361), [#362](https://github.com/anthropics/skills/pull/362) | 2026-02-09–12 | Documentation/tooling reliability; silent failure modes |
| **Contributing Guidelines** | [#509](https://github.com/anthropics/skills/pull/509) | 2026-03-04 | Community health (25% → target metric improvement) |

---

## 4. Skills Ecosystem Insight

> **The community's concentrated demand is for production-grade enterprise tooling** — Skills that bridge Claude Code into existing IT infrastructure (SAP, Google Workspace, ODT/libreOffice, SSO/auth systems) while enforcing governance, auditability, and cross-platform reliability, with acute frustration around silent failures in skill loading and validation tooling.

---

*Report generated from 50 PRs and 50 Issues sampled. All GitHub links: https://github.com/anthropics/skills*

---

# Claude Code Community Digest — 2026-03-16

## Today's Highlights

A phone verification bug exploded to 80 comments and 113 upvotes overnight, becoming the most active issue in the tracker. Windows users continue struggling with Claude-in-Chrome connectivity due to a forced WebSocket bridge rollout, prompting community workarounds. Meanwhile, telemetry regressions and context window calculation discrepancies signal ongoing stability concerns in recent releases.

---

## Releases

**No releases in the last 24 hours.**

---

## Hot Issues

| # | Issue | Why It Matters | Community Reaction |
|---|-------|--------------|-------------------|
| [#34229](https://github.com/anthropics/claude-code/issues/34229) | **Phone verification bug** — Users unable to complete SMS verification during signup/login | Critical onboarding blocker affecting new user acquisition | 80 comments, 113 👍 — highest engagement in tracker; users sharing workarounds, no official fix yet |
| [#18435](https://github.com/anthropics/claude-code/issues/18435) | **Multi-account profile switching** — Request for managing multiple Claude accounts in Desktop app | Power users managing work/personal contexts need this daily | 24 comments, 180 👍 — long-standing request with sustained demand |
| [#32450](https://github.com/anthropics/claude-code/issues/32450) | **Google Drive MCP connector fails in VS Code** — Works in web, missing in extension | Breaks cloud-to-local workflow parity; affects Windows users specifically | 12 comments, active debugging; Gmail/Calendar work, Drive doesn't |
| [#27897](https://github.com/anthropics/claude-code/issues/27897) | **Cowork VM broken on Windows 11 Insider** — EXDEV rename bug persists in v1.1.4010 | Blocks containerized development workflows on latest Windows builds | 11 comments; regression from earlier fixes |
| [#22218](https://github.com/anthropics/claude-code/issues/22218) | **Add opusplan model support in VS Code** | New planning model unavailable in IDE extension despite API availability | 9 comments, 13 👍; users want feature parity between CLI and extension |
| [#16901](https://github.com/anthropics/claude-code/issues/16901) | **Session management slash commands** — `/list-sessions`, `/delete-session` | Long-running sessions accumulate; users need cleanup tools | 7 comments, 49 👍; practical DX improvement |
| [#32699](https://github.com/anthropics/claude-code/issues/32699) | **OTEL telemetry stopped working in v2.1.72** | Enterprise observability pipelines broken by auto-update | 6 comments; confirmed regression, affects production monitoring |
| [#34685](https://github.com/anthropics/claude-code/issues/34685) | **Opus 4.6 1M context degrades at 40%** — Self-reported performance drop | Questions 1M context marketing; early degradation unexpected | 5 comments; user documented timeline of quality decay |
| [#33651](https://github.com/anthropics/claude-code/issues/33651) | **Session resume loses messages** — SubAgent race condition causes data loss | Silent data loss in production workflows; message history integrity compromised | 5 comments, marked `data-loss`; reproduction confirmed |
| [#34435](https://github.com/anthropics/claude-code/issues/34435) | **Opus 4.6 alias ignores 1M default** — Requires explicit `opus[1M]` suffix | UX friction for Max plan subscribers expecting automatic upgrade | 3 comments; alias behavior contradicts documentation |

---

## Key PR Progress

| # | PR | Description | Status |
|---|-----|-------------|--------|
| [#34789](https://github.com/anthropics/claude-code/pull/34789) | **Windows Chrome bridge workaround** — PowerShell script forcing local named pipe over broken WebSocket bridge | **Merged** — Community fix for forced `tengu_copper_bridge` rollout |
| [#32755](https://github.com/anthropics/claude-code/pull/32755) | **Edit-verifier plugin** — Post-edit verification hook to catch silent Edit tool failures | Open — Addresses [#32658](https://github.com/anthropics/claude-code/issues/32658), prevents false-success edits |
| [#34545](https://github.com/anthropics/claude-code/pull/34545) | **Cap task output file size** — 100MB limit + cleanup fix for runaway `.output` files | Open — Fixes [#26911](https://github.com/anthropics/claude-code/issues/26911), prevents disk exhaustion |
| [#34735](https://github.com/anthropics/claude-code/pull/34735) | **CI actions update** — Maintenance PR for GitHub Actions versions | Open — Infrastructure hygiene |
| [#14842](https://github.com/anthropics/claude-code/pull/14842) | **Documentation link fixes** — Points to new Claude Code site | Open — Stale since December, docs drift |
| [#34399](https://github.com/anthropics/claude-code/pull/34399) | *Unclear: "Claude/ai fitness optimization"* | Open — Description insufficient to evaluate |
| [#34516](https://github.com/anthropics/claude-code/pull/34516) | **Add client websites** — Two Finnish business site templates | **Closed** — Appears to be off-topic/spam |
| [#34757](https://github.com/anthropics/claude-code/pull/34757) | *Empty: "Create XtVjH"* | **Closed** — Spam/accidental |

---

## Feature Request Trends

| Theme | Evidence | Momentum |
|-------|----------|----------|
| **Multi-account management** | [#18435](https://github.com/anthropics/claude-code/issues/18435) (180 👍) | Sustained — highest-voted open request |
| **Session lifecycle tools** | [#16901](https://github.com/anthropics/claude-code/issues/16901) (49 👍) | Growing — long sessions need governance |
| **CLAUDE.md execution vs. context** | [#34763](https://github.com/anthropics/claude-code/issues/34763), [#34759](https://github.com/anthropics/claude-code/issues/34759) | Emerging — users want instructions enforced, not suggested |
| **Model parity (VS Code ↔ CLI)** | [#22218](https://github.com/anthropics/claude-code/issues/22218) | Steady — new models lag in extension |
| **Headless/remote workflows** | [#34764](https://github.com/anthropics/claude-code/issues/34764) | Niche but vocal — SSH/CI environments underserved |

---

## Developer Pain Points

| Issue | Frequency | Severity | Workaround Status |
|-------|-----------|----------|-----------------|
| **Windows platform instability** | 5+ issues | High | Community scripts emerging ([#34789](https://github.com/anthropics/claude-code/pull/34789)) |
| **Context window calculation lies** | [#17959](https://github.com/anthropics/claude-code/issues/17959), [#34537](https://github.com/anthropics/claude-code/issues/34537), [#34685](https://github.com/anthropics/claude-code/issues/34685) | High | None — users manually monitor |
| **MCP connector reliability** | [#32450](https://github.com/anthropics/claude-code/issues/32450), [#33778](https://github.com/anthropics/claude-code/issues/33778), [#34788](https://github.com/anthropics/claude-code/issues/34788) | High | Platform-specific failures |
| **Telemetry/regression testing gaps** | [#32699](https://github.com/anthropics/claude-code/issues/32699) | Medium | Pin versions, disable auto-update |
| **Unicode/i18n handling** | [#32886](https://github.com/anthropics/claude-code/issues/32886), [#34549](https://github.com/anthropics/claude-code/issues/34549), [#34779](https://github.com/anthropics/claude-code/issues/34779) | Medium | None — affects Vietnamese, Spanish, Portuguese |
| **Permission/safety model drift** | [#34754](https://github.com/anthropics/claude-code/issues/34754), [#34774](https://github.com/anthropics/claude-code/issues/34774), [#34492](https://github.com/anthropics/claude-code/issues/34492) | Critical | Manual oversight required |

**Bottom line:** Windows continues to be a second-class citizen, context window transparency is deteriorating, and the safety/permissions model shows signs of regression in long sessions. The community is compensating with patches and documentation, but core fixes are needed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-03-16

## Today's Highlights

The community is actively tracking a model routing bug where GPT-5.3-Codex requests were incorrectly directed to GPT-5.2, now resolved but with ongoing discussion about transparency. Rate limit and token consumption concerns dominate issue traffic, particularly around the VS Code extension and `/review` tasks. Meanwhile, the team is pushing significant architectural work to unify the TUI on top of the app server and modernize the realtime v2 session flow.

---

## Releases

*No new releases in the last 24 hours.*

---

## Hot Issues

| # | Issue | Why It Matters | Community Reaction |
|---|-------|--------------|-------------------|
| [#11189](https://github.com/openai/codex/issues/11189) | **GPT-5.3-Codex routed to GPT-5.2** — Model routing bug caused users to receive wrong model | Critical transparency issue; users paying for premium models weren't getting them. Closed but sparked 167 comments demanding better visibility into actual model usage | 167 comments, 67 👍 — highly engaged |
| [#14593](https://github.com/openai/codex/issues/14593) | **Token burn rate still excessive after VS Code update** | Business-tier users reporting unexpected cost spikes; affects trust in extension's efficiency | 64 comments, 33 👍; active troubleshooting |
| [#11325](https://github.com/openai/codex/issues/11325) | **Request: Manual `/compact` command in Codex App** | CLI has this; desktop app lacks parity. Critical for long sessions hitting context limits | 34 comments, 64 👍; clear feature gap |
| [#3962](https://github.com/openai/codex/issues/3962) | **Completion sound notification** | Long-running background tasks need audible feedback; accessibility and UX improvement | 33 comments, 115 👍 — top-voted enhancement |
| [#10601](https://github.com/openai/codex/issues/10601) | **Sandbox setup error on Windows** | Blocks Windows CLI adoption; sandboxing is core security feature | 24 comments, ongoing debugging |
| [#9224](https://github.com/openai/codex/issues/9224) | **Codex Remote Control from mobile** | High-value workflow: desktop agent, mobile supervision. Community already hacking workarounds | 17 comments, 152 👍 — highest-voted open issue |
| [#3049](https://github.com/openai/codex/issues/3049) | **Configurable hotkeys** | Hardcoded shortcuts conflict with user workflows and accessibility needs | 16 comments, 64 👍 |
| [#8648](https://github.com/openai/codex/issues/8648) | **Codex replies to wrong message in conversation** | Core conversational reliability bug; breaks multi-turn trust | 16 comments, 7 👍 |
| [#7727](https://github.com/openai/codex/issues/7727) | **Delete option for tasks in VS Code** | Basic task management missing; users accumulating dead sessions | 16 comments, 63 👍 |
| [#14681](https://github.com/openai/codex/issues/14681) | **Double token drain on `/review` tasks** | Cost regression; `/review` already expensive, 2x multiplier is unacceptable | 12 comments, closed after fix |

---

## Key PR Progress

| # | PR | Description | Status |
|---|-----|-------------|--------|
| [#14668](https://github.com/openai/codex/pull/14668) | **Reuse guardian session across approvals** | Eliminates startup overhead and prompt cache misses for security reviews; clears prior decisions between approvals | Open |
| [#14763](https://github.com/openai/codex/pull/14763) | **Align realtime v2 flow with port branch** | Unifies session setup, interruption handling, and playback behavior across branches; prerequisite for websocket split | Open |
| [#14764](https://github.com/openai/codex/pull/14764) | **Update `supports_search_tool` in models.json** | Enables search tool for GPT-5.3-Codex and GPT-5.4; closes capability gap | Open |
| [#14759](https://github.com/openai/codex/pull/14759) | **Rusty V8 Bazel-first build** | Modernizes JS sandbox architecture with proper caching and release workflows | Open |
| [#14717](https://github.com/openai/codex/pull/14717) | **Move TUI on top of app server (parallel)** | Major architectural migration: TUI → app-server foundation with feature flag safety | Open |
| [#14732](https://github.com/openai/codex/pull/14732) | **Improve search tool fallback** | Bypasses search when unnecessary, reducing latency and token waste | Open |
| [#14602](https://github.com/openai/codex/pull/14602) | **Preserve background terminals on interrupt; rename cleanup to `/stop`** | Fixes surprising Ctrl+C behavior; clearer command naming | Open |
| [#14506](https://github.com/openai/codex/pull/14506) | **Ephemeral `/btw` side-question threads** | Isolated fork-and-return for quick questions without polluting main thread | Open |
| [#14733](https://github.com/openai/codex/pull/14733) | **Show turn-context diffs when backtracking** | Visualizes permission/model/cwd changes across session history | Open |
| [#14565](https://github.com/openai/codex/pull/14565) | **`AcceptWithOverrideCommand` for approvals** | Allows users to approve with modified command — safer than blind approval | Open |

---

## Feature Request Trends

1. **Cross-platform parity** — CLI features (`/compact`, configurable keys, sound notifications) repeatedly requested for App and Extension
2. **Cost control & visibility** — Explicit model confirmation, token usage transparency, rate limit handling
3. **Remote/mobile workflows** — Phone-to-desktop control, team coordination features (à la Claude Code Teams)
4. **Session management** — Better task deletion, history navigation, context compaction tools
5. **Windows polish** — Sandbox setup, line endings, npm packaging, WSL integration all need attention

---

## Developer Pain Points

| Category | Specific Frustrations |
|----------|----------------------|
| **Cost surprises** | Unpredictable token burn on `/review`, extension updates, and `UnifiedExec` verbose wrappers (#14593, #14681, #14750) |
| **Windows second-class status** | Sandbox failures, npm install breakage, line ending corruption, WSL environment variable gaps (#10601, #11744, #4003, #13556) |
| **Model transparency** | Routing bugs (#11189), misleading error messages for free-tier limits (#14749), undocumented experimental features (#14377) |
| **Context & session hygiene** | No manual compaction in App (#11325), no task deletion (#7727), background terminals killed unexpectedly (fixed in #14602) |
| **Configuration rigidity** | Hardcoded hotkeys (#3049), missing `/add-dir` mid-session (#11747), symlink handling gaps (#14694, #14767) |

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-03-16

## Today's Highlights

The Gemini CLI team is actively addressing core stability issues, with significant focus on session continuity problems where agents "ghost" users by dropping context mid-conversation. The community is seeing robust activity around the new task tracking system and MCP tool infrastructure, while authentication and quota management remain persistent friction points for paid subscribers.

---

## Releases

*No releases in the last 24 hours.*

---

## Hot Issues

| # | Issue | Why It Matters | Community Signal |
|---|-------|--------------|----------------|
| [#22266](https://github.com/google-gemini/gemini-cli/issues/22266) | **Agent silently drops context ("ghosts") after approving `/plan`** | Critical workflow breakage: users approve plans but execution never begins, destroying trust in the agent's reliability | 6 comments, marked maintainer-only workstream |
| [#21925](https://github.com/google-gemini/gemini-cli/issues/21925) | **Hand icon shows action required when it isn't** | UI/UX noise causing alert fatigue; specifically affects long-running shell scripts | 5 comments, possible duplicate |
| [#19407](https://github.com/google-gemini/gemini-cli/issues/19407) | **Auth fails for paid Gemini Advanced personal accounts** | Revenue-blocking: paying customers cannot use the product; "not yet authorized" error persists for weeks | 4 comments, need-triage status |
| [#22107](https://github.com/google-gemini/gemini-cli/issues/22107) | **"Exhausted capacity" despite quotas not exceeded** | False-positive rate limiting blocking productivity; retry logic appears ineffective | 3 comments, P2 priority |
| [#22028](https://github.com/google-gemini/gemini-cli/issues/22028) | **CLI scrolls to top on any VS Code click** | Severe terminal usability regression for IDE-integrated workflows | 3 comments, video evidence provided |
| [#22307](https://github.com/google-gemini/gemini-cli/issues/22307) | **Plan mode shows stale plan from previous request** | State management bug corrupting iterative planning workflows | 2 comments, bug report history attached |
| [#21792](https://github.com/google-gemini/gemini-cli/issues/21792) | **Epic: Session Continuity and Coherence** | Meta-issue framing the architectural challenge of long-running sessions; context degradation is systemic | 2 comments, maintainer-authored |
| [#22565](https://github.com/google-gemini/gemini-cli/issues/22565) | **Fails to ignore large binary files, 192MB+ context bloat** | Performance catastrophe in game dev/modding workflows; no built-in binary filtering | 1 comment, fresh report |
| [#22581](https://github.com/google-gemini/gemini-cli/issues/22581) | **Integrate with gemini.google.com history** | Cross-platform continuity highly requested; web/mobile users want seamless handoff | 1 comment, feature request |
| [#22583](https://github.com/google-gemini/gemini-cli/issues/22583) | **Race condition in ProjectRegistry.save()** | Startup crash (ENOENT) from concurrent initialization; affects CI/automated environments | New, no comments yet |

---

## Key PR Progress

| # | PR | What It Does | Status |
|---|-----|--------------|--------|
| [#20733](https://github.com/google-gemini/gemini-cli/pull/20733) | **Map `allowedEnvironmentVariables` from settings.json** | Fixes API key redaction for extension developers (e.g., Nano Banana); security-critical config mapping | **Merged** |
| [#22580](https://github.com/google-gemini/gemini-cli/pull/22580) | **Implement `lsp_query` tool for semantic code analysis** | Adds LSP-powered definitions, references, hover, symbols; major capability expansion for code understanding | Open |
| [#22578](https://github.com/google-gemini/gemini-cli/pull/22578) | **Dynamic model Resolution in ModelConfigService** | Enables experimental dynamic model configuration; foundation for runtime model selection | Open |
| [#22579](https://github.com/google-gemini/gemini-cli/pull/22579) | **Remove stale MCP client on initialization failure** | Prevents poisoned state from failed MCP connections; reliability fix for tool server ecosystem | Open |
| [#22384](https://github.com/google-gemini/gemini-cli/pull/22384) | **Optimize TrackerService dependency checks** | Eliminates O(n) task file parsing; significant perf win for large projects | Open, P1 |
| [#22574](https://github.com/google-gemini/gemini-cli/pull/22574) | **Restore input blocker on Chrome fatal error** | Fixes #22159: input blocker leaked on browser automation crashes; security/UX fix | Open |
| [#22442](https://github.com/google-gemini/gemini-cli/pull/22442) | **Integrate task tracker protocol into core system prompt** | Wires new file-based tracking into legacy prompts; disables conflicting `write_todos` | Open |
| [#22462](https://github.com/google-gemini/gemini-cli/pull/22462) | **Resolve scheduler hang, improve policy violation visibility** | Fixes three critical hangs in Policy Engine; uses new visual validation framework | Open, maintainer-only |
| [#22568](https://github.com/google-gemini/gemini-cli/pull/22568) | **Enable extensions to contribute CLI configuration settings** | Allows `gemini-extension.json` to set defaults; major extensibility milestone | Open, help wanted |
| [#22562](https://github.com/google-gemini/gemini-cli/pull/22562) | **Keep input blocker active across navigations** | Maintains `disableUserInput` overlay through page transitions; browser agent robustness | Open |

---

## Feature Request Trends

1. **Cross-Platform History Sync** — Users expect seamless conversation continuity between CLI, web (gemini.google.com), and mobile; the siloed experience is increasingly unacceptable.

2. **Smarter Context Management** — Binary file filtering, automatic compression triggers, and workspace-level memory are emerging as necessities rather than optimizations.

3. **Subagent Tool Isolation & Control** — Fine-grained permission boundaries between parent and child agents, plus the ability to disable built-in subagents.

4. **Self-Aware Agent Capabilities** — CLI should know its own flags, hotkeys, and execution modes to serve as authoritative documentation.

5. **Dynamic Model Configuration** — Runtime model selection based on task complexity, not static configuration.

---

## Developer Pain Points

| Category | Specific Frustration | Frequency Indicator |
|----------|---------------------|---------------------|
| **Authentication** | Paid subscribers locked out with "not yet authorized" errors; no clear escalation path | High — multi-week issue with active comments |
| **Quota/Capacity** | False "exhausted capacity" errors and aggressive retry delays disrupting flow | Recurring — multiple reports, P2 tagged |
| **Context/State Loss** | "Ghosting" after plan approval, stale plans, scroll position resets — fundamental session reliability | Critical — epic-level tracking issue |
| **Binary File Handling** | No built-in exclusion for `.pak`, `.rpa`, `.zip` causing massive context bloat and timeouts | Emerging — fresh high-impact report |
| **MCP/Tool Reliability** | Stale clients, input blocker leaks, initialization races in multi-server setups | Active — multiple fixes in flight |
| **VS Code Integration** | Terminal scroll behavior, hand icon spam, IDE-specific rendering glitches | Moderate — IDE users vocal |

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-03-16

## Today's Highlights
No new releases dropped in the last 24 hours, but the community remains highly active with 36 updated issues. Rendering and terminal stability problems dominate the conversation, alongside continued demand for workflow enhancements like global instructions, tool whitelisting, and session management features.

---

## Releases
*No releases in the past 24 hours.*

---

## Hot Issues

| # | Issue | Why It Matters | Community Reaction |
|---|-------|--------------|-------------------|
| [#1202](https://github.com/github/copilot-cli/issues/1202) | Screen flickers with cursor blink when selecting "No, and tell Copilot what to do differently" | **Critical UI regression** affecting Windows Terminal/PowerShell users; causes terminal buffer pollution and seizure-inducing visual artifacts | 35 comments, 34 👍 — highest engagement; users confirming widespread impact |
| [#1754](https://github.com/github/copilot-cli/issues/1754) | AssertionError during retrospective generation + HTTP/2 GOAWAY 503 | **Infrastructure reliability issue**; deep undici/HTTP pooling failure suggests systemic connection handling problems | 11 comments; users reporting similar transient failures |
| [#223](https://github.com/github/copilot-cli/issues/223) | "Copilot Requests" permission invisible for org-owned tokens | **Enterprise adoption blocker**; prevents corporate automation without personal PATs, violating security policies | 52 👍, 10 comments — long-standing request from Oct 2025 |
| [#1703](https://github.com/github/copilot-cli/issues/1703) | CLI doesn't list all org-enabled models (e.g., Gemini 3.1 Pro) | **Feature parity gap** with VS Code Copilot; creates confusion about model availability | 17 👍; users documenting specific missing models |
| [#252](https://github.com/github/copilot-cli/issues/252) | Global Instructions File Support | **Productivity multiplier**; eliminates repetitive per-repo setup for common instructions | 11 👍, 8 comments; strong consensus on need |
| [#1276](https://github.com/github/copilot-cli/issues/1276) | Support pasting images from system clipboard | **Multimodal workflow gap**; CLI lags behind IDE experiences for visual debugging | 4 👍; niche but enthusiastic support |
| [#2053](https://github.com/github/copilot-cli/issues/2053) | Vertical scroll bar removed after v1.0.5 upgrade | **v1.0.5 regression**; breaks fundamental navigation for reviewing thinking/output history | Fresh report, immediate visibility |
| [#1973](https://github.com/github/copilot-cli/issues/1973) | Tool whitelist for Interactive Mode | **Safety/UX balance**; `/allow-all` too permissive, per-tool approval too tedious | 4 👍; security-conscious users advocating |
| [#1944](https://github.com/github/copilot-cli/issues/1944) | Mouse wheel scroll captured by input box (Windows regression) | **Accessibility/usability hit**; breaks standard terminal interaction patterns | 2 👍; Windows users reporting frustration |
| [#1613](https://github.com/github/copilot-cli/issues/1613) | Built-in git worktree lifecycle management | **Advanced workflow enablement**; would make CLI truly agentic for isolated task execution | 13 👍; power users enthusiastic |

---

## Key PR Progress
*No pull requests updated in the past 24 hours.*

---

## Feature Request Trends

| Trend | Evidence | Implication |
|-------|----------|-------------|
| **Configuration portability** | [#252](https://github.com/github/copilot-cli/issues/252) (global instructions), [#2024](https://github.com/github/copilot-cli/issues/2024) (disable builtin agents) | Users want CLI behavior consistent across repos without per-directory setup |
| **Granular safety controls** | [#1973](https://github.com/github/copilot-cli/issues/1973) (tool whitelist), [#2058](https://github.com/github/copilot-cli/issues/2058) (session forking) | Demand for middle ground between locked-down and `--yolo` modes |
| **Session/context management** | [#2058](https://github.com/github/copilot-cli/issues/2058) (fork), [#2048](https://github.com/github/copilot-cli/issues/2048) (memory of prior sessions), [#2052](https://github.com/github/copilot-cli/issues/2052) (token usage indicator) | Users need visibility and control over long-running agentic workflows |
| **Enterprise/team features** | [#223](https://github.com/github/copilot-cli/issues/223) (org tokens), [#1394](https://github.com/github/copilot-cli/issues/1394) (usage statistics) | Organizational deployment requires auditability and policy compliance |
| **Scheduling/automation** | [#2056](https://github.com/github/copilot-cli/issues/2056) (recurring prompts) | Desire to extend CLI from interactive tool to background agent |

---

## Developer Pain Points

**1. Terminal Rendering Instability**
Multiple high-visibility issues ([#1202](https://github.com/github/copilot-cli/issues/1202), [#1924](https://github.com/github/copilot-cli/issues/1924), [#2053](https://github.com/github/copilot-cli/issues/2053), [#1944](https://github.com/github/copilot-cli/issues/1944)) indicate v1.0.5 introduced regressions in Windows terminal handling—flickering, scroll bar disappearance, and mouse capture failures. The [#1202](https://github.com/github/copilot-cli/issues/1202) flicker bug is particularly severe, with users describing it as "unusable."

**2. Model Availability Inconsistency**
[#1703](https://github.com/github/copilot-cli/issues/1703) highlights that CLI model lists diverge from VS Code Copilot even with identical account/org settings, creating confusion about whether this is a sync lag, caching issue, or intentional limitation.

**3. Authorization/Policy Propagation Delays**
[#1897](https://github.com/github/copilot-cli/issues/1897) and [#223](https://github.com/github/copilot-cli/issues/223) reveal friction in enterprise policy enforcement—users with valid Copilot Pro licenses intermittently lose access, and org-level token permissions lag behind user-level features.

**4. MCP/Integration Rough Edges**
[#1886](https://github.com/github/copilot-cli/issues/1886) (LSP/MCP config not loading), [#2054](https://github.com/github/copilot-cli/issues/2054) (Monday.com OAuth failure), and [#2051](https://github.com/github/copilot-cli/issues/2051) (background agent notification regression) suggest the extensibility layer needs stabilization.

**5. Missing "Power User" Ergonomics**
Recurring requests for global configs, tool whitelists, session forking, and persistent usage metrics indicate the CLI is still primarily designed for ephemeral, single-task interactions rather than sustained professional workflows.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-03-16

## 1. Today's Highlights

Community activity centers on terminal compatibility fixes and documentation improvements, with two new PRs addressing VS Code integration and IDE configuration. No new release was published in the last 24 hours. Four issues saw updates, spanning startup log verbosity, Git Bash compatibility, ACP session initialization failures, and billing support requests.

---

## 2. Releases

*No releases published in the last 24 hours.*

---

## 3. Hot Issues

| Issue | Why It Matters | Community Reaction |
|-------|--------------|-------------------|
| [#1427](https://github.com/MoonshotAI/kimi-cli/issues/1427) Verbose startup logging on macOS | Affects UX for Darwin/arm64 users with excessive log output obscuring the interface | 2 comments; user seeking workaround |
| [#1436](https://github.com/MoonshotAI/kimi-cli/issues/1436) Git Bash startup failure | Windows/Git Bash is a common developer environment; failure here blocks adoption | 1 comment; likely shell detection issue |
| [#1355](https://github.com/MoonshotAI/kimi-cli/issues/1355) ACP session init failure (`list.index(x): x not in list`) | Internal error breaking IDEA 2025.03 AI Assistant integration; indicates model list handling bug | 1 comment; persists across versions (1.17.0) |
| [#1442](https://github.com/MoonshotAI/kimi-cli/issues/1442) Missing invoice/billing UI | Enterprise adoption blocker; billing transparency is critical for paid tooling | No response yet; support/UX gap |

---

## 4. Key PR Progress

| PR | Description | Status |
|----|-------------|--------|
| [#1441](https://github.com/MoonshotAI/kimi-cli/pull/1441) docs: fix Kimi IDE ACP config — add missing `type: custom` | Corrects documentation gap for IDE MCP server setup; reduces onboarding friction | Open, awaiting review |
| [#1440](https://github.com/MoonshotAI/kimi-cli/pull/1440) fix(shell): disable kitty keys in VS Code | Resolves CSI-u sequence parsing issues in VS Code terminals; adds `KIMI_CLI_DISABLE_KITTY_KEYS` override | Open, needs testing verification |

---

## 5. Feature Request Trends

*No explicit feature requests in the 24h window. Implicit signals from issues suggest demand for:*
- **Billing/invoice self-service** (#1442)
- **Improved Windows shell compatibility** (Git Bash, PowerShell)
- **Reduced startup noise/verbosity controls**
- **More robust IDE plugin error handling**

---

## 6. Developer Pain Points

| Category | Evidence | Severity |
|----------|----------|----------|
| **Terminal compatibility** | Git Bash (#1436), VS Code terminal keys (#1440), kitty protocol edge cases | High — blocks core workflow |
| **Startup experience** | Verbose logging (#1427), ACP init crashes (#1355) | Medium-High — friction on first run |
| **Enterprise readiness** | No invoice UI (#1442) | Medium — adoption blocker for teams |
| **IDE integration stability** | ACP session failures with JetBrains (#1355) | Medium — affects professional users |

---

*Digest compiled from [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli) public activity.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-03-16

## Today's Highlights

The community is actively tackling critical stability issues, with multiple PRs addressing infinite retry loops, memory leaks, and TUI rendering problems. A significant wave of contributor activity focuses on improving the core execution engine, provider flexibility, and developer experience refinements. No new release was published in the last 24 hours.

---

## Releases

*No releases in the last 24 hours.*

---

## Hot Issues

| # | Title | Why It Matters | Community Reaction |
|---|-------|--------------|-------------------|
| [#17318](https://github.com/anomalyco/opencode/issues/17318) | SSE read timed out during file operations | Critical reliability bug affecting core file-writing workflows; 27 comments indicate widespread impact | 20 👍, active troubleshooting |
| [#4695](https://github.com/anomalyco/opencode/issues/4695) | Speech-to-Text Voice Input | Highly requested accessibility feature for hands-free coding; author has working prototype | 113 👍, strong enthusiasm |
| [#909](https://github.com/anomalyco/opencode/issues/909) | Can't Paste from clipboard | Fundamental UX blocker finally closed after months; affects multiple platforms | 20 comments, resolved |
| [#16331](https://github.com/anomalyco/opencode/issues/16331) | Permissions ignored in config | Security-critical: `opencode.json` permission rules not being enforced | 15 comments, needs attention |
| [#12789](https://github.com/anomalyco/opencode/issues/12789) | "Model not supported" error for Claude | Provider integration bug causing model availability confusion | 15 comments, ongoing diagnosis |
| [#1970](https://github.com/anomalyco/opencode/issues/1970) | Background Bash Execution (Claude Code parity) | Workflow productivity feature; enables non-blocking long-running tasks | 19 👍, strong demand |
| [#6217](https://github.com/anomalyco/opencode/issues/6217) | Multiple instances of same provider | Power-user need for managing multiple API keys/accounts | 13 👍, configuration complexity |
| [#16697](https://github.com/anomalyco/opencode/issues/16697) | Multiple memory leaks in TUI | Performance degradation during extended sessions; 20+ contributors involved | 8 👍, massive PR wave incoming |
| [#17648](https://github.com/anomalyco/opencode/issues/17648) | Infinite retry loop with unbounded backoff | System reliability issue causing hanging sessions; PR already in review | Fresh, critical |
| [#17661](https://github.com/anomalyco/opencode/issues/17661) | Self-Improving Prompt Learning System | Ambitious research-direction feature (GEPA + DSPy integration) | Early discussion, 0 👍 |

---

## Key PR Progress

| # | Title | Description | Status |
|---|-------|-------------|--------|
| [#17668](https://github.com/anomalyco/opencode/pull/17668) | Retry circuit breaker and backoff cap | Fixes [#17648](https://github.com/anomalyco/opencode/issues/17648): prevents infinite loops, caps exponential delay | Open |
| [#17670](https://github.com/anomalyco/opencode/pull/17670) | Dynamic model discovery for local providers | Auto-populates models from LM Studio, llama.cpp `/model` endpoints | Open |
| [#17640](https://github.com/anomalyco/opencode/pull/17640) | Effectify FileTimeService with Semaphore locks | Refactors file locking to Effect-TS patterns, improves concurrency safety | Open, [Vouched] |
| [#17664](https://github.com/anomalyco/opencode/pull/17664) | Auth provider aliases for Copilot | Enables multiple Copilot provider instances with shared auth logic | Open |
| [#17667](https://github.com/anomalyco/opencode/pull/17667) | Fix docs language selector (English switch) | Resolves [#17665](https://github.com/anomalyco/opencode/issues/17665): cookie-based locale persistence | Open |
| [#17660](https://github.com/anomalyco/opencode/pull/17660) | Detect light mode in Zellij terminal | Fixes [#4464](https://github.com/anomalyco/opencode/issues/4464): theme detection for terminal multiplexer | Merged |
| [#17576](https://github.com/anomalyco/opencode/pull/17576) | Fix Select component class leakage | UI bug: prevents trigger styles from polluting dropdown items | Open |
| [#17502](https://github.com/anomalyco/opencode/pull/17502) | Prompt enhancement via Ctrl+X P | New TUI command: AI-powered prompt improvement before sending | Open |
| [#17666](https://github.com/anomalyco/opencode/pull/17666) | Biome LSP sensible defaults | Configurable built-in LSP settings, improved server message visibility | Open |
| [#17650](https://github.com/anomalyco/opencode/pull/17650) | Process queued messages after task completion | Fixes race condition where queued messages interrupted or stalled | Merged |

---

## Feature Request Trends

1. **Voice/Accessibility**: Speech-to-text input ([#4695](https://github.com/anomalyco/opencode/issues/4695)) leads accessibility improvements
2. **Async Execution**: Background bash jobs ([#1970](https://github.com/anomalyco/opencode/issues/1970)) and non-blocking workflows
3. **Provider Flexibility**: Multiple provider instances ([#6217](https://github.com/anomalyco/opencode/issues/6217)), dynamic model discovery, local LLM integration
4. **Adaptive Systems**: Self-improving prompts ([#17661](https://github.com/anomalyco/opencode/issues/17661)), context-aware session titles ([#17631](https://github.com/anomalyco/opencode/issues/17631))
5. **Granular Control**: Per-agent tool permissions ([#17607](https://github.com/anomalyco/opencode/issues/17607)), directory switching in-session ([#17662](https://github.com/anomalyco/opencode/issues/17662))
6. **Share Management**: Batch operations and share listing ([#17625](https://github.com/anomalyco/opencode/issues/17625))

---

## Developer Pain Points

| Issue | Frequency | Impact |
|-------|-----------|--------|
| **SSE/Timeout Errors** | 2+ issues ([#17318](https://github.com/anomalyco/opencode/issues/17318), [#17574](https://github.com/anomalyco/opencode/issues/17574)) | Blocks file operations, breaks flow |
| **Clipboard/Paste Failures** | Multiple reports ([#909](https://github.com/anomalyco/opencode/issues/909), [#9922](https://github.com/anomalyco/opencode/issues/9922), [#10780](https://github.com/anomalyco/opencode/issues/10780)) | Cross-platform TUI input broken |
| **Memory Leaks** | [#16697](https://github.com/anomalyco/opencode/issues/16697) + related | Long sessions become unusable |
| **Permission System Unreliability** | [#16331](https://github.com/anomalyco/opencode/issues/16331) | Security config ignored |
| **Infinite Retry Loops** | [#17648](https://github.com/anomalyco/opencode/issues/17648) | Sessions hang indefinitely |
| **Model Provider Confusion** | [#12789](https://github.com/anomalyco/opencode/issues/12789), [#11529](https://github.com/anomalyco/opencode/issues/11529) | Error messages misleading, setup complex |
| **Documentation Gaps** | [#17550](https://github.com/anomalyco/opencode/issues/17550) | Missing steps block onboarding |

---

*Digest compiled from github.com/anomalyco/opencode activity on 2026-03-16.*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-03-16

---

## 1. Today's Highlights

The v0.12.3 nightly build shipped with a bundled `/review` skill for out-of-the-box code review capabilities, while the community drove significant activity around VS Code extension stability and workspace-local configuration portability. A critical streaming parser bug affecting OpenRouter and tool call reliability is being actively patched through multiple coordinated PRs.

---

## 2. Releases

**v0.12.3-nightly.20260315.b2c9e641** — [Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.12.3-nightly.20260315.b2c9e641)

| Change | Author | Impact |
|--------|--------|--------|
| **feat(skills): bundled `/review` skill** | @wenshao | Zero-config code review capability |
| **fix(insight): handle individual LLM failures in qualitative insights** | @netbrah | Prevents insight generation from failing when one LLM errors |
| fix(core): *(truncated in source)* | — | — |

---

## 3. Hot Issues

| Issue | Status | Why It Matters | Community Signal |
|-------|--------|--------------|----------------|
| [#2382](https://github.com/QwenLM/qwen-code/issues/2382) — VS Code extension broken in v0.12.3 | 🔴 OPEN | Regression blocking IDE users; downgrade to 1.110.1 didn't resolve | 3 comments, Russian/English cross-reporting |
| [#2402](https://github.com/QwenLM/qwen-code/issues/2402) — OpenRouter duplicate `finish_reason` chunks break tool calls | 🔴 OPEN | Root cause identified: streaming parser loses tool calls on duplicate SSE chunks | Fresh report, active fix in progress |
| [#2401](https://github.com/QwenLM/qwen-code/issues/2401) — Caps Lock freezes terminal input | 🔴 OPEN | Bizarre UX blocker on Windows; suggests input handling regression | No comments yet |
| [#2395](https://github.com/QwenLM/qwen-code/issues/2395) — 5+ second input lag in chat window | 🔴 OPEN | Performance regression affecting real-time interaction | Windows 11 + VS Code 1.111.0 |
| [#2384](https://github.com/QwenLM/qwen-code/issues/2384) — `InvalidParameter: Range of input length [1, 983616]` | 🔴 OPEN | Hard API limit hit on long contexts; needs better truncation strategy | Win32, DashScope endpoint |
| [#2373](https://github.com/QwenLM/qwen-code/issues/2373) — Portable chat history: project-local storage + export | 🔴 OPEN | Critical for multi-machine workflows and team collaboration | Detailed proposal with `.qwen/chat-history/` structure |
| [#2396](https://github.com/QwenLM/qwen-code/issues/2396) — Optional "store everything in workspace" | 🔴 OPEN | Complements #2373; extends to configs, debug logs | Multi-environment dev use case |
| [#1997](https://github.com/QwenLM/qwen-code/issues/1997) — View full command line in terminal (truncated with `...`) | 🔴 OPEN | Debugging friction; long commands obscured | Screenshot provided |
| [#2390](https://github.com/QwenLM/qwen-code/issues/2390) — CJK-Latin spacing ("盘古之白") breaks paths/commands | 🟢 CLOSED | Model-level formatting issue corrupting shell execution | Rapidly closed, likely model-side fix |
| [#2262](https://github.com/QwenLM/qwen-code/issues/2262) — Code rollback/checkpoint mechanism (like Claude's `rewind`) | 🟢 CLOSED | Long-standing gap vs. competitors; merged with #100, #1287 | 3 related issues consolidated |

---

## 4. Key PR Progress

| PR | Author | Feature / Fix | Status |
|----|--------|-------------|--------|
| [#2404](https://github.com/QwenLM/qwen-code/pull/2404) | @drewd789 | **Critical:** Fixes tool call loss from late-arriving names + duplicate finish chunks; 3 complementary parser/converter bugs | 🔴 OPEN |
| [#2403](https://github.com/QwenLM/qwen-code/pull/2403) | @simon100500 | OpenRouter duplicate `finish_reason` handling; pairs with #2404 | 🔴 OPEN |
| [#2405](https://github.com/QwenLM/qwen-code/pull/2405) | @undici77 | Multi-strategy edit tool: exact, flexible, regex, fuzzy (Levenshtein) matching with user-modified edit flags | 🔴 OPEN |
| [#2400](https://github.com/QwenLM/qwen-code/pull/2400) | @DragonnZhang | System prompt customization in SDK and CLI (override/append modes) | 🔴 OPEN |
| [#2385](https://github.com/QwenLM/qwen-code/pull/2385) | @jaydennleemc | Local model provider support: LM Studio & Ollama via OpenAI-compatible APIs | 🔴 OPEN |
| [#2330](https://github.com/QwenLM/qwen-code/pull/2330) | @ossaidqadri | Remote-control feature: HTTP/WebSocket server + browser UI at `:7373` for headless interaction | 🔴 OPEN |
| [#2277](https://github.com/QwenLM/qwen-code/pull/2277) | @howardpen9 | Preserve CRLF line endings in edit tool; prevents massive git diffs on Windows | 🔴 OPEN |
| [#2356](https://github.com/QwenLM/qwen-code/pull/2356) | @netbrah | Auto-detect `max_tokens` from model when provider omits it; fixes truncation on Claude/GPT/Gemini | 🔴 OPEN |
| [#2255](https://github.com/QwenLM/qwen-code/pull/2255) | @qqqys | Skill governance: `skills.allowed` / `skills.excluded` configuration for compliance/noise reduction | 🔴 OPEN |
| [#2391](https://github.com/QwenLM/qwen-code/pull/2391) | @kkhomej33-netizen | macOS sandbox fix: allow `/dev/ptmx` and `/dev/ttys*` for interactive PTY workflows | 🟢 CLOSED |

---

## 5. Feature Request Trends

| Theme | Evidence | Momentum |
|-------|----------|----------|
| **Workspace-local / portable configuration** | #2373, #2396, #2368 | High — multi-environment and team workflows driving demand |
| **Checkpoint/rollback mechanisms** | #2262, #100, #1287, #1851 | Resolved for plans (#2157 merged), but code-level `rewind` still gaps vs. Claude Code |
| **System prompt customization** | #2400, #2399 | SDK/CLI parity needed; two competing PRs suggest urgency |
| **Skill invocation hooks & governance** | #1441, #2255, #2363 | Subagent/skill orchestration maturity |
| **Local/self-hosted model support** | #2385 | LM Studio/Ollama integration trending across ecosystem |

---

## 6. Developer Pain Points

| Category | Symptoms | Frequency |
|----------|----------|-----------|
| **VS Code extension stability** | #2382 (broken in 0.12.3), #2395 (input lag), #2401 (Caps Lock freeze), #2301 (encoding loss) | 🔥 Critical cluster — quality regression in IDE channel |
| **Streaming/parser reliability** | #2402, #2404, #2403 — tool calls lost, empty responses, duplicate chunks | 🔥 Active firefight; affects OpenRouter, Gemini |
| **Windows friction** | Slow startup (#2386), CRLF handling (#2277), symlink issues (#2286), terminal input bugs | High — platform-specific polish gaps |
| **Observability & control** | Truncated commands (#1997), no full command visibility, limited checkpointing | Recurring — debugging and safety concerns |
| **Documentation accuracy** | #1981 (stream JSON docs wrong), #2246 (hooks schema mismatch) | Steady — schema/docs drift from implementation |

---

*Digest compiled from github.com/QwenLM/qwen-code — 22 issues, 36 PRs, 1 release in 24h window.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/duanyytop/agents-radar).*