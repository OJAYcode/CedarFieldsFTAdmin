"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { StatsCard } from "@/components/features/StatsCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { StatusBadge } from "@/components/features/StatusBadge";
import { Loader } from "@/components/ui/Loader";
import { adminService } from "@/lib/admin.service";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Bed, Calendar, DollarSign, CheckCircle } from "lucide-react";
import type { DashboardStats } from "@/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Dashboard
          </h1>

          {loading ? (
            <Loader />
          ) : stats ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <StatsCard
                  title="Total Rooms"
                  value={stats.totalRooms}
                  icon={Bed}
                  color="primary"
                  subtitle={`${stats.availableRooms} available`}
                />
                <StatsCard
                  title="Total Bookings"
                  value={stats.totalBookings}
                  icon={Calendar}
                  color="success"
                  subtitle={`${stats.confirmedBookings} confirmed`}
                />
                <StatsCard
                  title="Pending Bookings"
                  value={stats.pendingBookings}
                  icon={CheckCircle}
                  color="warning"
                />
                <StatsCard
                  title="Total Revenue"
                  value={formatCurrency(stats.totalRevenue)}
                  icon={DollarSign}
                  color="success"
                />
              </div>

              {/* Recent Bookings */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Recent Bookings
                </h2>
                {stats.recentBookings && stats.recentBookings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden sm:table-cell">
                          Booking ID
                        </TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Room
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Check-in
                        </TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stats.recentBookings.slice(0, 5).map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-mono text-xs hidden sm:table-cell break-all max-w-[120px]">
                            {booking._id || booking.id}
                          </TableCell>
                          <TableCell>{booking.guestName}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {booking.room.title}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {formatDate(booking.checkIn)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(booking.totalPrice)}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={booking.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-gray-600">No recent bookings</p>
                )}
              </div>

              {/* Monthly Revenue */}
              {stats.monthlyRevenue && stats.monthlyRevenue.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                    Monthly Revenue
                  </h2>
                  <div className="space-y-3">
                    {stats.monthlyRevenue.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium text-gray-900">
                          {item.month}
                        </span>
                        <span className="text-primary-900 font-semibold">
                          {formatCurrency(item.revenue)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-600">Failed to load dashboard data</p>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
