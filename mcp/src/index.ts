import { handleMcp } from "./protocol";
import { tools } from "./tools";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return Response.json(
        { name: "agents-radar-mcp", status: "ok", tools: tools.map((t) => t.definition.name) },
        { headers: CORS },
      );
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: CORS });
    }

    try {
      const body = await request.json();
      const result = await handleMcp(body, tools);
      return Response.json(result, { headers: CORS });
    } catch (err) {
      console.error(`[mcp] Parse error: ${err}`);
      return Response.json(
        { jsonrpc: "2.0", error: { code: -32700, message: "Parse error" } },
        { status: 400, headers: CORS },
      );
    }
  },
};
