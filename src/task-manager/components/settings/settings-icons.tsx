import type { SVGProps } from "react";
import type { SettingsNavIcon } from "./settings-nav-items";

export type SettingsIconProps = SVGProps<SVGSVGElement>;

function baseIcon(props: SettingsIconProps, path: React.ReactNode) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {path}
    </svg>
  );
}

export function ProfileIcon(props: SettingsIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M5 19.5a7 7 0 0 1 14 0" />
    </>,
  );
}

export function WorkspaceIcon(props: SettingsIconProps) {
  return baseIcon(
    props,
    <>
      <rect x="3.5" y="4" width="7.5" height="7.5" rx="1.5" />
      <rect x="13" y="4" width="7.5" height="5" rx="1.5" />
      <rect x="13" y="11.5" width="7.5" height="8.5" rx="1.5" />
      <rect x="3.5" y="14" width="7.5" height="6" rx="1.5" />
    </>,
  );
}

export function NotificationsIcon(props: SettingsIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>,
  );
}

export function SecurityIcon(props: SettingsIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M12 3.5 19 6v5c0 4.5-3 8-7 9.5C8 19 5 15.5 5 11V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>,
  );
}

export function IntegrationsIcon(props: SettingsIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M9 7V4.5" />
      <path d="M15 7V4.5" />
      <path d="M7 7h10v4a5 5 0 0 1-10 0Z" />
      <path d="M12 16v3.5" />
    </>,
  );
}

export function AppearanceIcon(props: SettingsIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.9 2-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.6 1.7-1.6H16a4.5 4.5 0 0 0 4.5-4.5C20.5 6.6 16.7 3.5 12 3.5Z" />
      <path d="M7.5 11h.01" />
      <path d="M10 7.5h.01" />
      <path d="M14 7.5h.01" />
      <path d="M16.5 11h.01" />
    </>,
  );
}

export function TaskConfigIcon(props: SettingsIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M4 7h10" />
      <path d="M4 12h8" />
      <path d="M4 17h6" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="16" cy="12" r="2" />
      <circle cx="14" cy="17" r="2" />
    </>,
  );
}

export function AdvancedIcon(props: SettingsIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M4 7h10" />
      <path d="M18 7h2" />
      <path d="M4 17h6" />
      <path d="M14 17h6" />
      <path d="M16 5v4" />
      <path d="M10 15v4" />
    </>,
  );
}

export const settingsIcons: Record<
  SettingsNavIcon,
  (props: SettingsIconProps) => React.ReactElement
> = {
  profile: ProfileIcon,
  workspace: WorkspaceIcon,
  notifications: NotificationsIcon,
  security: SecurityIcon,
  integrations: IntegrationsIcon,
  appearance: AppearanceIcon,
  "task-config": TaskConfigIcon,
  advanced: AdvancedIcon,
};
