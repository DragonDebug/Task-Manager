const teamMembers = [
  { name: "Ava Patel", role: "Product lead", status: "In focus mode" },
  { name: "Marcus Chen", role: "Frontend engineer", status: "Available" },
  { name: "Nina Okafor", role: "Operations manager", status: "In meeting" },
  { name: "Owen Silva", role: "Data analyst", status: "Available" },
];

export default function TeamPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#57606a]">
          Team
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f2328]">
          See who is available to move work forward
        </h1>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="rounded-2xl border border-[#d0d7de] bg-white p-6 shadow-sm"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ddf4ff] text-sm font-semibold text-[#0969da]">
              {member.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[#1f2328]">
              {member.name}
            </h2>
            <p className="mt-1 text-sm text-[#57606a]">{member.role}</p>
            <p className="mt-4 rounded-full bg-[#f6f8fa] px-3 py-1.5 text-xs font-semibold text-[#57606a]">
              {member.status}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}