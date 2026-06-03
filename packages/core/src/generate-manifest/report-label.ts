import { type Locale, t } from "../utils";

const REPORT_LABEL_KEY: Record<string, keyof ReturnType<typeof t>> = {
  "ai-cli": "reportLabelAiCli",
  "ai-agents": "reportLabelAiAgents",
  "ai-web": "reportLabelAiWeb",
  "ai-trending": "reportLabelAiTrending",
  "ai-hn": "reportLabelAiHn",
  "ai-ph": "reportLabelAiPh",
  "ai-arxiv": "reportLabelAiArxiv",
  "ai-hf": "reportLabelAiHf",
  "ai-community": "reportLabelAiCommunity",
  "ai-weekly": "reportLabelAiWeekly",
  "ai-monthly": "reportLabelAiMonthly",
};

export const reportLabel = (id: string): string => {
  const isEn = id.endsWith(".en-US");
  const base = isEn ? id.slice(0, -6) : id;
  const key = REPORT_LABEL_KEY[base];
  if (!key) return id;
  const lang: Locale = isEn ? "en-US" : "zh-CN";
  return t(lang)[key];
};
