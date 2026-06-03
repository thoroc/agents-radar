import type { RepoConfig } from "../github";

export const toRepoConfig = (e: {
  id: string;
  repo: string;
  name: string;
  paginated?: boolean;
}): RepoConfig => {
  return { id: e.id, repo: e.repo, name: e.name, ...(e.paginated ? { paginated: true } : {}) };
};
