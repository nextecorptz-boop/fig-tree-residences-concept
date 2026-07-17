import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  className?: string;
};

const VARIANT_CLASSES: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-(--color-surface-dusk) text-(--color-text-inverse) hover:bg-(--color-accent-primary) rounded-(--radius-sm) px-6 py-3",
  secondary:
    "border border-(--color-border-hairline) text-(--color-text-primary) hover:border-(--color-accent-primary) rounded-(--radius-sm) px-6 py-3",
  text: "text-(--color-text-primary) underline-offset-4 hover:underline decoration-(--color-accent-primary)",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 text-(length:--text-nav) font-medium transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] min-h-11 min-w-11";

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  ...rest
}: BaseProps & { href?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
