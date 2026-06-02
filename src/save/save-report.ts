import { createGitHubIssue } from "../github";
import { callLlm } from "../report/call-llm";
import { saveFile } from "../report/save-file";
import type { SaveReportConfig, SaveReportDeps } from "./saver-types";

export const defaultDeps: SaveReportDeps = {
  callLlm,
  saveFile,
  createGitHubIssue,
};

export const saveReport = async (
  config: SaveReportConfig,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: string,
  deps: SaveReportDeps = {},
): Promise<void> => {
  const fullDeps = { ...defaultDeps, ...deps };
  const suffix = lang === "zh-CN" ? "" : `.${lang}`;
  const content = await fullDeps.callLlm?.(
    config.promptBuilder(config.data, dateStr, suffix),
    config.maxTokens,
  );
  if (!content) return;

  const header = config.headerBuilder(dateStr, utcStr, suffix);
  const full = `${header}\n\n---\n\n${content}${footer}`;
  const path = fullDeps.saveFile?.(full, dateStr, `${config.fileName}${suffix}.md`);
  if (path) console.error(`  Saved ${path}`);

  if (digestRepo && config.issueTitle && config.issueLabel) {
    const url = await fullDeps.createGitHubIssue?.(
      `${config.issueTitle} ${dateStr}`,
      full,
      config.issueLabel,
    );
    if (url) console.error(`  Created issue: ${url}`);
  }
};
