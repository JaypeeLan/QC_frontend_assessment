import React from "react";

/* ── Heading components ─────────────────────────────────────────── */

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H1({ children, className = "", ...props }: HeadingProps) {
  return (
    <h1
      className={[
        "font-bold text-[length:var(--text-h1)] leading-[var(--text-h1--line-height)]",
        "font-[var(--font-family-sans)] text-[var(--color-text-900)]",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className = "", ...props }: HeadingProps) {
  return (
    <h2
      className={[
        "font-bold text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)]",
        "font-[var(--font-family-sans)] text-[var(--color-text-900)]",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className = "", ...props }: HeadingProps) {
  return (
    <h3
      className={[
        "font-semibold text-[length:var(--text-h3)] leading-[var(--text-h3--line-height)]",
        "font-[var(--font-family-sans)] text-[var(--color-text-900)]",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className = "", ...props }: HeadingProps) {
  return (
    <h4
      className={[
        "font-semibold text-[length:var(--text-h4)] leading-[var(--text-h4--line-height)]",
        "font-[var(--font-family-sans)] text-[var(--color-text-900)]",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </h4>
  );
}

export function H5({ children, className = "", ...props }: HeadingProps) {
  return (
    <h5
      className={[
        "font-semibold text-[length:var(--text-h5)] leading-[var(--text-h5--line-height)]",
        "font-[var(--font-family-sans)] text-[var(--color-text-900)]",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </h5>
  );
}

/* ── Paragraph / body text ─────────────────────────────────────── */

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: "paragraph" | "small";
  muted?: boolean;
}

export function Text({
  children,
  size = "paragraph",
  muted = false,
  className = "",
  ...props
}: TextProps) {
  const sizeClass =
    size === "small"
      ? "text-[length:var(--text-small)] leading-[var(--text-small--line-height)]"
      : "text-[length:var(--text-paragraph)] leading-[var(--text-paragraph--line-height)]";
  const colorClass = muted
    ? "text-[var(--color-text-500)]"
    : "text-[var(--color-text-900)]";

  return (
    <p
      className={["font-[var(--font-family-sans)]", sizeClass, colorClass, className].join(" ")}
      {...props}
    >
      {children}
    </p>
  );
}
