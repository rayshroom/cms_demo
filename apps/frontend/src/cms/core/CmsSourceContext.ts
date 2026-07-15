import { CmsHttpClient } from "./CmsHttpClient";
import type { CmsProviderConfig, CmsProviderKind } from "./providerConfig";

export interface CmsSourceContext {
  kind: CmsProviderKind;
  httpClient: CmsHttpClient | null;
}

export function createCmsSourceContext(config: CmsProviderConfig): CmsSourceContext {
  return {
    kind: config.kind,
    httpClient: config.kind === "http" ? new CmsHttpClient(config.apiBase) : null
  };
}

export function requireCmsHttpClient(context: CmsSourceContext): CmsHttpClient {
  if (!context.httpClient) {
    throw new Error("The HTTP CMS client is unavailable for the selected provider.");
  }
  return context.httpClient;
}
