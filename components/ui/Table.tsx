import React from "react";
import { cn } from "@/lib/utils";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <table className={cn("min-w-full divide-y divide-gray-200", className)}>
          {children}
        </table>
      </div>
    </div>
  );
};

export const TableHeader: React.FC<TableProps> = ({ children, className }) => {
  return <thead className={cn("bg-gray-50", className)}>{children}</thead>;
};

export const TableBody: React.FC<TableProps> = ({ children, className }) => {
  return (
    <tbody className={cn("bg-white divide-y divide-gray-200", className)}>
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<TableProps> = ({ children, className }) => {
  return (
    <tr className={cn("hover:bg-gray-50 transition-colors", className)}>
      {children}
    </tr>
  );
};

export const TableHead: React.FC<TableProps> = ({ children, className }) => {
  return (
    <th
      className={cn(
        "px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
        className
      )}
    >
      {children}
    </th>
  );
};

export const TableCell: React.FC<TableProps> = ({ children, className }) => {
  return (
    <td
      className={cn(
        "px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm text-gray-900",
        className
      )}
    >
      {children}
    </td>
  );
};
