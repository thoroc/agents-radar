# OpenClaw 生态日报 2026-03-15

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-03-15 00:10 UTC

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

# OpenClaw 项目动态日报 | 2026-03-15

## 1. 今日速览

OpenClaw 项目在 2026-03-15 呈现**极高活跃度**：24小时内 Issues 更新 500 条（89% 为活跃/新开），PR 更新 500 条（79% 待合并），社区讨论热度显著。核心版本 `v2026.3.13` 因发布问题紧急推出恢复版本 `v2026.3.13-1`，同时发布 beta 预发布版本。项目正处于快速迭代期，但 **v2026.3.12 版本引入大量回归问题**，成为社区焦点——WhatsApp 集成、内存泄漏、网关连接稳定性等核心功能受影响，用户升级谨慎度上升。

---

## 2. 版本发布

### v2026.3.13-1（恢复版本）
| 属性 | 详情 |
|:---|:---|
| **性质** | 紧急恢复发布 |
| **原因** | `v2026.3.13` 标签/发布路径损坏，GitHub 不可变发布机制禁止重用原标签 |
| **重要说明** | npm 版本仍为 `2026.3.13`，**非** `2026.3.13-1` |
| **GitHub** | [v2026.3.13-1](https://github.com/openclaw/openclaw/releases/tag/v2026.3.13-1) |

### v2026.3.13-beta.1（预发布版本）
| 属性 | 详情 |
|:---|:---|
| **用途** | npm beta 标签测试 |
| **macOS 资源** | 复用稳定版 `2026.3.13` 构建产物 |
| **appcast.xml** | 故意保持不变，确保后续正式版无缝升级 |
| **已知变更** | Android 聊天设置页重新设计 |
| **GitHub** | [v2026.3.13-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.3.13-beta.1) |

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 作者 | 核心贡献 | 状态 |
|:---|:---|:---|:---|
| [#46663](https://github.com/openclaw/openclaw/pull/46663) | @Takhoffman | **修复 Zalo 群组 DM 白名单继承问题**——已白名单群组不再错误应用 DM 发送者限制 | ✅ 已合并 |
| [#20317](https://github.com/openclaw/openclaw/pull/20317) | @nmccready | **WebChat 工具调用/思考块显示切换**——新增 🔧 按钮控制工具调用可见性，优化移动端体验 | ✅ 已合并 |
| [#46440](https://github.com/openclaw/openclaw/pull/46440) | @vincentkoc | **安全治理**——敏感路径新增 `@openclaw/secops` 代码所有权审核 | ✅ 已合并 |
| [#46649](https://github.com/openclaw/openclaw/pull/46649) | @ademczuk | **紧急回滚**——恢复 `supportsUsageInStreaming=false` 默认值，修复 Ollama/LM Studio/Mistral API 等 400/422 错误 | ✅ 已合并 |
| [#46651](https://github.com/openclaw/openclaw/pull/46651) | @Takhoffman | **飞书修复**——保持发送者作用域线程引导跨 ID 类型一致性 | ✅ 已合并 |
| [#46658](https://github.com/openclaw/openclaw/pull/46658) | @ademczuk | **安全修复**——移除 `auth.mode=none` 配对绕过（回归引入） | ✅ 已合并 |
| [#45868](https://github.com/openclaw/openclaw/issues/45868) | @luc-maurette | **子代理会话修复**——`sessions_spawn` 工作空间解析回归修复（关联 Issue 关闭） | ✅ 已关闭 |
| [#45074](https://github.com/openclaw/openclaw/issues/45074) | @finanzasyredes | **关键工具回归修复**——"Tool not found" 间歇性失败问题已解决 | ✅ 已关闭 |
| [#45572](https://github.com/openclaw/openclaw/issues/45572) | @HenryLoenwind | **上下文使用率警告修复**——Web UI 显示数据错误问题已解决 | ✅ 已关闭 |
| [#22299](https://github.com/openclaw/openclaw/issues/22299) | @lunaviva211-sketch | **网关环回模式修复**——内部子代理/会话连接被拒绝问题已解决 | ✅ 已关闭 |
| [#29801](https://github.com/openclaw/openclaw/issues/29801) | @xxcbzxx | **设备身份认证修复**——网关启动失败问题已解决 | ✅ 已关闭 |

### 关键推进方向
- **稳定性优先**：今日 6 个合并 PR 中 4 个为修复类，重点解决 v2026.3.12 引入的回归
- **开发者体验**：VSCode 调试支持、zsh 补全脚本健壮性改进
- **企业功能**：Slack 多网关部署 mux 接收器、执行信任窗口（Trust Windows）安全功能

---

## 4. 社区热点

### 讨论最活跃的 Issues（按评论数排序）

| 排名 | Issue | 评论 | 核心诉求 | 状态 |
|:---|:---|:---:|:---|:---|
| 1 | [#45471](https://github.com/openclaw/openclaw/issues/45471) UI chat not opening | **69** | v2026.3.12 升级后聊天界面完全无法打开，阻塞性故障 | 🔴 开放 |
| 2 | [#45074](https://github.com/openclaw/openclaw/issues/45074) Tools intermittent 'Tool not found' | 19 | 核心工具调用 50% 失败率，生产环境致命 | ✅ 已关闭 |
| 3 | [#45064](https://github.com/openclaw/openclaw/issues/45064) Memory Leak - OOM | 17 | 基础命令触发 JS 堆内存耗尽，CLI 完全不可用 | 🔴 开放 |
| 4 | [#45171](https://github.com/openclaw/openclaw/issues/45171) WhatsApp outbound send broken | 15 | 自动回复正常但主动发送失败，业务场景断裂 | 🔴 开放 |
| 5 | [#45227](https://github.com/openclaw/openclaw/issues/45227) 422 status with mistral | 14 | Mistral 提供商兼容性问题 | 🔴 开放 |

### 热点分析
**v2026.3.12 成为"问题版本"**：前 5 大热点 Issue 中 4 个明确标注为 v2026.3.12 回归。社区情绪从功能期待转向稳定性焦虑，大量用户选择回退至 v2026.3.11 或 v2026.3.8。WhatsApp 集成的"半正常工作"状态（自动回复可用，主动发送失败）尤其困扰企业用户。

---

## 5. Bug 与稳定性

### 🔴 严重（阻塞生产/数据丢失）

| Issue | 描述 | 版本 | Fix PR |
|:---|:---|:---|:---|
| [#45471](https://github.com/openclaw/openclaw/issues/45471) | **UI 聊天完全无法打开** — 升级后界面卡死 | v2026.3.12 | 无 |
| [#45064](https://github.com/openclaw/openclaw/issues/45064) | **内存泄漏导致 OOM** — 基础命令触发堆溢出 | v2026.3.12 | 无 |
| [#45171](https://github.com/openclaw/openclaw/issues/45171) | **WhatsApp 主动发送完全失效** — 仅自动回复工作 | v2026.3.12 | 无 |
| [#45504](https://github.com/openclaw/openclaw/issues/45504) | **本地网关 CLI 命令失效** — `devices list/approve` 不可靠 | v2026.3.12 | 无 |
| [#45283](https://github.com/openclaw/openclaw/issues/45283) | **Control UI 会话特定崩溃** — main 会话冻结，其他正常 | v2026.3.12 | 无 |

### 🟡 高（功能受损/频繁失败）

| Issue | 描述 | 版本 | Fix PR |
|:---|:---|:---|:---|
| [#45227](https://github.com/openclaw/openclaw/issues/45227) | Mistral 提供商 422 错误 | v2026.3.12 | [#46649](https://github.com/openclaw/openclaw/pull/46649) ✅ |
| [#45772](https://github.com/openclaw/openclaw/issues/45772) | 网关心跳定时器 1-2 次后停止 | v2026.3.8+ | 无 |
| [#44714](https://github.com/openclaw/openclaw/issues/44714) | `openclaw logs --follow` 握手超时 | v2026.3.12 | 无 |
| [#45108](https://github.com/openclaw/openclaw/issues/45108) | Sandbox 写入失败 — Python3 未找到 | v2026.3.11+ | 无 |
| [#45311](https://github.com/openclaw/openclaw/issues/45311) | Slack Socket Mode 零事件接收 | v2026.3.12 | 无 |

### 🟢 中（体验问题/间歇性）

| Issue | 描述 | 版本 | Fix PR |
|:---|:---|:---|:---|
| [#45759](https://github.com/openclaw/openclaw/issues/45759) | Telegram 输入指示器无限循环导致网关崩溃 | - | 无 |
| [#45867](https://github.com/openclaw/openclaw/issues/45867) | OpenRouter 视觉模型图片静默丢失 | - | 无 |
| [#45794](https://github.com/openclaw/openclaw/issues/45794) | 100% 上下文时聊天区域空白 | v2026.3.12 | 无 |

---

## 6. 功能请求与路线图信号

### 用户提出的关键需求

| Issue/PR | 需求 | 热度 | 纳入可能性评估 |
|:---|:---|:---:|:---|
| [#41496](https://github.com/openclaw/openclaw/pull/41496) | **插件化 AI 能力提供者** — TTS/ASR/Embedding/Image/Video 统一注册 API | XL 规模 PR | ⭐⭐⭐⭐⭐ 高 — 已开 PR，架构级改进 |
| [#44231](https://github.com/openclaw/openclaw/pull/44231) | **阿里云 ECS Skill** — 中国市场 35-40% 份额支持 | XL 规模 PR | ⭐⭐⭐⭐⭐ 高 — 已开 PR，战略市场 |
| [#46657](https://github.com/openclaw/openclaw/pull/46657) | **执行信任窗口** — 时间限定的许可模式，平衡安全与体验 | XL 规模 PR | ⭐⭐⭐⭐⭐ 高 — 已开 PR，安全核心 |
| [#45608](https://github.com/openclaw/openclaw/issues/45608) | **会话重置前记忆刷新** — /new 和每日重置应执行压缩前相同刷新 | 6 评论 | ⭐⭐⭐⭐☆ 中高 — 体验优化，实现成本低 |
| [#23281](https://github.com/openclaw/openclaw/issues/23281) | **可配置视觉模型** — image 工具支持用户指定 vision 模型 | 5 评论 | ⭐⭐⭐⭐☆ 中高 — 相关 PR 已存在 |
| [#45132](https://github.com/openclaw/openclaw/pull/45132) | **Slack 多网关部署** — mux 接收器支持企业级扩展 | XL 规模 PR | ⭐⭐⭐⭐⭐ 高 — 已开 PR，企业需求 |

### 路线图信号
- **插件生态扩张**：#41496 和 #45318 显示 OpenClaw 正从"功能集成"转向"平台化扩展"，允许第三方插件深度定制通道交互
- **中国企业市场**：#44231 阿里云支持填补关键市场空白
- **安全模型演进**：#46657 信任窗口代表从"二元许可"向"梯度安全"的转变

---

## 7. 用户反馈摘要

### 🔴 核心痛点

> *"After updating the Chat isn't working"* — @DragonBtc93 [#45471](https://github.com/openclaw/openclaw/issues/45471)

> *"OpenClaw crashes with JavaScript heap out of memory on basic CLI commands, making the CLI completely unusable"* — @binbin1213 [#45064](https://github.com/openclaw/openclaw/issues/45064)

> *"Auto-replies work perfectly. All other outbound paths fail"* — @elenasteinvorth [#45171](https://github.com/openclaw/openclaw/issues/45171)

**模式识别**：v2026.3.12 的"部分工作"故障模式比完全失效更令人困惑——用户难以判断是配置问题还是软件缺陷，增加了诊断负担。

### 🟡 体验摩擦

> *"Instead of replying to me directly and acknowledging the task immediately, it goes 'Typing...' for few minutes until it's done with the task and sends in bulk everything"* — @jabezborja [#8731](https://github.com/openclaw/openclaw/issues/8731)

> *"Skills added to the workspace after a session has been created are not visible to that session"* — @jeanlucthumm [#12092](https://github.com/openclaw/openclaw/issues/12092)

### 🟢 积极反馈

> *"Downgrading to 2026.3.11 immediately restores functionality"* — @barry-p5cc [#45311](https://github.com/openclaw/openclaw/issues/45311)

回退机制的可靠性成为用户应对回归的"救生索"，但也反映出发布质量管控的挑战。

---

## 8. 待处理积压

### 长期未响应的重要 Issue（>30天，仍有价值）

| Issue | 创建 | 最后更新 | 问题 | 行动建议 |
|:---|:---|:---|:---|:---|
| [#8731](https://github.com/openclaw/openclaw/issues/8731) | 2026-02-04 | 2026-03-14 | 消息批量发送而非流式响应 | 用户体验核心，建议纳入 UX 改进 sprint |
| [#12092](https://github.com/openclaw/openclaw/issues/12092) | 2026-02-08 | 2026-03-14 | 会话创建后新增 Skill 不可见 | 架构限制，需评估动态系统提示刷新成本 |
| [#14936](https://github.com/openclaw/openclaw/issues/14936) | 2026-02-12 | 2026-03-14 | MiniMax M2.5 Telegram 消息分块 | 模型特定行为，需提供商协作或提示工程 |
| [#25215](https://github.com/openclaw/openclaw/issues/25215) | 2026-02-24 | 2026-03-14 | SSRF 检查阻断 Clash fake-ip 段 | 网络环境兼容，建议可配置 IP 段白名单 |
| [#26044](https://github.com/openclaw/openclaw/issues/26044) | 2026-02-25 | 2026-03-14 | 网关 stop 后需 reinstall 才能 start | macOS 服务管理，影响日常开发体验 |

### 提醒
- **#8731** 和 **#12092** 均为体验类问题，虽非崩溃性故障，但直接影响用户对"智能体响应自然度"的感知，建议在稳定性危机缓解后优先处理。
- **#25215** 反映代理/网络工具兼容性问题，随着企业部署增加可能更频繁出现。

---

*日报生成时间：2026-03-15 | 数据来源：OpenClaw GitHub 开放数据*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析 | 2026-03-15

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**剧烈分化与快速迭代期**。头部项目（OpenClaw、NanoBot）日活 Issues/PR 破百，聚焦企业级稳定性与多模态能力；中型项目（Zeroclaw、PicoClaw、CoPaw）在安全模型与渠道覆盖上激烈竞争；新兴项目（TinyClaw、ZeptoClaw）以极简架构和协议创新寻求差异化。整体呈现**"稳定性危机"与"功能扩张"并存的矛盾态势**——v2026.3.12 级回归事件频发，同时多 Agent 协作、边缘硬件支持、MCP 协议集成成为共同押注方向。

---

## 2. 各项目活跃度对比

| 项目 | Issues (24h) | PRs (24h) | 版本发布 | 健康度评估 |
|:---|:---:|:---:|:---|:---|
| **OpenClaw** | 500 (89% 活跃) | 500 (79% 待合并) | v2026.3.13-1 紧急恢复版 + beta | 🔴 **高活跃/高风险** — 回归问题严重，社区焦虑 |
| **NanoBot** | 27 (74% 活跃) | 57 (60% 待合并) | 无 | 🟢 **健康迭代** — 渠道适配与开发者体验双轨并进 |
| **Zeroclaw** | 31 (39% 关闭率) | 50 (64% 合并率) | v0.3.0 正式版 + 9 个版本 | 🟢 **密集发布期** — Android 支持落地，Dashboard 体验债待还 |
| **PicoClaw** | 20 (10% 关闭率) | 61 (56% 合并率) | nightly v0.2.3 | 🟡 **架构重构期** — Agent 事件驱动提案引发深度讨论，Cron 系统 Bug 堆积 |
| **NanoClaw** | 18 (0% 关闭率) | 50 (88% 待合并) | 无 | 🟡 **高积压风险** — PR 审阅瓶颈，技能分支合并故障频发 |
| **NullClaw** | 16 (81% 活跃) | 41 (80% 待合并) | v2026.3.14 | 🟡 **安全驱动迭代** — @manelsen 单日 12+ 安全 PR，Subagent 文档债突出 |
| **IronClaw** | 19 (68% 关闭率) | 50 (64% 待合并) | 无 | 🟢 **质量巩固期** — 生产安全加固为核心，CI 自动化审查高效 |
| **LobsterAI** | 3 (67% 活跃) | 3 (100% 合并率) | 无 | 🟢 **稳健推进** — Agent 架构重组完成，ARM64 分发问题待解 |
| **TinyClaw** | 1 (活跃) | 5 (100% 待合并) | 无 | 🟢 **功能蓄力期** — 5 PR 覆盖架构/体验/生态，即将跃迁 |
| **Moltis** | 9 (44% 活跃) | 6 (50% 待合并) | 无 | 🟢 **质量加固期** — 测试覆盖提升，Windows 兼容性响应快 |
| **CoPaw** | 50 (34% 活跃) | 29 (72% 待合并) | 无 | 🟢 **密集迭代期** — 首次贡献者友好，Windows 体验债集中 |
| **ZeptoClaw** | 5 (100% 关闭率) | 6 (67% 合并率) | 无 | 🟢 **健康收尾** — 安全加固主动，ACP 协议前瞻布局 |
| **EasyClaw** | 0 | 0 | 无 | ⚪ **休眠状态** — 24h 无活动 |

---

## 3. OpenClaw 在生态中的定位

| 维度 | OpenClaw 表现 | 生态对比 |
|:---|:---|:---|
| **社区规模** | 日活 1000+ (Issues+PR)，绝对头部 | NanoBot (84)、Zeroclaw (81)、CoPaw (79) 均为其 1/10 量级 |
| **技术路线** | **"全功能平台化"** — 50+ 渠道、企业级安全、多网关部署 | NanoBot/Zeroclaw 侧重"轻量可扩展"；IronClaw 聚焦"生产级 Rust 实现" |
| **当前困境** | **v2026.3.12 成为"问题版本"** — WhatsApp 半失效、内存泄漏、UI 崩溃等 5+ 严重回归 | 同类项目（Zeroclaw v0.3.0、IronClaw）同期发布质量更稳 |
| **差异化优势** | ① 最完整的企业 IM 矩阵（飞书/钉钉/企微/Slack/Teams）<br>② 执行信任窗口等安全创新领先<br>③ 子代理/会话嵌套架构最成熟 | NanoBot 的 QQ/NapCat 本土化更深；Zeroclaw 的硬件插件/边缘部署更前瞻 |
| **风险信号** | 发布节奏与质量管控失衡，社区信任度承压 | IronClaw 的 CI 自动化审查、Zeroclaw 的通道测试矩阵值得借鉴 |

> **核心判断**：OpenClaw 仍是**生态事实标准**，但"快速迭代"红利正被"稳定性债务"侵蚀，需从"功能扩张"转向"质量巩固"。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与信号强度 |
|:---|:---|:---|
| **多 Agent 协作架构** | PicoClaw (#1316 事件驱动重构, #294 多 Agent 框架)、NanoBot (#2013 Team Mode, #2002 跨实例通信)、Moltis (#235 PTY 伪终端编排)、NullClaw (#553 Subagent Skills 访问) | **架构级共识**：单 Agent 语义触及极限，需可观测、可中断、可 Hook 的编排层 |
| **安全模型精细化** | Zeroclaw (#1478 过度安全争议 → 可配置自主模式)、OpenClaw (#46657 执行信任窗口)、NanoClaw (#911-#913 代理学习行为)、ZeptoClaw (#347 默认审批策略) | 从"二元许可"转向"梯度安全"，用户需要明确的"完全自主"路径 |
| **MCP/工具协议标准化** | IronClaw (#1158 MCP 认证错误处理)、NanoBot (#1998 Coder 模型 JSON 严格性)、OpenClaw (#45074 Tool not found 回归) | 工具调用层成为兼容性瓶颈，结构化参数与错误诊断待统一 |
| **边缘与硬件部署** | Zeroclaw (#3525 Termux/Android, #3517 树莓派 GPIO)、PicoClaw (#407 ARMv7 尝试)、OpenClaw (#45504 本地网关 CLI 失效) | 从云端向端侧延伸，但 32 位/ARM 兼容性债务普遍 |
| **IM 渠道多模态** | NanoBot (#2010 WhatsApp 媒体, #2016 NapCat QQ)、OpenClaw (#45171 WhatsApp 主动发送失效)、CoPaw (#981 飞书/QQ 文件传输)、ZeptoClaw (#357 Discord 图片修复) | 图片/文件/语音成为渠道能力分水岭，"能收不能发"的半残状态困扰企业用户 |
| **开发者体验/首次引导** | TinyClaw (#193 + #214 Web 化配置)、NanoBot (#2006 onboard 向导)、NanoClaw (#1080 沙盒迁移陡峭)、NullClaw (#508 Subagent 文档缺失) | 配置门槛成为新用户流失主因，交互式引导 vs 文档完备性两条路径 |

---

## 5. 差异化定位分析

| 项目 | 核心功能侧重 | 目标用户画像 | 技术架构关键差异 |
|:---|:---|:---|:---|
| **OpenClaw** | 企业级多网关、50+ 渠道、执行信任窗口 | 中大型团队 IT 管理员、SRE | Node.js + 插件化通道架构，强调水平扩展 |
| **NanoBot** | 中文渠道深度适配（QQ/飞书/企微）、Token 成本追踪 | 中国开发者、远程办公场景 | Python + 异步内存整理，本土化响应速度最快 |
| **Zeroclaw** | 边缘硬件支持（Android/树莓派）、硬件插件系统 | 极客、IoT 开发者、隐私优先用户 | Rust + 安全沙箱，v0.3.0 后转向"可托管代理运行时" |
| **PicoClaw** | Agent 架构 2.0 重构、事件驱动循环、Azure OpenAI 企业支持 | 架构师、企业 Azure 用户 | Go + 强类型配置，追求"可审计核心" |
| **IronClaw** | 生产级 Rust 实现、WASM 通道、零 panic 安全 | 对稳定性极度敏感的企业 | Rust + 严格 CI 审查，性能优化（N+1 查询消除） |
| **NanoClaw** | 最小可审计核心、技能市场愿景、混合检索内存 | 安全敏感的高级用户、研究者 | TypeScript + 容器/沙盒双模式，"核心+扩展"哲学 |
| **TinyClaw** | 极简架构、扁平化消息队列、Web 化配置 | 非技术背景用户、小团队 | 架构激进简化，追求"5 分钟上手" |
| **Moltis** | 多 Agent 编排、PTY 伪终端控制、本地 LLM 热重载 | Claude Code 深度用户、自动化工程师 | Rust + 本地模型优先，强调"自主 Agent 系统" |
| **CoPaw** | 多频道统一抽象、首次贡献者友好、Dangerous 命令检测 | 中文社区开发者、多平台运营者 | Python + 频道抽象层，社区运营活跃 |
| **ZeptoClaw** | ACP 协议支持、默认安全 fail-safe、Zhipu 生态 | 协议标准化推动者、国产模型用户 | Rust + ACP 双通道，定位"可托管代理运行时" |

---

## 6. 社区热度与成熟度分层

| 层级 | 项目 | 特征 | 关键指标 |
|:---|:---|:---|:---|
| **🔥 超头部** | OpenClaw | 绝对规模领先，但质量危机 | 1000+ 日活，v2026.3.12 回归事件，社区焦虑 |
| **🚀 快速迭代期** | NanoBot、Zeroclaw、CoPaw | 功能扩张与渠道覆盖为主 | 50-80 日活，版本/PR 节奏快，首次贡献者活跃 |
| **🛠️ 架构重构期** | PicoClaw、NanoClaw | 核心设计决策待确认 | 事件驱动 Agent、Team Mode 等提案深度讨论，Bug 堆积 |
| **✅ 质量巩固期** | IronClaw、Moltis、ZeptoClaw | 测试覆盖与生产安全优先 | 高合并率、CI 自动化、零 panic/默认安全策略 |
| **📈 功能蓄力期** | TinyClaw、LobsterAI | 关键 PR 矩阵待发 | 5 PR 待合并、Agent 架构重组完成，即将跃迁 |
| **💤 休眠/观察** | EasyClaw | 24h 无活动 | 需关注项目可持续性 |

---

## 7. 值得关注的趋势信号

| 趋势 | 信号来源 | 对开发者的参考价值 |
|:---|:---|:---|
| **"稳定性危机"成为生态共性挑战** | OpenClaw v2026.3.12、NanoBot post3→post4 升级失效、PicoClaw Cron 系统 Bug | **发布节奏需与质量管控解耦**：建议采用 IronClaw 的 CI 自动化审查 + Zeroclaw 的通道测试矩阵，而非单纯依赖社区反馈 |
| **"安全-可用性"张力显性化** | Zeroclaw #1478 "过度安全导致玩具化"、OpenClaw 执行信任窗口、ZeptoClaw 默认审批策略 | **梯度安全模型成为标配**：开发者需提供明确的"完全自主"配置路径，而非层层嵌套的隐藏开关 |
| **多 Agent 从"功能"转向"架构"** | PicoClaw #1316 事件驱动重构、NanoBot Team Mode、Moltis PTY 编排 | **可观测性成为瓶颈**：子 Agent 黑盒问题（NanoBot #1955）先于编排能力爆发，建议优先投资 tracing/干预接口 |
| **渠道能力从"覆盖"转向"深度"** | WhatsApp "自动回复可用/主动发送失效"、Discord 图片修复、QQ 文件传输 | **"半残集成"比"缺失"更损害信任**：企业用户宁愿等待完整功能，也不愿调试不可预测的部分工作系统 |
| **MCP/工具协议成为新兼容性战场** | IronClaw MCP 认证、NanoBot Coder 模型 JSON 严格性、OpenClaw Tool not found | **工具调用层需要标准测试套件**：建议社区共建"模型-工具"兼容性矩阵，避免重复踩坑 |
| **边缘部署从"尝鲜"转向"刚需"** | Zeroclaw Android/树莓派、PicoClaw ARMv7 尝试、OpenClaw 本地网关 CLI 失效 | **32 位/ARM 兼容性债务需提前偿还**：云端优先的架构决策正在反噬端侧部署需求 |
| **开发者体验成为差异化关键** | TinyClaw Web 化配置、NanoBot onboard 向导、NullClaw Subagent 文档缺失 | **"5 分钟上手"与"深度可配置"需并行**：CLI 原生项目面临 Web 化压力，文档完备性直接影响采用曲线 |

---

*分析基于 2026-03-15 各项目 GitHub 开放数据，建议 7 日后追踪 OpenClaw 稳定性修复、PicoClaw Agent 重构决策、TinyClaw 版本发布等关键节点。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 | 2026-03-15

---

## 1. 今日速览

NanoBot 今日呈现**高度活跃的开发态势**，24小时内产生 **27 条 Issues 更新**（20条活跃/新开，7条关闭）和 **57 条 PR 更新**（34条待合并，23条已合并/关闭），无新版本发布。社区聚焦于**多模态能力扩展**（QQ/WhatsApp 图片/文件传输）、**开发者体验优化**（交互式配置向导 `nanobot onboard`）、以及**核心架构改进**（异步内存整理、团队协作者模式）。中文社区贡献活跃，渠道适配（QQ、飞书、企业微信）成为近期重点。

---

## 2. 版本发布

**无新版本发布**

当前最新版本仍为 `v0.1.4.post4`。值得注意的是，[#1765](https://github.com/HKUDS/nanobot/issues/1765) 报告了从 `post3` 源码升级至 `post4` 的回归问题，用户反馈 `pip install -e .` 方式失效。

---

## 3. 项目进展

### 已合并/关闭的关键 PR（23条中的核心项）

| PR | 作者 | 核心贡献 |
|:---|:---|:---|
| [#1684](https://github.com/HKUDS/nanobot/pull/1684) | @who96 | **修复 CLI agent 模式的 cron 存储路径不一致问题** —— 统一使用 workspace-scoped 存储，解决 gateway 与 agent 模式任务不共享的痛点 |
| [#2006](https://github.com/HKUDS/nanobot/pull/2006) | @chengyongru | **交互式配置向导 `nanobot onboard`** —— 支持方向键导航，大幅降低新手配置门槛 |
| [#126](https://github.com/HKUDS/nanobot/pull/126) | @birdxs | **Docker 镜像自动构建** —— 已验证推送至 ghcr/dockerhub，解决部署标准化需求 |

### 待合并的重要 PR（34条中的亮点）

| PR | 作者 | 前瞻价值 |
|:---|:---|:---|
| [#2013](https://github.com/HKUDS/nanobot/pull/2013) | @pancacake | **Nano Team Mode** —— LLM 自动规划 2-3 人微团队协作，异步 worker + 共享任务板，可能重塑多 agent 架构 |
| [#2002](https://github.com/HKUDS/nanobot/pull/2002) | @shenchengtsi | **Inter-agent 通信通道** —— HTTP 直连多实例，无需人工中继 |
| [#2016](https://github.com/HKUDS/nanobot/pull/2016) | @ceke233 | **NapCat QQ 渠道** —— OneBot 11 协议支持，含消息防抖与输入模拟 |
| [#2010](https://github.com/HKUDS/nanobot/pull/2010) | @Zeknes | **WhatsApp 媒体收发** —— 图片/音频/视频/文档全支持 |
| [#2023](https://github.com/HKUDS/nanobot/pull/2023) | @who96 | **技能启用/禁用开关** —— 通过 frontmatter `enabled: false` 实现，无需删除文件 |
| [#2022](https://github.com/HKUDS/nanobot/pull/2022) | @who96 | **Token 用量追踪** —— 写入 `usage.jsonl`，解决成本可视化痛点 |
| [#2024](https://github.com/HKUDS/nanobot/pull/2024) | @LFZDavid | **本地思考模型兼容修复** —— Qwen3 等模型返回空 content 时自动重试合成 |

---

## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 评论 | 核心诉求 |
|:---|:---|:---|
| [#1955](https://github.com/HKUDS/nanobot/issues/1955) | 10条 | **子 Agent 执行过程可观测性** —— 当前子 agent 为黑盒，用户要求类似主 agent 的循环/工具调用可视化 |
| [#1692](https://github.com/HKUDS/nanobot/issues/1692) | 6条 | **Telegram 双消息渲染问题** —— Markdown 与纯文本各发一次，配置排查中 |
| [#1932](https://github.com/HKUDS/nanobot/issues/1932) | 4条 | **技能禁用需求** —— 已有关联 PR [#2023](https://github.com/HKUDS/nanobot/pull/2023) 待合并 |
| [#2000](https://github.com/HKUDS/nanobot/issues/2000) | 4条 | **QQ 渠道图片识别** —— 用户已提供修复代码，社区贡献典型 |
| [#1988](https://github.com/HKUDS/nanobot/issues/1988) | 4条 | **企业微信渠道配置失效** —— `nanobot gateway` 报 "No Channels Enabled" |

### 背后诉求分析

- **可观测性焦虑**：#1955 反映多 agent 架构下的调试痛点，与 #2013 Team Mode 形成呼应
- **渠道碎片化**：QQ、企业微信、飞书等国内渠道适配需求集中爆发，国际化与本土化并行
- **配置门槛**：#2018/#2019 的 onboard 向导反馈表明，JSON 手动配置仍是新用户流失点

---

## 5. Bug 与稳定性

| 优先级 | Issue | 描述 | Fix PR |
|:---|:---|:---|:---|
| 🔴 **高** | [#1998](https://github.com/HKUDS/nanobot/issues/1998) | **Coder 类模型兼容崩溃** —— GLM-5/Qwen-3.5 报 `function.arguments must be JSON` | 无，需关注 |
| 🔴 **高** | [#1174](https://github.com/HKUDS/nanobot/issues/1174) | **内存整理阻塞/失败** —— 本地模型无法合并记忆，会话无法启动 | [#1961](https://github.com/HKUDS/nanobot/pull/1961) 异步重构中 |
| 🟡 **中** | [#1692](https://github.com/HKUDS/nanobot/issues/1692) | Telegram 双消息渲染 | 无 |
| 🟡 **中** | [#1829](https://github.com/HKUDS/nanobot/issues/1829) | 自定义命令创建后失效 | 无 |
| 🟡 **中** | [#2007](https://github.com/HKUDS/nanobot/issues/2007) | 飞书长对话后 `tool role` 400 错误 | 无 |
| 🟡 **中** | [#1765](https://github.com/HKUDS/nanobot/issues/1765) | 源码升级 `post3→post4` 失效 | 无 |
| 🟢 **低** | [#1956](https://github.com/HKUDS/nanobot/issues/1956) | CLI 输出格式残留 `nanobot is thinking...` | 无 |

---

## 6. 功能请求与路线图信号

| 需求 | Issue/PR | 纳入可能性 | 关键信号 |
|:---|:---|:---|:---|
| **技能启用/禁用开关** | [#1932](https://github.com/HKUDS/nanobot/issues/1932) → [#2023](https://github.com/HKUDS/nanobot/pull/2023) | ⭐⭐⭐⭐⭐ 高 | PR 已提交，good first issue |
| **Token/成本追踪** | [#2020](https://github.com/HKUDS/nanobot/issues/2020) → [#2022](https://github.com/HKUDS/nanobot/pull/2022) | ⭐⭐⭐⭐⭐ 高 | PR 已提交，企业用户刚需 |
| **异步内存整理** | [#1961](https://github.com/HKUDS/nanobot/pull/1961) | ⭐⭐⭐⭐☆ 中高 | 解决 #1174 长期痛点 |
| **Nano Team 多 Agent 协作** | [#2013](https://github.com/HKUDS/nanobot/pull/2013) | ⭐⭐⭐⭐☆ 中高 | 架构级创新，需评估稳定性 |
| **Tavily 搜索提供商** | [#2012](https://github.com/HKUDS/nanobot/pull/2012) | ⭐⭐⭐⭐☆ 中高 | 搜索能力多元化 |
| **OpenRouter 模型支持** | [#2026](https://github.com/HKUDS/nanobot/pull/2026) | ⭐⭐⭐☆☆ 中 | 解决 #847 长期需求 |
| **多自定义 Provider** | [#1991](https://github.com/HKUDS/nanobot/issues/1991) | ⭐⭐⭐☆☆ 中 | 模型切换灵活性 |
| **子 Agent 可观测性** | [#1955](https://github.com/HKUDS/nanobot/issues/1955) | ⭐⭐⭐☆☆ 中 | 与 Team Mode 相关 |
| **远程文件检索** | [#2025](https://github.com/HKUDS/nanobot/issues/2025) | ⭐⭐☆☆☆ 低 | 安全边界需评估 |

---

## 7. 用户反馈摘要

### 痛点
- **配置复杂**："手动编辑 JSON 容易出错" → 推动 onboard 向导诞生
- **渠道适配不稳定**：企业微信"配置后仍报 No Channels Enabled"、QQ"文件发送失败"
- **模型兼容性**：Coder 类模型 JSON 格式严格性导致调用失败，Agent 优化模型（Kimi-2.5）表现更好
- **内存整理阻塞**：长会话用户被迫等待或无法启动新会话

### 满意点
- **交互式向导**：#2018/#2019 反馈积极，方向键导航获认可
- **社区响应速度**：QQ 图片识别问题用户主动提供修复代码，PR 化路径通畅

### 典型使用场景
- **远程办公**：通过 QQ 渠道远程检索 PC 文件（#2025）
- **多模型切换**：需要同时配置多个自定义 endpoint（#1991）
- **成本管控**：企业用户需要 token 用量追踪（#2020）

---

## 8. 待处理积压

| Issue/PR | 创建时间 | 状态 | 提醒 |
|:---|:---|:---|:---|
| [#126](https://github.com/HKUDS/nanobot/pull/126) Docker CI | 2026-02-05 | 开放 37 天 | 已验证可用，建议合并以标准化发布流程 |
| [#1306](https://github.com/HKUDS/nanobot/pull/1306) Discord 语音/TTS | 2026-02-28 | 开放 15 天 | 多模态能力，需 review 测试覆盖 |
| [#1174](https://github.com/HKUDS/nanobot/issues/1174) 内存整理阻塞 | 2026-02-25 | 开放 18 天 | 有 #1961 异步重构 PR，建议优先 review |
| [#847](https://github.com/HKUDS/nanobot/issues/847) OpenRouter 支持 | 历史遗留 | 关联 #2026 | 用户长期诉求，PR 已现 |

---

**报告生成时间**：2026-03-15  
**数据来源**：HKUDS/nanobot GitHub 公开 API  
**健康度评估**：🟢 活跃 — 开发节奏快，社区参与度高，渠道适配与开发者体验为近期主轴

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 | 2026-03-15

## 1. 今日速览

Zeroclaw 昨日呈现**极高活跃度**，24小时内处理 **31 条 Issues**（关闭率 61%）和 **50 条 PR**（合并率 64%），并密集发布 **10 个版本**（含 v0.3.0 正式版及多个 beta）。项目正处于**快速迭代期**，核心贡献者 Argenis 主导发布节奏，Claude Opus 4.6 持续参与代码贡献。社区关注点集中在**安全策略过严**、**Matrix 通道缺陷**、**Homebrew 安装体验**三大领域，多个高优先级修复 PR 已提交待审。

---

## 2. 版本发布

### v0.3.0（正式版）🔥
| 属性 | 内容 |
|:---|:---|
| **发布日期** | 2026-03-14 |
| **核心更新** | ① 通道矩阵全面测试覆盖；② CI 自动化：发布时自动同步 README 更新日志与贡献者列表 |
| **破坏性变更** | 无 |
| **迁移注意** | 建议升级后验证 `channels_config` 配置，Matrix/飞书通道已加强测试 |

### 版本发布节奏异常密集
- **v0.3.0-beta.201 / v0.3.0-beta.200 / v0.3.0-beta.196**：持续增量优化
- **v0.2.2-beta.190**：通道测试回退版本
- **v0.2.1 系列**（正式版+4个beta）：包含 crates.io 发布工作流、工具过滤组、交互会话状态持久化、企业微信 Webhook 通道等

> 🔗 完整发布日志：https://github.com/zeroclaw-labs/zeroclaw/releases

---

## 3. 项目进展

### 已合并/关闭的关键 PR

| PR | 作者 | 进展说明 |
|:---|:---|:---|
| [#3525](https://github.com/zeroclaw-labs/zeroclaw/pull/3525) | @theonlyhennygod | **Termux/Android 官方支持**：新增 `aarch64-linux-android` 构建目标，移动端部署门槛大幅降低 |
| [#3516](https://github.com/zeroclaw-labs/zeroclaw/pull/3516) / [#3484](https://github.com/zeroclaw-labs/zeroclaw/pull/3484) | @theonlyhennygod / @blizzardwj | **文档清理**：移除 39 处已废弃的 CLI 标志引用（`--interactive`, `--onboard` 等），减少用户困惑 |
| [#3515](https://github.com/zeroclaw-labs/zeroclaw/pull/3515) / [#3483](https://github.com/zeroclaw-labs/zeroclaw/pull/3483) | @theonlyhennygod / @JimmyHu213 | **Anthropic 稳定性修复**：跳过空文本内容块，解决 API 400 错误导致的会话崩溃 |
| [#3482](https://github.com/zeroclaw-labs/zeroclaw/pull/3482) | @5queezer | **安装器健壮性**：修复 Debian 系统 `/dev/stdin` 权限问题 |

**整体推进评估**：项目完成从 v0.2.x 到 v0.3.0 的里程碑跨越，Android 支持扩展用户场景，文档与安装体验同步打磨，稳定性问题响应迅速。

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues

| Issue | 评论 | 核心诉求 | 状态 |
|:---|:---:|:---|:---:|
| [#1478](https://github.com/zeroclaw-labs/zeroclaw/issues/1478) | **35** | **安全策略 vs 可用性的激烈冲突**：用户配置全放开后仍被拒绝执行 ffmpeg 安装等操作，质疑"过度安全导致玩具化" | ✅ 已关闭 |
| [#1857](https://github.com/zeroclaw-labs/zeroclaw/issues/1857) | 5 | Docker 环境变量无法被 agent 工具访问 | ✅ 已关闭 |
| [#2494](https://github.com/zeroclaw-labs/zeroclaw/issues/2494) | 5 | 飞书通道配置错误导致连接失败 | ✅ 已关闭 |
| [#1889](https://github.com/zeroclaw-labs/zeroclaw/issues/1889) | 4 | 技能包含脚本文件被安全策略拦截，请求配置白名单 | ✅ 已关闭 |
| [#1458](https://github.com/zeroclaw-labs/zeroclaw/issues/1458) | 4 | 自定义推理端点需要本地 CA 证书支持 | ✅ 已关闭 |

**诉求分析**：#1478 的 35 条评论反映**安全模型的可配置性**是社区最大痛点——用户需要"完全自主模式"的明确路径，而非层层嵌套的安全限制。该 Issue 虽关闭，但后续 #1889、#1800 等持续围绕此主题，说明需求未根本解决。

---

## 5. Bug 与稳定性

### 按严重程度排列

| 严重度 | Issue | 问题描述 | Fix PR 状态 |
|:---|:---|:---|:---:|
| **S0** | [#2499](https://github.com/zeroclaw-labs/zeroclaw/issues/2499) | Win11 双击 zeroclaw.exe 闪退 | ✅ 已关闭 |
| **S0** | [#3417](https://github.com/zeroclaw-labs/zeroclaw/issues/3417) | 守护进程创建多余的 `~` 文件夹 | ✅ 已关闭 |
| **S0** | [#3491](https://github.com/zeroclaw-labs/zeroclaw/issues/3491) | Nextcloud Talk 通道持续损坏 | ✅ 已关闭 |
| **S0** | [#3463](https://github.com/zeroclaw-labs/zeroclaw/issues/3463) | install.sh 返回 404 | ✅ 已关闭 |
| **S1** | [#3454](https://github.com/zeroclaw-labs/zeroclaw/issues/3454) / [#3508](https://github.com/zeroclaw-labs/zeroclaw/issues/3508) | Web Dashboard 404 无法加载 | 🔄 **待处理**（2个重复报告）|
| **S1** | [#3476](https://github.com/zeroclaw-labs/zeroclaw/issues/3476) | Signal 通道只能接收不能发送 | ✅ 已关闭 |
| **S1** | [#3460](https://github.com/zeroclaw-labs/zeroclaw/issues/3460) | 飞书通道上下文窗口超限 | ✅ 已关闭 |
| **S1** | [#3456](https://github.com/zeroclaw-labs/zeroclaw/issues/3456) | WhatsApp 通道权限问题 | 🔄 **待处理** |
| **S2** | [#3468](https://github.com/zeroclaw-labs/zeroclaw/issues/3468) | Rust 1.94+ 编译 matrix-sdk 递归深度溢出 | 🔄 **待处理** |

### 关键修复 PR（待合并）

| PR | 修复目标 |
|:---|:---|
| [#3527](https://github.com/zeroclaw-labs/zeroclaw/pull/3527) | 通道驱动运行绕过 ApprovalManager 的安全漏洞 |
| [#3524](https://github.com/zeroclaw-labs/zeroclaw/pull/3524) / [#3526](https://github.com/zeroclaw-labs/zeroclaw/pull/3526) | Homebrew 首次启动目录不存在/配置路径混乱 |
| [#3523](https://github.com/zeroclaw-labs/zeroclaw/pull/3523) / [#3519](https://github.com/zeroclaw-labs/zeroclaw/pull/3519) | Matrix 图像标记大小写不匹配导致多模态失效 |
| [#3522](https://github.com/zeroclaw-labs/zeroclaw/pull/3522) | Matrix 回复因 channel key 不匹配被静默丢弃 |
| [#3521](https://github.com/zeroclaw-labs/zeroclaw/pull/3521) | 32位目标编译失败（未声明 AtomicU32）|

---

## 6. 功能请求与路线图信号

| Issue/PR | 内容 | 纳入可能性评估 |
|:---|:---|:---:|
| [#3502](https://github.com/zeroclaw-labs/zeroclaw/issues/3502) | **真正的多智能体系统**：上下文工程、文件级系统提示、工具/技能隔离 | ⭐⭐⭐ 高（Supersedes #3046，架构级需求）|
| [#3478](https://github.com/zeroclaw-labs/zeroclaw/issues/3478) | SQLite 后端 9 阶段评分管道 + 三层生命周期管理 | ⭐⭐⭐ 高（零依赖，性能优化方向）|
| [#3517](https://github.com/zeroclaw-labs/zeroclaw/pull/3517) | **硬件插件系统**：树莓派 GPIO、Aardvark I2C/SPI/GPIO | ⭐⭐⭐ 高（feature-gated，已提 PR）|
| [#3518](https://github.com/zeroclaw-labs/zeroclaw/pull/3518) | Ollama 可配置上下文窗口 via `ZEROCLAW_OLLAMA_NUM_CTX` | ⭐⭐⭐ 高（简单实用，已提 PR）|
| [#3529](https://github.com/zeroclaw-labs/zeroclaw/pull/3529) | OpenAI Codex 流式增量解码与部分失败容忍 | ⭐⭐⭐ 高（可靠性提升）|
| [#3520](https://github.com/zeroclaw-labs/zeroclaw/pull/3520) | Google Workspace 工具集（标题不完整） | ⭐⭐☆ 中（企业集成方向）|

**路线图信号**：v0.4.0 已启动（[#3528](https://github.com/zeroclaw-labs/zeroclaw/pull/3528)），重点方向包括**边缘硬件支持**、**多智能体架构**、**移动端部署**。

---

## 7. 用户反馈摘要

### 😤 核心痛点

> *"你们是注重安全，但却什么功能都不能用了... 安全到这个 bot 只能当个聊天机器人，其余的一概拒绝执行"* — #1478

- **安全策略透明度不足**：用户无法明确知晓"完全放开"的具体配置路径
- **Homebrew 体验断裂**：交互式引导配置 `~/.zeroclaw`，但服务实际使用 `/opt/homebrew/var/zeroclaw`（#3466）
- **通道质量参差**：Matrix、飞书、Signal、Nextcloud Talk 等通道存在大小写、key 匹配、发送/接收不对称等"最后一公里"问题

### ✅ 满意点

- 安装脚本便捷性（当 404 问题解决后）
- 多通道架构的扩展潜力
- 社区响应速度（多数 Issue 24-48 小时内关闭）

### 🎯 典型使用场景

| 场景 | 代表 Issue | 障碍 |
|:---|:---|:---|
| 个人自动化助手（本地工具执行） | #1478, #1889 | 安全策略拦截 |
| 企业 IM 集成（飞书/企微/钉钉） | #2494, #1458 | 配置复杂、证书支持不足 |
| 自托管隐私优先部署 | #3476, #3487 | 通道功能不完整、审批流缺失 |
| 移动端/边缘设备 | #3525 | 此前无官方构建 |

---

## 8. 待处理积压

### 需维护者关注的高优先级项

| Issue/PR | 积压原因 | 建议行动 |
|:---|:---|:---|
| [#3454](https://github.com/zeroclaw-labs/zeroclaw/issues/3454) / [#3508](https://github.com/zeroclaw-labs/zeroclaw/issues/3508) | Web Dashboard 404 重复报告，影响首次体验 | 确认是否为构建产物缺失或路由配置问题 |
| [#3487](https://github.com/zeroclaw-labs/zeroclaw/issues/3487) | 通道运行绕过审批管理器的**安全漏洞** | 优先合并 #3527 |
| [#3486](https://github.com/zeroclaw-labs/zeroclaw/issues/3486) / [#3477](https://github.com/zeroclaw-labs/zeroclaw/issues/3477) | Matrix 双问题：图像标记大小写 + 回复 key 不匹配 | 合并 #3523 / #3519 / #3522 |
| [#3466](https://github.com/zeroclaw-labs/zeroclaw/issues/3466) / [#3464](https://github.com/zeroclaw-labs/zeroclaw/issues/3464) | Homebrew 安装路径混乱 | 合并 #3524 / #3526 |
| [#3513](https://github.com/zeroclaw-labs/zeroclaw/issues/3513) | Agent 聊天发送多条消息而非单条回复 | 待诊断是否为流式处理逻辑问题 |
| [#3474](https://github.com/zeroclaw-labs/zeroclaw/issues/3474) | Docker/Podman 重启文档缺失 | 补充运维文档 |

---

**日报生成时间**：2026-03-15  
**数据基准**：GitHub API 24h 滚动窗口  
**项目健康度**：🟢 活跃（高合并率、快速响应、版本迭代密集）⚠️ 需关注（Dashboard、Matrix、Homebrew 体验问题集中爆发）

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 | 2026-03-15

## 1. 今日速览

PicoClaw 项目今日呈现**高度活跃状态**，24小时内产生 **20 条 Issues 更新**（18 条新开/活跃，仅 2 条关闭）和 **61 条 PR 更新**（34 条已合并/关闭，27 条待审阅），代码提交节奏密集。社区聚焦三大主线：**Agent 架构重构**（事件驱动循环提案引发深度讨论）、**企业级功能落地**（Azure OpenAI 支持正式合并）、**安全加固**（默认配置收紧、凭证加密、远程执行管控）。nightly 版本持续迭代，但 Cron 子系统暴露出多个高优先级 Bug，需紧急关注。

---

## 2. 版本发布

### 🔖 Nightly Build: v0.2.3-nightly.20260314.c68b4f39

| 属性 | 详情 |
|:---|:---|
| **版本类型** | 自动化夜间构建（不稳定） |
| **Commit** | `c68b4f39` |
| **完整变更日志** | [compare/v0.2.3...main](https://github.com/sipeed/picoclaw/compare/v0.2.3...main) |

> ⚠️ **使用警告**：此为自动化构建，可能存在不稳定因素，生产环境建议等待正式版本。

---

## 3. 项目进展

### ✅ 今日合并/关闭的关键 PR

| PR | 作者 | 核心贡献 | 项目推进价值 |
|:---|:---|:---|:---|
| [#1422](https://github.com/sipeed/picoclaw/pull/1422) | @kunalk16 | **Azure OpenAI 官方支持** | 解锁企业 Azure 订阅用户市场，完成 E2E 验证 |
| [#1442](https://github.com/sipeed/picoclaw/pull/1442) | @afjcjsbx | 自定义日志格式化器（JSON/多行字符串） | 解决 zerolog 默认输出不可读问题，提升运维体验 |
| [#1514](https://github.com/sipeed/picoclaw/pull/1514) | @clawaizhang | Kimi For Coding 模型支持（首版） | 突破 Coding Agent 限制，后被 [#1575](https://github.com/sipeed/picoclaw/pull/1575) 迭代 |
| [#1531](https://github.com/sipeed/picoclaw/pull/1531) | @horsley | 全语言 README 添加 DeepWiki 徽章 | 文档可发现性提升 |
| [#1566](https://github.com/sipeed/picoclaw/pull/1566), [#1571](https://github.com/sipeed/picoclaw/pull/1571), [#1573](https://github.com/sipeed/picoclaw/pull/1573) | @Capslockb | 文档/OrangePi 相关合并 | 硬件适配与文档维护 |

**里程碑意义**：Azure OpenAI 支持的落地标志着 PicoClaw 正式具备**企业级云 AI 平台对接能力**，与 OpenAI、SiliconFlow、Ollama 等形成完整提供商矩阵。

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues

| 排名 | Issue | 评论数 | 核心诉求分析 |
|:---|:---|:---:|:---|
| 1 | [#1316](https://github.com/sipeed/picoclaw/issues/1316) Agent 事件驱动重构 | **10** | **架构级变革诉求**：社区强烈要求打破 `runAgentLoop` 黑盒，实现可观测、可中断、可 Hook 的 Agent 执行流。这是 Agent 2.0 的核心基础设施提案。 |
| 2 | [#1506](https://github.com/sipeed/picoclaw/issues/1506) 飞书文件路径暴露（已关闭） | **9** | **工具链完整性诉求**：用户需要 Agent 能处理非图片文件（文档/音频/视频），已推动 PR [#1534](https://github.com/sipeed/picoclaw/pull/1534) 实现卡片消息解析。 |
| 3 | [#1216](https://github.com/sipeed/picoclaw/issues/1216) Meta: Agent 重构 | **7** | **技术债务共识**：维护者确认当前 Agent 语义已触及扩展极限，社区正协同设计下一代架构。 |

### 关联 PR 热度
- [#1517](https://github.com/sipeed/picoclaw/pull/1517) **Agent Steering**（ steering 功能）：允许用户在工具调用链执行中实时干预，直接回应 #1316 的可控性诉求。

---

## 5. Bug 与稳定性

### 🚨 高优先级 Bug（需立即关注）

| Issue | 严重度 | 状态 | 描述 | Fix PR |
|:---|:---:|:---|:---|:---:|
| [#1532](https://github.com/sipeed/picoclaw/issues/1532) | **HIGH** | 🔴 开放 | `picoclaw cron add` 指令存在严重 Bug，命令行解析异常 | 暂无 |
| [#1530](https://github.com/sipeed/picoclaw/issues/1530) | **HIGH** | 🔴 开放 | 安全：setup 接口默认启用 query-token 认证和通配符 CORS，攻击面过大 | 暂无 |
| [#1493](https://github.com/sipeed/picoclaw/issues/1493) | **MEDIUM** | 🔴 开放 | 新增模型配置需重启 gateway 才生效，热加载失效 | 暂无 |
| [#1578](https://github.com/sipeed/picoclaw/issues/1578) | **MEDIUM** | 🔴 开放 | `image_model` 配置字段未接入 Agent 循环，图片始终路由到主模型 | 暂无 |

### 🔧 已有 Fix PR 的 Bug

| Issue | Fix PR | 说明 |
|:---|:---|:---|
| [#1506](https://github.com/sipeed/picoclaw/issues/1506) 飞书文件路径暴露 | [#1534](https://github.com/sipeed/picoclaw/pull/1534) | 卡片消息解析 + 图片提取 |
| [#1568](https://github.com/sipeed/picoclaw/issues/1568) Cron 任务偶发仅发送描述 | 审查中 | 需确认 `deliver` 字段逻辑 |
| [#1567](https://github.com/sipeed/picoclaw/issues/1567) WhatsApp Native 构建失败 | 审查中 | 构建系统修复 |

### 安全加固进展
- [#1521](https://github.com/sipeed/picoclaw/pull/1521) **凭证加密**：AES-256-GCM + HKDF-SHA256 密钥派生，支持 SSH 密钥绑定
- [#1576](https://github.com/sipeed/picoclaw/pull/1576) **远程执行默认关闭**：`tools.exec.allow_remote` 改为 false，fail-closed 安全模型

---

## 6. 功能请求与路线图信号

### 🎯 已纳入实现轨道的功能

| 功能 | 来源 Issue | 实现 PR | 预计版本 |
|:---|:---|:---|:---:|
| 子 Agent 状态查询工具 | [#1539](https://github.com/sipeed/picoclaw/issues/1539) | [#1540](https://github.com/sipeed/picoclaw/pull/1540) | v0.2.3+ |
| Agent Steering（执行干预） | [#1316](https://github.com/sipeed/picoclaw/issues/1316) | [#1517](https://github.com/sipeed/picoclaw/pull/1517) | v0.2.3+ |
| 飞书话题群线程回复 | - | [#1537](https://github.com/sipeed/picoclaw/pull/1537) | v0.2.3+ |
| Kimi For Coding 支持 | - | [#1575](https://github.com/sipeed/picoclaw/pull/1575) | v0.2.3+ |

### 📋 路线图级提案（待决策）

| Issue | 信号强度 | 分析 |
|:---|:---:|:---|
| [#294](https://github.com/sipeed/picoclaw/issues/294) 多 Agent 协作框架 | ⭐⭐⭐⭐⭐ | 创建者 @Zepan 为项目核心成员，明确指向"从单 Agent 向多 Agent 架构迁移"，与 #1216 #1316 形成重构三部曲 |
| [#1474](https://github.com/sipeed/picoclaw/issues/1474) 能力发现端点 | ⭐⭐⭐⭐☆ | 编排层集成刚需，企业级部署前置条件 |
| [#1498](https://github.com/sipeed/picoclaw/issues/1498) 模型端搜索 + FastEmbed | ⭐⭐⭐☆☆ | RAG 能力补全诉求，需评估与现有工具链整合方案 |

---

## 7. 用户反馈摘要

### 😫 核心痛点

| 痛点 | 典型反馈来源 | 影响范围 |
|:---|:---|:---|
| **Cron 系统不稳定** | #1532, #1568, #1561, #1501 | 定时任务用户群体 |
| "心跳消耗 Token" — 后台机制成本不可控 | #1561 | 成本敏感用户 |
| "如何查看定时任务？" — 可观测性缺失 | #1501 | 运维体验 |
| **配置热加载失效** | #1493 | 多模型切换场景 |
| **技能名称解析 Bug** | #1533 | 技能生态开发者 |
| `skill-vetter` → `skill_vetter` 自动转换导致工具找不到 | | 命名规范不一致 |

### 😊 满意反馈

- Azure OpenAI 支持快速落地（#1424 从提出到关闭仅 2 天）
- 飞书文件处理能力持续完善（#1506 闭环）

### 🔧 使用场景洞察

> **边缘设备部署**：#407 显示用户尝试在 ARMv7 32位系统（树莓派）运行，但飞书通道明确不支持，提示需完善架构兼容性文档。

> **企业安全合规**：#1530 的安全审计反馈表明 PicoClaw 正进入企业级部署阶段，用户关注默认安全基线。

---

## 8. 待处理积压

### ⏳ 需维护者关注的高价值项

| Issue/PR | 创建时间 | 状态 | 关注理由 |
|:---|:---:|:---|:---|
| [#294](https://github.com/sipeed/picoclaw/issues/294) 多 Agent 协作框架 | 2026-02-16 | 🟡 开放（3 评论） | **路线图核心**，但讨论深度不足，需核心团队介入推进设计 |
| [#751](https://github.com/sipeed/picoclaw/pull/751) WebSocket Gateway | 2026-02-25 | 🟡 开放（长期） | 实时通信基础设施，影响 #1316 事件驱动架构的实现方式 |
| [#757](https://github.com/sipeed/picoclaw/pull/757) Cron 任务回复丢失修复 | 2026-02-25 | 🟡 开放（长期） | 与今日多个 Cron Bug 直接相关，可能为根因修复 |
| [#1050](https://github.com/sipeed/picoclaw/pull/1050) MiniMax 模型适配 | 2026-03-04 | 🟡 开放 | 国产模型兼容，需审查 `<think>` 标签处理逻辑 |

### 📊 健康度指标

| 指标 | 数值 | 评估 |
|:---|:---:|:---|
| Issue 关闭率 | 10% (2/20) | ⚠️ 偏低，积压风险 |
| PR 合并率 | 56% (34/61) | ✅ 健康，代码流动顺畅 |
| 高优先级 Bug 响应 | 0/3 有 Fix PR | 🔴 需加速 |
| 社区提案活跃度 | 10+ 评论 Issue 存在 | ✅ 架构讨论充分 |

---

*本日报基于 GitHub 公开数据生成，反映 2026-03-14 至 2026-03-15 期间项目动态。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目日报 | 2026-03-15

> **项目**: [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)  
> **日期**: 2026-03-15  
> **数据周期**: 过去24小时

---

## 1. 今日速览

NanoClaw 今日保持**高活跃度**，24小时内产生 **18 条活跃 Issues**（全部为新开/活跃，0 关闭）和 **50 条 PR 更新**（44 待合并，6 已合并/关闭）。核心开发聚焦于**代理学习行为增强**（#910-#913 系列）与**Slack 渠道功能完善**，但技能分支合并流水线出现多次故障（#1073-#1075），提示技能模块化架构的维护成本正在上升。社区层面，新用户迁移摩擦显著（#1080），平台兼容性文档存在矛盾（#1075），需关注入门体验优化。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 已合并/关闭 PR（6 条）

| PR | 作者 | 核心贡献 | 影响评估 |
|:---|:---|:---|:---|
| [#1081](https://github.com/qwibitai/nanoclaw/pull/1081) | @baymax-deng | **Slack 表情反应支持** — 入站/出站双向 emoji 反应 | ⭐ 提升 Slack 交互自然度 |
| [#1082](https://github.com/qwibitai/nanoclaw/pull/1082) | @baymax-deng | **Slack 线程回复支持** — 全栈 `threadId` 参数打通 | ⭐ 解决频道消息混乱问题 |
| [#1078](https://github.com/qwibitai/nanoclaw/pull/1078) | @trevorWieland | **Discord 发送失败回滚机制** — 错误传播+光标回滚 | 🔧 可靠性修复 |
| [#944](https://github.com/qwibitai/nanoclaw/pull/944) | @dinocode00 | ~~即时处理确认消息~~（已关闭） | — |
| [#1077](https://github.com/qwibitai/nanoclaw/pull/1077) | @sumanth-reddy13 | ~~Notion MCP 集成~~（已关闭） | — |
| [#851](https://github.com/qwibitai/nanoclaw/pull/851) | @omonk | ~~贡献文档扩展~~（已关闭） | — |

**关键进展**: Slack 渠道功能完成重要迭代，线程与反应支持使其达到生产级可用标准。Discord 可靠性修复填补了消息丢失漏洞。

---

## 4. 社区热点

### 讨论最活跃的 Issue

| 排名 | Issue | 评论 | 核心诉求 |
|:---|:---|:---|:---|
| 🥇 | [#384](https://github.com/qwibitai/nanoclaw/issues/384) 技能市场/注册中心 | 8 条评论, 14 👍 | **架构愿景共识** — 用户高度认同 "最小可审计核心 + 按需扩展" 的安全模型，呼吁建立官方技能发现机制 |
| 🥈 | [#829](https://github.com/qwibitai/nanoclaw/issues/829) SOUL.md 反伪造规则 | 1 条评论 | **代理可信度** — 3月8日事件后，用户要求明确禁止代理虚构工具执行记录 |
| 🥉 | [#911-#913](https://github.com/qwibitai/nanoclaw/issues/911) 代理学习行为系列 | 各1条评论 | **自主学习闭环** — 用户希望代理能主动创建技能、管理记忆，而非被动响应 |

**趋势洞察**: #384 的高参与度（14 👍 为今日最高）反映社区对 **NanoClaw 差异化定位（安全最小化核心）** 的强烈认同，技能市场可能是下一个生态增长点。

---

## 5. Bug 与稳定性

| 优先级 | Issue | 描述 | 状态 |
|:---|:---|:---|:---|
| 🔴 **High** | [#1067](https://github.com/qwibitai/nanoclaw/issues/1067) | **Apple Container 启动竞态条件** — 系统重启时服务未就绪导致启动失败 | 🆕 新报告，无 fix PR |
| 🔴 **High** | [#911](https://github.com/qwibitai/nanoclaw/issues/911) | 技能自创建安全扫描（设计任务） | 开发中，关联 PR #1063 |
| 🟡 Medium | [#829](https://github.com/qwibitai/nanoclaw/issues/829) | SOUL.md 缺乏反伪造规则 | 待评估 |
| 🟡 Medium | [#753](https://github.com/qwibitai/nanoclaw/issues/753) | 助手名称更新遗漏 `groups/main/` | 待修复 |
| 🟡 Medium | [#698](https://github.com/qwibitai/nanoclaw/issues/698) | 代理无法从 ISO 时间戳确定星期几 | 待修复 |
| 🟢 Low | [#1073](https://github.com/qwibitai/nanoclaw/issues/1073) [#1074](https://github.com/qwibitai/nanoclaw/issues/1074) [#1066](https://github.com/qwibitai/nanoclaw/issues/1066) | **技能分支合并流水线故障** — `skill/apple-container`, `skill/compact`, `skill/ollama-tool` 合并失败 | 🔧 需手动介入 |

**风险评估**: 技能分支合并故障频发（3起/24h），提示 `main` 分支与技能分支的同步机制需要自动化改进，否则将拖累技能生态迭代速度。

---

## 6. 功能请求与路线图信号

### 高优先级功能（已有关联 PR）

| 功能 | Issue | PR | 纳入概率 |
|:---|:---|:---|:---|
| 结构化用户记忆（USER.md） | [#910](https://github.com/qwibitai/nanoclaw/issues/910) | [#1063](https://github.com/qwibitai/nanoclaw/pull/1063) | ✅ **高** — PR 已提交待审 |
| 混合检索内存（BM25+向量） | — | [#1043](https://github.com/qwibitai/nanoclaw/pull/1043) | ✅ **高** — 技术方案成熟 |
| 管理命令拦截（/capabilities） | [#926](https://github.com/qwibitai/nanoclaw/issues/926) | — | 🟡 中 — 设计文档已发布 |
| Telegram 回调键盘 | — | [#1014](https://github.com/qwibitai/nanoclaw/pull/1014) | 🟡 中 — 待审 |

### 战略级需求（无 PR）

| 功能 | Issue | 信号强度 |
|:---|:---|:---|
| **技能市场/注册中心** | [#384](https://github.com/qwibitai/nanoclaw/issues/384) | ⭐⭐⭐ 强 — 14 👍，契合项目核心定位 |
| QQ 机器人渠道 | [#852](https://github.com/qwibitai/nanoclaw/issues/852) | ⭐⭐ 中 — 中国市场扩展 |
| 通用 LLM 提供商支持 | — | [#557](https://github.com/qwibitai/nanoclaw/pull/557)（Blocked）| ⭐⭐ 中 — 技术债务风险 |

---

## 7. 用户反馈摘要

### 😤 痛点与摩擦

> *"九小时后我想把 Mac 泡进雪碧扔进车流"* — [#1080](https://github.com/qwibitai/nanoclaw/issues/1080) @rdguidry

- **沙盒迁移陡峭**: 新用户从容器迁移到沙盒环境遭遇目录访问配置困惑，文档缺乏"一键迁移"路径
- **平台兼容性混乱**: 官网称支持 Linux，README 称"即将推出"（[#1075](https://github.com/qwibitai/nanoclaw/issues/1075)）
- **Intel Mac 被遗弃**: Docker 沙盒不支持 Intel Mac，无替代安装路径（[#1079](https://github.com/qwibitai/nanoclaw/issues/1079)）

### ✅ 认可与场景

- **安全模型认同**: #384 评论显示高级用户深刻理解并推崇"审计核心+按需扩展"架构
- **容器内体验优秀**: #1080 用户承认容器内使用体验"super useful"

### 📊 需求优先级信号

| 场景 | 强度 | 来源 |
|:---|:---|:---|
| 非技术用户友好安装 | 🔥🔥🔥 | #1079, #1080 |
| 跨平台一致性文档 | 🔥🔥 | #1075 |
| 生产级 Slack 集成 | 🔥🔥 | #1081, #1082 快速合并 |

---

## 8. 待处理积压

### 长期 Blocked PR（需维护者决策）

| PR | 创建时间 | 阻塞原因 | 风险 |
|:---|:---|:---|:---|
| [#519](https://github.com/qwibitai/nanoclaw/pull/519) /compact 技能 | 2026-02-26 (17天) | 依赖 Claude SDK Compaction API beta | 上下文腐烂问题持续 |
| [#522](https://github.com/qwibitai/nanoclaw/pull/522) Slack 线程回复 | 2026-02-26 (17天) | 与 #1082 功能重叠？ | 社区重复劳动 |
| [#525](https://github.com/qwibitai/nanoclaw/pull/525) db.ts 模块化 | 2026-02-26 (17天) | 未知 | 技术债务累积 |
| [#538](https://github.com/qwibitai/nanoclaw/pull/538) 设置同步竞态 | 2026-02-26 (17天) | 未知 | 新用户 onboarding 风险 |
| [#543](https://github.com/qwibitai/nanoclaw/pull/543) Telegram Markdown | 2026-02-26 (17天) | 未知 | 渠道体验瑕疵 |
| [#546](https://github.com/qwibitai/nanoclaw/pull/546) Mattermost 渠道 | 2026-02-26 (17天) | 未知 | 企业用户扩展受阻 |
| [#551](https://github.com/qwibitai/nanoclaw/pull/551) Rollup CVE 修复 | 2026-02-27 (16天) | 未知 | **安全风险** |
| [#557](https://github.com/qwibitai/nanoclaw/pull/557) 通用 LLM 支持 | 2026-02-27 (16天) | 架构决策？ | 供应商锁定争议 |

### 建议行动

1. **紧急**: 评估 #551 安全修复，16天阻塞不可接受
2. **本周**: 清理技能分支合并流水线，自动化失败通知
3. **本月**: 回应 #384 技能市场愿景，或明确路线图立场

---

*日报生成基于 GitHub API 数据，部分 PR 评论数显示为 `undefined` 可能因 API 限制。*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 | 2026-03-15

## 1. 今日速览

NullClaw 今日呈现**高强度开发态势**，24小时内产生 **41 个 PR**（33 个待审）和 **16 个 Issues**（13 个活跃），版本迭代节奏紧凑（v2026.3.14 刚发布）。核心特征：**安全加固成为主旋律**——@manelsen 单日提交 12+ 个安全相关 PR，覆盖 HTTP 工具、密钥管理、通道认证等多层防线；同时 **Subagent 生态**成为用户关注焦点，文档缺失与功能边界问题被集中提出。项目健康度：**活跃且方向明确**，但 PR 审阅积压需关注。

---

## 2. 版本发布

### v2026.3.14 | [Release 页面](https://github.com/nullclaw/nullclaw/releases/tag/v2026.3.14)

| 维度 | 详情 |
|:---|:---|
| **发布日期** | 2026-03-14 |
| **版本类型** | 补丁版本（CalVer） |
| **核心变更** | 内存修复 + Claude CLI 会话恢复加固 |

**更新内容：**
- **Fix/memory** ([#486](https://github.com/nullclaw/nullclaw/pull/486)) - @DonPrus 修复内存相关问题
- **fix(claude-cli): scope resume sessions to nullclaw sessions** ([#478](https://github.com/nullclaw/nullclaw/pull/478)) - @manelsen 将会话恢复范围限定在 NullClaw 会话内
- **fix(claude-cli): harden resume session handling** - @manelsen 加固会话恢复处理逻辑

**迁移注意事项：** 无破坏性变更，建议所有用户升级以获得更稳定的会话恢复体验。

---

## 3. 项目进展

### 今日合并/关闭的关键 PR

| PR | 作者 | 影响 | 状态 |
|:---|:---|:---|:---|
| [#513](https://github.com/nullclaw/nullclaw/pull/513) Bump version to 2026.3.14 | @DonPrus | 版本迭代基础设施 | ✅ 已合并 |
| [#500](https://github.com/nullclaw/nullclaw/pull/500) fix(session): resolve dangling provider pointer in named-agent sessions | @vedmalex | **修复关键回归**——解决 `/bind <agent>` 后代理无响应、 `/new` 挂起的问题 | ✅ 已合并 |

**进展评估：** 今日合并量偏少（仅 8/41），但 [#500](https://github.com/nullclaw/nullclaw/pull/500) 修复了命名代理绑定的核心功能回归，稳定性向前迈进关键一步。大量高质量安全 PR 待审阅，预计下一版本将显著提升安全基线。

---

## 4. 社区热点

### 讨论最活跃的议题

| 排名 | Issue/PR | 评论数 | 热度分析 |
|:---|:---|:---:|:---|
| 🔥1 | [#341](https://github.com/nullclaw/nullclaw/issues/341) [bug] "Rate limit exceeded" with Alibaba coding plan | 6 | **已关闭**。Alibaba 编码套餐的速率限制问题，反映国内用户接入国际服务的典型痛点——配额策略不透明 |
| 🔥2 | [#508](https://github.com/nullclaw/nullclaw/issues/508) [Docs] Subagents configurations instruction and examples with binding/routing are needed! | 2 | **文档缺口被放大**。Subagent 作为核心差异化功能，配置文档缺失导致用户无法落地，@manelsen 已响应提交 [#547](https://github.com/nullclaw/nullclaw/pull/547) |
| 🔥3 | [#380](https://github.com/nullclaw/nullclaw/issues/380) [bug] Groq provider url incorrect | 3 | **已关闭**。简单的 URL 拼写错误，但暴露提供商配置的测试覆盖不足 |

**诉求洞察：** 用户已从"能跑通"转向"能配置好"——Subagent 的复杂路由绑定、多提供商差异化行为成为新 friction 点。

---

## 5. Bug 与稳定性

### 按严重程度排序

| 严重度 | Issue | 描述 | Fix PR | 状态 |
|:---|:---|:---|:---|:---|
| 🔴 **高** | [#525](https://github.com/nullclaw/nullclaw/issues/525) bot forgets settings (reasoning, verbose, think) | 机器人遗忘 `/reasoning on` 等设置，且 `/status` 不显示版本号 | 无 | 🆕 待处理 |
| 🔴 **高** | [#514](https://github.com/nullclaw/nullclaw/issues/514) Gateway silently fails when port is already in use, daemon hangs | 端口占用时网关静默失败，守护进程挂起 | 无 | 🆕 待处理 |
| 🟡 **中** | [#413](https://github.com/nullclaw/nullclaw/issues/413) file_read tool_call stopped (weather SKILL example) | file_read 工具调用中断，影响 Skill 执行 | 无 | 活跃，需复现 |
| 🟡 **中** | [#521](https://github.com/nullclaw/nullclaw/issues/521) ToolResult memory ownership inconsistency with catch "" | HTTP 请求工具内存所有权不一致 | [#543](https://github.com/nullclaw/nullclaw/pull/543) | ✅ 有 PR |
| 🟡 **中** | [#519](https://github.com/nullclaw/nullclaw/issues/519) curl timeout hardcoded, ignores config http_timeout_secs | 硬编码 60s 超时，忽略配置 | [#541](https://github.com/nullclaw/nullclaw/pull/541) | ✅ 有 PR |
| 🟢 **低** | [#504](https://github.com/nullclaw/nullclaw/issues/504) gateway --help and agent --help start the runtime instead of showing help | `--help` 意外启动运行时而非显示帮助 | 无 | ✅ 已关闭 |

**稳定性信号：** 配置持久化（#525）和端口冲突处理（#514）是两个未覆盖的粗糙边缘，建议优先处理。

---

## 6. 功能请求与路线图信号

| Issue | 需求 | 可行性评估 | 路线图信号 |
|:---|:---|:---|:---|
| [#553](https://github.com/nullclaw/nullclaw/issues/553) Subagent access to Skills | 子代理注入 Skills，非仅主代理可用 | **高**——架构上合理，社区强烈需求 | 可能纳入 v2026.3.15+ |
| [#540](https://github.com/nullclaw/nullclaw/issues/540) Local or Configurable Timezone in Prompt | 提示词时区可配置（当前硬编码 UTC） | **已实现**——[#546](https://github.com/nullclaw/nullclaw/pull/546) 待合并 | ✅ 即将发布 |
| [#520](https://github.com/nullclaw/nullclaw/issues/520) capture curl stderr for better error diagnostics | curl 错误诊断增强 | **已实现**——[#544](https://github.com/nullclaw/nullclaw/pull/544) 待合并 | ✅ 即将发布 |
| [#518](https://github.com/nullclaw/nullclaw/issues/518) remove dead code from std.http.Client migration | 清理迁移后死代码 | **中**——技术债务 | 维护者驱动 |
| [#517](https://github.com/nullclaw/nullclaw/issues/517) HTTP URLs allowed despite HTTPS-only policy | 强制 HTTPS 策略执行 | **已部分实现**——相关 PR 待审 | 安全基线强化 |

**下一版本预测：** 时区配置 + curl 诊断增强 + 大量安全加固，v2026.3.15 将是"可配置性+安全性"双提升版本。

---

## 7. 用户反馈摘要

### 真实痛点

> *"Subagents is a really great feature! But I cannot find any configuration instructions"* —— @neoliuhua ([#508](https://github.com/nullclaw/nullclaw/issues/508))

**核心矛盾：** 功能强大但落地困难。用户认可 Subagent 架构价值，但路由绑定、身份配置、Skill 继承等关键路径缺乏示例。

### 使用场景

| 场景 | 反馈 | 来源 |
|:---|:---|:---|
| 钉钉集成 | 成功接入并截图反馈（#490） | @feihua |
| 天气 Skill 调试 | 工具调用中断，需排查 file_read | @jacktang |
| 企业级部署 | 关注密钥轮换、HTTPS 强制、通配符警告等安全特性 | 多个安全 PR 隐含需求 |

### 满意度/不满意度

- ✅ **满意：** 多平台通道支持（钉钉、QQ、OneBot、Lark）、快速迭代响应
- ❌ **不满：** 配置文档滞后、设置状态不持久、错误诊断信息不足

---

## 8. 待处理积压

### 需维护者关注的高价值项

| 类型 | 条目 | 积压原因 | 建议动作 |
|:---|:---|:---|:---|
| **文档债** | [#508](https://github.com/nullclaw/nullclaw/issues/508) Subagent 文档 | 功能发布快于文档 | 加速审阅 [#547](https://github.com/nullclaw/nullclaw/pull/547) |
| **功能缺口** | [#553](https://github.com/nullclaw/nullclaw/issues/553) Subagent Skills 访问 | 架构决策待确认 | 评估是否纳入 v2026.3.15 |
| **PR 积压** | 33 个待审 PR，其中 12+ 为安全相关 | 审阅带宽不足 | 建议分批合并，优先安全类 |
| **稳定性** | [#525](https://github.com/nullclaw/nullclaw/issues/525) 设置遗忘 | 无明确负责人 | 分配诊断 |

---

**报告生成时间：** 2026-03-15  
**数据基础：** GitHub API 实时抓取  
**下次更新：** 建议 24 小时后追踪 PR 审阅进度

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 | 2026-03-15

---

## 1. 今日速览

IronClaw 项目在过去24小时呈现**高强度开发态势**：50个PR更新（32个待合并）、19个Issues处理（13个关闭），无新版本发布。核心团队聚焦于**生产代码安全加固**（消除panic路径）、**Google Sheets工具链修复**（解决OAuth与参数序列化问题）以及**性能优化**（N+1查询、SSE解析、内存分配）。CI自动化审查持续发力，单日触发8个高/严重级别代码质量告警。整体项目健康度良好，但文档缺失问题首次被用户显性提出，需关注。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 🔒 生产安全加固（核心里程碑）

| PR | 作者 | 关键变更 | 影响 |
|:---|:---|:---|:---|
| [#1184](https://github.com/nearai/ironclaw/pull/1184) | @ilblackdragon | 消除生产代码所有panic路径：`PolicyRule::new()`返回`Result`替代panic，`CreateJobTool`错误处理规范化 | **阻断性安全修复**，防止外部输入触发崩溃 |
| [#1160](https://github.com/nearai/ironclaw/pull/1160) | @henrypark133 | 替换grep-based panic检测为Rust-aware Python脚本，消除`#[cfg(test)]`误报 | CI可靠性提升 |

### 🛠️ 工具链与集成修复

| PR | 作者 | 关键变更 | 关联Issue |
|:---|:---|:---|:---|
| [#1143](https://github.com/nearai/ironclaw/pull/1143) | @henrypark133 | 统一schema-guided参数归一化层，修复Sheets/Docs类型强制转换 | #993, #1002 |
| [#1158](https://github.com/nearai/ironclaw/pull/1158) | @ilblackdragon | MCP认证错误处理：400→auth-required检测，OAuth后清除auth模式，token修剪 | — |
| [#1171](https://github.com/nearai/ironclaw/pull/1171) | @G7CNF | WASM热激活使用实时owner绑定，修复#1052的配对状态回退 | #1052 |
| [#1170](https://github.com/nearai/ironclaw/pull/1170) | @G7CNF | 工具补全添加`stop_sequences`参数对等支持 | #872 |

### ⚡ 性能优化

| PR | 作者 | 关键变更 | 性能收益 |
|:---|:---|:---|:---|
| [#1163](https://github.com/nearai/ironclaw/pull/1163) | @nickpismenkov | 修复routine_engine事件触发N+1查询模式 | 消除O(n)数据库往返 |
| [#1153](https://github.com/nearai/ironclaw/pull/1153) | @G7CNF | SSE解析器in-place compaction替代reallocation | 消除O(n²)字符串分配 |
| [#1154](https://github.com/nearai/ironclaw/pull/1154) | @G7CNF | 定时任务UI显示人类可读cron摘要 | 用户体验优化 |

### 📦 依赖与基础设施

| PR | 作者 | 关键变更 |
|:---|:---|:---|
| [#1183](https://github.com/nearai/ironclaw/pull/1183) | @ilblackdragon | 升级yanked依赖`uds_windows 1.2.0 → 1.2.1` |
| [#1186](https://github.com/nearai/ironclaw/pull/1186), [#1185](https://github.com/nearai/ironclaw/pull/1185) | @ironclaw-ci[bot] | Staging自动晋升流水线 |

---

## 4. 社区热点

### 最活跃讨论：Slack Socket Mode支持 ([#1155](https://github.com/nearai/ironclaw/issues/1155))

| 指标 | 数据 |
|:---|:---|
| 作者 | @justinfiore |
| 创建/更新 | 2026-03-13 / 2026-03-14 |
| 评论 | 1 |

**核心诉求**：企业用户希望在IronClaw中使用Slack Socket Mode（WebSocket替代HTTP webhook），避免开放入站端口的安全风险。该功能在OpenClaw中已存在，迁移至IronClaw时成为**企业部署阻塞项**。

**路线图信号**：高优先级功能缺口，直接影响企业采用。

---

## 5. Bug 与稳定性

### 🔴 严重级别（CRITICAL）

| Issue | 描述 | 状态 | Fix PR |
|:---|:---|:---|:---|
| [#1178](https://github.com/nearai/ironclaw/issues/1178) | Workflow linting绕过：`.github/workflows/code_style.yml`中AWK模式匹配缺陷 | **OPEN** | 无 |
| [#813](https://github.com/nearai/ironclaw/issues/813) | 非事务性多步上下文更新：元数据/token设置与DB持久化之间 | CLOSED | 已集成 |
| [#869](https://github.com/nearai/ironclaw/issues/869) | 锁跨越async I/O边界阻塞webhook处理 | CLOSED | 已集成 |
| [#823](https://github.com/nearai/ironclaw/issues/823) | routine_engine事件触发N+1查询模式 | CLOSED | [#1163](https://github.com/nearai/ironclaw/pull/1163) |

### 🟠 高优先级（HIGH）

| Issue | 描述 | 状态 | Fix PR |
|:---|:---|:---|:---|
| [#1179](https://github.com/nearai/ironclaw/issues/1179) | AWK状态机hunk间未重置：`in_test`标志设置后未清除 | **OPEN** | 无 |
| [#1180](https://github.com/nearai/ironclaw/issues/1180) | `extract_suggestions()`代码围栏检测逻辑缺陷：`rfind`未检查围栏是否已打开 | **OPEN** | 无 |
| [#1181](https://github.com/nearai/ironclaw/issues/1181) | 生产代码`src/registry/manifest.rs`不安全`.unwrap()` | **OPEN** | [#1184](https://github.com/nearai/ironclaw/pull/1184) 部分覆盖 |
| [#827](https://github.com/nearai/ironclaw/issues/827) | routine_engine每次迭代全量`Vec`克隆，O(n)复制5x | CLOSED | 已集成 |
| [#872](https://github.com/nearai/ironclaw/issues/872) | 补全与工具请求间参数剥离不完全对等 | CLOSED | [#1170](https://github.com/nearai/ironclaw/pull/1170) |
| [#1142](https://github.com/nearai/ironclaw/issues/1142) | SSE解析热路径O(n²)字符串分配 | CLOSED | [#1153](https://github.com/nearai/ironclaw/pull/1153) |
| [#1150](https://github.com/nearai/ironclaw/issues/1150) | Registry manifest版本不匹配：manifest 0.2.1但artifact URL仍引用0.2.0 | CLOSED | 已集成 |

### 🟡 工具链Bug Bash（P1/P2）

| Issue | 描述 | 状态 | Fix PR |
|:---|:---|:---|:---|
| [#993](https://github.com/nearai/ironclaw/issues/993) | Google Sheets：`values`参数JSON字符串而非数组序列化 | CLOSED | [#1143](https://github.com/nearai/ironclaw/pull/1143) |
| [#1002](https://github.com/nearai/ironclaw/issues/1002) | 表格创建成功但数据写入静默失败 | CLOSED | [#1143](https://github.com/nearai/ironclaw/pull/1143) |
| [#999](https://github.com/nearai/ironclaw/issues/999) | OAuth完成后Google Sheets返回403 PERMISSION_DENIED | CLOSED | 已集成 |
| [#1052](https://github.com/nearai/ironclaw/issues/1052) | WASM通道热激活回退至"awaiting pairing"状态 | CLOSED | [#1171](https://github.com/nearai/ironclaw/pull/1171) |

---

## 6. 功能请求与路线图信号

| 需求 | 来源 | 技术可行性 | 纳入可能性 |
|:---|:---|:---|:---|
| **Slack Socket Mode支持** | [#1155](https://github.com/nearai/ironclaw/issues/1155) | 高（OpenClaw已有实现参考） | **高** — 企业部署刚需 |
| **自适应学习系统** | [#1187](https://github.com/nearai/ironclaw/pull/1187) @smkrv | 高（技能合成、用户画像、会话搜索） | 中 — 大型PR需审查，30+迭代显示作者投入 |
| **LRU嵌入缓存** | [#235](https://github.com/nearai/ironclaw/pull/235) @ztsalexey | 高（SHA-256缓存键，锁不跨HTTP） | 中 — 2月19日创建，持续更新 |
| **结构化故障交付物** | [#236](https://github.com/nearai/ironclaw/pull/236) @ztsalexey | 高（`FallbackDeliverable`结构） | 中 — 与#235同期，工作流完整性改进 |
| **定时任务LLM请求重设计** | [#1147](https://github.com/nearai/ironclaw/pull/1147) @henrypark133 | 高（XL规模，核心贡献者） | **高** — 已在活跃开发 |
| **Telegram热激活owner验证** | [#1157](https://github.com/nearai/ironclaw/pull/1157) @henrypark133 | 高（XL规模，端到端回归覆盖） | **高** — 安全加固配套 |

---

## 7. 用户反馈摘要

### 🔍 显性痛点

| 反馈 | 来源 | 严重程度 |
|:---|:---|:---|
| **文档缺失** | [#1174](https://github.com/nearai/ironclaw/issues/1174) @Krzysztof318 | **高** — "Maybe I am blind today ;) but I can't find proper documentation... only four .md files in docs/ dir" |
| **Google Sheets工具链可靠性** | #993, #999, #1002 | 中 — OAuth流程、参数序列化、权限传播多环节问题 |
| **WASM通道配对状态管理** | #1052 | 中 — 热激活破坏既有配对状态 |

### ✅ 正向反馈

- 无显性正向反馈评论（Issues以bug报告为主）

### 📊 使用场景洞察

| 场景 | 证据 | 产品启示 |
|:---|:---|:---|
| 企业内网部署 | #1155 Socket Mode需求 | 需要零入站端口部署模式 |
| Google Workspace集成 | #993-#1002密集bug | Sheets/Docs是核心工作流，需优先稳定 |
| 多通道混合部署 | #1052, #1171 Telegram + WASM | 通道状态机复杂度需简化 |

---

## 8. 待处理积压

### ⏳ 长期未响应（>7天）

| PR/Issue | 创建时间 | 状态 | 风险提示 |
|:---|:---|:---|:---|
| [#235](https://github.com/nearai/ironclaw/pull/235) LRU嵌入缓存 | 2026-02-19 | OPEN | 24天未合并，性能优化价值明确 |
| [#236](https://github.com/nearai/ironclaw/pull/236) 结构化故障交付物 | 2026-02-19 | OPEN | 24天未合并，与#235同期 |
| [#836](https://github.com/nearai/ironclaw/pull/836) Criterion基准测试 | 2026-03-10 | OPEN | 5天未合并，安全层性能基线建设 |

### 🚨 需维护者立即关注

| 项目 | 优先级 | 原因 |
|:---|:---|:---|
| [#1174](https://github.com/nearai/ironclaw/issues/1174) 文档缺失 | **P0** | 首次用户阻塞，直接影响采用率 |
| [#1178](https://github.com/nearai/ironclaw/issues/1178) CI工作流绕过 | **P0** | CRITICAL级别，代码质量门禁失效 |
| [#1179](https://github.com/nearai/ironclaw/issues/1179), [#1180](https://github.com/nearai/ironclaw/issues/1180), [#1181](https://github.com/nearai/ironclaw/issues/1181) | **P1** | 3个OPEN HIGH/CRITICAL CI告警，需分类修复或确认误报 |

---

*日报生成时间：2026-03-15 | 数据来源：GitHub API*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 | 2026-03-15

> 项目地址：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)  
> 报告日期：2026-03-15 | 数据周期：过去24小时

---

## 1. 今日速览

LobsterAI 今日保持**中等活跃度**，核心开发持续推进。过去24小时内，3条 PR 全部完成合并/关闭，显示团队代码审查效率较高；Issues 新增3条，聚焦**版本更新检测、本地 Ollama 工具调用、QQ Bot 稳定性**三类问题。无新版本发布，当前最新版本仍为 v0.2.3（但存在 ARM64 平台检测异常）。整体项目健康度良好，但用户侧反馈的集成稳定性问题值得警惕。

---

## 2. 版本发布

**无新版本发布**

> ⚠️ 注意：Issue #390 报告 v0.2.3 版本在 Apple Silicon (ARM64) 上存在**更新检测失败**问题，用户无法通过"检查更新"功能识别新版本。该问题可能影响版本分发覆盖率。

---

## 3. 项目进展

今日 **3 条 PR 全部关闭/合并**，核心贡献者 `@liuzhq1986` 主导了 Agent 架构的重要重构：

| PR | 贡献者 | 核心变更 | 项目价值 |
|:---|:---|:---|:---|
| [#416](https://github.com/netease-youdao/LobsterAI/pull/416) | @liuzhq1986 | **Agent 设定独立 Tab 重构**：将 IDENTITY.md/SOUL.md/USER.md 从记忆 Tab 抽离为独立 `coworkAgent` Tab；修复类型不匹配、i18n 遗漏、Windows 路径兼容等问题 | **架构清晰化**：分离记忆管理与 Agent 人格设定，降低认知负担；为后续多 Agent 管理铺路 |
| [#415](https://github.com/netease-youdao/LobsterAI/pull/415) | @liuzhq1986 | 关联 OpenClaw 记忆功能 | 强化与 OpenClaw 生态的集成，提升跨会话记忆连续性 |
| [#414](https://github.com/netease-youdao/LobsterAI/pull/414) | @liugang519 | QQ 渠道定时任务通知的 `to` 字段提取优化 | 修复通知路由准确性，提升 IM 渠道可靠性 |

**整体评估**：今日合并内容聚焦**Agent 体验架构重组**与**IM 渠道稳定性**，属于 v0.3.x 方向的关键基础设施工作。

---

## 4. 社区热点

### 🔥 讨论最活跃：Issue #390 - ARM64 更新检测失败
- **链接**：[netease-youdao/LobsterAI#390](https://github.com/netease-youdao/LobsterAI/issues/390)
- **数据**：2 条评论，创建 3 天后仍有更新
- **核心诉求**：Apple Silicon 用户被"困"在 v0.2.2，无法获取 v0.2.3 更新，疑似架构检测逻辑遗漏 ARM64 分发通道

### 🔥 技术深度最高：Issue #405 - 本地 Ollama 工具调用失效
- **链接**：[netease-youdao/LobsterAI#405](https://github.com/netease-youdao/LobsterAI/issues/405)
- **数据**：2 条评论，用户已尝试多种模型和配置
- **核心诉求**：本地 Ollama 模型仅支持"聊天"无法"执行命令"，与线上模型行为不一致，暴露**本地模型工具链（Tools/MCP）集成缺口**

### Issue #413 - QQ Bot 频繁掉线
- **链接**：[netease-youdao/LobsterAI#413](https://github.com/netease-youdao/LobsterAI/issues/413)
- **状态**：0 评论，刚创建，待诊断

**背后信号**：用户正从"尝鲜"转向"生产环境部署"，对**稳定性、跨平台一致性、本地私有化**需求急剧上升。

---

## 5. Bug 与稳定性

| 优先级 | Issue | 问题描述 | 状态 | Fix PR |
|:---|:---|:---|:---|:---|
| 🔴 **P1** | [#390](https://github.com/netease-youdao/LobsterAI/issues/390) | Apple Silicon 版本更新检测失效，用户无法获取 v0.2.3 | **Open**，2 条评论讨论中 | 无 |
| 🟡 **P2** | [#405](https://github.com/netease-youdao/LobsterAI/issues/405) | 本地 Ollama 模型无法执行命令（工具调用），配置已正确但行为异常 | **Open**，需复现诊断 | 无 |
| 🟡 **P2** | [#413](https://github.com/netease-youdao/LobsterAI/issues/413) | QQ Bot 频繁掉线，原因不明 | **Open**，刚创建，信息不足 | 无 |

> 📌 **风险评估**：P1 问题可能导致 ARM64 用户群体版本碎片化；P2 问题涉及本地模型核心能力，直接影响私有化部署场景。

---

## 6. 功能请求与路线图信号

| 需求来源 | 隐含需求 | 与现有 PR 关联 | 纳入可能性 |
|:---|:---|:---|:---|
| #405 本地 Ollama 工具调用 | 本地模型完整支持 Tools/MCP 协议 | PR #415 OpenClaw 记忆关联、PR #416 Agent 架构重构 | **高** — Agent 架构刚重构，工具链标准化是下一步自然延伸 |
| #413 QQ Bot 稳定性 | IM 渠道连接保活、断线重连、状态监控 | PR #414 已优化 QQ 通知字段 | **中** — 需更多诊断信息，可能涉及上游协议库 |

**路线图推测**：团队正推进 **Agent 2.0 架构**（人格/记忆分离）与 **OpenClaw 生态深度集成**，本地模型工具链完善可能是 Q2 重点。

---

## 7. 用户反馈摘要

### 😤 痛点
- **"配置正确但就是不工作"**（#405）：用户按文档配置 `tools.profile: "full"` 和 `sessions.visibility: "all"`，本地 Ollama 仍无法执行命令，线上/本地行为不一致造成困惑
- **"检查更新形同虚设"**（#390）：ARM64 用户被系统"欺骗"认为已是最新版，信任受损
- **"Bot 说掉就掉"**（#413）：生产环境稳定性焦虑

### 🎯 使用场景
- **混合部署**：线上模型用于复杂任务，本地 Ollama 用于隐私敏感/离线场景（#405）
- **Apple Silicon 主力开发**：M 系列 Mac 是核心用户设备（#390）
- **IM 自动化**：QQ Bot 用于定时任务通知、群管理（#413, #414）

### ✅ 满意点
- OpenClaw 记忆关联功能受期待（PR #415 方向）
- Agent 人格设定独立化提升可维护性（PR #416）

---

## 8. 待处理积压

> 基于24小时数据，以下 Issue 需维护者关注响应：

| Issue | 创建时间 | 风险 | 建议动作 |
|:---|:---|:---|:---|
| [#390](https://github.com/netease-youdao/LobsterAI/issues/390) | 2026-03-12（3天前） | ARM64 版本分发阻断 | 确认更新检测 API 是否区分架构，紧急 patch |
| [#413](https://github.com/netease-youdao/LobsterAI/issues/413) | 2026-03-14（1天前） | 稳定性投诉，信息不足 | 引导用户提供日志、复现频率、网络环境 |

---

**日报生成时间**：2026-03-15  
**数据置信度**：基于 GitHub 公开 API 数据，Issues/PR 评论内容已摘要提炼

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

# TinyClaw 项目动态日报 | 2026-03-15

---

## 1. 今日速览

TinyClaw 今日呈现**高活跃度开发状态**，24小时内新增5个PR全部处于待合并状态，显示核心团队正在密集推进功能迭代。社区讨论聚焦于**首次用户体验优化**（Issue #193），与正在开发的Web端初始化配置PR #214形成呼应。技术方向明确：简化架构（PR #213扁平化消息队列）、扩展模型支持（PR #217接入Gemini）、强化CLI品牌识别（PR #216）。无版本发布，无Bug报告，整体健康度良好，处于**功能蓄力期**。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

| PR | 作者 | 核心贡献 | 项目推进意义 |
|:---|:---|:---|:---|
| [#213](https://github.com/TinyAGI/tinyclaw/pull/213) | @jlia0 | **架构简化**：移除对话状态追踪器，改为扁平化直接DM通信 | 重大技术债务清理，降低系统复杂度，为规模化agent协作扫清障碍 |
| [#214](https://github.com/TinyAGI/tinyclaw/pull/214) | @jlia0 | **Web化配置**：`--skip-setup`标志 + TinyOffice `/connect`页面支持自定义API URL | 直接回应Issue #193诉求，CLI与Web端首次体验闭环即将形成 |
| [#215](https://github.com/TinyAGI/tinyclaw/pull/215) | @jlia0 | **Agent定制化**：创建时支持system_prompt参数，自动写入AGENTS.md | 提升agent可配置性，满足高级用户对个性化指令的需求 |
| [#216](https://github.com/TinyAGI/tinyclaw/pull/216) | @jlia0 | **品牌强化**：TINYAGI ASCII横幅注入CLI关键交互点 | 增强产品辨识度，改善开发者工具的情感化体验 |
| [#217](https://github.com/TinyAGI/tinyclaw/pull/217) | @RomuloGatto | **模型扩展**：Google Gemini/Gemini CLI支持，清理废弃模型引用 | 紧跟多模型生态趋势，保持TinyClaw的供应商中立性 |

**整体评估**：今日PR矩阵覆盖架构层、体验层、生态层，形成**"简化核心→扩展边界→打磨体验"**的完整推进节奏。若全部合并，项目将完成从"开发者工具"向"产品化平台"的关键跃迁。

---

## 4. 社区热点

### 🔥 最活跃讨论：Issue #193 - TinyOffice首次运行Web引导
- **链接**：[TinyAGI/tinyclaw#193](https://github.com/TinyAGI/tinyclaw/issues/193)
- **数据**：10条评论，创建于2026-03-11，最后更新2026-03-14
- **核心诉求**：
  > "TinyOffice在TinyClaw已配置后很有用，但尚未提供良好的首次设置体验。初始设置仍严重依赖CLI流程和原始配置编辑。"

- **与PR的联动**：PR #214（Web化配置）正是对此Issue的直接技术回应，形成**"问题发现→方案实施"**的敏捷闭环
- **深层信号**：项目早期采用者已从"能跑通"转向"易上手"，用户体验成为竞争差异化关键

---

## 5. Bug 与稳定性

**今日无Bug报告、崩溃或回归问题**

> 注：PR #213涉及"移除对话状态"的重构，建议合并前进行压力测试，验证高并发agent场景下的消息可靠性。

---

## 6. 功能请求与路线图信号

| 信号来源 | 需求描述 | 纳入下一版本概率 | 判断依据 |
|:---|:---|:---|:---|
| Issue #193 | Web端首次引导配置 | **极高** | PR #214已开发完成，待合并 |
| PR #215 | Agent级system prompt | **高** | 实现简洁，无破坏性变更，符合配置即代码趋势 |
| PR #217 | Gemini模型支持 | **高** | 多模型策略核心，社区PR已就绪 |
| PR #213 | 队列架构扁平化 | **中高** | 技术债务优先项，但需充分测试 |

**路线图推断**：下一版本（推测v0.x）将聚焦**"开箱即用的首次体验"**与**"更灵活的模型/Agent配置"**两大主题。

---

## 7. 用户反馈摘要

> 基于Issue #193评论提炼

| 维度 | 反馈内容 |
|:---|:---|
| **痛点** | CLI配置门槛高；配置文件编辑易出错；新用户流失风险 |
| **使用场景** | 非技术背景用户希望通过Web界面完成初始设置；团队部署时需要标准化配置流程 |
| **满意点** | TinyOffice在配置完成后体验良好；Web界面设计获认可 |
| **不满点** | "配置前"与"配置后"体验断层；缺少引导式设置流程 |
| **隐含需求** | 配置过程需要实时验证（如API连接检测）；设置进度需要可视化反馈 |

---

## 8. 待处理积压

**当前无长期未响应的重要Issue/PR**

> 健康度提示：今日5个PR均为24小时内创建，建议维护者优先审阅PR #214（与社区热点Issue直接关联）和PR #213（架构变更影响面大），避免PR队列堆积。

---

*日报生成时间：2026-03-15 | 数据来源：GitHub API*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 | 2026-03-15

> **项目**: moltis-org/moltis | **日期**: 2026-03-15 | **数据周期**: 过去24小时

---

## 1. 今日速览

Moltis 今日保持**中高活跃度**，社区共产生 **9 条 Issue 更新**（5 活跃/新开，4 关闭）与 **6 条 PR 更新**（3 待合并，3 已合并）。核心进展集中在**稳定性修复**（Windows 文件锁、浏览器会话隔离）与**多 Agent 编排能力**增强。值得关注的是，今日出现 3 个新 Bug 报告，其中 Windows 平台文件锁问题已有社区贡献者提交修复 PR，响应速度较快。无新版本发布，项目处于功能打磨与缺陷修复阶段。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 已合并/关闭的 PR（3 条）

| PR | 作者 | 核心贡献 | 关联 Issue |
|:---|:---|:---|:---|
| [#417](https://github.com/moltis-org/moltis/pull/417) | @penso | **本地 LLM 体验优化**：恢复自定义 GGUF 模型配置无需重启，支持异步下载进度事件，新增回归测试 | #132 |
| [#411](https://github.com/moltis-org/moltis/pull/411) | @penso | **定时任务可靠性**：新增 cron 工具回归测试，覆盖 `payload.deliver`、`channel`、`to` 字段，提取网关交付逻辑并补充单元测试 | #195 |
| [#410](https://github.com/moltis-org/moltis/pull/417) | @penso | **Agent 鲁棒性**：修复结构化工具调用空名称导致的失败，新增流式/非流式回归测试 | #179 |

**整体推进评估**：今日合并的 PR 聚焦**开发者体验**（本地模型热重载）与**系统可靠性**（cron 交付、工具调用容错），标志着项目从功能扩张期进入**质量加固期**。3 个 PR 均含完整测试覆盖，工程成熟度提升。

---

## 4. 社区热点

### 讨论最活跃的议题

| 排名 | Issue/PR | 互动数据 | 核心诉求分析 |
|:---|:---|:---|:---|
| 🔥 #1 | [#261](https://github.com/moltis-org/moltis/issues/261) GitHub Copilot Provider 错误 | 4 评论, 2 👍 | **企业集成痛点**：用户依赖 GitHub Copilot 作为主力模型源，Provider 故障直接影响生产可用性。社区需官方 Provider 维护策略说明。 |
| 🔥 #2 | [#235](https://github.com/moltis-org/moltis/issues/235) PTY-based 交互式 Claude Code CLI 控制 | 3 评论, 1 👍 | **多 Agent 编排基础设施**：这是**高阶用户需求**——通过伪终端欺骗让 Claude Code 保持交互模式，支撑自主多 Agent 系统。技术深度高，可能定义项目差异化能力。 |
| 🔥 #3 | [#437](https://github.com/moltis-org/moltis/issues/437) Reasoning 展开项成为唯一响应 | 1 评论, 0 👍 | **Channels 功能缺陷**：影响消息渲染，用户实际看到的是空白回复，体验断裂。 |

**趋势洞察**：社区正从"能用"向"好用"和"深度集成"演进，企业级 Provider 稳定性与高级编排能力是两大牵引力。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 | Fix PR |
|:---|:---|:---|:---|:---|
| 🔴 **高** | [#434](https://github.com/moltis-org/moltis/issues/434) | Windows 会话持久化文件锁失败 (`Access is denied`) | **已有 PR 待审** | [#436](https://github.com/moltis-org/moltis/pull/436) ✅ |
| 🟡 **中** | [#437](https://github.com/moltis-org/moltis/issues/437) | Channels 中 Reasoning 展开项覆盖正常消息响应 | 待响应 | 无 |
| 🟡 **中** | [#261](https://github.com/moltis-org/moltis/issues/261) | GitHub Copilot Provider 报错 | 待诊断 | 无 |

**Windows 兼容性警报**：今日 2 个 Bug 涉及 Windows 平台（#434 文件锁、#436 修复），提示跨平台测试覆盖需加强。社区贡献者 @vanduc2514 不仅报告问题，还提交了**根因级修复**（深入 Rust stdlib 的 `FILE_APPEND_DATA` 行为差异），技术贡献质量高。

---

## 6. 功能请求与路线图信号

| Issue | 需求 | 技术可行性 | 纳入下一版本概率 |
|:---|:---|:---|:---|
| [#235](https://github.com/moltis-org/moltis/issues/235) PTY 伪终端支持 | 让子进程 Claude Code 保持交互模式，支撑自主 Agent 编排 | 中（需 PTY 实现，跨平台复杂） | ⭐⭐⭐⭐☆ **高** — 契合项目多 Agent 定位 |
| [#233](https://github.com/moltis-org/moltis/issues/233) Matrix 协议支持 | 去中心化通信协议集成 | 中（已有 Channels 抽象层） | ⭐⭐⭐☆☆ **中** — 社区呼声存在，但非核心路径 |
| [#264](https://github.com/moltis-org/moltis/issues/264) Agent 感知当前 Channel + 跨通道消息 | 上下文感知与灵活路由（已关闭，可能部分实现） | 高 | ⭐⭐⭐⭐⭐ **已实现** — PR #411 验证 cron 交付能力 |

**路线图信号**：多 Agent 编排（#235）是**战略级能力**，建议维护者官方回应技术方案。Matrix 支持（#233）代表去中心化趋势，可作为中长期候选。

---

## 7. 用户反馈摘要

### 真实痛点

| 场景 | 来源 | 情绪 |
|:---|:---|:---|
| *"Claude Code 检测到非终端环境就静默切换非交互模式，完全无法用于 Agent 编排"* | #235 @CyPack | 😤 **阻塞性挫败** — 架构级限制 |
| *"Windows 上每次重启都文件锁失败，完全无法持久化会话"* | #434 @vanduc2514 | 😤 **平台兼容性愤怒** |
| *"Channels 里只显示 Reasoning 展开按钮，实际回复内容消失了"* | #437 @0p3nt3ch53C | 😕 **功能可用性困惑** |
| *"exec 工具的 node 参数在没配置节点时出现，模型疯狂猜 'host' 或空字符串"* | #427（关联 #435） | 😩 **LLM 行为不可控** |

### 满意点

- **本地 LLM 热重载**（#417）："终于不用每次改 GGUF 都重启了"
- **社区响应速度**：Windows 文件锁问题 24 小时内即有根因级 PR

---

## 8. 待处理积压

| Issue/PR | 创建时间 | 最后更新 | 风险 | 建议动作 |
|:---|:---|:---|:---|:---|
| [#235](https://github.com/moltis-org/moltis/issues/235) PTY 支持 | 2026-02-25 | 2026-03-14 | ⚠️ **18 天无官方回应** — 高价值需求流失风险 | 维护者技术可行性评估 |
| [#261](https://github.com/moltis-org/moltis/issues/261) Copilot Provider | 2026-02-28 | 2026-03-14 | ⚠️ 企业用户关键路径 | 官方 Provider 维护状态公告 |
| [#412](https://github.com/moltis-org/moltis/pull/412) 浏览器会话隔离 | 2026-03-11 | 2026-03-14 | 待合并 3 天 | 代码审查排期 |
| [#436](https://github.com/moltis-org/moltis/pull/436) Windows 文件锁修复 | 2026-03-14 | 2026-03-14 | 🆕 新鲜待审 | 优先合并（高影响 + 已验证） |

---

**日报生成时间**: 2026-03-15 | **数据来源**: GitHub API (moltis-org/moltis)

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 | 2026-03-15

## 1. 今日速览

CoPaw 今日社区活跃度**极高**，过去24小时内产生 **50 条 Issues 更新**（17条新开/活跃，33条关闭）和 **29 条 PR 更新**（21条待合并，8条已合并/关闭），无新版本发布。项目处于**密集迭代期**：社区贡献者活跃度高，首次贡献者（first-time-contributor）PR 占比显著；核心团队快速响应关闭了大量历史积压 Issue，同时新功能开发（频道扩展、认证系统、模型提供商支持）与安全加固并行推进。整体健康度良好，但需关注 Windows 平台兼容性及 Docker 部署体验问题。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 已合并/关闭的重要 PR（8条）

| PR | 作者 | 核心贡献 | 项目推进 |
|:---|:---|:---|:---|
| [#1471](https://github.com/agentscope-ai/CoPaw/pull/1471) | @lllcy | **修复复制功能**：控制台回复复制从 JSON 改为纯文本 | 解决用户高频反馈的 UX 问题，对应关闭 Issue [#1457](https://github.com/agentscope-ai/CoPaw/issues/1457) |
| [#1495](https://github.com/agentscope-ai/CoPaw/pull/1495) | @nphenix | **修复 Windows 代理问题**：测试添加 `trust_env=False` 防止 502 错误 | 提升 Windows 开发者体验，降低贡献门槛 |
| [#1483](https://github.com/agentscope-ai/CoPaw/pull/1483) | @Leirunlin | **修复跨磁盘写入**：Windows 下使用 `shutil.move` 替代 `os.rename` | 解决 Issue [#1431](https://github.com/agentscope-ai/CoPaw/issues/1431)，Docker/Windows 部署稳定性↑ |
| [#1331](https://github.com/agentscope-ai/CoPaw/pull/1331) | @reidliu41 | **修复钉钉富文本**：过滤空文本块防止 LLM API 报错 | 统一所有频道的空内容过滤逻辑 |
| [#626](https://github.com/agentscope-ai/CoPaw/pull/626) | @yunxilyf | **支持 `<think>` 标签解析**：OpenAI 兼容模型的推理内容 | 为 DeepSeek-R1 等推理模型提供支持基础 |
| [#1494](https://github.com/agentscope-ai/CoPaw/pull/1494) | @yunxilyf | （重复关闭）思考标签解析 | — |

**整体评估**：今日合并 PR 聚焦**稳定性修复**（Windows 兼容、复制体验、钉钉集成）与**模型生态扩展**（推理标签支持），为 v0.0.8 版本奠定基础。

---

## 4. 社区热点

### 讨论最活跃的 Issues/PRs

| 排名 | 条目 | 评论数 | 核心诉求 | 分析 |
|:---|:---|:---:|:---|:---|
| 🔥1 | [#282](https://github.com/agentscope-ai/CoPaw/issues/282) `pptxgenjs` 远程协议错误 | **13** | 工具调用时 HTTP 连接中断导致任务终止 | **生产稳定性痛点**：第三方工具集成时的网络容错机制不足，用户期望优雅降级而非 `AGENT_UNKNOWN_ERROR` |
| 🔥2 | [#981](https://github.com/agentscope-ai/CoPaw/issues/981) 飞书/QQ 频道无法发送文件 | **12** | 多频道文件传输能力缺失 | **企业场景刚需**：用户期望统一的多媒体消息支持，当前各频道能力碎片化 |
| 🔥3 | [#338](https://github.com/agentscope-ai/CoPaw/issues/338) 建议添加 Webhook 功能 | **7** | 外部系统与 CoPaw 的双向集成 | **生态扩展诉求**：用户希望将 CoPaw 嵌入现有工作流，而非仅作为独立应用使用 |

### 高热度待合并 PR

| PR | 亮点 | 潜在影响 |
|:---|:---|:---|
| [#1478](https://github.com/agentscope-ai/CoPaw/pull/1478) Nextcloud Talk 频道 | 企业私有化部署场景的关键扩展 | 填补企业 IM 集成空白，与钉钉/飞书形成互补 |
| [#1329](https://github.com/agentscope-ai/CoPaw/pull/1329) Web 认证系统 | 可选单用户注册，解决多租户安全顾虑 | 为团队/企业部署铺平道路， superseded #519 显示需求长期存在 |
| [#1498](https://github.com/agentscope-ai/CoPaw/pull/1498) DeepSeek 提供商 | 国产大模型生态关键拼图 | 降低国内用户接入成本，与现有 OpenAI 兼容架构契合 |

---

## 5. Bug 与稳定性

### 按严重程度排列

| 严重度 | Issue | 状态 | 描述 | Fix PR |
|:---|:---|:---|:---|:---:|
| 🔴 **高** | [#282](https://github.com/agentscope-ai/CoPaw/issues/282) | ✅ 已关闭 | `pptxgenjs` 工具调用时 `RemoteProtocolError` 导致任务终止 | 未明确，需验证 |
| 🔴 **高** | [#1087](https://github.com/agentscope-ai/CoPaw/issues/1087) | ✅ 已关闭 | Mac mini M4 桌面应用 "Answers have stopped" | 未明确 |
| 🟡 **中** | [#1413](https://github.com/agentscope-ai/CoPaw/issues/1413) | ✅ 已关闭 | v0.0.5→v0.0.7 Docker 升级：Skills 重复显示、模型配置丢失 | 未明确，数据卷挂载问题 |
| 🟡 **中** | [#1493](https://github.com/agentscope-ai/CoPaw/issues/1493) | ✅ 已关闭 | Python 代码测试时 `taskkill` 脚本误杀 CoPaw 自身进程 | 需安全沙箱机制 |
| 🟡 **中** | [#1429](https://github.com/agentscope-ai/CoPaw/issues/1429) | 🟡 开放 | Windows `AGENT_UNKNOWN_ERROR: ReadError` | 待调查 |
| 🟡 **中** | [#902](https://github.com/agentscope-ai/CoPaw/issues/902) | 🟡 开放 | Discord 语音消息 `.ogg` 格式不支持 | [#1476](https://github.com/agentscope-ai/CoPaw/pull/1476) 待合并 |
| 🟡 **中** | [#1501](https://github.com/agentscope-ai/CoPaw/issues/1501) | 🟡 开放 | Docker 镜像时区无法修改 | 待处理 |
| 🟡 **中** | [#1485](https://github.com/agentscope-ai/CoPaw/issues/1485) | 🟡 开放 | 默认端口 8088 为 Windows TCP 保留端口 | 待配置优化 |
| 🟢 **低** | [#1457](https://github.com/agentscope-ai/CoPaw/issues/1457) | ✅ 已关闭 | 复制回复内容为 JSON 而非 Markdown | ✅ [#1471](https://github.com/agentscope-ai/CoPaw/pull/1471) |
| 🟢 **低** | [#1374](https://github.com/agentscope-ai/CoPaw/issues/1374) | ✅ 已关闭 | v0.0.7 工作区刷新 "Failed to load file list" | 未明确 |

**关键模式**：Windows 平台问题密集（代理、端口、进程管理、跨磁盘写入），建议专项优化 Windows 部署体验。

---

## 6. 功能请求与路线图信号

### 用户提出的核心需求

| 需求 | Issue | 已有 PR | 纳入可能性评估 |
|:---|:---|:---|:---|
| **Webhook 双向集成** | [#338](https://github.com/agentscope-ai/CoPaw/issues/338) | 无 | ⭐⭐⭐⭐⭐ 高，生态扩展关键 |
| **Token 统计仪表盘** | [#311](https://github.com/agentscope-ai/CoPaw/issues/311) | 无 | ⭐⭐⭐⭐☆ 高，成本透明刚需 |
| **文件传输全频道支持** | [#981](https://github.com/agentscope-ai/CoPaw/issues/981), [#336](https://github.com/agentscope-ai/CoPaw/issues/336) | 无 | ⭐⭐⭐⭐☆ 高，企业场景必备 |
| **高危操作权限审批** | [#174](https://github.com/agentscope-ai/CoPaw/issues/174) | [#1484](https://github.com/agentscope-ai/CoPaw/pull/1484) 安全规则 | ⭐⭐⭐⭐☆ 高，安全合规刚需 |
| **服务优雅停止命令** | [#478](https://github.com/agentscope-ai/CoPaw/issues/478) | 无 | ⭐⭐⭐☆☆ 中，运维体验 |
| **write_file 权限控制** | [#524](https://github.com/agentscope-ai/CoPaw/issues/524) | 无 | ⭐⭐⭐☆☆ 中，安全加固 |
| **控制台紧凑历史视图** | [#502](https://github.com/agentscope-ai/CoPaw/issues/502) | 无 | ⭐⭐⭐☆☆ 中，UX 优化 |

### 下一版本（v0.0.8）预测方向

基于待合并 PR 与开放 Issue，预计重点：
1. **认证与安全**：[#1329](https://github.com/agentscope-ai/CoPaw/pull/1329) Web 认证 + [#1484](https://github.com/agentscope-ai/CoPaw/pull/1484) 危险命令检测
2. **模型生态**：[#1498](https://github.com/agentscope-ai/CoPaw/pull/1498) DeepSeek + [#1192](https://github.com/agentscope-ai/CoPaw/pull/1192) OpenRouter
3. **频道扩展**：[#1478](https://github.com/agentscope-ai/CoPaw/pull/1478) Nextcloud Talk + [#1476](https://github.com/agentscope-ai/CoPaw/pull/1476) Discord 语音
4. **Windows 体验**：端口配置、时区、代理等遗留问题

---

## 7. 用户反馈摘要

### 真实痛点

| 场景 | 反馈来源 | 核心不满 |
|:---|:---|:---|
| **Docker 升级体验** | [#1413](https://github.com/agentscope-ai/CoPaw/issues/1413) | "只挂载 data 卷，但升级后模型消失、Skills 重复"——数据持久化文档与实际行为不符 |
| **Mac M4 兼容性** | [#1087](https://github.com/agentscope-ai/CoPaw/issues/1087) | 桌面应用完全无法使用，"Answers have stopped" 阻断所有交互 |
| **频道能力不一致** | [#981](https://github.com/agentscope-ai/CoPaw/issues/981), [#535](https://github.com/agentscope-ai/CoPaw/issues/535) | 飞书/QQ 文件发送失败、Markdown 渲染差，"参考 Discord 版本" |
| **AI 自我破坏** | [#1493](https://github.com/agentscope-ai/CoPaw/issues/1493) | 代码测试脚本误杀自身进程，"自己把自己杀了，对话断了" |
| **时间幻觉** | [#379](https://github.com/agentscope-ai/CoPaw/issues/379) | 模型编造时间，偏差 2.5 小时，"声称调用了工具，实际没有执行" |

### 满意点

- 快速响应：Issue [#282](https://github.com/agentscope-ai/CoPaw/issues/282) 13 条评论内关闭，显示维护团队活跃
- 首次贡献友好：多个 `first-time-contributor` PR 被快速 review
- 多频道覆盖：钉钉、飞书、QQ、Discord、iMessage 等持续扩展

---

## 8. 待处理积压

### 需维护者关注的重要事项

| Issue/PR | 创建时间 | 状态 | 风险提示 |
|:---|:---|:---|:---|
| [#338](https://github.com/agentscope-ai/CoPaw/issues/338) Webhook 功能 | 2026-03-02 | 🟡 开放，7评论 | **生态集成关键需求**，13天无官方回应，社区多次追问 |
| [#311](https://github.com/agentscope-ai/CoPaw/issues/311) Token 仪表盘 | 2026-03-02 | ✅ 已关闭？ | 实际为开放状态，需确认是否纳入路线图 |
| [#1429](https://github.com/agentscope-ai/CoPaw/issues/1429) Windows ReadError | 2026-03-13 | 🟡 开放，2评论 | 新报告的严重错误，影响 Windows 核心体验 |
| [#1501](https://github.com/agentscope-ai/CoPaw/issues/1501) Docker 时区 | 2026-03-14 | 🟡 开放，1评论 | 运维基础功能，影响日志与调度准确性 |
| [#1485](https://github.com/agentscope-ai/CoPaw/issues/1485) 默认端口冲突 | 2026-03-14 | 🟡 开放，1评论 | Windows 新用户首次部署即遇阻，建议改为动态端口或 8080 |

**建议行动**：优先回应 [#338](https://github.com/agentscope-ai/CoPaw/issues/338) 明确 Webhook 路线图，并建立 Windows 问题专项追踪标签。

---

> **数据来源**：agentscope-ai/CoPaw GitHub 仓库 | 统计周期：2026-03-14 至 2026-03-15

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 | 2026-03-15

---

## 1. 今日速览

ZeptoClaw 今日保持**高活跃度**，24小时内完成 5 个 Issue 关闭与 2 个 PR 合并，同时有 4 个 PR 处于待合并状态。核心进展集中在**通道层稳定性修复**（Discord 图片消息处理）、**安全策略加固**（默认代理模式与审批策略）以及**新协议支持**（ACP Agent Client Protocol）。项目技术债务清理同步推进，r8r 桥接模块完成收尾。整体健康度良好，无阻塞性 Bug 遗留。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 已合并/关闭的关键 PR

| PR | 作者 | 核心贡献 | 项目推进 |
|:---|:---|:---|:---|
| [#335](https://github.com/qhkm/zeptoclaw/pull/335) | @qhkm | **Zhipu API 密钥验证强化** |  onboarding 流程新增 GLM 系列模型密钥实时校验，降低配置错误导致的运行时故障 |
| [#346](https://github.com/qhkm/zeptoclaw/pull/346) | @rafaellin | **Discord 图片消息修复** | 解决纯图片消息被静默丢弃的通道层 Bug，提升多模态交互完整性 |

### 已关闭的关键 Issue（含关联修复）

| Issue | 类型 | 解决内容 |
|:---|:---|:---|
| [#347](https://github.com/qhkm/zeptoclaw/issues/347) | 安全加固 | 默认代理模式从 `autonomous` 改为 `agent`，审批策略默认启用 `read-only` + `ask`，消除危险工具类别的静默执行风险 |
| [#357](https://github.com/qhkm/zeptoclaw/issues/357) | Bug 修复 | Discord 通道双层过滤逻辑修正：`parse_message_create` 与 agent loop 消息过滤器均支持空文本+图片附件场景 |
| [#360](https://github.com/qhkm/zeptoclaw/issues/360) | 技术债务 | r8r 桥接模块清理完成，分支范围收敛至桥接实现本身 |
| [#333](https://github.com/qhkm/zeptoclaw/issues/333) | 构建修复 | Podman 5.7 旧版构建器对 `--mount=type=cache` 语法的兼容问题已识别，PR #358 提供完整解决方案 |
| [#334](https://github.com/qhkm/zeptoclaw/issues/334) | 生态拓展 | 项目收录申请已提交至 [Shelldex](https://shelldex.com/)（AI 代理目录平台）|

**整体推进评估**：安全基线显著提升（默认配置 fail-safe）、多模态通道稳定性增强、构建工具链现代化进行中。

---

## 4. 社区热点

| 热度指标 | Issue/PR | 分析 |
|:---|:---|:---|
| **最多评论 (2)** | [#333](https://github.com/qhkm/zeptoclaw/issues/333) Podman 缓存挂载构建错误 | 反映容器生态碎片化痛点：Docker BuildKit 与 Podman 旧版语法差异导致 CI 断裂。社区贡献者 @taqtiqa-mark 提供详细复现路径，推动维护者快速响应 |
| **活跃讨论 (1)** | [#331](https://github.com/qhkm/zeptoclaw/issues/331) Telegram 支持改进 | 用户 @ilovethensa 提出格式化渲染与输入指示器需求，指向**终端用户体验**这一竞争差异化点。当前 Telegram 集成处于"可用但粗糙"状态，存在产品化空间 |

**诉求洞察**：开发者体验（容器构建）与终端用户体验（IM 通道 polished 程度）成为社区关注双主线。

---

## 5. Bug 与稳定性

| 严重程度 | 问题 | 状态 | Fix PR |
|:---|:---|:---|:---|
| 🔴 **高** | 默认配置存在安全风险：危险工具类别无审批静默执行 | **已修复**（#347 关闭）| N/A（配置变更）|
| 🟡 **中** | Discord 纯图片消息被丢弃 | **已修复**（#357 关闭，#346 合并）| [#346](https://github.com/qhkm/zeptoclaw/pull/346) |
| 🟡 **中** | Podman 5.7 构建失败（缓存挂载语法）| **Fix 待合并** | [#358](https://github.com/qhkm/zeptoclaw/pull/358) |
| 🟢 **低** | 图片内容在 agent loop 中的处理边界情况 | **Fix 待合并** | [#355](https://github.com/qhkm/zeptoclaw/pull/355) |

**稳定性态势**：无开放的高严重度 Bug。安全加固 Issue 的主动关闭体现项目对"默认安全"原则的践行。

---

## 6. 功能请求与路线图信号

| 来源 | 需求 | 可行性评估 | 版本信号 |
|:---|:---|:---|:---|
| [#331](https://github.com/qhkm/zeptoclaw/issues/331) Telegram 格式化与输入指示器 | 提升 IM 通道专业度，需对接 Telegram Bot API 的 `parse_mode` 与 `sendChatAction` | 高 | **v0.x 短期**：通道层 polish 属快速 win |
| [#356](https://github.com/qhkm/zeptoclaw/pull/356) ACP (Agent Client Protocol) 双通道实现 | 新增 stdio + HTTP 入口，支持外部 ACP 客户端（如 acpx）托管 ZeptoClaw | 高（PR 已开）| **v0.x 中期**：协议标准化关键基础设施 |
| [#359](https://github.com/qhkm/zeptoclaw/pull/359) Coder 模板测试工作流优化 | 模板系统提示词改进：优先发现现有测试 → 就地修复 → 验证 | 高（PR 已开）| **v0.x 短期**：开发者体验优化 |

**路线图推断**：项目正从"功能可用"向"协议标准 + 开发者体验 + 终端体验"三维度深化。ACP 协议支持可能预示 ZeptoClaw 定位从独立工具向**可托管代理运行时**演进。

---

## 7. 用户反馈摘要

| 维度 | 反馈提炼 | 来源 |
|:---|:---|:---|
| **痛点** | Podman 用户遭遇构建工具链不兼容，Docker-centric 文档/脚本造成摩擦 | #333 评论 |
| **痛点** | Telegram 输出"plain and messy"，缺乏响应反馈机制，感知延迟高 | #331 |
| **场景** | 用户通过 Discord 进行纯图片交互（截图、图表）被阻断 | #357 |
| **满意** | Shelldex 收录申请获快速响应，生态拓展积极 | #334 |
| **隐忧** | 默认安全配置曾让用户暴露于自主模式风险（虽已修复，反映早期设计权衡）| #347 |

---

## 8. 待处理积压

| 条目 | 创建时间 | 状态 | 提醒 |
|:---|:---|:---|:---|
| [#331](https://github.com/qhkm/zeptoclaw/issues/331) Telegram 支持改进 | 2026-03-12 | **开放 3 天** | 唯一开放的功能请求 Issue，有明确用户场景，建议维护者确认优先级或标记 `good first issue` 引导社区贡献 |
| [#358](https://github.com/qhkm/zeptoclaw/pull/358) Dockerfile.dev BuildKit 修复 | 2026-03-14 | **待合并** | 阻断 Podman 用户的 CI 工作流，建议优先 review 以恢复容器构建生态兼容性 |
| [#355](https://github.com/qhkm/zeptoclaw/pull/355) 图片内容处理修复 | 2026-03-13 | **待合并** | 与 #346 相关但聚焦 loop 层，建议确认与 #357 修复的覆盖边界，避免重复或遗漏 |
| [#359](https://github.com/qhkm/zeptoclaw/pull/359) Coder 模板优化 | 2026-03-14 | **待合并** | 模板系统质量改进，可并行 review |

---

*日报生成时间：2026-03-15 | 数据来源：GitHub API 快照*

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/duanyytop/agents-radar) 自动生成。*