import { logger } from "../utils";
import { bootstrapContext } from "./bootstrap-context";
import { classifyFetchResults } from "./classify-fetch-results";
import { generateComparisons } from "./compare";
import { fetchAllData } from "./fetch";
import { savePhase } from "./save";
import { generateSummaries } from "./summarize";

export const runDaily = async (env: NodeJS.ProcessEnv = process.env): Promise<void> => {
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
