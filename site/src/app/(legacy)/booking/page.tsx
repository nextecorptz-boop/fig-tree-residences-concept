import type { Metadata } from "next";
import { Container } from "@/components/primitives/container";
import { BookingWidget } from "@/components/shared/booking-widget";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { bookingFaq } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "Rates & Booking",
  description: "Check live rates and availability at Fig Tree Residences and book securely through Pesapal.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string }>;
}) {
  const { room } = await searchParams;

  return (
    <Container width="content" className="py-(--space-4xl)">
      <BookingWidget initialRoomSlug={room} />

      <div className="mt-(--space-4xl)">
        <h2 className="font-display text-[24px] mb-4">Questions.</h2>
        <FaqAccordion items={bookingFaq} />
      </div>
    </Container>
  );
}
