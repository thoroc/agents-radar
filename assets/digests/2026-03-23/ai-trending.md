# AI 开源趋势日报 2026-03-23

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-03-23 00:10 UTC

---

# AI 开源趋势日报 | 2026-03-23

---

## 第一步：AI 相关性筛选

**Trending 榜单（15→11个AI相关）**
| 排除项 | 原因 |
|--------|------|
| systemd/systemd | Linux 系统服务管理器 |
| louis-e/arnis | Minecraft 地图生成工具 |
| aquasecurity/trivy | 通用安全扫描工具 |

**主题搜索（80个）**：全部为AI相关，保留全部

---

## 第二步：分类体系

---

## 第三步：正式报告

### 1. 今日速览

今日 AI 开源领域呈现**"智能体基础设施"爆发态势**：Claude Code 生态插件（everything-claude-code、claude-hud）单日斩获超 4500 stars，显示开发者对 AI 编程助手增强工具的强烈需求；字节跳动开源的 Deer-Flow 以 1690 新增 stars 进入视野，定位"SuperAgent harness"对标 OpenHands；金融交易多智能体框架 TradingAgents 及其中文版同日上榜，反映垂直场景 Agent 框架的实用化趋势。整体看，**"Agent 增强层"**（记忆、监控、技能编排）正成为继基础框架后的新热点层。

---

### 2. 各维度热门项目

#### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars | 今日新增 | 一句话说明 |
|:---|:---|:---|:---|
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 97,921 | **+3,724** | Claude Code 性能优化系统，提供技能、本能、记忆、安全等增强模块，今日登顶热榜 |
| [jarrodwatts/claude-hud](https://github.com/jarrodwatts/claude-hud) | — | **+834** | Claude Code 插件，实时监控上下文使用、活跃工具、运行中的 Agent 和待办进度 |
| [ollama/ollama](https://github.com/ollama/ollama) | 165,885 | — | 本地大模型运行标准工具，新增支持 Kimi-K2.5、GLM-5、MiniMax 等模型 |
| [vllm-project/vllm](https://github.com/vllm-project/vllm) | 73,966 | — | 高吞吐、内存高效的 LLM 推理与服务引擎 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 130,611 | — | 智能体工程平台，持续巩固生态地位 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 6,617 | — | Rust 模块化 LLM 应用开发框架，系统级语言生态的新选择 |
| [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | 11,229 | — | Java 生态 LLM 集成库，支持 RAG、MCP、工具调用等企业级特性 |

---

#### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars | 今日新增 | 一句话说明 |
|:---|:---|:---|:---|
| [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | — | **+1,690** | 字节开源 SuperAgent 框架，集成沙箱、记忆、工具、技能、子智能体，支持分钟到小时级任务 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | — | **+1,051** | 多智能体 LLM 金融交易框架，专业交易员角色协作决策 |
| [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) | — | **+1,069** | 全自主 AI 渗透测试智能体系统，安全领域深度应用 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 82,525 | **+428** | 让网站对 AI 智能体可访问，浏览器自动化任务执行 |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | 69,557 | — | AI 驱动开发平台，Deer-Flow 的直接对标参考 |
| [trycua/cua](https://github.com/trycua/cua) | 13,216 | — | 计算机使用智能体（Computer-Use Agents）开源基础设施，支持 macOS/Linux/Windows 桌面控制 |
| [alibaba/OpenSandbox](https://github.com/alibaba/OpenSandbox) | 9,038 | — | 通用 AI 应用沙箱平台，支持编码智能体、GUI 智能体、RL 训练等场景 |
| [activepieces/activepieces](https://github.com/activepieces/activepieces) | 21,371 | — | AI 工作流自动化平台，集成约 400 个 MCP 服务器 |

---

#### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars | 今日新增 | 一句话说明 |
|:---|:---|:---|:---|
| [FujiwaraChoki/MoneyPrinterV2](https://github.com/FujiwaraChoki/MoneyPrinterV2) | — | **+1,787** | 自动化在线赚钱流程，AI 驱动的内容变现工具 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | — | **+189** | 一键生成高清短视频，AI 大模型驱动的视频创作 |
| [Crosstalk-Solutions/project-nomad](https://github.com/Crosstalk-Solutions/project-nomad) | — | **+2,300** | 离线生存计算机，集成关键工具、知识与 AI，应急场景创新产品 |
| [zhayujie/chatgpt-on-wechat](https://github.com/zhayujie/chatgpt-on-wechat) | 42,380 | — | 多平台接入的超级 AI 助理（微信/飞书/钉钉等），支持主动思考与任务规划 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | 42,059 | — | AI 生产力工作室，智能聊天、自主智能体、300+ 助手统一界面 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 96,565 | — | 网站转 LLM-ready 数据的 Web Data API，RAG 应用的基础设施 |
| [ScrapeGraphAI/Scrapegraph-ai](https://github.com/ScrapeGraphAI/Scrapegraph-ai) | 23,089 | — | 基于 AI 的 Python 爬虫，智能提取结构化数据 |

---

#### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars | 今日新增 | 一句话说明 |
|:---|:---|:---|:---|
| [huggingface/transformers](https://github.com/huggingface/transformers) | 158,258 | — | 文本/视觉/音频/多模态模型的定义框架，推理与训练统一 |
| [hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory) | 68,890 | — | 100+ LLM/VLM 统一高效微调框架（ACL 2024） |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | 57,557 | — | 本地训练运行开源模型的统一 Web UI，支持 Qwen、DeepSeek、gpt-oss 等 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 89,007 | — | 从零实现 ChatGPT 类 LLM，PyTorch 逐步教学 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 6,783 | — | 大模型评测平台，支持 100+ 数据集、Llama3/GPT-4/Qwen 等主流模型 |
| [galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining) | 135 | — | 可靠、极简、可扩展的基础模型与世界模型预训练库 |

---

#### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars | 今日新增 | 一句话说明 |
|:---|:---|:---|:---|
| [langgenius/dify](https://github.com/langgenius/dify) | 133,967 | — | 生产级智能体工作流开发平台，RAG 与 Agent 能力融合 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 75,803 | — | 领先开源 RAG 引擎，融合深度文档理解与 Agent 能力 |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | — | **+220** | EMNLP 2025 简单快速 RAG 方案，今日持续获关注 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | 43,456 | — | 云原生高性能向量数据库，可扩展 ANN 搜索 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 50,713 | — | AI 智能体通用记忆层，跨会话上下文保持 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | 47,871 | — | 文档智能体与 OCR 平台，RAG 应用的核心框架 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 39,470 | — | Claude Code 记忆插件，自动捕获、压缩、注入历史会话上下文 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 22,591 | — | 无向量、基于推理的 RAG 文档索引，存储成本降低 97% |

---

### 3. 趋势信号分析

**"Agent 增强层"成为新爆发点**：今日最显著的信号是 Claude Code 生态插件的集体崛起——everything-claude-code（+3,724）与 claude-hud（+834）合计超 4500 新增 stars，标志着开发者不再满足于基础 AI 编程助手，而是积极构建**记忆持久化、性能监控、技能编排**等增强层。这与 Anthropic 近期推动的 "agentic coding" 战略高度契合。

**字节跳动入场 SuperAgent 赛道**：Deer-Flow 以 1690 新增 stars 进入视野，其定位"分钟到小时级长任务处理"直接对标 OpenHands，且强调沙箱、子智能体等企业级特性，显示大厂正加速布局**生产级 Agent 基础设施**。

**垂直场景 Agent 框架实用化**：TradingAgents（金融交易）与 pentagi（渗透测试）同日上榜，反映 Agent 技术正从通用框架向**专业领域深度渗透**，多智能体协作（multi-agent orchestration）成为解决复杂决策任务的标准范式。

**技术栈 Rust 化趋势**：rig（Rust LLM 框架）、meilisearch/qdrant（Rust 向量数据库）的持续活跃，显示系统级语言在 AI 基础设施中的份额提升。

---

### 4. 社区关注热点

- **🔥 Claude Code 插件生态** — everything-claude-code 与 claude-hud 的爆发表明，"AI 编程助手的助手"成为 immediate 机会，记忆管理、上下文监控、性能优化是核心痛点

- **🔥 字节 Deer-Flow vs OpenHands** — 大厂开源 SuperAgent 框架入局，长任务处理、沙箱安全、子智能体编排将成为差异化竞争点，建议关注两者架构设计对比

- **🔥 金融/安全垂直 Agent** — TradingAgents 和 pentagi 验证"专业多智能体"模式，具备领域知识编码能力的 Agent 框架在特定场景价值显著高于通用方案

- **🔥 无向量 RAG（Vectorless RAG）** — PageIndex 代表的"推理驱动检索"新范式，在边缘设备部署和隐私敏感场景具有颠覆潜力，存储效率 97% 提升值得技术跟踪

- **🔥 MCP（Model Context Protocol）生态扩张** — activepieces 集成 ~400 MCP 服务器，LangChain4j 新增 MCP 支持，协议层标准化正在加速工具生态整合

---

*报告生成时间：2026-03-23*  
*数据来源：GitHub Trending & Topic Search API*

---
*本日报由 [agents-radar](https://github.com/duanyytop/agents-radar) 自动生成。*