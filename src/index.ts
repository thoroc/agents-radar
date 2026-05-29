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

import fs from "node:fs";
import path from "node:path";
import {
  type GitHubItem,
  type RepoFetch,
  fetchRecentItems,
  fetchRecentReleases,
  fetchSkillsData,
  createGitHubIssue,
} from "./github.ts";
import {
  type RepoDigest,
  buildCliPrompt,
  buildPeerPrompt,
  buildComparisonPrompt,
  buildPeersComparisonPrompt,
  buildSkillsPrompt,
} from "./prompts.ts";
import { buildTrendingPrompt, buildHighlightsPrompt, type ReportHighlights } from "./prompts-data.ts";
import { callLlm, saveFile, autoGenFooter, LLM_TOKENS_TRENDING } from "./report.ts";
import { buildCliReportContent, buildOpenclawReportContent } from "./report-builders.ts";
import {
  saveWebReport,
  saveTrendingReport,
  saveHnReport,
  savePhReport,
  saveArxivReport,
  saveHfReport,
  saveCommunityReport,
} from "./report-savers.ts";
import { loadWebState, fetchSiteContent, type WebFetchResult, type WebState } from "./web.ts";
import { fetchTrendingData, type TrendingData } from "./trending.ts";
import { fetchHnData, type HnData } from "./hn.ts";
import { fetchPhData, type PhData } from "./ph.ts";
import { fetchArxivData, type ArxivData } from "./arxiv.ts";
import { fetchHfData, type HfData } from "./hf.ts";
import { fetchDevtoData, type DevtoData } from "./devto.ts";
import { fetchLobstersData, type LobstersData } from "./lobsters.ts";
import { loadConfig, getEnabledLangs } from "./config.ts";
import { toCstDateStr, toUtcStr } from "./date.ts";
import { t, type Lang } from "./i18n.ts";

// ---------------------------------------------------------------------------
// Repo config — loaded from config.yml, falls back to built-in defaults
// ---------------------------------------------------------------------------

const {
  cliRepos: CLI_REPOS,
  skillsRepo: CLAUDE_SKILLS_REPO,
  openclaw: OPENCLAW,
  openclawPeers: OPENCLAW_PEERS,
  languages: CONFIG_LANGS,
} = loadConfig();

const ENABLED_LANGS = getEnabledLangs(CONFIG_LANGS);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

// ---------------------------------------------------------------------------
// Phase 1: Fetch
// ---------------------------------------------------------------------------

async function fetchAllData(
  since: Date,
  webState: WebState,
): Promise<{
  fetched: RepoFetch[];
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] };
  webResults: WebFetchResult[];
  trendingData: TrendingData;
  hnData: HnData;
  phData: PhData;
  arxivData: ArxivData;
  hfData: HfData;
  devtoData: DevtoData;
  lobstersData: LobstersData;
}> {
  const allConfigs = [...CLI_REPOS, OPENCLAW, ...OPENCLAW_PEERS];
  console.log(
    `  Tracking: ${allConfigs.map((r) => r.id).join(", ")}, claude-code-skills, web, hn, ph, arxiv, hf, devto, lobsters`,
  );

  const [
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
  ] = await Promise.all([
    Promise.all(
      allConfigs.map(async (cfg) => {
        try {
          const [issuesRaw, prs, releases] = await Promise.all([
            fetchRecentItems(cfg, "issues", since),
            fetchRecentItems(cfg, "pulls", since),
            fetchRecentReleases(cfg.repo, since),
          ]);
          const issues = issuesRaw.filter((i) => !i.pull_request);
          console.log(
            `  [${cfg.id}] issues: ${issues.length}, prs: ${prs.length}, releases: ${releases.length}`,
          );
          return { cfg, issues, prs, releases };
        } catch (err) {
          console.error(`  [${cfg.id}] fetch failed: ${err}`);
          return { cfg, issues: [], prs: [], releases: [] };
        }
      }),
    ),
    fetchSkillsData(CLAUDE_SKILLS_REPO)
      .then((d) => {
        console.log(`  [claude-code-skills] prs: ${d.prs.length}, issues: ${d.issues.length}`);
        return d;
      })
      .catch((err) => {
        console.error(`  [claude-code-skills] fetch failed: ${err}`);
        return { prs: [] as GitHubItem[], issues: [] as GitHubItem[] };
      }),
    Promise.all([
      fetchSiteContent("anthropic", webState).catch((err): WebFetchResult => {
        console.error(`  [web/anthropic] fetch failed: ${err}`);
        return {
          site: "anthropic",
          siteName: "Anthropic (Claude)",
          isFirstRun: false,
          newItems: [],
          totalDiscovered: 0,
        };
      }),
      fetchSiteContent("openai", webState).catch((err): WebFetchResult => {
        console.error(`  [web/openai] fetch failed: ${err}`);
        return { site: "openai", siteName: "OpenAI", isFirstRun: false, newItems: [], totalDiscovered: 0 };
      }),
    ]),
    fetchTrendingData().catch(
      (): TrendingData => ({
        trendingRepos: [],
        searchRepos: [],
        trendingFetchSuccess: false,
      }),
    ),
    fetchHnData().catch((): HnData => ({ stories: [], fetchSuccess: false })),
    fetchPhData().catch((): PhData => ({ products: [], fetchSuccess: false })),
    fetchArxivData().catch((): ArxivData => ({ papers: [], fetchSuccess: false })),
    fetchHfData().catch((): HfData => ({ models: [], fetchSuccess: false })),
    fetchDevtoData().catch((): DevtoData => ({ articles: [], fetchSuccess: false })),
    fetchLobstersData().catch((): LobstersData => ({ stories: [], fetchSuccess: false })),
  ]);

  return {
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
  };
}

// ---------------------------------------------------------------------------
// Phase 2: LLM summaries
// ---------------------------------------------------------------------------

/** Call LLM with logging and error fallback. */
async function summarize(id: string, prompt: string, failMsg: string, maxTokens?: number): Promise<string> {
  console.log(`  [${id}] Calling LLM for summary...`);
  try {
    return await callLlm(prompt, maxTokens);
  } catch (err) {
    console.error(`  [${id}] LLM call failed: ${err}`);
    return failMsg;
  }
}

/** Summarize a repo's activity, returning a RepoDigest. Skips LLM if no data. */
async function summarizeRepo(
  { cfg, issues, prs, releases }: RepoFetch,
  prompt: string,
  noActivityMsg: string,
  failMsg: string,
): Promise<RepoDigest> {
  if (!issues.length && !prs.length && !releases.length) {
    console.log(`  [${cfg.id}] No activity, skipping LLM call`);
    return { config: cfg, issues, prs, releases, summary: noActivityMsg };
  }
  const summary = await summarize(cfg.id, prompt, failMsg);
  return { config: cfg, issues, prs, releases, summary };
}

async function generateSummaries(
  fetchedCli: RepoFetch[],
  fetchedOpenclaw: RepoFetch,
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] },
  fetchedPeers: RepoFetch[],
  trendingData: TrendingData,
  dateStr: string,
  lang: Lang = "zh",
): Promise<{
  cliDigests: RepoDigest[];
  openclawSummary: string;
  skillsSummary: string;
  peerDigests: RepoDigest[];
  trendingSummary: string;
}> {
  const s = t(lang);
  const noActivity = s.noActivity;
  const fail = s.summaryFailed;

  const [cliDigests, openclawSummary, skillsSummary, peerDigests, trendingSummary] = await Promise.all([
    Promise.all(
      fetchedCli.map((f) =>
        summarizeRepo(f, buildCliPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, lang), noActivity, fail),
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
        lang,
      ),
      noActivity,
      fail,
    ).then((d) => d.summary),
    summarize(
      "claude-code-skills",
      buildSkillsPrompt(skillsData.prs, skillsData.issues, dateStr, lang),
      t(lang).skillsFailed,
    ),
    Promise.all(
      fetchedPeers.map((f) =>
        summarizeRepo(
          f,
          buildPeerPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, undefined, undefined, lang),
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
        buildTrendingPrompt(trendingData, dateStr, lang),
        t(lang).trendingFailed,
        LLM_TOKENS_TRENDING,
      );
    })(),
  ]);

  return { cliDigests, openclawSummary, skillsSummary, peerDigests, trendingSummary };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  requireEnv("GITHUB_TOKEN");

  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  const providerName = process.env["LLM_PROVIDER"] ?? "anthropic";
  console.log(`[${now.toISOString()}] Starting digest | provider: ${providerName}`);

  // 1. Fetch all data in parallel
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
  } = await fetchAllData(since, webState);

  const peerIds = new Set(OPENCLAW_PEERS.map((p) => p.id));
  const fetchedCli = fetched.filter((f) => f.cfg.id !== OPENCLAW.id && !peerIds.has(f.cfg.id));
  const fetchedOpenclaw = fetched.find((f) => f.cfg.id === OPENCLAW.id)!;
  const fetchedPeers = fetched.filter((f) => peerIds.has(f.cfg.id));

  // 2. Generate per-repo LLM summaries in parallel for all enabled languages
  console.log(`  Generating summaries in ${ENABLED_LANGS.join(", ")} in parallel...`);
  const summariesPromises = ENABLED_LANGS.map((lang) =>
    generateSummaries(fetchedCli, fetchedOpenclaw, skillsData, fetchedPeers, trendingData, dateStr, lang),
  );
  const summariesArray = await Promise.all(summariesPromises);
  const summariesByLang: Record<string, Awaited<ReturnType<typeof generateSummaries>>> = {};
  for (let i = 0; i < ENABLED_LANGS.length; i++) {
    summariesByLang[ENABLED_LANGS[i]!] = summariesArray[i]!;
  }

  // 3. Generate cross-repo comparisons in parallel for all enabled languages
  console.log(`  Calling LLM for comparative analyses (${ENABLED_LANGS.join(", ")} in parallel)...`);

  const comparisonPromises = ENABLED_LANGS.flatMap((lang) => {
    const makeDigest = (): RepoDigest => ({
      config: OPENCLAW,
      issues: fetchedOpenclaw.issues,
      prs: fetchedOpenclaw.prs,
      releases: fetchedOpenclaw.releases,
      summary: summariesByLang[lang]!.openclawSummary,
    });
    return [
      callLlm(buildComparisonPrompt(summariesByLang[lang]!.cliDigests, dateStr, lang)).then(
        (r) => [lang, "comparison", r] as const,
      ),
      callLlm(
        buildPeersComparisonPrompt(makeDigest(), summariesByLang[lang]!.peerDigests, dateStr, lang),
      ).then((r) => [lang, "peers", r] as const),
    ];
  });
  const comparisonResults = await Promise.all(comparisonPromises);
  const comparisonByLang: Record<string, string> = {};
  const peersComparisonByLang: Record<string, string> = {};
  for (const [lang, type, result] of comparisonResults) {
    if (type === "comparison") comparisonByLang[lang] = result;
    else peersComparisonByLang[lang] = result;
  }

  // 4. Build + save all reports
  const cliContent: Record<string, string> = {};
  const openclawContent: Record<string, string> = {};

  for (const lang of ENABLED_LANGS) {
    const s = summariesByLang[lang]!;
    const ft = autoGenFooter(lang);
    const suffix = lang === "zh" ? "" : `.${lang}`;

    cliContent[lang] = buildCliReportContent(
      s.cliDigests,
      s.skillsSummary,
      comparisonByLang[lang]!,
      utcStr,
      dateStr,
      ft,
      CLAUDE_SKILLS_REPO,
      lang,
    );
    openclawContent[lang] = buildOpenclawReportContent(
      fetchedOpenclaw,
      s.peerDigests,
      s.openclawSummary,
      peersComparisonByLang[lang]!,
      utcStr,
      dateStr,
      ft,
      OPENCLAW,
      OPENCLAW_PEERS,
      lang,
    );

    console.log(`  Saved ${saveFile(cliContent[lang], dateStr, `ai-cli${suffix}.md`)}`);
    console.log(`  Saved ${saveFile(openclawContent[lang], dateStr, `ai-agents${suffix}.md`)}`);
  }

  // Web report: first lang saves state, others skip
  for (const lang of ENABLED_LANGS) {
    await saveWebReport(webResults, webState, utcStr, dateStr, digestRepo, autoGenFooter(lang), lang);
  }

  await Promise.all(
    ENABLED_LANGS.flatMap((lang) => [
      saveTrendingReport(
        trendingData,
        summariesByLang[lang]!.trendingSummary,
        utcStr,
        dateStr,
        digestRepo,
        autoGenFooter(lang),
        lang,
      ),
      saveHnReport(hnData, utcStr, dateStr, digestRepo, autoGenFooter(lang), lang),
      savePhReport(phData, utcStr, dateStr, digestRepo, autoGenFooter(lang), lang),
      saveArxivReport(arxivData, utcStr, dateStr, digestRepo, autoGenFooter(lang), lang),
      saveHfReport(hfData, utcStr, dateStr, digestRepo, autoGenFooter(lang), lang),
      saveCommunityReport(devtoData, lobstersData, utcStr, dateStr, digestRepo, autoGenFooter(lang), lang),
    ]),
  );

  // 5. Generate highlights for Telegram notification
  const readReport = (name: string): string | undefined => {
    const p = path.join("digests", dateStr, name);
    return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : undefined;
  };

  const reportsByLang: Record<string, Record<string, string>> = {};
  for (const lang of ENABLED_LANGS) {
    reportsByLang[lang] = { "ai-cli": cliContent[lang]!, "ai-agents": openclawContent[lang]! };
  }
  for (const id of ["ai-trending", "ai-web", "ai-hn", "ai-ph", "ai-arxiv", "ai-hf", "ai-community"]) {
    for (const lang of ENABLED_LANGS) {
      const file = lang === "zh" ? `${id}.md` : `${id}.${lang}.md`;
      const content = readReport(file);
      if (content) reportsByLang[lang]![id] = content;
    }
  }

  console.log("  Generating highlights for Telegram...");
  const highlights: Record<string, ReportHighlights> = {};
  try {
    const results = await Promise.all(
      ENABLED_LANGS.map(async (lang) => {
        const raw = await callLlm(buildHighlightsPrompt(reportsByLang[lang]!, lang), 2048);
        const parsed = JSON.parse(
          raw
            .replace(/```json?\n?/g, "")
            .replace(/```/g, "")
            .trim(),
        ) as ReportHighlights;
        return [lang, parsed] as const;
      }),
    );
    for (const [lang, parsed] of results) {
      highlights[lang] = parsed;
    }
  } catch (err) {
    console.error(`  [highlights] Generation failed: ${err}`);
  }

  const highlightsPath = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.log(`  Saved ${highlightsPath}`);

  // 6. Create GitHub issues for CLI + OpenClaw
  if (digestRepo) {
    for (const lang of ENABLED_LANGS) {
      const cliUrl = await createGitHubIssue(
        `${t(lang).issueTitleCli} ${dateStr}`,
        cliContent[lang]!,
        t(lang).issueLabelCli,
        lang,
      );
      console.log(`  Created CLI issue (${lang}): ${cliUrl}`);

      const ocUrl = await createGitHubIssue(
        `${t(lang).issueTitleOpenclaw} ${dateStr}`,
        openclawContent[lang]!,
        t(lang).issueLabelOpenclaw,
        lang,
      );
      console.log(`  Created OpenClaw issue (${lang}): ${ocUrl}`);
    }
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
