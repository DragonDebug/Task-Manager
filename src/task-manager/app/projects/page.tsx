const projects = [
  { name: "Platform refresh", progress: "82%", stage: "Build" },
  { name: "Executive dashboard", progress: "61%", stage: "Review" },
  { name: "Support automation", progress: "47%", stage: "Planning" },
];

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#57606a]">
          Projects
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f2328]">
          Delivery pipelines at a glance
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#57606a]">
          Monitor project health, unblock delivery, and keep milestones visible
          across the team.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[#1f2328]">
                  {project.name}
                </h2>
                <p className="mt-1 text-sm text-[#57606a]">
                  Stage: {project.stage}
                </p>
              </div>
              <span className="rounded-full bg-[#eaeef2] px-3 py-1 text-xs font-semibold text-[#57606a]">
                {project.progress}
              </span>
            </div>

            <div className="mt-5 h-2 rounded-full bg-[#eaeef2]">
              <div
                className="h-2 rounded-full bg-[#1f6feb]"
                style={{ width: project.progress }}
              />
            </div>

            <p className="mt-4 text-sm leading-6 text-[#57606a]">
              Align upcoming reviews, staffing, and release scope from one
              shared project summary.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
