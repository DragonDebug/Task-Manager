import Link from "next/link";
import { navigationItems } from "@/components/navigation/navigation-items";

export default function Home() {
  const workspaceMetrics = [
    { label: "Open tasks", value: "18", detail: "+4 due today" },
    { label: "Active projects", value: "6", detail: "2 shipping this week" },
    { label: "Team availability", value: "94%", detail: "3 people in focus mode" },
  ];

  const highlights = [
    {
      title: "Sprint planning",
      detail: "Refine scope for the mobile onboarding milestone.",
      meta: "Today · 10:00 AM",
    },
    {
      title: "Ops review",
      detail: "Check blockers across support automation and account cleanup.",
      meta: "Today · 2:30 PM",
    },
    {
      title: "Release checkpoint",
      detail: "Confirm handoff for analytics dashboard v2.",
      meta: "Tomorrow · 9:00 AM",
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-[#d0d7de] bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#57606a]">
              Dashboard
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1f2328] sm:text-4xl">
              Keep delivery moving with one clear workspace.
            </h1>
            <p className="text-base leading-7 text-[#57606a] sm:text-lg">
              Review workload, jump between project areas, and route fast to the
              pages your team uses every day.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/tasks"
              className="inline-flex h-11 items-center rounded-md bg-[#1f6feb] px-4 text-sm font-semibold text-white transition hover:bg-[#1158c7]"
            >
              Open tasks
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-11 items-center rounded-md border border-[#d0d7de] bg-white px-4 text-sm font-semibold text-[#1f2328] transition hover:bg-[#f6f8fa]"
            >
              View projects
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {workspaceMetrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-xl border border-[#d0d7de] bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-[#57606a]">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-[#1f2328]">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-[#57606a]">{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <article className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#1f2328]">
                Quick access
              </h2>
              <p className="mt-1 text-sm text-[#57606a]">
                Jump directly into the main task manager sections.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-[#d8dee4] bg-[#f6f8fa] p-4 transition hover:border-[#1f6feb] hover:bg-[#edf4ff]"
              >
                <p className="text-sm font-semibold text-[#1f2328]">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-[#57606a]">{item.href}</p>
              </Link>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1f2328]">Upcoming</h2>
          <p className="mt-1 text-sm text-[#57606a]">
            Focus points to keep the week on schedule.
          </p>

          <div className="mt-5 space-y-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#d8dee4] bg-[#f6f8fa] p-4"
              >
                <p className="text-sm font-semibold text-[#1f2328]">
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#57606a]">
                  {item.detail}
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-[#57606a]">
                  {item.meta}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
