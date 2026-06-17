import fs from "node:fs";
import {
  buildFeedXml,
  buildLabels,
  type Manifest,
  scanDigestDirs,
} from "@agents-radar/core/generate-manifest";
import { PAGES_URL_DEFAULT } from "@agents-radar/core/utils";
import dotenvx from "@dotenvx/dotenvx";
import { DateTime } from "luxon";

const MANIFEST_PATH = "assets/manifest.json";
const FEED_PATH = "assets/feed.xml";

export interface GenerateManifestActionArgs {
  verbosity: number;
}

export type GenerateManifestDeps = {
  write?: (s: string) => void;
};

export const generateManifestAction = async (
  args: GenerateManifestActionArgs,
  _deps: GenerateManifestDeps = {},
  env: NodeJS.ProcessEnv = process.env,
): Promise<void> => {
  dotenvx.config({ quiet: true });
  const { verbosity } = args;
  const siteUrl = env.PAGES_URL ?? PAGES_URL_DEFAULT;

  const entries = scanDigestDirs();
  const manifest: Manifest = {
    generated: DateTime.now().toISO()!,
    dates: entries,
    labels: buildLabels(),
  };
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.error(`manifest.json updated: ${entries.length} dates`);

  const feedXml = await buildFeedXml(entries, siteUrl);
  fs.writeFileSync(FEED_PATH, feedXml);
  const feedCount = (feedXml.match(/<item>/g) ?? []).length;
  console.error(`feed.xml updated: ${feedCount} items`);

  if (verbosity >= 1) {
    console.error(`[manifest] ${feedCount} feed items, ${entries.length} dates`);
  }
};
