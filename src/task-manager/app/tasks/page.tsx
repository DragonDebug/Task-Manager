import {
  formatTaskDueDate,
  mockTasks,
  type TaskRecord,
  type TaskStatus,
} from "@/lib/mock-tasks";
import Link from "next/link";
import NewTaskButton from "@/components/popup/new-task-button";

const statusBadgeStyles: Record<TaskStatus, string> = {
  Backlog: "bg-[#fef3c7] text-[#92400e]",
  Pending: "bg-[#ffedd5] text-[#b45309]",
  Ready: "bg-[#dbeafe] text-[#1d4ed8]",
  "In progress": "bg-[#ddf4ff] text-[#0969da]",
  Blocked: "bg-[#ffe4e6] text-[#be123c]",
  "In review": "bg-[#ede9fe] text-[#6d28d9]",
  Done: "bg-[#dcfce7] text-[#047857]",
};

type TasksPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

function matchesQuery(task: TaskRecord, normalizedQuery: string) {
  return [
    task.title,
    task.project,
    task.status,
    task.priority,
    task.dueOn,
    formatTaskDueDate(task.dueOn),
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const normalizedQuery = query.toLowerCase();
  const filteredTasks = normalizedQuery
    ? mockTasks.filter((task) => matchesQuery(task, normalizedQuery))
    : mockTasks;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#57606a]">
            Tasks
          </p>
          <NewTaskButton />
        </div>
        <Link href="/tasks/card-variants" className="text-sm font-semibold text-[#1d4ed8]">
           View card variants
        </Link>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1f2328]">
              Active task board
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#57606a]">
              Search from the top bar to route into this view with a focused
              result set.
            </p>
          </div>

          <div className="rounded-lg border border-[#d8dee4] bg-[#f6f8fa] px-4 py-3 text-sm text-[#57606a]">
            {query
              ? `Showing ${filteredTasks.length} result${filteredTasks.length === 1 ? "" : "s"} for "${query}".`
              : `Showing ${filteredTasks.length} tasks.`}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#d0d7de] bg-white shadow-sm">
        <div className="grid grid-cols-[1.6fr_1fr_0.9fr_0.8fr] gap-4 border-b border-[#d8dee4] bg-[#f6f8fa] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#57606a]">
          <span>Task</span>
          <span>Project</span>
          <span>Status</span>
          <span>Due</span>
        </div>

        <div className="divide-y divide-[#d8dee4]">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <article
                key={task.id}
                className="grid grid-cols-[1.6fr_1fr_0.9fr_0.8fr] gap-4 px-6 py-5 text-sm text-[#1f2328]"
              >
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <p className="mt-1 text-[#57606a]">
                    {task.priority} priority
                  </p>
                </div>
                <p>{task.project}</p>
                <p>
                  <span
                    className={[
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                      statusBadgeStyles[task.status],
                    ].join(" ")}
                  >
                    {task.status}
                  </span>
                </p>
                <p>{formatTaskDueDate(task.dueOn)}</p>
              </article>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-sm text-[#57606a]">
              No tasks matched &ldquo;{query}&rdquo;. Try a project name, status, or due
              window.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
