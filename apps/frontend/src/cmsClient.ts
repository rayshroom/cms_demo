import {
  CmsSiteSliceSchema,
  NewsListResponseSchema,
  NewsPostSchema,
  cmsApiPaths,
  type CmsSiteSlice,
  type NewsListItem,
  type NewsPost
} from "@cms-demo/cms-contract";
import type { ZodSchema } from "zod";

const apiBase = (import.meta.env.VITE_CMS_API_BASE ?? "http://localhost:8787/api").replace(
  /\/$/,
  ""
);

export async function fetchSiteSlice(): Promise<CmsSiteSlice> {
  return fetchCms(cmsApiPaths.site, CmsSiteSliceSchema);
}

export async function fetchNewsList(): Promise<NewsListItem[]> {
  return fetchCms(cmsApiPaths.news, NewsListResponseSchema);
}

export async function fetchNewsPost(slug: string): Promise<NewsPost> {
  return fetchCms(cmsApiPaths.newsPost(slug), NewsPostSchema);
}

async function fetchCms<T>(path: string, schema: ZodSchema<T>): Promise<T> {
  const response = await fetch(toApiUrl(path));
  if (!response.ok) {
    throw new Error(`CMS request failed: ${response.status}`);
  }
  return schema.parse(await response.json());
}

function toApiUrl(path: string) {
  return `${apiBase}${path.replace(/^\/api/, "")}`;
}
