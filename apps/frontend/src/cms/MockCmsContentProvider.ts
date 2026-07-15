import { CmsSiteSliceSchema } from "@cms-demo/cms-contract";
import type { CmsContentProvider } from "./CmsContentProvider";
import { mockSiteContent } from "./mockContent";

export class MockCmsContentProvider implements CmsContentProvider {
  async getSiteContent(signal?: AbortSignal) {
    if (signal?.aborted) {
      throw new DOMException("The CMS request was aborted.", "AbortError");
    }

    return CmsSiteSliceSchema.parse(structuredClone(mockSiteContent));
  }
}
