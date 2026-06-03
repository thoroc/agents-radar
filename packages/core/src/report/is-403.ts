export const is403 = (err: unknown): boolean => {
  const status =
    typeof err === "object" && err !== null ? (err as Record<string, unknown>).status : undefined;
  return status === 403 || String(err).includes("permission_error");
};
