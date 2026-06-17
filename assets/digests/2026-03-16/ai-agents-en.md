# OpenClaw Ecosystem Digest 2026-03-16

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-03-16 00:10 UTC

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

# OpenClaw Project Digest — 2026-03-16

## 1. Today's Overview

OpenClaw shows **extremely high activity** with 500 issues and 500 PRs updated in the last 24 hours, indicating a project under intense development pressure. The 87.8% open issue rate (439/500) and 77.6% open PR rate (388/500) suggest a growing backlog requiring triage attention. **No new releases** were published, leaving users on 2026.3.12/2026.3.13 with known critical regressions. The community is actively engaged with 25+ comment threads on critical stability issues, particularly memory management and gateway connectivity failures introduced in recent versions.

---

## 2. Releases

**No new releases** — Last version remains 2026.3.13 (or 2026.3.12 for most users).

Critical context: Multiple severe regressions in 2026.3.12 are **blocking basic CLI functionality**, yet no hotfix has been issued. Users are manually rolling back to 2026.3.8 or 2026.3.2.

---

## 3. Project Progress

### Merged/Closed PRs (Notable)

| PR | Description | Impact |
|:---|:---|:---|
| [#47700](https://github.com/openclaw/openclaw/pull/47700) | Fix logfile rotation: resolve file path at write time | Fixes logs writing to wrong dated files after midnight |
| [#46927](https://github.com/openclaw/openclaw/pull/46927) | Stop chat auto-scroll from fighting manual scrolling | Major UX improvement for WebChat |
| [#47384](https://github.com/openclaw/openclaw/pull/47384) | Continue Telegram polling when webhook cleanup fails | Reliability fix for Telegram channel |
| [#47696](https://github.com/openclaw/openclaw/pull/47696) | Add `/trust` and `/untrust` commands for temporary exec security | **Security feature**: time-bounded exec approvals |
| [#44465](https://github.com/openclaw/openclaw/pull/44465) | Add fetch timeout to Discord voice message upload | Prevents indefinite hangs |
| [#47245](https://github.com/openclaw/openclaw/pull/47245) | Distinguish command palette hover/selection states | UI polish |
| [#47662](https://github.com/openclaw/openclaw/pull/47662) | Codex/extension host boundary | **Architecture**: extension isolation |
| [#42485](https://github.com/openclaw/openclaw/pull/42485) | Restore Telegram retry for 429 rate-limit | **Regression fix** |
| [#43498](https://github.com/openclaw/openclaw/pull/43498) | Add `memory_refresh` tool for atomic replace | **Feature**: safer memory updates |
| [#47659](https://github.com/openclaw/openclaw/pull/47659) | Plugin execution spine contract docs | Infrastructure for plugin reliability |
| [#46985](https://github.com/openclaw/openclaw/pull/46985) | Dedupe streaming text around tool interruptions | **Bug fix**: WebChat display corruption |
| [#47663](https://github.com/openclaw/openclaw/pull/47663) | Add `unscheduledReminderNote` config | Allows disabling false-positive reminder notes |
| [#47486](https://github.com/openclaw/openclaw/pull/47486) | Add `sessions_broadcast` tool for cross-session events | **Feature**: multi-session state sync |
| [#42720](https://github.com/openclaw/openclaw/pull/42720) | Strip `/chat/completions` from baseUrl to prevent path doubling | **Closed** - Kimi/Perplexity fix |
| [#42563](https://github.com/openclaw/openclaw/pull/42563) | Add fetch timeout to OAuth calls (Qwen, MiniMax) | **Closed** - auth reliability |
| [#47160](https://github.com/openclaw/openclaw/pull/47160) | Prioritize user-configured `num_ctx` over model-discovery for Ollama | **Fix**: respects user config |
| [#43497](https://github.com/openclaw/openclaw/pull/43497) | Recover subagent runs after gateway restart | **Critical fix**: prevents lost work |
| [#47698](https://github.com/openclaw/openclaw/pull/47698) | Add changelog-generator skill | New built-in skill |
| [#36860](https://github.com/openclaw/openclaw/pull/36860) | Pass abort signal to `runTurn` to prevent stuck sessions | **Critical fix**: session hangs |
| [#46162](https://github.com/openclaw/openclaw/pull/46162) | Per-agent inbound media isolation by account ID | **Security/privacy**: multi-agent isolation |
| [#41597](https://github.com/openclaw/openclaw/pull/41597) | Queue inbound messages during drain; recover interrupted turns | **Critical fix**: message loss on restart |
| [#47366](https://github.com/openclaw/openclaw/pull/47366) | Multigate | **Major feature**: multiple gateway support |
| [#41640](https://github.com/openclaw/openclaw/pull/41640) | Add `models auth clean` command | Cleanup for ghost auth profiles |
| [#46361](https://github.com/openclaw/openclaw/pull/46361) | Short-circuit `--version` to avoid full app init | Performance fix (~5s → instant) |
| [#46763](https://github.com/openclaw/openclaw/pull/46763) | Use scoped plugin snapshots to prevent OOM on low-memory hosts | **Closed** - critical for 2GB VPS |
| [#46366](https://github.com/openclaw/openclaw/pull/46366) | Ensure i18n locale loaded before initial render | **Closed** - UI fix |
| [#46357](https://github.com/openclaw/openclaw/pull/46357) | Make daemon stop() async with SIGTERM→wait→SIGKILL | **Closed** - prevents orphaned processes |
| [#46693](https://github.com/openclaw/openclaw/pull/46693) | Pass through explicit OpenAI cache retention | **Closed** - cost optimization |
| [#47669](https://github.com/openclaw/openclaw/pull/47669) | Validate `delivery.channel` for announce mode with multi-channel | **Closed** - prevents silent delivery failures |
| [#47305](https://github.com/openclaw/openclaw/pull/47305) | Fix `normalizeProviders` flip-flop bug with env var apiKey references | **Closed** - config stability |

**Key Themes**: Gateway reliability, memory/performance fixes, security improvements (exec trust, media isolation), multi-agent infrastructure.

---

## 4. Community Hot Topics

### Most Active Issues (by engagement)

| Issue | Comments | 👍 | Topic | Analysis |
|:---|:---:|:---:|:---|:---|
| [#45064](https://github.com/openclaw/openclaw/issues/45064) | 25 | 0 | **OOM crash on basic commands** (2026.3.12) | **CRITICAL**: Complete CLI unusability; blocking daily operations |
| [#7649](https://github.com/openclaw/openclaw/issues/7649) | 23 | 4 | Matrix E2EE self-verification | Long-standing encryption gap for enterprise Matrix users |
| [#45289](https://github.com/openclaw/openclaw/issues/45289) | 17 | 0 | Telegram reaction notifications | Feature parity gap with Telegram API |
| [#45772](https://github.com/openclaw/openclaw/issues/45772) | 16 | 1 | Gateway heartbeat timer stops (v2026.3.8) | **Regression**: Reliability feature broken |
| [#7916](https://github.com/openclaw/openclaw/issues/7916) | 14 | 10 | **Encrypted API keys / secrets management** | **Top-voted feature**: Enterprise security requirement |
| [#13688](https://github.com/openclaw/openclaw/issues/13688) | 14 | 2 | Discord WebSocket disconnects, unbounded backoff | Stability issue causing 30+ min outages |
| [#45504](https://github.com/openclaw/openclaw/issues/45504) | 13 | 1 | CLI fails against local loopback gateway (2026.3.12) | **Regression**: Core local functionality broken |
| [#2317](https://github.com/openclaw/openclaw/issues/2317) | 13 | 19 | **SearXNG fallback for web_search** | **Top-voted enhancement**: Cost/reliability for search |
| [#41778](https://github.com/openclaw/openclaw/issues/41778) | 13 | 3 | `openclaw-message` OOM on 4GB servers (v2026.3.7) | **Regression**: Deployment blocker for small VPS |
| [#30177](https://github.com/openclaw/openclaw/issues/30177) | 12 | 1 | WhatsApp announce queue "no active listener" | Race condition in channel state management |

**Underlying Needs**:
- **Stability over features**: Users need 2026.3.12 regressions fixed urgently
- **Enterprise security**: Encrypted secrets (#7916, 10 👍) and execution guardrails (#6823, 5 👍)
- **Cost control**: Search provider flexibility (#2317, #12034, #11399)
- **Reliable self-hosting**: Memory efficiency for small VPS deployments

---

## 5. Bugs & Stability

### Critical (Blocking Basic Functionality)

| Issue | Version | Status | Fix PR |
|:---|:---|:---|:---|
| [#45064](https://github.com/openclaw/openclaw/issues/45064) | 2026.3.12 | **OOM crash on CLI commands** — `gateway status`, `doctor` | [#46763](https://github.com/openclaw/openclaw/pull/46763) (closed, partial) |
| [#45504](https://github.com/openclaw/openclaw/issues/45504) | 2026.3.12 | **CLI fails against local loopback gateway** | None identified |
| [#44714](https://github.com/openclaw/openclaw/issues/44714) | 2026.3.12 | `openclaw logs --follow` handshake timeout | None identified |
| [#45123](https://github.com/openclaw/openclaw/issues/45123) | 2026.3.12 | `openclaw browser` command fails | None identified |
| [#41778](https://github.com/openclaw/openclaw/issues/41778) | 2026.3.7 | `openclaw-message` OOM on 4GB servers | None identified |

### High (Major Feature Broken)

| Issue | Description | Fix PR |
|:---|:---|:---|
| [#45772](https://github.com/openclaw/openclaw/issues/45772) | Gateway heartbeat stops after 1-2 triggers | None |
| [#45222](https://github.com/openclaw/openclaw/issues/45222) | Intermittent local gateway WebSocket handshake failures | None |
| [#45560](https://github.com/openclaw/openclaw/issues/45560) | Local gateway CLI handshake fails (probe timeout) | None |
| [#45940](https://github.com/openclaw/openclaw/issues/45940) | `openclaw gateway probe` false negative on Windows | None |
| [#45759](https://github.com/openclaw/openclaw/issues/45759) | Telegram typing keepalive loop crashes gateway | None |
| [#46659](https://github.com/openclaw/openclaw/issues/46659) | WhatsApp message send fails but react succeeds | None |
| [#45368](https://github.com/openclaw/openclaw/issues/45368) | `ReferenceError: ANTHROPIC_MODEL_ALIASES` on config read | None |

### Medium (Workarounds Exist)

| Issue | Description |
|:---|:---|
| [#45289](https://github.com/openclaw/openclaw/issues/45289) | Telegram reaction notifications not working |
| [#3181](https://github.com/openclaw/openclaw/issues/3181) | Runaway heartbeat loop → excessive model calls |
| [#13688](https://github.com/openclaw/openclaw/issues/13688) | Discord WebSocket disconnects, unbounded backoff |
| [#39620](https://github.com/openclaw/openclaw/issues/39620) | Token usage shows 'unknown' (regression from 3.2) |

**Assessment**: 2026.3.12 appears to be a **problematic release** with multiple CLI-breaking regressions. No hotfix release has been issued despite 3+ days of reports.

---

## 6. Feature Requests & Roadmap Signals

| Issue | 👍 | Description | Likelihood in Next Version |
|:---|:---:|:---|:---|
| [#2317](https://github.com/openclaw/openclaw/issues/2317) | 19 | SearXNG fallback for web_search | **High** — PRs exist, clear need |
| [#11399](https://github.com/openclaw/openclaw/issues/11399) | 13 | Extensible web_search providers via plugins | **High** — architectural direction |
| [#12034](https://github.com/openclaw/openclaw/issues/12034) | 11 | Tavily as search provider | **Medium** — depends on plugin system |
| [#7916](https://github.com/openclaw/openclaw/issues/7916) | 10 | Encrypted API keys / secrets management | **Medium** — security priority, complex |
| [#10659](https://github.com/openclaw/openclaw/issues/10659) | 4 | Masked secrets (agent can't see raw keys) | **Medium** — related to #7916 |
| [#6823](https://github.com/openclaw/openclaw/issues/6823) | 5 | Execution guardrails for tool safety | **Medium** — PR #47696 adds `/trust` |
| [#18237](https://github.com/openclaw/openclaw/issues/18237) | 5 | Async exec callback (inject result on process exit) | **Low-Medium** — architectural change |
| [#25145](https://github.com/openclaw/openclaw/issues/25145) | 2 | Outbound message approval gate | **Low** — complex UX |
| [#19148](https://github.com/openclaw/openclaw/issues/19148) | 0 | Customizable compaction prompts | **Low** — niche |
| [#25359](https://github.com/openclaw/openclaw/issues/25359) | 2 | Per-agent plugin slot overrides | **Low** — multi-agent complexity |

**Emerging Themes**:
- **Search provider diversity**: Strong demand for SearXNG, Tavily, extensible architecture
- **Security hardening**: Encrypted secrets, execution guardrails, masked credentials
- **Multi-agent maturity**: Per-agent configuration, session broadcast, media isolation

---

## 7. User Feedback Summary

### Pain Points

| Theme | Evidence | Severity |
|:---|:---|:---:|
| **Memory/performance regression** | #45064, #41778, #45065, #46763 | 🔴 Critical |
| **Gateway connectivity unreliable** | #45504, #45222, #45560, #45772, #45940 | 🔴 Critical |
| **CLI broken in 2026.3.12** | #45064, #44714, #45123, #45504 | 🔴 Critical |
| **WhatsApp reliability** | #30177, #46659, multiple "no active listener" | 🟡 High |
| **Discord stability** | #13688, #23577, #46725 | 🟡 High |
| **Secrets in plaintext** | #7916, #10659 | 🟡 High |
| **Search cost/rate limits** | #2317, #12034, #11399 | 🟢 Medium |

### Positive Signals

- Active community engagement (25-comment threads)
- Strong maintainer response on PRs (30+ merged/closed in 24h)
- Security-conscious features advancing (#47696 trust commands, #46162 media isolation)
- Multi-agent infrastructure maturing (#47486 session broadcast, #47366 multigate)

### Satisfaction Risks

> *"After upgrading to 2026.3.12, OpenClaw crashes with JavaScript heap out of memory on basic CLI commands, making the CLI completely unusable."* — #45064

> *"v2026.3.2 works fine on the same server. This is a regression."* — #41778

**Risk**: Users may abandon 2026.3.x series if hotfix not issued promptly; manual rollback friction is high.

---

## 8. Backlog Watch

### Long-Unanswered Critical Issues

| Issue | Age | Status | Risk |
|:---|:---|:---|:---|
| [#7649](https://github.com/openclaw/openclaw/issues/7649) | ~6 weeks | Matrix E2EE self-verification — **23 comments** | Enterprise adoption blocker |
| [#13688](https://github.com/openclaw/openclaw/issues/13688) | ~5 weeks | Discord WebSocket instability — **14 comments** | Production reliability |
| [#5116](https://github.com/openclaw/openclaw/issues/5116) | ~6 weeks | iMessage FDA propagation, silent send failures — **9 comments** | macOS users affected |
| [#10637](https://github.com/openclaw/openclaw/issues/10637) | ~5 weeks | Signal reply/quote context not passed — **8 comments** | Feature parity gap |
| [#17362](https://github.com/openclaw/openclaw/issues/17362) | ~4 weeks | iMessage chat_id parseInt bug — **6 comments** | Silent message misrouting |

### PRs Needing Maintainer Attention

| PR | Description | Status |
|:---|:---|:---|
| [#47662](https://github.com/openclaw/openclaw/pull/47662) | Codex/extension host boundary — **XL size** | Open, needs review |
| [#47366](https://github.com/openclaw/openclaw/pull/47366) | Multigate — **XL size, major feature** | Open, needs review |
| [#43497](https://github.com/openclaw/openclaw/pull/43497) | Recover subagent runs after gateway restart — **XL size** | Open, critical fix |
| [#41597](https://github.com/openclaw/openclaw/pull/41597) | Queue inbound messages during drain — **XL size** | Open, message loss fix |
| [#36860](https://github.com/openclaw/openclaw/pull/36860) | Pass abort signal

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant / Agent Open-Source Ecosystem

## 1. Ecosystem Overview

The personal AI assistant ecosystem is experiencing **intense development velocity** across multiple projects, with OpenClaw, ZeroClaw, IronClaw, and PicoClaw all showing 50+ PRs in 24 hours. The landscape is consolidating around **multi-agent orchestration**, **enterprise security hardening**, and **production reliability** as differentiators from earlier "toy" implementations. A notable architectural divergence has emerged: projects like NullClaw (Zig + curl) and NanoClaw (Apple Container-first) prioritize **security sandboxing and minimal dependencies**, while OpenClaw and LobsterAI optimize for **feature velocity and channel breadth**. The ecosystem is simultaneously maturing toward enterprise deployments while grappling with **provider lock-in risks** (Anthropic enforcement, API rate limits) and **operational complexity** (memory management, gateway reliability, secrets handling).

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Releases | Health Score | Assessment |
|:---|:---:|:---:|:---:|:---:|:---|
| **OpenClaw** | 500 | 500 | None (regression hotfix needed) | ⚠️ **Stressed** | Extreme velocity masking critical stability debt; 87.8% open issue rate indicates triage failure |
| **NanoBot** | 22 | 58 | None | 🟢 Healthy | Balanced 35:23 merge ratio; feature expansion phase with multi-agent foundation |
| **ZeroClaw** | 37 | 50 | 10 beta releases | 🟢 Active | Stabilization mode with rapid iteration; enterprise security focus |
| **PicoClaw** | 16 | 55 | 1 nightly | 🟢 Healthy | 90% open PR rate suggests review standards or bandwidth constraints; production-hardening focus |
| **NanoClaw** | 16 | 37 | None | 🟢 Active | Platform expansion pains (Apple Container); responsive bug-fixing |
| **NullClaw** | 21 | 50 | None | 🟢 Healthy | Exceptional security focus; curl-based HTTP stack stabilization |
| **IronClaw** | 26 | 50 | None | 🟢 Active | "Mars-rover reliability" initiative; formal verification push |
| **LobsterAI** | 3 | 17 | None | ⚠️ **Transition Risk** | OpenClaw engine migration causing user-facing instability |
| **TinyClaw** | 0 | 6 | None | 🟡 Stable | Moderate velocity; reliability engineering priority |
| **Moltis** | 5 | 7 | None | 🟢 Stable | Surgical fixes; Windows compatibility gaps |
| **CoPaw** | 38 | 35 | None | 🟡 Stressed | Enterprise China market focus; Feishu reliability crisis |
| **ZeptoClaw** | 4 | 6 | None | 🟢 Stable | Solo-maintained; infrastructure hardening |
| **EasyClaw** | 0 | 0 | 1 maintenance | 🟡 Dormant | Stable maintenance phase; minimal community |

---

## 3. OpenClaw's Position

### Advantages vs. Peers

| Dimension | OpenClaw Advantage | Evidence |
|:---|:---|:---|
| **Scale & ecosystem** | 10x issue/PR volume; de facto reference implementation | 500 issues/PRs vs. 6-58 for peers; "core reference" designation |
| **Channel breadth** | Most mature multi-channel support | Telegram, Discord, WhatsApp, Matrix, iMessage all actively maintained |
| **Feature velocity** | Fastest shipping of security/enterprise features | `/trust` exec commands, per-agent media isolation, multigate |
| **Community mindshare** | Highest engagement on strategic features | #7916 encrypted secrets (10 👍), #2317 SearXNG (19 👍) |

### Technical Approach Differences

| Aspect | OpenClaw | Peers (NullClaw, NanoClaw, IronClaw) |
|:---|:---|:---|
| **Runtime** | Node.js/TypeScript | Zig (NullClaw), Swift/Apple Container (NanoClaw), Rust (IronClaw) |
| **Security model** | Time-bounded exec approvals, config-based isolation | Mandatory secrets encryption (NullClaw #537), kernel-level sandboxing (NanoClaw) |
| **Dependencies** | Heavy (npm ecosystem) | Minimal (curl, wasmtime debates) |
| **HTTP stack** | Native Node.js | curl-based (NullClaw), custom Rust (IronClaw) |

### Community Size Comparison

OpenClaw operates at **5-10x the scale** of nearest competitors by raw metrics, but this creates **coordination overhead**: 87.8% open issue rate vs. NanoBot's 60% and ZeroClaw's aggressive beta release cadence. The community is **feature-hungry but stability-frustrated**—a tension smaller projects avoid.

---

## 4. Shared Technical Focus Areas

| Requirement | Projects | Specific Needs |
|:---|:---|:---|
| **Multi-agent orchestration** | ZeroClaw ("swarm"), NanoBot (#2041, #2064), PicoClaw (#1582), IronClaw (subagents) | Context engineering, delegation topology, session broadcast (#47486) |
| **Enterprise secrets management** | OpenClaw (#7916), NullClaw (#537 mandatory encryption), NanoClaw (#1102 OAuth expiration), ZeroClaw (Nevis IAM) | Encrypted at-rest, masked from agents, rotation support |
| **Provider diversity / failover** | OpenClaw (#2317 SearXNG, #1611 Gemini fallback), NanoClaw (#80 multi-runtime), IronClaw (#80 Ollama), CoPaw (#1192 OpenRouter) | Runtime abstraction, rate limit handling, cost optimization |
| **Production observability** | ZeroClaw (#3565 token dashboard), NanoClaw (#1111 API tracking), OpenClaw (structured logging) | Cost attribution, latency metrics, distributed tracing |
| **Memory/performance efficiency** | OpenClaw (#46763 scoped snapshots, #43497 subagent recovery), NanoBot (#670 open-skills 98% token reduction), ZeroClaw (ARM64 crashes #3537) | 2GB VPS viability, context compaction, OOM prevention |
| **Reliable gateway/channel infrastructure** | OpenClaw (#45772 heartbeat, #45504 loopback), CoPaw (#1475 Telegram reconnect), PicoClaw (#1455 Telegram resilience) | Auto-reconnect, state recovery, health probing |

---

## 5. Differentiation Analysis

| Project | Core Differentiation | Target User | Architecture Signature |
|:---|:---|:---|:---|
| **OpenClaw** | Reference implementation; maximum channel/feature breadth | Power users, multi-channel operators | Modular TypeScript, plugin ecosystem |
| **NullClaw** | Security-first, minimal dependencies, formal verification trajectory | Security-conscious self-hosters | Zig, curl-based, mandatory encryption |
| **NanoClaw** | Apple-native containerization, macOS-first security | Apple ecosystem developers | Swift, Apple Container, Xcode integration |
| **IronClaw** | "Mars-rover reliability," formal methods, chaos testing | Enterprise production deployments | Rust, TLA+ specifications, Kani bounded model checking |
| **ZeroClaw** | Enterprise IAM integration, "hands" autonomous agents | Corporate IT, regulated industries | Beta-heavy, rapid security iteration |
| **LobsterAI** | NetEase integration, China-market optimization | Chinese enterprise users | OpenClaw engine migration |
| **CoPaw** | AgentScope ecosystem, ACP protocol, voice-first | Chinese enterprise, IDE-integrated workflows | Python, multimodal pipeline |
| **PicoClaw** | Agent steering/interruptibility, event-driven loops | Production agent operators | Go, hookable agent loops |
| **NanoBot** | Academic/research origins, skill ecosystem | Researchers, HKUDS community | Python, open-skills integration |
| **TinyClaw** | Web-first setup, minimal viable product | Non-technical users, quick deployment | TypeScript, TinyOffice integration |
| **Moltis** | MCP ecosystem, agent sidecar extensibility | Agent platform builders | Rust, Model Context Protocol native |
| **ZeptoClaw** | r8r bridge orchestration, template reliability | Workflow automation engineers | Go, progressive disclosure prompts |

---

## 6. Community Momentum & Maturity

### Tier 1: Rapid Iteration (50+ PRs/24h)
| Project | Phase | Risk |
|:---|:---|:---|
| OpenClaw | Feature velocity → stability debt | Critical regressions unpatched (#45064 OOM, #45504 CLI broken) |
| ZeroClaw | Stabilization for enterprise | ARM64 platform gap (#3537) |
| IronClaw | Reliability sprint | XL PR backlog (#927, #1151, #1210) |
| NullClaw | Security hardening | curl/wasmtime dependency tension (#192) |

### Tier 2: Active Development (30-60 PRs/24h)
| Project | Phase | Trajectory |
|:---|:---|:---|
| NanoBot | Multi-agent foundation | Healthy consolidation |
| NanoClaw | Platform expansion (Apple) | Responsive bug-fixing |
| PicoClaw | Production hardening | Review bandwidth constraint |
| CoPaw | Enterprise China focus | Feishu crisis threatens reputation |

### Tier 3: Stable/Maintenance (<20 PRs/24h)
| Project | Phase | Concern |
|:---|:---|:---|
| TinyClaw | Reliability engineering | Solo-critical fixes unmerged (#218, #219) |
| Moltis | Surgical iteration | Windows parity gaps |
| ZeptoClaw | Infrastructure consolidation | Solo maintainer, contributor experience blind spot |
| LobsterAI | Engine migration | User-facing instability (#417) |
| EasyClaw | Maintenance mode | Community stagnation |

---

## 7. Trend Signals for AI Agent Developers

| Trend | Evidence | Strategic Implication |
|:---|:---|:---|
| **Sandboxing as default** | NanoClaw Apple Containers, NullClaw mandatory encryption, OpenClaw `/trust` commands | Security is no longer optional; expect kernel-level isolation requirements |
| **Multi-agent orchestration maturation** | ZeroClaw "swarm," NanoBot delegation topology, IronClaw subagent docs | Single-agent architectures becoming legacy; plan for distributed agent graphs |
| **Provider abstraction urgency** | NanoClaw #80 (44 👍, Anthropic bans), OpenClaw multi-gateway, CoPaw OpenRouter | Vendor lock-in is existential risk; runtime abstraction is table stakes |
| **Cost observability as feature** | ZeroClaw #3565, NanoClaw #1111, OpenClaw token tracking | Users demand spend transparency; build metering into core architecture |
| **MCP (Model Context Protocol) ecosystem emergence** | Moltis #413 sidecars, LobsterAI #432 MCP fix, IronClaw MCP initialization | Standardized tool interface replacing ad-hoc integrations |
| **Enterprise IM as battleground** | CoPaw Feishu crisis, NanoBot WeCom/DingTalk, ZeroClaw Lark | China-market and Slack/Teams/Discord parity critical for B2B |
| **"Agent steering" and human-in-the-loop** | PicoClaw #1517, OpenClaw abort signals, Moltis interruptibility | Full autonomy rejected; observable, interruptible loops required |
| **Formal methods for reliability** | IronClaw TLA+/Kani, ZeroClaw chaos testing | Production deployments demand verification beyond testing |

---

**Conclusion**: The ecosystem is bifurcating between **velocity-optimized** (OpenClaw, LobsterAI) and **reliability-optimized** (NullClaw, IronClaw, NanoClaw) architectures. OpenClaw maintains ecosystem leadership but faces stability credibility risk from unpatched regressions. New entrants should prioritize **provider abstraction**, **observability**, and **sandboxed execution** as baseline requirements, with **multi-agent orchestration** as the next competitive dimension.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-03-16

## 1. Today's Overview

NanoBot shows **high development velocity** with 58 PRs and 22 issues updated in the last 24 hours, indicating an active open-source community. The project is in a **feature expansion phase** with significant work on multi-agent support, new channels (WhatsApp, desktop, inter-agent), and configuration tooling. No new releases were cut today, suggesting maintainers are accumulating changes for a larger release. The 35:23 open-to-merged PR ratio indicates healthy review throughput, though some long-standing PRs remain unmerged. Chinese and English language issues coexist, reflecting the project's HKUDS origins and growing international adoption.

---

## 2. Releases

**No new releases** (v0.x.x remains current).

---

## 3. Project Progress

### Merged/Closed PRs Today (23 total, key highlights)

| PR | Author | Summary | Impact |
|:---|:---|:---|:---|
| [#670](https://github.com/HKUDS/nanobot/pull/670) | @nobuxpt | **open-skills integration** — reduces token usage ~98% via pre-built patterns | Major efficiency gain for skill execution |
| [#310](https://github.com/HKUDS/nanobot/pull/310) | @SergioSV96 | **DeepSeek/GLM reasoning_content support** — preserves and displays model "thought process" in CLI | Critical for reasoning model adoption |
| [#2037](https://github.com/HKUDS/nanobot/pull/2037) | @benlenarts | **Fix builtin skills with restrictToWorkspace** — resolves path resolution for built-in skills | Security fix for workspace isolation |
| [#2034](https://github.com/HKUDS/nanobot/pull/2034) | @chengyongru | **DingTalk multimedia enhancement** — image/video support in DingTalk channel | Enterprise China market feature |
| [#2066](https://github.com/HKUDS/nanobot/pull/2066) | @Mazahir26 | **Gemini fallback for web search** — provider → Gemini → DuckDuckGo chain | Search reliability improvement |

### Architecture Advances
- **Multi-agent foundation**: PR [#2064](https://github.com/HKUDS/nanobot/pull/2064) (open) and [#2041](https://github.com/HKUDS/nanobot/pull/2041) (open) establish per-agent model/provider configuration and delegation topology
- **Desktop ecosystem**: PR [#2063](https://github.com/HKUDS/nanobot/pull/2063) adds Tauri desktop app with PyInstaller bundling
- **Channel expansion**: WhatsApp bridge auto-start ([#2068](https://github.com/HKUDS/nanobot/pull/2068)), inter-agent HTTP channel ([#2002](https://github.com/HKUDS/nanobot/pull/2002)), Unix-socket JSON-RPC ([#2059](https://github.com/HKUDS/nanobot/pull/2059))

---

## 4. Community Hot Topics

### Most Active Issues (by engagement)

| Issue | Comments | Core Need |
|:---|:---|:---|
| [#1932](https://github.com/HKUDS/nanobot/issues/1932) — Skill disable/enable vs. delete | 8 comments | **Configuration flexibility** — users want toggleable skills without data loss |
| [#1988](https://github.com/HKUDS/nanobot/issues/1988) — WeCom channel broken | 8 comments | **Enterprise IM reliability** — configuration drift in gateway mode |
| [#1822](https://github.com/HKUDS/nanobot/issues/1822) — Nvidia model support dropped | 7 comments | **Model provider diversity** — vendor lock-in concerns |
| [#2049](https://github.com/HKUDS/nanobot/issues/2049) — Skill creator tool missing | 4 comments | **Skill development UX regression** — breaking change in upgrade path |
| [#1719](https://github.com/HKUDS/nanobot/issues/1719) — Web search backend swappable | 4 comments, **11 👍** | **Extensibility architecture** — community wants plugin system for search |

### Underlying Patterns
- **Enterprise readiness**: WeCom, DingTalk, Feishu issues dominate — B2B deployment friction
- **Skill ecosystem maturity**: Users hitting boundaries between "built-in" and "custom" skills
- **Configuration complexity**: Manual JSON editing is a repeated pain point (addressed by `nanobot onboard` wizard in [#2018](https://github.com/HKUDS/nanobot/issues/2018)/[#2019](https://github.com/HKUDS/nanobot/issues/2019))

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR? |
|:---|:---|:---|:---|
| 🔴 **High** | [#143](https://github.com/HKUDS/nanobot/issues/143) — Filesystem tools bypass `restrict_to_workspace` | Open since Feb 5 | **No** — security risk |
| 🔴 **High** | [#2061](https://github.com/HKUDS/nanobot/issues/2061) — File copy fails in workspace (Feishu) | Open, 2 comments | **No** — tool loop bug |
| 🟡 **Medium** | [#508](https://github.com/HKUDS/nanobot/issues/508) — Ollama response format incorrect | Open since Feb 11 | **No** — local LLM compatibility |
| 🟡 **Medium** | [#2065](https://github.com/HKUDS/nanobot/issues/2065) — Missing `most`/`Fast` binaries on fresh install | Open, 0 comments | **No** — dependency/docs gap |
| 🟡 **Medium** | [#1929](https://github.com/HKUDS/nanobot/issues/1929) — Heartbeat Phase 1 missing time injection | Open, 1 comment | **No** — scheduling logic flaw |
| 🟢 **Low** | [#1956](https://github.com/HKUDS/nanobot/issues/1956) — CLI "thinking..." text not cleared | Open | **No** — UI polish |

### Regressions
- [#2049](https://github.com/HKUDS/nanobot/issues/2049): Skill creator tool **removed/broken in latest version** — user workflow disrupted

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue/PR | Likelihood in Next Release | Rationale |
|:---|:---|:---|:---|
| **Skill disable/enable toggle** | [#1932](https://github.com/HKUDS/nanobot/issues/1932) + [#1934](https://github.com/HKUDS/nanobot/pull/1934) | **High** | PR open, "good first issue", community demand |
| **Interactive config wizard (`nanobot onboard`)** | [#2018](https://github.com/HKUDS/nanobot/issues/2018)/[#2019](https://github.com/HKUDS/nanobot/issues/2019) | **High** | Nightly available, actively tested |
| **Multi-agent delegation** | [#2041](https://github.com/HKUDS/nanobot/pull/2041), [#2064](https://github.com/HKUDS/nanobot/pull/2064) | **Medium-High** | Two competing PRs, needs consolidation |
| **Web search plugin architecture** | [#1719](https://github.com/HKUDS/nanobot/issues/1719) | **Medium** | 15 rejected PRs suggest maintainer caution; may need RFC |
| **Desktop GUI app** | [#2063](https://github.com/HKUDS/nanobot/pull/2063) | **Medium** | Large PR, Tauri+PyInstaller, may need iteration |
| **Session management (clear/restart)** | [#2062](https://github.com/HKUDS/nanobot/issues/2062) | **Medium** | Feishu-specific context bloat, generalizable need |
| **Event webhook HTTP triggers** | [#2055](https://github.com/HKUDS/nanobot/pull/2055) | **Medium** | Infrastructure for external integrations |

---

## 7. User Feedback Summary

### Pain Points
| Theme | Evidence | Severity |
|:---|:---|:---|
| **Configuration hell** | WeCom broken ([#1988](https://github.com/HKUDS/nanobot/issues/1988)), manual JSON editing, CLI proxy failures ([#2032](https://github.com/HKUDS/nanobot/issues/2032)) | High |
| **Upgrade fragility** | Skill creator disappeared ([#2049](https://github.com/HKUDS/nanobot/issues/2049)), context files grow unbounded ([#2062](https://github.com/HKUDS/nanobot/issues/2062)) | High |
| **Security/scope confusion** | `restrict_to_workspace` bypasses ([#143](https://github.com/HKUDS/nanobot/issues/143)), file copy failures ([#2061](https://github.com/HKUDS/nanobot/issues/2061)) | Medium |
| **Binary/dependency gaps** | Missing `most`, `Fast`, `gog` on clean Ubuntu ([#2065](https://github.com/HKUDS/nanobot/issues/2065)) | Medium |

### Positive Signals
- **open-skills integration** (#670) praised for 98% token reduction
- **Multi-modal improvements**: QQ image recognition ([#2000](https://github.com/HKUDS/nanobot/issues/2000)), DingTalk multimedia (#2034)
- **Research interest**: Academic collaboration inquiry ([#2052](https://github.com/HKUDS/nanobot/issues/2052)) from Bloom framework team

### Use Case Diversity
- **Remote file access** via QQ ([#2025](https://github.com/HKUDS/nanobot/issues/2025)) — personal automation
- **Enterprise IM** (WeCom, Feishu, DingTalk) — workplace deployment
- **Local-first AI** (Ollama, local models) — privacy-conscious users

---

## 8. Backlog Watch

| Item | Age | Issue | Risk |
|:---|:---|:---|:---|
| **Security: Workspace restriction bypass** | 39 days | [#143](https://github.com/HKUDS/nanobot/issues/143) | 🔴 **Critical** — sandbox escape, no maintainer response |
| **Docker CI/CD automation** | 39 days | [#126](https://github.com/HKUDS/nanobot/pull/126) | 🟡 **Medium** — community Docker builds exist but unofficial |
| **Ollama format compatibility** | 33 days | [#508](https://github.com/HKUDS/nanobot/issues/508) | 🟡 **Medium** — local LLM growth trend |
| **Vietnamese README** | 19 days | [#1164](https://github.com/HKUDS/nanobot/pull/1164) | 🟢 **Low** — i18n backlog |

### Maintainer Attention Needed
1. **Security review** for [#143](https://github.com/HKUDS/nanobot/issues/143) — filesystem sandboxing is foundational trust
2. **Multi-agent PR consolidation** — [#2041](https://github.com/HKUDS/nanobot/pull/2041) vs [#2064](https://github.com/HKUDS/nanobot/pull/2064) risk divergent implementations
3. **Web search architecture decision** — 15 rejected PRs suggest need for official RFC to channel community energy

---

*Digest generated from HKUDS/nanobot GitHub activity 2026-03-15*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-03-16

## 1. Today's Overview

ZeroClaw shows **exceptionally high development velocity** with 50 PRs and 37 issues updated in 24 hours, alongside 10 new beta releases. The project is in active stabilization mode for the v0.3.x series, with heavy focus on multi-agent orchestration ("swarm"), context management, and enterprise security integrations. Notably, multiple PRs from community contributor @rareba are being rebased and merged by maintainer @theonlyhennygod, suggesting coordinated contribution workflow. The high volume of security-related fixes and enterprise feature additions (M365, Nevis IAM, OpenVPN) indicates ZeroClaw is positioning for production enterprise deployments.

---

## 2. Releases

**10 new releases** published, all in the v0.3.2-v0.3.4-beta range:

| Version | Key Changes | Status |
|---------|-------------|--------|
| **v0.3.4-beta.232/231/230** | Tool call failure visibility; token-based context compaction; persistent sessions; **"hands" autonomous knowledge-accumulating agents**; **multi-agent swarm orchestration**; Mistral tool fix | Latest beta |
| **v0.3.3-beta.218/217** | Context improvements; `allow_private_hosts` for http_request tool | Stabilization |
| **v0.3.2** | **Heartbeat: two-phase execution, structured tasks, auto-routing** | Stable |
| **v0.3.1** | Termux (aarch64-linux-android) release target | Mobile support |

**Breaking Changes & Migration Notes:**
- `--interactive` flag removed from `zeroclaw onboard` (now auto-detected via TTY) — [PR #3646](https://github.com/zeroclaw-labs/zeroclaw/pull/3646)
- Swarm orchestration is new; existing multi-agent configs may need migration
- Context compaction changes may affect long-running session behavior

---

## 3. Project Progress

### Merged/Closed PRs Today (35 total, highlights by impact):

| PR | Author | Summary | Impact |
|----|--------|---------|--------|
| [#3646](https://github.com/zeroclaw-labs/zeroclaw/pull/3646) | @theonlyhennygod | Auto-detect TTY instead of `--interactive` flag | **UX breaking change** — simplifies onboarding |
| [#3645](https://github.com/zeroclaw-labs/zeroclaw/pull/3645) | @theonlyhennygod | Fix headless browser in service mode | **Stability** — fixes systemd service failures |
| [#3644](https://github.com/zeroclaw-labs/zeroclaw/pull/3644) | @theonlyhennygod | Use ubuntu-22.04 for Linux releases | **Compatibility** — fixes glibc 2.39 issues on Ubuntu 22.04 |
| [#3620](https://github.com/zeroclaw-labs/zeroclaw/pull/3620) | @theonlyhennygod | Exclude `name` field from Mistral tool_calls | **Provider fix** — resolves 422 errors |
| [#3619](https://github.com/zeroclaw-labs/zeroclaw/pull/3619) | @theonlyhennygod | Wire `query_classification` into channel processing | **Feature completion** — enables model routing |
| [#3501](https://github.com/zeroclaw-labs/zeroclaw/pull/3501) | @theonlyhennygod | Merge consecutive same-role messages for Anthropic | **Reliability** — fixes 500 errors on Claude |
| [#3612](https://github.com/zeroclaw-labs/zeroclaw/pull/3612) | @rareba → @theonlyhennygod | HMAC-SHA256 node transport layer | **Security/Enterprise** — inter-node auth |

**Major Feature Advances:**
- **Swarm orchestration**: Multi-agent coordination now in beta
- **"Hands" autonomous agents**: Self-improving agent packages
- **Enterprise integrations**: M365, Nevis IAM, OpenVPN tunnels in pipeline

---

## 4. Community Hot Topics

### Most Active Issues (by engagement):

| Issue | Comments | 👍 | Core Need |
|-------|----------|-----|-----------|
| [#1478](https://github.com/zeroclaw-labs/zeroclaw/issues/1478) — "除了安全,什么功能也没有" (Closed) | **36** | 5 | **Security vs. usability tension** — user wants "disable all safety" mode for personal use |
| [#3565](https://github.com/zeroclaw-labs/zeroclaw/issues/3565) — Token usage logging dashboard | 7 | 0 | **Cost observability** — enterprise budget management |
| [#2693](https://github.com/zeroclaw-labs/zeroclaw/issues/2693) — Mistral 422 errors (Closed) | 5 | 0 | Provider compatibility |
| [#3537](https://github.com/zeroclaw-labs/zeroclaw/issues/3537) — ARM64 daemon silent crashes | 5 | 0 | **Platform stability** — Raspberry Pi deployments blocked |

**Underlying Needs Analysis:**
- **#1478 reveals critical UX gap**: Security policy is perceived as overly aggressive with insufficient granularity. User explicitly states: "I installed this for a toy, what security is there to talk about?" — suggests need for `danger_zone` or `unrestricted` autonomy profile.
- **Cost transparency** (#3565) is emerging as enterprise blocker — no native spend tracking despite multi-provider support.

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR | Description |
|----------|-------|--------|--------|-------------|
| **S0** — Data loss/Security | [#3537](https://github.com/zeroclaw-labs/zeroclaw/issues/3537) ARM64 daemon crashes | **OPEN** | None identified | Raspberry Pi 4: silent exit from v0.2.1-beta.186+, regression from v0.1.7 |
| **S0** | [#3533](https://github.com/zeroclaw-labs/zeroclaw/issues/3533) 代码写入BUG — UTF-8 panic | **CLOSED** | Likely in release | Panic at byte index in Chinese content: `byte index 300 is not a char boundary` |
| **S1** — Workflow blocked | [#3540](https://github.com/zeroclaw-labs/zeroclaw/issues/3540) Lark/Feishu channel fails | **OPEN** | None | Compiled with `channel-lark` but warns on daemon start |
| **S1** | [#3643](https://github.com/zeroclaw-labs/zeroclaw/issues/3643) "auto" tool dispatcher injects 35 schemas TWICE | **OPEN** | None | XML dispatcher doubles context window usage for local models |
| **S1** | [#3577](https://github.com/zeroclaw-labs/zeroclaw/issues/3577) WhatsApp Web QR not shown | **CLOSED** | [#3646](https://github.com/zeroclaw-labs/zeroclaw/pull/3646) related | TTY detection issue |
| **S2** — Degraded | [#3513](https://github.com/zeroclaw-labs/zeroclaw/issues/3513) Agent sends multiple messages | **OPEN** | None | Chat UX fragmentation |
| **S2** | [#3647](https://github.com/zeroclaw-labs/zeroclaw/issues/3647) QQ channel markdown as plain text | **OPEN** | None | Formatting regression |

**Stability Assessment:** ARM64 regression (#3537) is the most concerning — affects edge deployments with no workaround identified. UTF-8 string handling panic (#3533) suggests broader i18n issues.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood in v0.3.5+ | Rationale |
|---------|-------|----------------------|-----------|
| **Token/cost dashboard** | [#3565](https://github.com/zeroclaw-labs/zeroclaw/issues/3565) | **High** | Enterprise-critical; structured logging PR would be straightforward |
| **"Full" Docker image with all features** | [#3642](https://github.com/zeroclaw-labs/zeroclaw/issues/3642) | **Medium** | Community demand clear; memory trade-off documented |
| **Real multi-agent system with context engineering** | [#3502](https://github.com/zeroclaw-labs/zeroclaw/issues/3502) | **In Progress** | Supersedes #3046; aligns with swarm releases |
| **QQ bot Markdown/multimedia** | [#2958](https://github.com/zeroclaw-labs/zeroclaw/issues/2958) | **Medium** | Chinese market feature; competing with other channels |
| **Transcription initial_prompt** | [#2881](https://github.com/zeroclaw-labs/zeroclaw/issues/2881) | **Low-Medium** | Whisper quality of life; niche use case |

**Predicted v0.3.5 priorities:** Cost observability, ARM64 stability, QQ channel parity, swarm hardening.

---

## 7. User Feedback Summary

### Pain Points (verbatim themes):

| Theme | Evidence | Severity |
|-------|----------|----------|
| **"Security theater" frustration** | #1478: "安全到这个bot只能当个聊天机器人" / "this bot can only be a chatbot due to security" | **High** — churn risk |
| **Silent failures** | #3537: "no output and exit immediately"; #3580: "Web dashboard not available" | **High** — debuggability |
| **Platform compatibility** | #2084, #3573: glibc version issues; ARM64 crashes | **High** — deployment friction |
| **Provider quirks** | #2693, #3572, #3544: Mistral, Anthropic edge cases | **Medium** — maintenance burden |
| **Missing observability** | #3565: "zero visibility into token usage and costs" | **Medium** — enterprise blocker |

### Positive Signals:
- Active enterprise interest (M365, Nevis IAM, OpenVPN PRs)
- Mobile/edge deployment attempts (Termux, Raspberry Pi)
- Strong contribution pipeline from @rareba, @theonlyhennygod

---

## 8. Backlog Watch

| Issue/PR | Age | Problem | Action Needed |
|----------|-----|---------|---------------|
| [#3537](https://github.com/zeroclaw-labs/zeroclaw/issues/3537) ARM64 crashes | 1 day | S0 regression, no response | **Maintainer triage** — bisect v0.2.1-beta.186 |
| [#3643](https://github.com/zeroclaw-labs/zeroclaw/issues/3643) Double tool schema injection | 1 day | Performance regression for local models | Code review of XML dispatcher |
| [#3502](https://github.com/zeroclaw-labs/zeroclaw/issues/3502) Multi-agent context engineering | 2 days | Large feature request, no maintainer response | Roadmap alignment discussion |
| [#3385](https://github.com/zeroclaw-labs/zeroclaw/pull/3385) InboxAPI channel | 3 days | Open PR, no review | Channel maintainer review |
| [#3011](https://github.com/zeroclaw-labs/zeroclaw/issues/3011) WebSocket protocols | 8 days | Dashboard auth failure | Frontend maintainer attention |

**Risk:** High velocity may be masking review backlog — 15 open PRs with several complex enterprise features pending.

---

*Digest compiled from 50 PRs, 37 issues, 10 releases. Project health: **Active development, stabilization phase, enterprise pivot in progress**.*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-03-16

## 1. Today's Overview

PicoClaw shows **high development velocity** with 55 PRs and 16 issues updated in the last 24 hours, indicating an active open-source community around this Go-based AI agent framework. The project released a new nightly build (v0.2.3-nightly.20260315.5a251b46) while maintaining a **90% open PR rate** (50 open vs. 5 merged/closed), suggesting either rigorous review standards or potential maintainer bandwidth constraints. Activity clusters around **agent architecture improvements**, **multi-channel integrations** (Telegram, WhatsApp, QQ, WeCom, Mattermost), and **provider reliability** — reflecting PicoClaw's positioning as a multi-LLM, multi-channel AI assistant platform. Notably, the community is actively pushing production-hardening features like retry logic, reconnect handling, and security controls alongside new capabilities.

---

## 2. Releases

| Version | Type | Details |
|---------|------|---------|
| [v0.2.3-nightly.20260315.5a251b46](https://github.com/sipeed/picoclaw/compare/v0.2.3...main) | Nightly | Automated build from main branch; **unstable** — use with caution. No formal changelog; compare [v0.2.3...main](https://github.com/sipeed/picoclaw/compare/v0.2.3...main) for changes. |

**No stable release** today. The nightly suggests v0.2.3 stabilization is ongoing.

---

## 3. Project Progress

### Merged/Closed PRs Today (5 total, 2 highlighted)

| PR | Author | Impact |
|----|--------|--------|
| [#1517](https://github.com/sipeed/picoclaw/pull/1517) — **Agent Steering** | @afjcjsbx | **MAJOR**: Allows users to redirect agent mid-execution via hooks/interrupts; closes critical UX gap where users had to wait for wasteful tool chains to complete |
| [#1616](https://github.com/sipeed/picoclaw/pull/1616) — **Wire image_model to agent loop** | @ALVIN-YANG | Fixes config parsing gap where `image_model` was accepted but ignored; enables vision-capable model routing |

**In-flight advances**: WebSocket gateway (#751), Telegram reconnect resilience (#1455), transient provider failure retry (#1457), and native search integration (#1618) are near merge-ready.

---

## 4. Community Hot Topics

| Rank | Item | Engagement | Analysis |
|------|------|------------|----------|
| 1 | [#1316](https://github.com/sipeed/picoclaw/issues/1316) — **Event-driven agent loop refactor** | 11 comments, 👍1 | **Core architecture debate**: Community wants observable, hookable, interruptible agent loops. Underlying need: production debugging, human-in-the-loop control, and agent observability for enterprise deployments. Author @alexhoshina proposing fundamental redesign of `pkg/agent/loop.go`. |
| 2 | [#293](https://github.com/sipeed/picoclaw/issues/293) — **Autonomous Browser Operations** | 6 comments, 👍4 | **High-priority roadmap item**: Web automation (Playwright/Selenium integration) to expand agent reach. Strong demand signal (4 👍) for agentic web interaction. |
| 3 | [#1498](https://github.com/sipeed/picoclaw/issues/1498) — **Model-native search + fastembed** | 6 comments, 👍0 | Chinese community requesting: (1) provider-side search (OpenAI web_search_preview, etc.) to avoid duplicate client-side search; (2) fastembed for local embeddings. PR [#1618](https://github.com/sipeed/picoclaw/pull/1618) addresses part 1. |

**Signal**: The community is pushing PicoClaw from "working prototype" toward "production agent platform" — demanding observability, reliability, and web-scale capabilities.

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix PR? |
|----------|-------|-------------|---------|
| 🔴 **High** | [#1611](https://github.com/sipeed/picoclaw/issues/1611) | **Gemini fails when not first model** — fallback chain breaks for Google's Gemini when primary model fails; complete provider failure | [#1619](https://github.com/sipeed/picoclaw/pull/1619) (same-day fix) |
| 🔴 **High** | [#1582](https://github.com/sipeed/picoclaw/issues/1582) | **Multi-agent setup: "model not found"** — model resolution fails for non-default agents despite working in default agent | ❌ None |
| 🟡 **Medium** | [#1578](https://github.com/sipeed/picoclaw/issues/1578) | **image_model config ignored** — vision routing broken | [#1616](https://github.com/sipeed/picoclaw/pull/1616) (fix ready) |
| 🟡 **Medium** | [#1574](https://github.com/sipeed/picoclaw/issues/1574) | **prompt_cache_key error** — provider-specific caching bug | ❌ None |
| 🟡 **Medium** | [#1581](https://github.com/sipeed/picoclaw/issues/1581) | **OpenRouter-only fallback chain collapses** — shared cooldown kills all candidates | ❌ None |
| 🟢 **Low** | [#1561](https://github.com/sipeed/picoclaw/issues/1561) *(implied)* | Heartbeat template sent as real prompt | [#1617](https://github.com/sipeed/picoclaw/pull/1617) (fix ready) |

**Stability assessment**: Provider fallback and model resolution are **active pain points**; community is responding with same-day fixes for critical issues.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Request | Likelihood in v0.2.4 | Evidence |
|---------|---------|----------------------|----------|
| **Agent Steering / Event-driven loop** | #1316, #1517 | ⭐⭐⭐⭐⭐ **Very High** | Architecture proposal + merged steering PR; community consensus on need |
| **Model-native web search** | #1498, #1618 | ⭐⭐⭐⭐⭐ **Very High** | PR #1618 already implements for OpenAI/Codex |
| **Browser automation** | #293 | ⭐⭐⭐⭐ **High** | Roadmap-tagged, high engagement; technical design in progress |
| **Telegram observe-only mode** | #1591 | ⭐⭐⭐⭐ **High** | Common multi-bot pattern; PR-ready complexity |
| **Per-model cooldown** | #1612 | ⭐⭐⭐ **Medium** | Niche but well-specified; provider-layer change |
| **Mattermost channel** | #1587 | ⭐⭐⭐ **Medium** | Follows established pattern; community contribution likely |
| **Timezone-aware cron** | #1623 | ⭐⭐⭐ **Medium** | International user need; localized to cron package |
| **Disable exec tool** | #1621 | ⭐⭐⭐ **Medium** | Security hardening; simple config addition |
| **Sender in dynamic context** | #1615 | ⭐⭐⭐⭐ **High** | One-line fix; group chat essential |

---

## 7. User Feedback Summary

### Pain Points
| Theme | Evidence | Severity |
|-------|----------|----------|
| **Multi-agent configuration complexity** | #1582, #1611, #1581 | High — model resolution fails in non-trivial setups |
| **Provider reliability / fallback fragility** | #1581, #1457, #1611 | High — production deployments hitting cascading failures |
| **Security surface area** | #1621 (disable exec), #1588 (Dependabot) | Medium — users want granular security controls |
| **Observability / debugging** | #1316 | High — "black box" agent loops hinder production use |

### Positive Signals
- **Rapid response**: Same-day fix PRs (#1619, #1616) show responsive maintenance
- **Active channel expansion**: WhatsApp (#1620), QQ (#1349), WeCom (#1295) — strong internationalization
- **Enterprise readiness**: Requests for steering, observe-only modes, and audit trails indicate serious deployments

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|----------|-----|------|---------------|
| [#293](https://github.com/sipeed/picoclaw/issues/293) Browser automation | 28 days | **High** — roadmap-critical, stalled | Maintainer decision on Playwright vs. Selenium architecture |
| [#751](https://github.com/sipeed/picoclaw/pull/751) WebSocket gateway | 19 days | **Medium** — large PR, needs review | Code review; conflicts with #1316 architecture? |
| [#1455](https://github.com/sipeed/picoclaw/pull/1455) Telegram reconnect | 2 days | **Low** — fresh, well-tested | Routine merge |
| [#1457](https://github.com/sipeed/picoclaw/pull/1457) Provider retry | 2 days | **Low** — fresh, tested | Routine merge |
| [#1582](https://github.com/sipeed/picoclaw/issues/1582) Multi-agent model resolution | 1 day | **High** — blocking users | Needs triage; may relate to #1611 |

**Maintainer attention recommended**: #293 (browser) for roadmap credibility; #1316/#751 for architecture alignment; #1582 for user unblocking.

---

*Digest generated from GitHub activity 2026-03-15. All links: [github.com/sipeed/picoclaw](https://github.com/sipeed/picoclaw)*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-03-16

## 1. Today's Overview

NanoClaw shows **exceptionally high development velocity** with 37 PRs and 16 issues updated in the last 24 hours, indicating an active sprint period. The project is experiencing **platform expansion growing pains** — particularly around Apple Container support on macOS, where multiple critical networking and authentication bugs were discovered and patched in parallel. No new releases were cut, suggesting maintainers are accumulating fixes for a larger point release. The contributor base appears broadened, with skills-focused PRs (Proton Mail, Time MCP, contribution guides) alongside core infrastructure hardening.

---

## 2. Releases

**No new releases** (v0.x.x remains current).

---

## 3. Project Progress

### Merged/Closed Today (4 items)

| Item | Type | Summary |
|------|------|---------|
| [#1080](https://github.com/qwibitai/nanoclaw/issues/1080) | Question → Closed | Sandbox directory access limitations clarified — external paths must be configured at container creation |
| [#1094](https://github.com/qwibitai/nanoclaw/issues/1094) | Spam → Closed | AI API reseller promotion (non-actionable) |

### Notable Advances in Open PRs

| PR | Author | Advancement |
|----|--------|-------------|
| [#1117](https://github.com/qwibitai/nanoclaw/pull/1117) | @jorgenclaw | **Proton Mail integration** via Bridge (IMAP/SMTP) — first email provider skill |
| [#1111](https://github.com/qwibitai/nanoclaw/pull/1111) | @aviadr1 | **API usage tracking infrastructure** — SQLite-based cost/telemetry foundation |
| [#1113](https://github.com/qwibitai/nanoclaw/pull/1113) | @aviadr1 | **Contributor onboarding skill** — operational skill to lower contribution barrier |
| [#401](https://github.com/qwibitai/nanoclaw/pull/401) | @MunemHashmi | **Per-group web access attenuation** — security hardening for WebFetch/WebSearch |
| [#1114](https://github.com/qwibitai/nanoclaw/pull/1114) | @taslim | **Time MCP server skill** — timezone/date math tools for agents |

---

## 4. Community Hot Topics

### Highest Engagement

| Rank | Issue/PR | Engagement | Core Tension |
|------|----------|-----------|--------------|
| 1 | [#80](https://github.com/qwibitai/nanoclaw/issues/80) — Multi-runtime support | **44 👍, 22 comments** | **Vendor lock-in anxiety** — users report Anthropic account terminations for "OpenClaw usage"; demand for OpenAI, Gemini, Opencode alternatives |
| 2 | [#832](https://github.com/qwibitai/nanoclaw/issues/832) — Chrome CDP browser relay | **5 👍, 1 comment** | **Sandbox escape for real workflows** — reCAPTCHA and authenticated sessions break containerized browser |
| 3 | [#957](https://github.com/qwibitai/nanoclaw/issues/957) — Podman support | **3 👍, 2 comments** | **Docker Desktop licensing/UX friction** on macOS |

### Underlying Needs Analysis

- **Provider diversification** (#80, #1092): Users want runtime abstraction to mitigate business risk from Anthropic's enforcement patterns
- **Browser automation fidelity** (#832): Container security model conflicts with real-world web interaction requirements
- **Container runtime choice** (#957): Docker Desktop's commercial terms and resource usage drive Podman interest

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix PR Available |
|----------|-------|-------------|----------------|
| **🔴 Critical** | [#1088](https://github.com/qwibitai/nanoclaw/issues/1088) | **Log rotation failure**: `nanoclaw.log` reached **27 GB in 5 days** — disk exhaustion risk | ❌ No PR yet |
| **🔴 Critical** | [#1103](https://github.com/qwibitai/nanoclaw/issues/1103) | **Apple Container networking broken**: credential proxy binds to `127.0.0.1`, containers can't reach host | ✅ [#1109](https://github.com/qwibitai/nanoclaw/pull/1109) |
| **🔴 Critical** | [#1104](https://github.com/qwibitai/nanoclaw/issues/1104) | **Apple Container `.env` shadow mount fails**: `/dev/null` bind-mount rejected | ✅ [#1107](https://github.com/qwibitai/nanoclaw/pull/1107) |
| **🔴 Critical** | [#1105](https://github.com/qwibitai/nanoclaw/issues/1105) | **GitHub CLI auth broken in containers**: macOS Keychain tokens inaccessible | ✅ [#1108](https://github.com/qwibitai/nanoclaw/pull/1108) |
| 🟡 High | [#908](https://github.com/qwibitai/nanoclaw/issues/908) | **FTS5 conversation search** — performance/feature gap | ❌ No PR yet |
| 🟡 High | [#973](https://github.com/qwibitai/nanoclaw/issues/973) | **Setup latency complaints** — "incredibly slow" via Claude Code | ❌ No PR yet |
| 🟡 Medium | [#1097](https://github.com/qwibitai/nanoclaw/issues/1097) | **Day-of-week inference errors** — missing weekday in timestamps | ✅ [#1098](https://github.com/qwibitai/nanoclaw/pull/1098) |
| 🟡 Medium | [#1102](https://github.com/qwibitai/nanoclaw/pull/1102) | **OAuth token expiration** — credential proxy serves stale tokens after 1hr | ✅ In PR review |

**Pattern**: Apple Container (macOS native containerization) is a **newly supported but immature target** — 4 related bugs filed and patched same day by @spencer-whitman.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue/PR | Likelihood in Next Release | Rationale |
|---------|----------|---------------------------|-----------|
| **Multi-LLM runtime support** | [#80](https://github.com/qwibitai/nanoclaw/issues/80) | **High** | 44 👍, active threat (account bans), architectural discussion mature |
| **Podman documentation/official support** | [#957](https://github.com/qwibitai/nanoclaw/issues/957) | Medium | Low implementation cost, growing user segment |
| **Chrome CDP relay for real browser control** | [#832](https://github.com/qwibitai/nanoclaw/issues/832) | Medium-High | Working implementation referenced, security review needed |
| **FTS5 conversation indexing** | [#908](https://github.com/qwibitai/nanoclaw/issues/908) | Medium | Well-specified, performance-critical for agent memory |
| **Non-agentic/Docker registry install** | [#1116](https://github.com/qwibitai/nanoclaw/issues/1116) | Medium | Security-conscious user segment, reduces install friction |
| **API usage tracking** | [#1111](https://github.com/qwibitai/nanoclaw/pull/1111) | **High** | PR already in review, infrastructure foundation |

---

## 7. User Feedback Summary

### Pain Points

| Theme | Evidence | Severity |
|-------|----------|----------|
| **Install complexity** | [#973](https://github.com/qwibitai/nanoclaw/issues/973): "incredibly slow"; [#1116](https://github.com/qwibitai/nanoclaw/issues/1116): "install instructions are literally 'run this AI agent on your host system'" | High |
| **Platform-specific fragility** | Apple Container bugs (#1103-1106), NixOS networking (#1112) | High |
| **Operational hygiene gaps** | [#1088](https://github.com/qwibitai/nanoclaw/issues/1088): 27 GB logs; [#1102](https://github.com/qwibitai/nanoclaw/pull/1102): silent OAuth expiration | Critical |
| **Vendor risk concentration** | [#80](https://github.com/qwibitai/nanoclaw/issues/80): Anthropic account terminations | Strategic |

### Satisfaction Drivers

- **Container security model** repeatedly cited as primary attraction (#1116, #957)
- **Skill ecosystem extensibility** — active community contribution of integrations (Proton, Things 3, Time MCP)

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|----------|-----|------|---------------|
| [#80](https://github.com/qwibitai/nanoclaw/issues/80) Multi-runtime support | ~6 weeks | **Strategic blocker** — user churn risk from vendor enforcement | Maintainer architectural decision on abstraction layer |
| [#411](https://github.com/qwibitai/nanoclaw/issues/411) Indirect prompt injection documentation | ~3 weeks | Security credibility gap | Documentation PR — marked `good first issue` |
| [#496](https://github.com/qwibitai/nanoclaw/pull/496) Things 3 skill | ~3 weeks | Contributor fatigue | Review or closure decision |
| [#932](https://github.com/qwibitai/nanoclaw/pull/932) "Gen tech agency main" | ~6 days | Unclear scope, blocked status | Clarification or closure |
| [#605](https://github.com/qwibitai/nanoclaw/pull/605) Command injection fix | ~2 weeks | Security fix pending | Review — partially dropped scope needs resolution |

---

**Project Health Assessment**: 🟢 **Active/Healthy** — High velocity, responsive bug-fixing (especially Apple Container), but accumulating technical debt in log management and install experience. Multi-runtime support is the critical path to resilience.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-03-16

---

## 1. Today's Overview

NullClaw demonstrates **exceptional engineering velocity** with 50 PRs and 21 issues processed in 24 hours—an unusually high activity level indicating either a major release push or sustained development sprint. The project shows **strong security focus** with multiple merged fixes addressing timing attacks, SSRF bypasses, and secrets encryption. Documentation gaps remain a friction point, with users struggling to find configuration guides for WhatsApp, subagents, and other advanced features. The codebase is undergoing active **curl-based HTTP stack stabilization** following a migration from Zig's native `std.http.Client`. No new releases were cut today, suggesting the team is accumulating changes for a significant version bump.

---

## 2. Releases

**None** — No new releases published today.

---

## 3. Project Progress

### Merged/Closed PRs (22 total, key highlights)

| PR | Description | Impact |
|:---|:---|:---|
| [#572](https://github.com/nullclaw/nullclaw/pull/572) | Tool-call deduplication to prevent infinite loops and redundant credit usage | **Critical reliability fix** for production deployments |
| [#561](https://github.com/nullclaw/nullclaw/pull/561) | Actionable provider network error guidance with curl exit code mapping | Major UX improvement for debugging connectivity |
| [#548](https://github.com/nullclaw/nullclaw/pull/548) | Telegram attachment context preservation on media processing failure | Fixes silent data loss in channel integration |
| [#547](https://github.com/nullclaw/nullclaw/pull/547) | Subagent routing and AIEOS identity documentation | Addresses [#508](https://github.com/nullclaw/nullclaw/issues/508) docs gap |
| [#537](https://github.com/nullclaw/nullclaw/pull/537) | Mandatory secrets encryption enforcement | **Breaking security change** — plaintext configs now rejected |
| [#531](https://github.com/nullclaw/nullclaw/pull/531) | Constant-time bearer token comparison | Timing attack mitigation |
| [#530](https://github.com/nullclaw/nullclaw/pull/530) | Persist runtime slash settings across session restores | Fixes [#525](https://github.com/nullclaw/nullclaw/issues/525) |
| [#562](https://github.com/nullclaw/nullclaw/pull/562) | Dead code removal from std.http migration | Codebase cleanup per [#518](https://github.com/nullclaw/nullclaw/issues/518) |
| [#560](https://github.com/nullclaw/nullclaw/pull/560) | Remove dead std.http migration helpers | Completion of HTTP stack transition |
| [#543](https://github.com/nullclaw/nullclaw/pull/543) | Explicit redaction buffer ownership | Memory safety fix |
| [#526](https://github.com/nullclaw/nullclaw/pull/526) | SSRF allowlist bypass + HTTPS-only enforcement | Fixes [#393](https://github.com/nullclaw/nullclaw/issues/393) and [#517](https://github.com/nullclaw/nullclaw/issues/517) |
| [#528](https://github.com/nullclaw/nullclaw/pull/528) | Discord channel documentation | Community contribution addressing docs gap |
| [#567](https://github.com/nullclaw/nullclaw/pull/567) | MCP tools initialization in A2A sessions | Fixes silent MCP tool failures |
| [#570](https://github.com/nullclaw/nullclaw/pull/570) | Suppress orphan closing tool-call tag | UI polish — prevents markup leakage |
| [#524](https://github.com/nullclaw/nullclaw/pull/524) | Auto-discover Qwen-portal OAuth token | Provider parity with Gemini |
| [#515](https://github.com/nullclaw/nullclaw/pull/515) | Port conflict detection with graceful shutdown | Fixes [#514](https://github.com/nullclaw/nullclaw/issues/514) daemon hang |

**Technical Direction**: The project is consolidating around a **curl-based HTTP implementation** with hardened security boundaries, while expanding provider ecosystem coverage (Qwen, Moonshot, Z.ai/GLM).

---

## 4. Community Hot Topics

| Item | Activity | Analysis |
|:---|:---|:---|
| [#508](https://github.com/nullclaw/nullclaw/issues/508) — Subagents docs | 3 comments, 👍1 | **Resolved** via [#547](https://github.com/nullclaw/nullclaw/pull/547). Underlying need: users excited by subagent capability but blocked by discoverability. |
| [#192](https://github.com/nullclaw/nullclaw/issues/192) — Eliminate curl/wasmtime subprocess deps | 2 comments, 👍1, **still open since Mar 1** | Philosophical tension: core team prioritizing reliability (curl) vs. community desire for pure Zig. High-effort refactor; may signal long-term roadmap divergence. |
| [#427](https://github.com/nullclaw/nullclaw/issues/427) — Custom skill unavailable as tool | 1 comment, 👍0 | Active debugging scenario — user has done everything right per docs but tool registration failing. Indicates skill system UX papercuts. |
| [#473](https://github.com/nullclaw/nullclaw/issues/473) — README benchmark accuracy | 1 comment, 👍0 | Trust erosion risk: marketing claims (1MB binary, <1MB memory) diverging from reality. Needs immediate attention to maintain credibility. |

**Emerging Pattern**: Documentation lagging behind feature velocity. Users discovering capabilities through source code rather than guides.

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR |
|:---|:---|:---|:---|
| 🔴 **Critical** | [#569](https://github.com/nullclaw/nullclaw/issues/569) — Duplicate tool calls executed twice; Telegram leaks internal markup | **Closed** | [#572](https://github.com/nullclaw/nullclaw/pull/572) merged |
| 🔴 **Critical** | [#525](https://github.com/nullclaw/nullclaw/issues/525) — Bot forgets runtime settings (/reasoning, /verbose, /think) | **Closed** | [#530](https://github.com/nullclaw/nullclaw/pull/530) merged |
| 🟡 **High** | [#576](https://github.com/nullclaw/nullclaw/issues/576) — moonshot-intl provider fails with kimi-k2.5 (reasoning_content parsing) | **Open** — no fix yet | None |
| 🟡 **High** | [#514](https://github.com/nullclaw/nullclaw/issues/514) — Gateway silent failure on port conflict, daemon hangs | **Closed** | [#515](https://github.com/nullclaw/nullclaw/pull/515) merged |
| 🟡 **High** | [#565](https://github.com/nullclaw/nullclaw/issues/565) — WebSocket 1024-byte handshake limit breaks reverse proxy deployments | **Closed** | Likely fixed in underlying lib or config |
| 🟢 **Medium** | [#427](https://github.com/nullclaw/nullclaw/issues/427) — Custom skill tool registration failure | **Open** | None |
| 🟢 **Medium** | [#503](https://github.com/nullclaw/nullclaw/issues/503) — Telegram voice/file attachments ignored | **Closed** | [#548](https://github.com/nullclaw/nullclaw/pull/548) merged |
| 🟢 **Medium** | [#506](https://github.com/nullclaw/nullclaw/issues/506) — "Network error" with no diagnostics | **Closed** | [#561](https://github.com/nullclaw/nullclaw/pull/561) merged |

**Stability Assessment**: Rapid bug turnaround with same-day fixes for critical issues. The [#576](https://github.com/nullclaw/nullclaw/issues/576) moonshot-intl parsing bug is the **only unaddressed high-severity item** — suggests provider response format evolution not yet handled.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue/PR | Likelihood in Next Release |
|:---|:---|:---|
| **Hot reload for config and skills** | [#571](https://github.com/nullclaw/nullclaw/pull/571) — **OPEN** | 🔥 **High** — PR exists, major UX win |
| **Subagent skill injection** | [#558](https://github.com/nullclaw/nullclaw/pull/558) — **OPEN** | 🔥 **High** — PR exists, fixes delegation gap |
| **Configurable HTTP timeout** | [#541](https://github.com/nullclaw/nullclaw/pull/541) — **OPEN** | 🔥 **High** — PR exists, production necessity |
| **Z.ai/GLM-5 native tools** | [#575](https://github.com/nullclaw/nullclaw/issues/575) | 🟡 **Medium** — Hardcoded `native_tools=false` needs provider-specific work |
| **Claim-gated per-peer auto-provision** | [#297](https://github.com/nullclaw/nullclaw/pull/297) — **OPEN since Mar 4** | 🟡 **Medium** — Complex feature, may need more bake time |
| **Remove curl/wasmtime dependencies** | [#192](https://github.com/nullclaw/nullclaw/issues/192) | 🟢 **Low** — Contradicts current technical direction |

**Predicted vNext Highlights**: Hot reload, subagent skill inheritance, and HTTP timeout configurability form a coherent "production hardening" theme.

---

## 7. User Feedback Summary

### Pain Points
| Issue | Frequency | Emotional Tone |
|:---|:---|:---|
| Documentation gaps (WhatsApp, subagents, channels) | Recurring | Frustrated — "check sourcecode" as last resort |
| Configuration complexity | Moderate | Confused — onboarding flow overwrites settings |
| Marketing/accuracy disconnect | Single but sharp | Skeptical — benchmark claims vs. reality |
| Silent failures | Multiple instances | Anxious — daemon hangs, "network error" without context |

### Positive Signals
- **Subagent feature enthusiasm**: [#508](https://github.com/nullclaw/nullclaw/issues/508) shows genuine excitement for capability
- **Security appreciation**: Users reporting vulnerabilities responsibly ([#516](https://github.com/nullclaw/nullclaw/issues/516), [#517](https://github.com/nullclaw/nullclaw/issues/517))
- **Provider diversity demand**: Active requests for Qwen, Moonshot, GLM integration

### Use Case Evolution
Users deploying NullClaw in **containerized/self-hosted environments** with complex networking (reverse proxies, internal services) — driving need for SSRF flexibility, WebSocket buffer sizing, and clear error diagnostics.

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#192](https://github.com/nullclaw/nullclaw/issues/192) — Eliminate subprocess dependencies | 15 days | Community tension | Maintainer decision: document "wontfix" or roadmap |
| [#297](https://github.com/nullclaw/nullclaw/pull/297) — Claim-gated per-peer auto-provision | 12 days | Bitrot risk | Review/merge or close with explanation |
| [#427](https://github.com/nullclaw/nullclaw/issues/427) — Custom skill unavailable | 5 days | User blocked | Repro assistance or skill system refactor |
| [#473](https://github.com/nullclaw/nullclaw/issues/473) — README accuracy | 3 days | Credibility | Immediate benchmark verification update |
| [#574](https://github.com/nullclaw/nullclaw/issues/574) — WhatsApp documentation | 1 day | Onboarding friction | Community or maintainer docs PR |

**Maintainer Attention Priority**: [#473](https://github.com/nullclaw/nullclaw/issues/473) README accuracy is highest-leverage fix for project credibility. [#192](https://github.com/nullclaw/nullclaw/issues/192) requires architectural clarity to prevent community drift.

---

*Digest generated from 50 PRs and 21 issues across 24-hour period ending 2026-03-16.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-03-16

## 1. Today's Overview

IronClaw saw **exceptionally high activity** with 50 PRs and 26 issues updated in 24 hours, indicating an active development sprint focused on reliability engineering and production hardening. The project is in a **stabilization phase** with zero new releases but extensive CI/safety infrastructure work. A striking pattern: @ilblackdragon filed **12 enhancement issues in a single day** targeting formal verification, chaos testing, and coverage gates—signaling a "Mars-rover reliability" initiative. Community contributions remain strong with 7 merged PRs addressing security, compilation fixes, and documentation. The Slack tool installation failure (#1205) and Feishu compilation error (#1200, now fixed) suggest WASM channel tooling needs attention.

---

## 2. Releases

**No new releases** (v0.x.x remains current).

---

## 3. Project Progress

### Merged/Closed PRs Today (7 items)

| PR | Author | Summary | Impact |
|:---|:---|:---|:---|
| [#1204](https://github.com/nearai/ironclaw/pull/1204) | @reidliu41 | **Fixed Feishu/Lark WASM channel compilation** — resolved WIT binding mismatches, export macro, HTTP body types | Unblocks Feishu users; closes [#1200](https://github.com/nearai/ironclaw/issues/1200) |
| [#1190](https://github.com/nearai/ironclaw/pull/1190) | @reidliu41 | **Adversarial safety tests** — 100KB+ regex backtracking stress tests, Unicode edge cases, control char fuzzing | Closes [#1025](https://github.com/nearai/ironclaw/issues/1025); hardens `ironclaw_safety` |
| [#1195](https://github.com/nearai/ironclaw/pull/1195) | @ilblackdragon | **Security fix: prevent metadata spoofing** of internal job monitor flag via `is_internal` field | Eliminates privilege escalation vector |
| [#1194](https://github.com/nearai/ironclaw/pull/1194) | @ilblackdragon | **Security fix: default webhook to loopback** when tunnel active | Reduces attack surface for tunnel users |
| [#1209](https://github.com/nearai/ironclaw/pull/1209) | @octo-patch | **Docs: add MiniMax to README** provider lists | Documentation parity |
| [#1056](https://github.com/nearai/ironclaw/issues/1056) | — | *(closed as resolved)* Agent interactive-while-blocked on auth dialog | UX polish |
| [#1057](https://github.com/nearai/ironclaw/issues/1057) | — | *(closed as resolved)* Auth success/failure confusion with empty token | UX polish |
| [#1059](https://github.com/nearai/ironclaw/issues/1059) | — | *(closed as resolved)* Copied chat text white-on-white | UI fix |
| [#1139](https://github.com/nearai/ironclaw/issues/1139) | @micsama | *(closed)* Safari IME Enter key triggers premature send | CJK input fix |
| [#1141](https://github.com/nearai/ironclaw/issues/1141) | @ironclaw-ci[bot] | *(closed)* OAuth error storage as String not AuthError | Type safety fix |

**Key Advances:**
- **Security posture strengthened**: 2 security fixes merged (SSRF prevention in [#1221](https://github.com/nearai/ironclaw/pull/1221) pending, metadata spoofing fixed)
- **WASM channel reliability**: Feishu unblocked, pattern established for WIT binding maintenance
- **Safety infrastructure**: Adversarial test suite now protects against ReDoS and Unicode bypasses

---

## 4. Community Hot Topics

| Item | Activity | Analysis |
|:---|:---|:---|
| [#80](https://github.com/nearai/ironclaw/issues/80) — Multi-provider LLM support | 3 comments, P1-P3 priority | **Long-standing roadmap item**; demand for Ollama (local inference) is community-driven. Auto-discovery and failover are production readiness signals. |
| [#1205](https://github.com/nearai/ironclaw/issues/1205) — Slack tool fails to install | 1 comment, reported today | **Active breakage**: 404 on `slack-tool-wasm32-wasip2.tar.gz` suggests release artifact naming mismatch or missing build. |
| [#1210](https://github.com/nearai/ironclaw/pull/1210) — Refactor: extract init logic from wizard | XL size, high risk, core contributor | **Architectural debt payment**; enables headless/setup automation. Blocking for CI/testing improvements. |
| [#927](https://github.com/nearai/ironclaw/pull/927) — Chat onboarding and routine advisor | XL size, high risk, multi-scope | **Major UX refactor**; replaces interactive onboarding with LLM-driven profiling. High merge complexity. |
| [#1151](https://github.com/nearai/ironclaw/pull/1151) — Owner scope refactor | XL size, high risk, 7 scopes | **Critical consistency fix** for cross-channel data ownership. Addresses root cause of #994. |

**Underlying Needs:**
- **Local/edge deployment**: Ollama support (#80) + workspace snapshots (#1198) = air-gapped/disaster recovery use cases
- **Operational maturity**: The 12 reliability issues filed today reveal production deployment anxiety

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR |
|:---|:---|:---|:---|
| **HIGH** | [#1205](https://github.com/nearai/ironclaw/issues/1205) Slack tool 404 install failure | **OPEN**, reported 2026-03-15 | None yet |
| **MEDIUM** | [#1211](https://github.com/nearai/ironclaw/pull/1211) Event triggers never fire (case-sensitivity, user_id filter) | **FIX PENDING** | [#1211](https://github.com/nearai/ironclaw/pull/1211) |
| **MEDIUM** | [#1208](https://github.com/nearai/ironclaw/pull/1208) Image-only messages rejected by safety validation | **FIX PENDING** | [#1208](https://github.com/nearai/ironclaw/pull/1208) |
| **MEDIUM** | [#1213](https://github.com/nearai/ironclaw/pull/1213) Anthropic OAuth token not persisted after refresh | **FIX PENDING** | [#1213](https://github.com/nearai/ironclaw/pull/1213) |
| **MEDIUM** | [#1221](https://github.com/nearai/ironclaw/pull/1221) SSRF via unvalidated embedding base URLs | **FIX PENDING** | [#1221](https://github.com/nearai/ironclaw/pull/1221) |
| **LOW** | [#1200](https://github.com/nearai/ironclaw/issues/1200) Feishu compilation | **CLOSED** | [#1204](https://github.com/nearai/ironclaw/pull/1204) |

**Regression Risk**: The Slack tool 404 is a **release pipeline issue**—likely affects all WASM tool releases. Requires immediate CI artifact inspection.

---

## 6. Feature Requests & Roadmap Signals

### Likely Next Version (v0.x.0)

| Issue | Signal Strength | Rationale |
|:---|:---|:---|
| [#80](https://github.com/nearai/ironclaw/issues/80) Multi-provider LLM | **HIGH** | Long tenure, P1 priority for Ollama, community demand |
| [#1214](https://github.com/nearai/ironclaw/issues/1214) Property-based testing | **HIGH** | Infrastructure enabler; @ilblackdragon filed dependent issues (#1227, #1229) same day |
| [#1198](https://github.com/nearai/ironclaw/pull/1198) Workspace snapshot/hydration | **MEDIUM-HIGH** | PR open, disaster recovery use case |

### Reliability Initiative (12 issues filed 2026-03-15)

| Issue | Category | Production Readiness |
|:---|:---|:---|
| [#1225](https://github.com/nearai/ironclaw/issues/1225) TLA+ specifications | Formal verification | Aerospace-grade |
| [#1226](https://github.com/nearai/ironclaw/issues/1226) Kani bounded model checking | Static analysis | Safety-critical |
| [#1222](https://github.com/nearai/ironclaw/issues/1222) Chaos test scenarios | Resilience testing | Cloud-native |
| [#1216](https://github.com/nearai/ironclaw/issues/1216) Mutation testing | Test quality | Mature engineering |

**Prediction**: IronClaw is positioning for **enterprise/production GA**. The reliability sprint suggests a v1.0 or "production-ready" announcement timeline.

---

## 7. User Feedback Summary

### Pain Points

| Issue | User | Context |
|:---|:---|:---|
| Slack tool 404 | @kristiandupont | Extension installation blocked |
| Safari IME CJK input | @micsama | East Asian users affected |
| Auth UX confusion | @henrypark133 | "Success → failure" sequence in Telegram setup |
| Copied text invisible | @henrypark133 | Dark-theme to light-background workflow breakage |

### Positive Signals

- **Community contribution quality**: @reidliu41 (experienced contributor) delivered safety tests and Feishu fix
- **Undocumented patterns shared**: @111blackeagle111 documented custom Telegram commands via event triggers (#1189)

### Use Case Emergence

- **Forum/topic support**: [#1199](https://github.com/nearai/ironclaw/pull/1199) adds Telegram forum routing—community management at scale
- **Custom command scripting**: #1189 pattern shows power users building automation on event triggers

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#80](https://github.com/nearai/ironclaw/issues/80) Multi-provider LLM | ~1 month | Stagnation | Provider priority clarification; Ollama subtask assignable |
| [#712](https://github.com/nearai/ironclaw/pull/712) Self-repair stuck_threshold | ~1 week | Merge conflict | Rebase and merge; closes #647 |
| [#927](https://github.com/nearai/ironclaw/pull/927) Chat onboarding | ~4 days | Bitrot | XL PR needs review bandwidth |
| [#1151](https://github.com/nearai/ironclaw/pull/1151) Owner scope refactor | ~2 days | High complexity | Cross-channel testing; blocks related fixes |

**Maintainer Attention**: The 12 reliability issues filed by @ilblackdragon need triage—some may be "good first issue" candidates (e.g., [#1228](https://github.com/nearai/ironclaw/issues/1228) codecov.yml, [#1215](https://github.com/nearai/ironclaw/issues/1215) debug_assert additions).

---

*Digest generated from 50 PRs and 26 issues updated 2026-03-15.*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-03-16

## 1. Today's Overview

LobsterAI shows **high development velocity** with 17 PRs updated in the last 24 hours (15 merged/closed, 2 open) and 3 active issues. The project appears to be undergoing a **significant architectural transition**, with evidence of engine migration from Claude Agent SDK to OpenClaw surfacing in both code changes and community questions. Core contributors @fisherdaddy and @liuzhq1986 are driving rapid iteration on MCP functionality, scheduled tasks, and IM channel stability. However, **user-reported instability** in sandbox environments, skill marketplace, and task execution speed suggests growing pains during this transition. No new releases were cut today despite the substantial merge activity.

---

## 2. Releases

**No new releases** (v0.x.x remains current).

---

## 3. Project Progress

### Merged/Closed PRs (15 items)

| PR | Author | Focus Area | Key Change |
|:---|:---|:---|:---|
| [#433](https://github.com/netease-youdao/LobsterAI/pull/433) | @fisherdaddy | System Prompts | Fixed `agents.md` being overwritten by system prompt |
| [#432](https://github.com/netease-youdao/LobsterAI/pull/432) | @fisherdaddy | **MCP** | **Fixed MCP unavailable issue** — critical infrastructure fix |
| [#431](https://github.com/netease-youdao/LobsterAI/pull/431) | @fisherdaddy | Scheduled Tasks | DingTalk delivery routing, channel history sync with tail-overlap reconciliation |
| [#430](https://github.com/netease-youdao/LobsterAI/pull/430) | @liuzhq1986 | Agent Identity | Default templates for agent persona; UI fix for recent folders menu |
| [#427](https://github.com/netease-youdao/LobsterAI/pull/427) | @liuzhq1986 | IM Channels | Fixed user message loss in WeCom/IM channels |
| [#426](https://github.com/netease-youdao/LobsterAI/pull/426) | @fisherdaddy | IM Performance | Reduced channel message sync delay |
| [#425](https://github.com/netease-youdao/LobsterAI/pull/425) | @fisherdaddy | Platform Startup | Batched OpenClaw startup to prevent gateway restart loops |
| [#423](https://github.com/netease-youdao/LobsterAI/pull/423) | @fisherdaddy | Scheduled Tasks | Fixed cron tasks failing in cowork & IM contexts |
| [#393](https://github.com/netease-youdao/LobsterAI/pull/393) | @fisherdaddy | IM Stability | Fixed connectivity test bug causing channel issues |
| [#396](https://github.com/netease-youdao/LobsterAI/pull/396) | @fisherdaddy | App Lifecycle | Fixed infinite loading on startup |
| [#422](https://github.com/netease-youdao/LobsterAI/pull/422) | @fisherdaddy | Revert | Reverted #421 (cowork & im cron) — indicates regression |
| [#421](https://github.com/netease-youdao/LobsterAI/pull/421) | @fisherdaddy | (Reverted) | — |
| [#420](https://github.com/netease-youdao/LobsterAI/pull/420) | @liuzhq1986 | WeCom | — |
| [#424](https://github.com/netease-youdao/LobsterAI/pull/424) | @liuzhq1986 | WeCom | — |
| [#403](https://github.com/netease-youdao/LobsterAI/pull/403) | @liuzhq1986 | **Architecture** | **Removed built-in sandbox; merged prompts with OpenClaw defaults** |

**Key Pattern**: Heavy focus on **OpenClaw integration**, **MCP stability**, and **IM channel reliability** (DingTalk, WeCom). The sandbox removal (#403) and prompt merging confirms architectural consolidation around OpenClaw.

---

## 4. Community Hot Topics

| Issue/PR | Activity | Analysis |
|:---|:---|:---|
| [#417](https://github.com/netease-youdao/LobsterAI/issues/417) | 1 comment, detailed bug report | **Most significant user feedback** — comprehensive critique of Win11 sandbox failure, browser automation non-functionality, slow task execution vs. OpenClaw/Alibaba alternatives, missing foreign IM support, broken skill marketplace (Google Banana image gen without API key config). Signals **core product-market fit concerns** during transition. |
| [#418](https://github.com/netease-youdao/LobsterAI/issues/418) | 0 comments, but strategically critical | User detected OpenClaw engine transition from branch analysis; questions Claude SDK cowork maintenance and "uncontrollability" as rationale. **Needs official response** — transparency gap around roadmap. |
| [#419](https://github.com/netease-youdao/LobsterAI/issues/419) | 0 comments | Documentation gap for MCP configuration — correlates with #432 fix, suggesting users struggling with undocumented/buggy feature. |

**Underlying Needs**: 
- **Stability assurance** during engine migration (#417, #418)
- **Documentation parity** with feature development (#419)
- **Clear migration path** for existing Claude SDK users

---

## 5. Bugs & Stability

| Severity | Issue/PR | Description | Fix Status |
|:---|:---|:---|:---|
| 🔴 **Critical** | [#417](https://github.com/netease-youdao/LobsterAI/issues/417) | Sandbox installation fails on Win11; complete local automation non-functional; task execution severely degraded vs. competitors | **Unfixed** — no PR linked |
| 🔴 **Critical** | [#432](https://github.com/netease-youdao/LobsterAI/pull/432) | MCP unavailable (system-level breakage) | **Fixed** — merged today |
| 🟡 **High** | [#427](https://github.com/netease-youdao/LobsterAI/pull/427), [#426](https://github.com/netease-youdao/LobsterAI/pull/426) | IM message loss and sync delays | **Fixed** — merged today |
| 🟡 **High** | [#421](https://github.com/netease-youdao/LobsterAI/pull/421) → [#422](https://github.com/netease-youdao/LobsterAI/pull/422) | Cron fix caused regression, required revert | **Mitigated** — watch for follow-up |
| 🟢 **Medium** | [#433](https://github.com/netease-youdao/LobsterAI/pull/433) | `agents.md` prompt overwriting | **Fixed** — merged today |
| 🟢 **Medium** | [#429](https://github.com/netease-youdao/LobsterAI/pull/429) *(open)* | Chinese character corruption in `workingDirectory` via encoding detection heuristic | **Pending** — open PR with fix |

**Stability Assessment**: Rapid fixes for infrastructure (MCP, IM, startup) suggest responsive maintenance, but **#417's comprehensive failure report** indicates systemic quality issues in user-facing features. The revert chain (#421→#422) shows deployment risk in scheduled task functionality.

---

## 6. Feature Requests & Roadmap Signals

| Source | Request | Likelihood in Next Release |
|:---|:---|:---|
| [#428](https://github.com/netease-youdao/LobsterAI/pull/428) *(open)* | **LM Studio provider support** — local OpenAI-compatible API | **High** — complete PR ready, follows Ollama pattern |
| [#429](https://github.com/netease-youdao/LobsterAI/pull/429) *(open)* | UTF-8/gb18030 encoding fix for Chinese paths | **High** — targeted fix, Windows-specific |
| [#419](https://github.com/netease-youdao/LobsterAI/issues/419) | MCP configuration documentation | **Medium** — docs often lag features |
| [#417](https://github.com/netease-youdao/LobsterAI/issues/417) | Foreign IM support (Discord, Slack, Telegram, etc.) | **Unclear** — no signals in PRs; may conflict with China-focused product strategy |
| [#417](https://github.com/netease-youdao/LobsterAI/issues/417) | Skill marketplace API key configuration UX | **Medium** — requires marketplace redesign |

**Engine Transition Signal**: The #403 sandbox removal + prompt merging + #418's observation strongly suggests **OpenClaw becoming the sole supported engine**. Claude SDK "cowork" mode likely enters maintenance mode or deprecation.

---

## 7. User Feedback Summary

### Pain Points (from [#417](https://github.com/netease-youdao/LobsterAI/issues/417))
| Category | Specific Complaint | Severity |
|:---|:---|:---|
| **Sandbox** | Win11 installation fails, cannot enable | Blocking |
| **Automation** | Browser MCP installed but cannot control Chrome | Blocking |
| **Performance** | PPT creation fails; "much slower than OpenClaw and Alibaba Lobster" | Critical |
| **Skills** | Google Banana image gen installs but lacks API key config; "suspect official team never tested" | High |
| **IM** | No foreign IM configuration (Discord, Slack, etc.) | High (for international users) |

### Satisfaction Indicators
- **Negative**: No successful task completions reported by this user; explicit comparison to competitors favoring alternatives
- **Positive**: User invested enough time to test extensively and file detailed report (engagement signal)

### Use Case Gaps
- **Cross-border workflows**: Foreign IM exclusion limits adoption outside China
- **Skill marketplace trust**: API key configuration missing suggests insufficient QA for third-party integrations

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#418](https://github.com/netease-youdao/LobsterAI/issues/418) | 1 day | **High** — strategic roadmap question | Official maintainer response on OpenClaw transition plan and Claude SDK deprecation timeline |
| [#417](https://github.com/netease-youdao/LobsterAI/issues/417) | 1 day | **High** — comprehensive failure report | Triage and assign; may need multiple follow-up fixes; consider hotfix release |
| [#419](https://github.com/netease-youdao/LobsterAI/issues/419) | 1 day | Medium | Documentation team assignment or community PR welcome |

**Maintainer Attention**: The project would benefit from:
1. **Public roadmap clarification** responding to #418
2. **Win11 sandbox deep-dive** addressing #417's blocking issues
3. **Release cadence** — 15 merges without release suggests accumulated changes need validation

---

*Digest generated from GitHub activity 2026-03-15 to 2026-03-16. Data source: netease-youdao/LobsterAI*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

# TinyClaw Project Digest — 2026-03-16

## 1. Today's Overview

TinyClaw shows **moderate development velocity** with 6 PRs updated in the past 24 hours (4 open, 2 merged/closed) and zero active issues. The project demonstrates healthy contributor engagement from multiple developers (@jlia0, @jcenters, @RomuloGatto), with work spanning CLI polish, provider expansion, and critical reliability fixes. No new releases were published. The absence of open issues suggests either effective issue triage or underreporting, while the PR backlog indicates active feature development awaiting review. Overall project health appears **stable with forward momentum** in core infrastructure areas.

---

## 2. Releases

**No new releases** — Version remains unchanged from previous release.

---

## 3. Project Progress

### Merged/Closed Today

| PR | Description | Impact |
|:---|:---|:---|
| [#215](https://github.com/TinyAGI/tinyclaw/pull/215) | **feat(agents): add system prompt option when creating agents** | Enables custom agent instructions at provisioning time via CLI/API; writes to `AGENTS.md` |
| [#216](https://github.com/TinyAGI/tinyclaw/pull/216) | **feat(cli): add TINYAGI ASCII banner to CLI** | Branding/UX improvement for CLI interactions and daemon status flows |

**Key Advancements:**
- **Agent customization**: System prompt injection closes a gap in agent personalization workflows
- **CLI identity**: Establishes visual brand presence in terminal interfaces

---

## 4. Community Hot Topics

| PR | Activity | Analysis |
|:---|:---|:---|
| [#219](https://github.com/TinyAGI/tinyclaw/pull/219) | **Critical reliability fix** — daemon restart validation | Underlying need: **Operational safety** — prevents configuration errors from causing total service outage |
| [#218](https://github.com/TinyAGI/tinyclaw/pull/218) | **Process hygiene fix** — 5-min timeout for stuck agents | Underlying need: **Production stability** — addresses hung LLM processes (Claude/Codex/OpenCode) consuming resources indefinitely |
| [#214](https://github.com/TinyAGI/tinyclaw/pull/214) | **Web-first setup experience** | Underlying need: **Lowered barrier to entry** — enables headless/API-first deployment with browser-based configuration |
| [#217](https://github.com/TinyAGI/tinyclaw/pull/217) | **Google Gemini provider support** | Underlying need: **Multi-provider flexibility** — reduces vendor lock-in, expands model options |

**Consensus signal**: Strong prioritization of **reliability engineering** (#218, #219) alongside **accessibility improvements** (#214) and **ecosystem expansion** (#217).

---

## 5. Bugs & Stability

| Severity | Issue/PR | Description | Fix Status |
|:---|:---|:---|:---|
| **Critical** | [#219](https://github.com/TinyAGI/tinyclaw/pull/219) | Daemon restart kills active session before validating new `settings.json`; broken config = silent total failure | **Fix PR open** |
| **High** | [#218](https://github.com/TinyAGI/tinyclaw/pull/218) | Hung agent processes never terminated; stale messages infinitely re-queued, resource exhaustion | **Fix PR open** |

**Stability Assessment**: Two production-critical reliability gaps identified and actively patched. Both fixes target **state management failures** (configuration validation, process lifecycle). Recommend expedited review for #218 and #219.

---

## 6. Feature Requests & Roadmap Signals

| Signal | Source | Likelihood in Next Version |
|:---|:---|:---|
| **Web-based onboarding** | [#214](https://github.com/TinyAGI/tinyclaw/pull/214) | **High** — `--skip-setup` flag + TinyOffice `/connect` page complete the loop |
| **Google Gemini integration** | [#217](https://github.com/TinyAGI/tinyclaw/pull/217) | **High** — Provider scaffold exists, needs review |
| **Agent system prompts** | [#215](https://github.com/TinyAGI/tinyclaw/pull/215) | **Shipped** |
| **CLI visual identity** | [#216](https://github.com/TinyAGI/tinyclaw/pull/216) | **Shipped** |

**Emerging pattern**: Shift toward **deployment flexibility** (web setup, API-only mode) and **enterprise-grade reliability** (timeout handling, config validation). Suggests maturation beyond MVP toward production workloads.

---

## 7. User Feedback Summary

**Inferred pain points** (from PR descriptions):

| Pain Point | Evidence | Severity |
|:---|:---|:---|
| **Silent failures on misconfiguration** | #219: "failed silently — leaving nothing running" | Critical |
| **Runaway resource consumption** | #218: "process keeps getting re-queued" | High |
| **Setup friction for non-technical users** | #214: web-based setup motivation | Medium |
| **Limited provider options** | #217: Gemini addition | Medium |

**Satisfaction indicators**: Proactive fixes for edge cases suggest responsive maintainership. No explicit negative feedback in dataset.

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#217](https://github.com/TinyAGI/tinyclaw/pull/217) Gemini support | 2 days | **Medium** — provider diversity competitive pressure | Maintainer review for model registry integration |
| [#214](https://github.com/TinyAGI/tinyclaw/pull/214) Web setup | 2 days | **Low** — feature-complete, needs UX validation | Final review, merge for next minor release |
| [#218](https://github.com/TinyAGI/tinyclaw/pull/218) + [#219](https://github.com/TinyAGI/tinyclaw/pull/219) Reliability fixes | 1 day | **High** — unmerged critical fixes | **Expedited review recommended** |

**Maintainer attention priority**: #218 and #219 address production stability; delay risks operational incidents for users.

---

*Digest generated from GitHub activity 2026-03-15 to 2026-03-16*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-03-16

## 1. Today's Overview

Moltis shows **moderate development velocity** with 7 PRs and 5 issues touched in the last 24 hours, though no new releases were cut. The project appears focused on **stability and platform compatibility** rather than major feature launches—three bugs were closed, including two browser-related session management issues. Windows compatibility emerged as an active concern with a critical file-locking fix in review. The maintainers are responsive: all three closed issues and both merged PRs received same-day updates, suggesting healthy triage cadence.

---

## 2. Releases

**No new releases** — Version unchanged.

---

## 3. Project Progress

### Merged/Closed PRs (2 items)

| PR | Author | Summary | Impact |
|:---|:---|:---|:---|
| [#403](https://github.com/moltis-org/moltis/pull/403) | @penso | **fix(browser): align sandbox browserless timeout with pool lifecycle** | Resolves container-level timeout mismatches in sandboxed browser sessions; derives timeout from Moltis lifecycle settings |
| [#412](https://github.com/moltis-org/moltis/pull/412) | @penso | **fix(browser): scope cached browser sessions per chat** | Closes [#202](https://github.com/moltis-org/moltis/issues/202); isolates browser state between chat sessions to prevent stale session inheritance |

**Key advancement:** Browser tooling received surgical fixes for session lifecycle management—critical for multi-tenant reliability.

---

## 4. Community Hot Topics

| Item | Activity | Analysis |
|:---|:---|:---|
| [#346](https://github.com/moltis-org/moltis/issues/346) | 4 comments, closed | Docker node addition failures—**deployment friction** in containerized environments; resolution suggests docs or config gaps |
| [#437](https://github.com/moltis-org/moltis/issues/437) | 2 comments, **OPEN** | "Reasoning" expandable UI dominates channel responses—**UX regression in chat output formatting**; affects Channels specifically |
| [#172](https://github.com/moltis-org/moltis/issues/172) | 2 comments, closed | Browser unresponsiveness/timeouts—core stability concern, now resolved |

**Underlying needs:** Users need **predictable Docker deployments** and **clean chat output formatting** without UI elements overwhelming functional responses. The Channels-specific bug suggests multi-modal output handling needs refinement.

---

## 5. Bugs & Stability

| Severity | Issue/PR | Status | Details | Fix Available? |
|:---|:---|:---|:---|:---|
| 🔴 **Critical** | [#436](https://github.com/moltis-org/moltis/pull/436) | OPEN PR | Windows file locking (`LockFileEx os error 5`) blocks session persistence; root cause: Rust `append(true)` strips `FILE_WRITE_DATA` | ✅ **Fix in review** by @vanduc2514 |
| 🟡 **High** | [#437](https://github.com/moltis-org/moltis/issues/437) | OPEN | Chat responses collapsed to "Reasoning" expandable only—functional output suppressed | ❌ No PR yet |
| 🟢 **Resolved** | [#346](https://github.com/moltis-org/moltis/issues/346) | CLOSED | Docker node addition failure | ✅ Fixed |
| 🟢 **Resolved** | [#172](https://github.com/moltis-org/moltis/issues/172) | CLOSED | Browser timeout/unresponsiveness | ✅ Fixed via [#403](https://github.com/moltis-org/moltis/pull/403) |
| 🟢 **Resolved** | [#202](https://github.com/moltis-org/moltis/issues/202) | CLOSED | Browser session collision between chats | ✅ Fixed via [#412](https://github.com/moltis-org/moltis/pull/412) |

**Platform parity alert:** Windows-specific bug (#436) indicates cross-platform testing gaps in file I/O paths.

---

## 6. Feature Requests & Roadmap Signals

| PR/Issue | Type | Prediction |
|:---|:---|:---|
| [#413](https://github.com/moltis-org/moltis/pull/413) | **Agent sidecar files** (opt-in skill extensions) | Likely **v-next**; security-gated with audit logging—aligns with agent autonomy trends |
| [#439](https://github.com/moltis-org/moltis/pull/439) | **MCP server display names** | UX polish, **likely v-next**; low risk, high user value |
| [#440](https://github.com/moltis-org/moltis/pull/440) | **Heartbeat cron fixes** | **Merge imminent**; fixes broken feature, same-day PR |
| [#441](https://github.com/moltis-org/moltis/issues/441) | **CSS path DX improvement** | Developer experience; may backlog unless contributor emerges |
| [#432](https://github.com/moltis-org/moltis/pull/432) | **Conditional exec node parameter** | **Likely v-next**; prevents LLM hallucination in node selection |

**Roadmap signal:** Strong emphasis on **MCP (Model Context Protocol) ecosystem** (#439) and **agent-extensible skills** (#413)—positioning Moltis as an open agent platform rather than closed assistant.

---

## 7. User Feedback Summary

| Pain Point | Evidence | Satisfaction Indicator |
|:---|:---|:---|
| **Windows compatibility** | #436 (file locks), #441 (Cargo build paths) | 😞 Frustrated—platform treated as second-class |
| **Browser reliability** | #172, #202, #403, #412 | 😊 **Improving**—rapid fixes show responsiveness |
| **Docker deployment friction** | #346 | 😐 Neutral—resolved but required issue filing |
| **Chat output quality** | #437 (Reasoning UI overload) | 😞 **Active frustration**—Channels unusable |
| **LLM tool hallucination** | #432 (exec node parameter) | 😐 Workaround in progress |

**Use case insight:** Users deploy Moltis in **multi-session, multi-tenant environments** (browser isolation critical) and **containerized infrastructure** (Docker/Kubernetes). The "Reasoning" UI bug suggests power users want **raw output control**, not polished collapsibles.

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#437](https://github.com/moltis-org/moltis/issues/437) | 2 days | 🔴 **High**—Channels feature degraded | Maintainer triage; UI/UX owner assignment |
| [#441](https://github.com/moltis-org/moltis/issues/441) | 1 day | 🟡 Medium—DX barrier for Rust contributors | Response acknowledging complexity or workaround |
| [#432](https://github.com/moltis-org/moltis/pull/432) | 3 days | 🟡 Medium—prevents LLM errors | Review from tools/LLM integration owner |

**No stale critical items**—project maintains <3-day response on active issues. Recommend prioritizing #437 for user retention in Channels use case.

---

*Digest generated from github.com/moltis-org/moltis activity 2026-03-15*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-03-16

## 1. Today's Overview

CoPaw shows **high community activity** with 38 issues and 35 PRs updated in the last 24 hours, indicating a rapidly maturing AI agent platform. The project is experiencing **significant channel integration growing pains**, particularly with Feishu, QQ, DingTalk, and Telegram, alongside core stability issues with tool execution and memory management. No new releases were published today, but active development suggests a patch release may be imminent. The contributor base is expanding with multiple first-time contributors landing PRs. Overall project health is **moderate-to-good** with strong engagement but accumulating technical debt in channel reliability.

---

## 2. Releases

**No new releases** (v0.0.7.post1 remains current).

---

## 3. Project Progress

### Merged/Closed PRs Today (6 total)

| PR | Description | Impact |
|:---|:---|:---|
| [#1529](https://github.com/agentscope-ai/CoPaw/pull/1529) | Fix: Include security guard rules in package data | **Critical fix** — resolves [#1519](https://github.com/agentscope-ai/CoPaw/issues/1519) where `dangerous_shell_commands.yaml` was missing from pip installs |
| [#1527](https://github.com/agentscope-ai/CoPaw/issues/1527) → closed via fix | WebUI model selection display improvement | UI/UX polish for model dropdown |
| [#1475](https://github.com/agentscope-ai/CoPaw/pull/1475) | Feature: Auto-reconnect polling for Telegram network failures | **Reliability** — addresses chronic Telegram disconnection issues |
| [#1432](https://github.com/agentscope-ai/CoPaw/pull/1432) | Fix: Inject UTC time context for cron timezone mismatch | **Stability** — fixes [#1346](https://github.com/agentscope-ai/CoPaw/issues/1346), weak models ignoring time tools |
| [#1524](https://github.com/agentscope-ai/CoPaw/pull/1524) | Fix: Handle `chunk.choices is None` edge case | Provider robustness |
| [#1210](https://github.com/agentscope-ai/CoPaw/pull/1210) | Fix: Telegram thread replies, media handling, error reporting | **Major channel reliability** — comprehensive Telegram improvements |

**Key Advances:**
- **Security packaging fixed** — pip installs now include critical safety rules
- **Telegram reliability substantially improved** with auto-reconnect and better media handling
- **Timezone/cron system stabilized** with UTC injection pattern

---

## 4. Community Hot Topics

### Most Active Issues

| Rank | Issue | Comments | Core Need |
|:---|:---|:---|:---|
| 1 | [#981](https://github.com/agentscope-ai/CoPaw/issues/981) — Feishu/QQ channels cannot send files | 13 | **Enterprise file sharing** — users need document/image delivery in workplace chat platforms |
| 2 | [#1345](https://github.com/agentscope-ai/CoPaw/issues/1345) — Feishu "delayed reply" bug (answers lag behind questions) | 6 | **Real-time conversation integrity** — critical for production Feishu deployments |
| 3 | [#1502](https://github.com/agentscope-ai/CoPaw/issues/1502) — Volcano Engine coding plan model "Answers have stopped" | 6 | **Model provider compatibility** — enterprise Chinese LLM integration |
| 4 | [#828](https://github.com/agentscope-ai/CoPaw/issues/828) — Tool use `input` parameter always empty | 6 | **Core agent functionality** — tool calling broken in recent builds |
| 5 | [#1488](https://github.com/agentscope-ai/CoPaw/issues/1488) — Docker environment hangs after 1 day of tasks | 5 | **Long-running stability** — memory/resource leak in containerized deployments |

### Most Active PRs

| PR | Focus | Significance |
|:---|:---|:---|
| [#1544](https://github.com/agentscope-ai/CoPaw/pull/1544) | **ACP (Agent Communication Protocol) support** | Strategic — positions CoPaw as IDE-integrable agent platform (Codex, Claude Code, OpenCode compatibility) |
| [#1192](https://github.com/agentscope-ai/CoPaw/pull/1192) | OpenRouter provider with model filtering | Ecosystem expansion — unified access to 100+ models |
| [#1476](https://github.com/agentscope-ai/CoPaw/pull/1476) | Voice message transcription with Local Whisper | **Multimodal milestone** — enables voice across all channels |
| [#1535](https://github.com/agentscope-ai/CoPaw/pull/1535) | User timezone configuration | Follow-up to UTC fix — user-facing timezone control |

**Underlying Needs Analysis:**
- **Enterprise China market dominance**: Feishu, QQ, DingTalk issues dominate — these are make-or-break for Chinese enterprise adoption
- **Multimodal expansion**: Voice, image, file handling becoming baseline expectations
- **Agent interoperability**: ACP protocol support signals ambition to be a hub in broader agent ecosystem

---

## 5. Bugs & Stability

### Critical (Data Loss / Function Broken)

| Issue | Description | Fix Status |
|:---|:---|:---|
| [#828](https://github.com/agentscope-ai/CoPaw/issues/828) | Tool `input` parameter empty — tools fail with missing arguments | **Workaround exists** (user patched `_react_agent`), root cause pending |
| [#1345](https://github.com/agentscope-ai/CoPaw/issues/1345) | Feishu delayed replies — bot answers wrong questions | No fix PR identified |
| [#1531](https://github.com/agentscope-ai/CoPaw/issues/1531) | Runtime crash: "Attempted to exit cancel scope in different task" — prevents restart | **No fix** — corruption in Windows venv state |

### High (Production Impact)

| Issue | Description | Fix Status |
|:---|:---|:---|
| [#1488](https://github.com/agentscope-ai/CoPaw/issues/1488) | Docker hangs after 24h — requires full restart | No fix; suggests resource leak |
| [#1502](https://github.com/agentscope-ai/CoPaw/issues/1502) | Volcano Engine model streaming stops mid-conversation | No fix |
| [#1528](https://github.com/agentscope-ai/CoPaw/issues/1528) | ReadTimeout on slow local models — hardcoded timeout too aggressive | No fix; config workaround needed |
| [#1533](https://github.com/agentscope-ai/CoPaw/issues/1533) | `install.sh` hangs on PyPI check — curl outputs excessive data | **Easy fix identified** — needs `--head` flag |

### Medium (UX / Feature Gaps)

| Issue | Description |
|:---|:---|
| [#1520](https://github.com/agentscope-ai/CoPaw/issues/1520) | Model selection dropdown truncated on macOS |
| [#1501](https://github.com/agentscope-ai/CoPaw/issues/1501) | Docker timezone cannot be modified |
| [#1534](https://github.com/agentscope-ai/CoPaw/issues/1534), [#1516](https://github.com/agentscope-ai/CoPaw/issues/1516) | Telegram voice messages broken |

---

## 6. Feature Requests & Roadmap Signals

### Likely Next Release (v0.0.8)

| Feature | Evidence | Confidence |
|:---|:---|:---|
| **ACP Protocol Support** | PR [#1544](https://github.com/agentscope-ai/CoPaw/pull/1544) active, aligns with [#1059](https://github.com/agentscope-ai/CoPaw/issues/1059) | **High** — strategic priority |
| **Voice/Audio transcription** | PR [#1476](https://github.com/agentscope-ai/CoPaw/pull/1476) complete with Local Whisper | **High** |
| **User timezone configuration** | PR [#1535](https://github.com/agentscope-ai/CoPaw/pull/1535) + [#1321](https://github.com/agentscope-ai/CoPaw/pull/1321) + [#1451](https://github.com/agentscope-ai/CoPaw/pull/1451) converging | **High** |
| **Gemini provider** | PR [#1507](https://github.com/agentscope-ai/CoPaw/pull/1507) | **Medium** |
| **OpenRouter provider** | PR [#1192](https://github.com/agentscope-ai/CoPaw/pull/1192) | **Medium** |
| **Skills Marketplace** | PR [#1530](https://github.com/agentscope-ai/CoPaw/pull/1530) | **Medium** — infrastructure heavy |

### Emerging Patterns (v0.0.9+)

| Request | Issue/PR | Signal Strength |
|:---|:---|:---|
| Per-agent model selection with failover | [#1537](https://github.com/agentscope-ai/CoPaw/issues/1537) | Strong — enterprise need |
| File upload in Web Console | [#1539](https://github.com/agentscope-ai/CoPaw/issues/1539) | Strong — multimodal baseline |
| Channel-specific task interruption | [#957](https://github.com/agentscope-ai/CoPaw/issues/957), [#1542](https://github.com/agentscope-ai/CoPaw/issues/1542) | Strong — operational necessity |
| Notifications panel in Console | [#1543](https://github.com/agentscope-ai/CoPaw/issues/1543) | Moderate |
| Nextcloud Talk channel | [#1478](https://github.com/agentscope-ai/CoPaw/pull/1478) | Moderate — self-hosted trend |

---

## 7. User Feedback Summary

### Pain Points (Explicit Complaints)

| Theme | Evidence | Severity |
|:---|:---|:---|
| **Feishu reliability crisis** | [#981](https://github.com/agentscope-ai/CoPaw/issues/981), [#1345](https://github.com/agentscope-ai/CoPaw/issues/1345), [#1540](https://github.com/agentscope-ai/CoPaw/issues/1540) | **Critical** — multiple enterprise users blocked |
| **Cannot stop runaway tasks** | [#957](https://github.com/agentscope-ai/CoPaw/issues/957), [#1542](https://github.com/agentscope-ai/CoPaw/issues/1542) | **High** — safety/operational issue |
| **Tool execution invisible** | [#1518](https://github.com/agentscope-ai/CoPaw/issues/1518) | **Medium** — UX gap |
| **Memory/context loss with local models** | [#1448](https://github.com/agentscope-ai/CoPaw/issues/1448) | **Medium** — Ollama/qwen3 users struggling |
| **Docker/production stability** | [#1488](https://github.com/agentscope-ai/CoPaw/issues/1488), [#1501](https://github.com/agentscope-ai/CoPaw/issues/1501) | **High** — deployment friction |

### Positive Signals

- **Strong multimodal demand**: Voice, image, file features actively requested
- **Enterprise integration appetite**: ACP protocol, multiple channel support
- **Active self-hosting**: Docker, local models, Nextcloud integration interest

### Use Case Evolution

Users are pushing CoPaw from **personal assistant** toward **team production agent** — requiring reliability, observability, and enterprise chat platform fidelity.

---

## 8. Backlog Watch

### Issues Needing Maintainer Attention (>7 days, high impact)

| Issue | Age | Risk |
|:---|:---|:---|
| [#981](https://github.com/agentscope-ai/CoPaw/issues/981) — Feishu/QQ file sending | 7 days | **Blocking enterprise adoption** — 13 comments, no maintainer response |
| [#828](https://github.com/agentscope-ai/CoPaw/issues/828) — Tool input empty | 9 days | Core functionality broken — user provided workaround, needs official fix |
| [#957](https://github.com/agentscope-ai/CoPaw/issues/957) — DingTalk stop command | 7 days | Safety feature — operational necessity |

### Stalled PRs

| PR | Status | Risk |
|:---|:---|:---|
| [#1192](https://github.com/agentscope-ai/CoPaw/pull/1192) — OpenRouter | 5 days open, complex | Large surface area, needs review bandwidth |
| [#1478](https://github.com/agentscope-ai/CoPaw/pull/1478) — Nextcloud Talk | 1 day | New channel — maintenance burden consideration |

### Recommendations

1. **Prioritize Feishu stability** — assign dedicated maintainer; this is becoming a reputation risk
2. **Merge timezone PRs** — [#1535](https://github.com/agentscope-ai/CoPaw/pull/1535), [#1321](https://github.com/agentscope-ai/CoPaw/pull/1321), [#1451](https://github.com/agentscope-ai/CoPaw/pull/1451) have overlapping scope; consolidate to avoid conflicts
3. **Cut v0.0.8 release** — security fix [#1529](https://github.com/agentscope-ai/CoPaw/pull/1529) + Telegram fixes + timezone support warrants release

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw Project Digest — 2026-03-16

## 1. Today's Overview

ZeptoClaw shows **strong maintainer velocity** with 6 PRs and 4 issues processed in 24 hours, though **zero new releases** suggests the project is in active development rather than stabilization. The maintainer (@qhkm) is driving nearly all activity, indicating a **solo-maintained or core-team-heavy project** with limited external contributor engagement. Focus areas are infrastructure hardening (r8r bridge, container builds), enterprise AI provider expansion (Google Vertex AI), and template reliability fixes. No security incidents or critical outages reported—overall project health appears **stable and progressing**.

---

## 2. Releases

**No new releases** (v0.x.x or otherwise) published in the last 24 hours. The last release date is not visible in provided data.

---

## 3. Project Progress

### Merged/Closed PRs (4 items)

| PR | Description | Impact |
|:---|:---|:---|
| [#359](https://github.com/qhkm/zeptoclaw/pull/359) | **fix(templates): coder template uses existing tests and edit_file** | Fixes a critical workflow bug where LLMs wrote self-validating buggy tests; now enforces existing test discovery and `edit_file` for in-place fixes |
| [#362](https://github.com/qhkm/zeptoclaw/pull/362) | **fix(r8r_bridge): ack duplicates, error on bad headers, register config fields** | Hardens WebSocket reliability—prevents infinite loops on event replay, replaces panics with proper error handling |
| [#365](https://github.com/qhkm/zeptoclaw/pull/365) | **feat: r8r bridge WebSocket client + progressive disclosure CLAUDE.md** | Major infrastructure: full r8r workflow engine integration with security hardening (token redaction, size caps) and customizable system prompts |
| [#358](https://github.com/qhkm/zeptoclaw/pull/358) | **fix: Dockerfile.dev with BuildKit cache mounts + lint-container.sh** | Developer experience: faster incremental container builds, auto-detects Docker/Podman with graceful fallbacks |

**Key advancement:** The r8r bridge is now production-ready with bidirectional WebSocket support, positioning ZeptoClaw as a viable node in larger agent orchestration workflows.

---

## 4. Community Hot Topics

| Item | Engagement | Analysis |
|:---|:---|:---|
| [#361](https://github.com/qhkm/zeptoclaw/issues/361) [CLOSED] | 1 comment, P2-high | **Post-merge review regressions**—indicates PR #358 needed follow-up fixes; suggests review process gaps or complexity in r8r bridge |
| [#366](https://github.com/qhkm/zeptoclaw/pull/366) [OPEN] | 0 comments, 👍 0 | **Telegram UX polish** (markdown rendering, typing indicators)—addresses real user friction but lacks community signal; maintainer-driven |
| [#367](https://github.com/qhkm/zeptoclaw/issues/367) [OPEN] | 0 comments | **Fork-hostile hardcoded repo slug**—submitted by external user @taqtiqa-mark; reveals architectural debt affecting AI-assisted contributors |

**Underlying need:** Better CI/review automation to catch regressions before merge (#361 pattern), and first-class fork support for the growing AI-coding-assistant user base (#367).

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix Available |
|:---|:---|:---|:---|
| **P2-high** | [#361](https://github.com/qhkm/zeptoclaw/issues/361): r8r bridge regressions (duplicate acks, panics on bad headers, missing config validation) | **CLOSED** | ✅ [#362](https://github.com/qhkm/zeptoclaw/pull/362) |
| **P2-high** | [#345](https://github.com/qhkm/zeptoclaw/issues/345): coder template writes self-validating buggy tests | **CLOSED** | ✅ [#359](https://github.com/qhkm/zeptoclaw/pull/359) |
| **Unranked** | [#367](https://github.com/qhkm/zeptoclaw/issues/367): AGENTS.md hardcoded repo slug causes upstream spam | **OPEN** | ❌ No PR yet |

**Stability assessment:** Two high-priority bugs resolved same-day they were identified. The remaining open bug is architectural (config hardcoding) rather than runtime crash-prone. No critical (P0/P1) issues in 24h window.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Source | Likelihood in Next Release |
|:---|:---|:---|
| **Google Vertex AI provider** | [#363](https://github.com/qhkm/zeptoclaw/issues/363) + [#364](https://github.com/qhkm/zeptoclaw/pull/364) | **High** — PR open, zero-dependency design, enterprise auth pattern |
| **Telegram markdown/typing UX** | [#366](https://github.com/qhkm/zeptoclaw/pull/366) | **High** — PR open, closes #331, polished implementation |
| **Fork-safe AGENTS.md** | [#367](https://github.com/qhkm/zeptoclaw/issues/367) | **Medium** — simple fix, but requires maintainer prioritization |
| **Custom system prompts** | [#365](https://github.com/qhkm/zeptoclaw/pull/365) | **Shipped** — merged via r8r bridge PR |

**Predicted vNext contents:** Vertex AI provider + Telegram UX polish, assuming maintainer bandwidth.

---

## 7. User Feedback Summary

| Pain Point | Evidence | Severity |
|:---|:---|:---|
| **Template reliability** | #345: LLM "cheats" by writing tests that match buggy code | **High** — undermines core agent loop |
| **Fork workflow friction** | #367: AI assistants in forks spam upstream repo | **Medium** — affects contributor onboarding |
| **Enterprise auth gaps** | #363: No Vertex AI support blocks Google Cloud deployments | **Medium-High** — addressed by open PR |
| **Real-time UX** | #331 (via #366): Telegram output formatting is broken | **Low-Medium** — polish issue |

**Satisfaction signal:** Rapid same-day fixes for reported bugs (#345, #361) suggest responsive maintenance. Dissatisfaction: External contributors filing issues without maintainer engagement (#367 unanswered).

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#367](https://github.com/qhkm/zeptoclaw/issues/367) | 1 day | **Medium** — blocks fork-based contributions | Maintainer acknowledgment + triage label |
| (No older items visible in 24h window) | — | — | — |

**Note:** With only 24h of data, true "long-unanswered" items aren't visible. However, #367's external authorship and zero response (vs. maintainer-self-filed issues getting same-day resolution) suggests **contributor experience blind spot** worth monitoring.

---

*Digest generated from 24h GitHub activity window. Data source: github.com/qhkm/zeptoclaw*

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw Project Digest — 2026-03-16

## 1. Today's Overview

EasyClaw is a **low-activity project** with minimal community engagement as of March 16, 2026. The repository shows zero open issues, zero active pull requests, and no community discussion in the past 24 hours. The sole activity is a maintenance release (v1.6.8), suggesting the project is in a **stable maintenance phase** rather than active feature development. The macOS Gatekeeper workaround documentation in the release notes indicates ongoing attention to distribution friction for desktop users. Overall project health appears **stable but stagnant**—no regressions or critical bugs reported, but also no visible community momentum.

---

## 2. Releases

**[v1.6.8](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.6.8)** — Published 2026-03-16

| Aspect | Details |
|--------|---------|
| **Type** | Maintenance/Documentation |
| **Changes** | Added installation troubleshooting for macOS Gatekeeper |
| **Breaking Changes** | None |
| **Migration Notes** | N/A |

**Notable:** This release focuses entirely on **user onboarding friction**—specifically addressing macOS security quarantine flags that prevent unsigned apps from launching. The bilingual documentation (English/Chinese) suggests a geographically diverse user base.

---

## 3. Project Progress

**No merged or closed PRs in the last 24 hours.**

The v1.6.8 release implies direct maintainer commits without PR workflow, indicating:
- Possible **solo maintainer operation** without external contributor integration
- Lightweight release process optimized for documentation/quick fixes
- No feature advancement in this cycle

---

## 4. Community Hot Topics

**No active discussions.**

| Metric | Count |
|--------|-------|
| Open Issues with >5 comments | 0 |
| PRs with active review threads | 0 |
| Issues with >3 reactions | 0 |

**Analysis:** The complete absence of community discourse suggests either:
- **Niche/specialized tool** with satisfied but silent users
- **Early-stage project** yet to build contributor base
- **Alternative communication channels** (Discord, WeChat, etc.) not captured in GitHub metrics

---

## 5. Bugs & Stability

| Severity | Count | Details |
|----------|-------|---------|
| Critical (crash/data loss) | 0 | — |
| High (functional blocker) | 0 | — |
| Medium (workaround exists) | 0 | — |
| Low (UI/UX friction) | 0 | — |

**Observed Pattern:** The macOS Gatekeeper issue documented in v1.6.8 is a **known distribution friction point**, not a runtime bug. No new stability concerns reported.

---

## 6. Feature Requests & Roadmap Signals

**No formal feature requests in the last 24 hours.**

**Inferred from release pattern:**
| Signal | Interpretation |
|--------|----------------|
| macOS notarization workaround | Apple code signing may be cost-prohibitive; expect continued manual install friction |
| Version 1.6.x series | Mature codebase, likely approaching 1.7.0 or 2.0.0 planning phase |
| No dependency updates visible | Potential technical debt accumulation |

**Predicted next version priorities:** Apple Silicon native builds, Windows installer improvements, or automated code signing if maintainer resources allow.

---

## 7. User Feedback Summary

| Source | Insight |
|--------|---------|
| Release notes | Users encounter **macOS security barriers** during first launch |
| Issue silence | Either **satisfaction** or **abandonment**—ambivalent signal |
| Bilingual docs | **Chinese-speaking user segment** is significant enough to warrant native documentation |

**Pain Point:** Installation friction on macOS remains the primary user-facing obstacle. No evidence of runtime dissatisfaction or feature gaps.

---

## 8. Backlog Watch

| Category | Count | Action Needed |
|----------|-------|---------------|
| Issues >30 days old | 0 | — |
| PRs awaiting review >14 days | 0 | — |
| Stale draft PRs | 0 | — |

**Assessment:** Clean backlog indicates either **excellent maintainer responsiveness** or **minimal external contribution volume**. Given zero historical issues/PRs visible, the latter interpretation is more probable.

**Recommendation for maintainers:** Consider enabling GitHub Discussions to capture informal user feedback currently invisible in the metrics.

---

*Digest generated from: https://github.com/gaoyangz77/easyclaw*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/duanyytop/agents-radar).*