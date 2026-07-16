export const en = {
  document: {
    title: "TDS Data Platform",
    description:
      "TDS Data Platform — enterprise data, analytics, and AI services in one governed platform."
  },
  language: {
    label: "Language",
    english: "English",
    french: "French"
  },
  hero: {
    badge: "Enterprise Data & AI Platform",
    titleBefore: "Accelerate trusted",
    titleHighlight: "enterprise data",
    titleAfter: "and AI workflows",
    description:
      "Discover governed datasets, AI-ready analytics, onboarding tools, and enterprise platform services from a unified ecosystem designed for scale.",
    getStarted: "Get Started",
    watchDemo: "Watch Demo",
    dashboard: {
      ariaLabel: "Platform overview dashboard",
      metrics: [
        { label: "Datasets", value: "48M+", detail: "↑ 23% vs last month" },
        { label: "Active Users", value: "12K", detail: "↑ 18% vs last month" },
        { label: "Ingestion Vol.", value: "5 TB/day", detail: "↑ 32% vs last month" },
        { label: "Avg Ingest Time", value: "1.68 TB", detail: "Peak at 4:15 PM" }
      ],
      ingestionTitle: "Ingestion Volume",
      ingestionRange: "Last 7 days ▾",
      ingestionAriaLabel: "Seven day ingestion chart",
      ingestionDates: ["15 Jun", "16 Jun", "17 Jun", "18 Jun", "19 Jun", "20 Jun", "21 Jun"],
      batch: "Batch",
      streaming: "Streaming",
      manual: "Manual",
      healthTitle: "Dataset Health",
      healthAriaLabel: "92 percent healthy",
      healthy: "Healthy",
      warning: "Warning",
      critical: "Critical",
      operationsTitle: "Operational Status",
      operational: "Operational",
      services: [
        "Azure Data Factory",
        "Databricks",
        "Data Storage",
        "Confluent Kafka",
        "Data Portal",
        "Supporting Services"
      ]
    }
  },
  platform: {
    title: "Platform",
    description:
      "Access enterprise-grade data, AI, and analytics capabilities through a centralized and governed platform experience.",
    stats: [
      { value: "12,000+", label: "Active Platform Users" },
      { value: "48M+", label: "Governed Datasets Monthly" },
      { value: "65%", label: "Faster Onboarding vs Legacy" },
      { value: "4,500+", label: "Hours Saved via Automation" },
      { value: "99.95%", label: "Platform Uptime (Last 90 Days)" }
    ],
    capabilities: [
      {
        title: "Unified Data Governance",
        description:
          "Define and enforce access policies, track data lineage from source to insight, and ensure compliance across the entire platform — all from a single control plane.",
        tags: ["Lineage", "Access Control", "Unity Catalog", "Audit"],
        action: "Manage Governance →",
        status: "Live"
      },
      {
        title: "Self-Service Analytics",
        description:
          "Empower business teams to query and explore governed datasets without waiting on engineering. Connect your BI tool directly to the semantic layer for always-fresh insights.",
        tags: ["No-Code", "BI Connect", "Semantic Layer", "Dremio"],
        action: "Explore Datasets →",
        status: "Live"
      },
      {
        title: "AI-Ready Data Pipelines",
        description:
          "Accelerate model development with pre-governed feature stores, automated data quality checks, and MLflow experiment tracking — fully integrated into the enterprise lakehouse.",
        tags: ["MLflow", "Feature Store", "AutoML", "Delta Live"],
        action: "Start Building →",
        status: "Beta"
      }
    ]
  },
  solutions: {
    title: "Solutions",
    description:
      "Explore curated tools, workflows, and services designed to accelerate onboarding, analytics, and delivery across teams.",
    featureEyebrow: "Platform",
    featureTitleFirst: "Data &",
    featureTitleSecond: "AI Tools",
    featureDescription:
      "Enterprise-grade platforms for analytics, exploration, and learning — all governed from one portal.",
    featureAction: "Explore all products →",
    products: [
      {
        name: "Databricks",
        description:
          "Build AI-ready analytics, governed data pipelines, and enterprise-scale workflows from a unified lakehouse platform.",
        tags: ["Lakehouse", "Delta Lake", "MLflow", "Unity Catalog"],
        action: "Open Databricks →"
      },
      {
        name: "Databricks — Data Labs",
        description:
          "Train, experiment, and explore Databricks in a guided self-service environment designed for onboarding and hands-on learning.",
        tags: ["Onboarding", "Labs", "AI Workflows"],
        action: "Start Exploring →"
      },
      {
        name: "Dremio",
        description:
          "Discover and query trusted enterprise datasets through a high-performance semantic data layer built for speed and scale.",
        tags: ["Data Mesh", "Semantic Layer", "SQL Engine"],
        action: "Browse Datasets →"
      }
    ]
  },
  roadmap: {
    title: "Roadmap",
    description:
      "Track platform improvements, product releases, and upcoming capabilities across the TDS ecosystem.",
    controlsLabel: "Roadmap controls",
    searchLabel: "Search roadmap",
    searchPlaceholder: "Search roadmap…",
    productFilterLabel: "Filter by product",
    products: {
      all: "All products",
      platform: "Platform",
      databricks: "Databricks",
      dremio: "Dremio",
      dataLab: "Data Lab"
    },
    statusFilterLabel: "Filter by status",
    statuses: {
      all: "All statuses",
      launched: "Done",
      inProgress: "In Progress",
      planned: "Planned"
    },
    boardView: "Card view",
    ganttView: "Gantt",
    loadingLabel: "Loading roadmap",
    loadError: "Roadmap content could not be loaded.",
    empty: "No roadmap items match the selected filters.",
    upcoming: "Upcoming",
    inProgress: "In Progress",
    complete: "complete",
    quarters: {
      Q1: { long: "Q1 · Jan – Mar", short: "Q1" },
      Q2: { long: "Q2 · Apr – Jun", short: "Q2" },
      Q3: { long: "Q3 · Jul – Sep", short: "Q3" },
      Q4: { long: "Q4 · Oct – Dec", short: "Q4" }
    },
    noMatchingItems: "No matching items",
    initiative: "Initiative"
  },
  news: {
    title: "News & Updates",
    description:
      "Stay informed with the latest platform releases, training opportunities, feature updates, and scheduled maintenance.",
    loadingLabel: "Loading news",
    loadError: "News content could not be loaded.",
    fallbackTag: "News",
    artwork: {
      featureAriaLabel: "AI dataset discovery feature",
      featureBadge: "NEW FEATURE",
      featurePlatform: "TDS PLATFORM",
      trainingAriaLabel: "Databricks training session",
      trainingHeader: "TDS PLATFORM TRAINING",
      trainingPartner: "× DATABRICKS DATA LABS",
      platformLead: "TDS Platform Lead",
      dataEngineeringLead: "Data Eng. Lead",
      dataLabsTeam: "DATA LABS TEAM",
      releaseAriaLabel: "TDS Platform release 2.6",
      releaseLabel: "RELEASE 2.6",
      releasePlatform: "TDS DATA PLATFORM",
      maintenanceAriaLabel: "Scheduled platform maintenance",
      maintenanceBrand: "TDS Data Platform",
      scheduled: "Scheduled",
      maintenance: "Maintenance"
    }
  },
  contact: {
    title: "Contact",
    description:
      "Connect with the support team, browse help resources, or reach out directly for assistance and onboarding guidance.",
    teams: {
      title: "Microsoft Teams",
      description:
        "Chat live with the platform support team directly via your enterprise Teams workspace.",
      action: "Open Teams Chat →",
      artworkAriaLabel: "Microsoft Teams support illustration",
      artworkLabel: "MICROSOFT TEAMS"
    },
    knowledge: {
      title: "FAQ & Knowledge Base",
      description:
        "Find answers, how-tos, and onboarding guides in our self-service knowledge hub.",
      action: "Browse FAQ →",
      artworkAriaLabel: "Knowledge base illustration",
      artworkLabel: "KNOWLEDGE BASE"
    },
    email: {
      title: "Email & Phone",
      description:
        "Reach our support desk directly for escalated issues, bug reports, or governance inquiries.",
      artworkAriaLabel: "Email and phone support illustration",
      artworkLabel: "EMAIL & PHONE"
    }
  },
  footer: {
    sitemapTitle: "Site Map",
    sitemapDescription:
      "Browse all platform pages, products, tools, and resources through a structured navigation overview.",
    homeAriaLabel: "TDS Data Platform home",
    brandSuffix: "Data Platform",
    tagline: "Enterprise data & AI workflows from a unified ecosystem designed for scale.",
    socialAriaLabel: "Social channels",
    sitemap: {
      products: "Products",
      productDatabricks: "Databricks",
      productDataLabs: "Data Labs",
      productDremio: "Dremio",
      productAiServices: "AI Services",
      productPlatformStatus: "Platform Status",
      workspaces: "Workspaces",
      workspaceMine: "My Workspaces",
      workspaceJoin: "Join a Workspace",
      workspaceCreate: "Create Workspace",
      workspaceManagement: "Workspace Management",
      workspaceLandingZone: "Landing Zone (ADLS)",
      workspaceDeployment: "Deployment Services",
      resources: "Resources",
      resourceTraining: "Training & Learning Paths",
      resourceDocumentation: "Documentation",
      resourceArchitecture: "Architecture Guides",
      resourceDemos: "Demos & Walkthroughs",
      resourceGovernance: "Governance Playbooks",
      resourceFaqs: "FAQs",
      support: "Support",
      supportFeatures: "Feature Requests",
      supportTeams: "MS Teams Support",
      supportBugs: "Bug Reports",
      supportDesk: "Service Desk",
      supportContact: "Contact Support",
      supportIssues: "Known Issues",
      developers: "Developers",
      developerDesign: "Design System v1.1",
      developerApis: "APIs & SDKs",
      developerCicd: "CI/CD Integrations",
      developerPipelines: "Deployment Pipelines",
      developerDocs: "Developer Docs",
      developerLabs: "Data Labs Access",
      platform: "Platform",
      platformHome: "Home",
      platformRoadmap: "Roadmap",
      platformNews: "News & Updates",
      platformReleases: "Release Notes",
      platformAccessibility: "Accessibility",
      platformPrivacy: "Privacy & Terms"
    },
    allRightsReserved: "All rights reserved.",
    version: "v0.37.2 · July 14, 2026 · 12:52 PM EST",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    accessibility: "Accessibility",
    cookieSettings: "Cookie Settings"
  }
} as const;
