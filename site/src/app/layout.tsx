import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SITE_URL, siteConfig } from "@/lib/content/site";
import { LodgingBusinessSchema } from "@/components/shared/lodging-business-schema";

/**
 * Cormorant Garamond carries the editorial voice — high contrast, and it only
 * comes alive at the sizes this page sets it at. Jost is the Futura-adjacent
 * counterweight for labels and body; it's what keeps the page feeling like a
 * hotel and not a wedding invitation.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.name} — A Garden Kept Quietly, Masaki, Dar es Salaam`,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    "A boutique garden residence on the Msasani Peninsula, 200 metres from the Dar es Salaam Yacht Club. Fully serviced apartments for short and long stays, beneath a fig tree older than the building.",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-(--surface-canvas) text-(--text-primary)">
        {/* Without JS nothing ever clears the entrance's timer, so it would sit
            over the page forever. Remove it before it can. */}
        <noscript>
          <style>{`.seed-loader{display:none !important}`}</style>
        </noscript>
        <LodgingBusinessSchema />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-(--ft-cream) focus:text-(--ft-ink) focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
