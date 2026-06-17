# OpenClaw Ecosystem Digest 2026-03-20

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-03-20 00:09 UTC

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

# OpenClaw Project Digest — 2026-03-20

## 1. Today's Overview

OpenClaw shows **exceptionally high activity** with 500 issues and 500 PRs updated in the last 24 hours, indicating a mature, rapidly evolving project with substantial community engagement. The project is currently in a **stabilization phase** following the 2026.3.12-3.13 releases, with significant effort focused on fixing WhatsApp Web listener regressions and gateway CLI handshake issues. No new releases were published today, suggesting maintainers are prioritizing quality over velocity. The community is actively expanding platform support with a major Linux GTK4 companion app PR in review, while security awareness is heightened due to an active phishing scam exploiting the project's name.

---

## 2. Releases

**No new releases** published today (2026-03-20).

The latest stable release remains **2026.3.13** (commit `61d171a`), which introduced several regressions currently being addressed in active PRs.

---

## 3. Project Progress

### Merged/Closed PRs Today

| PR | Description | Impact |
|:---|:---|:---|
| [#50663](https://github.com/openclaw/openclaw/pull/50663) | Tests: trim command secret gateway imports | Reduced test heap memory pressure |
| [#50695](https://github.com/openclaw/openclaw/pull/50695) | Hardening: refresh stale device pairing requests and pending metadata | Security improvement for device pairing UX |
| [#45541](https://github.com/openclaw/openclaw/pull/45541) | fix(ui): stop dashboard chat history reload storm | Major UI performance fix for tool-heavy runs |
| [#40867](https://github.com/openclaw/openclaw/pull/40867) | fix(web-search): respect baseUrl config for Perplexity Search API | Restores OpenRouter proxy compatibility |

### Key Advances in Open PRs

- **Linux platform expansion**: [#50532](https://github.com/openclaw/openclaw/pull/50532) introduces native GTK4 companion app (v1), directly addressing the long-standing [#75](https://github.com/openclaw/openclaw/issues/75) request for Linux/Windows apps
- **Agent skill governance**: [#48838](https://github.com/openclaw/openclaw/pull/48838) adds agent-scoped skill policy and cron delivery semantics—major architectural improvement for multi-agent deployments
- **New provider integrations**: Anthropic Vertex AI ([#43356](https://github.com/openclaw/openclaw/pull/43356)), Avian ([#28183](https://github.com/openclaw/openclaw/pull/28183)), and MiniMax M2.7 ([#50234](https://github.com/openclaw/openclaw/issues/50234) request) expanding model ecosystem
- **Decentralized social**: [#50339](https://github.com/openclaw/openclaw/pull/50339) adds SoundChain extension for P2P music social network agent citizenship

---

## 4. Community Hot Topics

| Issue/PR | Comments | 👍 | Analysis |
|:---|:---:|:---:|:---|
| [#75](https://github.com/openclaw/openclaw/issues/75) Linux/Windows Clawdbot Apps | 46 | 63 | **Longest-running platform gap**—4+ months old, now actively addressed by [#50532](https://github.com/openclaw/openclaw/pull/50532). High demand indicates significant user base on non-Apple platforms. |
| [#49836](https://github.com/openclaw/openclaw/issues/49836) [SECURITY] Phishing Scam Detected - Fake Airdrop | 32 | 18 | **Active security incident**—malicious actors using OpenClaw branding. Community self-policing effective; needs official maintainer response/verification system. |
| [#7649](https://github.com/openclaw/openclaw/issues/7649) Matrix: bot cannot verify its own account for E2EE | 25 | 5 | Core Matrix functionality blocked—E2EE is table-stakes for enterprise Matrix use. Recently closed suggests fix in progress. |
| [#23538](https://github.com/openclaw/openclaw/issues/23538) Anthropic setup-token auth returns 401 | 22 | 0 | **Authentication regression** affecting paying users—isolated repro suggests config persistence bug, not API change. |
| [#44851](https://github.com/openclaw/openclaw/issues/44851) Kimi web_search 401 error | 21 | 2 | Chinese market critical—Kimi is major OpenClaw use case; web_search vs Chat API divergence suggests tool-specific auth handling bug. |

**Underlying Needs**: Cross-platform parity, security trust infrastructure, enterprise-grade channel reliability (Matrix E2EE, WhatsApp stability), and Asia-Pacific LLM provider robustness.

---

## 5. Bugs & Stability

### Critical (Blocking Core Functionality)

| Issue | Description | Fix Status |
|:---|:---|:---|
| [#34741](https://github.com/openclaw/openclaw/issues/34741) [#45171](https://github.com/openclaw/openclaw/issues/45171) [#46659](https://github.com/openclaw/openclaw/issues/46659) [#48109](https://github.com/openclaw/openclaw/issues/48109) [#48409](https://github.com/openclaw/openclaw/issues/48409) | **WhatsApp "No active WhatsApp Web listener"**—multiple regression reports since 2026.3.12 | Multiple closed today; pattern suggests **module initialization race** between auto-reply and proactive send paths |
| [#45504](https://github.com/openclaw/openclaw/issues/45504) [#45560](https://github.com/openclaw/openclaw/issues/45560) [#45173](https://github.com/openclaw/openclaw/issues/45173) [#49510](https://github.com/openclaw/openclaw/issues/49510) | **Gateway CLI handshake failures**—`gateway closed (1000)` on loopback | [#46892](https://github.com/openclaw/openclaw/issues/46892) identified 3s timeout as root cause; fix likely in review |
| [#45232](https://github.com/openclaw/openclaw/issues/45232) | Control UI stuck on "pairing required" after 2026.3.13 upgrade | Docker-specific; no fix PR identified |

### High (Provider/Tool Failures)

| Issue | Description | Fix Status |
|:---|:---|:---|
| [#23538](https://github.com/openclaw/openclaw/issues/23538) | Anthropic 401 bearer token invalid | Open, isolated repro |
| [#41293](https://github.com/openclaw/openclaw/issues/41293) | Mistral 422 (no body) | Open, direct API works—suggests OpenClaw request formatting |
| [#46049](https://github.com/openclaw/openclaw/issues/46049) | LLM timeout settings ignored | Open, affects long-running agents |

### Medium (UX/Edge Cases)

- [#10841](https://github.com/openclaw/openclaw/issues/10841): Agent time awareness for reminders
- [#48713](https://github.com/openclaw/openclaw/issues/48713): vLLM strict/store parameter warnings
- [#48332](https://github.com/openclaw/openclaw/issues/48332): Nostr plugin DM decryption without session creation

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Momentum | Prediction |
|:---|:---|:---:|:---|
| **Agent Teams / Parallel Coordination** | [#10010](https://github.com/openclaw/openclaw/issues/10010) | 12 comments, 2 👍 | **Likely 2026.4**—architectural foundation exists (`sessions_spawn`), competitive parity with Claude Code |
| **MCP Client Native Support** | [#29053](https://github.com/openclaw/openclaw/issues/29053) | 10 comments, 8 👍 | **High priority**—industry standard adoption; may land before v2 |
| **External Memory Provider API** | [#49233](https://github.com/openclaw/openclaw/issues/49233) | 7 comments | **Enterprise roadmap**—zero-downtime compaction is production blocker |
| **Per-agent Plugin Slot Overrides** | [#25359](https://github.com/openclaw/openclaw/issues/25359) | 7 comments, 4 👍 | **Multi-agent maturity**—depends on [#48838](https://github.com/openclaw/openclaw/pull/48838) skill policy PR |
| **MiniMax M2.7 Support** | [#50234](https://github.com/openclaw/openclaw/issues/50234) | 10 comments, new | **Fast-follow**—provider expansion is consistent pattern |

---

## 7. User Feedback Summary

### Pain Points

| Theme | Evidence | Severity |
|:---|:---|:---:|
| **WhatsApp reliability** | 8+ related issues since 2026.3.12 | 🔴 Critical |
| **Gateway CLI instability** | Loopback connection failures widespread | 🔴 Critical |
| **Authentication fragility** | Anthropic, Kimi, Mistral token issues | 🟡 High |
| **Time awareness** | Reminders fail without explicit timezone | 🟡 Medium |
| **Docker deployment friction** | Matrix plugin loading, Control UI pairing | 🟡 Medium |

### Positive Signals

- **Strong mobile ecosystem**: iOS, Android, now Linux GTK4 app development
- **Active community skill sharing**: [#50090](https://github.com/openclaw/openclaw/issues/50090) ClawHub discussion indicates healthy extension ecosystem
- **Responsive security culture**: Rapid community identification of phishing scam ([#49836](https://github.com/openclaw/openclaw/issues/49836))

### Use Case Evolution

Users are pushing OpenClaw beyond personal assistant into:
- **Multi-agent production systems** (team coordination, specialized workers)
- **Enterprise messaging** (Matrix E2EE, WhatsApp Business reliability)
- **Decentralized protocols** (Nostr, SoundChain integration)

---

## 8. Backlog Watch

### Stale Important Issues Needing Attention

| Issue | Age | Last Activity | Risk |
|:---|:---:|:---|:---|
| [#75](https://github.com/openclaw/openclaw/issues/75) Linux/Windows apps | 2.5 months | Active in [#50532](https://github.com/openclaw/openclaw/pull/50532) | **Mitigated**—PR in review |
| [#25359](https://github.com/openclaw/openclaw/issues/25359) Per-agent plugin slots | 3 weeks | 2026-03-19 | Architecture decision needed |
| [#26322](https://github.com/openclaw/openclaw/issues/26322) OAuth token refresh race | 3 weeks | 2026-03-19 | Production reliability |
| [#16918](https://github.com/openclaw/openclaw/issues/16918) WhatsApp stale socket race | 5 weeks | 2026-03-19 | **Related to current regressions** |
| [#16137](https://github.com/openclaw/openclaw/issues/16137) Intermediate message buffering | 5 weeks | Closed 2026-03-19 | Recently closed—verify fix |

### PRs Awaiting Review

| PR | Size | Age | Blocker |
|:---|:---:|:---:|:---|
| [#48838](https://github.com/openclaw/openclaw/pull/48838) Agent-scoped skill policy | XL | 3 days | Architectural review |
| [#50532](https://github.com/openclaw/openclaw/pull/50532) Linux GTK4 app | XL | 1 day | Cross-platform testing |
| [#50339](https://github.com/openclaw/openclaw/pull/50339) SoundChain extension | XL | 1 day | New domain expertise review |
| [#43356](https://github.com/openclaw/openclaw/pull/43356) Anthropic Vertex | XL | 8 days | Dependency resolution (#2057) |

---

**Project Health Assessment**: 🟡 **Stabilizing** — High velocity with focused regression fixing. Critical WhatsApp and gateway issues are actively addressed. No release today suggests quality gates are respected. Security incident response demonstrates mature community. Priority should be completing the Linux app merge and resolving the WhatsApp listener architecture to restore user confidence in the 2026.3.x series.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Agent Ecosystem
## 2026-03-20 Community Digest Analysis

---

## 1. Ecosystem Overview

The personal AI assistant open-source ecosystem exhibits **bifurcated maturity**: established projects (OpenClaw, IronClaw, CoPaw) operate at enterprise-grade velocity with 50–100+ daily updates, while emerging players (TinyClaw, ZeptoClaw, Moltis) navigate architectural consolidation with 2–10 updates. **Multi-agent orchestration** has shifted from experimental to core architecture across leading projects, with CoPaw's v0.1.0 stable release and OpenClaw's agent-scoped skill policies marking an inflection point. **Chinese platform integration** (Feishu/Lark, QQ) and **local/edge deployment** (Ollama, llama.cpp) represent the fastest-growing demand vectors, driven by privacy requirements and regional market needs. Security hardening—policy injection, secret management, sandboxing—has become table-stakes following phishing incidents and enterprise adoption. The ecosystem remains **highly fragmented** with no dominant standard, though ACP, MCP, and A2A protocols are competing for agent communication primacy.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Releases | Health Score | Status |
|:---|:---:|:---:|:---:|:---:|:---|
| **OpenClaw** | 500 | 500 | None (stabilization) | 🟡 Stabilizing | Regression fixing post-2026.3.13; quality gates active |
| **NanoBot** | 26 | 52 | None | 🟢 Active | Feature consolidation; review bottleneck risk (40 open PRs) |
| **ZeroClaw** | 45 | 50 | **v0.5.1 stable** + 8 betas | 🟡 Feature churn | 86% merge rate; 5 open S1 bugs need attention |
| **PicoClaw** | 41 | 106 | v0.2.3-nightly | 🟢 Rapid iteration | 52:54 merged:open ratio; approaching stable |
| **NanoClaw** | 15 | 32 | None | 🟡 Architectural churn | Agent engine fragmentation (#963, #1266, #1268) |
| **NullClaw** | 10 | 16 | **v2026.3.18** | 🟢 Responsive | 5/5 issues closed with PRs within 24h |
| **IronClaw** | 50 | 50 | **v0.20.0** | 🟡 Pre-release stabilization | 56% open PR rate; staging CI catching 30+ issues |
| **LobsterAI** | — | — | — | ⚪ Heartbeat only | Minimal visible activity |
| **TinyClaw** | 0 | 2 | None | 🟡 Amber | Zero community engagement; review bottleneck |
| **Moltis** | 4 new | 3 new | None | 🟡 Moderate | 5-day unmerged Windows fix (#436) |
| **CoPaw** | 50 | 50 | **v0.1.0 stable** | 🟡 Cautiously optimistic | Critical v0.1.0b3 regressions; deadlock fixes pending |
| **ZeptoClaw** | 1 active | 3 | None | 🟡 Blocked | ACP protocol bugs (#388) blocking major feature |
| **EasyClaw** | 2 | 3 | **v1.7.2, v1.7.3** | 🟢 Strong momentum | UI modernization sprint; Chinese developer interest |

*Health Score Legend: 🟢 Healthy / 🟡 Caution / 🔴 Critical / ⚪ Insufficient data*

---

## 3. OpenClaw's Position

### Advantages vs. Peers

| Dimension | OpenClaw Position | Peer Comparison |
|:---|:---|:---|
| **Scale** | 500 issues/PRs daily = 10× nearest competitor | IronClaw, CoPaw at ~100; others <60 |
| **Platform breadth** | Native iOS/Android + Linux GTK4 in review (#50532) | CoPaw: QQ/Feishu depth; ZeroClaw: Discord/Mattermost parity |
| **Ecosystem maturity** | ClawHub skill marketplace (#50090), 29 translated READMEs | CoPaw launching "Agents Square" (#1883); others nascent |
| **Security incident response** | Rapid community self-policing of phishing scam (#49836) | NullClaw: proactive maintainer fixes; ZeroClaw: policy injection (#4002) |

### Technical Approach Differences

| Aspect | OpenClaw | Key Peers |
|:---|:---|:---|
| **Agent architecture** | Session-based with `sessions_spawn` foundation for teams (#10010) | CoPaw: Isolated workspaces (v0.1.0); IronClaw: Job-scoped with structured fallbacks |
| **Protocol strategy** | Native extensions (SoundChain #50339) + MCP client support requested (#29053) | ZeptoClaw: ACP (Agent Client Protocol); NullClaw: A2A v0.3.0; IronClaw: MCP filtering |
| **Configuration** | TOML-based with skill policy injection (#48838) | NullClaw: Schema evolution with breaking changes; NanoBot: JSON with env var secrets |
| **Deployment target** | Docker-first with companion apps | PicoClaw: ARM32/Termux/embedded; NanoClaw: systemd/Podman; IronClaw: Nix/Docker |

### Community Size Comparison

OpenClaw's **4+ month-old Linux request (#75, 63 👍)** demonstrates sustained demand scale unmatched by peers. Its phishing incident response (32 comments, 18 👍 in 24h) indicates **critical-mass community self-governance**. Only CoPaw approaches comparable engagement density (100 updates/day), though with higher frustration signals.

---

## 4. Shared Technical Focus Areas

| Requirement | Projects | Specific Evidence |
|:---|:---|:---|
| **Multi-agent orchestration** | OpenClaw, CoPaw, IronClaw, NanoClaw | OpenClaw #10010 (teams), #48838 (skill policies); CoPaw v0.1.0 architecture; IronClaw per-job MCP filtering (#1243); NanoClaw Discord Agent Swarm (#1265) |
| **Chinese platform integration** | OpenClaw, NanoBot, PicoClaw, CoPaw, ZeroClaw | OpenClaw: Kimi web_search (#44851); NanoBot: Feishu/Lark/QQ; PicoClaw: Feishu stability (#1767); CoPaw: QQ DM (#1641), Feishu auth (#1786); ZeroClaw: 阿里云百炼 (#3882) |
| **Local/edge model deployment** | PicoClaw, CoPaw, NanoClaw, ZeroClaw | PicoClaw: llama.cpp (#823), ARM32 (#1778); CoPaw: Ollama, local embeddings (#1789); NanoClaw: Claude Code CLI migration; ZeroClaw: Ollama tool-calling (#3999) |
| **Security hardening** | ZeroClaw, NanoBot, OpenClaw, Moltis | ZeroClaw: policy injection (#4002), `allow_scripts` audit (#4001); NanoBot: env var secrets (#2212, #2265); OpenClaw: device pairing hardening (#50695); Moltis: git hook framework (#454/#455) |
| **Observability & tracing** | NanoBot, NanoClaw, NullClaw, IronClaw | NanoBot: Langfuse (#1490), LiteLLM (#2268); NanoClaw: PostHog (#1280); NullClaw: OTel (#638); IronClaw: structured fallbacks (#236) |
| **Interruptible agent execution** | ZeroClaw, NanoBot, OpenClaw | ZeroClaw: `/stop` command (#3891), interrupt_on_new_message; NanoBot: Steering Loop (#1224); OpenClaw: dashboard chat history reload fix (#45541) |

---

## 5. Differentiation Analysis

| Project | Core Differentiation | Target User | Architecture Signature |
|:---|:---|:---|:---|
| **OpenClaw** | **Mobile-native ecosystem** with cross-platform parity | Power users, prosumers | TypeScript/Node.js, companion apps, skill marketplace |
| **ZeroClaw** | **"Secure by default"** with granular policy controls | Security-conscious enterprises | Rust, autonomous skill creation, policy injection |
| **CoPaw** | **Multi-agent workspace isolation** with Chinese IM depth | Enterprise teams, China market | Python, isolated agent workspaces, console UX |
| **IronClaw** | **Rust-based reliability** with staging CI rigor | Infrastructure engineers | Rust, LRU embedding cache, job-scoped execution |
| **PicoClaw** | **Embedded/edge deployment** (ARM32, Termux) | IoT, offline, resource-constrained | Go, CLI provider pattern, gateway architecture |
| **NanoClaw** | **Anthropic ecosystem alignment** (Claude Code parity) | Claude power users | TypeScript, container-first, conversation search |
| **NullClaw** | **Zig-based minimalism** with A2A protocol leadership | Protocol engineers, Nix users | Zig, A2A v0.3.0, cron HTTP API |
| **NanoBot** | **LiteLLM observability** + Chinese platform breadth | Multi-tenant operators | Python, LiteLLM callbacks, Feishu/QQ |
| **EasyClaw** | **UI/UX polish** with rapid iteration | End users seeking polished experience | TypeScript, component-based theming, captcha auth |

---

## 6. Community Momentum & Maturity

### Tier 1: Rapid Iteration (100+ daily events)

| Project | Pattern | Risk |
|:---|:---|:---|
| **OpenClaw** | Stabilization mode—no release today despite 500 updates | WhatsApp/gateway regressions could erode trust |
| **IronClaw** | Pre-release stabilization with aggressive CI gating | 56% open PR rate risks contributor burnout |
| **CoPaw** | Post-stable feature expansion with critical bug backlog | v0.1.0b3 deadlocks (#1774, #1834) need hotfix |

### Tier 2: Active Development (30–60 daily events)

| Project | Pattern | Risk |
|:---|:---|:---|
| **PicoClaw** | Nightly builds approaching v0.2.3 stable | Anthropic adapter fragility (#1792) |
| **NanoBot** | Feature consolidation with security focus | 40 open PRs = review bottleneck |
| **ZeroClaw** | High-velocity releases (10 in 24h) with quality debt | 5 S1 bugs threaten v0.5.1 reputation |
| **NanoClaw** | Architectural uncertainty (3 competing agent engines) | Community fragmentation without maintainer decision |

### Tier 3: Consolidation/Early Stage (<10 daily events)

| Project | Pattern | Risk |
|:---|:---|:---|
| **NullClaw** | Responsive maintenance, protocol leadership | Memory system failure (#646) unaddressed |
| **EasyClaw** | Coordinated UI sprint with Chinese community | Documentation gaps (#22) limiting adoption |
| **Moltis** | Security-conscious with review backlog | 5-day unmerged Windows fix risks contributor loss |
| **ZeptoClaw** | Protocol innovation blocked by bugs | ACP (#356) may need revert if #388 unresolved |
| **TinyClaw** | Minimal activity, zero engagement | Project viability uncertain |

---

## 7. Trend Signals

| Trend | Evidence | Value for AI Agent Developers |
|:---|:---|:---|
| **Agent protocol fragmentation → consolidation pressure** | ACP (ZeptoClaw), A2A (NullClaw), MCP (IronClaw, OpenClaw), native extensions all competing | **Monitor A2A v0.3.0** (NullClaw) and **MCP adoption** (OpenClaw #29053) for standardization bets; avoid deep investment in proprietary protocols |
| **Voice interface becoming table-stakes** | PicoClaw #1648 (14 comments, top priority), NanoClaw #1269 (Whisper integration), OpenClaw audio capabilities | Plan **TTS/ASR integration** early; local Whisper patterns (NanoClaw) reduce latency/cost vs. cloud APIs |
| **"Agent marketplace" ecosystem plays** | OpenClaw ClawHub (#50090), CoPaw Agents Square (#1883), ZeroClaw autonomous skills (#4001) | **Skill distribution mechanisms** will differentiate platforms; consider open vs. curated marketplace strategies |
| **Configuration as liability** | NullClaw schema churn (#629), OpenClaw auth fragility (#23538), CoPaw auto-rewrite blocking (#372) | Invest in **configuration validation, migration tooling, and schema stability**; breaking changes erode enterprise trust |
| **Embedding infrastructure commoditization** | IronClaw LRU cache (#1423), CoPaw local embeddings (#1789), OpenClaw external memory API request (#49233) | **Local embedding + caching** reduces cost/latency; hybrid BM25+vector (NanoClaw #1283) addresses retrieval quality |
| **Container runtime diversity** | NanoClaw Podman (#957), systemd (#413), NullClaw Podman OTel issues (#638) | **Test beyond Docker**; Podman/rootless containers increasingly required for enterprise security compliance |
| **Reasoning model UX challenges** | PicoClaw `<think>` tag filter (#1714), ZeroClaw `/reasoning` command (#2401), thinking mode toggle (NanoBot #2240) | **Design for opacity**—users need control over reasoning visibility; streaming vs. batched reasoning affects perceived responsiveness |

---

*Report generated from 12 project digests covering 1,000+ GitHub events on 2026-03-20.*

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-03-20

---

## 1. Today's Overview

NanoBot shows **high community velocity** with 52 PRs and 26 issues updated in the last 24 hours, indicating active development and substantial user engagement. No new releases were published today, suggesting the project is in a feature consolidation phase. The contributor base appears diverse with significant activity from Chinese-speaking users around Feishu/Lark and QQ integrations, alongside Western users focused on Telegram and Discord channels. Security hardening (environment variable secrets) and observability (LiteLLM tracing) are emerging as maintainer priorities. However, the high open-to-closed ratio (40 open PRs, 21 open issues) signals potential review bottleneck risk.

---

## 2. Releases

**None today.**

---

## 3. Project Progress

### Merged/Closed PRs Today

| PR | Description | Impact |
|:---|:---|:---|
| [#2265](https://github.com/HKUDS/nanobot/pull/2265) | Harden env ref save/restore semantics | Security fix for `{env:VAR}` placeholder handling |
| [#2212](https://github.com/HKUDS/nanobot/pull/2212) | Resolve runtime secret refs in tools and providers | Enables secure credential injection |
| [#1490](https://github.com/HKUDS/nanobot/pull/1490) | Add Langfuse observability support | Production monitoring capability |
| [#2261](https://github.com/HKUDS/nanobot/pull/2261) | *Closed without merge* — empty Claude analysis | N/A |

### Key Advances

- **Security infrastructure**: Environment variable secret references (`{env:VAR}`) now work end-to-end with proper round-trip handling ([#2218](https://github.com/HKUDS/nanobot/pull/2218) ecosystem)
- **Observability**: LiteLLM callback tracing ([#2268](https://github.com/HKUDS/nanobot/pull/2268)) and Langfuse integration ([#1490](https://github.com/HKUDS/nanobot/pull/1490)) landed for production monitoring
- **UX polish**: Discord setup guide ([#2269](https://github.com/HKUDS/nanobot/pull/2269)), read receipts ([#2267](https://github.com/HKUDS/nanobot/pull/2267)), and Telegram network error cleanup ([#2272](https://github.com/HKUDS/nanobot/pull/2272))

---

## 4. Community Hot Topics

| Item | Engagement | Analysis |
|:---|:---|:---|
| [#2133](https://github.com/HKUDS/nanobot/issues/2133) — Task execution user message queueing | 18 comments | **Core architecture debate**: Users want interruptible agent loops for real-time collaboration. Current "stop and restart" model breaks flow. Proposed solutions range from prompt engineering to fundamental loop restructuring. |
| [#1873](https://github.com/HKUDS/nanobot/issues/1873) — Config file security isolation | 9 comments | **Production deployment blocker**: Running agent loop as same user as config creates trivial secret exfiltration risk via `exec()`. Users requesting container-hardened deployment patterns. |
| [#2018](https://github.com/HKUDS/nanobot/issues/2018) — Interactive config wizard feedback | 9 comments | **Onboarding friction**: New `nanobot onboard` command getting real-world testing; UX issues emerging around partial saves and exit paths. |
| [#1692](https://github.com/HKUDS/nanobot/issues/1692) — Telegram double responses | 8 comments, 4 👍 | **Polish issue**: Affects perceived reliability; likely streaming implementation artifact. |
| [#1300](https://github.com/HKUDS/nanobot/issues/1300) — Matrix channel broken | 7 comments | **Integration debt**: Enterprise users blocked on Matrix deployment. |

**Underlying needs**: Real-time interactivity, production security hardening, and enterprise chat platform (Matrix/Feishu/QQ) reliability.

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR |
|:---|:---|:---|:---|
| 🔴 **High** | [#2266](https://github.com/HKUDS/nanobot/pull/2266) — `onboard` crash corrupts config | Open PR | [#2266](https://github.com/HKUDS/nanobot/pull/2266) under review |
| 🔴 **High** | [#2200](https://github.com/HKUDS/nanobot/issues/2200) — Anthropic provider broken (`litellm.BadRequestError`) | Open, 3 comments | None identified |
| 🟡 **Medium** | [#1692](https://github.com/HKUDS/nanobot/issues/1692) / [#2235](https://github.com/HKUDS/nanobot/issues/2235) — Telegram double responses | Open | None; suspected faux streaming issue |
| 🟡 **Medium** | [#2250](https://github.com/HKUDS/nanobot/issues/2250) — `onboard -c/--config` flag unrecognized | Open, 3 comments | None |
| 🟡 **Medium** | [#2273](https://github.com/HKUDS/nanobot/issues/2273) — Browser-use MCP incompatible with OpenRouter/gpt-5.4 | Open | None |
| 🟢 **Low** | [#2245](https://github.com/HKUDS/nanobot/issues/2245) — Ruff lint violations blocking contributors | Closed | Workflow issue, not runtime |
| 🟢 **Low** | [#2241](https://github.com/HKUDS/nanobot/issues/2241) — Onboard saves partial edits on cancel/exit | Closed | UX fix needed |

**Regression risk**: The Anthropic provider failure appears to be an external API change or litellm compatibility issue requiring urgent attention.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood in Next Version |
|:---|:---|:---|
| **Plugin system** (Copilot CLI/Claude Code style) | [#2231](https://github.com/HKUDS/nanobot/issues/2231) | Medium — architecture discussion needed |
| **Model switching via commands** | [#2257](https://github.com/HKUDS/nanobot/issues/2257) | High — small surface area, high user value |
| **Steering Loop** (interruptible agent execution) | [#1224](https://github.com/HKUDS/nanobot/pull/1224) | Medium — complex, opt-in design ready |
| **QQ file/image support** | [#1667](https://github.com/HKUDS/nanobot/pull/1667), [#2226](https://github.com/HKUDS/nanobot/issues/2226) | High — PR exists, community demand |
| **Tool hint user/group granularity** | [#2263](https://github.com/HKUDS/nanobot/pull/2263) | Medium — PR under review |
| **Thinking mode toggle** | [#2240](https://github.com/HKUDS/nanobot/issues/2240) | Low — needs specification |

**Emerging theme**: Users want **runtime control** over agent behavior (model, thinking, interruption) without restarts.

---

## 7. User Feedback Summary

### Pain Points
| Issue | Frequency | User Impact |
|:---|:---|:---|
| Session/context management | Repeated | Feishu users manually deleting session files to reset conversations ([#2062](https://github.com/HKUDS/nanobot/issues/2062)) |
| Platform-specific quirks | High | Feishu topic replies, image handling, command recognition all have gaps |
| Configuration complexity | Moderate | JSON editing → wizard helps, but edge cases (multi-instance `-c` flag) break |
| Secret management anxiety | Moderate | Users uncomfortable with API keys in plain text configs |

### Positive Signals
- Interactive onboarding wizard receiving active testing and iterative improvement
- Strong community contribution around Chinese platform integrations (QQ, Feishu)
- Security enhancements (env vars) landing quickly in response to user concerns

### Use Case Evolution
Users are pushing NanoBot from **personal automation** toward **team/enterprise deployment**, exposing gaps in multi-tenancy, permission boundaries, and audit logging.

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#1300](https://github.com/HKUDS/nanobot/issues/1300) Matrix channel failure | 20+ days | Enterprise adoption blocker | Maintainer triage; assign channel owner |
| [#1224](https://github.com/HKUDS/nanobot/pull/1224) Steering Loop architecture | 24+ days | Core feature, large PR | Design review, merge decision |
| [#1341](https://github.com/HKUDS/nanobot/pull/1341) Web chat channel | 20+ days | Modern UI gap | Review for v0.2.0 scope |
| [#1667](https://github.com/HKUDS/nanobot/pull/1667) QQ file support | 12+ days | Community PR, high demand | Merge or provide feedback |
| [#1053](https://github.com/HKUDS/nanobot/pull/1053) Message routing metadata fix | 25+ days | Threading reliability | Review bottleneck |

**Maintainer attention recommended**: The Steering Loop PR (#1224) represents significant architectural work that risks bit-rot; explicit roadmap communication would reduce community uncertainty.

---

*Digest generated from 52 PRs and 26 issues updated 2026-03-19.*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-03-20

## 1. Today's Overview

ZeroClaw shows **exceptionally high development velocity** with 50 PRs and 45 issues updated in 24 hours, culminating in **10 releases** including the stable **v0.5.1**. The project is in active feature consolidation mode, merging critical channel improvements (Discord/Mattermost interrupt support, `/stop` command), security hardening (policy injection into LLM prompts), and enterprise integrations (Jira). The 86% PR merge rate (43/50) indicates healthy code review throughput, though 12 active issues suggest ongoing tension between security constraints and user flexibility demands.

---

## 2. Releases

### [v0.5.1](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.5.1) — Stable Release
| Category | Changes |
|----------|---------|
| **Agent Core** | Runtime model switching via `model_switch` tool; sub-agent timeouts now configurable in `config.toml` |
| **System** | Heartbeat default interval reduced 30→5min; heartbeat excluded from auto-save to reduce disk I/O |
| **Skills** | **Autonomous skill creation** — agents can now generate skills without human intervention |
| **i18n** | Tool descriptions externalized for translation |
| **Infrastructure** | 8 beta releases (v0.5.1-beta.379 through beta.414) stress-tested channel interrupts, TTS, and security features |

**Breaking Changes**: None documented; migration from v0.5.0 should be seamless.

---

## 3. Project Progress

### Merged/Closed PRs Today (43 total)

| PR | Author | Impact |
|:---|:---|:---|
| [#3918](https://github.com/zeroclaw-labs/zeroclaw/pull/3918) | theredspoon | Discord `interrupt_on_new_message` parity |
| [#3917](https://github.com/zeroclaw-labs/zeroclaw/pull/3917) | theredspoon | Mattermost `interrupt_on_new_message` parity |
| [#3891](https://github.com/zeroclaw-labs/zeroclaw/pull/3891) | theredspoon | **`/stop` command** — cancels in-flight tasks (fixes race condition in #2855) |
| [#3992](https://github.com/zeroclaw-labs/zeroclaw/pull/3992) → [#4004](https://github.com/zeroclaw-labs/zeroclaw/pull/4004) | vincent067, theonlyhennygod | Delegate timeout configurability restored after regression |
| [#3997](https://github.com/zeroclaw-labs/zeroclaw/pull/3997) → [#4003](https://github.com/zeroclaw-labs/zeroclaw/pull/4003) | festoinc, theonlyhennygod | **Jira integration tool** with panic fixes |
| [#4001](https://github.com/zeroclaw-labs/zeroclaw/pull/4001) | theonlyhennygod | `allow_scripts` audit option for skills (restores #2008) |
| [#4002](https://github.com/zeroclaw-labs/zeroclaw/pull/4002) | theonlyhennygod | Security policy summary injected into LLM system prompt |
| [#4005](https://github.com/zeroclaw-labs/zeroclaw/pull/4005) | theonlyhennygod | Native tool-call text preserved in draft updates |
| [#4006](https://github.com/zeroclaw-labs/zeroclaw/pull/4006) | theonlyhennygod | OpenClaw migration docs added to 29 translated READMEs |

**Key Advancement**: The `/stop` command and cross-channel interrupt support close major UX gaps vs. OpenClaw, directly addressing [#2401](https://github.com/zeroclaw-labs/zeroclaw/issues/2401).

---

## 4. Community Hot Topics

### Most Active Issues

| Issue | Comments | Core Need |
|:---|:---:|:---|
| [#1478](https://github.com/zeroclaw-labs/zeroclaw/issues/1478) — "除了安全,什么功能也没有" (Closed, 42 comments) | 42 + 5 👍 | **Security vs. utility tension**: Power users want granular override controls; current policy blocks even explicitly-approved operations |
| [#3882](https://github.com/zeroclaw-labs/zeroclaw/issues/3882) — 阿里云百炼 Coding Plan support (Open, 8 comments) | 8 | China cloud provider expansion; API compatibility layer gaps |
| [#1865](https://github.com/zeroclaw-labs/zeroclaw/issues/1865) — Telegram HITL inline buttons (Closed, 6 comments) | 6 | Non-CLI channels need interactive approval workflows |
| [#1889](https://github.com/zeroclaw-labs/zeroclaw/issues/1889) — Script files in skills (Closed, 5 comments) | 5 | Skill ecosystem flexibility vs. sandbox security |

**Underlying Pattern**: Users migrating from OpenClaw expect equivalent power-user controls. The project's "secure by default" stance creates friction for solo/self-hosted deployments where risk tolerance is higher.

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR |
|:---|:---|:---|:---|
| **S1** | [#3786](https://github.com/zeroclaw-labs/zeroclaw/issues/3786) — Codex/GPT-5.4 provider failures every 3-4 prompts | Open | — |
| **S1** | [#3982](https://github.com/zeroclaw-labs/zeroclaw/issues/3982) — Severe hallucination on Raspberry Pi | Open | — |
| **S1** | [#4009](https://github.com/zeroclaw-labs/zeroclaw/issues/4009) — LLM hallucinates tool usage in Feishu/Lark channels | Open | — |
| **S1** | [#3999](https://github.com/zeroclaw-labs/zeroclaw/issues/3999) — Ollama tool-calling handshake failure | Open | — |
| **S1** | [#4007](https://github.com/zeroclaw-labs/zeroclaw/issues/4007) — Venice.ai tool use broken | Open | — |
| **S2** | [#3977](https://github.com/zeroclaw-labs/zeroclaw/issues/3977) — Anthropic 0% cache hit rate on Haiku 4.5 | Closed | — |
| **S2** | [#3952](https://github.com/zeroclaw-labs/zeroclaw/issues/3952) — `autonomy.level = "full"` ignored in channels | Closed | — |
| **S3** | [#4008](https://github.com/zeroclaw-labs/zeroclaw/issues/4008) — Copy button non-functional in web UI | Open | — |

**Critical Concern**: **5 open S1 bugs** affect core provider/tooling functionality, suggesting regression risk in v0.5.1's new channel/agent features. The hallucination bugs ([#3982](https://github.com/zeroclaw-labs/zeroclaw/issues/3982), [#4009](https://github.com/zeroclaw-labs/zeroclaw/issues/4009)) may relate to system prompt changes in [#4002](https://github.com/zeroclaw-labs/zeroclaw/pull/4002).

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood in v0.5.2 |
|:---|:---|:---:|
| LiteLLM provider alias | [#2602](https://github.com/zeroclaw-labs/zeroclaw/issues/2602) — **Merged** | ✅ Shipped |
| `/reasoning` command | [#2401](https://github.com/zeroclaw-labs/zeroclaw/issues/2401) — Partial ( `/stop` done) | 🟡 High |
| "Full" Docker image with all features | [#3642](https://github.com/zeroclaw-labs/zeroclaw/issues/3642) — 3 comments, 2 👍 | 🟡 High |
| Claude Code + Amazon Bedrock docs | [#3887](https://github.com/zeroclaw-labs/zeroclaw/issues/3887) | 🟢 Medium |
| Web UI theme system | [#3986](https://github.com/zeroclaw-labs/zeroclaw/pull/3986) — **Open PR** | 🟢 Medium |
| Google Workspace operation-level allowlist | [#4010](https://github.com/zeroclaw-labs/zeroclaw/pull/4010) — **Open PR** | 🟢 Medium |

**Prediction**: v0.5.2 will likely include the theme system ([#3986](https://github.com/zeroclaw-labs/zeroclaw/pull/3986)), Google Workspace granular permissions ([#4010](https://github.com/zeroclaw-labs/zeroclaw/pull/4010)), and expanded provider documentation.

---

## 7. User Feedback Summary

### Pain Points
| Theme | Evidence | Severity |
|:---|:---|:---:|
| **Security overreach** | [#1478](https://github.com/zeroclaw-labs/zeroclaw/issues/1478) — "安全到这个bot只能当个聊天机器人" | 🔴 Critical |
| **Provider fragmentation** | [#3786](https://github.com/zeroclaw-labs/zeroclaw/issues/3786), [#4007](https://github.com/zeroclaw-labs/zeroclaw/issues/4007), [#3999](https://github.com/zeroclaw-labs/zeroclaw/issues/3999) — Multiple local/cloud providers broken | 🔴 Critical |
| **Documentation gaps** | [#3887](https://github.com/zeroclaw-labs/zeroclaw/issues/3887), [#3991](https://github.com/zeroclaw-labs/zeroclaw/issues/3991) — Homebrew frontend missing, Bedrock unclear | 🟡 Moderate |

### Positive Signals
- Jira integration and autonomous skills show enterprise trajectory
- `/stop` and interrupt parity addresses major OpenClaw migration blocker
- i18n investment indicates global user base commitment

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|:---|:---:|:---|:---|
| [#3764](https://github.com/zeroclaw-labs/zeroclaw/issues/3764) — Web UI 405 error with custom headers | 3 days | S1 workflow blocked | Provider routing fix |
| [#3642](https://github.com/zeroclaw-labs/zeroclaw/issues/3642) — "Full" Docker image | 5 days | Onboarding friction | Build system decision |
| [#3882](https://github.com/zeroclaw-labs/zeroclaw/issues/3882) — 阿里云百炼 Coding Plan | 2 days | China market expansion | Provider SDK research |
| [#4010](https://github.com/zeroclaw-labs/zeroclaw/pull/4010) — Google Workspace allowlist | New | Security hardening | Code review |

**Maintainer Attention**: The 5 open S1 bugs (particularly hallucination-related) should be prioritized over new features to preserve v0.5.1 stability reputation.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-03-20

## 1. Today's Overview

PicoClaw shows **very high development velocity** with 106 PRs and 41 issues updated in 24 hours, indicating an active, rapidly evolving codebase. The project released a new nightly build (v0.2.3-nightly.20260319.e73d9d95), suggesting v0.2.3 is approaching stable release. Activity is heavily concentrated in **provider integrations** (OpenAI-compatible, CLI providers, Anthropic) and **channel stability** (Feishu, Telegram), with significant bug-fixing alongside new feature development. The 52:54 merged-to-open PR ratio shows healthy throughput but also indicates a growing review backlog. Chinese enterprise users (Feishu/Lark) represent a major user segment driving channel-specific issues.

---

## 2. Releases

| Version | Type | Notes |
|---------|------|-------|
| [v0.2.3-nightly.20260319.e73d9d95](https://github.com/sipeed/picoclaw/compare/v0.2.3...main) | Nightly | Automated build from `main`; **use with caution**. Precedes expected v0.2.3 stable. |

**No stable release today.** The changelog comparison suggests ongoing work toward v0.2.3 final.

---

## 3. Project Progress

### Merged/Closed PRs (52 total, selected highlights)

| PR | Author | Impact |
|----|--------|--------|
| [#1813](https://github.com/sipeed/picoclaw/pull/1813) | securityguy | **Critical fix**: Robust CLI tool call extraction for claude-cli/gemini-cli/codex-cli — handles pretty-printed JSON, nested objects, and mixed text+tool responses |
| [#1812](https://github.com/sipeed/picoclaw/pull/1812) | securityguy | **Security fix**: Pass system prompt via stdin instead of CLI arg (avoids shell injection, length limits) |
| [#1460](https://github.com/sipeed/picoclaw/pull/1460) | securityguy | OpenAI-compatible tool call serialization fix — removes empty `content` field that broke strict providers |
| [#1390](https://github.com/sipeed/picoclaw/pull/1390) | kiannidev | Telegram typing indicator now stops on LLM failure/hang (UX polish) |
| [#1711](https://github.com/sipeed/picoclaw/pull/1711) | paoloanzn | **Critical fix**: Tool registry propagation to subagents — fixes "tool not found" in multi-agent workflows |
| [#1740](https://github.com/sipeed/picoclaw/pull/1740) | darrenzeng2025 | Documentation: workspace `.md` files don't require gateway restart |
| [#1788](https://github.com/sipeed/picoclaw/pull/1788) | alexhoshina | Documentation: Agent Bindings routing configuration |

**Infrastructure**: Dependabot merged 4 dependency updates (goreleaser, docker/qemu, tailwindcss, shadcn).

---

## 4. Community Hot Topics

### Most Active Issues by Engagement

| Issue | Comments | Category | Analysis |
|-------|----------|----------|----------|
| [#1648](https://github.com/sipeed/picoclaw/issues/1648) — TTS/ASR Support | 14 | **Enhancement** | Top community priority. PR #1642 exists but needs gateway integration. **Signal**: Voice interaction is becoming table-stakes for AI agents. |
| [#901](https://github.com/sipeed/picoclaw/issues/901) — OpenRouter/free model config | 12 | **Bug** (closed) | Configuration complexity pain point. Closed but pattern suggests provider config UX needs simplification. |
| [#100](https://github.com/sipeed/picoclaw/issues/100) — "No response" message | 11 | **Bug** (closed) | OpenRouter-specific quirk, resolved. Indicates provider-specific edge cases remain common. |
| [#1439](https://github.com/sipeed/picoclaw/issues/1439) — Context management refactor | 6 | **Enhancement** (closed) | Agent refactor track 6 completed. Token budgeting and compression now defined. |

### Underlying Needs
- **Voice interface demand** (#1648): Users want parity with OpenClaw's audio capabilities
- **Provider resilience**: Multiple issues around OpenRouter fallback chains (#1581), Anthropic tool call handling (#1792, #1771)
- **Enterprise China deployment**: Feishu stability (#1767, #1675) and ARM32 support (#1778, #1675) for embedded/Termux use

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|----------|-------|-------------|------------|
| **High** | [#1792](https://github.com/sipeed/picoclaw/issues/1792) | Anthropic API 400: duplicate `tool_result` blocks — breaks multi-tool workflows | **No PR yet** — root cause identified in `sanitizeHistoryForProvider` |
| **High** | [#1771](https://github.com/sipeed/picoclaw/issues/1771) | Anthropic 400 when `tool_call.name` is empty string | **Closed** — fixed today |
| **High** | [#1813](https://github.com/sipeed/picoclaw/pull/1813) | CLI tool call extraction failures (pretty-printed JSON) | **PR open** — critical path for CLI providers |
| **Medium** | [#1767](https://github.com/sipeed/picoclaw/issues/1767) | Feishu bot frequent disconnects, no auto-reconnect | **No PR** — network resilience gap |
| **Medium** | [#1704](https://github.com/sipeed/picoclaw/issues/1704) | Launcher TUI prevents gateway/talk start | **No PR** — Android/Termux specific |
| **Medium** | [#1641](https://github.com/sipeed/picoclaw/issues/1641) | `max_tool_iterations` error after days of uptime | **No PR** — resource leak suspected |
| **Medium** | [#629](https://github.com/sipeed/picoclaw/issues/629) | LLM call failures don't retry (HTTP 500) | **No PR** — resilience gap |

**Regression Risk**: Multiple Anthropic-related bugs suggest the Messages API adapter needs comprehensive test coverage.

---

## 6. Feature Requests & Roadmap Signals

| Issue | Likelihood in v0.2.4+ | Rationale |
|-------|----------------------|-----------|
| [#1648](https://github.com/sipeed/picoclaw/issues/1648) TTS/ASR | **High** | PR exists, just needs gateway integration; competitive necessity |
| [#1795](https://github.com/sipeed/picoclaw/issues/1795) / [#1796](https://github.com/sipeed/picoclaw/issues/1796) Event-driven Hooks | **Medium-High** | Referenced OpenClaw parity; two duplicate issues filed same day signals demand |
| [#1738](https://github.com/sipeed/picoclaw/issues/1738) OpenAI API format channel | **Medium** | Enterprise integration need; "nice-to-have" tagged |
| [#1797](https://github.com/sipeed/picoclaw/issues/1797) Web dashboard: cron + cost stats | **Medium** | Fits "manage everything in web" theme; depends on dashboard roadmap |
| [#1714](https://github.com/sipeed/picoclaw/issues/1714) `<think>` tag filter | **Medium** | Low effort, high UX value for reasoning models |
| [#1731](https://github.com/sipeed/picoclaw/issues/1731) OTel GenAI observability | **Lower** | Enterprise feature; needs spec alignment |
| [#1372](https://github.com/sipeed/picoclaw/issues/1372) OpenIM plugin | **Unclear** | No response from maintainers; channel ecosystem question |

---

## 7. User Feedback Summary

### Pain Points
| Theme | Evidence | Severity |
|-------|----------|----------|
| **Configuration complexity** | #901, #1635, #1581 | High — provider/model_list inheritance confusing |
| **Feishu reliability** | #1767, #1675, #1727 | High — Chinese enterprise users blocked |
| **ARM32/embedded support** | #1778, #1675, #1704 | Medium — Termux/Android deployment friction |
| **Tool execution opacity** | #571 | Medium — no progress feedback during long operations |
| **Anthropic integration fragility** | #1792, #1771, #1247 | High — production blocker for Claude users |

### Positive Signals
- Active nightly builds show responsive maintenance
- Documentation improvements (#1740, #1788) addressing discoverability
- Multi-agent tool registry fix (#1711) unblocks complex workflows

### Use Case Evolution
Users are deploying PicoClaw in **embedded/edge scenarios** (ARM32, Raspberry Pi, Termux) and **enterprise messaging** (Feishu/Lark), stretching beyond original cloud-native assumptions.

---

## 8. Backlog Watch

| Issue/PR | Age | Risk | Action Needed |
|----------|-----|------|---------------|
| [#629](https://github.com/sipeed/picoclaw/issues/629) LLM retry on failure | 25 days | **Stability** | Core reliability; no assignee |
| [#571](https://github.com/sipeed/picoclaw/issues/571) Tool execution progress | 27 days | **UX** | Clear user pain; needs design decision |
| [#1247](https://github.com/sipeed/picoclaw/issues/1247) OpenRouter prefix stripping | 11 days | **Provider bug** | May affect other providers |
| [#1372](https://github.com/sipeed/picoclaw/issues/1372) OpenIM plugin | 8 days | **Ecosystem** | No maintainer response |
| [#1581](https://github.com/sipeed/picoclaw/issues/1581) Provider-aware fallback | 5 days | **Reliability** | Architectural; needs RFC |
| [#1750](https://github.com/sipeed/picoclaw/pull/1750) Qwen CLI provider | 1 day | **Merge ready?** | Large PR (merge upstream); needs review |

**Maintainer Attention Recommended**: 
- **#629** (retry logic) — foundational reliability gap
- **#1792** (Anthropic tool_result deduplication) — production regression
- **#1767** (Feishu reconnect) — enterprise user retention

---

*Digest generated from 147 GitHub events (41 issues, 106 PRs) on 2026-03-20.*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-03-20

## 1. Today's Overview

NanoClaw shows **high development velocity** with 32 PRs and 15 issues updated in the last 24 hours, though no new releases were cut. The project is experiencing significant architectural churn: multiple competing approaches to replace the Claude Agent SDK (#1266, #1268, #963) suggest uncertainty around Anthropic TOS compliance and runtime flexibility. Skill branch maintenance is failing repeatedly across `skill/apple-container` and `skill/compact`, indicating structural merge conflicts that may block feature delivery. Community activity is robust with new channel integrations (Signal, Discord, email, web) and security-conscious contributions around git hook enforcement and prompt logging.

---

## 2. Releases

**No new releases** (v0.0.0 or previous remains current).

---

## 3. Project Progress

### Merged/Closed PRs (11 total, key items)

| PR | Description | Significance |
|:---|:---|:---|
| [#1160](https://github.com/qwibitai/nanoclaw/pull/1160) | Conversation search (BM25/FTS5) + WhatsApp file attachments | **Major UX upgrade** — searchable history and rich media support |
| [#1191](https://github.com/qwibitai/nanoclaw/pull/1191) | Security fix: stop logging user prompt content on container errors | Closes [#1150](https://github.com/qwibitai/nanoclaw/issues/1150) — privacy-critical |
| [#651](https://github.com/qwibitai/nanoclaw/pull/651) | Reduce Docker stop timeout 10s→1s | 10× faster restarts for stateless containers |
| [#1269](https://github.com/qwibitai/nanoclaw/pull/1269) | Telegram voice transcription skill | Local Whisper integration, graceful fallback |
| [#1268](https://github.com/qwibitai/nanoclaw/pull/1268) | Replace Claude SDK dependency | Closed without merge — superseded by #1266? |

### Key Advances
- **Memory system**: Hybrid BM25+vector retrieval in review (#1283, #1043) — addresses keyword search gaps
- **Observability**: PostHog diagnostics opt-in (#1280) and API usage tracking (#1111) in flight
- **Platform expansion**: Headless Linux/VPS setup docs (#1281) improves server deployment story

---

## 4. Community Hot Topics

### Most Active by Engagement

| Item | Type | Activity | Core Need |
|:---|:---|:---|:---|
| [#957](https://github.com/qwibitai/nanoclaw/issues/957) Podman support | Issue | 5 comments, 4 👍 | **Container runtime diversity** — Docker alternatives for macOS/Linux users avoiding Docker Desktop licensing |
| [#853](https://github.com/qwibitai/nanoclaw/issues/853) ANTHROPIC_AUTH_TOKEN support | Issue | 2 comments | Credential parity with official Claude Code CLI |
| [#413](https://github.com/qwibitai/nanoclaw/issues/413) systemd user session fallback | Issue | 2 comments | **Production Linux deployment** — SSH-accessed servers need proper service management, not nohup |

### Underlying Needs Analysis
- **Enterprise/self-hosting readiness**: Podman, systemd, and headless browser fixes (#1281) cluster around "run NanoClaw on my infrastructure" use case
- **Anthropic ecosystem alignment**: Multiple issues/PRs track Claude Code CLI changes (#853, #1266, #1268) — NanoClaw is downstream of Anthropic's release cadence

---

## 5. Bugs & Stability

| Severity | Issue | Status | Fix PR? |
|:---|:---|:---|:---|
| 🔴 **High** | [#1150](https://github.com/qwibitai/nanoclaw/issues/1150) — Container logs leak full user prompts | **Fixed** by [#1191](https://github.com/qwibitai/nanoclaw/pull/1191) | ✅ Merged |
| 🟡 **Medium** | [#853](https://github.com/qwibitai/nanoclaw/issues/853) — ANTHROPIC_AUTH_TOKEN unrecognized | Open | ❌ None |
| 🟡 **Medium** | [#413](https://github.com/qwibitai/nanoclaw/issues/413) — systemd fallback fails to nohup | Open | ❌ None |
| 🟡 **Medium** | [#1272](https://github.com/qwibitai/nanoclaw/issues/1272) — DB migration mislabels Telegram DMs as groups | Open | ❌ None |
| 🟡 **Medium** | [#1267](https://github.com/qwibitai/nanoclaw/pull/1267) — credential-proxy path handling for custom endpoints | Open PR | 🔄 In review |

### Stability Concerns
- **Skill branch rot**: 5 automated issues (#1276-#1279, #1261) report merge-forward failures on `skill/apple-container` and `skill/compact`. This suggests:
  - Main branch changes conflict with skill-specific code
  - No human triage of bot-generated alerts (0 comments on all 5)
  - Risk of skill divergence and maintenance burden

---

## 6. Feature Requests & Roadmap Signals

### Likely Near-Term (active PRs, clear demand)

| Feature | PR/Issue | Confidence | Notes |
|:---|:---|:---|:---|
| Hybrid memory (BM25+vector) | [#1283](https://github.com/qwibitai/nanoclaw/pull/1283) | **High** | Second iteration (#1043 closed), addresses real retrieval quality gaps |
| PostHog diagnostics | [#1280](https://github.com/qwibitai/nanoclaw/pull/1280) | High | Opt-in, privacy-conscious, aids debugging |
| Signal channel | [#1121](https://github.com/qwibitai/nanoclaw/pull/1121) | Medium | External skill repo pattern, needs review |
| Discord Agent Swarm | [#1265](https://github.com/qwibitai/nanoclaw/pull/1265) | Medium | Webhook-based, no bot pool complexity |

### Architectural Decisions Pending

| Topic | Competing PRs | Risk |
|:---|:---|:---|
| Agent engine abstraction | #963 (OpenAI Codex), #1266 (Claude Code CLI), #1268 (closed) | **Fragmentation** — community splitting effort across incompatible approaches |
| SDK vs CLI | #1266 replaces SDK with CLI for TOS compliance | Breaking change for container contracts |

### Predicted vNext Features
Based on merge velocity and user demand: conversation search (#1160 already merged), hybrid memory (#1283), and improved Linux/VPS setup (#1281) form a coherent "production self-hosting" release theme.

---

## 7. User Feedback Summary

### Pain Points

| Source | Issue | Emotion |
|:---|:---|:---|
| @fuyb (#957) | "Docker Desktop licensing concerns" | **Friction, seeking alternatives** |
| @Koshkoshinsk (#413) | "always lands on nohup" — systemd fails | **Frustration with "it works on my machine"** |
| @scguoi (#853) | Claude Code auth token not recognized | **Confusion, ecosystem mismatch** |
| @0reo (#1272) | DB migration "blindly marks" data wrong | **Distrust in data integrity** |

### Positive Signals
- @rozek (#1273): Built **multi-session web channel** as external contribution — "wonderful tool" but messenger-only limitation spurred innovation
- @davidpfrost (#1263, closed): Multi-group Telegram for cross-repo collaboration — **advanced use case, platform extensibility validated**

### Use Case Evolution
Early adopters appear to be **teams running NanoClaw as infrastructure** (multiple repos, cross-agent collaboration, VPS deployment) rather than individual users. This shifts priorities toward: multi-tenancy, observability, and headless operation.

---

## 8. Backlog Watch

### Needs Maintainer Attention

| Item | Age | Risk |
|:---|:---|:---|
| [#957](https://github.com/qwibitai/nanoclaw/issues/957) Podman docs | 9 days | Documentation-only, low effort, high user value |
| [#853](https://github.com/qwibitai/nanoclaw/issues/853) ANTHROPIC_AUTH_TOKEN | 10 days | Blocks Claude Code CLI users, trivial fix |
| [#413](https://github.com/qwibitai/nanoclaw/issues/413) systemd fallback | 25 days | **Production deployment blocker**, has reproduction steps |
| Skill branch merge failures (#1276-#1279, #1261) | 1 day | **Process failure** — bot noise without human triage; consider disabling auto-issues or adding auto-close |

### Strategic Concerns
- **Agent engine fragmentation**: Three competing approaches (#963, #1266, #1268) need maintainer decision to prevent community split
- **Skill branch maintenance model**: Automated merge-forwards failing silently suggests the skills-as-repos architecture may need rethinking or better CI investment

---

*Digest generated from 47 GitHub events (15 issues, 32 PRs) on 2026-03-20.*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-03-20

---

## 1. Today's Overview

NullClaw shows **healthy development velocity** with 16 PRs and 10 issues updated in the last 24 hours, split evenly between open/active and closed/merged items. The project released **v2026.3.18** with Novita AI provider support and critical Docker configuration fixes. Community activity centers on **configuration usability**, **A2A protocol expansion**, and **provider ecosystem growth**. The maintainer team (notably `manelsen` and `yanggf8`) demonstrates responsive bug-fixing with 5 issue closures and 8 PR merges. However, **memory system reliability** and **interactive command handling** remain pain points requiring attention.

---

## 2. Releases

### [v2026.3.18](https://github.com/nullclaw/nullclaw/releases/tag/v2026.3.18) — 2026-03-19

| Change | Type | PR |
|--------|------|-----|
| Add Novita AI as OpenAI-compatible provider | Feature | [#621](https://github.com/nullclaw/nullclaw/pull/621) |
| Update Docker container starter config to current schema | Fix | [#636](https://github.com/nullclaw/nullclaw/pull/636) |

**Breaking Changes & Migration:**
- **Docker/OCI users must update configs**: The bundled image starter config removed deprecated top-level `default_provider` and `default_model` fields. Users upgrading from pre-2026.3.17 images will encounter: `Config error: top-level default_provider is not supported. Set agents.defaults.model.primary instead.` ([Issue #629](https://github.com/nullclaw/nullclaw/issues/629))

**Migration:** Update to `agents.defaults.model.primary` + `models.providers` schema. See [PR #636](https://github.com/nullclaw/nullclaw/pull/636).

---

## 3. Project Progress

### Merged/Closed PRs (8 items)

| PR | Author | Summary | Impact |
|----|--------|---------|--------|
| [#639](https://github.com/nullclaw/nullclaw/pull/639) | DonPrus | Version bump v2026.3.18 | Release coordination |
| [#637](https://github.com/nullclaw/nullclaw/pull/637) | manelsen | Pin Nix flake dev shell to Zig 0.15.2 | **Build stability** — fixes NixOS 25.11 build failures |
| [#633](https://github.com/nullclaw/nullclaw/pull/633) | manelsen | Inject configured AIEOS identity into system prompts | **Fixes broken identity loading** — resolves [#625](https://github.com/nullclaw/nullclaw/issues/625) |
| [#634](https://github.com/nullclaw/nullclaw/pull/634) | manelsen | Matrix: use joined member count for private room detection | **Fixes room misclassification** — resolves [#616](https://github.com/nullclaw/nullclaw/issues/616) |
| [#635](https://github.com/nullclaw/nullclaw/pull/635) | manelsen | Telegram: suppress draft retries for invalid peers | **Reduces log spam** — resolves [#626](https://github.com/nullclaw/nullclaw/issues/626) |
| [#636](https://github.com/nullclaw/nullclaw/pull/636) | manelsen | Docker: update container starter config to current schema | **Critical fix** — resolves [#629](https://github.com/nullclaw/nullclaw/issues/629) |
| [#630](https://github.com/nullclaw/nullclaw/pull/630) | hfreire | A2A: update to v0.3.0 + new task states + enhanced history | **Protocol compliance upgrade** |
| [#617](https://github.com/nullclaw/nullclaw/pull/617) | Centauria | Use portable Atomic in daemon.zig | Code quality |

**Key Advances:**
- **AIEOS identity system** now functional after config-prompt wiring fix
- **A2A protocol** modernized to v0.3.0 with streaming resubscription support
- **Nix/Docker packaging** stabilized with pinned dependencies and schema updates

---

## 4. Community Hot Topics

### Most Active Discussions

| Item | Type | Comments | Heat Analysis |
|------|------|----------|---------------|
| [#619](https://github.com/nullclaw/nullclaw/issues/619) | Issue | 3 | **Error observability crisis** — Users cannot debug `error.ApiError` without code knowledge; signals need for structured error codes and user-facing diagnostics |
| [#626](https://github.com/nullclaw/nullclaw/issues/626) | Issue | 2 | **Telegram draft spam** — Now fixed via [#635](https://github.com/nullclaw/nullclaw/pull/635); high noise-to-signal ratio in logs frustrated operators |
| [#527](https://github.com/nullclaw/nullclaw/pull/527) | PR | 0 (but 5 days active) | **Adaptive Intelligence Pipeline** — Major feature awaiting review; includes turn scoring, skill routing, email/WhatsApp channels. Long review cycle suggests complexity concerns |

**Underlying Needs:**
- **Operational transparency**: Users need actionable error messages without source diving ([#619](https://github.com/nullclaw/nullclaw/issues/619))
- **Quality assurance loop**: Strong demand for self-improving agents ([#527](https://github.com/nullclaw/nullclaw/pull/527))
- **Provider diversity**: Free-tier access driving provider requests

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|----------|-------|-------------|------------|
| 🔴 **Critical** | [#644](https://github.com/nullclaw/nullclaw/issues/644) | Gateway hangs on interactive commands (`htop`, `btop`) in yolo mode — requires `kill -9` | **OPEN — no PR** |
| 🟡 **High** | [#646](https://github.com/nullclaw/nullclaw/issues/646) | Memory system non-functional — agent claims persistence but fails to store/recall | **OPEN — no PR** |
| 🟡 **High** | [#638](https://github.com/nullclaw/nullclaw/issues/638) | OpenTelemetry diagnostics not working in Podman container setup | **OPEN — no PR** |
| 🟢 **Medium** | [#619](https://github.com/nullclaw/nullclaw/issues/619) | Opaque error messages hinder debugging | **OPEN — no PR** |
| 🟢 **Medium** | [#625](https://github.com/nullclaw/nullclaw/issues/625) | AIEOS identity config ignored | ✅ **Fixed** via [#633](https://github.com/nullclaw/nullclaw/pull/633) |
| 🟢 **Medium** | [#629](https://github.com/nullclaw/nullclaw/issues/629) | Podman HTTP gateway config error | ✅ **Fixed** via [#636](https://github.com/nullclaw/nullclaw/pull/636) |
| 🟢 **Medium** | [#616](https://github.com/nullclaw/nullclaw/issues/616) | Matrix private room detection wrong | ✅ **Fixed** via [#634](https://github.com/nullclaw/nullclaw/pull/634) |
| 🟢 **Medium** | [#626](https://github.com/nullclaw/nullclaw/issues/626) | Telegram draft API spam | ✅ **Fixed** via [#635](https://github.com/nullclaw/nullclaw/pull/635) |
| 🟢 **Medium** | [#612](https://github.com/nullclaw/nullclaw/issues/612) | NixOS 25.11 build failure | ✅ **Fixed** via [#637](https://github.com/nullclaw/nullclaw/pull/637) |

**Regression Risk:** The [#644](https://github.com/nullclaw/nullclaw/issues/644) hang on interactive TUI commands suggests process I/O handling gaps in "yolo mode" execution.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue/PR | Likelihood v2026.3.19+ | Rationale |
|---------|----------|------------------------|-----------|
| **Qwen Code CLI provider** | [#647](https://github.com/nullclaw/nullclaw/issues/647) | **High** | Simple OpenAI-compatible addition; follows Novita AI pattern |
| **A2A protocol documentation expansion** | [#649](https://github.com/nullclaw/nullclaw/pull/649) | **Very High** | PR already open; comprehensive docs + examples |
| **Cron HTTP API live scheduler** | [#648](https://github.com/nullclaw/nullclaw/pull/648) | **Very High** | PR open; eliminates race condition, high operational value |
| **Cron CLI `--account` flag** | [#645](https://github.com/nullclaw/nullclaw/pull/645) | **Very High** | PR open; small surface, completes delivery routing |
| **Adaptive Intelligence Pipeline** | [#527](https://github.com/nullclaw/nullclaw/pull/527) | **Medium** | Large feature; may need iteration, but 5+ days in review suggests imminent merge |
| **Email/WhatsApp Web channels** | [#527](https://github.com/nullclaw/nullclaw/pull/527) | **Medium** | Bundled with adaptive pipeline; same review dependency |
| **Portable atomic u64 simplification** | [#640](https://github.com/nullclaw/nullclaw/pull/640) | **High** | Small cleanup PR, follow-up to [#617](https://github.com/nullclaw/nullclaw/pull/617) |
| **GLM/ZhipuAI thinking mode fix** | [#641](https://github.com/nullclaw/nullclaw/pull/641) | **High** | Fixes response loops, provider stability |

---

## 7. User Feedback Summary

### Pain Points

| Theme | Evidence | Severity |
|-------|----------|----------|
| **Configuration schema churn** | [#629](https://github.com/nullclaw/nullclaw/issues/629), [#625](https://github.com/nullclaw/nullclaw/issues/625), [#636](https://github.com/nullclaw/nullclaw/pull/636) | High — breaking changes without migration tooling |
| **Silent feature failures** | [#646](https://github.com/nullclaw/nullclaw/issues/646) (memory), [#625](https://github.com/nullclaw/nullclaw/issues/625) (identity) | High — config parses but doesn't apply |
| **Observability gaps** | [#619](https://github.com/nullclaw/nullclaw/issues/619), [#638](https://github.com/nullclaw/nullclaw/issues/638) | Medium — debugging requires code knowledge |
| **Process execution robustness** | [#644](https://github.com/nullclaw/nullclaw/issues/644) | Critical — hangs require manual intervention |

### Positive Signals

- **Responsive maintainers**: 5/5 closed issues had PR fixes within 24h
- **Provider ecosystem growth**: Novita AI added, Qwen requested — free-tier accessibility valued
- **A2A protocol leadership**: v0.3.0 compliance, comprehensive documentation

### Use Case Patterns

- **Multi-channel deployments**: Telegram + Matrix + seeking Email/WhatsApp
- **Container-first operations**: Podman/Docker primary, OTel integration expected
- **Autonomous agent modes**: "Yolo mode" for command execution, but safety/robustness gaps

---

## 8. Backlog Watch

### Needs Maintainer Attention

| Item | Age | Risk | Action Needed |
|------|-----|------|---------------|
| [#527](https://github.com/nullclaw/nullclaw/pull/527) Adaptive Intelligence Pipeline | 6 days | **Review bottleneck** — large feature blocking email/WhatsApp channels | Code review, possible decomposition |
| [#644](https://github.com/nullclaw/nullclaw/issues/644) Gateway hang on interactive commands | 1 day | **Critical stability** — no PR, affects "yolo mode" core feature | Triage and assign |
| [#646](https://github.com/nullclaw/nullclaw/issues/646) Memory system non-functional | 1 day | **Core feature broken** — no PR, user expectation mismatch | Reproduce and prioritize |
| [#638](https://github.com/nullclaw/nullclaw/issues/638) OTel diagnostics failure | 1 day | **Observability gap** — no PR, container networking complexity | Needs reproduction help |

### Stale Risk

- [#647](https://github.com/nullclaw/nullclaw/issues/647) Qwen Code CLI — simple provider addition, could be fast-tracked

---

*Digest generated from GitHub activity 2026-03-19 to 2026-03-20. All links: https://github.com/nullclaw/nullclaw*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-03-20

## 1. Today's Overview

IronClaw demonstrates **exceptionally high development velocity** with 100 items updated in 24 hours (50 issues, 50 PRs) and a fresh v0.20.0 release. The project shows **mature engineering practices** with automated staging CI catching 30+ code quality issues before merge. Core development focuses on three vectors: **embedding infrastructure optimization** (LRU caching, Arc-based memory efficiency), **multi-channel reliability** (Socket Mode, MCP protocol fixes), and **enterprise hardening** (token budgets, permission scoping). The 56% open PR rate (28/50) suggests active feature development outpacing review bandwidth—typical for pre-release stabilization.

---

## 2. Releases

### [v0.20.0](https://github.com/nearai/ironclaw/releases/tag/v0.20.0) — 2026-03-19

| Category | Change |
|----------|--------|
| **Self-Repair** | Wired `stuck_threshold`, `store`, and `builder` parameters ([#712](https://github.com/nearai/ironclaw/pull/712)) |
| **Testing** | Added `FaultInjector` framework for `StubLlm` to enable deterministic failure testing ([#1233](https://github.com/nearai/ironclaw/pull/1233)) |
| **Gateway** | Unified settings page with subtabs for improved configuration UX |

**Migration Notes:** No breaking changes documented. The self-repair wiring suggests downstream users should verify `stuck_threshold` behavior if overriding defaults.

---

## 3. Project Progress

### Merged/Closed Today (22 PRs)

| PR | Author | Impact |
|:---|:---|:---|
| [#1423](https://github.com/nearai/ironclaw/pull/1423) | ilblackdragon | **LRU embedding cache** — merged continuation of #235; reduces redundant HTTP embedding calls via SHA-256 keyed cache |
| [#235](https://github.com/nearai/ironclaw/pull/235) | ztsalexey | Original embedding cache implementation (superseded by #1423) |
| [#333](https://github.com/nearai/ironclaw/pull/333) | KonstantinMirin | **Slack Socket Mode** — NAT-friendly WebSocket bridge; closes [#1155](https://github.com/nearai/ironclaw/issues/1155) |
| [#236](https://github.com/nearai/ironclaw/pull/236) | ztsalexey | **Structured fallback deliverables** — replaces opaque error strings with `FallbackDeliverable` for failed/stuck jobs |
| [#1375](https://github.com/nearai/ironclaw/pull/1375) | henrypark133 | **Generic hosted OAuth/MCP auth** — versioned callback state, unified WASM/MCP flows |

**Key Advancements:**
- **Embedding infrastructure** now production-ready with caching layer
- **Slack deployment friction** eliminated via Socket Mode (no public URL required)
- **Failure observability** improved via structured deliverables
- **OAuth architecture** generalized for future provider expansion

---

## 4. Community Hot Topics

### By Engagement (Comments + Context)

| Rank | Item | Activity | Underlying Need |
|:---|:---|:---|:---|
| 1 | [#826](https://github.com/nearai/ironclaw/issues/826) Unbounded message Vec growth | 3 comments, HIGH:82 | **Memory safety in long-running agents** — users need bounded context windows |
| 2 | [#815](https://github.com/nearai/ironclaw/issues/815) Token budget bypass | 3 comments, HIGH:85 | **Cost control enforcement** — enterprise users require hard spend limits |
| 3 | [#1155](https://github.com/nearai/ironclaw/issues/1155) Slack Socket Mode | 2 comments, OPEN | **NAT-friendly deployment** — solved by #333 merge |
| 4 | [#1328](https://github.com/nearai/ironclaw/issues/1328) Migration checksum mismatch | 2 comments, 👍2, OPEN | **Zero-downtime upgrades** — breaking change in V6__routines migration |

**Pattern:** Staging CI bot-generated issues dominate high-engagement items, indicating the project prioritizes **automated quality gating** over organic user reports. Real user pain (#1155, #1328) clusters around **deployment and upgrade reliability**.

---

## 5. Bugs & Stability

### Critical/High Severity (Open)

| Issue | Severity | Status | Fix PR |
|:---|:---|:---|:---|
| [#1429](https://github.com/nearai/ironclaw/issues/1429) Embedding cache clones on every hit | **CRITICAL:100** | OPEN | [#1438](https://github.com/nearai/ironclaw/pull/1438) (Arc optimization) |
| [#1328](https://github.com/nearai/ironclaw/issues/1328) V6__routines migration checksum mismatch | HIGH (user-reported) | OPEN | None — needs migration repair script |

### Critical/High (Closed Today — Staging CI)

| Issue | Severity | Root Cause |
|:---|:---|:---|
| [#1430](https://github.com/nearai/ironclaw/issues/1430) O(n) LRU eviction | HIGH:100 | Algorithmic inefficiency at capacity |
| [#1431](https://github.com/nearai/ironclaw/issues/1431) Thundering herd on cache miss | HIGH:100 | Missing request coalescing |
| [#1414](https://github.com/nearai/ironclaw/issues/1414) Version mismatch in Telegram artifact URL | **CRITICAL:92** | Build/packaging pipeline bug |

**Stability Assessment:** The embedding cache (new in v0.20.0) shows **teething issues** — three HIGH/CRITICAL bugs identified same day as merge. The migration checksum failure (#1328) is **production-blocking** for existing PostgreSQL users.

---

## 6. Feature Requests & Roadmap Signals

| PR/Issue | Signal | Likelihood in v0.21 |
|:---|:---|:---|
| [#1187](https://github.com/nearai/ironclaw/pull/1187) Adaptive learning (skill synthesis, user profiles) | **Major capability expansion** — 30+ review iterations suggest persistence | Medium (needs maintainer bandwidth) |
| [#1378](https://github.com/nearai/ironclaw/pull/1378) Per-channel MCP/tool filtering | Multi-tenant deployment need | High — addresses enterprise segmentation |
| [#1435](https://github.com/nearai/ironclaw/pull/1435) pdf_oxide replacement | Performance + security (zero non-Rust deps) | High — clean replacement, closes #1311 |
| [#744](https://github.com/nearai/ironclaw/pull/744) OpenAI Codex provider | ChatGPT subscriber onboarding | Medium — large surface area, HIGH risk label |
| [#1243](https://github.com/nearai/ironclaw/pull/1243) Per-job MCP filtering + iteration caps | Resource isolation for multi-tenant | Medium — gated behind feature flag |

**Emerging Theme:** **Tenant isolation** (per-channel, per-job scoping) and **adaptive behavior** (learning, caching) dominate the roadmap.

---

## 7. User Feedback Summary

### Explicit Pain Points

| Source | Issue | Severity |
|:---|:---|:---|
| milenkobeslic | [#1328](https://github.com/nearai/ironclaw/issues/1328) Upgrade failures block production | 🔴 Blocking |
| justinfiore | [#1155](https://github.com/nearai/ironclaw/issues/1155) Slack webhook requirements prevent deployment | 🟡 Resolved by #333 |

### Inferred from PR Descriptions

- **Managed tunnels broken** ([#1093](https://github.com/nearai/ironclaw/pull/1093)): "Telegram bot stops responding" — webhook reliability gaps
- **Anthropic API empty responses** ([#635](https://github.com/nearai/ironclaw/pull/635)): Tool result handling bugs in `select_tools()` path
- **PDF extraction performance**: 0.8ms target in #1435 suggests current solution is slow

### Satisfaction Indicators
- Active community contributions (new contributor PRs: #1437, #635, #744)
- Rapid staging CI iteration (50 issues processed, 36 closed same day)

---

## 8. Backlog Watch

### Needs Maintainer Attention

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#1328](https://github.com/nearai/ironclaw/issues/1328) Migration checksum failure | 2 days | **Production upgrade blocker** | Migration repair script + documentation |
| [#1187](https://github.com/nearai/ironclaw/pull/1187) Adaptive learning | 5 days | Large PR fatigue (30+ iterations) | Final review or scope reduction |
| [#744](https://github.com/nearai/ironclaw/pull/744) OpenAI Codex | 11 days | HIGH risk label, XL size | Risk assessment: OAuth security review |
| [#635](https://github.com/nearai/ironclaw/pull/635) Orphaned tool_results | 13 days | Core Worker reliability | Merge conflict resolution |
| [#527](https://github.com/nearai/ironclaw/pull/527) CLI logs v2 | 15 days | "Final fixes applied" — stalled | CI verification or manual merge |

**Recommendation:** Prioritize #1328 for hotfix release; #1187 and #744 need explicit maintainer assignment to prevent contributor burnout.

---

*Digest generated from 50 issues and 50 PRs updated 2026-03-19. Data source: github.com/nearai/ironclaw*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

HEARTBEAT_OK

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

# TinyClaw Project Digest — 2026-03-20

## 1. Today's Overview

TinyClaw shows **minimal but focused development activity** with 2 open pull requests updated in the last 24 hours and zero new issues or releases. The project appears to be in a **consolidation phase** rather than rapid feature expansion—both active PRs target architectural improvements (CLI refactoring) and UX redesign (office workspace) rather than net-new capabilities. With no open issues and no merged PRs today, maintainer bandwidth may be constrained or awaiting community review cycles. The 6-day gap between PR creation and latest update on #212 suggests intermittent review velocity.

---

## 2. Releases

**No new releases.** The project has no published versions in the tracked timeframe.

---

## 3. Project Progress

**No merged or closed PRs today.** Both active pull requests remain open:

| PR | Status | Progress Assessment |
|---|---|---|
| [#242](https://github.com/TinyAGI/tinyagi/pull/242) | Open (created 2026-03-19) | Early-stage architectural refactoring; no comments yet |
| [#212](https://github.com/TinyAGI/tinyagi/pull/212) | Open (created 2026-03-13, updated 2026-03-19) | Workspace redesign; received update 6 days post-creation indicating ongoing iteration |

**Implication:** Core development is bottlenecked at the review/merge stage. The adapter pattern extraction in #242 is particularly critical for long-term maintainability.

---

## 4. Community Hot Topics

**No commented or highly-engaged items.** Both PRs show:
- **0 comments**
- **0 reactions (👍)**

| PR | Underlying Need Analysis |
|---|---|
| [#242 - CLI Adapter Pattern](https://github.com/TinyAGI/tinyagi/pull/242) | **Technical debt reduction** — Contributors recognize that hardcoded provider logic in `invoke.ts` blocks multi-agent extensibility. Signals demand for pluggable agent backends (Claude, Codex, OpenCode). |
| [#212 - Office Workspace Redesign](https://github.com/TinyAGI/tinyagi/pull/212) | **UX modernization** — The `/office` experience likely serves as the primary user interaction surface; redesign suggests current implementation has usability friction or visual debt. |

**Critical gap:** Zero community engagement indicates either (a) narrow contributor base, (b) insufficient project visibility, or (c) PR descriptions lacking clear review hooks.

---

## 5. Bugs & Stability

**No bug reports today.** Zero open issues and zero issues updated in 24h.

| Metric | Status |
|---|---|
| Active crash reports | None |
| Regressions | None |
| Security advisories | None |

**Assessment:** Surface-level stability, but absence of bug reports may reflect low adoption rather than code quality. No fix PRs in flight.

---

## 6. Feature Requests & Roadmap Signals

**No explicit feature requests** (zero issues). Inferred roadmap from PR content:

| Signal | Likelihood in Next Release | Rationale |
|---|---|---|
| **Multi-provider agent support** | High | #242's adapter registry enables Claude/Codex/OpenCode backends; foundational for v-next |
| **Redesigned workspace UI** | Medium | #212 scope unclear; "redesign" could span multiple iterations |
| **Plugin/extension system** | Medium | Adapter pattern in #242 suggests architectural intent toward extensibility |

**Prediction:** If #242 merges, expect subsequent PRs adding new agent providers via the registry interface.

---

## 7. User Feedback Summary

**No direct user feedback captured** (zero issues, zero PR comments).

**Inferred pain points from PR content:**

| Source | Pain Point | Severity |
|---|---|---|
| #242 code structure | `invoke.ts` bloat (described as "~..." [truncated]) blocking maintainability | Medium-High |
| #212 scope | Current `/office` experience requires complete redesign | Medium |

**Satisfaction proxy:** Contributors are proactively addressing architecture and UX debt—suggests internal pressure for production readiness.

---

## 8. Backlog Watch

**No stale issues or PRs requiring attention** (only 2 PRs total, both <7 days old).

| Item | Age | Risk | Recommended Action |
|---|---|---|---|
| [#212](https://github.com/TinyAGI/tinyagi/pull/212) | 7 days | Design PRs without reviewer feedback risk scope creep | Request design mockups or demo GIF to unblock review |
| [#242](https://github.com/TinyAGI/tinyagi/pull/242) | 1 day | Low — architectural PRs need senior maintainer review | Assign core maintainer for interface approval |

**Project health indicator:** 🟡 **Amber** — Clean issue/PR hygiene but concerning lack of community engagement and review velocity.

---

*Digest generated from TinyAGI/tinyclaw GitHub data — 2026-03-20*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-03-20

## 1. Today's Overview

Moltis shows **moderate daily activity** with 4 new issues and 3 new pull requests opened in the past 24 hours, though no releases or merged PRs occurred. The project appears to be in an active development phase with community members contributing security hooks, platform compatibility fixes, and new provider integrations. Notably, all activity is from March 19, indicating concentrated community engagement. The absence of merged code suggests potential maintainer review backlog or quality gate processes. Overall project health appears stable but would benefit from maintainer attention to the growing open PR queue.

---

## 2. Releases

**No new releases** in the past 24 hours.

---

## 3. Project Progress

**No PRs merged or closed today.** Three PRs remain open awaiting review:

| PR | Description | Status |
|:---|:---|:---|
| [#455](https://github.com/moltis-org/moltis/pull/455) | `block-no-verify` PreToolUse hook for git security | Open, 0 comments |
| [#436](https://github.com/moltis-org/moltis/pull/436) | Windows file lock fix (LockFileEx os error 5) | Open, last updated 5 days ago |
| [#451](https://github.com/moltis-org/moltis/pull/451) | Novita AI provider integration | Open, 0 comments |

**Progress stalled:** The Windows compatibility fix (#436) has been pending for 5 days despite addressing a critical platform-specific bug.

---

## 4. Community Hot Topics

### Most Engaged: Tool Search Enhancement
- **[#313 — Tool search feature](https://github.com/moltis-org/moltis/issues/313)** | 6 comments, 2 👍 | Open since Mar 3
- **Author:** Wanderspool
- **Underlying need:** Users require discoverability mechanisms as the agent's tool ecosystem grows. The 17-day active lifespan with sustained engagement suggests this is a **core UX gap** blocking productivity at scale.

### Security-Conscious Development
- **[#454 — block-no-verify hook](https://github.com/moltis-org/moltis/issues/454)** + **[#455 PR](https://github.com/moltis-org/moltis/pull/455)** | Same-day issue-to-PR turnaround
- **Author:** tupe12334
- **Underlying need:** Enterprise/team users need **audit trails and policy enforcement** when AI agents interact with git workflows. The rapid PR response indicates mature open-source contribution patterns.

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Available? |
|:---|:---|:---|:---|
| **Medium-High** | [#452](https://github.com/moltis-org/moltis/issues/452) | Skills with invalid names silently omitted from manifest — data inconsistency risk | ❌ No PR |
| **Medium** | [#436](https://github.com/moltis-org/moltis/pull/436) | Windows file lock crash (LockFileEx os error 5) — session persistence failure | ✅ PR open, unmerged |
| **Low-Medium** | [#453](https://github.com/moltis-org/moltis/issues/453) | Managerial agent overload when spawning business agents — architectural concern | ❌ No PR |

**Critical pattern:** Silent failures (#452) pose higher long-term risk than explicit crashes. The skills-manifest.json inconsistency could cause deployment-time surprises.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood in Next Version | Rationale |
|:---|:---|:---|:---|
| **Tool search/discovery** | [#313](https://github.com/moltis-org/moltis/issues/313) | **High** | Longest-running active issue, clear UX pain point, 2+ upvotes |
| **Git hook security framework** | [#454](https://github.com/moltis-org/moltis/issues/454) / [#455](https://github.com/moltis-org/moltis/pull/455) | **High** | PR already submitted, security-focused, low implementation risk |
| **Novita AI provider** | [#451](https://github.com/moltis-org/moltis/pull/451) | **Medium-High** | Follows established provider pattern, OpenAI-compatible (low maintenance) |
| **Multi-agent orchestration scaling** | [#453](https://github.com/moltis-org/moltis/issues/453) | **Medium** | Architectural discussion needed; may require design RFC |

---

## 7. User Feedback Summary

### Pain Points
| Issue | User Voice | Impact |
|:---|:---|:---|
| **Tool discoverability** | "I have searched existing requests" — user explicitly noted search burden | Productivity friction for power users |
| **Windows reliability** | LockFileEx os error 5 breaks session persistence | Platform equity gap |
| **Silent data loss** | Skills "silently omitted" from manifest — no error surfaced | Trust/audit concerns |
| **Agent governance** | Need to prevent hook bypass — "defeating quality gates" | Enterprise adoption blocker |

### Use Case Signals
- **Enterprise/team contexts:** Security hooks (#454) suggest multi-user deployments
- **Windows development:** Platform-specific fix (#436) indicates non-trivial Windows user base
- **Multi-model flexibility:** Novita AI PR (#451) shows demand for alternative providers beyond OpenAI/Anthropic

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [#436 Windows file lock fix](https://github.com/moltis-org/moltis/pull/436) | 5 days | **Platform support degradation** | Maintainer review; Windows CI verification |
| [#313 Tool search](https://github.com/moltis-org/moltis/issues/313) | 17 days | **Community frustration, competitor gap** | Roadmap commitment or design RFC |
| [#455](https://github.com/moltis-org/moltis/pull/455), [#451](https://github.com/moltis-org/moltis/pull/451) | 1 day | **Contributor momentum loss** | Initial maintainer feedback to sustain engagement |

**Recommendation:** The 5-day unmerged Windows fix (#436) is the highest-priority review item, as it blocks a platform segment and risks contributor disengagement.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-03-20

## 1. Today's Overview

CoPaw demonstrates **exceptional development velocity** with 100 total updates in 24 hours (50 issues, 50 PRs) and a major v0.1.0 stable release. The project has successfully transitioned from beta to its first stable release, introducing foundational multi-agent architecture. However, **stability concerns are emerging**: 33 open issues include multiple critical regressions in v0.1.0b3 (context window errors, task hangs, CPU deadlocks). The community is highly engaged with diverse use cases spanning QQ, Feishu, Discord, and local model deployments, though user frustration with breaking changes and documentation gaps is visible.

---

## 2. Releases

### [v0.1.0](https://github.com/agentscope-ai/CoPaw/releases/tag/v0.1.0) — Stable Release
**Breaking Architecture Change**: Multi-Agent/Multi-Workspace system
- Each agent runs in isolated workspace with independent config, memory, skills, and tools
- Console agent selector for switching between agents
- **Migration impact**: Existing single-agent setups require workspace reconfiguration

### [v0.1.0-beta.4](https://github.com/agentscope-ai/CoPaw/releases/tag/v0.1.0-beta.4)
- Multimodal message support (image/file uploads) in console ([#1772](https://github.com/agentscope-ai/CoPaw/pull/1772))
- Fixed `create_local_chat_model` import error ([#1784](https://github.com/agentscope-ai/CoPaw/pull/1784))

---

## 3. Project Progress

### Merged/Closed PRs Today

| PR | Description | Impact |
|:---|:---|:---|
| [#1880](https://github.com/agentscope-ai/CoPaw/pull/1880) | v0.1.0 release with updated notes | Stable milestone |
| [#1882](https://github.com/agentscope-ai/CoPaw/pull/1882) | Version bump to 0.1.1b1 | Next beta cycle started |
| [#1879](https://github.com/agentscope-ai/CoPaw/pull/1879) | Remove media path validation warnings | Cleaner UX |
| [#1867](https://github.com/agentscope-ai/CoPaw/pull/1867) | Tool result compaction config overhaul | Memory management flexibility |
| [#1878](https://github.com/agentscope-ai/CoPaw/pull/1878) | Add logo to website | Branding |
| [#1872](https://github.com/agentscope-ai/CoPaw/pull/1872) | Update console screenshot | Documentation |

### Active Development (Open PRs)
- **Agent avatars** ([#1791](https://github.com/agentscope-ai/CoPaw/pull/1791)) — Multi-agent UX enhancement
- **Local embedding models** ([#1789](https://github.com/agentscope-ai/CoPaw/pull/1789)) — Privacy/offline capability
- **Channel routing** ([#1889](https://github.com/agentscope-ai/CoPaw/pull/1889)) — Multi-agent dispatch by channel metadata
- **Agents Square marketplace** ([#1883](https://github.com/agentscope-ai/CoPaw/pull/1883)) — Ecosystem expansion

---

## 4. Community Hot Topics

### Most Active Issues

| Issue | Comments | Topic | Underlying Need |
|:---|:---:|:---|:---|
| [#1641](https://github.com/agentscope-ai/CoPaw/issues/1641) | 7 | QQ channel DM support | Chinese IM platform integration depth |
| [#275](https://github.com/agentscope-ai/CoPaw/issues/275) | 7 | QQ IP whitelist docs | Enterprise deployment security clarity |
| [#823](https://github.com/agentscope-ai/CoPaw/issues/823) | 6 | llama.cpp Qwen3.5 loading | Local model ecosystem compatibility |
| [#372](https://github.com/agentscope-ai/CoPaw/issues/372) | 6 | Config auto-rewrite blocking LLM | Configuration system predictability |
| [#1873](https://github.com/agentscope-ai/CoPaw/issues/1873) | 5 | Context window limit (2013) error | v0.1.0b3 regression — token management |
| [#1827](https://github.com/agentscope-ai/CoPaw/issues/1827) | 5 | Task execution hangs | Core stability under load |

**Pattern**: Strong demand for **Chinese platform integration** (QQ, Feishu) and **local model deployment** (Ollama, llama.cpp), with friction around configuration management and beta stability.

---

## 5. Bugs & Stability

### Critical (Data Loss / System Failure)

| Issue | Severity | Description | Fix Status |
|:---|:---:|:---|:---|
| [#1827](https://github.com/agentscope-ai/CoPaw/issues/1827) | 🔴 Critical | Task execution hangs/freezes in v0.1.0b3 | No fix PR |
| [#1774](https://github.com/agentscope-ai/CoPaw/issues/1774) | 🔴 Critical | CPU 100% deadlock: infinite loop in `ToolResultCompactor` ↔ `ContextChecker` | No fix PR |
| [#1834](https://github.com/agentscope-ai/CoPaw/issues/1834) | 🔴 Critical | `TokenUsageManager` uses `threading.Lock` in async context → event loop deadlock | **Fix PR [#1893](https://github.com/agentscope-ai/CoPaw/pull/1893)** open |
| [#1829](https://github.com/agentscope-ai/CoPaw/issues/1829) | 🟡 High | Cron jobs report "success" when cancelled | **Fix PR [#1894](https://github.com/agentscope-ai/CoPaw/pull/1894)** open |

### High (Feature Broken)

| Issue | Description | Fix Status |
|:---|:---|:---|
| [#1873](https://github.com/agentscope-ai/CoPaw/issues/1873) | Context window exceeds limit (2013) — v0.1.0b3 regression | No fix PR |
| [#1815](https://github.com/agentscope-ai/CoPaw/issues/1815) | BadRequestError 400 with Aliyun Coding Plan / Kimi 2.5 | No fix PR |
| [#1770](https://github.com/agentscope-ai/CoPaw/issues/1770) | Feishu channel broken after 0.0.7→0.1.0b2 upgrade | No fix PR |
| [#1786](https://github.com/agentscope-ai/CoPaw/issues/1786) | Feishu/Lark auth error with env vars in 0.1.0b2/b3 | No fix PR |
| [#1844](https://github.com/agentscope-ai/CoPaw/issues/1844) | Local model chat returns 400 error | No fix PR |

### Medium

| Issue | Description |
|:---|:---|
| [#902](https://github.com/agentscope-ai/CoPaw/issues/902) | Discord voice message: unsupported OGG format |
| [#1881](https://github.com/agentscope-ai/CoPaw/issues/1881) | Silent failure: AI responds in logs but not to user |

**Stability Assessment**: v0.1.0b3 introduced significant regressions. The two deadlock issues (#1774, #1834) suggest async/await implementation gaps. PRs #1893 and #1894 address critical fixes but need urgent review.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood in Next Version | Rationale |
|:---|:---|:---:|:---|
| **Channel routing for multi-agent** | [#1889](https://github.com/agentscope-ai/CoPaw/pull/1889) | ⭐⭐⭐⭐⭐ High | PR already open, aligns with v0.1.0 architecture |
| **Agent avatars** | [#1791](https://github.com/agentscope-ai/CoPaw/pull/1791) | ⭐⭐⭐⭐⭐ High | PR open, multi-agent UX essential |
| **Local embedding models** | [#1789](https://github.com/agentscope-ai/CoPaw/pull/1789) | ⭐⭐⭐⭐☆ High | Privacy demand, PR active |
| **Agents Square marketplace** | [#1883](https://github.com/agentscope-ai/CoPaw/pull/1883) | ⭐⭐⭐⭐☆ High | Ecosystem play, backend+UI ready |
| **HTTP(S) file sending** | [#1831](https://github.com/agentscope-ai/CoPaw/issues/1831) | ⭐⭐⭐☆☆ Medium | Cloud deployment need |
| **MCP HTTP transport** | [#676](https://github.com/agentscope-ai/CoPaw/issues/676) | ⭐⭐⭐☆☆ Medium | Enterprise integration pattern |
| **XiaoYi channel file/image** | [#1885](https://github.com/agentscope-ai/CoPaw/pull/1885) | ⭐⭐⭐⭐☆ High | PR open, IoT/AI hardware integration |

**Emerging Theme**: "Agent marketplace" + "multi-agent orchestration" are becoming core differentiators against single-agent alternatives.

---

## 7. User Feedback Summary

### Pain Points 😤

| Theme | Evidence | Severity |
|:---|:---|:---:|
| **Breaking changes without warning** | [#1846](https://github.com/agentscope-ai/CoPaw/issues/1846) "一周都没更新了，这什么时代" (angry about 1-week gap), [#1877](https://github.com/agentscope-ai/CoPaw/issues/1877) missing model config in v0.1.0b3 | High |
| **Configuration fragility** | [#372](https://github.com/agentscope-ai/CoPaw/issues/372) auto-rewrite blocking LLM, [#1833](https://github.com/agentscope-ai/CoPaw/issues/1833) custom model validation logic broken | High |
| **Beta quality issues** | Multiple v0.1.0b3 regressions (hangs, deadlocks, context errors) | Critical |
| **Documentation gaps** | [#275](https://github.com/agentscope-ai/CoPaw/issues/275) IP whitelist confusion, [#1859](https://github.com/agentscope-ai/CoPaw/issues/1859) debugging guidance needed | Medium |
| **Platform-specific bugs** | Feishu auth failures, QQ DM handling, Discord audio | Medium |

### Use Cases ✅

- **Enterprise IM integration**: Feishu, DingTalk, QQ for internal AI assistants
- **Local/edge deployment**: Ollama, llama.cpp for privacy-sensitive scenarios
- **Multi-agent workflows**: Feature explicitly requested ([#153](https://github.com/agentscope-ai/CoPaw/issues/153)), now core architecture
- **Developer tooling**: VS Code debugging, custom skill development

### Satisfaction Signals
- High engagement (100 updates/day) indicates strong interest
- First-time contributors active (4 PRs today)
- Feature completeness advancing rapidly (multimodal, multi-agent, marketplace)

---

## 8. Backlog Watch

### Needs Maintainer Attention

| Item | Age | Issue | Action Needed |
|:---|:---:|:---|:---|
| **Cron job isolation** | 5 days | [#1525](https://github.com/agentscope-ai/CoPaw/pull/1525) | Review — prevents startup crashes from invalid schedules |
| **Shell/Windows + Telegram/Discord fixes** | 11 days | [#1065](https://github.com/agentscope-ai/CoPaw/pull/1065) | Review — cross-platform stability |
| **BGE-M3 embedding support** | 2 days | [#1780](https://github.com/agentscope-ai/CoPaw/pull/1780) | Review — popular local embedding model |
| **Custom channel dict configs** | 2 days | [#1800](https://github.com/agentscope-ai/CoPaw/pull/1800) | Review — extensibility fix |
| **Discord voice OGG** | 13 days | [#902](https://github.com/agentscope-ai/CoPaw/issues/902) | Triage or document limitation |

### Long-Standing Issues
- [#1258](https://github.com/agentscope-ai/CoPaw/issues/1258): iFlow platform integration (9 days, no response)
- [#153](https://github.com/agentscope-ai/CoPaw/issues/153): Multi-agent collaboration (now implemented — should close)

---

**Project Health**: 🟡 **Cautiously Optimistic**

- ✅ Strong release momentum and architectural progress
- ✅ Active community with diverse use cases
- ⚠️ Critical stability issues in latest beta need immediate attention
- ⚠️ Breaking change communication needs improvement

**Recommendation**: Prioritize merging deadlock fixes (#1893, #1894) and issuing v0.1.1 with regression patches before expanding features.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw Project Digest — 2026-03-20

## 1. Today's Overview

ZeptoClaw shows moderate development activity with **3 open pull requests** and **1 active bug report** updated in the last 24 hours. No releases were published today. The project is currently focused on expanding provider support (Novita AI) and stabilizing the new ACP (Agent Client Protocol) implementation, which appears to be a significant architectural addition. Developer tooling improvements are also in progress to standardize contribution quality. Overall project health appears stable but with active technical debt accumulation around the ACP channel implementation that requires attention before broader adoption.

---

## 2. Releases

**No new releases** published today. The project has no recent release history in the provided data.

---

## 3. Project Progress

**No PRs were merged or closed today.** All three active pull requests remain open:

| PR | Status | Progress Assessment |
|:---|:---|:---|
| [#390 Novita AI provider](https://github.com/qhkm/zeptoclaw/pull/390) | Open, 1 day old | New provider integration; straightforward pattern following existing implementations |
| [#287 Dev tools for consistent pre-PR state](https://github.com/qhkm/zeptoclaw/pull/287) | Open, 10 days old | Infrastructure PR; recently updated suggesting active refinement |
| [#356 ACP stdio + HTTP implementation](https://github.com/qhkm/zeptoclaw/pull/287) | Open, 6 days old | Core feature; **blocked by discovered bugs** (see Issue #388) |

**Key observation:** The ACP implementation (#356) — a major feature adding stdio and HTTP channels for agent communication — has revealed protocol bugs that are now tracked separately, potentially delaying merge.

---

## 4. Community Hot Topics

### Most Active Discussion: ACP Protocol Bugs
**[Issue #388: bug(channels): fix ACP HTTP initialize and notification semantics](https://github.com/qhkm/zeptoclaw/issues/388)**  
- **2 comments** | Open since 2026-03-18 | Author: `qhkm` (project maintainer)
- **Underlying need:** The ACP HTTP channel has fundamental protocol flaws affecting security and correctness:
  - **Authentication bypass:** Channel-global initialize flag allows clients to skip handshake
  - **Notification corruption:** HTTP notifications incorrectly receive response bodies instead of proper framing

This issue represents **critical architectural feedback** on PR #356. The maintainer is self-reporting bugs, indicating proactive quality control but also suggesting the ACP feature may have been merged prematurely to `main` or needs significant revision before stabilization.

### Provider Expansion Pattern
**[PR #390: Novita AI provider](https://github.com/qhkm/zeptoclaw/pull/390)**  
- Community contributor `Alex-wuhu` following established provider integration pattern
- Signals demand for diverse LLM backend support beyond existing (xAI, Qianfan, DeepSeek)

---

## 5. Bugs & Stability

| Severity | Item | Status | Fix Available |
|:---|:---|:---|:---|
| **HIGH** | [#388](https://github.com/qhkm/zeptoclaw/issues/388) ACP HTTP initialize flag allows authentication bypass | Open, active | **No dedicated fix PR**; blocks #356 merge |
| **MEDIUM** | [#388](https://github.com/qhkm/zeptoclaw/issues/388) HTTP notification semantics corruption | Open, active | **No dedicated fix PR** |

**Assessment:** The ACP channel bugs are **release-blocking** for any version intending to support agent protocols. The lack of a fix PR after 2 days of issue activity suggests either:
- Fix will be appended to #356 (complex history rewrite)
- Fix requires architectural reconsideration of ACP state management

---

## 6. Feature Requests & Roadmap Signals

| Signal | Source | Likelihood in Next Release |
|:---|:---|:---|
| Novita AI provider support | [PR #390](https://github.com/qhkm/zeptoclaw/pull/390) | **High** — follows established pattern, minimal risk |
| Standardized development environment | [PR #287](https://github.com/qhkm/zeptoclaw/pull/287) | **Medium** — 10 days open suggests review friction |
| ACP protocol channels (stdio + HTTP) | [PR #356](https://github.com/qhkm/zeptoclaw/pull/356) | **Blocked** — requires #388 resolution |

**Emerging pattern:** ZeptoClaw is positioning as a **multi-provider AI agent runtime** with standardized communication protocols (ACP). The stdio channel specifically targets subprocess-based agent spawning (e.g., `acpx` integration), suggesting competition with MCP (Model Context Protocol) and similar agent standards.

---

## 7. User Feedback Summary

**Limited direct user feedback in today's data.** Inferences from activity:

| Aspect | Observation |
|:---|:---|
| **Pain point** | ACP protocol instability — handshake and notification bugs indicate the agent communication layer needs hardened testing |
| **Use case demand** | Multiple LLM provider integrations (Novita AI addition suggests user/enterprise need for provider diversity) |
| **Contributor friction** | [PR #287](https://github.com/qhkm/zeptoclaw/pull/287) existence implies inconsistent local development environments across contributors |
| **Satisfaction** | Neutral — no user complaints or praise visible; activity is maintainer and contributor driven |

---

## 8. Backlog Watch

| Item | Age | Risk | Action Needed |
|:---|:---|:---|:---|
| [PR #287](https://github.com/qhkm/zeptoclaw/pull/287) Dev tools | **10 days** | Medium — contributor experience degradation | Maintainer review for merge/feedback |
| [PR #356](https://github.com/qhkm/zeptoclaw/pull/356) ACP implementation | **6 days** | **High** — blocks feature, has known bugs | Decision: fix-forward in #356 or close and reopen |
| [Issue #388](https://github.com/qhkm/zeptoclaw/issues/388) ACP bugs | **2 days** | High — security/reliability impact | Assign owner, create fix PR |

**Recommendation:** The maintainer (`qhkm`) should prioritize #388 resolution to unblock the ACP feature line, or consider reverting #356 if it has already partially landed in main. The 10-day-old dev tools PR (#287) risks contributor attrition if unreviewed.

---

*Digest generated from GitHub activity 2026-03-19 to 2026-03-20*

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw Project Digest — 2026-03-20

## 1. Today's Overview

EasyClaw (RivonClaw) shows **high development velocity** with 3 PRs merged and 2 releases published in the last 24 hours. The project is in an active **UI/UX consolidation phase**, with significant frontend refactoring completed. Community engagement remains moderate with 2 active issues, including one seeking clarification on multi-browser architecture. The rapid release cycle (v1.7.2 → v1.7.3 within 24h) suggests either hotfix patterns or agile iteration, though v1.7.3 appears to be a documentation/packaging release addressing macOS Gatekeeper issues. Overall project health: **strong development momentum, growing user interest from Chinese-speaking developers**.

---

## 2. Releases

### [v1.7.3](https://github.com/gaoyangz77/rivonclaw/releases/tag/v1.7.3) — Documentation & Distribution Fix
- **Type**: Packaging/documentation release
- **Key Change**: Added macOS installation troubleshooting guide for Gatekeeper "damaged app" false positives
- **Breaking Changes**: None
- **Migration Notes**: N/A — no code changes

### [v1.7.2](https://github.com/gaoyangz77/rivonclaw/releases/tag/v1.7.2) — Major UI & Architecture Release
- **Key Changes**:
  - Complete UI overhaul: component refactor, theme separation, redesigned skills page
  - New captcha-based authentication system with centralized default settings
  - Channel group-allow-from editor with SQLite-backed account configuration
  - Plugin SDK refactor with internationalization (i18n) branding support
- **Breaking Changes**: Likely significant — UI component restructuring may affect custom plugins/themes
- **Migration Notes**: Plugin developers should review SDK changes; theme customizations need migration to new separation architecture

---

## 3. Project Progress

| PR | Status | Contributor | Summary |
|:---|:---|:---|:---|
| [#24](https://github.com/gaoyangz77/rivonclaw/pull/24) | ✅ Merged | @chinayin | **Account UI Redesign**: Replaced `/account` page navigation with avatar popover dropdown; unified logged-in/logged-out states with theme-matched styling |
| [#23](https://github.com/gaoyangz77/rivonclaw/pull/23) | ✅ Merged | @chinayin | **Auth System Overhaul**: Redesigned auth modal with pill tabs, password strength indicator, captcha integration, auto-register flow, privacy/terms compliance |
| [#20](https://github.com/gaoyangz77/rivonclaw/pull/20) | ✅ Merged | @chinayin | **Foundation Refactor**: Extracted `BottomActions` component, consolidated SVG icons to `icons.tsx`, implemented theme separation architecture |

**Pattern Identified**: @chinayin is driving a **coordinated UI modernization sprint** — all 3 PRs form a logical progression from component foundation (#20) → authentication flow (#23) → account navigation (#24). This suggests organized milestone planning rather than ad-hoc contributions.

---

## 4. Community Hot Topics

### Most Active: [#12 — 社群交流 (Community Chat)](https://github.com/gaoyangz77/rivonclaw/issues/12)
| Metric | Value |
|:---|:---|
| Status | Closed |
| Comments | 4 |
| Engagement | 👍 0 |
| Author | @Geekbruce |

**Summary**: Chinese developer requesting technical community/Discord for architecture discussion, praising EasyClaw's design alignment with their expectations.

**Underlying Need**: **Developer evangelism & community building**. The project lacks visible community infrastructure despite attracting architecturally-minded contributors. Closure without resolution suggests maintainer preference for GitHub-native communication or unannounced plans.

---

### Active Discussion: [#22 — Multi-browser Architecture Clarification](https://github.com/gaoyangz77/rivonclaw/issues/22)
| Metric | Value |
|:---|:---|
| Status | **Open** |
| Comments | 2 |
| Engagement | 👍 0 |
| Author | @slowayear |

**Summary**: User confusion about "multi-browser" feature scope — questioning whether it means multi-user isolation vs. cross-platform sync, and authentication implications.

**Underlying Need**: **Feature documentation gap**. The terminology "multi-browser" is ambiguous; users need clarity on:
- Session isolation architecture (multi-tenant vs. multi-profile)
- Authentication state machine (anonymous vs. identified usage modes)
- Data synchronization boundaries

---

## 5. Bugs & Stability

| Severity | Issue | Status | Notes |
|:---|:---|:---|:---|
| **Low** | macOS Gatekeeper false positive | **Mitigated** | Documented in v1.7.3 release; not a code bug but distribution friction |
| **None critical** | — | — | No crashes, regressions, or stability issues reported in 24h window |

**Assessment**: **Stable**. The only "bug-like" report is an expected macOS security behavior, now documented. No fix PRs needed.

---

## 6. Feature Requests & Roadmap Signals

| Signal Source | Requested Capability | Likelihood in Next Version |
|:---|:---|:---|
| #12 (Geekbruce) | Official community/technical discussion channel | **Medium** — maintainer closed without rejection, may indicate private planning |
| #22 (slowayear) | Clarified multi-browser documentation + auth flow docs | **High** — active confusion, easy win |
| v1.7.2 release notes | "system" feature (truncated) | **High** — incomplete feature teased |

**Predicted v1.7.4/1.8.0 Direction**:
- Documentation expansion for multi-browser architecture
- Potential community platform announcement
- Completion of truncated "system" feature from v1.7.2

---

## 7. User Feedback Summary

| Aspect | Evidence | Sentiment |
|:---|:---|:---|
| **Architecture Appreciation** | #12: "项目架构非常符合我预期的架构" | ✅ Strong positive |
| **UX Confusion** | #22: Authentication/multi-browser ambiguity | ⚠️ Moderate friction |
| **Onboarding Friction** | macOS Gatekeeper workaround needed | ⚠️ Platform-specific pain |
| **Engagement Quality** | Detailed PR descriptions, screenshot-based issues | ✅ Mature contributor base |

**Key Pain Point**: **Conceptual clarity**. Users understand *what* EasyClaw does but struggle with *how* its abstractions work (multi-browser, auth states). The project would benefit from architecture documentation or interactive onboarding.

---

## 8. Backlog Watch

| Item | Age | Risk | Recommended Action |
|:---|:---|:---|:---|
| [#22](https://github.com/gaoyangz77/rivonclaw/issues/22) | 1 day | Low | Maintainer response needed to clarify multi-browser design; quick documentation win |
| *No stale items* | — | — | Repository appears well-tended with responsive closure patterns |

**Note**: No long-unanswered critical issues identified. The project's 24-hour response pattern (#12 closed same-day, PRs merged rapidly) indicates healthy maintainer attention. Watch for community infrastructure decision following #12's implicit request.

---

*Digest generated from gaoyangz77/rivonclaw (EasyClaw) GitHub activity 2026-03-19 to 2026-03-20.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/duanyytop/agents-radar).*