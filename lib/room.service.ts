import api from "./api";
import type { Room, CreateRoomRequest, AvailabilityResponse } from "@/types";

export const roomService = {
  // Get all rooms with optional filters
  getRooms: async (params?: {
    status?: "available" | "unavailable";
    minPrice?: number;
    maxPrice?: number;
    maxGuests?: number;
  }): Promise<Room[]> => {
    const response = await api.get("/rooms", { params });
    return response.data;
  },

  // Get single room
  getRoom: async (id: string): Promise<Room> => {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  },

  // Check room availability
  checkAvailability: async (
    id: string,
    checkIn: string,
    checkOut: string
  ): Promise<AvailabilityResponse> => {
    const response = await api.get(`/rooms/${id}/availability`, {
      params: { checkIn, checkOut },
    });
    return response.data;
  },

  // Create room (Admin only)
  createRoom: async (data: CreateRoomRequest): Promise<Room> => {
    const response = await api.post("/rooms", data);
    return response.data;
  },

  // Update room (Admin only)
  updateRoom: async (
    id: string,
    data: Partial<CreateRoomRequest>
  ): Promise<Room> => {
    const response = await api.put(`/rooms/${id}`, data);
    return response.data;
  },

  // Delete room (Admin only)
  deleteRoom: async (id: string): Promise<void> => {
    await api.delete(`/rooms/${id}`);
  },
};
