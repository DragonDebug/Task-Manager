export const TASK_PRIORITIES = [
  "critical",
  "high",
  "medium",
  "low",
  "very-low",
] as const;

export const TASK_STATUSES = [
  "not-started",
  "ongoing",
  "waiting",
  "done",
] as const;

export const TASK_VIEW_MODES = ["default", "compact", "table"] as const;

export const TASK_SORT_MODES = [
  "workflow",
  "due-date",
  "created-date",
  "priority",
  "title",
] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskViewMode = (typeof TASK_VIEW_MODES)[number];
export type TaskSortMode = (typeof TASK_SORT_MODES)[number];

export type Task = {
  id: string;
  title: string;
  description: string;
  notes: string;
  category: string;
  project: string;
  sender: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskDraft = {
  title: string;
  description: string;
  notes: string;
  category: string;
  project: string;
  sender: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
};

export type TaskFilters = {
  search: string;
  category: string;
  priority: string;
  status: string;
};

export type TaskStats = {
  total: number;
  open: number;
  done: number;
  overdue: number;
  dueSoon: number;
};