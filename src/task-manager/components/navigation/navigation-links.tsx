"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "./navigation-items";
import {
  CalendarIcon,
  DashboardIcon,
  HomeIcon,
  ProjectsIcon,
  SettingsIcon,
  TasksIcon,
  TeamIcon,
} from "./navigation-icons";

const navigationIcons = {
  home: HomeIcon,
  dashboard: DashboardIcon,
  tasks: TasksIcon,
  projects: ProjectsIcon,
  calendar: CalendarIcon,
  team: TeamIcon,
  settings: SettingsIcon,
} as const;

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavigationLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="w-full">
      <ul className="flex min-w-max flex-wrap items-center gap-1">
        {navigationItems.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          const Icon = navigationIcons[item.icon];

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "group inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/12 text-white"
                    : "text-[#c9d1d9] hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex h-6 w-6 items-center justify-center rounded-md border transition-colors",
                    active
                      ? "border-white/10 bg-white/10 text-white"
                      : "border-white/8 bg-white/[0.04] text-[#9fb1c5] group-hover:text-white",
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
  );
}
