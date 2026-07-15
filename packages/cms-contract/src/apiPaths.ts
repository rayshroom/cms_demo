export const cmsApiPaths = {
  site: "/api/cms/site",
  roadmap: "/api/cms/roadmap",
  news: "/api/cms/news",
  newsPost: (slug: string) => `/api/cms/news/${encodeURIComponent(slug)}`,
  adminPosts: "/api/admin/posts",
  adminPost: (id: string) => `/api/admin/posts/${encodeURIComponent(id)}`,
  adminRoadmap: "/api/admin/roadmap"
} as const;
