import { t } from "../utils";

export const reportLabel = (id: string): string => {
  const zh = t("zh");
  const en = t("en");
  switch (id) {
    case "ai-cli":
      return zh.reportLabelAiCli;
    case "ai-cli-en":
      return en.reportLabelAiCliEn;
    case "ai-agents":
      return zh.reportLabelAiAgents;
    case "ai-agents-en":
      return en.reportLabelAiAgentsEn;
    case "ai-web":
      return zh.reportLabelAiWeb;
    case "ai-web-en":
      return en.reportLabelAiWebEn;
    case "ai-trending":
      return zh.reportLabelAiTrending;
    case "ai-trending-en":
      return en.reportLabelAiTrendingEn;
    case "ai-hn":
      return zh.reportLabelAiHn;
    case "ai-hn-en":
      return en.reportLabelAiHnEn;
    case "ai-ph":
      return zh.reportLabelAiPh;
    case "ai-ph-en":
      return en.reportLabelAiPhEn;
    case "ai-arxiv":
      return zh.reportLabelAiArxiv;
    case "ai-arxiv-en":
      return en.reportLabelAiArxivEn;
    case "ai-hf":
      return zh.reportLabelAiHf;
    case "ai-hf-en":
      return en.reportLabelAiHfEn;
    case "ai-community":
      return zh.reportLabelAiCommunity;
    case "ai-community-en":
      return en.reportLabelAiCommunityEn;
    case "ai-weekly":
      return zh.reportLabelAiWeekly;
    case "ai-weekly-en":
      return en.reportLabelAiWeeklyEn;
    case "ai-monthly":
      return zh.reportLabelAiMonthly;
    case "ai-monthly-en":
      return en.reportLabelAiMonthlyEn;
    default:
      return id;
  }
};
