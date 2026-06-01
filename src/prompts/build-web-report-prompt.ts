import type { WebFetchResult } from "../fetchers";
import type { PromptLang } from "../types";

export const buildWebReportPrompt = (
  results: WebFetchResult[],
  dateStr: string,
  lang: PromptLang = "zh",
): string => {
  const isAnyFirstRun = results.some((r) => r.isFirstRun);

  const siteSections = results
    .map(({ siteName, isFirstRun, newItems, totalDiscovered }) => {
      const mode =
        lang === "en"
          ? isFirstRun
            ? `First full crawl (sitemap total ${totalDiscovered} URLs, showing latest ${newItems.length} articles)`
            : `Incremental update, ${newItems.length} new articles today`
          : isFirstRun
            ? `首次全量抓取（sitemap 共 ${totalDiscovered} 条 URL，以下为最新 ${newItems.length} 篇正文内容）`
            : `今日增量更新，共 ${newItems.length} 篇新内容`;

      if (newItems.length === 0) {
        const noContent =
          lang === "en" ? `(${mode}, no content to analyze.)` : `（${mode}，暂无可供分析的内容。）`;
        return `## ${siteName}\n\n${noContent}`;
      }

      const categoryLabel = lang === "en" ? "Category" : "分类";
      const dateLabel = lang === "en" ? "Published/Updated" : "发布/更新";
      const unknownDate = lang === "en" ? "unknown" : "未知";
      const excerptLabel = lang === "en" ? "Excerpt" : "内容节选";
      const metadataOnlyNote =
        lang === "en"
          ? "(metadata-only: title derived from URL slug, may be inaccurate; no article text available)"
          : "（仅元数据：标题由 URL 路径推断，可能不准确；无法获取正文内容）";
      const itemsText = newItems
        .map((item) => {
          const lines = [
            `### [${item.title || item.url}](${item.url})`,
            `- ${categoryLabel}: ${item.category} | ${dateLabel}: ${item.lastmod.slice(0, 10) || unknownDate}`,
          ];
          if (item.content) {
            lines.push(`- ${excerptLabel}: ${item.content}`);
          } else {
            lines.push(`- ${metadataOnlyNote}`);
          }
          return lines.join("\n");
        })
        .join("\n\n");

      const lp = lang === "en" ? "(" : "（";
      const rp = lang === "en" ? ")" : "）";
      return `## ${siteName}${lp}${mode}${rp}\n\n${itemsText}`;
    })
    .join("\n\n---\n\n");

  const firstRunNote =
    lang === "en"
      ? isAnyFirstRun
        ? "This is the first full crawl. Please focus on the overall content landscape, historical context, and core themes of each site, rather than individual articles."
        : "This is an incremental update. Please focus on today's new content and assess its strategic significance in context."
      : isAnyFirstRun
        ? "本次为首次全量抓取，请重点梳理各站点的内容格局、历史脉络与核心主题，而非仅关注单篇文章。"
        : "本次为增量更新，请聚焦今日新增内容，并结合上下文判断其战略意义。";

  if (lang === "en") {
    return `You are a deep content analyst focused on AI, skilled at extracting strategic signals from official announcements, technical blogs, research papers, and product documentation.

The following content was crawled on ${dateStr} from Anthropic (claude.com / anthropic.com) and OpenAI (openai.com). ${firstRunNote}

${siteSections}

---

Generate a detailed AI Official Content Tracking Report in English with these sections:

1. **Today's Highlights** — 3-5 sentences on the most important new releases or developments, calling out key highlights

2. **Anthropic / Claude Content Highlights** — Organize important content by category (news / research / engineering / learn, etc.):
   - For each piece, 2-4 sentences extracting core insights, technical details, or business significance
   - Note publication date and original link
   - If first full crawl, trace important milestones chronologically

3. **OpenAI Content Highlights** — Same structure, organized by research / release / company / safety categories
   - ⚠️ Note: OpenAI data is metadata-only (titles derived from URL slugs, no article text). Only list URLs and categories objectively. Do NOT speculate on title meanings or fabricate content summaries. If information is insufficient for analysis, state the data limitation clearly.

4. **Strategic Signal Analysis** — Based on both companies' release cadence and content focus, analyze:
   - Each company's recent technical priorities (model capabilities / safety / productization / ecosystem)
   - Competitive dynamics: who is setting the agenda, who is following
   - Potential impact on developers and enterprise users

5. **Notable Details** — Extract hidden signals from titles, phrasing, and timing, e.g.:
   - New terms or topics appearing for the first time
   - Dense releases in a category (may signal a product milestone)
   - Policy, compliance, and safety developments

${isAnyFirstRun ? "6. **Content Landscape Overview** — First full crawl only: summarize the content category distribution for both companies and describe their content strategy style (academic-oriented vs product-oriented vs user stories, etc.)\n\n" : ""}Style: English, professional and detailed, suited for AI researchers, product managers, and technical decision-makers. Every item must include official links.
`;
  }

  return `你是一位专注于 AI 领域的深度内容分析师，擅长从官方公告、技术博客、研究论文和产品文档中提炼战略信号。

以下是 ${dateStr} 从 Anthropic（claude.com / anthropic.com）和 OpenAI（openai.com）官网抓取的内容，${firstRunNote}

${siteSections}

---

请生成一份详实的《AI 官方内容追踪报告》，包含以下部分：

1. **今日速览** — 3~5 句话概括最重要的新发布或动向，点出核心亮点

2. **Anthropic / Claude 内容精选** — 按分类（news / research / engineering / learn 等）逐条整理重要内容：
   - 每篇用 2~4 句话提炼核心观点、技术细节或业务意义
   - 标注发布日期和原文链接
   - 如首次全量，按时间线梳理重要里程碑

3. **OpenAI 内容精选** — 同上，按 research / release / company / safety 等分类整理
   - ⚠️ 注意：OpenAI 数据为仅元数据模式（标题由 URL 路径推断，无正文）。请仅基于 URL 和分类进行客观列举，不要对标题含义进行推测性解读或编造内容摘要。如果信息不足以分析，直接说明数据受限即可。

4. **战略信号解读** — 基于两家公司的发布节奏和内容重点，分析：
   - 各自近期的技术优先级（模型能力 / 安全 / 产品化 / 生态）
   - 竞争态势：谁在引领议题，谁在跟进
   - 对开发者和企业用户的潜在影响

5. **值得关注的细节** — 从标题、措辞、发布时机中提取隐含信号，例如：
   - 新兴词汇或话题的首次出现
   - 某类主题的密集发布（可能预示产品节点）
   - 政策、合规、安全方面的动向

${isAnyFirstRun ? "6. **内容格局总览** — 首次全量独有：汇总两家公司各内容类别的数量分布，并说明各自的内容运营风格（学术导向 vs 产品导向 vs 用户故事等）\n\n" : ""}语言要求：中文，专业深入，内容详实，适合 AI 领域研究者、产品经理和技术决策者阅读。每个条目必须附上 GitHub/官网链接。
`;
};
