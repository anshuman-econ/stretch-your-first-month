import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PATHWAY_KEYS, packStore, type PathwayKey } from "../data";

export default defineTool({
  name: "get_pack_store",
  title: "Get Pack Store",
  description: "Return the Pack Store preview. If a pathway is provided, include the recommended pack for that pathway.",
  inputSchema: {
    pathway: z.enum(PATHWAY_KEYS).optional().describe("Optional pathway key to get the recommended pack."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ pathway }) => {
    const recommended = pathway ? packStore.recommendedByPathway[pathway as PathwayKey] : null;
    const payload = {
      title: packStore.title,
      copy: packStore.copy,
      recommended,
      allRecommendations: packStore.recommendedByPathway,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
