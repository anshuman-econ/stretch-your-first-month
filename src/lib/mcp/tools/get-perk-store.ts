import { defineTool } from "@lovable.dev/mcp-js";
import { perkStore } from "../data";

export default defineTool({
  name: "get_perk_store",
  title: "Get Perk Store",
  description: "Return the Perk Store preview: title, copy, and featured perks with status labels.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(perkStore, null, 2) }],
    structuredContent: perkStore,
  }),
});
