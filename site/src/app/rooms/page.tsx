import type { Metadata } from "next";
import { Rooms } from "@/components/v2/sections/rooms";

export const metadata: Metadata = {
  title: "Residences & Apartments",
  description: "Explore the verified serviced residences at Fig Tree Residences.",
};

export default function RoomsPage() {
  return (
    <div className="py-12 bg-(--ft-forest)">
      <Rooms />
    </div>
  );
}
