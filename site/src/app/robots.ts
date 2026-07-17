import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content/site";

/** website/10_SEO_PLAN.md Section 7. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
