"use client";

type TaskCardCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: string;
  size?: "sm" | "md";
  className?: string;
};

export default function TaskCardCheckbox({
  checked,
  onChange,
  color = "var(--accent)",
  size = "md",
  className,
}: TaskCardCheckboxProps) {
  const dims = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`group relative flex shrink-0 items-center justify-center rounded-full border-2 transition-all ${dims} ${className} ${

        checked
          ? "border-transparent"
          : "border-[var(--muted)]/40 hover:border-[var(--muted)]/70"
      }`}
      style={checked ? { backgroundColor: color } : undefined}
    >
      {checked && (
        <svg
          width={size === "sm" ? 10 : 12}
          height={size === "sm" ? 10 : 12}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
