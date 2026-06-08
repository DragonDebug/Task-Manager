import {
  DEFAULT_TASK_DRAFT,
  PRIORITY_LABELS,
  SAMPLE_TASKS,
  STATUS_LABELS,
} from "@/features/tasks/lib/task-constants";
import type {
  Task,
  TaskFilters,
  TaskPriority,
  TaskSortMode,
  TaskStats,
  TaskStatus,
} from "@/features/tasks/types/task";

const STATUS_ORDER: Record<TaskStatus, number> = {
  ongoing: 0,
  waiting: 1,
  "not-started": 2,
  done: 3,
};

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
  "very-low": 4,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeTaskPriority(value: string): TaskPriority {
  const normalizedValue = value.toLowerCase().replace(/\s+/g, "-");

  if (normalizedValue in PRIORITY_LABELS) {
    return normalizedValue as TaskPriority;
  }

  if (normalizedValue === "verylow") {
    return "very-low";
  }

  return DEFAULT_TASK_DRAFT.priority;
}

function normalizeTaskStatus(value: string): TaskStatus {
  const normalizedValue = value.toLowerCase().replace(/\s+/g, "-");

  if (normalizedValue === "completed") {
    return "done";
  }

  if (normalizedValue === "in-progress") {
    return "ongoing";
  }

  if (normalizedValue in STATUS_LABELS) {
    return normalizedValue as TaskStatus;
  }

  return DEFAULT_TASK_DRAFT.status;
}

export function isTaskDone(task: Task): boolean {
  return task.status === "done";
}

export function isTaskOverdue(task: Task): boolean {
  if (!task.dueDate || isTaskDone(task)) {
    return false;
  }

  return task.dueDate < new Date().toISOString().slice(0, 10);
}

export function formatTaskDate(value: string, emptyLabel = "No date"): string {
  if (!value) {
    return emptyLabel;
  }

  const parsedValue = new Date(value);

  if (Number.isNaN(parsedValue.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedValue);
}

export function formatDueState(task: Task): string {
  if (!task.dueDate) {
    return "No due date";
  }

  if (isTaskDone(task)) {
    return "Completed";
  }

  if (isTaskOverdue(task)) {
    return "Overdue";
  }

  const dueDate = new Date(task.dueDate);
  const currentDate = new Date();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const dayDelta = Math.ceil(
    (dueDate.setHours(0, 0, 0, 0) - currentDate.setHours(0, 0, 0, 0)) /
      millisecondsPerDay,
  );

  if (dayDelta <= 3) {
    return "Due soon";
  }

  return "On track";
}

export function normalizeStoredTask(
  candidate: unknown,
  fallbackIndex: number,
): Task | null {
  if (!isRecord(candidate)) {
    return null;
  }

  const title = readString(candidate.title);

  if (!title) {
    return null;
  }

  const createdAt =
    readString(candidate.createdAt) ||
    readString(candidate.receivedAt) ||
    SAMPLE_TASKS[fallbackIndex % SAMPLE_TASKS.length]?.createdAt ||
    new Date().toISOString();

  return {
    id: readString(candidate.id) || `task-${fallbackIndex + 1}`,
    title,
    description: readString(candidate.description),
    notes: readString(candidate.notes),
    category: readString(candidate.category) || "General",
    project: readString(candidate.project),
    sender: readString(candidate.sender),
    priority: normalizeTaskPriority(readString(candidate.priority)),
    status: normalizeTaskStatus(readString(candidate.status)),
    dueDate: readString(candidate.dueDate),
    createdAt,
    updatedAt: readString(candidate.updatedAt) || createdAt,
  };
}

export function restoreStoredTasks(rawTasks: unknown): Task[] | null {
  if (!Array.isArray(rawTasks)) {
    return null;
  }

  const nextTasks = rawTasks
    .map((task, index) => normalizeStoredTask(task, index))
    .filter((task): task is Task => Boolean(task));

  return nextTasks.length ? nextTasks : null;
}

export function getVisibleTasks(
  tasks: Task[],
  filters: TaskFilters,
  sortMode: TaskSortMode,
  hideDone: boolean,
): Task[] {
  const searchValue = filters.search.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) => {
    if (hideDone && isTaskDone(task)) {
      return false;
    }

    if (filters.category && task.category !== filters.category) {
      return false;
    }

    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }

    if (filters.status && task.status !== filters.status) {
      return false;
    }

    if (!searchValue) {
      return true;
    }

    return [
      task.title,
      task.description,
      task.notes,
      task.category,
      task.project,
      task.sender,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchValue);
  });

  return filteredTasks.sort((leftTask, rightTask) => {
    if (sortMode === "title") {
      return leftTask.title.localeCompare(rightTask.title);
    }

    if (sortMode === "priority") {
      return (
        PRIORITY_ORDER[leftTask.priority] - PRIORITY_ORDER[rightTask.priority]
      );
    }

    if (sortMode === "due-date") {
      const leftDue = leftTask.dueDate || "9999-12-31";
      const rightDue = rightTask.dueDate || "9999-12-31";
      return leftDue.localeCompare(rightDue);
    }

    if (sortMode === "created-date") {
      return rightTask.createdAt.localeCompare(leftTask.createdAt);
    }

    return (
      STATUS_ORDER[leftTask.status] - STATUS_ORDER[rightTask.status] ||
      PRIORITY_ORDER[leftTask.priority] - PRIORITY_ORDER[rightTask.priority] ||
      (leftTask.dueDate || "9999-12-31").localeCompare(
        rightTask.dueDate || "9999-12-31",
      ) ||
      rightTask.updatedAt.localeCompare(leftTask.updatedAt)
    );
  });
}

export function getTaskStats(tasks: Task[]): TaskStats {
  let done = 0;
  let overdue = 0;
  let dueSoon = 0;

  tasks.forEach((task) => {
    if (isTaskDone(task)) {
      done += 1;
      return;
    }

    if (isTaskOverdue(task)) {
      overdue += 1;
    }

    if (formatDueState(task) === "Due soon") {
      dueSoon += 1;
    }
  });

  return {
    total: tasks.length,
    open: tasks.length - done,
    done,
    overdue,
    dueSoon,
  };
}

export function getTaskCategories(tasks: Task[]): string[] {
  return [
    ...new Set(tasks.map((task) => task.category).filter(Boolean)),
  ].sort();
}
