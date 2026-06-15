import type { ReactNode } from "react";

type SettingsSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function SettingsSection({
  eyebrow,
  title,
  description,
  badge,
  children,
  footer,
}: SettingsSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface-elevated)] shadow-sm">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border-color)] px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-[var(--foreground)]">
            {title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            {description}
          </p>
        </div>
        {badge ? (
          <span className="shrink-0 rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
            {badge}
          </span>
        ) : null}
      </header>

      <div className="divide-y divide-[var(--border-color)]">{children}</div>

      {footer ? (
        <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-[var(--border-color)] bg-[var(--surface)] px-5 py-4 sm:px-6">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}
