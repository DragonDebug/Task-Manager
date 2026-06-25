"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ── Icon catalogue ─────────────────────────────────────────────────────────
// A curated set of simple SVG icons the user can pick from.

export type TaxonomyIconId =
  | "circle"
  | "square"
  | "triangle"
  | "star"
  | "heart"
  | "flag"
  | "bolt"
  | "flame"
  | "check"
  | "clock"
  | "eye"
  | "lock"
  | "unlock"
  | "bookmark"
  | "tag"
  | "folder"
  | "inbox"
  | "send"
  | "archive"
  | "trash"
  | "plus"
  | "minus"
  | "alert"
  | "info"
  | "pause"
  | "play"
  | "stop"
  | "refresh"
  | "link"
  | "code"
  | "bug"
  | "gear"
  | "palette"
  | "users"
  | "briefcase"
  | "rocket"
  | "target"
  | "crown"
  | "diamond"
  | "shield"
  | "zap";

export const ICON_IDS: TaxonomyIconId[] = [
  "circle", "square", "triangle", "star", "heart", "flag",
  "bolt", "flame", "check", "clock", "eye", "lock",
  "unlock", "bookmark", "tag", "folder", "inbox", "send",
  "archive", "trash", "plus", "minus", "alert", "info",
  "pause", "play", "stop", "refresh", "link", "code",
  "bug", "gear", "palette", "users", "briefcase", "rocket",
  "target", "crown", "diamond", "shield", "zap",
];

// SVG path data for each icon (all 24×24 viewBox, stroke-based)
export const ICON_PATHS: Record<TaxonomyIconId, string> = {
  circle:    "M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0",
  square:    "M5 5h14v14H5z",
  triangle:  "M12 4L3 20h18L12 4z",
  star:      "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z",
  heart:     "M12 21C12 21 4 14.5 4 9a4.5 4.5 0 0 1 8-2.83A4.5 4.5 0 0 1 20 9c0 5.5-8 12-8 12z",
  flag:      "M4 3v18M4 3h12l-3 4 3 4H4",
  bolt:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  flame:     "M12 22c-4.42 0-8-3.58-8-8 0-3.36 2.15-6.68 4-8 0 3 2 5 4 5s4-2 4-5c1.85 1.32 4 4.64 4 8 0 4.42-3.58 8-8 8z",
  check:     "M5 13l4 4L19 7",
  clock:     "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3 3",
  eye:       "M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  lock:      "M5 11h14v9H5zM7 11V7a5 5 0 0 1 10 0v4",
  unlock:    "M5 11h14v9H5zM7 11V7a5 5 0 0 1 9.9-1",
  bookmark:  "M5 3h14v18l-7-4-7 4V3z",
  tag:       "M3 7.5V3h4.5l9 9-4.5 4.5-9-9zM7 7h.01",
  folder:    "M3 6v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-3H5a2 2 0 0 0-2 2z",
  inbox:     "M3 14h4l2 3h6l2-3h4M3 14V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9",
  send:      "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  archive:   "M3 5h18v4H3zM5 9v10h14V9M10 13h4",
  trash:     "M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6",
  plus:      "M12 5v14M5 12h14",
  minus:     "M5 12h14",
  alert:     "M12 4L3 20h18L12 4zM12 10v4M12 17h.01",
  info:      "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 8h.01M12 12v4",
  pause:     "M6 4h4v16H6zM14 4h4v16h-4z",
  play:      "M6 4l14 8-14 8V4z",
  stop:      "M5 5h14v14H5z",
  refresh:   "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15",
  link:      "M10 14a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 10a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  code:      "M16 18l6-6-6-6M8 6l-6 6 6 6",
  bug:       "M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M4 12h4M16 12h4M7 7l2 2M15 7l-2 2M7 17l2-2M15 17l-2-2",
  gear:      "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  palette:   "M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.9 2-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.6 1.7-1.6H16a4.5 4.5 0 0 0 4.5-4.5C20.5 6.6 16.7 3.5 12 3.5z",
  users:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  briefcase: "M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  rocket:    "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3M22 2l-7.5 7.5M15 12l4-4M9 12l-4 4",
  target:    "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
  crown:     "M2 20h20L18 8l-4 5-2-7-2 7-4-5-2 12z",
  diamond:   "M12 2L2 12l10 10 10-10L12 2z",
  shield:    "M12 3.5L19 6v5c0 4.5-3 8-7 9.5C8 19 5 15.5 5 11V6Z",
  zap:       "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

// ── Color palette ──────────────────────────────────────────────────────────

export const COLOR_PALETTE = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#ec4899",
  "#f43f5e", "#14b8a6", "#64748b", "#78716c", "#84cc16",
  "#0ea5e9",
];

// ── Item types ─────────────────────────────────────────────────────────────

export type TaxonomyItem = {
  id: string;
  label: string;
  icon: TaxonomyIconId;
  color: string;
};

export type TaxonomyConfig = {
  priorities: TaxonomyItem[];
  statuses: TaxonomyItem[];
  categories: TaxonomyItem[];
};

// ── Defaults (seeded from current app values) ──────────────────────────────

const DEFAULT_CONFIG: TaxonomyConfig = {
  priorities: [
    { id: "p-critical", label: "Critical", icon: "alert",    color: "#ef4444" },
    { id: "p-high",     label: "High",     icon: "flame",    color: "#f97316" },
    { id: "p-medium",   label: "Medium",   icon: "bolt",     color: "#eab308" },
    { id: "p-low",      label: "Low",      icon: "flag",     color: "#22c55e" },
  ],
  statuses: [
    { id: "s-backlog",     label: "Backlog",     icon: "inbox",   color: "#64748b" },
    { id: "s-pending",     label: "Pending",     icon: "clock",   color: "#eab308" },
    { id: "s-ready",       label: "Ready",       icon: "check",   color: "#06b6d4" },
    { id: "s-in-progress", label: "In progress", icon: "play",    color: "#3b82f6" },
    { id: "s-blocked",     label: "Blocked",     icon: "lock",    color: "#ef4444" },
    { id: "s-in-review",   label: "In review",   icon: "eye",     color: "#a855f7" },
    { id: "s-done",        label: "Done",        icon: "check",   color: "#22c55e" },
  ],
  categories: [
    { id: "c-work",        label: "Work",        icon: "briefcase", color: "#6366f1" },
    { id: "c-personal",    label: "Personal",    icon: "heart",     color: "#ec4899" },
    { id: "c-design",      label: "Design",      icon: "palette",   color: "#a855f7" },
    { id: "c-development", label: "Development", icon: "code",      color: "#06b6d4" },
    { id: "c-research",    label: "Research",    icon: "eye",       color: "#10b981" },
    { id: "c-operations",  label: "Operations",  icon: "gear",      color: "#f59e0b" },
  ],
};

// ── Store shape ────────────────────────────────────────────────────────────

type TaxonomyStore = {
  config: TaxonomyConfig;
  updateItem: (kind: keyof TaxonomyConfig, id: string, patch: Partial<Omit<TaxonomyItem, "id">>) => void;
  addItem: (kind: keyof TaxonomyConfig, item: TaxonomyItem) => void;
  removeItem: (kind: keyof TaxonomyConfig, id: string) => void;
  moveItem: (kind: keyof TaxonomyConfig, id: string, direction: "up" | "down") => void;
};

// ── Context ────────────────────────────────────────────────────────────────

const TaxonomyContext = createContext<TaxonomyStore | null>(null);

export function useTaxonomyStore(): TaxonomyStore {
  const ctx = useContext(TaxonomyContext);
  if (!ctx) throw new Error("useTaxonomyStore must be inside <TaxonomyProvider>");
  return ctx;
}

// ── Provider ───────────────────────────────────────────────────────────────

let _nextTaxId = 1;
function genTaxId(): string {
  return `tax-${Date.now()}-${_nextTaxId++}`;
}

export function TaxonomyProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<TaxonomyConfig>(DEFAULT_CONFIG);

  const updateItem = useCallback(
    (kind: keyof TaxonomyConfig, id: string, patch: Partial<Omit<TaxonomyItem, "id">>) => {
      setConfig((prev) => ({
        ...prev,
        [kind]: prev[kind].map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      }));
    },
    [],
  );

  const addItem = useCallback(
    (kind: keyof TaxonomyConfig, item: TaxonomyItem) => {
      setConfig((prev) => ({
        ...prev,
        [kind]: [...prev[kind], { ...item, id: item.id || genTaxId() }],
      }));
    },
    [],
  );

  const removeItem = useCallback(
    (kind: keyof TaxonomyConfig, id: string) => {
      setConfig((prev) => ({
        ...prev,
        [kind]: prev[kind].filter((item) => item.id !== id),
      }));
    },
    [],
  );

  const moveItem = useCallback(
    (kind: keyof TaxonomyConfig, id: string, direction: "up" | "down") => {
      setConfig((prev) => {
        const list = [...prev[kind]];
        const idx = list.findIndex((item) => item.id === id);
        if (idx < 0) return prev;
        const swap = direction === "up" ? idx - 1 : idx + 1;
        if (swap < 0 || swap >= list.length) return prev;
        [list[idx], list[swap]] = [list[swap], list[idx]];
        return { ...prev, [kind]: list };
      });
    },
    [],
  );

  return (
    <TaxonomyContext.Provider value={{ config, updateItem, addItem, removeItem, moveItem }}>
      {children}
    </TaxonomyContext.Provider>
  );
}
