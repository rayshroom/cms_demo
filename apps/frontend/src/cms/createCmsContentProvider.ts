import type { CmsContentProvider } from "./CmsContentProvider";
import { HttpCmsContentProvider } from "./HttpCmsContentProvider";
import { MockCmsContentProvider } from "./MockCmsContentProvider";

export function createCmsContentProvider(): CmsContentProvider {
  if (import.meta.env.VITE_CMS_PROVIDER === "http") {
    return new HttpCmsContentProvider(
      import.meta.env.VITE_CMS_API_BASE ?? "http://localhost:8787/api"
    );
  }

  return new MockCmsContentProvider();
}

export const cmsContentProvider = createCmsContentProvider();
