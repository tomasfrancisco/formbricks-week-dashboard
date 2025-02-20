"use client";

import { GlobalNavbar } from "./global-navbar";
import { PageBar } from "./page-bar";

export function MainNav() {
  return (
    <header className="sticky flex flex-col top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <GlobalNavbar />
      <PageBar />
    </header>
  );
}
