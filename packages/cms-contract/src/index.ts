import { z } from "zod";

export const SlugSchema = z
  .string()
  .min(1)
  .max(180)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase URL slugs");

export const CmsBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("heading"),
    level: z.union([z.literal(2), z.literal(3)]),
    text: z.string().min(1).max(180),
    html: z.string().max(400).optional()
  }),
  z.object({
    type: z.literal("paragraph"),
    text: z.string().min(1).max(1200),
    html: z.string().max(2400).optional()
  }),
  z.object({
    type: z.literal("list"),
    items: z.array(z.string().min(1).max(240)).min(1).max(12),
    itemsHtml: z.array(z.string().max(500)).min(1).max(12).optional()
  }),
  z.object({
    type: z.literal("quote"),
    text: z.string().min(1).max(500),
    html: z.string().max(1000).optional()
  })
]);

export const RichTextDocumentSchema = z.array(CmsBlockSchema).min(1);

export const NewsStatusSchema = z.enum(["draft", "published"]);
export const RoadmapStatusSchema = z.enum(["planned", "in_progress", "launched"]);

export const NewsPostSchema = z.object({
  id: z.string().uuid(),
  slug: SlugSchema,
  title: z.string().min(1).max(220),
  excerpt: z.string().min(1).max(500),
  status: NewsStatusSchema,
  publishedAt: z.string().datetime().nullable(),
  heroImageUrl: z.string().url().nullable(),
  author: z.string().min(1).max(120),
  tags: z.array(z.string().min(1).max(40)),
  body: RichTextDocumentSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const NewsListItemSchema = NewsPostSchema.omit({
  body: true
});

export const RoadmapItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(600),
  status: RoadmapStatusSchema,
  quarter: z.string().min(2).max(24),
  sortOrder: z.number().int().nonnegative(),
  updatedAt: z.string().datetime()
});

export const CmsSiteSliceSchema = z.object({
  roadmap: z.array(RoadmapItemSchema),
  featuredNews: z.array(NewsListItemSchema)
});

export const UpsertNewsPostInputSchema = z.object({
  slug: SlugSchema,
  title: z.string().min(1).max(220),
  excerpt: z.string().min(1).max(500),
  status: NewsStatusSchema.default("draft"),
  publishedAt: z.string().datetime().nullable().optional(),
  heroImageUrl: z.string().url().nullable().optional(),
  author: z.string().min(1).max(120).default("Editorial"),
  tags: z.array(z.string().min(1).max(40)).max(12).default([]),
  body: RichTextDocumentSchema
});

export const UpsertRoadmapItemInputSchema = z.object({
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(600),
  status: RoadmapStatusSchema,
  quarter: z.string().min(2).max(24),
  sortOrder: z.number().int().nonnegative()
});

export const AdminPostCollectionSchema = z.array(NewsListItemSchema);
export const NewsListResponseSchema = z.array(NewsListItemSchema);
export const RoadmapResponseSchema = z.array(RoadmapItemSchema);

export const cmsApiPaths = {
  site: "/api/cms/site",
  news: "/api/cms/news",
  newsPost: (slug: string) => `/api/cms/news/${encodeURIComponent(slug)}`,
  adminPosts: "/api/admin/posts",
  adminPost: (id: string) => `/api/admin/posts/${encodeURIComponent(id)}`,
  adminRoadmap: "/api/admin/roadmap"
} as const;

export type CmsBlock = z.infer<typeof CmsBlockSchema>;
export type RichTextDocument = z.infer<typeof RichTextDocumentSchema>;
export type NewsStatus = z.infer<typeof NewsStatusSchema>;
export type RoadmapStatus = z.infer<typeof RoadmapStatusSchema>;
export type NewsPost = z.infer<typeof NewsPostSchema>;
export type NewsListItem = z.infer<typeof NewsListItemSchema>;
export type RoadmapItem = z.infer<typeof RoadmapItemSchema>;
export type CmsSiteSlice = z.infer<typeof CmsSiteSliceSchema>;
export type UpsertNewsPostInput = z.infer<typeof UpsertNewsPostInputSchema>;
export type UpsertRoadmapItemInput = z.infer<typeof UpsertRoadmapItemInputSchema>;
