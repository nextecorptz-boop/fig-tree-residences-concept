"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { grow, canopyPath } from "@/lib/v2/tree";

const EASE = [0.4, 0, 0.2, 1] as const;

/**
 * The entrance. A seed, roots, a trunk, branches, a canopy, the wordmark — then
 * the site. Three seconds.
 *
 * It's the same generator that draws the footer roots and the tracery, so the
 * tree you watch grow here is literally the tree whose crown frames every
 * photograph below. Nothing is traced from the logo.
 *
 * The hero's own entry animations run underneath while this plays, so the
 * curtain lifts on a page that has already settled rather than one that starts
 * moving the moment you can see it.
 *
 * Skipped outright under prefers-reduced-motion — a three-second hold on an
 * animation someone has asked not to see is just a three-second delay.
 */

const ROOTS = grow({ x: 200, y: 236, angle: Math.PI / 2, length: 40, depth: 5, seed: 21, spread: 0.8, shrink: 0.7, curve: 0.34 });
const TRUNK = "M200 236C199.2 224 200.6 210 200 190";
const BRANCHES = grow({ x: 200, y: 190, angle: -Math.PI / 2, length: 44, depth: 5, seed: 9, spread: 0.54, shrink: 0.74, curve: 0.2 });

const T = {
  seed: 0.0,
  roots: 0.34,
  trunk: 0.92,
  branches: 1.28,
  canopy: 1.94,
  word: 2.36,
  out: 3.05,
};

export function SeedLoader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setDone(true), T.out * 1000);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  /**
   * Rendered on the server as well as the client, deliberately.
   *
   * Gating this behind a mounted flag meant it only appeared after hydration —
   * so the hero painted first and *then* got covered by the entrance, which is
   * the exact opposite of a loading screen. In the HTML from the first byte, it
   * covers from the first paint.
   *
   * That leaves two audiences who must never be trapped behind it, and neither
   * can be detected server-side, so both are handled in CSS at paint time:
   * no-JS (nothing would ever clear the timer) and prefers-reduced-motion
   * (a three-second animation someone asked not to see is just a delay).
   * See .seed-loader in globals.css.
   */
  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="seed-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="seed-loader fixed inset-0 z-[200] flex flex-col items-center justify-center bg-(--ft-abyss)"
        >
          <svg viewBox="0 0 400 400" className="h-[min(66vh,500px)] w-auto" aria-hidden focusable="false">
            {/* Seed */}
            <motion.ellipse
              cx="200"
              cy="236"
              rx="3.2"
              ry="4.4"
              fill="var(--ft-verdigris)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.35, 1], opacity: [0, 1, 0.9] }}
              transition={{ duration: 0.62, delay: T.seed, ease: EASE }}
              style={{ transformOrigin: "200px 236px" }}
            />

            {/* Roots, downward */}
            <g fill="none" stroke="var(--ft-sage)" strokeLinecap="round" opacity={0.55}>
              {ROOTS.map((l, i) => (
                <motion.path
                  key={`r${i}`}
                  d={l.d}
                  strokeWidth={Math.max(0.5, 2.2 - l.order * 0.38)}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.62, delay: T.roots + l.order * 0.1, ease: EASE },
                    opacity: { duration: 0.01, delay: T.roots + l.order * 0.1 },
                  }}
                />
              ))}
            </g>

            {/* Trunk, rising */}
            <motion.path
              d={TRUNK}
              fill="none"
              stroke="var(--ft-cream)"
              strokeWidth={3.4}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.5, delay: T.trunk, ease: EASE },
                opacity: { duration: 0.01, delay: T.trunk },
              }}
            />

            {/* Branches, expanding */}
            <g fill="none" stroke="var(--ft-cream)" strokeLinecap="round" opacity={0.9}>
              {BRANCHES.map((l, i) => (
                <motion.path
                  key={`b${i}`}
                  d={l.d}
                  strokeWidth={Math.max(0.6, 2.8 - l.order * 0.46)}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.66, delay: T.branches + l.order * 0.13, ease: EASE },
                    opacity: { duration: 0.01, delay: T.branches + l.order * 0.13 },
                  }}
                />
              ))}
            </g>

            {/* Canopy, forming over the branches */}
            <motion.g
              transform="translate(56 34) scale(288 156)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: T.canopy, ease: EASE }}
            >
              <motion.path
                d={canopyPath({ crown: 0.78, amp: 0.08, phase: 0.6, root: 0.19 })}
                fill="var(--ft-emerald)"
                fillOpacity={0.18}
                stroke="var(--ft-verdigris)"
                strokeOpacity={0.5}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, delay: T.canopy, ease: EASE }}
                style={{ transformOrigin: "0.5px 0.78px" }}
              />
            </motion.g>
          </svg>

          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: T.word, ease: EASE }}
            className="mt-2 flex items-baseline gap-2.5"
          >
            <span className="font-display text-[1.375rem] leading-none font-light tracking-[0.14em] text-(--ft-cream)">
              FIG TREE
            </span>
            <span className="type-label text-[0.5rem] text-(--ft-sage)/72">Residences</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
