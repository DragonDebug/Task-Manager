export type TaskStatus =
  | "Backlog"
  | "Pending"
  | "Ready"
  | "In progress"
  | "Blocked"
  | "In review"
  | "Done";

export type TaskPriority = "Critical" | "High" | "Medium" | "Low";

export type TaskRecord = {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdOn: string;
  startedOn?: string;
  completedOn?: string;
  dueOn: string;
};

export const taskReferenceDate = "2026-06-14";

export const mockTasks: readonly TaskRecord[] = [
  {
    id: "finalize-sprint-planning",
    title: "Finalize sprint planning",
    project: "Platform refresh",
    status: "In progress",
    priority: "High",
    createdOn: "2026-06-10",
    startedOn: "2026-06-11",
    dueOn: "2026-06-14",
  },
  {
    id: "review-onboarding-checklist",
    title: "Review onboarding checklist",
    project: "People ops",
    status: "Pending",
    priority: "Medium",
    createdOn: "2026-06-12",
    dueOn: "2026-06-15",
  },
  {
    id: "prepare-analytics-handoff",
    title: "Prepare analytics handoff",
    project: "Executive dashboard",
    status: "Blocked",
    priority: "Critical",
    createdOn: "2026-06-07",
    startedOn: "2026-06-09",
    dueOn: "2026-06-12",
  },
  {
    id: "refine-backlog-labels",
    title: "Refine backlog labels",
    project: "Support automation",
    status: "Done",
    priority: "Low",
    createdOn: "2026-06-03",
    startedOn: "2026-06-04",
    completedOn: "2026-06-13",
    dueOn: "2026-06-20",
  },
  {
    id: "align-launch-qa-checklist",
    title: "Align launch QA checklist",
    project: "Release operations",
    status: "Ready",
    priority: "High",
    createdOn: "2026-06-08",
    startedOn: "2026-06-10",
    dueOn: "2026-06-16",
  },
  {
    id: "scope-reporting-automation",
    title: "Scope reporting automation",
    project: "Finance systems",
    status: "Backlog",
    priority: "Medium",
    createdOn: "2026-06-11",
    dueOn: "2026-06-24",
  },
  {
    id: "triage-support-escalation-flow",
    title: "Triage support escalation flow",
    project: "Customer care",
    status: "In progress",
    priority: "Critical",
    createdOn: "2026-06-02",
    startedOn: "2026-06-08",
    dueOn: "2026-06-14",
  },
  {
    id: "audit-vendor-renewals",
    title: "Audit vendor renewals",
    project: "Procurement",
    status: "Pending",
    priority: "Low",
    createdOn: "2026-06-05",
    dueOn: "2026-06-19",
  },
  {
    id: "update-mobile-empty-states",
    title: "Update mobile empty states",
    project: "Mobile refresh",
    status: "In review",
    priority: "High",
    createdOn: "2026-06-01",
    startedOn: "2026-06-06",
    dueOn: "2026-06-13",
  },
  {
    id: "reconcile-invoice-exceptions",
    title: "Reconcile invoice exceptions",
    project: "Billing cleanup",
    status: "Blocked",
    priority: "Medium",
    createdOn: "2026-06-09",
    startedOn: "2026-06-10",
    dueOn: "2026-06-13",
  },
  {
    id: "prepare-board-metrics-brief",
    title: "Prepare board metrics brief",
    project: "Executive dashboard",
    status: "Done",
    priority: "High",
    createdOn: "2026-06-06",
    startedOn: "2026-06-07",
    completedOn: "2026-06-10",
    dueOn: "2026-06-10",
  },
  {
    id: "build-api-rate-limit-alerts",
    title: "Build API rate-limit alerts",
    project: "Platform refresh",
    status: "Backlog",
    priority: "Critical",
    createdOn: "2026-06-09",
    dueOn: "2026-06-18",
  },
  {
    id: "refresh-customer-retention-deck",
    title: "Refresh customer retention deck",
    project: "Growth insights",
    status: "Ready",
    priority: "Medium",
    createdOn: "2026-06-04",
    dueOn: "2026-06-18",
  },
  {
    id: "clean-up-stale-feature-flags",
    title: "Clean up stale feature flags",
    project: "Developer experience",
    status: "Done",
    priority: "Medium",
    createdOn: "2026-06-02",
    startedOn: "2026-06-03",
    completedOn: "2026-06-05",
    dueOn: "2026-06-06",
  },
  {
    id: "map-data-migration-rollback",
    title: "Map data migration rollback",
    project: "Data platform",
    status: "In progress",
    priority: "High",
    createdOn: "2026-06-13",
    startedOn: "2026-06-13",
    dueOn: "2026-06-21",
  },
  {
    id: "draft-incident-retro",
    title: "Draft incident retro",
    project: "Operations",
    status: "Backlog",
    priority: "Low",
    createdOn: "2026-06-14",
    dueOn: "2026-06-22",
  },
  {
    id: "qa-workspace-permissions",
    title: "QA workspace permissions",
    project: "Security hardening",
    status: "In review",
    priority: "Medium",
    createdOn: "2026-06-08",
    startedOn: "2026-06-09",
    dueOn: "2026-06-16",
  },
  {
    id: "close-sprint-expense-report",
    title: "Close sprint expense report",
    project: "Finance operations",
    status: "Done",
    priority: "Low",
    createdOn: "2026-06-01",
    startedOn: "2026-06-02",
    completedOn: "2026-06-02",
    dueOn: "2026-06-03",
  },
];

export type TaskDashboardInsights = {
  totalTasks: number;
  createdThisWeek: number;
  openOrOngoingTasks: number;
  startedThisWeek: number;
  completedTasks: number;
  completedThisWeek: number;
  criticalOrHighPriorityTasks: number;
  criticalTasks: number;
  pendingTasks: number;
  pendingDueSoon: number;
  backlogTasks: number;
  backlogAddedThisWeek: number;
  overdueTasks: number;
  highPriorityOverdueTasks: number;
  dueSoonTasks: number;
  dueTodayTasks: number;
  blockedTasks: number;
  criticalBlockers: number;
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const openTaskStatuses: ReadonlySet<TaskStatus> = new Set([
  "Pending",
  "Ready",
  "In progress",
  "Blocked",
  "In review",
]);

const elevatedPriorities: ReadonlySet<TaskPriority> = new Set([
  "Critical",
  "High",
]);

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function toDateStamp(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  return Date.UTC(year, month - 1, day);
}

function shiftDateStamp(stamp: number, days: number) {
  return stamp + days * DAY_IN_MS;
}

function getStartOfWeekStamp(stamp: number) {
  const dayOfWeek = new Date(stamp).getUTCDay();
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  return shiftDateStamp(stamp, -offset);
}

function isDateWithinRange(
  value: string | undefined,
  startStamp: number,
  endStamp: number,
) {
  if (!value) {
    return false;
  }

  const stamp = toDateStamp(value);

  return stamp >= startStamp && stamp <= endStamp;
}

function isTaskOverdue(task: TaskRecord, referenceStamp: number) {
  return task.status !== "Done" && toDateStamp(task.dueOn) < referenceStamp;
}

export function formatTaskDueDate(
  dueOn: string,
  referenceDate = taskReferenceDate,
) {
  const referenceStamp = toDateStamp(referenceDate);
  const dueStamp = toDateStamp(dueOn);

  if (dueStamp === referenceStamp) {
    return "Today";
  }

  if (dueStamp === shiftDateStamp(referenceStamp, 1)) {
    return "Tomorrow";
  }

  return shortDateFormatter.format(new Date(dueStamp));
}

export function getTaskDashboardInsights(
  taskList: readonly TaskRecord[] = mockTasks,
  referenceDate = taskReferenceDate,
): TaskDashboardInsights {
  const referenceStamp = toDateStamp(referenceDate);
  const startOfWeekStamp = getStartOfWeekStamp(referenceStamp);
  const dueSoonEndStamp = shiftDateStamp(referenceStamp, 3);
  const pendingTasks = taskList.filter((task) => task.status === "Pending");
  const backlogTasks = taskList.filter((task) => task.status === "Backlog");
  const blockedTasks = taskList.filter((task) => task.status === "Blocked");
  const overdueTasks = taskList.filter((task) =>
    isTaskOverdue(task, referenceStamp),
  );

  return {
    totalTasks: taskList.length,
    createdThisWeek: taskList.filter((task) =>
      isDateWithinRange(task.createdOn, startOfWeekStamp, referenceStamp),
    ).length,
    openOrOngoingTasks: taskList.filter((task) =>
      openTaskStatuses.has(task.status),
    ).length,
    startedThisWeek: taskList.filter(
      (task) =>
        openTaskStatuses.has(task.status) &&
        isDateWithinRange(task.startedOn, startOfWeekStamp, referenceStamp),
    ).length,
    completedTasks: taskList.filter((task) => task.status === "Done").length,
    completedThisWeek: taskList.filter((task) =>
      isDateWithinRange(task.completedOn, startOfWeekStamp, referenceStamp),
    ).length,
    criticalOrHighPriorityTasks: taskList.filter((task) =>
      elevatedPriorities.has(task.priority),
    ).length,
    criticalTasks: taskList.filter((task) => task.priority === "Critical")
      .length,
    pendingTasks: pendingTasks.length,
    pendingDueSoon: pendingTasks.filter((task) => {
      const dueStamp = toDateStamp(task.dueOn);

      return dueStamp >= referenceStamp && dueStamp <= dueSoonEndStamp;
    }).length,
    backlogTasks: backlogTasks.length,
    backlogAddedThisWeek: backlogTasks.filter((task) =>
      isDateWithinRange(task.createdOn, startOfWeekStamp, referenceStamp),
    ).length,
    overdueTasks: overdueTasks.length,
    highPriorityOverdueTasks: overdueTasks.filter((task) =>
      elevatedPriorities.has(task.priority),
    ).length,
    dueSoonTasks: taskList.filter((task) => {
      if (task.status === "Done") {
        return false;
      }

      const dueStamp = toDateStamp(task.dueOn);

      return dueStamp >= referenceStamp && dueStamp <= dueSoonEndStamp;
    }).length,
    dueTodayTasks: taskList.filter(
      (task) =>
        task.status !== "Done" && toDateStamp(task.dueOn) === referenceStamp,
    ).length,
    blockedTasks: blockedTasks.length,
    criticalBlockers: blockedTasks.filter(
      (task) => task.priority === "Critical",
    ).length,
  };
}
