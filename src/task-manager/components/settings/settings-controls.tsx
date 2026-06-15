import type { ReactNode } from "react";

const fieldClassName =
  "h-10 w-full rounded-md border border-[var(--border-color)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]";

type SettingTextFieldProps = {
  placeholder?: string;
  defaultValue?: string;
  type?: "text" | "email" | "password" | "url";
};

export function SettingTextField({
  placeholder,
  defaultValue,
  type = "text",
}: SettingTextFieldProps) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      readOnly
      className={fieldClassName}
    />
  );
}

type SettingTextAreaProps = {
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
};

export function SettingTextArea({
  placeholder,
  defaultValue,
  rows = 3,
}: SettingTextAreaProps) {
  return (
    <textarea
      rows={rows}
      defaultValue={defaultValue}
      placeholder={placeholder}
      readOnly
      className="w-full resize-none rounded-md border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-sm leading-6 text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
    />
  );
}

type SettingSelectProps = {
  options: readonly string[];
  defaultValue?: string;
};

export function SettingSelect({ options, defaultValue }: SettingSelectProps) {
  return (
    <select
      defaultValue={defaultValue ?? options[0]}
      disabled
      className={`${fieldClassName} appearance-none`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

type SettingToggleProps = {
  label: string;
  enabled?: boolean;
};

export function SettingToggle({ label, enabled = false }: SettingToggleProps) {
  return (
    <span className="inline-flex items-center gap-2.5 text-sm text-[var(--foreground)]">
      <span
        aria-hidden="true"
        className={[
          "relative inline-flex h-5 w-9 items-center rounded-full border transition-colors",
          enabled
            ? "border-transparent bg-[var(--accent)]"
            : "border-[var(--border-color)] bg-[var(--surface)]",
        ].join(" ")}
      >
        <span
          className={[
            "absolute h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-all",
            enabled ? "left-[1.125rem]" : "left-0.5",
          ].join(" ")}
        />
      </span>
      {label}
    </span>
  );
}

type SettingButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

export function SettingButton({
  children,
  variant = "secondary",
}: SettingButtonProps) {
  const variantClassName = {
    primary:
      "border-transparent bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90",
    secondary:
      "border-[var(--border-color)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-elevated)]",
    danger:
      "border-[#f1707a] bg-transparent text-[#cf222e] hover:bg-[#cf222e]/10",
  }[variant];

  return (
    <button
      type="button"
      className={[
        "inline-flex h-9 items-center justify-center rounded-md border px-3.5 text-sm font-semibold transition-colors",
        variantClassName,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
