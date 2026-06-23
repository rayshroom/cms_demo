import { useEffect, useMemo, useState } from "react";
import type { CmsSiteSlice, NewsListItem, NewsPost, RoadmapStatus } from "@cms-demo/cms-contract";
import { fetchNewsList, fetchNewsPost, fetchSiteSlice } from "./cmsClient";
import { RichText } from "./richText";

type Route = { name: "home" } | { name: "newsList" } | { name: "newsPost"; slug: string };

type LoadState<T> =
  | { status: "idle" | "loading"; data: null; error: null }
  | { status: "ready"; data: T; error: null }
  | { status: "error"; data: null; error: string };

const emptyState = { status: "idle", data: null, error: null } as const;

export function App() {
  const route = useHashRoute();

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#/">
          <span className="brand-mark">A</span>
          <span>Atlas Product Hub</span>
        </a>
        <nav aria-label="Primary">
          <a href="#/">Product</a>
          <a href="#/news">News</a>
          <a href="http://localhost:8787/admin" target="_blank" rel="noreferrer">
            CMS Editor
          </a>
        </nav>
      </header>

      {route.name === "home" ? <HomePage /> : null}
      {route.name === "newsList" ? <NewsListPage /> : null}
      {route.name === "newsPost" ? <NewsPostPage slug={route.slug} /> : null}
    </div>
  );
}

function HomePage() {
  const [siteState, setSiteState] = useState<LoadState<CmsSiteSlice>>({
    ...emptyState,
    status: "loading"
  });

  useEffect(() => {
    let mounted = true;
    fetchSiteSlice()
      .then((data) => mounted && setSiteState({ status: "ready", data, error: null }))
      .catch((error: Error) =>
        mounted && setSiteState({ status: "error", data: null, error: error.message })
      );
    return () => {
      mounted = false;
    };
  }, []);

  const featured = siteState.status === "ready" ? siteState.data.featuredNews[0] : null;

  return (
    <main>
      <section className="product-hero">
        <div className="hero-copy">
          <p className="kicker">Release Operations</p>
          <h1>Plan launches, publish updates, and keep the product narrative current.</h1>
          <p>
            Atlas keeps the durable product shell in the app while roadmap and editorial content
            come from the CMS API.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#/news">
              Open News
            </a>
            <a className="button secondary" href="http://localhost:8787/admin" target="_blank" rel="noreferrer">
              Edit Content
            </a>
          </div>
        </div>

        <div className="briefing-panel">
          <div className="briefing-image">
            {featured?.heroImageUrl ? <img src={featured.heroImageUrl} alt="" /> : null}
          </div>
          <div className="briefing-content">
            <p className="kicker">Latest Briefing</p>
            {featured ? (
              <>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <a href={`#/news/${featured.slug}`}>Read post</a>
              </>
            ) : (
              <p>Loading CMS content...</p>
            )}
          </div>
        </div>
      </section>

      <section className="metrics-band" aria-label="Product metrics">
        <Metric label="Active releases" value="12" />
        <Metric label="Customer segments" value="5" />
        <Metric label="CMS slots" value="3" />
      </section>

      {siteState.status === "loading" ? <LoadingBlock /> : null}
      {siteState.status === "error" ? <ErrorBlock message={siteState.error} /> : null}
      {siteState.status === "ready" ? (
        <>
          <RoadmapSection site={siteState.data} />
          <NewsRail news={siteState.data.featuredNews} />
        </>
      ) : null}
    </main>
  );
}

function RoadmapSection({ site }: { site: CmsSiteSlice }) {
  return (
    <section className="roadmap-section">
      <div className="section-heading">
        <p className="kicker">Roadmap</p>
        <h2>Product direction</h2>
      </div>
      <div className="roadmap-grid">
        {site.roadmap.map((item) => (
          <article className="roadmap-item" key={item.id}>
            <div className={`status-dot ${item.status}`} />
            <div>
              <div className="roadmap-meta">
                <span>{item.quarter}</span>
                <span>{statusLabel(item.status)}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NewsRail({ news }: { news: NewsListItem[] }) {
  return (
    <section className="news-rail">
      <div className="section-heading">
        <p className="kicker">News</p>
        <h2>Editorial updates</h2>
      </div>
      <div className="news-grid">
        {news.map((item) => (
          <NewsCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}

function NewsListPage() {
  const [state, setState] = useState<LoadState<NewsListItem[]>>({ ...emptyState, status: "loading" });

  useEffect(() => {
    let mounted = true;
    fetchNewsList()
      .then((data) => mounted && setState({ status: "ready", data, error: null }))
      .catch((error: Error) =>
        mounted && setState({ status: "error", data: null, error: error.message })
      );
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="content-page">
      <div className="page-title">
        <p className="kicker">News</p>
        <h1>Latest posts</h1>
      </div>
      {state.status === "loading" ? <LoadingBlock /> : null}
      {state.status === "error" ? <ErrorBlock message={state.error} /> : null}
      {state.status === "ready" ? (
        <div className="news-list">
          {state.data.map((item) => (
            <NewsCard item={item} key={item.id} />
          ))}
        </div>
      ) : null}
    </main>
  );
}

function NewsPostPage({ slug }: { slug: string }) {
  const [state, setState] = useState<LoadState<NewsPost>>({ ...emptyState, status: "loading" });

  useEffect(() => {
    let mounted = true;
    fetchNewsPost(slug)
      .then((data) => mounted && setState({ status: "ready", data, error: null }))
      .catch((error: Error) =>
        mounted && setState({ status: "error", data: null, error: error.message })
      );
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (state.status === "loading") {
    return (
      <main className="content-page">
        <LoadingBlock />
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main className="content-page">
        <ErrorBlock message={state.error} />
      </main>
    );
  }

  if (state.status !== "ready") {
    return null;
  }

  const post = state.data;
  return (
    <main className="post-page">
      <article>
        <header className="post-header">
          <a className="back-link" href="#/news">
            Back to news
          </a>
          <p className="kicker">{post.tags.join(" / ") || "News"}</p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="post-byline">
            <span>{post.author}</span>
            <span>{formatDate(post.publishedAt ?? post.updatedAt)}</span>
          </div>
        </header>
        {post.heroImageUrl ? <img className="post-hero-image" src={post.heroImageUrl} alt="" /> : null}
        <RichText blocks={post.body} />
      </article>
    </main>
  );
}

function NewsCard({ item }: { item: NewsListItem }) {
  return (
    <article className="news-card">
      {item.heroImageUrl ? <img src={item.heroImageUrl} alt="" /> : null}
      <div className="news-card-body">
        <div className="news-card-meta">
          <span>{item.tags[0] ?? "News"}</span>
          <span>{formatDate(item.publishedAt ?? item.updatedAt)}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        <a href={`#/news/${item.slug}`}>Read post</a>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{value}</span>
      <p>{label}</p>
    </div>
  );
}

function LoadingBlock() {
  return <div className="state-block">Loading CMS content...</div>;
}

function ErrorBlock({ message }: { message: string }) {
  return <div className="state-block error">CMS request failed: {message}</div>;
}

function useHashRoute(): Route {
  const [hash, setHash] = useState(window.location.hash || "#/");

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return useMemo(() => {
    const path = hash.replace(/^#/, "") || "/";
    if (path === "/news") {
      return { name: "newsList" };
    }
    if (path.startsWith("/news/")) {
      return { name: "newsPost", slug: decodeURIComponent(path.replace("/news/", "")) };
    }
    return { name: "home" };
  }, [hash]);
}

function statusLabel(status: RoadmapStatus) {
  if (status === "in_progress") {
    return "In progress";
  }
  return status[0].toUpperCase() + status.slice(1);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
