import styles from "../styles/TdsPage.module.css";

const sitemap = [
  ["Products", "Databricks", "Data Labs", "Dremio", "AI Services", "Platform Status"],
  [
    "Workspaces",
    "My Workspaces",
    "Join a Workspace",
    "Create Workspace",
    "Workspace Management",
    "Landing Zone (ADLS)",
    "Deployment Services"
  ],
  [
    "Resources",
    "Training & Learning Paths",
    "Documentation",
    "Architecture Guides",
    "Demos & Walkthroughs",
    "Governance Playbooks",
    "FAQs"
  ],
  ["Support", "Feature Requests", "MS Teams Support", "Bug Reports", "Service Desk", "Contact Support", "Known Issues"],
  ["Developers", "Design System v1.1", "APIs & SDKs", "CI/CD Integrations", "Deployment Pipelines", "Developer Docs", "Data Labs Access"],
  ["Platform", "Home", "Roadmap", "News & Updates", "Release Notes", "Accessibility", "Privacy & Terms"]
] as const;

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.sitemapIntro}>
          <h2 className={styles.sitemapTitle}>Site Map</h2>
          <p className={styles.sitemapDescription}>
            Browse all platform pages, products, tools, and resources through a structured
            navigation overview.
          </p>
        </div>

        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <a className={styles.footerLogo} href="#top" aria-label="TDS Data Platform home">
              <span className={styles.footerLogoMark}>T</span>
              <span className={styles.footerLogoName}>
                TDS <span>Data Platform</span>
              </span>
            </a>
            <p className={styles.footerTagline}>
              Enterprise data &amp; AI workflows from a unified ecosystem designed for scale.
            </p>
            <div className={styles.socialRow} aria-label="Social channels">
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
            {sitemap.map(([title, ...links]) => (
              <div key={title}>
                <div className={styles.sitemapColumnTitle}>{title}</div>
                {links.map((link) => (
                  <a className={styles.sitemapLink} href={hrefFor(link)} key={link}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerCopy}>
            © 2026 <strong>TDS Data Platform</strong>. All rights reserved.
            <span className={styles.version}>v0.37.2 · July 14, 2026 · 12:52 PM EST</span>
          </p>
          <div className={styles.footerLinks}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#accessibility">Accessibility</a>
            <a href="#cookies">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function hrefFor(label: string) {
  if (label === "Roadmap") return "#section-roadmap";
  if (label === "News & Updates") return "#section-updates";
  if (label === "MS Teams Support" || label === "Contact Support" || label === "FAQs") {
    return "#section-contact";
  }
  return "#top";
}

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12.02c0 4.42 2.87 8.18 6.84 9.5.5.1.68-.21.68-.48l-.01-1.7c-2.78.6-3.37-1.35-3.37-1.35-.45-1.16-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0112 6.84c.85 0 1.71.12 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86l-.01 2.75c0 .27.18.58.69.48A10.02 10.02 0 0022 12.02C22 6.48 17.52 2 12 2Z" />
    </svg>
  );
}
