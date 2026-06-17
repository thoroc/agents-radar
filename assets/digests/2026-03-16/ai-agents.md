# OpenClaw 生态日报 2026-03-16

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-03-16 00:10 UTC

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

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 | 2026-03-16

## 1. 今日速览

OpenClaw 项目今日呈现**极高活跃度**，24小时内产生 **500 条 Issues 更新**（新开/活跃 439，关闭 61）和 **500 条 PR 更新**（待合并 388，已合并/关闭 112），无新版本发布。社区焦点集中在 **v2026.3.12 版本的严重回归问题**——包括内存泄漏导致的 OOM 崩溃、CLI 与 Gateway 通信故障，以及 Telegram/WhatsApp 等渠道的稳定性质疑。与此同时，项目在安全增强（临时执行权限提升）、多网关支持和消息队列可靠性方面取得实质性进展。

---

## 2. 版本发布

**无新版本发布**

> 注：v2026.3.12（3月12日发布）和 v2026.3.13（3月13日发布）的回归问题正在紧急修复中，预计补丁版本即将推出。

---

## 3. 项目进展

### 已合并/关闭的重要 PR

| PR | 作者 | 核心改进 | 影响 |
|:---|:---|:---|:---|
| [#46763](https://github.com/openclaw/openclaw/pull/46763) | @hxy91819 | **修复 onboarding OOM**：使用作用域插件快照防止低内存主机崩溃 | 解决 2GB VPS 无法完成初始化的问题 |
| [#47669](https://github.com/openclaw/openclaw/pull/47669) | @ghost | **Cron 多通道验证**：announce 模式无前缀通道时前置报错 | 防止静默投递失败 |
| [#42720](https://github.com/openclaw/openclaw/pull/42720) | @hclsys | **修复 baseUrl 路径重复**：自动剥离 `/chat/completions` 后缀 | 解决 Kimi/Perplexity 配置 404 问题 |
| [#42563](https://github.com/openclaw/openclaw/pull/42563) | @hclsys | **OAuth 超时保护**：为 Qwen/Minimax 门户认证添加 30s 超时 | 防止认证流程无限挂起 |
| [#7694](https://github.com/openclaw/openclaw/issues/7694) | - | 消息排序冲突问题已关闭 | 工具执行期间用户消息冲突 |

**整体推进评估**：今日合并 PR 聚焦**稳定性加固**（内存、超时、验证）和**配置健壮性**，但 v2026.3.12 引入的核心回归问题尚未完全解决，项目处于"修复模式"而非功能扩展模式。

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues（评论数 Top 5）

| 排名 | Issue | 评论 | 核心诉求 | 状态 |
|:---|:---|:---:|:---|:---|
| 1 | [#45064](https://github.com/openclaw/openclaw/issues/45064) **v2026.3.12 内存泄漏 - 基础命令 OOM** | 25 | **紧急**：CLI 完全不可用，JavaScript heap 溢出 | 🔴 无 fix PR |
| 2 | [#7649](https://github.com/openclaw/openclaw/issues/7649) **Matrix E2EE 自验证缺失** | 23 | 端到端加密频道无法参与，需 `requestOwnUserVerification` | 🟡 长期未解决 |
| 3 | [#45289](https://github.com/openclaw/openclaw/issues/45289) **Telegram 反应通知失效** | 17 | `reactionNotifications: "all"` 配置无效 | 🔴 无 fix PR |
| 4 | [#45772](https://github.com/openclaw/openclaw/issues/45772) **Gateway 心跳定时器 1-2 次后停止** | 16 | v2026.3.8 引入，心跳机制失效 | 🔴 无 fix PR |
| 5 | [#7916](https://github.com/openclaw/openclaw/issues/7916) **API 密钥加密存储** | 14 | 明文存储安全风险，需 secrets 管理 | 🟢 高赞需求 (👍10) |

**背后诉求分析**：
- **稳定性危机**：v2026.3.12 成为"灾难版本"，内存管理和 Gateway 通信两大基础设施同时故障
- **企业级安全**：加密存储、执行护栏、密钥掩码等安全需求持续升温（#7916, #10659, #6823）
- **消息渠道可靠性**：Telegram/Matrix/WhatsApp 的 E2EE、反应通知、心跳保活等高级功能存在系统性缺陷

---

## 5. Bug 与稳定性

### 🔴 严重（阻塞使用 / 数据丢失风险）

| Issue | 描述 | 版本 | Fix PR |
|:---|:---|:---|:---:|
| [#45064](https://github.com/openclaw/openclaw/issues/45064) | **OOM 崩溃**：`gateway status`, `doctor` 等基础命令触发 JS heap 溢出 | v2026.3.12 | ❌ 无 |
| [#41778](https://github.com/openclaw/openclaw/issues/41778) | **openclaw-message OOM**：4GB 服务器无法运行，v2026.3.7+ 引入 | v2026.3.7+ | ❌ 无 |
| [#45504](https://github.com/openclaw/openclaw/issues/45504) | **CLI 与本地 Gateway 通信中断**：`devices list/approve` 失败，Web UI 正常 | v2026.3.12 | ❌ 无 |
| [#45772](https://github.com/openclaw/openclaw/issues/45772) | **心跳定时器停止**：1-2 次触发后永久停止，网关假死 | v2026.3.8 | ❌ 无 |

### 🟡 中等（功能降级 / 间歇故障）

| Issue | 描述 | Fix PR |
|:---|:---|:---:|
| [#45289](https://github.com/openclaw/openclaw/issues/45289) | Telegram 反应通知未接收 | ❌ 无 |
| [#44714](https://github.com/openclaw/openclaw/issues/44714) | `openclaw logs --follow` 握手超时 | ❌ 无 |
| [#45222](https://github.com/openclaw/openclaw/issues/45222) | 本地 Gateway WebSocket 间歇性握手失败 | ❌ 无 |
| [#46659](https://github.com/openclaw/openclaw/issues/46659) | WhatsApp 发送失败但反应成功（重复监听器） | ❌ 无 |
| [#45759](https://github.com/openclaw/openclaw/issues/45759) | Telegram 打字指示器无熔断器，网络故障时崩溃 | ❌ 无 |

### 🟢 轻微 / 已修复

| Issue | 描述 | Fix PR |
|:---|:---|:---:|
| [#45867](https://github.com/openclaw/openclaw/issues/45867) | OpenRouter 模型缺失静态快照导致图片丢弃 | ✅ 已关闭 |
| [#45065](https://github.com/openclaw/openclaw/issues/45065) | 更新 v2026.3.12 时完成缓存 OOM | ✅ 已关闭（#46763 相关）|

---

## 6. 功能请求与路线图信号

### 高概率纳入下一版本（已有 PR 或强信号）

| 功能 | Issue/PR | 状态 | 证据 |
|:---|:---|:---:|:---|
| **临时执行权限提升** (`/trust`, `/untrust`) | [#47696](https://github.com/openclaw/openclaw/pull/47696) | 🟢 PR 待合并 | 解决 exec 审批疲劳问题，安全与可用性平衡 |
| **SearXNG 搜索回退** | [#2317](https://github.com/openclaw/openclaw/issues/2317) | 🟡 高赞 (👍19) | Brave 额度限制痛点，自托管需求强烈 |
| **Tavily 搜索提供商** | [#12034](https://github.com/openclaw/openclaw/issues/12034) | 🟡 高赞 (👍11) | 企业用户已有 Tavily 订阅 |
| **可插拔搜索提供商架构** | [#11399](https://github.com/openclaw/openclaw/issues/11399) | 🟡 高赞 (👍13) | 长期可扩展性需求 |
| **跨会话广播工具** | [#47486](https://github.com/openclaw/openclaw/pull/47486) | 🟢 PR 待合并 | 多会话状态同步，多代理架构基础 |
| **内存刷新原子操作** | [#43498](https://github.com/openclaw/openclaw/pull/43498) | 🟢 PR 待合并 | LanceDB 扩展数据安全 |

### 长期路线图信号（需求强烈但实现复杂）

| 功能 | Issue | 阻力 |
|:---|:---|:---|
| **加密密钥管理** | [#7916](https://github.com/openclaw/openclaw/issues/7916) | 需设计密钥派生/存储架构 |
| **执行护栏系统** | [#6823](https://github.com/openclaw/openclaw/issues/6823), [#9030](https://github.com/openclaw/openclaw/issues/9030) | 需"判别器层"中间件架构 |
| **异步 exec 回调** | [#18237](https://github.com/openclaw/openclaw/issues/18237) | 会话生命周期与进程管理耦合 |
| **出站消息审批门** | [#25145](https://github.com/openclaw/openclaw/issues/25145) | 需重构 exec-approvals 为内容感知 |

---

## 7. 用户反馈摘要

### 💔 核心痛点

> *"升级到 2026.3.12 后，OpenClaw 在基础 CLI 命令上因 JavaScript 堆内存不足而崩溃，导致 CLI 完全无法使用"* — @binbin1213, [#45064](https://github.com/openclaw/openclaw/issues/45064)

> *"4GB 服务器上，openclaw-message 二进制文件在崩溃前消耗 500MB+，即使设置了 NODE_OPTIONS='--max-old-space-size=512'"* — @huaguihai, [#41778](https://github.com/openclaw/openclaw/issues/41778)

> *"Brave Search 有免费层的速率限制/信用额度限制——当主要提供商失败或信用额度用完时，自动回退到 SearXNG 将提供可靠性"* — @giannisanni, [#2317](https://github.com/openclaw/openclaw/issues/2317)

### ✅ 满意场景

> *"我可以发送 curl 来创建和发送消息"* — 用户通过 API 绕过 UI 问题（@mikecooperusa-web, [#41304](https://github.com/openclaw/openclaw/issues/41304) 中的 workaround 描述）

### 🔍 使用场景洞察

| 场景 | 代表 Issue | 需求强度 |
|:---|:---|:---:|
| 低资源服务器自托管（2-4GB） | #41778, #46763 | ⭐⭐⭐⭐⭐ |
| 多代理/多账户企业部署 | #25359, #10004, #46162 | ⭐⭐⭐⭐⭐ |
| E2EE 合规通信（Matrix/Signal） | #7649, #10637 | ⭐⭐⭐⭐☆ |
| 自动化工作流（Cron/Antfarm） | #45772, #47669 | ⭐⭐⭐⭐☆ |
| 视觉/多模态模型集成 | #45867 | ⭐⭐⭐☆☆ |

---

## 8. 待处理积压

### ⚠️ 长期未响应的高价值 Issue（>30天，高互动）

| Issue | 创建 | 最后更新 | 天数 | 互动 | 风险 |
|:---|:---|:---|:---:|:---:|:---|
| [#7649](https://github.com/openclaw/openclaw/issues/7649) Matrix E2EE 自验证 | 2026-02-03 | 2026-03-15 | 41 | 👍4, 💬23 | 企业 Matrix 部署阻塞 |
| [#7916](https://github.com/openclaw/openclaw/issues/7916) API 密钥加密 | 2026-02-03 | 2026-03-15 | 41 | 👍10, 💬14 | 安全合规审计失败 |
| [#2317](https://github.com/openclaw/openclaw/issues/2317) SearXNG 回退 | 2026-01-26 | 2026-03-15 | 49 | 👍19, 💬13 | Brave 依赖单点故障 |
| [#13688](https://github.com/openclaw/openclaw/issues/13688) Discord WebSocket 断开 | 2026-02-10 | 2026-03-15 | 34 | 👍2, 💬14 | 生产环境机器人离线 |
| [#3181](https://github.com/openclaw/openclaw/issues/3181) 心跳轮询失控 | 2026-01-28 | 2026-03-15 | 47 | 💬12 | 高成本/高 CPU 消耗 |
| [#5116](https://github.com/openclaw/openclaw/issues/5116) iMessage FDA 权限传递 | 2026-01-31 | 2026-03-15 | 44 | 👍4, 💬9 | macOS 26 兼容性 |

### 🔔 维护者行动建议

1. **紧急**：为 #45064 和 #41778 分配核心工程师，v2026.3.12 的 OOM 问题正在摧毁用户信任
2. **本周**：审查 #47696（/trust 命令）和 #47486（会话广播），安全与多代理架构是下一个里程碑
3. **本月**：回应 #7916 加密存储需求，提供路线图或设计文档，缓解企业安全顾虑

---

*日报生成时间：2026-03-16 | 数据来源：GitHub API | 项目地址：https://github.com/openclaw/openclaw*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析

**分析日期**：2026-03-16 | **数据来源**：GitHub 公开动态

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正经历**从功能竞赛向可靠性攻坚**的关键转折。OpenClaw 作为事实标准参考系，其 v2026.3.12 版本引发的稳定性危机（OOM 崩溃、Gateway 通信故障）成为全行业的警示案例——社区焦点从"功能丰富度"快速转向"生产可用性"。多智能体架构（Multi-Agent）、企业级安全加固、本地模型支持构成三大技术主线，而 Apple Silicon 容器兼容性、时区调度、文件传输等"边缘场景"正成为用户体验的分水岭。整体生态呈现"头部项目负重修复、新锐项目功能冲刺、尾部项目静默分化"的显著分层。

---

## 2. 各项目活跃度对比

| 项目 | Issues (24h) | PRs (24h) | Releases | 健康度评估 | 关键信号 |
|:---|:---:|:---:|:---:|:---|:---|
| **OpenClaw** | 500 更新 | 500 更新 | 无 | 🔴 **危机模式** | v2026.3.12 回归问题摧毁信任，500 Issues 中 439 条为活跃/新开 |
| **NanoBot** | 22 (15 新开) | 58 (35 待合) | 无 | 🟡 **快速迭代** | 多智能体架构 3 PR 并行，企业 IM 渠道问题集中爆发 |
| **ZeroClaw** | 37 (19 关闭) | 50 (35 已合) | **10 个** (含 3 重复 beta) | 🟢 **高强度交付** | 单日 10 版本发布，企业集成（M365/Notion/Nevis）密集落地 |
| **PicoClaw** | 16 (0 关闭) | 55 (50 待合) | 1 nightly | 🟡 **架构重构期** | Agent 事件驱动提案 #1316 深度讨论，Issues 关闭率 0% 警示积压 |
| **NanoClaw** | 16 (14 活跃) | 37 (33 待审) | 无 | 🟡 **多模型转型** | Apple Container 4 PR 集群攻坚，#80 多模型支持 44👍 无官方回应 |
| **NullClaw** | 26 (19 活跃) | 22 (22 已合) | 无 | 🟢 **质量巩固** | 15 Issues 关闭，安全加固（加密/SSRF/时序攻击）成批落地 |
| **IronClaw** | 26 (19 活跃) | 50 (25 待合) | 无 | 🟢 **可靠性工程** | @ilblackdragon 批量发起 12 个"火星车级可靠性"专项 Issue |
| **LobsterAI** | 数据未完整披露 | 15 (2 待审) | 无 | 🔴 **架构阵痛** | OpenClaw 引擎迁移中，#417 用户系统性审计报告质疑测试流程 |
| **TinyClaw** | 0 | 6 (4 待合) | 无 | 🟡 **稳定发展** | 零 Issue 活动，社区互动不足，稳定性修复 #218/#219 待合并 |
| **Moltis** | 数据未完整披露 | 5 (5 待合) | 无 | 🟢 **响应迅速** | 3 长期 Bug 关闭，浏览器会话隔离/Windows 文件锁死修复推进 |
| **CoPaw** | 38 (34 活跃) | 35 (29 待合) | 无 | 🟡 **规模扩张期** | 6 PR 已合并，ACP 协议集成 #1544 标志架构升级 |
| **ZeptoClaw** | 1 (新) | 6 (2 待合) | 无 | 🟢 **紧凑聚焦** | r8r 桥接器生产就绪，Vertex AI + Telegram 体验双轨推进 |
| **EasyClaw** | 0 | 0 | **v1.6.8** | 🟢 **静默维护** | 纯文档更新，零代码提交，活跃度最低 |

---

## 3. OpenClaw 在生态中的定位

### 核心参照地位
OpenClaw 是**生态的"压力测试基准"**——其技术债务和稳定性危机为所有后来者提供了反面教材。v2026.3.12 的内存泄漏和 Gateway 故障直接催生了其他项目的架构防御（如 ZeroClaw 的 token 感知压缩、NullClaw 的强制机密加密）。

### 技术路线差异
| 维度 | OpenClaw | 生态对比 |
|:---|:---|:---|
| **架构哲学** | 功能优先，快速迭代 | ZeroClaw/IronClaw 转向"可靠性优先" |
| **安全模型** | 明文存储 API 密钥（#7916 高赞未解决） | NullClaw 强制加密，ZeroClaw 基于能力的访问控制 |
| **多智能体** | 单 Agent 为主，广播工具 PR 待审 | NanoBot/PicoClaw/CoPaw 多智能体架构并行推进 |
| **企业集成** | Telegram/WhatsApp 稳定性危机 | ZeroClaw M365/Notion，CoPaw ACP 协议，IronClaw 飞书快速修复 |

### 社区规模对比
- **绝对规模**：OpenClaw 500 Issues/PRs 单日 = 其他项目总和的 **2-3 倍**
- **健康度悖论**：规模与质量成反比——OpenClaw 的 439 条活跃 Issues 中大量为严重回归，而 NullClaw/IronClaw 以更小体量实现更高关闭率
- **贡献者集中度**：OpenClaw 依赖核心团队，ZeroClaw @theonlyhennygod 单日 12 PR，NanoClaw 社区自组织 4 PR 集群修复 Apple Container

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 | 紧迫程度 |
|:---|:---|:---|:---:|
| **多智能体架构** | NanoBot (#2041, #2064), PicoClaw (#1316), CoPaw (#1544 ACP), ZeroClaw (`swarm` 模块) | 子代理独立后端、跨会话状态同步、智能体间通信通道、人工审批介入 | ⭐⭐⭐⭐⭐ |
| **企业级安全加固** | NullClaw (#537 强制加密, #531 时序攻击防护), ZeroClaw (#3649 能力访问控制), OpenClaw (#7916 密钥加密, #6823 执行护栏) | 机密加密存储、SSRF 防护、最小权限执行、密钥掩码 | ⭐⭐⭐⭐⭐ |
| **本地模型/多提供商支持** | NanoClaw (#80 44👍 多模型), IronClaw (#80 Bedrock/Gemini), TinyClaw (#217 Gemini), CoPaw (#1507 Gemini) | 摆脱 OpenAI/Anthropic 锁定，Ollama/Bedrock/Gemini 原生支持 | ⭐⭐⭐⭐⭐ |
| **Apple Silicon/容器兼容性** | NanoClaw (#1103-#1106 4 Issue 集群), ZeroClaw (#3537 ARM64 崩溃) | 网络隔离、凭证代理、Keychain 访问、glibc 版本匹配 | ⭐⭐⭐⭐☆ |
| **时区与调度系统** | CoPaw (#1345, #1432, #1535 多 PR), PicoClaw (#1623), OpenClaw (#47669 Cron 验证) | Cron 时区配置、调度准确性、长期运行稳定性 | ⭐⭐⭐⭐☆ |
| **文件/多媒体传输** | CoPaw (#981 13 评论), NanoBot (#2034 钉钉多媒体), ZeroClaw (WhatsApp 发送失败) | 企业 IM 文件交互、语音转录、图片识别 | ⭐⭐⭐⭐☆ |
| **浏览器自动化** | PicoClaw (#293 28 天高优先级), ZeroClaw (服务模式浏览器修复), OpenClaw (无头浏览器需求) | Playwright/Puppeteer 集成、reCAPTCHA 绕过、CDP 中继 | ⭐⭐⭐☆☆ |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|:---|:---|:---|:---|
| **OpenClaw** | 通用 AI 助手，渠道覆盖最广 | 技术爱好者、早期采用者 | Node.js 单体，插件化扩展，技术债务累积 |
| **NanoBot** | 多智能体编排，国产模型适配 | 中国企业用户、多 Agent 场景 | Python 异步，技能系统，企业 IM 深度集成 |
| **ZeroClaw** | 企业级集成，安全优先 | 合规敏感型企业、B2B 部署 | Rust 核心，功能标志编译，最小权限设计 |
| **PicoClaw** | Agent 可观测性，实时干预 | 开发者工具链、调试需求强 | 事件驱动架构提案，Steering 功能已落地 |
| **NanoClaw** | Claude Code 封装，容器安全 | 云原生开发者、安全敏感用户 | 容器化沙箱，主机 Agent 信任模型 |
| **NullClaw** | 零依赖，静态二进制，Zig 原生 | 边缘部署、资源受限环境 | Zig 全栈，curl 依赖争议，WASM 扩展 |
| **IronClaw** | 形式化验证，"火星车级可靠性" | 金融/医疗等高确定性场景 | Rust + TLA+/Kani，混沌测试，突变测试 |
| **LobsterAI** | 网易有道生态，OpenClaw 迁移 | 中文用户、有道产品用户 | 引擎切换中，稳定性阵痛 |
| **CoPaw** | ACP 协议，Agent 互操作 | 多 Agent 生态参与者 | Python，AgentScope 框架，协议驱动 |
| **ZeptoClaw** | r8r 工作流引擎，人工审批 | 企业工作流自动化 | Rust，外部工作流双向集成 |
| **Moltis** | Rust 原生，浏览器沙箱 | 技术极客、自托管用户 | Rust 异步，浏览器会话隔离 |
| **TinyClaw** | 极简部署，Web 配置 | 轻量级用户、快速启动需求 | 精简代码库，Headless 部署支持 |
| **EasyClaw** | 开箱即用，低门槛 | 非技术用户、首次尝试者 | 预构建二进制，文档导向 |

---

## 6. 社区热度与成熟度分层

### 🔥 快速迭代阶段（功能冲刺）
| 项目 | 特征 | 风险 |
|:---|:---|:---|
| **NanoBot** | 3 个多智能体 PR 并行，企业 IM 渠道问题集中 | 技术债务与架构升级同步，稳定性承压 |
| **PicoClaw** | 55 PRs 待合，Agent 架构重构深度讨论 | Issues 关闭率 0%，积压风险 |
| **CoPaw** | 38 Issues 活跃，ACP 协议集成，29 PRs 待审 | 规模扩张期边缘场景暴露 |

### 🛡️ 质量巩固阶段（可靠性攻坚）
| 项目 | 特征 | 信号 |
|:---|:---|:---|
| **NullClaw** | 22 PRs 全合并，安全加固成批落地 | "零外部依赖"路线争议（#192） |
| **IronClaw** | 12 个可靠性工程专项 Issue，形式化验证 | 从"功能可用"向"生产就绪"战略转型 |
| **ZeroClaw** | 10 版本单日发布，企业集成密集 | 安全策略与功能自由度张力（#1478） |

### ⚠️ 危机修复阶段
| 项目 | 核心问题 | 关键行动 |
|:---|:---|:---|
| **OpenClaw** | v2026.3.12 回归问题，439 活跃 Issues | 紧急补丁版本，内存/Gateway 专项修复 |
| **LobsterAI** | OpenClaw 迁移阵痛，用户系统性审计质疑 | 引擎切换路线澄清，测试流程重建 |

### 💤 静默/维护阶段
| 项目 | 状态 | 建议 |
|:---|:---|:---|
| **TinyClaw** | 零 Issue 活动，稳定性 PR 待合 | 建立反馈渠道，加速 PR 审查 |
| **EasyClaw** | 纯文档更新，零代码提交 | 核查历史积压，评估维护者精力 |

---

## 7. 值得关注的趋势信号

### 信号一："可靠性优先"成为新共识
> **证据**：IronClaw 批量发起 TLA+/Kani/混沌测试专项；NullClaw 强制机密加密；ZeroClaw 基于能力的访问控制。
> **价值**：AI 智能体从"Demo 可用"向"生产可信"跨越，形式化验证和混沌工程将成为差异化壁垒。

### 信号二：多智能体架构从"概念"进入"落地竞争"
> **证据**：NanoBot/PicoClaw/CoPaw 三项目同日推进多智能体 PR；ACP 协议（#1544）标志互操作性标准萌芽。
> **价值**：单 Agent 能力天花板显现，智能体间通信、状态同步、人工审批介入成为架构设计核心。

### 信号三：Apple Silicon/ARM64 成为边缘部署关键战场
> **证据**：NanoClaw 4 PR 集群攻坚 Apple Container；ZeroClaw #3537 Raspberry Pi 崩溃；PicoClaw 夜间构建持续发布。
> **价值**：M 系列 Mac 和 ARM 服务器用户群体扩张，容器网络隔离、凭证代理、Keychain 访问成为通用难题。

### 信号四："供应商锁定焦虑"驱动多模型支持
> **证据**：NanoClaw #80 44👍 无官方回应；IronClaw #80 30 天+；TinyClaw #217 Gemini PR 待审。
> **价值**：Anthropic 封禁 OpenClaw 用户事件（#80 评论）敲响警钟，本地模型（Ollama）和企业云（Bedrock/Vertex）成为必选项。

### 信号五：企业 IM 渠道成为"最后一公里"瓶颈
> **证据**：CoPaw #981 13 评论文件传输；NanoBot 飞书/企微/钉钉问题 40% 活跃 Issue；ZeroClaw Lark/Feishu 编译问题。
> **价值**：渠道层的稳定性、多媒体能力、长连接保活，决定 AI 助手能否真正嵌入企业工作流。

### 信号六：社区自组织修复能力分化生态
> **证据**：NanoClaw @spencer-whitman 4 PR 集群修复 Apple Container；ZeroClaw @theonlyhennygod 单日 12 PR。
> **价值**：核心维护者响应速度成为项目健康度关键指标，"社区驱动修复" vs "官方主导修复"模式分化。

---

**结论**：个人 AI 助手生态正经历"功能泡沫"后的第一次大规模可靠性洗牌。OpenClaw 的危机为全行业提供了架构反思契机，而 ZeroClaw、NullClaw、IronClaw 的差异化安全/可靠性路线可能定义下一代标准。对于开发者而言，**多智能体互操作性、本地模型支持、容器边缘部署**是 2026 年技术选型的三个关键维度。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 | 2026-03-16

## 1. 今日速览

NanoBot 今日保持**极高活跃度**，24小时内产生 **58 个 PR**（35 待合并）和 **22 个 Issues**（15 新开/活跃），无新版本发布。社区焦点集中在**多智能体架构重构**（3个相关PR并行推进）、**交互式配置体验升级**（`nanobot onboard`向导获官方推广），以及**企业级部署场景**的稳定性诉求（飞书/钉钉/企微渠道问题集中爆发）。项目正处于功能快速迭代期，技术债务与架构升级同步进行。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 已合并/关闭的重要 PR

| PR | 作者 | 核心贡献 | 项目推进 |
|:---|:---|:---|:---|
| [#670](https://github.com/HKUDS/nanobot/pull/670) | @nobuxpt | 集成 `open-skills` 库，宣称降低 token 消耗 ~98% | **性能优化里程碑**：通过预置常用任务模式减少重复推理 |
| [#310](https://github.com/HKUDS/nanobot/pull/310) | @SergioSV96 | DeepSeek/GLM 推理内容可视化支持 | **国产模型适配**：补齐推理模型用户体验短板 |
| [#2037](https://github.com/HKUDS/nanobot/pull/2037) | @benlenarts | 修复 `restrictToWorkspace=true` 时内置技能不可用 | **安全-功能平衡**：解决企业部署的核心阻塞问题 |
| [#2034](https://github.com/HKUDS/nanobot/pull/2034) | @chengyongru | 钉钉渠道多媒体能力增强 | **企业IM生态**：钉钉用户获得图片/文件交互能力 |

**架构演进信号**：今日关闭的 [#1719](https://github.com/HKUDS/nanobot/issues/1719)（web_search 后端可插拔）标志着项目正式承认"硬编码 Brave"的技术债务，为后续搜索生态开放铺路。

---

## 4. 社区热点

### 讨论最活跃的 Issues

| 排名 | Issue | 评论 | 核心诉求 | 深层分析 |
|:---|:---|:---:|:---|:---|
| 1 | [#1932](https://github.com/HKUDS/nanobot/issues/1932) 技能禁用而非删除 | 8 | 灵活配置需求 | **配置管理痛点**：用户希望 A/B 测试技能，删除-重建流程破坏工作流 |
| 2 | [#1988](https://github.com/HKUDS/nanobot/issues/1988) 企微渠道失效 | 8 | 企业微信接入阻塞 | **文档-代码脱节**：升级后配置项消失，手动添加仍报 "No Channels Enabled" |
| 3 | [#2049](https://github.com/HKUDS/nanobot/issues/2049) 技能创建工具丢失 | 4 | 功能回归质疑 | **版本兼容性危机**：用户升级后核心能力消失，信任受损 |
| 4 | [#2018](https://github.com/HKUDS/nanobot/issues/2018) / [#2019](https://github.com/HKUDS/nanobot/issues/2019) 交互式配置向导反馈 | 4+1 |  onboarding 体验 | **官方主推功能**：双语 Issue 显示国际化推广意图 |

**热点趋势**：企业级部署场景（飞书/企微/钉钉）的稳定性问题占活跃 Issue 的 **40%**，渠道层成为当前最大摩擦点。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 现象 | Fix PR 状态 |
|:---|:---|:---|:---|
| 🔴 **高** | [#2061](https://github.com/HKUDS/nanobot/issues/2061) | 飞书渠道文件复制操作无限循环（仅 list_dir/read_file，不执行写入） | ❌ 无 |
| 🔴 **高** | [#2062](https://github.com/HKUDS/nanobot/issues/2062) | 飞书 session 文件无限增长撑爆上下文，无清空机制 | ❌ 无（用户被迫手动删文件重启） |
| 🟡 **中** | [#1956](https://github.com/HKUDS/nanobot/issues/1956) | CLI 工具调用进度条残留 "nanobot is thinking..." | ❌ 无 |
| 🟡 **中** | [#508](https://github.com/HKUDS/nanobot/issues/508) | Ollama 本地模型响应格式解析错误（tool_calls 包裹异常） | ❌ 无（2月遗留） |
| 🟡 **中** | [#2065](https://github.com/HKUDS/nanobot/issues/2065) | 工具依赖二进制 `most`/`Fast` 未在 PATH 中（全新 Ubuntu 安装） | ❌ 无 |
| 🟡 **中** | [#2071](https://github.com/HKUDS/nanobot/issues/2071) | DuckDuckGo 搜索默认配置失效 | ❌ 无 |
| 🟢 **低** | [#1929](https://github.com/HKUDS/nanobot/issues/1929) | Heartbeat Phase 1 缺少当前时间注入，调度判断失效 | ❌ 无（nanobot 自检提出） |

**安全警示**：[#143](https://github.com/HKUDS/nanobot/issues/143) 文件系统工具未强制执行 `restrict_to_workspace`，今日仍有更新，属长期安全隐患。

---

## 6. 功能请求与路线图信号

| 需求 | Issue/PR | 纳入可能性 | 判断依据 |
|:---|:---|:---:|:---|
| **技能启用/禁用开关** | [#1932](https://github.com/HKUDS/nanobot/issues/1932) + [#1934](https://github.com/HKUDS/nanobot/pull/1934) | ⭐⭐⭐⭐⭐ | PR 已开，架构解耦完成，近期合并 |
| **多智能体架构** | [#2041](https://github.com/HKUDS/nanobot/pull/2041) + [#2064](https://github.com/HKUDS/nanobot/pull/2064) | ⭐⭐⭐⭐⭐ | 两个PR并行竞争，架构级优先级 |
| **子代理独立后端配置** | [#2041](https://github.com/HKUDS/nanobot/pull/2041) | ⭐⭐⭐⭐⭐ | 与多智能体绑定，核心基础设施 |
| **Tauri 桌面端** | [#2063](https://github.com/HKUDS/nanobot/pull/2063) | ⭐⭐⭐⭐☆ | 完整方案含 CI/CD，用户体验突破 |
| **事件 Webhook HTTP 触发** | [#2055](https://github.com/HKUDS/nanobot/pull/2055) | ⭐⭐⭐⭐☆ | 自动化集成关键能力 |
| **Unix Socket JSON-RPC 通道** | [#2059](https://github.com/HKUDS/nanobot/pull/2059) | ⭐⭐⭐⭐☆ | 本地程序集成标准化 |
| **智能体间通信通道** | [#2002](https://github.com/HKUDS/nanobot/pull/2002) | ⭐⭐⭐☆☆ | 与多智能体PR功能重叠，可能合并 |
| **Gemini 搜索降级** | [#2066](https://github.com/HKUDS/nanobot/pull/2066) | ⭐⭐⭐☆☆ | 已关闭，策略待评估 |
| **Docker 镜像自动发布** | [#126](https://github.com/HKUDS/nanobot/pull/126) | ⭐⭐☆☆☆ | 2月遗留，维护者未响应 |

**路线图推断**：下一版本核心主题为 **"Multi-Agent & Desktop"**（多智能体+桌面端），配置体验和企业部署稳定性为并行重点。

---

## 7. 用户反馈摘要

### 真实痛点

> *"飞书 ID 一直是同一个，session 文件越来越大，最终撑爆上下文"* — [#2062](https://github.com/HKUDS/nanobot/issues/2062) @sllzwsgdsg

> *"升级后技能创建工具消失，之前可以帮我创建技能"* — [#2049](https://github.com/HKUDS/nanobot/issues/2049) @stephenrt42

> *"企微配置在升级后从 config.json 消失，手动添加后仍报 No Channels Enabled"* — [#1988](https://github.com/HKUDS/nanobot/issues/1988) @oskaryang-kk

### 满意场景

> *"做了一个修改，使得 nanobot 挂 QQ 可以进行图像识别"* — [#2000](https://github.com/HKUDS/nanobot/issues/2000) @szdengdi（社区自研方案）

> *"新的交互式向导比手动编辑 JSON 方便多了"* — [#2018](https://github.com/HKUDS/nanobot/issues/2018) 反馈

### 关键洞察

- **升级焦虑**：多个 Issue 指向版本升级导致配置丢失或功能回归，用户对新版本信任度下降
- **企业场景摩擦**：飞书/企微/钉钉用户被迫深入代码层解决基础功能问题，渠道层抽象不足
- **社区自救活跃**：QQ 图片识别、CLI Proxy 适配等场景用户自发贡献解决方案

---

## 8. 待处理积压

| Issue/PR | 创建时间 | 问题 | 风险 |
|:---|:---|:---|:---|
| [#143](https://github.com/HKUDS/nanobot/issues/143) 文件系统安全限制绕过 | 2026-02-05 | `restrict_to_workspace` 未强制执行 | 🔴 **安全漏洞**，40天无响应 |
| [#126](https://github.com/HKUDS/nanobot/pull/126) Docker 镜像自动发布 | 2026-02-05 | 社区已验证，未合并 | 🟡 部署体验受阻 |
| [#508](https://github.com/HKUDS/nanobot/issues/508) Ollama 格式解析错误 | 2026-02-11 | 本地模型用户核心阻塞 | 🟡 开源生态兼容性 |
| [#1164](https://github.com/HKUDS/nanobot/pull/1164) 越南语 README | 2026-02-25 | 国际化贡献待处理 | 🟢 低优先级 |

**维护者行动建议**：安全 Issue #143 需立即评估；Docker 自动化 (#126) 可快速 wins；Ollama 兼容性 (#508) 影响本地部署用户群体。

---

*日报生成时间：2026-03-16 | 数据来源：HKUDS/nanobot GitHub*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 | 2026-03-16

> 📊 数据来源：github.com/zeroclaw-labs/zeroclaw  
> 统计周期：过去 24 小时（2026-03-15 至 2026-03-16）

---

## 1. 今日速览

ZeroClaw 今日呈现**高强度迭代态势**：24 小时内发布 10 个版本（含 3 个重复内容的 beta 版本），50 个 PR 更新（35 个已合并/关闭），37 个 Issues 处理（19 个关闭）。核心团队正密集推进 **v0.3.4 系列**的上下文管理重构与多智能体编排能力，同时快速响应社区反馈修复 Mistral 兼容性、服务模式浏览器工具崩溃等关键问题。社区活跃度极高，安全策略与功能自由度之间的张力成为主要讨论焦点。

---

## 2. 版本发布

### v0.3.4-beta.230~232（3 个重复构建）
| 属性 | 内容 |
|:---|:---|
| **状态** | Pre-release，内容相同（疑似 CI 重复触发） |
| **核心变更** | 四大模块升级 |

**详细更新内容：**

| 模块 | 功能 | 说明 |
|:---|:---|:---|
| `agent` | 工具调用失败原因透传 | 聊天进度消息中直接显示工具调用失败原因，提升可观测性 |
| `context` | Token 感知压缩 + 持久化会话 + LLM 整合 | 上下文管理重大重构，解决长对话场景下的 token 爆炸问题 |
| `hands` | 自主知识积累型智能体包 | 新增可自主积累知识的智能体包，支持持续学习 |
| `swarm` | 多智能体编排 + Mistral 工具修复 + `--intera` 恢复 | 多智能体协同能力落地，修复 Mistral 工具调用 422 错误 |

**迁移注意事项：**
- `context` 模块的 token-based compaction 可能改变长会话的行为模式，建议测试历史会话兼容性
- `swarm` 功能为新增实验性特性，配置格式可能后续调整

### v0.3.3-beta.217~218
- **v0.3.3-beta.218**：新增 `http_request` 工具的 `allow_private_hosts` 选项，解决内网 API 调用场景

### v0.3.2 / v0.3.2-beta.215~216
- **v0.3.2 正式版**：`heartbeat` 模块两阶段执行、结构化任务与自动路由
- **v0.3.2-beta.216**：上下文管理功能前置落地

### v0.3.1 / v0.3.1-beta.214
- **v0.3.1 正式版**：新增 Termux (aarch64-linux-android) 发布目标，移动端部署能力完善

---

## 3. 项目进展

### 🔥 今日合并的关键 PR（按影响面排序）

| PR | 作者 | 核心贡献 | 项目推进价值 |
|:---|:---|:---|:---|
| [#3644](https://github.com/zeroclaw-labs/zeroclaw/pull/3644) | @theonlyhennygod | **CI 修复**：Linux 发布构建降级至 ubuntu-22.04（glibc 2.35） | 解决 [#3573](https://github.com/zeroclaw-labs/zeroclaw/issues/3573) 和 [#2084](https://github.com/zeroclaw-labs/zeroclaw/issues/2084) 的 glibc 版本不匹配问题，恢复 Ubuntu 22.04 兼容性 |
| [#3620](https://github.com/zeroclaw-labs/zeroclaw/pull/3620) | @theonlyhennygod | **Provider 修复**：Mistral 工具调用排除 `name` 字段 | 修复 [#3572](https://github.com/zeroclaw-labs/zeroclaw/issues/3572) 和 [#2693](https://github.com/zeroclaw-labs/zeroclaw/issues/2693) 的 422 错误，恢复 Mistral 可用性 |
| [#3645](https://github.com/zeroclaw-labs/zeroclaw/pull/3645) | @theonlyhennygod | **Runtime 修复**：服务模式下无头浏览器工具失败 | 修复 [#3584](https://github.com/zeroclaw-labs/zeroclaw/issues/3584)，解决 systemd/OpenRC 环境下的 Chromium 启动问题 |
| [#3646](https://github.com/zeroclaw-labs/zeroclaw/pull/3646) | @theonlyhennygod | **UX 改进**：`onboard` 自动检测 TTY，移除 `--interactive` 标志 | 响应 [#3573](https://github.com/zeroclaw-labs/zeroclaw/issues/3573) 的反馈，简化配置流程 |
| [#3619](https://github.com/zeroclaw-labs/zeroclaw/pull/3619) | @theonlyhennygod | **Channel 修复**：`query_classification` 配置实际生效 | 修复 [#3579](https://github.com/zeroclaw-labs/zeroclaw/issues/3579)，模型路由功能完整落地 |
| [#3501](https://github.com/zeroclaw-labs/zeroclaw/pull/3501) | @theonlyhennygod | **Provider 修复**：Anthropic 连续同角色消息合并 | 修复 `claude-sonnet-4-6` 多工具调用时的 500 错误 |
| [#3648](https://github.com/zeroclaw-labs/zeroclaw/pull/3648) / [#3652](https://github.com/zeroclaw-labs/zeroclaw/pull/3652) | @theonlyhennygod | **Infrastructure**：OpenVPN 隧道提供商（基于 @rareba 工作） | 网络层扩展，支持 OpenVPN 基础设施部署 |
| [#3650](https://github.com/zeroclaw-labs/zeroclaw/pull/3650) | @theonlyhennygod | **Integration**：Notion 数据库轮询通道与 API 工具（基于 @rareba 工作） | 企业工作流集成，支持任务驱动的 Notion 自动化 |
| [#3653](https://github.com/zeroclaw-labs/zeroclaw/pull/3653) | @theonlyhennygod | **Integration**：Microsoft 365 Graph API 工具（基于 @rareba 工作） | 企业级 Outlook/Teams/Calendar/OneDrive/SharePoint 集成 |
| [#3649](https://github.com/zeroclaw-labs/zeroclaw/pull/3649) | @theonlyhennygod | **Security**：基于能力的工具访问控制（基于 @rareba 工作） | 最小权限原则落地，支持 cron/子代理的细粒度工具限制 |
| [#3651](https://github.com/zeroclaw-labs/zeroclaw/pull/3651) | @theonlyhennygod | **Security**：Nevis IAM SSO/MFA 集成（基于 @rareba 工作） | 企业身份管理集成，支持 FIDO2/Passkey/OTP |

**整体推进评估**：今日合并的 PR 覆盖 **稳定性修复（4 个）**、**企业集成（3 个）**、**安全加固（2 个）**、**基础设施（1 个）**，项目在企业就绪性和开发者体验上迈出实质性步伐。

---

## 4. 社区热点

### 🔥 讨论最激烈的 Issues

| 排名 | Issue | 评论 | 核心诉求 | 深层分析 |
|:---|:---|:---:|:---|:---|
| 1 | [#1478](https://github.com/zeroclaw-labs/zeroclaw/issues/1478) **【已关闭】** | 36 | 安全策略过度限制，无法执行任何实际操作 | **经典张力**：项目定位"安全优先"与部分用户"功能优先"的冲突。用户期望有"完全关闭安全"的逃生舱，但项目方可能担心法律责任。该 Issue 以 5 个 👍 获得显著社区共鸣，反映部分个人用户场景被企业级安全策略误伤 |
| 2 | [#3565](https://github.com/zeroclaw-labs/zeroclaw/issues/3565) **【开放】** | 7 | Token 使用日志与成本追踪仪表板 | 付费 API 用户的刚需，当前"零可见性"状态阻碍生产部署。与今日发布的 `context` 模块 token 压缩功能形成呼应，是成本优化闭环的关键缺失环节 |
| 3 | [#3537](https://github.com/zeroclaw-labs/zeroclaw/issues/3537) **【开放】** | 5 | ARM64 上守护进程静默崩溃（S0 级） | Raspberry Pi 4 用户受阻，v0.2.1-beta.186 起的回归，影响边缘部署场景 |
| 4 | [#2693](https://github.com/zeroclaw-labs/zeroclaw/issues/2693) **【已关闭】** | 5 | Mistral 422 错误 | 已修复，但反映 Provider 兼容性测试覆盖不足 |
| 5 | [#3580](https://github.com/zeroclaw-labs/zeroclaw/issues/3580) **【已关闭】** | 4 | Web 仪表板不可用 | 构建流程文档/体验问题，新手入门障碍 |

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 状态 | 描述 | Fix PR |
|:---|:---|:---|:---|:---|
| **S0 - 数据丢失/安全风险** | [#3537](https://github.com/zeroclaw-labs/zeroclaw/issues/3537) | 🟡 开放 | ARM64 守护进程静默崩溃（Raspberry Pi 4） | 无 |
| | [#3533](https://github.com/zeroclaw-labs/zeroclaw/issues/3533) | 🟢 已关闭 | 代码写入时的字符边界 panic（中文内容） | 已修复 |
| **S1 - 工作流阻塞** | [#3572](https://github.com/zeroclaw-labs/zeroclaw/issues/3572) | 🟢 已关闭 | Mistral 工具调用失败 | [#3620](https://github.com/zeroclaw-labs/zeroclaw/pull/3620) |
| | [#3584](https://github.com/zeroclaw-labs/zeroclaw/issues/3584) | 🟢 已关闭 | 服务模式下无头浏览器工具失败 | [#3645](https://github.com/zeroclaw-labs/zeroclaw/pull/3645) |
| | [#3577](https://github.com/zeroclaw-labs/zeroclaw/issues/3577) | 🟢 已关闭 | WhatsApp Web QR 码 onboarding 不显示 | 已修复 |
| | [#3540](https://github.com/zeroclaw-labs/zeroclaw/issues/3540) | 🟡 开放 | Lark/Feishu 通道编译后无法启动 | 无 |
| | [#3543](https://github.com/zeroclaw-labs/zeroclaw/issues/3543) | 🟢 已关闭 | Docker 运行立即退出（v0.3.0+） | 已修复 |
| **S2 - 降级行为** | [#3643](https://github.com/zeroclaw-labs/zeroclaw/issues/3643) | 🟡 开放 | "auto" 工具调度器重复注入 35 个工具 schema | 无 |
| **S3 - 轻微问题** | [#3513](https://github.com/zeroclaw-labs/zeroclaw/issues/3513) | 🟡 开放 | Agent 聊天发送多条消息而非单条回复 | 无 |
| | [#3647](https://github.com/zeroclaw-labs/zeroclaw/issues/3647) | 🟡 开放 | QQ 通道 Markdown 渲染为纯文本 | 无 |
| | [#3011](https://github.com/zeroclaw-labs/zeroclaw/issues/3011) | 🟡 开放 | Dashboard WebSocket 协议参数未传递导致认证失败 | 无 |

**稳定性评估**：今日快速修复了 5 个 S1 级问题，响应速度优秀。但 **S0 级 ARM64 崩溃** 和 **S2 级工具调度器重复注入** 尚无修复，可能影响边缘部署和本地模型性能。

---

## 6. 功能请求与路线图信号

| Issue/PR | 类型 | 内容 | 纳入可能性评估 |
|:---|:---|:---|:---|
| [#3565](https://github.com/zeroclaw-labs/zeroclaw/issues/3565) | 功能请求 | Token 使用日志与成本追踪仪表板 | ⭐⭐⭐⭐⭐ **高** - 与今日 `context` 模块的 token 压缩功能直接相关，是成本优化闭环的自然延伸 |
| [#3502](https://github.com/zeroclaw-labs/zeroclaw/issues/3502) | 功能请求 | 真正的多智能体系统与上下文工程 | ⭐⭐⭐⭐⭐ **高** - 与今日发布的 `swarm` 多智能体编排功能高度契合，可能已部分实现 |
| [#3642](https://github.com/zeroclaw-labs/zeroclaw/issues/3642) | 功能请求 | "完整版" Docker 镜像（全功能启用） | ⭐⭐⭐⭐☆ **中高** - 降低新用户门槛，与项目扩展企业集成的方向一致 |
| [#2958](https://github.com/zeroclaw-labs/zeroclaw/issues/2958) | 功能请求 | QQ 机器人 Markdown 和多媒体消息渲染 | ⭐⭐⭐☆☆ **中** - 中国市场需求，但依赖通道实现细节 |
| [#2881](https://github.com/zeroclaw-labs/zeroclaw/issues/2881) | 功能请求 | 转录配置支持 `initial_prompt` 参数 | ⭐⭐⭐☆☆ **中** - Whisper 本地部署优化，专业用户场景 |
| [#3385](https://github.com/zeroclaw-labs/zeroclaw/pull/3385) | PR（开放） | InboxAPI 通道 - 零配置邮件 | ⭐⭐⭐⭐☆ **中高** - 简化邮件集成，与"降低门槛"产品方向一致 |

**路线图信号**：今日合并的多个企业集成 PR（M365、Notion、Nevis IAM）表明项目正加速 **B 端企业就绪性**建设。同时 `hands` 自主知识积累智能体包的发布，暗示 **长期记忆与持续学习** 可能是下一阶段重点。

---

## 7. 用户反馈摘要

### 💡 真实痛点

| 场景 | 反馈来源 | 核心问题 |
|:---|:---|:---|
| **个人开发者/爱好者** | [#1478](https://github.com/zeroclaw-labs/zeroclaw/issues/1478) | "安全到只能当聊天机器人"，期望有"完全关闭安全"的逃生舱 |
| **付费 API 用户** | [#3565](https://github.com/zeroclaw-labs/zeroclaw/issues/3565) | 零成本可见性，无法优化模型选择策略 |
| **边缘/IoT 部署** | [#3537](https://github.com/zeroclaw-labs/zeroclaw/issues/3537) | ARM64 回归问题阻断 Raspberry Pi 场景 |
| **企业用户** | [#3642](https://github.com/zeroclaw-labs/zeroclaw/issues/3642) | 功能标志编译门槛高，需要开箱即用的完整镜像 |
| **中文用户** | [#3533](https://github.com/zeroclaw-labs/zeroclaw/issues/3533), [#3647](https://github.com/zeroclaw-labs/zeroclaw/issues/3647) | 字符边界处理、Markdown 渲染等本地化问题 |

### ✅ 满意点
- 快速响应：Mistral 修复、服务模式浏览器修复均在 24 小时内完成
- 功能丰富：M365/Notion 等企业集成快速落地

### ❌ 不满意点
- 安全策略缺乏灵活性，"一刀切"体验差
- Docker/构建体验不稳定（多次出现运行即退出）
- 文档与错误信息不够清晰（如 Web 仪表板构建提示）

---

## 8. 待处理积压

> ⚠️ 以下 Issue/PR 需要维护者关注，避免长期悬置

| 项目 | 创建时间 | 状态 | 风险 | 建议行动 |
|:---|:---|:---|:---|:---|
| [#3537](https://github.com/zeroclaw-labs/zeroclaw/issues/3537) ARM64 静默崩溃 | 今日 | S0 开放 | 边缘部署场景完全阻断 | 优先级提升至 P0，分配 ARM 环境复现 |
| [#3643](https://github.com/zeroclaw-labs/zeroclaw/issues/3643) 工具 schema 重复注入 | 今日 | S2 开放 | 本地模型性能降级，token 浪费 | 与 `context` 模块团队协调修复 |
| [#3385](https://github.com/zeroclaw-labs/zeroclaw/pull/3385) InboxAPI 通道 | 3 日前 | 开放 | 邮件集成需求悬置 | 评估合并时间表或提供反馈 |
| [#3540](https://github.com/zeroclaw-labs/zeroclaw/issues/3540) Lark/Feishu 通道启动失败 | 今日 | S1 开放 | 中国企业用户受阻 | 需要功能标志编译专家介入 |
| [#1478](https://github.com/zeroclaw-labs/zeroclaw/issues/1478) 安全策略过度限制 | 21 日前 | 已关闭但情绪未消解 | 社区分裂风险，负面口碑 | 考虑发布"开发者模式"或官方文档说明设计哲学 |

---

## 附录：贡献者活跃度

| 贡献者 | 今日 PR 数 | 主要领域 |
|:---|:---:|:---|
| @theonlyhennygod | 12 | 修复、重构、企业集成落地 |
| @rareba | 4（被继承） | 基础设施、安全、企业集成（原始作者） |

> 注：Claude Opus 4.6 出现在发布说明的贡献者列表中，反映项目使用 AI 辅助开发。

---

*日报生成时间：2026

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 | 2026-03-16

## 1. 今日速览

PicoClaw 社区今日保持**极高活跃度**，24小时内产生 **16 条活跃 Issues**（全部为新开/活跃状态，0 关闭）和 **55 条 PR 更新**（50 待合并，5 已合并/关闭）。项目发布 **v0.2.3-nightly.20260315** 夜间构建版本，核心架构改进与多通道稳定性修复并行推进。值得注意的是，**Agent 架构重构提案**（#1316）持续获得深度技术讨论，而 **image_model 配置失效**、**Gemini 多模型 fallback 故障**等关键 Bug 已有 PR 提交修复。整体健康度良好，但 Issues 关闭率为 0%，需关注积压趋势。

---

## 2. 版本发布

### 🌙 Nightly Build: v0.2.3-nightly.20260315.5a251b46

| 属性 | 详情 |
|:---|:---|
| **发布类型** | 自动化夜间构建（不稳定版本） |
| **发布时间** | 2026-03-15 |
| **基线对比** | [v0.2.3...main](https://github.com/sipeed/picoclaw/compare/v0.2.3...main) |

**⚠️ 使用警告**：此为自动化构建，可能存在不稳定因素，生产环境建议等待稳定版本。

---

## 3. 项目进展

### 今日已合并/关闭 PR（5 条）

| PR | 作者 | 关键进展 |
|:---|:---|:---|
| [#1517](https://github.com/sipeed/picoclaw/pull/1517) | @afjcjsbx | **Agent Steering 功能已合并** — 允许用户在 Agent 执行工具调用链时实时干预/重定向，解决"只能干等 Agent 完成"的核心痛点 |
| ~~其他 4 条~~ | — | 数据未完整展示，建议关注后续官方发布说明 |

### 核心推进方向

| 领域 | 进展标志 | 状态 |
|:---|:---|:---|
| **Agent 架构** | #1316 事件驱动重构提案持续迭代，#1517 Steering 功能落地 | 🔥 深度演进中 |
| **视觉/多模态** | #1616 修复 `image_model` 配置未生效问题，#1578 对应 Bug 已有关键修复 PR | ✅ 即将合入 |
| **模型路由** | #1619 修复 fallback 别名解析问题，#1618 新增 OpenAI/Codex 原生搜索 | 🚀 密集优化期 |
| **通道稳定性** | #1455 Telegram 长轮询重连、#1295 企业微信长连接模式 | 🔧 可靠性加固 |

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues

| 排名 | Issue | 评论 | 👍 | 核心诉求分析 |
|:---|:---|:---:|:---:|:---|
| 1 | [#1316](https://github.com/sipeed/picoclaw/issues/1316) Agent 事件驱动重构 | 11 | 1 | **架构层核心诉求**：开发者需要可观测、可干预、可中断的 Agent 执行流水线，当前"黑盒"设计阻碍生产级部署 |
| 2 | [#293](https://github.com/sipeed/picoclaw/issues/293) 自主浏览器操作 | 6 | 4 | **高优先级路线图功能**：社区强烈期待 Web 自动化能力，已在评估 Playwright/Puppeteer 技术路径 |
| 3 | [#1498](https://github.com/sipeed/picoclaw/issues/1498) 模型端搜索 + FastEmbed | 6 | 0 | **性能优化诉求**：避免客户端重复搜索，期待原生集成向量检索 |

### 今日新开高关注 Issue

| Issue | 场景痛点 |
|:---|:---|
| [#1591](https://github.com/sipeed/picoclaw/issues/1591) Telegram 群组"仅观察"模式 | 多 Bot 同群场景下的消息路由控制——需要"旁听但不抢答"的智能模式 |
| [#1589](https://github.com/sipeed/picoclaw/issues/1589) Telegram 多 Bot 冲突 | 同一群组多个 PicoClaw 实例时的重复回复问题，急需官方协调机制 |

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | Fix PR | 状态 |
|:---|:---|:---|:---:|:---|
| 🔴 **High** | [#1611](https://github.com/sipeed/picoclaw/issues/1611) | Gemini 作为非首模型时 fallback 失效 | [#1619](https://github.com/sipeed/picoclaw/pull/1619) | 🩹 已提交 |
| 🔴 **High** | [#1578](https://github.com/sipeed/picoclaw/issues/1578) | `image_model` 配置被忽略，图像始终路由至主模型 | [#1616](https://github.com/sipeed/picoclaw/pull/1616) | 🩹 已提交 |
| 🟡 **Medium** | [#1582](https://github.com/sipeed/picoclaw/issues/1582) | 多 Agent 配置下 `model 'xxx' not found` 错误 | — | ⏳ 待修复 |
| 🟡 **Medium** | [#1574](https://github.com/sipeed/picoclaw/issues/1574) | `prompt_cache_key` 相关错误 | — | ⏳ 待调查 |
| 🟢 **Low** | [#1455](https://github.com/sipeed/picoclaw/issues/216) | Telegram 长轮询断开后无法重连 | [#1455](https://github.com/sipeed/picoclaw/pull/1455) | ✅ 已修复（PR 待合并） |

---

## 6. 功能请求与路线图信号

### 已有关键 PR 支撑，高概率纳入 v0.2.3+

| 功能 | Issue/PR | 信号强度 | 说明 |
|:---|:---|:---:|:---|
| 模型原生搜索 (OpenAI/Codex) | [#1618](https://github.com/sipeed/picoclaw/pull/1618) | ⭐⭐⭐⭐⭐ | PR 已提交，直接响应 #1498 诉求 |
| `image_model` 配置生效 | [#1616](https://github.com/sipeed/picoclaw/pull/1616) | ⭐⭐⭐⭐⭐ | 修复 PR 已就绪 |
| Agent Steering 实时干预 | [#1517](https://github.com/sipeed/picoclaw/pull/1517) | ⭐⭐⭐⭐⭐ | **已合并** |
| Telegram 群组观察模式 | [#1591](https://github.com/sipeed/picoclaw/issues/1591) | ⭐⭐⭐⭐☆ | 架构设计清晰，社区需求明确 |

### 中长期路线图信号

| 功能 | Issue | 难度 | 社区热度 |
|:---|:---|:---:|:---:|
| 自主浏览器自动化 | [#293](https://github.com/sipeed/picoclaw/issues/293) | 高 | 🔥🔥🔥🔥 |
| FastEmbed 向量检索 | [#1498](https://github.com/sipeed/picoclaw/issues/1498) | 中 | 🔥🔥🔥 |
| Mattermost 通道支持 | [#1587](https://github.com/sipeed/picoclaw/issues/1587) | 中 | 🔥🔥 |
| Cron 时区支持 | [#1623](https://github.com/sipeed/picoclaw/issues/1623) | 低 | 🔥🔥 |

---

## 7. 用户反馈摘要

### 💬 真实痛点提炼

> **"Gemini 作为备胎时完全失效"** — @toocoldcc  
> 多模型 fallback 链的可靠性是生产部署核心诉求，当前 provider 级冷却机制导致"全链雪崩"

> **"image_model 配置形同虚设"** — @fernandostahelin  
> 视觉模型路由的隐性失败，用户难以调试发现

> **"两个 Bot 在同一群里互相抢答"** — @SebastianBoehler  
> 多实例部署场景下的协调机制缺失，企业级使用受阻

> **"UTC 时区让我算到凌晨"** — @leonelcc（葡语反馈）  
> 国际化用户体验细节：Cron 调度需要本地化时区支持

### ✅ 满意度信号

- #1517 Agent Steering 的快速合并显示维护者对"用户干预权"的重视
- 夜间构建持续发布，迭代节奏透明

### ⚠️ 风险信号

- **0% Issues 关闭率**：16 条活跃 Issues 今日 0 关闭，积压风险上升
- 多通道（Telegram/企业微信/QQ）并行开发，维护带宽分散

---

## 8. 待处理积压

### ⏰ 需维护者关注的重要事项

| 类型 | 条目 | 天数 | 风险 |
|:---|:---|:---:|:---|
| **架构提案** | [#1316](https://github.com/sipeed/picoclaw/issues/1316) Agent 事件驱动重构 | 6 | 技术债务累积，社区期待路线图回应 |
| **路线图功能** | [#293](https://github.com/sipeed/picoclaw/issues/293) 浏览器自动化 | 28 | 高优先级标签，需技术选型决策 |
| **安全加固** | [#1621](https://github.com/sipeed/picoclaw/issues/1621) 禁用 `exec` 工具选项 | 1 | 安全敏感，建议优先评估 |
| **依赖安全** | [#1588](https://github.com/sipeed/picoclaw/issues/1588) 启用 Dependabot | 1 | 低成本高回报，可快速落地 |

---

*本日报基于 GitHub 公开数据生成，时间窗口：2026-03-15 00:00 - 24:00 UTC*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 | 2026-03-16

## 1. 今日速览

NanoClaw 昨日呈现**高活跃度爆发态势**：24小时内 Issues 更新 16 条（14 条活跃/新开）、PR 更新 37 条（33 条待审），无新版本发布。社区焦点集中在**多模型支持诉求**（#80 获 44 👍）、**Apple Container 兼容性攻坚**（4 条关联 Issue/PR 同日涌现），以及**容器安全与凭证管理**的系统性修复。项目处于功能快速迭代期，但 Apple Silicon 原生容器方案暴露的底层架构问题需要维护者优先响应。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 已合并/关闭 PR（4 条）

| PR | 作者 | 状态 | 进展说明 |
|:---|:---|:---|:---|
| — | — | — | 昨日无显著合并记录，4 条 PR 状态变更以关闭为主 |

**关键推进方向**：33 条待审 PR 中，**Apple Container 修复集群**（#1107-#1110）形成系统性解决方案，**API 用量追踪**（#1111）和**Proton Mail 集成**（#1117）进入代码审查阶段。

---

## 4. 社区热点

### 🔥 最高热度：多模型支持诉求

**[#80 Support runtime(s) other than Claude](https://github.com/qwibitai/nanoclaw/issues/80)**  
- **数据**：22 评论 | 44 👍 | 持续 6 周活跃  
- **核心诉求**：Anthropic 正在封禁 OpenClaw 用户的订阅，社区强烈要求支持 OpenCode、Codex、Gemini 等替代方案以避免供应商锁定  
- **信号**：这是项目**架构层面的战略议题**，需维护者明确路线图

### 🔧 技术攻坚：Apple Container 兼容性

| Issue/PR | 严重度 | 核心问题 |
|:---|:---|:---|
| [#1103](https://github.com/qwibitai/nanoclaw/issues/1103) | High | 网络层：`host.docker.internal` 解析失败，凭证代理绑定地址硬编码 127.0.0.1 |
| [#1104](https://github.com/qwibitai/nanoclaw/issues/1104) | High | 安全层：`.env` shadow mount 使用 `/dev/null` 被 Apple Container 拒绝 |
| [#1105](https://github.com/qwibitai/nanoclaw/issues/1105) | High | 凭证层：macOS Keychain 存储的 GH_TOKEN 容器内不可访问 |
| [#1106](https://github.com/qwibitai/nanoclaw/issues/1106) | Low | 测试层：container-runtime 测试断言与实现不匹配 |

**@spencer-whitman** 同日提交 4 条配套修复 PR（#1107-#1110），形成完整解决方案，体现社区自组织协作效率。

---

## 5. Bug 与稳定性

| 优先级 | Issue | 状态 | 问题描述 | Fix PR |
|:---|:---|:---|:---|:---|
| **High** | [#1088](https://github.com/qwibitai/nanoclaw/issues/1088) | 🆕 新开 | **日志膨胀**：5 天产生 27GB `nanoclaw.log`，缺乏轮转机制 | 无 |
| **High** | [#1103](https://github.com/qwibitai/nanoclaw/issues/1103) | 🆕 新开 | Apple Container 网络隔离导致容器无法访问主机代理 | [#1109](https://github.com/qwibitai/nanoclaw/pull/1109) |
| **High** | [#1104](https://github.com/qwibitai/nanoclaw/issues/1104) | 🆕 新开 | `.env` shadow mount 安全机制与 Apple Container 不兼容 | [#1107](https://github.com/qwibitai/nanoclaw/pull/1107) |
| **High** | [#1105](https://github.com/qwibitai/nanoclaw/issues/1105) | 🆕 新开 | `gh` CLI OAuth token 存储在 macOS Keychain 导致容器内认证失败 | [#1108](https://github.com/qwibitai/nanoclaw/pull/1108) |
| **High** | [#973](https://github.com/qwibitai/nanoclaw/issues/973) | 活跃 | 初始化配置流程过于复杂，耗时过长 | 无 |
| Medium | [#957](https://github.com/qwibitai/nanoclaw/issues/957) | 活跃 | 建议官方支持 Podman 作为 Docker 替代 | 无 |
| Low | [#1097](https://github.com/qwibitai/nanoclaw/issues/1097) | 🆕 新开 | 时间戳缺少星期信息导致 AI 日期推理错误 | [#1098](https://github.com/qwibitai/nanoclaw/pull/1098) |
| Low | [#1106](https://github.com/qwibitai/nanoclaw/issues/1106) | 🆕 新开 | 容器运行时测试断言过时 | [#1110](https://github.com/qwibitai/nanoclaw/pull/1110) |

**风险评估**：#1088 日志膨胀问题尚无修复，可能影响长期运行稳定性；Apple Container 三高危问题已有完整 PR 集群待审。

---

## 6. 功能请求与路线图信号

| 需求 | Issue/PR | 成熟度 | 纳入可能性 |
|:---|:---|:---|:---|
| **多 LLM 运行时支持** | [#80](https://github.com/qwibitai/nanoclaw/issues/80) | 🔥 社区强需求（44👍） | **高** — 需架构层面决策 |
| **FTS5 对话索引与搜索** | [#908](https://github.com/qwibitai/nanoclaw/issues/908) | 有技术方案描述 | 中高 — 增强 Agent 记忆能力 |
| **Chrome CDP 浏览器中继** | [#832](https://github.com/qwibitai/nanoclaw/issues/832) | 有社区实现 PoC（5👍） | 中高 — 解决 reCAPTCHA 绕过 |
| **API 用量追踪** | [#1111](https://github.com/qwibitai/nanoclaw/pull/1111) | PR 已提交待审 | **高** — 企业场景刚需 |
| **Proton Mail 集成** | [#1117](https://github.com/qwibitai/nanoclaw/pull/1117) | PR 已提交待审 | **高** — 隐私友好邮件方案 |
| **非 Agentic 安装方式** | [#1116](https://github.com/qwibitai/nanoclaw/issues/1116) | 🆕 新开 | 中 — 降低信任门槛 |
| **Time MCP 技能** | [#1114](https://github.com/qwibitai/nanoclaw/pull/1114) | PR 已提交待审 | 高 — 时区/日期计算工具 |
| **贡献技能指南** | [#1113](https://github.com/qwibitai/nanoclaw/pull/1113) | PR 已提交待审 | 高 — 生态建设基础设施 |

**路线图信号**：项目正从"Claude Code 封装"向**多模型、多平台、企业级**方向演进，但 #1116 反映的"必须信任并运行主机 Agent 才能安装"问题可能阻碍采用。

---

## 7. 用户反馈摘要

### 😤 痛点与摩擦

| 来源 | 反馈 | 场景 |
|:---|:---|:---|
| [#1080](https://github.com/qwibitai/nanoclaw/issues/1080) | "九小时后想把 Mac 扔进 Sprite 再撞向车流" | 沙箱迁移文档缺失，目录访问权限配置时机不明确 |
| [#973](https://github.com/qwibitai/nanoclaw/issues/973) | "初始化为什么这么复杂，JSON 文件解决不了？" | 配置流程过度工程化 |
| [#1116](https://github.com/qwibitai/nanoclaw/issues/1116) | "安装说明 literally 是在主机上运行这个 AI Agent" | 安全敏感用户拒绝主机级信任 |
| [#1088](https://github.com/qwibitai/nanoclaw/issues/1088) | 27GB 日志无告警 | 运维可观测性缺失 |

### ✅ 认可与价值

- **容器安全模型**受认可：#1116 作者明确表示"被 containers/security/simplicity 吸引"
- **实际生产力工具**：#1080 用户承认"nanoclaw was super useful in the container"

### 🔮 需求演进

- **供应商多元化**：#80 反映的 Anthropic 封禁风险驱动替代方案需求
- **Apple Silicon 原生**：Apple Container 系列问题显示 M 系列 Mac 用户群体扩大

---

## 8. 待处理积压

### ⚠️ 需维护者关注

| Issue/PR | 年龄 | 状态 | 风险 |
|:---|:---|:---|:---|
| [#80](https://github.com/qwibitai/nanoclaw/issues/80) 多模型支持 | 6 周 | 44👍，无官方回应 | **架构债务** — 延迟决策将加剧迁移成本 |
| [#411](https://github.com/qwibitai/nanoclaw/issues/411) 间接提示注入安全文档 | 3 周 | `good first issue`，无 PR | 安全风险披露不足 |
| [#496](https://github.com/qwibitai/nanoclaw/pull/496) Things 3 技能 | 2.5 周 | `WIP` + `Pending Closure` | 贡献者流失风险 |
| [#932](https://github.com/qwibitai/nanoclaw/pull/932) Gen tech agency | 6 天 | `Blocked` | 阻塞原因未明确 |

### 📊 健康度指标

| 指标 | 数值 | 评估 |
|:---|:---|:---|
| PR 审查队列 | 33 条待审 | ⚠️ 偏高，需加速流转 |
| Issue 关闭率 | 12.5% (2/16) | 偏低，以新开为主 |
| 社区自修复 | 4 条 Apple Container PR 集群 | ✅ 积极信号 |
| 外部贡献者活跃度 | 高（多技能 PR 并行） | ✅ 生态健康 |

---

**日报生成时间**：2026-03-16  
**数据来源**：GitHub API / qwibitai/nanoclaw

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 | 2026-03-16

## 1. 今日速览

NullClaw 今日呈现**高强度维护态势**：过去24小时内完成 **15 个 Issue 关闭** 与 **22 个 PR 合并/关闭**，活跃贡献者集中在安全加固、HTTP 工具层重构和 Telegram 渠道稳定性修复。核心开发者 @manelsen 与 @lighterEB 主导了今日大部分关键修复，项目代码质量与安全性显著提升。无新版本发布，但主分支已累积大量生产就绪的改进。

---

## 2. 版本发布

**无新版本发布**（v0.x.x 保持冻结）

> 注：尽管今日无版本标签，但主干分支已包含多项关键修复，建议关注者跟踪 nightly 构建或等待维护者打 tag。

---

## 3. 项目进展

### 🔒 安全与可靠性（4 项核心修复）

| PR | 说明 | 关联 Issue |
|:---|:---|:---|
| [#572](https://github.com/nullclaw/nullclaw/pull/572) | **工具调用去重机制**：防止 LLM 重复执行相同工具调用导致的无限循环与费用浪费 | #569 |
| [#537](https://github.com/nullclaw/nullclaw/pull/537) | **强制机密加密**：`secrets.encrypt=true` 成为强制要求，拒绝明文存储启动 | — |
| [#531](https://github.com/nullclaw/nullclaw/pull/531) | **等时令牌验证**：抵御针对 Bearer Token 的时序攻击 | — |
| [#526](https://github.com/nullclaw/nullclaw/pull/526) | **SSRF 与 HTTPS 策略修复**：允许列表绕过 SSRF 保护，强制 HTTPS-only | #393, #517 |

### 🌐 HTTP 工具层重构完成（3 项）

| PR | 说明 |
|:---|:---|
| [#560](https://github.com/nullclaw/nullclaw/pull/560) | 移除 `std.http.Client` 迁移遗留的死代码 |
| [#543](https://github.com/nullclaw/nullclaw/pull/543) | 修复 `redactHeadersForDisplay` 内存所有权不一致 |
| [#561](https://github.com/nullclaw/nullclaw/pull/561) | 将 curl 退出码映射为可操作的网络错误提示（DNS/连接/超时/TLS） |

### 📱 Telegram 渠道稳定性（2 项）

| PR | 说明 | 关联 Issue |
|:---|:---|:---|
| [#548](https://github.com/nullclaw/nullclaw/pull/548) | 媒体处理失败时保留附件上下文，避免语音/文件消息静默丢失 | #503 |
| [#530](https://github.com/nullclaw/nullclaw/pull/530) | 持久化 `/think`, `/verbose`, `/reasoning` 等运行时设置 | #525 |

### 📚 文档与生态

| PR | 说明 | 关联 Issue |
|:---|:---|:---|
| [#547](https://github.com/nullclaw/nullclaw/pull/547) | 新增子代理路由与 AIEOS 身份配置完整文档 | #508 |
| [#528](https://github.com/nullclaw/nullclaw/pull/528) | 新增 Discord 渠道完整配置指南 | — |
| [#524](https://github.com/nullclaw/nullclaw/pull/524) | 自动发现 Qwen CLI OAuth 凭证（`~/.qwen/oauth_creds.json`）| #492 |

### 🐛 其他关键修复

- [#515](https://github.com/nullclaw/nullclaw/pull/515): 网关端口冲突提前检测与优雅退出
- [#567](https://github.com/nullclaw/nullclaw/pull/567): 修复 MCP 工具在 A2A 会话中未初始化的回归
- [#570](https://github.com/nullclaw/nullclaw/pull/570): 阻止孤立的 `</tool_call>` 标签泄露到用户可见回复

---

## 4. 社区热点

### 最受关注的开放 Issue

| Issue | 热度指标 | 核心诉求 |
|:---|:---|:---|
| [#192](https://github.com/nullclaw/nullclaw/issues/192) | 创建 15 天，2 评论，👍1 | **消除外部依赖**：用 Zig 原生 `std.http.Client` 替代 curl，用 WASM runtime 替代 wasmtime 子进程。反映社区对零依赖、静态二进制文件的强烈需求 |
| [#427](https://github.com/nullclaw/nullclaw/issues/427) | 创建 5 天，1 评论 | **自定义技能不可用**：技能已注册但代理无法调用，疑似工具发现机制缺陷 |
| [#473](https://github.com/nullclaw/nullclaw/issues/473) | 创建 3 天，1 评论 | **README 基准数据过时**：二进制体积、内存占用等宣传数据与实际不符，存在误导风险 |
| [#576](https://github.com/nullclaw/nullclaw/issues/576) | 创建 1 天，👍0 | **Moonshot kimi-k2.5 解析失败**：`reasoning_content` 字段导致 API 错误，提供商适配层需更新 |

### 讨论焦点分析

- **#192 的深层信号**：用户对"Zig 原生"承诺的期待与实际 curl 依赖的张力，可能需要在性能（curl 更成熟）与纯粹性（Zig 原生）之间明确项目立场。
- **#473 的信任风险**：营销数据与实际性能差距若被竞争对手放大，可能损害项目公信力，建议优先修复。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 状态 | 修复 PR | 说明 |
|:---|:---|:---|:---|:---|
| 🔴 **高** | [#569](https://github.com/nullclaw/nullclaw/issues/569) | ✅ 已关闭 | #572 | 重复工具执行 + Telegram 内部标记泄露，已修复 |
| 🔴 **高** | [#576](https://github.com/nullclaw/nullclaw/issues/576) | ⏳ 开放 | — | Moonshot 新模型解析失败，无 fix |
| 🟡 **中** | [#427](https://github.com/nullclaw/nullclaw/issues/427) | ⏳ 开放 | — | 自定义技能注册但不可用，影响扩展生态 |
| 🟡 **中** | [#565](https://github.com/nullclaw/nullclaw/issues/565) | ✅ 已关闭 | — | WebSocket 1024 字节握手限制，反向代理场景已修复 |
| 🟡 **中** | [#514](https://github.com/nullclaw/nullclaw/issues/514) | ✅ 已关闭 | #515 | 网关端口冲突静默失败 |
| 🟢 **低** | [#525](https://github.com/nullclaw/nullclaw/issues/525) | ✅ 已关闭 | #530 | 运行时设置丢失，已持久化 |

### 今日回归风险
- **MCP 工具可用性**（#567 已修复）：A2A 会话中 MCP 工具未初始化，影响 WebDAV/Vikunja 等集成
- **内存安全**（#543 已修复）：`redactHeadersForDisplay` 的无效释放潜在崩溃

---

## 6. 功能请求与路线图信号

| Issue/PR | 类型 | 纳入可能性 | 分析 |
|:---|:---|:---|:---|
| [#571](https://github.com/nullclaw/nullclaw/pull/571) | 热重载配置与技能 | ⭐⭐⭐⭐⭐ | **已开放 PR**，实现 `/reload config` 和 `/reload skills`，极大提升开发体验，预计下一版本合并 |
| [#575](https://github.com/nullclaw/nullclaw/issues/575) | z.ai/glm-5 原生工具支持 | ⭐⭐⭐⭐☆ | 硬编码 `native_tools=false` 阻止工具调用，用户已提供证据表明支持，修复成本低 |
| [#297](https://github.com/nullclaw/nullclaw/pull/297) | 按对等端自动配置与隔离运行时 | ⭐⭐⭐☆☆ | 大型功能 PR，创建 12 天仍在开放，涉及身份验证流程，需更多 review |
| [#558](https://github.com/nullclaw/nullclaw/pull/558) | 子代理技能注入 | ⭐⭐⭐⭐☆ | **开放 PR**，解决 #427 相关问题，确保委派子代理可访问父代理技能 |
| [#192](https://github.com/nullclaw/nullclaw/issues/192) | 零外部依赖 | ⭐⭐☆☆☆ | 架构级变更，与当前 curl 路线冲突，可能长期搁置或作为实验分支 |
| [#541](https://github.com/nullclaw/nullclaw/pull/541) | 可配置 HTTP 超时 | ⭐⭐⭐⭐☆ | **开放 PR**，解决子代理与 `http_request` 硬编码超时问题 |

---

## 7. 用户反馈摘要

### 😊 满意点
- **子代理功能受认可**：#508 用户明确称赞 "Subagents is a really great feature!"，但急需文档
- **OAuth 自动发现**：Qwen 与 Gemini 的 CLI 凭证自动读取被用户视为优雅设计（#492）

### 😤 痛点与摩擦

| 场景 | 反馈来源 | 具体问题 |
|:---|:---|:---|
| **容器化部署** | #393 | SSRF 保护阻止访问本地 SearXNG 实例，需手动禁用保护 |
| **多代理共存** | #506 | 同服务器其他代理正常，NullClaw 独现"Network error"，诊断信息不足 |
| **WhatsApp 集成** | #574 | 配置要求存在但零文档，用户被迫读源码找线索 |
| **入门体验** | #493 | `yolo` 自治模式在引导流程中缺失，强制选择覆盖现有配置 |
| **基准信任** | #473 | 宣传的"1MB 二进制、1MB 内存"与实际不符，引发争议担忧 |

### 💡 隐含需求
- **更好的错误诊断**：网络错误、工具调用失败时，用户需要 actionable 的下一步指导而非通用提示
- **渠道文档补齐**：Discord 刚补完（#528），WhatsApp、Slack 等仍缺失

---

## 8. 待处理积压

### ⚠️ 需要维护者关注（>7 天无响应或高影响）

| Issue/PR | 年龄 | 风险 | 建议行动 |
|:---|:---|:---|:---|
| [#192](https://github.com/nullclaw/nullclaw/issues/192) | 15 天 | 路线分歧 | 明确回应：是否接受 curl 依赖为长期方案，或制定迁移路线图 |
| [#297](https://github.com/nullclaw/nullclaw/pull/297) | 12 天 | 大型 PR 腐烂 | 安排架构 review，或拆分合并 |
| [#427](https://github.com/nullclaw/nullclaw/issues/427) | 5 天 | 扩展生态阻塞 | 优先诊断技能发现机制，关联 #558 |
| [#473](https://github.com/nullclaw/nullclaw/issues/473) | 3 天 | 信任风险 | 快速修复 README 或发布澄清声明 |
| [#574](https://github.com/nullclaw/nullclaw/issues/574) | 1 天 | 新用户流失 | 复制 #528 Discord 文档模式，快速补齐 WhatsApp 指南 |

---

**报告生成时间**：2026-03-16  
**数据基准**：github.com/nullclaw/nullclaw 过去 24 小时公开活动

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 | 2026-03-16

> **项目定位**：NEAR AI 开源的 AI 智能体与个人 AI 助手运行时框架

---

## 1. 今日速览

IronClaw 今日呈现**高强度开发态势**，单日 50 个 PR 更新（25 待合并/25 已处理）、26 个 Issues 更新（19 活跃/7 关闭），核心贡献者 @ilblackdragon 单日批量创建 12 个工程化改进 Issue，标志着项目从功能建设转向**可靠性工程深化**阶段。关键进展包括：飞书通道编译修复落地、Anthropic OAuth 令牌持久化问题修复、事件触发路由 bug 修复。值得关注的是，@ilblackdragon 发起的"火星车级可靠性"专项（Mars-rover reliability）系统性引入了形式化验证、混沌测试、突变测试等高级工程实践，项目质量基建进入新阶段。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 已合并/关闭的关键 PR

| PR | 作者 | 核心贡献 | 关联 Issue |
|:---|:---|:---|:---|
| [#1204](https://github.com/nearai/ironclaw/pull/1204) | @reidliu41 | **飞书/Lark 通道编译修复** — 解决 WASM 绑定不匹配、宏替换、参数类型转换问题 | #1200 |
| [#1190](https://github.com/nearai/ironclaw/pull/1190) | @reidliu41 | **安全模块对抗性测试** — 新增 ReDoS、Unicode 规范化攻击、控制字符注入等 100+ 测试用例 | #1025 |
| [#1195](https://github.com/nearai/ironclaw/pull/1195) | @ilblackdragon | **安全加固：防止元数据伪造** — 内部任务监控标志改为编译期不可伪造的 `is_internal` 字段 | — |
| [#1194](https://github.com/nearai/ironclaw/pull/1194) | @ilblackdragon | **安全加固：隧道激活时 webhook 默认绑定回环地址** — 消除 `0.0.0.0` 暴露面 | — |
| [#1209](https://github.com/nearai/ironclaw/pull/1209) | @octo-patch | **文档更新**：README 补充 MiniMax 作为内置提供商 | — |
| [#1213](https://github.com/nearai/ironclaw/pull/1213) | @zmanian | **关键修复：Anthropic OAuth 令牌刷新后持久化** — 解决 #1136 间歇性认证失败 | #1136 |
| [#1211](https://github.com/nearai/ironclaw/pull/1211) | @zmanian | **关键修复：事件触发路由大小写敏感+user_id 过滤** — 解决 #1051 例程永不触发 | #1051 |
| [#1221](https://github.com/nearai/ironclaw/pull/1221) | @zmanian | **安全修复：Embedding 基础 URL SSRF 防护** — 验证 `OLLAMA_BASE_URL` 等用户输入 | #1103 |

### 里程碑意义

- **多语言通道稳定性**：飞书修复标志非英语企业市场通道完整性恢复
- **安全纵深防御**：单日 3 个安全 PR 覆盖认证、SSRF、元数据伪造三类攻击面
- **事件驱动架构可靠性**：大小写匹配修复解决长期存在的路由静默失败问题

---

## 4. 社区热点

### 高活跃度议题

| 议题 | 热度指标 | 核心诉求分析 |
|:---|:---|:---|
| [#80](https://github.com/nearai/ironclaw/issues/80) Multi-provider LLM support | 创建 2026-02-14，持续更新，3 评论 | **生态兼容性焦虑**：用户迫切需要 Ollama 本地推理、AWS Bedrock 企业部署、Gemini 多模态能力，当前仅支持 OpenAI/Anthropic 成为采用瓶颈 |
| [#1205](https://github.com/nearai/ironclaw/issues/1205) Slack tool fails to install | 新建即获关注，1 评论 | **扩展分发机制缺陷**：WASM 扩展下载 404 错误暴露发布流程与文件名生成不匹配，影响工具生态扩展 |
| [#1189](https://github.com/nearai/ironclaw/issues/1189) Custom Telegram commands via event-triggered routines | 社区自发分享的未文档化模式 | **高级用户探索欲 vs 文档缺口**：用户发现事件触发+full_job 组合可实现自定义命令，但缺乏官方文档确认稳定性 |

### 背后诉求洞察

- **企业部署场景**：Bedrock/Gemini 需求反映大企业对数据主权和现有云基础设施复用的硬性要求
- **本地优先用户**：Ollama 支持诉求与隐私敏感型用户群体增长相关
- **扩展开发者体验**：Slack 安装失败显示工具发布流程的自动化测试覆盖不足

---

## 5. Bug 与稳定性

### 今日报告/修复的 Bug

| 严重程度 | 问题 | 状态 | Fix PR |
|:---|:---|:---|:---|
| 🔴 **HIGH** | [#1141](https://github.com/nearai/ironclaw/issues/1141) `oauth_http_client()` 错误类型存储为 String 而非 `AuthError` — 类型安全破坏 | 已关闭（CI 自动发现） | 已修复 |
| 🟡 **MEDIUM** | [#1205](https://github.com/nearai/ironclaw/issues/1205) Slack 工具安装 404 | **OPEN** | 待调查 |
| 🟡 **MEDIUM** | [#1139](https://github.com/nearai/ironclaw/issues/1139) Safari IME 组合键 Enter 误触发消息发送（CJK 用户） | 已关闭 | 已修复 |
| 🟡 **MEDIUM** | [#1056](https://github.com/nearai/ironclaw/issues/1056) Agent 在认证对话框阻塞时仍显示可交互状态 | 已关闭 | 已修复 |
| 🟡 **MEDIUM** | [#1057](https://github.com/nearai/ironclaw/issues/1057) 认证报告成功但激活失败（无 token 时） | 已关闭 | 已修复 |
| 🟢 **LOW** | [#1059](https://github.com/nearai/ironclaw/issues/1059) 复制聊天文本保留白色字体导致白底应用不可见 | 已关闭 | 已修复 |
| 🟢 **LOW** | [#1200](https://github.com/nearai/ironclaw/issues/1200) 飞书通道无法编译 | 已关闭 | [#1204](https://github.com/nearai/ironclaw/pull/1204) |

### 稳定性信号

- **Bug Bash 成果显著**：P2 级交互问题批量关闭，用户体验打磨进入收尾
- **CI 自动化发现能力**：HIGH 级类型安全问题由 staging CI 自动捕获，显示静态分析有效性

---

## 6. 功能请求与路线图信号

### @ilblackdragon 批量发起的"可靠性工程"专项（12 个 Issue）

| Issue | 技术深度 | 信号解读 |
|:---|:---|:---|
| [#1225](https://github.com/nearai/ironclaw/issues/1225) TLA+ 形式化规范（状态机、熔断器、Agent 循环、故障转移） | 🔬 研究级 | 项目目标：**可证明正确性** 的 Agent 运行时 |
| [#1226](https://github.com/nearai/ironclaw/issues/1226) Kani 有界模型检测（关键算术防溢出） | 🔬 研究级 | Rust 形式化验证工具链引入 |
| [#1214](https://github.com/nearai/ironclaw/issues/1214) 基于属性的测试（proptest） | 工程最佳实践 | 从示例测试到生成式测试跃迁 |
| [#1222](https://github.com/nearai/ironclaw/issues/1222) 混沌测试场景 | 工程最佳实践 | 多组件故障注入能力 |
| [#1216](https://github.com/nearai/ironclaw/issues/1216) 突变测试（cargo-mutants） | 工程最佳实践 | 测试质量量化评估 |
| [#1229](https://github.com/nearai/ironclaw/issues/1229) 夜间模糊测试 CI | 工程最佳实践 | 持续回归防护 |
| [#1227](https://github.com/nearai/ironclaw/issues/1227) proptest 压力运行（1000+ 用例） | 工程最佳实践 | 稀有边缘案例捕获 |
| [#1228](https://github.com/nearai/ironclaw/issues/1228) Codecov 覆盖率门禁 | 工程最佳实践 | 质量基线强制 |
| [#1230](https://github.com/nearai/ironclaw/issues/1230) 状态机变更强制回归测试 | 工程最佳实践 | 变更风险管控 |
| [#1220](https://github.com/nearai/ironclaw/issues/1220) FaultInjector 测试框架 | 工程基础设施 | 可控故障模拟 |
| [#1219](https://github.com/nearai/ironclaw/issues/1219) SessionGuardTimer（锁跨 await 检测） | 并发安全 | Rust 异步陷阱防护 |
| [#1218](https://github.com/nearai/ironclaw/issues/1218) CostPermit 类型状态模式 | 编译期安全 | API 误用编译期阻止 |

### 路线图判断

> **核心信号**：IronClaw 正从"功能可用"向"生产就绪"战略转型，下一版本（推测 v0.9 或 v1.0-beta）将以**可靠性认证**为核心卖点，目标场景可能是金融、医疗等对 Agent 行为确定性要求极高的领域。

- **高概率纳入**：#1214 proptest、#1228 覆盖率门禁、#1220 FaultInjector（基础设施就绪快）
- **中长期布局**：#1225 TLA+、#1226 Kani（需要专门技能建设周期）

---

## 7. 用户反馈摘要

### 真实痛点

| 来源 | 痛点 | 场景 |
|:---|:---|:---|
| #1205 | 扩展安装失败无明确诊断 | 尝试集成 Slack 工作流的开发者 |
| #1139 | CJK 输入法用户体验断裂 | 中文/日文/韩文用户的日常交互 |
| #1056-1057 | 认证状态反馈不一致 | 首次配置 Telegram 通道的新用户 |
| #1059 | 跨应用内容复制体验差 | 从聊天界面导出数据到表格的办公场景 |
| #1189 | 高级功能发现依赖社区口口相传 | 希望深度定制 Telegram Bot 的开发者 |

### 满意信号

- 飞书通道快速修复（#1200 报告当日即有关闭 PR）显示多语言社区响应能力
- 安全测试增强（#1190）反映对生产环境安全性的重视获得认可

---

## 8. 待处理积压

### 需要维护者关注的长期议题

| Issue | 创建时间 | 状态 | 风险提示 |
|:---|:---|:---|:---|
| [#80](https://github.com/nearai/ironclaw/issues/80) Multi-provider LLM support | 2026-02-14（30 天+） | OPEN，3 评论 | **采用瓶颈**：企业用户因提供商限制无法评估项目 |
| [#712](https://github.com/nearai/ironclaw/pull/712) Self-repair stuck_threshold  wired | 2026-03-08 | OPEN，待合并 | 阻塞 #1223 等依赖 Issue，影响自愈功能完整性 |
| [#927](https://github.com/nearai/ironclaw/pull/927) Chat onboarding and routine advisor | 2026-03-11 | OPEN，XL 规模 | 用户体验核心功能，长期未合并影响首次体验 |
| [#1151](https://github.com/nearai/ironclaw/pull/1151) Owner scope refactor | 2026-03-13 | OPEN，XL 规模，HIGH risk | 跨通道数据一致性基础重构，影响 #994 等关键 bug |

### 建议行动

1. **#80 多提供商支持**：建议拆分 Ollama（P2，社区需求最迫切）、Bedrock/Gemini（P3）为独立子任务，分配里程碑
2. **#712 与 #1223 协调**：#1223 新提的 `stuck_threshold` 激活需求与 #712 实现存在重叠，需避免冲突
3. **XL 规模 PR 评审资源**：#927、#1151 需要专门评审窗口，建议设立"深度评审日"

---

*日报生成时间：2026-03-16 | 数据来源：GitHub API 快照*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 | 2026-03-16

---

## 1. 今日速览

LobsterAI 今日呈现**高强度开发迭代**态势，24小时内完成 **15 个 PR 的合并/关闭**，仅 2 个 PR 待审，开发吞吐量显著。核心团队正集中火力推进 **OpenClaw 引擎迁移**（从 Claude Agent SDK 切换），同时修复 IM 渠道、定时任务、MCP 等关键模块的稳定性问题。社区反馈暴露明显的**用户体验断层**：沙箱识别失败、MCP 配置困难、技能市场可用性存疑，用户质疑官方测试覆盖不足。项目处于技术架构转型的关键阵痛期。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 🔧 核心引擎与架构迁移
| PR | 作者 | 关键变更 |
|:---|:---|:---|
| [#403](https://github.com/netease-youdao/LobsterAI/pull/403) | @liuzhq1986 | **移除内置沙箱**，系统提示词精简后与 OpenClaw 默认提示词合并——标志项目正式弃用原有沙箱方案 |
| [#430](https://github.com/netease-youdao/LobsterAI/pull/430) | @liuzhq1986 | 为 Agent 身份设定添加默认模板；修复最近使用文件夹二级菜单 hover 消失过快 |

### 🐛 稳定性与 Bug 修复（批量修复日）
| PR | 作者 | 修复内容 |
|:---|:---|:---|
| [#432](https://github.com/netease-youdao/LobsterAI/pull/432) | @fisherdaddy | **MCP 不可用问题**——直接回应用户 #419 的配置困境 |
| [#433](https://github.com/netease-youdao/LobsterAI/pull/433) | @fisherdaddy | agents.md 被 system prompt 覆盖的问题 |
| [#423](https://github.com/netease-youdao/LobsterAI/pull/423) / [#421](https://github.com/netease-youdao/LobsterAI/pull/421) / [#422](https://github.com/netease-youdao/LobsterAI/pull/422) | @fisherdaddy | cowork & IM 侧定时任务修复（经历提交-回滚-再修复的波折） |
| [#426](https://github.com/netease-youdao/LobsterAI/pull/426) | @fisherdaddy | 减少 IM 任务历史的消息同步延迟 |
| [#425](https://github.com/netease-youdao/LobsterAI/pull/425) | @fisherdaddy | 批量启动 OpenClaw 平台，避免网关重复重启 |
| [#427](https://github.com/netease-youdao/LobsterAI/pull/427) / [#424](https://github.com/netease-youdao/LobsterAI/pull/424) / [#420](https://github.com/netease-youdao/LobsterAI/pull/420) | @liuzhq1986 | **IM 渠道用户消息丢失问题** |
| [#393](https://github.com/netease-youdao/LobsterAI/pull/393) | @fisherdaddy | IM 渠道连接性测试引发的 bug |
| [#396](https://github.com/netease-youdao/LobsterAI/pull/396) | @fisherdaddy | 应用启动时持续加载状态的问题 |

### 📬 企业功能增强
| PR | 作者 | 功能 |
|:---|:---|:---|
| [#431](https://github.com/netease-youdao/LobsterAI/pull/431) | @fisherdaddy | 定时任务投递优化：钉钉路由解析与缓存、频道历史同步 tail-overlap 策略、OpenClaw 运行时 cron 投递推理 |

**整体评估**：今日合并的 PR 显示项目正从"功能堆砌期"进入"架构整合期"，OpenClaw 迁移是首要战略，IM/定时任务/MCP 的密集修复表明这些模块此前存在系统性缺陷。

---

## 4. 社区热点

### 🔥 最高关注度 Issue
**[#417 Win11 试用问题汇总](https://github.com/netease-youdao/LobsterAI/issues/417)**  
- 作者：@yfeiy1984 | 6 项具体 bug/设计缺陷 | 创建 1 天内
- **核心诉求**：沙箱识别失败、本地软件控制失效、性能远低于 OpenClaw、技能市场 API 配置缺失、国外 IM 支持空白

**背后信号**：该 Issue 是一篇**系统性用户体验审计报告**，暴露了项目从安装部署到功能落地的全链条断层。用户明确对比竞品（阿里开源 Lobster、原版 OpenClaw），质疑官方测试流程——这对项目公信力构成直接挑战。

### 📚 文档缺口 Issue
**[#419 请求增加 MCP 配置教程](https://github.com/netease-youdao/LobsterAI/issues/419)**  
- 作者：@HsiYaTung | "今天在 sandbox 中折腾 MCP，没搞定"

**背后信号**：MCP 作为核心扩展机制，配置文档缺失导致用户卡壳。值得注意的是，团队同日即合并 [#432](https://github.com/netease-youdao/LobsterAI/pull/432) 修复 MCP 不可用问题，显示**文档与代码修复并行响应**。

### 🧭 战略方向质疑
**[#418 引擎切换方向澄清请求](https://github.com/netease-youdao/LobsterAI/issues/418)**  
- 作者：@lyb12358 | 关注 Claude Agent SDK 的维护承诺与切换动机

**背后信号**：用户捕捉到代码分支中的 OpenClaw 迁移迹象，担忧技术路线突变带来的沉没成本。该 Issue 目前零评论，需要官方正式回应。

---

## 5. Bug 与稳定性

| 严重程度 | 问题 | 来源 | Fix PR 状态 |
|:---|:---|:---|:---|
| 🔴 **高** | MCP 功能完全不可用 | #417 用户报告 + #419 配置困难 | ✅ [#432](https://github.com/netease-youdao/LobsterAI/pull/432) 已合并 |
| 🔴 **高** | IM 渠道用户消息丢失 | 内部发现 | ✅ [#427](https://github.com/netease-youdao/LobsterAI/pull/427) 已合并 |
| 🔴 **高** | 定时任务在 cowork & IM 侧不起作用 | 内部发现 | ✅ [#423](https://github.com/netease-youdao/LobsterAI/pull/423) 已合并（经历回滚） |
| 🟡 **中** | 沙箱安装后无法识别/启用 | #417 用户报告 | ❓ 相关：[#403](https://github.com/netease-youdao/LobsterAI/pull/403) 移除内置沙箱——**可能为设计变更而非修复** |
| 🟡 **中** | 本地运行无法控制任何软件（浏览器自动化失效） | #417 用户报告 | ❌ 无直接对应 PR，需关注 |
| 🟡 **中** | 处理速度显著慢于 OpenClaw/竞品 | #417 用户报告 | ❌ 性能优化暂无 PR |
| 🟡 **中** | agents.md 被 system prompt 覆盖 | 内部发现 | ✅ [#433](https://github.com/netease-youdao/LobsterAI/pull/433) 已合并 |
| 🟢 **低** | 最近使用文件夹二级菜单 hover 消失过快 | 内部发现 | ✅ [#430](https://github.com/netease-youdao/LobsterAI/pull/430) 已合并 |

**关键观察**：#417 报告的 6 项问题中，仅 MCP 有明确修复，其余（沙箱、本地控制、性能、技能市场 API 配置、国外 IM）尚无对应 PR，存在**修复覆盖缺口**。

---

## 6. 功能请求与路线图信号

| 需求 | 来源 | 可行性评估 |
|:---|:---|:---|
| **LM Studio 模型提供商支持** | [#428](https://github.com/netease-youdao/LobsterAI/pull/428) @mvanhorn 待审 PR | 🔜 **高概率纳入**——完整实现（图标、i18n、OpenAI 兼容 API），符合本地模型部署趋势 |
| **中文路径编码修复（workingDirectory）** | [#429](https://github.com/netease-youdao/LobsterAI/pull/429) @mvanhorn 待审 PR | 🔜 **高概率纳入**——Windows 场景关键修复，技术方案详实 |
| 国外 IM 配置入口（Slack/Teams/Discord 等） | #417 用户反馈 | 📋 **待评估**——与当前企业微信/钉钉聚焦策略存在张力 |
| 技能市场 API 配置界面优化 | #417 用户反馈 | 📋 **待评估**——需重构技能安装流程 |
| MCP 官方配置教程 | #419 用户请求 | 📝 **文档任务**——建议与 #432 修复同步发布 |

---

## 7. 用户反馈摘要

### 😤 核心痛点（来自 #417）
> *"沙箱安装以后无法识别和启用，重复安装也不行"*

> *"技能市场安装了处理图片的谷歌香蕉图片生成模型...没有填写 api key 的地方，说明市场很多技能都是无法使用的，**怀疑官方自己都没使用和测试过**"*

> *"处理速度比其它龙虾，包括阿里开源龙虾也都要慢"*

> *"不支持国外 IM，没有国外 IM 配置入口"*

### 😵 配置困境（来自 #419）
> *"今天在 sandbox 中折腾 MCP，没搞定"*

### 🔍 关键洞察
- **测试公信力危机**：用户明确质疑官方测试流程，技能市场"装而不用"的设计暴露严重的产品-工程脱节
- **性能基准焦虑**：用户主动对比阿里开源 Lobster 和原版 OpenClaw，LobsterAI 处于劣势
- **国际化缺口**：企业级用户需要国外 IM 支持，当前仅聚焦国内生态（钉钉、企业微信）

---

## 8. 待处理积压

| 项目 | 状态 | 风险提示 |
|:---|:---|:---|
| [#418 引擎切换方向澄清](https://github.com/netease-youdao/LobsterAI/issues/418) | 🔴 **0 评论，0 官方回应** | 战略透明度缺失，社区信任损耗 |
| [#417 多问题汇总](https://github.com/netease-youdao/LobsterAI/issues/417) | 🟡 部分修复（MCP），其余待响应 | 用户可能因响应不全而流失 |
| [#428 LM Studio 支持](https://github.com/netease-youdao/LobsterAI/pull/428) | 🟡 待合并（已提交 1 天） | 本地模型部署是竞品差异化重点 |
| [#429 中文路径编码](https://github.com/netease-youdao/LobsterAI/pull/429) | 🟡 待合并（已提交 1 天） | Windows 用户基础体验问题 |

**维护者行动建议**：
1. 优先回应 #418，明确 OpenClaw 迁移路线图与 Claude Agent SDK 的维护承诺
2. 针对 #417 未修复项（沙箱替代方案、本地控制、性能、技能市场）给出 issue 拆分或修复时间表
3. 加速审查 #428/#429，两者均为社区贡献的高质量 PR

---

*日报生成时间：2026-03-16*  
*数据来源：netease-youdao/LobsterAI GitHub 仓库*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

# TinyClaw 项目动态日报 | 2026-03-16

> **项目**: TinyAGI/tinyclaw | **分析周期**: 过去24小时 | **数据源**: GitHub API

---

## 1. 今日速览

TinyClaw 今日保持**中等活跃度**，6条 PR 更新显示核心团队持续迭代。值得关注的是 **2个稳定性修复 PR**（#218、#219）针对生产环境关键问题——守护进程重启安全性和僵尸进程清理，表明项目正从功能扩展转向可靠性加固。Google Gemini 支持（#217）和 Web 端配置能力（#214）两大功能特性仍在 review 阶段。今日无 Issue 活动，社区反馈渠道相对静默。

**健康度评估**: 🟡 稳定发展期 —— 代码活跃但需关注社区互动不足

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 今日合并/关闭 PR（2条）

| PR | 作者 | 核心贡献 | 项目推进 |
|:---|:---|:---|:---|
| [#215](https://github.com/TinyAGI/tinyclaw/pull/215) | @jlia0 | **Agent 系统提示词支持** — CLI 与 API 新增 `system_prompt` 参数，创建 Agent 时自动写入 `AGENTS.md` | ⭐ 提升 Agent 可配置性，为个性化 AI 助手工作流奠基 |
| [#216](https://github.com/TinyAGI/tinyclaw/pull/216) | @jlia0 | **品牌识别增强** — CLI 新增 TINYAGI ASCII 横幅，覆盖 help、daemon 启动等关键交互点 | 改善开发者体验，强化项目辨识度 |

**整体进展**: 今日合并聚焦**开发者体验**与**Agent 配置灵活性**，属于中期能力建设，未涉及架构级变更。

---

## 4. 社区热点

> ⚠️ **数据说明**: 今日所有 PR 评论数均为 0，👍 反应均为 0，社区讨论度极低。

**潜在热点追踪**（基于 PR 内容重要性）:

| PR | 热度预判 | 背后诉求分析 |
|:---|:---|:---|
| [#214](https://github.com/TinyAGI/tinyclaw/pull/214) | 🔥 高 | **Headless 部署需求** — `--skip-setup` 标志和 Web 配置页反映用户希望 TinyClaw 支持无交互启动、远程配置，契合云原生/容器化部署趋势 |
| [#217](https://github.com/TinyAGI/tinyclaw/pull/217) | 🔥 高 | **多模型生态扩展** — Gemini 支持填补 Google 模型空白，与现有 OpenAI/Anthropic 形成互补，满足企业用户模型选型灵活性需求 |

**社区信号**: 功能 PR 丰富但零评论，可能表明：(a) 核心团队主导开发，外部贡献者参与度低；(b) 变更文档清晰无需讨论；(c) 社区规模尚小。

---

## 5. Bug 与稳定性

### 🔴 高严重度（生产影响）

| PR | 问题 | 影响范围 | 状态 |
|:---|:---|:---|:---|
| [#219](https://github.com/TinyAGI/tinyclaw/pull/219) | **守护进程重启时配置验证顺序错误** — `restart_daemon()` 先停止旧进程再验证新配置，若 `settings.json` 损坏则导致服务完全中断 | 所有使用 `restart` 命令的部署 | **待合并** ⏳ |
| [#218](https://github.com/TinyAGI/tinyclaw/pull/218) | **僵尸 Agent 进程无法清理** — 挂起的 Claude/Codex 进程无限占用消息，队列循环重试但原进程存活，导致资源泄漏 | 长时运行任务场景 | **待合并** ⏳ |

### 修复优先级建议
- **#219** 应优先合并：配置错误导致的服务中断属于典型的运维事故诱因
- **#218** 建议配合监控告警：5分钟超时机制需文档化，避免用户误判为"正常延迟"

---

## 6. 功能请求与路线图信号

### 进行中功能（待合并 PR）

| PR | 功能 | 纳入下一版本概率 | 判断依据 |
|:---|:---|:---|:---|
| [#214](https://github.com/TinyAGI/tinyclaw/pull/214) | Web 端初始配置 + 自定义 API URL | ⭐⭐⭐⭐⭐ 极高 | 作者 @jlia0 为核心维护者，功能完整（CLI flag + Web UI + 持久化），解决部署痛点 |
| [#217](https://github.com/TinyAGI/tinyclaw/pull/217) | Google Gemini 模型支持 | ⭐⭐⭐⭐☆ 高 | 多提供商战略关键拼图，但需 review 模型列表准确性（涉及废弃模型清理） |

### 路线图推断
- **短期（1-2周）**: 稳定性修复 (#218, #219) + Web 配置 (#214)  likely 构成 v0.x.1 版本
- **中期（1月）**: Gemini 支持 (#217) 可能伴随 broader 提供商重构发布

---

## 7. 用户反馈摘要

> **数据局限**: 今日 0 条 Issue 更新，0 条 PR 评论，无法提取直接用户反馈。

**间接信号推断**:

| 来源 | 推断痛点/场景 | 置信度 |
|:---|:---|:---|
| PR #219 存在 | 用户曾遭遇配置错误导致服务中断的生产事故 | 中 |
| PR #218 存在 | 长时任务（如代码生成、文档处理）场景下进程管理不稳定 | 中 |
| PR #214 动机 | 用户反馈初始设置流程阻碍自动化部署 | 高 |
| 零 Issue 活动 | 或：产品稳定用户满意；或：用户基数小反馈渠道未建立 | 低 |

**建议**: 维护团队可考虑在 README 增设反馈入口，或主动在 Discord/Slack 收集使用场景。

---

## 8. 待处理积压

> **当前积压状态**: 4 个 Open PR 平均创建时间 1.5 天，无长期滞留项。

### 需维护者关注

| PR | 创建时间 | 阻塞原因 | 建议行动 |
|:---|:---|:---|:---|
| [#219](https://github.com/TinyAGI/tinyclaw/pull/219) | 2026-03-15 | 待 review | **优先合并** — 生产稳定性修复 |
| [#218](https://github.com/TinyAGI/tinyclaw/pull/218) | 2026-03-15 | 待 review | 合并前确认超时机制可配置 |
| [#214](https://github.com/TinyAGI/tinyclaw/pull/214) | 2026-03-14 | 待 review | 评估与现有配置系统的兼容性 |
| [#217](https://github.com/TinyAGI/tinyclaw/pull/217) | 2026-03-14 | 待 review | 核实 Gemini 模型版本时效性 |

---

## 附录：今日数据全景

```
Issues:  0 更新 (0 新开 / 0 关闭)
PRs:     6 更新 (4 待合并 / 2 已关闭)
Releases: 0
贡献者:  3 人活跃 (@jcenters ×2, @jlia0 ×2, @RomuloGatto ×1)
```

---

*日报生成时间: 2026-03-16*  
*数据来源: GitHub REST API*  
*分析模型: TinyClaw Project Intelligence v1.0*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目日报 · 2026-03-16

> **项目**: [moltis-org/moltis](https://github.com/moltis-org/moltis)  
> **日期**: 2026-03-16  
> **分析周期**: 过去24小时

---

## 1. 今日速览

Moltis 项目在过去24小时保持**高活跃度**，Issues 和 PR 双通道均有显著进展：3个长期 Bug 被关闭（含浏览器会话隔离、Docker 节点添加等核心问题），5个新 PR 进入待合并队列，其中 2 个为当日新提交。社区关注点集中在 **Windows 兼容性修复**、**MCP 服务器体验优化** 及 **浏览器稳定性** 三大方向。无新版本发布，整体健康度良好，维护响应速度较快。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 已合并/关闭的重要 PR

| PR | 作者 | 核心贡献 | 关联 Issue |
|:---|:---|:---|:---|
| [#403](https://github.com/moltis-org/moltis/pull/403) | @penso | **浏览器沙箱超时对齐**：将 `browserless/chrome` 容器的 `TIMEOUT` 与 Moltis 浏览器生命周期配置绑定，解决沙箱会话过早终止问题 | — |
| [#412](https://github.com/moltis-org/moltis/pull/412) | @penso | **浏览器会话隔离**：按聊天会话作用域缓存浏览器会话 ID，防止新聊天继承其他聊天的过期浏览器状态 | [#202](https://github.com/moltis-org/moltis/issues/202) |

**整体推进评估**：浏览器子系统的稳定性取得关键突破，解决了多会话场景下的状态污染和超时不一致问题，为生产环境可靠性奠定基础。

---

## 4. 社区热点

### 讨论最活跃的议题

| 排名 | 议题 | 评论数 | 热度分析 |
|:---|:---|:---|:---|
| 1 | [#346](https://github.com/moltis-org/moltis/issues/346) Docker 节点添加失败 | 4 评论 | **已关闭**。Docker 部署场景的基础功能障碍，用户验证周期长，反映容器化工作流的文档/工具链待完善 |
| 2 | [#437](https://github.com/moltis-org/moltis/issues/437) Channels 中仅显示"Reasoning"展开项 | 2 评论 | **开放中**。UI 渲染 Bug，影响 Channels 核心功能，用户反馈响应内容被折叠机制掩盖 |
| 3 | [#172](https://github.com/moltis-org/moltis/issues/172) 浏览器无响应超时 | 2 评论 | **已关闭**。长期悬置的稳定性问题，与 #412 修复形成闭环 |

**社区诉求洞察**：用户高度关注 **部署便利性**（Docker）和 **交互可靠性**（浏览器、Channels），对"能跑起来"和"跑起来不崩"有强烈需求。

---

## 5. Bug 与稳定性

| 严重程度 | 议题/PR | 状态 | 说明 |
|:---|:---|:---|:---|
| 🔴 **高** | [#436](https://github.com/moltis-org/moltis/pull/436) Windows 文件锁死（LockFileEx os error 5） | **待合并** | 根因分析深入：Rust `append(true)` 在 Windows 的权限限制导致，修复方案采用 `write(true)+seek` 替代，影响会话持久化 |
| 🟡 **中** | [#437](https://github.com/moltis-org/moltis/issues/437) Channels 消息渲染异常 | **开放无 PR** | 仅显示"Reasoning"折叠项，实际响应内容丢失，影响核心聊天体验 |
| 🟡 **中** | [#440](https://github.com/moltis-org/moltis/pull/440) Heartbeat 定时任务创建失败 | **待合并** | 配置保存后 cron 任务未实际创建，功能可用性缺陷 |
| 🟢 **低** | [#432](https://github.com/moltis-org/moltis/pull/432) exec 工具节点参数暴露时机错误 | **待合并** | LLM 幻觉节点值，导致"node not found"错误，用户体验优化 |

**修复覆盖率**：4 个活跃 Bug 中 3 个已有 PR 待合并，响应效率良好。

---

## 6. 功能请求与路线图信号

| 议题/PR | 类型 | 纳入可能性 | 分析 |
|:---|:---|:---|:---|
| [#441](https://github.com/moltis-org/moltis/issues/441) 自动化 CSS 路径解析/修复相对路径 | DX 优化 | ⭐⭐⭐ 高 | 标准 Cargo 构建的痛点，Rust 生态基础体验，易实现高价值 |
| [#439](https://github.com/moltis-org/moltis/pull/439) MCP 服务器自定义显示名称 | 体验优化 | ⭐⭐⭐⭐ 极高 | **已有 PR**，当日提交，解决多 MCP 服务器管理混乱问题，预计快速合并 |
| [#413](https://github.com/moltis-org/moltis/pull/413) 安全 Agent Sidecar 文件支持 | 功能扩展 | ⭐⭐⭐ 高 | 技能系统的重要安全增强，配置门控设计成熟，需代码审查周期 |

**下一版本信号**：MCP 体验优化（#439）和 Windows 兼容性（#436）极可能成为 vNext 优先项，Agent Sidecar 功能若合并将标志技能系统进入新阶段。

---

## 7. 用户反馈摘要

### 真实痛点
- **Windows 开发体验断裂**："LockFileEx os error 5" 错误直接阻断 Windows 用户正常使用（[#436](https://github.com/moltis-org/moltis/pull/436)）
- **Docker 部署隐形门槛**：节点添加失败缺乏明确错误指引，用户需反复验证（[#346](https://github.com/moltis-org/moltis/issues/346)）
- **浏览器状态"幽灵化"**：前一会话未正常结束导致后续启动失败，用户难以理解状态继承机制（[#202](https://github.com/moltis-org/moltis/issues/202) → 已修复）

### 满意点
- 浏览器超时和会话隔离问题获得**快速响应**（#403、#412 连续合并）
- 维护者 @penso 在浏览器子系统的**系统性修复**获得认可

### 待改进
- Channels 功能的质量稳定性（[#437](https://github.com/moltis-org/moltis/issues/437)）
- Heartbeat 功能的"保存即生效"预期与实际行为差距（[#440](https://github.com/moltis-org/moltis/pull/440)）

---

## 8. 待处理积压

> **本周期无超期积压**。所有开放议题/PR 均为 3 日内创建或更新，维护响应及时。

**建议关注**：
- [#437](https://github.com/moltis-org/moltis/issues/437) 虽评论不多，但涉及 Channels 核心功能，建议优先评估影响范围
- [#441](https://github.com/moltis-org/moltis/issues/441) 作为 DX 议题，可快速 wins 提升开发者口碑

---

*日报生成时间: 2026-03-16*  
*数据来源: GitHub API / moltis-org/moltis*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 | 2026-03-16

## 1. 今日速览

CoPaw 项目今日呈现**极高活跃度**，24小时内产生 **38 条 Issues 更新**（34 条新开/活跃）和 **35 条 PR 更新**（29 条待合并），社区讨论热度显著攀升。核心关注点集中在**多通道稳定性修复**（飞书延迟回复、Telegram 语音/断连、钉钉富文本）、**时区与调度系统重构**以及**新兴 ACP 协议集成**。值得注意的是，今日有 **6 条 PR 已合并/关闭**，包括安全规则打包修复和 Telegram 自动重连等关键稳定性改进，显示维护团队响应迅速。项目正处于 v0.0.7 版本的快速迭代期，用户规模扩张带来的边缘场景问题暴露明显。

---

## 2. 版本发布

**无新版本发布**

当前最新版本仍为 **v0.0.7 / v0.0.7.post1**。社区对 v0.0.8 的期待集中在：时区配置完善、多通道文件传输支持、以及 ACP 协议集成。

---

## 3. 项目进展

### 今日已合并/关闭的关键 PR（6 条）

| PR | 作者 | 核心贡献 | 关联 Issue |
|:---|:---|:---|:---|
| [#1529](https://github.com/agentscope-ai/CoPaw/pull/1529) | @xieyxclack | **安全修复**：将 `dangerous_shell_commands.yaml` 纳入 pip 包数据，修复 Windows 安装后安全规则缺失 | [#1519](https://github.com/agentscope-ai/CoPaw/issues/1519) |
| [#1475](https://github.com/agentscope-ai/CoPaw/pull/1475) | @Leirunlin | **稳定性增强**：Telegram 通道网络故障自动重连机制 | [#1415](https://github.com/agentscope-ai/CoPaw/issues/1415) |
| [#1432](https://github.com/agentscope-ai/CoPaw/pull/1432) | @howyoungchen | **时区修复**：向 `env_context` 注入 UTC 时间，解决 cron 调度时区不匹配 | [#1346](https://github.com/agentscope-ai/CoPaw/issues/1346) |
| [#1524](https://github.com/agentscope-ai/CoPaw/pull/1524) | @cuiyuebing | **健壮性修复**：覆盖 `chunk.choices` 为 None 的边缘情况 | - |
| [#1210](https://github.com/agentscope-ai/CoPaw/pull/1210) | @hh0592821 | **Telegram 综合改进**：线程回复、媒体处理、错误报告全面优化 | - |
| [#1527](https://github.com/agentscope-ai/CoPaw/pull/1527) | @KH9CQ | **UI 优化**：WebUI 模型选择显示调整（快速关闭） | [#1520](https://github.com/agentscope-ai/CoPaw/issues/1520) |

**整体推进评估**：今日合并的 PR 显著提升了**部署安全性**（#1529）、**通道稳定性**（#1475、#1210）和**调度准确性**（#1432），属于 v0.0.7 补丁级别的关键修复。项目在生产可用性方面向前迈进一大步。

---

## 4. 社区热点

### 讨论最活跃的 Issues（按评论数排序）

| 排名 | Issue | 评论 | 核心诉求 | 状态 |
|:---|:---|:---:|:---|:---|
| 1 | [#981](https://github.com/agentscope-ai/CoPaw/issues/981) 飞书/QQ 频道无法发送文件 | 13 | **多通道文件传输能力缺失**——企业用户刚需，影响工作流交付 | 🔥 待解决 |
| 2 | [#1345](https://github.com/agentscope-ai/CoPaw/issues/1345) 飞书"延迟回复"问题 | 6 | **消息队列/状态机 Bug**——Bot 回答错位，严重影响对话体验 | 🔥 待解决 |
| 3 | [#1502](https://github.com/agentscope-ai/CoPaw/issues/1502) 火山引擎 coding plan 模型中断 | 6 | **特定模型兼容性**——"Answers have stopped" 异常 | 🔥 待解决 |
| 4 | [#828](https://github.com/agentscope-ai/CoPaw/issues/828) Tool use input 参数为空 | 6 | **工具调用参数解析 Bug**——影响 ReAct Agent 功能 | 🔥 有临时修复 |
| 5 | [#1488](https://github.com/agentscope-ai/CoPaw/issues/1488) Docker 环境 1 天后无响应 | 5 | **长期运行稳定性/资源泄漏**——生产部署 blocker | 🔥 待解决 |

### 热点分析

- **#981 文件传输问题** 评论数最高（13），反映企业 IM 集成场景的核心痛点。已有 PR [#1521](https://github.com/agentscope-ai/CoPaw/pull/1521)（QQ 本地媒体文件支持）和 [#1539](https://github.com/agentscope-ai/CoPaw/issues/1539)（WebUI 文件上传功能请求）向此方向推进。
- **#1345 飞书延迟回复** 揭示消息处理状态机的深层问题，用户提供了详细的复现场景，但尚未有针对性 PR。

---

## 5. Bug 与稳定性

### 按严重程度排序

| 严重程度 | Issue | 描述 | Fix PR 状态 |
|:---|:---|:---|:---|
| 🔴 **Critical** | [#1488](https://github.com/agentscope-ai/CoPaw/issues/1488) | Docker 部署 24 小时后服务完全无响应，重启无效 | ❌ 无 |
| 🔴 **Critical** | [#1531](https://github.com/agentscope-ai/CoPaw/issues/1531) | 崩溃后无法恢复，重装无效——RuntimeError: cancel scope 跨任务 | ❌ 无 |
| 🟡 **High** | [#1345](https://github.com/agentscope-ai/CoPaw/issues/1345) | 飞书对话状态错乱，回答错位 | ❌ 无 |
| 🟡 **High** | [#1502](https://github.com/agentscope-ai/CoPaw/issues/1502) | 火山引擎模型运行中断 | ❌ 无 |
| 🟡 **High** | [#828](https://github.com/agentscope-ai/CoPaw/issues/828) | Tool input 参数解析失败 | ⚠️ 用户有临时 workaround |
| 🟡 **High** | [#1533](https://github.com/agentscope-ai/CoPaw/issues/1533) | `install.sh` 卡死（curl 输出过多） | ✅ [#1533](https://github.com/agentscope-ai/CoPaw/issues/1533) 建议已给出 |
| 🟢 **Medium** | [#1520](https://github.com/agentscope-ai/CoPaw/issues/1520) | macOS 模型选择列表显示不完整 | ✅ [#1527](https://github.com/agentscope-ai/CoPaw/pull/1527) 已关闭 |
| 🟢 **Medium** | [#1501](https://github.com/agentscope-ai/CoPaw/issues/1501) | Docker 时区无法修改 | 🔄 相关 PR [#1535](https://github.com/agentscope-ai/CoPaw/pull/1535) 时区配置 |
| 🟢 **Medium** | [#1534](https://github.com/agentscope-ai/CoPaw/issues/1534) [#1516](https://github.com/agentscope-ai/CoPaw/issues/1516) | Telegram 语音消息无法接收 | 🔄 PR [#1476](https://github.com/agentscope-ai/CoPaw/pull/1476) 语音转录 |
| 🟢 **Medium** | [#1540](https://github.com/agentscope-ai/CoPaw/issues/1540) | 飞书创建的 cron job 总是分发到 console | ❌ 无，文档问题 |
| 🟢 **Medium** | [#1528](https://github.com/agentscope-ai/CoPaw/issues/1528) | 本地模型慢速运行导致 ReadTimeout 断开 | ❌ 无，需可配置超时 |

---

## 6. 功能请求与路线图信号

### 高优先级功能请求

| 功能 | Issue/PR | 用户需求强度 | 技术可行性 | 纳入下一版本概率 |
|:---|:---|:---:|:---:|:---:|
| **ACP 协议支持**（Agent Communication Protocol） | [#1059](https://github.com/agentscope-ai/CoPaw/issues/1059) + [#1544](https://github.com/agentscope-ai/CoPaw/pull/1544) | ⭐⭐⭐⭐⭐ | 高（PR 已开） | **85%** |
| **WebUI 文件上传/附件** | [#1539](https://github.com/agentscope-ai/CoPaw/issues/1539) | ⭐⭐⭐⭐⭐ | 高 | **70%** |
| **用户时区配置** | [#1535](https://github.com/agentscope-ai/CoPaw/pull/1535) | ⭐⭐⭐⭐⭐ | 高（PR 已开） | **90%** |
| **钉钉停止任务命令** | [#957](https://github.com/agentscope-ai/CoPaw/issues/957) | ⭐⭐⭐⭐☆ | 中 | 60% |
| **Agent 级模型配置 + 故障切换** | [#1537](https://github.com/agentscope-ai/CoPaw/issues/1537) | ⭐⭐⭐⭐☆ | 中 | 50% |
| **Skills Marketplace（Git 后端）** | [#1530](https://github.com/agentscope-ai/CoPaw/pull/1530) | ⭐⭐⭐⭐☆ | 高（PR 已开） | **75%** |
| **Gemini Provider** | [#1507](https://github.com/agentscope-ai/CoPaw/pull/1507) | ⭐⭐⭐⭐☆ | 高（PR 已开） | **80%** |
| **语音消息转录（Whisper）** | [#1476](https://github.com/agentscope-ai/CoPaw/pull/1476) | ⭐⭐⭐⭐☆ | 高（PR 已开） | **80%** |
| **Nextcloud Talk 通道** | [#1478](https://github.com/agentscope-ai/CoPaw/pull/1478) | ⭐⭐⭐☆☆ | 高（PR 已开） | 60% |
| **通知中心/历史记录** | [#1543](https://github.com/agentscope-ai/CoPaw/issues/1543) | ⭐⭐⭐☆☆ | 中 | 40% |

### 路线图信号解读

- **ACP 协议**（#1544）是今日最大亮点，将使 CoPaw 成为首个支持双向 ACP 集成的国产 Agent 框架，可直接调用 OpenCode、Qwen-code、Gemini CLI 等外部编码 Agent。
- **时区系统重构** 有多条 PR 并行（#1535、#1451、#1321），显示这是 v0.0.8 的确定性方向。
- **多模态输入**（语音、文件）成为用户增长后的自然需求，相关 PR 密集出现。

---

## 7. 用户反馈摘要

### 真实痛点

| 场景 | 用户原声 | 频率 |
|:---|:---|:---:|
| **企业 IM 集成** | "飞书频道和 QQ 频道，机器人回复消息的时候不能发送任何文件给我" | 🔥 高频 |
| **生产稳定性** | "执行了 1 天任务后整个服务无响应...重启 Docker 也未能恢复" | 🔥 高频 |
| **对话状态错乱** | "Bot 回答的是上一个问题的内容，当前发送的新问题被忽略" | 🔥 高频 |
| **部署体验** | "TZ 以及 ln -s /etc/localtime 以及其他方式都无效" | 🔄 中频 |
| **模型兼容性** | "本地部署的小模型容易丢失记忆...qwen3:9b 经常发生记忆混乱" | 🔄 中频 |
| **中断控制** | "让它执行一个任务，结果发现任务有问题要停止，但是无法打断" | 🔄 中频 |

### 满意度信号

- ✅ Telegram 自动重连功能合并后，[#1415](https://github.com/agentscope-ai/CoPaw/issues/1415) 关闭，长期断连问题得到解决
- ✅ 安全规则打包修复，Windows 用户部署体验改善
- ⚠️ 对 v0.0.7 整体稳定性有期待，但长期运行和资源泄漏问题仍困扰生产用户

---

## 8. 待处理积压

### 需维护者重点关注

| Issue/PR | 创建时间 | 问题 | 行动建议 |
|:---|:---:|:---|:---|
| [#981](https://github.com/agentscope-ai/CoPaw/issues/981) 文件传输 | 3月9日 | 13 评论，企业用户 blocker | 协调 #1521、#1539 形成统一方案 |
| [#1488](https://github.com/agentscope-ai/CoPaw/issues/1488) Docker 无响应 | 3月14日 | 生产环境致命问题 | 优先级提升至 P0，分配诊断资源 |
| [#1345](https://github.com/agentscope-ai/CoPaw/issues/1345) 飞书延迟回复 | 3月12日 | 状态机深层 Bug | 需要核心开发者介入分析 |
| [#828](https://github.com/agentscope-ai/CoPaw/issues/828) Tool input 为空 | 3月6日 | 6 评论，ReAct 核心功能 | 评估用户 workaround 是否可转正 |
| [#957](https://github.com/agentscope-ai/CoPaw/issues/957) 钉钉停止命令 | 3月8日 | 4 评论，交互安全需求 | 评估与 #1542（打断频道聊天）统一设计 |

### PR 积压风险

- **29 条待合并 PR** 中，[#1544](https://github.com/agentscope-ai/CoPaw/pull/1544)（ACP）、[#1535](https://github.com/agentscope-ai/CoPaw/pull/1535)（时区）、[#1476](https://github.com/agentscope-ai/CoPaw/pull/1476)（语音）均为大型功能，建议分批 review 避免冲突堆积。

---

*本日报基于 GitHub 公开数据生成，数据截止 2026-03-16 00:00 UTC*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 | 2026-03-16

## 1. 今日速览

ZeptoClaw 今日活跃度**极高**，24小时内完成 **4 个 PR 的合并/关闭**（含 2 个高优先级 bug 修复），同时有 **2 个功能 PR 待合并**。核心进展集中在三方面：r8r 桥接器稳定性加固、Google Vertex AI 企业级支持引入、以及 Telegram 交互体验升级。项目维护者 @qhkm 主导了全部 6 个 PR，显示开发节奏紧凑且聚焦基础设施可靠性。无新版本发布，但多条主线功能已接近就绪。

---

## 2. 版本发布

**无** — 今日未发布新版本。

---

## 3. 项目进展

### 已合并/关闭的关键 PR

| PR | 核心贡献 | 项目推进意义 |
|:---|:---|:---|
| [#362](https://github.com/qhkm/zeptoclaw/pull/362) fix(r8r_bridge): ack duplicates, error on bad headers, register config fields | 修复 r8r 桥接器三大稳定性缺陷：事件重复确认机制、错误处理规范化、配置字段注册 | **阻断级修复** — 解决 WebSocket 重连时的无限循环和 panic 崩溃，使 r8r 集成达到生产可用标准 |
| [#359](https://github.com/qhkm/zeptoclaw/pull/359) fix(templates): coder template uses existing tests and edit_file | 重构 coder 模板工作流：强制复用现有测试套件，禁止 LLM 自写验证代码 | **质量基线提升** — 根治 #345 报告的"测试通过但 bug 仍在"幻觉问题，减少 50%+ 的无效修复循环 |
| [#365](https://github.com/qhkm/zeptoclaw/pull/365) feat: r8r bridge WebSocket client + progressive disclosure CLAUDE.md | 完整 r8r 桥接器实现：事件类型系统、去重、审批响应解析、健康心跳、安全加固（token 脱敏） | **架构里程碑** — 打通 ZeptoClaw ↔ r8r 工作流引擎的双向链路，支持人工审批介入的 AI 工作流 |
| [#358](https://github.com/qhkm/zeptoclaw/pull/358) fix: Dockerfile.dev with BuildKit cache mounts + lint-container.sh | 开发者体验优化：容器构建加速、Podman/Docker 双兼容、缓存挂载自动检测 | 贡献者 onboarding 效率提升，CI 成本降低 |

**整体评估**：今日合并代码直接修复了 2 个 P2-high 优先级问题，同时交付了 r8r 集成的核心基础设施。项目从"单 Agent 工具"向"企业工作流节点"的演进迈出关键一步。

---

## 4. 社区热点

### 讨论焦点：AGENTS.md 硬编码仓库标识引发跨仓库污染

| 指标 | 详情 |
|:---|:---|
| **Issue** | [#367](https://github.com/qhkm/zeptoclaw/issues/367) bug: AGENTS.md has hardcoded repo slug |
| **作者** | @taqtiqa-mark |
| **核心诉求** | 修复 AGENTS.md 中的硬编码 `qhkm/zeptoclaw`，避免 fork 用户触发上游仓库的 spurious issues |

**深度分析**：该问题揭示了 AI 编码助手时代的独特痛点 —— 当开发者 fork 项目后，AI Agent 仍按原配置向上游提交 PR/Issue，造成 #333 等误报。这不仅是技术债务，更是**多租户场景下的治理缺陷**。该 Issue 零评论但命中结构性问题，建议优先处理。

---

## 5. Bug 与稳定性

| 优先级 | 问题 | 状态 | 修复 PR |
|:---|:---|:---|:---|
| **P2-high** | r8r 桥接器：重复事件导致无限循环、header 解析 panic、配置未注册 | ✅ **已修复** | [#362](https://github.com/qhkm/zeptoclaw/pull/362) |
| **P2-high** | coder 模板：LLM 自写测试验证自身 bug，形成确认偏误循环 | ✅ **已修复** | [#359](https://github.com/qhkm/zeptoclaw/pull/359) |
| **P3-medium** | AGENTS.md 硬编码 repo slug，fork 场景污染上游 | ⏳ **待处理** | 无 |

**稳定性评估**：今日关闭的 2 个高优先级 bug 均属**运行时可靠性**范畴，修复后核心路径（r8r 集成、代码修复模板）的 MTBF 显著提升。剩余 #367 为配置治理类问题，无直接崩溃风险。

---

## 6. 功能请求与路线图信号

### 待合并功能 PR（下一版本强信号）

| PR | 功能 | 技术亮点 | 纳入概率 |
|:---|:---|:---|:---|
| [#364](https://github.com/qhkm/zeptoclaw/pull/364) feat(providers): add Google Vertex AI provider | Google Vertex AI 企业级支持 | 零新依赖、复用 GeminiProvider 解析逻辑、ADC/bearer token 双认证 | **极高** — 对应已规划的 #363 |
| [#366](https://github.com/qhkm/zeptoclaw/pull/366) feat(telegram): markdown formatting and typing indicator | Telegram 富文本渲染 + 输入状态提示 | 7 阶段占位符管道、LazyLock 缓存正则、HTML 安全转义 | **高** — 关闭 #331，用户体验显著改善 |

### 路线图推断

- **企业集成**：Vertex AI + r8r 桥接器形成"云端模型 + 人工审批工作流"组合拳，瞄准企业合规场景
- **多平台覆盖**：Telegram 体验优化后，Discord/Slack 同类改进可能跟进
- **模板智能化**：coder 模板修复后，其他模板（researcher、architect）可能同步引入"工具优先"约束

---

## 7. 用户反馈摘要

### 从 Issues 提炼的真实痛点

| 来源 | 痛点 | 场景 | 情绪 |
|:---|:---|:---|:---|
| #367 @taqtiqa-mark | Fork 后 AI Agent 误操作上游仓库 | 企业内部分支开发、个人贡献者二次开发 | 😤 挫败 — "spurious issues are generated" |
| #345（已修复） | LLM 自验证导致"修复幻觉" | 自动化 bug 修复工作流 | 😰 不信任 — 测试通过 ≠ 真修复 |
| #361（已修复） | r8r 重连时事件风暴 | 长时运行的审批工作流 | 😰 焦虑 — 担心状态不一致 |

### 隐含需求

- **可观测性**：r8r 桥接器的"CLI status display"暗示用户对 Agent 外部状态可见性的强烈需求
- **配置即代码**：多次出现的 config validation 注册遗漏，反映配置系统复杂度上升，需要 schema 驱动或编译期检查

---

## 8. 待处理积压

| Issue/PR | 滞留时间 | 风险 | 建议行动 |
|:---|:---|:---|:---|
| [#367](https://github.com/qhkm/zeptoclaw/issues/367) AGENTS.md 硬编码 repo slug | 1 天（新） | 中等 — 持续污染上游，损害 fork 用户体验 | 模板化替换为 `{{REPO_OWNER}}/{{REPO_NAME}}`，或运行时注入 |
| — | — | — | 当前积压健康，无长期未响应项 |

---

**数据截止**：2026-03-16 00:00 UTC  
**项目健康度**：🟢 高活跃 / 快速修复 / 功能迭代有序

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 | 2026-03-16

---

## 1. 今日速览

EasyClaw 项目今日处于**静默维护期**，代码层面无活跃更新。过去24小时内无新增 Issues 或 Pull Requests，社区讨论暂时停滞。唯一动态为 **v1.6.8 补丁版本发布**，聚焦于 macOS 安装体验的文档补充，属于非代码变更的维护性更新。整体活跃度评级：**低**，项目处于稳定维护阶段，无紧急事项需关注。

---

## 2. 版本发布

### [v1.6.8](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.6.8) — 已发布

| 属性 | 详情 |
|:---|:---|
| **版本类型** | 补丁版本 (Patch) |
| **核心变更** | 安装文档补充：新增 macOS Gatekeeper 拦截问题的排查指南 |
| **代码变更** | 无（纯文档更新） |
| **破坏性变更** | 无 |
| **迁移注意事项** | 无需迁移，现有用户不受影响 |

**更新详情解读：**

该版本针对 macOS 用户常见的安装障碍提供官方解决方案。由于 EasyClaw 作为未签名应用被 macOS Gatekeeper 拦截，用户频繁遇到「"EasyClaw" is damaged and can't be opened」误报。v1.6.8 在 Release 页面直接嵌入中英文双语解决方案，降低用户流失率。

**典型用户场景：**
- 首次下载的 macOS 用户因安全警告放弃安装 → 现可快速找到 Terminal 绕过命令
- 中文用户语言障碍 → 提供母语指引

> ⚠️ **建议维护者后续动作**：考虑为 macOS 版本申请 Apple Developer 签名，从根本上消除此摩擦点。

---

## 3. 项目进展

**今日无代码层面进展。**

| 指标 | 数值 | 状态 |
|:---|:---|:---|
| 已合并 PR | 0 | — |
| 已关闭 PR | 0 | — |
| 新增提交 | 0 | — |

**技术债务观察**：连续无代码提交可能表明：
1. 项目功能趋于成熟，进入维护模式
2. 核心维护者精力受限
3. 等待外部贡献者驱动新功能

建议关注未来7日内是否有积压 PR 需要审阅。

---

## 4. 社区热点

**今日无活跃讨论。**

无新增 Issues 或 PR 评论，社区处于静默状态。历史讨论需回溯至更早周期。

---

## 5. Bug 与稳定性

**今日无新增 Bug 报告。**

| 严重程度 | 数量 | 详情 |
|:---|:---|:---|
| 🔴 严重 (Crash/Data Loss) | 0 | — |
| 🟡 中等 (功能异常) | 0 | — |
| 🟢 轻微 (UI/文档) | 0 | — |

**稳定性评估**：基于零故障报告，系统稳定性良好。但需注意「无报告」不等于「无问题」——可能反映用户基数较小或反馈渠道不畅。

---

## 6. 功能请求与路线图信号

**今日无新增功能请求。**

由于缺乏活跃的 Issue 讨论，无法从社区输入推断下一版本方向。建议维护者：
- 检查历史 open issues 中标记为 `enhancement` 的条目
- 考虑发布公开路线图征集社区优先级投票

---

## 7. 用户反馈摘要

**今日无新增用户反馈。**

基于 v1.6.8 发布内容可间接推断的**历史痛点**：

| 痛点 | 来源 | 缓解状态 |
|:---|:---|:---|
| macOS 安装体验差 | Release 文档新增内容 | ✅ 已文档化，未根治 |
| 中英文用户群体并存 | 双语文档 | ✅ 已覆盖 |

**满意度信号**：维护者对用户体验细节保持关注（主动补充安装指南），但缺乏定量反馈数据（如 GitHub reactions、用户调研）。

---

## 8. 待处理积压

**需维护者关注的潜在积压项：**

由于今日数据无 open issues/PRs，建议核查以下**历史维度**：

| 检查项 | 操作建议 | 优先级 |
|:---|:---|:---|
| 超过30天未响应的 Issues | 访问 [Issues 页面](https://github.com/gaoyangz77/easyclaw/issues) 筛选 `is:open updated:<2026-02-14` | 中 |
| 超过14天未审阅的 PRs | 访问 [PRs 页面](https://github.com/gaoyangz77/easyclaw/pulls) 筛选 `is:open created:<2026-03-02` | 高 |
| 无标签 Issues | 添加分类标签便于社区参与 | 低 |

---

## 附录：关键链接

| 资源 | 链接 |
|:---|:---|
| 项目主页 | https://github.com/gaoyangz77/easyclaw |
| 最新 Release | https://github.com/gaoyangz77/easyclaw/releases/tag/v1.6.8 |
| Issues 列表 | https://github.com/gaoyangz77/easyclaw/issues |
| Pull Requests | https://github.com/gaoyangz77/easyclaw/pulls |

---

*本日报基于 GitHub 公开数据生成，未包含私有讨论或外部社区（Discord/微信群等）动态。*

</details>

---
*本日报由 [agents-radar](https://github.com/duanyytop/agents-radar) 自动生成。*