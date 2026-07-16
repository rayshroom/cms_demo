import type { Messages } from "../i18n/catalog";
import { useI18n } from "../i18n/useI18n";
import styles from "../styles/TdsPage.module.css";

type ContactMessages = Messages["contact"];

export function ContactSection() {
  const { messages } = useI18n();
  const copy = messages.contact;

  return (
    <section className={styles.contactSection} id="section-contact">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{copy.title}</h2>
          <p className={styles.sectionDescription}>{copy.description}</p>
        </header>

        <div className={styles.contactGrid}>
          <ContactCard
            visual={<TeamsArtwork copy={copy} />}
            title={copy.teams.title}
            description={copy.teams.description}
            action={copy.teams.action}
          />
          <ContactCard
            visual={<KnowledgeArtwork copy={copy} />}
            title={copy.knowledge.title}
            description={copy.knowledge.description}
            action={copy.knowledge.action}
          />
          <article className={styles.contactCard}>
            <div className={styles.contactVisual}>
              <EmailArtwork copy={copy} />
            </div>
            <div className={styles.contactBody}>
              <div className={styles.contactTitle}>{copy.email.title}</div>
              <p className={styles.contactDescription}>{copy.email.description}</p>
              <a className={styles.contactDetail} href="mailto:support@tds.enterprise">
                support@tds.enterprise
              </a>
              <a className={styles.contactDetail} href="tel:+18001234567">
                +1 800 123 4567
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  visual,
  title,
  description,
  action
}: {
  visual: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <article className={styles.contactCard}>
      <div className={styles.contactVisual}>{visual}</div>
      <div className={styles.contactBody}>
        <div className={styles.contactTitle}>{title}</div>
        <p className={styles.contactDescription}>{description}</p>
        <a className={styles.contactLink} href="#section-contact">
          {action}
        </a>
      </div>
    </article>
  );
}

function TeamsArtwork({ copy }: { copy: ContactMessages }) {
  return (
    <svg viewBox="0 0 420 180" role="img" aria-label={copy.teams.artworkAriaLabel}>
      <defs>
        <linearGradient id="teams-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A3BAA" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
      <rect width="420" height="180" fill="url(#teams-gradient)" />
      <Grid />
      <circle cx="80" cy="50" r="90" fill="rgba(99,102,241,.3)" />
      <rect x="44" y="52" width="140" height="44" rx="12" fill="rgba(255,255,255,.15)" />
      <rect x="50" y="62" width="100" height="7" rx="3.5" fill="rgba(255,255,255,.6)" />
      <rect x="50" y="75" width="70" height="7" rx="3.5" fill="rgba(255,255,255,.35)" />
      <rect x="236" y="86" width="140" height="44" rx="12" fill="rgba(255,255,255,.12)" />
      <rect x="242" y="96" width="90" height="7" rx="3.5" fill="rgba(255,255,255,.5)" />
      <rect x="242" y="109" width="60" height="7" rx="3.5" fill="rgba(255,255,255,.3)" />
      <circle cx="34" cy="74" r="12" fill="#6366F1" />
      <text x="34" y="78" fill="white" fontSize="9" fontWeight="700" textAnchor="middle">TS</text>
      <circle cx="386" cy="108" r="12" fill="#4F46E5" />
      <text x="386" y="112" fill="white" fontSize="9" fontWeight="700" textAnchor="middle">RS</text>
      <text x="210" y="168" fill="rgba(255,255,255,.4)" fontSize="9" letterSpacing="1.5" textAnchor="middle">
        {copy.teams.artworkLabel}
      </text>
    </svg>
  );
}

function KnowledgeArtwork({ copy }: { copy: ContactMessages }) {
  return (
    <svg viewBox="0 0 420 180" role="img" aria-label={copy.knowledge.artworkAriaLabel}>
      <defs>
        <linearGradient id="knowledge-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#065F46" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect width="420" height="180" fill="url(#knowledge-gradient)" />
      <Grid />
      <circle cx="330" cy="40" r="100" fill="rgba(16,185,129,.2)" />
      <rect x="148" y="28" width="124" height="104" rx="8" fill="rgba(255,255,255,.12)" />
      <line x1="210" y1="28" x2="210" y2="132" stroke="rgba(255,255,255,.2)" strokeWidth="2" />
      {[44, 58, 72, 92, 106].map((y, index) => (
        <g key={y}>
          <rect x="158" y={y} width={index % 2 ? 34 : 42} height="5" rx="2.5" fill="rgba(255,255,255,.36)" />
          <rect x="220" y={y} width={index % 2 ? 38 : 42} height="5" rx="2.5" fill="rgba(255,255,255,.32)" />
        </g>
      ))}
      <circle cx="256" cy="104" r="17" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2.5" />
      <line x1="268" y1="116" x2="278" y2="126" stroke="rgba(255,255,255,.7)" strokeLinecap="round" strokeWidth="2.5" />
      <circle cx="148" cy="28" r="18" fill="#27D17F" />
      <text x="148" y="34" fill="#0B3D2E" fontSize="16" fontWeight="900" textAnchor="middle">?</text>
      <text x="210" y="168" fill="rgba(255,255,255,.35)" fontSize="9" letterSpacing="1.5" textAnchor="middle">
        {copy.knowledge.artworkLabel}
      </text>
    </svg>
  );
}

function EmailArtwork({ copy }: { copy: ContactMessages }) {
  return (
    <svg viewBox="0 0 420 180" role="img" aria-label={copy.email.artworkAriaLabel}>
      <defs>
        <linearGradient id="email-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#581C87" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect width="420" height="180" fill="url(#email-gradient)" />
      <Grid />
      <circle cx="70" cy="50" r="90" fill="rgba(139,92,246,.25)" />
      <rect x="100" y="42" width="152" height="104" rx="10" fill="rgba(255,255,255,.13)" />
      <polyline points="100,52 176,100 252,52" fill="none" stroke="rgba(255,255,255,.5)" strokeLinejoin="round" strokeWidth="2" />
      <rect x="276" y="36" width="60" height="108" rx="10" fill="rgba(255,255,255,.13)" />
      <rect x="284" y="48" width="44" height="72" rx="4" fill="rgba(255,255,255,.08)" />
      <circle cx="306" cy="132" r="5" fill="rgba(255,255,255,.4)" />
      <circle cx="252" cy="42" r="10" fill="#EF4444" />
      <text x="252" y="47" fill="white" fontSize="9" fontWeight="700" textAnchor="middle">1</text>
      <text x="210" y="168" fill="rgba(255,255,255,.35)" fontSize="9" letterSpacing="1.5" textAnchor="middle">
        {copy.email.artworkLabel}
      </text>
    </svg>
  );
}

function Grid() {
  return (
    <g stroke="rgba(255,255,255,.05)">
      {[45, 90, 135].map((y) => <line key={`h-${y}`} x1="0" y1={y} x2="420" y2={y} />)}
      {[105, 210, 315].map((x) => <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="180" />)}
    </g>
  );
}
