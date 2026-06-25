"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { TaskStatus, TaskPriority } from "./mock-tasks";
import type { TaskCategory, TaskCardData } from "./task-card-types";
import type { Subtask } from "@/components/popup/subtask-list";
import { sampleTasks } from "./task-card-types";

// ── Comment type ────────────────────────────────────────────────────────────

export type TaskComment = {
  id: string;
  author: string;
  text: string;
  createdAt: string; // ISO date-time
};

// ── Full Task type (extends TaskCardData with all extra fields) ─────────────

export type Task = TaskCardData & {
  // People & classification
  assignee: string;
  tags: string[];

  // Subtasks & comments
  subtasks: Subtask[];
  comments: TaskComment[];

  // Extra text fields
  notes: string;

  // Date: received (when the request came in)
  receivedDate: string;

  // Email source metadata (optional)
  emailSubject: string;
  folderPath: string;
  senderName: string;
};

// ── Default values for the extra fields ─────────────────────────────────────

const EXTRA_DEFAULTS: Omit<Task, keyof TaskCardData> = {
  assignee: "",
  tags: [],
  subtasks: [],
  comments: [],
  notes: "",
  receivedDate: "",
  emailSubject: "",
  folderPath: "",
  senderName: "",
};

// ── Seed data: promote sampleTasks into full Task objects ───────────────────

function seedTasks(): Task[] {
  return sampleTasks.map((sample) => ({
    ...sample,
    ...EXTRA_DEFAULTS,
  }));
}

// ── Unique ID generator ─────────────────────────────────────────────────────

let _nextId = 100;
export function generateTaskId(): string {
  return `task-${Date.now()}-${_nextId++}`;
}

// ── Store shape ─────────────────────────────────────────────────────────────

type TaskStore = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => Task;
  updateTask: (id: string, patch: Partial<Omit<Task, "id">>) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
};

// ── Context ─────────────────────────────────────────────────────────────────

const TaskContext = createContext<TaskStore | null>(null);

/**
 * Hook to access the global task store.
 * Must be used inside <TaskProvider>.
 */
export function useTaskStore(): TaskStore {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTaskStore must be used within a <TaskProvider>");
  }
  return ctx;
}

// ── Provider ────────────────────────────────────────────────────────────────

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);

  /** Add a new task and return it (with generated id). */
  const addTask = useCallback((taskData: Omit<Task, "id">): Task => {
    const newTask: Task = { ...taskData, id: generateTaskId() };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  /** Partially update a task by id. Only provided fields are overwritten. */
  const updateTask = useCallback(
    (id: string, patch: Partial<Omit<Task, "id">>) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      );
    },
    [],
  );

  /** Remove a task by id. */
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /** Look up a single task (returns undefined if not found). */
  const getTask = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks],
  );

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, getTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
