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
    </main>
  );
}
