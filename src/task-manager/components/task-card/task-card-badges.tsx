import type { TaskPriority } from "@/lib/mock-tasks";
import type { TaskCategory } from "@/lib/task-card-types";
import { PRIORITY_COLORS, CATEGORY_COLORS } from "@/lib/task-card-types";

type BadgeProps = {
  className?: string;
};

// ── Priority bar counts (wifi-style) ────────────────────────────────────────
const PRIORITY_BARS: Record<TaskPriority, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 0, // uses danger icon instead
};

const TOTAL_BARS = 3;

/**
 * Wifi-style signal bars icon for Low/Medium/High priorities.
 * filledBars = how many of the 3 bars are filled (1–3).
 */
export function PriorityBarsIcon({
  filledBars,
  color,
  size = 12,
}: {
  filledBars: number;
  color: string;
  size?: number;
}) {
  const barWidth = size * 0.18;
  const gap = size * 0.1;
  const totalW = TOTAL_BARS * barWidth + (TOTAL_BARS - 1) * gap;
  const startX = (size - totalW) / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {Array.from({ length: TOTAL_BARS }, (_, i) => {
        const barHeight = ((i + 1) / TOTAL_BARS) * (size * 0.7);
        const x = startX + i * (barWidth + gap);
        const y = size * 0.85 - barHeight;
        const filled = i < filledBars;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={barWidth * 0.3}
            fill={filled ? color : "currentColor"}
            opacity={filled ? 1 : 0.2}
          />
        );
      })}
    </svg>
  );
}

/** Danger/warning triangle icon for Critical priority. */
export function CriticalDangerIcon({
  color,
  size = 12,
}: {
  color: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1.5L1 10.5h10L6 1.5z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6 5v2.5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="6" cy="9" r="0.6" fill={color} />
    </svg>
  );
}

/** Renders the appropriate priority icon (bars or danger). */
export function PriorityIcon({
  priority,
  color,
  size = 12,
}: {
  priority: TaskPriority;
  color: string;
  size?: number;
}) {
  if (priority === "Critical") {
    return <CriticalDangerIcon color={color} size={size} />;
  }
  return <PriorityBarsIcon filledBars={PRIORITY_BARS[priority]} color={color} size={size} />;
}

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
      <PriorityIcon priority={priority} color={colors.dot} size={12} />
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
