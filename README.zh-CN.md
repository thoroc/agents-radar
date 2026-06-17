# 代理雷达

## 支持的语言

🇬🇧 英语 · 🇨🇳 中文 · 🇯🇵 日本语 · 🇰🇷 한국어 · 🇪🇸 西班牙语 · 🇧🇷 葡萄牙语 · 🇫🇷 法语 · 🇩🇪 德语 · 🇮🇹 意大利语 · 🇵🇱 波兰语 · 🇷🇺 Русский · 🇸🇦 ไทย · 🇹🇷 Türkçe · 🇻🇳 Tiếng Việt · 🇹🇭 ไทย · 🇳🇱荷兰语 · 🇮🇳 印地语 · 🇷🇴 罗马尼亚语 · 🇮🇩 印尼语 · 🇺🇦 乌克兰语 · 🇧🇩 孟加拉语

英语 | [中文](./README.zh-CN.md)

要启用其他语言的报告生成，请参阅[多语言支持](./docs/setup.md#multi-language-support)。

这是一个每天早上 8:00 CST 运行的 GitHub Actions 工作流。它聚合来自 10 个数据源的 AI 生态系统信号，然后将每日摘要（以所有已配置的语言）发布为 GitHub Issues 和已提交的 Markdown 文件。此外，它还会自动生成每周和每月的汇总报告。

## 数据源

| 来源 | 类型 | 数据 |

|--------|------|------|

| [GitHub 代码库](https://github.com) | API | 来自 17 个以上追踪的 AI 工具代码库的 Issues、PR 和发布版本 |

| [Claude Code Skills](https://github.com/anthropics/skills) | API | 按社区参与度排序的热门技能 |

| [GitHub Trending](https://github.com/trending) | HTML + API | 每日热门代码库 + AI 主题搜索（7 天窗口） |

| [Hacker News](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | 过去 24 小时内 30 条热门 AI 新闻，6 个并行查询 |

| [Product Hunt](https://www.producthunt.com) | GraphQL API | 昨日投票最多的热门 AI 产品 |

| [ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | cs.AI、cs.CL、cs.LG 最新论文（过去 48 小时） |

| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 个热门模型，按每周点赞数排序 |

| [Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | 5 个标签下的热门 AI/LLM 文章 |

| [Lobste.rs](https://lobste.rs) | JSON API | 过去 7 天的 AI/ML 标签文章 |

| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | 网站地图 | 通过 `lastmod` diff 检测到的新文章 |

## Web UI

**`PAGES_URL`** — 将此设置为仓库变量，即可配置您 fork 的 Web UI 基本 URL。

浏览所有历史摘要，界面简洁，采用深色主题 — 无需登录。报告通过 GitHub Pages 从本仓库中的 Markdown 文件渲染。

Web UI 是一个基于 Vite 和 TypeScript 的单页应用 (SPA)，位于 `packages/web/` 目录下。它会在运行时获取 `manifest.json` 和各个摘要文件 — 新的每日摘要无需重新构建 UI 即可显示。

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```
![Web UI](assets/web-en.png)

## Telegram 频道 & 飞书群组

订阅即可每日接收推送至您首选平台的摘要通知。每条消息均包含当日所有报告的链接，以及 Web UI 和 RSS 源。

<table>

<tr>

<td align="center"><b><a href="https://t.me/agents_radar">加入 Telegram 频道</a></b></td>

<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">加入飞书群组</a></b></td>

</tr>

<tr>

<td><img src="assets/telegram.jpg" width="300" alt="Telegram 通知"></td>

<td><img src="assets/feishu.jpg" width="300" alt="飞书通知"></td>

</tr>

</table>

## RSS订阅源

**`PAGES_URL`/feed.xml** — 在任何 RSS 阅读器（例如 Feedly、Reeder、NewsBlur 等）中订阅，即可自动接收最新摘要。订阅源 URL 由您的 `PAGES_URL` 设置生成。订阅源包含所有报告类型中的最新 30 份报告，每日与 `manifest.json` 一起更新。

## MCP 服务器

**`https://agents-radar-mcp.duanyytop.workers.dev`**

一个托管的 [模型上下文协议](https://modelcontextprotocol.io) 服务器，将 agents-radar 数据作为工具公开。任何兼容 MCP 的客户端（例如 Claude Desktop、OpenClaw 等）都可以直接查询最新的 AI 生态系统报告。

**可用工具：**

| 工具 | 描述 |

|------|-------------|

| `list_reports` | 列出可用日期和报告类型（最近 N 天） |

| `get_latest` | 获取指定类型的最新报告 |

| `get_report` | 按日期和类型获取特定报告 |

| `search` | 在最近的报告中进行关键字搜索 |

**Claude Desktop 设置** — 添加到 `~/Library/Application Support/Claude/claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
保存后重启 Claude Desktop。然后您可以向 Claude 询问以下问题：

- *“AI CLI 工具的最新进展是什么？”* → 调用 `get_latest` 函数

- *“搜索本周 Claude Code 的提及”* → 调用 `search` 函数

- *“显示 2026 年 3 月 5 日的 AI 趋势报告”* → 调用 `get_report` 函数

**OpenClaw 设置** — 运行以下命令：

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
或者手动将其添加到 `~/.openclaw/openclaw.json` 文件中：

```json
{
  "mcpServers": {
    "agents-radar": {
      "type": "http",
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
然后，您可以向 OpenClaw 询问以下问题：

- *“AI CLI 工具的最新进展是什么？”* → 调用 `get_latest` 函数

- *“搜索本周 Claude Code 的提及”* → 调用 `search` 函数

- *“显示 2026 年 3 月 5 日的 AI 趋势报告”* → 调用 `get_report` 函数

**自托管** — 从 `mcp/` 目录部署您自己的实例：

```bash
cd mcp
pnpm install
wrangler deploy
```
## 已追踪数据源

涵盖 GitHub 代码库、新闻、研究和社区动态等 10 个数据源。完整列表（包含代码库链接和各数据源详情）请参见 [docs/sources.md](./docs/sources.md)。

**简要概述：** 9 个 AI CLI 代码库 + OpenClaw + 12 个对等代理（GitHub API）· Claude Code Skills · GitHub Trending（HTML + 搜索 API）· Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + OpenAI 站点地图。

## 功能

- 获取所有跟踪仓库中过去 24 小时内更新的问题、拉取请求和版本发布

- 跟踪 Claude Code Skills 的热门趋势——按社区参与度排序，而非发布时间

- 为每个 CLI 仓库生成工具摘要和跨工具对比分析

- 生成 OpenClaw 项目的深度报告，并与 11 个同类项目进行跨生态系统对比

- 通过站点地图抓取 Anthropic 和 OpenAI 的官方网页内容；增量检测新文章

- 每日监控 GitHub Trending，并搜索 6 个 AI 主题标签；按维度对仓库进行分类并提取趋势信号

- 从 Hacker News 获取过去 24 小时内排名前 30 的 AI 新闻（按积分排名）；生成社区情绪报告

- 为每种报告类型发布 GitHub Issues；将 Markdown 文件提交到 `assets/digests/YYYY-MM-DD/` 目录

- 通过 GitHub Actions 每日运行支持手动触发

- 所有跟踪的存储库均可通过 `config.yml` 进行配置 — 无需更改代码

- 通过 `locales/*.json` 实现集中式语言环境系统 — 支持 21 种语言，`packages/core/src/locales/t.ts` 中的 `t()` 目录

## 设置

1. **Fork** 此存储库

2. 将您的 LLM 提供商密钥添加为存储库密钥（例如 `ANTHROPIC_API_KEY`）

3. 在“操作”选项卡中启用工作流 — 之后将自动运行

有关完整指南（密钥参考、LLM 提供商、`config.yml` 自定义、本地开发、多语言配置和计划任务）的信息，请参阅 [docs/setup.md](./docs/setup.md)。

## 输出格式

每种报告类型和每种已启用语言生成一个文件，写入 `assets/digests/YYYY-MM-DD/` 目录。历史摘要位于 [`assets/digests/`](./assets/digests/)。有关完整的文件列表、每个报告的结构以及 GitHub Issue 标签的参考，请参阅 [docs/output-format.md](./docs/output-format.md)。

## 常见问题解答

常见问题（例如报告为何被跳过、运行费用、添加仓库、更改运行计划、429 错误故障排除等）的解答请参见 [docs/faq.md](./docs/faq.md)。

## 贡献

欢迎贡献代码。有关分支策略、编码标准、提交约定以及添加新语言或报告类型的说明，请参阅 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 明星历史

[![明星历史图表](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)

