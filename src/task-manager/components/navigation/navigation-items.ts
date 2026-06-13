export type NavigationItem = {
  href: string;
  label: string;
  icon:
    | "home"
    | "dashboard"
    | "tasks"
    | "projects"
    | "calendar"
    | "team"
    | "settings";
};

export const navigationItems: readonly NavigationItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/tasks", label: "Tasks", icon: "tasks" },
  { href: "/projects", label: "Projects", icon: "projects" },
  { href: "/calendar", label: "Calendar", icon: "calendar" },
  { href: "/team", label: "Team", icon: "team" },
  { href: "/settings", label: "Settings", icon: "settings" },
];
