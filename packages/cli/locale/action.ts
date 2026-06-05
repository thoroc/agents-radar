import { generate, validate } from "@agents-radar/locales";

export interface LocaleActionArgs {
  generate?: boolean;
  validate?: boolean;
}

export type LocaleActionDeps = {
  repoRoot?: string;
};

export const localeAction = async (args: LocaleActionArgs, deps: LocaleActionDeps = {}): Promise<void> => {
  const repoRoot = deps.repoRoot ?? process.cwd();

  if (args.generate) {
    generate(repoRoot);
  } else if (args.validate) {
    if (!validate(repoRoot)) {
      throw new Error("Locale validation failed — see errors above");
    }
    console.error("All locale files are valid.");
  }
};
