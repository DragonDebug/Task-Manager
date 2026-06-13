const tasks = [
  {
    title: "Finalize sprint planning",
    project: "Platform refresh",
    status: "In progress",
    due: "Today",
  },
  {
    title: "Review onboarding checklist",
    project: "People ops",
    status: "Ready",
    due: "Tomorrow",
  },
  {
    title: "Prepare analytics handoff",
    project: "Executive dashboard",
    status: "Blocked",
    due: "Jun 18",
  },
  {
    title: "Refine backlog labels",
    project: "Support automation",
    status: "Done",
    due: "Jun 20",
  },
];

type TasksPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

function matchesQuery(task: (typeof tasks)[number], normalizedQuery: string) {
  return [task.title, task.project, task.status, task.due]
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const normalizedQuery = query.toLowerCase();
  const filteredTasks = normalizedQuery
    ? tasks.filter((task) => matchesQuery(task, normalizedQuery))
    : tasks;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#57606a]">
          Tasks
        </p>
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
              ? `Showing ${filteredTasks.length} result${filteredTasks.length === 1 ? "" : "s"} for “${query}”.`
              : `Showing ${filteredTasks.length} active tasks.`}
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
                key={task.title}
                className="grid grid-cols-[1.6fr_1fr_0.9fr_0.8fr] gap-4 px-6 py-5 text-sm text-[#1f2328]"
              >
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <p className="mt-1 text-[#57606a]">
                    Owner view aligned for the current sprint.
                  </p>
                </div>
                <p>{task.project}</p>
                <p>
                  <span className="inline-flex rounded-full bg-[#ddf4ff] px-2.5 py-1 text-xs font-semibold text-[#0969da]">
                    {task.status}
                  </span>
                </p>
                <p>{task.due}</p>
              </article>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-sm text-[#57606a]">
              No tasks matched “{query}”. Try a project name, status, or due
              window.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
