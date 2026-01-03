import React from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "../ui/Card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "primary" | "success" | "warning" | "danger";
  subtitle?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color = "primary",
  subtitle,
}) => {
  const colors = {
    primary: "bg-primary-100 text-primary-900",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
    danger: "bg-red-100 text-red-600",
  };

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className={`p-2 sm:p-3 rounded-lg ${colors[color]}`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          {value}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm">{title}</p>
        {subtitle && <p className="text-gray-500 text-xs mt-2">{subtitle}</p>}
      </div>
    </Card>
  );
};
