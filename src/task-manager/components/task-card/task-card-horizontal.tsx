"use client";

import { useState } from "react";
import type { TaskCardData } from "@/lib/task-card-types";
import { CATEGORY_COLORS } from "@/lib/task-card-types";
import { formatDate } from "@/lib/format-date";
import type { TaskStatus, TaskPriority } from "@/lib/mock-tasks";
import TaskCardImage from "./task-card-image";
import TaskCardCheckbox from "./task-card-checkbox";
import ProgressBar from "./progress-bar";
import { PriorityBadge, CategoryBadge, ProjectBadge } from "./task-card-badges";
import { StatusToggle, PriorityToggle } from "./status-priority-toggle";

type TaskCardHorizontalProps = {
  task: TaskCardData;
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onPriorityChange?: (id: string, priority: TaskPriority) => void;
  onComplete?: (id: string, completed: boolean) => void;
};

/**
 * Version A — Horizontal Layout
 *
 * Wide card with image on the left, content in the center, and
 * status/priority toggles on the right. Closest to the reference design.
 */
export default function TaskCardHorizontal({
  task,
  onStatusChange,
  onPriorityChange,
  onComplete,
}: TaskCardHorizontalProps) {
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const isCompleted = status === "Done";

  const categoryColors = CATEGORY_COLORS[task.category];

  function handleStatusChange(newStatus: TaskStatus) {
    setStatus(newStatus);
    onStatusChange?.(task.id, newStatus);
  }

  function handlePriorityChange(newPriority: TaskPriority) {
    setPriority(newPriority);
    onPriorityChange?.(task.id, newPriority);
  }

  function handleCheckbox(checked: boolean) {
    const newStatus = checked ? "Done" : "In progress";
    setStatus(newStatus as TaskStatus);
    onStatusChange?.(task.id, newStatus as TaskStatus);
    onComplete?.(task.id, checked);
  }

  return (
    <article
      className="group relative rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] transition-all hover:border-[var(--muted)]/30 hover:shadow-lg"
      style={{
        borderLeftWidth: "3px",
        borderLeftColor: categoryColors.accent,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-7 top-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${categoryColors.accent}, transparent)`,
        }}
      />

      <div className="flex items-stretch">
        {/* Left: Image area */}
        <div className="flex items-center gap-3 p-4">
          <TaskCardCheckbox
            checked={isCompleted}
            onChange={handleCheckbox}
            className="self-start mt-[0.5rem]"
          />
          <div className="flex flex-col items-center gap-3">
            <TaskCardImage
              category={task.category}
              imageUrl={task.imageUrl}
              title={task.title}
              size="lg"
            />
            <CategoryBadge category={task.category} />
          </div>
        </div>

        {/* Center: Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-4 pr-4">
          {/* Top row: title */}
          <div>
            <h3
              className={`text-lg font-semibold leading-snug ${
                isCompleted
                  ? "text-[var(--muted)] line-through"
                  : "text-[var(--foreground)]"
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className="mt-1 line-clamp-1 text-xs text-[var(--muted)]">
                {task.description}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <PriorityBadge priority={priority} />
            <ProjectBadge project={task.project} />
          </div>

          {/* Bottom row: progress + meta */}
          <div className="mt-[0.2rem]">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
                Progress
              </span>
              <span className="text-xs font-bold">
                {task.progress}%
              </span>
            </div>
            <ProgressBar value={task.progress} />

            <div className="mt-2.5 flex items-center gap-4 text-[0.65rem] text-[var(--muted)]">
              <span className="inline-flex items-center gap-1">
                <ItemsIcon />
                {task.itemCount} items
              </span>
              <span className="inline-flex items-center gap-1">
                <LogsIcon />
                {task.logCount} logs
              </span>
              {task.startedOn && (
                <span className="inline-flex items-center gap-1">
                  <CalendarIcon />
                  Started {formatDate(task.startedOn)}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <CalendarIcon />
                Due {formatDate(task.dueOn)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Toggles */}
        <div className="flex flex-col items-end justify-center gap-[1rem] border-l border-[var(--border-color)] p-4">
          <PriorityToggle value={priority} onChange={handlePriorityChange} />
          <StatusToggle value={status} onChange={handleStatusChange} />
        </div>
      </div>
    </article>
  );
}

// ── Inline micro-icons ───────────────────────────────────────────────────────

function ItemsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="7" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7" y="7" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function LogsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 3h8M2 6h6M2 9h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1.5" y="2.5" width="9" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.5 5h9" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
