/**
 * Locale-derived report labels.
 *
 * These mirror the `reportLabel()` function in `src/generate-manifest.ts`
 * using actual values from `locales/zh.json` (for Chinese-language reports)
 * and `locales/en.json` (for English-language reports).
 *
 * Keep in sync when adding new report types.
 */

export const REPORT_LABELS: Record<string, string> = {
  "ai-cli": "AI CLI 工具社区动态日报",
  "ai-cli-en": "AI CLI Tools Digest",
  "ai-agents": "AI Agents 生态日报",
  "ai-agents-en": "AI Agents Ecosystem Digest",
  "ai-web": "AI 官方内容追踪报告",
  "ai-web-en": "Official AI Content Report",
  "ai-trending": "AI 开源趋势日报",
  "ai-trending-en": "AI Open Source Trends",
  "ai-hn": "Hacker News AI 社区动态日报",
  "ai-hn-en": "Hacker News AI Community Digest",
  "ai-ph": "Product Hunt AI 产品日报",
  "ai-ph-en": "Product Hunt AI Products Digest",
  "ai-arxiv": "ArXiv AI 研究日报",
  "ai-arxiv-en": "ArXiv AI Research Digest",
  "ai-hf": "Hugging Face 热门模型日报",
  "ai-hf-en": "Hugging Face Trending Models Digest",
  "ai-community": "技术社区 AI 动态日报",
  "ai-community-en": "Tech Community AI Digest",
  "ai-weekly": "AI 工具生态周报",
  "ai-weekly-en": "AI Tools Weekly Digest",
  "ai-monthly": "AI 工具生态月报",
  "ai-monthly-en": "AI Tools Monthly Digest",
};
