#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

export HOME="${ROOT_DIR}/.dotnet-home"
export TMPDIR="${ROOT_DIR}/.dotnet-tmp"
export DOTNET_ROOT="${ROOT_DIR}/.dotnet-sdk"
export DOTNET_CLI_TELEMETRY_OPTOUT=1
export PATH="${DOTNET_ROOT}:${PATH}"

mkdir -p "${HOME}" "${TMPDIR}"

if [[ ! -x "${DOTNET_ROOT}/dotnet" ]]; then
  echo "Missing workspace-local .NET SDK at ${DOTNET_ROOT}."
  echo "Install it with:"
  echo "  curl -L --fail --output /private/tmp/dotnet-install.sh https://dot.net/v1/dotnet-install.sh"
  echo "  bash /private/tmp/dotnet-install.sh --channel 10.0 --install-dir ${DOTNET_ROOT} --no-path"
  exit 1
fi

exec dotnet "$@"
