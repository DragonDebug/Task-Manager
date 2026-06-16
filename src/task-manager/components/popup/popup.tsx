"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";

type PopupProps = {
  open: boolean;
  onClose: () => void;
  /** When true, closing while dirty shows a confirmation dialog. */
  dirty?: boolean;
  title?: string;
  /** Pinned to the bottom of the dialog, outside the scroll area. */
  footer?: ReactNode;
  children: ReactNode;
};

export default function Popup({
  open,
  onClose,
  dirty = false,
  title,
  footer,
  children,
}: PopupProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const requestClose = useCallback(() => {
    if (dirty) {
      setShowConfirm(true);
    } else {
      onClose();
    }
  }, [dirty, onClose]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") requestClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, requestClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === backdropRef.current) requestClose();
  }

  return (
    <>
      <div
        ref={backdropRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div
          role="dialog"
          aria-modal="true"
          className="relative flex max-h-[90vh] w-full max-w-[80rem] min-w-[640px] min-h-[50rem] flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--surface-elevated)] shadow-2xl"
        >
          {/* Header — pinned top */}
          <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-color)] px-6 py-4">
            {title && (
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                {title}
              </h2>
            )}
            <button
              type="button"
              onClick={requestClose}
              className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto">{children}</div>

          {/* Footer — pinned bottom */}
          {footer && (
            <div className="shrink-0 border-t border-[var(--border-color)]">
              {footer}
            </div>
          )}
        </div>
      </div>

      {/* Unsaved-changes confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-6 shadow-2xl">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              Unsaved changes
            </h3>
            <p className="mt-2 text-xs text-[var(--muted)]">
              You have unsaved changes. Are you sure you want to close?
            </p>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="cursor-pointer rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
              >
                Keep editing
              </button>
              <button
                type="button"
                onClick={() => { setShowConfirm(false); onClose(); }}
                className="cursor-pointer rounded-lg bg-red-500/90 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-red-500"
              >
                Discard &amp; close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
