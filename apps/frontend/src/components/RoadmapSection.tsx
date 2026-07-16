import { useMemo, useState } from "react";
import type {
  RoadmapItem,
  RoadmapProduct,
  RoadmapStatus
} from "@cms-demo/cms-contract/roadmap";
import type { RoadmapContentState } from "../cms/roadmap/useRoadmapContent";
import type { Messages } from "../i18n/catalog";
import { useI18n } from "../i18n/useI18n";
import styles from "../styles/TdsPage.module.css";

type ViewMode = "board" | "gantt";
type StatusFilter = "all" | RoadmapStatus;
type ProductFilter = "all" | RoadmapProduct;

const quarters = ["Q1", "Q2", "Q3", "Q4"] as const;
type RoadmapMessages = Messages["roadmap"];

export function RoadmapSection({ state }: { state: RoadmapContentState }) {
  const { locale, messages } = useI18n();
  const copy = messages.roadmap;
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState<ProductFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [view, setView] = useState<ViewMode>("board");

  const filteredItems = useMemo(() => {
    if (state.status !== "ready") return [];
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);

    return state.data.filter(
      (item) =>
        (product === "all" || item.product === product) &&
        (status === "all" || item.status === status) &&
        (!normalizedQuery || item.title.toLocaleLowerCase(locale).includes(normalizedQuery))
    );
  }, [locale, product, query, state, status]);

  return (
    <section className={styles.roadmapSection} id="section-roadmap">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{copy.title}</h2>
          <p className={styles.sectionDescription}>{copy.description}</p>
        </header>

        <div className={styles.roadmapToolbar} aria-label={copy.controlsLabel}>
          <label className={styles.searchControl}>
            <SearchIcon />
            <span hidden>{copy.searchLabel}</span>
            <input
              className={styles.searchInput}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              type="search"
              value={query}
            />
          </label>
          <select
            aria-label={copy.productFilterLabel}
            className={styles.filterSelect}
            onChange={(event) => setProduct(event.target.value as ProductFilter)}
            value={product}
          >
            <option value="all">{copy.products.all}</option>
            <option value="Platform">{copy.products.platform}</option>
            <option value="Databricks">{copy.products.databricks}</option>
            <option value="Dremio">{copy.products.dremio}</option>
            <option value="Data Lab">{copy.products.dataLab}</option>
          </select>
          <select
            aria-label={copy.statusFilterLabel}
            className={styles.filterSelect}
            onChange={(event) => setStatus(event.target.value as StatusFilter)}
            value={status}
          >
            <option value="all">{copy.statuses.all}</option>
            <option value="launched">{copy.statuses.launched}</option>
            <option value="in_progress">{copy.statuses.inProgress}</option>
            <option value="planned">{copy.statuses.planned}</option>
          </select>
          <div className={styles.toolbarSpacer} />
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${view === "board" ? styles.viewButtonActive : ""}`}
              onClick={() => setView("board")}
              type="button"
            >
              <BoardIcon /> {copy.boardView}
            </button>
            <button
              className={`${styles.viewButton} ${view === "gantt" ? styles.viewButtonActive : ""}`}
              onClick={() => setView("gantt")}
              type="button"
            >
              <GanttIcon /> {copy.ganttView}
            </button>
          </div>
        </div>

        {state.status === "loading" ? (
          <div className={styles.roadmapGrid} aria-label={copy.loadingLabel}>
            <div className={styles.loadingCard} />
            <div className={styles.loadingCard} />
          </div>
        ) : null}
        {state.status === "error" ? (
          <div className={styles.errorState} role="alert">
            {copy.loadError} {state.error}
          </div>
        ) : null}
        {state.status === "ready" && filteredItems.length === 0 ? (
          <div className={styles.emptyState}>{copy.empty}</div>
        ) : null}
        {state.status === "ready" && filteredItems.length > 0 && view === "board" ? (
          <RoadmapBoard allItems={state.data} copy={copy} items={filteredItems} />
        ) : null}
        {state.status === "ready" && filteredItems.length > 0 && view === "gantt" ? (
          <RoadmapGantt copy={copy} items={filteredItems} />
        ) : null}
      </div>
    </section>
  );
}

function RoadmapBoard({
  allItems,
  copy,
  items
}: {
  allItems: RoadmapItem[];
  copy: RoadmapMessages;
  items: RoadmapItem[];
}) {
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
                  {year > 2026 ? copy.upcoming : copy.inProgress}
                </span>
              </div>
              <div className={styles.progressRow}>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${percent}%` }} />
                </div>
                <span className={styles.progressLabel}>
                  {completed} / {yearItems.length} {copy.complete}
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
                      {copy.quarters[quarter].long}
                      <span className={styles.quarterProgress}>
                        <span
                          className={styles.quarterProgressFill}
                          style={{ display: "block", width: `${quarterPercent}%` }}
                        />
                      </span>
                    </div>
                    <div className={styles.roadmapItems}>
                      {visibleQuarterItems.map((item) => (
                        <RoadmapItemCard copy={copy} item={item} key={item.id} />
                      ))}
                      {visibleQuarterItems.length === 0 ? (
                        <span className={styles.progressLabel}>{copy.noMatchingItems}</span>
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

function RoadmapItemCard({ copy, item }: { copy: RoadmapMessages; item: RoadmapItem }) {
  const statusTone =
    item.status === "launched"
      ? styles.statusDone
      : item.status === "in_progress"
        ? styles.statusActive
        : "";
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
          <span className={`${styles.statusBadge} ${badgeTone}`}>
            {statusLabel(item.status, copy)}
          </span>
        </span>
      </div>
    </div>
  );
}

function RoadmapGantt({ copy, items }: { copy: RoadmapMessages; items: RoadmapItem[] }) {
  const years = [...new Set(items.map((item) => item.year))].sort();
  const columns = years.flatMap((year) => quarters.map((quarter) => ({ year, quarter })));

  return (
    <div className={styles.ganttWrap}>
      <table className={styles.ganttTable}>
        <thead>
          <tr>
            <th>{copy.initiative}</th>
            {columns.map(({ year, quarter }) => (
              <th key={`${year}-${quarter}`}>
                {year} {copy.quarters[quarter].short}
              </th>
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
                      {statusLabel(item.status, copy)}
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

function statusLabel(status: RoadmapStatus, copy: RoadmapMessages) {
  if (status === "launched") return copy.statuses.launched;
  if (status === "in_progress") return copy.statuses.inProgress;
  return copy.statuses.planned;
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
