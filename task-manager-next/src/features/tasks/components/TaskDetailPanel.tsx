"use client";

import {
  PRIORITY_LABELS,
  PRIORITY_TONE_CLASSNAMES,
  STATUS_LABELS,
  STATUS_TONE_CLASSNAMES,
} from "@/features/tasks/lib/task-constants";
import {
  formatDueState,
  formatTaskDate,
} from "@/features/tasks/lib/task-selectors";
import type { Task } from "@/features/tasks/types/task";

type TaskDetailPanelProps = {
  task: Task | null;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, status: Task["status"]) => void;
};

export function TaskDetailPanel({
  task,
  onEditTask,
  onDeleteTask,
  onUpdateTaskStatus,
}: TaskDetailPanelProps) {
  if (!task) {
    return (
      <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-[28px] border border-dashed border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-6 text-center xl:min-h-0 xl:h-full">
        <p className="text-lg font-semibold">Select a task to inspect it.</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--text-muted)]">
          Keep the list in motion on the left, then open one task here when you
          need context, notes, and quick actions.
        </p>
      </div>
    );
  }

  const nextStatus = task.status === "done" ? "ongoing" : "done";

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018))] shadow-[var(--shadow-panel)] xl:min-h-0">
      <div className="relative overflow-hidden border-b border-[color:var(--border)] px-5 py-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(91,125,255,0.16),transparent_34%),radial-gradient(circle_at_top_left,rgba(20,184,166,0.12),transparent_28%)]" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] ${PRIORITY_TONE_CLASSNAMES[task.priority]}`}
              >
                {PRIORITY_LABELS[task.priority]}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] ${STATUS_TONE_CLASSNAMES[task.status]}`}
              >
                {STATUS_LABELS[task.status]}
              </span>
              <span className="rounded-full bg-[rgba(255,255,255,0.04)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-[var(--text-muted)]">
                {task.category}
              </span>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                Active task
              </div>
              <h2 className="mt-2 max-w-xl text-[24px] font-semibold tracking-[-0.03em] text-[color:color-mix(in_srgb,var(--text)_84%,var(--accent-h)_16%)]">
                {task.title}
              </h2>
              <p className="mt-2 max-w-xl text-[13px] leading-6 text-[var(--text-muted)]">
                {task.description || "No description has been added yet."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onEditTask(task.id)}
              className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.05)] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[color:color-mix(in_srgb,var(--text-muted)_74%,var(--text)_26%)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onUpdateTaskStatus(task.id, nextStatus)}
              className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.05)] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[color:color-mix(in_srgb,var(--text-muted)_74%,var(--text)_26%)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
            >
              {task.status === "done" ? "Reopen" : "Mark done"}
            </button>
            <button
              type="button"
              onClick={() => onDeleteTask(task.id)}
              className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-[rgba(249,115,22,0.26)] bg-[rgba(249,115,22,0.08)] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--high)] transition hover:-translate-y-px hover:border-[rgba(249,115,22,0.4)] hover:bg-[rgba(249,115,22,0.12)]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[20px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-4">
            <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Project
            </div>
            <div className="mt-2 text-[14px] font-medium">
              {task.project || "No project assigned"}
            </div>
          </div>
          <div className="rounded-[20px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-4">
            <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Owner
            </div>
            <div className="mt-2 text-[14px] font-medium">
              {task.sender || "No sender or owner"}
            </div>
          </div>
          <div className="rounded-[20px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-4">
            <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Due date
            </div>
            <div className="mt-2 text-[14px] font-medium">
              {formatTaskDate(task.dueDate)}
            </div>
            <div className="mt-1 text-[11px] text-[var(--text-muted)]">
              {formatDueState(task)}
            </div>
          </div>
          <div className="rounded-[20px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-4">
            <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Timeline
            </div>
            <div className="mt-2 text-[14px] font-medium">
              Created {formatTaskDate(task.createdAt)}
            </div>
            <div className="mt-1 text-[11px] text-[var(--text-muted)]">
              Updated {formatTaskDate(task.updatedAt)}
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-[22px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-4">
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Notes
          </div>
          <p className="whitespace-pre-wrap text-[13px] leading-7 text-[var(--text-muted)]">
            {task.notes ||
              "No notes yet. Use this space for handoff context, follow-ups, or reminders."}
          </p>
        </div>
      </div>
    </div>
  );
}
