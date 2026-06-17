# AI CLI Tools Community Digest 2026-03-23

> Generated: 2026-03-23 00:10 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Platform Analysis — 2026-03-23

## 1. Ecosystem Overview

The AI CLI tooling landscape has matured into a competitive six-player market with distinct architectural philosophies. **Claude Code** and **OpenAI Codex** lead in enterprise mindshare but struggle with platform-specific reliability, while **Gemini CLI** differentiates through spec-driven development workflows and aggressive evaluation infrastructure. **GitHub Copilot CLI** faces fragmentation challenges against its VS Code sibling, and Chinese-market tools **Kimi CLI** and **Qwen Code** are rapidly closing feature gaps with focused IDE integration investments. **OpenCode** emerges as the most protocol-forward player with ACP standardization, though recent auth regressions threaten momentum. No releases shipped across the entire ecosystem in the last 24 hours, indicating a synchronized development cadence or pre-release stabilization period.

---

## 2. Activity Comparison

| Tool | Issues (24h) | PRs (24h) | Release Status | Community Engagement |
|:---|:---|:---|:---|:---|
| **Claude Code** | 50 | 4 | No release | Very high — #24964 (135 👍), chronic TUX regressions |
| **OpenAI Codex** | ~25 tracked | 25 active | No release | High — LSP integration #8745 (200 👍) dominates |
| **Gemini CLI** | 50 | 50 | No release | Very high — SDD workflow focus, eval infrastructure |
| **GitHub Copilot CLI** | 22 | 0 | No release | Moderate — v1.0.10 reliability crisis emerging |
| **Kimi CLI** | 6 | 6 | No release | Low-moderate — focused on network resilience |
| **Qwen Code** | 4 | 9 | **v0.13.0-nightly** | Moderate — VSCode Companion heavy investment |
| **OpenCode** | 50 | 20+ | **v1.3.0** (GitLab Agent Platform) | High — auth crisis #18342 (37 👍) overshadowing release |

---

## 3. Shared Feature Directions

| Requirement | Tools | Specific Evidence | Strategic Implication |
|:---|:---|:---|:---|
| **LSP/IDE Integration** | Codex (#8745), Gemini (#23464), Qwen (#2593, #2590), Kimi (#1542) | Real-time diagnostics, semantic code intelligence, multi-panel support | CLI tools must become IDE peers, not replacements; "headless IDE" pattern emerging |
| **Session Management & Portability** | Gemini (#23490), Kimi (#1536, #1543), Copilot (#1313, #2209), OpenCode (#13626) | Cross-folder resume, manual titling, branching, Git-backed review | Users treat sessions as durable workspaces; cloud-sync expectations |
| **Sandbox Flexibility** | Claude (#24964, #37578), Codex (#5237, #12572) | External folder access, symlink support, hypervisor opt-out | Security-UX tension unresolved; enterprise adoption blocked on Windows |
| **Network Resilience** | Kimi (#1540, #1544), Claude (#36727), Gemini (#21096) | Streaming retry, backoff, resume on 504/auth failures | Remote/mobile development use cases expanding beyond datacenter |
| **Multi-Account/Tenant Isolation** | Claude (#27302) | Connector-level identity segmentation for agencies/consulting | Enterprise workflows need client isolation; subscription model friction |
| **Agent Orchestration Guardrails** | Claude (#36727), Gemini (#23230, #22933), OpenCode (#18666) | Token limits, loop detection, model switching automation | Unattended automation requires operational safety controls |

---

## 4. Differentiation Analysis

| Dimension | Leader | Distinctive Approach | Trade-offs |
|:---|:---|:---|:---|
| **Workflow Philosophy** | **Gemini CLI** | Spec-Driven Development (SDD): `/plan`, `/spec`, DAG-based task tracking | Higher upfront structure; learning curve vs. freeform chat |
| **Protocol Standardization** | **OpenCode** | ACP (Agent Communication Protocol) implementation; GitLab Agent Platform | Ecosystem bet; integration complexity for non-compliant tools |
| **Enterprise Security** | **Claude Code** | Cowork sandboxing with hypervisor isolation | Windows compatibility sacrificed; restrictive folder access |
| **Evaluation Rigor** | **Gemini CLI** | Behavioral evals for tool selection, task planning, web tool use | Infrastructure overhead; slower feature velocity |
| **IDE Integration Depth** | **Qwen Code** | VSCode Companion with `/insight`, `/export`, agent execution displays | Resource allocation to extension vs. core CLI |
| **Cost Optimization** | **Kimi CLI** | Configurable compaction providers, YOLO mode persistence | Narrower model ecosystem; China-market focus |
| **Cross-Platform Reliability** | **None clearly** | All tools show Windows-specific regressions | Fragmented TUI frameworks; terminal emulator diversity |

**Target User Segmentation:**
- **Gemini CLI**: Methodical engineers, large-scale refactoring, compliance-sensitive orgs
- **Claude Code**: Security-conscious enterprises, existing Anthropic ecosystem users
- **Codex**: OpenAI ecosystem loyalists, ChatGPT workflow bridgers
- **OpenCode**: Protocol-forward developers, GitLab users, multi-agent orchestrators
- **Copilot CLI**: GitHub-centric workflows, existing Copilot subscribers
- **Kimi/Qwen**: Chinese-market developers, cost-sensitive users, VSCode-first workflows

---

## 5. Community Momentum & Maturity

| Tier | Tools | Indicators |
|:---|:---|:---|
| **High Velocity, High Maturity** | **Gemini CLI** | 50 PRs/50 issues, systematic eval infrastructure, SDD workflow depth; P1 priority triage (#21096) |
| **High Velocity, Reliability Debt** | **Claude Code**, **OpenCode** | Chronic unfixed regressions (#1486: 10 months), auth crises (#18315, #18342), but active plugin ecosystem |
| **Moderate Velocity, Feature Catch-Up** | **Codex**, **Qwen Code** | 25 PRs (Codex), VSCode parity sprint (Qwen); LSP integration as competitive response |
| **Emerging, Focused Investment** | **Kimi CLI** | Network resilience and session management; smaller but responsive community |
| **Stagnation Risk** | **Copilot CLI** | Zero PRs in 24h, v1.0.10 reliability crisis, VS Code feature lag; organizational attention split |

**Critical Observation**: Claude Code's #1486 (TUI scroll jumps, 87 👍, 10 months unfixed) and Copilot CLI's clipboard regressions indicate **maturity plateaus** where architectural debt accumulates faster than community tolerance.

---

## 6. Trend Signals

| Signal | Evidence | Developer Value |
|:---|:---|:---|
| **Agentic workflows need operational safety** | Token explosions (#36727), loop bugs (#22933), unbounded tool calls | Implement explicit budgets, circuit breakers, and human-in-the-loop checkpoints before production deployment |
| **Context management is the new scaling bottleneck** | Dynamic truncation (#2572), masking services (#2573), compaction providers (#1549) | Design for 100K+ token sessions with intelligent reclamation; monitor context efficiency metrics |
| **Terminal UX is unexpectedly hard** | Scroll jitter (#1486, #33367), alt-screen clipboard breaks (#2082, #1585), malloc artifacts (#11555) | Budget 20-30% engineering for TUI polish; consider web-based alternatives for complex interactions |
| **Protocol fragmentation vs. consolidation tension** | ACP adoption (OpenCode, Kimi #1542), LSP convergence, MCP ecosystem (#2570) | Bet on standards with multi-vendor support; avoid deep vendor-specific integrations |
| **Windows as second-class platform** | Sandbox failures, PowerShell issues, TUI artifacts across all tools | Linux/WSL2 primary development environment recommended; Windows CI testing essential |
| **Authentication as critical infrastructure** | Token refresh failures (#9634, #18315, #18342, #1547) | Implement graceful degradation, local caching, and clear error messaging; auth outages are workflow-breaking |

---

*Analysis compiled from 2026-03-23 community digests across 7 active AI CLI tools.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data as of 2026-03-23 | Source: anthropics/skills*

---

## 1. Top Skills Ranking (Most-Discussed PRs)

| Rank | Skill | Status | Description | Discussion Focus |
|:---|:---|:---|:---|:---|
| 1 | **[document-typography](https://github.com/anthropics/skills/pull/514)** | 🟡 OPEN | Typographic quality control for AI-generated documents—prevents orphans, widows, and numbering misalignment | Universal pain point; affects every document Claude generates; author notes users rarely ask for good typography but always suffer from bad |
| 2 | **[frontend-design](https://github.com/anthropics/skills/pull/210)** | 🟡 OPEN | Revised skill for actionable, single-conversation frontend design guidance | Clarity vs. verbosity debate; ensuring instructions are executable within token limits |
| 3 | **[skill-quality-analyzer + skill-security-analyzer](https://github.com/anthropics/skills/pull/83)** | 🟡 OPEN | Meta-skills for evaluating Skills across 5 quality dimensions and security posture | Meta-cognitive tooling; addresses need for quality gates in community contributions |
| 4 | **[system-documentation](https://github.com/anthropics/skills/pull/95)** | 🟡 OPEN | Comprehensive evidence management system docs with flowcharts and architecture diagrams | Enterprise traceability needs; compliance-oriented workflows |
| 5 | **[CONTRIBUTING.md](https://github.com/anthropics/skills/pull/509)** | 🟡 OPEN | Community health improvement—addresses 25% GitHub community health score | Governance infrastructure; onboarding friction reduction |
| 6 | **[SAP-RPT-1-OSS](https://github.com/anthropics/skills/pull/181)** | 🟡 OPEN | SAP's open-source tabular foundation model for predictive analytics on business data | Enterprise ERP integration; vertical-specific AI tooling |
| 7 | **[codebase-inventory-audit](https://github.com/anthropics/skills/pull/147)** | 🟡 OPEN | 10-step workflow for identifying orphaned code, unused files, documentation gaps | Technical debt management; single-source-of-truth generation |
| 8 | **[ODT creation/parsing](https://github.com/anthropics/skills/pull/486)** | 🟡 OPEN | OpenDocument text creation, template filling, and ODT-to-HTML parsing | Interoperability with LibreOffice/enterprise document pipelines |

---

## 2. Community Demand Trends (From Issues)

| Trend | Evidence | Implication |
|:---|:---|:---|
| **Memory & Persistence** | [#154](https://github.com/anthropics/skills/issues/154) (shodh-memory), [#629](https://github.com/anthropics/skills/issues/629) (session-memory) | Critical demand for context survival across compaction/restarts; "zero dependencies" is a selling point |
| **Developer Experience Tooling** | [#202](https://github.com/anthropics/skills/issues/202) (skill-creator refactor), [#284](https://github.com/anthropics/skills/issues/284), [#362](https://github.com/anthropics/skills/issues/362) (UTF-8 fixes), [#674](https://github.com/anthropics/skills/issues/674) (design-phase guidance) | Skill-creation infrastructure is immature; community investing heavily in meta-tooling |
| **Trust & Security Boundaries** | [#492](https://github.com/anthropics/skills/issues/492) (namespace impersonation), [#412](https://github.com/anthropics/skills/issues/412) (agent-governance) | Enterprise adoption blocked by trust model; need provenance and policy enforcement |
| **MCP Interoperability** | [#16](https://github.com/anthropics/skills/issues/16) (Expose Skills as MCPs), [#369](https://github.com/anthropics/skills/issues/369) (MCP Apps support) | Skills↔MCP convergence is strategic; protocol-level standardization desired |
| **Obsidian/Second-Brain Integration** | [#664](https://github.com/anthropics/skills/issues/664) (claude-obsidian-reporter) | Personal knowledge management workflows; Git→PKM automation |
| **Evaluation & Testing** | [#556](https://github.com/anthropics/skills/issues/556) (run_eval.py 0% trigger rate) | Skills validation tooling is broken; blocking reliable CI/CD |

---

## 3. High-Potential Pending Skills

| Skill | PR | Why It May Land Soon |
|:---|:---|:---|
| **session-memory** | [#629](https://github.com/anthropics/skills/pull/629) | Addresses [#556](https://github.com/anthropics/skills/issues/556)-adjacent pain; zero-dependency design reduces merge friction; updated March 17 |
| **claude-obsidian-reporter** | [#664](https://github.com/anthropics/skills/pull/664) | Narrow scope, clear I/O contract, active iteration (updated March 22); rides PKM trend |
| **x402 BSV micropayments** | [#374](https://github.com/anthropics/skills/pull/374) | Novel economic primitive; "discover, authenticate, pay from natural language" is differentiated |
| **management-consulting** | [#384](https://github.com/anthropics/skills/pull/384) | Enterprise-ready; structured problem-solving frameworks; updated March 20 |
| **masonry-generate-image-and-videos** | [#335](https://github.com/anthropics/skills/pull/335) | Multimodal generation orchestration; Imagen 3.0 + Veo 3.1 integration; active March 14 |

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is for *reliability infrastructure*—memory that survives context loss, skills that validate themselves, and trust boundaries that enterprises can audit—while the submission pipeline is dominated by *vertical productivity tools* that assume that infrastructure already exists.**

---

*Report generated for technical planning purposes. All links verified against anthropics/skills repository state as of 2026-03-23.*

---

# Claude Code Community Digest — 2026-03-23

## 1. Today's Highlights

The community continues to grapple with **Cowork sandboxing limitations** on Windows, where hypervisor conflicts and restrictive folder permissions are blocking adoption. Meanwhile, **scrolling and TUI stability issues** persist across platforms, with multiple reports of jumpy view behavior during code review sessions. No new releases dropped in the last 24h, but plugin ecosystem activity remains high with three community PRs advancing.

---

## 2. Releases

**No releases in the last 24 hours.**

---

## 3. Hot Issues

| # | Issue | Why It Matters | Community Reaction |
|---|-------|--------------|-------------------|
| [#24964](https://github.com/anthropics/claude-code/issues/24964) | **Cowork folder picker blocks external directories and symlinks** | Critical blocker for developers with projects outside `$HOME` or using junctions/symlinks on Windows/macOS. The sandbox's security model is over-restrictive for real workflows. | 100 comments, 135 👍 — highest engagement this period; users sharing workarounds involving bind mounts |
| [#27302](https://github.com/anthropics/claude-code/issues/27302) | **Multiple Connector accounts per provider** | Enterprise users need separate Slack/GitHub/Jira accounts for different clients/teams. Single-account limitation forces context switching or separate Claude subscriptions. | 65 comments, 84 👍; strong demand from agency/consulting workflows |
| [#1486](https://github.com/anthropics/claude-code/issues/1486) | **TUI jumps to top during code edit review** | Long-standing UX regression breaking the core "review before accept" loop. Affects Windows Terminal and Linux equally. | 30 comments, 87 👍; chronic issue since June 2025 with no fix in sight |
| [#33367](https://github.com/anthropics/claude-code/issues/33367) | **Scroll jitter when streaming + scrolling up** | Related to #1486 — active streaming corrupts scroll position, making conversation history unreadable. Regressed recently per reporter. | 22 comments, 47 👍; "introduced a bug" suggests recent regression |
| [#21236](https://github.com/anthropics/claude-code/issues/21236) | **Disable automatic git worktree creation** | Task tool's forced worktrees clutter repos and break workflows expecting in-place edits. Users want opt-out or branch naming control. | 8 comments, 22 👍; medium priority label applied |
| [#37559](https://github.com/anthropics/claude-code/issues/37559) | **Hook documentation misleading, Stop hooks broken** | 15+ hours of developer effort wasted on undocumented limitations. Stop hooks don't work; prompt hooks can't inject context. | 2 comments but high signal — documentation trust erosion |
| [#37578](https://github.com/anthropics/claude-code/issues/37578) | **Cowork HYPERVISOR_SERVICE_ERROR on ASUS ROG / i7-10700K** | Hardware-specific virtualization conflict; `bcdedit hypervisorlaunchtype auto` causes boot freeze. Shows Cowork's hypervisor requirements are incompatible with some gaming/workstation setups. | 2 comments; niche but severe when hit |
| [#34622](https://github.com/anthropics/claude-code/issues/34622) | **Malware campaign via Google Ads impersonating Claude Code** | Active security threat targeting new users. Fake install page distributes macOS credential stealer. | 3 comments; needs Anthropic security response and takedown |
| [#36727](https://github.com/anthropics/claude-code/issues/36727) | **Sub-agent unbounded tool calls causing token explosions** | Cost control failure — single sub-agent consumed 1.5M tokens in loop with no limits. Core agent orchestration gap. | 2 comments, 1 👍; under-discussed given financial impact |
| [#37595](https://github.com/anthropics/claude-code/issues/37595) | **`/export` silently overwrites files** | Data loss risk. No confirmation prompt before destroying existing exports. | 2 comments; safety-critical UX gap |

---

## 4. Key PR Progress

| # | PR | Description | Status |
|---|-----|-------------|--------|
| [#37082](https://github.com/anthropics/claude-code/pull/37082) | **agentmarkup plugin: AI-readable website metadata** | Auto-detects framework, guides setup of `llms.txt`, JSON-LD, markdown mirrors, and crawler directives. Auto-triggers on web project detection. | Open, awaiting review |
| [#35710](https://github.com/anthropics/claude-code/pull/35710) | **tool-mutex plugin: Fix Windows BSOD (Wof.sys)** | Critical fix for parallel `fs` enumeration causing `NtQueryDirectoryFileEx` syscall storms. Adds concurrency limiting to prevent driver-level crash. | Open, marked critical |
| [#36253](https://github.com/anthropics/claude-code/pull/36253) | **Hook examples: file guard, session primer, notifications** | Documentation/examples for hook system — addresses gap noted in #37559 where hooks are under-documented. | Open |
| [#37241](https://github.com/anthropics/claude-code/pull/37241) | **agents-md plugin: Auto-load AGENTS.md** | Cross-tool compatibility with Cursor/Codex/Amp conventions. Solves #6235 (246 comments). Auto-loads project instructions at session start. | **Closed** — not merged |

---

## 5. Feature Request Trends

| Trend | Evidence | Implication |
|-------|----------|-------------|
| **Cowork sandbox flexibility** | #24964, #37578, #21236 | Users want security boundaries without breaking legitimate workflows: external folders, symlinks, hypervisor opt-out |
| **Multi-account/tenant isolation** | #27302 (Connectors), #37071 (Teams channels) | Enterprise/agency use cases need identity segmentation per project |
| **Agent/sub-agent guardrails** | #36727 (token limits), #28765 (push notifications) | Unattended automation needs cost controls and completion signaling |
| **TUI/UX stability** | #1486, #33367, #32467 | Scrolling and terminal state management remain fragile |
| **Hook system maturity** | #37559, #36253 | Demand for reliable lifecycle interception with documented capabilities |

---

## 6. Developer Pain Points

| Pain Point | Frequency | Impact |
|------------|-----------|--------|
| **Cowork sandbox too restrictive** | High (#24964, #37578, #37273) | Blocks Windows adoption; folder/symlink limitations force workarounds |
| **Scroll/view instability** | Chronic (#1486, #33367, #32467) | Breaks code review trust; "jumps to top" is a 10-month unfixed regression |
| **Rate limit opacity** | Recurring (#34413, #37594) | "Rate limit reached" with no diagnostic data — users cannot self-resolve |
| **Hook documentation/behavior gaps** | Emerging (#37559) | Wasted implementation effort; Stop hooks non-functional |
| **Silent destructive operations** | Sporadic (#37595) | `/export` overwrite without confirmation; data loss risk |
| **Plugin/MCP lifecycle bugs** | Moderate (#35641, #37026, #37601) | `/reload-plugins` fails; VS Code per-tab MCP spawning; Chrome extension connection drops |

---

*Digest compiled from 50 issues and 4 PRs updated 2026-03-22 to 2026-03-23.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-03-23

## Today's Highlights

The Codex team shipped no new release in the past 24 hours, but development velocity remains high with 25 active PRs touching core execution policy, TUI reliability, and context management. Community attention is heavily concentrated on LSP integration (#8745), which has accumulated 200 upvotes and 41 comments, and ongoing auth token refresh failures (#9634) affecting Pro users. Windows and Linux sandboxing issues continue to generate security-focused discussion.

---

## Releases

*No releases in the last 24 hours.*

---

## Hot Issues

| # | Issue | Why It Matters | Community Reaction |
|---|-------|--------------|-------------------|
| [#8745](https://github.com/openai/codex/issues/8745) | LSP integration (auto-detect + auto-install) for Codex CLI | Would elevate Codex from code generator to intelligent IDE by giving it real-time diagnostics and symbol intelligence. Represents a major architectural expansion. | 200 👍, 41 comments; widely viewed as table-stakes for competing with Claude Code |
| [#9634](https://github.com/openai/codex/issues/9634) | "Your access token could not be refreshed" — refresh token already used | Breaking auth flow for Pro subscribers; forces repeated re-authentication and interrupts workflows. | 32 comments, only 4 👍 suggests frustration rather than feature enthusiasm; needs urgent fix |
| [#2153](https://github.com/openai/codex/issues/2153) | ChatGPT integration — bidirectional session handoff | Bridges the gap between exploratory research in ChatGPT (web search, UI) and execution in Codex CLI. | 94 👍, 27 comments; long-standing request showing persistent demand for unified OpenAI ecosystem |
| [#5237](https://github.com/openai/codex/issues/5237) | **CLOSED** — Codex reads files outside working directory without permission | Security boundary violation; sandbox escape via file system traversal. Resolution confirms fix but raises trust questions. | 25 comments, 16 👍; closed status provides relief, though verification requested |
| [#12661](https://github.com/openai/codex/issues/12661) | Markdown file:// links open in Edge instead of VS Code editor | Breaks internal navigation workflow on Windows; forces context switch to browser. | 28 👍, 24 comments; Windows-specific friction point in extension UX |
| [#10901](https://github.com/openai/codex/issues/10901) | Codex' responses in CLI TUI are cut off | Rendering regression in v0.98.0 corrupts output readability; affects trust in generated code. | 17 👍, 15 comments; regression tag signals priority |
| [#12241](https://github.com/openai/codex/issues/12241) | Failed to apply patch constantly | Core editing functionality unreliable; "CONSTANTLY" in report indicates severity. | Only 2 👍 but 13 comments suggest active troubleshooting; impacts productivity |
| [#2932](https://github.com/openai/codex/issues/2932) | **CLOSED** — Add support to view diffs in VS Code diff viewer | Improves code review ergonomics vs. inline sidebar diff. | 20 👍, 12 comments; closed with implementation |
| [#14757](https://github.com/openai/codex/issues/14757) | **CLOSED** — "Model metadata for `gpt-oss:20b` not found" with ollama | Local/self-hosted model support friction; metadata registry gaps. | 7 comments, resolved for this model but pattern concerns remain |
| [#11555](https://github.com/openai/codex/issues/11555) | TUI composer auto-fills with `codex(pid) MallocSt...` | Bizarre memory-debugging artifact leaking into user input; suggests build configuration issue. | 7 comments, 4 👍; quirky but erodes confidence |

---

## Key PR Progress

| # | PR | Description | Significance |
|---|-----|-------------|------------|
| [#15465](https://github.com/openai/codex/pull/15465) | CodeMode: Manage turn worker shutdown | Ensures single turn worker execution, prevents race conditions in concurrent operations | Core reliability; addresses resource contention |
| [#15443](https://github.com/openai/codex/pull/15443) | core: snapshot fork startup context injection | Adds test coverage for fork startup + first-turn diff injection without changing runtime | Stability through verification; prepares for future refactoring |
| [#15442](https://github.com/openai/codex/pull/15442) | **CLOSED** — core: defer fork context injection to first turn | Eliminated duplicate context on fork startup; cleaner initialization sequence | Architectural cleanup; merged then refined |
| [#15473](https://github.com/openai/codex/pull/15473) | Add exec approval app-server support | End-to-end execution approval flow for app-server deployment | Security/compliance feature for enterprise |
| [#15472](https://github.com/openai/codex/pull/15472) | Add exec approval profile persistence core support | Persistent execution policy profiles across sessions | User experience continuity for approval workflows |
| [#15471](https://github.com/openai/codex/pull/15471) | Add request_permissions UI support | User-facing permission request interface | Completes exec approval UX stack |
| [#15470](https://github.com/openai/codex/pull/15470) | Add request_permissions profile persistence core support | Backend persistence for permission preferences | Infrastructure for above |
| [#14835](https://github.com/openai/codex/pull/14835) | tui: centralize slash command serialization | Refactors slash command handling across TUI and app-server | Code health; reduces duplication, prevents drift |
| [#15312](https://github.com/openai/codex/pull/15312) | fix(tui): restore clean agent thread replay and streaming | Fixes corruption in thread replay and markdown streaming | Addresses #10901 and related rendering issues |
| [#15459](https://github.com/openai/codex/pull/15459) | code-mode: Idiomatic built-in callbacks | Rust-idiomatic callback machinery with proper error handling | Developer experience; cleaner extension API |

---

## Feature Request Trends

1. **IDE Integration Depth** — LSP support (#8745), VS Code diff viewer (#2932), and ChatGPT handoff (#2153) show demand for Codex to operate as a peer to established development environments rather than a standalone tool.

2. **Sandbox & Security Hardening** — Multiple issues around file system boundaries (#5237, #12343), repository visibility defaults (#15476), and execution approval flows (PR #15470-15473) indicate enterprise readiness is a priority.

3. **Cross-Platform Polish** — Windows-specific issues dominate reliability complaints: PowerShell prefix handling (#8537), file associations (#12661), sandbox permissions (#12343), and TUI log mixing (#15457). Linux sandboxing with bubblewrap (#12572) also needs attention.

4. **Output & Interaction Quality** — Copy-paste ergonomics (#8258, #12200), TUI rendering (#10901, #15449), and response formatting are recurring friction points suggesting the terminal interface needs systematic refinement.

---

## Developer Pain Points

| Category | Manifestation | Frequency Indicator |
|----------|-------------|---------------------|
| **Authentication Reliability** | Token refresh failures (#9634), session persistence issues | High — affects paid Pro users, interrupts workflows |
| **Patch/Edit Application Failures** | "Failed to apply patch" (#12241), tool call errors | High — core functionality degradation |
| **Windows Second-Class Experience** | Sandbox misconfigurations, TUI artifacts, file handling | Very high — disproportionate issue volume |
| **Context/State Management** | Symlinked workspace thread loss (#15448), popup window regression (#15162) | Medium — data loss concerns |
| **Observability & Debugging** | Silent failures (#15477), malloc strings in UI (#11555), unselectable version text (#15450) | Medium — erodes trust, complicates bug reporting |
| **Rate Limiting Transparency** | "High demand" errors during compaction (#15105), quota display mismatches (#15477) | Medium — operational uncertainty for API users |

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-03-23

## Today's Highlights
The team is heavily focused on **SDD (Spec-Driven Development) workflow hardening**, with multiple issues tracking task integration, memory routing, and model switching refinements. **Evaluation infrastructure** is also getting attention, with several PRs adding behavioral evals for tool selection and task planning. Meanwhile, **LSP integration** and **global session resume** capabilities signal significant UX improvements on the horizon.

---

## Releases
*No releases in the last 24 hours.*

---

## Hot Issues

| # | Issue | Why It Matters | Reaction |
|---|-------|--------------|----------|
| [#21096](https://github.com/google-gemini/gemini-cli/issues/21096) | Request stuck with "still on it" after canceling | **P1 priority** — core reliability issue on Android/Termux where cancel operations don't properly reset UI state | 37 comments, 13 👍; active community debugging |
| [#23316](https://github.com/google-gemini/gemini-cli/issues/23316) | Long-Context & Complex Reasoning Coding Evaluation Dataset | Proposes next-gen benchmark as SWE-bench saturates; signals Google's eval strategy evolution | 25 comments, 5 👍; maintainer-only discussion |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | AST-aware file reads, search, and mapping | **EPIC** — could dramatically reduce token waste and misaligned reads via precise method-boundary extraction | 4 comments; linked to [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) for tooling |
| [#22855](https://github.com/google-gemini/gemini-cli/issues/22855) | Support passing prompt to `/plan` | UX friction: plan mode requires multi-step interaction when single-command entry should suffice | 2 comments, 2 👍; straightforward enhancement |
| [#22822](https://github.com/google-gemini/gemini-cli/issues/22822) | Refine `/spec setup` for existing `/conductor` migration | **Breaking change handling** — needs graceful migration path from deprecated conductor directory | 2 comments; SDD workflow continuity |
| [#22819](https://github.com/google-gemini/gemini-cli/issues/22819) | Memory routing: global vs. project | Critical for personalization at scale — distinguishes user preferences (`~/.gemini/`) from codebase-specific context (`.gemini/`) | 1 comment, 1 👍; foundational architecture |
| [#23230](https://github.com/google-gemini/gemini-cli/issues/23230) | Exiting plan mode doesn't switch model | Model switching automation failing; Flash fallback for execution phase not triggering reliably | 1 comment, 1 👍; cost/performance impact |
| [#22933](https://github.com/google-gemini/gemini-cli/issues/22933) | Fix the loop problem | Agent stuck in circular reasoning on file path resolution — classic agentic failure mode | 1 comment, 1 👍; needs root cause analysis |
| [#22809](https://github.com/google-gemini/gemini-cli/issues/22809) | Tune main agent prompt for proactive memory writes | Addresses discoverability gap — agents don't know *when* to persist user preferences | 1 comment, 1 👍; UX personalization |
| [#23245](https://github.com/google-gemini/gemini-cli/issues/23245) | Context-Aware Persistent Policy Approvals | **Security/UX tension** — "Allow for all future sessions" currently undermines Plan Mode integrity by being too permissive | 0 comments; enterprise-relevant |

---

## Key PR Progress

| # | PR | Feature/Fix | Significance |
|---|-----|-------------|------------|
| [#23464](https://github.com/google-gemini/gemini-cli/pull/23464) | Standalone LSP integration | Compiler diagnostics + semantic queries without IDE dependency | Major DX upgrade for headless/remote workflows |
| [#23490](https://github.com/google-gemini/gemini-cli/pull/23490) | Global cross-folder session resume | `gemini --resume <session-id>` works anywhere, not just original project | Addresses portability pain point |
| [#23493](https://github.com/google-gemini/gemini-cli/pull/23493) | Refresh OAuth-backed HTTP MCP sessions | Fixes token expiry mid-chat for MCP servers | Reliability fix for integration-heavy workflows |
| [#23487](https://github.com/google-gemini/gemini-cli/pull/23487) | UX Extension | Team-internal automation for TUI standards enforcement | Signals investment in UI quality guardrails |
| [#23161](https://github.com/google-gemini/gemini-cli/pull/23161) | Subagent tool updates apply config overrides immediately | Fixes hot-reload gaps in `agents.overrides` | Dynamic configuration correctness |
| [#23415](https://github.com/google-gemini/gemini-cli/pull/23415) | Behavioral evals for web tool selection | Regression testing for agent tool-use decisions | Eval infrastructure expansion |
| [#23416](https://github.com/google-gemini/gemini-cli/pull/23416) | Behavioral evals for tool selection decisions | Broader tool-choice coverage | Companion to #23415 |
| [#23418](https://github.com/google-gemini/gemini-cli/pull/23418) | Behavioral eval for `write_todos` task planning | Task decomposition quality metrics | SDD workflow validation |
| [#23482](https://github.com/google-gemini/gemini-cli/pull/23482) | Replace MessageBus payload dump with debug summary | Fixes `--debug` noise explosion with hooks | Developer experience cleanup |
| [#23187](https://github.com/google-gemini/gemini-cli/pull/23187) | Accurately reflect subagent tool failure in UI | Shell non-zero exits now show red X, not green check | Correctness in failure visualization |

---

## Feature Request Trends

| Direction | Evidence | Momentum |
|-----------|----------|----------|
| **SDD/Task System Maturation** | [#22822](https://github.com/google-gemini/gemini-cli/issues/22822), [#23320](https://github.com/google-gemini/gemini-cli/issues/23320), [#23131](https://github.com/google-gemini/gemini-cli/issues/23131), [#23129](https://github.com/google-gemini/gemini-cli/issues/23129), [#23130](https://github.com/google-gemini/gemini-cli/issues/23130) | Very High — DAG-based task tracking replacing Markdown checklists |
| **Memory & Personalization** | [#22819](https://github.com/google-gemini/gemini-cli/issues/22819), [#22809](https://github.com/google-gemini/gemini-cli/issues/22809) | High — explicit memory routing architecture |
| **AST-Aware Code Intelligence** | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#23464](https://github.com/google-gemini/gemini-cli/pull/23464) | High — precision tooling over fuzzy search |
| **Evaluation Infrastructure** | [#23316](https://github.com/google-gemini/gemini-cli/issues/23316), [#23166](https://github.com/google-gemini/gemini-cli/issues/23166), [#23167](https://github.com/google-gemini/gemini-cli/issues/23167), [#23169](https://github.com/google-gemini/gemini-cli/issues/23169), [#23415-23418](https://github.com/google-gemini/gemini-cli/pulls?q=is%3Apr+is%3Aopen+behavioral+eval) | Very High — PR-level eval feedback, benchmark evolution |
| **Cross-Session Portability** | [#23490](https://github.com/google-gemini/gemini-cli/pull/23490) | Medium — session resume beyond project boundaries |

---

## Developer Pain Points

| Issue | Frequency/Impact | Status |
|-------|---------------|--------|
| **Plan/Execution mode transitions** | Multiple reports: model switching fails ([#23230](https://github.com/google-gemini/gemini-cli/issues/23230)), UI options truncated ([#23271](https://github.com/google-gemini/gemini-cli/issues/23271)), loop bugs ([#22933](https://github.com/google-gemini/gemini-cli/issues/22933)) | Active workstream |
| **OAuth/MCP session expiry** | Token refresh gaps in long-running chats | [Fix in review](https://github.com/google-gemini/gemini-cli/pull/23493) |
| **Subagent configuration propagation** | Overrides not applying dynamically, failures misreported | [Partially fixed](https://github.com/google-gemini/gemini-cli/pull/23161), [UI fix pending](https://github.com/google-gemini/gemini-cli/pull/23187) |
| **Extension/startup noise** | Duplicate warnings, debug log pollution | [Multiple](https://github.com/google-gemini/gemini-cli/pull/23477) [PRs](https://github.com/google-gemini/gemini-cli/pull/23470) [addressing](https://github.com/google-gemini/gemini-cli/pull/23478) |
| **Eval reliability** | 500s blocking PRs, "bleeding" small project evals | [Workaround needed](https://github.com/google-gemini/gemini-cli/issues/23168), [stabilization EPIC](https://github.com/google-gemini/gemini-cli/issues/23166) |
| **Android/Termux support gaps** | Cancel operation reliability ([#21096](https://github.com/google-gemini/gemini-cli/issues/21096)) | P1 priority, community-engaged |
| **npm global install request** | [#19757](https://github.com/google-gemini/gemini-cli/issues/19757) — minimal detail but recurring ask | Awaiting triage |

---

*Digest compiled from 50 issues and 50 PRs updated 2026-03-22.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-03-23

---

## 1. Today's Highlights

No new releases dropped in the last 24 hours, but community activity remains intense with **22 active issues** spanning critical UX regressions, API reliability problems, and emerging feature gaps. The most pressing concerns center on **clipboard functionality breaking across platforms**, **transient API errors blocking file operations**, and **model availability inconsistencies** between VS Code Copilot and the CLI.

---

## 2. Releases

*No releases in the last 24 hours.*

---

## 3. Hot Issues

| Issue | Why It Matters | Community Reaction |
|-------|--------------|-------------------|
| [#1703](https://github.com/github/copilot-cli/issues/1703) Copilot CLI does not list all org-enabled models (e.g. Gemini 3.1 Pro) while VS Code Copilot does | **Enterprise blocker**: Organizations paying for premium models can't access them in CLI despite identical auth. Creates workflow fragmentation. | 20 👍, 12 comments — highest engagement; users confirming cross-platform inconsistency |
| [#2082](https://github.com/github/copilot-cli/issues/2082) ctrl+shift+c no longer copies to clipboard on Linux | **Daily workflow breakage**: Standard Linux terminal shortcut overridden by TUI changes. Affects Ubuntu 24.04 users specifically. | 2 👍, 9 comments; workaround discovered (ctrl+c, right-click) but friction acknowledged |
| [#1585](https://github.com/github/copilot-cli/issues/1585) [macOS] Cmd+C copy broken after alt-screen enabled by default for --experimental users | **Platform parity issue**: macOS users hit identical clipboard problem as Linux users. `--experimental` flag now carries unexpected UX cost. | 6 👍, 4 comments; users questioning alt-screen default |
| [#2189](https://github.com/github/copilot-cli/issues/2189) Request failed due to transient API error with Claude Opus 4.6 | **Reliability crisis**: Premium model users experiencing blocking failures during file write operations. Suggests backend instability. | 3 👍, 3 comments; pattern emerging with similar reports |
| [#2214](https://github.com/github/copilot-cli/issues/2214) Copilot CLI 1.0.10 not able to CREATE or EDIT files — transient API error | **Critical functionality loss**: File I/O completely blocked for some users. Same error pattern as #2189 but more severe scope. | Fresh report (0 👍), likely underreported due to recency |
| [#2209](https://github.com/github/copilot-cli/issues/2209) Long-lived session shows as corrupted on resume despite valid events.jsonl | **Data integrity concern**: Heavy users (204+ premium requests) losing session state. File validation passes but CLI rejects it. | Fresh report; suggests serialization edge case |
| [#2218](https://github.com/github/copilot-cli/issues/2218) Copying text gets hidden unicode byte order mark prepended, breaking commands | **Silent failure mode**: Copied commands fail when pasted due to invisible BOM. Extremely frustrating debugging experience. | Fresh report; likely affects many users undiagnosed |
| [#2217](https://github.com/github/copilot-cli/issues/2217) Needs better crash recovery — trailing null bytes in events.jsonl | **Resilience gap**: Abnormal terminations corrupt session files. WSL2 environment specifically mentioned. | Fresh report; pairs with #2209 on session reliability |
| [#1276](https://github.com/github/copilot-cli/issues/1276) Support pasting images from system clipboard into prompts | **Feature gap vs. competitors**: Multimodal workflows blocked. Screenshots of bugs/logs common in developer workflows. | 4 👍, 5 comments; persistent request since February |
| [#1313](https://github.com/github/copilot-cli/issues/1313) Session Branching | **Workflow enhancement**: Users want to explore alternative approaches without losing conversation history. Comparable to Git branching mental model. | 5 👍, 4 comments; niche but strongly supported |

---

## 4. Key PR Progress

*No pull requests updated in the last 24 hours.*

---

## 5. Feature Request Trends

| Trend | Evidence | Implications |
|-------|----------|------------|
| **Persistent configuration** | [#2212](https://github.com/github/copilot-cli/issues/2212) (default custom agent), [#2213](https://github.com/github/copilot-cli/issues/2213) (Copilot instructions setup) | Users want CLI to remember preferences across sessions, not require flags every launch |
| **Multimodal input** | [#1276](https://github.com/github/copilot-cli/issues/1276) (image paste) | Visual context increasingly expected; CLI lags behind GUI tools |
| **Session management sophistication** | [#1313](https://github.com/github/copilot-cli/issues/1313) (branching), [#2209](https://github.com/github/copilot-cli/issues/2209), [#2217](https://github.com/github/copilot-cli/issues/2217) (reliability) | Users treating CLI sessions as durable workspaces, not ephemeral chats |
| **Agent ecosystem maturity** | [#2211](https://github.com/github/copilot-cli/issues/2211) (excludeAgent for subagents), [#2210](https://github.com/github/copilot-cli/issues/2210) (hook merging), [#2212](https://github.com/github/copilot-cli/issues/2212) (custom agent defaults) | Plugin architecture needs refinement for composability |

---

## 6. Developer Pain Points

| Pain Point | Frequency | Severity | Root Cause |
|------------|-----------|----------|------------|
| **Clipboard/copy-paste regressions** | High (3+ issues: #2082, #1585, #2218) | Critical | TUI alt-screen mode changes overriding native terminal behavior |
| **Transient API errors blocking operations** | High (#2189, #2214) | Critical | Backend instability with Claude Opus 4.6; retry logic insufficient |
| **Session corruption / poor recovery** | Medium (#2209, #2217) | High | File serialization fragile to crashes; null bytes not handled |
| **Model availability inconsistency** | Medium (#1703, #2045) | High | CLI model list not syncing with organization settings / VS Code |
| **Extension hook composability** | Low (#2210) | Medium | Architecture bug: hooks replaced rather than merged |
| **Visual accessibility** | Low (#2216) | Low-Medium | Selection contrast insufficient on dark backgrounds |

**Emerging pattern**: The v1.0.10 release appears to have introduced or exacerbated **API reliability issues** and **clipboard regressions** that are collectively degrading core user workflows. The concentration of "transient API error" reports suggests either backend capacity issues with new models or client-side retry logic that fails to gracefully degrade.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-03-23

## Today's Highlights

The community is actively addressing network resilience and session management gaps, with two significant PRs landing to fix streaming retry logic and add manual session titling. YOLO mode persistence emerges as a recurring theme across both issues and merged contributions. No new release was cut in the last 24 hours.

---

## Releases

*No releases published in the last 24 hours.*

---

## Hot Issues

| # | Title | Why It Matters | Community Signal |
|---|-------|--------------|------------------|
| [#1540](https://github.com/MoonshotAI/kimi-cli/issues/1540) | Generation terminates on unstable networks instead of retrying/resuming | Critical for remote/mobile developers; complete session loss on transient failures is a workflow breaker | 2 comments, Linux user on SteamOS—suggests gaming/embedded dev use case |
| [#1548](https://github.com/MoonshotAI/kimi-cli/issues/1548) | Model performance degradation in recent update | Quality regression in v1.24.0 affects trust in point releases | Fresh report, awaiting maintainer response |
| [#1547](https://github.com/MoonshotAI/kimi-cli/issues/1547) | Repeated "Authorization failed" errors mid-generation | Auth state inconsistency during streaming breaks long-running tasks | No comments yet—potential widespread impact if confirmed |
| [#1542](https://github.com/MoonshotAI/kimi-cli/issues/1542) | ACP/Zed UX gaps: missing YOLO mode & silent API failures | Editor integration parity with Claude Code; ACP protocol completeness | Cross-tool comparison signals competitive pressure |
| [#1536](https://github.com/MoonshotAI/kimi-cli/issues/1536) | Feature Request: Add `/title` command | Auto-generated titles fail for complex multi-topic sessions; basic UX gap | 1 comment, clear user story |
| [#1541](https://github.com/MoonshotAI/kimi-cli/issues/1541) | Can YOLO mode data be persisted locally? | Daily friction for power users; configuration state management | Zero engagement yet—opportunity for quick win |

---

## Key PR Progress

| # | Title | What It Does | Status |
|---|-------|------------|--------|
| [#1545](https://github.com/MoonshotAI/kimi-cli/pull/1545) | fix(keyboard): clear ISIG/IEXTEN in raw mode to prevent SIGTSTP suspension | Resolves 2-month-old #38 where Ctrl+Z couldn't suspend kimi-cli; fixes interruptibility in `_LiveView` flows | Open, fresh |
| [#1549](https://github.com/MoonshotAI/kimi-cli/pull/1549) | feat(plugin): add configurable compaction providers | Adds `loop_control.compaction_model` and `compaction_provider` config—allows dedicated cheaper models for context compression | Open, architectural |
| [#1544](https://github.com/MoonshotAI/kimi-cli/pull/1544) | fix: retry on protocol errors and 504 during streaming | Implements resilient streaming with backoff; directly addresses #1540's network fragility | Open, high-impact |
| [#1543](https://github.com/MoonshotAI/kimi-cli/pull/1543) | feat(shell): add `/title` slash command | Manual session renaming with persistence via `SessionState.custom_title`; implements #1536 | Open, UX-focused |
| [#1376](https://github.com/MoonshotAI/kimi-cli/pull/1376) | feat: add --sessions/--list-sessions CLI options & fix CJK shorten | Interactive session picker + proper CJK character handling in truncated titles | Open, 13 days old, needs review |
| [#1131](https://github.com/MoonshotAI/kimi-cli/pull/1131) | feat: add AgentHooks support for dogfooding | Infrastructure for security/quality hooks (`block-dangerous-commands`, `enforce-tests`); extensibility foundation | **Closed** 2026-03-22 |
| [#1525](https://github.com/MoonshotAI/kimi-cli/pull/1525) | feat: add yolo mode option in approval dialog | Adds "Approve all (enable yolo mode)" to permission prompts; merged satisfaction of #1414 | **Closed** 2026-03-22 |

---

## Feature Request Trends

1. **Session State Persistence** — YOLO mode settings (#1541) and custom titles (#1536 → #1543) both demand durable user preferences across restarts
2. **Network Resilience** — Retry/resume logic for streaming (#1540, #1544) indicates CLI usage expanding beyond stable datacenter environments
3. **Editor Integration Parity** — ACP protocol gaps (#1542) show users comparing kimi-cli against Claude Code in IDE workflows
4. **Context Cost Optimization** — Configurable compaction providers (#1549) reflects operational cost consciousness at scale

---

## Developer Pain Points

| Pain Point | Evidence | Severity |
|-----------|----------|----------|
| **Streaming fragility on unstable networks** | #1540, #1544, #1547 | High — workflow-terminating |
| **YOLO mode configuration churn** | #1541, #1525 (just merged), #1542 | Medium — daily friction |
| **Opaque auth failures mid-generation** | #1547 | High — breaks long tasks |
| **Session discoverability** | #1376, #1536 | Medium — navigation overhead |
| **Performance regression tracking** | #1548 | TBD — quality perception risk |

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-03-23

---

## 1. Today's Highlights

OpenCode v1.3.0 shipped with major GitLab Agent Platform support and Git-backed Session Review, while the community grapples with widespread Claude Pro/Max authentication failures that started March 17. The ACP (Agent Communication Protocol) implementation continues to mature with critical fixes for notification ordering, and contributor activity remains strong with 20+ PRs touching everything from TUI polish to OpenTelemetry integration.

---

## 2. Releases

### [v1.3.0](https://github.com/anomalyco/opencode/releases/tag/v1.3.0)

| Feature | Description |
|--------|-------------|
| **GitLab Agent Platform** (#18014) | Full support for GitLab-hosted agents with automatic workflow model discovery via WebSocket; local tools (file I/O, shell) now work remotely |
| **Git-backed Session Review** | Sessions can now be reviewed and audited through Git-based workflows |

---

## 3. Hot Issues

| # | Issue | Why It Matters | Community Reaction |
|---|-------|--------------|------------------|
| [#3472](https://github.com/anomalyco/opencode/issues/3472) | Context awareness not working in VS Code extension | Core value proposition questioned—users expect selection-to-agent context flow | 29 comments, 18 👍; documentation gap confirmed |
| [#4672](https://github.com/anomalyco/opencode/issues/4672) | GitHub Agent stuck at "Sending Message" | Blocks entire GitHub Copilot-style workflow | 17 comments, no resolution |
| [#18315](https://github.com/anomalyco/opencode/issues/18315) | Claude Pro/Max auth: "Invalid token" | **Critical regression** since March 20; OAuth refresh broken | 17 comments, 28 👍; multiple workarounds failed |
| [#18342](https://github.com/anomalyco/opencode/issues/18342) | Claude Pro/Max: "INVALID CODE" on paste | Companion auth flow failure, affects same user cohort | 16 comments, 37 👍; highest engagement |
| [#17910](https://github.com/anomalyco/opencode/issues/17910) | OAuth + `cache_control` ephemeral = HTTP 400 on all Claude models | Root cause identified: `@ai-sdk/anthropic` unconditionally injects unsupported parameter | 8 comments; community-provided RCA |
| [#12405](https://github.com/anomalyco/opencode/issues/12405) | Windows: "Connection reset by server" with ZHIPU GLM4.7 | Proxy + Windows-specific networking stack issue | 13 comments; needs repro |
| [#10616](https://github.com/anomalyco/opencode/issues/10616) | `tool_use` IDs without matching `tool_result` blocks | Anthropic API contract violation in message construction | 10 comments; SDK-level bug |
| [#17505](https://github.com/anomalyco/opencode/issues/17505) | ACP `session/update` notifications arrive after `end_turn` | **Protocol compliance issue** breaking Fabriqa integration | 4 comments; spec violation |
| [#16269](https://github.com/anomalyco/opencode/issues/16269) | bash-language-server memory explosion via `--external-sources` | Performance killer on large shellcodebases; unbounded ShellCheck AST growth | 4 comments; needs architectural fix |
| [#18552](https://github.com/anomalyco/opencode/issues/18552) | Cloudflare Workers AI routing failure | `${CLOUDFLARE_ACCOUNT_ID}` literal not interpolated in URL template | 4 comments; config parsing bug |

---

## 4. Key PR Progress

| # | PR | What It Does | Status |
|---|-----|-------------|--------|
| [#18670](https://github.com/anomalyco/opencode/pull/18670) | Fix symlink-loop recursion in skill discovery | Prevents infinite hangs when external skills contain circular symlinks | Open |
| [#18679](https://github.com/anomalyco/opencode/pull/18679) | Effectify Worktree service | Migrates git operations to Effect-TS pattern with proper resource management | Open, Vouched |
| [#17712](https://github.com/anomalyco/opencode/pull/17712) | Drop empty content after reasoning filter | Fixes message normalization bug breaking Claude responses | Open |
| [#18678](https://github.com/anomalyco/opencode/pull/18678) | Keep patch tool counts visible with long filenames | TUI polish: prevents layout overflow in file diff views | Open, Vouched |
| [#5422](https://github.com/anomalyco/opencode/pull/5422) | Provider-specific cache configuration | **Major optimization**: 2-3x token reduction for Claude Opus 4.5 via intelligent caching | Open, significant |
| [#5266](https://github.com/anomalyco/opencode/pull/5266) | Stop ripgrep early + ignore heavy dirs | Performance: caps file listing CPU, ignores `node_modules`/`.venv` by default | Open |
| [#5245](https://github.com/anomalyco/opencode/pull/5245) | OpenTelemetry integration | Observability foundation for production deployments | Open |
| [#5092](https://github.com/anomalyco/opencode/pull/5092) | `{env:VAR}` support in agent frontmatter | Dynamic model selection via environment variables in markdown agents | Open |
| [#4898](https://github.com/anomalyco/opencode/pull/4898) | Search in session messages (`Ctrl+F`) | TUX gap fill: find text in conversation history | Open |
| [#4865](https://github.com/anomalyco/opencode/pull/4865) | Subagents sidebar with navigation | Hierarchical session management: click subagents, `<leader>+Up` to parent | Open |

---

## 5. Feature Request Trends

| Theme | Evidence | Momentum |
|-------|----------|----------|
| **Interactive shell/sudo support** | [#3228](https://github.com/anomalyco/opencode/issues/3228), [#9808](https://github.com/anomalyco/opencode/issues/9808), [#18659](https://github.com/anomalyco/opencode/issues/18659) | High—3 related requests spanning 5 months |
| **Dynamic model routing** | [#18666](https://github.com/anomalyco/opencode/issues/18666), [#18644](https://github.com/anomalyco/opencode/issues/18644) | New—plugin ecosystem wants runtime model switching |
| **Web UI project sync** | [#13626](https://github.com/anomalyco/opencode/issues/13626), [#14656](https://github.com/anomalyco/opencode/issues/14656), [#9541](https://github.com/anomalyco/opencode/issues/9541) | Steady—cross-device workspace continuity |
| **Automated iteration (`/loop`)** | [#18001](https://github.com/anomalyco/opencode/issues/18001) | Emerging—agentic task patterns |
| **Shell flexibility** | [#3228](https://github.com/anomalyco/opencode/issues/3228), [#4917](https://github.com/anomalyco/opencode/pull/4917) | Active—bash/zsh/fish detection and passthrough |

---

## 6. Developer Pain Points

| Pain Point | Frequency | Impact | Tracking |
|------------|-----------|--------|----------|
| **Claude/Anthropic auth instability** | 🔥 Critical | Workflow-breaking | [#18315](https://github.com/anomalyco/opencode/issues/18315), [#18342](https://github.com/anomalyco/opencode/issues/18342), [#17910](https://github.com/anomalyco/opencode/issues/17910) |
| **Context awareness gaps** | High | Trust erosion | [#3472](https://github.com/anomalyco/opencode/issues/3472) |
| **ACP protocol edge cases** | Medium | Integration reliability | [#17505](https://github.com/anomalyco/opencode/issues/17505), [#18672](https://github.com/anomalyco/opencode/issues/18672) |
| **Windows/proxy networking** | Medium | Platform parity | [#12405](https://github.com/anomalyco/opencode/issues/12405) |
| **Headless/automation hangs** | Medium | CI/CD blocking | [#7876](https://github.com/anomalyco/opencode/issues/7876), [#16367](https://github.com/anomalyco/opencode/issues/16367) |
| **Memory/performance at scale** | Medium | Large codebase usability | [#16269](https://github.com/anomalyco/opencode/issues/16269), [#5266](https://github.com/anomalyco/opencode/pull/5266) |

---

*Digest compiled from 50 issues and 50 PRs updated 2026-03-22 to 2026-03-23.*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-03-23

---

## 1. Today's Highlights

The Qwen Code team shipped **v0.13.0-nightly** with OpenRouter pipeline fixes and system prompt customization. The VSCode Companion extension saw heavy development with **5 new PRs** from contributor `yiliang114` adding `/insight`, `/export`, and improved agent execution displays. Core infrastructure work continues on context management with dynamic tool output truncation and masking services to support longer agentic sessions.

---

## 2. Releases

### [v0.13.0-nightly.20260322.38caa0b21](https://github.com/QwenLM/qwen-code/releases/tag/v0.13.0-nightly.20260322.38caa0b21)
- **chore:** Version bump to 0.13.0
- **fix(pipeline):** Handle duplicate `finish_reason` chunks from OpenRouter — resolves streaming instability with certain providers
- **feat:** Add system prompt customization option — users can now override default system prompts

---

## 3. Hot Issues

| # | Status | Title | Why It Matters | Community Reaction |
|---|--------|-------|--------------|-------------------|
| [#1083](https://github.com/QwenLM/qwen-code/issues/1083) | 🔴 OPEN | Strange error when starting: "Invalid number of stops (< 2)" | **Startup blocker** on Homebrew installs (v0.2.3); affects macOS users | 3 comments, no resolution path yet |
| [#2589](https://github.com/QwenLM/qwen-code/issues/2589) | 🟢 CLOSED | VSCode extension limited to single panel vs. Claude Code's multi-panel | **UX parity gap** with competitor; users want parallel task handling | Closed same day — rapid triage, fix likely in progress |
| [#2596](https://github.com/QwenLM/qwen-code/issues/2596) | 🔴 OPEN | CLI appending `</think>` tags to output | **Output corruption** — model artifacts leaking into user-facing text | 1 comment, 1 upvote; needs prompt/template fix |
| [#2597](https://github.com/QwenLM/qwen-code/issues/2597) | 🔴 OPEN | "Squash" command triggers interactive rebase instead of auto-squash | **Git workflow friction** — agent fails to complete promised action | Fresh report, no response yet |

---

## 4. Key PR Progress

| # | Author | Title | Feature/Fix Summary |
|---|--------|-------|---------------------|
| [#2593](https://github.com/QwenLM/qwen-code/pull/2593) | yiliang114 | feat(vscode-ide-companion): support `/insight` command | Adds ACP-side progress streaming + VSCode report handoff for insight generation without terminal context-switching |
| [#2595](https://github.com/QwenLM/qwen-code/pull/2595) | yiliang114 | feat(webui): unify remaining tool display labels | Completes CLI naming alignment from #1367; eliminates mixed labels like `Edit` vs `FileEdit` in shared components |
| [#2592](https://github.com/QwenLM/qwen-code/pull/2592) | yiliang114 | feat(vscode-companion): support `/export` session command | Native IDE session export with CLI-parity formats; hooks into VSCode's native save/open UX |
| [#2591](https://github.com/QwenLM/qwen-code/pull/2591) | yiliang114 | fix(vscode-ide-companion): preserve model metadata on switch | Fixes stale context-window indicator after model switches by reusing full cached metadata |
| [#2590](https://github.com/QwenLM/qwen-code/pull/2590) | yiliang114 | feat(vscode-ide-companion): add dedicated agent execution display | Structured `task_execution` rendering with progress, child tools, and failure reasons — no more generic tool card fallback |
| [#2572](https://github.com/QwenLM/qwen-code/pull/2572) | netbrah | feat(core): dynamic tool output truncation | Context-aware thresholds: 25K→80K chars, 1000→2000 lines with dynamic scaling as context fills |
| [#2573](https://github.com/QwenLM/qwen-code/pull/2573) | netbrah | feat(core): tool output masking service | Pre-turn pass replaces old bulky outputs with previews; preserves full output on disk; includes token estimation + telemetry |
| [#2570](https://github.com/QwenLM/qwen-code/pull/2570) | netbrah | feat(mcp): add `readOnlyTools` config for MCP servers | Allows MCP servers to opt into read-only treatment, enabling parallel execution vs. forced sequential |
| [#2517](https://github.com/QwenLM/qwen-code/pull/2517) | Br1an67 | fix: omit empty tools array from API requests | Guards against OpenAI-compatible validation errors when `tools: []` sent to certain providers |
| [#2588](https://github.com/QwenLM/qwen-code/pull/2588) | netbrah | feat(core): OpenAI Responses API native support | **Closed** — Full Codex-parity `openai-responses` provider with streaming, function calling, and tool use |

---

## 5. Feature Request Trends

| Trend | Evidence | Implication |
|-------|----------|-------------|
| **VSCode Companion parity with CLI** | #2593, #2592, #2590, #2589 | Users expect IDE extension to match terminal capabilities; `/` commands and multi-panel support are table stakes |
| **Context management for long sessions** | #2572, #2573 | Agentic workflows hitting context limits; need intelligent truncation, masking, and reclamation |
| **MCP ecosystem maturity** | #2570 | Read-only vs. read-write tool classification becoming critical for performance optimization |
| **Output quality / artifact cleanup** | #2596 | Model-generated artifacts (`</think>`) leaking to users; needs template hardening |

---

## 6. Developer Pain Points

| Pain Point | Frequency | Details |
|------------|-----------|---------|
| **Installation/startup failures** | 🔴 High | #1083 (Homebrew), #2596 (runtime errors) — distribution and environment stability |
| **Git workflow reliability** | 🟡 Medium | #2597 — agent promises auto-squash but delegates to user; trust erosion in autonomous operations |
| **Context window management** | 🟡 Medium | #2572, #2573 — users hitting limits in long sessions; workarounds insufficient |
| **VSCode extension limitations** | 🟡 Medium | #2589 — multi-tasking friction vs. competitors; rapid PR response suggests priority alignment |
| **Provider API compatibility** | 🟢 Low (addressed) | #2517, #2403 — OpenRouter/OpenAI edge cases; active maintenance |

---

*Digest compiled from github.com/QwenLM/qwen-code*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/duanyytop/agents-radar).*