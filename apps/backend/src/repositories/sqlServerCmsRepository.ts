import { randomUUID } from "node:crypto";
import sql from "mssql";
import {
  NewsListItemSchema,
  NewsPostSchema,
  RichTextDocumentSchema,
  RoadmapItemSchema,
  UpsertNewsPostInputSchema,
  UpsertRoadmapItemInputSchema,
  type NewsListItem,
  type NewsPost,
  type RoadmapItem,
  type UpsertNewsPostInput,
  type UpsertRoadmapItemInput
} from "@cms-demo/cms-contract";
import { cmsSchemaSql } from "../cmsSchemaSql.js";
import { ConflictError, NotFoundError } from "../errors.js";
import type { CmsRepository } from "./types.js";

interface NewsPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: "draft" | "published";
  published_at: Date | null;
  hero_image_url: string | null;
  cta_label: string;
  visual_variant: NewsPost["visualVariant"];
  sort_order: number;
  author: string;
  tags_json: string;
  body_json: string;
  created_at: Date;
  updated_at: Date;
}

interface RoadmapRow {
  id: string;
  title: string;
  description: string;
  status: "planned" | "in_progress" | "launched";
  product: RoadmapItem["product"];
  roadmap_year: number;
  quarter: string;
  sort_order: number;
  updated_at: Date;
}

type PersistedNewsPostInput = UpsertNewsPostInput & {
  ctaLabel: string;
  visualVariant: NewsPost["visualVariant"];
  sortOrder: number;
};

export class SqlServerCmsRepository implements CmsRepository {
  private constructor(private readonly pool: sql.ConnectionPool) {}

  static async connect(connectionString: string): Promise<SqlServerCmsRepository> {
    const pool = await new sql.ConnectionPool(connectionString).connect();
    const repository = new SqlServerCmsRepository(pool);
    await repository.initialize();
    return repository;
  }

  async initialize(): Promise<void> {
    await this.pool.request().query(cmsSchemaSql);
  }

  async listRoadmap(): Promise<RoadmapItem[]> {
    const result = await this.pool.request().query<RoadmapRow>(`
      SELECT id, title, description, status, product, roadmap_year, quarter, sort_order, updated_at
      FROM dbo.cms_roadmap_items
      ORDER BY roadmap_year ASC, sort_order ASC, updated_at DESC
    `);
    return result.recordset.map(mapRoadmapRow);
  }

  async createRoadmapItem(input: UpsertRoadmapItemInput): Promise<RoadmapItem> {
    const parsed = UpsertRoadmapItemInputSchema.parse(input);
    const id = randomUUID();
    const result = await this.pool
      .request()
      .input("id", sql.UniqueIdentifier, id)
      .input("title", sql.NVarChar(160), parsed.title)
      .input("description", sql.NVarChar(600), parsed.description)
      .input("status", sql.NVarChar(20), parsed.status)
      .input("product", sql.NVarChar(80), parsed.product)
      .input("roadmap_year", sql.SmallInt, parsed.year)
      .input("quarter", sql.NVarChar(24), parsed.quarter)
      .input("sort_order", sql.Int, parsed.sortOrder).query<RoadmapRow>(`
        INSERT INTO dbo.cms_roadmap_items
          (id, title, description, status, product, roadmap_year, quarter, sort_order)
        OUTPUT INSERTED.id, INSERTED.title, INSERTED.description, INSERTED.status,
          INSERTED.product, INSERTED.roadmap_year, INSERTED.quarter, INSERTED.sort_order,
          INSERTED.updated_at
        VALUES
          (@id, @title, @description, @status, @product, @roadmap_year, @quarter, @sort_order)
      `);
    return mapRoadmapRow(result.recordset[0]);
  }

  async listPublishedNews(): Promise<NewsListItem[]> {
    const result = await this.pool.request().query<NewsPostRow>(`
      SELECT id, slug, title, excerpt, status, published_at, hero_image_url, cta_label,
        visual_variant, sort_order, author, tags_json, body_json, created_at, updated_at
      FROM dbo.cms_news_posts
      WHERE status = N'published'
      ORDER BY sort_order ASC, COALESCE(published_at, updated_at) DESC
    `);
    return result.recordset.map(mapNewsRow).map(toNewsListItem);
  }

  async getPublishedPostBySlug(slug: string): Promise<NewsPost | null> {
    const result = await this.pool
      .request()
      .input("slug", sql.NVarChar(180), slug).query<NewsPostRow>(`
        SELECT id, slug, title, excerpt, status, published_at, hero_image_url, cta_label,
          visual_variant, sort_order, author, tags_json, body_json, created_at, updated_at
        FROM dbo.cms_news_posts
        WHERE slug = @slug AND status = N'published'
      `);
    return result.recordset[0] ? mapNewsRow(result.recordset[0]) : null;
  }

  async listAdminPosts(): Promise<NewsListItem[]> {
    const result = await this.pool.request().query<NewsPostRow>(`
      SELECT id, slug, title, excerpt, status, published_at, hero_image_url, cta_label,
        visual_variant, sort_order, author, tags_json, body_json, created_at, updated_at
      FROM dbo.cms_news_posts
      ORDER BY updated_at DESC
    `);
    return result.recordset.map(mapNewsRow).map(toNewsListItem);
  }

  async getAdminPostById(id: string): Promise<NewsPost | null> {
    const result = await this.pool
      .request()
      .input("id", sql.UniqueIdentifier, id).query<NewsPostRow>(`
        SELECT id, slug, title, excerpt, status, published_at, hero_image_url, cta_label,
          visual_variant, sort_order, author, tags_json, body_json, created_at, updated_at
        FROM dbo.cms_news_posts
        WHERE id = @id
      `);
    return result.recordset[0] ? mapNewsRow(result.recordset[0]) : null;
  }

  async createPost(input: UpsertNewsPostInput): Promise<NewsPost> {
    const parsed = UpsertNewsPostInputSchema.parse(input);
    const id = randomUUID();
    const publishedAt =
      parsed.status === "published" ? parsed.publishedAt ?? new Date().toISOString() : null;
    const persisted = resolveNewsInput(parsed);

    try {
      const result = await this.postRequest(persisted, id, publishedAt).query<NewsPostRow>(`
        INSERT INTO dbo.cms_news_posts
          (id, slug, title, excerpt, status, published_at, hero_image_url, cta_label,
          visual_variant, sort_order, author, tags_json, body_json)
        OUTPUT INSERTED.id, INSERTED.slug, INSERTED.title, INSERTED.excerpt, INSERTED.status,
          INSERTED.published_at, INSERTED.hero_image_url, INSERTED.cta_label,
          INSERTED.visual_variant, INSERTED.sort_order, INSERTED.author, INSERTED.tags_json,
          INSERTED.body_json, INSERTED.created_at, INSERTED.updated_at
        VALUES
          (@id, @slug, @title, @excerpt, @status, @published_at, @hero_image_url, @cta_label,
          @visual_variant, @sort_order, @author, @tags_json, @body_json)
      `);
      return mapNewsRow(result.recordset[0]);
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        throw new ConflictError("A post with this slug already exists");
      }
      throw error;
    }
  }

  async updatePost(id: string, input: UpsertNewsPostInput): Promise<NewsPost> {
    const existing = await this.getAdminPostById(id);
    if (!existing) {
      throw new NotFoundError("Post not found");
    }

    const parsed = UpsertNewsPostInputSchema.parse(input);
    const publishedAt =
      parsed.status === "published"
        ? parsed.publishedAt ?? existing.publishedAt ?? new Date().toISOString()
        : null;
    const persisted = resolveNewsInput(parsed, existing);

    try {
      const result = await this.postRequest(persisted, id, publishedAt).query<NewsPostRow>(`
        UPDATE dbo.cms_news_posts
        SET slug = @slug,
          title = @title,
          excerpt = @excerpt,
          status = @status,
          published_at = @published_at,
          hero_image_url = @hero_image_url,
          cta_label = @cta_label,
          visual_variant = @visual_variant,
          sort_order = @sort_order,
          author = @author,
          tags_json = @tags_json,
          body_json = @body_json,
          updated_at = SYSUTCDATETIME()
        OUTPUT INSERTED.id, INSERTED.slug, INSERTED.title, INSERTED.excerpt, INSERTED.status,
          INSERTED.published_at, INSERTED.hero_image_url, INSERTED.cta_label,
          INSERTED.visual_variant, INSERTED.sort_order, INSERTED.author, INSERTED.tags_json,
          INSERTED.body_json, INSERTED.created_at, INSERTED.updated_at
        WHERE id = @id
      `);
      return mapNewsRow(result.recordset[0]);
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        throw new ConflictError("A post with this slug already exists");
      }
      throw error;
    }
  }

  private postRequest(input: PersistedNewsPostInput, id: string, publishedAt: string | null) {
    return this.pool
      .request()
      .input("id", sql.UniqueIdentifier, id)
      .input("slug", sql.NVarChar(180), input.slug)
      .input("title", sql.NVarChar(220), input.title)
      .input("excerpt", sql.NVarChar(500), input.excerpt)
      .input("status", sql.NVarChar(20), input.status)
      .input("published_at", sql.DateTime2, publishedAt ? new Date(publishedAt) : null)
      .input("hero_image_url", sql.NVarChar(1000), input.heroImageUrl ?? null)
      .input("cta_label", sql.NVarChar(80), input.ctaLabel)
      .input("visual_variant", sql.NVarChar(30), input.visualVariant)
      .input("sort_order", sql.Int, input.sortOrder)
      .input("author", sql.NVarChar(120), input.author)
      .input("tags_json", sql.NVarChar(sql.MAX), JSON.stringify(input.tags))
      .input("body_json", sql.NVarChar(sql.MAX), JSON.stringify(input.body));
  }
}

function mapNewsRow(row: NewsPostRow): NewsPost {
  return NewsPostSchema.parse({
    id: row.id.toLowerCase(),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    status: row.status,
    publishedAt: row.published_at ? row.published_at.toISOString() : null,
    heroImageUrl: row.hero_image_url,
    ctaLabel: row.cta_label,
    visualVariant: row.visual_variant,
    sortOrder: row.sort_order,
    author: row.author,
    tags: parseJsonArray(row.tags_json, []),
    body: RichTextDocumentSchema.parse(parseJsonArray(row.body_json, [])),
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString()
  });
}

function mapRoadmapRow(row: RoadmapRow): RoadmapItem {
  return RoadmapItemSchema.parse({
    id: row.id.toLowerCase(),
    title: row.title,
    description: row.description,
    status: row.status,
    product: row.product,
    year: row.roadmap_year,
    quarter: row.quarter,
    sortOrder: row.sort_order,
    updatedAt: row.updated_at.toISOString()
  });
}

function toNewsListItem(post: NewsPost): NewsListItem {
  const { body: _body, ...item } = post;
  return NewsListItemSchema.parse(item);
}

function resolveNewsInput(
  input: UpsertNewsPostInput,
  existing?: NewsPost
): PersistedNewsPostInput {
  return {
    ...input,
    ctaLabel: input.ctaLabel ?? existing?.ctaLabel ?? "Learn More →",
    visualVariant: input.visualVariant ?? existing?.visualVariant ?? "feature",
    sortOrder: input.sortOrder ?? existing?.sortOrder ?? 0
  };
}

function parseJsonArray(value: string, fallback: unknown[]): unknown[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function isUniqueConstraintError(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("number" in error)) {
    return false;
  }
  const sqlError = error as { number?: unknown };
  return sqlError.number === 2601 || sqlError.number === 2627;
}
