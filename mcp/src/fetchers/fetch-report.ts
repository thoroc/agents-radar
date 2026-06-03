import { resolveUrl } from "./resolve-url";
import type { FetcherDeps } from "./types";

export const fetchReport = async (date: string, type: string, deps?: FetcherDeps): Promise<string> => {
  const base = resolveUrl(deps);
  const res = await fetch(`${base}/digests/${date}/${type}.md`, {
    cf: { cacheTtl: 3600 },
  } as RequestInit);
  if (!res.ok) throw new Error(`Report not found: ${date}/${type} (HTTP ${res.status})`);
  return res.text();
};
