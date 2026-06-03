import type { RepoConfig, RepoFetch } from "../github";
import { buildComparisonPrompt, buildPeersComparisonPrompt, type RepoDigest } from "../prompts";
import { callLlm } from "../report/call-llm";
import type { Locale } from "../types/locale";

type ComparisonsByLang = Record<string, string>;
type PeersComparisonsByLang = Record<string, string>;

type ComparisonsResult = {
  comparisonByLang: ComparisonsByLang;
  peersComparisonByLang: PeersComparisonsByLang;
};

type ComparisonsInput = {
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

  const langs = Object.keys(summariesByLang);
  const results = await Promise.all(
    langs.flatMap((lang) => [
      callLlm(buildComparisonPrompt(summariesByLang[lang]!.cliDigests, dateStr, lang as Locale)).then(
        (r) => [lang, r] as const,
      ),
      callLlm(
        buildPeersComparisonPrompt(
          makeOpenclawDigest(openclaw, fetchedOpenclaw, summariesByLang[lang]!.openclawSummary),
          summariesByLang[lang]!.peerDigests,
          dateStr,
          lang as Locale,
        ),
      ).then((r) => [lang, r] as const),
    ]),
  );

  const comparisonByLang: ComparisonsByLang = {};
  const peersComparisonByLang: PeersComparisonsByLang = {};
  for (const [lang, result] of results) {
    if (!comparisonByLang[lang]) {
      comparisonByLang[lang] = result;
    } else {
      peersComparisonByLang[lang] = result;
    }
  }

  return { comparisonByLang, peersComparisonByLang };
};
