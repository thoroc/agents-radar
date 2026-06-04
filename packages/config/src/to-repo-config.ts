import type { RawRepoEntry, RepoConfig } from "./types";

export const toRepoConfig = (e: RawRepoEntry): RepoConfig => ({
  id: e.id,
  repo: e.repo,
  name: e.name,
  ...(e.paginated ? { paginated: true } : {}),
});
