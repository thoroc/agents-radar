import type { JsonRpcRequest, ToolCallParams, Tool } from "./types";

const SERVER_INFO = {
  name: "agents-radar",
  version: "1.0.0",
};

export const handleMcp = async (body: unknown, tools: Tool[]): Promise<unknown> => {
  const req = body as JsonRpcRequest;
  const id = req.id ?? null;

  try {
    switch (req.method) {
      case "initialize":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: { tools: {} },
            serverInfo: SERVER_INFO,
          },
        };

      case "notifications/initialized":
        return { jsonrpc: "2.0", id, result: {} };

      case "tools/list":
        return {
          jsonrpc: "2.0",
          id,
          result: { tools: tools.map((t) => t.definition) },
        };

      case "tools/call": {
        const { name, arguments: args = {} } = req.params as ToolCallParams;
        const tool = tools.find((t) => t.definition.name === name);
        if (!tool) {
          return {
            jsonrpc: "2.0",
            id,
            error: { code: -32601, message: `Unknown tool: ${name}` },
          };
        }
        const text = await tool.handler(args);
        return {
          jsonrpc: "2.0",
          id,
          result: { content: [{ type: "text", text }] },
        };
      }

      default:
        return {
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Method not found: ${req.method}` },
        };
    }
  } catch (e) {
    return {
      jsonrpc: "2.0",
      id,
      error: {
        code: -32603,
        message: e instanceof Error ? e.message : String(e),
      },
    };
  }
};
