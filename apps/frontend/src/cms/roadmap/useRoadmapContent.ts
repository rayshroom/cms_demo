import type { RoadmapItem } from "@cms-demo/cms-contract/roadmap";
import { cmsServices } from "../createCmsServices";
import {
  useCmsResource,
  type CmsResourceLoader,
  type CmsResourceState
} from "../core/CmsResourceState";

const loadRoadmap: CmsResourceLoader<RoadmapItem[]> = (signal) =>
  cmsServices.roadmap.list(signal);

export type RoadmapContentState = CmsResourceState<RoadmapItem[]>;

export function useRoadmapContent(): RoadmapContentState {
  return useCmsResource(loadRoadmap);
}
