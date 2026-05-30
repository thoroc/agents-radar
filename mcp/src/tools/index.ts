export { listReportsTool } from "./list";
export { getReportTool, getLatestTool } from "./get";
export { searchTool } from "./search";

import type { Tool } from "../types";
import { listReportsTool } from "./list";
import { getReportTool, getLatestTool } from "./get";
import { searchTool } from "./search";

export const tools: Tool[] = [
  listReportsTool,
  getReportTool,
  getLatestTool,
  searchTool,
];
