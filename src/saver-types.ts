export type SaveReportConfig = {
  data: unknown;
  promptBuilder: (data: unknown, dateStr: string, suffix: string) => string;
  headerBuilder: (dateStr: string, utcStr: string, suffix: string) => string;
  fileName: string;
  issueTitle?: string;
  issueLabel?: string;
  maxTokens?: number;
};

export type SaveReportDeps = {
  callLlm?: (prompt: string, maxTokens?: number) => Promise<string>;
  saveFile?: (content: string, ...segments: string[]) => string;
  createGitHubIssue?: (title: string, body: string, label: string) => Promise<string>;
};
