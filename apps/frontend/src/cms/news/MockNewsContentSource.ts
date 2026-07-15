import { NewsListResponseSchema } from "@cms-demo/cms-contract/news";
import { assertNotAborted } from "../core/assertNotAborted";
import { mockPublishedNews } from "./mockNews";
import type { NewsContentSource } from "./NewsContentSource";

export class MockNewsContentSource implements NewsContentSource {
  async listPublished(signal?: AbortSignal) {
    assertNotAborted(signal);
    return NewsListResponseSchema.parse(structuredClone(mockPublishedNews));
  }
}
