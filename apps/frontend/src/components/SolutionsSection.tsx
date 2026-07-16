import { useI18n } from "../i18n/useI18n";
import styles from "../styles/TdsPage.module.css";

const productTones = ["red", "purple", "cyan"] as const;

export function SolutionsSection() {
  const { messages } = useI18n();
  const copy = messages.solutions;

  return (
    <section className={styles.solutionsSection} id="section-solutions">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{copy.title}</h2>
          <p className={styles.sectionDescription}>{copy.description}</p>
        </header>

        <div className={styles.solutionsLayout}>
          <div className={styles.solutionsFeature}>
            <div className={styles.solutionsGlow} />
            <div className={styles.solutionsFeatureBody}>
              <div className={styles.solutionsEyebrow}>{copy.featureEyebrow}</div>
              <div className={styles.solutionsTitle}>
                {copy.featureTitleFirst}
                <br />
                {copy.featureTitleSecond}
              </div>
              <p className={styles.solutionsDescription}>{copy.featureDescription}</p>
              <a className={styles.featureButton} href="#section-platform">
                {copy.featureAction}
              </a>
            </div>
          </div>

          <div className={styles.productGrid}>
            {copy.products.map((product, index) => {
              const tone = productTones[index];

              return (
                <article className={styles.productCard} key={product.name}>
                  <div
                    className={`${styles.productIcon} ${
                      tone === "red"
                        ? styles.iconRed
                        : tone === "purple"
                          ? styles.iconPurple
                          : styles.iconCyan
                    }`}
                  >
                    <ProductIcon tone={tone} />
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
              );
            })}
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
