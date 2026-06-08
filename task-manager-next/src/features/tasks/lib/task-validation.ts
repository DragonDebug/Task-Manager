import { DEFAULT_TASK_DRAFT } from "@/features/tasks/lib/task-constants";
import type { TaskDraft } from "@/features/tasks/types/task";

export function sanitizeTaskDraft(draft: Partial<TaskDraft>): TaskDraft {
  return {
    title: String(draft.title ?? DEFAULT_TASK_DRAFT.title).trim(),
    description: String(draft.description ?? DEFAULT_TASK_DRAFT.description).trim(),
    notes: String(draft.notes ?? DEFAULT_TASK_DRAFT.notes).trim(),
    category: String(draft.category ?? DEFAULT_TASK_DRAFT.category).trim() || "General",
    project: String(draft.project ?? DEFAULT_TASK_DRAFT.project).trim(),
    sender: String(draft.sender ?? DEFAULT_TASK_DRAFT.sender).trim(),
    priority: draft.priority ?? DEFAULT_TASK_DRAFT.priority,
    status: draft.status ?? DEFAULT_TASK_DRAFT.status,
    dueDate: String(draft.dueDate ?? DEFAULT_TASK_DRAFT.dueDate).trim(),
  };
}

export function validateTaskDraft(draft: TaskDraft): string | null {
  if (!draft.title) {
    return "A task title is required.";
  }

  if (draft.title.length > 140) {
    return "Keep the task title under 140 characters.";
  }

  return null;
}