export type { GenerateManifestActionArgs, GenerateManifestDeps } from "./action";
export { generateManifestAction } from "./action";
export { generateManifestCommand } from "./command";

if (import.meta.main) {
  const { generateManifestCommand } = await import("./command");
  await generateManifestCommand.parse(process.argv.slice(2));
}
