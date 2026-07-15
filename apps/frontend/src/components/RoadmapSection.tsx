import { useMemo, useState } from "react";
import type {
  RoadmapItem,
  RoadmapProduct,
  RoadmapQuarter,
  RoadmapStatus
} from "@cms-demo/cms-contract/roadmap";
import type { RoadmapContentState } from "../cms/roadmap/useRoadmapContent";
import styles from "../styles/TdsPage.module.css";

type ViewMode = "board" | "gantt";
type StatusFilter = "all" | RoadmapStatus;
type ProductFilter = "all" | RoadmapProduct;

const quarterLabels: Record<RoadmapQuarter, string> = {
  Q1: "Q1 · Jan – Mar",
  Q2: "Q2 · Apr – Jun",
  Q3: "Q3 · Jul – Sep",
  Q4: "Q4 · Oct – Dec"
};

const quarters = ["Q1", "Q2", "Q3", "Q4"] as const;

export function RoadmapSection({ state }: { state: RoadmapContentState }) {
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState<ProductFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [view, setView] = useState<ViewMode>("board");

  const filteredItems = useMemo(() => {
    if (state.status !== "ready") return [];
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return state.data.filter(
      (item) =>
        (product === "all" || item.product === product) &&
        (status === "all" || item.status === status) &&
        (!normalizedQuery || item.title.toLocaleLowerCase().includes(normalizedQuery))
    );
  }, [product, query, state, status]);

  return (
    <section className={styles.roadmapSection} id="section-roadmap">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Roadmap</h2>
          <p className={styles.sectionDescription}>
            Track platform improvements, product releases, and upcoming capabilities across the TDS
            ecosystem.
          </p>
        </header>

        <div className={styles.roadmapToolbar} aria-label="Roadmap controls">
          <label className={styles.searchControl}>
            <SearchIcon />
            <span hidden>Search roadmap</span>
            <input
              className={styles.searchInput}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search roadmap…"
              type="search"
              value={query}
            />
          </label>
          <select
            aria-label="Filter by product"
            className={styles.filterSelect}
            onChange={(event) => setProduct(event.target.value as ProductFilter)}
            value={product}
          >
            <option value="all">All products</option>
            <option value="Platform">Platform</option>
            <option value="Databricks">Databricks</option>
            <option value="Dremio">Dremio</option>
            <option value="Data Lab">Data Lab</option>
          </select>
          <select
            aria-label="Filter by status"
            className={styles.filterSelect}
            onChange={(event) => setStatus(event.target.value as StatusFilter)}
            value={status}
          >
            <option value="all">All statuses</option>
            <option value="launched">Done</option>
            <option value="in_progress">In Progress</option>
            <option value="planned">Planned</option>
          </select>
          <div className={styles.toolbarSpacer} />
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${view === "board" ? styles.viewButtonActive : ""}`}
              onClick={() => setView("board")}
              type="button"
            >
              <BoardIcon /> Card view
            </button>
            <button
              className={`${styles.viewButton} ${view === "gantt" ? styles.viewButtonActive : ""}`}
              onClick={() => setView("gantt")}
              type="button"
            >
              <GanttIcon /> Gantt
            </button>
          </div>
        </div>

        {state.status === "loading" ? (
          <div className={styles.roadmapGrid} aria-label="Loading roadmap">
            <div className={styles.loadingCard} />
            <div className={styles.loadingCard} />
          </div>
        ) : null}
        {state.status === "error" ? (
          <div className={styles.errorState} role="alert">
            Roadmap content could not be loaded. {state.error}
          </div>
        ) : null}
        {state.status === "ready" && filteredItems.length === 0 ? (
          <div className={styles.emptyState}>No roadmap items match the selected filters.</div>
        ) : null}
        {state.status === "ready" && filteredItems.length > 0 && view === "board" ? (
          <RoadmapBoard allItems={state.data} items={filteredItems} />
        ) : null}
        {state.status === "ready" && filteredItems.length > 0 && view === "gantt" ? (
          <RoadmapGantt items={filteredItems} />
        ) : null}
      </div>
    </section>
  );
}

function RoadmapBoard({ allItems, items }: { allItems: RoadmapItem[]; items: RoadmapItem[] }) {
  const years = [...new Set(allItems.map((item) => item.year))].sort();

  return (
    <div className={styles.roadmapGrid}>
      {years.map((year) => {
        const yearItems = allItems.filter((item) => item.year === year);
        const visibleYearItems = items.filter((item) => item.year === year);
        const completed = yearItems.filter((item) => item.status === "launched").length;
        const percent = Math.round((completed / yearItems.length) * 100) || 0;

        return (
          <article className={styles.roadmapYear} key={year}>
            <header className={styles.yearHeader}>
              <div className={styles.yearHeaderTop}>
                <span className={styles.yearLabel}>{year}</span>
                <span
                  className={`${styles.yearBadge} ${year > 2026 ? styles.yearBadgeUpcoming : ""}`}
                >
                  {year > 2026 ? "Upcoming" : "In Progress"}
                </span>
              </div>
              <div className={styles.progressRow}>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${percent}%` }} />
                </div>
                <span className={styles.progressLabel}>
                  {completed} / {yearItems.length} complete
                </span>
              </div>
            </header>
            <div className={styles.quarters}>
              {quarters.map((quarter) => {
                const allQuarterItems = yearItems.filter((item) => item.quarter === quarter);
                const visibleQuarterItems = visibleYearItems.filter(
                  (item) => item.quarter === quarter
                );
                const quarterDone = allQuarterItems.filter(
                  (item) => item.status === "launched"
                ).length;
                const quarterPercent = Math.round(
                  (quarterDone / Math.max(allQuarterItems.length, 1)) * 100
                );

                return (
                  <section className={styles.quarter} key={quarter}>
                    <div className={styles.quarterLabel}>
                      {quarterLabels[quarter]}
                      <span className={styles.quarterProgress}>
                        <span
                          className={styles.quarterProgressFill}
                          style={{ display: "block", width: `${quarterPercent}%` }}
                        />
                      </span>
                    </div>
                    <div className={styles.roadmapItems}>
                      {visibleQuarterItems.map((item) => (
                        <RoadmapItemCard item={item} key={item.id} />
                      ))}
                      {visibleQuarterItems.length === 0 ? (
                        <span className={styles.progressLabel}>No matching items</span>
                      ) : null}
                    </div>
                  </section>
                );
              })}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function RoadmapItemCard({ item }: { item: RoadmapItem }) {
  const statusTone =
    item.status === "launched" ? styles.statusDone : item.status === "in_progress" ? styles.statusActive : "";
  const badgeTone =
    item.status === "launched"
      ? styles.statusBadgeDone
      : item.status === "in_progress"
        ? styles.statusBadgeActive
        : "";

  return (
    <div className={styles.roadmapItem}>
      <span className={`${styles.statusStripe} ${statusTone}`} />
      <div className={styles.roadmapItemBody}>
        <span className={styles.roadmapItemTitle}>{item.title}</span>
        <span className={styles.roadmapItemMeta}>
          <span className={styles.productBadge}>{item.product}</span>
          <span className={`${styles.statusBadge} ${badgeTone}`}>{statusLabel(item.status)}</span>
        </span>
      </div>
    </div>
  );
}

function RoadmapGantt({ items }: { items: RoadmapItem[] }) {
  const years = [...new Set(items.map((item) => item.year))].sort();
  const columns = years.flatMap((year) => quarters.map((quarter) => ({ year, quarter })));

  return (
    <div className={styles.ganttWrap}>
      <table className={styles.ganttTable}>
        <thead>
          <tr>
            <th>Initiative</th>
            {columns.map(({ year, quarter }) => (
              <th key={`${year}-${quarter}`}>{year} {quarter}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <div className={styles.ganttItemName}>{item.title}</div>
                <span className={styles.productBadge}>{item.product}</span>
              </td>
              {columns.map(({ year, quarter }) => (
                <td key={`${item.id}-${year}-${quarter}`}>
                  {item.year === year && item.quarter === quarter ? (
                    <div
                      className={`${styles.ganttBar} ${
                        item.status === "launched"
                          ? styles.ganttBarDone
                          : item.status === "in_progress"
                            ? styles.ganttBarActive
                            : ""
                      }`}
                    >
                      {statusLabel(item.status)}
                    </div>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function statusLabel(status: RoadmapStatus) {
  if (status === "launched") return "Done";
  if (status === "in_progress") return "In Progress";
  return "Planned";
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" />
      <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" />
      <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" />
      <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" />
    </svg>
  );
}

function GanttIcon() {
  return (
    <svg width="14" height="13" viewBox="0 0 15 14" fill="none" aria-hidden="true">
      <path d="M1 3h8M5 7h9M2 11h7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}
