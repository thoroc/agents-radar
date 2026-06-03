import { getPrimaryLang, type Locale, t } from "../../utils";

const NOTIFY_LABEL_MAP: Record<string, keyof ReturnType<typeof t>> = {
  "ai-cli": "notifyCli",
  "ai-agents": "notifyAgents",
  "ai-web": "notifyWeb",
  "ai-trending": "notifyTrending",
  "ai-hn": "notifyHn",
  "ai-ph": "notifyPh",
  "ai-arxiv": "notifyArxiv",
  "ai-hf": "notifyHf",
  "ai-community": "notifyCommunity",
  "ai-weekly": "notifyWeekly",
  "ai-monthly": "notifyMonthly",
};

export const label = (id: string, lang: Locale = getPrimaryLang() as Locale): string => {
  const key = NOTIFY_LABEL_MAP[id];
  if (!key) return id;
  return t(lang)[key];
};
