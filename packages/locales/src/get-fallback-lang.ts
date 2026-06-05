import { getPrimaryLang } from "./get-primary-lang";

interface GetFallbackLangArgs {
  fallbackLang: string | null;
  primaryLang: string | null;
}

export const getFallbackLang = (args: GetFallbackLangArgs): string => {
  if (!args.fallbackLang) getPrimaryLang(args);
  return args.fallbackLang ?? "en-US";
};
