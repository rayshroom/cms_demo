import { cmsApiPaths } from "@cms-demo/cms-contract/api-paths";
import { NewsListResponseSchema } from "@cms-demo/cms-contract/news";
import type { CmsHttpClient } from "../core/CmsHttpClient";
import type { NewsContentSource } from "./NewsContentSource";

export class HttpNewsContentSource implements NewsContentSource {
  constructor(private readonly client: CmsHttpClient) {}

  listPublished(signal?: AbortSignal) {
    return this.client.get(cmsApiPaths.news, NewsListResponseSchema, signal);
  }
}
