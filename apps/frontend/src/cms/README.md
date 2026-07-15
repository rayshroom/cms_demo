# Frontend CMS domains

The CMS layer separates two independent dimensions:

- `core/` owns transport, provider configuration, cancellation, and reusable resource state.
- Each domain folder owns its contract-facing source interface, HTTP adapter, mock adapter, fixtures, and React hook.
- `createCmsServices.ts` is the composition root. It registers one source per domain and is the only central file that grows when a domain is added.

Roadmap and news load independently. A failure or slow response in one domain does not block the other.

## Add a content domain

For a new domain such as `notifications`:

1. Add its Zod schemas and types to `packages/cms-contract/src/notifications.ts` and export a package subpath.
2. Add `src/cms/notifications/` with a source interface, HTTP source, mock source, fixture, source factory, and hook.
3. Register the source once in `CmsServices` and `createCmsServices()`.
4. Consume the domain hook from the relevant React component.
5. Implement the same contract endpoint in each CMS backend adapter.

Do not expose raw Umbraco or other vendor document shapes to React. CMS-specific mapping belongs in the backend; frontend HTTP sources should consume the shared contract endpoints.
