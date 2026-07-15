import { requireCmsHttpClient, type CmsSourceContext } from "../core/CmsSourceContext";
import { HttpNewsContentSource } from "./HttpNewsContentSource";
import { MockNewsContentSource } from "./MockNewsContentSource";
import type { NewsContentSource } from "./NewsContentSource";

export function createNewsContentSource(context: CmsSourceContext): NewsContentSource {
  return context.kind === "http"
    ? new HttpNewsContentSource(requireCmsHttpClient(context))
    : new MockNewsContentSource();
}
