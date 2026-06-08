import type {
  Task,
  TaskDraft,
  TaskFilters,
  TaskPriority,
  TaskSortMode,
  TaskStatus,
  TaskViewMode,
} from "@/features/tasks/types/task";

export const TASK_STORAGE_KEYS = {
  tasks: "tm_tasks",
  filters: "tm_filters_mvp",
  viewMode: "tm_view_mode",
  sortMode: "tm_sort_mode",
  hideDone: "tm_hide_done",
} as const;

export const DEFAULT_TASK_DRAFT: TaskDraft = {
  title: "",
  description: "",
  notes: "",
  category: "General",
  project: "",
  sender: "",
  priority: "medium",
  status: "not-started",
  dueDate: "",
};

export const DEFAULT_TASK_FILTERS: TaskFilters = {
  search: "",
  category: "",
  priority: "",
  status: "",
};

export const DEFAULT_TASK_VIEW_MODE: TaskViewMode = "default";
export const DEFAULT_TASK_SORT_MODE: TaskSortMode = "workflow";
export const DEFAULT_HIDE_DONE = false;

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  "very-low": "Very low",
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  "not-started": "Not started",
  ongoing: "Ongoing",
  waiting: "Waiting",
  done: "Done",
};

export const PRIORITY_TONE_CLASSNAMES: Record<TaskPriority, string> = {
  critical: "bg-red-500/15 text-red-200 ring-1 ring-inset ring-red-400/25 dark:text-red-200",
  high: "bg-orange-500/15 text-orange-200 ring-1 ring-inset ring-orange-400/25 dark:text-orange-200",
  medium: "bg-amber-500/15 text-amber-200 ring-1 ring-inset ring-amber-400/25 dark:text-amber-200",
  low: "bg-emerald-500/15 text-emerald-200 ring-1 ring-inset ring-emerald-400/25 dark:text-emerald-200",
  "very-low": "bg-sky-500/15 text-sky-200 ring-1 ring-inset ring-sky-400/25 dark:text-sky-200",
};

export const STATUS_TONE_CLASSNAMES: Record<TaskStatus, string> = {
  "not-started": "bg-slate-500/15 text-slate-200 ring-1 ring-inset ring-slate-400/20 dark:text-slate-200",
  ongoing: "bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-400/25 dark:text-blue-200",
  waiting: "bg-orange-500/15 text-orange-200 ring-1 ring-inset ring-orange-400/25 dark:text-orange-200",
  done: "bg-emerald-500/15 text-emerald-200 ring-1 ring-inset ring-emerald-400/25 dark:text-emerald-200",
};

export const VIEW_MODE_LABELS: Record<TaskViewMode, string> = {
  default: "Default",
  compact: "Compact",
  table: "Table",
};

export const SORT_MODE_LABELS: Record<TaskSortMode, string> = {
  workflow: "Workflow",
  "due-date": "Due date",
  "created-date": "Created date",
  priority: "Priority",
  title: "Title",
};

export const SAMPLE_TASKS: Task[] = [
  {
    id: "seed-1",
    title: "Rebuild the task workspace shell",
    description:
      "Set up the Next.js MVP shell with a sticky header, filters, task list, and detail panel.",
    notes: "Keep the browser-only storage isolated so IndexedDB can be added later.",
    category: "Migration",
    project: "TaskManager Next",
    sender: "Template backlog",
    priority: "high",
    status: "ongoing",
    dueDate: "2026-06-10",
    createdAt: "2026-06-08T09:00:00.000Z",
    updatedAt: "2026-06-08T11:00:00.000Z",
  },
  {
    id: "seed-2",
    title: "Port the task creation flow",
    description:
      "Capture the core fields from the legacy template: title, description, category, priority, status, due date, and notes.",
    notes: "Use a modal form and keep validation light but explicit.",
    category: "Tasks",
    project: "TaskManager Next",
    sender: "Static template",
    priority: "critical",
    status: "not-started",
    dueDate: "2026-06-12",
    createdAt: "2026-06-08T10:20:00.000Z",
    updatedAt: "2026-06-08T10:20:00.000Z",
  },
  {
    id: "seed-3",
    title: "Stabilize persistence keys",
    description:
      "Reuse the main storage keys where the MVP fields align so the migration path stays predictable.",
    notes: "The legacy app also stores theme, view mode, and sort mode in local browser storage.",
    category: "Persistence",
    project: "TaskManager Next",
    sender: "Migration plan",
    priority: "medium",
    status: "waiting",
    dueDate: "",
    createdAt: "2026-06-08T07:35:00.000Z",
    updatedAt: "2026-06-08T08:00:00.000Z",
  },
];