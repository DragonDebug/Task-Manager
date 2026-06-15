import type { TaskStatus, TaskPriority } from "./mock-tasks";

// ── Extended task type for card display ──────────────────────────────────────

export type TaskCategory = "Work" | "Personal" | "Design" | "Development" | "Research" | "Operations";

export type TaskCardData = {
  id: string;
  title: string;
  description?: string;
  project: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number; // 0–100
  imageUrl?: string;
  itemCount: number;
  logCount: number;
  createdOn: string;
  startedOn?: string;
  completedOn?: string;
  dueOn: string;
};

// ── Color maps ───────────────────────────────────────────────────────────────

export const PRIORITY_COLORS: Record<TaskPriority, { bg: string; text: string; border: string; dot: string }> = {
  Critical: { bg: "rgba(239,68,68,0.14)", text: "#ef4444", border: "rgba(239,68,68,0.30)", dot: "#ef4444" },
  High:     { bg: "rgba(249,115,22,0.14)", text: "#f97316", border: "rgba(249,115,22,0.30)", dot: "#f97316" },
  Medium:   { bg: "rgba(234,179,8,0.14)",  text: "#eab308", border: "rgba(234,179,8,0.30)",  dot: "#eab308" },
  Low:      { bg: "rgba(34,197,94,0.14)",   text: "#22c55e", border: "rgba(34,197,94,0.30)",  dot: "#22c55e" },
};

export const CATEGORY_COLORS: Record<TaskCategory, { bg: string; text: string; border: string; accent: string }> = {
  Work:        { bg: "rgba(99,102,241,0.14)",  text: "#818cf8", border: "rgba(99,102,241,0.30)",  accent: "#6366f1" },
  Personal:    { bg: "rgba(236,72,153,0.14)",   text: "#f472b6", border: "rgba(236,72,153,0.30)",  accent: "#ec4899" },
  Design:      { bg: "rgba(168,85,247,0.14)",   text: "#c084fc", border: "rgba(168,85,247,0.30)",  accent: "#a855f7" },
  Development: { bg: "rgba(6,182,212,0.14)",    text: "#22d3ee", border: "rgba(6,182,212,0.30)",   accent: "#06b6d4" },
  Research:    { bg: "rgba(16,185,129,0.14)",   text: "#34d399", border: "rgba(16,185,129,0.30)",  accent: "#10b981" },
  Operations:  { bg: "rgba(245,158,11,0.14)",   text: "#fbbf24", border: "rgba(245,158,11,0.30)",  accent: "#f59e0b" },
};

export const STATUS_OPTIONS: TaskStatus[] = [
  "Backlog",
  "Pending",
  "Ready",
  "In progress",
  "Blocked",
  "In review",
  "Done",
];

export const PRIORITY_OPTIONS: TaskPriority[] = ["Critical", "High", "Medium", "Low"];

// ── Sample data for previews ─────────────────────────────────────────────────

export const sampleTasks: TaskCardData[] = [
  {
    id: "task-1",
    title: "Redesign dashboard analytics",
    description: "Update the main dashboard with new chart components and KPI widgets.",
    project: "Platform Refresh",
    category: "Design",
    status: "In progress",
    priority: "High",
    progress: 65,
    imageUrl: undefined,
    itemCount: 8,
    logCount: 12,
    createdOn: "2026-06-08",
    startedOn: "2026-06-10",
    dueOn: "2026-06-20",
  },
  {
    id: "task-2",
    title: "Implement API rate-limit alerts",
    description: "Add monitoring and alerting for API rate limit thresholds.",
    project: "Backend Systems",
    category: "Development",
    status: "Ready",
    priority: "Critical",
    progress: 0,
    imageUrl: undefined,
    itemCount: 3,
    logCount: 0,
    createdOn: "2026-06-12",
    dueOn: "2026-06-18",
  },
  {
    id: "task-3",
    title: "Review onboarding checklist",
    description: "Ensure all onboarding steps are up to date for new hires.",
    project: "People Ops",
    category: "Work",
    status: "Pending",
    priority: "Medium",
    progress: 30,
    imageUrl: undefined,
    itemCount: 5,
    logCount: 4,
    createdOn: "2026-06-05",
    startedOn: "2026-06-07",
    dueOn: "2026-06-15",
  },
  {
    id: "task-4",
    title: "Audit vendor contract renewals",
    description: "Cross-check all Q3 vendor contracts for renewal deadlines.",
    project: "Procurement",
    category: "Operations",
    status: "Done",
    priority: "Low",
    progress: 100,
    imageUrl: undefined,
    itemCount: 12,
    logCount: 8,
    createdOn: "2026-06-01",
    startedOn: "2026-06-02",
    completedOn: "2026-06-10",
    dueOn: "2026-06-14",
  },
];
