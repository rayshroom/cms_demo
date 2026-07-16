# CMS Demo

This repository contains four independently managed projects. It intentionally does not use npm workspaces or root-level package management.

- `packages/cms-contract`: shared Zod schemas, TypeScript types, and API path helpers.
- `apps/frontend`: Vite + React + TypeScript SPA rebuilt from the TDS Data Platform reference.
- `apps/backend`: Express CMS API, Azure SQL / SQL Server persistence, and the visual editor at `/admin`.
- `apps/umbraco`: .NET 10 / Umbraco 17 backoffice and CMS contract adapter.

Each npm project owns its own `package-lock.json` and `node_modules`. Run npm commands inside the project you want to work on; there is no root `npm install`, `npm run dev`, or `npm run build`.

## CMS contract

Frontend and backend install a versioned contract tarball from `packages/cms-contract/releases`. The tarball lets both consumers install independently without npm traversing another project.

Install, validate, and rebuild the contract package:

```sh
cd packages/cms-contract
npm ci
npm run typecheck
npm pack --pack-destination releases
```

When the contract changes, bump its version, generate the new tarball, and update the tarball path in both consumer `package.json` files.

## Frontend

The frontend uses its in-browser mock provider by default, so it runs without either CMS backend:

```sh
cd apps/frontend
npm ci
npm run dev
```

Default URL: `http://127.0.0.1:5187`

CMS integration is organized by content domain. Roadmap and news each own their source interface, HTTP adapter, mock adapter, fixture, and React hook, while `cms/core` contains shared transport and async-state infrastructure. See `apps/frontend/src/cms/README.md` for the extension checklist used when adding more domains.

Non-CMS presentation copy supports English (default) and French through the frontend i18n layer. CMS-owned roadmap and news fields are intentionally rendered unchanged. See `apps/frontend/src/i18n/README.md` for the locale extension workflow.

To render the shared contract from the Express CMS, create `apps/frontend/.env.local`:

```sh
VITE_CMS_PROVIDER=http
VITE_CMS_API_BASE=http://localhost:8787/api
```

The public content endpoints are:

- `GET /api/cms/site` — combined homepage content.
- `GET /api/cms/roadmap` — roadmap items.
- `GET /api/cms/news` — published news cards.
- `GET /api/cms/news/:slug` — a published news post.

## Simple CMS backend

Install and start only the backend project:

```sh
cd apps/backend
npm ci
npm run dev
```

Default URLs:

- API: `http://localhost:8787/api`
- Visual editor: `http://localhost:8787/admin`

The backend uses seeded in-memory content by default. Copy `apps/backend/.env.example` values into your environment to select Azure SQL / SQL Server storage.

Default CMS admin credentials are `admin` / `admin`. Override them with `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`.

The Azure SQL schema lives in `apps/backend/sql/001_create_cms_schema.sql`. The backend also runs the schema bootstrap when SQL Server storage is enabled.

## Umbraco

Umbraco is independent from npm and restores its packages with NuGet:

```sh
cd apps/umbraco
./scripts/dotnet.sh build CmsDemo.Umbraco.csproj
```

Run it with Azure SQL connection settings:

```sh
export ConnectionStrings__umbracoDbDSN="Server=tcp:<server>.database.windows.net,1433;Initial Catalog=<db>;User ID=<user>;Password=<password>;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
export ConnectionStrings__umbracoDbDSN_ProviderName="Microsoft.Data.SqlClient"
./scripts/run.sh
```

Default URLs:

- Backoffice/install: `http://127.0.0.1:9138/umbraco`
- Contract adapter health: `http://127.0.0.1:9138/api/cms-contract/health`
