import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { ContactForm } from "@/components/shared/contact-form";
import { siteConfig } from "@/lib/content/site";
import { contactCopy } from "@/lib/content/copy";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach Fig Tree Residences at ${siteConfig.address.street}, ${siteConfig.address.area}, ${siteConfig.address.city}, or by phone at ${siteConfig.phone.primary}.`,
};

export default function ContactPage() {
  return (
    <Container width="content" className="py-(--space-4xl)">
      <Reveal>
        <h1 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">{contactCopy.headline}</h1>
        <p className="mt-4 text-(length:--text-body-l) text-(--color-text-muted) max-w-xl">{contactCopy.intro}</p>
      </Reveal>

      <div className="mt-12 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <div className="lg:col-span-4 lg:col-start-9 space-y-4 text-(length:--text-body)">
          <p className="flex gap-3">
            <MapPin size={20} strokeWidth={1.5} className="shrink-0 mt-0.5" aria-hidden />
            <span>
              {siteConfig.address.street}
              <br />
              {siteConfig.address.area}, {siteConfig.address.city}
            </span>
          </p>
          <p className="flex gap-3">
            <Phone size={20} strokeWidth={1.5} className="shrink-0" aria-hidden />
            <a href={`tel:${siteConfig.phone.primary.replace(/\s/g, "")}`}>{siteConfig.phone.primary}</a>
          </p>
          <p className="flex gap-3">
            <MessageCircle size={20} strokeWidth={1.5} className="shrink-0" aria-hidden />
            <a href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}`} target="_blank" rel="noopener">
              WhatsApp
            </a>
          </p>
          <p className="flex gap-3">
            <Mail size={20} strokeWidth={1.5} className="shrink-0" aria-hidden />
            <a href={`mailto:${siteConfig.email.info}`}>{siteConfig.email.info}</a>
          </p>
        </div>
      </div>
    </Container>
  );
}
