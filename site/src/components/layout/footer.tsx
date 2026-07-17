import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { FOOTER_LINKS, siteConfig } from "@/lib/content/site";
import { Container } from "@/components/primitives/container";
import { DepartureMoment } from "@/components/sections/departure-moment";

/** design/04_COMPONENT_LIBRARY.md Section 10. DepartureMoment renders on Home only. */
export function Footer({ showDeparture = false }: { showDeparture?: boolean }) {
  return (
    <footer className="mt-auto">
      {showDeparture && <DepartureMoment />}

      <div className="bg-(--color-surface-dusk) text-(--color-text-inverse)">
        <Container className="py-16 grid gap-12 lg:grid-cols-3">
          <div>
            <p className="font-display text-lg mb-4">Fig Tree Residences</p>
            <p className="text-(length:--text-body) opacity-80 max-w-xs">
              &ldquo;{siteConfig.cicero}&rdquo;
              <br />
              <span className="text-(length:--text-caption)">— {siteConfig.ciceroAttribution}</span>
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-(length:--text-body) content-start">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="opacity-90 hover:opacity-100 hover:underline underline-offset-4 py-1">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="text-(length:--text-body) opacity-90 space-y-2">
            <p>{siteConfig.address.street}</p>
            <p>{siteConfig.address.area}, {siteConfig.address.city}</p>
            <p>
              <a href={`tel:${siteConfig.phone.primary.replace(/\s/g, "")}`} className="hover:underline">{siteConfig.phone.primary}</a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email.info}`} className="hover:underline">{siteConfig.email.info}</a>
            </p>
            <div className="flex gap-4 pt-2">
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener" aria-label="Facebook">
                  <Facebook size={20} strokeWidth={1.5} />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener" aria-label="Instagram">
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>
        </Container>

        <div className="border-t border-white/10">
          <Container className="py-4 text-(length:--text-caption) opacity-70">
            © {new Date().getFullYear()} Fig Tree Residences
          </Container>
        </div>
      </div>
    </footer>
  );
}
