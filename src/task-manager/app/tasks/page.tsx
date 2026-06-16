"use client";

import { useState, useMemo } from "react";
import type { TaskCardData, TaskCategory } from "@/lib/task-card-types";
import type { TaskStatus, TaskPriority } from "@/lib/mock-tasks";
import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  CATEGORY_OPTIONS,
  sampleTasks,
} from "@/lib/task-card-types";
import {
  TaskCardHorizontal,
  TaskCardVertical,
  TaskCardMinimal,
} from "@/components/task-card";
import NewTaskForm from "@/components/popup/new-task-form";
import type { NewTaskFormData } from "@/components/popup/new-task-form";
import TaskDetailsPanel from "./task-details-panel";

// ── View types ───────────────────────────────────────────────────────────────

type CardView = "horizontal" | "vertical" | "minimal";

const VIEW_META: { id: CardView; label: string }[] = [
  { id: "horizontal", label: "Horizontal" },
  { id: "vertical", label: "Grid" },
  { id: "minimal", label: "Minimal" },
];

// ── Filters ──────────────────────────────────────────────────────────────────

type Filters = {
  search: string;
  status: TaskStatus | "";
  priority: TaskPriority | "";
  category: TaskCategory | "";
};

const INITIAL_FILTERS: Filters = {
  search: "",
  status: "",
  priority: "",
  category: "",
};

function applyFilters(
  tasks: TaskCardData[],
  filters: Filters,
): TaskCardData[] {
  const query = filters.search.toLowerCase().trim();

  return tasks.filter((task) => {
    if (query) {
      const hay = [
        task.title,
        task.description,
        task.project,
        task.status,
        task.priority,
        task.category,
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(query)) return false;
    }
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (filters.category && task.category !== filters.category) return false;
    return true;
  });
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TasksPage() {
  const [view, setView] = useState<CardView>("horizontal");
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showNewTask, setShowNewTask] = useState(false);

  const filteredTasks = useMemo(
    () => applyFilters(sampleTasks, filters),
    [filters],
  );

  const selectedTask = useMemo(
    () => sampleTasks.find((t) => t.id === selectedTaskId) ?? null,
    [selectedTaskId],
  );

  function updateFilter<K extends keyof Filters>(
    key: K,
    value: Filters[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleNewTaskSubmit(data: NewTaskFormData) {
    console.log("New task:", data);
  }

  const hasActiveFilters =
    filters.search || filters.status || filters.priority || filters.category;

  return (
    <main className="mx-auto flex w-full max-w-full flex-1 flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Tasks
        </h1>

        <div className="flex items-center gap-2">
          {/* View switcher */}
          <ViewSwitcher current={view} onChange={setView} />

          {/* New Task button */}
          <button
            type="button"
            onClick={() => setShowNewTask(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
          >
            <PlusIcon />
            New Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] max-w-sm flex-1">
          <SearchIcon />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--surface)] py-2 pl-9 pr-3 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none"
          />
        </div>

        <FilterDropdown
          label="Status"
          value={filters.status}
          options={STATUS_OPTIONS}
          onChange={(v) => updateFilter("status", v as TaskStatus | "")}
        />
        <FilterDropdown
          label="Priority"
          value={filters.priority}
          options={PRIORITY_OPTIONS}
          onChange={(v) => updateFilter("priority", v as TaskPriority | "")}
        />
        <FilterDropdown
          label="Category"
          value={filters.category}
          options={CATEGORY_OPTIONS}
          onChange={(v) => updateFilter("category", v as TaskCategory | "")}
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => setFilters(INITIAL_FILTERS)}
            className="cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
          >
            Clear filters
          </button>
        )}

        <span className="ml-auto text-xs text-[var(--muted)]">
          {filteredTasks.length} task
          {filteredTasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Content: card list + details panel */}
      <div className="flex flex-1 gap-4">
        <div
          className={
            "min-w-0 flex-1" + (selectedTask ? " max-w-[50%]" : "")
          }
        >
          {filteredTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <CardList
              tasks={filteredTasks}
              view={view}
              selectedId={selectedTaskId}
              onSelect={setSelectedTaskId}
            />
          )}
        </div>

        {selectedTask && (
          <div className="w-[50%] min-w-[340px] shrink-0">
            <TaskDetailsPanel
              task={selectedTask}
              onClose={() => setSelectedTaskId(null)}
            />
          </div>
        )}
      </div>

      {/* New Task popup */}
      <NewTaskForm
        open={showNewTask}
        onClose={() => setShowNewTask(false)}
        onSubmit={handleNewTaskSubmit}
        viewMode="single"
      />
    </main>
  );
}

// ── View switcher ────────────────────────────────────────────────────────────

function ViewSwitcher({
  current,
  onChange,
}: {
  current: CardView;
  onChange: (v: CardView) => void;
}) {
  const btnBase =
    "flex cursor-pointer items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors";
  const btnActive = "bg-[var(--accent)] text-[var(--accent-foreground)]";
  const btnIdle = "text-[var(--muted)] hover:text-[var(--foreground)]";

  return (
    <div className="flex items-center rounded-lg border border-[var(--border-color)] bg-[var(--surface)]">
      {VIEW_META.map((opt, i) => {
        const isFirst = i === 0;
        const isLast = i === VIEW_META.length - 1;
        const radius = isFirst
          ? " rounded-l-lg"
          : isLast
            ? " rounded-r-lg"
            : "";
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            title={opt.label}
            className={
              btnBase +
              radius +
              " " +
              (current === opt.id ? btnActive : btnIdle)
            }
          >
            {opt.id === "horizontal" && <HorizontalIcon />}
            {opt.id === "vertical" && <GridIcon />}
            {opt.id === "minimal" && <MinimalIcon />}
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Card list ────────────────────────────────────────────────────────────────

function CardList({
  tasks,
  view,
  selectedId,
  onSelect,
}: {
  tasks: TaskCardData[];
  view: CardView;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  function wrap(id: string) {
    const ring =
      selectedId === id ? " ring-2 ring-[var(--accent)] rounded-2xl" : "";
    return "cursor-pointer transition-shadow" + ring;
  }

  if (view === "vertical") {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {tasks.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={wrap(t.id)}
          >
            <TaskCardVertical task={t} />
          </div>
        ))}
      </div>
    );
  }

  if (view === "minimal") {
    return (
      <div className="space-y-2">
        {tasks.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={wrap(t.id)}
          >
            <TaskCardMinimal task={t} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((t) => (
        <div
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={wrap(t.id)}
        >
          <TaskCardHorizontal task={t} />
        </div>
      ))}
    </div>
  );
}

// ── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] px-6 py-16">
      <p className="text-sm text-[var(--muted)]">
        No tasks match the current filters.
      </p>
    </div>
  );
}

// ── Filter dropdown ──────────────────────────────────────────────────────────

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="cursor-pointer rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] focus:border-[var(--accent)]/40 focus:outline-none"
    >
      <option value="">All {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
    >
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M9.5 9.5L12.5 12.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 3v8M3 7h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HorizontalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="1" y="2" width="12" height="4" rx="1"
        stroke="currentColor" strokeWidth="1.2"
      />
      <rect
        x="1" y="8" width="12" height="4" rx="1"
        stroke="currentColor" strokeWidth="1.2"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function MinimalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M2 3h10M2 7h10M2 11h10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
       />
    </svg>
  );
}
