import { cmsApiPaths } from "@cms-demo/cms-contract/api-paths";
import { RoadmapResponseSchema } from "@cms-demo/cms-contract/roadmap";
import type { CmsHttpClient } from "../core/CmsHttpClient";
import type { RoadmapContentSource } from "./RoadmapContentSource";

export class HttpRoadmapContentSource implements RoadmapContentSource {
  constructor(private readonly client: CmsHttpClient) {}

  list(signal?: AbortSignal) {
    return this.client.get(cmsApiPaths.roadmap, RoadmapResponseSchema, signal);
  }
}
