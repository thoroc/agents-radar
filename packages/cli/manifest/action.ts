import { generateManifestAction as coreGenerateManifestAction } from "../../core/src/generate-manifest/action";

export type ManifestActionArgs = {
  verbosity: number;
};

export const manifestAction = async (args: ManifestActionArgs): Promise<void> => {
  await coreGenerateManifestAction(args);
};
