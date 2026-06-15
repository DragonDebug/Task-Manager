import type { ReactNode } from "react";

type SettingsFieldRowProps = {
  label: string;
  description: string;
  hint?: string;
  badge?: string;
  children: ReactNode;
};

export default function SettingsFieldRow({
  label,
  description,
  hint,
  badge,
  children,
}: SettingsFieldRowProps) {
  return (
    <div className="grid gap-3 px-5 py-4 sm:px-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-6">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {label}
          </p>
          {badge ? (
            <span className="rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-2 py-0.5 text-[11px] font-semibold text-[var(--muted)]">
              {badge}
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
          {description}
        </p>
        {hint ? (
          <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{hint}</p>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-col gap-2">{children}</div>
    </div>
  );
}
