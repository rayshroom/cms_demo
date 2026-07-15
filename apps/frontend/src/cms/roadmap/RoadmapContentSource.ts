import type { RoadmapItem } from "@cms-demo/cms-contract/roadmap";

export interface RoadmapContentSource {
  list(signal?: AbortSignal): Promise<RoadmapItem[]>;
}
