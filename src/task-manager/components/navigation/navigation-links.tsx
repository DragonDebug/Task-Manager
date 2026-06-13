"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "./navigation-items";

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

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/12 text-white"
                    : "text-[#c9d1d9] hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
