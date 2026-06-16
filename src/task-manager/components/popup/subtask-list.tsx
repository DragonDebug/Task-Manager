"use client";

export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

type SubtaskListProps = {
  subtasks: Subtask[];
  onChange: (subtasks: Subtask[]) => void;
};

let nextId = 1;
function uid() {
  return `sub-${Date.now()}-${nextId++}`;
}

/**
 * Inline add/remove subtask list.
 * Each row: checkbox + text input + remove button.
 */
export default function SubtaskList({ subtasks, onChange }: SubtaskListProps) {
  function add() {
    onChange([...subtasks, { id: uid(), title: "", completed: false }]);
  }

  function remove(id: string) {
    onChange(subtasks.filter((s) => s.id !== id));
  }

  function toggle(id: string) {
    onChange(
      subtasks.map((s) =>
        s.id === id ? { ...s, completed: !s.completed } : s,
      ),
    );
  }

  function updateTitle(id: string, title: string) {
    onChange(subtasks.map((s) => (s.id === id ? { ...s, title } : s)));
  }

  return (
    <div className="flex flex-col">
      {/* Scrollable subtask area with fixed max height */}
      {subtasks.length > 0 && (
        <div className="max-h-[10rem] space-y-2 overflow-y-auto pr-1">
          {subtasks.map((sub) => (
            <div key={sub.id} className="flex items-center gap-2">
              {/* Checkbox */}
              <button
                type="button"
                onClick={() => toggle(sub.id)}
                className={`flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors ${
                  sub.completed
                    ? "border-transparent bg-[var(--accent)]"
                    : "border-[var(--muted)]/40 hover:border-[var(--muted)]/70"
                }`}
              >
                {sub.completed && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5l2 2 4-4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {/* Title input */}
              <input
                type="text"
                value={sub.title}
                onChange={(e) => updateTitle(sub.id, e.target.value)}
                placeholder="Subtask title..."
                className={`flex-1 rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]/40 focus:outline-none ${
                  sub.completed ? "line-through text-[var(--muted)]" : ""
                }`}
              />

              {/* Remove */}
              <button
                type="button"
                onClick={() => remove(sub.id)}
                className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded text-[var(--muted)] transition-colors hover:bg-red-500/10 hover:text-red-400"
                aria-label="Remove subtask"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 3l6 6M9 3l-6 6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add button — w-fit so clicking empty space beside it does nothing */}
      <button
        type="button"
        onClick={add}
        className="mt-2 flex w-fit cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 3v8M3 7h8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Add subtask
      </button>
    </div>
  );
}
