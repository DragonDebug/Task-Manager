"use client";

import {
  SORT_MODE_LABELS,
  VIEW_MODE_LABELS,
} from "@/features/tasks/lib/task-constants";
import { TASK_PRIORITIES, TASK_STATUSES, TASK_VIEW_MODES, type TaskFilters, type TaskSortMode, type TaskViewMode } from "@/features/tasks/types/task";

type WorkspaceFiltersProps = {
  categories: string[];
  filters: TaskFilters;
  hideDone: boolean;
  sortMode: TaskSortMode;
  viewMode: TaskViewMode;
  onFiltersChange: (nextFilters: Partial<TaskFilters>) => void;
  onHideDoneChange: (hideDone: boolean) => void;
  onSortModeChange: (sortMode: TaskSortMode) => void;
  onViewModeChange: (viewMode: TaskViewMode) => void;
  onReset: () => void;
};

const fieldClassName =
  "min-h-9 min-w-0 rounded-[10px] border border-[color:var(--border)] bg-[linear-gradient(180deg,var(--field-bg-strong),var(--field-bg))] px-3 text-[12px] text-[var(--text)] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--focus-ring)]";

const viewModeAccentClasses: Record<TaskViewMode, string> = {
  default: "border-[color:color-mix(in_srgb,var(--accent)_30%,var(--border))] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent)_14%,var(--surface2)),color-mix(in_srgb,var(--accent)_7%,var(--surface)))] text-[color:color-mix(in_srgb,var(--text)_80%,var(--accent)_20%)]",
  compact: "border-[rgba(20,184,166,0.32)] bg-[linear-gradient(180deg,rgba(20,184,166,0.16),rgba(20,184,166,0.08))] text-[color:color-mix(in_srgb,var(--text)_86%,#14b8a6_14%)]",
  table: "border-[rgba(245,158,11,0.32)] bg-[linear-gradient(180deg,rgba(245,158,11,0.16),rgba(245,158,11,0.08))] text-[color:color-mix(in_srgb,var(--text)_86%,#f59e0b_14%)]",
};

function formatOptionLabel(value: string) {
  return value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function WorkspaceFilters({
  categories,
  filters,
  hideDone,
  sortMode,
  viewMode,
  onFiltersChange,
  onHideDoneChange,
  onSortModeChange,
  onViewModeChange,
  onReset,
}: WorkspaceFiltersProps) {
  return (
    <section className="sticky top-[100px] z-20 px-3 pt-3">
      <div className="flex flex-col gap-3 rounded-[24px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[16px] xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 xl:flex-row xl:items-center xl:gap-2.5">
          <span className="shrink-0 pl-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[color:color-mix(in_srgb,var(--text-muted)_68%,var(--accent)_32%)]">
            Focus view
          </span>
          <input
            className={`${fieldClassName} flex-[1_1_320px]`}
            value={filters.search}
            placeholder="Search title, owner, description, notes, or project"
            onChange={(event) => onFiltersChange({ search: event.target.value })}
          />

          <select
            className={`${fieldClassName} xl:basis-[150px]`}
            value={filters.category}
            onChange={(event) => onFiltersChange({ category: event.target.value })}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className={`${fieldClassName} xl:basis-[150px]`}
            value={filters.priority}
            onChange={(event) => onFiltersChange({ priority: event.target.value })}
          >
            <option value="">All priorities</option>
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {formatOptionLabel(priority)}
              </option>
            ))}
          </select>

          <select
            className={`${fieldClassName} xl:basis-[150px]`}
            value={filters.status}
            onChange={(event) => onFiltersChange({ status: event.target.value })}
          >
            <option value="">All statuses</option>
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {formatOptionLabel(status)}
              </option>
            ))}
          </select>

          <select
            className={`${fieldClassName} xl:basis-[150px]`}
            value={sortMode}
            onChange={(event) => onSortModeChange(event.target.value as TaskSortMode)}
          >
            {Object.entries(SORT_MODE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                Sort: {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between xl:justify-end">
          <div className="inline-flex w-fit items-center gap-1 rounded-[16px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-[4px]">
            {TASK_VIEW_MODES.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onViewModeChange(mode)}
                className={`inline-flex min-h-[34px] items-center justify-center rounded-[12px] border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.06em] transition ${
                  viewMode === mode
                    ? viewModeAccentClasses[mode]
                    : "border-transparent text-[color:color-mix(in_srgb,var(--text-muted)_78%,var(--text)_22%)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
                }`}
              >
                {VIEW_MODE_LABELS[mode]}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => onHideDoneChange(!hideDone)}
              className={`inline-flex min-h-10 items-center justify-center rounded-[12px] border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] transition ${
                hideDone
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]"
                  : "border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] text-[color:color-mix(in_srgb,var(--text-muted)_78%,var(--text)_22%)] hover:-translate-y-px hover:border-[var(--accent)] hover:text-[var(--text)]"
              }`}
            >
              {hideDone ? "Show Completed" : "Hide Completed"}
            </button>

            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[color:color-mix(in_srgb,var(--text-muted)_78%,var(--text)_22%)] transition hover:-translate-y-px hover:border-[var(--accent)] hover:text-[var(--text)]"
            >
              Reset View
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}