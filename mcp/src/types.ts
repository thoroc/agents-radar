export const PAGES_URL = process?.env?.PAGES_URL ?? "https://duanyytop.github.io/agents-radar";

export interface DateEntry {
  date: string;
  reports: string[];
}

export interface Manifest {
  generated?: string;
  dates: DateEntry[];
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export type ToolHandler = (args: Record<string, unknown>) => Promise<string>;

export interface Tool {
  definition: ToolDefinition;
  handler: ToolHandler;
}

export interface JsonRpcRequest {
  jsonrpc: string;
  id: unknown;
  method: string;
  params?: unknown;
}

export interface ToolCallParams {
  name: string;
  arguments?: Record<string, unknown>;
}
