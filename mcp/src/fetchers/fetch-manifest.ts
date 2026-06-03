import type { Manifest } from "../types";
import { resolveUrl } from "./resolve-url";
import type { FetcherDeps } from "./types";

export const fetchManifest = async (deps?: FetcherDeps): Promise<Manifest> => {
  const base = resolveUrl(deps);
  const res = await fetch(`${base}/manifest.json`, {
    cf: { cacheTtl: 300 },
  } as RequestInit);
  if (!res.ok) throw new Error(`Failed to fetch manifest: HTTP ${res.status}`);
  return res.json() as Promise<Manifest>;
};
