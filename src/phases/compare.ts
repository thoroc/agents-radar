import type { RepoConfig, RepoFetch } from "../github";
import { buildComparisonPrompt, buildPeersComparisonPrompt, type RepoDigest } from "../prompts";
import { callLlm } from "../report/call-llm";

export type ComparisonsByLang = Record<string, string>;
export type PeersComparisonsByLang = Record<string, string>;

export type ComparisonsResult = {
  comparisonByLang: ComparisonsByLang;
  peersComparisonByLang: PeersComparisonsByLang;
};

export type ComparisonsInput = {
  summariesByLang: Record<string, GenerateSummariesResult>;
  fetchedOpenclaw: RepoFetch;
  openclaw: RepoConfig;
  dateStr: string;
};

type GenerateSummariesResult = {
  cliDigests: RepoDigest[];
  openclawSummary: string;
  peerDigests: RepoDigest[];
};

const makeOpenclawDigest = (openclaw: RepoConfig, fetched: RepoFetch, summary: string): RepoDigest => ({
  config: openclaw,
  issues: fetched.issues,
  prs: fetched.prs,
  releases: fetched.releases,
  summary,
});

export const generateComparisons = async (input: ComparisonsInput): Promise<ComparisonsResult> => {
  const { summariesByLang, fetchedOpenclaw, openclaw, dateStr } = input;

  const makeDigest = (lang: string): RepoDigest =>
    makeOpenclawDigest(openclaw, fetchedOpenclaw, summariesByLang[lang]!.openclawSummary);

  const [zhComparison, zhPeersComparison, enComparison, enPeersComparison] = await Promise.all([
    callLlm(buildComparisonPrompt(summariesByLang["zh-CN"]!.cliDigests, dateStr, "zh-CN")),
    callLlm(
      buildPeersComparisonPrompt(
        makeDigest("zh-CN"),
        summariesByLang["zh-CN"]!.peerDigests,
        dateStr,
        "zh-CN",
      ),
    ),
    callLlm(buildComparisonPrompt(summariesByLang["en-US"]!.cliDigests, dateStr, "en-US")),
    callLlm(
      buildPeersComparisonPrompt(
        makeDigest("en-US"),
        summariesByLang["en-US"]!.peerDigests,
        dateStr,
        "en-US",
      ),
    ),
  ]);

  return {
    comparisonByLang: { "zh-CN": zhComparison, "en-US": enComparison },
    peersComparisonByLang: { "zh-CN": zhPeersComparison, "en-US": enPeersComparison },
  };
};
