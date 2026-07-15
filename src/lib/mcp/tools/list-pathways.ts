import { defineTool } from "@lovable.dev/mcp-js";
import { PATHWAY_KEYS, pathways } from "../data";

export default defineTool({
  name: "list_pathways",
  title: "List pathways",
  description: "List the four Stretch care pathways with their titles, best-fit summary, first unlock, and monthly promise.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = PATHWAY_KEYS.map((key) => ({ key, ...pathways[key] }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { pathways: items },
    };
  },
});
