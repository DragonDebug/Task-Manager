"use client";

import type { ReactNode } from "react";
import { TaskProvider } from "@/lib/task-store";
import { TaxonomyProvider } from "@/lib/taxonomy-store";

/**
 * Client-side providers wrapper.
 * Add any future context providers here.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TaxonomyProvider>
      <TaskProvider>{children}</TaskProvider>
    </TaxonomyProvider>
  );
}
