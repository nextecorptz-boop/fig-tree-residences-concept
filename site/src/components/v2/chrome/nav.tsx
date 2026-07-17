"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "The Garden", href: "#garden" },
  { label: "Apartments", href: "#apartments" },
  { label: "Dining", href: "#dining" },
  { label: "Masaki", href: "#masaki" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Wordmark is set in type, not drawn.
 *
 * The only logo asset in this project is a photograph of a painted signboard —
 * there's no vector art anywhere. Rather than trace an approximation and pass it
 * off as the identity, the mark is set in Cormorant. It needs replacing with the
 * real artwork before this ships.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            scrolled
              ? "border-b border-(--ft-sage)/12 bg-(--ft-forest)/72 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        />
        <nav className="shell relative flex items-center justify-between py-5">
          <a href="#top" className="group flex items-baseline gap-2.5" data-cursor="link">
            <span className="font-display text-[1.375rem] leading-none font-light tracking-[0.14em] text-(--ft-cream)">
              FIG TREE
            </span>
            <span className="type-label hidden text-[0.5rem] text-(--ft-sage)/70 transition-colors duration-500 group-hover:text-(--ft-verdigris) sm:block">
              Residences
            </span>
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="link"
                className="type-label group relative text-[0.5625rem] text-(--ft-cream)/72 transition-colors duration-500 hover:text-(--ft-cream)"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-(--ft-verdigris) transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </a>
            ))}
            <a
              href="#reserve"
              data-cursor="button"
              className="group relative overflow-hidden border border-(--ft-sage)/30 px-6 py-2.5"
            >
              <span className="type-label relative z-10 text-[0.5625rem] text-(--ft-cream) transition-colors duration-500 group-hover:text-(--ft-forest)">
                Reserve
              </span>
              <span className="absolute inset-0 -translate-x-full bg-(--ft-cream) transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className={`h-px w-5 bg-(--ft-cream) transition-transform duration-500 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-(--ft-cream) transition-transform duration-500 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-(--ft-forest)/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex flex-col gap-1">
              {[...LINKS, { label: "Reserve", href: "#reserve" }].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08 * i, ease: EASE }}
                  className="type-headline border-b border-(--ft-sage)/12 py-5 text-(--ft-cream)"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
