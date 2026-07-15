#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ -z "${ConnectionStrings__umbracoDbDSN:-}" ]]; then
  echo "ConnectionStrings__umbracoDbDSN is required for the Azure SQL-first Umbraco backend."
  echo "See ${PROJECT_DIR}/appsettings.AzureSql.example.json for the expected shape."
  exit 1
fi

export ASPNETCORE_ENVIRONMENT="${ASPNETCORE_ENVIRONMENT:-Development}"
export ASPNETCORE_URLS="${ASPNETCORE_URLS:-http://127.0.0.1:9138}"
export ConnectionStrings__umbracoDbDSN_ProviderName="${ConnectionStrings__umbracoDbDSN_ProviderName:-Microsoft.Data.SqlClient}"

"${PROJECT_DIR}/scripts/dotnet.sh" run --project "${PROJECT_DIR}/CmsDemo.Umbraco.csproj" --no-launch-profile
