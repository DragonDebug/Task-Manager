const events = [
  { title: "Sprint planning", time: "Mon · 10:00 AM", owner: "Product" },
  { title: "Design sync", time: "Tue · 1:30 PM", owner: "UX" },
  { title: "Release checkpoint", time: "Thu · 9:00 AM", owner: "Engineering" },
  { title: "Retrospective", time: "Fri · 4:00 PM", owner: "Team" },
];

export default function CalendarPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#57606a]">
          Calendar
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f2328]">
          Team schedule for the current delivery cycle
        </h1>
      </section>

      <section className="rounded-2xl border border-[#d0d7de] bg-white shadow-sm">
        <div className="divide-y divide-[#d8dee4]">
          {events.map((event) => (
            <article
              key={event.title}
              className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-[#1f2328]">
                  {event.title}
                </h2>
                <p className="mt-1 text-sm text-[#57606a]">{event.owner}</p>
              </div>
              <span className="text-sm font-medium text-[#57606a]">
                {event.time}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
