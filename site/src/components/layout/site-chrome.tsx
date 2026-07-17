"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/layout/lenis-provider";
import { PageTransition } from "@/components/primitives/page-transition";

/**
 * Single root layout shared by every route (website/03_PAGE_ARCHITECTURE.md
 * Section 15) — no page-specific header/footer variants.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <LenisProvider>
      <Navigation />
      <main id="main-content" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer showDeparture={isHome} />
    </LenisProvider>
  );
}
