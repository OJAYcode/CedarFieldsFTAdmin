import api from "./api";
import type {
  Booking,
  CreateBookingRequest,
  UpdateBookingStatusRequest,
  PaginatedResponse,
} from "@/types";

export const bookingService = {
  // Create booking (Public)
  createBooking: async (data: CreateBookingRequest): Promise<Booking> => {
    const response = await api.post("/bookings", data);
    return response.data;
  },

  // Guest lookup booking
  lookupBooking: async (email: string, bookingId: string): Promise<Booking> => {
    const response = await api.get("/bookings/lookup", {
      params: { email, bookingId },
    });
    return response.data;
  },

  // Get all bookings (Admin only)
  getBookings: async (params?: {
    status?: "pending" | "confirmed" | "cancelled";
    room?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Booking>> => {
    const response = await api.get("/bookings", { params });
    return response.data;
  },

  // Get single booking (Admin only)
  getBooking: async (id: string): Promise<Booking> => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  // Update booking status (Admin only)
  updateBookingStatus: async (
    id: string,
    data: UpdateBookingStatusRequest
  ): Promise<Booking> => {
    const response = await api.patch(`/bookings/${id}/status`, data);
    return response.data;
  },

  // Delete booking (Admin only)
  deleteBooking: async (id: string): Promise<void> => {
    await api.delete(`/bookings/${id}`);
  },
};
