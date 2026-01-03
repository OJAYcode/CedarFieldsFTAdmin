import api from "./api";
import type { User, LoginRequest } from "@/types";

export const authService = {
  // Login
  login: async (data: LoginRequest): Promise<User> => {
    const response = await api.post("/auth/login", data);
    console.log("Login API response:", response);
    // Backend returns: { success, message, data: { user: {...} } }
    return response.data.data.user;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  // Get current user
  me: async (): Promise<User> => {
    const response = await api.get("/auth/me");
    console.log("Me API response:", response);
    // Backend returns: { success, message, data: { user: {...} } }
    return response.data.data.user;
  },
};
