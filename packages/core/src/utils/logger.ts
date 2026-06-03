const DEBUG = process.env.DEBUG === "true";

export const logger = {
  info: (msg: string) => console.error(`[${new Date().toISOString()}] INFO  ${msg}`),
  warn: (msg: string) => console.error(`[${new Date().toISOString()}] WARN  ${msg}`),
  debug: (msg: string) => {
    if (DEBUG) console.error(`[${new Date().toISOString()}] DEBUG ${msg}`);
  },
};
