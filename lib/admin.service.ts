import api from "./api";
import type { DashboardStats } from "@/types";

export const adminService = {
  // Get basic dashboard
  getDashboard: async (): Promise<any> => {
    const response = await api.get("/admin/dashboard");
    return response.data;
  },

  // Get comprehensive statistics
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get("/admin/stats");
    return response.data;
  },
};
