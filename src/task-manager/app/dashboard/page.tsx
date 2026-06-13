import TaskSummary, {
  type TaskSummaryMetric,
} from "@/components/dashboard/task-summary";

const taskSummaryMetrics: readonly TaskSummaryMetric[] = [
  {
    label: "Total tasks",
    value: 128,
    tone: "blue",
  },
  {
    label: "Open or ongoing tasks",
    value: 46,
    tone: "violet",
  },
  {
    label: "Completed tasks",
    value: 71,
    tone: "emerald",
  },
  {
    label: "Critical or high priority tasks",
    value: 11,
    tone: "rose",
  },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
      <TaskSummary metrics={taskSummaryMetrics} size="small" />
    </main>
  );
}
