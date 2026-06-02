import type { RepoConfig, RepoFetch } from "../github";
import { buildComparisonPrompt, buildPeersComparisonPrompt, type RepoDigest } from "../prompts";
import { callLlm } from "../report/call-llm";
import type { Locale } from "../utils";

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
  const langKeys = Object.keys(summariesByLang);

  const makeDigest = (lang: string): RepoDigest =>
    makeOpenclawDigest(openclaw, fetchedOpenclaw, summariesByLang[lang]!.openclawSummary);

  const results = await Promise.all(
    langKeys.flatMap((lang) => [
      callLlm(buildComparisonPrompt(summariesByLang[lang]!.cliDigests, dateStr, lang as Locale)),
      callLlm(
        buildPeersComparisonPrompt(
          makeDigest(lang),
          summariesByLang[lang]!.peerDigests,
          dateStr,
          lang as Locale,
        ),
      ),
    ]),
  );

  const comparisonByLang: ComparisonsByLang = {};
  const peersComparisonByLang: PeersComparisonsByLang = {};
  for (let i = 0; i < langKeys.length; i++) {
    comparisonByLang[langKeys[i]!] = results[i * 2]!;
    peersComparisonByLang[langKeys[i]!] = results[i * 2 + 1]!;
  }

  return { comparisonByLang, peersComparisonByLang };
};
