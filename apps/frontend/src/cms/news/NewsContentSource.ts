import type { NewsListItem } from "@cms-demo/cms-contract/news";

export interface NewsContentSource {
  listPublished(signal?: AbortSignal): Promise<NewsListItem[]>;
}
