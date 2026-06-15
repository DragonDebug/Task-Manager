import TaskSummary, {
  type TaskSummaryMetric,
} from "@/components/dashboard/task-summary";
import { getTaskDashboardInsights } from "@/lib/mock-tasks";

const taskInsights = getTaskDashboardInsights();

const taskSummaryMetrics: readonly TaskSummaryMetric[] = [
  {
    label: "Total tasks",
    value: taskInsights.totalTasks,
    detail: `${taskInsights.createdThisWeek} created this week`,
    tone: "slate",
  },
  {
    label: "Open/ongoing",
    value: taskInsights.openOrOngoingTasks,
    detail: `${taskInsights.startedThisWeek} started this week`,
    tone: "blue",
  },
  {
    label: "Completed",
    value: taskInsights.completedTasks,
    detail: `${taskInsights.completedThisWeek} completed this week`,
    tone: "emerald",
  },
  {
    label: "Critical/high",
    value: taskInsights.criticalOrHighPriorityTasks,
    detail: `${taskInsights.criticalTasks} critical tasks`,
    tone: "rose",
  },
  {
    label: "Pending",
    value: taskInsights.pendingTasks,
    detail: `${taskInsights.pendingDueSoon} due in 3 days`,
    tone: "amber",
  },
  {
    label: "Backlog",
    value: taskInsights.backlogTasks,
    detail: `${taskInsights.backlogAddedThisWeek} added this week`,
    tone: "cyan",
  },
  {
    label: "Overdue",
    value: taskInsights.overdueTasks,
    detail: `${taskInsights.highPriorityOverdueTasks} high priority`,
    tone: "orange",
  },
  {
    label: "Blocked",
    value: taskInsights.blockedTasks,
    detail: `${taskInsights.criticalBlockers} critical blocker${
      taskInsights.criticalBlockers === 1 ? "" : "s"
    }`,
    tone: "fuchsia",
  },
];

export default function DashboardPage() {
  return (
    <main className="flex w-full flex-1 flex-col gap-4 px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
      <TaskSummary metrics={taskSummaryMetrics} size="medium" />
    </main>
  );
}
