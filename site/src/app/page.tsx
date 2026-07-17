import { SmoothScroll } from "@/components/v2/chrome/smooth-scroll";
import { SeedLoader } from "@/components/v2/chrome/seed-loader";
import { FigCursor } from "@/components/v2/chrome/cursor";
import { Nav } from "@/components/v2/chrome/nav";
import { Footer } from "@/components/v2/chrome/footer";
import { Hero } from "@/components/v2/sections/hero";
import { Welcome } from "@/components/v2/sections/welcome";
import { Rooms } from "@/components/v2/sections/rooms";
import { GardenExperience } from "@/components/v2/sections/garden-experience";
import { Pool } from "@/components/v2/sections/pool";
import { Dining } from "@/components/v2/sections/dining";
import { Masaki } from "@/components/v2/sections/masaki";
import { Stories } from "@/components/v2/sections/stories";
import { Reserve } from "@/components/v2/sections/reserve";

/**
 * The homepage, and only the homepage — per the brief.
 *
 * Section order is a descent: street (dark) → garden (cream) → apartments (dark)
 * → grounds (darkest, slowest) → pool → dining (the one warm section) → Masaki
 * (cream, factual) → people (linen) → reservations (dark). The light comes and
 * goes so the page breathes rather than running one tone for nine screens.
 */
export default function Home() {
  return (
    <SmoothScroll>
      <SeedLoader />
      <FigCursor />
      <Nav />
      <main id="main" className="relative">
        <span id="top" />
        <Hero />
        <Welcome />
        <Rooms />
        <GardenExperience />
        <Pool />
        <Dining />
        <Masaki />
        <Stories />
        <Reserve />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
