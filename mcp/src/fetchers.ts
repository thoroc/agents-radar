import type { Manifest } from "./types";
import { PAGES_URL } from "./types";

export interface FetcherDeps {
  pagesUrl?: string;
}

const resolveUrl = (deps: FetcherDeps | undefined): string => deps?.pagesUrl ?? PAGES_URL;

export const fetchManifest = async (deps?: FetcherDeps): Promise<Manifest> => {
  const base = resolveUrl(deps);
  const res = await fetch(`${base}/manifest.json`, {
    cf: { cacheTtl: 300 },
  } as RequestInit);
  if (!res.ok) throw new Error(`Failed to fetch manifest: HTTP ${res.status}`);
  return res.json() as Promise<Manifest>;
};

export const fetchReport = async (date: string, type: string, deps?: FetcherDeps): Promise<string> => {
  const base = resolveUrl(deps);
  const res = await fetch(`${base}/digests/${date}/${type}.md`, {
    cf: { cacheTtl: 3600 },
  } as RequestInit);
  if (!res.ok) throw new Error(`Report not found: ${date}/${type} (HTTP ${res.status})`);
  return res.text();
};
