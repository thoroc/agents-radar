export { getLatestTool } from "./get-latest";
export { getReportTool } from "./get-report";
export { listReportsTool } from "./list";
export { searchTool } from "./search";

import type { Tool } from "../types";
import { getLatestTool } from "./get-latest";
import { getReportTool } from "./get-report";
import { listReportsTool } from "./list";
import { searchTool } from "./search";

export const tools: Tool[] = [listReportsTool, getReportTool, getLatestTool, searchTool];
