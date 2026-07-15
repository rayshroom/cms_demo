import styles from "../styles/TdsPage.module.css";

const products = [
  {
    name: "Databricks",
    description:
      "Build AI-ready analytics, governed data pipelines, and enterprise-scale workflows from a unified lakehouse platform.",
    tags: ["Lakehouse", "Delta Lake", "MLflow", "Unity Catalog"],
    action: "Open Databricks →",
    tone: "red" as const
  },
  {
    name: "Databricks — Data Labs",
    description:
      "Train, experiment, and explore Databricks in a guided self-service environment designed for onboarding and hands-on learning.",
    tags: ["Onboarding", "Labs", "AI Workflows"],
    action: "Start Exploring →",
    tone: "purple" as const
  },
  {
    name: "Dremio",
    description:
      "Discover and query trusted enterprise datasets through a high-performance semantic data layer built for speed and scale.",
    tags: ["Data Mesh", "Semantic Layer", "SQL Engine"],
    action: "Browse Datasets →",
    tone: "cyan" as const
  }
];

export function SolutionsSection() {
  return (
    <section className={styles.solutionsSection} id="section-solutions">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Solutions</h2>
          <p className={styles.sectionDescription}>
            Explore curated tools, workflows, and services designed to accelerate onboarding,
            analytics, and delivery across teams.
          </p>
        </header>

        <div className={styles.solutionsLayout}>
          <div className={styles.solutionsFeature}>
            <div className={styles.solutionsGlow} />
            <div className={styles.solutionsFeatureBody}>
              <div className={styles.solutionsEyebrow}>Platform</div>
              <div className={styles.solutionsTitle}>
                Data &amp;
                <br />
                AI Tools
              </div>
              <p className={styles.solutionsDescription}>
                Enterprise-grade platforms for analytics, exploration, and learning — all governed
                from one portal.
              </p>
              <a className={styles.featureButton} href="#section-platform">
                Explore all products →
              </a>
            </div>
          </div>

          <div className={styles.productGrid}>
            {products.map((product) => (
              <article className={styles.productCard} key={product.name}>
                <div
                  className={`${styles.productIcon} ${
                    product.tone === "red"
                      ? styles.iconRed
                      : product.tone === "purple"
                        ? styles.iconPurple
                        : styles.iconCyan
                  }`}
                >
                  <ProductIcon tone={product.tone} />
                </div>
                <div className={styles.productName}>{product.name}</div>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productTags}>
                  {product.tags.map((tag) => (
                    <span className={styles.productTag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a className={styles.textLink} href="#section-contact">
                  {product.action}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductIcon({ tone }: { tone: "red" | "purple" | "cyan" }) {
  if (tone === "purple") {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="18" height="14" rx="3" stroke="#7C3AED" strokeWidth="1.5" />
        <path d="M9 13l2.5 2.5L17 10M9 3v3M17 3v3" stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    );
  }

  if (tone === "cyan") {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="9" stroke="#06B6D4" strokeWidth="1.5" />
        <path d="M13 4s4 4 4 9-4 9-4 9M13 4s-4 4-4 9 4 9 4 9M4 13h18" stroke="#06B6D4" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path d="M13 3l10 5.5v9L13 23 3 17.5v-9L13 3Z" fill="#FF3621" fillOpacity=".15" stroke="#FF3621" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M3 8.5L13 14l10-5.5M13 14v9" stroke="#FF3621" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}
