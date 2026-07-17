import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { StaggerGroup, StaggerItem } from "@/components/primitives/stagger-group";
import { experiences, type Experience } from "@/lib/content/experiences";

export const metadata: Metadata = {
  title: "Things to Do Near Fig Tree Residences",
  description: "Local activities and points of interest around Msasani Peninsula and Masaki, near Fig Tree Residences.",
};

const CATEGORIES: Experience["category"][] = ["Waterfront & Leisure", "Dining Out", "Culture"];

export default function ExperiencesPage() {
  return (
    <Container className="py-(--space-4xl)">
      <Reveal>
        <h1 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">Nearby.</h1>
        <p className="mt-4 text-(length:--text-body-l) text-(--color-text-muted) max-w-2xl">
          What is there to do beyond logistics — a short list of the peninsula&rsquo;s own points of interest.
        </p>
      </Reveal>

      <div className="mt-12 grid lg:grid-cols-3 gap-10">
        {CATEGORIES.map((category) => (
          <div key={category}>
            <h2 className="text-(length:--text-heading-3) font-semibold mb-4">{category}</h2>
            <StaggerGroup className="space-y-6">
              {experiences
                .filter((e) => e.category === category)
                .map((e) => (
                  <StaggerItem key={e.id}>
                    <p className="font-medium flex items-center gap-1.5">
                      {e.name}
                      {e.externalLink && (
                        <a href={e.externalLink} target="_blank" rel="noopener" aria-label={`${e.name} (opens in new tab)`}>
                          <ExternalLink size={14} strokeWidth={1.5} />
                        </a>
                      )}
                    </p>
                    <p className="text-(length:--text-body) text-(--color-text-muted) mt-1">{e.description}</p>
                  </StaggerItem>
                ))}
            </StaggerGroup>
          </div>
        ))}
      </div>
    </Container>
  );
}
