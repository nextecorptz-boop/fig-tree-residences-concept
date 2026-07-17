"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, siteConfig } from "@/lib/content/site";
import { Container } from "@/components/primitives/container";

/**
 * design/04_COMPONENT_LIBRARY.md Section 1. Transparent over the hero,
 * glass-nav once scrolled. Mobile menu is a real dialog with focus
 * trapping (website/11_ACCESSIBILITY_PLAN.md Section 2), not a CSS-only
 * reveal.
 */
export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const transparentHero = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        transparentHero ? "bg-transparent" : "glass-nav"
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="font-display text-lg font-medium tracking-tight">
          Fig&nbsp;Tree Residences
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-(length:--text-nav) tracking-[0.02em] pb-1 border-b ${
                  active
                    ? "border-(--color-accent-primary) opacity-90"
                    : "border-transparent hover:border-(--color-accent-primary)"
                } transition-colors duration-200`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4 text-(length:--text-nav)">
          <a href={`tel:${siteConfig.phone.primary.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-(--color-accent-primary-text)">
            <Phone size={16} strokeWidth={1.5} aria-hidden />
            {siteConfig.phone.primary}
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden min-h-11 min-w-11 flex items-center justify-center"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </Container>

      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="lg:hidden fixed inset-0 top-[64px] z-50 bg-(--color-surface-canvas) flex flex-col"
        >
          <nav className="flex flex-col gap-1 p-6" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 text-lg border-b border-(--color-border-hairline)"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-6 mt-auto flex flex-col gap-2 text-(length:--text-nav)">
            <a href={`tel:${siteConfig.phone.primary.replace(/\s/g, "")}`} className="flex items-center gap-2">
              <Phone size={16} strokeWidth={1.5} aria-hidden />
              {siteConfig.phone.primary}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener"
              className="text-(--color-accent-primary-text)"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
