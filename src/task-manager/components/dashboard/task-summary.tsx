import TaskSummaryCard, { type TaskSummaryTone } from "./task-summary-card";

export type TaskSummarySize = "small" | "medium" | "large";

export type TaskSummaryMetric = {
  label: string;
  value: number;
  detail?: string;
  tone?: TaskSummaryTone;
};

type TaskSummaryProps = {
  title?: string;
  description?: string;
  metrics: readonly TaskSummaryMetric[];
  size?: TaskSummarySize;
};

const sectionStyles: Record<
  TaskSummarySize,
  {
    wrapper: string;
    title: string;
    description: string;
    grid: string;
    headerGap: string;
  }
> = {
  small: {
    wrapper: "p-3.5 sm:p-4",
    title: "text-base",
    description: "text-sm leading-6",
    grid: "gap-2.5",
    headerGap: "mt-3",
  },
  medium: {
    wrapper: "p-4.5 sm:p-5",
    title: "text-lg",
    description: "text-sm leading-6",
    grid: "gap-3",
    headerGap: "mt-4",
  },
  large: {
    wrapper: "p-5 sm:p-6",
    title: "text-xl",
    description: "text-base leading-7",
    grid: "gap-4",
    headerGap: "mt-5",
  },
};

export default function TaskSummary({
  title,
  description,
  metrics,
  size = "medium",
}: TaskSummaryProps) {
  const styles = sectionStyles[size];
  const hasHeader = Boolean(title || description);

  return (
    <section
      className={[
        "relative overflow-hidden rounded-[24px] border border-[var(--summary-border)] bg-[linear-gradient(135deg,var(--summary-shell-top),var(--summary-shell-bottom))] shadow-[0_20px_50px_-34px_rgba(15,23,42,0.55)] backdrop-blur-sm",
        styles.wrapper,
      ].join(" ")}
    >

      {hasHeader ? (
        <div className="relative max-w-3xl">
          {title ? (
            <h2
              className={[
                "font-semibold tracking-tight text-[var(--foreground)]",
                styles.title,
              ].join(" ")}
            >
              {title}
            </h2>
          ) : null}

          {description ? (
            <p
              className={[
                "mt-2 text-[var(--summary-muted)]",
                styles.description,
              ].join(" ")}
            >
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      <div
        className={[
          "relative grid md:grid-cols-2 lg:grid-cols-4",
          styles.grid,
          hasHeader ? styles.headerGap : "",
        ].join(" ")}
      >
        {metrics.map((metric) => (
          <TaskSummaryCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            detail={metric.detail}
            size={size}
            tone={metric.tone}
          />
        ))}
      </div>
    </section>
  );
}
