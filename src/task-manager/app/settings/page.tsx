const settingsGroups = [
  {
    title: "Workspace defaults",
    detail: "Control naming, intake rules, and review cadence.",
  },
  {
    title: "Notifications",
    detail: "Tune summaries for due dates, blockers, and assignments.",
  },
  {
    title: "Integrations",
    detail: "Connect the tools your team uses to plan and ship work.",
  },
];

export default function SettingsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#57606a]">
          Settings
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f2328]">
          Configure the workspace around your delivery flow
        </h1>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {settingsGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-[#1f2328]">{group.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#57606a]">{group.detail}</p>
            <button className="mt-5 inline-flex h-10 items-center rounded-md border border-[#d0d7de] px-4 text-sm font-semibold text-[#1f2328] transition hover:bg-[#f6f8fa]">
              Manage
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}