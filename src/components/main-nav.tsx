"use client";

import { usePathname } from "next/navigation";
import { DashboardBreadcrumb } from "./dashboard-breadcrumb";

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky px-6 pt-2 mb-6 flex flex-column gap-6 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <DashboardBreadcrumb />
    </header>
  );
}
