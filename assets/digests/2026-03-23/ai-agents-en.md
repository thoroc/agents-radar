# OpenClaw Ecosystem Digest 2026-03-23

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-03-23 00:10 UTC

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

# OpenClaw Project Digest — 2026-03-23

## 1. Today's Overview

OpenClaw shows **extremely high development velocity** with 500 issues and 500 PRs updated in the last 24 hours, indicating an active, fast-moving codebase. The project is in a **stabilization phase** with zero new releases, focusing on bug fixes and infrastructure hardening rather than feature expansion. The 403:97 open-to-closed issue ratio and 359:141 open-to-merged PR ratio suggest a growing backlog that may strain maintainer capacity. Critical regressions in gateway connectivity, session management, and channel integrations (WhatsApp, Slack, Telegram) dominate the issue tracker, while the PR queue shows strong community contribution with 30+ substantial fixes pending review. Overall project health is **mixed** — strong engagement but concerning accumulation of unresolved regressions.

---

## 2. Releases

**No new releases** (0 releases in last 24h). The latest referenced version in issues/PRs is **2026.3.13**, with multiple regressions reported against it. Users are experiencing stability issues that may warrant an emergency patch release.

---

## 3. Project Progress

### Merged/Closed PRs (Notable)

| PR | Description | Impact |
|:---|:---|:---|
| [#46679](https://github.com/openclaw/openclaw/pull/46679) | Ollama native API: fix `tool_calls` arguments JSON string handling | **Critical fix** for multi-turn tool calling with Ollama |
| [#23577](https://github.com/openclaw/openclaw/pull/23577) | Discord `ackReaction` automatic acknowledgment fix | Closed — Discord reliability improvement |
| [#50438](https://github.com/openclaw/openclaw/pull/50438) | Fix `devices` commands failing with gateway closed (1000) | Closed — device management stability |
| [#47590](https://github.com/openclaw/openclaw/pull/47590) | WSL2 gateway binding without response | Closed — Windows/WSL compatibility |
| [#24178](https://github.com/openclaw/openclaw/pull/24178) | Gateway startup hang under PM2 (doctor check blocks without TTY) | Closed — deployment/ops fix |
| [#52428](https://github.com/openclaw/openclaw/pull/52428) | Sweep stale `chatRunState` buffers for stuck runs | Closed — memory leak prevention |
| [#52502](https://github.com/openclaw/openclaw/pull/52502) | Various model fixes and upgrades from pi upstream | Closed — LLM provider stability |
| [#52465](https://github.com/openclaw/openclaw/pull/52465) | Route logs to stderr in `--json` mode | Closed — CLI output correctness |
| [#52489](https://github.com/openclaw/openclaw/pull/52489) | Fix generated image delivery to Discord | Closed — media delivery reliability |

### Key Advances
- **Gateway stability**: Multiple fixes for session lifecycle, WebSocket reconnection, and background task tracking
- **Channel reliability**: WhatsApp, Discord, Telegram, and BlueBubbles all receiving targeted fixes
- **Infrastructure**: Edit tool recovery hardening, symlink boundary widening for multi-agent workspaces, usage attribution corrections

---

## 4. Community Hot Topics

### Most Active Issues (by engagement)

| Issue | Comments | 👍 | Topic | Underlying Need |
|:---|:---:|:---:|:---|:---|
| [#26534](https://github.com/openclaw/openclaw/issues/26534) | 76 | 28 | **DingTalk first-install channel** | Enterprise onboarding — users want native Chinese enterprise messenger integration in setup flow |
| [#45772](https://github.com/openclaw/openclaw/issues/45772) | 20 | 1 | **Gateway heartbeat timer dies after 1-2 triggers** (v2026.3.8) | Production reliability — critical for long-running gateway stability |
| [#9443](https://github.com/openclaw/openclaw/issues/9443) | 17 | 1 | **Prebuilt Android APK releases** | Mobile accessibility — barrier to entry for non-technical users |
| [#4686](https://github.com/openclaw/openclaw/issues/4686) | 17 | 19 | **WhatsApp linking stuck at "logging in"** | Core channel reliability — high user pain, blocking re-authentication |
| [#7916](https://github.com/openclaw/openclaw/issues/7916) | 16 | 11 | **Encrypted API keys / secrets management** | Security compliance — enterprise adoption blocker |
| [#50090](https://github.com/openclaw/openclaw/issues/50090) | 13 | 1 | **Community Skill Development & ClawHub** | Ecosystem growth — need for discoverable, trusted skill marketplace |
| [#25145](https://github.com/openclaw/openclaw/issues/25145) | 13 | 3 | **Outbound message approval gate** | Safety/control — human-in-the-loop for agent actions |

### Most Active PRs

| PR | Focus | Significance |
|:---|:---|:---|
| [#46299](https://github.com/openclaw/openclaw/pull/46299) | WhatsApp reconnect queue drainage | Fixes message loss on transient disconnects |
| [#52516](https://github.com/openclaw/openclaw/pull/52516) | Harden edit tool recovery | Core agent reliability — "low-risk" cherry-pick of larger backlog |
| [#52529](https://github.com/openclaw/openclaw/pull/52529) | Optional `ROBUST_SOUL.md` security template | Community-driven prompt injection defense |
| [#52042](https://github.com/openclaw/openclaw/pull/52042) | Webchat new session button | UX improvement for multi-session workflows |
| [#52514](https://github.com/openclaw/openclaw/pull/52514) | OpenBrain-native MCP plugin extension | Memory integration — ecosystem expansion |

---

## 5. Bugs & Stability

### Critical/Severe (Production-Blocking)

| Issue | Severity | Description | Fix PR? |
|:---|:---:|:---|:---:|
| [#45772](https://github.com/openclaw/openclaw/issues/45772) | 🔴 **Critical** | Gateway heartbeat stops permanently after 1-2 triggers — breaks health monitoring | ❌ No |
| [#34830](https://github.com/openclaw/openclaw/issues/34830) | 🔴 **Critical** | 401 missing authentication header regression (OpenRouter) — breaks provider auth | ❌ No |
| [#45311](https://github.com/openclaw/openclaw/issues/45311) | 🔴 **Critical** | Slack socket mode receives zero events (2026.3.12 regression) | ❌ No |
| [#50208](https://github.com/openclaw/openclaw/issues/50208) | 🔴 **Critical** | WhatsApp "No active listener" on outbound sends despite connected status | ✅ [#46299](https://github.com/openclaw/openclaw/pull/46299) |
| [#52095](https://github.com/openclaw/openclaw/issues/52095) | 🔴 **Critical** | BlueBubbles webhook 404 despite successful registration | ❌ No |
| [#52116](https://github.com/openclaw/openclaw/issues/52116) | 🔴 **Critical** | Telegram polling permanently stuck after network failure — unrecoverable | ❌ No |

### High Severity

| Issue | Description | Fix PR? |
|:---|:---|:---:|
| [#45753](https://github.com/openclaw/openclaw/issues/45753) | Control UI pairing fails with gateway timeout (regression) | ❌ No |
| [#49510](https://github.com/openclaw/openclaw/issues/49510) | Gateway closed (1000) errors — widespread connectivity failures | ❌ No |
| [#51987](https://github.com/openclaw/openclaw/issues/51987) | Local gateway WebSocket handshake timeout (regression) | ❌ No |
| [#49157](https://github.com/openclaw/openclaw/issues/49157) | Session write locks leak causing >30min deadlocks | ❌ No |
| [#51873](https://github.com/openclaw/openclaw/issues/51873) | Context caching almost never works (Telegram) | ❌ No |
| [#52024](https://github.com/openclaw/openclaw/issues/52024) | Context trimmer splits tool_use/tool_result pairs — API rejection | ❌ No |

### Regressions Cluster (v2026.3.x)
Multiple issues tagged `regression` indicate **2026.3.x release series instability**:
- [#34830](https://github.com/openclaw/openclaw/issues/34830), [#45753](https://github.com/openclaw/openclaw/issues/45753), [#45311](https://github.com/openclaw/openclaw/issues/45311), [#50438](https://github.com/openclaw/openclaw/issues/50438), [#44760](https://github.com/openclaw/openclaw/issues/44760), [#50352](https://github.com/openclaw/openclaw/issues/50352), [#49187](https://github.com/openclaw/openclaw/issues/49187)

---

## 6. Feature Requests & Roadmap Signals

### Likely Near-Term (High Demand + Clear Path)

| Issue | Demand Signal | Implementation Clue |
|:---|:---|:---|
| [#26534](https://github.com/openclaw/openclaw/issues/26534) DingTalk first-install | 76 comments, 28 👍 | DingTalk support exists (#10347), just needs UI integration |
| [#9443](https://github.com/openclaw/openclaw/issues/9443) Android APK releases | 17 comments, sustained interest | `apps/android` exists in repo — CI/CD gap |
| [#7916](https://github.com/openclaw/openclaw/issues/7916) Encrypted secrets | 16 comments, 11 👍, enterprise need | Security hardening PRs emerging (#52529) |
| [#32495](https://github.com/openclaw/openclaw/issues/32495) Multi-agent switching in Control UI | 6 comments, 4 👍 | PR [#52042](https://github.com/openclaw/openclaw/pull/52042) adds session creation — foundation laid |

### Strategic/Ecosystem

| Issue | Long-term Signal |
|:---|:---|
| [#50090](https://github.com/openclaw/openclaw/issues/50090) ClawHub skill marketplace | Ecosystem maturity — needs governance model |
| [#49971](https://github.com/openclaw/openclaw/issues/49971) Native Agent Identity & Trust (ERC-8004/DID) | Web3/enterprise identity integration |
| [#8081](https://github.com/openclaw/openclaw/issues/8081) Multi-user RBAC | Enterprise multi-tenancy — 21 👍 |

### Model/Provider Expansion
- [#38204](https://github.com/openclaw/openclaw/issues/38204) Grok 4.2 Multi Model support
- [#48010](https://github.com/openclaw/openclaw/issues/48010) Ollama thinking mode control
- [#28183](https://github.com/openclaw/openclaw/pull/28183) Avian provider (PR open)

---

## 7. User Feedback Summary

### Pain Points (High Frequency)

| Theme | Evidence | Severity |
|:---|:---|:---:|
| **Gateway connectivity/reliability** | 15+ issues on WebSocket, heartbeat, "closed (1000)", handshake timeouts | 🔴 Critical |
| **Channel authentication fragility** | WhatsApp re-linking failures, Slack socket regressions, Telegram polling death | 🔴 Critical |
| **Windows/WSL experience** | Install failures, schtasks errors, PM2 hangs, path issues | 🟡 High |
| **Mobile/build accessibility** | No Android APK, complex build requirements | 🟡 High |
| **Security/secrets management** | Plaintext API keys, no encryption at rest | 🟡 High |

### Use Cases Emerging
- **Enterprise deployment**: DingTalk, RBAC, encrypted secrets, audit trails
- **Multi-agent teams**: Switching agents, session management, workspace isolation
- **Mobile companion**: Android app for on-the-go agent interaction
- **Safety-critical workflows**: Pre-send approval gates for outbound messages

### Satisfaction Indicators
- Strong community contribution (500 PRs updated)
- Active maintainer response on critical issues
- Rapid iteration on channel integrations

### Dissatisfaction Indicators
- Regression density in 2026.3.x suggests QA/test gap
- "Driftnet" tracking system (#51857) acknowledges silent failures — transparency issue
- Stale issues accumulating (multiple `[stale]` tags in top 50)

---

## 8. Backlog Watch

### Critical Issues Needing Maintainer Attention

| Issue | Age | Problem | Risk |
|:---|:---:|:---|:---|
| [#4686](https://github.com/openclaw/openclaw/issues/4686) WhatsApp linking stuck | ~8 weeks | Complete re-authentication failure | Channel abandonment |
| [#14593](https://github.com/openclaw/openclaw/issues/14593) Skill install fails in Docker (brew dependency) | ~6 weeks | Docker image broken for brew-based skills | Container adoption blocker |
| [#7663](https://github.com/openclaw/openclaw/issues/7663) Slack DM replies not delivered | ~7 weeks | Silent message loss | Reliability trust erosion |
| [#24612](https://github.com/openclaw/openclaw/issues/24612) Anthropic "thinking blocks cannot be modified" | ~4 weeks | Extended thinking mode broken for Claude | Premium feature failure |
| [#24102](https://github.com/openclaw/openclaw/issues/24102) Fallback chain not triggered on 429 | ~4 weeks | No resilience on quota exhaustion | Production fragility |

### Stale PRs at Risk of Bitrot

| PR | Age | Value | Blocker |
|:---|:---:|:---|:---|
| [#28215](https://github.com/openclaw/openclaw/pull/28215) Prevent cross-run duplicate resend | ~3 weeks | Message reliability | Needs review |
| [#29410](https://github.com/openclaw/openclaw/pull/29410) Stabilize WebSocket reconnect auth | ~3 weeks | Control UI stability | Needs review |
| [#28183](https://github.com/openclaw/openclaw/pull/28183) Avian provider | ~3 weeks | New LLM provider | Needs review |

### Recommendation
Given the **regression density** and **gateway stability crisis**, maintainers should consider:
1. **Emergency 2026.3.14 patch release** with heartbeat fix (#45772) and critical regressions
2. **Regression test harness** for channel integrations before future releases
3. **Triage surge** on gateway/WebSocket issues — 40% of top issues share this root cause

---

## Cross-Ecosystem Comparison

# Cross-Project AI Agent Ecosystem Analysis — 2026-03-23

## 1. Ecosystem Overview

The open-source personal AI assistant ecosystem is experiencing **intense fragmentation and rapid iteration**, with 10+ active projects pursuing convergent visions through divergent technical paths. The landscape is characterized by **channel integration proliferation** (WeChat, Telegram, Slack, Feishu, Discord, Matrix), **local-first deployment demand**, and emerging **multi-agent orchestration** capabilities. Most projects remain pre-1.0, with stability crises common—OpenClaw's gateway regressions, LobsterAI's quality debt, and CoPaw's Windows failures exemplify the tradeoff between velocity and reliability. Enterprise adoption signals (RBAC, encrypted secrets, audit trails, OAuth onboarding) are increasingly prominent across Chinese and Western markets alike.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Releases (24h) | Health Score | Assessment |
|:---|:---:|:---:|:---:|:---:|:---|
| **OpenClaw** | 500 | 500 | 0 | ⚠️ **Mixed** | Extreme velocity with dangerous backlog accumulation; 403:97 open:closed issue ratio signals maintainer strain |
| **NanoBot** | 18 | 72 | 0 | 🟡 **Active** | Strong community contribution; 61:11 open:merged PR ratio suggests review bottleneck |
| **ZeroClaw** | 43 | 50 | 7 ✅ | 🟢 **Strong** | Exceptional release cadence; branch migration debt partially offset by daily beta delivery |
| **PicoClaw** | 27 | 46 | 0 (nightly only) | 🟡 **Transitionary** | Major Agent refactor (Phase 1) complete; temporary instability expected |
| **NanoClaw** | 5 | 44 | 0 | 🟡 **Consolidating** | 73% open PR rate; multi-tenancy and trust framework landed but review backlog growing |
| **NullClaw** | 8 | 13 | 0 | 🟢 **Stable** | Steady maintainer throughput; Zig-based infrastructure shows discipline |
| **IronClaw** | 12 | 46 | 0 | 🟡 **Intensive** | XL PR backlog risk; execution engine v2 (7,275 lines) signals architectural boldness |
| **LobsterAI** | 28 | 26 | 1 ✅ | ⚠️ **Quality Crisis** | 15 security/quality issues filed in one day; community requesting stabilization branch |
| **TinyClaw** | 0 | 3 | 0 | 🟢 **Stable** | Zero issues atypical—possible underreporting; focused reliability fixes |
| **Moltis** | 2 | 1 | 0 | 🟢 **Maintenance** | Minimal activity; local-first memory enhancement shipped |
| **CoPaw** | 38 | 23 | 0 | ⚠️ **Strained** | Windows stability crisis; 15-comment async bug (#1976) unaddressed by maintainers |
| **ZeptoClaw** | 5 | 4 | 0 | 🟡 **Incremental** | Fork sync focus; Firecracker VM proposal signals architectural ambition |
| **EasyClaw** | 1 | 0 | 0 | 🟢 **Dormant** | Single Windows packaging fix; minimal ecosystem presence |

**Health Score Legend:** 🟢 Strong / 🟡 Active/Consolidating / ⚠️ Mixed/Strained / 🔴 Critical

---

## 3. OpenClaw's Position

### Advantages vs. Peers
| Dimension | OpenClaw Standing | Evidence |
|:---|:---|:---|
| **Scale** | Dominant | 500 issues/PRs daily vs. 3-72 for peers; de facto reference implementation |
| **Channel breadth** | Unmatched | WhatsApp, Slack, Telegram, Discord, BlueBubbles, DingTalk (partial) all maintained |
| **Ecosystem tooling** | Advanced | ClawHub skill marketplace concept (#50090), ROBUST_SOUL.md security template (#52529) |
| **Provider diversity** | Leading | Native Ollama, OpenRouter, Anthropic, OpenAI, with rapid Grok/Avian additions |

### Technical Approach Differences
| Aspect | OpenClaw | Typical Peer |
|:---|:---|:---|
| **Architecture** | Gateway-centric with WebSocket session management | Direct API polling or simpler HTTP bridges |
| **Extensibility** | Skill-based plugin system with declarative YAML | Hardcoded integrations or simpler middleware |
| **Deployment** | Docker-first, PM2 orchestration, WSL2 targeted | Single-binary or simpler containerization |
| **State management** | Complex `chatRunState` buffers, context trimming | Simpler in-memory or file-based approaches |

### Community Size Comparison
- **OpenClaw**: ~10x activity volume of nearest competitor (NanoBot/IronClaw)
- **Engagement quality**: High comment depth (76 comments on DingTalk issue #26534)
- **Contribution distribution**: 30+ substantial community fixes pending review vs. 3-15 for peers
- **Risk**: Scale without proportional maintainer growth → 403 open issues, critical regressions unassigned

**Verdict:** OpenClaw operates as the **ecosystem's Linux kernel**—heavily referenced, widely deployed, but accumulating technical debt from success-induced complexity.

---

## 4. Shared Technical Focus Areas

| Requirement | Projects | Specific Needs |
|:---|:---|:---|
| **WeChat/Weixin Integration** | NanoBot (3 competing PRs), PicoClaw (#1904), CoPaw (#2043), LobsterAI (#653) | QR login, polling stability, enterprise account support; WeChat 8.0.70 Openclaw compatibility |
| **Gateway/WebSocket Reliability** | OpenClaw (#45772, #49510), NanoBot (#1300 Matrix), ZeroClaw (#4275) | Heartbeat persistence, reconnection backoff, session lifecycle management |
| **Local-First Deployment** | ZeroClaw (Piper TTS, SearXNG, vision routing), Moltis (#137), NullClaw (Ollama cloud auth), NanoClaw (Raspberry Pi) | Offline TTS, local search, edge hardware support, privacy-preserving memory |
| **Multi-Agent Orchestration** | NanoClaw (Phase 2 peer IPC), IronClaw (#1557 execution engine v2), LobsterAI (#680), CoPaw (#2036) | Agent-to-agent messaging, dynamic spawning, observability/audit trails |
| **OAuth/Zero-Config Onboarding** | LobsterAI (MiniMax, Qwen), IronClaw (#902 Google OAuth resilience) | 10-second setup, API key elimination, enterprise SSO |
| **Cron/Scheduled Automation** | NanoBot (#2369 silent drops), ZeroClaw (#4279 declarative), NullClaw (#691 Docker cron), CoPaw (#1851 retry logic) | Reliability, declarative configuration, container integration |
| **Context/Token Management** | PicoClaw (#556 decouple window/tokens), NanoBot (#2343 confusion), OpenClaw (#52024 trimmer bugs) | 32K-128K model optimization, cost control, pair preservation |
| **Observability/Telemetry** | IronClaw (#690 OTEL), NanoClaw (#1280 PostHog), NullClaw (#690), OpenClaw (driftnet #51857) | Production monitoring, channel attribution, silent failure detection |

---

## 5. Differentiation Analysis

| Project | Primary Differentiation | Target User | Architecture Signature |
|:---|:---|:---|:---|
| **OpenClaw** | Reference ecosystem; maximum channel/provider coverage | Power users, integrators, multi-channel deployments | Gateway-centric, skill-based, high complexity |
| **NanoBot** | Chinese platform excellence (QQ, WeChat, Feishu); streaming infrastructure | China-market enterprise, local-first users | Event-driven, nightly builds, community-driven |
| **ZeroClaw** | Daily release velocity; local-first hardware efficiency (Piper, vision routing) | Privacy-conscious, self-hosting enthusiasts | Rust-based, mem0-free memory, inter-agent messaging |
| **PicoClaw** | Agent architecture refactor; event-driven hooks; embedded/ARM targets | Developers building on agent frameworks, edge deployers | Refactor-in-progress, interrupt handling, steering |
| **NanoClaw** | Multi-tenancy + web dashboard; trust/autonomy framework | SaaS operators, enterprise teams | Peer IPC, approval gates, operational hardening |
| **NullClaw** | Zig implementation; A2A protocol; adaptive intelligence | Systems programmers, protocol enthusiasts | Memory-safe systems language, Google A2A early adopter |
| **IronClaw** | WASM tool ecosystem; NEAR AI Cloud/TEE integration; unified execution engine | Web3, TEE-verified compute, plugin developers | WASM-first, staging CI automation, protocol compliance |
| **LobsterAI** | NetEase backing; rapid OAuth provider expansion; multi-agent observability | Chinese consumers, team collaboration | Electron-based, cowork sessions, IM-native |
| **CoPaw** | Multi-agent orchestration; `!!` interruption; channel routing | Team automation, WeChat enterprise | Async Python, Windows desktop focus, voice/Whisper |
| **ZeptoClaw** | Firecracker VM sandboxing proposal; Telegram polish | Security-conscious, container-native | Rust, microVM exploration, fork-sync workflow |
| **TinyClaw** | Codex harness abstraction; rapid provider additions | Minimalist users, Anthropic-heavy workflows | Simplified architecture, queue-based routing |

**Key Architectural Fault Lines:**
- **Language**: Python (OpenClaw, NanoBot, CoPaw, LobsterAI) vs. Rust (ZeroClaw, ZeptoClaw) vs. Zig (NullClaw)
- **Session Model**: WebSocket stateful (OpenClaw) vs. HTTP polling (NanoBot) vs. peer IPC (NanoClaw)
- **Sandboxing**: Process-based (most) vs. WASM (IronClaw) vs. Firecracker VMs (ZeptoClaw proposal)

---

## 6. Community Momentum & Maturity

### Tier 1: Rapid Iteration (Velocity Risk)
| Project | Velocity Signal | Risk Factor |
|:---|:---|:---|
| **OpenClaw** | 1000 items/day | Maintainer burnout, regression density |
| **ZeroClaw** | 7 releases/day, 12 PRs/author/day | Branch migration debt, feature loss |
| **LobsterAI** | 15 security issues + 6 feature PRs/day | Quality crisis, stabilization demand |

### Tier 2: Active Consolidation
| Project | Focus | Trajectory |
|:---|:---|:---|
| **NanoBot** | WeChat convergence, streaming fixes | Near-term feature completion likely |
| **PicoClaw** | Agent refactor stabilization | v0.2.3 release pending architectural validation |
| **NanoClaw** | Multi-tenancy, trust framework | Enterprise feature maturation |
| **IronClaw** | Execution engine v2, MCP compliance | Foundation rewrite → potential instability |
| **CoPaw** | Windows hardening, multi-agent | Critical path blocked by platform parity |

### Tier 3: Stable/Maintenance
| Project | State | Outlook |
|:---|:---|:---|
| **NullClaw** | Steady Zig development, A2A protocol | Sustainable pace, niche appeal |
| **ZeptoClaw** | Fork sync, incremental Telegram polish | Community fork viability |
| **TinyClaw** | Zero issues, focused fixes | Possible underreporting or limited deployment |
| **Moltis** | Minimal activity, local-first niche | Maintenance mode risk |
| **EasyClaw** | Single-issue resolution | Ecosystem marginality |

---

## 7. Trend Signals

### For AI Agent Developers

| Trend | Evidence | Actionable Insight |
|:---|:---|:---|
| **Enterprise hardening over consumer features** | Encrypted secrets (#7916), RBAC (#8081), audit trails (#50090), ClawHub opt-out (#1570) | Build governance-first; compliance is becoming table stakes |
| **China market integration as competitive moat** | DingTalk (#26534), WeChat (3+ projects), QQ file support (#2226), Feishu maturity | Regional platform depth may exceed Western channel coverage |
| **Silent failure as critical UX debt** | Cron drops (#2369), "No active listener" (#50208), Telegram double responses (#2235), driftnet (#51857) | Implement health checks, heartbeat dashboards, automatic recovery |
| **Local-first as privacy default** | Piper TTS, SearXNG, Ollama native, RAG disable options, edge ARM deployment | Assume cloud skepticism; design offline-capable architectures |
| **Multi-agent from novelty to necessity** | Peer IPC (#1334), orchestration (#2036, #680), execution engine v2 (#1557) | Plan for agent identity, message routing, and conflict resolution |
| **OAuth/zero-config as onboarding standard** | MiniMax "10 seconds" (#682), Qwen (#644), Google OAuth resilience (#931) | API key management is friction; embed provider OAuth flows |
| **WASM/TEE as emerging trust layer** | IronClaw WASM tools, credential injection (#1537), ZeptoClaw Firecracker | Prepare for verifiable, sandboxed execution environments |
| **Context engineering as core competency** | Token budget confusion (#2343), trimmer pair splitting (#52024), 128K defaults | Invest in context window UX, cost estimation, and compression |

### Strategic Recommendation

The ecosystem is **bifurcating** between:
- **Foundation layers** (OpenClaw, IronClaw): High complexity, maximum compatibility, stability debt
- **Specialized runtimes** (ZeroClaw, NullClaw, ZeptoClaw): Language-native efficiency, security innovation, narrower adoption

**For new entrants**: Target the **integration gap**—no project has solved cross-platform mobile (Android APK demand #9443), reliable Windows deployment (CoPaw/EasyClaw pain), and enterprise SSO in a unified package. The **local-first + WeChat + cron reliability** intersection remains underserved despite high demand signals.

---

*Analysis compiled from 13 project digests covering 1,500+ issues, 800+ PRs, and 8 releases on 2026-03-23.*

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-03-23

## 1. Today's Overview

NanoBot shows **high community activity** with 72 PRs and 18 issues updated in the last 24 hours, indicating an active development phase. The project is experiencing significant community contribution around **WeChat/Weixin channel integration** (3 competing PRs submitted), **streaming infrastructure**, and **context management improvements**. However, the **61 open PRs versus 11 merged/closed** suggests a potential bottleneck in maintainer review capacity. No new releases were published, and the nightly branch refresh occurred on March 22 per scheduled maintenance. The project health appears strong in community engagement but may need attention to PR triage velocity.

---

## 2. Releases

**No new releases** (v0.1.4.post5 remains current).

---

## 3. Project Progress

### Merged/Closed PRs (11 total, notable items):

| PR | Description | Significance |
|:---|:---|:---|
| [#2226](https://github.com/HKUDS/nanobot/issues/2226) | QQ channel file send/receive functionality | **Major community contribution** — addresses long-standing gap where QQ channel only supported text |
| [#981](https://github.com/HKUDS/nanobot/issues/981) | Fixed prompt cache invalidation from dynamic timestamps | Performance fix for LLM API costs |
| [#2363](https://github.com/HKUDS/nanobot/issues/2363) | `_strip_think()` semantic inconsistency | Code quality improvement |
| [#2312](https://github.com/HKUDS/nanobot/issues/2312) | Nightly branch refresh notice | Infrastructure maintenance completed |
| [#2263](https://github.com/HKUDS/nanobot/pull/2263) | Tool hints user/group specification | Closed as invalid — feature rejected |

### Key Advances:
- **QQ ecosystem maturation**: File/image support finally landing after community iteration since #1667
- **Performance**: Prompt caching fix reduces token costs for long-running sessions

---

## 4. Community Hot Topics

### Most Active Discussions (by engagement):

| Rank | Item | Comments/Reactions | Analysis |
|:---|:---|:---|:---|
| 1 | [#2235](https://github.com/HKUDS/nanobot/issues/2235) Telegram double responses | 5 comments, 6 👍 | **UX regression** — "faux streaming" causing duplicate message display; affects perceived reliability |
| 2 | [#2343](https://github.com/HKUDS/nanobot/issues/2343) Context reduction for 32k models | 8 comments | **Configuration complexity** — users misunderstanding `maxTokens` vs `contextWindowTokens` relationship |
| 3 | [#1300](https://github.com/HKUDS/nanobot/issues/1300) Matrix channel failure | 8 comments | **Channel stability** — Matrix integration broken for 3+ weeks, blocking users |
| 4 | [#2226](https://github.com/HKUDS/nanobot/issues/2226) QQ file support | 4 comments, 4 👍 | Strong community demand for Chinese platform integration |

### Underlying Needs:
- **Better documentation** for context/token configuration (recurring confusion)
- **Streaming architecture fixes** — duplicate messages indicate architectural debt in faux-streaming implementation
- **Matrix maintainer attention** — 3-week-old breakage suggests channel-specific expertise gap

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|:---|:---|:---|:---|
| **High** | [#2235](https://github.com/HKUDS/nanobot/issues/2235) | Telegram responses render twice due to faux streaming | No fix PR; workaround: wait for auto-cleanup |
| **High** | [#2369](https://github.com/HKUDS/nanobot/issues/2369) | Cron reminders **silently dropped** by evaluator | No fix PR; core scheduling reliability broken |
| **High** | [#2358](https://github.com/HKUDS/nanobot/issues/2358) | Workspace switch leaks CRON jobs with wrong prompts | No fix PR; data isolation risk |
| **Medium** | [#2293](https://github.com/HKUDS/nanobot/issues/2293) | Ollama local models die on tool execution | No fix PR; local-first deployment blocker |
| **Medium** | [#2329](https://github.com/HKUDS/nanobot/issues/2329) | Custom providers work in CLI, fail in channels | No fix PR; configuration inconsistency |
| **Medium** | [#1300](https://github.com/HKUDS/nanobot/issues/1300) | Matrix channel non-functional | No fix PR; 3+ weeks stale |
| **Medium** | [#2352](https://github.com/HKUDS/nanobot/issues/2352) | Feishu file attachments not received | No fix PR; MCP/file handling gap |
| **Low** | [#144](https://github.com/HKUDS/nanobot/issues/144) | Gemini API key error with OpenRouter | Community workaround exists |

### Fix PRs Available:
- [#2364](https://github.com/HKUDS/nanobot/pull/2364): Cron recursion prevention (partial fix for #2369 class of issues)
- [#2361](https://github.com/HKUDS/nanobot/pull/2361): Matrix command handling fix (addresses #1300 symptoms)

---

## 6. Feature Requests & Roadmap Signals

### High-Probability Next-Version Features:

| Feature | Evidence | Confidence |
|:---|:---|:---|
| **WeChat/Weixin personal account channel** | 3 competing PRs: [#2360](https://github.com/HKUDS/nanobot/pull/2360), [#2348](https://github.com/HKUDS/nanobot/pull/2348), [#2355](https://github.com/HKUDS/nanobot/pull/2355) | **Very High** — community demand + WeChat 8.0.70 Openclaw support announcement |
| **End-to-end streaming** | [#2365](https://github.com/HKUDS/nanobot/pull/2365) — infrastructure PR open | **High** — addresses #2235 UX issues |
| **Configurable subagents with independent LLM configs** | [#2368](https://github.com/HKUDS/nanobot/pull/2368) | **Medium-High** — architectural improvement for multi-agent workflows |
| **Context budget management** | [#2317](https://github.com/HKUDS/nanobot/pull/2317) | **Medium** — performance optimization |
| **LiteLLM tracing/observability** | [#2268](https://github.com/HKUDS/nanobot/pull/2268) | **Medium** — operational need |

### User-Requested (Unimplemented):
- [#2353](https://github.com/HKUDS/nanobot/issues/2353): Official WeChat integration (awaiting WeChat 8.0.70 Openclaw)
- [#2370](https://github.com/HKUDS/nanobot/issues/2370): Local network whitelist for self-hosted services
- [#2213](https://github.com/HKUDS/nanobot/issues/2213): Gateway dashboard UI (external contribution offered)

---

## 7. User Feedback Summary

### Pain Points:

| Theme | Evidence | Severity |
|:---|:---|:---|
| **Configuration complexity** | #2343, #2359, #2329 | High — token/context settings poorly explained |
| **Silent failures** | #2369 (cron), #2293 (Ollama tool death) | Critical — users unaware of failures |
| **Channel reliability** | #1300 (Matrix), #2235 (Telegram), #2352 (Feishu) | High — production deployment risk |
| **Workspace isolation** | #2358 | Medium — multi-tenant safety issue |

### Use Cases Emerging:
- **Enterprise China deployment**: QQ, WeChat, Feishu integration demands
- **Local-first AI**: Ollama + local Gitea (#2370) — privacy-conscious organizations
- **Long-running automation**: Cron reliability critical for scheduled workflows

### Satisfaction Signals:
- Strong community contribution (72 PRs) indicates healthy ecosystem
- QQ file support finally landing after community persistence
- External UI contribution offered (#2213) — project attractiveness

---

## 8. Backlog Watch

### Critical Items Needing Maintainer Attention:

| Issue/PR | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#1300](https://github.com/HKUDS/nanobot/issues/1300) Matrix broken | 24+ days | Channel abandonment | Assign Matrix maintainer or deprecate |
| [#144](https://github.com/HKUDS/nanobot/issues/144) Gemini/OpenRouter | 46+ days | Provider integration gap | Review community fix in comments |
| [#2213](https://github.com/HKUDS/nanobot/issues/2213) Dashboard UI offer | 4 days | Missed contribution | Respond to contributor @wangyixuxiaowei |
| [#2366](https://github.com/HKUDS/nanobot/issues/2366) Citation dispute | 1 day | Legal/IP risk | Acknowledge and investigate |
| 61 open PRs | — | Review bottleneck | Triage velocity improvement |

### Recommendation:
The **WeChat channel convergence** (3 PRs) and **streaming infrastructure** (#2365) represent strategic opportunities. Prioritizing these would address the #2235 UX regression and capture the WeChat 8.0.70 momentum. The **cron/evaluator silent failure** (#2369) is a reliability risk requiring urgent attention before broader automation adoption.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-03-23

## 1. Today's Overview

ZeroClaw shows **exceptional velocity** with 50 PRs and 43 issues updated in 24 hours, including 7 releases (v0.5.6-beta.536 through v0.5.8). The project is in active feature consolidation mode following the `main`→`master` branch migration, with significant effort devoted to restoring lost functionality. Core contributor **theonlyhennygod** dominated merged work, closing 12+ PRs in a single day. Community engagement is strong with multi-comment issue threads on platform integrations and architectural proposals. The release cadence suggests a mature CI/CD pipeline with daily beta releases and stable version bumps.

---

## 2. Releases

### v0.5.8 (Stable) — [Release Link](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.5.8)
| Change | Impact |
|--------|--------|
| `matrix: add allowed_rooms config for room-level gating` | Security enhancement for Matrix deployments |
| `multimodal: route image messages to dedicated vision provider` | Enables local-first GPU efficiency |
| `telegram: support forwarded messages with attribution` | Better UX for Telegram moderation |
| `tts: add local Piper TTS provider` | Offline TTS capability |

### v0.5.8-beta.577 — [Release Link](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.5.8-beta.577)
| Change | Impact |
|--------|--------|
| Browser automation skill + VNC setup scripts | Major infrastructure for agent web interaction |
| Feishu/Lark image and file support | Enterprise China market expansion |
| SearXNG search provider | Privacy-focused search alternative |
| Voice message transcription | Slack/Discord voice memo processing |
| Declarative cron job configuration | GitOps-friendly job management |
| Gateway named sessions | Better orchestrator integration |

### v0.5.7 / v0.5.6 Series
- Memory architecture: layered upgrade with mem0 backend removal
- Inter-agent messaging: session list, history, send tools
- Heartbeat: session context injection for conversation continuity

**Breaking Changes:** None explicitly noted; migration primarily additive.

---

## 3. Project Progress

### Merged/Closed PRs Today (25 total, key highlights)

| PR | Author | Summary | Significance |
|----|--------|---------|------------|
| [#4281](https://github.com/zeroclaw-labs/zeroclaw/pull/4281) | theonlyhennygod | Browser automation skill + VNC | Foundation for agent web agents |
| [#4278](https://github.com/zeroclaw-labs/zeroclaw/pull/4278) | theonlyhennygod | Voice transcription (Slack/Discord) | Closes [#4231](https://github.com/zeroclaw-labs/zeroclaw/issues/4231) |
| [#4280](https://github.com/zeroclaw-labs/zeroclaw/pull/4280) | theonlyhennygod | Feishu/Lark image+file support | Closes [#4235](https://github.com/zeroclaw-labs/zeroclaw/issues/4235) |
| [#4279](https://github.com/zeroclaw-labs/zeroclaw/pull/4279) | theonlyhennygod | Declarative cron jobs | Closes [#4045](https://github.com/zeroclaw-labs/zeroclaw/issues/4045) |
| [#4276](https://github.com/zeroclaw-labs/zeroclaw/pull/4276) | theonlyhennygod | Skill tools as callable specs | Closes [#4040](https://github.com/zeroclaw-labs/zeroclaw/issues/4040) — enables native function calling |
| [#4272](https://github.com/zeroclaw-labs/zeroclaw/pull/4272) | theonlyhennygod | SearXNG search provider | Closes [#4152](https://github.com/zeroclaw-labs/zeroclaw/issues/4152) |
| [#4275](https://github.com/zeroclaw-labs/zeroclaw/pull/4275) | theonlyhennygod | Gateway named sessions | Fixes reconnect + validation bugs |
| [#4274](https://github.com/zeroclaw-labs/zeroclaw/pull/4274) | theonlyhennygod | Memory time-decay scoring | Restores lost [#2387](https://github.com/zeroclaw-labs/zeroclaw/pull/2387) functionality |
| [#4270](https://github.com/zeroclaw-labs/zeroclaw/pull/4270) | theonlyhennygod | Internet access by default | `web_fetch`, `web_search`, `browser` enabled OOTB |
| [#4277](https://github.com/zeroclaw-labs/zeroclaw/pull/4277) | theonlyhennygod | Fix thinking level prefix leak | Interactive session stability |
| [#4271](https://github.com/zeroclaw-labs/zeroclaw/pull/4271) | theonlyhennygod | UTF-8 byte offset fix in link enricher | Prevents panics on Turkish/Chinese text |

**Pattern:** Heavy focus on **local-first deployment** (Piper TTS, vision routing, SearXNG) and **enterprise integrations** (Feishu/Lark, Matrix gating).

---

## 4. Community Hot Topics

### Most Active Issues by Engagement

| Issue | Comments | 👍 | Topic | Underlying Need |
|-------|----------|-----|-------|---------------|
| [#3540](https://github.com/zeroclaw-labs/zeroclaw/issues/3540) | 9 | 0 | Lark/Feishu build failure | **Enterprise China deployment reliability** — build system complexity for optional features |
| [#2487](https://github.com/zeroclaw-labs/zeroclaw/issues/2487) | 6 | 1 | `channel_ack_config` schema error | **Runtime stability** — function schema validation breaking provider calls |
| [#3513](https://github.com/zeroclaw-labs/zeroclaw/issues/3513) | 4 | 1 | Agent multi-message spam | **UX polish** — response consolidation for professional use |
| [#3454](https://github.com/zeroclaw-labs/zeroclaw/issues/3454) | 4 | 0 | Web Dashboard 404 | **Onboarding friction** — dashboard discovery/packaging issue |
| [#4093](https://github.com/zeroclaw-labs/zeroclaw/issues/4093) | 4 | 1 | Stranded streaming PRs | **Branch management crisis** — `dev` branch deletion lost critical features |
| [#3478](https://github.com/zeroclaw-labs/zeroclaw/issues/3478) | 4 | 0 | SQLite memory scoring pipeline | **Memory quality** — sophisticated retrieval for long-running agents |

**Analysis:** The community is grappling with **deployment complexity** (build features, dashboard availability) and **data loss anxiety** from the branch migration. The 9-comment Feishu thread indicates strong APAC enterprise interest.

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR | Description |
|----------|-------|--------|--------|-------------|
| **S0** | [#3753](https://github.com/zeroclaw-labs/zeroclaw/issues/3753) | OPEN | None | Missing tools from `main` branch — **data loss/security risk** |
| **S0** | [#4247](https://github.com/zeroclaw-labs/zeroclaw/issues/4247) | **CLOSED** | [#4276](https://github.com/zeroclaw-labs/zeroclaw/pull/4276) | Default approved tools unusable — **security regression** |
| **S1** | [#3540](https://github.com/zeroclaw-labs/zeroclaw/issues/3540) | OPEN | None | Lark/Feishu channel build failure — **workflow blocked** |
| **S1** | [#2487](https://github.com/zeroclaw-labs/zeroclaw/issues/2487) | OPEN | None | `channel_ack_config` schema invalid — **all providers fail** |
| **S1** | [#4253](https://github.com/zeroclaw-labs/zeroclaw/issues/4253) | **CLOSED** | — | OpenAI-compatible model refresh panic — **async context bug** |
| **S1** | [#4139](https://github.com/zeroclaw-labs/zeroclaw/issues/4139) | **CLOSED** | [#4271](https://github.com/zeroclaw-labs/zeroclaw/pull/4271) | UTF-8 byte index panic in `creator.rs` |
| **S2** | [#2960](https://github.com/zeroclaw-labs/zeroclaw/issues/2960) | OPEN | None | Browser pairing not persistent — **UX degradation** |
| **S2** | [#3679](https://github.com/zeroclaw-labs/zeroclaw/issues/3679) | OPEN | None | Cost tracking removed in branch migration — **billing/compliance risk** |
| **S2** | [#3454](https://github.com/zeroclaw-labs/zeroclaw/issues/3454) | OPEN | None | Web Dashboard 404 — **onboarding blocked** |

**Stability Assessment:** Two S0 issues remain open with no assigned fix PRs. The branch migration continues to cause **regression debt** (cost tracking, tools, streaming features). Daily release velocity suggests fixes are prioritized, but tracking gaps exist.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood v0.5.9 | Rationale |
|---------|-------|-------------------|-----------|
| **LM Studio native connector** | [#2669](https://github.com/zeroclaw-labs/zeroclaw/issues/2669) | HIGH | Local-first priority; "custom URL is messy" |
| **Codex reasoning_effort config** | [#2433](https://github.com/zeroclaw-labs/zeroclaw/issues/2433) | MEDIUM | Model capability parity; small surface |
| **pgvector + graph memory** | [#4028](https://github.com/zeroclaw-labs/zeroclaw/issues/4028) | MEDIUM | Database-first architecture aligns with layered memory work |
| **Multi-stage SQLite scoring** | [#3478](https://github.com/zeroclaw-labs/zeroclaw/issues/3478) | HIGH | Zero-dependency, detailed proposal, memory focus |
| **Restored security/Copilot features** | [#3818](https://github.com/zeroclaw-labs/zeroclaw/issues/3818) | HIGH | Explicit regression; community pressure |

**Emerging Theme:** **Observability and control** — cost tracking, session naming, declarative configs, and memory lifecycle management suggest users need ZeroClaw for **production multi-tenant deployments**.

---

## 7. User Feedback Summary

### Pain Points
| Category | Evidence | Severity |
|----------|----------|----------|
| **Branch migration trauma** | [#4093](https://github.com/zeroclaw-labs/zeroclaw/issues/4093), [#3679](https://github.com/zeroclaw-labs/zeroclaw/issues/3679), [#3753](https://github.com/zeroclaw-labs/zeroclaw/issues/3753), [#3818](https://github.com/zeroclaw-labs/zeroclaw/issues/3818) | Critical |
| **Build complexity** | [#3540](https://github.com/zeroclaw-labs/zeroclaw/issues/3540) — "compiled `channel-lark` but Feishu can't start" | High |
| **Documentation gaps** | [#2669](https://github.com/zeroclaw-labs/zeroclaw/issues/2669), [#3454](https://github.com/zeroclaw-labs/zeroclaw/issues/3454) | Medium |
| **Dashboard discoverability** | [#3454](https://github.com/zeroclaw-labs/zeroclaw/issues/3454) — "error 404 Not found" | Medium |

### Positive Signals
- **Local-first enthusiasm**: Strong engagement on Piper TTS, vision routing, SearXNG
- **Enterprise adoption**: Feishu/Lark, Matrix gating, cron jobs for business workflows
- **Agent ecosystem**: Inter-agent messaging tools, session management for orchestration

### Use Case Evolution
Users are moving from **personal assistant** → **team automation platform** → **multi-agent infrastructure**.

---

## 8. Backlog Watch

| Issue/PR | Age | Blocker | Action Needed |
|----------|-----|---------|---------------|
| [#4093](https://github.com/zeroclaw-labs/zeroclaw/issues/4093) — Stranded streaming PRs | 2 days | Branch deletion | **Audit `dev` branch for all unmerged work** |
| [#3679](https://github.com/zeroclaw-labs/zeroclaw/issues/3679) — Cost tracking missing | 6 days | No assignee | Restore from `main` backup or reimplement |
| [#3818](https://github.com/zeroclaw-labs/zeroclaw/issues/3818) — Security/Copilot restore | 5 days | No assignee | Cross-reference `main`/`master` diff |
| [#2960](https://github.com/zeroclaw-labs/zeroclaw/issues/2960) — Browser pairing persistence | 15 days | No assignee | Storage layer fix for dashboard auth |
| [#4181](https://github.com/zeroclaw-labs/zeroclaw/pull/4181) — Claude-code test flakiness | 1 day | Review pending | CI reliability for contributor experience |
| [#4267](https://github.com/zeroclaw-labs/zeroclaw/pull/4267) — Named sessions (original) | 1 day | Superseded by [#4275](https://github.com/zeroclaw-labs/zeroclaw/pull/4275)? | Confirm closure or merge |

**Maintainer Priority:** The branch migration debt requires **systematic audit** — multiple critical features (cost tracking, streaming, security params) are reported missing with no unified tracking issue.

---

*Digest generated from 43 issues, 50 PRs, and 7 releases on 2026-03-23.*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-03-23

## 1. Today's Overview

PicoClaw shows **high development velocity** with 46 PRs and 27 issues updated in the last 24 hours, indicating an active pre-release stabilization period for v0.2.3. The project is undergoing a **major architectural transformation** with the Agent refactor (Phase 1 completed and merged) driving significant code changes. Community engagement is strong with multilingual participation (Chinese and English), though the issue-to-PR ratio suggests some backlog accumulation. The nightly build pipeline is operational, producing automated builds for testing. Overall project health appears **robust but transitionary**, with core infrastructure changes introducing temporary instability in provider integrations and configuration handling.

---

## 2. Releases

| Version | Type | Notes |
|---------|------|-------|
| [v0.2.3-nightly.20260322.c0bb8d6d](https://github.com/sipeed/picoclaw/compare/v0.2.3...main) | Nightly | Automated build from main branch; marked unstable |

**No stable release** published today. The nightly build reflects the merged Agent refactor (Phase 1) and should be used with caution given the scope of architectural changes.

---

## 3. Project Progress

### Major Merges (Closed PRs)

| PR | Description | Impact |
|----|-------------|--------|
| [#1894](https://github.com/sipeed/picoclaw/pull/1894) | **Agent refactor Phase 1 complete** — consolidates Agent model from `refactor/agent` branch | Core architecture: new event-driven loop, hook system, interrupt handling |
| [#1899](https://github.com/sipeed/picoclaw/pull/1899) | Runtime reconciliation for unified kernel flow | Stability: fixes eval-shaped failures in tool execution, memory retrieval |
| [#1891](https://github.com/sipeed/picoclaw/pull/1891) | Audio-model transcription support (multimodal models beyond Groq) | Feature: `AudioModelTranscriber` with configurable `voice.model_name` |
| [#1509](https://github.com/sipeed/picoclaw/pull/1509) | Strip `extra_content` from tool calls for non-Google providers | Fix: OpenAI-compatible API validation errors with Gemini extended thinking |
| [#665](https://github.com/sipeed/picoclaw/pull/665) | Prevent orphaned tool_call/tool_result pairs after compression | Fix: Anthropic API 400 errors |
| [#556](https://github.com/sipeed/picoclaw/pull/556) | Decouple `context_window` from `max_tokens` | Fix: stops overly aggressive context trimming (128K default) |

### Key Advancements
- **Agent architecture** is now event-driven with hooks, interrupts, and steering capabilities
- **Transcription** expands beyond Groq to any multimodal LLM
- **Provider compatibility** improved for OpenAI-compatible gateways

---

## 4. Community Hot Topics

### Most Active Discussions

| Item | Activity | Core Concern |
|------|----------|--------------|
| [#1316](https://github.com/sipeed/picoclaw/issues/1316) | 11 comments, closed | **Agent loop observability** — community validated need for event-driven hooks |
| [#1216](https://github.com/sipeed/picoclaw/issues/1216) | 9 comments, open | **Meta: Agent refactor roadmap** — tracking long-term technical debt |
| [#1856](https://github.com/sipeed/picoclaw/issues/1856) | 7 comments, closed | REST API documentation gap — users unclear on HTTP capabilities |
| [#748](https://github.com/sipeed/picoclaw/issues/748) | 7 comments, open | **Groq API compatibility** — tool call format mismatch blocking usage |

### Underlying Needs Analysis

| Pattern | Insight |
|---------|---------|
| **Observability demands** | Users need visibility into agent decision-making; black-box execution unacceptable for production |
| **Provider fragmentation** | Multiple issues around OpenAI-compatible API variations (Groq, OpenRouter, local gateways) |
| **Documentation gaps** | REST API, WebSocket ports, configuration options poorly discoverable |
| **Deployment friction** | ARM32 support, pre-built launcher requests indicate embedded/edge use cases |

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR |
|----------|-------|--------|--------|
| **High** | [#748](https://github.com/sipeed/picoclaw/issues/748) Groq tool call format error (`<function=name{...}>` rejected) | Open | None |
| **High** | [#1901](https://github.com/sipeed/picoclaw/issues/1901) API key configuration ignored for `step-3.5` model — service crash | Open | None |
| **High** | [#1898](https://github.com/sipeed/picoclaw/issues/1898) Routing error on gateway startup | Open | None |
| **Medium** | [#1708](https://github.com/sipeed/picoclaw/issues/1708) REST API endpoints unavailable on Gateway (only health works) | Open | None |
| **Medium** | [#1790](https://github.com/sipeed/picoclaw/issues/1790) OpenRouter free tier model ID validation fails | Open | None |
| **Medium** | [#1864](https://github.com/sipeed/picoclaw/issues/1864) `/v1/models` probe missing API key for auth-required providers | Open | [#1896](https://github.com/sipeed/picoclaw/pull/1896) |
| **Medium** | [#1611](https://github.com/sipeed/picoclaw/issues/1611) Gemini fails when not primary model | Open | None |
| **Medium** | [#1502](https://github.com/sipeed/picoclaw/issues/1502) Mistral integration "Extra inputs" error | Open | None |
| **Medium** | [#1886](https://github.com/sipeed/picoclaw/issues/1886) MediaStore cleanup deletes workspace files | Open | None |
| **Low** | [#1895](https://github.com/sipeed/picoclaw/issues/1895) Feishu/DingTalk channels non-functional | Open | None |

**Regressions from Agent refactor:** [#1879](https://github.com/sipeed/picoclaw/issues/1879) `forceCompression` assumes incorrect history structure.

---

## 6. Feature Requests & Roadmap Signals

| Request | Likelihood v0.2.3+ | Rationale |
|---------|-------------------|-----------|
| **Event-driven hooks system** | ✅ High | Phase 1 merged; [#1796](https://github.com/sipeed/picoclaw/issues/1796) formalizes remaining work |
| **Capability discovery endpoint** | 🟡 Medium | [#1474](https://github.com/sipeed/picoclaw/issues/1474) — needed for orchestration; aligns with refactor goals |
| **Authula integration** | 🟡 Medium | [#1067](https://github.com/sipeed/picoclaw/issues/1067) — security hardening; no PR yet |
| **ElevenLabs Scribe STT** | ✅ High | [#1905](https://github.com/sipeed/picoclaw/pull/1905) open, complete implementation |
| **WeChat native support** | ✅ High | [#1904](https://github.com/sipeed/picoclaw/pull/1904) open, QR login + polling implemented |
| **AWS Bedrock provider** | ✅ High | [#1903](https://github.com/sipeed/picoclaw/pull/1903) open, behind build tag |
| **ARM32 pre-built launcher** | 🟡 Medium | [#1778](https://github.com/sipeed/picoclaw/issues/1778) — infrastructure request |
| **Mixed Markdown+HTML rendering** | 🟡 Medium | [#1897](https://github.com/sipeed/picoclaw/issues/1897) + [#1900](https://github.com/sipeed/picoclaw/pull/1900) open |

**Breaking change proposal:** [#1883](https://github.com/sipeed/picoclaw/issues/1883) explicit `provider/protocol` field to resolve model name ambiguity — would affect all configurations.

---

## 7. User Feedback Summary

### Pain Points

| Issue | Frequency | User Impact |
|-------|-----------|-------------|
| Provider configuration complexity | High | "Unintuitive" vendor parsing, multiple auth failures |
| Missing/undocumented HTTP API | Medium | Cannot integrate with external systems |
| Channel reliability (Feishu, DingTalk, QQ) | Medium | Silent failures, message formatting issues |
| Gateway mode limitations | Medium | Expected REST endpoints unavailable |
| Context window management | Low (fixed) | Previously aggressive trimming |

### Positive Signals

- **Multimodal transcription** expansion welcomed
- **Agent observability** improvements validated as critical
- **WeChat integration** fills major regional gap

### Deployment Patterns
- Docker Compose with Gateway profile (common)
- ARM/embedded targets (growing)
- Multi-provider failover configurations (emerging)

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|------|-----|------|---------------|
| [#1216](https://github.com/sipeed/picoclaw/issues/1216) Agent refactor meta | 15 days | Low (Phase 1 done) | Update roadmap, define Phase 2 |
| [#1067](https://github.com/sipeed/picoclaw/issues/1067) Authula integration | 18 days | Medium | Security priority; needs maintainer response |
| [#748](https://github.com/sipeed/picoclaw/issues/748) Groq compatibility | 25 days | **High** | Blocking popular provider; no assignee |
| [#1502](https://github.com/sipeed/picoclaw/issues/1502) Mistral integration | 9 days | Medium | Provider diversity |
| [#1175](https://github.com/sipeed/picoclaw/pull/1175) Feishu table splitting | 17 days | Low | Review pending |

**Maintainer attention recommended:** Groq compatibility (#748) is the longest-running unassigned high-impact issue.

---

*Digest generated from GitHub activity 2026-03-22 to 2026-03-23*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-03-23

## 1. Today's Overview

NanoClaw shows **high development velocity** with 44 PRs and 5 issues updated in the last 24 hours, though no new releases were cut. The project is actively expanding its AI backend ecosystem (GitHub Copilot SDK integration in flight) and hardening infrastructure with trust/autonomy frameworks and pre-execution hooks. Community contributions remain strong with multiple new channel integrations (AstrBot, Matrix, CLI backend) and operational skills. The 73% open PR rate (32/44) suggests a potential review bottleneck, while automated skill maintenance failures indicate ongoing technical debt in branch management.

---

## 2. Releases

**No new releases** — version unchanged.

---

## 3. Project Progress

### Merged/Closed Today

| PR | Description | Significance |
|:---|:---|:---|
| [#1298](https://github.com/qwibitai/nanoclaw/pull/1298) | Web channel, dashboard, and multi-tenant support | **Major infrastructure** — enables SaaS-style deployments |
| [#1308](https://github.com/qwibitai/nanoclaw/pull/1308) | Phase 3a: Trust & Autonomy Framework | **Core security** — approval tracking + draft routing for sensitive operations |
| [#1334](https://github.com/qwibitai/nanoclaw/issues/1334) | Phase 2: Agent-to-agent direct communication (peer IPC) | **Architecture evolution** — reduces orchestrator bottleneck |
| [#1335](https://github.com/qwibitai/nanoclaw/pull/1335) | Fix duplicate messages from scheduled tasks and group agents | **Stability** — eliminates noisy double-posting bug |
| [#1280](https://github.com/qwibitai/nanoclaw/pull/1280) | Opt-in diagnostics via PostHog | **Observability** — privacy-respecting telemetry foundation |
| [#808](https://github.com/qwibitai/nanoclaw/pull/808) | Fix mount allowlist format in SKILL.md | **Docs/UX** — prevents silent mount failures |
| [#1342](https://github.com/qwibitai/nanoclaw/pull/1342) | Initialize NanoClaw personal assistant setup | **Onboarding** — Telegram-first quick-start |

**Key Advances:**
- **Multi-tenancy + web dashboard** positions NanoClaw for team/enterprise use
- **Trust framework** establishes audit trail for agent autonomy decisions
- **Peer IPC** (Phase 2) completed — enables scalable agent mesh topologies

---

## 4. Community Hot Topics

| Item | Activity | Analysis |
|:---|:---|:---|
| [#1098](https://github.com/qwibitai/nanoclaw/pull/1098) | Most commented PR (undefined comments, but listed first) | **Temporal awareness fix** — agents need weekday context for scheduling; indicates real-world usage friction |
| [#682](https://github.com/qwibitai/nanoclaw/pull/682) | Long-running Slack improvements | **Production hardening** — thread routing + ARM64/Raspberry Pi deployment experience |
| [#1351](https://github.com/qwibitai/nanoclaw/pull/1351) / [#1350](https://github.com/qwibitai/nanoclaw/issues/1350) | Copilot SDK backend | **Vendor diversification** — reduces Anthropic lock-in, addresses TOS concerns (#1224) |
| [#1347](https://github.com/qwibitai/nanoclaw/issues/1347) | Attribution dispute | **Governance risk** — claims of missing citations to Yang Yuan/Topos Technology works |

**Underlying Needs:**
- **Multi-backend AI resilience** (Claude + Copilot + CLI)
- **Edge deployment** (ARM64, low-resource environments)
- **Legal/IP hygiene** in open-source attribution

---

## 5. Bugs & Stability

| Severity | Item | Status | Fix Available |
|:---|:---|:---|:---|
| **Medium** | [#1345](https://github.com/qwibitai/nanoclaw/issues/1345) — Merge-forward failed for 2 skill branches | **Active** | Manual resolution required; automation gap |
| **Low-Medium** | [#1098](https://github.com/qwibitai/nanoclaw/pull/1098) — Missing weekday in timestamps | **PR open** | Fix under review |
| **Low** | [#808](https://github.com/qwibitai/nanoclaw/pull/808) — Mount allowlist format mismatch | **Closed** | Merged |
| **Low** | [#1335](https://github.com/qwibitai/nanoclaw/pull/1335) — Duplicate messages from scheduled tasks | **Closed** | Merged |

**Systemic Concern:** Automated skill branch maintenance (#1345) is failing silently, creating divergence between `main` and feature branches (`skill/apple-container`, `skill/compact`).

---

## 6. Feature Requests & Roadmap Signals

| Feature | Request | Likelihood in Next Release |
|:---|:---|:---|
| **GitHub Copilot SDK backend** | [#1350](https://github.com/qwibitai/nanoclaw/issues/1350) / [#1351](https://github.com/qwibitai/nanoclaw/pull/1351) | **High** — PR open, addresses #1224 TOS issue |
| **Pre-run hooks for scheduled tasks** | [#1348](https://github.com/qwibitai/nanoclaw/issues/1348) / [#1349](https://github.com/qwibitai/nanoclaw/pull/1349) | **High** — PR ready, ops-critical |
| **CLI backend (`claude -p`)** | [#1343](https://github.com/qwibitai/nanoclaw/pull/1343) | **Medium-High** — legal compliance driver |
| **Matrix protocol support** | [#791](https://github.com/qwibitai/nanoclaw/pull/791) | **Medium** — needs review, decentralized chat demand |
| **AstrBot integration** | [#1339](https://github.com/qwibitai/nanoclaw/pull/1339) | **Medium** — China-market bridge |
| **API usage tracking** | [#1111](https://github.com/qwibitai/nanoclaw/pull/1111) | **Medium** — cost management for teams |
| **Write-protected system prompts** | [#1341](https://github.com/qwibitai/nanoclaw/pull/1341) | **Medium** — governance/control use case |
| **macOS control installer** | [#1304](https://github.com/qwibitai/nanoclaw/pull/1304) | **Low-Medium** — platform expansion |

**Predicted vNext themes:** Multi-backend AI, operational hardening (hooks, tracking), platform expansion (Matrix, AstrBot, macOS).

---

## 7. User Feedback Summary

### Pain Points
| Issue | Evidence | User Impact |
|:---|:---|:---|
| **Anthropic TOS restrictions** | [#1343](https://github.com/qwibitai/nanoclaw/pull/1343), [#1224](https://github.com/qwibitai/nanoclaw/issues/1224) | Subscription OAuth tokens unusable with Agent SDK; forces CLI workaround |
| **Silent configuration failures** | [#808](https://github.com/qwibitai/nanoclaw/pull/808) | Mount allowlist format mismatch causes silent failures |
| **Duplicate noise** | [#1335](https://github.com/qwibitai/nanoclaw/pull/1335) | Scheduled tasks spam channels with double messages |
| **Branch maintenance toil** | [#1345](https://github.com/qwibitai/nanoclaw/issues/1345) | Skill authors must manually resolve merge conflicts |

### Positive Signals
- **Edge deployment success**: PR #682 details real-world Raspberry Pi 5 setup
- **Trust framework adoption**: Phase 3a merged — users want auditable agent autonomy
- **Telemetry consent**: Opt-in PostHog integration (#1280) shows privacy-conscious design

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#791](https://github.com/qwibitai/nanoclaw/pull/791) Matrix support | 15 days | **Medium** — decentralized chat gap | Maintainer review; community demand for Matrix/Element |
| [#1111](https://github.com/qwibitai/nanoclaw/pull/1111) API usage tracking | 8 days | **Low-Medium** — cost control for teams | Review; complements new multi-tenant features |
| [#682](https://github.com/qwibitai/nanoclaw/pull/682) Slack thread routing | 19 days | **Medium** — production Slack UX | Review; blocks clean Slack deployments |
| [#1347](https://github.com/qwibitai/nanoclaw/issues/1347) Attribution claims | 1 day | **High** — legal/IP risk | Maintainer response required; potential DMCA or license compliance issue |

**Immediate Attention:** The attribution issue (#1347) requires prompt maintainer response to assess validity and mitigate project risk.

---

*Digest generated from 44 PRs and 5 issues updated 2026-03-22. Data source: qwibitai/nanoclaw*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-03-23

## 1. Today's Overview

NullClaw shows **healthy development velocity** with 21 tracked items updated in the last 24 hours (8 issues, 13 PRs). The project is actively addressing infrastructure stability (cron system, Docker deployment, gateway configuration) while pushing forward on multi-modal AI capabilities (A2A protocol, adaptive intelligence). Notably, **3 PRs were merged/closed**, indicating steady maintainer throughput. The community is particularly engaged around OpenTelemetry enhancements and provider ecosystem expansion (Qwen, Ollama, vLLM). No new releases were cut, suggesting the project is in a consolidation phase before the next versioned drop.

---

## 2. Releases

**No new releases** — latest remains prior to 2026-03-17.

---

## 3. Project Progress

### Merged/Closed PRs (3 items)

| PR | Description | Impact |
|:---|:---|:---|
| [#615](https://github.com/nullclaw/nullclaw/pull/615) | Ollama cloud API key with Bearer auth | **Provider ecosystem** — enables authenticated cloud-hosted Ollama instances while preserving local keyless usage |
| [#589](https://github.com/nullclaw/nullclaw/pull/589) | Avoid `statx`-dependent `makePath` for Linux < 4.11 | **Compatibility** — fixes directory creation failures on older kernels, addressing regression from #462/#448 |
| [#672](https://github.com/nullclaw/nullclaw/pull/672) | Clarify public-bind guidance for browser UI | **UX/Docs** — closes #671; adds bilingual (EN/CN) configuration docs for `channels.web` security |

### Active Development Themes
- **Cron system hardening**: PR #689 addresses race conditions, memory leaks, and mutex lifetime issues in the scheduler
- **Docker/containerization**: PR #692 fixes `NULLCLAW_HOME` respect in cron commands
- **Multi-modal A2A**: PR #686 adds image support through agent card capabilities and `inlineData` forwarding

---

## 4. Community Hot Topics

| Item | Activity | Analysis |
|:---|:---|:---|
| [#690 OTEL Enhancements](https://github.com/nullclaw/nullclaw/issues/690) | 2 comments, open | **High strategic value** — post-implementation refinement of OpenTelemetry support (v2026.3.17-3.21). Focus on channel attribution telemetry. Signals enterprise/observability user base. |
| [#647 Qwen Code CLI support](https://github.com/nullclaw/nullclaw/issues/647) | 2 comments, open | **Cost-sensitive users** — motivated by "generous free token amount." Indicates demand for budget-friendly provider alternatives to OpenAI/Anthropic. |
| [#671 chat-ui frustration](https://github.com/nullclaw/nullclaw/issues/671) → closed via #672 | 1 comment, resolved | **Onboarding friction** — user on constrained hardware (portable hotspot/Quark SoC) struggled with authentication flow. Rapid fix shows responsive maintainer team. |

**Underlying needs**: Better observability for production deployments, cost optimization, and clearer documentation for edge deployment scenarios.

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix Available |
|:---|:---|:---|:---|
| 🔴 **High** | [#691](https://github.com/nullclaw/nullclaw/issues/691) `cron.zig` ignores `NULLCLAW_HOME`, Docker `AccessDenied` | Open | ✅ [PR #692](https://github.com/nullclaw/nullclaw/pull/692) ready |
| 🔴 **High** | [#684](https://github.com/nullclaw/nullclaw/issues/684) Race: `file_write` then `file_read` on new file returns "not exist" | Open | ❌ No PR yet |
| 🟡 **Medium** | [#682](https://github.com/nullclaw/nullclaw/issues/682) Bifrost gateway compatibility (HTTP+port parsing) | Open | ❌ No PR yet |
| 🟡 **Medium** | [#680](https://github.com/nullclaw/nullclaw/issues/680) Telegram channel duplicate/incorrect answer display | Open | ❌ No PR yet |

**Stability assessment**: The cron/Docker issue (#691) is deployment-blocking for containerized users—PR #692 should be prioritized for merge. The file I/O race (#684) suggests potential filesystem state management flaws in agent tool execution.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue/PR | Likelihood in Next Release |
|:---|:---|:---|
| **OTEL channel attribution** | #690 | High — builds on recent OTEL work, active maintainer engagement |
| **Qwen Code CLI provider** | #647 | Medium — provider additions are common, but requires evaluation |
| **Model fallbacks configuration** | #683 | Medium — infrastructure feature, unclear complexity |
| **Adaptive intelligence pipeline** | PR #527 | High — substantial feature in active PR since 2026-03-14 |
| **Email/WhatsApp Web channels** | PR #527 | Medium — bundled with adaptive pipeline, may ship together |
| **Configurable gateway limits** | PR #687 | High — simple config addition, addresses multi-modal needs |

**Prediction**: Next release likely includes OTEL enhancements (#690), adaptive intelligence (#527), and gateway configurability (#687).

---

## 7. User Feedback Summary

### Pain Points
- **Deployment complexity**: Docker users hit permission issues (#691); edge device users struggle with auth (#671)
- **Provider fragmentation**: Users want more options (Qwen #647, Bifrost #682, custom vLLM #669)
- **File system reliability**: Race conditions in agent file operations (#684)

### Positive Signals
- Rapid response to #671 (closed within 24h)
- Active multi-modal investment (PR #686, #687)
- Strong internationalization (Chinese/English docs in #672)

### Use Case Evolution
- **Enterprise**: OTEL, A2A protocol, configurable gateways
- **Cost-conscious**: Free tier provider hunting (Qwen)
- **Self-hosted**: Docker, Bifrost gateway, local model support

---

## 8. Backlog Watch

| Item | Age | Risk | Needs |
|:---|:---|:---|:---|
| PR #527 Adaptive intelligence + channels | 9 days | **Staleness** — large PR, may need rebase | Maintainer review, possible split into smaller PRs |
| PR #669 vLLM/Qwen reasoning | 2 days | Moderate | Review for provider pattern consistency |
| Issue #683 Fallback models config | 1 day | Low | Clarification on desired API vs. OpenClaw parity |

**Recommendation**: PR #527 is the highest-risk item—its scope (adaptive intelligence + email + WhatsApp) may benefit from decomposition to accelerate review.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-03-23

## 1. Today's Overview

IronClaw shows **high development velocity** with 46 PRs updated in the last 24 hours (31 open, 15 merged/closed) and 12 active issues. The project is in an intensive **stabilization and expansion phase**, with core contributors focusing on production reliability (MCP protocol compliance, test infrastructure hardening) alongside major architectural initiatives (unified execution engine v2, adaptive learning system). No new releases were cut, suggesting the team is accumulating changes for a significant version bump. The contributor mix remains healthy with both core team and community PRs in flight.

---

## 2. Releases

**No new releases** — version remains at v0.21.0 (per issue #1510 reference).

---

## 3. Project Progress

### Merged/Closed PRs (15 total, key highlights)

| PR | Description | Significance |
|:---|:---|:---|
| [#1397](https://github.com/nearai/ironclaw/pull/1397) | Parameter coercion for oneOf/anyOf/allOf schemas | **Critical for WASM tool ecosystem** — fixes LLM parameter passing to complex schema extensions |
| [#1539](https://github.com/nearai/ironclaw/pull/1539) | MCP HTTP 202 Accepted handling | Unblocks Kubernetes MCP server integration |
| [#1558](https://github.com/nearai/ironclaw/pull/1558) | Eliminate env mutex poison cascade | **Test infrastructure reliability** — 68 tests no longer fail cascade on single panic |
| [#931](https://github.com/nearai/ironclaw/pull/931) | gws_bridge fallback for blocked Google OAuth | Addresses #902, provides safety-first escape hatch |
| [#1557](https://github.com/nearai/ironclaw/pull/1557) | **Unified Thread-Capability-CodeAct execution engine v2** | **Major architecture initiative** — 7,275 lines, replaces ~10 fragmented abstractions |

### Architectural Shifts
- **Execution engine v2** (`ironclaw_engine` crate) represents a foundational rewrite that could position IronClaw for multi-agent orchestration at scale
- **MCP protocol compliance** improvements signal enterprise/standardization focus

---

## 4. Community Hot Topics

### Most Active by Engagement

| Item | Activity | Core Tension |
|:---|:---|:---|
| [#902](https://github.com/nearai/ironclaw/issues/902) — Google OAuth blocked | 4 comments, 0 👍 | **Enterprise adoption blocker**: Google's security policies vs. WASM-based OAuth flow |
| [#826](https://github.com/nearai/ironclaw/issues/826) — Unbounded message Vec growth | 3 comments, CLOSED | Memory safety in long-running agent loops (staging CI caught) |
| [#259](https://github.com/nearai/ironclaw/issues/259) — Debounce rapid messages | 2 comments, 1 👍, CLOSED | UX quality: chatty users vs. premature agent activation |

### Underlying Needs Analysis
- **#902 pattern**: Users need **reliable Google Workspace integration** — the gws_bridge fallback (#931, #1569) shows the team recognizes this as existential for productivity use cases
- **Memory/performance**: Staging CI's automated HIGH/MEDIUM findings (#826, #894) indicate investment in **preventive reliability engineering**

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR |
|:---|:---|:---|:---|
| **HIGH** | [#826](https://github.com/nearai/ironclaw/issues/826) — Unbounded message growth in tool loops | ✅ **CLOSED** | #820 (merged) |
| **HIGH** | [#1558](https://github.com/nearai/ironclaw/pull/1558) — Test mutex poison cascade | ✅ **MERGED** | Self-contained |
| **HIGH** | [#1568](https://github.com/nearai/ironclaw/pull/1568) — AWS Bedrock embeddings (new feature risk) | 🔄 **OPEN** | In review |
| **MEDIUM** | [#1510](https://github.com/nearai/ironclaw/issues/1510) — Gemini missing thought_signature | 🔄 **OPEN** | [#1565](https://github.com/nearai/ironclaw/pull/1565) **OPEN** |
| **MEDIUM** | [#1537](https://github.com/nearai/ironclaw/issues/1537) — WASM credential injection fails on NEAR AI hosted TEE | 🔄 **OPEN** | None identified |
| **MEDIUM** | [#894](https://github.com/nearai/ironclaw/issues/894) — String allocation in truncate_for_preview | ✅ **CLOSED** | #889 (merged) |

### Critical Stability Gap
- **[#1537](https://github.com/nearai/ironclaw/issues/1537)** — TEE-hosted credential injection failure is **production-blocking for NEAR AI Cloud users** with no visible fix PR. Secrets store succeeds but runtime injection silently fails.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Signal Strength | Evidence | Likelihood in Next Release |
|:---|:---|:---|:---|
| **GWS bridge / Google OAuth alternatives** | ⭐⭐⭐⭐⭐ | #902, #931, #1569, #1573 | **High** — multiple PRs converging |
| **AWS Bedrock embeddings** | ⭐⭐⭐⭐⭐ | #1568, #1501 | **High** — complete implementation in review |
| **Tiered workspace context summaries** | ⭐⭐⭐⭐☆ | #1566, #1473 | **Medium-High** — first slice implemented |
| **ClawHub opt-out (enterprise air-gap)** | ⭐⭐⭐⭐☆ | #1570 | **Medium** — simple env flag, ready |
| **Adaptive learning / skill synthesis** | ⭐⭐⭐☆☆ | #1187 | **Medium** — XL PR, needs bake time |
| **Unified execution engine v2** | ⭐⭐⭐☆☆ | #1557 | **Low-Medium** — parallel development, bridge adapters needed |
| **Shell tool risk levels** | ⭐⭐⭐☆☆ | #172, CLOSED | **Implemented** |

### Predicted v0.22.0 Contents
- Google OAuth resilience (gws_bridge)
- AWS Bedrock provider parity
- MCP Streamable HTTP full compliance
- Gemini 3.x compatibility fixes

---

## 7. User Feedback Summary

### Pain Points (Real Users)

| Source | Issue | Emotional Tone |
|:---|:---|:---|
| G7CNF in #902 | "This app is blocked" — Google OAuth dead end | **Frustrated, blocked** |
| loopwright in #1537 | "Secrets stored but never injected" — silent TEE failure | **Confused, production-impacted** |
| nthomsencph in #1510 | Gemini 400 errors on tool calls | **Integration friction** |
| smkrv in #1208 | Image-only messages rejected | **UX polish gap** |

### Positive Signals
- **#259 debounce**: "producing a partial or irrelevant response" — user validates fix value
- **#172 shell risk levels**: Graduated approval addresses power-user trust concerns

### Use Case Tensions
- **Self-hosters vs. NEAR AI Cloud**: TEE-specific bugs (#1537) suggest hosting environment fragmentation
- **Enterprise vs. Individual**: #1570 (ClawHub disable), #902 (Google workspace) show enterprise hardening needs

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#1537](https://github.com/nearai/ironclaw/issues/1537) — TEE credential injection | 2 days | **Production-critical** | Maintainer assignment, TEE environment access |
| [#1187](https://github.com/nearai/ironclaw/pull/1187) — Adaptive learning system | 8 days | **Architecture drift** | Decision: merge to feature branch or request reduction |
| [#1437](https://github.com/nearai/ironclaw/pull/1437) — MCP session manager | 4 days | **Protocol compliance** | Review overlap with #1539 (partial fix merged) |
| [#1208](https://github.com/nearai/ironclaw/pull/1208) — Image-only messages | 7 days | **UX regression** | Safety layer review, merge decision |

### Maintainer Attention Required
- **TEE credential injection (#1537)** is the highest-risk open issue with no assignee visible
- **XL PR backlog**: #1187, #1557, #1525, #1566 all >1,000 lines — risk of merge conflicts and review fatigue

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-03-23

## 1. Today's Overview

LobsterAI shows **exceptionally high development velocity** with 28 active issues and 26 PRs updated in the last 24 hours, including one new release (2026.3.22). The project is experiencing a **quality-focused sprint**: a single contributor (@pylstark) filed 15 code quality and security issues in one day, ranging from XSS risks to memory leaks, indicating active code review or audit activity. Meanwhile, feature development continues aggressively with 6 new feature PRs including MiniMax OAuth, multi-agent orchestration, and cross-platform shortcuts. The 18:8 open-to-merged PR ratio suggests healthy throughput but also a growing review backlog.

---

## 2. Releases

### [2026.3.22](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.3.22) — Patch Release

| Aspect | Details |
|--------|---------|
| **Type** | Bug fix release |
| **Changes** | • Fixed OpenClaw gateway PATH injection for node shims ([#638](https://github.com/netease-youdao/LobsterAI/pull/638))<br>• Fixed WeChat QR login gateway restart flow and adjusted settings UI guide ([#652](https://github.com/netease-youdao/LobsterAI/pull/652)) |
| **Breaking Changes** | None |
| **Migration Notes** | Users experiencing WeChat login issues or OpenClaw gateway startup failures should upgrade |

---

## 3. Project Progress

### Merged/Closed PRs (8 total)

| PR | Author | Summary | Significance |
|:---|:---|:---|:---|
| [#657](https://github.com/netease-youdao/LobsterAI/pull/657) | @winsan-zhang | Fix: Use non-empty placeholder for env var fallbacks in OpenClaw | Prevents `MissingEnvVarError` during gateway hot-reload |
| [#655](https://github.com/netease-youdao/LobsterAI/pull/655) | @liuzhq1986 | WeChat IM integration | Major platform expansion (closed, likely superseded) |
| [#654](https://github.com/netease-youdao/LobsterAI/pull/654) | @wuleihenbang | Style: WeChat settings layout adjustment | UI polish |
| [#653](https://github.com/netease-youdao/LobsterAI/pull/653) | @wuleihenbang | Feat: WeChat QR login bypasses Gateway, direct ilink API call | **Critical reliability fix** — removes engine dependency for login |
| [#652](https://github.com/netease-youdao/LobsterAI/pull/652) | @winsan-zhang | Fix: Restart gateway after WeChat QR login | Ensures token pickup, included in release |
| [#638](https://github.com/netease-youdao/LobsterAI/pull/638) | @winsan-zhang | Fix: Inject node shims into gateway PATH | Fixes OpenClaw startup, included in release |
| [#514](https://github.com/netease-youdao/LobsterAI/pull/514) | @Angus2333 | Docs: Add NetEase Cloud Messaging official link | Documentation |

**Key Advancement**: WeChat integration matured significantly with direct API calls eliminating a critical failure mode (engine-dependent login).

---

## 4. Community Hot Topics

### Most Active by Engagement

| Item | Activity | Analysis |
|:---|:---|:---|
| [#640](https://github.com/netease-youdao/LobsterAI/issues/640) | 2 👍, created 2026-03-22 | **"Branch 0.2.4 for stabilization"** — Community perceives post-0.2.4 releases as unstable; requests LTS branch |
| [#402](https://github.com/netease-youdao/LobsterAI/issues/402) | 2 comments | Sandbox startup failure on ESXi/Debian — infrastructure compatibility gap |
| [#496](https://github.com/netease-youdao/LobsterAI/issues/496) | 2 comments | Sandbox feature missing in 3.17 — feature regression concern |

### High-Impact New PRs

| PR | Significance |
|:---|:---|
| [#680](https://github.com/netease-youdao/LobsterAI/pull/680) | **Multi-agent orchestration with observability** — Major architectural enhancement; moves from "black box" to transparent subtask tracking |
| [#682](https://github.com/netease-youdao/LobsterAI/pull/682) | MiniMax OAuth — Zero-config auth, 10-second onboarding |
| [#644](https://github.com/netease-youdao/LobsterAI/pull/644) | Qwen OAuth — Same pattern, competitor coverage |

**Underlying Need**: Users want **frictionless setup** (OAuth > API keys) and **visibility into AI reasoning** (multi-agent observability).

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix PR? |
|:---|:---|:---|:---|
| 🔴 **Critical** | [#665](https://github.com/netease-youdao/LobsterAI/issues/665) | **XSS: HTML Artifacts sandbox escape risk** — `allow-scripts` without proper CSP | ❌ No |
| 🔴 **Critical** | [#639](https://github.com/netease-youdao/LobsterAI/issues/639) | **Data loss**: Corrupted metadata JSON crashes entire session | ✅ [#681](https://github.com/netease-youdao/LobsterAI/pull/681) |
| 🟡 **High** | [#656](https://github.com/netease-youdao/LobsterAI/pull/656) | macOS freeze during in-app update (system UI unresponsive) | ✅ In PR |
| 🟡 **High** | [#646](https://github.com/netease-youdao/LobsterAI/issues/646) | Stop button non-functional — continues generating | ❌ No |
| 🟡 **High** | [#645](https://github.com/netease-youdao/LobsterAI/issues/645) | UI severe lag with long chat history — needs virtualization | ❌ No |
| 🟡 **High** | [#637](https://github.com/netease-youdao/LobsterAI/issues/637) | Feishu @mention broken in allowlist mode (v2026.3.21 regression) | ❌ No |
| 🟢 **Medium** | [#660](https://github.com/netease-youdao/LobsterAI/issues/660)–[#678](https://github.com/netease-youdao/LobsterAI/issues/678) | 15 code quality issues (memory leaks, race conditions, i18n gaps) | ❌ No |

**Stability Assessment**: Concerning pattern of **regressions in recent releases** (Feishu breakage, sandbox removal, performance degradation). The @pylstark audit reveals systemic code quality debt.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Request/Source | Likelihood in Next Version |
|:---|:---|:---|
| **OAuth-first onboarding** | MiniMax ([#682](https://github.com/netease-youdao/LobsterAI/pull/682)), Qwen ([#644](https://github.com/netease-youdao/LobsterAI/pull/644)) | **High** — Pattern established, more providers likely |
| **Chat history virtualization** | [#645](https://github.com/netease-youdao/LobsterAI/issues/645) | **Medium** — Performance-critical, community-requested |
| **Session export (Markdown)** | [#651](https://github.com/netease-youdao/LobsterAI/pull/651) | **High** — PR exists, ready for merge |
| **Cross-platform shortcuts** | [#679](https://github.com/netease-youdao/LobsterAI/pull/679) | **High** — PR exists, macOS-focused |
| **Shell command shortcuts (`!cmd`)** | [#658](https://github.com/netease-youdao/LobsterAI/pull/658) | **Medium** — Developer productivity feature |
| **Multi-agent observability** | [#680](https://github.com/netease-youdao/LobsterAI/pull/680) | **High** — Major differentiator, PR ready |
| **Stabilization branch/LTS** | [#640](https://github.com/netease-youdao/LobsterAI/issues/640) | **Low** — Process request, not feature |

---

## 7. User Feedback Summary

### Pain Points
| Issue | Frequency | User Impact |
|:---|:---|:---|
| **Stability regressions** | Repeated | "0.2.4版本后bug过多" — trust erosion in rapid release cycle |
| **Performance at scale** | Multiple reports | Chat history lag ([#645](https://github.com/netease-youdao/LobsterAI/issues/645)), session loading failures ([#639](https://github.com/netease-youdao/LobsterAI/issues/639)) |
| **Sandbox reliability** | 2+ issues | Startup failures ([#402](https://github.com/netease-youdao/LobsterAI/issues/402)), feature disappearance ([#496](https://github.com/netease-youdao/LobsterAI/issues/496)) |
| **IM integration fragility** | Active | Feishu regression ([#637](https://github.com/netease-youdao/LobsterAI/issues/637)), WeChat login complexity (now addressed) |

### Positive Signals
- **OAuth onboarding** praised as "十秒内发起对话" (start conversation in 10 seconds)
- **Multi-agent transparency** in [#680](https://github.com/netease-youdao/LobsterAI/pull/680) addresses power user needs
- Active community contribution (15 quality issues filed in one day)

### Use Case Evolution
Users are pushing LobsterAI from **personal assistant** → **team collaboration platform** (cowork sessions, multi-agent, IM integrations), exposing scalability and reliability gaps.

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#402](https://github.com/netease-youdao/LobsterAI/issues/402) Sandbox startup failure | 9 days | **High** — Blocks ESXi/VM users | Needs repro environment, infrastructure guidance |
| [#532](https://github.com/netease-youdao/LobsterAI/pull/532) I18n global fix | 4 days | Medium — 413 console calls, hardcoded strings | Review stalled, conflicts likely |
| [#640](https://github.com/netease-youdao/LobsterAI/issues/640) Stabilization branch request | 1 day | **Process-critical** | Maintainer response needed on release strategy |
| [#665](https://github.com/netease-youdao/LobsterAI/issues/665) XSS vulnerability | 1 day | **Security-critical** | Immediate security review, CSP implementation |
| 15 @pylstark quality issues | 1 day | Medium — Technical debt | Batch triage, assign to sprints |

**Recommendation**: Project would benefit from a **quality/stability sprint** before further feature expansion, per community sentiment in [#640](https://github.com/netease-youdao/LobsterAI/issues/640).

---

*Digest generated from 28 issues, 26 PRs, 1 release on 2026-03-23*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

# TinyClaw Project Digest — 2026-03-23

## 1. Today's Overview

TinyClaw shows **moderate development velocity** with 3 PRs active in the past 24 hours and 1 successful merge. The project demonstrates healthy maintenance activity focused on infrastructure reliability and provider expansion. No new releases were cut today, and the issue tracker remains clean with zero open items—suggesting either effective triage or low community bug reporting volume. The PR mix indicates priorities: fixing core message routing bugs, modernizing Telegram integration, and expanding LLM provider options. Overall project health appears **stable with active refinement**.

---

## 2. Releases

**No new releases** for 2026-03-23.

Latest release remains unlisted in provided data. Monitor [TinyAGI/tinyagi/releases](https://github.com/TinyAGI/tinyagi/releases) for version history.

---

## 3. Project Progress

### Merged/Closed Today

| PR | Author | Summary | Impact |
|:---|:---|:---|:---|
| [#247](https://github.com/TinyAGI/tinyagi/pull/247) | @jlia0 | **fix(api): resolve agent routing at enqueue time** | **Critical reliability fix** — resolved queue serialization bug where parallel processing broke message ordering; ensures channel/scheduled messages route to correct agent chains instead of defaulting |

**Technical debt reduced**: The merged fix addresses a fundamental async architecture issue where "messages from Telegram/Discord/API without an explicit agent field were going into the 'default' chain while heartbeats and internal routing went into their target chains." This likely resolved user-reported intermittent routing failures.

---

## 4. Community Hot Topics

| PR | Status | Engagement | Analysis |
|:---|:---|:---|:---|
| [#243](https://github.com/TinyAGI/tinyagi/pull/243) feat: add Novita AI as a built-in LLM provider | **OPEN** | 0 reactions, 2 days old | **Provider diversity demand** — Community contributor @Alex-wuhu expanding LLM options beyond Anthropic/OpenAI/OpenCode. Novita AI's OpenAI-compatible API lowers integration friction. Signals user need for cost-effective or region-accessible alternatives |
| [#248](https://github.com/TinyAGI/tinyagi/pull/248) refactor(telegram): migrate to grammY for reliable polling | **OPEN** | 0 reactions, 1 day old | **Reliability engineering priority** — @jlia0 addressing production pain point: "silent polling stalls" in `node-telegram-bot-api`. Built-in reconnection/backoff suggests operational maturity focus |

**Underlying needs detected**:
- **Multi-LLM flexibility**: Users want provider portability without vendor lock-in
- **Production-grade reliability**: Telegram as critical channel requires 99.9%+ uptime guarantees

---

## 5. Bugs & Stability

| Severity | Item | Status | Details |
|:---|:---|:---|:---|
| 🔴 **High** (Fixed) | Queue serialization bug — parallel vs. sequential processing | **RESOLVED** in [#247](https://github.com/TinyAGI/tinyagi/pull/247) | Caused misrouted messages to default chain; could break agent context continuity |
| 🟡 **Medium** (Mitigation in progress) | Telegram polling stalls — "bot stays alive but stops receiving messages" | **PR OPEN** [#248](https://github.com/TinyAGI/tinyagi/pull/248) | Known `node-telegram-bot-api` limitation; migration to grammY provides systematic fix |

**No new regressions reported today.** Zero open issues indicates either:
- Effective pre-merge testing
- Limited production deployment feedback
- Underreporting (monitor community channels)

---

## 6. Feature Requests & Roadmap Signals

| Signal | Source | Likelihood in Next Release |
|:---|:---|:---|
| **Novita AI provider support** | Active PR [#243](https://github.com/TinyAGI/tinyagi/pull/243) | **High** — Low-risk addition reusing existing harness; 2-day review window suggests maintainer evaluation pending |
| **grammY Telegram modernization** | Active PR [#248](https://github.com/TinyAGI/tinyagi/pull/248) | **High** — Reliability fixes typically fast-tracked; addresses known production issue |
| **Additional provider expansions** | Pattern in #243 | **Medium** — OpenAI-compatible API reuse strategy suggests future providers (Groq, Together, etc.) will follow similar low-friction path |

**Architectural trend**: Codex harness abstraction enabling rapid provider additions without CLI bloat.

---

## 7. User Feedback Summary

| Pain Point | Evidence | Satisfaction Indicator |
|:---|:---|:---|
| **Silent Telegram failures** | PR #248 description: "bot stays alive but stops receiving messages" | 😠 **Dissatisfaction** — Silent failures are worst-case operational scenario |
| **Message routing unpredictability** | PR #247 fix scope | 😠 **Dissatisfaction** — Context/agent misrouting breaks conversational continuity |
| **Desire for alternative LLM providers** | Community PR #243 contribution | 😐 **Neutral/Opportunity** — Proactive expansion suggests anticipating cost/performance needs |

**No explicit positive feedback captured** in today's data. Recommend maintainer outreach for user testimonials or case studies.

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#243](https://github.com/TinyAGI/tinyagi/pull/243) Novita AI provider | 3 days | Low — self-contained, no conflicts | Maintainer review for merge; consider documentation update for provider list |
| [#248](https://github.com/TinyAGI/tinyagi/pull/248) grammY migration | 1 day | Low — reliability improvement | Priority review given production impact; test polling resilience under network partition |

**No stale issues requiring attention** — issue tracker at zero is atypical; verify:
- Issue templates are discoverable
- Community Discord/forum isn't diverting bug reports away from GitHub

---

**Digest compiled from:** [TinyAGI/tinyagi](https://github.com/TinyAGI/tinyagi) | Generated: 2026-03-23

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-03-23

## 1. Today's Overview

Moltis shows minimal activity over the past 24 hours with **2 issues updated** (1 closed, 1 open) and **1 open PR** with no merges. The project appears to be in a maintenance phase with no new releases. The single merged/closed item (#137) addresses local-first memory configuration, suggesting ongoing refinement of self-hosting capabilities. Community engagement remains low with zero reactions across active items. No critical stability concerns emerged today.

---

## 2. Releases

**No new releases.**

---

## 3. Project Progress

| Item | Status | Summary |
|------|--------|---------|
| [#137](https://github.com/moltis-org/moltis/issues/137) | **CLOSED** | Memory module enhancement for `base_url` support and RAG disable option — enables pure local Markdown memory without external vector services |

**No PRs merged today.**

---

## 4. Community Hot Topics

| Item | Activity | Analysis |
|------|----------|----------|
| [#137](https://github.com/moltis-org/moltis/issues/137) | 5 comments, closed | **Privacy/self-hosting demand**: Users want memory systems decoupled from cloud RAG services. The resolution suggests Moltis is responding to local-first AI trends. |
| [#461](https://github.com/moltis-org/moltis/pull/461) | New PR | **Documentation/tooling**: External service (gitcgr) integration for repo visualization — indicates interest in project transparency but minimal core development. |
| [#460](https://github.com/moltis-org/moltis/issues/460) | 0 comments, open | **Integration friction**: WhatsApp setup complexity reported; no community response yet suggests either niche usage or documentation gaps. |

**Underlying need**: Users prioritize deployment flexibility (local vs. cloud) and clearer onboarding for messaging integrations.

---

## 5. Bugs & Stability

| Issue | Severity | Status | Notes |
|-------|----------|--------|-------|
| [#460](https://github.com/moltis-org/moltis/issues/460) | **Medium** | Open, unassigned | WhatsApp integration UX confusion — no crash reports, but blocker for adoption. No fix PR linked. |

**No critical or high-severity bugs reported today.**

---

## 6. Feature Requests & Roadmap Signals

| Request | Source | Likelihood in Next Version |
|---------|--------|---------------------------|
| Local-only memory mode | #137 (resolved) | **Shipped** — pattern suggests continued local-first investment |
| Simplified WhatsApp setup | #460 | **Moderate** — if maintainer prioritizes onboarding |
| Additional integration badges/docs | #461 | **Low** — cosmetic, depends on maintainer preference |

**Signal**: The closed #137 indicates active development on deployment flexibility. Expect expanded self-hosting documentation or additional "disable cloud service" toggles.

---

## 7. User Feedback Summary

| Pain Point | Evidence | Sentiment |
|------------|----------|-----------|
| RAG/cloud dependency | #137 | Resolved — user satisfied with local option |
| Integration complexity | #460 | Frustrated — "confusing" without specifics |
| Project visibility | #461 | Neutral — external tooling interest |

**Use case pattern**: Users deploying Moltis in privacy-sensitive or air-gapped environments. WhatsApp integration likely used for personal assistant automation, but setup friction limits adoption.

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|----------|-----|------|---------------|
| [#460](https://github.com/moltis-org/moltis/issues/460) | 1 day | Low (new) | Maintainer triage — request specific error logs or documentation section |
| [#461](https://github.com/moltis-org/moltis/pull/461) | 1 day | Low | Review decision on external badge integration |

**No stale critical items identified.** Project backlog appears manageable.

---

*Digest generated from github.com/moltis-org/moltis data. Activity period: 2026-03-22 to 2026-03-23.*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-03-23

## 1. Today's Overview

CoPaw shows **high community activity** with 38 issues and 23 PRs updated in the last 24 hours, indicating an engaged but potentially strained development cycle. The project is experiencing **growing pains** with Windows platform stability issues, shell command execution hangs, and model compatibility problems dominating the bug reports. No new releases were published, suggesting the team is focused on stabilization rather than feature shipping. The high volume of first-time contributors (5 closed PRs from new contributors) reflects healthy community growth, though core maintainers appear stretched given 31 open/active issues versus 7 closed. The project is at a critical juncture where multi-agent orchestration features are being developed while fundamental stability issues on Windows and tool execution remain unresolved.

---

## 2. Releases

**No new releases** — Version remains at v0.1.0.post1 (or v0.1.0b3 for some installations).

---

## 3. Project Progress

### Merged/Closed PRs (9 total)

| PR | Author | Summary | Impact |
|:---|:---|:---|:---|
| [#1891](https://github.com/agentscope-ai/CoPaw/pull/1891) | ixiadao | Add HTTP 529 to retryable status codes for Anthropic overloaded errors | **Reliability** — Prevents false failures during API congestion |
| [#1851](https://github.com/agentscope-ai/CoPaw/pull/1851) | ixiadao | Add retry logic to CronExecutor for transient failures | **Stability** — Fixes concurrent cron job failures |
| [#1869](https://github.com/agentscope-ai/CoPaw/pull/1869) | ixiadao | Support `!!` message prefix to interrupt running channel tasks | **UX** — Real-time task cancellation from chat channels |
| [#1889](https://github.com/agentscope-ai/CoPaw/pull/1889) | ixiadao | Channel routing to dispatch messages to different agents | **Scalability** — Single channel → multiple agents |
| [#1792](https://github.com/agentscope-ai/CoPaw/pull/1792) | ixiadao | Channel routing support for multi-agent setups (earlier iteration) | **Foundation** — Precedent for #1889 |
| [#1065](https://github.com/agentscope-ai/CoPaw/pull/1065) | shiweijiezero | Fix shell check=True on Windows + file_url_to_local_path in Telegram/Discord | **Cross-platform** — Critical Windows shell fix |
| [#623](https://github.com/agentscope-ai/CoPaw/pull/623) | fancyboi999 | Drop expired console push messages in take/take_all | **Correctness** — Fixes message expiry inconsistency |
| [#816](https://github.com/agentscope-ai/CoPaw/pull/816) | fancyboi999 | Show active LLM base URL in console | **Debuggability** — Easier configuration triage |
| [#1208](https://github.com/agentscope-ai/CoPaw/pull/1208) | fancyboi999 | Surface hub import error details | **Developer Experience** — Clearer skill import failures |

**Key Advancement**: Multi-agent infrastructure is maturing rapidly with channel routing and interruption mechanisms landing. The `!!` prefix and `/stop` command (in review as #2067) show focus on operational control.

---

## 4. Community Hot Topics

### Most Active Issues

| Issue | Comments | Status | Core Need |
|:---|:---:|:---|:---|
| [#1976](https://github.com/agentscope-ai/CoPaw/issues/1976) — "RuntimeError: Task has been cancelled!" | **15** | 🔴 OPEN | **Production stability** — Async task lifecycle management |
| [#430](https://github.com/agentscope-ai/CoPaw/issues/430) — "Help Wanted: Open Tasks" | **9** | 🔴 OPEN | **Contributor onboarding** — Structured task claiming system |
| [#2035](https://github.com/agentscope-ai/CoPaw/issues/2035) — Multi-agent bot binding & collaboration | **7** | 🔴 OPEN | **Architecture clarity** — How to bind multiple bots per channel |
| [#2040](https://github.com/agentscope-ai/CoPaw/issues/2040) — Tool chain calls hanging 20+ minutes | **6** | 🔴 OPEN | **Critical reliability** — Tool execution timeouts failing |
| [#2007](https://github.com/agentscope-ai/CoPaw/issues/2007) — Security: self-approval of dangerous commands | **6** | 🟢 CLOSED | **Security model** — Approval workflows need admin separation |

### Most Active PRs

| PR | Focus | Significance |
|:---|:---|:---|
| [#2068](https://github.com/agentscope-ai/CoPaw/pull/2068) | Shell.py pipe leak fix — **12.8x faster timeout recovery** | Critical infrastructure fix from first-time contributor |
| [#2070](https://github.com/agentscope-ai/CoPaw/pull/2070) | Handle list content in CopawTokenCounter | Anthropic multimodal compatibility |
| [#2036](https://github.com/agentscope-ai/CoPaw/pull/2036) | **Multi-Agent Orchestration System** | Major feature: dynamic agent spawning |

**Underlying Needs Analysis**:
- **#1976** reveals async/await patterns breaking under load — suggests need for structured concurrency
- **#2035** shows confusion between "channel" (communication) and "bot" (identity) abstractions
- **#2040** indicates tool execution lacks robust timeout/cancellation propagation

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|:---|:---|:---|:---|
| 🔴 **Critical** | [#2040](https://github.com/agentscope-ai/CoPaw/issues/2040) | Tool chain hangs indefinitely (20+ min) — affects file read, script exec, browser | No dedicated fix; #2068 may help |
| 🔴 **Critical** | [#2058](https://github.com/agentscope-ai/CoPaw/issues/2058) [#2060](https://github.com/agentscope-ai/CoPaw/issues/2060) | Windows: `Start-Process` hangs forever; PowerShell/chrome subprocess deadlock | **Fix in review**: [#2068](https://github.com/agentscope-ai/CoPaw/pull/2068) |
| 🔴 **Critical** | [#2056](https://github.com/agentscope-ai/CoPaw/issues/2056) | Windows startup crash: `PydanticUndefinedAnnotation: 'MCPConfig'` | No fix identified |
| 🟡 **High** | [#1976](https://github.com/agentscope-ai/CoPaw/issues/1976) | "Task has been cancelled!" — async task lifecycle errors | Referenced fix in #1956, but #1976 reopened |
| 🟡 **High** | [#2059](https://github.com/agentscope-ai/CoPaw/issues/2059) | Windows client random freezes, especially during tool calls | No fix |
| 🟡 **High** | [#2055](https://github.com/agentscope-ai/CoPaw/issues/2055) | OpenAI-compatible model (`kat-coder-pro-v1`) returns excessive tool_calls, causing cascade failure | No fix |
| 🟡 **High** | [#2015](https://github.com/agentscope-ai/CoPaw/issues/2015) | `active_skills` ↔ `customized_skills` sync broken in new versions | No fix |
| 🟢 **Medium** | [#2037](https://github.com/agentscope-ai/CoPaw/issues/2037) | Console UI breaks when displaying code blocks | No fix |
| 🟢 **Medium** | [#2066](https://github.com/agentscope-ai/CoPaw/issues/2066) | `execute_shell_command` double-escapes quotes | No fix |

**Platform Pattern**: **Windows is a second-class citizen** — 4 of 6 critical/high bugs are Windows-specific. The shell execution subsystem needs comprehensive review.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Issue/PR | Likelihood in Next Version | Rationale |
|:---|:---|:---:|:---|
| **WeChat ClawBot channel support** | [#2043](https://github.com/agentscope-ai/CoPaw/issues/2043) (+6 👍) | **High** | Strategic platform (WeChat), clear demand, well-scoped |
| **Multi-agent orchestration system** | [#2036](https://github.com/agentscope-ai/CoPaw/pull/2036) | **Very High** | PR already open, comprehensive implementation |
| **Global/shared skills directory** | [#2032](https://github.com/agentscope-ai/CoPaw/issues/2032) | Medium | Architecture change, needs design review |
| **Console terminal + file manager tabs** | [#2065](https://github.com/agentscope-ai/CoPaw/issues/2065) | Medium | UX improvement, scope unclear |
| **Model provider search/filter** | [#2062](https://github.com/agentscope-ai/CoPaw/pull/2062) | **High** | PR open, simple UI enhancement |
| **Memory compaction context recovery** | [#2048](https://github.com/agentscope-ai/CoPaw/issues/2048) | Medium | Closed without merge — needs revisit |
| **RAG integration** | [#1107](https://github.com/agentscope-ai/CoPaw/issues/1107) | Low | Closed as question, no commitment |
| **MCP in heartbeat/cron** | [#2071](https://github.com/agentscope-ai/CoPaw/issues/2071) | Medium | Architectural gap identified |

**Prediction**: v0.1.1 will likely ship with multi-agent orchestration (#2036), WeChat ClawBot (#2043), and model provider filtering (#2062), assuming Windows stability blockers are resolved.

---

## 7. User Feedback Summary

### Pain Points

| Theme | Evidence | Severity |
|:---|:---|:---:|
| **Installation friction** | [#2031](https://github.com/agentscope-ai/CoPaw/issues/2031): "30 minutes still extracting", 500MB installer | High |
| **Windows reliability** | Multiple hangs, crashes, subprocess failures | **Critical** |
| **Tool execution opacity** | [#2040](https://github.com/agentscope-ai/CoPaw/issues/2040): 20-min hangs with no feedback; [#2049](https://github.com/agentscope-ai/CoPaw/issues/2049): thinking steps clutter output | High |
| **Security model confusion** | [#2007](https://github.com/agentscope-ai/CoPaw/issues/2007): self-approval of dangerous commands | Medium |
| **Mobile experience** | [#2026](https://github.com/agentscope-ai/CoPaw/issues/2026): Console unusable on mobile | Medium |

### Use Cases Emerging

- **Enterprise WeChat bots** needing clean output (no thinking traces)
- **Multi-agent teams** with specialized roles (dev, security, research)
- **Voice/audio workflows** via Whisper integration
- **Cross-platform deployment** (Windows desktop, Linux server, Docker)

### Satisfaction Signals

- Active contribution from first-time users (5 merged PRs)
- Detailed bug reports with reproduction steps
- Feature requests showing deep engagement (#2032, #2043)

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|:---|:---:|:---|:---|
| [#1976](https://github.com/agentscope-ai/CoPaw/issues/1976) — Task cancellation errors | 3 days | 🔴 **Escalating** — 15 comments, referenced fix didn't resolve | Maintainer triage: verify #1956 fix, or deep-dive async patterns |
| [#430](https://github.com/agentscope-ai/CoPaw/issues/430) — Open tasks tracker | 20 days | 🟡 Stale tasks may discourage contributors | Maintainer refresh: close completed, prioritize P0 items |
| [#1762](https://github.com/agentscope-ai/CoPaw/pull/1762) — File guard for sensitive paths | 4 days | 🟡 Security feature, no comments | Review for v0.1.1 security hardening |
| [#1984](https://github.com/agentscope-ai/CoPaw/pull/1984) — Tool guard parallel execution fix | 3 days | 🟡 Complex fix, no maintainer feedback | Review for merge — blocks reliable tool use |
| [#2015](https://github.com/agentscope-ai/CoPaw/issues/2015) — Skills sync regression | 1 day | 🟡 Breaking change from previous behavior | Confirm intentional vs. bug, document if intentional |

**Critical Gap**: No maintainer response on [#1976](https://github.com/agentscope-ai/CoPaw/issues/1976) despite 15 comments and production impact. This risks community confidence.

---

## Project Health Assessment

| Metric | Status | Note |
|:---|:---:|:---|
| Community engagement | 🟢 Strong | 38 issues, 23 PRs, active first-time contributors |
| Code velocity | 🟡 Moderate | 9 closed PRs, but 14 open; feature work competing with bugs |
| Platform parity | 🔴 **At risk** | Windows stability crisis needs dedicated effort |
| Release cadence | 🔴 Stalled | No release since v0.1.0.post1; blockers unclear |
| Maintainer bandwidth | 🟡 Constrained | High-value PRs (#2068, #2036) awaiting review |

**Recommendation**: Prioritize Windows shell subsystem hardening and [#1976](https://github.com/agentscope-ai/CoPaw/issues/1976) root cause analysis before shipping multi-agent features. Consider a v0.1.1 hotfix release for critical stability fixes.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw Project Digest — 2026-03-23

## 1. Today's Overview

ZeptoClaw shows **moderate community activity** with 9 items updated in the past 24 hours (5 issues, 4 PRs). The project is actively addressing Telegram UX improvements and infrastructure maintenance, with two PRs successfully merged/closed. Notably, a significant portion of activity centers on **fork synchronization and CI/release workflow improvements** rather than core feature development. The community is seeking better onboarding support, as evidenced by a new issue asking for community discussion channels. Overall project health appears stable with incremental improvements, though no new official release was published.

---

## 2. Releases

**No new releases** (v0.7.6 remains latest upstream).

---

## 3. Project Progress

### Merged/Closed Today

| PR/Issue | Description | Impact |
|----------|-------------|--------|
| [#394](https://github.com/qhkm/zeptoclaw/pull/394) | Sync upstream v0.7.6 | Infrastructure — brings fork in line with upstream |
| [#393](https://github.com/qhkm/zeptoclaw/issues/393) | Sync fork customizations onto upstream v0.7.6 | Preserved Telegram markdown/chunking support and CI customizations |
| [#395](https://github.com/qhkm/zeptoclaw/issues/395) | Generate timestamped releases for main builds | **CI improvement** — main branch builds now create unique timestamped prereleases instead of overwriting fixed tags |

**Key advancement**: The release workflow now supports traceable prereleases, solving a practical DevOps pain point for users tracking main branch builds.

---

## 4. Community Hot Topics

| Rank | Item | Activity | Analysis |
|------|------|----------|----------|
| 🔥 1 | [#387](https://github.com/qhkm/zeptoclaw/issues/387) Containerfiles → Firecracker VMs | 7 comments, open since Mar 17 | **Architectural debate** — proposes treating coding agents as containerized apps in microVMs. Controversial; touches on security vs. complexity tradeoffs. Signals demand for **sandboxed, scalable agent execution**. |
| 2 | [#396](https://github.com/qhkm/zeptoclaw/pull/396) Telegram improvements + security hardening | New, active same-day | **Daily-driving feedback loop** — author uses ZeptoClaw via Telegram and is upstreaming fixes. Strong signal of real-world usage. |
| 3 | [#287](https://github.com/qhkm/zeptoclaw/pull/287) Dev tools for consistent pre-PR state | Updated Mar 22 | Contributor experience — seeks standardized `cargo test`/`clippy` environment. Indicates **barrier to contribution** from environment inconsistency. |

**Underlying needs**: (1) Secure, isolated execution environments for agents; (2) polished mobile/chat UX; (3) lower friction for contributors.

---

## 5. Bugs & Stability

| Severity | Item | Status | Notes |
|----------|------|--------|-------|
| Medium | [#396](https://github.com/qhkm/zeptoclaw/pull/396) Telegram markdown mangling | **Fix PR open** | Markdown rendering broken in Telegram replies; PR includes fix |
| Medium | [#392](https://github.com/qhkm/zeptoclaw/pull/392) Missing typing indicator | **Fix PR open** | UX issue — users don't know if bot is processing |

No critical crashes or regressions reported today. Both Telegram UX issues have active fix PRs from the same contributor (`stuartbowness`), suggesting coordinated improvement effort.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Source | Likelihood in Next Version | Rationale |
|---------|--------|---------------------------|-----------|
| **Firecracker VM orchestration** | [#387](https://github.com/qhkm/zeptoclaw/issues/387) | Medium-High | 7 comments indicate maintainer/community interest; aligns with security/isolation trends |
| **SKILL.md deep scanning** | [#285](https://github.com/qhkm/zeptoclaw/issues/285) | Medium | Quality-of-life improvement for skill discovery; scoped implementation |
| **Typing indicator for Telegram** | [#392](https://github.com/qhkm/zeptoclaw/pull/392) | **High** | PR already open, small scoped, active user feedback |
| **Timestamped CI releases** | [#395](https://github.com/qhkm/zeptoclaw/issues/395) | **Shipped** | Already implemented |

**Prediction**: Next release likely includes Telegram UX polish (#392, #396) and possibly SKILL.md scanning (#285). Firecracker VM support (#387) may require longer incubation.

---

## 7. User Feedback Summary

| Pain Point | Source | Context |
|------------|--------|---------|
| **Configuration difficulty — Qwen integration** | [#397](https://github.com/qhkm/zeptoclaw/issues/397) | New user `PedroRosalba` explicitly asks for community help: *"having a real hard time configuring the Qwen with the zepto claw"* |
| **Unclear if bot is processing** | [#392](https://github.com/qhkm/zeptoclaw/pull/392) | Lack of typing indicator caused UX friction |
| **Markdown rendering broken** | [#396](https://github.com/qhkm/zeptoclaw/pull/396) | Telegram-specific formatting issues |
| **No visible community space** | [#397](https://github.com/qhkm/zeptoclaw/issues/397) | User cannot find Discord/forum for support |

**Satisfaction signals**: Active daily usage (Telegram improvements driven by real use), responsive PR merging.

**Dissatisfaction signals**: Steep onboarding curve for model configuration; discoverability of support channels.

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|------|-----|------|---------------|
| [#387](https://github.com/qhkm/zeptoclaw/issues/387) Firecracker VMs | 6 days | **High** — architectural decision pending | Maintainer decision on scope/complexity tradeoff |
| [#285](https://github.com/qhkm/zeptoclaw/issues/285) SKILL.md scanning | 15 days | Medium | Implementation PR welcome; author `taqtiqa-mark` may need guidance |
| [#287](https://github.com/qhkm/zeptoclaw/pull/287) Dev tools | 14 days | Low-Medium | Review pending; blocks contributor onboarding standardization |

**Recommendation**: [#397](https://github.com/qhkm/zeptoclaw/issues/397) (community request) should be addressed with documentation update or Discord/Discourse link — low effort, high impact for user retention.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw Project Digest — 2026-03-23

## 1. Today's Overview

EasyClaw shows minimal activity over the past 24 hours with only one issue closed and no pull request or release activity. The project appears to be in a maintenance phase with limited community engagement. The single resolved issue addresses a critical Windows-specific deployment problem affecting the computer-use agent functionality. Overall project health indicators suggest stable but low-velocity development, with maintainers responsive to user-reported blockers but limited new feature momentum.

---

## 2. Releases

**No new releases** — Version 1.3.21.248 remains the latest available build.

---

## 3. Project Progress

**No merged or closed PRs today.**

The only development-related activity was issue resolution: a Windows deployment bug affecting the computer-use agent was closed. The fix involved the missing `kaitray.exe` component, which serves as the WebSocket bridge for GUI automation on Windows systems.

---

## 4. Community Hot Topics

| Item | Activity | Analysis |
|------|----------|----------|
| [#26: kaitray.exe 组件缺失导致 computer-use 功能无法使用](https://github.com/gaoyangz77/easyclaw/issues/26) | 1 comment, closed 2026-03-22 | **Critical deployment gap on Windows** — Users installing EasyClaw on Windows lack the `kaitray.exe` binary required for computer-use agent functionality. The issue reveals a packaging/distribution problem where the tray service component isn't bundled or properly documented. |

**Underlying need:** Windows users require clearer installation documentation or automated component validation. The `kaitray.exe` appears to be a separate build artifact (possibly from the `rivonclaw` dependency based on the issue URL) that isn't being distributed through standard channels.

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix Available |
|----------|-------|--------|---------------|
| **High** | [#26](https://github.com/gaoyangz77/easyclaw/issues/26): Missing `kaitray.exe` prevents computer-use agent from starting on Windows | **CLOSED** | Workaround documented; root cause appears to be distribution packaging |

**Stability Assessment:** One resolved blocker. No new crashes or regressions reported. The closed issue suggests maintainers are responsive to Windows platform-specific problems, though the fix may require manual component acquisition rather than automated resolution.

---

## 6. Feature Requests & Roadmap Signals

**No new feature requests** in the past 24 hours.

**Inferred priorities** from recent activity:
- **Windows distribution integrity** — Ensuring all platform-specific binaries (`kaitray.exe`) are properly bundled
- **Computer-use agent reliability** — The WebSocket bridge architecture (port 8765) may need health-check mechanisms

**Likely near-term focus:** Improved Windows installer validation and automated component verification at startup.

---

## 7. User Feedback Summary

| Pain Point | Evidence | Use Case Impact |
|------------|----------|---------------|
| Silent component failures | `kaitray.exe` missing with no error at install time | Windows automation workflows blocked |
| Unclear dependency chain | User had to manually trace WebSocket connection failure to missing binary | Increased debugging burden |
| Documentation gaps | No pre-flight check for required binaries | Deployment friction for non-technical users |

**User profile:** Windows 10 enterprise user attempting WeChat automation via computer-use agent. Represents a likely target demographic (business automation on Chinese platforms).

**Satisfaction indicator:** Issue was resolved same-day, suggesting responsive maintainer support despite documentation gaps.

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|------|-----|------|---------------|
| No stale issues identified | — | — | — |

**Note:** The repository shows minimal open issue inventory. Monitor for accumulation of Windows-specific deployment issues or computer-use agent reliability reports that may indicate systemic architecture problems rather than one-off packaging oversights.

---

*Digest generated from github.com/gaoyangz77/easyclaw data as of 2026-03-23*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/duanyytop/agents-radar).*