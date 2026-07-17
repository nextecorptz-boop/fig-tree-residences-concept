/**
 * Local stand-in for the Supabase `journal_posts` table. Both entries are
 * migrated from docs/CONTENT_DATABASE.md Section 3 — genuine historical
 * posts, reused per website/14_CONTENT_MAPPING.md ("light copyedit only,
 * no rewrite of its voice"). The source excerpts were themselves truncated
 * in Discovery's record, so `body` intentionally stops where the source
 * record stops rather than inventing the rest of either post.
 */

export type JournalPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  body: string;
  isExcerptOnly: boolean;
};

export const journalPosts: JournalPost[] = [
  {
    slug: "quite-the-auspicious-opening",
    title: "Quite the auspicious opening..",
    date: "2018-07-30",
    author: "Fig Tree Residences",
    excerpt:
      "Well well! We opened our doors for a soft launch to the market in May 2018. As of August 2018 all apartments are operational. Please...",
    body: "Well well! We opened our doors for a soft launch to the market in May 2018. As of August 2018 all apartments are operational. Please…",
    isExcerptOnly: true,
  },
  {
    slug: "benefits-of-long-term-stays-in-serviced-apartments",
    title: "Benefits of Long-Term Stays in Serviced Apartments",
    date: "2025-10-13",
    author: "Fig Tree Residences",
    excerpt:
      "When I first started traveling for work, I bounced between hotels, hostels, and sometimes even friends' couches. Not exactly the dream...",
    body: "When I first started traveling for work, I bounced between hotels, hostels, and sometimes even friends' couches. Not exactly the dream…",
    isExcerptOnly: true,
  },
];

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
