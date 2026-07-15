import type { NewsListItem } from "@cms-demo/cms-contract/news";
import { cmsServices } from "../createCmsServices";
import {
  useCmsResource,
  type CmsResourceLoader,
  type CmsResourceState
} from "../core/CmsResourceState";

const featuredNewsLimit = 4;
const loadFeaturedNews: CmsResourceLoader<NewsListItem[]> = async (signal) => {
  const publishedNews = await cmsServices.news.listPublished(signal);
  return publishedNews.slice(0, featuredNewsLimit);
};

export type FeaturedNewsState = CmsResourceState<NewsListItem[]>;

export function useFeaturedNews(): FeaturedNewsState {
  return useCmsResource(loadFeaturedNews);
}
