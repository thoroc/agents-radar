import { type Locale, t } from "../utils";

export const autoGenFooter = (lang: Locale = "zh-CN", env: NodeJS.ProcessEnv = process.env): string => {
  const digestRepo = env.DIGEST_REPO ?? "";
  if (!digestRepo) return "";
  return `\n\n---\n*${t(lang).autoGen} [agents-radar](https://github.com/${digestRepo})${t(lang).autoGenFooter}*`;
};
