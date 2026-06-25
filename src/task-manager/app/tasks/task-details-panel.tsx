"use client";

import { useState, useCallback, useEffect, type ChangeEvent } from "react";
import type { Task } from "@/lib/task-store";
import type { TaskStatus, TaskPriority } from "@/lib/mock-tasks";
import type { TaskCategory } from "@/lib/task-card-types";
import {
  PRIORITY_COLORS,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  CATEGORY_OPTIONS,
} from "@/lib/task-card-types";
import TaskCardImage from "@/components/task-card/task-card-image";
import { formatDate } from "@/lib/format-date";
import {
  PriorityBadge,
  PriorityIcon,
  CategoryBadge,
  ProjectBadge,
} from "@/components/task-card/task-card-badges";
import { PriorityToggle } from "@/components/task-card/status-priority-toggle";
import ProgressBar from "@/components/task-card/progress-bar";
import SubtaskList, { type Subtask } from "@/components/popup/subtask-list";

// ── Props ───────────────────────────────────────────────────────────────────

type TaskDetailsPanelProps = {
  task: Task | null;
  onClose: () => void;
  onSave: (id: string, patch: Partial<Omit<Task, "id">>) => void;
};

// ── Status dot colors ───────────────────────────────────────────────────────

const STATUS_DOT_COLORS: Record<string, string> = {
  Backlog: "#64748b",
  Pending: "#eab308",
  Ready: "#06b6d4",
  "In progress": "#3b82f6",
  Blocked: "#ef4444",
  "In review": "#a855f7",
  Done: "#22c55e",
};

// ── Shared CSS ──────────────────────────────────────────────────────────────

const INPUT_CLS =
  "w-full rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none";
const TEXTAREA_CLS = INPUT_CLS + " resize-none";
const SELECT_CLS =
  "cursor-pointer rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] focus:border-[var(--accent)]/40 focus:outline-none";
const DATE_CLS =
  "w-full cursor-pointer rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] focus:border-[var(--accent)]/40 focus:outline-none";

// ── Draft type (mirrors editable Task fields) ───────────────────────────────

type Draft = {
  title: string;
  description: string;
  project: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number;
  imageUrl: string;
  assignee: string;
  tags: string[];
  subtasks: Subtask[];
  notes: string;
  createdOn: string;
  receivedDate: string;
  startedOn: string;
  completedOn: string;
  dueOn: string;
  itemCount: number;
  logCount: number;
  emailSubject: string;
  folderPath: string;
  senderName: string;
};

function taskToDraft(task: Task): Draft {
  return {
    title: task.title,
    description: task.description ?? "",
    project: task.project,
    category: task.category,
    status: task.status,
    priority: task.priority,
    progress: task.progress,
    imageUrl: task.imageUrl ?? "",
    assignee: task.assignee ?? "",
    tags: task.tags ?? [],
    subtasks: task.subtasks ?? [],
    notes: task.notes ?? "",
    createdOn: task.createdOn,
    receivedDate: task.receivedDate ?? "",
    startedOn: task.startedOn ?? "",
    completedOn: task.completedOn ?? "",
    dueOn: task.dueOn,
    itemCount: task.itemCount,
    logCount: task.logCount,
    emailSubject: task.emailSubject ?? "",
    folderPath: task.folderPath ?? "",
    senderName: task.senderName ?? "",
  };
}

// =========================================================================
//  Main component
// =========================================================================

export default function TaskDetailsPanel({
  task,
  onClose,
  onSave,
}: TaskDetailsPanelProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Draft>(() => task ? taskToDraft(task) : ({} as Draft));

  // Reset edit mode and draft when a different task is selected
  useEffect(() => {
    setEditing(false);
    if (task) setDraft(taskToDraft(task));
  }, [task?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Start editing: snapshot current task into draft. */
  const startEdit = useCallback(() => {
    if (task) {
      setDraft(taskToDraft(task));
      setEditing(true);
    }
  }, [task]);

  /** Cancel editing: discard draft. */
  const cancelEdit = useCallback(() => {
    if (task) {
      setDraft(taskToDraft(task));
      setEditing(false);
    }
  }, [task]);

  /** Save draft to store and exit edit mode. */
  const saveEdit = useCallback(() => {
    if (!task) return;
    onSave(task.id, {
      ...draft,
      imageUrl: draft.imageUrl || undefined,
      startedOn: draft.startedOn || undefined,
      completedOn: draft.completedOn || undefined,
    });
    setEditing(false);
  }, [task, draft, onSave]);

  /** Generic text field updater. */
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setDraft((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  /** Number field updater. Clamps progress to 0-100; others just floor at 0. */
  const handleNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const num = parseInt(value) || 0;
      const clamped =
        name === "progress" ? Math.max(0, Math.min(100, num)) : Math.max(0, num);
      setDraft((prev) => ({ ...prev, [name]: clamped }));
    },
    [],
  );

  // ── Empty state ──────────────────────────────────────────────────────────
  if (!task) {
    return (
      <div className="sticky top-6 flex max-h-[calc(100vh-6rem)] flex-col items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--surface-elevated)] shadow-lg px-5 py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="4" y="6" width="20" height="16" rx="2.5" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M10 13h8M10 17h5" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">No task selected</h3>
          <p className="text-xs text-[var(--muted)] max-w-[200px]">
            Select a task from the list to view its details here.
          </p>
        </div>
      </div>
    );
  }

  // Use draft values when editing, task values when viewing
  const d = editing ? draft : taskToDraft(task);
  const priorityColors = PRIORITY_COLORS[d.priority];

  return (
    <div className="sticky top-6 flex max-h-[calc(100vh-6rem)] flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--surface-elevated)] shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted)]">
          Task Details
        </h2>
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button
                type="button"
                onClick={cancelEdit}
                className="cursor-pointer rounded-lg border border-[var(--border-color)] px-3 py-1.5 text-[0.65rem] font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="cursor-pointer rounded-lg bg-[var(--accent)] px-3 py-1.5 text-[0.65rem] font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={startEdit}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border-color)] px-3 py-1.5 text-[0.65rem] font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            >
              <EditIcon />
              Edit
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            aria-label="Close details"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="space-y-6">

          {/* Image + Title */}
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-2">
              <TaskCardImage
                category={d.category}
                imageUrl={d.imageUrl || undefined}
                title={d.title}
                size="lg"
              />
              {editing && (
                <input
                  type="text"
                  name="imageUrl"
                  value={d.imageUrl}
                  onChange={handleChange}
                  placeholder="Image URL..."
                  className="w-24 rounded border border-[var(--border-color)] bg-[var(--surface)] px-2 py-1 text-[0.6rem] text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              {editing ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={d.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--foreground)] focus:border-[var(--accent)]/40 focus:outline-none"
                  />
                  <textarea
                    name="description"
                    value={d.description}
                    onChange={handleChange}
                    placeholder="Description..."
                    rows={2}
                    className={TEXTAREA_CLS + " mt-2"}
                  />
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold leading-snug text-[var(--foreground)]">
                    {d.title}
                  </h3>
                  {d.description && (
                    <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                      {d.description}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Badges / Selectors */}
          {editing ? (
            <div className="grid grid-cols-3 gap-3">
              <FieldLabel label="Category">
                <select name="category" value={d.category} onChange={handleChange} className={SELECT_CLS + " w-full"}>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </FieldLabel>
              <FieldLabel label="Priority">
                <PriorityToggle
                  value={d.priority}
                  onChange={(v) => setDraft((prev) => ({ ...prev, priority: v }))}
                />
              </FieldLabel>
              <FieldLabel label="Status">
                <select name="status" value={d.status} onChange={handleChange} className={SELECT_CLS + " w-full"}>
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </FieldLabel>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={d.category} />
              <PriorityBadge priority={d.priority} />
              <ProjectBadge project={d.project} />
            </div>
          )}

          {/* Project (edit mode only, already in badges when viewing) */}
          {editing && (
            <FieldLabel label="Project">
              <input
                type="text"
                name="project"
                value={d.project}
                onChange={handleChange}
                placeholder="Project name..."
                className={INPUT_CLS}
              />
            </FieldLabel>
          )}

          {/* Status (view mode only) */}
          {!editing && (
            <div>
              <SectionHeading>Status</SectionHeading>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: STATUS_DOT_COLORS[d.status] ?? "#64748b" }}
                />
                <span className="text-sm text-[var(--foreground)]">{d.status}</span>
              </div>
            </div>
          )}

          {/* Assignee */}
          <div>
            <SectionHeading>Assignee</SectionHeading>
            {editing ? (
              <input
                type="text"
                name="assignee"
                value={d.assignee}
                onChange={handleChange}
                placeholder="Unassigned"
                className={INPUT_CLS}
              />
            ) : (
              <p className="text-xs text-[var(--foreground)]">
                {d.assignee || "Unassigned"}
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <SectionHeading>Tags</SectionHeading>
            {editing ? (
              <TagsEditor
                tags={d.tags}
                onChange={(tags) => setDraft((prev) => ({ ...prev, tags }))}
              />
            ) : d.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {d.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[0.6rem] font-medium text-[var(--accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--muted)]">No tags</p>
            )}
          </div>

          {/* Dates & Metrics (view mode inline, edit mode stays in their own sections below) */}
          {!editing && (
            <div className="flex flex-wrap items-center gap-4 text-[0.65rem] text-[var(--muted)]">
              <span className="inline-flex items-center gap-1">
                <DetailCalendarIcon />
                Created {formatDate(d.createdOn)}
              </span>
              <span className="inline-flex items-center gap-1">
                <DetailCalendarIcon />
                Due {formatDate(d.dueOn)}
              </span>
              {d.startedOn && (
                <span className="inline-flex items-center gap-1">
                  <DetailCalendarIcon />
                  Started {formatDate(d.startedOn)}
                </span>
              )}
              {d.completedOn && (
                <span className="inline-flex items-center gap-1">
                  <DetailCalendarIcon />
                  Completed {formatDate(d.completedOn)}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <DetailItemsIcon />
                {d.itemCount} items
              </span>
              <span className="inline-flex items-center gap-1">
                <DetailLogsIcon />
                {d.logCount} logs
              </span>
            </div>
          )}

          {/* Progress */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <SectionHeading>Progress</SectionHeading>
              {editing ? (
                <input
                  type="number"
                  name="progress"
                  value={d.progress}
                  onChange={handleNumberChange}
                  min={0}
                  max={100}
                  className="w-16 rounded border border-[var(--border-color)] bg-[var(--surface)] px-2 py-1 text-right text-xs text-[var(--foreground)] focus:border-[var(--accent)]/40 focus:outline-none"
                />
              ) : (
                <span className="text-xs font-bold" style={{ color: priorityColors.dot }}>
                  {d.progress}%
                </span>
              )}
            </div>
            <ProgressBar value={d.progress} color={priorityColors.dot} />
          </div>

          {/* Notes */}
          <div>
            <SectionHeading>Notes</SectionHeading>
            {editing ? (
              <textarea
                name="notes"
                value={d.notes}
                onChange={handleChange}
                placeholder="Additional notes..."
                rows={3}
                className={TEXTAREA_CLS}
              />
            ) : (
              <p className="text-xs leading-relaxed text-[var(--foreground)]">
                {d.notes || <span className="text-[var(--muted)]">No notes</span>}
              </p>
            )}
          </div>

          {/* Subtasks */}
          <div>
            <SectionHeading>Subtasks</SectionHeading>
            {editing ? (
              <SubtaskList
                subtasks={d.subtasks}
                onChange={(subtasks) => setDraft((prev) => ({ ...prev, subtasks }))}
              />
            ) : d.subtasks.length > 0 ? (
              <div className="space-y-1.5">
                {d.subtasks.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-2">
                    <span
                      className={
                        "inline-block h-3 w-3 rounded-sm border " +
                        (sub.completed
                          ? "border-transparent bg-[var(--accent)]"
                          : "border-[var(--muted)]/40")
                      }
                    >
                      {sub.completed && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2.5 6l2.5 2.5 5-5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span
                      className={
                        "text-xs " +
                        (sub.completed
                          ? "text-[var(--muted)] line-through"
                          : "text-[var(--foreground)]")
                      }
                    >
                      {sub.title || "Untitled subtask"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--muted)]">No subtasks</p>
            )}
          </div>

          {/* Dates (edit mode only — view mode is inline above) */}
          {editing && (
            <div>
              <SectionHeading>Dates</SectionHeading>
              <div className="grid grid-cols-2 gap-3">
                <DateFieldEditable label="Created" name="createdOn" value={d.createdOn} onChange={handleChange} />
                <DateFieldEditable label="Received" name="receivedDate" value={d.receivedDate} onChange={handleChange} />
                <DateFieldEditable label="Started" name="startedOn" value={d.startedOn} onChange={handleChange} />
                <DateFieldEditable label="Due" name="dueOn" value={d.dueOn} onChange={handleChange} />
                <DateFieldEditable label="Completed" name="completedOn" value={d.completedOn} onChange={handleChange} />
              </div>
            </div>
          )}

          {/* Metrics (edit mode only — view mode is inline above) */}
          {editing && (
            <div>
              <SectionHeading>Metrics</SectionHeading>
              <div className="grid grid-cols-2 gap-3">
                <FieldLabel label="Items">
                  <input type="number" name="itemCount" value={d.itemCount} onChange={handleNumberChange} min={0} className={INPUT_CLS} />
                </FieldLabel>
                <FieldLabel label="Logs">
                  <input type="number" name="logCount" value={d.logCount} onChange={handleNumberChange} min={0} className={INPUT_CLS} />
                </FieldLabel>
              </div>
            </div>
          )}

          {/* Email Source (shown only if any email data exists, or if editing) */}
          {(editing || d.emailSubject || d.folderPath || d.senderName) && (
            <div>
              <SectionHeading>Email Source</SectionHeading>
              {editing ? (
                <div className="space-y-3">
                  <FieldLabel label="Subject">
                    <input type="text" name="emailSubject" value={d.emailSubject} onChange={handleChange} placeholder="Email subject..." className={INPUT_CLS} />
                  </FieldLabel>
                  <FieldLabel label="Folder">
                    <input type="text" name="folderPath" value={d.folderPath} onChange={handleChange} placeholder="Inbox/..." className={INPUT_CLS} />
                  </FieldLabel>
                  <FieldLabel label="Sender">
                    <input type="text" name="senderName" value={d.senderName} onChange={handleChange} placeholder="Sender name..." className={INPUT_CLS} />
                  </FieldLabel>
                </div>
              ) : (
                <div className="space-y-1.5 text-xs text-[var(--foreground)]">
                  {d.emailSubject && <p><span className="text-[var(--muted)]">Subject:</span> {d.emailSubject}</p>}
                  {d.folderPath && <p><span className="text-[var(--muted)]">Folder:</span> {d.folderPath}</p>}
                  {d.senderName && <p><span className="text-[var(--muted)]">Sender:</span> {d.senderName}</p>}
                </div>
              )}
            </div>
          )}

          {/* Comments */}
          <div>
            <SectionHeading>Comments ({task.comments?.length ?? 0})</SectionHeading>
            {(task.comments ?? []).length > 0 ? (
              <div className="space-y-3">
                {task.comments.map((c) => (
                  <div key={c.id} className="rounded-lg border border-[var(--border-color)] bg-[var(--surface)] p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--foreground)]">{c.author}</span>
                      <span className="text-[0.6rem] text-[var(--muted)]">{formatDate(c.createdAt?.slice(0, 10))}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-[var(--muted)]">{c.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--muted)]">No comments yet</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// =========================================================================
//  Helper components
// =========================================================================

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
      {children}
    </p>
  );
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.6rem] font-medium uppercase tracking-wider text-[var(--muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function DateItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.6rem] font-medium uppercase tracking-wider text-[var(--muted)]">{label}</p>
      <p className="text-xs font-medium text-[var(--foreground)]">{formatDate(value)}</p>
    </div>
  );
}

function DateFieldEditable({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <FieldLabel label={label}>
      <input type="date" name={name} value={value} onChange={onChange} className={DATE_CLS} />
    </FieldLabel>
  );
}

function MetricItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold text-[var(--foreground)]">{value}</p>
      <p className="text-[0.6rem] font-medium uppercase tracking-wider text-[var(--muted)]">{label}</p>
    </div>
  );
}

function TagsEditor({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState("");

  function addTag() {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag));
  }

  return (
    <div>
      {tags.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[0.6rem] font-medium text-[var(--accent)]"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="cursor-pointer text-[var(--accent)] hover:text-red-400"
              >
                x
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag();
          }
        }}
        placeholder="Type a tag and press Enter..."
        className={INPUT_CLS}
      />
    </div>
  );
}

// =========================================================================
//  Icons
// =========================================================================

function EditIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M8.5 1.5l2 2-7 7H1.5V8.5l7-7z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 3l8 8M11 3l-8 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DetailCalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1.5" y="2.5" width="9" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.5 5h9" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function DetailItemsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="7" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7" y="7" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function DetailLogsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2 3h8M2 6h6M2 9h4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

