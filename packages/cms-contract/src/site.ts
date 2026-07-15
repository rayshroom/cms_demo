import { z } from "zod";
import { NewsListItemSchema } from "./news.js";
import { RoadmapItemSchema } from "./roadmap.js";

export const CmsSiteSliceSchema = z.object({
  roadmap: z.array(RoadmapItemSchema),
  featuredNews: z.array(NewsListItemSchema)
});

export type CmsSiteSlice = z.infer<typeof CmsSiteSliceSchema>;
