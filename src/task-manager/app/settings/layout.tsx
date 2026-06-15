import type { ReactNode } from "react";
import SettingsSidebar from "@/components/settings/settings-sidebar";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
