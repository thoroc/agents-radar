if (import.meta.main) {
  const { socialCommand } = await import("./command");
  await socialCommand.parse(process.argv.slice(2));
}
