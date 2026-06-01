import type { TrendingData } from "../fetchers/trending";
import type { RepoFetch } from "../github";
import {
  buildCliPrompt,
  buildPeerPrompt,
  buildSkillsPrompt,
  buildTrendingPrompt,
  type RepoDigest,
} from "../prompts";
import { callLlm } from "../report/call-llm";
import { LLM_TOKENS_TRENDING } from "../report/report-constants";
import { toPromptLang } from "../types";
import { type Locale, t } from "../utils";

const summarize = async (
  id: string,
  prompt: string,
  failMsg: string,
  maxTokens?: number,
): Promise<string> => {
  console.error(`  [${id}] Calling LLM for summary...`);
  try {
    return await callLlm(prompt, maxTokens);
  } catch (err) {
    console.error(`  [${id}] LLM call failed: ${err}`);
    return failMsg;
  }
};

const summarizeRepo = async (
  { cfg, issues, prs, releases }: RepoFetch,
  prompt: string,
  noActivityMsg: string,
  failMsg: string,
): Promise<RepoDigest> => {
  if (!issues.length && !prs.length && !releases.length) {
    console.error(`  [${cfg.id}] No activity, skipping LLM call`);
    return { config: cfg, issues, prs, releases, summary: noActivityMsg };
  }
  const summary = await summarize(cfg.id, prompt, failMsg);
  return { config: cfg, issues, prs, releases, summary };
};

export type GenerateSummariesResult = {
  cliDigests: RepoDigest[];
  openclawSummary: string;
  skillsSummary: string;
  peerDigests: RepoDigest[];
  trendingSummary: string;
};

export const generateSummaries = async (
  fetchedCli: RepoFetch[],
  fetchedOpenclaw: RepoFetch,
  skillsData: { prs: import("../github").GitHubItem[]; issues: import("../github").GitHubItem[] },
  fetchedPeers: RepoFetch[],
  trendingData: TrendingData,
  dateStr: string,
  lang: Locale = "zh",
): Promise<GenerateSummariesResult> => {
  const s = t(lang);
  const noActivity = s.noActivity;
  const fail = s.summaryFailed;

  const [cliDigests, openclawSummary, skillsSummary, peerDigests, trendingSummary] = await Promise.all([
    Promise.all(
      fetchedCli.map((f) =>
        summarizeRepo(
          f,
          buildCliPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, toPromptLang(lang)),
          noActivity,
          fail,
        ),
      ),
    ),
    summarizeRepo(
      fetchedOpenclaw,
      buildPeerPrompt(
        fetchedOpenclaw.cfg,
        fetchedOpenclaw.issues,
        fetchedOpenclaw.prs,
        fetchedOpenclaw.releases,
        dateStr,
        50,
        30,
        toPromptLang(lang),
      ),
      noActivity,
      fail,
    ).then((d) => d.summary),
    summarize(
      "claude-code-skills",
      buildSkillsPrompt(skillsData.prs, skillsData.issues, dateStr, toPromptLang(lang)),
      t(lang).skillsFailed,
    ),
    Promise.all(
      fetchedPeers.map((f) =>
        summarizeRepo(
          f,
          buildPeerPrompt(
            f.cfg,
            f.issues,
            f.prs,
            f.releases,
            dateStr,
            undefined,
            undefined,
            toPromptLang(lang),
          ),
          noActivity,
          fail,
        ),
      ),
    ),
    (async () => {
      const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
      if (!hasData) {
        return t(lang).trendingNoData;
      }
      return summarize(
        "trending",
        buildTrendingPrompt(trendingData, dateStr, toPromptLang(lang)),
        t(lang).trendingFailed,
        LLM_TOKENS_TRENDING,
      );
    })(),
  ]);

  return { cliDigests, openclawSummary, skillsSummary, peerDigests, trendingSummary };
};
