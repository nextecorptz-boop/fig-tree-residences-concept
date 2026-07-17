import type { ElementType, ReactNode } from "react";

/** Wraps container-max / container-content per design/05_LAYOUT_SYSTEM.md Section 2. */
export function Container({
  children,
  className = "",
  width = "max",
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  width?: "max" | "content";
  as?: ElementType;
}) {
  const widthClass = width === "content" ? "container-content" : "container-max";
  return <Component className={`${widthClass} ${className}`}>{children}</Component>;
}
