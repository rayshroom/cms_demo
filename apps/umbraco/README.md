# Umbraco Backoffice

This app is the Umbraco side of the compromise architecture:

- Umbraco owns backoffice editing, Azure SQL persistence, users, permissions, media, and content operations.
- The frontend should consume a stable contract API instead of binding directly to Umbraco document shapes.
- Custom controllers under `Controllers/` are the intended contract adapter surface.

## Run

The project targets .NET 10 and uses the repo-local SDK in `.dotnet-sdk`.

```sh
cd apps/umbraco
./scripts/dotnet.sh build CmsDemo.Umbraco.csproj
```

```sh
export ConnectionStrings__umbracoDbDSN="Server=tcp:<server>.database.windows.net,1433;Initial Catalog=<db>;User ID=<user>;Password=<password>;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
export ConnectionStrings__umbracoDbDSN_ProviderName="Microsoft.Data.SqlClient"
./scripts/run.sh
```

Open `http://127.0.0.1:9138/umbraco` for the install/backoffice flow.

## Content Model Direction

Start with these document/element types in the backoffice:

- `newsPost`: title, slug, excerpt, heroImage, tags, author, body blocks, publish metadata.
- `roadmapItem`: title, description, status, quarter, sortOrder.
- `pageNotification`: title, message, severity, targetPath, startsAt, endsAt, dismissible.
- `componentDefinition`: component key, display name, schema JSON, enabled flag.
- `contentPage`: route, SEO fields, block grid / block list composition.
- `formDefinition`: form key, title, field schema JSON, confirmation message.

Store user submissions outside the content tree, either with Umbraco Forms or a custom Azure SQL table exposed by a custom controller.

## Adapter Boundary

Do not let the Vite app consume raw Umbraco Delivery API responses long term. The adapter should translate Umbraco content into the existing `@cms-demo/cms-contract` shapes, such as roadmap, news list, news post, notifications, and page component definitions.
