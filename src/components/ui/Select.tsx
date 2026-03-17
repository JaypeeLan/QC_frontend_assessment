import { Icon } from "./Icon";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label?: string;
  options: SelectOption[];
}

export function Select({ id, label, options, className = "", ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-[length:var(--text-small)] leading-[var(--text-small--line-height)] font-semibold text-[var(--color-text-700)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={[
            "w-full px-3 py-2.5 rounded-[var(--radius-8)] appearance-none",
            "border border-[var(--color-text-300)] text-[length:var(--text-paragraph)] leading-[var(--text-paragraph--line-height)]",
            "bg-white text-[var(--color-text-900)]",
            "transition-colors duration-150 ease-in-out",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)] focus:border-[var(--color-primary-500)]",
            className,
          ].join(" ")}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-400)]">
          <Icon name="arrow-down" className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
