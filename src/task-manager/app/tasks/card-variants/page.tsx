"use client";

import { TaskCardHorizontal, TaskCardVertical, TaskCardMinimal } from "@/components/task-card";
import { sampleTasks } from "@/lib/task-card-types";

export default function CardVariantsPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-16 px-6 py-10">
      {/* ── Version A — Horizontal ───────────────────────────────────── */}
      <section>
        <SectionHeading
          label="A"
          title="Horizontal Layout"
          description="Wide card with image left, content center, toggles right. Best for single-column views."
        />
        <div className="space-y-4">
          {sampleTasks.map((task) => (
            <TaskCardHorizontal key={task.id} task={task} />
          ))}
        </div>
      </section>

      {/* ── Version B — Vertical ─────────────────────────────────────── */}
      <section>
        <SectionHeading
          label="B"
          title="Vertical Compact"
          description="Image on top, stacked content below. Best for 2–4 column grid layouts."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sampleTasks.map((task) => (
            <TaskCardVertical key={task.id} task={task} />
          ))}
        </div>
      </section>

      {/* ── Version C — Minimal ──────────────────────────────────────── */}
      <section>
        <SectionHeading
          label="C"
          title="Minimal Accent"
          description="Data-dense list item with a left accent bar. Best for high-density task lists."
        />
        <div className="space-y-2">
          {sampleTasks.map((task) => (
            <TaskCardMinimal key={task.id} task={task} />
          ))}
        </div>
      </section>
    </main>
  );
}

// ── Section heading helper ───────────────────────────────────────────────────

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-[var(--accent-foreground)]">
          {label}
        </span>
        <h2 className="text-xl font-bold text-[var(--foreground)]">{title}</h2>
      </div>
      <p className="mt-1 pl-11 text-sm text-[var(--muted)]">{description}</p>
    </div>
  );
}
