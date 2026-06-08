"use client";

import { startTransition, useDeferredValue, useEffect, useState } from "react";

import {
  DEFAULT_HIDE_DONE,
  DEFAULT_TASK_FILTERS,
  DEFAULT_TASK_SORT_MODE,
  DEFAULT_TASK_VIEW_MODE,
  SAMPLE_TASKS,
  TASK_STORAGE_KEYS,
} from "@/features/tasks/lib/task-constants";
import {
  getTaskCategories,
  getTaskStats,
  getVisibleTasks,
  restoreStoredTasks,
} from "@/features/tasks/lib/task-selectors";
import {
  sanitizeTaskDraft,
  validateTaskDraft,
} from "@/features/tasks/lib/task-validation";
import type {
  Task,
  TaskDraft,
  TaskFilters,
  TaskSortMode,
  TaskViewMode,
} from "@/features/tasks/types/task";
import {
  getStoredJson,
  getStoredString,
  setStoredJson,
  setStoredString,
} from "@/shared/lib/local-storage";

function createTaskId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}`;
}

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_TASK_FILTERS);
  const [viewMode, setViewMode] = useState<TaskViewMode>(
    DEFAULT_TASK_VIEW_MODE,
  );
  const [sortMode, setSortMode] = useState<TaskSortMode>(
    DEFAULT_TASK_SORT_MODE,
  );
  const [hideDone, setHideDone] = useState(DEFAULT_HIDE_DONE);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(
    SAMPLE_TASKS[0]?.id ?? null,
  );
  const [isReady, setIsReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const deferredSearch = useDeferredValue(filters.search);
  const visibleTasks = getVisibleTasks(
    tasks,
    { ...filters, search: deferredSearch },
    sortMode,
    hideDone,
  );
  const stats = getTaskStats(tasks);
  const categories = getTaskCategories(tasks);
  const editingTask = tasks.find((task) => task.id === editingTaskId) ?? null;
  const selectedTask =
    visibleTasks.find((task) => task.id === selectedTaskId) ??
    visibleTasks[0] ??
    null;

  useEffect(() => {
    const initializationTimer = window.setTimeout(() => {
      const storedTasks = restoreStoredTasks(
        getStoredJson<unknown>(TASK_STORAGE_KEYS.tasks),
      );
      const storedFilters = getStoredJson<TaskFilters>(
        TASK_STORAGE_KEYS.filters,
      );
      const storedViewMode = getStoredString(TASK_STORAGE_KEYS.viewMode);
      const storedSortMode = getStoredString(TASK_STORAGE_KEYS.sortMode);
      const storedHideDone = getStoredString(TASK_STORAGE_KEYS.hideDone);

      startTransition(() => {
        if (storedTasks) {
          setTasks(storedTasks);
          setSelectedTaskId(storedTasks[0]?.id ?? null);
        }

        if (storedFilters) {
          setFilters({ ...DEFAULT_TASK_FILTERS, ...storedFilters });
        }

        if (
          storedViewMode === "default" ||
          storedViewMode === "compact" ||
          storedViewMode === "table"
        ) {
          setViewMode(storedViewMode);
        }

        if (
          storedSortMode === "workflow" ||
          storedSortMode === "due-date" ||
          storedSortMode === "created-date" ||
          storedSortMode === "priority" ||
          storedSortMode === "title"
        ) {
          setSortMode(storedSortMode);
        }

        if (storedHideDone === "true" || storedHideDone === "false") {
          setHideDone(storedHideDone === "true");
        }

        setIsReady(true);
      });
    }, 0);

    return () => window.clearTimeout(initializationTimer);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    setStoredJson(TASK_STORAGE_KEYS.tasks, tasks);
    setStoredJson(TASK_STORAGE_KEYS.filters, filters);
    setStoredString(TASK_STORAGE_KEYS.viewMode, viewMode);
    setStoredString(TASK_STORAGE_KEYS.sortMode, sortMode);
    setStoredString(TASK_STORAGE_KEYS.hideDone, String(hideDone));
  }, [filters, hideDone, isReady, sortMode, tasks, viewMode]);

  function updateFilters(nextFilters: Partial<TaskFilters>) {
    setFilters((currentFilters) => ({ ...currentFilters, ...nextFilters }));
  }

  function resetFilters() {
    setFilters(DEFAULT_TASK_FILTERS);
    setHideDone(DEFAULT_HIDE_DONE);
    setSortMode(DEFAULT_TASK_SORT_MODE);
    setViewMode(DEFAULT_TASK_VIEW_MODE);
  }

  function openCreateTaskModal() {
    setEditingTaskId(null);
    setFormError(null);
    setIsModalOpen(true);
  }

  function openEditTaskModal(taskId: string) {
    setEditingTaskId(taskId);
    setFormError(null);
    setIsModalOpen(true);
  }

  function closeTaskModal() {
    setIsModalOpen(false);
    setEditingTaskId(null);
    setFormError(null);
  }

  function saveTask(draft: TaskDraft) {
    const sanitizedDraft = sanitizeTaskDraft(draft);
    const validationError = validateTaskDraft(sanitizedDraft);

    if (validationError) {
      setFormError(validationError);
      return false;
    }

    const timestamp = new Date().toISOString();

    if (editingTaskId) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                ...sanitizedDraft,
                updatedAt: timestamp,
              }
            : task,
        ),
      );
      setSelectedTaskId(editingTaskId);
    } else {
      const nextTask: Task = {
        id: createTaskId(),
        ...sanitizedDraft,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      setTasks((currentTasks) => [nextTask, ...currentTasks]);
      setSelectedTaskId(nextTask.id);
    }

    closeTaskModal();
    return true;
  }

  function deleteTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );

    if (selectedTaskId === taskId) {
      const fallbackTask = tasks.find((task) => task.id !== taskId) ?? null;
      setSelectedTaskId(fallbackTask?.id ?? null);
    }

    if (editingTaskId === taskId) {
      closeTaskModal();
    }
  }

  function updateTaskStatus(taskId: string, nextStatus: Task["status"]) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: nextStatus,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  }

  return {
    tasks,
    visibleTasks,
    selectedTask,
    editingTask,
    categories,
    stats,
    filters,
    viewMode,
    sortMode,
    hideDone,
    isModalOpen,
    formError,
    setViewMode,
    setSortMode,
    setHideDone,
    setSelectedTaskId,
    updateFilters,
    resetFilters,
    openCreateTaskModal,
    openEditTaskModal,
    closeTaskModal,
    saveTask,
    deleteTask,
    updateTaskStatus,
  };
}
