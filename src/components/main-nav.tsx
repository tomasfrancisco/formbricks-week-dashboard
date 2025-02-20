"use client";

import { GlobalNavbar } from "./global-navbar";
import { DashboardsListBar } from "./dashboards-list-bar";
import { useMemo } from "react";
import { DashboardBar } from "./dashboard-bar";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();

  const contextNavBar = useMemo(() => {
    if (pathname === "/") {
      return <DashboardsListBar />;
    } else if (pathname.startsWith("/dashboard/")) {
      return <DashboardBar />;
    }
  }, [pathname]);

  return (
    <header className="sticky flex flex-col top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <GlobalNavbar />
      {contextNavBar}
    </header>
  );
}
