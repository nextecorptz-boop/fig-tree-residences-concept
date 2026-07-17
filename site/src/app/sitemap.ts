import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content/site";
import { roomTypes } from "@/lib/content/rooms";
import { journalPosts } from "@/lib/content/journal";

/** website/10_SEO_PLAN.md Section 7. Auto-generated, covers the full route table from website/02_SITE_MAP.md. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/our-story",
    "/rooms",
    "/rooms/long-stay",
    "/amenities",
    "/gardens",
    "/dining",
    "/location",
    "/experiences",
    "/gallery",
    "/reviews",
    "/journal",
    "/contact",
    "/booking",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const roomRoutes = roomTypes.map((room) => ({
    url: `${SITE_URL}/rooms/${room.slug}`,
    lastModified: new Date(),
  }));

  const journalRoutes = journalPosts.map((post) => ({
    url: `${SITE_URL}/journal/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...roomRoutes, ...journalRoutes];
}
