export function assertNotAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException("The CMS request was aborted.", "AbortError");
  }
}
