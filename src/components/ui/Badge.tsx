import React from "react";

type BadgeVariant = "primary" | "error" | "success" | "warning" | "info" | "neutral";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary:
    "bg-[var(--color-primary-100)] text-[var(--color-primary-700)] border border-[var(--color-primary-200)]",
  error:
    "bg-[var(--color-error-100)] text-[var(--color-error-700)] border border-[var(--color-error-200)]",
  success:
    "bg-[var(--color-success-100)] text-[var(--color-success-700)] border border-[var(--color-success-200)]",
  warning:
    "bg-[var(--color-warning-100)] text-[var(--color-warning-700)] border border-[var(--color-warning-200)]",
  info:
    "bg-[var(--color-info-100)] text-[var(--color-info-700)] border border-[var(--color-info-200)]",
  neutral:
    "bg-[var(--color-text-100)] text-[var(--color-text-700)] border border-[var(--color-text-200)]",
};

export function Badge({ variant = "neutral", children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5",
        "rounded-[var(--radius-full)]",
        "text-[length:var(--text-small)] leading-[var(--text-small--line-height)] font-semibold",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
