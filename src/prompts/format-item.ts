import type { GitHubItem } from "../github/types";
import { getPrimaryLang, type Locale, t } from "../utils";

export const formatItem = (item: GitHubItem, lang: Locale = getPrimaryLang() as Locale): string => {
  const labels = item.labels.map((l) => l.name).join(", ");
  const labelStr = labels ? ` [${labels}]` : "";
  const body = (item.body ?? "").replace(/\n/g, " ").trim().slice(0, 300);
  const ellipsis = (item.body ?? "").length > 300 ? "..." : "";
  const s = t(lang);
  const repoSlug = item.html_url.replace(/^https:\/\/github\.com\//, "").replace(/\/(issues|pull)\/\d+$/, "");
  const itemKind = item.html_url.includes("/pull/") ? "PR" : "Issue";
  const refStr = `${repoSlug} ${itemKind} #${item.number}`;
  return [
    `#${item.number} [${item.state.toUpperCase()}]${labelStr} ${item.title}`,
    `  ${s.formatItemAuthor}: ${item.user.login} | ${s.formatItemCreated}: ${item.created_at.slice(0, 10)} | ${s.formatItemUpdated}: ${item.updated_at.slice(0, 10)} | ${s.formatItemComments}: ${item.comments} | 👍: ${item.reactions?.["+1"] ?? 0}`,
    `  ${s.formatItemUrl}: ${refStr}`,
    `  ${s.formatItemSummary}: ${body}${ellipsis}`,
  ].join("\n");
};
