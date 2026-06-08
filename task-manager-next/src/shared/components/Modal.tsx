"use client";

import { useEffect, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({
  open,
  title,
  description,
  footer,
  children,
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/58 p-3 backdrop-blur-[6px] md:items-center md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--panel-bg)] shadow-[0_22px_48px_rgba(2,6,23,0.34)]">
        <div className="border-b border-[color:var(--border)]/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] px-5 py-4 md:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold tracking-[0.01em] md:text-xl">{title}</h2>
              {description ? (
                <p className="max-w-2xl text-sm leading-6 text-[var(--text-muted)]">{description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] text-lg text-[var(--text-muted)] transition hover:-translate-y-px hover:border-[var(--accent)] hover:text-[var(--text)]"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        <div className="overflow-y-auto px-5 py-5 md:px-6">{children}</div>

        {footer ? <div className="border-t border-[color:var(--border)]/90 px-5 py-4 md:px-6">{footer}</div> : null}
      </div>
    </div>
  );
}