import Link from "next/link";
import NavigationLinks from "./navigation-links";
import SearchForm from "./search-form";
import TaskManagerLogo from "./task-manager-logo";

export default function TopNavigation() {
  return (
    <header className="border-b border-[#3d444d] bg-[#24292f] text-white shadow-sm">
      <div className="mx-auto flex w-full flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-white">
          <TaskManagerLogo />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-[0.02em]">
              Task Manager
            </div>
            <div className="text-xs text-[#8b949e]">Focus your team work</div>
          </div>
        </Link>

        <div className="order-2 w-full overflow-x-auto md:order-none md:min-w-0 md:flex-1 md:pl-6 lg:pl-8">
          <NavigationLinks />
        </div>

        <div className="order-3 w-full md:order-none md:ml-auto md:max-w-sm md:flex-1 lg:max-w-md">
          <SearchForm />
        </div>
      </div>
    </header>
  );
}
