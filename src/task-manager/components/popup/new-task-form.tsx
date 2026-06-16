"use client";

import {
  useState,
  useCallback,
  useMemo,
  useRef,
  memo,
  type ReactNode,
  type ChangeEvent,
} from "react";
import type { TaskStatus, TaskPriority } from "@/lib/mock-tasks";
import type { TaskCategory } from "@/lib/task-card-types";
import { StatusToggle, PriorityToggle, CategoryToggle } from "@/components/task-card";
import TaskCardImage from "@/components/task-card/task-card-image";
import { formatDate } from "@/lib/format-date";
import Popup from "./popup";
import TabGroup, { type Tab } from "./tab-group";
import SubtaskList, { type Subtask } from "./subtask-list";

/* ── Form state ──────────────────────────────────────────────────────────── */

export type NewTaskFormData = {
  title: string;
  description: string;
  notes: string;
  imageUrl: string;
  project: string;
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
  project: "",
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

/* ── Props ───────────────────────────────────────────────────────────────── */

export type NewTaskFormViewMode = "tabbed" | "single";

type NewTaskFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: NewTaskFormData) => void;
  initialData?: Partial<NewTaskFormData>;
  viewMode?: NewTaskFormViewMode;
};

/* ── Handler + ref types ─────────────────────────────────────────────────── */

type InputHandler = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

type FormRef = { current: NewTaskFormData };

/* ── Tabs ────────────────────────────────────────────────────────────────── */

const TABS: Tab[] = [
  { id: "general", label: "General", icon: <TabIconGeneral /> },
  { id: "details", label: "Details", icon: <TabIconDetails /> },
  { id: "email", label: "Email Source", icon: <TabIconEmail /> },
];

/* ── Shared CSS class strings (module-scope, zero allocation) ────────────── */

const INPUT_CLS =
  "w-full rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none";
const TEXTAREA_CLS = INPUT_CLS + " resize-none";
const TITLE_INPUT_CLS =
  "w-full rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none";
const IMG_URL_CLS =
  "mt-1 block w-28 rounded border border-[var(--border-color)] bg-[var(--surface)] px-2 py-1 text-[0.6rem] text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none";
const DATE_CLS =
  "w-full cursor-pointer rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--foreground)] focus:border-[var(--accent)]/40 focus:outline-none";

/* ═══════════════════════════════════════════════════════════════════════════
   Main component

   PERF STRATEGY
   ─────────────
   Form data lives in a ref, NOT in useState.  Text and date inputs are
   *uncontrolled* (defaultValue + name attr → shared handleInput writes to
   the ref).  Only fields whose value must trigger a visual update in OTHER
   components (toggles, image preview, subtask list, footer disabled state)
   use individual useState slices.

   Result: typing in 11 of 16 fields causes ZERO React re-renders.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function NewTaskForm({
  open,
  onClose,
  onSubmit,
  initialData,
  viewMode = "tabbed",
}: NewTaskFormProps) {
  /* ── Ref-based form storage (no re-renders on text input) ── */
  const formRef = useRef<NewTaskFormData>({ ...INITIAL_STATE, ...initialData });

  /* ── Stable refs for parent callbacks ── */
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const onSubmitRef = useRef(onSubmit);
  onSubmitRef.current = onSubmit;

  /* ── Reactive state — only what drives OTHER components' rendering ── */
  const [isDirty, setIsDirty] = useState(false);
  const [hasTitle, setHasTitle] = useState(() => !!formRef.current.title.trim());
  const [status, setStatusVal] = useState<TaskStatus>(formRef.current.status);
  const [priority, setPriorityVal] = useState<TaskPriority>(formRef.current.priority);
  const [category, setCategoryVal] = useState<TaskCategory>(formRef.current.category);
  const [imageUrl, setImageUrlVal] = useState(formRef.current.imageUrl);
  const [subtasks, setSubtasksVal] = useState<Subtask[]>(formRef.current.subtasks);

  /* ── Shared handler for ALL uncontrolled text / date inputs ──
       Reads the field key from the input's `name` attribute.
       Only triggers a re-render when:
         • isDirty flips false→true (once per session)
         • hasTitle transitions empty↔non-empty (rare) */
  const handleInput: InputHandler = useCallback((e) => {
    const key = e.target.name as keyof NewTaskFormData;
    (formRef.current as Record<string, unknown>)[key] = e.target.value;
    setIsDirty(true);
    if (key === "title") {
      setHasTitle(e.target.value.trim().length > 0);
    }
  }, []);

  /* ── Reactive setters for toggle / image / subtask values ── */
  const handleStatus = useCallback((v: TaskStatus) => {
    formRef.current.status = v;
    setStatusVal(v);
    setIsDirty(true);
  }, []);

  const handlePriority = useCallback((v: TaskPriority) => {
    formRef.current.priority = v;
    setPriorityVal(v);
    setIsDirty(true);
  }, []);

  const handleCategory = useCallback((v: TaskCategory) => {
    formRef.current.category = v;
    setCategoryVal(v);
    setIsDirty(true);
  }, []);

  const handleImageUrlInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      formRef.current.imageUrl = e.target.value;
      setImageUrlVal(e.target.value);
      setIsDirty(true);
    },
    [],
  );

  const handleSubtasks = useCallback((v: Subtask[]) => {
    formRef.current.subtasks = v;
    setSubtasksVal(v);
    setIsDirty(true);
  }, []);

  /* ── Reset helper (shared by submit + close) ── */
  const resetForm = useCallback(() => {
    const fresh = { ...INITIAL_STATE, ...initialData };
    formRef.current = fresh;
    setIsDirty(false);
    setHasTitle(!!fresh.title.trim());
    setStatusVal(fresh.status);
    setPriorityVal(fresh.priority);
    setCategoryVal(fresh.category);
    setImageUrlVal(fresh.imageUrl);
    setSubtasksVal(fresh.subtasks);
  }, [initialData]);

  /* ── Submit / close — stable via refs ── */
  const handleSubmit = useCallback(() => {
    onSubmitRef.current?.({ ...formRef.current });
    resetForm();
    onCloseRef.current();
  }, [resetForm]);

  const handleClose = useCallback(() => {
    resetForm();
    onCloseRef.current();
  }, [resetForm]);

  /* ── Footer (re-renders only when hasTitle flips) ── */
  const footerSlot = useMemo(
    () => (
      <FooterButtons
        canSubmit={hasTitle}
        onCancel={handleClose}
        onSubmit={handleSubmit}
      />
    ),
    [hasTitle, handleClose, handleSubmit],
  );

  return (
    <Popup
      open={open}
      onClose={handleClose}
      dirty={isDirty}
      title="New Task"
      footer={footerSlot}
    >
      {viewMode === "tabbed" ? (
        <TabGroup tabs={TABS} defaultTab="general">
          {(activeTab) => (
            <div className="p-6">
              {activeTab === "general" && (
                <GeneralTab
                  formRef={formRef}
                  handleInput={handleInput}
                  category={category}
                  imageUrl={imageUrl}
                  status={status}
                  priority={priority}
                  handleImageUrlInput={handleImageUrlInput}
                  handleStatus={handleStatus}
                  handlePriority={handlePriority}
                  handleCategory={handleCategory}
                />
              )}
              {activeTab === "details" && (
                <DetailsTab
                  formRef={formRef}
                  handleInput={handleInput}
                  subtasks={subtasks}
                  handleSubtasks={handleSubtasks}
                />
              )}
              {activeTab === "email" && (
                <EmailTab formRef={formRef} handleInput={handleInput} />
              )}
            </div>
          )}
        </TabGroup>
      ) : (
        <SingleView
          formRef={formRef}
          handleInput={handleInput}
          status={status}
          priority={priority}
          category={category}
          imageUrl={imageUrl}
          subtasks={subtasks}
          handleStatus={handleStatus}
          handlePriority={handlePriority}
          handleCategory={handleCategory}
          handleImageUrlInput={handleImageUrlInput}
          handleSubtasks={handleSubtasks}
        />
      )}
    </Popup>
  );
}

/* ── Footer (memoized) ───────────────────────────────────────────────────── */

const FooterButtons = memo(function FooterButtons({
  canSubmit,
  onCancel,
  onSubmit,
}: {
  canSubmit: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-3 px-6 py-4">
      <button
        type="button"
        onClick={onCancel}
        className="cursor-pointer rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={!canSubmit}
        className="cursor-pointer rounded-lg bg-[var(--accent)] px-5 py-2 text-xs font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Create Task
      </button>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   Memoized sub-components

   These receive stable-identity props (formRef never changes, useCallback
   handlers never change), so React.memo guarantees they skip re-renders
   after their initial mount.  Only ImageBlock and TogglesRow re-render
   when the user interacts with toggles or types an image URL.
   ═══════════════════════════════════════════════════════════════════════════ */

const ImageBlock = memo(function ImageBlock({
  category,
  imageUrl,
  onImageUrlChange,
}: {
  category: TaskCategory;
  imageUrl: string;
  onImageUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <TaskCardImage
        category={category}
        imageUrl={imageUrl || undefined}
        title="New Task"
        size="lg"
      />
      <label className="cursor-pointer text-[0.6rem] font-medium text-[var(--accent)] hover:underline">
        Set image URL
        <input
          type="text"
          value={imageUrl}
          onChange={onImageUrlChange}
          placeholder="https://..."
          className={IMG_URL_CLS}
        />
      </label>
    </div>
  );
});

const TitleDescriptionBlock = memo(function TitleDescriptionBlock({
  formRef,
  handleInput,
}: {
  formRef: FormRef;
  handleInput: InputHandler;
}) {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <FormField label="Task Title" required>
        <input
          type="text"
          name="title"
          defaultValue={formRef.current.title}
          onChange={handleInput}
          placeholder="What needs to be done?"
          className={TITLE_INPUT_CLS}
        />
      </FormField>
      <FormField label="Description">
        <textarea
          name="description"
          defaultValue={formRef.current.description}
          onChange={handleInput}
          placeholder="Add a description..."
          rows={3}
          className={TEXTAREA_CLS}
        />
      </FormField>
    </div>
  );
});

const ProjectField = memo(function ProjectField({
  formRef,
  handleInput,
}: {
  formRef: FormRef;
  handleInput: InputHandler;
}) {
  return (
    <FormField label="Project">
      <input
        type="text"
        name="project"
        defaultValue={formRef.current.project}
        onChange={handleInput}
        placeholder="e.g. Platform Refresh"
        className={INPUT_CLS}
      />
    </FormField>
  );
});

const TogglesRow = memo(function TogglesRow({
  status,
  priority,
  category,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
}: {
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  onStatusChange: (v: TaskStatus) => void;
  onPriorityChange: (v: TaskPriority) => void;
  onCategoryChange: (v: TaskCategory) => void;
}) {
  return (
    <div className="flex flex-wrap items-start gap-3">
      <StatusToggle value={status} onChange={onStatusChange} />
      <PriorityToggle value={priority} onChange={onPriorityChange} />
      <CategoryToggle value={category} onChange={onCategoryChange} />
    </div>
  );
});

const DatesGrid = memo(function DatesGrid({
  formRef,
  handleInput,
}: {
  formRef: FormRef;
  handleInput: InputHandler;
}) {
  const d = formRef.current;
  return (
    <div>
      <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
        Dates
      </p>
      <div className="grid grid-cols-2 gap-4">
        <DateField label="Received Date" name="receivedDate" defaultValue={d.receivedDate} onChange={handleInput} />
        <DateField label="Due Date" name="dueDate" defaultValue={d.dueDate} onChange={handleInput} />
        <DateField label="Started Date" name="startedDate" defaultValue={d.startedDate} onChange={handleInput} />
        <DateField label="Completion Date" name="completionDate" defaultValue={d.completionDate} onChange={handleInput} />
      </div>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   View layouts
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Single view (all fields, no tabs) ───────────────────────────────────── */

function SingleView({
  formRef,
  handleInput,
  status,
  priority,
  category,
  imageUrl,
  subtasks,
  handleStatus,
  handlePriority,
  handleCategory,
  handleImageUrlInput,
  handleSubtasks,
}: {
  formRef: FormRef;
  handleInput: InputHandler;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  imageUrl: string;
  subtasks: Subtask[];
  handleStatus: (v: TaskStatus) => void;
  handlePriority: (v: TaskPriority) => void;
  handleCategory: (v: TaskCategory) => void;
  handleImageUrlInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubtasks: (v: Subtask[]) => void;
}) {
  return (
    <div className="space-y-8 p-6">
      <SectionLabel>General</SectionLabel>
      <div className="flex gap-5">
        <ImageBlock
          category={category}
          imageUrl={imageUrl}
          onImageUrlChange={handleImageUrlInput}
        />
        <TitleDescriptionBlock formRef={formRef} handleInput={handleInput} />
      </div>
      <ProjectField formRef={formRef} handleInput={handleInput} />
      <TogglesRow
        status={status}
        priority={priority}
        category={category}
        onStatusChange={handleStatus}
        onPriorityChange={handlePriority}
        onCategoryChange={handleCategory}
      />

      <SectionLabel>Details</SectionLabel>
      <FormField label="Notes">
        <textarea
          name="notes"
          defaultValue={formRef.current.notes}
          onChange={handleInput}
          placeholder="Additional notes..."
          rows={3}
          className={TEXTAREA_CLS}
        />
      </FormField>
      <FormField label="Subtasks">
        <SubtaskList subtasks={subtasks} onChange={handleSubtasks} />
      </FormField>
      <DatesGrid formRef={formRef} handleInput={handleInput} />

      <SectionLabel>Email Source</SectionLabel>
      <p className="text-xs text-[var(--muted)]">
        Optional metadata linking this task to an email source.
      </p>
      <FormField label="Email Subject">
        <input
          type="text"
          name="emailSubject"
          defaultValue={formRef.current.emailSubject}
          onChange={handleInput}
          placeholder="Re: Project update..."
          className={INPUT_CLS}
        />
      </FormField>
      <FormField label="Folder Path">
        <input
          type="text"
          name="folderPath"
          defaultValue={formRef.current.folderPath}
          onChange={handleInput}
          placeholder="Inbox/Projects/..."
          className={INPUT_CLS}
        />
      </FormField>
      <FormField label="Sender Name">
        <input
          type="text"
          name="senderName"
          defaultValue={formRef.current.senderName}
          onChange={handleInput}
          placeholder="John Doe"
          className={INPUT_CLS}
        />
      </FormField>
    </div>
  );
}

/* ── Tab panels ──────────────────────────────────────────────────────────── */

function GeneralTab({
  formRef,
  handleInput,
  category,
  imageUrl,
  status,
  priority,
  handleImageUrlInput,
  handleStatus,
  handlePriority,
  handleCategory,
}: {
  formRef: FormRef;
  handleInput: InputHandler;
  category: TaskCategory;
  imageUrl: string;
  status: TaskStatus;
  priority: TaskPriority;
  handleImageUrlInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleStatus: (v: TaskStatus) => void;
  handlePriority: (v: TaskPriority) => void;
  handleCategory: (v: TaskCategory) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex gap-5">
        <ImageBlock
          category={category}
          imageUrl={imageUrl}
          onImageUrlChange={handleImageUrlInput}
        />
        <TitleDescriptionBlock formRef={formRef} handleInput={handleInput} />
      </div>
      <ProjectField formRef={formRef} handleInput={handleInput} />
      <TogglesRow
        status={status}
        priority={priority}
        category={category}
        onStatusChange={handleStatus}
        onPriorityChange={handlePriority}
        onCategoryChange={handleCategory}
      />
    </div>
  );
}

function DetailsTab({
  formRef,
  handleInput,
  subtasks,
  handleSubtasks,
}: {
  formRef: FormRef;
  handleInput: InputHandler;
  subtasks: Subtask[];
  handleSubtasks: (v: Subtask[]) => void;
}) {
  return (
    <div className="space-y-6">
      <FormField label="Notes">
        <textarea
          name="notes"
          defaultValue={formRef.current.notes}
          onChange={handleInput}
          placeholder="Additional notes..."
          rows={4}
          className={TEXTAREA_CLS}
        />
      </FormField>
      <FormField label="Subtasks">
        <SubtaskList subtasks={subtasks} onChange={handleSubtasks} />
      </FormField>
      <DatesGrid formRef={formRef} handleInput={handleInput} />
    </div>
  );
}

function EmailTab({
  formRef,
  handleInput,
}: {
  formRef: FormRef;
  handleInput: InputHandler;
}) {
  return (
    <div className="space-y-5">
      <p className="text-xs text-[var(--muted)]">
        Optional metadata linking this task to an email source.
      </p>
      <FormField label="Email Subject">
        <input
          type="text"
          name="emailSubject"
          defaultValue={formRef.current.emailSubject}
          onChange={handleInput}
          placeholder="Re: Project update..."
          className={INPUT_CLS}
        />
      </FormField>
      <FormField label="Folder Path">
        <input
          type="text"
          name="folderPath"
          defaultValue={formRef.current.folderPath}
          onChange={handleInput}
          placeholder="Inbox/Projects/..."
          className={INPUT_CLS}
        />
      </FormField>
      <FormField label="Sender Name">
        <input
          type="text"
          name="senderName"
          defaultValue={formRef.current.senderName}
          onChange={handleInput}
          placeholder="John Doe"
          className={INPUT_CLS}
        />
      </FormField>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Shared field wrappers
   ═══════════════════════════════════════════════════════════════════════════ */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
        {children}
      </h3>
      <div className="h-px flex-1 bg-[var(--border-color)]" />
    </div>
  );
}

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
  name,
  defaultValue,
  onChange,
}: {
  label: string;
  name: string;
  defaultValue: string;
  onChange: InputHandler;
}) {
  const [display, setDisplay] = useState(() => formatDate(defaultValue));
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: InputHandler = (e) => {
    setDisplay(formatDate(e.target.value));
    onChange(e);
  };

  return (
    <FormField label={label}>
      <div
        className={DATE_CLS + " relative flex items-center"}
        onClick={() => inputRef.current?.showPicker?.()}
      >
        <span className={display ? "text-[var(--foreground)]" : "text-[var(--muted)]/50"}>
          {display || "DD-MMM-YYYY"}
        </span>
        {/* Hidden native date input for the picker */}
        <input
          ref={inputRef}
          type="date"
          name={name}
          defaultValue={defaultValue}
          onChange={handleChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          tabIndex={-1}
        />
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-auto text-[var(--muted)]">
          <rect x="1.5" y="2.5" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1.5 5.5h11" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4.5 1v2.5M9.5 1v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </FormField>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Tab icons
   ═══════════════════════════════════════════════════════════════════════════ */

function TabIconGeneral() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="2"
        y="2"
        width="10"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M5 7h4M7 5v4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TabIconDetails() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M4 4h6M4 7h4M4 10h5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TabIconEmail() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="1.5"
        y="3"
        width="11"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M1.5 4.5L7 8l5.5-3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
