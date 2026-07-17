"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media } from "@/lib/v2/media";
import { booking, departure } from "@/lib/v2/copy";
import { siteConfig } from "@/lib/content/site";
import { Reveal } from "@/components/v2/primitives/reveal";
import { CanopyShade } from "@/components/v2/primitives/tracery";

/**
 * 09 — Reservations, and the departure moment.
 *
 * A glass panel over the property's own building. No rates, no availability
 * calendar, no "3 rooms left" — the property publishes no pricing anywhere and
 * says long stays are priced by conversation, so this asks for the enquiry and
 * says plainly that a person will answer it.
 *
 * The form is presentational in this build (homepage only, per the brief). The
 * phone, WhatsApp and email links are real and work today.
 */
export function Reserve() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const bg = media("facade-tree");

  return (
    <section id="reserve" ref={ref} className="relative isolate overflow-hidden bg-(--ft-abyss)">
      {/* Departure — the bookend to the hero */}
      <div className="shell relative z-10 pt-[clamp(5rem,12vh,9rem)] pb-[clamp(3rem,7vh,5rem)] text-center">
        <Reveal>
          <p className="font-display text-[clamp(2rem,4.5vw,4rem)] leading-tight font-light text-(--ft-cream)/90 italic">
            &ldquo;{departure.line}&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="type-body mx-auto mt-6 max-w-[44ch] text-pretty text-(--ft-cream)/55">{departure.body}</p>
        </Reveal>
      </div>

      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10 grain">
        <motion.div style={{ y: reduced ? 0 : y }} className="absolute inset-[-6%]">
          <Image
            src={bg.src}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={bg.blurDataURL}
            className="object-cover object-center"
            style={{ filter: "saturate(0.6) brightness(0.42) contrast(1.05)" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-(--ft-abyss)/72" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--ft-abyss) 0%, transparent 30%, transparent 70%, var(--ft-abyss) 100%)",
          }}
        />
      </div>

      <div className="shell relative z-10 pb-[clamp(5rem,12vh,9rem)]">
        {/* The card sits under the tree. A large, soft crown of shade spreads
            above and past it on both sides — you should feel sheltered here
            without ever identifying the shape doing it. */}
        <div className="relative">
          <CanopyShade
            className="-top-[16%] left-1/2 h-[128%] w-[118%] -translate-x-1/2 blur-3xl"
            color="var(--ft-abyss)"
            opacity={0.55}
            phase={2.2}
          />
          <CanopyShade
            className="-top-[10%] left-1/2 h-[118%] w-[104%] -translate-x-1/2 blur-2xl"
            color="var(--ft-forest)"
            opacity={0.4}
            phase={0.9}
          />

        <div className="glass relative grid grid-cols-1 gap-y-10 rounded-[3px] p-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-12 lg:gap-x-14">
          {/* Pitch */}
          <div className="lg:col-span-5">
            <p className="type-label flex items-center gap-4 text-(--ft-verdigris)">
              <span className="h-px w-8 bg-(--ft-verdigris)/40" />
              {booking.label}
            </p>
            <h2 className="type-headline mt-7 text-(--ft-cream)">
              {booking.headline.split("\n").map((l, i) => (
                <span key={i} className="block">
                  {i === 1 ? <em className="text-(--ft-verdigris)">{l}</em> : l}
                </span>
              ))}
            </h2>
            <p className="type-body mt-7 max-w-[38ch] text-pretty text-(--ft-cream)/55">{booking.body}</p>

            <div className="mt-9 space-y-3 border-t border-(--ft-sage)/15 pt-7">
              <ContactRow label="Telephone" value={siteConfig.phone.primary} href={`tel:${siteConfig.phone.primary.replace(/\s/g, "")}`} />
              <ContactRow label="WhatsApp" value={siteConfig.phone.secondary} href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`} />
              <ContactRow label="Reservations" value={siteConfig.email.reservations} href={`mailto:${siteConfig.email.reservations}`} />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form
              className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Field label="Name" className="sm:col-span-1">
                <input type="text" name="name" autoComplete="name" className={inputCls} />
              </Field>
              <Field label="Email" className="sm:col-span-1">
                <input type="email" name="email" autoComplete="email" className={inputCls} />
              </Field>
              <Field label="Arrival" className="sm:col-span-1">
                <input type="date" name="arrive" className={`${inputCls} [color-scheme:dark]`} />
              </Field>
              <Field label="Departure" className="sm:col-span-1">
                <input type="date" name="depart" className={`${inputCls} [color-scheme:dark]`} />
              </Field>
              <Field label="Length of stay" className="sm:col-span-2">
                <select name="length" className={`${inputCls} cursor-pointer`}>
                  {["A few nights", "A week or two", "A month", "Three months or more"].map((o) => (
                    <option key={o} className="bg-(--ft-forest)">
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Anything we should know" className="sm:col-span-2">
                <textarea name="notes" rows={3} className={`${inputCls} resize-none`} />
              </Field>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  data-cursor="button"
                  className="group relative w-full overflow-hidden bg-(--ft-cream) py-4 text-(--ft-forest) transition-colors duration-500 hover:text-(--ft-cream) sm:w-auto sm:px-12"
                >
                  <span className="type-label relative z-10">Send enquiry</span>
                  <span className="absolute inset-0 -translate-y-full bg-(--ft-emerald) transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                </button>
                <p className="type-label mt-4 text-[0.5rem] leading-relaxed text-(--ft-sage)/72">
                  Not yet wired to a mailbox — this build is the homepage only
                </p>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full border-b border-(--ft-sage)/25 bg-transparent pb-2.5 font-body text-[0.9375rem] font-light text-(--ft-cream) outline-none transition-colors duration-400 focus:border-(--ft-verdigris)";

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-2.5 ${className ?? ""}`}>
      <span className="type-label text-[0.5rem] text-(--ft-sage)/75">{label}</span>
      {children}
    </label>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      data-cursor="link"
      className="group flex items-baseline justify-between gap-4 border-b border-(--ft-sage)/8 pb-3"
    >
      <span className="type-label text-[0.5rem] text-(--ft-sage)/72">{label}</span>
      <span className="font-body text-[0.9375rem] font-light text-(--ft-cream)/80 transition-colors duration-500 group-hover:text-(--ft-verdigris)">
        {value}
      </span>
    </a>
  );
}
