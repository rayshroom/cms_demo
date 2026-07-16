import type { Messages } from "../i18n/catalog";
import { useI18n } from "../i18n/useI18n";
import styles from "../styles/TdsPage.module.css";

type SitemapLabel = keyof Messages["footer"]["sitemap"];

const sitemap = [
  {
    title: "products",
    links: [
      { label: "productDatabricks", href: "#top" },
      { label: "productDataLabs", href: "#top" },
      { label: "productDremio", href: "#top" },
      { label: "productAiServices", href: "#top" },
      { label: "productPlatformStatus", href: "#top" }
    ]
  },
  {
    title: "workspaces",
    links: [
      { label: "workspaceMine", href: "#top" },
      { label: "workspaceJoin", href: "#top" },
      { label: "workspaceCreate", href: "#top" },
      { label: "workspaceManagement", href: "#top" },
      { label: "workspaceLandingZone", href: "#top" },
      { label: "workspaceDeployment", href: "#top" }
    ]
  },
  {
    title: "resources",
    links: [
      { label: "resourceTraining", href: "#top" },
      { label: "resourceDocumentation", href: "#top" },
      { label: "resourceArchitecture", href: "#top" },
      { label: "resourceDemos", href: "#top" },
      { label: "resourceGovernance", href: "#top" },
      { label: "resourceFaqs", href: "#section-contact" }
    ]
  },
  {
    title: "support",
    links: [
      { label: "supportFeatures", href: "#top" },
      { label: "supportTeams", href: "#section-contact" },
      { label: "supportBugs", href: "#top" },
      { label: "supportDesk", href: "#top" },
      { label: "supportContact", href: "#section-contact" },
      { label: "supportIssues", href: "#top" }
    ]
  },
  {
    title: "developers",
    links: [
      { label: "developerDesign", href: "#top" },
      { label: "developerApis", href: "#top" },
      { label: "developerCicd", href: "#top" },
      { label: "developerPipelines", href: "#top" },
      { label: "developerDocs", href: "#top" },
      { label: "developerLabs", href: "#top" }
    ]
  },
  {
    title: "platform",
    links: [
      { label: "platformHome", href: "#top" },
      { label: "platformRoadmap", href: "#section-roadmap" },
      { label: "platformNews", href: "#section-updates" },
      { label: "platformReleases", href: "#top" },
      { label: "platformAccessibility", href: "#accessibility" },
      { label: "platformPrivacy", href: "#privacy" }
    ]
  }
] as const satisfies ReadonlyArray<{
  title: SitemapLabel;
  links: ReadonlyArray<{ label: SitemapLabel; href: string }>;
}>;

export function SiteFooter() {
  const { messages } = useI18n();
  const copy = messages.footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.sitemapIntro}>
          <h2 className={styles.sitemapTitle}>{copy.sitemapTitle}</h2>
          <p className={styles.sitemapDescription}>{copy.sitemapDescription}</p>
        </div>

        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <a className={styles.footerLogo} href="#top" aria-label={copy.homeAriaLabel}>
              <span className={styles.footerLogoMark}>T</span>
              <span className={styles.footerLogoName}>
                TDS <span>{copy.brandSuffix}</span>
              </span>
            </a>
            <p className={styles.footerTagline}>{copy.tagline}</p>
            <div className={styles.socialRow} aria-label={copy.socialAriaLabel}>
              <button className={styles.socialButton} type="button" aria-label="GitHub">
                <GithubIcon />
              </button>
              <button className={styles.socialButton} type="button" aria-label="LinkedIn">
                in
              </button>
              <button className={styles.socialButton} type="button" aria-label="Slack">
                #
              </button>
            </div>
          </div>

          <div className={styles.sitemapGrid}>
            {sitemap.map((column) => (
              <div key={column.title}>
                <div className={styles.sitemapColumnTitle}>{copy.sitemap[column.title]}</div>
                {column.links.map((link) => (
                  <a className={styles.sitemapLink} href={link.href} key={link.label}>
                    {copy.sitemap[link.label]}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerCopy}>
            © 2026 <strong>TDS Data Platform</strong>. {copy.allRightsReserved}
            <span className={styles.version}>{copy.version}</span>
          </p>
          <div className={styles.footerLinks}>
            <a href="#privacy">{copy.privacyPolicy}</a>
            <a href="#terms">{copy.termsOfService}</a>
            <a href="#accessibility">{copy.accessibility}</a>
            <a href="#cookies">{copy.cookieSettings}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12.02c0 4.42 2.87 8.18 6.84 9.5.5.1.68-.21.68-.48l-.01-1.7c-2.78.6-3.37-1.35-3.37-1.35-.45-1.16-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0112 6.84c.85 0 1.71.12 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86l-.01 2.75c0 .27.18.58.69.48A10.02 10.02 0 0022 12.02C22 6.48 17.52 2 12 2Z" />
    </svg>
  );
}
