# AI CLI Tools Community Digest 2026-03-20

> Generated: 2026-03-20 00:09 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Comparison Report — 2026-03-20

## 1. Ecosystem Overview

The AI CLI tools landscape is maturing rapidly with six major players now competing for developer mindshare. Rate limit transparency, extensibility through plugins/hooks/MCP, and enterprise governance have emerged as universal priorities. Windows compatibility and terminal UX polish remain persistent gaps across the ecosystem. The market is bifurcating between closed, vertically-integrated experiences (Claude Code, Codex) and open, extensible platforms (Gemini CLI, Kimi CLI, Qwen Code, OpenCode) with varying degrees of provider flexibility.

---

## 2. Activity Comparison

| Tool | Issues (Active) | PRs (Active) | Release Today | Primary Velocity Signal |
|------|-----------------|--------------|---------------|------------------------|
| **Claude Code** | 50 | 10 | v2.1.80 | Steady; focused on rate limit visibility & hook system hardening |
| **OpenAI Codex** | ~15 tracked | 10 | rust-v0.116.0 | Moderate; architectural refactoring (ExecServer split, V8 migration) |
| **Gemini CLI** | 50 | 50 | v0.35.0-preview.2 | **Highest velocity**; 50 PRs/24hrs, major AgentSession refactor |
| **GitHub Copilot CLI** | ~12 tracked | 0 | v1.0.9 | Low; maintenance mode, terminal UX debt accumulating |
| **Kimi CLI** | 15+ | 15+ | None (v1.22.0) | **Surge activity**; plugin system merged, community contribution spike |
| **OpenCode** | 50 | 50 | None | High; crisis response to Anthropic OAuth breakage, Effect framework migration |
| **Qwen Code** | ~12 tracked | 10+ | v0.13.0-preview.0 | Moderate; rapid edit-tool bug fixes, standardization push |

---

## 3. Shared Feature Directions

| Requirement | Tools | Specific Community Needs |
|-------------|-------|--------------------------|
| **Rate limit transparency** | Claude Code, Codex, OpenCode | Real-time quota visibility (#16157, #14593, #11830); multi-account rotation for operational resilience |
| **Plugin/hook extensibility** | Claude Code, Codex, Kimi CLI, Gemini CLI | PreToolUse hooks (#36279, #15211), Skills+Tools system (#1503), AgentSession event streaming (#23159) |
| **MCP ecosystem integration** | Claude Code, Gemini CLI, Copilot CLI, OpenCode | OAuth server support (resolved in Copilot #33), localhost egress (#28018), sandboxed VM access (#26259) |
| **Enterprise governance** | Gemini CLI, Claude Code, Qwen Code | Policy engine (#23096, #23139), audit trails (#2497), admin-forced configurations |
| **Context/window visibility** | Claude Code, Gemini CLI, Qwen Code | `/context` command (#22856), compression UI (#23064), token economics clarity |
| **Windows parity** | *All tools* | Installation scripts (#1513), credential manager (#13191), terminal key handling (#1437, #1284) |

---

## 4. Differentiation Analysis

| Dimension | Claude Code | OpenAI Codex | Gemini CLI | Copilot CLI | Kimi CLI | OpenCode | Qwen Code |
|-----------|-------------|--------------|------------|-------------|----------|----------|-----------|
| **Core Model** | Claude only | GPT/Spark family | Gemini only | Multi-model (Claude/GPT) | Kimi only | Multi-provider | Qwen + OpenRouter |
| **Extensibility Model** | Hook system (Python/JS) | PreToolUse hooks, plugins | Policy engine, Skills | MCP servers, agents | **Skills+Tools plugin system** | Effect-based plugins | `.agents/skills` convention |
| **Target User** | Individual pros, small teams | Enterprise, OpenAI ecosystem | Google Cloud/Workspace orgs | GitHub-centric developers | Chinese market, IDE integrators | Multi-provider power users | Open-source community, international |
| **Technical Approach** | TUI-first, Cowork VMs | Rust CLI, V8 sandbox | Node.js, AgentSession streaming | Electron/TUI hybrid | Node.js, ACP protocol | Bun→Node migration, Effect framework | Python/TypeScript, VS Code native |
| **Key Differentiator** | Deep Claude integration, Cowork | Token efficiency focus, OSC-8 UX | **Agent orchestration, memory routing** | GitHub ecosystem lock-in | **Rapid community iteration** | **Provider flexibility** | **Cross-tool standardization** |
| **Critical Vulnerability** | Rate limit enforcement trust | Windows sandbox fragility | Crash recovery (#23031) | Terminal UX stagnation | HTTP header sanitization | Anthropic dependency crisis | Edit tool reliability |

---

## 5. Community Momentum & Maturity

### Most Active Communities (by engagement depth)
| Rank | Tool | Evidence |
|------|------|----------|
| 1 | **Gemini CLI** | 50 PRs/24hrs, maintainer-led architectural overhaul, enterprise feature maturation |
| 2 | **Kimi CLI** | 15+ community PRs in single day, plugin system merged from external contribution |
| 3 | **OpenCode** | Crisis-driven coordination on OAuth breakage, systematic Effect migration |

### Most Mature (by stability & enterprise readiness)
| Rank | Tool | Evidence |
|------|------|----------|
| 1 | **Claude Code** | Hook system documentation, security hardening PRs, rate limit transparency shipped |
| 2 | **Gemini CLI** | Policy engine, governance features, structured SDD/spec system |
| 3 | **OpenAI Codex** | Rust architecture, V8 sandbox migration, SDK stability focus |

### At Risk (stagnation or crisis)
| Tool | Concern |
|------|---------|
| **Copilot CLI** | Zero PR activity, terminal UX regressions unaddressed for months, feature parity gaps |
| **OpenCode** | Anthropic legal takedown forcing provider pivot, Bun runtime migration disruption |

---

## 6. Trend Signals

| Trend | Evidence | Developer Value |
|-------|----------|---------------|
| **Multi-account/rotation as operational necessity** | #11830, #8145, #8145, #14815 | Rate limits becoming infrastructure constraint; teams need load balancing patterns |
| **AST-aware tooling for token efficiency** | #22745 (Gemini), implicit in context compression work | Semantic code navigation replacing brute-force file reading |
| **Agent session persistence & memory** | #22819, #22809 (Gemini), #24798 (Claude Code) | Moving beyond stateless chat to context-aware, long-running agents |
| **Cross-tool skill standardization** | `.agents/skills` convention (#2155, #2476) | Ecosystem interoperability emerging; avoid vendor lock-in |
| **Terminal as first-class application platform** | OSC-8 hyperlinks (#15249), scroll-fix plugins (#35683), tiling views (#18288) | CLI UX approaching IDE richness without IDE overhead |
| **Post-Bun runtime diversification** | OpenCode migration (#18308, #18304) | Runtime lock-in risks recognized; portable Node.js reclaiming ground |

---

*Report compiled from 7 tool digests, ~250 issues, ~150 PRs, and 4 releases dated 2026-03-20.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data as of 2026-03-20*

---

## 1. Top Skills Ranking (Most-Discussed PRs)

| Rank | Skill | Author | Status | Description & Discussion Highlights |
|:---|:---|:---|:---|:---|
| 1 | **document-typography** | [PGTBoos](https://github.com/PGTBoos) | 🟡 [OPEN #514](https://github.com/anthropics/skills/pull/514) | Typographic quality control for AI-generated documents—prevents orphans, widows, and numbering misalignment. Addresses a universal pain point in Claude's document output; no comments recorded but positioned as high-impact given scope of problem. |
| 2 | **frontend-design** (improved) | [justinwetch](https://github.com/justinwetch) | 🟡 [OPEN #210](https://github.com/anthropics/skills/pull/210) | Revised for clarity and actionability—ensures every instruction is executable within a single conversation. Long-running PR (Jan–Mar 2026) suggests iterative refinement based on feedback. |
| 3 | **skill-quality-analyzer** + **skill-security-analyzer** | [eovidiu](https://github.com/eovidiu) | 🟡 [OPEN #83](https://github.com/anthropics/skills/pull/83) | Meta-skills for evaluating Claude Skills across 5 quality dimensions (structure, security, etc.) and security auditing. Addresses ecosystem maturity needs; marketplace-focused positioning. |
| 4 | **CONTRIBUTING.md** | [narenkatakam](https://github.com/narenkatakam) | 🟡 [OPEN #509](https://github.com/anthropics/skills/pull/509) | Community health infrastructure—addresses 25% GitHub community health score. Closes [#452](https://github.com/anthropics/skills/issues/452); foundational rather than functional but highly requested. |
| 5 | **system documentation & flowcharts** | [TylerALofall](https://github.com/TylerALofall) | 🟡 [OPEN #95](https://github.com/anthropics/skills/pull/95) | Comprehensive evidence management system docs—architecture, lifecycle workflows, network topology. Enterprise/audit-focused use case. |
| 6 | **SAP-RPT-1-OSS predictor** | [amitlals](https://github.com/amitlals) | 🟡 [OPEN #181](https://github.com/anthropics/skills/pull/181) | Integration with SAP's open-source tabular foundation model for predictive analytics on SAP business data. Bridges Claude Code to enterprise ERP ecosystems; Apache 2.0 alignment. |
| 7 | **ODT skill** | [GitHubNewbie0](https://github.com/GitHubNewbie0) | 🟡 [OPEN #486](https://github.com/anthropics/skills/pull/486) | OpenDocument text creation, template filling, and ODT→HTML parsing. ISO 26300 standard support for LibreOffice/Apache OpenOffice workflows. |
| 8 | **masonry-generate-image-and-videos** | [junaid1460](https://github.com/junaid1460) | 🟡 [OPEN #335](https://github.com/anthropics/skills/pull/335) | Masonry CLI integration for Imagen 3.0/Veo 3.1 image and video generation. Media generation pipeline management with job tracking. |

---

## 2. Community Demand Trends (From Issues)

| Trend | Evidence | Implication |
|:---|:---|:---|
| **Infrastructure & Tooling Reliability** | [#62](https://github.com/anthropics/skills/issues/62) (skills disappearing), [#556](https://github.com/anthropics/skills/issues/556) (0% skill trigger rate), [#406](https://github.com/anthropics/skills/issues/406)/[#403](https://github.com/anthropics/skills/issues/403) (500 errors on upload/delete) | Core platform stability is the #1 blocker; users cannot reliably deploy or execute skills. |
| **Skill-Creator Best Practices** | [#202](https://github.com/anthropics/skills/issues/202) (8 comments), [#532](https://github.com/anthropics/skills/issues/532) (SSO/API key conflicts) | The official skill-creator skill needs redesign for token efficiency and enterprise auth compatibility. |
| **Security & Trust Boundaries** | [#492](https://github.com/anthropics/skills/issues/492) (4 comments, 2 👍) — namespace impersonation risk | Community skills under `anthropic/` namespace create attack surface; governance skills needed. |
| **MCP Interoperability** | [#16](https://github.com/anthropics/skills/issues/16) (4 comments), [#369](https://github.com/anthropics/skills/issues/369) (MCP Apps support) | Strong demand to expose Skills as Model Context Protocol endpoints for standardized API access. |
| **Enterprise Integration** | [#29](https://github.com/anthropics/skills/issues/29) (AWS Bedrock), [#189](https://github.com/anthropics/skills/issues/189) (duplicate skills in plugins) | Multi-platform deployment and plugin deduplication for scaled team usage. |

---

## 3. High-Potential Pending Skills

| Skill | PR | Why It May Land Soon |
|:---|:---|:---|
| **session-memory** | [#629](https://github.com/anthropics/skills/pull/629) | Addresses critical context compaction data loss; zero dependencies; recently updated (Mar 13–17). |
| **x402 BSV micropayments** | [#374](https://github.com/anthropics/skills/pull/374) | Novel payment rail integration; natural language interface for AI service discovery/payment; compact scope. |
| **AURELION skill suite** (4 skills) | [#444](https://github.com/anthropics/skills/pull/444) | Comprehensive cognitive framework (kernel, advisor, agent, memory); professional knowledge management positioning. |
| **codebase-inventory-audit** | [#147](https://github.com/anthropics/skills/pull/147) | 10-step systematic cleanup workflow; produces `CODEBASE-STATUS.md` as single source of truth—addresses technical debt at scale. |
| **shodh-memory** | [#154](https://github.com/anthropics/skills/pull/154) | Persistent memory across conversations; proactive context surfacing; competes with [#629](https://github.com/anthropics/skills/pull/629) on solution space. |
| **Buildr** (Telegram bridge) | [#419](https://github.com/anthropics/skills/pull/419) | Mobile control surface for Claude Code; one-command setup; narrow, completable scope. |
| **skill-creator design-phase guidance** | [#674](https://github.com/anthropics/skills/pull/674) | Directly addresses [#202](https://github.com/anthropics/skills/issues/202); sourced from internal Anthropic engineering lessons (Thariq Shihipar article). |

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is for reliable, enterprise-grade memory and context persistence mechanisms**—evidenced by multiple competing PRs ([#154](https://github.com/anthropics/skills/pull/154), [#629](https://github.com/anthropics/skills/pull/629)), platform instability issues blocking skill deployment, and meta-skills ([#83](https://github.com/anthropics/skills/pull/83)) aimed at quality assurance—while foundational infrastructure (CONTRIBUTING docs, MCP interoperability, SSO-compatible tooling) lags behind functional skill innovation.

---

# Claude Code Community Digest — 2026-03-20

---

## Today's Highlights

Anthropics shipped **v2.1.80** with long-awaited rate limit visibility and inline plugin declarations, while the community continues to grapple with persistent usage limit enforcement issues affecting Max subscribers. The issue tracker shows 50 active items with two mega-threads (#16157, #34229) dominating discussion at 1,772 combined comments, alongside steady progress on hook system documentation and security hardening in open PRs.

---

## Releases

### v2.1.80
| Change | Impact |
|--------|--------|
| `rate_limits` field in statusline scripts | Real-time visibility into 5-hour and 7-day Claude.ai rate windows with `used_percentage` and `resets_at` timestamps — addresses longstanding opacity in quota consumption |
| `source: 'settings'` plugin marketplace source | Declare plugin entries directly in `settings.json` without separate marketplace files, simplifying configuration-as-code workflows |
| CLI tool improvements | Truncated in release notes; likely related to remote control or plugin management |

---

## Hot Issues

| # | Title | Why It Matters | Community Signal |
|---|-------|--------------|----------------|
| [#16157](https://github.com/anthropics/claude-code/issues/16157) | Instantly hitting usage limits with Max subscription | **1,251 comments, 544 👍** — Core trust issue: $100-200/month Max users report immediate throttling despite paid tier promises. Labeled `oncall` and cross-tagged for cost/API/platform teams. | Extreme frustration; users documenting exact token counts and timestamps; demands for billing transparency |
| [#34229](https://github.com/anthropics/claude-code/issues/34229) | Phone verification failures | **521 comments, 585 👍** — Blocking new user onboarding entirely. Marked `invalid` by maintainers but continues accumulating reports, suggesting triage mismatch or persistent edge cases. | Confusion over `invalid` label; users sharing regional workarounds |
| [#18170](https://github.com/anthropics/claude-code/issues/18170) | Copy/paste includes unwanted indentation | 56 comments, 113 👍 — Daily friction for developers extracting code from terminal output; breaks workflow when sharing snippets | Well-documented repro cases; awaiting TUI fix |
| [#28951](https://github.com/anthropics/claude-code/issues/28951) | Remote control (/rc) not supported in VS Code extension | 46 comments, 38 👍 — Feature parity gap between CLI and IDE extension; blocks remote development workflows | VS Code users particularly vocal; workaround requests |
| [#30021](https://github.com/anthropics/claude-code/issues/30021) | "Create PR" button missing in web UI (iOS) | 34 comments, 54 👍 — Mobile-first developers blocked from completing Git workflows; UI regression suspected | iOS-specific; affects GitHub integration promise |
| [#20469](https://github.com/anthropics/claude-code/issues/20469) | Microsoft 365 Connector for Max Individual users | 33 comments, 37 👍 — Paywall arbitrage complaint: Max individuals ($100-200) pay more than Team seats ($30) but lack M365 integration | Clear pricing/entitlement inconsistency; enterprise feature gating debate |
| [#34413](https://github.com/anthropics/claude-code/issues/34413) | API Error: Rate limit reached (Windows) | 24 comments, 9 👍 — Platform-specific rate limit handling; marked duplicate but Windows users report distinct behavior | Cross-reference to #16157; needs disambiguation |
| [#22735](https://github.com/anthropics/claude-code/issues/22735) | Silent graceful exit during Write/Bash on Windows | 14 comments, 2 👍 — **Has repro** — Silent failures in NPM installations; data loss risk when Claude exits without error | Windows stability priority; packaging/tooling interaction |
| [#26259](https://github.com/anthropics/claude-code/issues/26259) | Desktop Extension MCP servers not passed to Cowork VM | 12 comments, 4 👍 — MCP ecosystem fragmentation: local servers (Filesystem, Context7) unavailable in sandboxed Cowork sessions | Breaks "local tools + remote compute" hybrid workflows |
| [#18562](https://github.com/anthropics/claude-code/issues/18562) | `/context` command output vanishes (v2.1.9 regression) | 12 comments, 36 👍 — **Has repro** — Critical context loss; regression from v2.1.7 | Linux-specific; demands rollback or hotfix |

---

## Key PR Progress

| # | Title | Technical Contribution | Status |
|---|-------|------------------------|--------|
| [#36333](https://github.com/anthropics/claude-code/pull/36333) | fix(hookify): resolve broken Python imports | Fixes `No module named 'hookify'` in all 4 hook scripts by correcting import paths to plugin cache layout | Open — critical for hook system usability |
| [#35683](https://github.com/anthropics/claude-code/pull/35683) | Add scroll-fix plugin | Intercepts `CUU` (cursor up) sequences to clamp scrolling within synchronized output blocks; adds `Ctrl+6` freeze toggle | Open — addresses cross-platform terminal regression |
| [#36300](https://github.com/anthropics/claude-code/pull/36300) | ralph-wiggum stop hook JSON schema fix | Corrects `{"decision": "block"}` → `{"ok": false}` to match Stop hook schema; prevents silent hook rejection | Open — security plugin reliability |
| [#36279](https://github.com/anthropics/claude-code/pull/36279) | Add agent context fields to hook input | Exposes `agent_id`, `parent_agent_id`, `agent_depth`, `session_type` to hooks for subagent-aware security policies | Open — enables granular hook logic |
| [#36260](https://github.com/anthropics/claude-code/pull/36260) | Add IPv6 firewall rules to devcontainer | Mirrors IPv4 policy for IPv6: AAAA resolution, GitHub CIDR allowlisting, link-local/ICMPv6 neighbor discovery | Open — security hardening for sandbox |
| [#36253](https://github.com/anthropics/claude-code/pull/36253) | Hook examples: file guard, session primer, notifications | Reference implementations for common hook patterns — lowers barrier to custom security/UX automation | Open — documentation/ecosystem |
| [#36252](https://github.com/anthropics/claude-code/pull/36252) | README for security-guidance plugin | Documents all 9 security patterns detected by the only undocumented plugin | Open — completeness |
| [#23971](https://github.com/anthropics/claude-code/pull/23971) | Fix agents field type in manifest reference | Corrects `agents` from "String or Array" to "Array only" — string values cause silent installation failures | Open — prevents subtle config bugs |
| [#31529](https://github.com/anthropics/claude-code/pull/31529) | Add `/remote-control-diagnose` command | Diagnostic slash command for widespread "Remote Control environments not available" errors; addresses #29449, #28816, #28817, #28884, #29037, #29164, #29185 | Open — support tooling |
| [#36145](https://github.com/anthropics/claude-code/pull/36145) | Update deprecation notice for npm installation | **Closed** — Documentation maintenance for install pathway | Closed |

---

## Feature Request Trends

| Theme | Evidence | Momentum |
|-------|----------|----------|
| **Rate limit transparency & fairness** | #16157, #20469, #34413, plus v2.1.80's `rate_limits` field | **Addressed in release** — monitoring for satisfaction |
| **Remote control parity** | #28951 (VS Code), #28330 (mobile plan mode), #31529 (diagnostics), #34764 (headless QR) | High — cross-platform RC expansion |
| **Hook system maturity** | #36279, #36333, #36253, #36252, #36071 (PreToolUse blocking bugs) | Active development — becoming core extensibility layer |
| **Sandbox/localhost integration** | #28018 (localhost egress), #26259 (MCP in Cowork) | Tension between security isolation and developer flexibility |
| **Inter-session/orchestration workflows** | #24798 (multi-Claude communication), #36074 (skill feedback loops) | Emerging — beyond single-session interaction model |
| **IDE feature parity** | #33932 (VS Code diff review), #28951 | Copilot-comparable UX expectations |

---

## Developer Pain Points

| Category | Symptoms | Root Cause Indicators |
|----------|----------|----------------------|
| **Rate limit enforcement opacity** | #16157 (instant throttling), #35166 (infinite retry loops), #34413 (platform-specific errors) | Quota accounting discrepancies between client-side tracking and server-side enforcement; aggressive retry logic without exponential backoff |
| **Windows second-class experience** | #22735 (silent exits), #33720 (voice mode failures), #14189 (theme bugs), #34413 | Platform-specific TUI/terminal handling; testing coverage gaps |
| **Hook system fragility** | #36071 (PreToolUse ignores blocks), #36333 (broken imports), #36300 (schema mismatches) | Rapid feature evolution outpacing integration testing; schema validation strictness |
| **MCP/Cowork boundary confusion** | #26259 (MCP servers unavailable in VM), #28018 (localhost blocked), #30112 (egress allowlist 403s) | Security model documentation lag; "local vs. remote" mental model mismatch |
| **Mobile/web parity gaps** | #30021 (missing PR button), #28330 (plan mode unresponsive) | iOS/web UI lagging behind CLI feature set; touch interaction edge cases |
| **Configuration discovery** | #27888 (custom commands not loading), #23971 (silent manifest failures) | Settings schema complexity; validation feedback insufficient |

---

*Digest compiled from 50 issues, 10 PRs, and 1 release. Data source: github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-03-20

---

## 1. Today's Highlights

The Rust CLI hit **v0.116.0 stable** with smoother ChatGPT device-code sign-in and automated plugin management, while the team landed **OSC-8 hyperlink support** across the TUI stack—making markdown links clickable in terminal emulators. Windows sandboxing remains the dominant pain point, with multiple high-engagement issues tracking permission fatigue and `apply_patch` failures under `src/**`. Meanwhile, rate-limit transparency and token burn rates continue to spark intense community scrutiny.

---

## 2. Releases

| Version | Key Changes |
|--------|-------------|
| **[rust-v0.116.0](https://github.com/openai/codex/releases/tag/rust-v0.116.0)** | App-server TUI now supports **device-code ChatGPT sign-in** during onboarding with automatic token refresh. Plugin setup improved: auto-prompt for missing plugins, suggestion allowlist enforcement, and install/uninstall state sync. |
| rust-v0.117.0-alpha.2 | Early alpha; no detailed notes. |
| rust-v0.116.0-alpha.{10-12} | Iterative pre-releases; no user-facing changes noted. |

---

## 3. Hot Issues

| # | Issue | Why It Matters | Community Pulse |
|---|-------|--------------|---------------|
| [#14593](https://github.com/openai/codex/issues/14593) | **Token burn rate still excessive** after VS Code extension update (v26.311.21342) | Business-tier users reporting 80% credit consumption on minor tasks; suggests metering or model selection regression | 🔥 137 comments, 64 👍 — *highest engagement* |
| [#9046](https://github.com/openai/codex/issues/9046) | Context window exhaustion on single-message threads | Indicates aggressive system prompt or context overhead in v0.80.0 | 17 comments; users confused by early truncation |
| [#9062](https://github.com/openai/codex/issues/9062) | Windows sandbox: `CreateProcessWithLogonW failed: 5` + inconsistent approval modes | Blocks native Windows adoption; auth vs. execution sandbox misalignment | 16 comments; Windows enterprise users affected |
| [#14936](https://github.com/openai/codex/issues/14936) | CLI 0.115.0: Approval prompts for *every* command, "don't ask again" ignored | **Regression** breaking YOLO mode workflow; trust store not persisting | 16 comments, 10 👍; urgent fix requested |
| [#9211](https://github.com/openai/codex/issues/9211) | Remote compact task timeout waiting for child process | Context compression failing on long sessions; data loss risk | 15 comments; Linux server VM users |
| [#14762](https://github.com/openai/codex/issues/14762) | Paid usage dropping "too quickly" — 1000→208 credits on small work | Complements #14593; suggests broader metering transparency issue | 15 comments, 20 👍 |
| [#9544](https://github.com/openai/codex/issues/9544) | Remote compact: stream disconnected before completion | Network resilience for context sync; affects reliability at scale | 13 comments |
| [#13864](https://github.com/openai/codex/issues/13864) | gpt-5.4 responds to *earlier* messages, not latest user input | Model routing/attention bug; breaks conversational coherence | 12 comments |
| [#12888](https://github.com/openai/codex/issues/12888) | Agent edits fail in sandbox: "command failed; retry without sandbox?" | Opaque error messaging; users blind to sandbox restrictions | 11 comments |
| [#13009](https://github.com/openai/codex/issues/13009) | Spark model rejects `reasoning.summary` with `unsupported_parameter` | Model capability mismatch in agent routing | 10 comments |

---

## 4. Key PR Progress

| # | PR | Description | Impact |
|---|-----|-------------|--------|
| [#15245](https://github.com/openai/codex/pull/15245) | Maintain Python SDK artifacts for pinned runtime | Aligns generated SDK code with locked runtime schema; adds maintenance tests | **SDK stability** |
| [#15199](https://github.com/openai/codex/pull/15199) | Use released DotSlash package for argument-comment lint | Eliminates runtime manifest download; reproducible linting in `just clippy` | Build reliability |
| [#15232](https://github.com/openai/codex/pull/15232) | Refactor ExecServer filesystem split (local/remote) | Clean trait-based architecture: `LocalFilesystem` + `RemoteFilesystem` proxy + handler | **Maintainability** |
| [#15233](https://github.com/openai/codex/pull/15233) | Split exec process into local and remote implementations | Mirrors #15232 for process management; enables distributed execution groundwork | Architecture parity |
| [#15150](https://github.com/openai/codex/pull/15150) | Move auth code into `login` crate | Modularizes auth; `codex-core` re-exports for backward compat | Code organization |
| [#15249](https://github.com/openai/codex/pull/15249) | Render markdown links as OSC-8 in TUI | **Terminal hyperlinks** now live: clickable markdown links in ratatui | UX upgrade |
| [#15248](https://github.com/openai/codex/pull/15248) | Make TUI size handling OSC-8-aware | Wrapping/truncation respects invisible OSC-8 sequences; prevents display corruption | Rendering correctness |
| [#13191](https://github.com/openai/codex/pull/13191) | Keyring: split-entry storage for auth token | Fixes **Windows Credential Manager size limits** for large OAuth tokens | **Windows auth reliability** |
| [#15247](https://github.com/openai/codex/pull/15247) | Code Mode to V8 | Migrates sandbox to V8 isolate; musl platform blocker noted | **Security + performance** (pending) |
| [#15211](https://github.com/openai/codex/pull/15211) | Add bash-only PreToolUse hooks | Deny-list hooks for shell execution; first-cut safety extensibility | **Policy engine** foundation |

---

## 5. Feature Request Trends

| Theme | Evidence | Momentum |
|-------|----------|----------|
| **Fine-grained permissions** | [#14399](https://github.com/openai/codex/issues/14399) — "Default too restrictive, Full access too permissive" | 4 comments, 2 👍; enterprise-ready middle ground wanted |
| **Pre-session forking** | [#15183](https://github.com/openai/codex/issues/15183) — `codex fork "asdf"` from CLI | 3 comments; workflow efficiency |
| **Markdown table formatting** | [#8259](https://github.com/openai/codex/issues/8259) — human-readable whitespace | 10 comments, 32 👍; long-standing polish request |
| **Transparent rate-limit parity** | [#14815](https://github.com/openai/codex/issues/14815) — "Different accounts = different weekly limits?" | 4 comments, 14 👍; fairness concerns |

---

## 6. Developer Pain Points

| Category | Symptoms | Frequency |
|----------|----------|-----------|
| **Rate-limit transparency & token economics** | Rapid credit burn, "Other" vs "CLI" misclassification, account-tier inconsistency | 🔥🔥🔥 *Critical mass* — #14593, #14762, #14815, #15130 |
| **Windows sandbox fragility** | `apply_patch` failures in `src/**`, lingering processes, WSL mode crashes, permission prompt regression | 🔥🔥🔥 #9062, #14675, #14461, #15078, #13970, #14549 |
| **Context management reliability** | Remote compact timeouts, stream disconnections, premature window exhaustion | 🔥🔥 #9046, #9211, #9544 |
| **Approval UX friction** | "Don't ask again" ignored, YOLO mode demanding sandbox creation, fine-grained control absent | 🔥🔥 #14936, #6395 (closed but resurfacing), #14399 |
| **Model routing bugs** | Spark parameter rejection, gpt-5.4 attention misalignment | 🔥 #13009, #13864 |

---

*Digest compiled from github.com/openai/codex activity 2026-03-19 to 2026-03-20.*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-03-20

---

## 1. Today's Highlights

The team shipped **v0.35.0-preview.2** with a critical patch cherry-pick, while development velocity remains high with **50 open issues** and **50 active PRs** in the last 24 hours. Major architectural work is underway on **AgentSession** event streaming, **AST-aware tooling** for code navigation, and **enterprise policy governance** features. The community is actively contributing documentation fixes and voice input capabilities.

---

## 2. Releases

### [v0.35.0-preview.2](https://github.com/google-gemini/gemini-cli/releases/tag/v0.35.0-preview.2)
Patch release cherry-picking commit `4e5dfd0` to address issues in the v0.35.0-preview.1 line. No breaking changes—primarily stability fixes for the preview channel.

---

## 3. Hot Issues

| Issue | Why It Matters | Community Signal |
|-------|--------------|----------------|
| [#22762](https://github.com/google-gemini/gemini-cli/issues/22762) Docs: code style documentation does not wrap | Poor UX for policy-engine TOML reference; requires horizontal scrolling | 6 comments, actively discussed |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) Assess AST-aware file reads, search, and mapping | **EPIC-level** investigation that could reduce token waste and improve precision in codebase navigation | 4 comments, maintainer-only workstream |
| [#23096](https://github.com/google-gemini/gemini-cli/issues/23096) `allow_redirection` policy rule broken | Enterprise security feature not functioning as documented—blocks shell redirection workflows | 2 comments, needs triage |
| [#22855](https://github.com/google-gemini/gemini-cli/issues/22855) Support passing prompt to `/plan` | UX friction: plan mode requires multi-step interaction instead of single command | 2 comments, 2 👍, high user value |
| [#22822](https://github.com/google-gemini/gemini-cli/issues/22822) SDD: Refine `/spec setup` for `/conductor` migration | Migration path needed for existing conductor users to new SDD system | 2 comments, maintainer workstream |
| [#23031](https://github.com/google-gemini/gemini-cli/issues/23031) CLI stuck on startup after crash | **Critical reliability issue**—OOM/crash leaves Node process in unrecoverable state | 1 comment, no workaround besides reboot |
| [#23174](https://github.com/google-gemini/gemini-cli/issues/23174) Fix Context Initialization Mismatch | Root cause of "Cannot read properties of undefined" errors in core tools | 1 comment, has linked PR #23176 |
| [#22933](https://github.com/google-gemini/gemini-cli/issues/22933) Fix the loop problem | Agent enters infinite retry loops on policy-blocked operations | 1 comment, 1 👍, affects trust |
| [#22819](https://github.com/google-gemini/gemini-cli/issues/22819) Implement memory routing: global vs. project | Foundation for personalized, context-aware agent behavior | 1 comment, 1 👍, architectural milestone |
| [#22809](https://github.com/google-gemini/gemini-cli/issues/22809) Tune main agent prompt for proactive memory writes | Agent currently underutilizes memory tool; needs behavioral guidance | 1 comment, 1 👍, UX improvement |

---

## 4. Key PR Progress

| PR | Feature/Fix | Status |
|----|-------------|--------|
| [#23159](https://github.com/google-gemini/gemini-cli/pull/23159) **AgentSession + agent events rename** | Refactors `AgentProtocol` to subscription model; introduces `AgentSession` with `AsyncIterable` API for cleaner event consumption | Open, maintainer review |
| [#20974](https://github.com/google-gemini/gemini-cli/pull/20974) **Compact tool output** | High-signal rendering mode reducing terminal noise between prompts and responses | Open, P2 priority |
| [#20407](https://github.com/google-gemini/gemini-cli/pull/20407) **Wire abort signal through compression** | Fixes Ctrl+C not canceling LLM compression calls—reliability fix | Open, needs review |
| [#23177](https://github.com/google-gemini/gemini-cli/pull/23177) **Fix subcommand shadowing** | Resolves critical bug where `mcp`, `extensions`, `skills` subcommands were treated as chat queries, triggering unwanted auth | Open, fresh |
| [#23139](https://github.com/google-gemini/gemini-cli/pull/23139) **Sandbox "Write-Protected" Governance Files** | Enterprise hardening: gitignore/geminiignore made read-only in sandbox | Open, needs issue |
| [#23176](https://github.com/google-gemini/gemini-cli/pull/23176) **Fix Context Initialization Mismatch** | Addresses undefined property errors in `isTrustedFolder` and `publish` | Open, pairs with #23174 |
| [#18499](https://github.com/google-gemini/gemini-cli/pull/18499) **Voice input with pluggable backend** | Zero-install Gemini transcription + optional local Whisper; major accessibility feature | Open, P2, help wanted |
| [#23064](https://github.com/google-gemini/gemini-cli/pull/23064) **Redesign context/compression UI** | Seamless overflow warnings, percentage-based display, new `ui.showContextWindowWarning` setting | Open, needs issue |
| [#23150](https://github.com/google-gemini/gemini-cli/pull/23150) **Tool-based topic grouping (Chapters)** | Replaces prompt-only narration with semantic grouping, gated by `experimental.topicUpdateNarration` | Open, needs issue |
| [#22856](https://github.com/google-gemini/gemini-cli/pull/22856) **`/context` slash command** | Visual breakdown of context window usage by category (system, tools, memory, etc.) | Open, core feature |

---

## 5. Feature Request Trends

From the 50 active issues, three dominant directions emerge:

1. **Agent Orchestration & Memory** — Heavy investment in task trackers (#23126, #23129, #23131), subagent delegation (#23034), and memory routing (#22819, #22809). The team is building toward persistent, context-aware agents.

2. **Enterprise Governance & Security** — Policy engine refinements (#23096, #23139), admin-forced MCP installations (#23163, closed), and telemetry (#22425) indicate maturation for organizational deployment.

3. **Developer Experience & Transparency** — Context window visibility (#22856, #23064), compact output (#20974), and AST-aware tooling (#22745, #22746) show focus on reducing cognitive load and token inefficiency.

---

## 6. Developer Pain Points

| Pain Point | Evidence | Severity |
|------------|----------|----------|
| **Crash recovery failures** | #23031 (startup hang after OOM/crash), no logs, requires reboot | 🔴 High |
| **Policy engine confusion** | #23096 (broken `allow_redirection`), #22762 (docs unreadable) | 🟡 Medium |
| **Agent looping & trust erosion** | #22933 (infinite loops), #22995 (tracker discovery failures) | 🟡 Medium |
| **Context window opacity** | Multiple issues requesting visibility; #22856 and #23064 address this | 🟡 Medium |
| **Documentation link rot** | 3+ closed PRs fixing broken hooks guide links (#21728, #22315, #22278, #22533) | 🟢 Low (being addressed) |

---

*Digest compiled from google-gemini/gemini-cli public activity. For full details, visit the [repository](https://github.com/google-gemini/gemini-cli).*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-03-20

## Today's Highlights

GitHub shipped **v1.0.9** with critical fixes for SSH I/O errors and CJK character preservation in WSL, while the community grapples with persistent terminal interaction regressions—screen flickering in long conversations and broken keyboard shortcuts dominate the top issues. OAuth MCP server support landed after months of demand, but terminal UX friction (copy/paste, scrolling, keybindings) remains the primary pain point for power users.

---

## Releases

**v1.0.9** (2026-03-19)
- **Fixed:** Spurious I/O errors (ENOTCONN, EIO) during SSH disconnects or terminal closes
- **Added:** `include_gitignored` config option to include gitignored files in `@` file search
- **Fixed:** CJK and non-ASCII character preservation when copying text on WSL

---

## Hot Issues

| # | Issue | Why It Matters | Community Reaction |
|---|-------|--------------|------------------|
| [#239](https://github.com/github/copilot-cli/issues/239) | Screen flickering/scroll reset in long conversations | Breaks usability for serious workflows; affects 10+ message sessions | 35 comments, 66 👍 — highest engagement, no official fix timeline |
| [#33](https://github.com/github/copilot-cli/issues/33) | **CLOSED** — OAuth http MCP servers | Unlocks Figma, Atlassian, and enterprise MCP servers; long-awaited | 33 comments, 106 👍 — resolved, community celebrating |
| [#1284](https://github.com/github/copilot-cli/issues/1284) | Arrow keys output literal characters (`A`/`B`/`C`/`D`) | Core terminal interaction broken; escape sequence handling regression | 14 comments, actively triaged |
| [#1481](https://github.com/github/copilot-cli/issues/1481) | SHIFT+ENTER executes instead of line break | Violates universal chat UX convention; muscle memory disruption | 11 comments, 9 👍 — "mildly annoying" understates impact |
| [#2099](https://github.com/github/copilot-cli/issues/2099) | "Claude Sonnet 4.5" model unavailable | Agent config breakage; model versioning confusion between CLI and agents | 10 comments, blocking agent workflows |
| [#1157](https://github.com/github/copilot-cli/issues/1157) | Global hooks configuration request | Enterprise/automation need; gap vs. Claude Code/Cursor | 9 comments, 18 👍 — strong demand for cross-repo hooks |
| [#1347](https://github.com/github/copilot-cli/issues/1347) | XDG_CONFIG_HOME partially broken | Linux standards compliance; config discoverability | 6 comments, 9 👍 — related to [#1750](https://github.com/github/copilot-cli/issues/1750) |
| [#2159](https://github.com/github/copilot-cli/issues/2159) | **CLOSED** — Copy/paste broken (Windows PuTTY → Linux) | SSH workflow breakage for Windows-centric developers | 5 comments, closed same day — rapid fix |
| [#1285](https://github.com/github/copilot-cli/issues/1285) | Org-level agents not appearing | Enterprise adoption blocker; `.github-private` visibility | 5 comments, 4 👍 — onboarding friction |
| [#2082](https://github.com/github/copilot-cli/issues/2082) | ctrl+shift+c copy broken on Linux | Standard terminal shortcut overridden; accessibility impact | 5 comments, 1 👍 — regression from v1.0.4 |

---

## Key PR Progress

*No pull requests updated in the last 24 hours.*

---

## Feature Request Trends

| Trend | Evidence | Momentum |
|-------|----------|----------|
| **Terminal UX parity** | vim mode ([#13](https://github.com/github/copilot-cli/issues/13)), keyboard scrolling ([#2162](https://github.com/github/copilot-cli/issues/2162)), SHIFT+ENTER fix ([#1481](https://github.com/github/copilot-cli/issues/1481)) | High — 37 👍 on vim mode alone |
| **Standards compliance** | XDG Base Directory ([#1347](https://github.com/github/copilot-cli/issues/1347), [#1750](https://github.com/github/copilot-cli/issues/1750)) | Moderate — Linux power user priority |
| **Enterprise/observability** | OpenTelemetry export ([#1911](https://github.com/github/copilot-cli/issues/1911)), global hooks ([#1157](https://github.com/github/copilot-cli/issues/1157)), sandboxing ([#1163](https://github.com/github/copilot-cli/issues/1163)) | Growing — platform team needs |
| **MCP ecosystem maturity** | OAuth support (resolved), LSP init options ([#1269](https://github.com/github/copilot-cli/issues/1269)), `.github/lsp.json` fixes ([#1886](https://github.com/github/copilot-cli/issues/1886)) | Active — server integration depth |

---

## Developer Pain Points

1. **Terminal Interaction Regressions** — Copy/paste, scrolling, and keybindings repeatedly break across releases. The shift to application-controlled rendering (v1.0.8+) broke TMUX workflows ([#2148](https://github.com/github/copilot-cli/issues/2148)) and Linux terminal conventions.

2. **Long Conversation Instability** — Issue [#239](https://github.com/github/copilot-cli/issues/239)'s flickering/scroll-reset affects power users most, with no committed fix despite 6+ months of reports.

3. **Configuration Fragmentation** — Hooks, agents, and MCP servers require per-repo setup; global config ([#1157](https://github.com/github/copilot-cli/issues/1157)) and XDG compliance ([#1750](https://github.com/github/copilot-cli/issues/1750)) remain unaddressed.

4. **Model Versioning Drift** — Agent configs referencing unavailable models ([#2099](https://github.com/github/copilot-cli/issues/2099)) suggest internal misalignment between CLI and Copilot platform model availability.

5. **Transient API Errors** — New in v1.0.9: elevated 503/CAPIError reports ([#2166](https://github.com/github/copilot-cli/issues/2166), [#2160](https://github.com/github/copilot-cli/issues/2160)) blocking code generation workflows.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-03-20

## 1. Today's Highlights

A surge of community contributions landed today with **15+ PRs merged or opened**, addressing long-standing pain points including VS Code terminal compatibility, Windows installation failures, and plugin extensibility. The maintainers greenlit a **new plugin system (Skills + Tools)** enabling custom agent capabilities via markdown-defined skills, while multiple fixes target HTTP header pollution causing widespread "Connection error" failures on Linux systems.

---

## 2. Releases

*No new releases in the last 24 hours. Latest stable remains v1.22.0.*

---

## 3. Hot Issues

| Issue | Why It Matters | Community Reaction |
|-------|--------------|-------------------|
| [#1285](https://github.com/MoonshotAI/kimi-cli/issues/1285) **Connection error: LLM provider** | Critical blocker affecting multiple Linux distros; root cause traced to `platform.version()` injecting illegal characters into HTTP headers | 9 comments, active debugging across Ubuntu/Arch/Manjaro users |
| [#1389](https://github.com/MoonshotAI/kimi-cli/issues/1389) **HTTP Headers pollution** (CLOSED) | Identified systemic issue where kernel version strings with `#` or trailing spaces break header validation; fix pattern now established | 4 comments, marked as resolved with workaround |
| [#1437](https://github.com/MoonshotAI/kimi-cli/issues/1437) **Enter key appends `[13u`** | VS Code 1.109+ Kitty keyboard protocol incompatibility breaks basic input; affects core usability | 2 comments, multiple PRs submitted |
| [#1513](https://github.com/MoonshotAI/kimi-cli/issues/1513) **Windows install script silent failure** | Default PowerShell `Restricted` execution policy blocks first-time installation; high friction for new users | Fresh report, immediate PR response |
| [#625](https://github.com/MoonshotAI/kimi-cli/issues/625) **Add /timeout command** | 60s default timeout kills long package installs (npm/pip); frequently requested workflow blocker | 4 comments, PR #1507 now open |
| [#729](https://github.com/MoonshotAI/kimi-cli/issues/729) **Skip option for command approval** | Current binary approve/reject aborts entire step; users need granular control for side-effect-heavy commands | 3 comments, PR #1506 addresses this |
| [#751](https://github.com/MoonshotAI/kimi-cli/issues/751) **Slash commands require double Enter** | Minor but persistent UX friction; completion menu selection should auto-execute | 4 comments, PR #1509 submitted |
| [#1475](https://github.com/MoonshotAI/kimi-cli/issues/1475) **Current directory in prompt/title** | v1.15.0 regression removed working directory visibility; breaks multi-project workflow | 1 comment, PR #1519 opened |
| [#781](https://github.com/MoonshotAI/kimi-cli/issues/781) **Ctrl+V paste broken on Windows** | Windows Terminal intercepts clipboard shortcut; no image paste capability | 2 comments, PR #1505 adds Alt+V fallback |
| [#1355](https://github.com/MoonshotAI/kimi-cli/issues/1355) **ACP session init failure** | IDE integration (IntelliJ/PyCharm) broken due to `sys.argv` assumptions | 2 comments, PR #1512 targets fix |

---

## 4. Key PR Progress

| PR | Feature/Fix | Status |
|----|-------------|--------|
| [#1503](https://github.com/MoonshotAI/kimi-cli/pull/1503) **Plugin system (Skills + Tools)** | Extensible architecture for custom agents via `kimi plugin install` with git/zip/local sources; isolated subprocess execution | **MERGED** — Major capability expansion |
| [#1514](https://github.com/MoonshotAI/kimi-cli/pull/1514) **Disable Kitty keyboard protocol** | Fixes VS Code terminal Enter key (`[13u`) by detecting and disabling CSI-u sequences | Open — Competing with #1440, #1502 |
| [#1516](https://github.com/MoonshotAI/kimi-cli/pull/1516) **PowerShell execution policy handling** | Detects `Restricted` policy, shows helpful error instead of silent crash | Open — Addresses #1513 |
| [#1507](https://github.com/MoonshotAI/kimi-cli/pull/1507) **`/timeout` slash command** | User-configurable timeout for shell commands; persists across sessions | Open — Resolves #625 |
| [#1506](https://github.com/MoonshotAI/kimi-cli/pull/1506) **Skip option in approval prompts** | Third option "Skip, continue with remaining tasks" for tool calls | Open — Resolves #729 |
| [#1509](https://github.com/MoonshotAI/kimi-cli/pull/1509) **Auto-submit slash commands** | Eliminates double-Enter requirement for completion menu selection | Open — Resolves #751 |
| [#1519](https://github.com/MoonshotAI/kimi-cli/pull/1519) **Current directory in terminal title** | Restores dynamic title showing working directory; aids multi-session management | Open — Resolves #1475 |
| [#1518](https://github.com/MoonshotAI/kimi-cli/pull/1518) **Missing web UI static files detection** | Detects unbuilt frontend, shows helpful message instead of 404 | Open — Resolves #1452 |
| [#1512](https://github.com/MoonshotAI/kimi-cli/pull/1512) **ACP init ValueError fix** | Handles IDE launches where `sys.argv` lacks `"kimi"` string | Open — Resolves #1355 |
| [#1505](https://github.com/MoonshotAI/kimi-cli/pull/1505) **Alt+V paste shortcut on Windows** | Alternative to Ctrl+V for Windows Terminal compatibility | Open — Resolves #781 |

---

## 5. Feature Request Trends

| Direction | Evidence | Momentum |
|-----------|----------|----------|
| **Extensibility & Plugins** | #107 (Skill.md), #1503 merged | High — Core architecture now supports custom tools |
| **Session Management** | #765 (persist approvals), #1376 (session listing), #1482 (parallel tasks) | Medium — Resume and multi-task workflows need refinement |
| **Terminal UX Polish** | #751 (auto-submit), #729 (skip option), #1252 (number key selection) | High — CLI interaction patterns being actively refined |
| **Timeout & Resource Control** | #625 (configurable timeout), implicit in long-running tool discussions | Medium — DevOps/ML workflows hitting default limits |
| **Cross-Platform Reliability** | #781 (Windows paste), #1513 (PowerShell install), #1437 (VS Code keys) | High — Windows compatibility emerging as priority |

---

## 6. Developer Pain Points

**HTTP Header Sanitization Crisis**
Multiple Linux distributions report `Connection error` failures (#1285, #1389, #1266, #1364, #1368, #1289) stemming from `platform.version()` returning kernel strings containing `#`, trailing spaces, or other RFC-violating characters. The CLI lacks defensive header cleaning, causing cascading auth failures. Community has identified patterns; systemic fix needed.

**IDE Integration Fragility**
ACP (Agent Communication Protocol) initialization fails in JetBrains and VS Code extensions (#1355, #1380, #1517) due to assumptions about `sys.argv` and process spawning. Growing enterprise/IDE user base makes this critical.

**Windows-First Experience Gaps**
Installation script failures under default PowerShell policies (#1513), clipboard interception (#781), and terminal compatibility issues indicate Windows users face disproportionate friction despite significant user share.

**Approval Workflow Interruptions**
Current binary approve/reject model (#729) lacks granularity for multi-step tasks. Users report workflow breakage when single commands fail or need skipping, suggesting need for more sophisticated task orchestration.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-03-20

---

## Today's Highlights

Anthropic OAuth authentication broke overnight for thousands of users following a legal takedown request that removed the `opencode-anthropic-auth` repository and related integrations. The community is scrambling with workarounds while maintainers rush fixes for cache-control conflicts and credential handling. Meanwhile, the core team is aggressively migrating services to the Effect framework and replacing Bun-specific APIs ahead of the OpenCode 2.0 release.

---

## Releases

*No new releases in the last 24 hours.*

---

## Hot Issues

| # | Issue | Why It Matters | Community Reaction |
|---|-------|--------------|------------------|
| [#18267](https://github.com/anomalyco/opencode/issues/18267) | **Claude code OAuth broken — 429 errors** | Critical auth failure blocking all Anthropic OAuth users; appears linked to repo takedown and API changes | 92 comments, 32 👍 — highest activity; users reporting complete inability to authenticate |
| [#10416](https://github.com/anomalyco/opencode/issues/10416) | **Privacy: session titles computed externally** | Reveals that even "local" LLM usage leaks metadata to OpenCode servers; trust and compliance concern | 46 comments; active technical discussion on network behavior |
| [#7456](https://github.com/anomalyco/opencode/issues/7456) | **Claude Code API credentials rejected** | Anthropic actively blocking credential reuse from their official CLI; breaks expected interoperability | 43 comments; users frustrated by lack of migration path |
| [#16331](https://github.com/anomalyco/opencode/issues/16331) | **Permission system ignored** | Core security feature (`opencode.json` permissions) not enforced; `.env` files readable despite `deny` rules | 34 comments; concerning for enterprise adoption |
| [#17910](https://github.com/anomalyco/opencode/issues/17910) | **OAuth + cache_control = HTTP 400 on all Claude models** | Regression since March 17; OAuth users completely blocked from Anthropic models | 5 comments but critical severity; fix PR already submitted |
| [#18265](https://github.com/anomalyco/opencode/issues/18265) | **Anthropic auth repo deleted — why?** | Legal/compliance takedown of `opencode-anthropic-auth`; existential question for provider support | 12 comments; confusion and concern about future Anthropic integration |
| [#13546](https://github.com/anomalyco/opencode/issues/13546) | **GPT-5 series: `reasoningSummary` breaks custom providers** | OpenCode injects OpenAI-specific params that incompatible providers reject | 18 comments; affects anyone using OpenAI-compatible proxies/gateways |
| [#11830](https://github.com/anomalyco/opencode/issues/11830) | **Multi-Account OAuth with auto-relogin** | Feature request for rate limit resilience via account rotation | 16 comments, 10 👍 — strong demand from power users |
| [#7957](https://github.com/anomalyco/opencode/issues/7957) | **Ctrl+C exits instead of copying (Windows/Linux)** | UX regression: universal copy shortcut terminates application | 9 comments, 17 👍 — widespread frustration |
| [#8145](https://github.com/anomalyco/opencode/issues/8145) | **Multiple Codex OAuth accounts + round-robin** | Enterprise-scale request for load balancing across accounts | 6 comments, 13 👍 — operational necessity for teams |

---

## Key PR Progress

| # | PR | Description | Status |
|---|-----|-------------|--------|
| [#18311](https://github.com/anomalyco/opencode/pull/18311) | **fix: skip Anthropic cache control for OAuth** | Resolves [#17910](https://github.com/anomalyco/opencode/issues/17910) — prevents `cache_control: {type: "ephemeral"}` injection on OAuth requests that Anthropic now rejects | Open, contributor-submitted |
| [#18308](https://github.com/anomalyco/opencode/pull/18308) | **refactor: replace BunProc with Npm module** | Major architectural change: removes Bun-specific package management, replaces with `@npmcli/arborist` for deterministic installs; unblocks non-Bun runtimes | Open, vouched by thdxr |
| [#18288](https://github.com/anomalyco/opencode/pull/18288) | **feat: multi-grid session tiling view** | Hyprland-style dynamic tiling for chat sessions; significant UX enhancement for multi-session workflows | Open |
| [#18280](https://github.com/anomalyco/opencode/pull/18280) | **fix: plugin system robustness** | Fixes agent/command resolution crashes, async error handling, two-phase initialization; addresses stability complaints | Open, contributor |
| [#18300](https://github.com/anomalyco/opencode/pull/18300) | **fix: workspace routing & deflake e2e** | Corrects URL slug/directory confusion causing inconsistent workspace/session routing | Open |
| [#18186](https://github.com/anomalyco/opencode/pull/18186) | **anthropic legal requests** | *Merged* — removes all Anthropic references: prompt files, provider hints, auth plugin, enum entries; explains [#18265](https://github.com/anomalyco/opencode/issues/18265) | **Closed** |
| [#18304](https://github.com/anomalyco/opencode/pull/18304) | **refactor: replace Bun-specific APIs** | Portable alternatives for `Bun.write()`, `BunWebSocketData`; part of runtime diversification | **Closed** |
| [#16918](https://github.com/anomalyco/opencode/pull/16918) | **opencode 2-0** | Major version branch: LSP server improvements, dynamic formatter resolution, npm bin link fixes, core refactoring | Open, beta |
| [#18271](https://github.com/anomalyco/opencode/pull/18271) + [#18270](https://github.com/anomalyco/opencode/pull/18270) + [#18269](https://github.com/anomalyco/opencode/pull/18269) | **Effectify Command, Plugin, ToolRegistry services** | Systematic migration from legacy `Instance.state()` to Effect framework; three parallel PRs by kitlangton | Open, vouched |
| [#18272](https://github.com/anomalyco/opencode/pull/18272) | **feat: ACP attach support** | Adds `--attach` to `opencode acp` for bridging stdio to existing `opencode serve` backends; enables persistent daemon workflows | Open, contributor |

---

## Feature Request Trends

| Trend | Evidence | Implication |
|-------|----------|-------------|
| **Multi-account / load balancing** | [#11830](https://github.com/anomalyco/opencode/issues/11830), [#8145](https://github.com/anomalyco/opencode/issues/8145) | Rate limits and reliability drive need for credential rotation; enterprise teams need operational redundancy |
| **Privacy-hardened local operation** | [#10416](https://github.com/anomalyco/opencode/issues/10416), [#17994](https://github.com/anomalyco/opencode/issues/17994) | Users want air-gapped or fully local execution; metadata leakage to cloud is unacceptable |
| **Multi-agent orchestration** | [#17994](https://github.com/anomalyco/opencode/issues/17994) | "Team of coding agents in isolated workspaces" — moving beyond single-agent to coordinated systems |
| **Thinking/reasoning mode exposure** | [#17030](https://github.com/anomalyco/opencode/issues/17030) | Demand for Grok 4.2, GPT-5 reasoning controls; users want visibility into model cognition |
| **Token/ cost management** | [#2637](https://github.com/anomalyco/opencode/issues/2637) | Long-session cost control via input token limits; operational budgeting for AI coding |

---

## Developer Pain Points

| Pain Point | Frequency | Details |
|------------|-----------|---------|
| **Anthropic integration fragility** | Critical | OAuth breaks, credential conflicts, legal takedowns, cache-control regressions — highest priority cluster |
| **Bun runtime lock-in** | High | Ongoing migration effort; users hitting Bun-specific bugs, need portable Node.js alternatives |
| **Permission system unreliability** | High | [#16331](https://github.com/anomalyco/opencode/issues/16331), [#7006](https://github.com/anomalyco/opencode/issues/7006) — security promises not enforced, plugin hooks not triggered |
| **Model-specific parameter injection** | Medium-High | [#13546](https://github.com/anomalyco/opencode/issues/13546), [#10755](https://github.com/anomalyco/opencode/issues/10755) — OpenCode assumes OpenAI behavior, breaks compatible providers |
| **Windows UX friction** | Medium | [#7957](https://github.com/anomalyco/opencode/issues/7957), [#11301](https://github.com/anomalyco/opencode/issues/11301), [#18211](https://github.com/anomalyco/opencode/issues/18211) — Ctrl+C exit, compaction hangs, task creation failures |
| **MCP / external tool auth** | Medium | [#5636](https://github.com/anomalyco/opencode/issues/5636), [#12308](https://github.com/anomalyco/opencode/issues/12308) — Figma 405 errors, Entra authentication broken |
| **Session management after compaction** | Medium | [#11301](https://github.com/anomalyco/opencode/issues/11301), [#14972](https://github.com/anomalyco/opencode/issues/14972) — agent stops, loops, or loses context post-compaction |

---

*Digest compiled from github.com/anomalyco/opencode — 50 issues, 50 PRs analyzed.*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-03-20

---

## 1. Today's Highlights

The Qwen Code team pushed **v0.13.0-preview.0**, introducing system prompt customization and OpenRouter pipeline fixes. Meanwhile, community activity surged around **edit tool reliability**—multiple critical bugs were reported and rapidly patched, including CRLF normalization and settings preservation fixes. The `.agents/skills` directory convention is gaining traction as a cross-tool standard.

---

## 2. Releases

### v0.13.0-preview.0
| Item | Details |
|------|---------|
| **Version** | 0.13.0-preview.0 |
| **Key Changes** | • System prompt customization option<br>• Fixed duplicate `finish_reason` chunks from OpenRouter<br>• Version bump to 0.13.0 |
| **Links** | [Release](https://github.com/QwenLM/qwen-code/pull/2451) · [OpenRouter fix](https://github.com/QwenLM/qwen-code/pull/2403) |

---

## 3. Hot Issues

| # | Issue | Why It Matters | Community Reaction |
|---|-------|--------------|-------------------|
| [#1922](https://github.com/QwenLM/qwen-code/issues/1922) | Edit tool fails to modify files in latest version | **Regression** — core editing functionality broken after previously being fixed | 10 comments; users report workflow disruption |
| [#2460](https://github.com/QwenLM/qwen-code/issues/2460) | Severe "edit failed" errors in CLI & VS Code; agent resorts to node/ps causing code corruption | **Data loss risk** — described as "destroying all projects" | 7 comments; urgent tone from affected users |
| [#486](https://github.com/QwenLM/qwen-code/issues/486) | Proposal: Standardized Tool Management and Distribution System | **Ecosystem architecture** — long-standing request for plugin marketplace | 9 comments; foundational for extensibility |
| [#2155](https://github.com/QwenLM/qwen-code/issues/2155) | Support `.agents/skills` (with "s") directory | **Cross-tool compatibility** — aligns with emerging convention (Claude Code, etc.) | 3 comments; community pushing standardization |
| [#2496](https://github.com/QwenLM/qwen-code/issues/2496) | Mixed Chinese-English filenames misread as containing spaces | **i18n bug** — breaks file access for CJK users | 2 comments; specific reproduction provided |
| [#2454](https://github.com/QwenLM/qwen-code/issues/2454) | `/model` command silently removes manually-added models | **Settings corruption** — user configuration loss without warning | 2 comments; fix already in PR pipeline |
| [#2499](https://github.com/QwenLM/qwen-code/issues/2499) | Agent overwrites files with `write_file` without reading first | **Data loss pattern** — bypasses safe edit workflow | 2 comments; fundamental tool-use issue |
| [#2497](https://github.com/QwenLM/qwen-code/issues/2497) | Request: Disable persistent "Always Allow" approvals | **Security/control** — enterprise users need per-action confirmation | 2 comments; compliance-related |
| [#2386](https://github.com/QwenLM/qwen-code/issues/2386) | Slow startup on Windows 11 terminal | **Performance** — 2+ second delay entering CLI | 2 comments; Windows-specific optimization needed |
| [#2500](https://github.com/QwenLM/qwen-code/issues/2500) | Qwen kills itself when terminating Node.js processes | **Shell isolation** — agent exits when killing related processes | 1 comment; process management edge case |

---

## 4. Key PR Progress

| # | PR | Feature/Fix | Status |
|---|-----|-------------|--------|
| [#2509](https://github.com/QwenLM/qwen-code/pull/2509) | Ensure `max_tokens` exceeds `thinking.budget_tokens` for Anthropic | Fixes 400 errors with extended thinking mode | 🔵 Open |
| [#1978](https://github.com/QwenLM/qwen-code/pull/1978) | VS Code image paste support | Hard end-to-end image workflow; 0.13.0 milestone | 🔵 Open |
| [#2127](https://github.com/QwenLM/qwen-code/pull/2127) | Configurable runtime output directory | `advanced.runtimeOutputDir` + `QWEN_RUNTIME_DIR` env var | 🔵 Open |
| [#2371](https://github.com/QwenLM/qwen-code/pull/2371) | `/btw` slash command for ephemeral side questions | No history, no tools, low cost — quick Q&A without context pollution | 🔵 Open |
| [#2420](https://github.com/QwenLM/qwen-code/pull/2420) | Ctrl+Y to skip rate-limit retry delay | UX improvement for shared-account TPM throttling | 🔵 Open |
| [#2501](https://github.com/QwenLM/qwen-code/pull/2501) | VS Code proxy configuration pass-through | Corporate proxy support for IDE companion | 🔵 Open |
| [#2476](https://github.com/QwenLM/qwen-code/pull/2476) | Add `.agents/skills` as skill provider directory | One-line change for cross-tool convention compliance | 🔵 Open |
| [#2504](https://github.com/QwenLM/qwen-code/pull/2504) | Prevent `/model` from overwriting externally-added settings | Fixes #2454 — preserves user configuration | 🔵 Open |
| [#2503](https://github.com/QwenLM/qwen-code/pull/2503) | Handle escaped pipe characters in markdown tables | Fixes #2461 — `A\|B` no longer splits columns | 🔵 Open |
| [#2502](https://github.com/QwenLM/qwen-code/pull/2502) | `extends: bundled` mechanism for skills | Closes #2379 — append to bundled skills without full replacement | 🔵 Open |

**Recently Merged:**
- [#2474](https://github.com/QwenLM/qwen-code/pull/2474) CRLF normalization in edit tool (fixes multi-line edit failures)
- [#2495](https://github.com/QwenLM/qwen-code/pull/2495) TOS link fix in VS Code extension
- [#2483](https://github.com/QwenLM/qwen-code/pull/2483) ACP fallback to local filesystem when IDE rejects write

---

## 5. Feature Request Trends

| Trend | Evidence | Implications |
|-------|----------|--------------|
| **Skill ecosystem standardization** | #486, #2155, #2476, #2379/#2502 | Community pushing for `.agents/skills` convention and extensible skill inheritance |
| **Fine-grained permission/approval controls** | #2497, #2283 (merged permission system) | Enterprise adoption requires audit trails and per-action consent |
| **IDE integration hardening** | #987, #2501, #1978, #2305 | ACP protocol maturity; proxy, image, and path validation gaps being closed |
| **TUI/UX customization** | #2034 (disable thinking quotes), #2227 (Mac shortcut adaptation) | Personalization and platform-native experience expectations |
| **Configuration management safety** | #2454, #2504, #2498 | Users losing manual config changes — need atomic, non-destructive settings updates |

---

## 6. Developer Pain Points

| Pain Point | Frequency | Current Mitigation |
|------------|-----------|------------------|
| **Edit tool reliability** | 🔴 Critical — #1922, #2460, #2499, #2474 | CRLF fix merged; broader edit workflow safety under review |
| **File handling with i18n filenames** | 🟡 Moderate — #2496 | Reproduction confirmed; fix pending |
| **Settings.json corruption/loss** | 🟡 Moderate — #2454, #2504 | PR #2504 addresses root cause in `setValue()` |
| **Windows performance** | 🟡 Moderate — #2386 | No assigned fix yet |
| **MCP/tool discovery failures** | 🟡 Moderate — #2466, #2488 | Documentation gaps; branching MCP support requested |
| **Process isolation (self-termination)** | 🟢 Emerging — #2500 | Shell session boundaries need hardening |

---

*Digest compiled from github.com/QwenLM/qwen-code — 2026-03-20*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/duanyytop/agents-radar).*