"use client";

import { useState } from "react";
import type { TaskCardData } from "@/lib/task-card-types";
import { PRIORITY_COLORS, CATEGORY_COLORS } from "@/lib/task-card-types";
import type { TaskStatus, TaskPriority } from "@/lib/mock-tasks";
import TaskCardImage from "./task-card-image";
import TaskCardCheckbox from "./task-card-checkbox";
import ProgressBar from "./progress-bar";
import { PriorityBadge, CategoryBadge, ProjectBadge } from "./task-card-badges";
import { StatusToggle, PriorityToggle } from "./status-priority-toggle";

type TaskCardVerticalProps = {
  task: TaskCardData;
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onPriorityChange?: (id: string, priority: TaskPriority) => void;
  onComplete?: (id: string, completed: boolean) => void;
};

/**
 * Version B — Vertical Compact Card
 *
 * Image at the top with a gradient overlay, content stacked below.
 * Great for grid layouts (2–4 columns).
 */
export default function TaskCardVertical({
  task,
  onStatusChange,
  onPriorityChange,
  onComplete,
}: TaskCardVerticalProps) {
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
    <article className="group relative flex flex-col rounded-2xl min-w-[26rem] border border-[var(--border-color)] bg-[var(--surface)] transition-all hover:border-[var(--muted)]/30 hover:shadow-lg">
      {/* Image header */}
      <div
        className="relative flex h-36 items-center justify-center overflow-hidden rounded-t-2xl"
        style={{
          background: `linear-gradient(135deg, ${categoryColors.bg})`,
        }}
      >
        {/* Corner checkbox */}
        <div className="absolute left-3 top-3 z-10">
          <TaskCardCheckbox checked={isCompleted} onChange={handleCheckbox} />
        </div>

        {/* Floating badges */}
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
          <CategoryBadge category={task.category} />
        </div>

        <TaskCardImage
          category={task.category}
          imageUrl={task.imageUrl}
          title={task.title}
          size="lg"
          className="!border-0 !bg-transparent"
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-12"
          style={{
            background: "linear-gradient(to top, var(--surface), transparent)",
          }}
        />
      </div>

      {/* Content body */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-2">
        {/* Badges row */}
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <PriorityBadge priority={priority} />
          <ProjectBadge project={task.project} />
        </div>

        {/* Title */}
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
          <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">
            {task.description}
          </p>
        )}

        {/* Progress */}
        <div className="mt-auto pt-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
              Progress
            </span>
            <span className="text-[0.65rem] font-bold">{task.progress}%</span>
          </div>
          <ProgressBar value={task.progress} />
        </div>

        {/* Meta row */}
        <div className="mt-3 flex items-center justify-between text-[0.6rem] text-[var(--muted)]">
          <div className="flex items-center gap-3">
            <span>{task.itemCount} items</span>
            <span>{task.logCount} logs</span>
          </div>
          <span>Due {task.dueOn}</span>
        </div>

        {/* Toggles */}
        <div className="mt-3 flex items-center gap-2 border-t border-[var(--border-color)] pt-3">
          <StatusToggle
            value={status}
            onChange={handleStatusChange}
            className="justify-start"
          />
          <PriorityToggle
            value={priority}
            onChange={handlePriorityChange}
            className="ml-auto"
          />
        </div>
      </div>
    </article>
  );
}
