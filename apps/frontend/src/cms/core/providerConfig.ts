export type CmsProviderKind = "mock" | "http";

export interface CmsProviderConfig {
  kind: CmsProviderKind;
  apiBase: string;
}

interface CmsEnvironment {
  VITE_CMS_PROVIDER?: string;
  VITE_CMS_API_BASE?: string;
}

export function readCmsProviderConfig(
  env: CmsEnvironment = {
    VITE_CMS_PROVIDER: import.meta.env.VITE_CMS_PROVIDER,
    VITE_CMS_API_BASE: import.meta.env.VITE_CMS_API_BASE
  }
): CmsProviderConfig {
  const rawKind = env.VITE_CMS_PROVIDER?.trim().toLowerCase() || "mock";

  if (rawKind !== "mock" && rawKind !== "http") {
    throw new Error(`Unsupported VITE_CMS_PROVIDER: ${rawKind}. Expected "mock" or "http".`);
  }

  return {
    kind: rawKind,
    apiBase: env.VITE_CMS_API_BASE?.trim() || "http://localhost:8787/api"
  };
}
