export default function SearchForm() {
  return (
    <form action="/tasks" role="search" className="w-full">
      <label className="relative block">
        <span className="sr-only">Search tasks and projects</span>
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#8b949e]">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          name="q"
          placeholder="Search tasks, projects, or teammates"
          className="h-9 w-full rounded-md border border-white/15 bg-[#1f2328] pl-10 pr-14 text-sm text-white placeholder:text-[#8b949e] outline-none transition focus:border-[#58a6ff] focus:ring-2 focus:ring-[#1f6feb]/40"
        />
        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[11px] font-medium text-[#8b949e]">
          Enter
        </span>
      </label>
    </form>
  );
}