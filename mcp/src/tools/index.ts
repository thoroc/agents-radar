export { getLatestTool, getReportTool } from "./get";
export { listReportsTool } from "./list";
export { searchTool } from "./search";

import type { Tool } from "../types";
import { getLatestTool, getReportTool } from "./get";
import { listReportsTool } from "./list";
import { searchTool } from "./search";

export const tools: Tool[] = [listReportsTool, getReportTool, getLatestTool, searchTool];
