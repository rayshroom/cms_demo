import path from "node:path";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import { ZodError, type ZodTypeAny } from "zod";
import {
  CmsSiteSliceSchema,
  NewsListResponseSchema,
  RoadmapResponseSchema,
  UpsertNewsPostInputSchema,
  UpsertRoadmapItemInputSchema
} from "@cms-demo/cms-contract";
import { createAdminAuth, type AdminAuthConfig } from "./adminAuth.js";
import { ConflictError, NotFoundError } from "./errors.js";
import type { CmsRepository } from "./repositories/types.js";

type AsyncHandler = (request: Request, response: Response, next: NextFunction) => Promise<void>;

export function createApp(repository: CmsRepository, adminAuthConfig: AdminAuthConfig) {
  const app = express();
  const adminRoot = path.resolve(process.cwd(), "public/admin");
  const adminAuth = createAdminAuth(adminAuthConfig);

  app.use(cors({ origin: true }));
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_request, response) => {
    response.json({ ok: true });
  });

  app.post("/api/admin/login", adminAuth.login);
  app.post("/api/admin/logout", adminAuth.logout);
  app.get("/api/admin/session", adminAuth.session);

  app.use("/admin", (request, response, next) => {
    if (isPublicAdminFile(request.path)) {
      next();
      return;
    }

    adminAuth.requireAdminPage(request, response, next);
  });
  app.use("/admin", express.static(adminRoot, { extensions: ["html"] }));

  app.get(
    "/api/cms/site",
    asyncRoute(async (_request, response) => {
      const [roadmap, featuredNews] = await Promise.all([
        repository.listRoadmap(),
        repository.listPublishedNews()
      ]);
      response.json(CmsSiteSliceSchema.parse({ roadmap, featuredNews: featuredNews.slice(0, 4) }));
    })
  );

  app.get(
    "/api/cms/roadmap",
    asyncRoute(async (_request, response) => {
      response.json(RoadmapResponseSchema.parse(await repository.listRoadmap()));
    })
  );

  app.get(
    "/api/cms/news",
    asyncRoute(async (_request, response) => {
      response.json(NewsListResponseSchema.parse(await repository.listPublishedNews()));
    })
  );

  app.get(
    "/api/cms/news/:slug",
    asyncRoute(async (request, response) => {
      const post = await repository.getPublishedPostBySlug(request.params.slug);
      if (!post) {
        throw new NotFoundError("Post not found");
      }
      response.json(post);
    })
  );

  app.use("/api/admin", adminAuth.requireAdminApi);

  app.get(
    "/api/admin/posts",
    asyncRoute(async (_request, response) => {
      response.json(await repository.listAdminPosts());
    })
  );

  app.get(
    "/api/admin/posts/:id",
    asyncRoute(async (request, response) => {
      const post = await repository.getAdminPostById(request.params.id);
      if (!post) {
        throw new NotFoundError("Post not found");
      }
      response.json(post);
    })
  );

  app.post(
    "/api/admin/posts",
    asyncRoute(async (request, response) => {
      const input = parseBody(UpsertNewsPostInputSchema, request.body);
      const post = await repository.createPost(input);
      response.status(201).json(post);
    })
  );

  app.put(
    "/api/admin/posts/:id",
    asyncRoute(async (request, response) => {
      const input = parseBody(UpsertNewsPostInputSchema, request.body);
      response.json(await repository.updatePost(request.params.id, input));
    })
  );

  app.get(
    "/api/admin/roadmap",
    asyncRoute(async (_request, response) => {
      response.json(RoadmapResponseSchema.parse(await repository.listRoadmap()));
    })
  );

  app.post(
    "/api/admin/roadmap",
    asyncRoute(async (request, response) => {
      const input = parseBody(UpsertRoadmapItemInputSchema, request.body);
      response.status(201).json(await repository.createRoadmapItem(input));
    })
  );

  app.get("/admin/*", (_request, response) => {
    response.sendFile(path.join(adminRoot, "index.html"));
  });

  app.use(errorHandler);

  return app;
}

function isPublicAdminFile(requestPath: string) {
  return (
    requestPath === "/login.html" ||
    requestPath === "/login.js" ||
    requestPath === "/styles.css"
  );
}

function asyncRoute(handler: AsyncHandler) {
  return (request: Request, response: Response, next: NextFunction) => {
    handler(request, response, next).catch(next);
  };
}

function parseBody<TSchema extends ZodTypeAny>(schema: TSchema, body: unknown) {
  return schema.parse(body);
}

function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    response.status(400).json({
      error: "ValidationError",
      issues: error.issues
    });
    return;
  }

  if (error instanceof NotFoundError) {
    response.status(404).json({ error: "NotFound", message: error.message });
    return;
  }

  if (error instanceof ConflictError) {
    response.status(409).json({ error: "Conflict", message: error.message });
    return;
  }

  console.error(error);
  response.status(500).json({ error: "InternalServerError" });
}
