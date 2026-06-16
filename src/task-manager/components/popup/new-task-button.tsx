"use client";

import { useState } from "react";
import NewTaskForm, { type NewTaskFormData } from "./new-task-form";

export default function NewTaskButton() {
  const [open, setOpen] = useState(false);

  function handleSubmit(data: NewTaskFormData) {
    console.log("New task created:", data);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 3v8M3 7h8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        New Task
      </button>

      <NewTaskForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
