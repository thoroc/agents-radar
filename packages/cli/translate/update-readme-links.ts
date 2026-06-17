import { LANGUAGE_NAMES, LANGUAGE_NATIVE_NAMES } from "@agents-radar/locales";

const LANGUAGE_FLAGS: Readonly<Record<string, string>> = {
  "ar-SA": "🇸🇦",
  "bn-BD": "🇧🇩",
  "de-DE": "🇩🇪",
  "en-US": "🇬🇧",
  "es-ES": "🇪🇸",
  "fr-FR": "🇫🇷",
  "hi-IN": "🇮🇳",
  "id-ID": "🇮🇩",
  "it-IT": "🇮🇹",
  "ja-JP": "🇯🇵",
  "ko-KR": "🇰🇷",
  "nl-NL": "🇳🇱",
  "pl-PL": "🇵🇱",
  "pt-BR": "🇧🇷",
  "ro-RO": "🇷🇴",
  "ru-RU": "🇷🇺",
  "th-TH": "🇹🇭",
  "tr-TR": "🇹🇷",
  "uk-UA": "🇺🇦",
  "vi-VN": "🇻🇳",
  "zh-CN": "🇨🇳",
};

export interface UpdateReadmeLinksArgs {
  content: string;
  locales: readonly string[];
  primaryLang: string;
}

export const updateReadmeLinks = (args: UpdateReadmeLinksArgs): string => {
  const { content, locales, primaryLang } = args;

  const primaryName = LANGUAGE_NAMES[primaryLang] ?? primaryLang;
  const primaryFlag = LANGUAGE_FLAGS[primaryLang] ?? "";
  const parts: string[] = [`${primaryFlag} ${primaryName}`.trim()];

  for (const locale of locales) {
    if (locale === primaryLang) continue;
    const nativeName = LANGUAGE_NATIVE_NAMES[locale] ?? locale;
    const flag = LANGUAGE_FLAGS[locale] ?? "";
    const label = `${flag} ${nativeName}`.trim();
    parts.push(`[${label}](./README.${locale}.md)`);
  }

  const linkLine = parts.join(" | ");
  const linePattern = new RegExp(`^(?:.*)?${primaryName} \\|.*$`, "m");

  if (!linePattern.test(content)) {
    throw new Error(`Language link line not found (expected line containing "${primaryName} |")`);
  }

  return content.replace(linePattern, linkLine);
};
