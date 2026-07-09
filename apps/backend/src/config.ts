export type CmsStorageMode = "memory" | "sqlserver";

export interface BackendConfig {
  port: number;
  storageMode: CmsStorageMode;
  sqlServerConnectionString: string | null;
  adminUsername: string;
  adminPassword: string;
  adminSessionSecret: string;
  adminSecureCookie: boolean;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): BackendConfig {
  const sqlServerConnectionString =
    env.AZURE_SQL_CONNECTION_STRING ?? env.SQLSERVER_CONNECTION_STRING ?? null;
  const requestedMode = env.CMS_DATABASE_PROVIDER;
  const storageMode: CmsStorageMode =
    requestedMode === "sqlserver" || (!requestedMode && sqlServerConnectionString)
      ? "sqlserver"
      : "memory";

  if (storageMode === "sqlserver" && !sqlServerConnectionString) {
    throw new Error(
      "CMS_DATABASE_PROVIDER=sqlserver requires AZURE_SQL_CONNECTION_STRING or SQLSERVER_CONNECTION_STRING"
    );
  }

  return {
    port: Number(env.PORT ?? 8787),
    storageMode,
    sqlServerConnectionString,
    adminUsername: env.ADMIN_USERNAME ?? "admin",
    adminPassword: env.ADMIN_PASSWORD ?? "admin",
    adminSessionSecret: env.ADMIN_SESSION_SECRET ?? "cms-demo-local-admin-session",
    adminSecureCookie: env.ADMIN_SECURE_COOKIE === "true"
  };
}
