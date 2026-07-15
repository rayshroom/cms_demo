import { z } from "zod";

export const RoadmapStatusSchema = z.enum(["planned", "in_progress", "launched"]);
export const RoadmapProductSchema = z.enum(["Platform", "Databricks", "Dremio", "Data Lab"]);
export const RoadmapQuarterSchema = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return value;
    }
    return value.match(/^Q([1-4])/i)?.[0].toUpperCase() ?? value;
  },
  z.enum(["Q1", "Q2", "Q3", "Q4"])
);

export const RoadmapItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(600),
  status: RoadmapStatusSchema,
  product: RoadmapProductSchema.default("Platform"),
  year: z.number().int().min(2000).max(2100).default(2026),
  quarter: RoadmapQuarterSchema,
  sortOrder: z.number().int().nonnegative(),
  updatedAt: z.string().datetime()
});

export const UpsertRoadmapItemInputSchema = z.object({
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(600),
  status: RoadmapStatusSchema,
  product: RoadmapProductSchema.default("Platform"),
  year: z.number().int().min(2000).max(2100).default(2026),
  quarter: RoadmapQuarterSchema,
  sortOrder: z.number().int().nonnegative()
});

export const RoadmapResponseSchema = z.array(RoadmapItemSchema);

export type RoadmapStatus = z.infer<typeof RoadmapStatusSchema>;
export type RoadmapProduct = z.infer<typeof RoadmapProductSchema>;
export type RoadmapQuarter = z.infer<typeof RoadmapQuarterSchema>;
export type RoadmapItem = z.infer<typeof RoadmapItemSchema>;
export type UpsertRoadmapItemInput = z.infer<typeof UpsertRoadmapItemInputSchema>;
