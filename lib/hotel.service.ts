import api from "./api";
import type { Hotel } from "@/types";

export const hotelService = {
  // Get hotel information
  getHotel: async (): Promise<Hotel> => {
    const response = await api.get("/hotel");
    return response.data;
  },

  // Create hotel information (Admin only)
  createHotel: async (data: Partial<Hotel>): Promise<Hotel> => {
    const response = await api.post("/hotel", data);
    return response.data;
  },

  // Update hotel information (Admin only)
  updateHotel: async (data: Partial<Hotel>): Promise<Hotel> => {
    const response = await api.put("/hotel", data);
    return response.data;
  },
};
