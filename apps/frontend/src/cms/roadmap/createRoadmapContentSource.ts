import { requireCmsHttpClient, type CmsSourceContext } from "../core/CmsSourceContext";
import { HttpRoadmapContentSource } from "./HttpRoadmapContentSource";
import { MockRoadmapContentSource } from "./MockRoadmapContentSource";
import type { RoadmapContentSource } from "./RoadmapContentSource";

export function createRoadmapContentSource(context: CmsSourceContext): RoadmapContentSource {
  return context.kind === "http"
    ? new HttpRoadmapContentSource(requireCmsHttpClient(context))
    : new MockRoadmapContentSource();
}
