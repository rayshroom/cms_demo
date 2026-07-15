import { randomUUID } from "node:crypto";
import {
  NewsListItemSchema,
  NewsPostSchema,
  RoadmapItemSchema,
  UpsertNewsPostInputSchema,
  UpsertRoadmapItemInputSchema,
  type NewsListItem,
  type NewsPost,
  type RoadmapItem,
  type UpsertNewsPostInput,
  type UpsertRoadmapItemInput
} from "@cms-demo/cms-contract";
import { NotFoundError } from "../errors.js";
import { seedNewsPosts, seedRoadmapItems } from "./seed.js";
import type { CmsRepository } from "./types.js";

export class MemoryCmsRepository implements CmsRepository {
  private readonly posts = new Map<string, NewsPost>();
  private readonly roadmap = new Map<string, RoadmapItem>();

  constructor() {
    for (const post of seedNewsPosts) {
      this.posts.set(post.id, NewsPostSchema.parse(post));
    }
    for (const item of seedRoadmapItems) {
      this.roadmap.set(item.id, RoadmapItemSchema.parse(item));
    }
  }

  async listRoadmap(): Promise<RoadmapItem[]> {
    return [...this.roadmap.values()].sort(
      (a, b) => a.year - b.year || a.sortOrder - b.sortOrder
    );
  }

  async createRoadmapItem(input: UpsertRoadmapItemInput): Promise<RoadmapItem> {
    const parsed = UpsertRoadmapItemInputSchema.parse(input);
    const item = RoadmapItemSchema.parse({
      ...parsed,
      id: randomUUID(),
      updatedAt: new Date().toISOString()
    });
    this.roadmap.set(item.id, item);
    return item;
  }

  async listPublishedNews(): Promise<NewsListItem[]> {
    return this.sortedPublishedPosts()
      .filter((post) => post.status === "published")
      .map(toNewsListItem);
  }

  async getPublishedPostBySlug(slug: string): Promise<NewsPost | null> {
    return (
      this.sortedPosts().find((post) => post.slug === slug && post.status === "published") ?? null
    );
  }

  async listAdminPosts(): Promise<NewsListItem[]> {
    return this.sortedPosts().map(toNewsListItem);
  }

  async getAdminPostById(id: string): Promise<NewsPost | null> {
    return this.posts.get(id) ?? null;
  }

  async createPost(input: UpsertNewsPostInput): Promise<NewsPost> {
    const parsed = UpsertNewsPostInputSchema.parse(input);
    const now = new Date().toISOString();
    const post = NewsPostSchema.parse({
      ...parsed,
      id: randomUUID(),
      publishedAt:
        parsed.status === "published" ? parsed.publishedAt ?? now : parsed.publishedAt ?? null,
      heroImageUrl: parsed.heroImageUrl ?? null,
      createdAt: now,
      updatedAt: now
    });
    this.posts.set(post.id, post);
    return post;
  }

  async updatePost(id: string, input: UpsertNewsPostInput): Promise<NewsPost> {
    const existing = this.posts.get(id);
    if (!existing) {
      throw new NotFoundError("Post not found");
    }

    const parsed = UpsertNewsPostInputSchema.parse(input);
    const now = new Date().toISOString();
    const post = NewsPostSchema.parse({
      ...existing,
      ...parsed,
      ctaLabel: parsed.ctaLabel ?? existing.ctaLabel,
      visualVariant: parsed.visualVariant ?? existing.visualVariant,
      sortOrder: parsed.sortOrder ?? existing.sortOrder,
      publishedAt:
        parsed.status === "published" ? parsed.publishedAt ?? existing.publishedAt ?? now : null,
      heroImageUrl: parsed.heroImageUrl ?? null,
      updatedAt: now
    });
    this.posts.set(post.id, post);
    return post;
  }

  private sortedPosts(): NewsPost[] {
    return [...this.posts.values()].sort((a, b) => {
      const bDate = b.publishedAt ?? b.updatedAt;
      const aDate = a.publishedAt ?? a.updatedAt;
      return bDate.localeCompare(aDate);
    });
  }

  private sortedPublishedPosts(): NewsPost[] {
    return [...this.posts.values()].sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder;
      }
      const bDate = b.publishedAt ?? b.updatedAt;
      const aDate = a.publishedAt ?? a.updatedAt;
      return bDate.localeCompare(aDate);
    });
  }
}

function toNewsListItem(post: NewsPost): NewsListItem {
  const { body: _body, ...item } = post;
  return NewsListItemSchema.parse(item);
}
