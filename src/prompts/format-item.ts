import type { GitHubItem } from "../github/types";
import { type Locale, t } from "../utils";

export const formatItem = (item: GitHubItem, lang: Locale = "zh-CN"): string => {
  const labels = item.labels.map((l) => l.name).join(", ");
  const labelStr = labels ? ` [${labels}]` : "";
  const body = (item.body ?? "").replace(/\n/g, " ").trim().slice(0, 300);
  const ellipsis = (item.body ?? "").length > 300 ? "..." : "";
  const l = t(lang);
  const repoSlug = item.html_url.replace(/^https:\/\/github\.com\//, "").replace(/\/(issues|pull)\/\d+$/, "");
  const itemKind = item.html_url.includes("/pull/") ? "PR" : "Issue";
  const refStr = `${repoSlug} ${itemKind} #${item.number}`;
  return [
    `#${item.number} [${item.state.toUpperCase()}]${labelStr} ${item.title}`,
    `  ${l.formatItemAuthor}: ${item.user.login} | ${l.formatItemCreated}: ${item.created_at.slice(0, 10)} | ${l.formatItemUpdated}: ${item.updated_at.slice(0, 10)} | ${l.formatItemComments}: ${item.comments} | 👍: ${item.reactions?.["+1"] ?? 0}`,
    `  ${l.formatItemUrl}: ${refStr}`,
    `  ${l.formatItemSummary}: ${body}${ellipsis}`,
  ].join("\n");
};
