import fs from "node:fs";

export const sortLocaleFile = (filePath: string): void => {
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Record<string, unknown>;

  const pinned: Record<string, unknown> = {};
  if ("$schema" in raw) pinned.$schema = raw.$schema;
  if ("_meta" in raw) pinned._meta = raw._meta;

  const rest = Object.fromEntries(
    Object.entries(raw)
      .filter(([k]) => k !== "$schema" && k !== "_meta")
      .sort(([a], [b]) => a.localeCompare(b)),
  );

  fs.writeFileSync(filePath, `${JSON.stringify({ ...pinned, ...rest }, null, 2)}\n`);
};
