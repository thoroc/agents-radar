import { DEFAULT_LANGUAGES } from "./locale-data";

export const getEnabledLangs = (langConfig?: string[]): string[] => {
  const envLangs = process.env.REPORT_LANGS;
  if (envLangs) {
    return envLangs
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (langConfig && langConfig.length > 0) return langConfig;
  return DEFAULT_LANGUAGES;
};
