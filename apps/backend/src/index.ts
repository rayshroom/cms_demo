import { createApp } from "./app.js";
import { loadConfig } from "./config.js";
import { MemoryCmsRepository } from "./repositories/memoryCmsRepository.js";
import { SqlServerCmsRepository } from "./repositories/sqlServerCmsRepository.js";
import type { CmsRepository } from "./repositories/types.js";

const config = loadConfig();

const repository: CmsRepository =
  config.storageMode === "sqlserver"
    ? await SqlServerCmsRepository.connect(config.sqlServerConnectionString!)
    : new MemoryCmsRepository();

const app = createApp(repository, {
  username: config.adminUsername,
  password: config.adminPassword,
  sessionSecret: config.adminSessionSecret,
  secureCookie: config.adminSecureCookie
});

app.listen(config.port, () => {
  console.log(
    `CMS backend listening on http://localhost:${config.port} using ${config.storageMode} storage`
  );
  console.log(`Visual editor: http://localhost:${config.port}/admin`);
});
