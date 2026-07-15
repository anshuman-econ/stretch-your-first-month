import { defineMcp } from "@lovable.dev/mcp-js";
import listPathways from "./tools/list-pathways";
import getPathway from "./tools/get-pathway";
import getPerkStore from "./tools/get-perk-store";
import getPackStore from "./tools/get-pack-store";

export default defineMcp({
  name: "stretch-prototype-mcp",
  title: "Stretch Prototype MCP",
  version: "0.1.0",
  instructions:
    "Read-only tools for the Stretch care-prototype app. Use `list_pathways` to see the four pathways, `get_pathway` for one pathway's details, `get_perk_store` for the featured perks preview, and `get_pack_store` for the pack store preview (optionally with a pathway to get its recommended pack).",
  tools: [listPathways, getPathway, getPerkStore, getPackStore],
});
