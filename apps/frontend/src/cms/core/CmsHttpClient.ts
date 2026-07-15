import type { ZodTypeAny } from "zod";

export class CmsHttpClient {
  constructor(private readonly apiBase: string) {}

  async get<TSchema extends ZodTypeAny>(
    path: string,
    schema: TSchema,
    signal?: AbortSignal
  ): Promise<TSchema["_output"]> {
    const response = await fetch(this.urlFor(path), {
      headers: { Accept: "application/json" },
      signal
    });

    if (!response.ok) {
      throw new Error(`CMS request failed with status ${response.status}.`);
    }

    return schema.parse(await response.json());
  }

  private urlFor(path: string) {
    const base = this.apiBase.replace(/\/$/, "");
    return `${base}${path.replace(/^\/api/, "")}`;
  }
}
