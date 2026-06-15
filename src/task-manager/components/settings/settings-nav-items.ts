export type SettingsNavIcon =
  | "profile"
  | "workspace"
  | "notifications"
  | "security"
  | "integrations"
  | "appearance"
  | "advanced";

export type SettingsNavItem = {
  href: string;
  label: string;
  description: string;
  icon: SettingsNavIcon;
};

export const settingsNavItems: readonly SettingsNavItem[] = [
  {
    href: "/settings/profile",
    label: "Profile",
    description: "Your name, handle, and how you appear to the team.",
    icon: "profile",
  },
  {
    href: "/settings/workspace",
    label: "Workspace",
    description: "Naming, intake rules, and review cadence defaults.",
    icon: "workspace",
  },
  {
    href: "/settings/notifications",
    label: "Notifications",
    description: "Summaries for due dates, blockers, and assignments.",
    icon: "notifications",
  },
  {
    href: "/settings/security",
    label: "Security",
    description: "Password, two-factor, and active sessions.",
    icon: "security",
  },
  {
    href: "/settings/integrations",
    label: "Integrations",
    description: "Connect the tools your team plans and ships with.",
    icon: "integrations",
  },
  {
    href: "/settings/appearance",
    label: "Appearance",
    description: "Theme, density, and accent preferences.",
    icon: "appearance",
  },
  {
    href: "/settings/advanced",
    label: "Advanced",
    description: "API access, data export, and destructive actions.",
    icon: "advanced",
  },
];
