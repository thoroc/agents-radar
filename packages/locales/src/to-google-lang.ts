const PRESERVE_REGIONAL: ReadonlySet<string> = new Set(["pt-BR", "zh-CN"]);

export const toGoogleLang = (locale: string): string => {
  if (PRESERVE_REGIONAL.has(locale)) return locale;
  const lang = locale.split("-")[0];
  if (!lang) throw new Error(`Invalid locale: ${locale}`);
  return lang;
};
