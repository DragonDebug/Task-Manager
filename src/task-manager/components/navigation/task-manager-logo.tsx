export default function TaskManagerLogo() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 ring-1 ring-inset ring-white/15">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4.5 w-4.5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4.5" y="4.5" width="15" height="15" rx="3" />
        <path d="m8.5 12 2.2 2.2 4.8-4.8" />
      </svg>
    </span>
  );
}
