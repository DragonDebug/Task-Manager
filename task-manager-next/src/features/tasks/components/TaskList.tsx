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
  isTaskOverdue,
} from "@/features/tasks/lib/task-selectors";
import type { Task, TaskViewMode } from "@/features/tasks/types/task";

type TaskListProps = {
  tasks: Task[];
  selectedTaskId: string | null;
  viewMode: TaskViewMode;
  onSelectTask: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, status: Task["status"]) => void;
};

const priorityRailClassNames = {
  critical: "before:bg-[var(--critical)]",
  high: "before:bg-[var(--high)]",
  medium: "before:bg-[var(--medium)]",
  low: "before:bg-[var(--low)]",
  "very-low": "before:bg-[var(--very-low)]",
} as const;

const dueToneClassNames = {
  overdue: "border-[rgba(249,115,22,0.3)] bg-[rgba(249,115,22,0.12)] text-[var(--high)]",
  soon: "border-[rgba(245,158,11,0.28)] bg-[rgba(245,158,11,0.12)] text-[color:#d97706] dark:text-[color:#fbbf24]",
  stable: "border-[rgba(20,184,166,0.26)] bg-[rgba(20,184,166,0.12)] text-[color:#0f766e] dark:text-[color:#5eead4]",
  none: "border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] text-[var(--text-muted)]",
  done: "border-[rgba(16,185,129,0.22)] bg-[rgba(16,185,129,0.12)] text-[color:#047857] dark:text-[color:#86efac]",
} as const;

function TaskStatusButton({
  task,
  onUpdateTaskStatus,
}: {
  task: Task;
  onUpdateTaskStatus: (taskId: string, status: Task["status"]) => void;
}) {
  const nextStatus = task.status === "done" ? "ongoing" : "done";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onUpdateTaskStatus(task.id, nextStatus);
      }}
      aria-label={task.status === "done" ? `Reopen ${task.title}` : `Mark ${task.title} done`}
      className={`inline-flex min-h-10 items-center justify-center rounded-[12px] border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] transition ${
        task.status === "done"
          ? "border-[rgba(16,185,129,0.22)] bg-[rgba(16,185,129,0.12)] text-[color:#047857] hover:bg-[rgba(16,185,129,0.16)] dark:text-[color:#86efac]"
          : "border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] text-[color:color-mix(in_srgb,var(--text-muted)_70%,var(--text)_30%)] hover:border-[var(--accent)] hover:text-[var(--text)]"
      }`}
    >
      <span
        className={`mr-2 h-2.5 w-2.5 rounded-full ${
          task.status === "done" ? "bg-[color:#10b981]" : "bg-[var(--accent)]"
        }`}
      />
      {task.status === "done" ? "Reopen" : "Complete"}
    </button>
  );
}

export function TaskList({
  tasks,
  selectedTaskId,
  viewMode,
  onSelectTask,
  onEditTask,
  onUpdateTaskStatus,
}: TaskListProps) {
  if (!tasks.length) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-[16px] border border-dashed border-[color:var(--border)] bg-[rgba(255,255,255,0.02)] px-6 text-center">
        <p className="text-lg font-semibold">No tasks match the current view.</p>
        <p className="mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
          Change the filters, switch view mode, or create a new task to populate the workspace.
        </p>
      </div>
    );
  }

  if (viewMode === "table") {
    return (
      <div className="overflow-x-auto rounded-[16px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.02)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[rgba(255,255,255,0.03)] text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            <tr>
              <th className="px-4 py-3 font-semibold">Task</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Due</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const isSelected = task.id === selectedTaskId;

              return (
                <tr
                  key={task.id}
                  className={`cursor-pointer rounded-2xl transition ${
                    isSelected ? "bg-[var(--accent-soft)]" : "hover:bg-[rgba(255,255,255,0.03)]"
                  }`}
                  onClick={() => onSelectTask(task.id)}
                >
                  <td className="border-t border-[color:var(--border)] px-4 py-4 align-top first:border-t-0">
                    <div className="space-y-1">
                      <div className={`font-semibold ${task.status === "done" ? "text-[var(--text-muted)] line-through" : "text-[var(--text)]"}`}>{task.title}</div>
                      <div className="line-clamp-2 text-xs leading-5 text-[var(--text-muted)]">
                        {task.description || task.notes || "No additional detail yet."}
                      </div>
                    </div>
                  </td>
                  <td className="border-t border-[color:var(--border)] px-4 py-4 align-top text-[var(--text-muted)]">{task.category}</td>
                  <td className="border-t border-[color:var(--border)] px-4 py-4 align-top">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${PRIORITY_TONE_CLASSNAMES[task.priority]}`}>
                      {PRIORITY_LABELS[task.priority]}
                    </span>
                  </td>
                  <td className="border-t border-[color:var(--border)] px-4 py-4 align-top">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_TONE_CLASSNAMES[task.status]}`}>
                      {STATUS_LABELS[task.status]}
                    </span>
                  </td>
                  <td className="border-t border-[color:var(--border)] px-4 py-4 align-top text-[var(--text-muted)]">
                    {formatTaskDate(task.dueDate)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "compact"
          ? "grid gap-3 md:grid-cols-2"
          : "grid gap-4 xl:grid-cols-2"
      }
    >
      {tasks.map((task) => {
        const isSelected = task.id === selectedTaskId;
        const dueState = formatDueState(task);
        const dueToneClassName = task.status === "done"
          ? dueToneClassNames.done
          : !task.dueDate
            ? dueToneClassNames.none
            : isTaskOverdue(task)
              ? dueToneClassNames.overdue
              : dueState === "Due soon"
                ? dueToneClassNames.soon
                : dueToneClassNames.stable;

        return (
          <article
            key={task.id}
            className={`group relative isolate overflow-hidden rounded-[24px] border px-4 transition before:absolute before:bottom-5 before:left-4 before:top-5 before:w-1 before:rounded-full ${
              priorityRailClassNames[task.priority]
            } ${
              viewMode === "compact" ? "py-4" : "py-5"
            } ${
              isSelected
                ? "border-[color:color-mix(in_srgb,var(--accent)_55%,var(--border))] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] shadow-[0_18px_50px_rgba(15,23,42,0.16)] ring-1 ring-[rgba(91,125,255,0.28)]"
                : "border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.018))] hover:-translate-y-[2px] hover:border-[color:color-mix(in_srgb,var(--accent)_38%,var(--border))] hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
            }`}
            onClick={() => onSelectTask(task.id)}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(91,125,255,0.14),transparent_32%),linear-gradient(140deg,rgba(255,255,255,0.035),transparent_48%)] opacity-90" />
            <div className="relative z-[1] flex h-full flex-col gap-4 pl-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] ${STATUS_TONE_CLASSNAMES[task.status]}`}>
                      {STATUS_LABELS[task.status]}
                    </span>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] ${dueToneClassName}`}>
                      {dueState}
                    </span>
                    <span className="rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
                      {task.category}
                    </span>
                  </div>

                  <h3
                    className={`mt-3 text-[17px] font-semibold leading-[1.25] tracking-[-0.02em] ${
                      task.status === "done"
                        ? "text-[var(--text-muted)] line-through"
                        : "text-[color:color-mix(in_srgb,var(--text)_85%,var(--accent-h)_15%)]"
                    }`}
                  >
                    {task.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEditTask(task.id);
                  }}
                  className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.045)] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[color:color-mix(in_srgb,var(--text-muted)_72%,var(--text)_28%)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
                >
                  Edit
                </button>
              </div>

              <p className={`max-w-[56ch] text-[13px] leading-6 text-[var(--text-muted)] ${viewMode === "compact" ? "line-clamp-2" : "line-clamp-3"}`}>
                {task.description || task.notes || "No additional detail yet."}
              </p>

              <div className="grid gap-2.5 sm:grid-cols-2">
                <div className="rounded-[18px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] px-3.5 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                    Due date
                  </div>
                  <div className="mt-1.5 text-[15px] font-semibold text-[var(--text)]">
                    {formatTaskDate(task.dueDate, "No due date")}
                  </div>
                </div>
                <div className="rounded-[18px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] px-3.5 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                    Priority
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] ${PRIORITY_TONE_CLASSNAMES[task.priority]}`}>
                      {PRIORITY_LABELS[task.priority]}
                    </span>
                    {task.project ? (
                      <span className="truncate text-[12px] text-[var(--text-muted)]">
                        {task.project}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:rgba(148,163,184,0.18)] pt-1">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[var(--text-muted)]">
                  <span>{task.sender || "No owner assigned"}</span>
                  <span>{task.project || "No project"}</span>
                  <span>{formatTaskDate(task.updatedAt)}</span>
                </div>
                <TaskStatusButton task={task} onUpdateTaskStatus={onUpdateTaskStatus} />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}