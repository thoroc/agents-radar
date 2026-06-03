import type { DateTime } from "luxon";
import { fetchSiteContent, type WebFetchResult, type WebState } from "../fetchers";
import { type ArxivData, fetchArxivData } from "../fetchers/arxiv";
import { type DevToData, fetchDevToData } from "../fetchers/dev-to";
import { fetchHackerNewsData, type HackerNewsData } from "../fetchers/hacker-news";
import { fetchHuggingFaceData, type HuggingFaceData } from "../fetchers/hugging-face";
import { fetchLobstersData, type LobstersData } from "../fetchers/lobste-rs";
import { fetchProductHuntData, type ProductHuntData } from "../fetchers/product-hunt";
import { fetchTrendingData, type TrendingData } from "../fetchers/trending";
import {
  fetchRecentItems,
  fetchRecentReleases,
  fetchSkillsData,
  type GitHubItem,
  type RepoConfig,
  type RepoFetch,
} from "../github";

type FetchAllDataResult = {
  fetched: RepoFetch[];
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] };
  webResults: WebFetchResult[];
  trendingData: TrendingData;
  hnData: HackerNewsData;
  phData: ProductHuntData;
  arxivData: ArxivData;
  hfData: HuggingFaceData;
  devtoData: DevToData;
  lobstersData: LobstersData;
};

export const fetchAllData = async (
  since: DateTime,
  webState: WebState,
  allConfigs: RepoConfig[],
  claudeSkillsRepo: string,
): Promise<FetchAllDataResult> => {
  console.error(
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
          console.error(
            `  [${cfg.id}] issues: ${issues.length}, prs: ${prs.length}, releases: ${releases.length}`,
          );
          return { cfg, issues, prs, releases };
        } catch (err) {
          console.error(`  [${cfg.id}] fetch failed: ${err}`);
          return { cfg, issues: [], prs: [], releases: [] };
        }
      }),
    ),
    fetchSkillsData(claudeSkillsRepo)
      .then((d) => {
        console.error(`  [claude-code-skills] prs: ${d.prs.length}, issues: ${d.issues.length}`);
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
    fetchHackerNewsData().catch((): HackerNewsData => ({ stories: [], fetchSuccess: false })),
    fetchProductHuntData().catch((): ProductHuntData => ({ products: [], fetchSuccess: false })),
    fetchArxivData().catch((): ArxivData => ({ papers: [], fetchSuccess: false })),
    fetchHuggingFaceData().catch((): HuggingFaceData => ({ models: [], fetchSuccess: false })),
    fetchDevToData().catch((): DevToData => ({ articles: [], fetchSuccess: false })),
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
};
