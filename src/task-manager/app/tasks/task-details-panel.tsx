"use client";

import type { TaskCardData } from "@/lib/task-card-types";
import { PRIORITY_COLORS, CATEGORY_COLORS } from "@/lib/task-card-types";
import TaskCardImage from "@/components/task-card/task-card-image";
import {
  PriorityBadge,
  CategoryBadge,
  ProjectBadge,
} from "@/components/task-card/task-card-badges";
import ProgressBar from "@/components/task-card/progress-bar";

type TaskDetailsPanelProps = {
  task: TaskCardData;
  onClose: () => void;
};

const STATUS_DOT_COLORS: Record<string, string> = {
  Backlog: "#64748b",
  Pending: "#eab308",
  Ready: "#06b6d4",
  "In progress": "#3b82f6",
  Blocked: "#ef4444",
  "In review": "#a855f7",
  Done: "#22c55e",
};

export default function TaskDetailsPanel({
  task,
  onClose,
}: TaskDetailsPanelProps) {
  const priorityColors = PRIORITY_COLORS[task.priority];

  return (
    <div className="sticky top-6 flex flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--surface-elevated)] shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[var(--border-color)] px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted)]">
          Task Details
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
          aria-label="Close details"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 3l8 8M11 3l-8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="space-y-6">
          {/* Image + Title */}
          <div className="flex items-start gap-4">
            <TaskCardImage
              category={task.category}
              imageUrl={task.imageUrl}
              title={task.title}
              size="md"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold leading-snug text-[var(--foreground)]">
                {task.title}
              </h3>
              {task.description && (
                <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={task.category} />
            <PriorityBadge priority={task.priority} />
            <ProjectBadge project={task.project} />
          </div>

          {/* Status */}
          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
              Status
            </p>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    STATUS_DOT_COLORS[task.status] ?? "#64748b",
                }}
              />
              <span className="text-sm text-[var(--foreground)]">
                {task.status}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
                Progress
              </span>
              <span
                className="text-xs font-bold"
                style={{ color: priorityColors.dot }}
              >
                {task.progress}%
              </span>
            </div>
            <ProgressBar value={task.progress} color={priorityColors.dot} />
          </div>

          {/* Dates */}
          <div className="space-y-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
              Dates
            </p>
            <div className="grid grid-cols-2 gap-3">
              <DateItem label="Created" value={task.createdOn} />
              <DateItem label="Due" value={task.dueOn} />
              {task.startedOn && (
                <DateItem label="Started" value={task.startedOn} />
              )}
              {task.completedOn && (
                <DateItem label="Completed" value={task.completedOn} />
              )}
            </div>
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-6 rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-4 py-3">
            <MetricItem label="Items" value={task.itemCount} />
            <MetricItem label="Logs" value={task.logCount} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function DateItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.6rem] font-medium uppercase tracking-wider text-[var(--muted)]">
        {label}
      </p>
      <p className="text-xs font-medium text-[var(--foreground)]">{value}</p>
    </div>
  );
}

function MetricItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold text-[var(--foreground)]">{value}</p>
      <p className="text-[0.6rem] font-medium uppercase tracking-wider text-[var(--muted)]">
        {label}
      </p>
    </div>
  );
}
