import { LANGUAGE_NAMES, LANGUAGE_NATIVE_NAMES } from "@agents-radar/locales";

export interface UpdateReadmeLinksArgs {
  content: string;
  locales: readonly string[];
  primaryLang: string;
}

export const updateReadmeLinks = (args: UpdateReadmeLinksArgs): string => {
  const { content, locales, primaryLang } = args;

  const primaryName = LANGUAGE_NAMES[primaryLang] ?? primaryLang;
  const parts: string[] = [primaryName];

  for (const locale of locales) {
    if (locale === primaryLang) continue;
    const nativeName = LANGUAGE_NATIVE_NAMES[locale] ?? locale;
    parts.push(`[${nativeName}](./README.${locale}.md)`);
  }

  const linkLine = parts.join(" | ");
  const linePattern = new RegExp(`^${primaryName} \\|.*$`, "m");

  if (!linePattern.test(content)) {
    throw new Error(`Language link line not found (expected line starting with "${primaryName} |")`);
  }

  return content.replace(linePattern, linkLine);
};
