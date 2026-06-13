import type { SVGProps } from "react";

export type NavigationIconProps = SVGProps<SVGSVGElement>;

function baseIcon(props: NavigationIconProps, path: React.ReactNode) {
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

export function HomeIcon(props: NavigationIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M3.5 10.5 12 3l8.5 7.5" />
      <path d="M6.5 9.5V20h11V9.5" />
      <path d="M10 20v-5h4v5" />
    </>,
  );
}

export function DashboardIcon(props: NavigationIconProps) {
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

export function TasksIcon(props: NavigationIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M9 6.5h11" />
      <path d="M9 12h11" />
      <path d="M9 17.5h11" />
      <path d="m4.5 6.5 1.5 1.5 2.5-3" />
      <path d="m4.5 12 1.5 1.5 2.5-3" />
      <path d="m4.5 17.5 1.5 1.5 2.5-3" />
    </>,
  );
}

export function ProjectsIcon(props: NavigationIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M3.5 7A2.5 2.5 0 0 1 6 4.5h4l2 2H18A2.5 2.5 0 0 1 20.5 9v8A2.5 2.5 0 0 1 18 19.5H6A2.5 2.5 0 0 1 3.5 17Z" />
      <path d="M3.5 9h17" />
    </>,
  );
}

export function CalendarIcon(props: NavigationIconProps) {
  return baseIcon(
    props,
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M7.5 3.5v3" />
      <path d="M16.5 3.5v3" />
      <path d="M3.5 9.5h17" />
      <path d="M8 13h.01" />
      <path d="M12 13h.01" />
      <path d="M16 13h.01" />
    </>,
  );
}

export function TeamIcon(props: NavigationIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M16.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M4.5 18a4.5 4.5 0 0 1 9 0" />
      <path d="M13 18a3.5 3.5 0 0 1 7 0" />
    </>,
  );
}

export function SettingsIcon(props: NavigationIconProps) {
  return baseIcon(
    props,
    <>
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 1 0 12 8.5Z" />
      <path d="M19.4 13.5a1 1 0 0 0 .2 1.1l.1.1a1.8 1.8 0 0 1 0 2.6 1.8 1.8 0 0 1-2.6 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V18a1.8 1.8 0 0 1-1.8 1.8h-2.9A1.8 1.8 0 0 1 8.8 18v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.8 1.8 0 0 1-2.6 0 1.8 1.8 0 0 1 0-2.6l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H3.5A1.8 1.8 0 0 1 1.8 11V13A1.8 1.8 0 0 1 3.5 11h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.8 1.8 0 0 1 0-2.6 1.8 1.8 0 0 1 2.6 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V6A1.8 1.8 0 0 1 10.6 4.2h2.9A1.8 1.8 0 0 1 15.3 6v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.8 1.8 0 0 1 2.6 0 1.8 1.8 0 0 1 0 2.6l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2A1.8 1.8 0 0 1 22.2 13v-2A1.8 1.8 0 0 1 20.5 13h-.2a1 1 0 0 0-.9.5Z" />
    </>,
  );
}
