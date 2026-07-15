import { createCmsSourceContext } from "./core/CmsSourceContext";
import { readCmsProviderConfig, type CmsProviderConfig } from "./core/providerConfig";
import type { NewsContentSource } from "./news/NewsContentSource";
import { createNewsContentSource } from "./news/createNewsContentSource";
import type { RoadmapContentSource } from "./roadmap/RoadmapContentSource";
import { createRoadmapContentSource } from "./roadmap/createRoadmapContentSource";

export interface CmsServices {
  roadmap: RoadmapContentSource;
  news: NewsContentSource;
}

export function createCmsServices(config: CmsProviderConfig = readCmsProviderConfig()): CmsServices {
  const context = createCmsSourceContext(config);
  return {
    roadmap: createRoadmapContentSource(context),
    news: createNewsContentSource(context)
  };
}

export const cmsServices = createCmsServices();
