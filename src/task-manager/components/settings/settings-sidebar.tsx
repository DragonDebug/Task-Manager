"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { settingsIcons } from "./settings-icons";
import { settingsNavItems } from "./settings-nav-items";

function isActiveSection(pathname: string, href: string) {
  if (pathname === "/settings" && href === "/settings/profile") {
    return true;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <nav aria-label="Settings" className="w-full">
        <p className="mb-2 hidden px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] lg:block">
          Settings
        </p>
        <ul className="flex min-w-max gap-1 overflow-x-auto pb-1 lg:min-w-0 lg:flex-col lg:overflow-visible lg:pb-0">
          {settingsNavItems.map((item) => {
            const active = isActiveSection(pathname, item.href);
            const Icon = settingsIcons[item.icon];

            return (
              <li key={item.href} className="shrink-0 lg:shrink">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "group relative flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-[var(--accent-soft)] text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute left-0 top-1/2 hidden h-5 w-0.5 -translate-y-1/2 rounded-full lg:block",
                      active ? "bg-[var(--accent)]" : "bg-transparent",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "inline-flex h-6 w-6 items-center justify-center rounded-md border transition-colors",
                      active
                        ? "border-transparent bg-[var(--accent)]/15 text-[var(--accent)]"
                        : "border-[var(--border-color)] bg-[var(--surface)] text-[var(--muted)] group-hover:text-[var(--foreground)]",
                    ].join(" ")}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
