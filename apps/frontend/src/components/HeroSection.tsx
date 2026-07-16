import type { Messages } from "../i18n/catalog";
import { useI18n } from "../i18n/useI18n";
import styles from "../styles/TdsPage.module.css";

const metricStyles: ReadonlyArray<{ green?: boolean; quiet?: boolean }> = [
  { green: true },
  {},
  { green: true },
  { quiet: true }
];

type DashboardMessages = Messages["hero"]["dashboard"];

export function HeroSection() {
  const { messages } = useI18n();
  const copy = messages.hero;

  return (
    <section className={styles.hero}>
      <div className={`${styles.heroGlow} ${styles.heroGlowOne}`} />
      <div className={`${styles.heroGlow} ${styles.heroGlowTwo}`} />
      <div className={styles.container}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              {copy.badge}
            </div>
            <h1 className={styles.heroTitle}>
              {copy.titleBefore}
              <br />
              <span className={styles.heroHighlight}>{copy.titleHighlight}</span>
              <br />
              {copy.titleAfter}
            </h1>
            <p className={styles.heroDescription}>{copy.description}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#section-platform">
                {copy.getStarted} <ArrowIcon />
              </a>
              <a className={styles.secondaryButton} href="#section-solutions">
                <PlayIcon /> {copy.watchDemo}
              </a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label={copy.dashboard.ariaLabel}>
            <div className={styles.dashboard}>
              <div className={styles.metricGrid}>
                {copy.dashboard.metrics.map((metric, index) => (
                  <div className={styles.dashboardMetric} key={metric.label}>
                    <div className={styles.metricLabel}>
                      {metric.label}
                      <MetricGlyph />
                    </div>
                    <div
                      className={`${styles.metricValue} ${metricStyles[index].green ? styles.metricValueGreen : ""}`}
                    >
                      {metric.value}
                    </div>
                    <div className={metricStyles[index].quiet ? styles.metricSub : styles.metricTrend}>
                      {metric.detail}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.chartGrid}>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>
                    {copy.dashboard.ingestionTitle}{" "}
                    <span className={styles.chartRange}>{copy.dashboard.ingestionRange}</span>
                  </div>
                  <VolumeChart copy={copy.dashboard} />
                  <div className={styles.chartLegend}>
                    <Legend color="#27D17F" label={copy.dashboard.batch} />
                    <Legend color="#06B6D4" label={copy.dashboard.streaming} />
                    <Legend color="#3B82F6" label={copy.dashboard.manual} />
                  </div>
                </div>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>{copy.dashboard.healthTitle}</div>
                  <div className={styles.donutWrap}>
                    <HealthDonut copy={copy.dashboard} />
                    <div className={styles.donutLegend}>
                      <HealthRow color="#27D17F" label={copy.dashboard.healthy} value="92%" />
                      <HealthRow color="#F59E0B" label={copy.dashboard.warning} value="6%" />
                      <HealthRow color="#EF4444" label={copy.dashboard.critical} value="2%" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.operations}>
                <div className={styles.operationsTitle}>{copy.dashboard.operationsTitle}</div>
                <div className={styles.operationsGrid}>
                  {copy.dashboard.services.map((service) => (
                    <div className={styles.operationItem} key={service}>
                      <span className={styles.operationCheck}>✓</span>
                      <div>
                        <div className={styles.operationName}>{service}</div>
                        <div className={styles.operationState}>{copy.dashboard.operational}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className={styles.legendItem}>
      <span className={styles.legendDot} style={{ background: color }} />
      {label}
    </span>
  );
}

function HealthRow({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className={styles.donutRow}>
      <span className={styles.legendDot} style={{ background: color }} />
      {label}
      <strong>{value}</strong>
    </div>
  );
}

function VolumeChart({ copy }: { copy: DashboardMessages }) {
  return (
    <svg viewBox="0 0 280 80" width="100%" role="img" aria-label={copy.ingestionAriaLabel}>
      {[20, 40, 60].map((y) => (
        <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="rgba(255,255,255,.04)" />
      ))}
      <polyline
        points="0,52 40,44 80,36 120,38 160,28 200,30 240,20 280,16"
        fill="none"
        stroke="#27D17F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <polyline
        points="0,60 40,54 80,50 120,52 160,44 200,46 240,40 280,38"
        fill="none"
        stroke="#06B6D4"
        strokeDasharray="3 2"
        strokeWidth="1.5"
      />
      <polyline
        points="0,68 40,64 80,62 120,64 160,58 200,60 240,56 280,54"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="1.5"
      />
      {[0, 40, 80, 120, 160, 200, 240, 280].map((x, index) => (
        <circle key={x} cx={x} cy={[52, 44, 36, 38, 28, 30, 20, 16][index]} r="2.5" fill="#27D17F" />
      ))}
      {copy.ingestionDates.map((label, index) => (
        <text key={label} x={index * 40} y="80" fill="#475569" fontSize="7" textAnchor="middle">
          {label}
        </text>
      ))}
    </svg>
  );
}

function HealthDonut({ copy }: { copy: DashboardMessages }) {
  return (
    <svg viewBox="0 0 80 80" width="80" height="80" role="img" aria-label={copy.healthAriaLabel}>
      <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="10" />
      <circle
        cx="40"
        cy="40"
        r="28"
        fill="none"
        stroke="#27D17F"
        strokeDasharray="161 14.8"
        strokeLinecap="round"
        strokeWidth="10"
        transform="rotate(-90 40 40)"
      />
      <text x="40" y="38" fill="#fff" fontSize="12" fontWeight="800" textAnchor="middle">92%</text>
      <text x="40" y="50" fill="#64748B" fontSize="7" textAnchor="middle">{copy.healthy}</text>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M3 7.5H12M8.5 3.5L12 7.5L8.5 11.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 5L10 7.5L6 10V5Z" fill="currentColor" />
    </svg>
  );
}

function MetricGlyph() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 9L4 5.5L7 7L11 2" stroke="#475569" strokeLinecap="round" strokeWidth="1.2" />
    </svg>
  );
}
