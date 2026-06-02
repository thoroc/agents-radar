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
  let lang: Locale = "zh-CN";
  let base = id;
  if (id.endsWith(".en-US")) {
    lang = "en-US";
    base = id.slice(0, -6);
  }
  const key = REPORT_LABEL_KEY[base];
  return key ? t(lang)[key] : id;
};
