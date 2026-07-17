import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  children,
  size = "l",
  className = "",
  as: Component = "h2",
}: {
  eyebrow?: string;
  children: ReactNode;
  size?: "xl" | "l" | "1" | "2";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const sizeClass = {
    xl: "text-[40px] lg:text-[72px] leading-[1.05] tracking-[-0.01em]",
    l: "text-[32px] lg:text-[48px] leading-[1.1] tracking-[-0.01em]",
    "1": "text-[28px] lg:text-[36px] leading-[1.2]",
    "2": "text-[22px] lg:text-[28px] leading-[1.25]",
  }[size];

  return (
    <div className={className}>
      {eyebrow && (
        <p className="font-sans text-(length:--text-caption) tracking-[0.01em] uppercase text-(--color-text-muted) mb-2">
          {eyebrow}
        </p>
      )}
      <Component className={`font-display font-normal ${sizeClass} text-(--color-text-primary)`}>
        {children}
      </Component>
    </div>
  );
}
