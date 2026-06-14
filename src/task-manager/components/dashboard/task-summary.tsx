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
    layout: string;
    item: string;
    headerGap: string;
  }
> = {
  small: {
    wrapper: "p-3 sm:p-3.5",
    title: "text-base",
    description: "text-sm leading-6",
    layout:
      "flex flex-wrap items-stretch gap-2 overflow-x-auto overflow-y-visible pb-1 sm:gap-2.5",
    item: "min-w-[10.75rem] max-w-[25.00rem] flex-[1_1_10.75rem]",
    headerGap: "mt-2.5",
  },
  medium: {
    wrapper: "p-4.5 sm:p-5",
    title: "text-lg",
    description: "text-sm leading-6",
    layout: "flex flex-wrap items-stretch gap-2 overflow-x-auto overflow-y-visible pb-1 sm:gap-2.5",
    item: "min-w-[10.75rem] max-w-[25.00rem] flex-[1_1_10.75rem]",
    headerGap: "mt-4",
  },
  large: {
    wrapper: "p-5 sm:p-6",
    title: "text-xl",
    description: "text-base leading-7",
    layout: "flex flex-wrap items-stretch gap-2 overflow-x-auto overflow-y-visible pb-1 sm:gap-2.5",
    item: "min-w-[10.75rem] max-w-[25.00rem] flex-[1_1_10.75rem]",
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
        "relative w-full overflow-hidden rounded-[20px] border border-[var(--summary-border)] bg-[linear-gradient(135deg,var(--summary-shell-top),var(--summary-shell-bottom))] shadow-[0_14px_34px_-28px_rgba(15,23,42,0.52)] backdrop-blur-sm",
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
          "relative",
          styles.layout,
          hasHeader ? styles.headerGap : "",
        ].join(" ")}
      >
        {metrics.map((metric) => (
          <div key={metric.label} className={styles.item}>
            <TaskSummaryCard
              label={metric.label}
              value={metric.value}
              detail={metric.detail}
              size={size}
              tone={metric.tone}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
