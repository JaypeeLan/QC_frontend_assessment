import React from "react";

type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#005EA2] text-white border border-[#E5E7EB] hover:bg-[#004e8a] active:bg-[#003e6d] focus-visible:ring-[var(--color-primary-300)]",
  secondary:
    "bg-[var(--color-text-100)] text-[var(--color-text-800)] hover:bg-[var(--color-text-200)] active:bg-[var(--color-text-300)] focus-visible:ring-[var(--color-text-300)]",
  destructive:
    "bg-[var(--color-error-500)] text-white hover:bg-[var(--color-error-600)] active:bg-[var(--color-error-700)] focus-visible:ring-[var(--color-error-300)]",
  ghost:
    "bg-transparent text-[var(--color-text-700)] hover:bg-[var(--color-text-100)] active:bg-[var(--color-text-200)] focus-visible:ring-[var(--color-text-300)]",
  outline:
    "bg-white border border-[#D1D5DB] text-[#374151] hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-[var(--color-primary-300)] font-bold",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 rounded-[var(--radius-6)] gap-1.5 text-[13px]",
  md: "px-4 py-2.5 rounded-[var(--radius-8)] gap-2",
  lg: "px-6 py-3 rounded-[var(--radius-12)] gap-2.5 text-[18px]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={[
          // base
          "inline-flex items-center justify-center font-semibold",
          "transition-colors duration-150 ease-in-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "cursor-pointer select-none",
          // variant
          variantClasses[variant],
          // size
          sizeClasses[size],
          // width
          fullWidth ? "w-full" : "",
          // disabled
          isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
