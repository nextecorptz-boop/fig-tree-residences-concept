import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { StaggerGroup, StaggerItem } from "@/components/primitives/stagger-group";
import { journalPosts } from "@/lib/content/journal";
import { journalCopy } from "@/lib/content/copy";

export const metadata: Metadata = {
  title: "Journal",
  description: "Occasional writing from Fig Tree Residences.",
};

export default function JournalIndexPage() {
  return (
    <Container width="content" className="py-(--space-4xl)">
      <Reveal>
        <h1 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">{journalCopy.headline}</h1>
      </Reveal>

      <StaggerGroup className="mt-10 divide-y divide-(--color-border-hairline)">
        {journalPosts.map((post) => (
          <StaggerItem key={post.slug}>
            <Link href={`/journal/${post.slug}`} className="block py-6">
              <p className="text-(length:--text-caption) text-(--color-text-muted)">
                {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <h2 className="mt-1 font-display text-[22px]">{post.title}</h2>
              <p className="mt-2 text-(length:--text-body) text-(--color-text-muted)">{post.excerpt}</p>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Container>
  );
}
