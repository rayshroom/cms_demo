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

export type CmsBlock = z.infer<typeof CmsBlockSchema>;
export type RichTextDocument = z.infer<typeof RichTextDocumentSchema>;
