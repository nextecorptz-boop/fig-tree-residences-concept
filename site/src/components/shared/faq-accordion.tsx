"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/content/faq";

/**
 * design/04_COMPONENT_LIBRARY.md Section 12. Pattern G — accordion-toggle
 * (300ms, ease-quiet), implemented via a CSS grid-rows expand/collapse
 * rather than framer-motion — Radix's own state-driven data attributes
 * pair more reliably with this technique than height-measurement.
 * Keyboard-operable with correct aria-expanded/aria-controls wiring
 * (Radix handles this natively). Single-item-open-at-a-time.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-(--color-border-hairline)">
      {items.map((item, i) => (
        <Accordion.Item key={item.question} value={`item-${i}`}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left min-h-11">
              <span className="text-(length:--text-heading-3) font-medium">{item.question}</span>
              <ChevronDown
                size={20}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            forceMount
            className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] data-[state=open]:grid-rows-[1fr] data-[state=closed]:grid-rows-[0fr]"
          >
            <div className="overflow-hidden">
              <p className="pb-5 text-(length:--text-body) text-(--color-text-muted)">{item.answer}</p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
