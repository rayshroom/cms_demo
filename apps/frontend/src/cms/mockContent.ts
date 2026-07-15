import type {
  CmsSiteSlice,
  NewsListItem,
  NewsVisualVariant,
  RoadmapItem,
  RoadmapProduct,
  RoadmapQuarter,
  RoadmapStatus
} from "@cms-demo/cms-contract";

const timestamp = "2026-07-15T00:00:00.000Z";

const roadmapRows: Array<
  [title: string, product: RoadmapProduct, status: RoadmapStatus, year: number, quarter: RoadmapQuarter]
> = [
  ["Unity Catalog GA rollout across all workspaces", "Databricks", "launched", 2026, "Q1"],
  ["Dremio self-service analytics portal", "Dremio", "launched", 2026, "Q1"],
  ["SSO & RBAC enhancements for all platform tools", "Platform", "launched", 2026, "Q1"],
  ["Training portal & learning paths", "Platform", "launched", 2026, "Q1"],
  ["Platform portal homepage v2 redesign", "Platform", "launched", 2026, "Q2"],
  ["Data Lab onboarding journeys v1", "Data Lab", "launched", 2026, "Q2"],
  ["Databricks user registration & AD group validation", "Databricks", "launched", 2026, "Q2"],
  ["Design System v1.1 — component library & documentation", "Platform", "launched", 2026, "Q2"],
  ["Data Workspace management portal", "Platform", "launched", 2026, "Q3"],
  ["Self-service workspace provisioning & create flow", "Databricks", "launched", 2026, "Q3"],
  ["Automated pipeline monitoring & alerting", "Platform", "in_progress", 2026, "Q3"],
  ["GenAI assistant integration across Dremio & Data Lab", "Dremio", "planned", 2026, "Q4"],
  ["Platform cost reporting & chargeback dashboard", "Platform", "planned", 2026, "Q4"],
  ["Delta Sharing for cross-team data access", "Databricks", "planned", 2026, "Q4"],
  ["Enhanced lineage tracking & data quality scoring", "Platform", "planned", 2026, "Q4"],
  ["Real-time streaming dashboards via Confluent Kafka", "Platform", "planned", 2027, "Q1"],
  ["Federated query engine across multiple cloud regions", "Dremio", "planned", 2027, "Q1"],
  ["Platform-wide audit log & compliance reporting", "Platform", "planned", 2027, "Q1"],
  ["Managed feature store for enterprise ML workflows", "Databricks", "planned", 2027, "Q2"],
  ["No-code pipeline builder for business analysts", "Platform", "planned", 2027, "Q2"],
  ["Automated data contract enforcement at ingestion", "Databricks", "planned", 2027, "Q2"],
  ["Multi-cloud data lakehouse architecture (Azure + GCP)", "Databricks", "planned", 2027, "Q3"],
  ["AI governance & model risk scoring framework", "Platform", "planned", 2027, "Q3"],
  ["Expanded Dremio connectors — SAP, Salesforce, ServiceNow", "Dremio", "planned", 2027, "Q3"],
  ["Platform v3.0 — unified data & AI workspace launch", "Platform", "planned", 2027, "Q4"],
  ["Tenant-level observability & SLA dashboards", "Platform", "planned", 2027, "Q4"],
  ["Zero-trust data access controls across all products", "Platform", "planned", 2027, "Q4"]
];

const roadmap: RoadmapItem[] = roadmapRows.map(
  ([title, product, status, year, quarter], index) => ({
    id: uuid("1", index),
    title,
    description: title,
    status,
    product,
    year,
    quarter,
    sortOrder: (index + 1) * 10,
    updatedAt: timestamp
  })
);

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

const featuredNews: NewsListItem[] = newsRows.map(
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

export const mockSiteContent: CmsSiteSlice = { roadmap, featuredNews };

function uuid(group: string, index: number) {
  return `${group.padStart(8, "0")}-0000-4000-8000-${String(index + 1).padStart(12, "0")}`;
}
