import styles from "../styles/TdsPage.module.css";

const metrics = [
  { label: "Datasets", value: "48M+", trend: "↑ 23% vs last month", green: true },
  { label: "Active Users", value: "12K", trend: "↑ 18% vs last month" },
  { label: "Ingestion Vol.", value: "5 TB/day", trend: "↑ 32% vs last month", green: true },
  { label: "Avg Ingest Time", value: "1.68 TB", trend: "Peak at 4:15 PM", quiet: true }
];

const services = [
  "Azure Data Factory",
  "Databricks",
  "Data Storage",
  "Confluent Kafka",
  "Data Portal",
  "Supporting Services"
];

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroGlow} ${styles.heroGlowOne}`} />
      <div className={`${styles.heroGlow} ${styles.heroGlowTwo}`} />
      <div className={styles.container}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              Enterprise Data &amp; AI Platform
            </div>
            <h1 className={styles.heroTitle}>
              Accelerate trusted
              <br />
              <span className={styles.heroHighlight}>enterprise data</span>
              <br />
              and AI workflows
            </h1>
            <p className={styles.heroDescription}>
              Discover governed datasets, AI-ready analytics, onboarding tools, and enterprise
              platform services from a unified ecosystem designed for scale.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#section-platform">
                Get Started <ArrowIcon />
              </a>
              <a className={styles.secondaryButton} href="#section-solutions">
                <PlayIcon /> Watch Demo
              </a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="Platform overview dashboard">
            <div className={styles.dashboard}>
              <div className={styles.metricGrid}>
                {metrics.map((metric) => (
                  <div className={styles.dashboardMetric} key={metric.label}>
                    <div className={styles.metricLabel}>
                      {metric.label}
                      <MetricGlyph />
                    </div>
                    <div
                      className={`${styles.metricValue} ${metric.green ? styles.metricValueGreen : ""}`}
                    >
                      {metric.value}
                    </div>
                    <div className={metric.quiet ? styles.metricSub : styles.metricTrend}>
                      {metric.trend}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.chartGrid}>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>
                    Ingestion Volume <span className={styles.chartRange}>Last 7 days ▾</span>
                  </div>
                  <VolumeChart />
                  <div className={styles.chartLegend}>
                    <Legend color="#27D17F" label="Batch" />
                    <Legend color="#06B6D4" label="Streaming" />
                    <Legend color="#3B82F6" label="Manual" />
                  </div>
                </div>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>Dataset Health</div>
                  <div className={styles.donutWrap}>
                    <HealthDonut />
                    <div className={styles.donutLegend}>
                      <HealthRow color="#27D17F" label="Healthy" value="92%" />
                      <HealthRow color="#F59E0B" label="Warning" value="6%" />
                      <HealthRow color="#EF4444" label="Critical" value="2%" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.operations}>
                <div className={styles.operationsTitle}>Operational Status</div>
                <div className={styles.operationsGrid}>
                  {services.map((service) => (
                    <div className={styles.operationItem} key={service}>
                      <span className={styles.operationCheck}>✓</span>
                      <div>
                        <div className={styles.operationName}>{service}</div>
                        <div className={styles.operationState}>Operational</div>
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

function VolumeChart() {
  return (
    <svg viewBox="0 0 280 80" width="100%" role="img" aria-label="Seven day ingestion chart">
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
      {[
        [0, "15 Jun"],
        [40, "16 Jun"],
        [80, "17 Jun"],
        [120, "18 Jun"],
        [160, "19 Jun"],
        [200, "20 Jun"],
        [240, "21 Jun"]
      ].map(([x, label]) => (
        <text key={label} x={x} y="80" fill="#475569" fontSize="7" textAnchor="middle">
          {label}
        </text>
      ))}
    </svg>
  );
}

function HealthDonut() {
  return (
    <svg viewBox="0 0 80 80" width="80" height="80" role="img" aria-label="92 percent healthy">
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
      <text x="40" y="50" fill="#64748B" fontSize="7" textAnchor="middle">Healthy</text>
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
