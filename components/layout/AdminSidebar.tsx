"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bed,
  Calendar,
  Hotel as HotelIcon,
  Users,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => pathname === path;

  const getAdminLinks = () => {
    const links = [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/rooms", label: "Rooms", icon: Bed },
      { href: "/bookings", label: "Bookings", icon: Calendar },
      { href: "/hotel", label: "Hotel Settings", icon: HotelIcon },
    ];

    if (user?.role === "superadmin") {
      links.push({
        href: "/users",
        label: "Admin Users",
        icon: Users,
      });
    }

    return links;
  };

  const adminLinks = getAdminLinks();

  return (
    <aside className="w-64 bg-primary-900 text-white min-h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <HotelIcon className="w-8 h-8 text-accent-400" />
          <span className="text-xl font-bold">CedarFields</span>
        </div>

        <nav className="space-y-2">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-accent-700 text-white shadow-md"
                    : "text-neutral-300 hover:bg-primary-800 hover:text-white hover:translate-x-1"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info */}
      {user && (
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-primary-800">
          <div className="mb-4">
            <p className="text-sm text-neutral-300">Logged in as</p>
            <p className="text-sm font-medium truncate">{user.email}</p>
            <p className="text-xs text-accent-400 uppercase mt-1">
              {user.role}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
