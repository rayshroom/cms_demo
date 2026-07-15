import type { NewsPost, RoadmapItem } from "@cms-demo/cms-contract";

const seedUpdatedAt = "2026-07-15T00:00:00.000Z";

const roadmapContent: Array<
  Pick<RoadmapItem, "title" | "status" | "product" | "year" | "quarter">
> = [
  {
    title: "Unity Catalog GA rollout across all workspaces",
    product: "Databricks",
    status: "launched",
    year: 2026,
    quarter: "Q1"
  },
  {
    title: "Dremio self-service analytics portal",
    product: "Dremio",
    status: "launched",
    year: 2026,
    quarter: "Q1"
  },
  {
    title: "SSO & RBAC enhancements for all platform tools",
    product: "Platform",
    status: "launched",
    year: 2026,
    quarter: "Q1"
  },
  {
    title: "Training portal & learning paths",
    product: "Platform",
    status: "launched",
    year: 2026,
    quarter: "Q1"
  },
  {
    title: "Platform portal homepage v2 redesign",
    product: "Platform",
    status: "launched",
    year: 2026,
    quarter: "Q2"
  },
  {
    title: "Data Lab onboarding journeys v1",
    product: "Data Lab",
    status: "launched",
    year: 2026,
    quarter: "Q2"
  },
  {
    title: "Databricks user registration & AD group validation",
    product: "Databricks",
    status: "launched",
    year: 2026,
    quarter: "Q2"
  },
  {
    title: "Design System v1.1 — component library & documentation",
    product: "Platform",
    status: "launched",
    year: 2026,
    quarter: "Q2"
  },
  {
    title: "Data Workspace management portal",
    product: "Platform",
    status: "launched",
    year: 2026,
    quarter: "Q3"
  },
  {
    title: "Self-service workspace provisioning & create flow",
    product: "Databricks",
    status: "launched",
    year: 2026,
    quarter: "Q3"
  },
  {
    title: "Automated pipeline monitoring & alerting",
    product: "Platform",
    status: "in_progress",
    year: 2026,
    quarter: "Q3"
  },
  {
    title: "GenAI assistant integration across Dremio & Data Lab",
    product: "Dremio",
    status: "planned",
    year: 2026,
    quarter: "Q4"
  },
  {
    title: "Platform cost reporting & chargeback dashboard",
    product: "Platform",
    status: "planned",
    year: 2026,
    quarter: "Q4"
  },
  {
    title: "Delta Sharing for cross-team data access",
    product: "Databricks",
    status: "planned",
    year: 2026,
    quarter: "Q4"
  },
  {
    title: "Enhanced lineage tracking & data quality scoring",
    product: "Platform",
    status: "planned",
    year: 2026,
    quarter: "Q4"
  },
  {
    title: "Real-time streaming dashboards via Confluent Kafka",
    product: "Platform",
    status: "planned",
    year: 2027,
    quarter: "Q1"
  },
  {
    title: "Federated query engine across multiple cloud regions",
    product: "Dremio",
    status: "planned",
    year: 2027,
    quarter: "Q1"
  },
  {
    title: "Platform-wide audit log & compliance reporting",
    product: "Platform",
    status: "planned",
    year: 2027,
    quarter: "Q1"
  },
  {
    title: "Managed feature store for enterprise ML workflows",
    product: "Databricks",
    status: "planned",
    year: 2027,
    quarter: "Q2"
  },
  {
    title: "No-code pipeline builder for business analysts",
    product: "Platform",
    status: "planned",
    year: 2027,
    quarter: "Q2"
  },
  {
    title: "Automated data contract enforcement at ingestion",
    product: "Databricks",
    status: "planned",
    year: 2027,
    quarter: "Q2"
  },
  {
    title: "Multi-cloud data lakehouse architecture (Azure + GCP)",
    product: "Databricks",
    status: "planned",
    year: 2027,
    quarter: "Q3"
  },
  {
    title: "AI governance & model risk scoring framework",
    product: "Platform",
    status: "planned",
    year: 2027,
    quarter: "Q3"
  },
  {
    title: "Expanded Dremio connectors — SAP, Salesforce, ServiceNow",
    product: "Dremio",
    status: "planned",
    year: 2027,
    quarter: "Q3"
  },
  {
    title: "Platform v3.0 — unified data & AI workspace launch",
    product: "Platform",
    status: "planned",
    year: 2027,
    quarter: "Q4"
  },
  {
    title: "Tenant-level observability & SLA dashboards",
    product: "Platform",
    status: "planned",
    year: 2027,
    quarter: "Q4"
  },
  {
    title: "Zero-trust data access controls across all products",
    product: "Platform",
    status: "planned",
    year: 2027,
    quarter: "Q4"
  }
];

export const seedRoadmapItems: RoadmapItem[] = roadmapContent.map((item, index) => ({
  ...item,
  id: seedId("1", index),
  description: item.title,
  sortOrder: (index + 1) * 10,
  updatedAt: seedUpdatedAt
}));

const newsContent: Array<
  Pick<
    NewsPost,
    | "slug"
    | "title"
    | "excerpt"
    | "publishedAt"
    | "ctaLabel"
    | "visualVariant"
    | "sortOrder"
    | "tags"
  >
> = [
  {
    slug: "ai-powered-dataset-discovery",
    title: "AI-Powered Dataset Discovery",
    excerpt:
      "TDS Data Platform now supports intelligent metadata recommendations and faster enterprise dataset discovery workflows powered by LLM embeddings.",
    publishedAt: "2026-05-20T12:00:00.000Z",
    ctaLabel: "Learn More →",
    visualVariant: "feature",
    sortOrder: 10,
    tags: ["New Feature"]
  },
  {
    slug: "databricks-data-labs-training-paths",
    title: "New Databricks Data Labs Training Paths",
    excerpt:
      "Explore updated onboarding journeys, guided labs, and hands-on AI workflow exercises for new platform users across all experience levels.",
    publishedAt: "2026-05-15T12:00:00.000Z",
    ctaLabel: "Start Training →",
    visualVariant: "training",
    sortOrder: 20,
    tags: ["Training"]
  },
  {
    slug: "platform-release-2-6",
    title: "Platform Release 2.6 Now Available",
    excerpt:
      "New governance controls, improved deployment workflows, and enhanced analytics performance are now live across all production environments.",
    publishedAt: "2026-05-08T12:00:00.000Z",
    ctaLabel: "View Release Notes →",
    visualVariant: "release",
    sortOrder: 30,
    tags: ["Release · May 8, 2026"]
  },
  {
    slug: "scheduled-maintenance-june-14",
    title: "Scheduled Maintenance — June 14",
    excerpt:
      "Some platform services may experience intermittent downtime during planned infrastructure upgrades between 02:00 and 04:00 UTC.",
    publishedAt: "2026-06-30T12:00:00.000Z",
    ctaLabel: "View Details →",
    visualVariant: "maintenance",
    sortOrder: 40,
    tags: ["Maintenance"]
  }
];

export const seedNewsPosts: NewsPost[] = newsContent.map((item, index) => ({
  ...item,
  id: seedId("2", index),
  status: "published",
  heroImageUrl: null,
  author: "TDS Data Platform",
  body: [
    {
      type: "paragraph",
      text: item.excerpt,
      html: item.excerpt
    }
  ],
  createdAt: item.publishedAt ?? seedUpdatedAt,
  updatedAt: seedUpdatedAt
}));

function seedId(namespace: "1" | "2", index: number): string {
  return `${namespace}0000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`;
}
