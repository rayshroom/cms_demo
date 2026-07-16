import type { NewsListItem, NewsVisualVariant } from "@cms-demo/cms-contract/news";
import type { FeaturedNewsState } from "../cms/news/useFeaturedNews";
import type { Messages } from "../i18n/catalog";
import type { Locale } from "../i18n/types";
import { useI18n } from "../i18n/useI18n";
import styles from "../styles/TdsPage.module.css";

type NewsMessages = Messages["news"];

export function NewsSection({ state }: { state: FeaturedNewsState }) {
  const { locale, messages } = useI18n();
  const copy = messages.news;

  return (
    <section className={styles.newsSection} id="section-updates">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{copy.title}</h2>
          <p className={styles.sectionDescription}>{copy.description}</p>
        </header>

        {state.status === "loading" ? (
          <div className={styles.newsGrid} aria-label={copy.loadingLabel}>
            {[0, 1, 2, 3].map((item) => (
              <div className={styles.loadingCard} key={item} />
            ))}
          </div>
        ) : null}
        {state.status === "error" ? (
          <div className={styles.errorState} role="alert">
            {copy.loadError} {state.error}
          </div>
        ) : null}
        {state.status === "ready" ? (
          <div className={styles.newsGrid}>
            {state.data.map((item) => (
              <NewsCard copy={copy} item={item} key={item.id} locale={locale} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function NewsCard({
  copy,
  item,
  locale
}: {
  copy: NewsMessages;
  item: NewsListItem;
  locale: Locale;
}) {
  return (
    <article className={styles.newsCard}>
      <div className={styles.newsThumb}>
        {item.visualVariant === "image" && item.heroImageUrl ? (
          <img src={item.heroImageUrl} alt="" width="320" height="200" />
        ) : (
          <NewsArtwork copy={copy} variant={item.visualVariant} />
        )}
      </div>
      <div className={styles.newsTag}>{item.tags[0] ?? copy.fallbackTag}</div>
      <h3 className={styles.newsTitle}>{item.title}</h3>
      <p className={styles.newsBody}>{item.excerpt}</p>
      <div className={styles.newsDate}>
        {formatDate(item.publishedAt ?? item.updatedAt, locale)}
      </div>
      <a className={styles.newsLink} href="#section-updates" aria-label={`${item.ctaLabel}: ${item.title}`}>
        {item.ctaLabel}
      </a>
    </article>
  );
}

function NewsArtwork({ copy, variant }: { copy: NewsMessages; variant: NewsVisualVariant }) {
  if (variant === "training") return <TrainingArtwork copy={copy} />;
  if (variant === "release") return <ReleaseArtwork copy={copy} />;
  if (variant === "maintenance") return <MaintenanceArtwork copy={copy} />;
  return <FeatureArtwork copy={copy} />;
}

function FeatureArtwork({ copy }: { copy: NewsMessages }) {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label={copy.artwork.featureAriaLabel}>
      <rect width="320" height="200" fill="#0D1B2A" />
      {[50, 100, 150].map((y) => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,.04)" />
      ))}
      <polygon points="20,165 80,138 140,108 200,82 260,58 320,38 320,200 20,200" fill="rgba(39,209,127,.1)" />
      <polyline points="20,165 80,138 140,108 200,82 260,58 320,38" fill="none" stroke="#27D17F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      {[80, 140, 200, 260, 320].map((x, index) => (
        <circle key={x} cx={x} cy={[138, 108, 82, 58, 38][index]} r="4.5" fill="#27D17F" />
      ))}
      <rect x="194" y="124" width="116" height="56" rx="6" fill="#E53935" />
      <text x="252" y="145" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
        ✦ {copy.artwork.featureBadge}
      </text>
      <text x="252" y="162" fill="rgba(255,255,255,.75)" fontSize="8" textAnchor="middle">
        {copy.artwork.featurePlatform}
      </text>
      <rect x="22" y="58" width="34" height="44" rx="4" fill="#E53935" opacity=".85" />
      {[70, 78, 86].map((y, index) => (
        <line key={y} x1="29" y1={y} x2={index === 2 ? 42 : 49} y2={y} stroke="white" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function TrainingArtwork({ copy }: { copy: NewsMessages }) {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label={copy.artwork.trainingAriaLabel}>
      <rect width="320" height="200" fill="#111827" />
      <rect width="320" height="32" fill="#1A2537" />
      <rect x="12" y="10" width="140" height="12" rx="3" fill="rgba(255,255,255,.07)" />
      <rect x="172" y="10" width="136" height="12" rx="3" fill="rgba(255,255,255,.07)" />
      <text x="82" y="20" fill="#475569" fontSize="8" textAnchor="middle">
        {copy.artwork.trainingHeader}
      </text>
      <text x="240" y="20" fill="#475569" fontSize="8" textAnchor="middle">
        {copy.artwork.trainingPartner}
      </text>
      <Speaker
        x={88}
        circle="#1E3A5F"
        panel="#162030"
        title={copy.artwork.platformLead}
        label="DATABRICKS"
      />
      <Speaker
        x={232}
        circle="#1A2D40"
        panel="#111827"
        title={copy.artwork.dataEngineeringLead}
        label={copy.artwork.dataLabsTeam}
      />
    </svg>
  );
}

function Speaker({ x, circle, panel, title, label }: { x: number; circle: string; panel: string; title: string; label: string }) {
  return (
    <g>
      <circle cx={x} cy="108" r="44" fill={circle} />
      <circle cx={x} cy="90" r="20" fill="#2D4A6E" opacity=".6" />
      <rect x={x - 36} y="118" width="72" height="30" rx="4" fill={panel} />
      <text x={x} y="133" fill="#94A3B8" fontSize="7.5" textAnchor="middle">{title}</text>
      <text x={x} y="143" fill="#475569" fontSize="6.5" textAnchor="middle">{label}</text>
    </g>
  );
}

function ReleaseArtwork({ copy }: { copy: NewsMessages }) {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label={copy.artwork.releaseAriaLabel}>
      <rect width="320" height="200" fill="#7C1010" />
      <polygon points="160,22 220,55 220,121 160,154 100,121 100,55" fill="rgba(0,0,0,.22)" stroke="rgba(255,255,255,.12)" strokeWidth="1.5" />
      <polygon points="160,38 208,65 208,115 160,142 112,115 112,65" fill="rgba(0,0,0,.18)" stroke="rgba(255,255,255,.08)" />
      <circle cx="160" cy="88" r="18" fill="rgba(255,255,255,.1)" />
      <polyline points="151,88 157,94 169,80" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      <text x="160" y="163" fill="white" fontSize="11" fontWeight="800" textAnchor="middle">
        {copy.artwork.releaseLabel}
      </text>
      <text x="160" y="178" fill="rgba(255,255,255,.55)" fontSize="8" textAnchor="middle">
        {copy.artwork.releasePlatform}
      </text>
      <text x="38" y="46" fill="rgba(255,255,255,.45)" fontSize="15">✦</text>
      <text x="270" y="62" fill="rgba(255,255,255,.35)" fontSize="10">✦</text>
    </svg>
  );
}

function MaintenanceArtwork({ copy }: { copy: NewsMessages }) {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label={copy.artwork.maintenanceAriaLabel}>
      <rect width="320" height="200" fill="#C2410C" />
      <path d="M20 170Q110 60 210 105Q270 130 305 55" fill="none" stroke="rgba(255,255,255,.2)" strokeDasharray="5 4" strokeWidth="1.5" />
      <rect x="150" y="24" width="108" height="126" rx="8" fill="rgba(0,0,0,.28)" />
      <rect x="158" y="33" width="92" height="13" rx="3" fill="rgba(255,255,255,.14)" />
      {[52, 64, 76].map((y, index) => (
        <rect key={y} x="158" y={y} width={[92, 72, 82][index]} height="7" rx="2" fill="rgba(255,255,255,.07)" />
      ))}
      <text x="204" y="46" fill="rgba(255,255,255,.6)" fontSize="7.5" textAnchor="middle">
        {copy.artwork.maintenanceBrand}
      </text>
      <circle cx="204" cy="124" r="22" fill="rgba(0,0,0,.3)" stroke="rgba(255,255,255,.18)" />
      <text x="204" y="120" fill="white" fontSize="7" textAnchor="middle">
        {copy.artwork.scheduled}
      </text>
      <text x="204" y="131" fill="white" fontSize="7" textAnchor="middle">
        {copy.artwork.maintenance}
      </text>
      <polygon points="68,90 95,138 41,138" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.4)" strokeLinejoin="round" strokeWidth="1.5" />
      <text x="68" y="129" fill="white" fontSize="14" fontWeight="700" textAnchor="middle">!</text>
    </svg>
  );
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(value));
}
