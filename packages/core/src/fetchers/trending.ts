import { DateTime } from "luxon";
import { fetchGitHubTrending } from "./fetch-github-trending";
import { searchAiRepos } from "./search-ai-repos";

export interface TrendingRepo {
  fullName: string;
  description: string;
  language: string;
  todayStars: number;
  totalStars: number;
  forks: number;
  url: string;
}

export interface SearchRepo {
  fullName: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  pushedAt: string;
  url: string;
  searchQuery: string;
}

export interface TrendingData {
  trendingRepos: TrendingRepo[];
  searchRepos: SearchRepo[];
  trendingFetchSuccess: boolean;
}

export const fetchTrendingData = async (
  githubToken?: string,
  env: NodeJS.ProcessEnv = process.env,
): Promise<TrendingData> => {
  const resolvedToken = githubToken ?? env.GITHUB_TOKEN ?? "";
  const sevenDaysAgo = DateTime.now().minus({ days: 7 }).toFormat("yyyy-MM-dd");

  const [{ repos: trendingRepos, success }, searchRepos] = await Promise.all([
    fetchGitHubTrending(),
    searchAiRepos(sevenDaysAgo, resolvedToken),
  ]);

  return { trendingRepos, searchRepos, trendingFetchSuccess: success };
};
