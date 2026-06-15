import type { TaskPriority } from "@/lib/mock-tasks";
import type { TaskCategory } from "@/lib/task-card-types";
import { PRIORITY_COLORS, CATEGORY_COLORS } from "@/lib/task-card-types";

type BadgeProps = {
  className?: string;
};

export function PriorityBadge({ priority, className = "" }: { priority: TaskPriority } & BadgeProps) {
  const colors = PRIORITY_COLORS[priority];

  return (
    <span
      className={`inline-flex items-center min-w-[4rem] justify-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider ${className}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      <span
        className="inline-block h-0.5 w-10 rounded-full"
        style={{ backgroundColor: colors.dot }}
      />
      {priority}
    </span>
  );
}

export function CategoryBadge({ category, className = "" }: { category: TaskCategory } & BadgeProps) {
  const colors = CATEGORY_COLORS[category];

  return (
    <span
      className={`inline-flex items-center min-w-[6.5rem] justify-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${className}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      {category}
    </span>
  );
}

export function ProjectBadge({ project, className = "" }: { project: string } & BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-2.5 py-0.5 text-[0.65rem] font-medium text-[var(--muted)] ${className}`}
    >
      {project}
    </span>
  );
}
