import { CmsSiteSliceSchema, cmsApiPaths } from "@cms-demo/cms-contract";
import type { CmsContentProvider } from "./CmsContentProvider";

export class HttpCmsContentProvider implements CmsContentProvider {
  constructor(private readonly apiBase: string) {}

  async getSiteContent(signal?: AbortSignal) {
    const response = await fetch(this.urlFor(cmsApiPaths.site), {
      headers: { Accept: "application/json" },
      signal
    });

    if (!response.ok) {
      throw new Error(`CMS request failed with status ${response.status}.`);
    }

    return CmsSiteSliceSchema.parse(await response.json());
  }

  private urlFor(path: string) {
    const base = this.apiBase.replace(/\/$/, "");
    return `${base}${path.replace(/^\/api/, "")}`;
  }
}
