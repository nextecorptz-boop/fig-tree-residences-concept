import { SmoothScroll } from "@/components/v2/chrome/smooth-scroll";
import { FigCursor } from "@/components/v2/chrome/cursor";
import { Nav } from "@/components/v2/chrome/nav";
import { Footer } from "@/components/v2/chrome/footer";

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <FigCursor />
      <Nav />
      <main id="main" className="relative bg-(--ft-forest) text-(--ft-cream) overflow-hidden pt-24">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
