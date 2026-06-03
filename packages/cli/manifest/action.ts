import { generateManifestAction as coreGenerateManifestAction } from "@agents-radar/core";

export type ManifestActionArgs = {
  verbosity: number;
};

export const manifestAction = async (args: ManifestActionArgs): Promise<void> => {
  await coreGenerateManifestAction(args);
};
