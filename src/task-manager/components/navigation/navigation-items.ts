export type NavigationItem = {
  href: string;
  label: string;
};

export const navigationItems: readonly NavigationItem[] = [
  { href: "/", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/projects", label: "Projects" },
  { href: "/calendar", label: "Calendar" },
  { href: "/team", label: "Team" },
  { href: "/settings", label: "Settings" },
];