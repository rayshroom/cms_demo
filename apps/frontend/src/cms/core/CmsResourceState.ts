import { useEffect, useState } from "react";

export type CmsResourceState<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "ready"; data: T; error: null }
  | { status: "error"; data: null; error: string };

export type CmsResourceLoader<T> = (signal?: AbortSignal) => Promise<T>;

export function useCmsResource<T>(load: CmsResourceLoader<T>): CmsResourceState<T> {
  const [state, setState] = useState<CmsResourceState<T>>({
    status: "loading",
    data: null,
    error: null
  });

  useEffect(() => {
    const controller = new AbortController();

    load(controller.signal)
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
  }, [load]);

  return state;
}
