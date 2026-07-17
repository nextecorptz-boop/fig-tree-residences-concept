"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/primitives/button";
import { formStateVariants } from "@/lib/motion/variants";
import { submitContactForm, type ContactFormState } from "@/app/(legacy)/contact/actions";

const initialState: ContactFormState = { status: "idle" };

/**
 * design/04_COMPONENT_LIBRARY.md Section 9's form principle applied here:
 * real, distinct success/error states, no spinner, per
 * website/06_ANIMATION_MAP.md Pattern J (form-state-transition). Every
 * field has a visible label and an error tied via aria-describedby, per
 * website/11_ACCESSIBILITY_PLAN.md Section 7.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-(length:--text-caption) text-(--color-text-muted) mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-describedby={state.status === "error" ? "contact-form-message" : undefined}
          className="w-full min-h-11 rounded-(--radius-sm) border border-(--color-border-hairline) bg-(--color-surface-canvas) px-3"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-(length:--text-caption) text-(--color-text-muted) mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-describedby={state.status === "error" ? "contact-form-message" : undefined}
          className="w-full min-h-11 rounded-(--radius-sm) border border-(--color-border-hairline) bg-(--color-surface-canvas) px-3"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-(length:--text-caption) text-(--color-text-muted) mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-describedby={state.status === "error" ? "contact-form-message" : undefined}
          className="w-full rounded-(--radius-sm) border border-(--color-border-hairline) bg-(--color-surface-canvas) px-3 py-2"
        />
      </div>

      <AnimatePresence>
        {state.status !== "idle" && (
          <motion.p
            key={state.status}
            id="contact-form-message"
            role={state.status === "error" ? "alert" : "status"}
            aria-live="polite"
            variants={formStateVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={state.status === "error" ? "text-(--color-feedback-error)" : "text-(--color-feedback-success)"}
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>

      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
