"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CalendarPlus } from "lucide-react";
import { formStateVariants } from "@/lib/motion/variants";
import { roomTypes } from "@/lib/content/rooms";
import { bookingCopy } from "@/lib/content/copy";
import { Button } from "@/components/primitives/button";

type Step = "selecting" | "rate-loading" | "rate-shown" | "payment-redirect" | "confirmed" | "error";

/**
 * design/04_COMPONENT_LIBRARY.md Section 9 + website/04_SECTION_BLUEPRINT.md
 * Sections 32–35. The single most accessibility- and performance-critical
 * component in the tree (11_ACCESSIBILITY_PLAN.md Section 8) — every state
 * change is announced via aria-live.
 *
 * PesapalHandoff is a clearly-labelled stub: no live payment credentials
 * are available to this build (see project decision log). The state
 * machine, UI, and accessibility behaviour are real and complete; only the
 * actual payment transaction is simulated.
 */
export function BookingWidget({ initialRoomSlug }: { initialRoomSlug?: string }) {
  const [step, setStep] = useState<Step>("selecting");
  const [roomSlug, setRoomSlug] = useState(initialRoomSlug ?? roomTypes[0]?.slug ?? "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const room = roomTypes.find((r) => r.slug === roomSlug);
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000;
    return diff > 0 ? Math.round(diff) : 0;
  }, [checkIn, checkOut]);
  const total = room ? nights * room.nightlyRateUSD : 0;

  function handleSeeRates(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!room || nights <= 0) {
      setError("Choose a room and valid check-in / check-out dates before continuing.");
      setStep("error");
      return;
    }
    setStep("rate-loading");
    setTimeout(() => setStep("rate-shown"), 500);
  }

  function handlePay() {
    setStep("payment-redirect");
    setTimeout(() => {
      setBookingRef(`FT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
      setStep("confirmed");
    }, 1400);
  }

  return (
    <div className="rounded-(--radius-lg) bg-(--color-surface-raised) p-6 lg:p-10" aria-live="polite">
      {/* Not mode="wait": a booking flow must never wait on an animation
          finishing (a backgrounded tab, reduced motion, or a slow device
          can stall requestAnimationFrame) to advance to the next state. */}
      <AnimatePresence>
        {(step === "selecting" || step === "error") && (
          <motion.form
            key="selecting"
            variants={formStateVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSeeRates}
            className="space-y-6"
          >
            <h2 className="font-display text-[24px]">{bookingCopy.headline}</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-(length:--text-caption) text-(--color-text-muted)">Room</span>
                <select
                  value={roomSlug}
                  onChange={(e) => setRoomSlug(e.target.value)}
                  className="mt-1 w-full min-h-11 rounded-(--radius-sm) border border-(--color-border-hairline) bg-(--color-surface-canvas) px-3"
                >
                  {roomTypes.map((r) => (
                    <option key={r.slug} value={r.slug}>{r.name}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-(length:--text-caption) text-(--color-text-muted)">Guests</span>
                <input
                  type="number"
                  min={1}
                  max={room?.occupancy ?? 4}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="mt-1 w-full min-h-11 rounded-(--radius-sm) border border-(--color-border-hairline) bg-(--color-surface-canvas) px-3"
                />
              </label>

              <label className="block">
                <span className="text-(length:--text-caption) text-(--color-text-muted)">Check-in</span>
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-1 w-full min-h-11 rounded-(--radius-sm) border border-(--color-border-hairline) bg-(--color-surface-canvas) px-3"
                />
              </label>

              <label className="block">
                <span className="text-(length:--text-caption) text-(--color-text-muted)">Check-out</span>
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-1 w-full min-h-11 rounded-(--radius-sm) border border-(--color-border-hairline) bg-(--color-surface-canvas) px-3"
                />
              </label>
            </div>

            {step === "error" && error && (
              <p role="alert" className="text-(length:--text-body) text-(--color-feedback-error)">{error}</p>
            )}

            <Button type="submit">See Rates</Button>
          </motion.form>
        )}

        {step === "rate-loading" && (
          <motion.p key="loading" variants={formStateVariants} initial="hidden" animate="visible" exit="exit" className="text-(length:--text-body)">
            Checking rates…
          </motion.p>
        )}

        {step === "rate-shown" && room && (
          <motion.div key="rate" variants={formStateVariants} initial="hidden" animate="visible" exit="exit">
            <h2 className="font-display text-[24px]">{bookingCopy.rateDisplayHeadline}</h2>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-(length:--text-body)">{room.name} · {nights} night{nights === 1 ? "" : "s"}</p>
                <p className="text-(length:--text-caption) text-(--color-text-muted)">${room.nightlyRateUSD} / night</p>
              </div>
              <p className="font-display text-[32px]">${total}</p>
            </div>
            <Button onClick={handlePay} className="mt-6 w-full">Continue to Payment</Button>
            <button type="button" onClick={() => setStep("selecting")} className="mt-3 text-(length:--text-caption) underline">
              Change dates or room
            </button>
          </motion.div>
        )}

        {step === "payment-redirect" && (
          <motion.div key="pay" variants={formStateVariants} initial="hidden" animate="visible" exit="exit">
            <h2 className="font-display text-[24px]">{bookingCopy.paymentHeadline}</h2>
            <p className="mt-2 text-(length:--text-body) text-(--color-text-muted)">{bookingCopy.paymentIntro}</p>
            <p className="mt-6 text-(length:--text-body)">Confirming your stay…</p>
            <p className="mt-2 text-(length:--text-caption) text-(--color-text-muted) italic">
              (Demo build — Pesapal is not connected. This step simulates the handoff.)
            </p>
          </motion.div>
        )}

        {step === "confirmed" && room && bookingRef && (
          <motion.div
            key="confirmed"
            variants={formStateVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h2 className="font-display text-[28px]">{bookingCopy.confirmationHeadline}</h2>
            <p className="mt-2 text-(length:--text-body)">
              {room.name} · {checkIn} → {checkOut}
            </p>
            <p className="mt-1 text-(length:--text-caption) text-(--color-text-muted)">Reference {bookingRef}</p>
            <div className="mt-6 flex justify-center gap-4">
              <Button variant="secondary" onClick={() => downloadIcs(room.name, checkIn, checkOut)}>
                <CalendarPlus size={16} strokeWidth={1.5} aria-hidden /> Add to Calendar
              </Button>
              <Button href="/contact" variant="text">Contact Us</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function downloadIcs(roomName: string, checkIn: string, checkOut: string) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:Fig Tree Residences — ${roomName}`,
    `DTSTART;VALUE=DATE:${checkIn.replace(/-/g, "")}`,
    `DTEND;VALUE=DATE:${checkOut.replace(/-/g, "")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fig-tree-stay.ics";
  a.click();
  URL.revokeObjectURL(url);
}
