import type { CmsSiteSlice } from "@cms-demo/cms-contract";

export interface CmsContentProvider {
  getSiteContent(signal?: AbortSignal): Promise<CmsSiteSlice>;
}
