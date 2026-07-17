/**
 * FAQ content, scoped per page per website/02_SITE_MAP.md Section 5 —
 * practical/property questions on Amenities, payment/cancellation/Pesapal
 * questions on Booking. Every category shipped here has complete content,
 * per design/04_COMPONENT_LIBRARY.md Section 12's "no empty category" rule.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const amenitiesFaq: FaqItem[] = [
  {
    question: "What time is check-in and check-out?",
    answer: "Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out can often be arranged — contact us ahead of arrival.",
  },
  {
    question: "Is parking available?",
    answer: "Yes — secured, on-site parking is available to every guest at no additional charge.",
  },
  {
    question: "Is WiFi included?",
    answer: "Yes, free high-speed WiFi is available throughout the residence and in every room.",
  },
  {
    question: "Can I cook in my room?",
    answer: "Every room includes a fully equipped kitchenette with a kettle, toaster, and coffee press. A shopping service can bring in groceries if you'd rather not go out.",
  },
  {
    question: "Is laundry available?",
    answer: "Yes, laundry facilities are available for all guests, including those staying long-term.",
  },
];

export const bookingFaq: FaqItem[] = [
  {
    question: "How do I pay for my booking?",
    answer: "Payment is completed securely through Pesapal, our payment partner. You'll see the exact rate before you're asked to pay anything.",
  },
  {
    question: "What is the cancellation policy?",
    answer: "Cancellation terms are shown before you confirm your booking and vary by rate and length of stay. Contact us directly if your plans change.",
  },
  {
    question: "Can I book for a long stay?",
    answer: "Yes — see our Long Stay page for residences suited to extended stays, with terms adjusted for length of stay.",
  },
  {
    question: "Will I receive a confirmation?",
    answer: "Yes, you'll receive a booking reference and confirmation immediately after payment completes, with an option to add the stay to your calendar.",
  },
];
