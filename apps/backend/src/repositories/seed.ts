import type { NewsPost, RoadmapItem } from "@cms-demo/cms-contract";

const now = new Date().toISOString();

export const seedRoadmapItems: RoadmapItem[] = [
  {
    id: "c5e14ac4-f19e-4e1d-97b7-189360b48f5a",
    title: "Composable CMS Slots",
    description:
      "Let product surfaces reserve typed CMS slots without moving the whole app to server-side rendering.",
    status: "launched",
    quarter: "Q2 2026",
    sortOrder: 10,
    updatedAt: now
  },
  {
    id: "3a8e912a-d8b5-4bc3-85c1-56f7fbe22eaa",
    title: "Editorial Review Flow",
    description:
      "Add draft previews, editor handoff, and scheduled publishing for news and release notes.",
    status: "in_progress",
    quarter: "Q3 2026",
    sortOrder: 20,
    updatedAt: now
  },
  {
    id: "f23bb142-23a5-4ded-84e2-b8623b7324b9",
    title: "Localized Content Variants",
    description:
      "Support region-specific page fragments and post variants while keeping the frontend contract stable.",
    status: "planned",
    quarter: "Q4 2026",
    sortOrder: 30,
    updatedAt: now
  }
];

export const seedNewsPosts: NewsPost[] = [
  {
    id: "4681f6a9-08f8-4f58-a7b6-8a90ded9c5e0",
    slug: "roadmap-content-slots",
    title: "Roadmap content slots are now contract-backed",
    excerpt:
      "The product roadmap area is hydrated from CMS content while the surrounding app remains a normal Vite SPA.",
    status: "published",
    publishedAt: now,
    heroImageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    author: "CMS Team",
    tags: ["Roadmap", "Contracts"],
    body: [
      {
        type: "heading",
        level: 2,
        text: "Typed content inside a product page",
        html: "Typed content inside a product page"
      },
      {
        type: "paragraph",
        text:
          "The frontend consumes a shared CMS contract and renders only the content fragment that belongs inside the product page.",
        html:
          "The frontend consumes a <strong>shared CMS contract</strong> and renders only the content fragment that belongs inside the product page."
      },
      {
        type: "list",
        items: [
          "No SSR is required for the consuming frontend.",
          "The backend owns editorial state and validation.",
          "Azure SQL stores structured content as JSON inside relational rows."
        ],
        itemsHtml: [
          "No SSR is required for the consuming frontend.",
          "The backend owns editorial state and validation.",
          "Azure SQL stores structured content as JSON inside relational rows."
        ]
      }
    ],
    createdAt: now,
    updatedAt: now
  },
  {
    id: "ac29376d-d759-4a35-91e6-2750234d4fa0",
    slug: "visual-editor-drafts",
    title: "Visual editor drafts ship with the CMS backend",
    excerpt:
      "Editors can write structured posts through a lightweight WYSIWYG screen served directly by the backend.",
    status: "published",
    publishedAt: now,
    heroImageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    author: "Editorial Ops",
    tags: ["Editor", "News"],
    body: [
      {
        type: "heading",
        level: 2,
        text: "Edit visually, publish through the API",
        html: "Edit visually, publish through the API"
      },
      {
        type: "paragraph",
        text:
          "The editor stores rich text as contract-valid blocks. Draft and published states are handled by the same backend that serves frontend content.",
        html:
          "The editor stores rich text as contract-valid blocks. Draft and published states are handled by the same backend that serves frontend content."
      },
      {
        type: "quote",
        text: "The demo keeps the content path explicit: editor to API to contract to Vite app.",
        html: "The demo keeps the content path explicit: editor to API to contract to Vite app."
      }
    ],
    createdAt: now,
    updatedAt: now
  }
];
