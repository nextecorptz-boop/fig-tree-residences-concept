import { siteConfig } from "@/lib/content/site";
import { RootSystem } from "@/components/v2/primitives/root-system";

/**
 * 10 — The footer.
 *
 * Facts only, and every one of them verified against the brochure's back cover
 * and the property's own site. Social links are omitted on purpose: discovery
 * turned up two candidate Facebook pages and couldn't establish whether they're
 * one page or two, and linking the wrong one is worse than linking neither.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-(--ft-sage)/10 bg-(--ft-abyss) pt-[clamp(3.5rem,8vh,6rem)] pb-8">
      {/* The root system. 5% opacity, drawing itself over the last of the
          scroll — the tree the whole page has been standing on, finally shown,
          to whoever stays long enough to reach it. */}
      <RootSystem className="inset-x-0 top-0 h-[min(340px,60%)] w-full" />

      <div className="shell relative">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          {/* Wordmark */}
          <div className="col-span-2 lg:col-span-5">
            <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-light tracking-[0.1em] text-(--ft-cream)">
              FIG TREE
            </p>
            <p className="type-label mt-2.5 text-[0.5rem] text-(--ft-sage)/72">Residences</p>
            <p className="font-display mt-8 max-w-[26ch] text-[1.0625rem] leading-snug font-light text-(--ft-cream)/55 italic">
              A garden kept quietly, on the Msasani Peninsula.
            </p>
          </div>

          <div className="lg:col-span-2" />

          {/* Address */}
          <div className="col-span-1 lg:col-span-2">
            <p className="type-label text-[0.5rem] text-(--ft-sage)/72">Find us</p>
            <address className="mt-5 space-y-1 text-[0.875rem] leading-relaxed font-light text-(--ft-cream)/65 not-italic">
              <p>{siteConfig.address.street}</p>
              <p>{siteConfig.address.area}</p>
              <p>{siteConfig.address.city}</p>
              <p>{siteConfig.address.country}</p>
              <p className="pt-2 text-(--ft-cream)/55">{siteConfig.address.postal}</p>
            </address>
          </div>

          {/* Contact */}
          <div className="col-span-1 lg:col-span-3">
            <p className="type-label text-[0.5rem] text-(--ft-sage)/72">Reach us</p>
            <ul className="mt-5 space-y-2 text-[0.875rem] font-light">
              {[
                { v: siteConfig.phone.primary, h: `tel:${siteConfig.phone.primary.replace(/\s/g, "")}` },
                { v: siteConfig.phone.secondary, h: `tel:${siteConfig.phone.secondary.replace(/\s/g, "")}` },
                { v: siteConfig.email.reservations, h: `mailto:${siteConfig.email.reservations}` },
                { v: siteConfig.email.info, h: `mailto:${siteConfig.email.info}` },
              ].map((x) => (
                <li key={x.v}>
                  <a
                    href={x.h}
                    data-cursor="link"
                    className="text-(--ft-cream)/65 transition-colors duration-500 hover:text-(--ft-verdigris)"
                  >
                    {x.v}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(3rem,7vh,5rem)] flex flex-col gap-4 border-t border-(--ft-sage)/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-label text-[0.5rem] text-(--ft-sage)/72">
            © {year} {siteConfig.legalName}
          </p>
          <p className="type-label text-[0.5rem] text-(--ft-sage)/72">
            Open since 2018 · Msasani Peninsula · Dar es Salaam
          </p>
        </div>

        {/* Studio signature. Deliberately quiet — the footer's body font at
            caption size, not the label style, so it reads as a signature
            rather than another section heading. */}
        <p className="mt-6 text-center text-[0.75rem] leading-relaxed font-normal tracking-[0.02em] text-(--ft-cream)/55">
          Digital Experience Demo by{" "}
          <a
            href="https://www.nxtech.co.tz"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="border-b border-transparent pb-px text-(--ft-cream)/60 transition-[color,opacity,border-color] duration-250 hover:border-(--ft-cream)/70 hover:text-(--ft-cream)"
          >
            Nextec Corp
          </a>
        </p>
      </div>
    </footer>
  );
}
