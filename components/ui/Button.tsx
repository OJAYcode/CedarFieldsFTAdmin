import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium tracking-wider uppercase text-xs transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

  const variants = {
    primary:
      "bg-primary-900 hover:bg-accent-800 text-white border border-primary-900 hover:border-accent-800 hover:shadow-lg hover:-translate-y-0.5",
    secondary:
      "bg-white hover:bg-accent-50 text-primary-900 border border-primary-900 hover:border-accent-700 hover:shadow-md hover:-translate-y-0.5",
    danger:
      "bg-red-600 hover:bg-red-700 text-white border border-red-600 hover:shadow-lg hover:-translate-y-0.5",
    ghost: "bg-transparent hover:bg-accent-50 text-primary-800 border-none",
    outline:
      "bg-transparent border border-primary-300 text-primary-800 hover:bg-neutral-50 hover:border-accent-600",
  };

  const sizes = {
    sm: "px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5",
    md: "px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3",
    lg: "px-6 sm:px-8 lg:px-10 py-3 sm:py-4",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};
