import type {
  NewsListItem,
  NewsPost,
  RoadmapItem,
  UpsertNewsPostInput,
  UpsertRoadmapItemInput
} from "@cms-demo/cms-contract";

export interface CmsRepository {
  initialize?(): Promise<void>;
  listRoadmap(): Promise<RoadmapItem[]>;
  createRoadmapItem(input: UpsertRoadmapItemInput): Promise<RoadmapItem>;
  listPublishedNews(): Promise<NewsListItem[]>;
  getPublishedPostBySlug(slug: string): Promise<NewsPost | null>;
  listAdminPosts(): Promise<NewsListItem[]>;
  getAdminPostById(id: string): Promise<NewsPost | null>;
  createPost(input: UpsertNewsPostInput): Promise<NewsPost>;
  updatePost(id: string, input: UpsertNewsPostInput): Promise<NewsPost>;
}
