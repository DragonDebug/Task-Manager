"use client";

import { useState, useRef, useEffect, memo } from "react";

// ── Generic dropdown toggle ──────────────────────────────────────────────────

type ToggleOption<T extends string> = {
  value: T;
  label: string;
  color: string;
};

type StatusPriorityToggleProps<T extends string> = {
  label: string;
  value: T;
  options: ToggleOption<T>[];
  onChange: (value: T) => void;
  className?: string;
};

function StatusPriorityToggleInner<T extends string>({
  label,
  value,
  options,
  onChange,
  className = "",
}: StatusPriorityToggleProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value) ?? options[0];

  // Only attach listener when dropdown is open
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center min-w-[12rem] gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[var(--surface-elevated)]"
      >
        <span className="text-[var(--muted)] uppercase tracking-wider text-[0.6rem] min-w-[3rem]">
          {label}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: selected.color }}
          />
          <span className="text-[var(--foreground)]">{selected.label}</span>
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[12rem] overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)] shadow-xl">
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-xs transition-colors ${
                  isActive
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[var(--foreground)] hover:bg-[var(--surface)]"
                }`}
              >
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: option.color }}
                />
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// memo the inner component — options identity must be stable for this to help
const StatusPriorityToggle = memo(StatusPriorityToggleInner) as typeof StatusPriorityToggleInner;
export default StatusPriorityToggle;

// ── Chevron helper ───────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Pre-configured status, priority & category toggles ───────────────────────

import type { TaskStatus, TaskPriority } from "@/lib/mock-tasks";
import type { TaskCategory } from "@/lib/task-card-types";
import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  PRIORITY_COLORS,
  CATEGORY_COLORS,
  CATEGORY_OPTIONS,
} from "@/lib/task-card-types";

// Pre-compute option arrays once at module scope so they keep a stable identity
const STATUS_COLORS: Record<TaskStatus, string> = {
  Backlog:       "#64748b",
  Pending:       "#eab308",
  Ready:         "#06b6d4",
  "In progress": "#3b82f6",
  Blocked:       "#ef4444",
  "In review":   "#a855f7",
  Done:          "#22c55e",
};

const STATUS_TOGGLE_OPTIONS = STATUS_OPTIONS.map((s) => ({
  value: s,
  label: s,
  color: STATUS_COLORS[s],
}));

const PRIORITY_TOGGLE_OPTIONS = PRIORITY_OPTIONS.map((p) => ({
  value: p,
  label: p,
  color: PRIORITY_COLORS[p].dot,
}));

const CATEGORY_TOGGLE_OPTIONS = CATEGORY_OPTIONS.map((c) => ({
  value: c,
  label: c,
  color: CATEGORY_COLORS[c].accent,
}));

// ── Typed wrappers ───────────────────────────────────────────────────────────

type StatusToggleProps = {
  value: TaskStatus;
  onChange: (value: TaskStatus) => void;
  className?: string;
};

export function StatusToggle({ value, onChange, className }: StatusToggleProps) {
  return (
    <StatusPriorityToggle
      label="Status"
      value={value}
      options={STATUS_TOGGLE_OPTIONS}
      onChange={onChange}
      className={className}
    />
  );
}

type PriorityToggleProps = {
  value: TaskPriority;
  onChange: (value: TaskPriority) => void;
  className?: string;
};

export function PriorityToggle({ value, onChange, className }: PriorityToggleProps) {
  return (
    <StatusPriorityToggle
      label="Priority"
      value={value}
      options={PRIORITY_TOGGLE_OPTIONS}
      onChange={onChange}
      className={className}
    />
  );
}

type CategoryToggleProps = {
  value: TaskCategory;
  onChange: (value: TaskCategory) => void;
  className?: string;
};

export function CategoryToggle({ value, onChange, className }: CategoryToggleProps) {
  return (
    <StatusPriorityToggle
      label="Category"
      value={value}
      options={CATEGORY_TOGGLE_OPTIONS}
      onChange={onChange}
      className={className}
    />
  );
}
