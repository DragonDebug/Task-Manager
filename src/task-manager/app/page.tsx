import Link from "next/link";
import { navigationItems } from "@/components/navigation/navigation-items";

const homeLinks = navigationItems.filter((item) => item.href !== "/");

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#57606a]">
              Home
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f2328] sm:text-4xl">
              Route quickly into the parts of the workspace your team needs.
            </h1>
            <p className="mt-3 text-sm leading-7 text-[#57606a] sm:text-base">
              The root page now acts as a simple entry point. Start with the new
              dashboard summary or move directly into tasks, projects, calendar,
              team, and settings.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center rounded-md bg-[#1f6feb] px-4 text-sm font-semibold text-white transition hover:bg-[#1158c7]"
            >
              Open dashboard
            </Link>
            <Link
              href="/tasks"
              className="inline-flex h-11 items-center rounded-md border border-[#d0d7de] bg-white px-4 text-sm font-semibold text-[#1f2328] transition hover:bg-[#f6f8fa]"
            >
              Browse tasks
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1f2328]">
            Workspace routes
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#57606a]">
            Use these links to move into the dedicated pages across the task
            manager app.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {homeLinks.map((item) => (
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
      </section>
    </main>
  );
}
