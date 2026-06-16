"use client";

import { useState, type ReactNode } from "react";

export type Tab = {
  id: string;
  label: string;
  icon?: ReactNode;
};

type TabGroupProps = {
  tabs: Tab[];
  defaultTab?: string;
  children: (activeTab: string) => ReactNode;
  className?: string;
};

/**
 * Simple horizontal tab switcher.
 * Renders a tab bar, then calls `children(activeTabId)` so the
 * parent can decide what content to show.
 */
export default function TabGroup({
  tabs,
  defaultTab,
  children,
  className = "",
}: TabGroupProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? "");

  return (
    <div className={className}>
      {/* Tab bar */}
      <div className="flex border-b border-[var(--border-color)]" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={`relative flex cursor-pointer items-center gap-1.5 px-5 py-3 text-xs font-medium transition-colors ${
                isActive
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab.icon}
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-t bg-[var(--accent)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div role="tabpanel">{children(active)}</div>
    </div>
  );
}
