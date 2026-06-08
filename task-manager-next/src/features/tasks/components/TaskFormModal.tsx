"use client";

import { useState } from "react";

import {
  DEFAULT_TASK_DRAFT,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "@/features/tasks/lib/task-constants";
import { sanitizeTaskDraft } from "@/features/tasks/lib/task-validation";
import type { Task, TaskDraft } from "@/features/tasks/types/task";
import { Modal } from "@/shared/components/Modal";

type TaskFormModalProps = {
  open: boolean;
  task: Task | null;
  error: string | null;
  onClose: () => void;
  onSubmit: (draft: TaskDraft) => boolean;
};

const inputClassName =
  "min-h-10 w-full rounded-[10px] border border-[color:var(--border)] bg-[linear-gradient(180deg,var(--field-bg-strong),var(--field-bg))] px-3 text-[13px] text-[var(--text)] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-[3px] focus:ring-[var(--focus-ring)]";

export function TaskFormModal({ open, task, error, onClose, onSubmit }: TaskFormModalProps) {
  const [draft, setDraft] = useState<TaskDraft>(() =>
    task
      ? sanitizeTaskDraft({
          title: task.title,
          description: task.description,
          notes: task.notes,
          category: task.category,
          project: task.project,
          sender: task.sender,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
        })
      : DEFAULT_TASK_DRAFT,
  );

  const footer = (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onClose}
        className="inline-flex min-h-10 items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.05em] text-[color:color-mix(in_srgb,var(--text-muted)_78%,var(--text)_22%)] transition hover:-translate-y-px hover:border-[var(--accent)] hover:text-[var(--text)]"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="task-form"
        className="inline-flex min-h-10 items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent-h)_26%,var(--accent)),var(--accent))] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.05em] text-white transition hover:-translate-y-px hover:brightness-110"
      >
        {task ? "Save changes" : "Create task"}
      </button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={task ? "Edit task" : "Create a task"}
      description="Core MVP fields carried over from the static TaskManager template."
      footer={footer}
    >
      <form
        id="task-form"
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(draft);
        }}
      >
        <label className="space-y-2 md:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">Title</span>
          <input
            className={inputClassName}
            value={draft.title}
            maxLength={140}
            placeholder="What needs to happen?"
            onChange={(event) => setDraft((currentDraft) => ({ ...currentDraft, title: event.target.value }))}
          />
        </label>

        <label className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">Category</span>
          <input
            className={inputClassName}
            value={draft.category}
            placeholder="General"
            onChange={(event) =>
              setDraft((currentDraft) => ({ ...currentDraft, category: event.target.value }))
            }
          />
        </label>

        <label className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">Project</span>
          <input
            className={inputClassName}
            value={draft.project}
            placeholder="Optional project name"
            onChange={(event) =>
              setDraft((currentDraft) => ({ ...currentDraft, project: event.target.value }))
            }
          />
        </label>

        <label className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">Priority</span>
          <select
            className={inputClassName}
            value={draft.priority}
            onChange={(event) =>
              setDraft((currentDraft) => ({
                ...currentDraft,
                priority: event.target.value as TaskDraft["priority"],
              }))
            }
          >
            {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">Status</span>
          <select
            className={inputClassName}
            value={draft.status}
            onChange={(event) =>
              setDraft((currentDraft) => ({
                ...currentDraft,
                status: event.target.value as TaskDraft["status"],
              }))
            }
          >
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">Sender</span>
          <input
            className={inputClassName}
            value={draft.sender}
            placeholder="Optional sender or owner"
            onChange={(event) =>
              setDraft((currentDraft) => ({ ...currentDraft, sender: event.target.value }))
            }
          />
        </label>

        <label className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">Due date</span>
          <input
            className={inputClassName}
            type="date"
            value={draft.dueDate}
            onChange={(event) =>
              setDraft((currentDraft) => ({ ...currentDraft, dueDate: event.target.value }))
            }
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">Description</span>
          <textarea
            className={`${inputClassName} min-h-32 resize-y py-3`}
            value={draft.description}
            placeholder="Add the context behind this task."
            onChange={(event) =>
              setDraft((currentDraft) => ({ ...currentDraft, description: event.target.value }))
            }
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">Notes</span>
          <textarea
            className={`${inputClassName} min-h-28 resize-y py-3`}
            value={draft.notes}
            placeholder="Capture follow-ups, reminders, or references."
            onChange={(event) => setDraft((currentDraft) => ({ ...currentDraft, notes: event.target.value }))}
          />
        </label>

        {error ? (
          <div className="rounded-[12px] border border-[rgba(249,115,22,0.26)] bg-[rgba(249,115,22,0.08)] px-4 py-3 text-[13px] text-[var(--high)] md:col-span-2">
            {error}
          </div>
        ) : null}
      </form>
    </Modal>
  );
}