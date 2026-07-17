import { SiteChrome } from "@/components/layout/site-chrome";

/**
 * Chrome for the pre-v2 pages. These routes are untouched by the v2 homepage
 * rebuild and keep their original navigation and footer. Route groups don't
 * affect URLs, so /rooms, /gardens etc. still resolve exactly as before.
 */
export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
