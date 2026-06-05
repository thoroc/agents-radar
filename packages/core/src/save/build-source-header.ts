import type { Locale } from "@agents-radar/locales";
import { t } from "../utils";

export const buildSourceHeader = (
  lang: Locale,
  dateStr: string,
  utcStr: string,
  title: string,
  sourceLabel: string,
  sourceUrl: string,
  count: string,
  extraMeta?: string,
): string => {
  const s = t(lang);
  const meta = extraMeta ? ` | ${extraMeta}` : "";
  const generated = s.headerGeneratedLabel.replace("{utcStr}", utcStr);
  const sourcePrefix = s.headerSourceLabel;
  return `# ${title} ${dateStr}\n\n> ${sourcePrefix}: [${sourceLabel}](${sourceUrl}) | ${count} | ${generated} UTC${meta}`;
};
