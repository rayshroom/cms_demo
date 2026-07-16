import { useI18n } from "../i18n/useI18n";
import styles from "../styles/TdsPage.module.css";

const capabilityPresentation: ReadonlyArray<{
  tone: "blue" | "purple" | "green";
  icon: "shield" | "chart" | "spark";
}> = [
  { tone: "blue", icon: "shield" },
  { tone: "purple", icon: "chart" },
  { tone: "green", icon: "spark" }
];

export function PlatformSection() {
  const { messages } = useI18n();
  const copy = messages.platform;

  return (
    <section className={styles.platformSection} id="section-platform">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{copy.title}</h2>
          <p className={styles.sectionDescription}>{copy.description}</p>
        </header>

        <div className={styles.statsGrid}>
          {copy.stats.map((stat) => (
            <div className={styles.statItem} key={stat.label}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.capabilityGrid}>
          {copy.capabilities.map((capability, index) => {
            const presentation = capabilityPresentation[index];

            return (
              <article
                className={`${styles.capabilityCard} ${
                  presentation.tone === "purple"
                    ? styles.capabilityPurple
                    : presentation.tone === "green"
                      ? styles.capabilityGreen
                      : ""
                }`}
                key={capability.title}
              >
                <div className={styles.capabilityHeader}>
                  <div className={styles.capabilityIcon}>
                    <CapabilityIcon type={presentation.icon} />
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
            );
          })}
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
