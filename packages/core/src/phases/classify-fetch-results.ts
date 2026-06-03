import type { RepoConfig, RepoFetch } from "../github";

export const classifyFetchResults = (
  fetched: RepoFetch[],
  openclaw: RepoConfig,
  openclawPeers: RepoConfig[],
) => {
  const peerIds = new Set(openclawPeers.map((p) => p.id));
  return {
    fetchedCli: fetched.filter((f) => f.cfg.id !== openclaw.id && !peerIds.has(f.cfg.id)),
    fetchedOpenclaw: fetched.find((f) => f.cfg.id === openclaw.id)!,
    fetchedPeers: fetched.filter((f) => peerIds.has(f.cfg.id)),
  };
};
