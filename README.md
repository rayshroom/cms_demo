# CMS Demo

This repo contains three independently useful pieces:

- `packages/cms-contract`: shared Zod schemas, TypeScript types, and API path helpers.
- `apps/backend`: Express CMS API, Azure SQL / SQL Server compatible persistence, and a visual editor at `/admin`.
- `apps/umbraco`: Umbraco backoffice bootstrap for the Azure SQL-first CMS route.
- `apps/frontend`: plain Vite React SPA that consumes the CMS contract and renders CMS roadmap/news content inside normal product pages.

## Run Locally

```sh
npm install
npm run dev
```

Default URLs:

- Frontend: `http://127.0.0.1:5187`
- CMS backend API: `http://localhost:8787/api`
- CMS visual editor: `http://localhost:8787/admin`

Default CMS admin login:

- Username: `admin`
- Password: `admin`

Override these with `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` when needed.

## Umbraco Backoffice

The Umbraco bootstrap lives in `apps/umbraco` and targets .NET 10 / Umbraco 17. It is configured with Delivery API enabled and does not include a SQLite fallback.

Build it with the workspace-local SDK:

```sh
npm run umbraco:build
```

Run it with Azure SQL connection settings:

```sh
export ConnectionStrings__umbracoDbDSN="Server=tcp:<server>.database.windows.net,1433;Initial Catalog=<db>;User ID=<user>;Password=<password>;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
export ConnectionStrings__umbracoDbDSN_ProviderName="Microsoft.Data.SqlClient"
npm run umbraco:run
```

Default Umbraco URLs:

- Backoffice/install: `http://127.0.0.1:9138/umbraco`
- Contract adapter skeleton: `http://127.0.0.1:9138/api/cms-contract/health`

The backend uses seeded in-memory content by default. Set `CMS_DATABASE_PROVIDER=sqlserver` and `AZURE_SQL_CONNECTION_STRING` or `SQLSERVER_CONNECTION_STRING` to use Azure SQL / SQL Server.

## Azure SQL

The Azure SQL compatible schema lives in `apps/backend/sql/001_create_cms_schema.sql`. The backend also runs the same schema bootstrap at startup when SQL Server storage is enabled.

Required tables:

- `dbo.cms_news_posts`
- `dbo.cms_roadmap_items`

The schema stores rich content and tags as JSON text in `NVARCHAR(MAX)` columns with `ISJSON` checks, which keeps the contract portable while staying compatible with Azure SQL.
