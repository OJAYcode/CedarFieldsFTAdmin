import React from "react";
import { Badge } from "../ui/Badge";
import type { Booking } from "@/types";

interface StatusBadgeProps {
  status: Booking["status"];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const variants = {
    pending: "warning" as const,
    confirmed: "success" as const,
    cancelled: "danger" as const,
  };

  const labels = {
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
  };

  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};
