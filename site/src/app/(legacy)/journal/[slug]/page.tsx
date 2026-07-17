import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";
import { getJournalPostBySlug, journalPosts } from "@/lib/content/journal";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) notFound();

  return (
    <Container width="content" className="py-(--space-4xl)">
      <Link href="/journal" className="text-(length:--text-caption) border-b border-(--color-accent-primary) pb-0.5">
        Back to Journal
      </Link>

      <p className="mt-6 text-(length:--text-caption) text-(--color-text-muted)">
        {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {post.author}
      </p>
      <h1 className="mt-2 font-display text-[28px] lg:text-[36px] leading-[1.2]">{post.title}</h1>

      <div className="mt-8 text-(length:--text-body-l) leading-relaxed max-w-[70ch]">
        <p>{post.body}</p>
        {post.isExcerptOnly && (
          <p className="mt-6 text-(length:--text-caption) text-(--color-text-muted) italic">
            This historical entry is migrated as an excerpt; the full original text will be added once recovered.
          </p>
        )}
      </div>

      <div className="mt-12">
        <Button href="/booking">Check Rates</Button>
      </div>
    </Container>
  );
}
