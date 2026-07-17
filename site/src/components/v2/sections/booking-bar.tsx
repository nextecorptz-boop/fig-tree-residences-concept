"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The glass enquiry bar in the hero.
 *
 * Deliberately an *enquiry*, not a booking engine. The property publishes no
 * rates anywhere — brochure or site — and long-stay pricing is explicitly "by
 * conversation". A widget that implied live availability or a price would be
 * inventing both, so this collects dates and hands off to the reservations
 * section further down.
 */
export function BookingBar() {
  const [arrive, setArrive] = useState("");
  const [depart, setDepart] = useState("");
  const [guests, setGuests] = useState("2");

  const go = () => {
    const el = document.getElementById("reserve");
    if (!el) return;
    const params = new URLSearchParams();
    if (arrive) params.set("arrive", arrive);
    if (depart) params.set("depart", depart);
    params.set("guests", guests);
    history.replaceState(null, "", `#reserve?${params}`);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 1.3, ease: EASE }}
      className="shell relative z-20 mb-7 w-full lg:mb-9"
    >
      {/* Phone: one button, not three stacked date pickers. Fully expanded, the
          bar is ~220px tall and buries the headline it's supposed to support —
          and the same fields are waiting in the reservations section anyway. */}
      <button
        type="button"
        onClick={go}
        className="glass w-full rounded-[3px] py-4 text-center sm:hidden"
      >
        <span className="type-label text-(--ft-cream)">Check availability</span>
      </button>

      <div className="glass hidden w-full max-w-[620px] flex-col gap-px overflow-hidden rounded-[3px] sm:flex sm:flex-row sm:items-stretch">
        <Field label="Arrival">
          <input
            type="date"
            value={arrive}
            onChange={(e) => setArrive(e.target.value)}
            className="w-full bg-transparent font-body text-[0.9375rem] font-light text-(--ft-cream) outline-none [color-scheme:dark]"
          />
        </Field>
        <Divider />
        <Field label="Departure">
          <input
            type="date"
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            min={arrive || undefined}
            className="w-full bg-transparent font-body text-[0.9375rem] font-light text-(--ft-cream) outline-none [color-scheme:dark]"
          />
        </Field>
        <Divider />
        <Field label="Guests">
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full cursor-pointer bg-transparent font-body text-[0.9375rem] font-light text-(--ft-cream) outline-none"
          >
            {["1", "2", "3", "4"].map((n) => (
              <option key={n} value={n} className="bg-(--ft-forest) text-(--ft-cream)">
                {n} {n === "1" ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </Field>

        <button
          type="button"
          onClick={go}
          data-cursor="button"
          className="group relative shrink-0 overflow-hidden bg-(--ft-cream) px-8 py-4 text-(--ft-forest) transition-colors duration-500 hover:text-(--ft-cream) sm:py-0"
        >
          <span className="type-label relative z-10">Enquire</span>
          <span className="absolute inset-0 -translate-y-full bg-(--ft-emerald) transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
        </button>
      </div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-1 cursor-pointer flex-col justify-center gap-1.5 px-6 py-3.5">
      <span className="type-label text-[0.5625rem] text-(--ft-sage)/80">{label}</span>
      {children}
    </label>
  );
}

function Divider() {
  return <span aria-hidden className="hidden w-px shrink-0 bg-(--ft-cream)/12 sm:block" />;
}
