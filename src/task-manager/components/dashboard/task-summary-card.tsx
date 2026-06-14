import type { CSSProperties } from "react";

export type TaskSummarySize = "small" | "medium" | "large";

export type TaskSummaryTone =
  | "slate"
  | "blue"
  | "indigo"
  | "emerald"
  | "rose"
  | "amber"
  | "cyan"
  | "orange"
  | "fuchsia";

type TaskSummaryCardProps = {
  label: string;
  value: number;
  detail?: string;
  size: TaskSummarySize;
  tone?: TaskSummaryTone;
};

const cardSizeStyles: Record<
  TaskSummarySize,
  {
    padding: string;
    label: string;
    value: string;
    detail: string;
    shell: string;
    glow: string;
    dot: string;
    contentGap: string;
    labelWrap: string;
    detailWidth: string;
  }
> = {
  small: {
    padding: "px-3 py-2.5 sm:px-3 sm:py-2.5",
    label: "text-[0.54rem] leading-3",
    value: "text-[1.3rem] sm:text-[1.4rem]",
    detail: "text-[0.6rem] leading-[0.82rem]",
    shell: "rounded-[19px] shadow-[0_12px_24px_-20px_rgba(15,23,42,0.52)]",
    glow: "-right-7 -top-7 h-[4.5rem] w-[4.5rem]",
    dot: "h-1.5 w-1.5",
    contentGap: "gap-2.5",
    labelWrap: "gap-1.5",
    detailWidth: "max-w-[16ch]",
  },
  medium: {
    padding: "px-3.5 py-3.5 sm:px-4 sm:py-4",
    label: "text-[0.68rem]",
    value: "text-[1.9rem] sm:text-[2rem]",
    detail: "text-[0.82rem] leading-5",
    shell: "rounded-[20px] shadow-[0_14px_30px_-24px_rgba(15,23,42,0.55)]",
    glow: "-right-8 -top-8 h-20 w-20",
    dot: "h-2 w-2",
    contentGap: "gap-3",
    labelWrap: "gap-2",
    detailWidth: "max-w-[18ch]",
  },
  large: {
    padding: "px-4.5 py-4 sm:px-5 sm:py-4.5",
    label: "text-[0.72rem]",
    value: "text-[2.15rem] sm:text-[2.25rem]",
    detail: "text-[0.9rem] leading-6",
    shell: "rounded-[22px] shadow-[0_16px_34px_-26px_rgba(15,23,42,0.55)]",
    glow: "-right-9 -top-9 h-24 w-24",
    dot: "h-2 w-2",
    contentGap: "gap-3.5",
    labelWrap: "gap-2",
    detailWidth: "max-w-[20ch]",
  },
};

const toneStyles: Record<TaskSummaryTone, CSSProperties> = {
  slate: {
    "--summary-card-accent": "#64748b",
    "--summary-card-accent-soft": "rgba(100, 116, 139, 0.18)",
  } as CSSProperties,
  blue: {
    "--summary-card-accent": "#2563eb",
    "--summary-card-accent-soft": "rgba(37, 99, 235, 0.18)",
  } as CSSProperties,
  indigo: {
    "--summary-card-accent": "#4f46e5",
    "--summary-card-accent-soft": "rgba(79, 70, 229, 0.18)",
  } as CSSProperties,
  emerald: {
    "--summary-card-accent": "#10b981",
    "--summary-card-accent-soft": "rgba(16, 185, 129, 0.18)",
  } as CSSProperties,
  rose: {
    "--summary-card-accent": "#ef4444",
    "--summary-card-accent-soft": "rgba(239, 68, 68, 0.18)",
  } as CSSProperties,
  amber: {
    "--summary-card-accent": "#f59e0b",
    "--summary-card-accent-soft": "rgba(245, 158, 11, 0.18)",
  } as CSSProperties,
  cyan: {
    "--summary-card-accent": "#06b6d4",
    "--summary-card-accent-soft": "rgba(6, 182, 212, 0.18)",
  } as CSSProperties,
  orange: {
    "--summary-card-accent": "#f97316",
    "--summary-card-accent-soft": "rgba(249, 115, 22, 0.18)",
  } as CSSProperties,
  fuchsia: {
    "--summary-card-accent": "#d946ef",
    "--summary-card-accent-soft": "rgba(217, 70, 239, 0.18)",
  } as CSSProperties,
};

export default function TaskSummaryCard({
  label,
  value,
  detail,
  size,
  tone = "blue",
}: TaskSummaryCardProps) {
  const styles = cardSizeStyles[size];
  const hasDetail = Boolean(detail);

  return (
    <article
      style={toneStyles[tone]}
      className={[
        "relative overflow-hidden border border-[var(--summary-card-border)] bg-[linear-gradient(180deg,var(--summary-card-top),var(--summary-card-bottom))]",
        styles.shell,
        styles.padding,
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute rounded-full bg-[var(--summary-card-accent-soft)] blur-3xl",
          styles.glow,
        ].join(" ")}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[var(--summary-card-accent)]" />

      <div
        className={[
          "relative flex h-full items-start justify-between",
          styles.contentGap,
        ].join(" ")}
      >
        <div className="min-w-0 flex-1">
          <div className={["flex items-center", styles.labelWrap].join(" ")}>
            <span
              className={[
                "inline-flex shrink-0 rounded-full bg-[var(--summary-card-accent)]",
                styles.dot,
              ].join(" ")}
            />

            <p
              className={[
                "truncate whitespace-nowrap font-semibold uppercase tracking-[0.18em] text-[var(--summary-muted)]",
                styles.label,
              ].join(" ")}
            >
              {label}
            </p>
          </div>

          {hasDetail ? (
            <p
              className={[
                "mt-1 truncate whitespace-nowrap text-[var(--summary-muted)]",
                styles.detail,
                styles.detailWidth,
              ].join(" ")}
            >
              {detail}
            </p>
          ) : null}
        </div>

        <p
          className={[
            "shrink-0 font-semibold tracking-tight text-[var(--summary-card-accent)]",
            styles.value,
          ].join(" ")}
        >
          {value}
        </p>
      </div>
    </article>
  );
}
