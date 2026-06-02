import { type Locale, t } from "../../utils";

export const notifyLabel = (id: string, lang: Locale = "zh"): string => {
  const s = t(lang);
  switch (id) {
    case "ai-cli":
      return s.notifyCli;
    case "ai-agents":
      return s.notifyAgents;
    case "ai-web":
      return s.notifyWeb;
    case "ai-trending":
      return s.notifyTrending;
    case "ai-hn":
      return s.notifyHn;
    case "ai-ph":
      return s.notifyPh;
    case "ai-arxiv":
      return s.notifyArxiv;
    case "ai-hf":
      return s.notifyHf;
    case "ai-community":
      return s.notifyCommunity;
    case "ai-weekly":
      return s.notifyWeekly;
    case "ai-monthly":
      return s.notifyMonthly;
    default:
      return id;
  }
};
