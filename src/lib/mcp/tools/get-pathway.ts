import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PATHWAY_KEYS, pathways, type PathwayKey } from "../data";

export default defineTool({
  name: "get_pathway",
  title: "Get pathway details",
  description: "Return details for a single Stretch pathway: title, best-for, first unlock, future unlock, monthly promise, strongest pack, and future device.",
  inputSchema: {
    pathway: z.enum(PATHWAY_KEYS).describe("Pathway key: peri, endo, metabo, or longevity."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ pathway }) => {
    const data = pathways[pathway as PathwayKey];
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { pathway, ...data },
    };
  },
});
