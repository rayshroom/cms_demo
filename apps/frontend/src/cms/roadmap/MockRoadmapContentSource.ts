import { RoadmapResponseSchema } from "@cms-demo/cms-contract/roadmap";
import { assertNotAborted } from "../core/assertNotAborted";
import { mockRoadmap } from "./mockRoadmap";
import type { RoadmapContentSource } from "./RoadmapContentSource";

export class MockRoadmapContentSource implements RoadmapContentSource {
  async list(signal?: AbortSignal) {
    assertNotAborted(signal);
    return RoadmapResponseSchema.parse(structuredClone(mockRoadmap));
  }
}
