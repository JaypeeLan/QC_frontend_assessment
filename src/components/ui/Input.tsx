import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  id: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 w-full relative ${error ? 'pb-5' : ''}`}>
        {label && (
          <label
            htmlFor={id}
            className="text-[length:var(--text-small)] leading-[var(--text-small--line-height)] font-semibold text-[var(--color-text-700)]"
          >
            {label}
            {props.required && (
              <span className="text-[var(--color-error-500)] ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={[
            "w-full px-3 py-2.5 rounded-[var(--radius-8)]",
            "border text-[length:var(--text-paragraph)] leading-[var(--text-paragraph--line-height)]",
            "bg-white text-[var(--color-text-900)] placeholder:text-[var(--color-text-400)]",
            "transition-colors duration-150 ease-in-out",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            error
              ? "border-[var(--color-error-500)] focus:ring-[var(--color-error-300)] focus:border-[var(--color-error-500)]"
              : "border-[var(--color-text-300)] focus:ring-[var(--color-primary-300)] focus:border-[var(--color-primary-500)]",
            props.disabled ? "opacity-50 cursor-not-allowed bg-[var(--color-text-100)]" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="absolute -bottom-0.5 left-0 text-[length:var(--text-small)] leading-[var(--text-small--line-height)] text-[var(--color-error-600)]"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={`${id}-hint`}
            className="text-[length:var(--text-small)] leading-[var(--text-small--line-height)] text-[var(--color-text-500)]"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
