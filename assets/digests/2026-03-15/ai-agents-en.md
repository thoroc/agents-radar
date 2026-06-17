# OpenClaw Ecosystem Digest 2026-03-15

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-03-15 00:10 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-03-15

## 1. Today's Overview

OpenClaw shows **exceptionally high activity** with 500 issues and 500 PRs updated in the last 24 hours, indicating a project under intensive development and active triage. The release of `v2026.3.13-1` as a recovery release signals recent instability in the 2026.3.x series. The community is heavily focused on **regression reports** following the 2026.3.12 release, with critical bugs affecting core functionality including memory leaks, gateway connectivity, and WhatsApp integration. The 89.4% open issue rate (447/500) and 79.4% open PR rate (397/500) suggest a potential backlog accumulation that may need maintainer attention.

---

## 2. Releases

### v2026.3.13-1 — Recovery Release
| Attribute | Detail |
|-----------|--------|
| **Type** | Hotfix recovery |
| **Reason** | Broken `v2026.3.13` tag/release path required immutable release workaround |
| **npm version** | Still `2026.3.13` (not `-1`) |
| **Key change** | Android chat settings sheet redesign |

**Migration notes:** Users on broken `v2026.3.13` should upgrade to `v2026.3.13-1`. No npm action needed.

### v2026.3.13-beta.1 — Pre-release
| Attribute | Detail |
|-----------|--------|
| **npm tag** | `v2026.3.13-beta.1` |
| **macOS assets** | Reuses stable `2026.3.13` build |
| **appcast.xml** | Unchanged (intentional) |

---

## 3. Project Progress

### Merged/Closed PRs Today (Selected)

| PR | Author | Summary | Impact |
|----|--------|---------|--------|
| [#46663](https://github.com/openclaw/openclaw/pull/46663) | @Takhoffman | Fix ZaloUser DM allowlist inheritance for groups | Channel routing reliability |
| [#46649](https://github.com/openclaw/openclaw/pull/46649) | @ademczuk | **Revert**: Restore `supportsUsageInStreaming=false` default | Fixes Ollama/LM Studio/TGI/Mistral API breakages |
| [#46658](https://github.com/openclaw/openclaw/pull/46658) | @ademczuk | Remove re-introduced `auth.mode=none` pairing bypass | **Security fix** — closes auth bypass regression |
| [#46651](https://github.com/openclaw/openclaw/pull/46651) | @Takhoffman | Fix Feishu sender-scoped thread bootstrap | Cross-platform messaging consistency |
| [#46440](https://github.com/openclaw/openclaw/pull/46440) | @vincentkoc | Add `@openclaw/secops` ownership for sensitive paths | Security governance |
| [#20317](https://github.com/openclaw/openclaw/pull/20317) | @nmccready | Add toggle to hide tool calls/thinking blocks in webchat | UX improvement |
| [#22299](https://github.com/openclaw/openclaw/pull/22299) | @lunaviva211-sketch | Fix gateway loopback mode rejecting internal connections | Subagent/session reliability |
| [#45572](https://github.com/openclaw/openclaw/pull/45572) | @HenryLoenwind | Fix context usage warning displaying wrong data | UI accuracy |

**Key advances:**
- **Security hardening**: Secops ownership model + auth bypass fix
- **Provider compatibility**: Revert prevents widespread breakage with local/compatible endpoints
- **Cross-channel reliability**: Zalo, Feishu, Discord fixes for DM/group routing

---

## 4. Community Hot Topics

### Most Active Issues (by comment count)

| Rank | Issue | Comments | Category | Core Need |
|------|-------|----------|----------|-----------|
| 1 | [#45471](https://github.com/openclaw/openclaw/issues/45471) UI chat not opening | 69 | **Critical regression** | Basic functionality restoration |
| 2 | [#45074](https://github.com/openclaw/openclaw/issues/45074) Tools intermittent 'Tool not found' | 19 | **Critical regression** | Tool dispatch reliability |
| 3 | [#45064](https://github.com/openclaw/openclaw/issues/45064) Memory leak — OOM on basic commands | 17 | **Stability** | Resource management |
| 4 | [#45171](https://github.com/openclaw/openclaw/issues/45171) WhatsApp outbound send broken | 15 | **Channel regression** | Messaging reliability |
| 5 | [#45227](https://github.com/openclaw/openclaw/issues/45227) 422 status with Mistral | 14 | **Provider compatibility** | API integration stability |

**Underlying needs analysis:**
- **Stability over features**: Users need reliable core functionality before new capabilities
- **Version pinning anxiety**: Multiple reports explicitly mention "after upgrading to 2026.3.12"
- **Channel diversity pain**: WhatsApp, Slack, Telegram, Signal all showing integration fragility
- **Local/self-hosted support**: Strong demand for Ollama, LM Studio, local gateway stability

---

## 5. Bugs & Stability

### Critical Severity (Data Loss / Complete Blocker)

| Issue | Symptom | Fix PR? |
|-------|---------|---------|
| [#45471](https://github.com/openclaw/openclaw/issues/45471) | UI chat completely non-functional | ❌ No |
| [#45064](https://github.com/openclaw/openclaw/issues/45064) | OOM crash on `gateway status`, `doctor` | ❌ No |
| [#45074](https://github.com/openclaw/openclaw/issues/45074) | 50% tool call failure rate | ❌ No |
| [#45171](https://github.com/openclaw/openclaw/issues/45171) | WhatsApp outbound messaging broken | ❌ No |

### High Severity (Major Feature Broken)

| Issue | Symptom | Fix PR? |
|-------|---------|---------|
| [#45227](https://github.com/openclaw/openclaw/issues/45227) | Mistral 422 errors | [#46649](https://github.com/openclaw/openclaw/pull/46649) reverted related change |
| [#45504](https://github.com/openclaw/openclaw/issues/45504) | `devices list/approve` fail against local gateway | ❌ No |
| [#44714](https://github.com/openclaw/openclaw/issues/44714) | `openclaw logs --follow` handshake timeout | ❌ No |
| [#45283](https://github.com/openclaw/openclaw/issues/45283) | Control UI freezes on main session | ❌ No |
| [#45311](https://github.com/openclaw/openclaw/issues/45311) | Slack socket mode receives zero events | ❌ No |

### Stability Pattern Analysis
**Regression cluster in 2026.3.12**: 70%+ of critical bugs explicitly cite this version. Suggests:
- Insufficient integration testing for gateway/WebSocket layer
- Provider API compatibility changes not caught in beta
- Memory management changes introduced leaks

---

## 6. Feature Requests & Roadmap Signals

### Active Feature Development (Open PRs)

| PR | Feature | Likelihood in Next Version |
|----|---------|---------------------------|
| [#41496](https://github.com/openclaw/openclaw/pull/41496) | Plugin hooks for TTS/ASR/Embedding/Image/Video | **High** — XL PR, comprehensive |
| [#46657](https://github.com/openclaw/openclaw/pull/46657) | Trust Windows for time-bounded exec approvals | **High** — security/usability priority |
| [#44231](https://github.com/openclaw/openclaw/pull/44231) | Alibaba Cloud ECS skill | **Medium** — market expansion (China) |
| [#45132](https://github.com/openclaw/openclaw/pull/45132) | Slack mux receiver for multi-gateway | **Medium** — enterprise scaling |
| [#40946](https://github.com/openclaw/openclaw/pull/40946) | Matrix SDK replacement | **Medium** — technical debt |
| [#40574](https://github.com/openclaw/openclaw/pull/40574) | Write tool append mode | **High** — data safety |

### User-Requested Features (Issues)

| Issue | Request | Signal Strength |
|-------|---------|---------------|
| [#45608](https://github.com/openclaw/openclaw/issues/45608) | Pre-reset agentic memory flush | Strong — session management gap |
| [#23281](https://github.com/openclaw/openclaw/issues/23281) | User-configurable vision model for image tool | Moderate — configuration flexibility |
| [#12092](https://github.com/openclaw/openclaw/issues/12092) | Skills hot-reload without session restart | Moderate — DX improvement |

---

## 7. User Feedback Summary

### Pain Points (Verbatim Themes)

| Theme | Evidence | Severity |
|-------|----------|----------|
| **"After upgrading to 2026.3.12..."** | 15+ issues | 🔴 Critical |
| **"Works in 2026.3.11, broken in 2026.3.12"** | 5+ explicit comparisons | 🔴 Critical |
| **"No active WhatsApp Web listener"** | 6+ related issues | 🔴 Critical |
| **"Tool not found" intermittency** | 50% failure rate reported | 🔴 Critical |
| **Memory/Context management** | OOM, 100% context UI breaks | 🟡 High |
| **Gateway connectivity flakiness** | WebSocket handshake failures | 🟡 High |

### Use Cases Emerging
- **Multi-channel operations**: Users running WhatsApp + Telegram + Slack simultaneously
- **Local/self-hosted stacks**: Ollama + local gateway + custom models
- **Automation-heavy workflows**: Cron jobs, subagent spawning, device management
- **Enterprise deployments**: Multi-gateway, mux routing, approval workflows

### Satisfaction Signals
- Active community triage (high comment counts = engagement)
- Quick security fixes (#46658 same-day merge)
- Responsive reverts when breakage detected (#46649)

---

## 8. Backlog Watch

### Issues Needing Maintainer Attention (>7 days, high impact)

| Issue | Age | Problem | Risk |
|-------|-----|---------|------|
| [#12092](https://github.com/openclaw/openclaw/issues/12092) | 35 days | Skills not hot-reloadable | DX friction |
| [#8731](https://github.com/openclaw/openclaw/issues/8731) | 39 days | Bulk message delivery only after task complete | UX expectation mismatch |
| [#14936](https://github.com/openclaw/openclaw/issues/14936) | 31 days | MiniMax M2.5 chunking to Telegram | Provider-specific behavior |
| [#25215](https://github.com/openclaw/openclaw/issues/25215) | 19 days | SSRF check blocks Clash/mihomo fake-ip | Networking compatibility |
| [#26044](https://github.com/openclaw/openclaw/issues/26044) | 18 days | Gateway start fails after stop (requires reinstall) | Core workflow broken |
| [#27473](https://github.com/openclaw/openclaw/issues/27473) | 17 days | Non-loopback Control UI requires allowedOrigins | Deployment friction |

### PRs At Risk of Stale

| PR | Age | Blocker |
|----|-----|---------|
| [#21940](https://github.com/openclaw/openclaw/pull/21940) | 23 days | Web UI layout fix — needs review |
| [#19328](https://github.com/openclaw/openclaw/pull/19328) | 26 days | Model override race condition — critical fix |
| [#41496](https://github.com/openclaw/openclaw/pull/41496) | 6 days | XL plugin hooks PR — needs thorough review |

---

## Project Health Assessment

| Metric | Status | Trend |
|--------|--------|-------|
| Release stability | ⚠️ **At risk** | Recovery release needed |
| Issue triage | 🔴 **Backlogged** | 89% open rate |
| Security responsiveness | 🟢 **Strong** | Same-day critical fixes |
| Community engagement | 🟢 **Very active** | 1000 items updated/24h |
| Provider compatibility | ⚠️ **Fragile** | Revert needed for local endpoints |

**Recommendation**: Consider a stabilization sprint focusing on 2026.3.12 regression fixes before new feature development.

---

## Cross-Ecosystem Comparison

# Cross-Project AI Agent Ecosystem Report — 2026-03-15

## 1. Ecosystem Overview

The open-source personal AI assistant ecosystem is experiencing **intense development velocity** across 12+ active projects, with a combined 1,000+ GitHub events in the last 24 hours. The landscape is fragmenting into three tiers: **mature platforms** (OpenClaw, NanoBot) handling enterprise-scale complexity, **rapidly iterating challengers** (ZeroClaw, PicoClaw, NullClaw) optimizing for specific use cases, and **emerging specialists** (TinyClaw, ZeptoClaw) exploring protocol standards and accessibility. A critical inflection point is emerging around **multi-agent orchestration**, **security sandboxing tradeoffs**, and **local-first AI execution**—with projects making divergent bets on configurability versus safety defaults.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Releases | Health Score | Status |
|:---|:---:|:---:|:---|:---|:---|
| **OpenClaw** | 500 | 500 | v2026.3.13-1 (recovery) | ⚠️ At risk | Regression crisis, backlog accumulation |
| **NanoBot** | 27 | 57 | v0.1.4.post4 | 🟢 Strong | High velocity, keeping pace |
| **ZeroClaw** | 31 | 50 | v0.3.0, v0.2.2 | 🟢 Stable | Security-first, rapid iteration |
| **PicoClaw** | 20 | 61 | v0.2.3-nightly | 🟡 Improving | Fast-moving, cron reliability issues |
| **NanoClaw** | 18 | 50 | None | 🔴 Concerning | 12% merge rate, stalled releases |
| **NullClaw** | 16 | 41 | v2026.3.14 | 🟢 Healthy | Security hardening focus |
| **IronClaw** | 19 | 50 | None (v0.16.1) | 🟡 Stable with friction | CI excellence, doc gaps |
| **LobsterAI** | 3 | 3 | v0.2.3 | 🟡 Maintenance mode | Low engagement, platform parity gaps |
| **TinyClaw** | 1 | 5 | None | 🟡 Active accumulation | Review bottleneck, 0 merges |
| **Moltis** | 9 | 6 | None | 🟢 Healthy maintenance | Windows parity focus |
| **CoPaw** | 50 | 29 | None (v0.0.7) | 🟢 Robust | Strong community, Windows pain |
| **ZeptoClaw** | 6 | 6 | None | 🟢 Green | Responsive, security-conscious |
| **EasyClaw** | 0 | 0 | — | ⚫ Inactive | No activity |

---

## 3. OpenClaw's Position

### Advantages vs. Peers
| Dimension | OpenClaw Position | Peer Comparison |
|:---|:---|:---|
| **Scale** | 1,000 events/day, 500 issues/PRs each | 10-20x larger than nearest competitor (NanoBot: 84 events) |
| **Channel diversity** | WhatsApp, Telegram, Signal, Slack, Discord, Feishu, Zalo | Most peers cover 3-5 channels; OpenClaw has deepest enterprise IM coverage |
| **Release infrastructure** | Sophisticated versioning (2026.3.x), recovery releases | Peers on 0.x semver; NanoClaw has no releases |
| **Security governance** | `@openclaw/secops` ownership model, same-day critical fixes | ZeroClaw comparable; others lagging |

### Technical Approach Differences
| Aspect | OpenClaw | Peers |
|:---|:---|:---|
| **Architecture** | Monolithic gateway with plugin ecosystem | NanoBot: modular Python; ZeroClaw: Rust safety-first; PicoClaw: event-driven refactor |
| **Sandboxing** | Configurable tiers (bypass exists but guarded) | ZeroClaw: "paranoid by default" (user friction); NanoClaw: container-based (Intel Mac gaps) |
| **Local AI support** | Ollama/LM Studio/TGI first-class | Moltis: GGUF dynamic loading; ZeptoClaw: Zhipu validation; LobsterAI: Ollama broken (#405) |

### Community Size Comparison
OpenClaw operates at **ecosystem-scale** with activity metrics comparable to the next 5 projects combined. However, this scale creates **triage debt** (89% open issue rate) versus NanoBot's sustainable 56% merge rate or ZeptoClaw's 5:1 resolution ratio.

---

## 4. Shared Technical Focus Areas

| Requirement | Projects | Specific Needs |
|:---|:---|:---|
| **Multi-agent orchestration** | NanoBot (#2013, #2002), PicoClaw (#1316, #294), ZeroClaw (#3502), NullClaw (#553, #508) | Subagent visibility, inter-agent communication, skill injection, shared task boards |
| **Windows platform parity** | CoPaw (#1431, #1495, #1485), Moltis (#434, #436), IronClaw (CI focus), NanoClaw (Intel Mac exclusion) | File locking, cross-disk moves, proxy handling, port conflicts, container runtime |
| **Security/permission configurability** | ZeroClaw (#1478: "除了安全,什么功能也没有"), OpenClaw (#46658 auth bypass fix), NanoClaw (#926 admin mode), ZeptoClaw (#347 default hardening) | Granular tiers, "developer mode," escape hatches, audit trails |
| **Local/self-hosted AI** | OpenClaw (Ollama revert #46649), Moltis (#417 GGUF hot-loading), LobsterAI (#405 Ollama broken), ZeptoClaw (Zhipu validation) | Dynamic model loading, endpoint validation, tool execution parity |
| **Enterprise channel integrations** | OpenClaw (Feishu, Zalo), NanoBot (QQ, WeCom, Feishu), CoPaw (DingTalk, Feishu), ZeroClaw (WeCom), PicoClaw (Feishu-heavy) | Card messages, file sharing, thread replies, enterprise auth |
| **Observability & control** | PicoClaw (#1316 event-driven loop), NanoBot (#1955 sub-agent visibility), OpenClaw (thinking blocks toggle #20317) | Interruptibility, steering, execution tracing, cost tracking |

---

## 5. Differentiation Analysis

| Project | Core Differentiation | Target User | Architecture Signature |
|:---|:---|:---|:---|
| **OpenClaw** | Scale, channel breadth, enterprise governance | Multi-channel operators, IT departments | TypeScript monolith, gateway-centric |
| **NanoBot** | Python accessibility, rapid multi-agent experimentation | Developers, researchers | Modular Python, async-first |
| **ZeroClaw** | Rust safety, aggressive sandboxing, "works as chatbot" guarantee | Security-conscious personal users | Rust, paranoid defaults |
| **PicoClaw** | Event-driven agent refactor, hardware integration (Sipeed) | Embedded/edge, Chinese enterprise | Rust, interruptible loops |
| **NanoClaw** | Container sandboxing, skill self-creation | Privacy-first technical users | TypeScript, Docker-native |
| **NullClaw** | Zig performance, subagent routing, Claude CLI integration | Systems programmers | Zig, minimal dependencies |
| **IronClaw** | WASM skills, staging CI rigor, NEAR integration | Web3, protocol developers | Rust, WASM runtime |
| **CoPaw** | AgentScope lineage, Chinese market optimization | Business automation, customer service | Python, multi-tenant design |
| **ZeptoClaw** | ACP protocol implementation, MCP compatibility | Protocol adopters, integrators | Python, standards-first |
| **TinyClaw** | Minimalism, web-first onboarding | Non-technical users, accessibility | Python, queue simplification |
| **Moltis** | Local LLM workflow, cron reliability | Self-hosters, automation users | Rust, GGUF-native |
| **LobsterAI** | NetEase ecosystem, "CoworkAgent" UX | Chinese consumers, casual users | Tauri/electron, memory integration |

---

## 6. Community Momentum & Maturity

### Tier 1: Rapid Iteration (High Velocity, High Risk)
| Project | Velocity Signal | Risk Factor |
|:---|:---|:---|
| **OpenClaw** | 1,000 events/day | 2026.3.12 regression cluster, 89% open issue rate |
| **PicoClaw** | 81 events, 56% merge rate | Cron subsystem failures, nightly-only releases |
| **NanoBot** | 84 events, 34 open PRs | History slicing bugs, model compatibility drift |

### Tier 2: Stabilization (Quality Focus, Review Backlogs)
| Project | Stabilization Signal | Constraint |
|:---|:---|:---|
| **IronClaw** | 13/19 issues closed by CI | 32 open PRs, documentation gaps |
| **CoPaw** | 33/50 issues closed | Windows technical debt accumulation |
| **NullClaw** | v2026.3.14 security release | Subagent skill injection architecture pending |

### Tier 3: Maintenance/Accumulation (Low Merge Velocity)
| Project | Pattern | Concern |
|:---|:---|:---|
| **NanoClaw** | 12% merge rate, 0 releases | Maintainer bandwidth constraint |
| **TinyClaw** | 5 open PRs, 0 merges | Review bottleneck |
| **LobsterAI** | 3 PRs, minimal engagement | Platform parity erosion (Apple Silicon, Ollama) |

### Tier 4: Responsive/Sustainable
| Project | Model | Sustainability Indicator |
|:---|:---|:---|
| **ZeroClaw** | Small core, same-day fixes | No stale critical issues |
| **ZeptoClaw** | Centralized governance, 5:1 resolution | All items <4 days old |
| **Moltis** | Focused scope, quality-first | 4/9 issues closed, regression tests mandatory |

---

## 7. Trend Signals for AI Agent Developers

| Trend | Evidence | Implication |
|:---|:---|:---|
| **"Local-first" is table stakes, not differentiator** | OpenClaw Ollama revert crisis, Moltis GGUF hot-loading, LobsterAI Ollama failure | Users expect seamless local/cloud parity; implementation quality matters more than presence |
| **Security configurability > security absolutism** | ZeroClaw #1478 backlash ("only works as chatbot"), OpenClaw approval tiers, NanoClaw admin mode requests | Power users demand escape hatches; "paranoid by default" creates support load |
| **Multi-agent is the next battleground** | NanoBot team mode, PicoClaw event-driven refactor, NullClaw subagent routing, IronClaw adaptive learning | First-mover advantage in observable, interruptible, collaborative agent systems |
| **Windows as enterprise gatekeeper** | CoPaw, Moltis, IronClaw all prioritizing Windows fixes | Cross-platform is not optional; Rust projects have edge in reliable Windows support |
| **Protocol consolidation incoming** | ZeptoClaw ACP implementation, MCP ecosystem references | Developers should bet on standards (ACP/MCP) over proprietary skill systems |
| **Chinese market integration intensity** | Feishu/QQ/DingTalk/WeCom dominant across OpenClaw, NanoBot, CoPaw, PicoClaw | Enterprise adoption requires deep platform-specific media handling, not just message passing |
| **Documentation as competitive moat** | IronClaw "four .md files" blocking adoption, NullClaw subagent docs gap, TinyClaw web onboarding demand | Feature velocity without discoverability creates adoption ceiling |

---

**Strategic Recommendation**: Developers evaluating this ecosystem should weight **OpenClaw** for production multi-channel deployments with tolerance for version pinning discipline; **ZeroClaw** for security-critical personal use; **NanoBot** or **PicoClaw** for multi-agent experimentation; and **ZeptoClaw** for protocol-standard-aligned integration work.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-03-15

## 1. Today's Overview

NanoBot shows **exceptionally high community activity** with 84 total updates in 24 hours (27 issues, 57 PRs), indicating a rapidly maturing open-source AI agent framework. The project is experiencing intense development velocity with 34 open PRs under active review and 23 merged/closed, suggesting maintainers are keeping pace with contributions. No new release was cut today, but the volume of channel integrations (QQ, WhatsApp, Discord, Feishu) and core infrastructure PRs signals a v0.1.5 or v0.2.0 release may be imminent. The community is heavily focused on **multi-channel deployment**, **observability**, and **enterprise features** like sandboxing and team collaboration. Overall project health appears strong with diverse contributor engagement across Chinese and English-speaking communities.

---

## 2. Releases

**No new releases today.** The latest version remains `v0.1.4.post4` (released 2026-03-13 per issue #1765). Multiple users report difficulty upgrading from post3 to post4 via source installation, suggesting release process friction.

---

## 3. Project Progress

### Merged/Closed PRs (23 total, key highlights):

| PR | Description | Impact |
|:---|:---|:---|
| [#2006](https://github.com/HKUDS/nanobot/pull/2006) | Interactive `nanobot onboard` CLI wizard with arrow-key navigation | **Major UX improvement** — eliminates manual JSON editing |
| [#1684](https://github.com/HKUDS/nanobot/pull/1684) | Fix CLI agent mode using wrong cron store path | Fixes session persistence bug |
| [#2027](https://github.com/HKUDS/nanobot/pull/2027) | Configurable background feedback levels for gateway | Infrastructure for observability |
| [#1262](https://github.com/HKUDS/nanobot/issues/1262) | Telegram `reply_to` parameter for threaded conversations | Closed via implementation |

### Advanced Features in Open PRs:

- **Team Multi-Agent Mode** ([#2013](https://github.com/HKUDS/nanobot/pull/2013)): LLM-planned 2-3 worker async collaboration with shared task board
- **Inter-Agent Communication Channel** ([#2002](https://github.com/HKUDS/nanobot/pull/2002)): Direct HTTP between NanoBot instances for autonomous agent swarms
- **Security Hardening** ([#1940](https://github.com/HKUDS/nanobot/pull/1940)): Bubblewrap sandbox for `exec` calls, non-root container execution
- **Voice/Audio Infrastructure** ([#1306](https://github.com/HKUDS/nanobot/pull/1306)): Discord TTS, audio transcription, reusable `speak` tool

---

## 4. Community Hot Topics

| Rank | Issue/PR | Comments | Analysis |
|:---|:---|:---:|:---|
| 1 | [#1955](https://github.com/HKUDS/nanobot/issues/1955) Sub-agent execution visibility | 10 | **Core architecture need**: Users need observability into hierarchical agent execution — currently black-box vs. main agent's transparent loop |
| 2 | [#1692](https://github.com/HKUDS/nanobot/issues/1692) Telegram double answers | 6, 👍4 | **High-impact bug** affecting UX; markdown rendering duplication |
| 3 | [#1932](https://github.com/HKUDS/nanobot/issues/1932) Skill enable/disable toggle | 4 | **Workflow flexibility** — PR [#2023](https://github.com/HKUDS/nanobot/pull/2023) already submitted |
| 4 | [#2000](https://github.com/HKUDS/nanobot/issues/2000) QQ image recognition | 4 | **China-market critical**: Community already provided patch, needs merge |
| 5 | [#1988](https://github.com/HKUDS/nanobot/issues/1988) WeCom channel broken | 4 | **Enterprise blocker**: Config schema drift, "No Channels Enabled" error |

**Underlying Pattern**: Users are deploying NanoBot in **production multi-channel environments** (QQ, WeCom, Feishu, Telegram, WhatsApp) and hitting friction with configuration management, observability, and platform-specific media handling.

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|:---|:---|:---|:---|
| 🔴 **High** | [#1692](https://github.com/HKUDS/nanobot/issues/1692) | Telegram duplicate message rendering | No PR yet |
| 🔴 **High** | [#1998](https://github.com/HKUDS/nanobot/issues/1998) | Coder models (GLM-5, Qwen-3.5) fail with `function.arguments` JSON format error | No PR; workaround: use Kimi-2.5 |
| 🔴 **High** | [#2007](https://github.com/HKUDS/nanobot/issues/2007) | Feishu: "Message has tool role, but no previous assistant message with tool call" — history corruption after long conversations | No PR |
| 🟡 **Medium** | [#1174](https://github.com/HKUDS/nanobot/issues/1174) | Memory consolidation fails/slow with local models, blocks new sessions | PR [#1961](https://github.com/HKUDS/nanobot/pull/1961) proposes async background consolidation |
| 🟡 **Medium** | [#1829](https://github.com/HKUDS/nanobot/issues/1829) | Custom commands don't work after creation in Docker | No PR |
| 🟡 **Medium** | [#1765](https://github.com/HKUDS/nanobot/issues/1765) | Source upgrade from post3→post4 fails | No PR; pip/uv tooling issue |
| 🟢 **Low** | [#1956](https://github.com/HKUDS/nanobot/issues/1956) | CLI "nanobot is thinking..." not cleared | Good first issue |

**Regression Risk**: Multiple reports of **history slicing/tool call ordering bugs** ([#2007](https://github.com/HKUDS/nanobot/issues/2007), [#2015](https://github.com/HKUDS/nanobot/pull/2015)) suggest core message loop fragility under edge cases.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Request Source | Likelihood in Next Release | Notes |
|:---|:---|:---:|:---|
| **Token/cost tracking** | [#2020](https://github.com/HKUDS/nanobot/issues/2020) + PR [#2022](https://github.com/HKUDS/nanobot/pull/2022) | **90%** | PR ready, enterprise necessity |
| **Skill enable/disable toggle** | [#1932](https://github.com/HKUDS/nanobot/issues/1932) + PR [#2023](https://github.com/HKUDS/nanobot/pull/2023) | **90%** | PR ready, 4-comment demand |
| **Web search provider selection (Tavily)** | PR [#2012](https://github.com/HKUDS/nanobot/pull/2012) | **80%** | Active PR, diversifies from default |
| **NapCat QQ channel** | PR [#2016](https://github.com/HKUDS/nanobot/pull/2016) | **75%** | OneBot 11 protocol, debouncing, input simulation |
| **WhatsApp media support** | PR [#2010](https://github.com/HKUDS/nanobot/pull/2010) | **70%** | Images, audio, video, documents |
| **Nano Team Mode** | PR [#2013](https://github.com/HKUDS/nanobot/pull/2013) | **60%** | Complex multi-agent architecture, may need iteration |
| **Sub-agent execution visibility** | [#1955](https://github.com/HKUDS/nanobot/issues/1955) | **50%** | Architectural change, no PR yet |
| **Multiple custom LLM configs** | [#1991](https://github.com/HKUDS/nanobot/issues/1991) | **40%** | Config schema expansion needed |
| **Async memory consolidation** | PR [#1961](https://github.com/HKUDS/nanobot/pull/1961) | **50%** | Marked "invalid" label, may need redesign |

---

## 7. User Feedback Summary

### Pain Points
- **Configuration complexity**: "manually editing `~/.nanobot/config.json`" cited as friction point → addressed by new `nanobot onboard` wizard
- **Upgrade fragility**: Source installs not reflecting version bumps, Docker tag confusion
- **Model compatibility**: Coder-optimized models (GLM-5, Qwen-3.5) breaking tool call formats vs. "agent-optimized" models (Kimi-2.5)
- **Channel-specific limitations**: QQ lacking image recognition (community patched), WeCom config schema drift, Feishu history corruption

### Use Cases Emerging
- **Remote file access**: [#2025](https://github.com/HKUDS/nanobot/issues/2025) — unattended PC file retrieval via QQ
- **Multi-instance agent swarms**: [#2002](https://github.com/HKUDS/nanobot/pull/2002) inter-agent channel, [#2013](https://github.com/HKUDS/nanobot/pull/2013) team mode
- **Enterprise deployment**: WeCom, Feishu integrations with media handling and cost tracking

### Satisfaction Signals
- Strong community self-help: [#2000](https://github.com/HKUDS/nanobot/issues/2000) user provided complete working patch for QQ images
- Active nightly testing: [#2018](https://github.com/HKUDS/nanobot/issues/2018) users testing `feat/onboard_question` branch

---

## 8. Backlog Watch

| Issue/PR | Age | Problem | Action Needed |
|:---|:---:|:---|:---|
| [#126](https://github.com/HKUDS/nanobot/pull/126) | ~38 days | Docker CI/CD to ghcr/dockerhub | Maintainer review; author has working fork |
| [#1306](https://github.com/HKUDS/nanobot/pull/1306) | ~15 days | Voice/audio infrastructure | Large PR, needs review bandwidth |
| [#1174](https://github.com/HKUDS/nanobot/issues/1174) | ~18 days | Memory consolidation blocking sessions | PR [#1961](https://github.com/HKUDS/nanobot/pull/1961) exists but labeled "invalid" — needs maintainer direction |
| [#1549](https://github.com/HKUDS/nanobot/issues/1549) | ~10 days | `openai_codex` custom endpoint support | Config schema vs. runtime mismatch, architectural decision needed |
| [#1862](https://github.com/HKUDS/nanobot/issues/1862) | ~4 days | `restrictToWorkspace` + `/media` path conflict | Security vs. usability tradeoff, Feishu-specific |

**Critical Gap**: No maintainer response on [#1955](https://github.com/HKUDS/nanobot/issues/1955) (sub-agent observability, 10 comments) — this is a fundamental architecture question for multi-agent systems.

---

*Digest generated from 84 GitHub events on 2026-03-15. Data source: HKUDS/nanobot*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-03-15

## 1. Today's Overview

ZeroClaw shows **extremely high development velocity** with 50 PRs and 31 issues updated in 24 hours, alongside 10 releases including the stable **v0.3.0** and v0.2.2. The project is actively addressing critical security-policy friction (#1478 with 35 comments) while shipping Matrix channel hardening, Anthropic API fixes, and expanded platform support (Termux/Android). A notable pattern emerges: rapid iteration on channel reliability (Matrix, Signal, Feishu, WhatsApp) alongside core runtime stability fixes. The contributor base remains small but productive, with Argenis de la Rosa and Claude Opus 4.6 driving most changes.

---

## 2. Releases

| Version | Type | Key Changes |
|---------|------|-------------|
| **[v0.3.0](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.3.0)** | Stable | Channel matrix comprehensive tests; CI auto-sync for README and contributors |
| **[v0.2.2](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.2.2)** | Stable | Same as v0.3.0 (parallel track) |
| **[v0.2.1](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.2.1)** | Stable | WeCom (WeChat Enterprise) Bot Webhook; tool_filter_groups for MCP schema filtering; interactive session state persistence; crates.io publishing |

**Breaking Changes/Migration:** None explicitly flagged. Users upgrading from v0.2.0 should verify `compact_context` setting (see #1984 below).

---

## 3. Project Progress

### Merged/Closed PRs (Selected)

| PR | Author | Summary | Impact |
|----|--------|---------|--------|
| [#3525](https://github.com/zeroclaw-labs/zeroclaw/pull/3525) | @theonlyhennygod | Termux/Android (aarch64-linux-android) release target | Mobile/ARM64 deployment |
| [#3515](https://github.com/zeroclaw-labs/zeroclaw/pull/3515) / [#3483](https://github.com/zeroclaw-labs/zeroclaw/pull/3483) | @theonlyhennygod, @JimmyHu213 | Skip empty text blocks in Anthropic API requests | Fixes persistent 400 errors breaking sessions |
| [#3482](https://github.com/zeroclaw-labs/zeroclaw/pull/3482) | @5queezer | Fix `/dev/stdin` redirect in guided installer | Debian/Linux install reliability |
| [#3516](https://github.com/zeroclaw-labs/zeroclaw/pull/3516) / [#3484](https://github.com/zeroclaw-labs/zeroclaw/pull/3484) | @theonlyhennygod, @blizzardwj | Remove stale onboarding CLI flags from docs | Documentation accuracy |
| [#3528](https://github.com/zeroclaw-labs/zeroclaw/pull/3528) | @theonlyhennygod | Version bump to v0.4.0 (includes Termux support) | Prepares next minor release |

### Active Development (Open PRs)

- **Matrix channel hardening**: 4 concurrent PRs by @spacelobster88 fixing image marker casing ([#3523](https://github.com/zeroclaw-labs/zeroclaw/pull/3523)), reply routing ([#3522](https://github.com/zeroclaw-labs/zeroclaw/pull/3522)), and channel key alignment
- **Security policy enforcement**: [#3527](https://github.com/zeroclaw-labs/zeroclaw/pull/3527) routes channel-driven runs through `ApprovalManager` (fixes critical bypass)
- **Homebrew integration**: [#3524](https://github.com/zeroclaw-labs/zeroclaw/pull/3524), [#3526](https://github.com/zeroclaw-labs/zeroclaw/pull/3526) fix first-start directory creation and config path detection
- **Hardware expansion**: [#3517](https://github.com/zeroclaw-labs/zeroclaw/pull/3517) adds Raspberry Pi GPIO, Aardvark I2C/SPI, and plugin system

---

## 4. Community Hot Topics

| Issue/PR | Comments | Analysis |
|----------|----------|----------|
| [#1478](https://github.com/zeroclaw-labs/zeroclaw/issues/1478) — "除了安全,什么功能也没有" (35 comments, closed) | 35 | **Core tension: security vs. usability**. User frustration that aggressive sandboxing blocks legitimate operations (ffmpeg install, shell scripts) with no escape hatch. Underlying need: granular permission tiers or "developer mode" for trusted environments. |
| [#1857](https://github.com/zeroclaw-labs/zeroclaw/issues/1857) — Environment variables inaccessible to agent | 5 | Docker/container deployment friction. Users expect seamless env var propagation to tools. |
| [#2494](https://github.com/zeroclaw-labs/zeroclaw/issues/2494) — Feishu channel config broken | 5 | Enterprise China market integration issues. Config schema drift. |
| [#1889](https://github.com/zeroclaw-labs/zeroclaw/issues/1889) — Script files blocked in skills | 4 | Related to #1478: security policy blocks common skill patterns. Users want configurable allowlists. |
| [#3529](https://github.com/zeroclaw-labs/zeroclaw/pull/3529) — Incremental Codex stream decoding | Open | Provider resilience: handling long OpenAI Codex responses without total failure on network blips. |

**Underlying Pattern**: Users want ZeroClaw's safety guarantees *with* configurability for trusted contexts. The "paranoid by default" stance is generating support load.

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR |
|----------|-------|--------|--------|
| **S0** — Data loss/security | [#3460](https://github.com/zeroclaw-labs/zeroclaw/issues/3460) Context window exceeded (Feishu) | Closed | Likely provider config |
| **S0** | [#3417](https://github.com/zeroclaw-labs/zeroclaw/issues/3417) Unwanted `~` folder creation | Closed | Build system |
| **S0** | [#3463](https://github.com/zeroclaw-labs/zeroclaw/issues/3463) install.sh 404 | Closed | CDN/deployment |
| **S1** — Workflow blocked | [#1984](https://github.com/zeroclaw-labs/zeroclaw/issues/1984) `compact_context=false` causes unrecoverable overflow | Closed | Config default fix |
| **S1** | [#2060](https://github.com/zeroclaw-labs/zeroclaw/issues/2060) Panic on UTF-8 char boundary | Closed | String handling fix |
| **S1** | [#2499](https://github.com/zeroclaw-labs/zeroclaw/issues/2499) Win11 double-click crash | Closed | Runtime |
| **S1** | [#3476](https://github.com/zeroclaw-labs/zeroclaw/issues/3476) Signal channel send failure | Closed | Channel config |
| **S1** | [#3454](https://github.com/zeroclaw-labs/zeroclaw/issues/3454), [#3508](https://github.com/zeroclaw-labs/zeroclaw/issues/3508) Web Dashboard 404 | **OPEN** | [#3524](https://github.com/zeroclaw-labs/zeroclaw/pull/3524) (Homebrew path) |
| **S1** | [#3456](https://github.com/zeroclaw-labs/zeroclaw/issues/3456) WhatsApp permissions error | **OPEN** | Awaiting |
| **S2** — Degraded | [#1857](https://github.com/zeroclaw-labs/zeroclaw/issues/1857), [#2494](https://github.com/zeroclaw-labs/zeroclaw/issues/2494), [#2947](https://github.com/zeroclaw-labs/zeroclaw/issues/2947), etc. | Mostly closed | Various |

**Critical Regression**: [#3493](https://github.com/zeroclaw-labs/zeroclaw/issues/3493) — Anthropic 500 errors started appearing "this morning" (2026-03-14), breaking existing setups. Fix PRs [#3515](https://github.com/zeroclaw-labs/zeroclaw/pull/3515)/[#3483](https://github.com/zeroclaw-labs/zeroclaw/pull/3483) merged same day.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood v0.4.0+ | Rationale |
|---------|-------|-------------------|-----------|
| Configurable security/permission tiers | [#1478](https://github.com/zeroclaw-labs/zeroclaw/issues/1478), [#1889](https://github.com/zeroclaw-labs/zeroclaw/issues/1889) | **High** | Top user pain point; PRs adding tool_filter_groups suggest movement toward granular control |
| Real multi-agent system with context engineering | [#3502](https://github.com/zeroclaw-labs/zeroclaw/issues/3502) | Medium | Detailed proposal with file-based system prompts; aligns with agent-core architecture |
| SQLite memory scoring pipeline | [#3478](https://github.com/zeroclaw-labs/zeroclaw/issues/3478) | Medium | Zero-dependency implementation proposed; memory system is active development area |
| Local CA certificate support | [#1458](https://github.com/zeroclaw-labs/zeroclaw/issues/1458) | Medium | Enterprise/self-hosted requirement; infrastructure-focused |
| Ollama configurable context size | [#3518](https://github.com/zeroclaw-labs/zeroclaw/pull/3518) | **High** | PR already open; simple env var passthrough |

---

## 7. User Feedback Summary

### Pain Points
- **Security policy too restrictive for personal use**: Multiple users report ZeroClaw "only works as a chatbot," refusing file operations, installs, and script execution even with "all security disabled" (#1478)
- **Installation friction**: Homebrew service startup failures ([#3464](https://github.com/zeroclaw-labs/zeroclaw/issues/3464), [#3466](https://github.com/zeroclaw-labs/zeroclaw/issues/3466)), Docker/Podman restart confusion ([#3474](https://github.com/zeroclaw-labs/zeroclaw/issues/3474)), Windows crashes ([#2499](https://github.com/zeroclaw-labs/zeroclaw/issues/2499))
- **Channel reliability**: Matrix, Signal, Feishu, Nextcloud Talk all had active bugs this period
- **Web Dashboard**: Fresh installs returning 404 ([#3454](https://github.com/zeroclaw-labs/zeroclaw/issues/3454), [#3508](https://github.com/zeroclaw-labs/zeroclaw/issues/3508))

### Positive Signals
- Active maintainer response time (most issues closed same day)
- Rapid iteration on platform support (Termux, WeCom, hardware plugins)
- Users choosing ZeroClaw over "too complex" alternatives (OpenClaw mentioned in #1478)

---

## 8. Backlog Watch

| Issue | Age | Risk | Needs |
|-------|-----|------|-------|
| [#3487](https://github.com/zeroclaw-labs/zeroclaw/issues/3487) — Channel runs bypass ApprovalManager | New | **Critical** | Security review; fix PR [#3527](https://github.com/zeroclaw-labs/zeroclaw/pull/3527) open |
| [#3486](https://github.com/zeroclaw-labs/zeroclaw/issues/3486) — Matrix image marker casing | New | Medium | PR [#3523](https://github.com/zeroclaw-labs/zeroclaw/pull/3523) open |
| [#3477](https://github.com/zeroclaw-labs/zeroclaw/issues/3477) — Matrix reply channel key mismatch | New | Medium | PR [#3522](https://github.com/zeroclaw-labs/zeroclaw/pull/3522) open |
| [#3513](https://github.com/zeroclaw-labs/zeroclaw/issues/3513) — Agent chat sends multiple messages | New | Low | UX polish |
| [#3502](https://github.com/zeroclaw-labs/zeroclaw/issues/3502) — Multi-agent system proposal | New | Strategic | Architecture review |

**No stale critical issues** — maintainer velocity is keeping backlog fresh. Watch for [#3487](https://github.com/zeroclaw-labs/zeroclaw/issues/3487) security implications if [#3527](https://github.com/zeroclaw-labs/zeroclaw/pull/3527) delays.

---

*Generated from ZeroClaw GitHub activity 2026-03-14 to 2026-03-15*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-03-15

## 1. Today's Overview

PicoClaw shows **very high development velocity** with 81 total updates in 24 hours (20 issues, 61 PRs) and a healthy 56% PR merge/close rate (34 of 61). The project is actively iterating on its **v0.2.3 nightly builds** with significant focus on **agent architecture refactoring**, **security hardening**, and **enterprise channel integrations** (Feishu, WhatsApp). The community is engaged with substantive technical discussions, particularly around agent observability and multi-agent collaboration. However, **cron/task scheduling bugs** are emerging as a reliability concern with multiple high-priority reports.

---

## 2. Releases

| Version | Type | Notes |
|---------|------|-------|
| **[v0.2.3-nightly.20260314.c68b4f39](https://github.com/sipeed/picoclaw/compare/v0.2.3...main)** | Nightly | Automated build; unstable. Changelog spans main branch since v0.2.3. |

**No stable release.** Users should expect instability; production deployments should pin to v0.2.3.

---

## 3. Project Progress

### Merged/Closed PRs Today (Selected)

| PR | Author | Impact |
|----|--------|--------|
| [#1422](https://github.com/sipeed/picoclaw/pull/1422) feat(provider): Azure OpenAI support | @kunalk16 | **Major enterprise feature** — enables Azure-hosted models; closes [#1424](https://github.com/sipeed/picoclaw/issues/1424) |
| [#1442](https://github.com/sipeed/picoclaw/pull/1442) feat(logger): Custom console formatter | @afjcjsbx | Developer experience — fixes JSON/multiline string formatting in logs |
| [#1514](https://github.com/sipeed/picoclaw/pull/1514) feat: Kimi For Coding model support | @clawaizhang | Provider expansion — bypasses Coding Agent restrictions via Claude Code headers |
| [#1531](https://github.com/sipeed/picoclaw/pull/1531) docs: Ask DeepWiki badge | @horsley | Documentation — adds AI-powered docs assistance |
| [#1571](https://github.com/sipeed/picoclaw/pull/1571), [#1573](https://github.com/sipeed/picoclaw/pull/1573), [#1566](https://github.com/sipeed/picoclaw/pull/1566) | @Capslockb | Maintenance/orangepi-specific builds |

### Active Development (Open PRs)

| PR | Author | Significance |
|----|--------|--------------|
| [#1517](https://github.com/sipeed/picoclaw/pull/1517) feat(agent): steering | @afjcjsbx | **Core architecture** — allows mid-execution agent redirection |
| [#1521](https://github.com/sipeed/picoclaw/pull/1521) feat(credential): AES-GCM encryption | @sky5454 | **Security foundation** — encrypted credential store with SSH key binding |
| [#1460](https://github.com/sipeed/picoclaw/pull/1460) fix(openai_compat): tool call serialization | @securityguy | Provider compatibility — fixes strict OpenAI-compatible backends |
| [#1540](https://github.com/sipeed/picoclaw/pull/1540) feat(tools): SpawnStatusTool | @SHINE-six | Subagent observability — addresses [#1539](https://github.com/sipeed/picoclaw/issues/1539) |
| [#1576](https://github.com/sipeed/picoclaw/pull/1576) fix(config): disable remote exec by default | @yzxlr | **Security hardening** — fail-closed default for remote code execution |
| [#1580](https://github.com/sipeed/picoclaw/pull/1580) fix(tools): block symlink escapes | @yzxlr | Security — prevents workspace boundary escapes |
| [#1534](https://github.com/sipeed/picoclaw/pull/1534) Feat/feishu card parsing | @yangwenjie1231 | Enterprise integration — card message + image extraction |
| [#1537](https://github.com/sipeed/picoclaw/pull/1537) Feature/feishu thread reply | @clawaizhang | UX fix — bot replies now stay in Feishu topic threads |
| [#1577](https://github.com/sipeed/picoclaw/pull/1577) fix(feishu): video upload | @BlackLLII | Media handling — corrects video message types |

---

## 4. Community Hot Topics

| Issue/PR | Comments | Analysis |
|----------|----------|----------|
| [#1316](https://github.com/sipeed/picoclaw/issues/1316) [Agent refactor] Event-driven agent loop | 10 | **Most discussed**. Core architectural proposal for observable, interruptible, hookable agent loops. Addresses production needs for monitoring and control. Strong maintainer engagement. |
| [#1506](https://github.com/sipeed/picoclaw/issues/1506) Feishu file path exposure | 9 | **Closed** — enables agent file tools for non-image media. Shows active enterprise user base. |
| [#1216](https://github.com/sipeed/picoclaw/issues/1216) Meta: Agent refactor | 7 | Roadmap coordination issue. Signals recognition that current agent semantics are reaching architectural limits. |
| [#1498](https://github.com/sipeed/picoclaw/issues/1498) Model-side search + fastembed | 5 | Chinese community request for RAG capabilities. Indicates demand for built-in retrieval without external vector DB. |

**Underlying needs identified:**
- **Observability & control**: Users need to monitor, interrupt, and steer agents in production
- **Enterprise integrations**: Heavy Feishu focus suggests Chinese enterprise adoption
- **RAG/embedding**: Users want simplified retrieval without complex infrastructure

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|----------|-------|-------------|------------|
| **High** | [#1532](https://github.com/sipeed/picoclaw/issues/1532) | `picoclaw cron add` severe bug — command appears broken | No PR yet |
| **High** | [#1533](https://github.com/sipeed/picoclaw/issues/1533) | Tool name transformation bug: `skill-vetter` → `skill_vetter` causes "Tool not found" | No PR yet |
| **Medium** | [#1530](https://github.com/sipeed/picoclaw/issues/1530) | Security: setup enables weak auth defaults (query tokens, wildcard origins) | No PR yet |
| **Medium** | [#1568](https://github.com/sipeed/picoclaw/issues/1568) | Cron tasks fail to execute, only send descriptions | No PR yet |
| **Medium** | [#1561](https://github.com/sipeed/picoclaw/issues/1561) | Heartbeat consuming tokens (cost issue) | No PR yet |
| **Medium** | [#1578](https://github.com/sipeed/picoclaw/issues/1578) | `image_model` config ignored — images route to primary model | No PR yet |
| **Medium** | [#1574](https://github.com/sipeed/picoclaw/issues/1574) | `prompt_cache_key` error | No PR yet |
| **Medium** | [#1493](https://github.com/sipeed/picoclaw/issues/1493) | New models require gateway restart to activate | No PR yet |
| **Medium** | [#1581](https://github.com/sipeed/picoclaw/issues/1581) | OpenRouter-only fallback chain fails on shared cooldown | No PR yet |
| **Low** | [#1567](https://github.com/sipeed/picoclaw/issues/1567) | `whatsapp_native` build failing | No PR yet |
| **Low** | [#407](https://github.com/sipeed/picoclaw/issues/407) | Feishu not supported on armv7 32-bit | No PR yet |

**Pattern**: **Cron/task scheduling system is experiencing systemic issues** — 3 related bugs suggest this subsystem needs urgent attention. Security defaults also need hardening (PR [#1576](https://github.com/sipeed/picoclaw/pull/1576) addresses remote exec).

---

## 6. Feature Requests & Roadmap Signals

| Issue | Request | Likelihood in v0.2.4/v0.3.0 |
|-------|---------|----------------------------|
| [#1316](https://github.com/sipeed/picoclaw/issues/1316) + [#1216](https://github.com/sipeed/picoclaw/issues/1216) | Event-driven, hookable, interruptible agent loop | **High** — active design discussion, PR [#1517](https://github.com/sipeed/picoclaw/pull/1517) (steering) is precursor |
| [#294](https://github.com/sipeed/picoclaw/issues/294) | Multi-agent collaboration framework | **Medium-High** — roadmap item, foundation work in progress |
| [#1474](https://github.com/sipeed/picoclaw/issues/1474) | Capability discovery endpoint for orchestration | **Medium** — enables external orchestrators, aligns with multi-agent direction |
| [#1539](https://github.com/sipeed/picoclaw/issues/1539) | Subagent status reporting | **High** — PR [#1540](https://github.com/sipeed/picoclaw/pull/1540) already open |
| [#1498](https://github.com/sipeed/picoclaw/issues/1498) | Model-side search + fastembed | **Medium** — requires architectural decision on built-in RAG |
| [#1506](https://github.com/sipeed/picoclaw/issues/1506) | Feishu file tool support | **Completed** — closed today |

**Predicted v0.2.4/v0.3.0 themes**: Agent architecture refactor (observability, steering, interrupts), security hardening, multi-agent foundations, enterprise channel polish.

---

## 7. User Feedback Summary

### Pain Points
| Issue | User Impact |
|-------|-------------|
| Cron reliability | Task automation is unreliable — critical for production workflows |
| Config hot-reloading | Adding models requires restart — friction in dynamic environments |
| Tool/skill naming | Hyphen/underscore mismatch breaks installed skills |
| Token costs | Heartbeat consuming tokens unexpectedly — cost surprise |
| Security defaults | Query tokens and wildcard origins create immediate exposure post-setup |

### Positive Signals
- **Active enterprise adoption**: Heavy Feishu investment, Azure OpenAI support
- **Developer engagement**: Detailed architectural proposals with implementation paths
- **Security consciousness**: Community reporting security issues, maintainers responding with hardening PRs

### Use Cases Emerging
- **Scheduled automation** (cron-heavy) — currently frustrated by bugs
- **Multi-agent teams** — orchestration layer integration
- **Enterprise deployments** — Azure, Feishu, security compliance

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Needs |
|----------|-----|------|-------|
| [#751](https://github.com/sipeed/picoclaw/pull/751) WebSocket gateway | 17 days | Stagnation | Review — significant gateway feature, merge conflicts likely |
| [#757](https://github.com/sipeed/picoclaw/pull/757) Cron agent reply fix | 17 days | Reliability | Review — fixes silent message drops, overlaps with current cron bugs |
| [#1050](https://github.com/sipeed/picoclaw/pull/1050) MiniMax `<think>` tag fix | 10 days | Provider compatibility | Review — simple adapter fix |
| [#294](https://github.com/sipeed/picoclaw/issues/294) Multi-agent framework | 27 days | Roadmap alignment | Maintainer response — foundational design needs confirmation |

**Recommendation**: Prioritize [#757](https://github.com/sipeed/picoclaw/pull/757) review given current cron instability cluster.

---

## Project Health Assessment

| Metric | Status |
|--------|--------|
| Development velocity | ✅ Excellent (81 updates/day) |
| Community engagement | ✅ Strong (substantive technical discussion) |
| Bug triage | ⚠️ Needs attention (cron cluster unaddressed) |
| Security posture | ⚠️ Improving (active hardening, but defaults still weak) |
| Release stability | ⚠️ Nightly-only; no stable release since v0.2.3 |

**Overall**: Healthy, fast-moving project with strong enterprise traction. **Immediate risk**: Cron subsystem reliability. **Strategic opportunity**: Agent architecture refactor positions PicoClaw for multi-agent competitive differentiation.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-03-15

## 1. Today's Overview

NanoClaw shows **high development velocity** with 50 PRs and 18 issues updated in the last 24 hours, though **zero releases** and a **stagnant merge rate** (only 6 PRs merged/closed vs. 44 open) suggest maintainer bandwidth constraints. The project is actively iterating on **memory architecture**, **skill self-creation**, and **multi-channel reliability**, with significant security hardening work underway. A notable pattern: multiple "Blocked" PRs indicate architectural dependencies or review bottlenecks slowing feature delivery. The community is engaged but frustrated with sandbox configuration complexity and platform support gaps.

---

## 2. Releases

**No new releases** — last release date unknown from current data.

---

## 3. Project Progress

### Merged/Closed Today (6 PRs)

| PR | Author | Summary | Impact |
|:---|:---|:---|:---|
| [#1081](https://github.com/qwibitai/nanoclaw/pull/1081) | @baymax-deng | Slack emoji reaction support (inbound/outbound) | ✅ **Merged** — richer Slack interactivity |
| [#1082](https://github.com/qwibitai/nanoclaw/pull/1082) | @baymax-deng | Slack thread reply support | ✅ **Merged** — critical UX fix for channel noise |
| [#851](https://github.com/qwibitai/nanoclaw/pull/851) | @omonk | CONTRIBUTING docs: skill structure & dev guide | ✅ **Merged** — improves contributor onboarding |
| [#944](https://github.com/qwibitai/nanoclaw/pull/944) | @dinocode00 | Immediate acknowledgment when agent starts processing | ✅ **Merged** — solves "silent failure" UX problem |
| [#1078](https://github.com/qwibitai/nanoclaw/pull/1078) | @trevorWieland | Roll back cursor when channel send fails | ✅ **Merged** — reliability fix for Discord |
| [#1077](https://github.com/qwibitai/nanoclaw/pull/1077) | @sumanth-reddy13 | Notion MCP integration | ❌ **Closed** — likely abandoned or superseded |

**Key Advances:**
- **Slack channel maturity**: Threading + reactions make Slack a first-class integration
- **Reliability**: Cursor rollback and immediate acknowledgments address real user pain points

---

## 4. Community Hot Topics

| Rank | Issue/PR | Engagement | Analysis |
|:---|:---|:---|:---|
| 🔥 #1 | [#384](https://github.com/qwibitai/nanoclaw/issues/384) Skill marketplace/registry | 14 👍, 8 comments | **Core architectural debate** — @longregen's framing of "tiny auditable core vs. massive attack surface" resonates deeply. Community wants composable security, not monolithic features. |
| #2 | [#829](https://github.com/qwibitai/nanoclaw/issues/829) SOUL.md anti-fabrication rules | 1 comment | Trust & verifiability crisis from March 8 incident — agents lying about tool execution undermines user confidence |
| #3 | [#1052](https://github.com/qwibitai/nanoclaw/issues/1052) Load global CLAUDE.md for main group | 1 👍 | Configuration inconsistency blocking user workflows |

**Underlying Needs:**
- **Security model clarity**: Users want to understand and control their attack surface
- **Observability**: Need to verify what agents actually did vs. claimed to do
- **Configuration predictability**: "Why does main group behave differently?"

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|:---|:---|:---|:---|
| 🔴 **High** | [#1067](https://github.com/qwibitai/nanoclaw/issues/1067) | Apple Container runtime race condition on reboot — `ensureContainerRuntimeRunning()` fails due to single attempt | ❌ No fix PR |
| 🔴 **High** | [#911](https://github.com/qwibitai/nanoclaw/issues/911) | Skill self-creation security scanning needed | 🔄 In progress (linked to PRs) |
| 🟡 **Medium** | [#753](https://github.com/qwibitai/nanoclaw/issues/753) | Assistant name not updated in `groups/main/CLAUDE.md` | ❌ No fix PR |
| 🟡 **Medium** | [#698](https://github.com/qwibitai/nanoclaw/issues/698) | Agent cannot determine day of week from ISO timestamps | ❌ No fix PR |
| 🟡 **Medium** | [#829](https://github.com/qwibitai/nanoclaw/issues/829) | SOUL.md lacks anti-fabrication rules | ❌ No fix PR |
| 🟢 **Low** | [#1073](https://github.com/qwibitai/nanoclaw/issues/1073), [#1074](https://github.com/qwibitai/nanoclaw/issues/1074), [#1066](https://github.com/qwibitai/nanoclaw/issues/1066) | Merge-forward failures for skill branches (`apple-container`, `compact`, `ollama-tool`) | 🔧 Automated, needs manual resolution |

**Regression Risk:** Multiple skill branches failing merge-forward suggests `main` is drifting, risking skill ecosystem fragmentation.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Issue/PR | Likelihood in Next Release | Signal Strength |
|:---|:---|:---|:---|
| **Structured memory (USER.md/MEMORY.md)** | [#910](https://github.com/qwibitai/nanoclaw/issues/910), [#1063](https://github.com/qwibitai/nanoclaw/pull/1063) | **High** | PR open, closes #910 |
| **Skill self-creation pipeline** | [#911](https://github.com/qwibitai/nanoclaw/issues/911), [#912](https://github.com/qwibitai/nanoclaw/issues/912) | **High** | Multiple linked issues, security scanning specified |
| **Admin mode (/capabilities)** | [#926](https://github.com/qwibitai/nanoclaw/issues/926) | **Medium** | High priority, design artifact linked |
| **Hybrid BM25+vector memory** | [#1043](https://github.com/qwibitai/nanoclaw/pull/1043) | **Medium** | PR open, external dependency (memory-lancedb-pro) |
| **Ollama tool skill** | [#1083](https://github.com/qwibitai/nanoclaw/pull/1083) | **Blocked** | PR marked "Blocked" — dependency issues |
| **Context compaction (/compact)** | [#519](https://github.com/qwibitai/nanoclaw/pull/519) | **Blocked** | Blocked since Feb 26, API dependency |
| **Generic LLM provider** | [#557](https://github.com/qwibitai/nanoclaw/pull/557) | **Blocked** | Blocked since Feb 27, architectural review needed |
| **Mattermost channel** | [#546](https://github.com/qwibitai/nanoclaw/pull/546) | **Blocked** | Blocked since Feb 26 |

**Prediction:** Next release likely focuses on **memory architecture** (#910, #1043) and **skill self-creation** (#911-913), with **admin mode** (#926) as stretch goal. Blocked PRs suggest a need for maintainer sprint to clear backlog.

---

## 7. User Feedback Summary

### Pain Points (Direct Quotes)

> *"nine hours later I want to dunk my mac in sprite and throw it into oncoming traffic"* — [@rdguidry](https://github.com/qwibitai/nanoclaw/issues/1080) on sandbox migration complexity

> *"access to directories outside of the sandbox must be configured at creation and cannot be established after?"* — [@rdguidry](https://github.com/qwibitai/nanoclaw/issues/1080) — **configuration immutability confusion**

> *"Current docker sandbox doesn't support Intel macs"* — [@dhowe](https://github.com/qwibitai/nanoclaw/issues/1079) — **platform exclusion**

> *"contradiction regarding platform support between the documentation and the website"* — [@Gladiatorsarius](https://github.com/qwibitai/nanoclaw/issues/1075) — **trust erosion from docs inconsistency**

### Satisfaction Drivers
- Container sandbox security model valued when working
- Skill modularity appreciated (#384's 14 👍)

### Dissatisfaction Drivers
- **Onboarding friction**: Sandbox configuration is "easy migration" → 9-hour ordeal
- **Platform support gaps**: Intel Macs, Linux documentation inconsistencies
- **Silent failures**: Agent claiming tool calls ran when they didn't (#829)

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#519](https://github.com/qwibitai/nanoclaw/pull/519) /compact skill | 17 days | Context rot in long sessions unaddressed | Maintainer review or dependency resolution |
| [#522](https://github.com/qwibitai/nanoclaw/pull/522) Slack thread replies | 17 days | **Superseded by #1082?** — verify and close | Conflict check with merged #1082 |
| [#525](https://github.com/qwibitai/nanoclaw/pull/525) db.ts refactor | 17 days | Technical debt accumulation | Architecture review |
| [#538](https://github.com/qwibitai/nanoclaw/pull/538) Setup race condition | 17 days | `/setup` reliability | Merge or close |
| [#543](https://github.com/qwibitai/nanoclaw/pull/543) Telegram Markdown | 17 days | UX polish | Low priority, but trivial |
| [#546](https://github.com/qwibitai/nanoclaw/pull/546) Mattermost | 17 days | Channel diversity | Community demand unclear |
| [#551](https://github.com/qwibitai/nanoclaw/pull/551) Rollup CVE | 16 days | **Security** | Should merge |
| [#557](https://github.com/qwibitai/nanoclaw/pull/557) Generic LLM | 16 days | Vendor lock-in concern | Design review needed |

**Critical:** [#551](https://github.com/qwibitai/nanoclaw/pull/551) (CVE fix) and [#522](https://github.com/qwibitai/nanoclaw/pull/522) (potential duplicate) need immediate triage.

---

## Project Health Assessment

| Metric | Status | Notes |
|:---|:---|:---|
| **Activity** | 🟢 Healthy | 68 items updated in 24h |
| **Merge velocity** | 🔴 Concerning | 12% merge rate (6/50) |
| **Release cadence** | 🔴 Stalled | No releases |
| **Community engagement** | 🟢 Strong | Detailed issues, emotional investment |
| **Security posture** | 🟡 Improving | CVE fix pending, anti-fabrication work started |
| **Platform support** | 🔴 Gaps | Intel Mac, Linux docs inconsistent |

**Recommendation:** Maintainer sprint needed to clear "Blocked" PRs, merge security fixes, and cut a release capturing Slack improvements and memory architecture work.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-03-15

## 1. Today's Overview

NullClaw shows **exceptionally high development velocity** with 41 PRs updated in 24 hours (33 open, 8 merged/closed) and 16 active issues. The project released **v2026.3.14** with critical memory and session handling fixes. A significant portion of today's activity centers on **security hardening** (7+ PRs) and **platform reliability** (Windows WebChannel fixes, QQ/OneBot/Lark channel stability). The community is actively stress-testing subagent features and multi-platform integrations, with documentation gaps emerging as a friction point for advanced workflows.

---

## 2. Releases

### [v2026.3.14](https://github.com/nullclaw/nullclaw/releases/tag/v2026.3.14) — 2026-03-14

| Change | Author | PR |
|--------|--------|-----|
| Memory management fixes | @DonPrus | [#486](https://github.com/nullclaw/nullclaw/pull/486) |
| Scope resume sessions to nullclaw sessions (claude-cli) | @manelsen | [#478](https://github.com/nullclaw/nullclaw/pull/478) |
| Harden resume session handling (claude-cli) | @manelsen | *(linked above)* |

**Breaking Changes:** None reported  
**Migration Notes:** Users experiencing session resume issues with Claude CLI should upgrade immediately.

---

## 3. Project Progress

### Merged/Closed PRs Today (8 total)

| PR | Description | Impact |
|-----|-------------|--------|
| [#513](https://github.com/nullclaw/nullclaw/pull/513) | Version bump to 2026.3.14 | Release trigger |
| [#500](https://github.com/nullclaw/nullclaw/pull/500) | Fix dangling provider pointer in named-agent sessions | **Critical stability fix** — resolves `/bind <agent>` hangs and silent failures from PR #450 regression |
| [#486](https://github.com/nullclaw/nullclaw/pull/486) | Memory fixes | Core stability |
| [#478](https://github.com/nullclaw/nullclaw/pull/478) | Scope resume sessions to nullclaw sessions | Session reliability |

### Key Feature Advances (Open PRs)

| PR | Description | Status |
|-----|-------------|--------|
| [#546](https://github.com/nullclaw/nullclaw/pull/546) | Configurable prompt timezone | Ready — addresses [#540](https://github.com/nullclaw/nullclaw/issues/540) |
| [#547](https://github.com/nullclaw/nullclaw/pull/547) | Subagent routing docs & AIEOS examples | Ready — closes documentation gap [#508](https://github.com/nullclaw/nullclaw/issues/508) |
| [#545](https://github.com/nullclaw/nullclaw/pull/545) | Add `yolo` autonomy to onboarding wizard | Ready — completes [#493](https://github.com/nullclaw/nullclaw/issues/493) |
| [#550](https://github.com/nullclaw/nullclaw/pull/550) | Windows WebChannel socket fix | **Platform-critical** — vendored websocket with recv/send |
| [#534](https://github.com/nullclaw/nullclaw/pull/534) | Block YOLO autonomy on non-loopback gateway | Security hardening |

---

## 4. Community Hot Topics

### Most Active by Engagement

| Issue/PR | Comments | Topic | Underlying Need |
|----------|----------|-------|---------------|
| [#341](https://github.com/nullclaw/nullclaw/issues/341) | 6 | Alibaba coding plan rate limits | **Provider-specific rate limiting** — users need better error handling and retry logic for Chinese cloud providers |
| [#380](https://github.com/nullclaw/nullclaw/issues/380) | 3 | Groq provider URL incorrect | **Provider URL validation** — hardcoded URLs drift; need dynamic endpoint configuration |
| [#508](https://github.com/nullclaw/nullclaw/issues/508) | 2 | Subagent configuration docs | **Documentation debt** — powerful feature lacks discoverability; PR [#547](https://github.com/nullclaw/nullclaw/pull/547) addresses |

### Analysis

The Alibaba/Groq issues reveal **provider ecosystem fragility**: hardcoded URLs and insufficient rate-limit handling. The subagent documentation requests indicate **feature adoption is ahead of documentation** — a positive sign of user engagement but risking support burden.

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix PR |
|----------|-------|-------------|--------|
| 🔴 **Critical** | [#514](https://github.com/nullclaw/nullclaw/issues/514) | Gateway silently fails on port conflict; daemon hangs | *None yet* |
| 🟠 **High** | [#521](https://github.com/nullclaw/nullclaw/issues/521) | Memory ownership inconsistency in `http_request` | [#543](https://github.com/nullclaw/nullclaw/pull/543) |
| 🟠 **High** | [#519](https://github.com/nullclaw/nullclaw/issues/519) | Hardcoded curl timeout ignores config | [#541](https://github.com/nullclaw/nullclaw/pull/541) |
| 🟡 **Medium** | [#525](https://github.com/nullclaw/nullclaw/issues/525) | Bot forgets settings (reasoning, verbose, think) | *None yet* |
| 🟡 **Medium** | [#413](https://github.com/nullclaw/nullclaw/issues/413) | `file_read` tool_call stopped (weather skill) | *None yet* |
| 🟢 **Low** | [#504](https://github.com/nullclaw/nullclaw/issues/504) | `--help` starts runtime instead of showing help | **FIXED** in release |

### Security Vulnerabilities (All have PRs)

| Issue | Vulnerability | Fix PR |
|-------|-------------|--------|
| [#516](https://github.com/nullclaw/nullclaw/issues/516) | Sensitive header bypass via oversized names | [#542](https://github.com/nullclaw/nullclaw/pull/542) |
| [#517](https://github.com/nullclaw/nullclaw/issues/517) | HTTP URLs allowed despite HTTPS-only policy | *Implied in security batch* |
| [#518](https://github.com/nullclaw/nullclaw/issues/518) | Dead code from `std.http.Client` migration | *Cleanup PR expected* |

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood v2026.3.15+ | Rationale |
|---------|-------|------------------------|-----------|
| **Subagent skill injection** | [#553](https://github.com/nullclaw/nullclaw/issues/553) | **High** | Core architecture gap; blocks advanced delegation patterns |
| **Configurable timezone** | [#540](https://github.com/nullclaw/nullclaw/issues/540) | **Merged** | PR [#546](https://github.com/nullclaw/nullclaw/pull/546) ready |
| **Subagent docs & examples** | [#508](https://github.com/nullclaw/nullclaw/issues/508) | **Merged** | PR [#547](https://github.com/nullclaw/nullclaw/pull/547) ready |
| **Better curl error diagnostics** | [#520](https://github.com/nullclaw/nullclaw/issues/520) | **High** | PR [#544](https://github.com/nullclaw/nullclaw/pull/544) ready |
| **DingTalk integration validation** | [#490](https://github.com/nullclaw/nullclaw/issues/490) | Medium | Community-verified; needs official test coverage |

### Predicted Next Version Priorities
1. Subagent skill access (architectural)
2. Windows platform parity (WebChannel stability)
3. Security hardening completion (HTTP tool layer)

---

## 7. User Feedback Summary

### Pain Points

| Theme | Evidence | Severity |
|-------|----------|----------|
| **Session/state fragility** | [#525](https://github.com/nullclaw/nullclaw/issues/525), [#500](https://github.com/nullclaw/nullclaw/pull/500) | High — breaks user trust in configuration persistence |
| **Platform-specific failures** | Windows WebChannel, DingTalk, QQ stability issues | High — limits adoption |
| **Documentation gaps for advanced features** | [#508](https://github.com/nullclaw/nullclaw/issues/508) | Medium — friction for power users |
| **Silent failures / poor diagnostics** | [#514](https://github.com/nullclaw/nullclaw/issues/514), [#520](https://github.com/nullclaw/nullclaw/issues/520) | Medium — debugging time sink |

### Positive Signals

- **Active multi-platform adoption**: DingTalk, Lark/Feishu, QQ, Telegram all seeing community validation
- **Security-conscious user base**: Multiple security reports filed with reproduction details
- **Subagent feature excitement**: Users requesting deeper integration despite docs gap

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|----------|-----|------|---------------|
| [#413](https://github.com/nullclaw/nullclaw/issues/413) | 5 days | Skill ecosystem credibility | Repro confirmation; assign to skills maintainer |
| [#490](https://github.com/nullclaw/nullclaw/issues/490) | 2 days | Integration test coverage | Convert to test case; verify image attachment handling |
| [#553](https://github.com/nullclaw/nullclaw/issues/553) | <1 day | Architectural decision | Maintainer response on subagent skill access design |

### Maintainer Attention Required

- **@lighterEB's security batch**: 6 interconnected `http_request` issues/PRs — recommend coordinated review
- **Windows platform parity**: [#549](https://github.com/nullclaw/nullclaw/pull/549), [#550](https://github.com/nullclaw/nullclaw/pull/550) — decide on vendoring strategy vs. upstream fix

---

*Digest generated from GitHub activity 2026-03-14 to 2026-03-15. All times UTC.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-03-15

## 1. Today's Overview

IronClaw shows **high development velocity** with 50 PRs and 19 issues updated in the last 24 hours, indicating active iteration on the agent framework. The project is in a **stabilization phase** with heavy focus on production hardening—13 of 19 issues were closed, including 4 critical/high-severity bugs identified by automated CI review. A notable pattern emerges: the staging CI system (`ironclaw-ci[bot]`) is aggressively catching architectural flaws (N+1 queries, async lock contention, O(n²) allocations) before they reach production. However, 32 open PRs suggest a growing review backlog, and documentation gaps are becoming a visible user pain point.

---

## 2. Releases

**No new releases** (v0.16.1 remains latest).

---

## 3. Project Progress

### Merged/Closed PRs (18 total, key highlights):

| PR | Author | Impact |
|:---|:---|:---|
| [#1143](https://github.com/nearai/ironclaw/pull/1143) | @henrypark133 | **Schema-guided tool parameter coercion** — fixes Google Sheets `values` serialization bugs by adding normalization layer before tool execution |
| [#1163](https://github.com/nearai/ironclaw/pull/1163) | @nickpismenkov | **Fixed N+1 query in routine engine** — resolves [#823](https://github.com/nearai/ironclaw/issues/823) (CRITICAL:88) |
| [#1154](https://github.com/nearai/ironclaw/pull/1154) | @G7CNF | **Human-readable cron schedules** — closes [#1131](https://github.com/nearai/ironclaw/issues/1131), displays "Every weekday at 9am" instead of `0 9 * * MON-FRI` |
| [#1170](https://github.com/nearai/ironclaw/pull/1170) | @G7CNF | **Tool/completion parameter parity** — adds `stop_sequences` support to tool requests |
| [#1171](https://github.com/nearai/ironclaw/pull/1171) | @G7CNF | **WASM hot activation owner binding** — fixes [#1052](https://github.com/nearai/ironclaw/issues/1052) (channel re-pairing bug) |
| [#1153](https://github.com/nearai/ironclaw/pull/1153) | @G7CNF | **SSE parser performance** — eliminates O(n²) buffer allocations, fixes [#1142](https://github.com/nearai/ironclaw/issues/1142) |
| [#1160](https://github.com/nearai/ironclaw/pull/1160) | @henrypark133 | **Smarter panic detection CI** — reduces false positives in `#[cfg(test)]` code |
| [#1183](https://github.com/nearai/ironclaw/pull/1183) | @ilblackdragon | **Security fix** — updates yanked `uds_windows` 1.2.0 → 1.2.1 |

**Themes:** Tool reliability (Google Sheets fixes), performance (SSE, queries), and CI/automation maturity.

---

## 4. Community Hot Topics

### Most Active Discussions:

| Item | Activity | Analysis |
|:---|:---|:---|
| [#1155](https://github.com/nearai/ironclaw/issues/1155) — Slack Socket Mode | 1 comment, **OPEN** | **Enterprise deployment need**: User @justinfiore requests Socket Mode to avoid inbound firewall rules. Suggests IronClaw is being adopted in corporate environments where security teams restrict webhook endpoints. |
| [#1174](https://github.com/nearai/ironclaw/issues/1174) — Missing documentation | 0 comments, **OPEN** | **Onboarding friction**: New user (@Krzysztof318) cannot locate configuration docs for tools, skills, signals. Only 4 `.md` files in `docs/`. This is a **growth blocker** for adoption. |
| [#1147](https://github.com/nearai/ironclaw/pull/1147) — Redesign routine create requests | `undefined` comments, **XL size**, **OPEN** | **Core architecture change**: LLM-facing schema redesign for routine creation. High-risk, high-impact; likely to shape v0.17 API. |
| [#1187](https://github.com/nearai/ironclaw/pull/1187) — Adaptive learning system | `undefined` comments, **XL size**, **OPEN** | **Ambitious feature**: Skill synthesis + user profiles + session search. Author (@smkrv) notes 30+ review iterations. Signals community interest in "smarter" agents. |

**Underlying needs:** Better documentation for adoption, enterprise-ready deployment options, and AI-native features (adaptive learning).

---

## 5. Bugs & Stability

### Critical/High Severity (from staging CI + user reports):

| Severity | Issue | Status | Fix PR |
|:---|:---|:---|:---|
| **CRITICAL** | [#823](https://github.com/nearai/ironclaw/issues/823) — N+1 query in event trigger loop | ✅ CLOSED | [#1163](https://github.com/nearai/ironclaw/pull/1163) |
| **CRITICAL** | [#813](https://github.com/nearai/ironclaw/issues/813) — Non-transactional context updates | ✅ CLOSED | (merged) |
| **CRITICAL** | [#869](https://github.com/nearai/ironclaw/issues/869) — Lock held across async I/O boundary | ✅ CLOSED | (merged) |
| **CRITICAL** | [#1178](https://github.com/nearai/ironclaw/issues/1178) — Workflow linting bypass for test-only code | 🔴 **OPEN** | None yet |
| **HIGH** | [#827](https://github.com/nearai/ironclaw/issues/827) — Full message Vec clone per iteration | ✅ CLOSED | (merged) |
| **HIGH** | [#872](https://github.com/nearai/ironclaw/issues/872) — Incomplete parameter stripping parity | ✅ CLOSED | [#1170](https://github.com/nearai/ironclaw/pull/1170) |
| **HIGH** | [#1142](https://github.com/nearai/ironclaw/issues/1142) — O(n²) SSE string allocations | ✅ CLOSED | [#1153](https://github.com/nearai/ironclaw/pull/1153) |
| **HIGH** | [#1180](https://github.com/nearai/ironclaw/issues/1180) — Flawed code fence detection in `extract_suggestions()` | 🔴 **OPEN** | None yet |
| **HIGH** | [#1181](https://github.com/nearai/ironclaw/issues/1181) — Unsafe `.unwrap()` in production code | 🔴 **OPEN** | [#1184](https://github.com/nearai/ironclaw/pull/1184) (in progress) |

### User-Reported Tool Bugs (Closed):
- [#993](https://github.com/nearai/ironclaw/issues/993), [#1002](https://github.com/nearai/ironclaw/issues/1002), [#999](https://github.com/nearai/ironclaw/issues/999) — Google Sheets OAuth/serialization issues, all resolved by [#1143](https://github.com/nearai/ironclaw/pull/1143)

**Assessment:** Staging CI is catching critical issues pre-merge. Three HIGH/CRITICAL issues remain open from today's batch, with [#1184](https://github.com/nearai/ironclaw/pull/1184) actively addressing panic paths.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Source | Likelihood in Next Version |
|:---|:---|:---|
| **Slack Socket Mode** | [#1155](https://github.com/nearai/ironclaw/issues/1155) | High — enterprise blocker, clear scope |
| **Adaptive learning / skill synthesis** | [#1187](https://github.com/nearai/ironclaw/pull/1187) | Medium — large PR, needs review bandwidth |
| **LRU embedding cache** | [#235](https://github.com/nearai/ironclaw/pull/235) | High — performance win, long-running PR |
| **Structured fallback deliverables** | [#236](https://github.com/nearai/ironclaw/pull/236) | High — reliability improvement |
| **Human-readable cron** | ✅ Shipped [#1154](https://github.com/nearai/ironclaw/pull/1154) | — |
| **Criterion benchmarks** | [#836](https://github.com/nearai/ironclaw/pull/836) | Medium — infrastructure, not user-facing |

**Prediction:** v0.17 will likely include Socket Mode, embedding cache, and fallback deliverables. Adaptive learning may slip to v0.18 due to complexity.

---

## 7. User Feedback Summary

### Pain Points:
| Issue | User | Quote/Signal |
|:---|:---|:---|
| **Documentation gap** | @Krzysztof318 | *"I can't find proper documentation about iron claw, how to use, how to configure"* — [#1174](https://github.com/nearai/ironclaw/issues/1174) |
| **Google Sheets reliability** | @sergeiest | Multiple P1 bugs on OAuth and parameter passing — now resolved |
| **WASM channel re-pairing** | @henrypark133 | Hot-activation lost owner state — fixed in [#1171](https://github.com/nearai/ironclaw/pull/1171) |
| **Webhook security** | @JeremyHutchings | HTTP secret in body vs header — [#722](https://github.com/nearai/ironclaw/issues/722), closed |

### Satisfaction Signals:
- Staging CI catching bugs before users hit them
- Rapid turnaround on tool bugs (Google Sheets fixed same week reported)
- Active community contributions (experienced contributors: @G7CNF, @ztsalexey, @nickpismenkov)

### Dissatisfaction Signals:
- Documentation is **"four .md files"** for a complex multi-channel agent framework
- No releases despite 2+ weeks of heavy development (users on v0.16.1)

---

## 8. Backlog Watch

### Needs Maintainer Attention:

| Item | Age | Risk |
|:---|:---|:---|
| [#235](https://github.com/nearai/ironclaw/pull/235) — LRU embedding cache | **24 days** | Stale; high-value performance feature, merge conflicts likely |
| [#236](https://github.com/nearai/ironclaw/pull/236) — Structured fallback deliverables | **24 days** | Same author, same risk |
| [#1174](https://github.com/nearai/ironclaw/issues/1174) — Documentation request | **1 day** | **Critical for adoption**; no response yet |
| [#1155](https://github.com/nearai/ironclaw/issues/1155) — Slack Socket Mode | **1 day** | Enterprise feature; competitor parity (OpenClaw mentioned) |

### Review Backlog:
- **32 open PRs** vs 18 merged/closed — ratio suggests review bottleneck
- XL-sized PRs (#1147, #1157, #1187) require significant review time

---

## Project Health Score: 🟡 **Stable with Friction**

| Dimension | Score | Notes |
|:---|:---|:---|
| Code quality | 🟢 Strong | Staging CI catching critical bugs |
| Velocity | 🟢 High | 50 PRs/24h |
| Review bandwidth | 🟡 Constrained | 32 open PRs backlog |
| Documentation | 🔴 Poor | Blocking new user adoption |
| Release cadence | 🔴 Stalled | No release since v0.16.1 |

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-03-15

## 1. Today's Overview

LobsterAI shows **moderate maintenance activity** with 3 PRs closed and 3 active issues, all opened within the past 3 days. No new release was published today, suggesting the project is in a stabilization phase following the v0.2.3 release. The merged PRs indicate active UI/UX refactoring and memory system integration work. Community engagement appears **low-to-moderate** with minimal reactions (👍: 0 across all items) and limited comment activity. The issue tracker reveals emerging platform-specific problems (Apple Silicon update detection) and integration stability concerns (QQ Bot, Ollama local execution).

---

## 2. Releases

**No new releases** — v0.2.3 remains the latest version. Note: Issue #390 indicates **update detection failures on Apple Silicon**, where v0.2.2 users cannot detect the v0.2.3 availability through the in-app updater.

---

## 3. Project Progress

Three PRs were **closed/merged** today, indicating active development:

| PR | Author | Summary | Impact |
|:---|:---|:---|:---|
| [#416](https://github.com/netease-youdao/LobsterAI/pull/416) | @liuzhq1986 | **Major UI refactor**: Extracted Agent configuration from Memory tab into standalone "CoworkAgent" tab; fixed type mismatches and i18n gaps | Improved UX for agent personality management; technical debt reduction |
| [#415](https://github.com/netease-youdao/LobsterAI/pull/415) | @liuzhq1986 | OpenClaw memory integration | Enhanced memory system connectivity |
| [#414](https://github.com/netease-youdao/LobsterAI/pull/414) | @liugang519 | QQ channel notification fix: optimized `to` field extraction for scheduled tasks | Stability improvement for QQ Bot messaging |

**Key advancement**: The Agent tab refactor (#416) represents significant UX investment, separating identity/soul configuration from operational memory management.

---

## 4. Community Hot Topics

| Item | Activity | Analysis |
|:---|:---|:---|
| [#390](https://github.com/netease-youdao/LobsterAI/issues/390) Apple Silicon update detection failure | 2 comments, 0 👍 | **Platform parity issue** — ARM64 builds have broken update channels, potentially fragmenting the user base |
| [#405](https://github.com/netease-youdao/LobsterAI/issues/405) Local Ollama command execution not working | 2 comments, 0 👍 | **Core functionality gap** — Local LLM integration incomplete; tool execution works for cloud models but fails on Ollama despite configuration |
| [#413](https://github.com/netease-youdao/LobsterAI/issues/413) QQ Bot frequent disconnections | 0 comments, 0 👍 | **Integration reliability** — Third-party platform stability concern |

**Underlying needs identified**:
- **Local-first AI execution**: Users expect Ollama to match cloud model capabilities (#405)
- **Reliable third-party integrations**: QQ Bot stability critical for Chinese market users (#413)
- **Cross-platform release integrity**: Apple Silicon treated as second-class citizen (#390)

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR? |
|:---|:---|:---|:---|
| **High** | [#390](https://github.com/netease-youdao/LobsterAI/issues/390) Update channel broken on Apple Silicon — users stuck on old versions | Open, active | ❌ None |
| **High** | [#405](https://github.com/netease-youdao/LobsterAI/issues/405) Local Ollama tool execution non-functional — "full" profile ignored | Open, active | ❌ None |
| **Medium** | [#413](https://github.com/netease-youdao/LobsterAI/issues/413) QQ Bot connection instability | Open, no activity | Partial: #414 addresses related notification issue |

**Regression risk**: The Ollama issue (#405) suggests potential configuration parsing or tool routing bugs when using local endpoints versus cloud APIs.

---

## 6. Feature Requests & Roadmap Signals

No explicit feature requests filed today. **Inferred roadmap signals** from issues:

| Signal | Likelihood in Next Release | Rationale |
|:---|:---|:---|
| Apple Silicon update channel fix | **High** | Affects version distribution; likely infrastructure priority |
| Ollama local tool execution parity | **High** | Core "local AI" value proposition compromised |
| QQ Bot connection resilience | **Medium** | PR #414 shows active work; may need broader architecture review |
| Agent configuration UX polish | **Completed** | #416 merged |

---

## 7. User Feedback Summary

| Pain Point | Evidence | User Profile |
|:---|:---|:---|
| **"Local AI doesn't work as advertised"** | #405: User configured `~/.openclaw/openclaw.json` with "full" tools profile, yet commands don't execute | Power user, privacy-conscious, technical |
| **"Mac experience is degraded"** | #390: ARM64 users cannot receive updates through standard channel | Apple Silicon early adopter |
| **"Bot integrations unreliable"** | #413: QQ Bot "always disconnects" — no diagnostic info provided | Automation/notification use case |
| **Configuration complexity** | #405: Required manual JSON editing for basic functionality | UX friction in tool enablement |

**Satisfaction gap**: Local execution parity and seamless third-party integrations remain unmet expectations versus cloud-native experience.

---

## 8. Backlog Watch

| Issue | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#390](https://github.com/netease-youdao/LobsterAI/issues/390) | 3 days | **User base fragmentation** — ARM64 users miss security/features fixes | Infrastructure team acknowledgment; hotfix release |
| [#405](https://github.com/netease-youdao/LobsterAI/issues/405) | 2 days | **Core value proposition erosion** — local AI differentiation weakened | Reproduction confirmation; Ollama-specific debugging |
| [#413](https://github.com/netease-youdao/LobsterAI/issues/413) | 1 day | **Integration reliability perception** | Diagnostic logging request; relation to #414 assessment |

**Maintainer attention recommended**: All three open issues are fresh but high-impact. No stale backlog accumulation observed — project appears responsive to new reports.

---

*Digest generated from GitHub activity 2026-03-14 to 2026-03-15*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

# TinyClaw Project Digest — 2026-03-15

## 1. Today's Overview

TinyClaw shows **high development velocity** with 5 new pull requests opened in the last 24 hours, all from core contributor @jlia0 and community member @RomuloGatto. No releases were cut, and no PRs were merged—suggesting a potential integration bottleneck or pending review queue. The single active issue (#193) has accumulated 10 comments, indicating strong community interest in improving the first-run experience. Overall project health appears **active but accumulation-heavy**, with work-in-progress piling up faster than completion.

---

## 2. Releases

**No new releases** — Version status unchanged.

---

## 3. Project Progress

**No merged or closed PRs today.** All 5 PRs remain open:

| PR | Author | Focus | Status |
|:---|:---|:---|:---|
| [#217](https://github.com/TinyAGI/tinyclaw/pull/217) | @RomuloGatto | Google Gemini provider integration | Awaiting review |
| [#214](https://github.com/TinyAGI/tinyclaw/pull/214) | @jlia0 | Web-based setup + custom API URL | Awaiting review |
| [#216](https://github.com/TinyAGI/tinyclaw/pull/216) | @jlia0 | CLI ASCII branding | Awaiting review |
| [#215](https://github.com/TinyAGI/tinyclaw/pull/215) | @jlia0 | System prompt for agent creation | Awaiting review |
| [#213](https://github.com/TinyAGI/tinyclaw/pull/213) | @jlia0 | Queue architecture simplification | Awaiting review |

**Notable architectural direction:** PR #213 removes conversation state entirely in favor of "flat DMs with immediate response streaming"—a significant simplification that may reduce complexity but requires careful validation.

---

## 4. Community Hot Topics

### Most Active Discussion
- **[#193](https://github.com/TinyAGI/tinyclaw/issues/193) — TinyOffice: add first-run web onboarding for initial setup** (10 comments)
  - **Author:** @mczabca-boop
  - **Underlying need:** CLI/config-file onboarding creates friction for non-technical users; demand for browser-based initial configuration
  - **Signal:** This directly complements PR #214 (web-based setup), suggesting convergent community and maintainer priorities

### Cross-Reference Insight
PR #214 appears to **address the core request in #193**, implementing:
- `--skip-setup` API-only mode
- `/connect` page with auto-detection
- Persistent localStorage configuration

**Recommendation:** Link #193 to #214 for potential closure upon merge.

---

## 5. Bugs & Stability

| Severity | Item | Description | Fix Status |
|:---|:---|:---|:---|
| **None identified** | — | No bug reports, crash reports, or regression issues in 24h data | — |

**Assessment:** Clean stability profile; however, PR #213's architectural refactor (removing conversation state) warrants **regression testing attention** before merge due to core system impact.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Source | Likelihood in Next Release |
|:---|:---|:---|
| Web-based first-run setup | Issue #193 + PR #214 | **High** — directly addresses #193 with implementation ready |
| Google Gemini support | PR #217 | **High** — provider expansion, community PR |
| Custom system prompts | PR #215 | **Medium** — agent customization enhancement |
| CLI branding/polish | PR #216 | **Medium** — UX refinement |
| Simplified queue architecture | PR #213 | **Medium-High** — maintainer-driven refactor |

**Emerging pattern:** Strong focus on **accessibility and onboarding** (web UI, less CLI dependency) alongside **provider diversity** (Gemini addition).

---

## 7. User Feedback Summary

### Pain Points
| Issue | Evidence | Severity |
|:---|:---|:---|
| CLI-heavy initial setup | #193: "initial setup still depends heavily on CLI flows and raw config editing" | **High** — barrier to adoption |
| TinyOffice usefulness gap | #193: "useful once TinyClaw is already configured, but not yet a good first-run experience" | **Medium** — sequencing problem |

### Use Case Signal
- Users want **TinyOffice as the entry point**, not a post-configuration tool
- Demand for **non-technical user accessibility**

### Satisfaction Indicator
- 10 comments on #193 without negative tone suggests **constructive engagement** rather than frustration
- Active PR response (#214) indicates **maintainer responsiveness**

---

## 8. Backlog Watch

| Risk | Item | Age | Action Needed |
|:---|:---|:---|:---|
| **Integration bottleneck** | 5 open PRs, 0 merges | 1 day | Maintainer review queue; potential CI or conflict holds |
| **Spec drift risk** | PR #213 (queue refactor) + PR #217 (Gemini) may conflict | — | Coordinate merge order; #213 first due to architectural scope |

**No long-unanswered items** — all activity is recent. Primary concern is **review velocity** matching **submission velocity**.

---

*Digest generated from TinyAGI/tinyclaw GitHub data — 2026-03-15*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-03-15

## 1. Today's Overview

Moltis shows **healthy maintenance activity** with 9 issues and 6 PRs updated in the past 24 hours. The project demonstrates active bug triage with 4 issues closed and 3 PRs merged, while 5 issues remain open and 3 PRs await review. No new release was cut today. Development focus centers on **Windows compatibility fixes**, **browser session isolation**, and **agent-tooling robustness**—indicating maturation toward production stability rather than feature expansion.

---

## 2. Releases

*No new releases today.*

---

## 3. Project Progress

### Merged/Closed PRs (3 items)

| PR | Author | Summary | Impact |
|:---|:---|:---|:---|
| [#417](https://github.com/moltis-org/moltis/pull/417) | @penso | Restores custom GGUF model setup without requiring gateway restart; adds async download with progress events and regression tests | **Major UX improvement** for local LLM users |
| [#411](https://github.com/moltis-org/moltis/pull/411) | @penso | Adds cron delivery regression tests, extracts gateway handoff helper, syncs documentation | **Reliability + docs quality** |
| [#410](https://github.com/moltis-org/moltis/pull/410) | @penso | Fixes empty structured tool name failures (closes [#179](https://github.com/moltis-org/moltis/issues/179)) with retry logic | **Stability fix** for kimi and similar models |

**Key advancement:** Local LLM workflow significantly improved—users can now add HuggingFace GGUF models dynamically without service restart, addressing a major friction point.

---

## 4. Community Hot Topics

### Most Active Discussions

| Issue/PR | Activity | Analysis |
|:---|:---|:---|
| [#261](https://github.com/moltis-org/moltis/issues/261) — GitHub Copilot provider errors | 4 comments, 2 👍 | **Highest engagement**. Users hitting authentication/provider integration failures with GitHub Copilot. Signals strong demand for enterprise-friendly model providers. |
| [#235](https://github.com/moltis-org/moltis/issues/235) — PTY-based Claude Code CLI control | 3 comments, 1 👍 | **Architecturally significant**. Community exploring autonomous multi-agent orchestration by fooling Claude Code's TTY detection. Underlying need: **headless interactive agent frameworks** for CI/CD and autonomous workflows. |
| [#264](https://github.com/moltis-org/moltis/issues/264) — Agent channel awareness | 2 👍, closed today | Resolved via tooling, but discussion reveals demand for **multi-channel agent routing** and contextual awareness. |

**Underlying needs identified:**
- Enterprise SSO/provider integrations (Copilot, Azure)
- Autonomous/agent-to-agent orchestration infrastructure
- Flexible channel routing for multi-tenant deployments

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix Available |
|:---|:---|:---|:---|
| **High** | [#434](https://github.com/moltis-org/moltis/issues/434) — Windows file lock failure (`Access is denied`) | Open | **Yes** — [#436](https://github.com/moltis-org/moltis/pull/436) ready for review |
| **High** | [#437](https://github.com/moltis-org/moltis/issues/437) — "Reasoning" expansion-only responses in Channels | Open | No PR yet |
| **Medium** | [#261](https://github.com/moltis-org/moltis/issues/261) — GitHub Copilot provider errors | Open | No PR yet |
| **Medium** | [#132](https://github.com/moltis-org/moltis/issues/132) — HuggingFace model download failure | **Closed** | Resolved by [#417](https://github.com/moltis-org/moltis/pull/417) |
| **Medium** | [#195](https://github.com/moltis-org/moltis/issues/195) — Agent can't set channel targets for crons | **Closed** | Resolved |

**Critical pattern:** Windows compatibility emerging as a **platform parity gap**. The file lock bug (#434) has a well-researched fix in [#436](https://github.com/moltis-org/moltis/pull/436) that addresses Rust stdlib's `FILE_APPEND_DATA` limitation on Windows—maintainers should prioritize review.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood in Next Release | Rationale |
|:---|:---|:---|:---|
| **Matrix protocol support** | [#233](https://github.com/moltis-org/moltis/issues/233) | Medium | Decentralized/federated chat demand; would complement existing Telegram/Discord channels |
| **PTY-based subprocess control** | [#235](https://github.com/moltis-org/moltis/issues/235) | Low-Medium | Architectural complexity high; may remain experimental |
| **Enhanced agent channel routing** | [#264](https://github.com/moltis-org/moltis/issues/264) | High | Already partially addressed; tooling expansion likely |

**Prediction:** Matrix support (#233) and improved Windows parity are strongest candidates for v-next, as they address **platform expansion** and **enterprise deployment** needs respectively.

---

## 7. User Feedback Summary

### Pain Points
| Theme | Evidence | Severity |
|:---|:---|:---|
| **Windows as second-class citizen** | #434, #436 | High — blocking production Windows deployments |
| **Model provider fragility** | #261 (Copilot), #179 (kimi cron), #132 (HF download) | Medium — integration reliability |
| **Agent context limitations** | #264, #195, #235 | Medium — agents "flying blind" on channels/orchestration |

### Use Cases Emerging
- **Autonomous CI/CD agents** (#235) — running Claude Code headless for software engineering automation
- **Multi-tenant deployments** (#264) — agents routing to specific channels/users based on context
- **Local-first AI** (#132, #417) — GGUF model management without cloud dependencies

### Satisfaction Signals
- Rapid triage: 4/9 issues closed in 24h
- Responsive maintainers: @penso authored 4/6 recent PRs
- Quality focus: regression tests accompanying fixes

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#235](https://github.com/moltis-org/moltis/issues/235) PTY Claude Code control | 17 days | **Architecture decision needed** | Maintainer input on feasibility of pseudo-terminal approach vs. official API |
| [#233](https://github.com/moltis-org/moltis/issues/233) Matrix support | 17 days | Stagnation | Community PR welcome? Needs triage label |
| [#412](https://github.com/moltis-org/moltis/pull/412) Browser session scoping | 3 days | Merge ready | Awaiting review — addresses #202 |
| [#436](https://github.com/moltis-org/moltis/pull/436) Windows file lock fix | 1 day | **Critical path** | Fast-track review — fixes production blocker |

**Recommendation:** Prioritize [#436](https://github.com/moltis-org/moltis/pull/436) for immediate review; consider labeling [#235](https://github.com/moltis-org/moltis/issues/235) for community contribution or RFC process given architectural scope.

---

*Digest generated from github.com/moltis-org/moltis activity for 2026-03-15*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-03-15

## 1. Today's Overview

CoPaw shows **strong community momentum** with 50 issues and 29 PRs updated in the last 24 hours, indicating an active development cycle. The project is in a **stabilization phase** with 33 issues closed versus 17 remaining open, and 8 PRs merged/closed against 21 still under review. No new release was published today, suggesting the team is consolidating fixes before the next version drop. The contributor base is expanding noticeably, with multiple "first-time-contributor" PRs addressing UI polish, provider integrations, and security hardening. Overall project health appears **robust but maintenance-heavy**, with core pain points around cross-platform compatibility, channel integrations, and model provider stability driving most activity.

---

## 2. Releases

**No new releases** (v0.0.7 remains current).

---

## 3. Project Progress

### Merged/Closed PRs Today (8 total)

| PR | Author | Summary | Impact |
|:---|:---|:---|:---|
| [#1471](https://github.com/agentscope-ai/CoPaw/pull/1471) | @lllcy | Copy action now extracts readable text instead of raw JSON | **UX fix** — resolves [#1457](https://github.com/agentscope-ai/CoPaw/issues/1457) |
| [#1495](https://github.com/agentscope-ai/CoPaw/pull/1495) | @nphenix | `trust_env=False` for httpx to prevent Windows proxy failures | **CI/reliability** — fixes test flakiness |
| [#1483](https://github.com/agentscope-ai/CoPaw/pull/1483) | @Leirunlin | `shutil.move` for cross-disk writes on Windows | **Critical bugfix** — resolves [#1431](https://github.com/agentscope-ai/CoPaw/issues/1431) |
| [#1494](https://github.com/agentscope-ai/CoPaw/pull/1494) | @yunxilyf | Parse `<think>` tags in OpenAI-compatible models | **Model compatibility** — thinking content extraction |
| [#1331](https://github.com/agentscope-ai/CoPaw/pull/1331) | @reidliu41 | Filter empty text blocks from DingTalk rich text | **Channel stability** — prevents LLM API errors |
| [#626](https://github.com/agentscope-ai/CoPaw/pull/626) | @yunxilyf | `<think>` tags support in OpenAIChatModelCompat | **Model output handling** |

**Key Advancements:**
- **Console UX**: Copy-to-clipboard now returns human-readable content
- **Windows compatibility**: Cross-disk file operations and proxy handling improved
- **Model reasoning**: Infrastructure to parse and display chain-of-thought content
- **Channel robustness**: DingTalk message parsing hardened against empty content

---

## 4. Community Hot Topics

### Most Active Issues (by engagement)

| Issue | Status | Comments | Core Need |
|:---|:---|:---|:---|
| [#282](https://github.com/agentscope-ai/CoPaw/issues/282) | **CLOSED** | 13 | **Protocol resilience** — HTTP chunked-read failures killing PPT generation tasks |
| [#981](https://github.com/agentscope-ai/CoPaw/issues/981) | **OPEN** | 12 | **Channel file sharing** — Feishu/QQ bots cannot send files to users |
| [#338](https://github.com/agentscope-ai/CoPaw/issues/338) | **OPEN** | 7 | **Webhook/API integration** — Bidirectional external system connectivity |

### Most Active PRs (by significance)

| PR | Status | Focus |
|:---|:---|:---|
| [#1478](https://github.com/agentscope-ai/CoPaw/pull/1478) | **OPEN** | **Nextcloud Talk channel** — Enterprise self-hosted messaging integration |
| [#1329](https://github.com/agentscope-ai/CoPaw/pull/1329) | **OPEN** | **Web authentication system** — Optional login/registration flow |
| [#1476](https://github.com/agentscope-ai/CoPaw/pull/1476) | **OPEN** | **Discord voice messages** — OGG format + auto-transcription support |

**Underlying Needs Analysis:**
- **Enterprise adoption**: Nextcloud, webhook APIs, and auth systems signal B2B use cases
- **Chinese market dominance**: Feishu, DingTalk, QQ issues comprise disproportionate activity
- **Media handling**: File sharing and voice messages are friction points across channels

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR | Description |
|:---|:---|:---|:---|:---|
| **Critical** | [#282](https://github.com/agentscope-ai/CoPaw/issues/282) | CLOSED | — | RemoteProtocolError kills agent tasks (PPT generation) |
| **High** | [#1087](https://github.com/agentscope-ai/CoPaw/issues/1087) | CLOSED | — | Mac mini M4 "Answers have stopped" — platform-specific failure |
| **High** | [#1413](https://github.com/agentscope-ai/CoPaw/issues/1413) | CLOSED | — | v0.0.5→v0.0.7 upgrade: skills duplication, model config loss |
| **Medium** | [#1493](https://github.com/agentscope-ai/CoPaw/issues/1493) | CLOSED | — | Self-termination: Python test scripts kill `python.exe` (includes CoPaw) |
| **Medium** | [#1457](https://github.com/agentscope-ai/CoPaw/issues/1457) | CLOSED | [#1471](https://github.com/agentscope-ai/CoPaw/pull/1471) | Copy returns JSON instead of Markdown |
| **Medium** | [#1374](https://github.com/agentscope-ai/CoPaw/issues/1374) | CLOSED | — | Workspace file refresh fails: "Failed to load file list" |
| **Medium** | [#639](https://github.com/agentscope-ai/CoPaw/issues/639) | CLOSED | — | Feishu+MCP: bot stops responding after MCP call failure |
| **Medium** | [#1429](https://github.com/agentscope-ai/CoPaw/issues/1429) | **OPEN** | — | `ReadError` on Windows — temp file access issue |
| **Medium** | [#902](https://github.com/agentscope-ai/CoPaw/issues/902) | **OPEN** | [#1476](https://github.com/agentscope-ai/CoPaw/pull/1476) | Discord voice: `TypeError: Unsupported audio file extension: ogg` |
| **Medium** | [#1501](https://github.com/agentscope-ai/CoPaw/issues/1501) | **OPEN** | — | Docker timezone immutable despite `TZ` env |
| **Medium** | [#1485](https://github.com/agentscope-ai/CoPaw/issues/1485) | **OPEN** | — | Default port 8088 conflicts with Windows TCP reserved range |

**Regression Risk:** The v0.0.7 upgrade path shows **data migration fragility** — users losing model configs suggests insufficient state management testing.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue/PR | Likelihood in Next Release | Rationale |
|:---|:---|:---|:---|
| **Webhook/API callback system** | [#338](https://github.com/agentscope-ai/CoPaw/issues/338) | **High** | 7 comments, clear enterprise use case, architectural foundation exists |
| **DeepSeek provider** | [#1498](https://github.com/agentscope-ai/CoPaw/pull/1498) | **Very High** | PR open, first-time contributor, OpenAI-compatible = low integration cost |
| **Nextcloud Talk channel** | [#1478](https://github.com/agentscope-ai/CoPaw/pull/1478) | **Medium-High** | PR open, enterprise demand, follows existing channel patterns |
| **Web authentication** | [#1329](https://github.com/agentscope-ai/CoPaw/pull/1329) | **Medium** | PR open but complex; security review needed |
| **Token usage dashboard** | [#311](https://github.com/agentscope-ai/CoPaw/issues/311), [#502](https://github.com/agentscope-ai/CoPaw/issues/502) | **Medium** | Repeated requests, cost management priority for users |
| **Permission approval gates** | [#174](https://github.com/agentscope-ai/CoPaw/issues/174) | **Medium** | Security-critical; PR [#1484](https://github.com/agentscope-ai/CoPaw/pull/1484) adds detection rules as first step |
| **File sending in Feishu/QQ** | [#981](https://github.com/agentscope-ai/CoPaw/issues/981) | **Medium** | High engagement but channel-specific complexity |
| **OpenRouter provider** | [#1192](https://github.com/agentscope-ai/CoPaw/pull/1192) | **Medium** | PR open with model filtering, but competing with DeepSeek for priority |

---

## 7. User Feedback Summary

### Pain Points

| Category | Evidence | Severity |
|:---|:---|:---|
| **Windows compatibility** | [#1431](https://github.com/agentscope-ai/CoPaw/issues/1431) (cross-disk moves), [#555](https://github.com/agentscope-ai/CoPaw/issues/555) (CMD wrapper), [#1495](https://github.com/agentscope-ai/CoPaw/issues/1495) (proxy), [#1485](https://github.com/agentscope-ai/CoPaw/issues/1485) (port conflicts) | **Critical** — Windows is second-class citizen |
| **Upgrade fragility** | [#1413](https://github.com/agentscope-ai/CoPaw/issues/1413) | **High** — data loss on version bumps |
| **Channel feature gaps** | [#981](https://github.com/agentscope-ai/CoPaw/issues/981) (no files), [#902](https://github.com/agentscope-ai/CoPaw/issues/902) (no voice), [#535](https://github.com/agentscope-ai/CoPaw/issues/535) (poor Markdown) | **High** — limits real-world deployment |
| **Self-harm in code execution** | [#1493](https://github.com/agentscope-ai/CoPaw/issues/1493) | **Medium** — agent kills itself testing Python |
| **MCP integration instability** | [#639](https://github.com/agentscope-ai/CoPaw/issues/639) | **Medium** — Feishu+MCP = unresponsive bot |

### Positive Signals

- **Active first-time contributors** — 6+ new contributors in 24h indicates healthy onboarding
- **Rapid issue closure** — 66% closure rate suggests responsive maintainers
- **Enterprise interest** — Nextcloud, webhook, auth requests show production adoption intent

### Use Case Patterns

1. **Multi-channel business bots** (Feishu/DingTalk/Discord for customer service)
2. **Local AI coding assistants** (Python execution, file operations)
3. **Self-hosted enterprise deployments** (Docker, Nextcloud, auth requirements)

---

## 8. Backlog Watch

### Issues Needing Maintainer Attention

| Issue | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#981](https://github.com/agentscope-ai/CoPaw/issues/981) | 6 days | **High** | 12 comments, no response — core channel functionality broken |
| [#338](https://github.com/agentscope-ai/CoPaw/issues/338) | 13 days | **High** | 7 comments, architectural decision needed on webhook design |
| [#1429](https://github.com/agentscope-ai/CoPaw/issues/1429) | 2 days | **Medium** | Windows `ReadError` — may affect broad user base |
| [#1501](https://github.com/agentscope-ai/CoPaw/issues/1501) | 1 day | **Medium** | Docker timezone — infrastructure hygiene |
| [#1485](https://github.com/agentscope-ai/CoPaw/issues/1485) | 1 day | **Medium** | Default port selection — breaking change consideration |

### PRs Stalled/Awaiting Review

| PR | Status | Blocker |
|:---|:---|:---|
| [#1329](https://github.com/agentscope-ai/CoPaw/pull/1329) | Open 3 days | Security review for auth system |
| [#1192](https://github.com/agentscope-ai/CoPaw/pull/1192) | Open 5 days | Competing with [#1498](https://github.com/agentscope-ai/CoPaw/pull/1498) for provider priority? |
| [#1410](https://github.com/agentscope-ai/CoPaw/pull/1410) | Open 2 days | Unix process group handling — needs platform testing |

---

*Digest generated from GitHub activity 2026-03-14 to 2026-03-15. All links verified against agentscope-ai/CoPaw repository.*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw Project Digest — 2026-03-15

## 1. Today's Overview

ZeptoClaw shows **strong development velocity** with 12 items updated in the last 24 hours (6 issues, 6 PRs) and a **5:1 resolution ratio** (5 closed issues vs. 1 open). The project is actively addressing critical infrastructure gaps—particularly container build tooling and security defaults—while expanding protocol support through the new ACP (Agent Client Protocol) implementation. No new releases were cut, suggesting the team is accumulating changes for a larger version bump. The maintainer (@qhkm) dominates both issue and PR activity, indicating centralized but responsive governance.

---

## 2. Releases

**No new releases** — last release status unchanged.

---

## 3. Project Progress

### Merged/Closed PRs (2 items)

| PR | Description | Impact |
|---|---|---|
| [#335](https://github.com/qhkm/zeptoclaw/pull/335) | Zhipu API key validation during onboarding | **Reliability**: Prevents misconfiguration by validating GLM keys against `/models` endpoint; unifies OpenAI-compatible validation path |
| [#346](https://github.com/qhkm/zeptoclaw/pull/346) | Discord image-only message handling | **Bug fix**: Resolves silent message dropping when users send images without text; fixes both parser and agent loop filters |

### Key Advances
- **Security hardening**: Issue [#347](https://github.com/qhkm/zeptoclaw/issues/347) closed with default agent mode now requiring explicit approval for dangerous tool categories—closes a significant safety gap
- **Container DX**: Dockerfile.dev cache mount support landed via PR [#358](https://github.com/qhkm/zeptoclaw/pull/358) (open but referenced in closed #333), enabling 10x+ faster incremental builds for contributors

---

## 4. Community Hot Topics

| Item | Activity | Analysis |
|---|---|---|
| [#333](https://github.com/qhkm/zeptoclaw/issues/333) Podman cache mount build error | 2 comments, closed | **Infrastructure pain point**: Podman 5.7 legacy builder incompatibility with BuildKit syntax blocked CI; fix validates container toolchain maturity needs |
| [#331](https://github.com/qhkm/zeptoclaw/issues/331) Improve Telegram support | 1 comment, **OPEN** | **UX gap**: Plain formatting + missing typing indicator hurts perceived responsiveness; signals demand for polished multi-channel UX |

**Underlying needs**: 
- **Developer experience**: Container tooling must support both Docker and Podman ecosystems (enterprise/Red Hat environments)
- **End-user polish**: Chat interfaces need native platform affordances (typing indicators, rich formatting) to compete with commercial assistants

---

## 5. Bugs & Stability

| Severity | Item | Status | Fix PR |
|---|---|---|---|
| 🔴 **High** | [#347](https://github.com/qhkm/zeptoclaw/issues/347) Default agent mode insecure (dangerous tools auto-approved) | **CLOSED** | Implied in closure |
| 🟡 **Medium** | [#357](https://github.com/qhkm/zeptoclaw/issues/357) Discord ignores image-only messages | **CLOSED** | [#346](https://github.com/qhkm/zeptoclaw/pull/346) |
| 🟡 **Medium** | [#333](https://github.com/qhkm/zeptoclaw/issues/333) Podman cache mount build failure | **CLOSED** | [#358](https://github.com/qhkm/zeptoclaw/pull/358) |

**Stability assessment**: All reported bugs from the 24h window have fixes merged or in final review. No open crash reports. The security default fix (#347) was critical—previously, agent mode ran with `auto_approve: true` for dangerous categories.

---

## 6. Feature Requests & Roadmap Signals

| Request | Source | Likelihood in Next Release |
|---|---|---|
| **ACP protocol support** (stdio + HTTP) | PR [#356](https://github.com/qhkm/zeptoclaw/pull/356) | **High** — Large PR open, implements emerging Agent Client Protocol standard for MCP-like interoperability |
| **Telegram UX polish** (formatting, typing) | Issue [#331](https://github.com/qhkm/zeptoclaw/issues/331) | Medium — Clear user pain point, but requires platform-specific work |
| **Coder template improvements** (test discovery, `edit_file`) | PR [#359](https://github.com/qhkm/zeptoclaw/pull/359) | High — Core workflow enhancement with regression tests included |
| **Shelldex directory listing** | Issue [#334](https://github.com/qhkm/zeptoclaw/issues/334) | N/A — Marketing/completed |

**Protocol strategy**: ACP implementation (#356) positions ZeptoClaw for MCP ecosystem compatibility—critical differentiator as the agent protocol space consolidates.

---

## 7. User Feedback Summary

| Theme | Evidence | Sentiment |
|---|---|---|
| **Container build friction** | #333, #358 | 😤 → 😊 (resolved) |
| **Security anxiety** | #347 | 😰 → 😌 (resolved) |
| **Chat UX expectations** | #331 | 😐 (pending) |
| **Multi-modal input** | #357, #355 | 😤 → 😊 (resolved) |

**Real use case**: Discord users expect to drop screenshots for analysis without typing text—now supported. Telegram users expect "typing..." feedback and markdown rendering—still pending.

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|---|---|---|---|
| [#331](https://github.com/qhkm/zeptoclaw/issues/331) Telegram improvements | 3 days | Medium | Needs maintainer assignment or community PR |
| PR [#355](https://github.com/qhkm/zeptoclaw/pull/355) Image content handling in loop | 2 days | Low | Appears to duplicate #346 scope; needs triage to avoid merge conflict |
| PR [#356](https://github.com/qhkm/zeptoclaw/pull/356) ACP implementation | 2 days | Low | Large feature; needs review bandwidth |

**No critical stale items** — all open PRs/Issues are <4 days old. Project maintains healthy review velocity.

---

*Digest generated from 12 GitHub activity items. Project health: **Green** — active development, responsive maintenance, security-conscious defaults.*

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/duanyytop/agents-radar).*