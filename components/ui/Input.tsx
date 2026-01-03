import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-medium text-primary-700 mb-2 uppercase tracking-wider">
            {label}
            {props.required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-accent-600 transition-all duration-300 bg-white",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-neutral-300 hover:border-accent-300",
            props.disabled && "bg-neutral-50 cursor-not-allowed opacity-60",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
