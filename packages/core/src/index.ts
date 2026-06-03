/**
 * agents-radar: daily digest for AI CLI tools and OpenClaw.
 *
 * Env vars:
 *   LLM_PROVIDER        - "anthropic" | "openai" | "github-copilot" | "openrouter" (default: anthropic)
 *   GITHUB_TOKEN        - GitHub token for API access and issue creation
 *   DIGEST_REPO         - owner/repo where digest issues are posted (optional)
 *
 * Provider-specific env vars — see src/providers/ for full list.
 */

import dotenvx from "@dotenvx/dotenvx";
import { DateTime } from "luxon";
import { loadWebState } from "./fetchers";
import type { RepoConfig, RepoFetch } from "./github";
import { generateComparisons } from "./phases/compare";
import { fetchAllData } from "./phases/fetch";
import { savePhase } from "./phases/save";
import { generateSummaries } from "./phases/summarize";
import { requireEnv } from "./require-env";
import { getEnabledLangs, type Locale, loadConfig, logger, toCstDateStr, toUtcStr } from "./utils";

const bootstrapContext = (env: NodeJS.ProcessEnv) => {
  dotenvx.config({ quiet: true });
  requireEnv("GITHUB_TOKEN", env);
  const { cliRepos, skillsRepo, openclaw, openclawPeers, languages } = loadConfig();
  const enabledLangs = getEnabledLangs(languages, env) as Locale[];
  const now = DateTime.now();
  return {
    cliRepos,
    skillsRepo,
    openclaw,
    openclawPeers,
    allConfigs: [...cliRepos, openclaw, ...openclawPeers],
    enabledLangs,
    since: now.minus({ hours: 24 }),
    dateStr: toCstDateStr(now),
    utcStr: toUtcStr(now),
    digestRepo: env.DIGEST_REPO ?? "",
    webState: loadWebState(),
  };
};

const classifyFetchResults = (fetched: RepoFetch[], openclaw: RepoConfig, openclawPeers: RepoConfig[]) => {
  const peerIds = new Set(openclawPeers.map((p) => p.id));
  return {
    fetchedCli: fetched.filter((f) => f.cfg.id !== openclaw.id && !peerIds.has(f.cfg.id)),
    fetchedOpenclaw: fetched.find((f) => f.cfg.id === openclaw.id)!,
    fetchedPeers: fetched.filter((f) => peerIds.has(f.cfg.id)),
  };
};

export const main = async (env: NodeJS.ProcessEnv = process.env): Promise<void> => {
  const ctx = bootstrapContext(env);
  logger.info(`Starting digest | provider: ${env.LLM_PROVIDER ?? "anthropic"}`);

  const rawFetch = await fetchAllData(ctx.since, ctx.webState, ctx.allConfigs, ctx.skillsRepo);
  const { fetchedCli, fetchedOpenclaw, fetchedPeers } = classifyFetchResults(
    rawFetch.fetched,
    ctx.openclaw,
    ctx.openclawPeers,
  );

  logger.info(`Generating summaries in ${ctx.enabledLangs.length} languages...`);
  const summariesByLang = Object.fromEntries(
    await Promise.all(
      ctx.enabledLangs.map(async (lang) => [
        lang,
        await generateSummaries(
          fetchedCli,
          fetchedOpenclaw,
          rawFetch.skillsData,
          fetchedPeers,
          rawFetch.trendingData,
          ctx.dateStr,
          lang,
        ),
      ]),
    ),
  );

  logger.info("Calling LLM for comparative analyses...");
  const { comparisonByLang, peersComparisonByLang } = await generateComparisons({
    summariesByLang,
    fetchedOpenclaw,
    openclaw: ctx.openclaw,
    dateStr: ctx.dateStr,
  });

  await savePhase({
    summariesByLang,
    comparisonsByLang: comparisonByLang,
    peersComparisonsByLang: peersComparisonByLang,
    claudeSkillsRepo: ctx.skillsRepo,
    utcStr: ctx.utcStr,
    dateStr: ctx.dateStr,
    digestRepo: ctx.digestRepo,
    enabledLangs: ctx.enabledLangs as string[],
    fetchedOpenclaw,
    openclaw: ctx.openclaw,
    openclawPeers: ctx.openclawPeers,
    webResults: rawFetch.webResults,
    webState: ctx.webState,
    trendingData: rawFetch.trendingData,
    hnData: rawFetch.hnData,
    phData: rawFetch.phData,
    arxivData: rawFetch.arxivData,
    hfData: rawFetch.hfData,
    devtoData: rawFetch.devtoData,
    lobstersData: rawFetch.lobstersData,
  });

  logger.info("Done!");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
