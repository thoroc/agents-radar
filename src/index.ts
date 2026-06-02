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
import { generateComparisons } from "./phases/compare";
import { fetchAllData } from "./phases/fetch";

import { savePhase } from "./phases/save";
import { generateSummaries } from "./phases/summarize";
import { requireEnv } from "./require-env";
import { getEnabledLangs, loadConfig, toCstDateStr, toUtcStr } from "./utils";

export const main = async (env: NodeJS.ProcessEnv = process.env): Promise<void> => {
  dotenvx.config({ quiet: true });
  requireEnv("GITHUB_TOKEN", env);

  const {
    cliRepos: CLI_REPOS,
    skillsRepo: CLAUDE_SKILLS_REPO,
    openclaw: OPENCLAW,
    openclawPeers: OPENCLAW_PEERS,
    languages: CONFIG_LANGS,
  } = loadConfig();
  const ENABLED_LANGS = getEnabledLangs(CONFIG_LANGS, env);
  const allConfigs = [...CLI_REPOS, OPENCLAW, ...OPENCLAW_PEERS];

  const now = DateTime.now();
  const since = now.minus({ hours: 24 });
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const digestRepo = env.DIGEST_REPO ?? "";

  const providerName = env.LLM_PROVIDER ?? "anthropic";
  console.error(`[${now.toISO()}] Starting digest | provider: ${providerName}`);

  const webState = loadWebState();
  const {
    fetched,
    skillsData,
    webResults,
    trendingData,
    hnData,
    phData,
    arxivData,
    hfData,
    devtoData,
    lobstersData,
  } = await fetchAllData(since, webState, allConfigs, CLAUDE_SKILLS_REPO);

  const peerIds = new Set(OPENCLAW_PEERS.map((p) => p.id));
  const fetchedCli = fetched.filter((f) => f.cfg.id !== OPENCLAW.id && !peerIds.has(f.cfg.id));
  const fetchedOpenclaw = fetched.find((f) => f.cfg.id === OPENCLAW.id)!;
  const fetchedPeers = fetched.filter((f) => peerIds.has(f.cfg.id));

  console.error("  Generating summaries in ZH and EN in parallel...");
  const [zhSummaries, enSummaries] = await Promise.all([
    generateSummaries(fetchedCli, fetchedOpenclaw, skillsData, fetchedPeers, trendingData, dateStr, "zh-CN"),
    generateSummaries(fetchedCli, fetchedOpenclaw, skillsData, fetchedPeers, trendingData, dateStr, "en-US"),
  ]);
  const summariesByLang = { "zh-CN": zhSummaries, "en-US": enSummaries };

  console.error("  Calling LLM for comparative analyses (ZH + EN)...");
  const { comparisonByLang, peersComparisonByLang } = await generateComparisons({
    summariesByLang,
    fetchedOpenclaw,
    openclaw: OPENCLAW,
    dateStr,
  });

  await savePhase({
    summariesByLang,
    comparisonsByLang: comparisonByLang,
    peersComparisonsByLang: peersComparisonByLang,
    claudeSkillsRepo: CLAUDE_SKILLS_REPO,
    utcStr,
    dateStr,
    digestRepo,
    enabledLangs: ENABLED_LANGS,
    fetchedOpenclaw,
    openclaw: OPENCLAW,
    openclawPeers: OPENCLAW_PEERS,
    webResults,
    webState,
    trendingData,
    hnData,
    phData,
    arxivData,
    hfData,
    devtoData,
    lobstersData,
  });

  console.error("Done!");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
