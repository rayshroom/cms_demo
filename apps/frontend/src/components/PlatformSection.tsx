import styles from "../styles/TdsPage.module.css";

const stats = [
  ["12,000+", "Active Platform Users"],
  ["48M+", "Governed Datasets Monthly"],
  ["65%", "Faster Onboarding vs Legacy"],
  ["4,500+", "Hours Saved via Automation"],
  ["99.95%", "Platform Uptime (Last 90 Days)"]
] as const;

const capabilities = [
  {
    title: "Unified Data Governance",
    description:
      "Define and enforce access policies, track data lineage from source to insight, and ensure compliance across the entire platform — all from a single control plane.",
    tags: ["Lineage", "Access Control", "Unity Catalog", "Audit"],
    action: "Manage Governance →",
    status: "Live",
    tone: "blue" as const,
    icon: "shield" as const
  },
  {
    title: "Self-Service Analytics",
    description:
      "Empower business teams to query and explore governed datasets without waiting on engineering. Connect your BI tool directly to the semantic layer for always-fresh insights.",
    tags: ["No-Code", "BI Connect", "Semantic Layer", "Dremio"],
    action: "Explore Datasets →",
    status: "Live",
    tone: "purple" as const,
    icon: "chart" as const
  },
  {
    title: "AI-Ready Data Pipelines",
    description:
      "Accelerate model development with pre-governed feature stores, automated data quality checks, and MLflow experiment tracking — fully integrated into the enterprise lakehouse.",
    tags: ["MLflow", "Feature Store", "AutoML", "Delta Live"],
    action: "Start Building →",
    status: "Beta",
    tone: "green" as const,
    icon: "spark" as const
  }
];

export function PlatformSection() {
  return (
    <section className={styles.platformSection} id="section-platform">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Platform</h2>
          <p className={styles.sectionDescription}>
            Access enterprise-grade data, AI, and analytics capabilities through a centralized and
            governed platform experience.
          </p>
        </header>

        <div className={styles.statsGrid}>
          {stats.map(([value, label]) => (
            <div className={styles.statItem} key={label}>
              <div className={styles.statValue}>{value}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>

        <div className={styles.capabilityGrid}>
          {capabilities.map((capability) => (
            <article
              className={`${styles.capabilityCard} ${
                capability.tone === "purple"
                  ? styles.capabilityPurple
                  : capability.tone === "green"
                    ? styles.capabilityGreen
                    : ""
              }`}
              key={capability.title}
            >
              <div className={styles.capabilityHeader}>
                <div className={styles.capabilityIcon}>
                  <CapabilityIcon type={capability.icon} />
                </div>
                <span className={styles.capabilityStatus}>{capability.status}</span>
              </div>
              <div className={styles.capabilityName}>{capability.title}</div>
              <p className={styles.capabilityDescription}>{capability.description}</p>
              <div className={styles.tagRow}>
                {capability.tags.map((tag) => (
                  <span className={styles.lightTag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <a className={styles.capabilityLink} href="#section-solutions">
                {capability.action}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityIcon({ type }: { type: "shield" | "chart" | "spark" }) {
  if (type === "chart") {
    return (
      <svg width="26" height="26" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="13" width="4" height="7" rx="1" fill="rgba(255,255,255,.3)" stroke="white" strokeWidth="1.4" />
        <rect x="9" y="8" width="4" height="12" rx="1" fill="rgba(255,255,255,.3)" stroke="white" strokeWidth="1.4" />
        <rect x="16" y="3" width="4" height="17" rx="1" fill="rgba(255,255,255,.3)" stroke="white" strokeWidth="1.4" />
        <path d="M3 10l5-4 5 3 6-6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === "spark") {
    return (
      <svg width="26" height="26" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="3.5" stroke="white" strokeWidth="1.5" />
        <path d="M11 2v3M11 17v3M2 11h3M17 11h3M4.2 4.2l2.1 2.1M15.7 15.7l2.1 2.1M4.2 17.8l2.1-2.1M15.7 6.3l2.1-2.1" stroke="white" strokeLinecap="round" strokeWidth="1.3" />
      </svg>
    );
  }

  return (
    <svg width="26" height="26" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M11 2L3 6v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V6L11 2Z" stroke="white" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M7.5 11l2.5 2.5 4.5-4.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}
