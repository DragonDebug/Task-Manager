type ProgressBarProps = {
  value: number;
  color?: string;
  height?: string;
  className?: string;
};

export default function ProgressBar({
  value,
  color = "var(--accent)",
  height = "h-1.5",
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-[var(--border-color)] ${height} ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${clamped}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}
