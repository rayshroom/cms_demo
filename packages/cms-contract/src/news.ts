import { z } from "zod";
import { RichTextDocumentSchema, SlugSchema } from "./common.js";

export const NewsStatusSchema = z.enum(["draft", "published"]);
export const NewsVisualVariantSchema = z.enum([
  "feature",
  "training",
  "release",
  "maintenance",
  "image"
]);

export const NewsPostSchema = z.object({
  id: z.string().uuid(),
  slug: SlugSchema,
  title: z.string().min(1).max(220),
  excerpt: z.string().min(1).max(500),
  status: NewsStatusSchema,
  publishedAt: z.string().datetime().nullable(),
  heroImageUrl: z.string().url().nullable(),
  ctaLabel: z.string().min(1).max(80).default("Learn More →"),
  visualVariant: NewsVisualVariantSchema.default("feature"),
  sortOrder: z.number().int().nonnegative().default(0),
  author: z.string().min(1).max(120),
  tags: z.array(z.string().min(1).max(40)),
  body: RichTextDocumentSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const NewsListItemSchema = NewsPostSchema.omit({
  body: true
});

export const UpsertNewsPostInputSchema = z.object({
  slug: SlugSchema,
  title: z.string().min(1).max(220),
  excerpt: z.string().min(1).max(500),
  status: NewsStatusSchema.default("draft"),
  publishedAt: z.string().datetime().nullable().optional(),
  heroImageUrl: z.string().url().nullable().optional(),
  ctaLabel: z.string().min(1).max(80).optional(),
  visualVariant: NewsVisualVariantSchema.optional(),
  sortOrder: z.number().int().nonnegative().optional(),
  author: z.string().min(1).max(120).default("Editorial"),
  tags: z.array(z.string().min(1).max(40)).max(12).default([]),
  body: RichTextDocumentSchema
});

export const AdminPostCollectionSchema = z.array(NewsListItemSchema);
export const NewsListResponseSchema = z.array(NewsListItemSchema);

export type NewsStatus = z.infer<typeof NewsStatusSchema>;
export type NewsVisualVariant = z.infer<typeof NewsVisualVariantSchema>;
export type NewsPost = z.infer<typeof NewsPostSchema>;
export type NewsListItem = z.infer<typeof NewsListItemSchema>;
export type UpsertNewsPostInput = z.infer<typeof UpsertNewsPostInputSchema>;
