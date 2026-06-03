export const requireEnv = (name: string, env: NodeJS.ProcessEnv = process.env): string => {
  const value = env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};
