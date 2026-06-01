export { generateManifestCommand } from "./command";
export type { GenerateManifestActionArgs, GenerateManifestDeps } from "./generate-manifest-action";
export { generateManifestAction } from "./generate-manifest-action";

if (import.meta.main) {
  const { generateManifestCommand } = await import("./command");
  await generateManifestCommand.parse(process.argv.slice(2));
}
