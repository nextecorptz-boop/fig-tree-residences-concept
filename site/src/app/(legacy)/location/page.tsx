import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { LocationMap } from "@/components/shared/location-map";
import { proximityFacts } from "@/lib/content/location";
import { locationCopy } from "@/lib/content/copy";

export const metadata: Metadata = {
  title: "Location — Fig Tree Residences, Msasani Peninsula",
  description: "Two hundred metres from the Dar es Salaam Yacht Club, walking distance to the Slipway Waterfront — Fig Tree Residences' verified location on the Msasani Peninsula.",
};

export default function LocationPage() {
  return (
    <Container className="py-(--space-4xl)">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <Reveal className="lg:col-span-5">
          <h1 className="font-display text-[28px] lg:text-[36px] leading-[1.2]">{locationCopy.headline}</h1>
          <p className="mt-4 text-(length:--text-body-l) text-(--color-text-muted)">{locationCopy.intro}</p>

          <ul className="mt-8 space-y-4">
            {proximityFacts.map((fact) => (
              <li key={fact.label} className="flex gap-3 text-(length:--text-body)">
                <span className="text-(--color-accent-primary-text) font-medium whitespace-nowrap">{fact.distance}</span>
                <span className="text-(--color-text-muted)">{fact.label}</span>
              </li>
            ))}
          </ul>

          <Link href="/experiences" className="mt-8 inline-block text-(length:--text-nav) border-b border-(--color-accent-primary) pb-0.5">
            See What&rsquo;s Nearby
          </Link>
        </Reveal>

        <div className="lg:col-span-7">
          <LocationMap />
        </div>
      </div>
    </Container>
  );
}
