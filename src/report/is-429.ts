export const is429 = (err: unknown): boolean => {
  return (err as { status?: number })?.status === 429 || String(err).includes("429");
};
