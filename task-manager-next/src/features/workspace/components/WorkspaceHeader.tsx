"use client";

import type { ThemeMode } from "@/features/theme/constants";
import type { TaskStats } from "@/features/tasks/types/task";

type WorkspaceHeaderProps = {
  stats: TaskStats;
  theme: ThemeMode;
  onCreateTask: () => void;
  onToggleTheme: () => void;
};

const statItems = [
  { key: "total", label: "Total" },
  { key: "open", label: "Open" },
  { key: "dueSoon", label: "Due soon" },
  { key: "overdue", label: "Overdue" },
] as const;

const statToneClasses = {
  total: "before:bg-[var(--accent)]",
  open: "before:bg-[var(--low)]",
  dueSoon: "before:bg-[var(--medium)]",
  overdue: "before:bg-[var(--high)]",
} as const;

export function WorkspaceHeader({
  stats,
  theme,
  onCreateTask,
  onToggleTheme,
}: WorkspaceHeaderProps) {
  return (
    <header className="sticky top-0 z-30 px-3 pt-3">
      <div className="rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] px-4 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-[18px] sm:px-5 lg:px-6">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
          <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                TaskManager MVP
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-[22px] font-bold tracking-[-0.03em] text-[color:color-mix(in_srgb,var(--text)_88%,var(--accent-h)_12%)]">
                  Task <span className="text-[var(--accent)]">Manager</span>
                </h1>
                <span className="rounded-full border border-[rgba(20,184,166,0.22)] bg-[rgba(20,184,166,0.12)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:#0f766e] dark:text-[color:#99f6e4]">
                  Client workspace
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-[13px] leading-6 text-[var(--text-muted)]">
                Stay inside one focused flow: scan cards, complete work quickly,
                and keep the active task visible without losing context.
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-2 gap-2 md:grid-cols-4">
              {statItems.map((item) => (
                <div
                  key={item.key}
                  className={`relative overflow-hidden rounded-[18px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3.5 py-3 text-[var(--text-muted)] before:absolute before:left-3 before:right-3 before:top-0 before:h-[2px] ${statToneClasses[item.key]}`}
                >
                  <div className="text-[9px] font-bold uppercase tracking-[0.08em]">
                    {item.label}
                  </div>
                  <div className="mt-1 text-[22px] font-bold leading-none text-[var(--text)]">
                    {stats[item.key]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 xl:justify-end">
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[14px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[color:color-mix(in_srgb,var(--text-muted)_74%,var(--text)_26%)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <button
              type="button"
              onClick={onCreateTask}
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent-h)_24%,var(--accent)),var(--accent))] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-white shadow-[0_10px_24px_rgba(91,125,255,0.28)] transition hover:-translate-y-px hover:brightness-110"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New task
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
