import type { Metadata } from "next";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { Gallery } from "@/components/shared/gallery";
import { mediaLibrary } from "@/lib/content/media";
import { galleryCopy } from "@/lib/content/copy";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Every approved photograph of Fig Tree Residences — rooms, gardens, dining, and amenities.",
};

export default function GalleryPage() {
  return (
    <Container className="py-(--space-4xl)">
      <Reveal>
        <h1 className="font-display text-[28px] lg:text-[36px] leading-[1.2] mb-10">{galleryCopy.headline}</h1>
      </Reveal>
      <Gallery items={mediaLibrary} />
    </Container>
  );
}
