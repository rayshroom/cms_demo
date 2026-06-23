#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${ConnectionStrings__umbracoDbDSN:-}" ]]; then
  echo "ConnectionStrings__umbracoDbDSN is required for the Azure SQL-first Umbraco backend."
  echo "See apps/umbraco/appsettings.AzureSql.example.json for the expected shape."
  exit 1
fi

export ASPNETCORE_ENVIRONMENT="${ASPNETCORE_ENVIRONMENT:-Development}"
export ASPNETCORE_URLS="${ASPNETCORE_URLS:-http://127.0.0.1:9138}"
export ConnectionStrings__umbracoDbDSN_ProviderName="${ConnectionStrings__umbracoDbDSN_ProviderName:-Microsoft.Data.SqlClient}"

"$(dirname "${BASH_SOURCE[0]}")/umbraco-dotnet.sh" run --project apps/umbraco/CmsDemo.Umbraco.csproj --no-launch-profile
