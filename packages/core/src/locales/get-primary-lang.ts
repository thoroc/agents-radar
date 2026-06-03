import { loadConfig } from "../config/load";

export interface GetPrimaryLangArgs {
  primaryLang: string | null;
  fallbackLang: string | null;
}

const _defaultArgs: GetPrimaryLangArgs = { primaryLang: null, fallbackLang: null };

export const getPrimaryLang = (args: GetPrimaryLangArgs = _defaultArgs): string => {
  if (!args.primaryLang) {
    const cfg = loadConfig();
    args.primaryLang = cfg.defaultPrimaryLanguage;
    args.fallbackLang = cfg.defaultFallbackLanguage;
  }
  return args.primaryLang;
};
