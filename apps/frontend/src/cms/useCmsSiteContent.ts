import { useEffect, useState } from "react";
import type { CmsSiteSlice } from "@cms-demo/cms-contract";
import { cmsContentProvider } from "./createCmsContentProvider";

export type CmsSiteContentState =
  | { status: "loading"; data: null; error: null }
  | { status: "ready"; data: CmsSiteSlice; error: null }
  | { status: "error"; data: null; error: string };

export function useCmsSiteContent(): CmsSiteContentState {
  const [state, setState] = useState<CmsSiteContentState>({
    status: "loading",
    data: null,
    error: null
  });

  useEffect(() => {
    const controller = new AbortController();

    cmsContentProvider
      .getSiteContent(controller.signal)
      .then((data) => setState({ status: "ready", data, error: null }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          data: null,
          error: error instanceof Error ? error.message : "Unknown CMS error."
        });
      });

    return () => controller.abort();
  }, []);

  return state;
}
