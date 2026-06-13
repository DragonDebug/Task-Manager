import type { CSSProperties } from "react";

export type TaskSummarySize = "small" | "medium" | "large";

export type TaskSummaryTone = "blue" | "violet" | "emerald" | "rose";

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
  }
> = {
  small: {
    padding: "px-3.5 py-3 sm:px-4 sm:py-3.5",
    label: "text-[0.6rem]",
    value: "text-[1.75rem] sm:text-[2rem]",
    detail: "text-[0.7rem] leading-4",
  },
  medium: {
    padding: "px-4 py-4 sm:px-5 sm:py-4.5",
    label: "text-xs",
    value: "text-[2.1rem]",
    detail: "text-sm leading-6",
  },
  large: {
    padding: "px-5 py-5 sm:px-6 sm:py-5.5",
    label: "text-xs",
    value: "text-[2.45rem]",
    detail: "text-sm leading-6",
  },
};

const toneStyles: Record<TaskSummaryTone, CSSProperties> = {
  blue: {
    "--summary-card-accent": "#f8f8f8",
    "--summary-card-accent-soft": "rgba(248, 248, 248, 0.18)",
  } as CSSProperties,
  violet: {
    "--summary-card-accent": "#2533f7",
    "--summary-card-accent-soft": "rgba(37, 51, 247, 0.18)",
  } as CSSProperties,
  emerald: {
    "--summary-card-accent": "#10b981",
    "--summary-card-accent-soft": "rgba(16, 185, 129, 0.18)",
  } as CSSProperties,
  rose: {
    "--summary-card-accent": "#ef4444",
    "--summary-card-accent-soft": "rgba(239, 68, 68, 0.18)",
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
        "relative overflow-hidden rounded-[24px] border border-[var(--summary-card-border)] bg-[linear-gradient(180deg,var(--summary-card-top),var(--summary-card-bottom))] shadow-[0_18px_40px_-30px_rgba(15,23,42,0.55)]",
        styles.padding,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--summary-card-accent-soft)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-[var(--summary-card-accent)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <p
            className={[
              "font-semibold uppercase tracking-[0.18em] text-[var(--summary-muted)]",
              styles.label,
            ].join(" ")}
          >
            {label}
          </p>

          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--summary-card-accent)]" />
        </div>

        <p
          className={[
            "mt-2.5 font-semibold tracking-tight text-[var(--summary-card-accent)]",
            styles.value,
          ].join(" ")}
        >
          {value}
        </p>

        {hasDetail ? (
          <p
            className={[
              "mt-1.5 max-w-[22ch] text-[var(--summary-muted)]",
              styles.detail,
            ].join(" ")}
          >
            {detail}
          </p>
        ) : null}
      </div>
    </article>
  );
}
