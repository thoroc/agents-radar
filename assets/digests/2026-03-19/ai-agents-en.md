# OpenClaw Ecosystem Digest 2026-03-19

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-03-19 00:09 UTC

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

# OpenClaw Project Digest — 2026-03-19

## 1. Today's Overview

OpenClaw shows **exceptionally high community activity** with 500 issues and 500 PRs updated in the last 24 hours, indicating a rapidly evolving codebase with significant community engagement. The project is in a **mature but turbulent phase** — no new releases today, but intense development velocity with 84 merged/closed PRs against 416 open ones, suggesting active triage but also potential backlog pressure. The issue-to-PR ratio (465 open issues vs. 416 open PRs) hints at a community-driven project where contributions slightly outpace reported problems. Critical stability concerns dominate: gateway crashes, authentication regressions, and cross-platform deployment issues are top priorities. The project appears to be navigating growing pains as it scales from a macOS-centric tool to a multi-platform, production-grade AI agent infrastructure.

---

## 2. Releases

**No new releases today.** The latest activity centers on pre-release development toward the next version, with significant PRs targeting stability fixes that likely precede a tagged release.

---

## 3. Project Progress

### Merged/Closed PRs Today (84 total — selected highlights)

| PR | Description | Impact |
|:---|:---|:---|
| [#50087](https://github.com/openclaw/openclaw/pull/50087) | Cron docs: clarify routing metadata separation | Prevents config leaks into user messages |
| [#50085](https://github.com/openclaw/openclaw/pull/50085) | Fix logging transport registry for jiti plugin loading | Resolves duplicate log transport issues with OTel |
| [#50084](https://github.com/openclaw/openclaw/pull/50084) | Stabilize ACPX/subagent completion feedback routing | Fixes Telegram topic-bound conversation delivery |
| [#50044](https://github.com/openclaw/openclaw/pull/50044) | Fix MSTeams inline pasted image downloads | Enables proper image handling in Teams |
| [#50051](https://github.com/openclaw/openclaw/pull/50051) | ExecuTorch Parakeet-TDT STT for macOS Talk Mode | Major on-device speech recognition addition |
| [#49856](https://github.com/openclaw/openclaw/pull/49856) | Fix web UI model dropdown desync and wrong provider prefix | Critical multi-provider UX fix |
| [#50066](https://github.com/openclaw/openclaw/pull/50066) | Auto-log sessions_send to JSONL for observability | Multi-agent audit trail without skill cooperation |
| [#50054](https://github.com/openclaw/openclaw/pull/50054) | Distributed session locking with Redis fallback | Production-grade session reliability |
| [#50033](https://github.com/openclaw/openclaw/pull/50033) | Add Parallel as web search/extract provider | New LLM-optimized search integration |
| [#48838](https://github.com/openclaw/openclaw/pull/48838) | Agent-scoped skill policy and cron agent/delivery semantics | Foundation for enterprise cron workflows |
| [#50076](https://github.com/openclaw/openclaw/pull/50076) | Validate denyCommands after gateway.nodes writes | Security hardening for node configuration |
| [#49840](https://github.com/openclaw/openclaw/pull/49840) | Add maxCostPerRun config to cap embedded run cost | Cost control for expensive model runs |
| [#41449](https://github.com/openclaw/openclaw/pull/41449) | Allow localhost/private-network Ollama for embeddings | Unblocks self-hosted embedding workflows |
| [#50005](https://github.com/openclaw/openclaw/pull/50005) | Sanitize malformed replay tool calls | Prevents Anthropic replay crashes |
| [#44421](https://github.com/openclaw/openclaw/pull/44421) | Integrate Cortex local memory | Major local memory substrate addition |

**Key Themes:** Production reliability (session locking, cost controls), platform expansion (MSTeams, macOS STT), and developer experience (observability, config validation).

---

## 4. Community Hot Topics

### Most Active Issues by Engagement

| Issue | Comments | 👍 | Core Need |
|:---|:---:|:---:|:---|
| [#3460](https://github.com/openclaw/openclaw/issues/3460) Internationalization (i18n) & Localization | 103 | 4 | **Global accessibility** — maintainers acknowledge demand but lack bandwidth; community willing to contribute |
| [#75](https://github.com/openclaw/openclaw/issues/75) Linux/Windows Clawdbot Apps | 42 | 63 | **Cross-platform parity** — macOS/iOS/Android exist; Linux/Windows gap blocks enterprise adoption |
| [#49836](https://github.com/openclaw/openclaw/issues/49836) Phishing Scam — Fake Airdrop | 28 | 16 | **Brand protection** — malicious actors exploiting OpenClaw name; needs official response/awareness |
| [#37757](https://github.com/openclaw/openclaw/issues/37757) System prompt typo: IDENTITITY.md | 23 | 0 | **Polish/quality** — cosmetic but erodes trust in AI-generated outputs |
| [#23538](https://github.com/openclaw/openclaw/issues/23538) Anthropic setup-token auth 401 | 21 | 0 | **Authentication reliability** — regression blocking Anthropic users |
| [#48205](https://github.com/openclaw/openclaw/issues/48205) Gateway restarts every ~50 minutes | 20 | 0 | **Production stability** — critical uptime issue |
| [#34741](https://github.com/openclaw/openclaw/issues/34741) WhatsApp mid-session desync | 18 | 2 | **Channel reliability** — business-critical messaging |
| [#45772](https://github.com/openclaw/openclaw/issues/45772) Gateway heartbeat timer stops | 18 | 1 | **Monitoring/health checks** — silent failures in distributed setups |
| [#48788](https://github.com/openclaw/openclaw/issues/48788) Centralized filename encoding utility | 16 | 0 | **International content handling** — proper multi-encoding support |
| [#3181](https://github.com/openclaw/openclaw/issues/3181) Runaway heartbeat loop → high CPU/cost | 15 | 0 | **Cost control + stability** — operational expense risk |

### Underlying Community Needs Analysis

1. **Enterprise Production Readiness**: Gateway stability, session management, and cost controls dominate — users deploying at scale hit hard limits
2. **Global Market Expansion**: i18n and cross-platform support are blockers for non-English, non-macOS markets
3. **Trust & Security**: Phishing scam + authentication bugs erode confidence in a tool handling sensitive AI operations
4. **Developer Experience**: Configuration complexity, cryptic errors, and documentation gaps create friction

---

## 5. Bugs & Stability

### Critical Severity (Production-Blocking)

| Issue | Description | Fix Status |
|:---|:---|:---|
| [#48205](https://github.com/openclaw/openclaw/issues/48205) | Gateway restarts every ~50 min with "reason=none" | No fix PR identified |
| [#23538](https://github.com/openclaw/openclaw/issues/23538) | Anthropic setup-token auth returns 401 | No fix PR identified |
| [#45560](https://github.com/openclaw/openclaw/issues/45560) | Local gateway CLI handshake fails (probe timeout) | No fix PR identified |
| [#48167](https://github.com/openclaw/openclaw/issues/48167) | CLI completely dead: "gateway closed (1000)" | No fix PR identified |

### High Severity (Significant Impact)

| Issue | Description | Fix Status |
|:---|:---|:---|
| [#34741](https://github.com/openclaw/openclaw/issues/34741) | WhatsApp "No active listener" mid-session desync | No fix PR identified |
| [#45772](https://github.com/openclaw/openclaw/issues/45772) | Gateway heartbeat timer stops after 1-2 triggers | No fix PR identified |
| [#3181](https://github.com/openclaw/openclaw/issues/3181) | Runaway heartbeat loop → excessive model calls/cost | PR [#49840](https://github.com/openclaw/openclaw/pull/49840) adds maxCostPerRun mitigation |
| [#48183](https://github.com/openclaw/openclaw/issues/48183) | Feishu monitor memory leak in httpServers Map | No fix PR identified |
| [#49191](https://github.com/openclaw/openclaw/issues/49191) | google-vertex ADC auth broken: "<authenticated>" literal | No fix PR identified |

### Medium Severity (Workaround Available)

| Issue | Description | Fix Status |
|:---|:---|:---|
| [#37757](https://github.com/openclaw/openclaw/issues/37757) | System prompt typo: IDENTITITY.md | Trivial fix; no PR |
| [#38902](https://github.com/openclaw/openclaw/issues/38902) | HTTP 422 "check open ai req parameter error" | No fix PR identified |
| [#25215](https://github.com/openclaw/openclaw/issues/25215) | SSRF check blocks Clash/mihomo fake-ip range | Regression from 2026.2.22-2 |
| [#8619](https://github.com/openclaw/openclaw/issues/8619) | Gateway install: launchctl bootstrap failed | No fix PR identified |

---

## 6. Feature Requests & Roadmap Signals

### High-Likelihood Next-Version Candidates

| Feature | Issue/PR | Signal Strength | Rationale |
|:---|:---|:---:|:---|
| **MCP Client Native Support** | [#29053](https://github.com/openclaw/openclaw/issues/29053) | ⭐⭐⭐⭐⭐ | Industry standard adoption; 7 upvotes; "rapidly becoming industry standard" |
| **Linux/Windows Desktop Apps** | [#75](https://github.com/openclaw/openclaw/issues/75) | ⭐⭐⭐⭐⭐ | 63 upvotes; explicit maintainer interest; enterprise blocker |
| **i18n/Localization Framework** | [#3460](https://github.com/openclaw/openclaw/issues/3460) | ⭐⭐⭐⭐☆ | 103 comments; community PRs exist; maintainer bandwidth only blocker |
| **External Memory Provider API** | [#49233](https://github.com/openclaw/openclaw/issues/49233) | ⭐⭐⭐⭐☆ | Zero-downtime compaction; production-scale need |
| **Parallel Search Provider** | [#50033](https://github.com/openclaw/openclaw/pull/50033) | ⭐⭐⭐⭐⭐ | PR already open; addresses #43398 |
| **Cortex Local Memory** | [#44421](https://github.com/openclaw/openclaw/pull/44421) | ⭐⭐⭐⭐⭐ | XL PR open; major architectural addition |
| **Distributed Session Locking** | [#50054](https://github.com/openclaw/openclaw/pull/50054) | ⭐⭐⭐⭐⭐ | Merged pattern; Redis production readiness |
| **Structured Output for Subagents** | [#49977](https://github.com/openclaw/openclaw/pull/49977) | ⭐⭐⭐⭐☆ | PR open; plugin ecosystem maturation |

### Emerging Patterns

- **Cost governance**: maxCostPerRun, heartbeat deduplication — operational expense control becoming first-class
- **Multi-agent observability**: sessions_send logging, JSONL audit trails — enterprise debugging needs
- **Local-first AI**: ExecuTorch STT, Cortex memory, Ollama embedding fixes — privacy/self-hosting trend

---

## 7. User Feedback Summary

### Pain Points (Explicit Complaints)

| Theme | Evidence | Severity |
|:---|:---|:---:|
| **Gateway instability** | "never becomes ready," "restarts every 50 min," "CLI completely dead" | 🔴 Critical |
| **Authentication fragility** | Anthropic 401, Google Vertex broken, MiniMax key works on one gateway not another | 🔴 Critical |
| **Configuration complexity** | "cryptic errors," schema mismatches, no JSON Schema published | 🟡 High |
| **Cost unpredictability** | "5x API costs," "runaway heartbeat loop," "high CPU / cost" | 🟡 High |
| **Platform lock-in** | macOS-only apps, Linux/Windows "missing" | 🟡 High |
| **Channel-specific bugs** | WhatsApp desync, Telegram voice not transcribed, Feishu memory leak | 🟡 High |

### Positive Signals

| Theme | Evidence |
|:---|:---|
| **Active community contribution** | 500 PRs updated, i18n PRs submitted unprompted |
| **Responsive maintainers** | Quick conflict resolution on #50069, #48163 |
| **Innovation pace** | ExecuTorch STT, Cortex integration, Parallel search — cutting-edge features |
| **Extensibility** | Plugin system enabling community contributions (Feishu, Signal, etc.) |

### Use Case Evolution

- **From**: Individual macOS power users with Claude API keys
- **Toward**: Multi-agent enterprise deployments with Redis clustering, cost controls, audit logging, and cross-platform presence

---

## 8. Backlog Watch

### Issues Needing Maintainer Attention (>2 weeks old, high impact, no response)

| Issue | Age | Problem | Action Needed |
|:---|:---:|:---|:---|
| [#3460](https://github.com/openclaw/openclaw/issues/3460) i18n | ~7 weeks | 103 comments, community PRs waiting | Decision: accept i18n architecture or document rejection |
| [#75](https://github.com/openclaw/openclaw/issues/75) Linux/Windows apps | ~11 weeks | 63 upvotes, explicit "help wanted" | Roadmap commitment or call for maintainers |
| [#2868](https://github.com/openclaw/openclaw/issues/2868) High token consumption Claude | ~7 weeks | 7 upvotes, cost impact | Investigation or documentation of expected behavior |
| [#23452](https://github.com/openclaw/openclaw/issues/23452) Vision broken across channels | ~4 weeks | 7 upvotes, systemic issue | Cross-channel vision architecture review |
| [#22278](https://github.com/openclaw/openclaw/issues/22278) JSON Schema publication | ~4 weeks | DX blocker, IDE integration | Automated schema generation pipeline |

### Stale PRs at Risk of Bitrot

| PR | Issue | Risk |
|:---|:---|:---|
| [#31078](https://github.com/openclaw/openclaw/pull/31078) Signal ACK reactions | Open since Mar 1, large change | Merge conflict probability increasing |
| [#28926](https://github.com/openclaw/openclaw/pull/28926) Recover orphaned user turns | Complex embedded-runner change | Needs rebase against recent codex changes |
| [#41158](https://github.com/openclaw/openclaw/pull/41158) Global 429 retry | Rate-limiting critical for scale | Should merge before next provider API change |

---

**Digest compiled from 500 issues and 500 PRs updated 2026-03-18 to 2026-03-19.**

---

## Cross-Ecosystem Comparison

# Cross-Project Analysis: Personal AI Assistant Open-Source Ecosystem
**Date:** 2026-03-19 | **Coverage:** 12 active projects

---

## 1. Ecosystem Overview

The personal AI assistant/agent open-source ecosystem is experiencing **intense development velocity** across a fragmented landscape of 12+ actively maintained projects. OpenClaw dominates by raw activity (500 issues/PRs daily), while smaller projects like ZeroClaw, PicoClaw, and IronClaw demonstrate focused iteration on stability and enterprise features. A clear **bifurcation** has emerged: "core reference" projects (OpenClaw, IronClaw) prioritizing extensibility and multi-agent orchestration versus "lightweight" alternatives (NanoBot, TinyAGI, NanoClaw) emphasizing minimal deployment footprints. The ecosystem is collectively grappling with production readiness—gateway stability, authentication reliability, and cost controls appear as universal pain points across 75% of tracked projects.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release Status | Health Score* | Phase |
|:---|:---:|:---:|:---|:---:|:---|
| **OpenClaw** | 500 | 500 | No release (pre- vNext) | 🟡 6.5/10 | Turbulent maturation |
| **NanoBot** | 34 | 62 | v0.1.4.post5 (stable) | 🟢 7.5/10 | Active stabilization |
| **ZeroClaw** | 37 | 50 | **v0.5.0** (stable) | 🟢 8.0/10 | Post-release stabilization |
| **PicoClaw** | 30 | 89 | v0.2.3-nightly | 🟡 7.0/10 | Pre-release sprint |
| **NanoClaw** | 25 | 50 | No release | 🔴 5.5/10 | Bottlenecked (80% PRs open) |
| **NullClaw** | 17 | 26 | v2026.3.17 | 🟢 7.5/10 | Stabilization sprint |
| **IronClaw** | 43 | 50 | No release (staging promoted) | 🟡 7.0/10 | CI-driven hardening |
| **LobsterAI** | 13 | 12 | v0.2.4 implied | 🟡 6.5/10 | Hotfix accumulation |
| **TinyAGI** | 0 | 16 | **v0.0.15** (rebrand complete) | 🟢 7.0/10 | Rebrand stabilization |
| **Moltis** | 2 | 1 | No release | 🔴 5.0/10 | Maintenance phase |
| **CoPaw** | 50 | 50 | **v0.1.0-beta.3** | 🟡 6.5/10 | Beta stabilization |
| **ZeptoClaw** | 3 | 2 | No release | 🟡 6.0/10 | Design/architecture phase |
| **EasyClaw** | 4 | 2 | **v1.7.1** (hotfix) | 🟡 6.0/10 | Reactive stabilization |

*\*Health Score: weighted composite of merge velocity, issue resolution, release cadence, and critical bug backlog*

---

## 3. OpenClaw's Position

### Advantages vs. Peers

| Dimension | OpenClaw | Leading Peers |
|:---|:---|:---|
| **Scale** | 10x activity volume (500/500 vs. 50/50 median) | Unmatched community contribution rate |
| **Platform coverage** | macOS/iOS/Android native, Linux/Windows gaps | ZeroClaw matches; NanoBot lags |
| **Enterprise features** | Redis session locking, cost controls, audit logging | IronClaw comparable; others immature |
| **Provider ecosystem** | 15+ LLM backends, MCP native | IronClaw catching up; CoPaw expanding |
| **On-device AI** | ExecuTorch STT (shipped), Cortex memory (merging) | PicoClaw pursuing; others absent |

### Technical Approach Differences

| Aspect | OpenClaw | Contrast |
|:---|:---|:---|
| **Architecture** | Modular skill system, gateway-mediated channels | ZeroClaw: unified runtime; IronClaw: WASM tool sandboxing |
| **Configuration** | TOML-first, cron-native scheduling | NanoBot: JSON/YAML; CoPaw: web UI driven |
| **Memory** | External provider API (emerging), Cortex local | PicoClaw: hierarchical agent memory; TinyAGI: crew-based |
| **Observability** | JSONL audit trails, OTel integration | IronClaw: OTLP native; others ad-hoc |

### Community Size Comparison

OpenClaw operates at **ecosystem-defining scale**: its daily issue/PR volume exceeds the *combined* activity of NanoBot, ZeroClaw, PicoClaw, and NanoClaw. However, this scale creates **triage bottlenecks**—416 open PRs vs. 84 merged suggests review capacity constraints that smaller projects (ZeroClaw: 21 merged/29 open) avoid.

---

## 4. Shared Technical Focus Areas

| Requirement | Projects | Specific Needs |
|:---|:---|:---|
| **Gateway stability** | OpenClaw, LobsterAI, NanoClaw | Auto-restart on crash, heartbeat reliability, session recovery |
| **Cost controls** | OpenClaw, NanoClaw, ZeroClaw | `maxCostPerRun`, token budget enforcement, runaway loop prevention |
| **Local/self-hosted deployment** | NanoBot, CoPaw, PicoClaw, ZeroClaw | Ollama/llama.cpp compatibility, air-gapped startup, offline embeddings |
| **Multi-provider resilience** | IronClaw, NanoClaw, CoPaw, Moltis | Fallback key rotation, provider-agnostic routing, TOS compliance |
| **Security hardening** | NanoBot, NullClaw, ZeroClaw, IronClaw | Secret reference systems (`{env:}`, `{file:}`), encrypted credentials, SSRF prevention |
| **Observability/audit** | OpenClaw, IronClaw, NullClaw, CoPaw | Structured logging, trace propagation, execution chain visibility |
| **i18n/globalization** | OpenClaw, ZeroClaw, PicoClaw, NanoBot, EasyClaw | Framework infrastructure, community translation workflows |
| **Voice/multimodal** | PicoClaw, CoPaw, OpenClaw | TTS/ASR gateway integration, local Whisper, image upload handling |

---

## 5. Differentiation Analysis

| Project | Core Differentiator | Target User | Architecture Signature |
|:---|:---|:---|:---|
| **OpenClaw** | Reference implementation, maximal extensibility | Power users, multi-agent orchestrators | Skill-based, gateway-mediated, TOML-native |
| **ZeroClaw** | Secure-by-default, autonomous skill creation | Security-conscious enterprises | Unified Rust runtime, I18n-ready, `SOUL.md` identity |
| **NanoBot** | "Ultra-lightweight" positioning (contested) | Individual developers, quick deployment | Python/Node.js dual runtime, minimal config |
| **PicoClaw** | Hardware-adjacent (Sipeed), embedded focus | IoT/edge deployments, ARM SBCs | Agent refactor (`SOUL.md`/`AGENT.md`), sandboxed Docker |
| **IronClaw** | NEAR AI integration, WASM tool sandboxing | Web3-adjacent, crypto-native users | Rust-based, blockchain-identity, routine system |
| **NanoClaw** | Minimalist container-first | Cost-conscious self-hosters | Skill branch architecture, Claude Code-inspired |
| **CoPaw** | Multimodal-first, local embedding | Privacy-conscious, offline-first | Python-based, AgentScope lineage, image-native |
| **TinyAGI** | Crew/agent team coordination | Multi-agent workflow designers | Hierarchical memory, chatroom-based coordination |
| **LobsterAI** | NetEase ecosystem integration | Chinese enterprise messaging | OpenClaw plugin runtime, IM-native |
| **EasyClaw** | Simplified UX, rapid iteration | Non-technical users seeking Claude Code parity | Electron-based, branded "RivonClaw" |

---

## 6. Community Momentum & Maturity

### Tier 1: Rapid Iteration (Velocity >75 items/24h)
| Project | Characteristics | Risk Profile |
|:---|:---|:---|
| **OpenClaw** | Volume leader, turbulent maturation | Backlog pressure, stability debt |
| **PicoClaw** | Pre-release sprint, architectural refactor | Merge velocity masking review depth |

### Tier 2: Active Stabilization (30-75 items/24h)
| Project | Characteristics | Trajectory |
|:---|:---|:---|
| **ZeroClaw** | Post-stable release, 7 beta→1 stable cycle | 🟢 Healthy deceleration |
| **CoPaw** | Beta series, multimodal milestone shipped | 🟡 Critical bugs need attention |
| **IronClaw** | CI-driven hardening, security focus | 🟡 XL PR backlog risk |
| **NanoBot** | Security/observability sprint | 🟢 Responsive maintainer team |

### Tier 3: Bottlenecked or Maintenance (<30 items/24h)
| Project | Characteristics | Concern |
|:---|:---|:---|
| **NanoClaw** | 80% PRs open, security disclosure unaddressed | 🔴 Governance risk, review bandwidth |
| **Moltis** | Minimal activity, critical provider bugs stale | 🔴 Sustainability question |
| **ZeptoClaw** | Design-phase, no merges | 🟡 Pre-product, high ambition |
| **EasyClaw** | Reactive hotfixes, contributor PRs blocked | 🟡 Review queue bottleneck |

---

## 7. Trend Signals

| Trend | Evidence | Implication for Developers |
|:---|:---|:---|
| **Local-first AI acceleration** | ExecuTorch STT (OpenClaw), local embedding (CoPaw, NanoBot), MLX/llama.cpp compatibility (CoPaw, ZeroClaw) | Design for offline operation, quantized models, edge deployment |
| **Cost governance as first-class** | `maxCostPerRun` (OpenClaw), token budget bypass detection (IronClaw), pipeline timeouts (NanoClaw) | Build spend controls into agent loops, not as afterthought |
| **MCP as emergent standard** | Native support (OpenClaw, IronClaw), HTTP transport fixes (CoPaw), session recovery (IronClaw) | Prioritize MCP over custom tool protocols |
| **Identity/personality externalization** | `SOUL.md`/`AGENT.md` split (PicoClaw, ZeroClaw), agent-scoped policies (OpenClaw) | Separate configuration from behavior definition |
| **Security UX tension** | ZeroClaw's #1478 "security too restrictive" debate, NanoBot secret reference demand | Offer graduated safety levels, not binary on/off |
| **Multi-agent observability crisis** | sessions_send logging (OpenClaw), execution chain requests (CoPaw), trajectory debugging (IronClaw) | Distributed agent systems need new debugging primitives |
| **Containerization of agents** | Firecracker VM proposal (ZeptoClaw), sandboxed Docker (PicoClaw), container security critique (NanoClaw) | Treat agents as untrusted workloads, not trusted applications |

---

**Analyst Note:** The ecosystem is transitioning from **feature expansion** to **production hardening**—2026 Q1 releases across multiple projects show convergence on stability, security, and operational visibility as competitive differentiators. OpenClaw's scale advantage is offset by agility in smaller projects; developers should evaluate based on deployment context (edge/enterprise/personal) rather than raw activity metrics.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-03-19

## 1. Today's Overview

NanoBot shows **high community velocity** with 34 issues and 62 PRs updated in the last 24 hours, indicating active development and user engagement. No new release was published today, though the project is iterating rapidly on the `nightly` branch. The community is heavily focused on **security hardening** (secret management, file permissions), **observability** (tracing, logging), and **platform expansion** (QQ, WhatsApp, Telegram enhancements). A notable tension exists between the project's "ultra-lightweight" positioning and its dual Python/Node.js runtime requirements. The maintainers appear responsive with 11 issues closed today, though 23 remain open with substantial discussion depth.

---

## 2. Releases

**No new releases** — The project remains on v0.1.4.post5 with active development on `nightly` branch.

---

## 3. Project Progress

### Merged/Closed PRs Today

| PR | Description | Impact |
|:---|:---|:---|
| [#2228](https://github.com/HKUDS/nanobot/pull/2228) | Telegram command support with bot username suffix in groups | **UX fix** — commands like `/stop@MyBot` now work in group chats |
| [#396](https://github.com/HKUDS/nanobot/pull/396) | Remove broad `tests/` ignore from `.gitignore` | **DevEx** — restores normal git behavior for new test files |
| [#418](https://github.com/HKUDS/nanobot/pull/418) | OpenAI-compatible endpoint documentation | **Docs** — clarifies best-effort support for custom endpoints |
| [#424](https://github.com/HKUDS/nanobot/pull/424) | Preserve `extraHeaders` key casing in config loader | **Bug fix** — prevents header authentication failures |

### Significant Open PRs Advancing

| PR | Description | Stage |
|:---|:---|:---|
| [#2232](https://github.com/HKUDS/nanobot/pull/2232) | **Multilingual MkDocs documentation suite** (zh-TW, en, zh-CN, ja) | Ready for review |
| [#2212](https://github.com/HKUDS/nanobot/pull/2212) | **Runtime secret reference resolution** — implements `{file:...}`, `{exec:...}`, `{env:...}` syntax | Implements #2172 |
| [#2218](https://github.com/HKUDS/nanobot/pull/2218) | Environment variable reference support `{env:VAR}` | Alternative/complementary to #2212 |
| [#2225](https://github.com/HKUDS/nanobot/pull/2225) | **Security: 0o600 permissions** on config/session files | Critical hardening |
| [#2230](https://github.com/HKUDS/nanobot/pull/2230) | Fix MCP tools with nullable JSON Schema params | Stability for Zapier integration |
| [#2223](https://github.com/HKUDS/nanobot/pull/2223) | Delivery acknowledgements for outbound messages | Reliability improvement |
| [#2219](https://github.com/HKUDS/nanobot/pull/2219) | Incremental session save — prevents data loss on crash/`/stop` | Data integrity |

---

## 4. Community Hot Topics

### Most Active Issues (by engagement)

| Issue | Comments | 👍 | Topic | Underlying Need |
|:---|:---:|:---:|:---|:---|
| [#1240](https://github.com/HKUDS/nanobot/issues/1240) **CLOSED** | 13 | 0 | Infinite loop with llama3.3-70b-instruct | **Agent control** — users need reliable stop/timeout mechanisms for runaway LLM responses |
| [#660](https://github.com/HKUDS/nanobot/issues/660) | 9 | 4 | "Ultra-lightweight" claim vs. Node.js dependency | **Identity/philosophy** — community questioning project positioning; wants true minimalism |
| [#1991](https://github.com/HKUDS/nanobot/issues/1991) | 8 | 0 | Multiple custom model support | **Flexibility** — power users need rapid model switching without config editing |
| [#2018](https://github.com/HKUDS/nanobot/issues/2018) | 8 | 0 | Interactive configuration wizard `nanobot onboard` | **Onboarding** — JSON editing is barrier to entry; CLI wizard reduces friction |

### Key Insight
The [#660](https://github.com/HKUDS/nanobot/issues/660) "bloat" debate reveals a **strategic tension**: the project markets minimalism but ships a container requiring ~500MB+ of runtime. The +4 upvotes suggest this resonates with a user segment prioritizing deployment simplicity (edge devices, serverless).

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR | Details |
|:---|:---|:---|:---|:---|
| **HIGH** | [#1240](https://github.com/HKUDS/nanobot/issues/1240) Infinite loop with llama3.3-70b | **CLOSED** | Unknown | Agent enters uncontrolled response loop; required double Ctrl+C |
| **HIGH** | [#2141](https://github.com/HKUDS/nanobot/issues/2141) Voice transcription broken in v0.1.4.post5 | OPEN | None | Regression: "summarize skill isn't installed" error on voice messages |
| **HIGH** | [#2185](https://github.com/HKUDS/nanobot/issues/2185) Gemini-3-flash-preview broken after upgrade | OPEN | None | Model prefix handling regression |
| **MEDIUM** | [#2208](https://github.com/HKUDS/nanobot/issues/2208) Telegram message duplication on Android | **CLOSED** | Unknown | Platform-specific display issue, not core logic |
| **MEDIUM** | [#2200](https://github.com/HKUDS/nanobot/issues/2200) Anthropic provider `litellm.BadRequestError` | OPEN | None | Provider integration failure, possibly upstream |
| **MEDIUM** | [#2145](https://github.com/HKUDS/nanobot/issues/2145) Air-gapped startup fails (LiteLLM/tiktoken need internet) | OPEN | None | Offline deployment blocker |
| **LOW** | [#608](https://github.com/HKUDS/nanobot/issues/608) Version mismatch `__init__.py` vs `pyproject.toml` | **CLOSED** | Unknown | Cosmetic but confusing |

### Stability Assessment
**Concerning pattern**: Three distinct regressions reported in v0.1.4.post5 (voice, Gemini, Telegram). The project may benefit from expanded integration testing before patch releases.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Issue/PR | Likelihood in Next Version | Rationale |
|:---|:---|:---:|:---|
| **Secret reference system** (`{env:}`, `{file:}`, `{exec:}`) | [#2172](https://github.com/HKUDS/nanobot/issues/2172), [#2212](https://github.com/HKUDS/nanobot/pull/2212), [#2218](https://github.com/HKUDS/nanobot/pull/2218) | **90%** | Two competing PRs, strong security imperative, active maintainer engagement |
| **Observability/Tracing** (Langfuse, LLM trace) | [#2189](https://github.com/HKUDS/nanobot/issues/2189), [#2154](https://github.com/HKUDS/nanobot/issues/2154), [#2158](https://github.com/HKUDS/nanobot/issues/2158) | **75%** | Enterprise readiness signal; multiple related requests |
| **Hooks system** (Claude Code-style lifecycle events) | [#2182](https://github.com/HKUDS/nanobot/issues/2182), [#1934](https://github.com/HKUDS/nanobot/pull/1934), [#2231](https://github.com/HKUDS/nanobot/issues/2231) | **70%** | PR #1934 already implements; awaiting merge |
| **Plugin system** | [#2231](https://github.com/HKUDS/nanobot/issues/2231) | **60%** | Requested but no implementation yet; may follow hooks |
| **Speech/voice system** | [#819](https://github.com/HKUDS/nanobot/pull/819) | **50%** | Large PR, complex feature, may need iteration |
| **QQ channel file transfer** | [#2226](https://github.com/HKUDS/nanobot/issues/2226) | **40%** | Community PR #1667 exists but unmerged; platform-specific |
| **Multi-tenant isolation** | [#2102](https://github.com/HKUDS/nanobot/issues/2102) | **30%** | Architectural change, no implementation visible |

---

## 7. User Feedback Summary

### Pain Points

| Theme | Evidence | Severity |
|:---|:---|:---:|
| **Configuration complexity** | [#2018](https://github.com/HKUDS/nanobot/issues/2018) (wizard request), [#1991](https://github.com/HKUDS/nanobot/issues/1991) (multiple custom models), [#2201](https://github.com/HKUDS/nanobot/issues/2201) (pip install syntax error) | HIGH |
| **Security anxiety** | [#2172](https://github.com/HKUDS/nanobot/issues/2172) (plaintext secrets), community PRs for permissions/secrets | HIGH |
| **Offline/air-gapped deployment** | [#2145](https://github.com/HKUDS/nanobot/issues/2145) | MEDIUM |
| **Upgrade fragility** | [#2141](https://github.com/HKUDS/nanobot/issues/2141), [#2185](https://github.com/HKUDS/nanobot/issues/2185), [#2208](https://github.com/HKUDS/nanobot/issues/2208) — multiple v0.1.4.post5 regressions | MEDIUM |
| **Platform parity gaps** | [#2226](https://github.com/HKUDS/nanobot/issues/2226) (QQ files), [#2160](https://github.com/HKUDS/nanobot/issues/2160) (WhatsApp boot notifications DIY) | MEDIUM |

### Positive Signals
- **Active customization**: Users building systemd integrations, boot notifications, custom skills
- **Enterprise interest**: Multi-tenant, observability, and secret management requests indicate production deployment intent
- **Strong Telegram/WhatsApp adoption**: Platform-specific polish requests show real usage

### Satisfaction Indicators
- Users investing effort in PRs and detailed bug reports suggests **commitment despite friction**
- The "OpenClaw-inspired" positioning resonates, but users want it **more polished and secure**

---

## 8. Backlog Watch

| Issue/PR | Age | Issue | Action Needed |
|:---|:---:|:---|:---|
| [#660](https://github.com/HKUDS/nanobot/issues/660) | 33 days | "Ultra-lightweight" identity crisis | **Maintainer decision** on project positioning; close with documentation or commit to slimming |
| [#817](https://github.com/HKUDS/nanobot/pull/817) | 29 days | Thinking/Tool Use streaming config | Merge or close; blocks dependent PRs |
| [#838](https://github.com/HKUDS/nanobot/pull/838) | 28 days | Telegram toggle for streaming | Depends on #817 |
| [#819](https://github.com/HKUDS/nanobot/pull/819) | 29 days | Speech system | Large feature — needs review bandwidth |
| [#1636](https://github.com/HKUDS/nanobot/issues/1636) | 13 days | Kilocode API gateway | Provider expansion — needs triage |
| [#1934](https://github.com/HKUDS/nanobot/pull/1934) | 7 days | Hooks system | Ready for final review/merge |

### Risk Assessment
The **29-day-old PR cluster** (#817, #838, #819) from contributor `DaryeDev` represents significant unmerged work on streaming UX and speech. Staleness risks contributor fatigue and merge conflicts. Recommend prioritizing #817 as it unblocks downstream features.

---

*Digest generated from 34 issues and 62 PRs updated 2026-03-18 to 2026-03-19.*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-03-19

## 1. Today's Overview

ZeroClaw shows **exceptionally high development velocity** with 37 issues and 50 PRs updated in 24 hours, culminating in the **v0.5.0 stable release** after a rapid beta cycle (7 releases in ~1 day). The project is in active stabilization mode: 19 issues closed vs. 18 remaining open, and 21 PRs merged/closed vs. 29 open. Core themes include runtime flexibility (model switching, configurable timeouts), channel expansion (Reddit, Bluesky, Webhooks), and operational hardening (Docker CI, self-test CLI). The community is vocal about security-configuration friction and local-model provider gaps.

---

## 2. Releases

### v0.5.0 (Stable)
**Full Changelog:** [v0.5.0](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.5.0)

| Change | Impact |
|--------|--------|
| **Channels:** Reddit, Bluesky, generic Webhook adapters | Expands beyond chat platforms to social media & custom integrations |
| **CI:** Pre-built binaries for Docker images | Faster deployments, reduced build failures |
| **CLI:** `self-test` command (quick/full modes) | Operational diagnostics for deployments |
| **CLI:** `status --format=exit-code` | Native Docker healthcheck support |
| **CLI:** `update` command with 6-phase pipeline + rollback | Safer, recoverable upgrades |

**Beta precursors** (v0.5.0-beta.347 through beta.364) iterated on:
- Runtime model switching via `model_switch` tool
- Configurable sub-agent timeouts
- I18n-ready tool descriptions
- Autonomous skill creation from multi-step tasks

**Migration Notes:** Beta users should upgrade directly to v0.5.0; no breaking config changes noted.

---

## 3. Project Progress

### Merged/Closed PRs (21 total — selected highlights)

| PR | Author | Summary | Closes |
|:---|:---|:---|:---|
| [#3916](https://github.com/zeroclaw-labs/zeroclaw/pull/3916) | theonlyhennygod | **Autonomous skill creation** — persists successful multi-step tasks as reusable `SKILL.toml` definitions | #3825 |
| [#3915](https://github.com/zeroclaw-labs/zeroclaw/pull/3915) | theonlyhennygod | Fix SOUL.md/IDENTITY.md missing in non-TTY sessions (cron/daemon) | #3819 |
| [#3909](https://github.com/zeroclaw-labs/zeroclaw/pull/3909) | theonlyhennygod | **Configurable delegate timeouts** — override 120s/300s defaults per agent | #3898 |
| [#3912](https://github.com/zeroclaw-labs/zeroclaw/pull/3912) | theonlyhennygod | **I18n: externalized tool descriptions** — enables user translations | #3901 |
| [#3903](https://github.com/zeroclaw-labs/zeroclaw/pull/3903) | theredspoon | Fix race condition in `claude_code` provider tests | #3902 |
| [#3835](https://github.com/zeroclaw-labs/zeroclaw/pull/3835) | vfmatzkin | Fix `ack_reactions = false` ignored in Telegram | #3834 |
| [#3904](https://github.com/zeroclaw-labs/zeroclaw/pull/3904) | theonlyhennygod | Clean stale build cache on upgrade — fixes `libsqlite3-sys` bindgen failures | — |
| [#3906](https://github.com/zeroclaw-labs/zeroclaw/pull/3906) | theonlyhennygod | Fix `install.sh --skip-build` not creating `config.toml` | #3852 |
| [#3905](https://github.com/zeroclaw-labs/zeroclaw/pull/3905) | theonlyhennygod | Fix `cron_add` schedule parsing for stringified JSON | #3860 |
| [#3910](https://github.com/zeroclaw-labs/zeroclaw/pull/3910) | theonlyhennygod | Fix "vicious circle of self-correction" — reset tool dedup cache per iteration | #3798 |
| [#3923](https://github.com/zeroclaw-labs/zeroclaw/pull/3923) | alexandme | WhatsApp `mention_only` gating for group messages | — |

**Technical Debt Addressed:** Test flakiness, install robustness, cron reliability, provider context persistence.

---

## 4. Community Hot Topics

### Most Active Discussions

| Issue/PR | Comments | Core Tension |
|:---|:---:|:---|
| [#1478](https://github.com/zeroclaw-labs/zeroclaw/issues/1478) **"[Feature]: 除了安全,什么功能也没有"** (Security too restrictive) | **41** | **Fundamental UX conflict:** Power users want "disable all safety" switch; project prioritizes secure-by-default. Suggests need for explicit "unsafe mode" documentation or `security.level = "permissive"` tier. |
| [#2503](https://github.com/zeroclaw-labs/zeroclaw/issues/2503) **"where is napcat channel"** | 5 | QQ/OneBot ecosystem users expect NapCat integration; gap in channel matrix vs. competitors. |
| [#3902](https://github.com/zeroclaw-labs/zeroclaw/issues/3902) / [#3903](https://github.com/zeroclaw-labs/zeroclaw/pull/3903) | 1 | CI reliability — race conditions in parallel test execution. |

**Underlying Needs:**
- **Safety configurability** without recompilation (#1478, #3818)
- **Chinese IM ecosystem** support (NapCat/OneBot, QQ)
- **Local-first deployment** stability (Ollama, llama.cpp, custom endpoints)

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR | Description |
|:---|:---|:---|:---|:---|
| **S1** | [#3925](https://github.com/zeroclaw-labs/zeroclaw/issues/3925) | **OPEN** | — | Docker build crash: `unused manifest key: lib.include` — blocks container builds |
| **S1** | [#3920](https://github.com/zeroclaw-labs/zeroclaw/issues/3920) | **OPEN** | — | Cron `allowed_tools` not surviving persistence — implementation gap |
| **S1** | [#3922](https://github.com/zeroclaw-labs/zeroclaw/issues/3922) | **CLOSED** | — | Ollama tool-calling handshake failure — provider capability detection |
| **S1** | [#3838](https://github.com/zeroclaw-labs/zeroclaw/issues/3838) | **CLOSED** | — | Route-specific `api_key` dropped in Channel/Agent mode — credential wiring |
| **S1** | [#3826](https://github.com/zeroclaw-labs/zeroclaw/issues/3826) | **CLOSED** | — | Deferred MCP tools never activated in daemon/Telegram mode |
| **S2** | [#3845](https://github.com/zeroclaw-labs/zeroclaw/issues/3845) | **OPEN** | — | `/new` doesn't refresh `available_skills` or cached system prompt in long-running channels |
| **S2** | [#3802](https://github.com/zeroclaw-labs/zeroclaw/issues/3802) | **CLOSED** | — | Telegram image transfer failure with `llamacpp` (vision capability mismatch) |
| **S2** | [#3765](https://github.com/zeroclaw-labs/zeroclaw/issues/3765) | **CLOSED** | — | Shell access lost in v0.4.0 — restriction logic regression |
| **S3** | [#3919](https://github.com/zeroclaw-labs/zeroclaw/issues/3919) | **OPEN** | [#3921](https://github.com/zeroclaw-labs/zeroclaw/pull/3921) | `zeroclaw config schema` fails on `challenge_max_attempts` parsing |

**Stability Assessment:** High closure rate on S1/S2; remaining open items are edge cases (Docker manifest, cron persistence) rather than systemic failures.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue/PR | Likelihood in v0.6.0 | Rationale |
|:---|:---|:---:|:---|
| **Alibaba Cloud (百炼) Coding Plan support** | [#3882](https://github.com/zeroclaw-labs/zeroclaw/issues/3882), [#3889](https://github.com/zeroclaw-labs/zeroclaw/pull/3889) | **HIGH** | PR open; Chinese cloud provider integration aligns with i18n push |
| **NapCat/OneBot11 channel** | [#2503](https://github.com/zeroclaw-labs/zeroclaw/issues/2503) | **MEDIUM** | Clear demand; channel adapter pattern established |
| **Cross-channel TOTP for critical commands** | [#3767](https://github.com/zeroclaw-labs/zeroclaw/issues/3767) | **MEDIUM** | Security enhancement; builds on existing OTP framework |
| **Token efficiency / context compression** | [#3892](https://github.com/zeroclaw-labs/zeroclaw/issues/3892) | **LOW-MEDIUM** | Architectural change; local-model users (Qwen3.5, 16K context) need this |
| **Slack `thread_replies` option** | [#3888](https://github.com/zeroclaw-labs/zeroclaw/issues/3888) | **HIGH** | Follows Mattermost pattern; mobile UX improvement |
| **Interrupt-on-new-message for Matrix/Discord/Mattermost** | [#3895](https://github.com/zeroclaw-labs/zeroclaw/pull/3895), [#3918](https://github.com/zeroclaw-labs/zeroclaw/pull/3918), [#3917](https://github.com/zeroclaw-labs/zeroclaw/pull/3917) | **HIGH** | PRs open; parity feature across channels |
| **Explicit `/stop` command** | [#3891](https://github.com/zeroclaw-labs/zeroclaw/pull/3891) | **HIGH** | PR open; fixes race condition in cancellation |

---

## 7. User Feedback Summary

### Pain Points
| Theme | Evidence | Severity |
|:---|:---|:---:|
| **Security overreach** | #1478, #3818 | 🔴 HIGH |
| "I disabled all safety, still blocked" — need granular override, not binary on/off |
| **Local provider fragility** | #3922, #3894, #3802 | 🟡 MEDIUM |
| Ollama/llama.cpp tool-calling, vision capabilities, custom endpoints fail handshake |
| **Install/upgrade friction** | #3852, #3925, #3904 | 🟡 MEDIUM |
| Missing configs, stale caches, Docker manifest issues on edge hardware (Orange Pi) |
| **Cron/daemon "ghost" behaviors** | #3920, #3819, #3826 | 🟡 MEDIUM |
| Skills not refreshing, allowed_tools lost, MCP deferred loading fails |

### Positive Signals
- **Autonomous skill creation** (#3825 → #3916) — users want "learn from success" automation
- **Runtime model switching** — power users appreciate flexibility without restart
- **I18n groundwork** — Chinese community engagement suggests global readiness

### Use Case Gaps
- **Personal/hobbyist "unsafe mode"** — self-hosted users reject enterprise security defaults
- **Low-resource edge deployment** — ARM SBCs (Orange Pi), 16K context local models

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Needs |
|:---|:---:|:---|:---|
| [#3887](https://github.com/zeroclaw-labs/zeroclaw/issues/3887) **Claude Code + Amazon Bedrock** | 1 day | Documentation gap | Integration guide; possibly provider config example |
| [#3892](https://github.com/zeroclaw-labs/zeroclaw/issues/3892) **Token efficiency analyzer** | 1 day | Architecture decision | Design RFC; conflicts with current "send everything" context strategy |
| [#3767](https://github.com/zeroclaw-labs/zeroclaw/issues/3767) **Cross-channel TOTP** | 2 days | Security roadmap | Product decision on gating scope; config schema design |
| [#2503](https://github.com/zeroclaw-labs/zeroclaw/issues/2503) **NapCat channel** | 16 days | Ecosystem coverage | Channel adapter implementation; Chinese IM protocol expertise |

**Maintainer Attention Recommended:** 
- [#3925](https://github.com/zeroclaw-labs/zeroclaw/issues/3925) (Docker build crash) — blocks container adoption
- [#3920](https://github.com/zeroclaw-labs/zeroclaw/issues/3920) (cron `allowed_tools` persistence) — subtle data loss bug

---

*Digest generated from 87 GitHub events (37 issues, 50 PRs, 7 releases) on 2026-03-19.*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-03-19

## 1. Today's Overview

PicoClaw shows **very high development velocity** with 89 PRs and 30 issues updated in the last 24 hours, indicating an active pre-release sprint toward v0.2.3. The project is undergoing a significant **Agent Architecture Refactor** (#1216) that redefines core abstractions through `SOUL.md` and `AGENT.md` files, while simultaneously expanding integration surface area with new TTS/ASR support, additional LLM providers, and enhanced channel capabilities. Community engagement is strong with multilingual documentation contributions (Spanish, Italian) and enterprise-oriented features like OTel observability and sandboxed Docker deployments. Stability concerns persist around provider-specific edge cases (GLM Coding Plan, Claude tool naming), but the rapid merge rate (39/89 PRs closed) suggests responsive maintenance. The nightly build cadence indicates imminent stable release.

---

## 2. Releases

| Version | Type | Notes |
|---------|------|-------|
| [v0.2.3-nightly.20260318.513537d2](https://github.com/sipeed/picoclaw/compare/v0.2.3...main) | Nightly | Automated build from commit `513537d2`; unstable, use with caution. Full changelog tracks delta from v0.2.3 tag to main branch. |

**No stable release today.** The nightly suggests v0.2.3 stable is approaching.

---

## 3. Project Progress

### Merged/Closed PRs Today (39 total, selected highlights)

| PR | Description | Impact |
|----|-------------|--------|
| [#1356](https://github.com/sipeed/picoclaw/pull/1356) | **fix: spawn tool respects target agent's model config** | Critical fix for multi-agent workflows; subagents now use correct model instead of inheriting caller's |
| [#1707](https://github.com/sipeed/picoclaw/pull/1707) | **feat(config): multiple API keys with failover** | Enterprise reliability; automatic key rotation on rate limits |
| [#1711](https://github.com/sipeed/picoclaw/pull/1711) | **fix(tools): propagate tool registry to subagents** | Unblocked subagent tool execution broken by multi-agent refactor |
| [#830](https://github.com/sipeed/picoclaw/pull/830) | **feat(channels): Google Chat support** | New enterprise channel integration |
| [#800](https://github.com/sipeed/picoclaw/pull/800) | **feat: Feishu message cards + streaming** | Enhanced Chinese enterprise messaging |
| [#1428](https://github.com/sipeed/picoclaw/pull/1428) | **fix(line): webhook body size limit (DoS prevention)** | Security hardening for LINE channel |
| [#1758](https://github.com/sipeed/picoclaw/pull/1758) | **feat(docker): sandboxed docker-compose** | Security isolation for untrusted workloads |

---

## 4. Community Hot Topics

### Most Active by Engagement

| Item | Comments | Analysis |
|------|----------|----------|
| [#1218](https://github.com/sipeed/picoclaw/issues/1218) **"[Agent refactor] what an Agent is"** | 27 comments, CLOSED | **Foundational architecture decision** — Established `SOUL.md` (freeform personality) vs `AGENT.md` (structured config) split. High engagement reflects community investment in agent identity modeling. |
| [#1648](https://github.com/sipeed/picoclaw/issues/1648) **"Adding TTS and ASR Support"** | 10 comments, OPEN | Strong demand for voice interfaces; PR #1642 exists but needs gateway integration. **Underlying need:** multimodal agent deployment for embedded/IoT use cases (aligns with Sipeed hardware focus). |
| [#1216](https://github.com/sipeed/picoclaw/issues/1216) **"Meta: Agent refactor"** | 8 comments, OPEN | Roadmap coordination hub; 6 tracked workstreams including context management, memory, and session boundaries. |
| [#1498](https://github.com/sipeed/picoclaw/issues/1498) **"模型端搜索和fastembed"** | 8 comments, CLOSED | Chinese community request for model-side search and FastEmbed integration; closed suggests either implemented or merged into broader roadmap. |
| [#806](https://github.com/sipeed/picoclaw/issues/806) **"Add webUI support"** | 4 comments, 👍7, HIGH PRIORITY | **Highest community demand** — Non-technical user accessibility. Currently in refactoring phase per labels. |

### Underlying Needs Analysis
- **Agent identity/personality** is becoming a first-class concern (SOUL.md ecosystem)
- **Voice/multimodal** interfaces critical for hardware-adjacent deployments
- **Web UI** remains the largest accessibility blocker for mainstream adoption

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|----------|-------|-------------|------------|
| 🔴 **High** | [#1757](https://github.com/sipeed/picoclaw/issues/1757) | Cron-scheduled tasks cause channel errors; agent fails to deliver responses | **PR #1766 open** — root cause identified in `ProcessDirectWithChannel` |
| 🔴 **High** | [#1652](https://github.com/sipeed/picoclaw/issues/1652) | GLM Coding Plan unsupported (429 errors, balance depletion) | CLOSED — provider-specific config issue |
| 🟡 **Medium** | [#1749](https://github.com/sipeed/picoclaw/issues/1749) | `/switch model` command broken in nightly | OPEN — regression in model routing |
| 🟡 **Medium** | [#1746](https://github.com/sipeed/picoclaw/issues/1746) | `reasoning_channel_id` non-functional with OpenAI-compatible providers | OPEN — LiteLLM/Venice AI integration gap |
| 🟡 **Medium** | [#1763](https://github.com/sipeed/picoclaw/issues/1763) | aarch64 .deb package installation fails | OPEN — packaging regression |
| 🟡 **Medium** | [#1734](https://github.com/sipeed/picoclaw/issues/1734) | Launcher GUI crashes silently on log file open failure | OPEN — error handling gap |
| 🟢 **Low** | [#1658](https://github.com/sipeed/picoclaw/issues/1658) | Claude API rejects empty tool names | CLOSED — validation fix merged |
| 🟢 **Low** | [#1307](https://github.com/sipeed/picoclaw/issues/1307) | Feishu auth expires after 12h | CLOSED — token refresh implemented |

**Stability Assessment:** Active cron/task scheduling features are fragile; model switching and reasoning channel routing need attention before v0.2.3 stable.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Issue | Predicted Inclusion | Rationale |
|---------|-------|---------------------|-----------|
| **Agent self-update (SOUL.md/USER.md)** | [#1756](https://github.com/sipeed/picoclaw/issues/1756) | v0.2.4 | Small scope, builds on #1705 foundation |
| **AGENT.md frontmatter extensions** (`soul` link, memory, `on_handoff`) | [#1754](https://github.com/sipeed/picoclaw/issues/1754) | v0.2.4 | Part of active refactor, low risk |
| **SOUL.md optional schema** | [#1755](https://github.com/sipeed/picoclaw/issues/1755) | v0.3.0 | Design decision pending; may delay |
| **TTS/ASR gateway integration** | [#1648](https://github.com/sipeed/picoclaw/issues/1648) | v0.2.3 or v0.2.4 | PR exists, blocked on review |
| **OpenAI API format channel** | [#1738](https://github.com/sipeed/picoclaw/issues/1738) | v0.2.4 | Enterprise embed demand; moderate complexity |
| **OTel GenAI observability** | [#1731](https://github.com/sipeed/picoclaw/issues/1731) | v0.3.0 | Enterprise feature, significant scope |
| **Exec tool PTY + background support** | [#1733](https://github.com/sipeed/picoclaw/issues/1733) | v0.2.4 | RFC stage; addresses long-running task gap |
| **Web UI** | [#806](https://github.com/sipeed/picoclaw/issues/806) | v0.3.0+ | Explicitly marked "Refactoring now"; major effort |

---

## 7. User Feedback Summary

### Pain Points
| Issue | User Context | Severity |
|-------|------------|----------|
| Silent failures | [#1734](https://github.com/sipeed/picoclaw/issues/1734) Launcher GUI crashes without output | Deployment friction |
| Configuration hot-reload unclear | [#1728](https://github.com/sipeed/picoclaw/issues/1728) "Do I need restart?" | Documentation gap; **PR #1747 addresses** |
| Provider fragmentation | [#1652](https://github.com/sipeed/picoclaw/issues/1652) GLM Coding Plan, [#1746](https://github.com/sipeed/picoclaw/issues/1746) reasoning_channel_id | Integration maintenance burden |
| Scheduled task reliability | [#1757](https://github.com/sipeed/picoclaw/issues/1757) Cron jobs fail silently | Production readiness blocker |

### Positive Signals
- Strong appreciation for **multilingual documentation** (Spanish, Italian PRs merged)
- **Docker sandboxing** (#1760) welcomed by security-conscious users
- **Hot-reload of workspace configs** (#1747) clarifies long-standing UX confusion

### Use Case Patterns
- **Embedded/IoT deployment**: Raspberry Pi Zero W (#1757), aarch64 packaging (#1763)
- **Enterprise messaging**: Feishu, LINE, Google Chat, Telegram integrations
- **Multi-agent orchestration**: Spawn tool fixes indicate active production use

---

## 8. Backlog Watch

### Long-Standing Items Needing Attention

| Item | Age | Issue | Risk |
|------|-----|-------|------|
| [#547](https://github.com/sipeed/picoclaw/issues/547) | 27 days | AGENT.md task-solving patterns | Documentation debt; blocks self-service agent development |
| [#500](https://github.com/sipeed/picoclaw/pull/500) | 27 days | LINE Bot SDK refactor | Technical debt; security relevance (see #1428 fix) |
| [#1042](https://github.com/sipeed/picoclaw/issues/1042) | 14 days | exec tool `guardCommand` over-restrictive | Breaks common workflows (curl, weather queries) |
| [#1209](https://github.com/sipeed/picoclaw/issues/1209) | 11 days | Timeout/context deadline errors | 👍2; affects first-time user experience |
| [#1332](https://github.com/sipeed/picoclaw/pull/1332) | 8 days | Real-time tool feedback via channels | UX enhancement; review backlog |

### Maintainer Attention Recommended
- **#547**: Core to agent usability; 4 comments but no assignee
- **#500**: Refactor PR stalled; security fix (#1428) applied separately, increasing merge conflict risk
- **#1042**: Safety/UX trade-off needs policy decision

---

*Digest generated from GitHub activity 2026-03-18. All times UTC. Links verified against `github.com/sipeed/picoclaw`.*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-03-19

---

## 1. Today's Overview

NanoClaw shows **high velocity but concerning stability patterns**, with 50 PRs and 25 issues updated in 24 hours—exceptional activity for a project of this scope. However, the 10:1 ratio of open to merged/closed PRs (40:10) and 24:1 open-to-closed issue ratio signals potential bottlenecks in review capacity. A critical security disclosure request (#1149) remains unaddressed after 3 days, while multiple high-severity bugs around session management, container propagation, and pipeline timeouts were reported today. The project is experiencing growing pains typical of rapid adoption: infrastructure scaling challenges, TOS compliance uncertainty, and merge conflicts across the skill branch architecture.

---

## 2. Releases

**No new releases** — Version remains unchanged. Notable given the volume of bug fixes and features in flight.

---

## 3. Project Progress

### Merged/Closed Today (10 total, 3 shown with significance)

| PR | Description | Impact |
|:---|:---|:---|
| [#1254](https://github.com/qwibitai/nanoclaw/pull/1254) | **CLOSED**: Cloudflare Workers enterprise migration (ThagomizerClaw rebrand) | **Rejected/abandoned** — Large-scale restructure to Cloudflare architecture withdrawn |
| [#1252](https://github.com/qwibitai/nanoclaw/pull/1252) | **CLOSED**: Three-root path model for containerization readiness | **Deferred** — Docker-in-Docker support architecture closed without merge |
| [#932](https://github.com/qwibitai/nanoclaw/pull/932) | **CLOSED**: "Gen tech agency main" | **Blocked/abandoned** — Unclear scope, template not completed |

### Notable Open PRs Advancing

| PR | Feature | Status |
|:---|:---|:---|
| [#1111](https://github.com/qwibitai/nanoclaw/pull/1111) | API usage tracking with cost analytics | Needs review — foundational for billing/observability |
| [#1255](https://github.com/qwibitai/nanoclaw/pull/1255) | MiniMax OAuth provider (non-Anthropic option) | Fresh — addresses vendor lock-in concerns |
| [#1043](https://github.com/qwibitai/nanoclaw/pull/1043) | Hybrid BM25+vector memory (memory-lancedb-pro) | Needs review — major retrieval quality upgrade |
| [#1191](https://github.com/qwibitai/nanoclaw/pull/1191) | Security fix: stop logging user prompts | Addresses #1150 — privacy-critical |

---

## 4. Community Hot Topics

### By Engagement (Comments + Reactions)

| Rank | Issue/PR | Engagement | Topic | Underlying Need |
|:---|:---|:---:|:---|:---|
| 1 | [#865](https://github.com/qwibitai/nanoclaw/issues/865) | 5 comments | Container security architecture | **Zero-trust redesign** — users want defense-in-depth beyond container boundaries |
| 2 | [#1149](https://github.com/qwibitai/nanoclaw/issues/1149) | 3 comments, Critical | Undisclosed security vulnerability | **Responsible disclosure process** — project lacks private security channel |
| 3 | [#1163](https://github.com/qwibitai/nanoclaw/issues/1163) | 2 👍 | OpenCode/Claude Code alternatives | **Vendor independence** — enterprise users need multi-provider flexibility |
| 4 | [#1184](https://github.com/qwibitai/nanoclaw/issues/1184) | 1 👍, 1 comment | K8s/Sealos deployment | **Production hardening** — air-gapped/restricted environment support |

### Key Tensions
- **Security vs. convenience**: #865's critique that "containers alone don't make you secure" challenges core architecture assumptions
- **Anthropic dependency risk**: #1224 (TOS compliance) + #1163 (OpenCode) + #1255 (MiniMax) show community pressure for provider diversification

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix PR? |
|:---|:---|:---|:---:|
| 🔴 **Critical** | [#1149](https://github.com/qwibitai/nanoclaw/issues/1149) | Undisclosed security finding — no private disclosure channel | ❌ **None** — maintainer response needed |
| 🔴 **High** | [#1242](https://github.com/qwibitai/nanoclaw/issues/1242) | Pipeline stage timeouts defined but never enforced — 3 runs stuck | ❌ None |
| 🔴 **High** | [#1236](https://github.com/qwibitai/nanoclaw/issues/1236) | Agent-runner updates don't propagate to existing groups | ❌ None |
| 🔴 **High** | [#1216](https://github.com/qwibitai/nanoclaw/issues/1216) | Stale Claude Code session IDs cause permanent resume failures | ❌ None |
| 🔴 **High** | [#1150](https://github.com/qwibitai/nanoclaw/issues/1150) | Container error logs leak full user prompts to disk | ✅ [#1191](https://github.com/qwibitai/nanoclaw/pull/1191) |
| 🔴 **High** | [#1135](https://github.com/qwibitai/nanoclaw/issues/1135) | `update-nanoclaw` silently drops customized code | ❌ None |
| 🟡 **Medium** | [#1243](https://github.com/qwibitai/nanoclaw/issues/1243) | Discord DM message splitting breaks mid-word | ❌ None (easy fix: reuse `smartSplitMessage`) |
| 🟡 **Medium** | [#1210](https://github.com/qwibitai/nanoclaw/issues/1210) | Ali BaiLian API proxy fails for Claude models | ❌ None (workaround: model mapping in container) |
| 🟡 **Medium** | [#1141](https://github.com/qwibitai/nanoclaw/issues/1141) | Per-group `trigger_pattern` ignored — global always used | ❌ None |

### Stability Assessment
**Concerning**: 6 open high-severity bugs with no fixes, including 3 operational failures (pipeline timeouts, session recovery, update propagation) that affect production reliability. The security disclosure gap (#1149) is a governance risk.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Request | Likelihood in Next Release | Rationale |
|:---|:---|:---:|:---|
| **Multi-provider support** | #1163 (OpenCode), #1255 (MiniMax) | **High** | 3 converging PRs/issues; #1255 already implemented |
| **Session management** | #1211 (`/new` command), #1216 (session recovery) | **High** | Critical bug + UX pain; small scope |
| **Usage analytics** | #1111 (API tracking), #1187 (dashboard) | **Medium-High** | #1111 in review; #1187 skill-based |
| **Voice input** | #1250 (local Whisper) | **Medium** | Skill architecture allows parallel merge |
| **Email channel** | #1251 (OpenMail) | **Medium** | Follows established `/add-*` pattern |
| **Approval workflows** | #1245 (`/approve`, `/reject`) | **Medium** | Governance feature for enterprise |
| **TOS-compliant architecture** | #1224 (Claude Code CLI replacement) | **Uncertain** | Legal/strategic decision needed |

### Architecture Signals
- **Skill branch maintenance debt**: #1226, #1227, #1228 show repeated merge-forward failures for `skill/apple-container` and `skill/compact` — automation needs hardening
- **Memory system evolution**: #1043's hybrid retrieval likely replaces basic `memory.ts`

---

## 7. User Feedback Summary

### Pain Points

| Theme | Evidence | Severity |
|:---|:---|:---:|
| **Deployment complexity** | #1184 (K8s/Sealos), #1225 (Docker-less), #1253 (WSL networking) | High |
| **Security uncertainty** | #865 (container trust), #1149 (undisclosed vuln), #1150 (log leaks) | Critical |
| **Vendor lock-in anxiety** | #1224 (TOS), #1163 (OpenCode), #1210 (Ali BaiLian proxy) | High |
| **Silent failures** | #1135 (auto-merge drops code), #1236 (updates don't propagate), #1242 (timeouts ignored) | High |
| **Documentation drift** | #1075 (Linux support claims mismatch) | Low |

### Use Cases Emerging
- **Enterprise/regulated environments**: Air-gapped K8s, approval gates, audit trails (#1245, #1111)
- **Personal assistant deployment**: WhatsApp (#1183), voice (#1250), email (#1251)
- **Cost-conscious self-hosting**: MiniMax OAuth (#1255), local Whisper (#1250), vLLM backends (#1241)

### Satisfaction Signals
- Strong appreciation for "minimalist approach" (#1184) and "lightweight, secure alternative to bloated frameworks"
- Active skill ecosystem contributions (5+ new skill PRs today)

---

## 8. Backlog Watch

### Critical Attention Needed

| Issue/PR | Age | Risk | Action Required |
|:---|:---:|:---|:---|
| [#1149](https://github.com/qwibitai/nanoclaw/issues/1149) | 3 days | **Security disclosure without channel** | Establish `security@` or GitHub private vulnerability reporting |
| [#418](https://github.com/qwibitai/nanoclaw/pull/418) | 24 days | Mount config bugs block customization | Review blocked PR fixing `container_config` sync |
| [#822](https://github.com/qwibitai/nanoclaw/pull/822) | 11 days | MCP tool incomplete | Wire `containerConfig` through `register_group` |
| [#865](https://github.com/qwibitai/nanoclaw/issues/865) | 10 days | Architecture security critique | Maintainer response to zero-trust proposal |

### Skill Branch Debt
- `skill/apple-container` and `skill/compact` have **failed 3 consecutive merge-forwards** (#1226-1228) — risk of divergence from main

---

## Health Indicators

| Metric | Status | Note |
|:---|:---:|:---|
| Activity velocity | 🟢 Strong | 75 updates/24h |
| Review bandwidth | 🔴 Constrained | 80% PRs open, 40:10 ratio |
| Security posture | 🔴 At risk | Unaddressed disclosure, log leaks |
| Release cadence | 🔴 Stalled | No release despite volume |
| Community growth | 🟢 Healthy | Diverse skill contributions |

**Recommendation**: Prioritize security response process, merge #1191 (prompt logging fix), and establish triage for high-severity bugs before feature velocity compounds technical debt.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-03-19

---

## 1. Today's Overview

NullClaw shows **high development velocity** with 26 PRs and 17 issues updated in 24 hours, indicating an active release cycle around v2026.3.17. The project demonstrates strong maintainer responsiveness with 14 merged/closed PRs against 12 open ones. A significant portion of activity centers on **bug fixes for the 6xx regression series** affecting Matrix, Telegram, AIEOS identity injection, and Docker packaging—suggesting a stabilization push following recent feature releases. Community engagement is healthy with multi-language documentation (EN/ZH) and diverse contributor involvement. The codebase appears to be in a **stabilization phase** with hot reload, observability, and channel reliability as current priorities.

---

## 2. Releases

### v2026.3.17 (Latest)
**Release Date:** 2026-03-18 | [PR #614](https://github.com/nullclaw/nullclaw/pull/614)

| Change | Description | Impact |
|--------|-------------|--------|
| Runtime Observability | Added OTLP support and runtime observability wiring | Enables production monitoring, tracing |
| Hardened External Channels | New channel plugin architecture with security improvements | Breaking: channel config schema may need updates |
| Version Bump | Routine release versioning | None |

**Migration Notes:** Users leveraging custom channel configurations should verify compatibility with the new hardened plugin system. OTLP exporters require new environment variables (documentation pending).

---

## 3. Project Progress

### Merged/Closed PRs Today (14 total)

| PR | Title | Author | Significance |
|----|-------|--------|------------|
| [#632](https://github.com/nullclaw/nullclaw/pull/632) | Fix 6xx regressions (prompt, Matrix, Telegram, packaging) | manelsen | **Major stabilization** — bundled fix for identity injection, Matrix DM detection, Telegram draft spam |
| [#571](https://github.com/nullclaw/nullclaw/pull/571) | Hot reload for config and skills | manelsen | Core UX improvement — no restart needed for config changes |
| [#609](https://github.com/nullclaw/nullclaw/pull/609) | Encrypt persisted API keys in config.json | manelsen | Security hardening — addresses plaintext credential exposure |
| [#500](https://github.com/nullclaw/nullclaw/pull/500) | Fix dangling provider pointer in named-agent sessions | vedmalex | Stability fix for `/bind <agent>` regression |
| [#275](https://github.com/nullclaw/nullclaw/pull/275) | Per-agent workspace isolation | DNature | Architecture milestone — named agents get full isolation |
| [#535](https://github.com/nullclaw/nullclaw/pull/535) | Stop logging pairing code secrets | manelsen | Security fix — removes credential exposure in logs |
| [#605](https://github.com/nullclaw/nullclaw/pull/605) | OpenRC support on Linux | manelsen | Platform expansion — alternative to systemd |
| [#621](https://github.com/nullclaw/nullclaw/pull/621) | Add Novita AI provider | Alex-wuhu | Provider ecosystem growth |
| [#519](https://github.com/nullclaw/nullclaw/pull/519) | Fix curl timeout hardcoding | lighterEB | Reliability fix — respects user config |
| [#607](https://github.com/nullclaw/nullclaw/pull/607) | MAX support (closed, rejected) | ivanstepanovftw | **Won't fix** — ethical/security concerns cited |

**Key Advances:**
- **Operational maturity**: Hot reload, encrypted credentials, observability wiring
- **Multi-platform service management**: OpenRC joins systemd support
- **Security posture**: Pairing codes, API keys, and secrets handling improved

---

## 4. Community Hot Topics

### Most Active Discussions

| Rank | Issue/PR | Comments | Topic | Underlying Need |
|------|----------|----------|-------|---------------|
| 1 | [#117](https://github.com/nullclaw/nullclaw/issues/117) Add custom provider | 12 | Claude integration | **Provider flexibility** — users want non-OpenAI models without complex configuration |
| 2 | [#626](https://github.com/nullclaw/nullclaw/issues/626) Telegram TEXTDRAFT_PEER_INVALID | 2 | Draft API errors | **Reliability** — production Telegram bots failing silently |
| 3 | [#339](https://github.com/nullclaw/nullclaw/issues/339) Android install issues | 2 | Termux/build.zig.zon | **Accessibility** — mobile/ARM developer experience gap |
| 4 | [#619](https://github.com/nullclaw/nullclaw/issues/619) Improve error message: error.ApiError | 1 | Opaque error messages | **Observability** — operators cannot debug production issues |

**Analysis:** The 12-comment thread on custom providers (#117) reveals a **core platform gap** — users expect pluggable model backends as a first-class feature, not a configuration workaround. The Telegram draft errors (#626) and opaque API errors (#619) suggest **production readiness gaps** in error handling and channel resilience.

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|----------|-------|-------------|------------|
| **Critical** | [#626](https://github.com/nullclaw/nullclaw/issues/626) | Telegram `TEXTDRAFT_PEER_INVALID` spamming logs, potential retry storm | **PR [#635](https://github.com/nullclaw/nullclaw/pull/635)** open — suppresses invalid peer retries |
| **Critical** | [#625](https://github.com/nullclaw/nullclaw/issues/625) | AIEOS identity configuration parsed but never injected into prompts | **PR [#633](https://github.com/nullclaw/nullclaw/pull/633)** open — fixes injection wiring |
| **High** | [#616](https://github.com/nullclaw/nullclaw/issues/616) | Matrix private room detection wrong (uses unique speakers vs. joined members) | **PR [#634](https://github.com/nullclaw/nullclaw/pull/634)** open — uses `m.joined_member_count` |
| **High** | [#629](https://github.com/nullclaw/nullclaw/issues/629) | Podman HTTP gateway fails with schema error (`default_provider` unsupported) | **PR [#636](https://github.com/nullclaw/nullclaw/pull/636)** open — updates container starter config |
| **High** | [#612](https://github.com/nullclaw/nullclaw/issues/612) | NixOS 25.11 build failure for v2026.3.15 | **PR [#637](https://github.com/nullclaw/nullclaw/pull/637)** open — pins Zig 0.15.2 |
| **Medium** | [#339](https://github.com/nullclaw/nullclaw/issues/339) | Android/Termux build failures | No fix PR; platform support gap |
| **Medium** | [#622](https://github.com/nullclaw/nullclaw/pull/622) | Profile-aware hot reload incomplete | Open PR — adds `/config` to Telegram menu |

**Regression Pattern:** The "6xx" series of bugs suggests **schema migration pain** from legacy `default_provider`/`default_model` top-level config to new `agents.defaults.model.primary` structure. Multiple fixes in flight indicate coordinated stabilization effort.

---

## 6. Feature Requests & Roadmap Signals

| Issue | Request | Likelihood in Next Version | Rationale |
|-------|---------|---------------------------|-----------|
| [#631](https://github.com/nullclaw/nullclaw/issues/631) GET /status endpoint for agent monitoring | **High** | Fits observability theme; complements OTLP work |
| [#624](https://github.com/nullclaw/nullclaw/issues/624) Vision pipeline: image/file base64 encoding | **Medium-High** | Referenced implementation exists (picoclaw); multimodal trend |
| [#623](https://github.com/nullclaw/nullclaw/issues/623) DuckDuckGo search (ddgs) option | **Medium** | Low complexity, expands tool ecosystem |
| [#618](https://github.com/nullclaw/nullclaw/issues/618) Wait for message stream before responding ("wife safe") | **Medium** | UX polish; debouncing pattern common in chatbots |
| [#613](https://github.com/nullclaw/nullclaw/issues/613) Improve config.json documentation | **High** | Onboarding friction repeatedly cited |
| [#628](https://github.com/nullclaw/nullclaw/pull/628) Gemini CLI local provider (ACP mode) | **High** | PR open; keyless local LLM trend |
| [#527](https://github.com/nullclaw/nullclaw/pull/527) Adaptive intelligence pipeline + email/WhatsApp | **Medium** | Large feature; may slip to v2026.4.x |

**Emerging Themes:**
- **Local/edge AI**: Gemini CLI provider, vision pipeline — reducing cloud dependency
- **Operational visibility**: Status endpoints, better errors, OTLP — production hardening
- **Human UX patterns**: Message batching, clearer config — reducing cognitive load

---

## 7. User Feedback Summary

### Pain Points
| Issue | User Quote / Symptom | Category |
|-------|----------------------|----------|
| [#619](https://github.com/nullclaw/nullclaw/issues/619) | *"frustrating to have to grep the code"* | Debuggability |
| [#613](https://github.com/nullclaw/nullclaw/issues/613) | *"some configuration options seem to have no practical use"* | Documentation |
| [#339](https://github.com/nullclaw/nullclaw/issues/339) | Android/Termux build failures | Platform accessibility |
| [#618](https://github.com/nullclaw/nullclaw/issues/618) | Bot responds to each message individually when wife sends 4 rapid messages | UX edge cases |
| [#629](https://github.com/nullclaw/nullclaw/issues/629) | Podman quickstart fails with schema error | First-run experience |

### Positive Signals
- Hot reload (#571) — *"without restarting the daemon"* — operational delight
- Encrypted API keys (#609) — security-conscious users satisfied
- Per-agent isolation (#275) — power user feature for multi-tenant deployments

### Use Case Diversity
- **Personal assistants** (spouse-facing bots, #618)
- **Multi-platform deployments** (Telegram, Matrix, WhatsApp, email)
- **Security-conscious operators** (encrypted credentials, secret management)
- **Mobile/ARM developers** (Android builds, though currently frustrated)

---

## 8. Backlog Watch

| Issue | Age | Status | Risk |
|-------|-----|--------|------|
| [#117](https://github.com/nullclaw/nullclaw/issues/117) Custom provider (Claude) | 22 days | 12 comments, no assignee | **High** — core platform gap, user retention risk |
| [#193](https://github.com/nullclaw/nullclaw/issues/193) OS-native credential management | 18 days | Closed 2026-03-18 | Resolved — merged into credential security work |
| [#339](https://github.com/nullclaw/nullclaw/issues/339) Android install | 13 days | 2 comments, no fix PR | **Medium** — platform expansion blocked |
| [#275](https://github.com/nullclaw/nullclaw/pull/275) Per-agent workspace isolation | 15 days | **Merged 2026-03-18** | Resolved |

**Attention Needed:**
- **#117** requires architectural decision on provider plugin API — longest-running active issue with highest engagement
- **Android/Termux support** (#339) — no maintainer response; growing mobile developer segment underserved

---

## Project Health Assessment

| Metric | Status |
|--------|--------|
| Velocity | 🟢 High (40+ items/24h) |
| Responsiveness | 🟢 Strong (14/26 PRs closed) |
| Stability | 🟡 Transitional (6xx regression cleanup in progress) |
| Documentation | 🟠 Lagging (config confusion, onboarding friction) |
| Security | 🟢 Improving (encryption, secret handling) |
| Community | 🟢 Diverse (multi-language, multi-platform contributions) |

**Outlook:** NullClaw is executing a **stabilization sprint** following feature expansion. Success depends on landing the 6xx regression fixes and resolving the provider extensibility question (#117) to unblock user-requested model integrations.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-03-19

## 1. Today's Overview

IronClaw shows **exceptionally high development velocity** with 93 items updated in 24 hours (43 issues, 50 PRs). The project is in active stabilization mode following a major staging promotion ([PR #1387](https://github.com/nearai/ironclaw/pull/1387)), with significant focus on security hardening, routine system reliability, and LLM backend expansion. The 60% open/40% closed ratio across issues and PRs indicates heavy active development rather than maintenance stagnation. Critical infrastructure concerns dominate: SSRF prevention, token budget enforcement, and WASM tool schema correctness are receiving urgent attention.

---

## 2. Releases

**No new releases** — version remains unchanged. The staging-to-main promotion ([PR #1387](https://github.com/nearai/ironclaw/pull/1387)) contains 30+ commits but has not been tagged as a formal release.

---

## 3. Project Progress

### Merged/Closed PRs Today (20 total, selected highlights)

| PR | Description | Impact |
|:---|:---|:---|
| [#1385](https://github.com/nearai/ironclaw/pull/1385) | Remove `debug_assert` guards that panicked on valid error paths | **Stability fix** — prevents debug/test crashes on legitimate user operations |
| [#1191](https://github.com/nearai/ironclaw/pull/1191) | Unified Settings page with Inference/Agent/Channels subtabs | **UX milestone** — consolidates fragmented configuration UI |
| [#1380](https://github.com/nearai/ironclaw/pull/1380) | Cache `discovery_schema()` with `OnceLock`; fix event cache allocation | **Performance** — addresses critical N+1 schema generation ([Issue #1361](https://github.com/nearai/ironclaw/issues/1361)) |
| [#1374](https://github.com/nearai/ironclaw/pull/1374) | `full_job` routine runs stay running until linked job completion | **Reliability** — fixes concurrency bypass and premature success reporting |
| [#1315](https://github.com/nearai/ironclaw/pull/1315) | Auto-reinitialize MCP sessions on 400 'Missing session ID' | **Resilience** — handles MCP server session expiration gracefully |
| [#1329](https://github.com/nearai/ironclaw/issues/1329) | Fix secret leak detection blocking Telegram permanently | **Critical fix** — unblocks users after false-positive secret detection |

### Key Advances
- **Routine system hardening**: Multiple PRs closed around `full_job` lifecycle, concurrency guards, and self-recovery ([#1374](https://github.com/nearai/ironclaw/pull/1374), [#1318](https://github.com/nearai/ironclaw/issues/1318), [#1317](https://github.com/nearai/ironclaw/issues/1317))
- **Schema performance**: Eliminated repeated JSON schema regeneration on hot paths
- **MCP reliability**: Session expiration handling and per-server approval modes

---

## 4. Community Hot Topics

### Most Active by Engagement

| Rank | Item | Comments | Analysis |
|:---|:---|:---:|:---|
| 1 | [#815](https://github.com/nearai/ironclaw/issues/815) Token budget bypass via metadata | 2 | **Security-critical**: Staging CI auto-detected HIGH severity issue; no validation on `max_tokens` in job metadata. Indicates need for centralized resource policy enforcement. |
| 2 | [#1228](https://github.com/nearai/ironclaw/issues/1228) Codecov coverage gates | 2 | **Quality infrastructure**: Mars-rover reliability goal driving stricter CI gates. Community wants measurable quality bars. |
| 3 | [#1205](https://github.com/nearai/ironclaw/issues/1205) Slack tool install fails (404) | 2 | **Distribution problem**: WASM release artifacts missing or misnamed. Suggests release automation gaps for tool ecosystem. |
| 4 | [#1384](https://github.com/nearai/ironclaw/issues/1384) Telegram auth looks for capabilities in wrong path | 1 | **CLI ergonomics**: Inconsistent path conventions between `channels/` and `tools/` directories confusing users. |
| 5 | [#1280](https://github.com/nearai/ironclaw/issues/1280) Flaky OAuth wildcard callback tests | 1 | **CI stability**: Race condition on `OAUTH_CALLBACK_HOST` blocking staging promotions intermittently. |

**Underlying needs**: 
- Stronger input validation at API boundaries (security)
- Reliable artifact distribution for tools (ecosystem growth)
- Consistent CLI path conventions (developer experience)
- Deterministic CI for faster iteration velocity

---

## 5. Bugs & Stability

### Critical/High Severity (Open)

| Issue | Severity | Status | Fix PR |
|:---|:---:|:---|:---|
| [#815](https://github.com/nearai/ironclaw/issues/815) User metadata bypasses token budget | **HIGH** | Open, staging-ci-review | None identified |
| [#1103](https://github.com/nearai/ironclaw/issues/1103) SSRF via embedding base URL | **HIGH** | Open, staging-ci-review | [#1221](https://github.com/nearai/ironclaw/pull/1221) (open, XL size) |
| [#1280](https://github.com/nearai/ironclaw/issues/1280) Flaky OAuth callback tests | **P1** | Open | None identified |
| [#1303](https://github.com/nearai/ironclaw/issues/1303) WASM tools expose `{}` schemas instead of typed | **MEDIUM** | Open | [#1348](https://github.com/nearai/ironclaw/pull/1348) (open) |
| [#1320](https://github.com/nearai/ironclaw/issues/1320) Routines lack bounded self-recovery | **MEDIUM** | Open | None identified |

### Critical/High (Closed Today)

| Issue | Severity | Resolution |
|:---|:---|:---|
| [#1361](https://github.com/nearai/ironclaw/issues/1361) N+1 schema generation on every LLM call | **CRITICAL** | Fixed by [#1380](https://github.com/nearai/ironclaw/pull/1380) |
| [#1362](https://github.com/nearai/ironclaw/issues/1362) Unbounded JSON mutation in routine_create_schema | **HIGH** | Fixed in staging promotion |
| [#1369](https://github.com/nearai/ironclaw/issues/1369) Large Vec allocation every trigger check | **HIGH** | Fixed in staging promotion |
| [#1287](https://github.com/nearai/ironclaw/issues/1287) Unbounded Retry-After DoS | **HIGH** | Closed (fix merged) |

**Stability assessment**: Heavy automated CI review ([`staging-ci-review`](https://github.com/nearai/ironclaw/labels/staging-ci-review)) is surfacing deep performance and security issues. The project is actively paying down technical debt in hot paths.

---

## 6. Feature Requests & Roadmap Signals

| PR/Issue | Feature | Likelihood in Next Release |
|:---|:---|:---:|
| [#1383](https://github.com/nearai/ironclaw/pull/1383) Per-server MCP approval_mode override | **High** — Small scope, addresses immediate UX pain |
| [#1340](https://github.com/nearai/ironclaw/pull/1340) Custom LLM provider via web UI | **High** — Large but complete, community demand evident |
| [#1356](https://github.com/nearai/ironclaw/pull/1356) Gemini OAuth integration | **Medium** — XL size, complex auth flow |
| [#1254](https://github.com/nearai/ironclaw/pull/1254) Webhook callbacks for relay events | **Medium** — Architectural change, needs security review |
| [#1243](https://github.com/nearai/ironclaw/pull/1243) Per-job MCP filtering + max_iterations | **Medium** — Gated behind feature flag, needs validation |
| [#927](https://github.com/nearai/ironclaw/pull/927) Chat onboarding and routine advisor | **Medium** — Large feature, may be held for polish |
| [#1299](https://github.com/nearai/ironclaw/pull/1299) Aliyun BaiLian support | **Low-Medium** — New backend, needs ongoing maintenance commitment |

**Emerging themes**: 
- **Multi-backend LLM flexibility** (Gemini, Aliyun, custom providers)
- **Fine-grained control** (per-server approvals, per-job resource limits)
- **Webhook/event-driven architecture** replacing polling

---

## 7. User Feedback Summary

### Pain Points (Real User Reports)

| Issue | User | Problem | Severity |
|:---|:---|:---|:---:|
| [#1386](https://github.com/nearai/ironclaw/issues/1386) | onsails | Telegram webhook secret not generated — security exposure | **Security** |
| [#1382](https://github.com/nearai/ironclaw/issues/1382) | onsails | Cloudflare tunnel fails to produce URL (30s timeout) | **Blocking** |
| [#1381](https://github.com/nearai/ironclaw/issues/1381) | onsails | Embeddings broken with NEAR AI backend | **Functional** |
| [#1384](https://github.com/nearai/ironclaw/issues/1384) | doismellburning | Wrong path for Telegram capabilities file | **UX friction** |
| [#1205](https://github.com/nearai/ironclaw/issues/1205) | kristiandupont | Slack tool 404 on install | **Ecosystem** |

### Satisfaction Indicators
- **Positive**: Active maintainer response (most issues updated same day)
- **Negative**: Multiple blocking issues from same user (onsails) suggests onboarding/QA gaps

**Use case signals**: Users actively deploying to production with Telegram, Cloudflare tunnels, and custom LLM backends — not just local experimentation.

---

## 8. Backlog Watch

### Needs Maintainer Attention

| Item | Age | Issue | Action Needed |
|:---|:---:|:---|:---|
| [#605](https://github.com/nearai/ironclaw/issues/605) | 12 days | Test coverage: rate_limit_cascade threshold | Test infrastructure — blocking reliability validation |
| [#927](https://github.com/nearai/ironclaw/pull/927) | 8 days | Chat onboarding (XL PR) | Review/merge decision or decomposition |
| [#1221](https://github.com/nearai/ironclaw/pull/1221) | 4 days | SSRF fix (XL, security) | Priority review — HIGH severity issue open |
| [#1234](https://github.com/nearai/ironclaw/pull/1234) | 3 days | Stuck job detection activation | Reliability feature — relates to [#1320](https://github.com/nearai/ironclaw/issues/1320) |
| [#815](https://github.com/nearai/ironclaw/issues/815) | 9 days | Token budget bypass | **Security** — no fix PR identified |

### Risk Assessment
- **Security debt**: Two HIGH severity issues ([#815](https://github.com/nearai/ironclaw/issues/815), [#1103](https://github.com/nearai/ironclaw/issues/1103)) with open fixes needing review
- **Test gaps**: [#605](https://github.com/nearai/ironclaw/issues/605) indicates reliability testing may be insufficient for production guarantees
- **XL PR backlog**: Multiple large features in flight increases merge conflict risk

---

*Generated from IronClaw GitHub activity 2026-03-18 to 2026-03-19*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-03-19

## 1. Today's Overview

LobsterAI shows **high development velocity** with 12 PRs updated in the last 24 hours (10 merged/closed, 2 open) and 13 active issues. The project is actively stabilizing its v0.2.4 release with multiple hotfixes for critical user-facing bugs including scheduled task migration failures, UI freezing during IM configuration changes, and OpenClaw gateway crashes. No new release was cut today, suggesting the team is accumulating fixes for a patch release. Community engagement is moderate with one copyright dispute issue gaining traction.

---

## 2. Releases

**No new releases** — Latest remains unlisted (v0.2.4 implied from PR context).

---

## 3. Project Progress

### Merged/Closed PRs (10 items)

| PR | Title | Key Improvement |
|:---|:---|:---|
| [#473](https://github.com/netease-youdao/LobsterAI/pull/473) | NIM gateway migration to OpenClaw plugin | **Architecture**: Unified IM channel architecture — NetEase IM now runs via `openclaw-nim` plugin, matching DingTalk/Feishu/Telegram/Discord/QQ/WeCom patterns |
| [#477](https://github.com/netease-youdao/LobsterAI/pull/477) | Scheduled task migration + i18n fix | **Bugfix**: Fixes 8-hour timezone drift for legacy `at` tasks; skips expired one-time tasks; adds main-process internationalization |
| [#484](https://github.com/netease-youdao/LobsterAI/pull/484) | OpenClaw gateway auto-restart | **Reliability**: Automatic restart on gateway failure |
| [#487](https://github.com/netease-youdao/LobsterAI/pull/487) | Fix UI freeze on IM config change during cowork | **Critical Bugfix**: Resolves permanent streaming state when gateway restarts mid-session |
| [#486](https://github.com/netease-youdao/LobsterAI/pull/486) | IM config sync only on save | **UX**: Prevents premature gateway restarts; defers sync until explicit save |
| [#483](https://github.com/netease-youdao/LobsterAI/pull/483) | AGENTS.md documentation update | **Docs**: OpenClaw dev commands, environment variables, runtime build instructions, agent engine architecture |
| [#482](https://github.com/netease-youdao/LobsterAI/pull/482) | Enterprise WeChat dependency upgrade | **Maintenance**: WeCom SDK updates |
| [#471](https://github.com/netease-youdao/LobsterAI/pull/471) | OpenClaw native Skills loading | **Architecture**: Replaces AGENTS.md inline skills with native OpenClaw Skills system |
| [#376](https://github.com/netease-youdao/LobsterAI/pull/376) | Hourly scheduled tasks | **Feature**: New `hourly` schedule mode with minute-level precision |
| [#488](https://github.com/netease-youdao/LobsterAI/pull/488) | Pr 473 | (Merge commit) |

**Technical Direction**: Heavy investment in OpenClaw runtime stability, plugin architecture unification, and scheduled task reliability.

---

## 4. Community Hot Topics

| Issue/PR | Activity | Analysis |
|:---|:---|:---|
| [#435](https://github.com/netease-youdao/LobsterAI/issues/435) "这是套壳的嘛？界面高度相似" | **5 comments**, image evidence | **Copyright/IP concern**: User alleges "Zeelin Claw" and "Wind Claw" are LobsterAI forks without attribution. Screenshot shows near-identical UI. Underlying need: **License enforcement clarity** and official stance on commercial forks. |
| [#382](https://github.com/netease-youdao/LobsterAI/issues/382) "更新时所有设置都要重新填写" | **2 comments** | **Retention pain**: Settings loss on update frustrates power users. Signals need for **migration-preserving installer** or config backup. |
| [#490](https://github.com/netease-youdao/LobsterAI/issues/490) "OpenClaw反复出错重启" | **1 comment**, created yesterday | **Stability**: Nightly task interruption. User-facing impact of gateway instability that [#484](https://github.com/netease-youdao/LobsterAI/pull/484) auto-restart aims to mitigate. |

**Underlying Pattern**: Users are building production workflows on LobsterAI and hitting reliability/ownership friction points.

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|:---|:---|:---|:---|
| 🔴 **High** | [#490](https://github.com/netease-youdao/LobsterAI/issues/490) | OpenClaw crashes/restarts mid-task execution | **Mitigated**: [#484](https://github.com/netease-youdao/LobsterAI/pull/484) adds auto-restart; root cause investigation ongoing |
| 🔴 **High** | [#474](https://github.com/netease-youdao/LobsterAI/issues/474) | v2026.3.16: Scheduled tasks lost, sandbox option missing | **Fixed**: [#477](https://github.com/netease-youdao/LobsterAI/pull/477) addresses timezone drift and task migration |
| 🟡 **Medium** | [#487](https://github.com/netease-youdao/LobsterAI/pull/487) (fixed) | UI permanently frozen when IM config changed during active session | **Fixed**: Error propagation + gateway restart logic corrected |
| 🟡 **Medium** | [#481](https://github.com/netease-youdao/LobsterAI/issues/481) | AppImage fails on Ubuntu 20.04 — `/tmp` shared memory access | **Open**, needs triage |
| 🟡 **Medium** | [#124](https://github.com/netease-youdao/LobsterAI/issues/124) | Local mode 401 error (token invalid), sandbox works | **Open**, suspected Claude Code interference despite Qwen selection |
| 🟡 **Medium** | [#476](https://github.com/netease-youdao/LobsterAI/issues/476) | `npm install` fails on Ubuntu 22 + Node 24 — `TypeError: Cannot read properties of null` | **Open**, Node version conflict |
| 🟢 **Low** | [#480](https://github.com/netease-youdao/LobsterAI/issues/480) | Token waste: full system instructions sent every conversation | **Open**, optimization request |

**Regression Risk**: v0.2.4 introduced scheduled task migration issues and UI freezing — now patched but not yet released.

---

## 6. Feature Requests & Roadmap Signals

| Issue | Request | Likelihood in Next Release |
|:---|:---|:---|
| [#485](https://github.com/netease-youdao/LobsterAI/issues/485) | Context usage display, manual compression, thinking process visibility | **High** — Aligns with OpenClaw observability work; user explicitly references Claude Code parity |
| [#478](https://github.com/netease-youdao/LobsterAI/issues/478) | Telegram bot support | **Medium** — Architecture now supports it via plugin; may be configuration-only |
| [#492](https://github.com/netease-youdao/LobsterAI/issues/492) | `openai-responses` API compatibility | **Medium** — Custom model ecosystem expansion |
| [#491](https://github.com/netease-youdao/LobsterAI/issues/491) | AI self-identity isolation (don't leak to native OpenClaw) | **Medium** — Environment isolation improvement |
| [#388](https://github.com/netease-youdao/LobsterAI/pull/388) (open) | MiniMax M2.7 upgrade | **High** — PR ready, model provider update |

---

## 7. User Feedback Summary

### Pain Points
| Theme | Evidence | Severity |
|:---|:---|:---|
| **Update friction** | [#382](https://github.com/netease-youdao/LobsterAI/issues/382) settings wipe, frequent updates | High — churn risk |
| **Reliability anxiety** | [#490](https://github.com/netease-youdao/LobsterAI/issues/490) crashes, [#480](https://github.com/netease-youdao/LobsterAI/issues/480) token burn | High — production use blocked |
| **Observability gaps** | [#485](https://github.com/netease-youdao/LobsterAI/issues/485) context invisible, compression opaque | Medium — power user friction |
| **Build/部署 complexity** | [#481](https://github.com/netease-youdao/LobsterAI/issues/481), [#476](https://github.com/netease-youdao/LobsterAI/issues/476) Linux issues | Medium — contributor barrier |

### Positive Signals
- Users comparing to **Claude Code** as benchmark ([#485](https://github.com/netease-youdao/LobsterAI/issues/485)) — positioning validated
- Active production use: scheduled tasks, multi-IM deployments, custom models

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#124](https://github.com/netease-youdao/LobsterAI/issues/124) | 21 days | Local mode auth broken; suspected Claude Code conflict | Maintainer triage — clarify local/sandbox architecture |
| [#388](https://github.com/netease-youdao/LobsterAI/pull/388) | 7 days open | MiniMax M2.7 upgrade ready | Merge decision |
| [#479](https://github.com/netease-youdao/LobsterAI/pull/479) | 1 day open | "最新版更新" — empty description | Author clarification or close |
| [#435](https://github.com/netease-youdao/LobsterAI/issues/435) | 3 days | Commercial fork without attribution | Legal/PM response on license enforcement |

---

**Project Health**: 🟡 **Stabilizing** — High commit velocity addressing v0.2.4 regressions; community trust contingent on release quality and update preservation.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

# TinyAGI Project Digest — 2026-03-19

> **Note on naming:** This project was rebranded from "TinyClaw" to "TinyAGI" in v0.0.14. The repository `github.com/TinyAGI/tinyagi` reflects this change.

---

## 1. Today's Overview

TinyAGI shows **high velocity and stabilization activity** following its major rebrand from TinyClaw. The project processed **16 PRs in 24 hours** with an 81% merge/close rate (13 closed, 3 open), indicating aggressive cleanup and release preparation. No active issues remain open, suggesting either effective triage or low community bug reporting volume. The v0.0.15 release finalizes the rebrand with streamlined installation, though the burst of install-related fixes (4 PRs) hints at migration friction for existing users. Overall health appears strong with rapid maintainer response times, but the lack of open community discussion may indicate limited external adoption or feedback channels.

---

## 2. Releases

### [v0.0.15](https://github.com/TinyAGI/tinyagi/releases/tag/v0.0.15) — 2026-03-18

| Aspect | Details |
|--------|---------|
| **Headline** | Rebrand completion + one-line installer |
| **Breaking Changes** | CLI entrypoint changed: `tinyclaw` → `tinyagi`; config directory moved: `~/.tinyclaw` → `~/.tinyagi` |
| **Migration Notes** | Auto-migration implemented: existing data automatically moved on first run (PR [#236](https://github.com/TinyAGI/tinyagi/pull/236), [#239](https://github.com/TinyAGI/tinyagi/pull/239)) |
| **Install Method** | `curl -fsSL https://raw.githubusercontent.com/TinyAGI/tinyagi/main/scripts/install.sh \| bash` |

**Key changes since v0.0.14:**
- Native module rebuild for cross-platform compatibility (PR [#240](https://github.com/TinyAGI/tinyagi/pull/240))
- Package consolidation: `packages/tinyagi` merged into `packages/cli` (PR [#238](https://github.com/TinyAGI/tinyagi/pull/238))
- Removed `npx` as default install path; moved to "Other methods" (PR [#237](https://github.com/TinyAGI/tinyagi/pull/237))

---

## 3. Project Progress

### Merged/Closed PRs (13 items)

| PR | Author | Summary | Impact |
|:---|:---|:---|:---|
| [#241](https://github.com/TinyAGI/tinyagi/pull/241) | jlia0 | Fix chatroom message chronological display | UX polish — messages now oldest→newest |
| [#240](https://github.com/TinyAGI/tinyagi/pull/240) | jlia0 | Rebuild native modules, remove migrate.sh | Cross-platform stability |
| [#239](https://github.com/TinyAGI/tinyagi/pull/239) | jlia0 | Migrate tinyclaw data before install | Zero-downtime rebrand migration |
| [#238](https://github.com/TinyAGI/tinyagi/pull/238) | jlia0 | Merge packages, fix install paths | Simplified architecture |
| [#237](https://github.com/TinyAGI/tinyagi/pull/237) | jlia0 | Make curl install default | Reduced friction for new users |
| [#236](https://github.com/TinyAGI/tinyagi/pull/236) | jlia0 | Auto-migrate on startup | Idempotent data preservation |
| [#235](https://github.com/TinyAGI/tinyagi/pull/235) | jlia0 | Curl install README updates | Documentation alignment |
| [#234](https://github.com/TinyAGI/tinyagi/pull/234) | jlia0 | Make `tinyagi` primary CLI entrypoint | Clean rebrand completion |
| [#214](https://github.com/TinyAGI/tinyagi/pull/214) | jlia0 | Web-based setup, custom API URLs | Headless deployment support |
| [#196](https://github.com/TinyAGI/tinyagi/pull/196) | jlia0 | Stream agent execution progress | Real-time UX improvement |
| [#213](https://github.com/TinyAGI/tinyagi/pull/213) | jlia0 | Simplify queue schema, remove conversation state | Architectural simplification |
| [#209](https://github.com/TinyAGI/tinyagi/pull/209) | jlia0 | Hierarchical memory system for agents | Core capability: persistent agent memory |

**Pattern:** 92% of merged PRs authored by `jlia0` — indicates concentrated maintainer activity with limited external contribution.

---

## 4. Community Hot Topics

### Open PRs Requiring Attention

| PR | Status | Analysis |
|:---|:---|:---|
| [#212](https://github.com/TinyAGI/tinyagi/pull/212) — Office workspace redesign | **OPEN** (6 days) | Major UI/UX initiative by `mczabca-boop`; redesigns `/office` experience. Long duration suggests either complexity or awaiting review bandwidth. |
| [#220](https://github.com/TinyAGI/tinyagi/pull/220) — Remove chatroom fan-out | **OPEN** (3 days) | Critical stability fix: prevents exponential agent feedback loops in multi-agent crews. High-impact bugfix stuck in review. |
| [#233](https://github.com/TinyAGI/tinyagi/pull/233) — Periodic memory maintenance | **OPEN** (1 day) | Infrastructure feature for agent memory hygiene; uses heartbeat cron. Fresh, likely to merge soon. |

**Underlying needs detected:**
- **Multi-agent stability**: PR #220 addresses a fundamental architectural flaw in agent coordination
- **Operational reliability**: PR #233 shows focus on long-running agent maintenance
- **Visual polish**: PR #212 indicates investment in user-facing workspace experience

---

## 5. Bugs & Stability

| Severity | Issue/PR | Description | Fix Status |
|:---|:---|:---|:---|
| **CRITICAL** | [#220](https://github.com/TinyAGI/tinyagi/pull/220) | Agent feedback loops in team chatrooms — exponential invocation growth | **Fix pending merge** (3 days open) |
| **HIGH** | [#240](https://github.com/TinyAGI/tinyagi/pull/240) | Native module platform mismatch (Linux→macOS) | **Fixed in v0.0.15** |
| **MEDIUM** | [#241](https://github.com/TinyAGI/tinyagi/pull/241) | Chatroom message order reversed | **Fixed in v0.0.15** |
| **LOW** | [#239](https://github.com/TinyAGI/tinyagi/pull/239), [#236](https://github.com/TinyAGI/tinyagi/pull/236) | Data migration edge cases for rebrand | **Mitigated with auto-migration** |

**Assessment:** The unmerged [#220](https://github.com/TinyAGI/tinyagi/pull/220) represents the most significant active risk — multi-agent crews will encounter runaway costs/invocations until merged.

---

## 6. Feature Requests & Roadmap Signals

| Signal | Source | Likelihood in Next Version |
|:---|:---|:---|
| **Memory maintenance automation** | PR [#233](https://github.com/TinyAGI/tinyagi/pull/233) | **HIGH** — infrastructure PR nearly ready |
| **Office workspace v2** | PR [#212](https://github.com/TinyAGI/tinyagi/pull/212) | **MEDIUM** — 6-day duration suggests complexity |
| **Agent feedback loop prevention** | PR [#220](https://github.com/TinyAGI/tinyagi/pull/220) | **HIGH** — critical fix, likely expedited |
| **Streaming execution progress** | PR [#196](https://github.com/TinyAGI/tinyagi/pull/196) | **SHIPPED** in v0.0.15 |
| **Hierarchical memory** | PR [#209](https://github.com/TinyAGI/tinyagi/pull/209) | **SHIPPED** in v0.0.15 |

**Emerging themes:**
- Agent observability and operational maintenance
- Multi-agent coordination safety (preventing runaway behaviors)
- Installation/distribution polish

---

## 7. User Feedback Summary

**Limited direct user feedback detected** — zero open issues and no 👍 reactions on any PR suggest either:
- Low external adoption
- Feedback occurring outside GitHub (Discord, Slack, etc.)
- Effective pre-emptive fixes by maintainers

**Inferred pain points from PR content:**
| Pain Point | Evidence | Mitigation Status |
|:---|:---|:---|
| Rebrand migration anxiety | 4 PRs dedicated to auto-migration | Addressed with idempotent migration |
| Complex installation | Shift to one-liner curl install | Shipped in v0.0.15 |
| Cross-platform compatibility | Native module rebuild logic | Shipped in v0.0.15 |
| Agent runaway costs | Feedback loop in team chatrooms | **Pending** (#220) |

---

## 8. Backlog Watch

| Item | Age | Risk | Recommended Action |
|:---|:---|:---|:---|
| [#220](https://github.com/TinyAGI/tinyagi/pull/220) — Feedback loop fix | 3 days | **Runaway costs for multi-agent users** | Expedite review/merge |
| [#212](https://github.com/TinyAGI/tinyagi/pull/212) — Office redesign | 6 days | UX stagnation, contributor fatigue | Clarify scope, set merge target |
| *No stale issues* | — | — | — |

**Health indicator:** No orphaned issues or neglected community reports — but the concentration of unmerged PRs from non-`jlia0` contributors (`mczabca-boop`, `jcenters`) suggests potential review bottleneck for external contributions.

---

*Generated from GitHub data for TinyAGI/tinyagi — 2026-03-19*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-03-19

## 1. Today's Overview

Moltis shows **minimal but focused activity** over the past 24 hours with 2 active issues and 1 open pull request. No releases were published, and no PRs were merged, indicating a **maintenance-phase rhythm** rather than active feature development. The project appears stable but with **persistent provider integration issues** (GitHub Copilot) and **network-layer reliability problems** affecting core functionality. Community engagement remains moderate with 6 total comments across tracked items. Overall health: **stable but attention needed on critical path bugs**.

---

## 2. Releases

**No new releases** — No version updates published in the last 24 hours.

---

## 3. Project Progress

**No merged or closed PRs today.**

| PR | Status | Impact |
|:---|:---|:---|
| [#450](https://github.com/moltis-org/moltis/pull/450) fix(tools): prevent web_fetch panic on non-UTF8 pages | **Open** | Addresses encoding-related crashes in web content fetching; ready for review |

**Notable:** PR #450 represents the only code movement, targeting a **production stability fix** for international web content handling.

---

## 4. Community Hot Topics

| Rank | Item | Engagement | Analysis |
|:---|:---|:---|:---|
| 1 | [#261 [Bug]: GitHub Copilot provider errors](https://github.com/moltis-org/moltis/issues/261) | 5 comments, 2 👍 | **Highest priority integration issue** — Copilot (major LLM provider) failing; 19-day lifespan suggests complex root cause or resource constraints |
| 2 | [#450 fix(tools): prevent web_fetch panic on non-UTF8 pages](https://github.com/moltis-org/moltis/pull/450) | New PR, under review | Technical debt in text encoding; indicates global user base with non-Latin content needs |
| 3 | [#407 [Bug]: Network-filter Proxy failing right after start, web_search does not work](https://github.com/moltis-org/moltis/issues/407) | 1 comment, 0 👍 | Core networking infrastructure failure; blocks search functionality |

**Underlying Needs:**
- **Provider diversity**: Users depend on multiple LLM backends; Copilot failures block enterprise adoption
- **Global content support**: Non-UTF8 encoding fix signals internationalization requirements
- **Network reliability**: Proxy/filter stack needs architectural attention

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix Available? | Details |
|:---|:---|:---|:---|:---|
| 🔴 **High** | [#261](https://github.com/moltis-org/moltis/issues/261) GitHub Copilot provider errors | Open 19 days | ❌ No | Provider authentication/connection failures; 2 user confirmations |
| 🟡 **Medium** | [#407](https://github.com/moltis-org/moltis/issues/407) Network-filter Proxy failing | Open 8 days | ❌ No | Startup crash + search broken; single report, needs reproduction |
| 🟢 **Low** (panic) | [#420](https://github.com/moltis-org/moltis/issues/420) web_fetch panic on non-UTF8 | **Fixed in [#450](https://github.com/moltis-org/moltis/pull/450)** | ✅ PR pending | GBK/GB18030/Big5 encoding crashes; patch ready for merge |

**Stability Assessment:** Two critical path failures (Copilot, network proxy) remain unaddressed. The web_fetch panic has an **imminent fix** that should be prioritized for merge.

---

## 6. Feature Requests & Roadmap Signals

**No explicit feature requests** in today's data. Inferred signals from bug patterns:

| Signal | Likely Priority | Rationale |
|:---|:---|:---|
| **Provider resilience layer** | High | Copilot failures suggest need for fallback/retry mechanisms |
| **Network stack observability** | Medium | Proxy issues need better diagnostics/logging |
| **Encoding auto-detection** | Medium | PR #450 is tactical; strategic solution may need charset detection library |

**Next Version Prediction:** Encoding fix (#450) likely merges soon. Provider reliability improvements may follow if #261 attracts maintainer focus.

---

## 7. User Feedback Summary

| Pain Point | Evidence | User Impact |
|:---|:---|:---|
| **Provider lock-in fragility** | Copilot-specific failures in #261 | Blocks users preferring GitHub's model; forces provider switching |
| **Search functionality unavailable** | Proxy crash in #407 | Core agent capability (web search) completely broken for affected users |
| **International content crashes** | GBK/Big5 panics | Excludes Chinese-language web content processing |
| **Debugging difficulty** | "included as much full session context" in templates | Users struggle to provide actionable bug reports |

**Satisfaction Pattern:** Users are **engaged but frustrated** — preflight checklists completed, detailed reports filed, but **response latency on critical bugs** is eroding confidence.

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#261](https://github.com/moltis-org/moltis/issues/261) Copilot provider errors | **19 days** | 🔴 **Escalating** | Maintainer triage; possibly needs auth flow audit |
| [#407](https://github.com/moltis-org/moltis/issues/407) Proxy failure | 8 days | 🟡 Watch | Reproduction confirmation; network config details |
| [#450](https://github.com/moltis-org/moltis/pull/450) Encoding fix | 1 day | 🟢 Ready | **Merge candidate** — low risk, clear scope |

**Recommendation:** Prioritize #450 merge to demonstrate responsiveness. #261 requires urgent maintainer assignment given provider-critical nature and user engagement level.

---

*Digest generated from github.com/moltis-org/moltis data — 2026-03-19*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-03-19

## 1. Today's Overview

CoPaw shows **extremely high development velocity** with 50 issues and 50 PRs updated in the last 24 hours, indicating an active, rapidly evolving codebase. The project just shipped **v0.1.0-beta.3**, marking continued progress toward a stable release. Community engagement is strong with 18 active open issues and 20 open PRs. Notably, **first-time contributors are heavily participating** (6 of 20 featured PRs), suggesting good onboarding. However, **critical stability issues persist**—particularly around CPU spikes, memory management, and local model compatibility—that could block broader adoption.

---

## 2. Releases

### [v0.1.0-beta.3](https://github.com/agentscope-ai/CoPaw/releases/tag/v0.1.0-beta.3)

| Change | Details |
|--------|---------|
| **i18n improvements** | Multi-language support updates in console ([PR #1686](https://github.com/agentscope-ai/CoPaw/pull/1686)) |
| **Documentation UX** | Optimized document navigation anchors in console |

**Breaking Changes:** None reported  
**Migration Notes:** Standard version bump via `pip install --upgrade copaw`

---

## 3. Project Progress

### Merged/Closed PRs (30 total, key highlights)

| PR | Author | Impact |
|:---|:---|:---|
| [#1772](https://github.com/agentscope-ai/CoPaw/pull/1772) | @zhijianma | **Major**: Multimodal message support with image/file uploads — closes **10 issues** (#636, #509, #1649, #801, #1539, #861, #1564, #1515, #1045, #675) |
| [#1654](https://github.com/agentscope-ai/CoPaw/pull/1654) | @nphenix | **Major**: Local embedding model support for vector memory (Qwen3-VL, BGE/GTE) — enables offline operation |
| [#1729](https://github.com/agentscope-ai/CoPaw/pull/1729) | @octo-patch | MiniMax model upgrade to M2.7 flagship |
| [#1788](https://github.com/agentscope-ai/CoPaw/pull/1788) | @pan-x-c | Fix: Chat model selection regression |
| [#1784](https://github.com/agentscope-ai/CoPaw/pull/1784) | @zhijianma | Fix: Local chat model import issue |
| [#1783](https://github.com/agentscope-ai/CoPaw/pull/1783) | @zhijianma | MCP 'streamable-http' transport support |
| [#1557](https://github.com/agentscope-ai/CoPaw/pull/1557) | @mvanhorn | Fix: Reasoning content injection in model formatting |
| [#1698](https://github.com/agentscope-ai/CoPaw/pull/1698) | @hikariming | UX: Upload processing status indicators |

**Key Advances:** Multimodal capabilities and local embedding infrastructure are now production-ready, addressing major privacy and offline use cases.

---

## 4. Community Hot Topics

| Rank | Issue/PR | Comments | Analysis |
|:---|:---|:---:|:---|
| 1 | [#1385](https://github.com/agentscope-ai/CoPaw/issues/1385) — CPU 100% spike bug | 9 | **Critical stability concern**. Root cause identified as MCP-related; community PR submitted. Affects Ubuntu 25.10, reproducible without user input. |
| 2 | [#1782](https://github.com/agentscope-ai/CoPaw/issues/1782) — Local LLM/Ollama broken after upgrade | 8 | **Regression in v0.0.7→latest**. Fixed by [#1788](https://github.com/agentscope-ai/CoPaw/pull/1788) and [#1784](https://github.com/agentscope-ai/CoPaw/pull/1784). Shows fragility in model provider abstraction. |
| 3 | [#430](https://github.com/agentscope-ai/CoPaw/issues/430) — Open Tasks contribution board | 7 | Healthy community coordination; 15+ tasks available from P0-P2 priority |
| 4 | [#1563](https://github.com/agentscope-ai/CoPaw/issues/1563) — `write_file` truncation (33KB→6KB) | 5 | Data integrity bug; also reports missing `file_path` parameter handling |
| 5 | [#823](https://github.com/agentscope-ai/CoPaw/issues/823) — llama.cpp Qwen3.5 load failure | 5 | Local model compatibility gap; model-specific GGUF handling |

**Underlying Needs:** Users heavily prioritize **local/self-hosted deployment** (Ollama, llama.cpp, MLX) but encounter friction with model compatibility and resource management. The 100% CPU bug suggests MCP tool execution needs circuit-breaking or resource limits.

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR |
|:---|:---|:---|:---|
| 🔴 **Critical** | [#1385](https://github.com/agentscope-ai/CoPaw/issues/1385) — CPU 100% spike (MCP-related) | Open | Community PR submitted, needs review |
| 🔴 **Critical** | [#1736](https://github.com/agentscope-ai/CoPaw/issues/1736) — MemoryManager uninitialized `file_stores` | Open | None |
| 🟡 **High** | [#1563](https://github.com/agentscope-ai/CoPaw/issues/1563) — File write truncation | Open | None |
| 🟡 **High** | [#1782](https://github.com/agentscope-ai/CoPaw/issues/1782) — Local LLM broken post-upgrade | **Closed** | [#1788](https://github.com/agentscope-ai/CoPaw/pull/1788), [#1784](https://github.com/agentscope-ai/CoPaw/pull/1784) |
| 🟡 **High** | [#823](https://github.com/agentscope-ai/CoPaw/issues/823) — llama.cpp model load failure | Closed | None (model-specific) |
| 🟢 **Medium** | [#1381](https://github.com/agentscope-ai/CoPaw/issues/1381), [#1704](https://github.com/agentscope-ai/CoPaw/issues/1704) — Model dropdown UI clipped | Closed | [#1772](https://github.com/agentscope-ai/CoPaw/pull/1772) |

**Stability Assessment:** Two critical unpatched bugs threaten production use. The MCP CPU issue and MemoryManager initialization failure suggest **core agent lifecycle management** needs hardening.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Request Source | Likelihood in Next Version |
|:---|:---|:---:|
| **Web UI authentication/password protection** | [#492](https://github.com/agentscope-ai/CoPaw/issues/492), [#333](https://github.com/agentscope-ai/CoPaw/issues/333), [#1046](https://github.com/agentscope-ai/CoPaw/issues/1046), [#684](https://github.com/agentscope-ai/CoPaw/issues/684) | **High** — 4 duplicate requests, security-critical for cloud deployment |
| **Execution chain/trajectory logging** | [#1474](https://github.com/agentscope-ai/CoPaw/issues/1474) | Medium — debugging infrastructure |
| **Channel routing for multi-agent** | [#1792](https://github.com/agentscope-ai/CoPaw/pull/1792) (open PR) | **High** — PR already submitted |
| **Anthropic/Claude API native support** | [#333](https://github.com/agentscope-ai/CoPaw/issues/333) | Medium — provider expansion pattern exists |
| **Granular file system permissions** | [#973](https://github.com/agentscope-ai/CoPaw/issues/973), [#799](https://github.com/agentscope-ai/CoPaw/issues/799) | Medium — security hardening |
| **Venice.ai provider** | [#1088](https://github.com/agentscope-ai/CoPaw/pull/1088) (open PR) | **High** — PR ready, OpenAI-compatible |

---

## 7. User Feedback Summary

### Pain Points
| Issue | Frequency | User Profile |
|:---|:---:|:---|
| Local model setup friction (Ollama, llama.cpp, MLX) | Very High | Self-hosters, privacy-conscious |
| CPU/resource consumption uncontrolled | High | Linux server users |
| Web UI lacks basic security (no auth) | High | Cloud deployers |
| File operations unreliable (truncation, missing params) | Medium | Power users |
| Model dropdown UI/UX issues | Medium | All users |

### Satisfaction Drivers
- **Multimodal support** (just shipped) addresses long-standing gap
- **Local embedding** enables fully offline operation
- **Active maintainer response** (most issues closed within 24-48h)

### Dissatisfaction Drivers
- **Regressions in point releases** breaking existing workflows
- **Incomplete MCP implementation** (HTTP transport, env var expansion still patching)
- **Documentation gaps** for self-hosted model configuration

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|:---|:---:|:---|:---|
| [#1385](https://github.com/agentscope-ai/CoPaw/issues/1385) CPU spike | 7 days | **Production blocker** | Maintainer review of community fix |
| [#1736](https://github.com/agentscope-ai/CoPaw/issues/1736) MemoryManager init | 1 day | Feature regression | Triage and assign |
| [#430](https://github.com/agentscope-ai/CoPaw/issues/430) Task board | 16 days | Contributor coordination | Keep updated, promote good-first-issues |
| [#1802](https://github.com/agentscope-ai/CoPaw/pull/1802) Copy user messages | 1 day | Low-risk UX | Quick merge candidate |
| [#1789](https://github.com/agentscope-ai/CoPaw/pull/1789) Local embedding (alt) | 1 day | Duplicate effort? | Coordinate with [#1654](https://github.com/agentscope-ai/CoPaw/pull/1654) |
| [#1211](https://github.com/agentscope-ai/CoPaw/pull/1211) Image handling improvements | 8 days | May overlap [#1772](https://github.com/agentscope-ai/CoPaw/pull/1772) | Rebase or close |

**Maintainer Attention Priority:** Critical stability fixes (#1385, #1736) should take precedence over feature work. The duplicate local embedding PRs suggest need for clearer contribution guidelines.

---

*Digest generated from 50 issues and 50 PRs updated 2026-03-18. Data source: github.com/agentscope-ai/CoPaw*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw Project Digest — 2026-03-19

**Repository:** [qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)

---

## 1. Today's Overview

ZeptoClaw shows **moderate development velocity** with 3 active issues and 2 open PRs updated in the last 24 hours, though no releases or merged code. The project appears to be in an **active design and stabilization phase**, with core contributor `qhkm` focusing on protocol bug fixes while community member `taqtiqa-mark` drives infrastructure and architectural discussions. Notably, all activity is concentrated in open items—no closures suggest either pending review bottlenecks or complex, multi-day implementation work. The emergence of two architectural proposals (Containerfile/Firecracker VMs, Rig library integration) alongside critical ACP HTTP protocol bugs indicates the project is balancing **ambitious expansion with core stability needs**.

---

## 2. Releases

**No new releases.** No version tags or release notes published in the last 24 hours.

---

## 3. Project Progress

**No merged or closed PRs today.** Both active PRs remain open:

| PR | Status | Progress |
|:---|:---|:---|
| [#287](https://github.com/qhkm/zeptoclaw/pull/287) — Dev tools for consistent pre-PR state | Open, updated 2026-03-18 | Contributor tooling; enables standardized `cargo test`/`cargo clippy` checks before PR submission |
| [#364](https://github.com/qhkm/zeptoclaw/pull/364) — Google Vertex AI provider | Open, updated 2026-03-18 | Enterprise Gemini integration with zero new dependencies; reuses existing auth patterns |

**Assessment:** PR #364 represents tangible provider expansion, while #287 addresses contributor experience—both foundational but awaiting final review/merge.

---

## 4. Community Hot Topics

### Most Active: [#387](https://github.com/qhkm/zeptoclaw/issues/387) — Core templates based on Containerfiles mapped-to/launched-in orchestrated Firecracker VM's
- **4 comments** | Author: `taqtiqa-mark` | Created: 2026-03-17
- **Underlying need:** Treat coding agent frameworks (Claude Code, Copilot CLI, Gemini CLI, etc.) as containerized apps rather than special-cased infrastructure—reducing feature creep and security surface area
- **Tension:** Self-described as "controversial"; implies architectural debate about whether ZeptoClaw should absorb container orchestration or remain a leaner framework

### Emerging: [#389](https://github.com/qhkm/zeptoclaw/issues/389) — Evaluate building on utility/lib crate ([Rig](https://github.com/0xPlaygrounds/rig))
- **0 comments** | Author: `taqtiqa-mark` | Created: 2026-03-18
- **Underlying need:** Reduce maintenance burden of generic LLM abstractions by adopting a dedicated Rust AI library
- **Scope:** Medium (2-3 files, new module)

**Pattern:** `taqtiqa-mark` is systematically proposing **infrastructure consolidation**—first containerization, then library abstraction—suggesting community interest in ZeptoClaw becoming more modular and maintainable at scale.

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|:---|:---|:---|:---|
| **High** | [#388](https://github.com/qhkm/zeptoclaw/issues/388) — ACP HTTP initialize and notification semantics | Two protocol bugs from PR #356: (1) channel-global initialization flag allows handshake bypass, (2) HTTP notifications incorrectly receive response bodies | **No fix PR yet**; reported by maintainer `qhkm` 2026-03-18 |

**Risk:** Security-adjacent (authentication bypass via skipped handshake) and protocol correctness issues in ACP (Agent Communication Protocol?) HTTP layer. Originated from recently merged PR #356, indicating potential regression from prior release.

---

## 6. Feature Requests & Roadmap Signals

| Issue | Signal Strength | Prediction |
|:---|:---|:---|
| [#364](https://github.com/qhkm/zeptoclaw/pull/364) Vertex AI provider | **High** — near merge | Likely in next release; enterprise demand, clean implementation |
| [#389](https://github.com/qhkm/zeptoclaw/issues/389) Rig library integration | **Medium** — evaluation phase | Could reduce provider maintenance long-term; depends on Rig maturity assessment |
| [#387](https://github.com/qhkm/zeptoclaw/issues/387) Firecracker VM orchestration | **Medium-Low** — controversial, complex | Longer-term; may spawn experimental branch rather than core merge |

**Emerging theme:** Shift from "build everything" toward "integrate best-of-breed" (Rig, Firecracker) while expanding cloud provider coverage (Vertex AI).

---

## 7. User Feedback Summary

**Direct feedback limited** — no user-submitted issues today; all activity from core contributor (`qhkm`) and active community member (`taqtiqa-mark`).

**Inferred pain points from proposals:**
- **Operational complexity:** Desire to containerize agent frameworks suggests deployment friction
- **Maintenance burden:** Proposal to adopt Rig signals generic LLM code is costly to maintain
- **Enterprise readiness:** Vertex AI PR indicates demand for GCP enterprise auth patterns

**Satisfaction gap:** No closed issues/PRs suggests either (a) thorough review processes creating backlog, or (b) resource constraints on maintainer side.

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#287](https://github.com/qhkm/zeptoclaw/pull/287) Dev tools | 10 days | Low — quality of life | Maintainer review; low risk, high contributor value |
| [#388](https://github.com/qhkm/zeptoclaw/issues/388) ACP HTTP bugs | 1 day | **High** — security/protocol | Fix PR from `qhkm` or assign; blocks reliable ACP HTTP usage |
| [#387](https://github.com/qhkm/zeptoclaw/issues/387) Firecracker VMs | 2 days | Medium — architectural | Decision on scope: in-core, plugin, or out-of-scope |

**Recommendation:** Prioritize #388 fix given security implications; fast-track #287 to reduce contributor friction; schedule architectural review for #387/#389 to set 2026 roadmap direction.

---

*Digest generated from GitHub activity 2026-03-18 to 2026-03-19. Data source: qhkm/zeptoclaw public repository.*

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw Project Digest — 2026-03-19

## 1. Today's Overview

EasyClaw (branded as **RivonClaw**) shows **high maintenance velocity** with two rapid-fire patch releases (v1.7.0 → v1.7.1) within 24 hours, indicating urgent bug fixes. All 4 issues updated today were **closed**, suggesting responsive maintainer engagement. However, **2 open PRs** from contributor `chinayin` await review, representing significant UI/internationalization work. The project appears to be in **stabilization mode** post-v1.7.0, with Windows connectivity issues dominating user reports. Overall health: **active but fragile** — rapid releases signal reactive fixes rather than planned rollout.

---

## 2. Releases

### [v1.7.1](https://github.com/gaoyangz77/rivonclaw/releases/tag/v1.7.1) — Hotfix Release
- **Type**: Emergency patch
- **Focus**: macOS Gatekeeper documentation (unsigned app warnings)
- **No functional changes** — release notes identical to v1.7.0, suggesting rapid re-release for packaging fix

### [v1.7.0](https://github.com/gaoyangz77/rivonclaw/releases/tag/v1.7.0) — Minor Release
- **Breaking Changes**: **YES** — Windows users report complete connectivity failure post-upgrade from v1.6.8
- **Migration Notes**: None provided; users forced to troubleshoot via GitHub issues
- **Notable**: No changelog detailing actual v1.7.0 features — transparency gap

---

## 3. Project Progress

**No merged PRs today.** Both active PRs remain open:

| PR | Author | Scope | Status |
|:---|:---|:---|:---|
| [#21](https://github.com/gaoyangz77/rivonclaw/pull/21) | chinayin | i18n: +5 languages (zh-TW, ja, ko, vi, hi) — 1,333 keys each | ⏳ Awaiting review |
| [#20](https://github.com/gaoyangz77/rivonclaw/pull/20) | chinayin | Major UI refactor: BottomActions component, theme separation, Skills page | ⏳ Awaiting review |

**Assessment**: Substantial contributor work (likely 2-3 days effort) blocked on maintainer review. Risk of merge conflicts if delayed.

---

## 4. Community Hot Topics

| Rank | Item | Comments | Analysis |
|:---|:---|:---|:---|
| 🔥1 | [#18](https://github.com/gaoyangz77/rivonclaw/issues/18) Windows upgrade failure (1.6.8→1.7.0) | 5 | **Critical regression** — connectivity completely broken for Windows users |
| 2 | [#12](https://github.com/gaoyangz77/rivonclaw/issues/12) Community chat request | 3 | User explicitly praises architecture ("very符合我预期的架构"); unmet need for synchronous support |
| 3 | [#19](https://github.com/gaoyangz77/rivonclaw/issues/19) Windows 11 fresh install stuck "connecting" | 3 | **Same root cause as #18** — not upgrade-specific but v1.7.0-wide Windows bug |
| 4 | [#17](https://github.com/gaoyangz77/rivonclaw/issues/17) Windows build/packaging tutorial | 2 | Documentation gap for Windows developers |

**Underlying Needs**: 
- **Stability > Features**: Users blocked on basic functionality
- **Windows-first support**: 3/4 top issues are Windows-specific
- **Real-time community**: Issue #12's request for "技术交流群" (tech exchange group) signals need for faster help than GitHub allows

---

## 5. Bugs & Stability

| Severity | Issue | Status | Evidence | Fix PR? |
|:---|:---|:---|:---|:---|
| **🔴 CRITICAL** | Windows connectivity failure | Closed but likely unresolved | 2 separate reports (#18, #19); v1.7.1 released same day suggests attempted fix | None linked |
| 🟡 MEDIUM | macOS Gatekeeper blocking | Documented | Release notes include workaround | N/A (expected for unsigned apps) |

**Pattern**: v1.7.0 introduced **platform-specific regressions**. The v1.7.1 hotfix addressed documentation, not the Windows bug — suggesting either (a) fix was silently included, or (b) issue persists. **Recommend monitoring new Windows issue reports.**

---

## 6. Feature Requests & Roadmap Signals

| Source | Request | Likelihood in Next Version |
|:---|:---|:---|
| PR [#21](https://github.com/gaoyangz77/rivonclaw/pull/21) | 5-language i18n expansion | **HIGH** — PR ready, just needs merge |
| PR [#20](https://github.com/gaoyangz77/rivonclaw/pull/20) | Skills page + theme system | **HIGH** — Major UI work completed by contributor |
| Issue [#17](https://github.com/gaoyangz77/rivonclaw/issues/17) | Windows build documentation | MEDIUM — Low effort, high impact |
| Issue [#12](https://github.com/gaoyangz77/rivonclaw/issues/12) | Community Discord/WeChat group | LOW — Requires maintainer bandwidth |

**Predicted v1.7.2**: i18n expansion + UI refactor merge, assuming Windows stability confirmed.

---

## 7. User Feedback Summary

| Aspect | Evidence | Sentiment |
|:---|:---|:---|
| **Architecture praise** | "项目架构非常符合我预期的架构" (#12) | ✅ Strong positive |
| **Upgrade anxiety** | Multiple reports of breaking changes without warning | ⚠️ Nervous |
| **Platform inequality** | macOS gets quick docs; Windows gets bugs | 😠 Frustrated (Windows users) |
| **Contributor enthusiasm** | chinayin's substantial PRs indicate healthy ecosystem | ✅ Positive |

**Core Pain Point**: **"连接不上"** (can't connect) — the most reported symptom, with users trying multiple workarounds (re-registering, re-configuring API) before reporting.

---

## 8. Backlog Watch

| Risk | Item | Age | Action Needed |
|:---|:---|:---|:---|
| 🚨 **Contributor attrition risk** | PRs [#20](https://github.com/gaoyangz77/rivonclaw/pull/20), [#21](https://github.com/gaoyangz77/rivonclaw/pull/21) | 1 day | **Immediate review** — chinayin has delivered 2 major PRs; silence risks losing active contributor |
| Documentation debt | Issue [#17](https://github.com/gaoyangz77/rivonclaw/issues/17) | 2 days | Windows build guide — community could help if template provided |
| Community infrastructure | Issue [#12](https://github.com/gaoyangz77/rivonclaw/issues/12) | 10 days | Decision on official chat platform (Discord/WeChat/QQ) |

---

**Analyst Note**: EasyClaw demonstrates classic early-stage project dynamics — passionate contributors, responsive bug closure, but fragile release QA and bottlenecked review queue. The v1.7.x series needs a **Windows stability validation** before feature expansion. Prioritizing PR review over new releases would signal healthy governance.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/duanyytop/agents-radar).*