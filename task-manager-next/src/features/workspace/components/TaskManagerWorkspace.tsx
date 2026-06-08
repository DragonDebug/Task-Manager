"use client";

import { TaskDetailPanel } from "@/features/tasks/components/TaskDetailPanel";
import { TaskFormModal } from "@/features/tasks/components/TaskFormModal";
import { TaskList } from "@/features/tasks/components/TaskList";
import { useTaskManager } from "@/features/tasks/hooks/useTaskManager";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { WorkspaceFilters } from "@/features/workspace/components/WorkspaceFilters";
import { WorkspaceHeader } from "@/features/workspace/components/WorkspaceHeader";

export function TaskManagerWorkspace() {
  const { theme, toggleTheme } = useTheme();
  const {
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
  } = useTaskManager();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(91,125,255,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.12),transparent_18%),linear-gradient(180deg,color-mix(in_srgb,var(--surface2)_76%,transparent),transparent_26%)] px-0 pb-4 sm:px-3">
      <div className="mx-auto flex min-h-screen max-w-[1720px] flex-col gap-0">
        <WorkspaceHeader
          stats={stats}
          theme={theme}
          onCreateTask={openCreateTaskModal}
          onToggleTheme={toggleTheme}
        />

        <WorkspaceFilters
          categories={categories}
          filters={filters}
          hideDone={hideDone}
          sortMode={sortMode}
          viewMode={viewMode}
          onFiltersChange={updateFilters}
          onHideDoneChange={setHideDone}
          onSortModeChange={setSortMode}
          onViewModeChange={setViewMode}
          onReset={resetFilters}
        />

        <main
          className={`grid flex-1 gap-4 px-3 pt-3 ${
            viewMode === "table"
              ? "grid-cols-1"
              : "grid-cols-1 xl:h-[calc(100dvh-154px)] xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.9fr)] 2xl:grid-cols-[minmax(0,1.9fr)_minmax(380px,0.95fr)]"
          }`}
        >
          <section className="flex min-h-[32rem] flex-col overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] shadow-[var(--shadow-panel)] backdrop-blur-[16px] xl:min-h-0 xl:sticky xl:top-[118px]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border)] px-5 py-4">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">Focused Workspace</div>
                <p className="mt-1 text-[13px] text-[var(--text-muted)]">
                  {visibleTasks.length} visible task{visibleTasks.length === 1 ? "" : "s"} in the current view.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)]">
                <span className="rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5">
                  {viewMode === "table" ? "Table" : viewMode === "compact" ? "Compact" : "Cards"}
                </span>
                <span className="rounded-full border border-[color:rgba(91,125,255,0.24)] bg-[rgba(91,125,255,0.1)] px-3 py-1.5 text-[color:color-mix(in_srgb,var(--text)_76%,var(--accent)_24%)]">
                  {selectedTask ? "1 selected" : "Select a task"}
                </span>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 lg:px-5">
              <TaskList
                tasks={visibleTasks}
                selectedTaskId={selectedTask?.id ?? null}
                viewMode={viewMode}
                onSelectTask={setSelectedTaskId}
                onEditTask={openEditTaskModal}
                onUpdateTaskStatus={updateTaskStatus}
              />
            </div>
          </section>

          {viewMode === "table" ? null : (
            <aside className="min-h-[28rem] xl:min-h-0 xl:h-full xl:sticky xl:top-[118px]">
              <TaskDetailPanel
                task={selectedTask}
                onEditTask={openEditTaskModal}
                onDeleteTask={deleteTask}
                onUpdateTaskStatus={updateTaskStatus}
              />
            </aside>
          )}
        </main>
      </div>

      <TaskFormModal
        key={`${editingTask?.id ?? "create"}-${isModalOpen ? "open" : "closed"}`}
        open={isModalOpen}
        task={editingTask}
        error={formError}
        onClose={closeTaskModal}
        onSubmit={saveTask}
      />
    </div>
  );
}