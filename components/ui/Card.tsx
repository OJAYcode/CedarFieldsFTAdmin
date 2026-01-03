import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      className={cn(
        "bg-white border border-neutral-200 hover:border-accent-200 shadow-soft hover:shadow-card transition-all duration-300",
        hoverable &&
          "transition-all duration-500 hover:shadow-card cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
