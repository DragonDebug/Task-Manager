"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import SettingsSection from "@/components/settings/settings-section";
import {
  useTaxonomyStore,
  ICON_IDS,
  ICON_PATHS,
  COLOR_PALETTE,
  type TaxonomyItem,
  type TaxonomyIconId,
  type TaxonomyConfig,
} from "@/lib/taxonomy-store";

// ── Reusable SVG icon renderer ─────────────────────────────────────────────

function TaxIcon({
  icon,
  color,
  size = 16,
}: {
  icon: TaxonomyIconId;
  color: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICON_PATHS[icon]} />
    </svg>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function TaskConfigPage() {
  const store = useTaxonomyStore();

  return (
    <div className="space-y-8">
      <TaxonomySection
        kind="priorities"
        title="Priorities"
        eyebrow="Task Classification"
        description="Define the priority levels available when creating or editing tasks."
        items={store.config.priorities}
        store={store}
      />

      <TaxonomySection
        kind="statuses"
        title="Statuses"
        eyebrow="Workflow"
        description="Configure the workflow stages a task can move through."
        items={store.config.statuses}
        store={store}
      />

      <TaxonomySection
        kind="categories"
        title="Categories"
        eyebrow="Organization"
        description="Group tasks into categories with custom icons and colors."
        items={store.config.categories}
        store={store}
      />
    </div>
  );
}

// ── Section component ──────────────────────────────────────────────────────

function TaxonomySection({
  kind,
  title,
  eyebrow,
  description,
  items,
  store,
}: {
  kind: keyof TaxonomyConfig;
  title: string;
  eyebrow: string;
  description: string;
  items: TaxonomyItem[];
  store: ReturnType<typeof useTaxonomyStore>;
}) {
  function handleAdd() {
    store.addItem(kind, {
      id: `${kind}-${Date.now()}`,
      label: "New item",
      icon: "circle",
      color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)],
    });
  }

  return (
    <SettingsSection
      eyebrow={eyebrow}
      title={title}
      description={description}
      badge={`${items.length} items`}
      footer={
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex cursor-pointer h-9 items-center gap-2 rounded-md border border-[var(--border-color)] bg-[var(--surface)] px-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
        >
          <PlusIcon />
          Add {title.slice(0, -1).replace(/ie$/, "y")}
        </button>
      }
    >
      {items.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-[var(--muted)]">
          No {title.toLowerCase()} configured. Click the button below to add one.
        </div>
      ) : (
        <div className="divide-y divide-[var(--border-color)]">
          {items.map((item, idx) => (
            <TaxonomyRow
              key={item.id}
              item={item}
              isFirst={idx === 0}
              isLast={idx === items.length - 1}
              canDelete={items.length > 1}
              onUpdate={(patch) => store.updateItem(kind, item.id, patch)}
              onRemove={() => store.removeItem(kind, item.id)}
              onMove={(dir) => store.moveItem(kind, item.id, dir)}
            />
          ))}
        </div>
      )}
    </SettingsSection>
  );
}

// ── Row for each item ──────────────────────────────────────────────────────

function TaxonomyRow({
  item,
  isFirst,
  isLast,
  canDelete,
  onUpdate,
  onRemove,
  onMove,
}: {
  item: TaxonomyItem;
  isFirst: boolean;
  isLast: boolean;
  canDelete: boolean;
  onUpdate: (patch: Partial<Omit<TaxonomyItem, "id">>) => void;
  onRemove: () => void;
  onMove: (dir: "up" | "down") => void;
}) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex items-center gap-3 px-5 py-3 sm:px-6">
      {/* Reorder arrows */}
      <div className="flex flex-col gap-0.5">
        <button
          type="button"
          onClick={() => onMove("up")}
          disabled={isFirst}
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)] disabled:opacity-25 disabled:cursor-default"
        >
          <ChevronUpIcon />
        </button>
        <button
          type="button"
          onClick={() => onMove("down")}
          disabled={isLast}
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)] disabled:opacity-25 disabled:cursor-default"
        >
          <ChevronDownIcon />
        </button>
      </div>

      {/* Icon preview + picker */}
      <IconPicker
        value={item.icon}
        color={item.color}
        onChange={(icon) => onUpdate({ icon })}
      />

      {/* Color picker */}
      <ColorPicker
        value={item.color}
        onChange={(color) => onUpdate({ color })}
      />

      {/* Label */}
      {editing ? (
        <input
          type="text"
          autoFocus
          defaultValue={item.label}
          onBlur={(e) => {
            const v = e.target.value.trim();
            if (v) onUpdate({ label: v });
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            if (e.key === "Escape") setEditing(false);
          }}
          className="flex-1 rounded-md border border-[var(--accent)]/40 bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--foreground)] outline-none"
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex-1 cursor-pointer rounded-md px-3 py-1.5 text-left text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
        >
          {item.label}
        </button>
      )}

      {/* Badge preview */}
      <span
        className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider"
        style={{
          backgroundColor: item.color + "24",
          color: item.color,
          border: `1px solid ${item.color}4d`,
        }}
      >
        <TaxIcon icon={item.icon} color={item.color} size={10} />
        {item.label}
      </span>

      {/* Delete */}
      <button
        type="button"
        onClick={onRemove}
        disabled={!canDelete}
        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-[var(--muted)] transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:opacity-25 disabled:cursor-default"
        title="Remove"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

// ── Icon picker (portal-based popup) ───────────────────────────────────────

function IconPicker({
  value,
  color,
  onChange,
}: {
  value: TaxonomyIconId;
  color: string;
  onChange: (icon: TaxonomyIconId) => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left });
    }
    function onClickOut(e: MouseEvent) {
      if (
        btnRef.current && !btnRef.current.contains(e.target as Node) &&
        panelRef.current && !panelRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOut);
    return () => document.removeEventListener("mousedown", onClickOut);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--surface)] transition-colors hover:bg-[var(--surface-elevated)]"
        title="Choose icon"
      >
        <TaxIcon icon={value} color={color} size={16} />
      </button>
      {open &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed z-[9999] w-[17rem] rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-3 shadow-xl"
            style={{ top: pos.top, left: pos.left }}
          >
            <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
              Pick an icon
            </p>
            <div className="grid grid-cols-8 gap-1">
              {ICON_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onChange(id);
                    setOpen(false);
                  }}
                  className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors ${
                    id === value
                      ? "bg-[var(--accent-soft)] ring-1 ring-[var(--accent)]"
                      : "hover:bg-[var(--surface)]"
                  }`}
                  title={id}
                >
                  <TaxIcon icon={id} color={id === value ? color : "var(--muted)"} size={14} />
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

// ── Color picker (portal-based popup) ──────────────────────────────────────

function ColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left });
    }
    function onClickOut(e: MouseEvent) {
      if (
        btnRef.current && !btnRef.current.contains(e.target as Node) &&
        panelRef.current && !panelRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOut);
    return () => document.removeEventListener("mousedown", onClickOut);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--surface)] transition-colors hover:bg-[var(--surface-elevated)]"
        title="Choose color"
      >
        <span
          className="h-4 w-4 rounded-full border border-white/20"
          style={{ backgroundColor: value }}
        />
      </button>
      {open &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed z-[9999] w-[14rem] rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-3 shadow-xl"
            style={{ top: pos.top, left: pos.left }}
          >
            <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
              Pick a color
            </p>
            <div className="grid grid-cols-8 gap-1.5">
              {COLOR_PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    onChange(c);
                    setOpen(false);
                  }}
                  className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-110 ${
                    c === value ? "ring-2 ring-[var(--foreground)] ring-offset-1 ring-offset-[var(--surface-elevated)]" : ""
                  }`}
                  title={c}
                >
                  <span
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: c }}
                  />
                </button>
              ))}
            </div>
            {/* Custom hex input */}
            <div className="mt-2 flex items-center gap-2">
              <span
                className="h-5 w-5 shrink-0 rounded border border-[var(--border-color)]"
                style={{ backgroundColor: value }}
              />
              <input
                type="text"
                defaultValue={value}
                placeholder="#hex"
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  if (/^#[0-9a-fA-F]{3,8}$/.test(v)) {
                    onChange(v);
                    setOpen(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                }}
                className="flex-1 rounded-md border border-[var(--border-color)] bg-[var(--surface)] px-2 py-1 text-xs text-[var(--foreground)] outline-none focus:border-[var(--accent)]/40"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 4h10M5 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M11 4l-.5 8a1.5 1.5 0 0 1-1.5 1.4H5a1.5 1.5 0 0 1-1.5-1.4L3 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 6.5L5 3.5L8 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
