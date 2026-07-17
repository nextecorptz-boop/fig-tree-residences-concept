import { SITE_URL, siteConfig } from "@/lib/content/site";

/**
 * website/10_SEO_PLAN.md Section 3. Base LodgingBusiness JSON-LD, present
 * on every page via the root layout. AggregateRating/Review schema is
 * deliberately omitted while lib/content/testimonials.ts is empty — no
 * verified rating data exists yet, and shipping fabricated review schema
 * would be worse than shipping none.
 */
export function LodgingBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.name,
    url: SITE_URL,
    telephone: siteConfig.phone.primary,
    email: siteConfig.email.info,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.area,
      addressCountry: "TZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
