"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { StatusBadge } from "@/components/features/StatusBadge";
import { Loader } from "@/components/ui/Loader";
import { bookingService } from "@/lib/booking.service";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Eye, Filter, Trash2 } from "lucide-react";
import type { Booking } from "@/types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    status: "" as "" | "pending" | "confirmed" | "cancelled",
  });

  useEffect(() => {
    fetchBookings();
  }, [currentPage, filters]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: 20,
      };
      if (filters.status) params.status = filters.status;

      const data = await bookingService.getBookings(params);
      console.log("Bookings API response:", data);

      // Handle different response structures
      if (Array.isArray(data)) {
        setBookings(data);
        setTotalPages(1);
      } else if (typeof data === 'object' && data !== null) {
        const response = data as any;
        if (response.data && Array.isArray(response.data)) {
          setBookings(response.data);
          setTotalPages(response.pagination?.pages || 1);
        } else if (response.data?.bookings && Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
          setTotalPages(response.pagination?.pages || 1);
        } else {
          console.error("API returned non-array data:", data);
          setBookings([]);
          setTotalPages(1);
        }
      } else {
        console.error("API returned unexpected data:", data);
        setBookings([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) => {
    try {
      await bookingService.updateBookingStatus(id, { status });
      toast.success("Booking status updated");
      fetchBookings();
      if (selectedBooking?.id === id) {
        setSelectedBooking({ ...selectedBooking, status });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      await bookingService.deleteBooking(id);
      toast.success("Booking deleted successfully");
      fetchBookings();
      if (selectedBooking?.id === id) {
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Bookings Management
            </h1>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600 hidden sm:block" />
              <Select
                value={filters.status}
                onChange={(e) => {
                  setFilters({ ...filters, status: e.target.value as any });
                  setCurrentPage(1);
                }}
                options={[
                  { value: "", label: "All Statuses" },
                  { value: "pending", label: "Pending" },
                  { value: "confirmed", label: "Confirmed" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
                className="flex-1 sm:flex-initial"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilters({ status: "" });
                  setCurrentPage(1);
                }}
                className="w-full sm:w-auto"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden lg:table-cell">
                        Booking ID
                      </TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Room
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Check-in
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Check-out
                      </TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell className="font-mono text-xs hidden lg:table-cell break-all max-w-[120px]">
                          {booking._id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.guestName}</p>
                            <p className="text-xs text-gray-600">
                              {booking.guestEmail}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {booking.room.title}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {formatDate(booking.checkInDate)}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {formatDate(booking.checkOutDate)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(booking.totalPrice)}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={booking.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(booking)}
                              className="w-full sm:w-auto"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(booking._id)}
                              className="w-full sm:w-auto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {bookings.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No bookings found</p>
                  </div>
                )}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}

          {/* Booking Details Modal */}
          {selectedBooking && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Booking Details"
              size="lg"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Booking ID</p>
                    <p className="font-mono font-medium text-xs sm:text-sm break-all">
                      {selectedBooking._id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <StatusBadge status={selectedBooking.status} />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Guest Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{selectedBooking.guestName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">
                        {selectedBooking.guestEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">
                        {selectedBooking.guestPhone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Booking Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Room</p>
                      <p className="font-medium">
                        {selectedBooking.room.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Price</p>
                      <p className="font-medium text-primary-900">
                        {formatCurrency(selectedBooking.totalPrice)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Check-in</p>
                      <p className="font-medium">
                        {formatDate(selectedBooking.checkInDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Check-out</p>
                      <p className="font-medium">
                        {formatDate(selectedBooking.checkOutDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Created</p>
                      <p className="font-medium">
                        {formatDate(selectedBooking.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Update Status
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant={
                        selectedBooking.status === "pending"
                          ? "primary"
                          : "secondary"
                      }
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(selectedBooking.id, "pending")
                      }
                    >
                      Pending
                    </Button>
                    <Button
                      variant={
                        selectedBooking.status === "confirmed"
                          ? "primary"
                          : "secondary"
                      }
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(selectedBooking.id, "confirmed")
                      }
                    >
                      Confirmed
                    </Button>
                    <Button
                      variant={
                        selectedBooking.status === "cancelled"
                          ? "danger"
                          : "secondary"
                      }
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(selectedBooking.id, "cancelled")
                      }
                    >
                      Cancelled
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
