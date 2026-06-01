import type { DevtoData } from "../fetchers/devto";
import type { LobstersData } from "../fetchers/lobsters";
import type { PromptLang } from "../types";

const formatItemList = <T>(
  items: T[],
  lang: PromptLang,
  enFormat: (item: T, i: number) => string,
  zhFormat: (item: T, i: number) => string,
): string => items.map((item, i) => (lang === "en" ? enFormat(item, i) : zhFormat(item, i))).join("\n\n");

export const buildCommunityPrompt = (
  devto: DevtoData,
  lobsters: LobstersData,
  dateStr: string,
  lang: PromptLang = "zh",
): string => {
  const devtoText =
    devto.articles.length > 0
      ? devto.articles
          .map((a, i) =>
            lang === "en"
              ? `${i + 1}. **${a.title}**\n` +
                `   Link: ${a.url}\n` +
                `   Author: ${a.user} | Reactions: ${a.positiveReactionsCount} | Comments: ${a.commentsCount} | Reading: ${a.readingTimeMinutes} min\n` +
                `   Tags: ${a.tags.join(", ")}\n` +
                `   ${a.description}`
              : `${i + 1}. **${a.title}**\n` +
                `   链接: ${a.url}\n` +
                `   作者: ${a.user} | 点赞: ${a.positiveReactionsCount} | 评论: ${a.commentsCount} | 阅读: ${a.readingTimeMinutes} 分钟\n` +
                `   标签: ${a.tags.join(", ")}\n` +
                `   ${a.description}`,
          )
          .join("\n\n")
      : lang === "en"
        ? "(No Dev.to articles available)"
        : "（无 Dev.to 文章）";

  const lobstersText =
    lobsters.stories.length > 0
      ? formatItemList(
          lobsters.stories,
          lang,
          (s, i) =>
            `${i + 1}. **${s.title}**\n   Link: ${s.url}\n   Discussion: ${s.commentsUrl}\n   Score: ${s.score} | Comments: ${s.commentCount} | Author: ${s.author} | Tags: ${s.tags.join(", ")}`,
          (s, i) =>
            `${i + 1}. **${s.title}**\n   链接: ${s.url}\n   讨论: ${s.commentsUrl}\n   分数: ${s.score} | 评论: ${s.commentCount} | 作者: ${s.author} | 标签: ${s.tags.join(", ")}`,
        )
      : lang === "en"
        ? "(No Lobste.rs stories available)"
        : "（无 Lobste.rs 内容）";

  if (lang === "en") {
    return `You are a tech community analyst. The following are AI-related content from Dev.to and Lobste.rs as of ${dateStr}:

## Dev.to Articles (${devto.articles.length} articles)

${devtoText}

---

## Lobste.rs Stories (${lobsters.stories.length} stories)

${lobstersText}

---

Generate a structured Tech Community AI Digest in English:

1. **Today's Highlights** — 3-5 sentences on the most discussed AI topics across these communities today

2. **Dev.to Highlights** — Select 5-10 most valuable articles:
   - Title (with link)
   - Reactions and comments
   - One sentence: key takeaway for developers

3. **Lobste.rs Highlights** — Select 3-8 most notable stories:
   - Title (with link + discussion link)
   - Score and comments
   - One sentence: why it's worth reading

4. **Community Pulse** — 100-200 words on what these communities are talking about:
   - Common themes across both platforms
   - Practical concerns developers have about AI tools
   - Emerging tutorials, patterns, or best practices

5. **Worth Reading** — 2-3 articles/stories most worth reading in depth

Style: English, concise and developer-friendly, preserve all original links.
`;
  }

  return `你是技术社区分析师。以下是 ${dateStr} Dev.to 和 Lobste.rs 上的 AI 相关内容：

## Dev.to 文章（共 ${devto.articles.length} 篇）

${devtoText}

---

## Lobste.rs 内容（共 ${lobsters.stories.length} 条）

${lobstersText}

---

请生成一份结构清晰的《技术社区 AI 动态日报》，要求：

1. **今日速览** — 3~5 句话，概括今日技术社区围绕 AI 最热门的讨论方向

2. **Dev.to 精选** — 选出 5~10 篇最有价值的文章：
   - 标题（附链接）
   - 点赞数和评论数
   - 一句话说明：对开发者的核心价值

3. **Lobste.rs 精选** — 选出 3~8 条最值得关注的内容：
   - 标题（附链接 + 讨论链接）
   - 分数和评论数
   - 一句话说明：为什么值得阅读

4. **社区脉搏** — 100~200 字，分析技术社区在聊什么：
   - 两个平台共同关注的主题
   - 开发者对 AI 工具的实际关切
   - 新兴的教程、模式或最佳实践

5. **值得精读** — 2~3 篇最值得深入阅读的内容

语言要求：中文，简洁专业，保留所有原文链接。
`;
};
