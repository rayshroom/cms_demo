import type { NewsListItem, NewsVisualVariant } from "@cms-demo/cms-contract/news";

const timestamp = "2026-07-15T00:00:00.000Z";

const newsRows: Array<
  [
    slug: string,
    title: string,
    excerpt: string,
    publishedAt: string,
    category: string,
    ctaLabel: string,
    visualVariant: NewsVisualVariant
  ]
> = [
  [
    "ai-powered-dataset-discovery",
    "AI-Powered Dataset Discovery",
    "TDS Data Platform now supports intelligent metadata recommendations and faster enterprise dataset discovery workflows powered by LLM embeddings.",
    "2026-05-20T12:00:00.000Z",
    "New Feature",
    "Learn More →",
    "feature"
  ],
  [
    "databricks-data-labs-training-paths",
    "New Databricks Data Labs Training Paths",
    "Explore updated onboarding journeys, guided labs, and hands-on AI workflow exercises for new platform users across all experience levels.",
    "2026-05-15T12:00:00.000Z",
    "Training",
    "Start Training →",
    "training"
  ],
  [
    "platform-release-2-6",
    "Platform Release 2.6 Now Available",
    "New governance controls, improved deployment workflows, and enhanced analytics performance are now live across all production environments.",
    "2026-05-08T12:00:00.000Z",
    "Release · May 8, 2026",
    "View Release Notes →",
    "release"
  ],
  [
    "scheduled-maintenance-june-14",
    "Scheduled Maintenance — June 14",
    "Some platform services may experience intermittent downtime during planned infrastructure upgrades between 02:00 and 04:00 UTC.",
    "2026-06-30T12:00:00.000Z",
    "Maintenance",
    "View Details →",
    "maintenance"
  ]
];

export const mockPublishedNews: NewsListItem[] = newsRows.map(
  ([slug, title, excerpt, publishedAt, category, ctaLabel, visualVariant], index) => ({
    id: uuid("2", index),
    slug,
    title,
    excerpt,
    status: "published",
    publishedAt,
    heroImageUrl: null,
    ctaLabel,
    visualVariant,
    sortOrder: (index + 1) * 10,
    author: "TDS Platform",
    tags: [category],
    createdAt: publishedAt,
    updatedAt: timestamp
  })
);

function uuid(group: string, index: number) {
  return `${group.padStart(8, "0")}-0000-4000-8000-${String(index + 1).padStart(12, "0")}`;
}
