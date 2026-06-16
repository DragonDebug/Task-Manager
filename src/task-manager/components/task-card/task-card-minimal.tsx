"use client";

import { useState } from "react";
import type { TaskCardData } from "@/lib/task-card-types";
import { PRIORITY_COLORS, CATEGORY_COLORS } from "@/lib/task-card-types";
import { formatDate } from "@/lib/format-date";
import type { TaskStatus, TaskPriority } from "@/lib/mock-tasks";
import TaskCardCheckbox from "./task-card-checkbox";
import ProgressBar from "./progress-bar";
import { PriorityBadge, CategoryBadge, ProjectBadge } from "./task-card-badges";
import { StatusToggle, PriorityToggle } from "./status-priority-toggle";

type TaskCardMinimalProps = {
  task: TaskCardData;
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onPriorityChange?: (id: string, priority: TaskPriority) => void;
  onComplete?: (id: string, completed: boolean) => void;
};

/**
 * Version C — Minimal Accent Card
 *
 * Clean data-dense layout with a bold left accent bar.
 * No image area — all about the information. Feels like a refined list item.
 */
export default function TaskCardMinimal({
  task,
  onStatusChange,
  onPriorityChange,
  onComplete,
}: TaskCardMinimalProps) {
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const isCompleted = status === "Done";

  const priorityColors = PRIORITY_COLORS[priority];
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
      className="group relative flex overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface)] transition-all hover:border-[var(--muted)]/30 hover:shadow-md"
    >
      {/* Left accent bar */}
      <div
        className="w-1.5 shrink-0 rounded-l-xl"
        style={{
          background: `linear-gradient(180deg, ${categoryColors.accent})`,
        }}
      />

      <div className="flex flex-1 items-center gap-4 px-4 py-3.5">
        {/* Checkbox */}
        <TaskCardCheckbox
          checked={isCompleted}
          onChange={handleCheckbox}
          size="sm"
        />

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex items-center gap-2">
            <h3
              className={`truncate text-md font-semibold min-w-[20rem] ${
                isCompleted ? "text-[var(--muted)] line-through" : "text-[var(--foreground)]"
              }`}
            >
              {task.title}
            </h3>
            <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
              <CategoryBadge category={task.category} />
              <PriorityBadge priority={priority} />
              <ProjectBadge project={task.project} />
            </div>
          </div>

          {/* Progress inline */}
          <div className="mt-2 flex items-center gap-3">
            <ProgressBar
              value={task.progress}
              color={priorityColors.dot}
              height="h-1"
              className="max-w-48"
            />
            <span
              className="text-[0.6rem] font-bold tabular-nums"
              style={{ color: priorityColors.dot }}
            >
              {task.progress}%
            </span>

            <div className="ml-2 flex items-center gap-3 text-[0.6rem] text-[var(--muted)]">
              <span>{task.itemCount} items</span>
              <span>{task.logCount} logs</span>
              <span>Due {formatDate(task.dueOn)}</span>
            </div>
          </div>
        </div>

        {/* Right toggles */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <StatusToggle value={status} onChange={handleStatusChange} />
          <PriorityToggle value={priority} onChange={handlePriorityChange} />
        </div>
      </div>
    </article>
  );
}
