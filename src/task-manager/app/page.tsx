import Link from "next/link";
import { navigationItems } from "@/components/navigation/navigation-items";

const homeLinks = navigationItems.filter((item) => item.href !== "/");

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8"></main>
  );
}
