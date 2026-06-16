"use client";

import { useState, useCallback, type ReactNode } from "react";
import type { TaskStatus, TaskPriority } from "@/lib/mock-tasks";
import type { TaskCategory } from "@/lib/task-card-types";
import { StatusToggle, PriorityToggle, CategoryToggle } from "@/components/task-card";
import TaskCardImage from "@/components/task-card/task-card-image";
import Popup from "./popup";
import TabGroup, { type Tab } from "./tab-group";
import SubtaskList, { type Subtask } from "./subtask-list";

// ── Form state ───────────────────────────────────────────────────────────────

export type NewTaskFormData = {
  title: string;
  description: string;
  notes: string;
  imageUrl: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  subtasks: Subtask[];
  receivedDate: string;
  dueDate: string;
  startedDate: string;
  completionDate: string;
  emailSubject: string;
  folderPath: string;
  senderName: string;
};

const INITIAL_STATE: NewTaskFormData = {
  title: "",
  description: "",
  notes: "",
  imageUrl: "",
  status: "Pending",
  priority: "Medium",
  category: "Work",
  subtasks: [],
  receivedDate: "",
  dueDate: "",
  startedDate: "",
  completionDate: "",
  emailSubject: "",
  folderPath: "",
  senderName: "",
};

// ── Props ────────────────────────────────────────────────────────────────────

type NewTaskFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: NewTaskFormData) => void;
  /** Pre-fill values for editing. */
  initialData?: Partial<NewTaskFormData>;
};

// ── Tabs ─────────────────────────────────────────────────────────────────────

const TABS: Tab[] = [
  { id: "general", label: "General", icon: <TabIconGeneral /> },
  { id: "details", label: "Details", icon: <TabIconDetails /> },
  { id: "email", label: "Email Source", icon: <TabIconEmail /> },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function NewTaskForm({
  open,
  onClose,
  onSubmit,
  initialData,
}: NewTaskFormProps) {
  const [form, setForm] = useState<NewTaskFormData>(() => ({
    ...INITIAL_STATE,
    ...initialData,
  }));

  // Lightweight dirty tracking — flip to true on any change, no serialisation
  const [isDirty, setIsDirty] = useState(false);

  // ── Field helpers ────────────────────────────────────────────

  const set = useCallback(<K extends keyof NewTaskFormData>(key: K, value: NewTaskFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  function handleSubmit() {
    onSubmit?.(form);
    setIsDirty(false);
    onClose();
  }

  function handleClose() {
    setIsDirty(false);
    setForm({ ...INITIAL_STATE, ...initialData });
    onClose();
  }

  // ── Render ───────────────────────────────────────────────────

  const footerSlot = (
    <div className="flex items-center justify-end gap-3 px-6 py-4">
      <button
        type="button"
        onClick={handleClose}
        className="cursor-pointer rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!form.title.trim()}
        className="cursor-pointer rounded-lg bg-[var(--accent)] px-5 py-2 text-xs font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Create Task
      </button>
    </div>
  );

  return (
    <Popup open={open} onClose={handleClose} dirty={isDirty} title="New Task" footer={footerSlot}>
      <TabGroup tabs={TABS} defaultTab="general">
        {(activeTab) => (
          <div className="p-6">
            {activeTab === "general" && (
              <GeneralTab form={form} set={set} />
            )}
            {activeTab === "details" && (
              <DetailsTab form={form} set={set} />
            )}
            {activeTab === "email" && (
              <EmailTab form={form} set={set} />
            )}
          </div>
        )}
      </TabGroup>
    </Popup>
  );
}

// ── Tab panels ───────────────────────────────────────────────────────────────

type TabPanelProps = {
  form: NewTaskFormData;
  set: <K extends keyof NewTaskFormData>(key: K, value: NewTaskFormData[K]) => void;
};

/** Tab 1 — General: title, description, image, priority, category, status */
function GeneralTab({ form, set }: TabPanelProps) {
  return (
    <div className="space-y-6">
      {/* Title + Image row */}
      <div className="flex gap-5">
        {/* Image / icon area */}
        <div className="flex flex-col items-center gap-2">
          <TaskCardImage
            category={form.category}
            imageUrl={form.imageUrl || undefined}
            title={form.title || "New Task"}
            size="lg"
          />
          <label className="cursor-pointer text-[0.6rem] font-medium text-[var(--accent)] hover:underline">
            Set image URL
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => set("imageUrl", e.target.value)}
              placeholder="https://..."
              className="mt-1 block w-28 rounded border border-[var(--border-color)] bg-[var(--surface)] px-2 py-1 text-[0.6rem] text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none"
            />
          </label>
        </div>

        {/* Title + Description */}
        <div className="flex flex-1 flex-col gap-3">
          <FormField label="Task Title" required>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="What needs to be done?"
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none"
            />
          </FormField>

          <FormField label="Description">
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Add a description..."
              rows={3}
              className="w-full resize-none rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none"
            />
          </FormField>
        </div>
      </div>

      {/* Toggles row */}
      <div className="flex flex-wrap items-start gap-3">
        <StatusToggle
          value={form.status}
          onChange={(v) => set("status", v)}
        />
        <PriorityToggle
          value={form.priority}
          onChange={(v) => set("priority", v)}
        />
        <CategoryToggle
          value={form.category}
          onChange={(v) => set("category", v)}
        />
      </div>
    </div>
  );
}

/** Tab 2 — Details: notes, subtasks, dates */
function DetailsTab({ form, set }: TabPanelProps) {
  return (
    <div className="space-y-6">
      {/* Notes */}
      <FormField label="Notes">
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Additional notes..."
          rows={4}
          className="w-full resize-none rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none"
        />
      </FormField>

      {/* Subtasks */}
      <FormField label="Subtasks">
        <SubtaskList
          subtasks={form.subtasks}
          onChange={(v) => set("subtasks", v)}
        />
      </FormField>

      {/* Dates */}
      <div>
        <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
          Dates
        </p>
        <div className="grid grid-cols-2 gap-4">
          <DateField
            label="Received Date"
            value={form.receivedDate}
            onChange={(v) => set("receivedDate", v)}
          />
          <DateField
            label="Due Date"
            value={form.dueDate}
            onChange={(v) => set("dueDate", v)}
          />
          <DateField
            label="Started Date"
            value={form.startedDate}
            onChange={(v) => set("startedDate", v)}
          />
          <DateField
            label="Completion Date"
            value={form.completionDate}
            onChange={(v) => set("completionDate", v)}
          />
        </div>
      </div>
    </div>
  );
}

/** Tab 3 — Email Source: subject, folder path, sender name */
function EmailTab({ form, set }: TabPanelProps) {
  return (
    <div className="space-y-5">
      <p className="text-xs text-[var(--muted)]">
        Optional metadata linking this task to an email source.
      </p>

      <FormField label="Email Subject">
        <input
          type="text"
          value={form.emailSubject}
          onChange={(e) => set("emailSubject", e.target.value)}
          placeholder="Re: Project update..."
          className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none"
        />
      </FormField>

      <FormField label="Folder Path">
        <input
          type="text"
          value={form.folderPath}
          onChange={(e) => set("folderPath", e.target.value)}
          placeholder="Inbox/Projects/..."
          className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none"
        />
      </FormField>

      <FormField label="Sender Name">
        <input
          type="text"
          value={form.senderName}
          onChange={(e) => set("senderName", e.target.value)}
          placeholder="John Doe"
          className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none"
        />
      </FormField>
    </div>
  );
}

// ── Shared field wrappers ────────────────────────────────────────────────────

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
        {label}
        {required && <span className="text-red-400">*</span>}
      </span>
      {children}
    </label>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FormField label={label}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] focus:border-[var(--accent)]/40 focus:outline-none"
      />
    </FormField>
  );
}

// ── Tab icons ────────────────────────────────────────────────────────────────

function TabIconGeneral() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function TabIconDetails() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M4 4h6M4 7h4M4 10h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function TabIconEmail() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 4.5L7 8l5.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
