import api from "./api";
import type {
  User,
  CreateAdminRequest,
  UpdateAdminStatusRequest,
} from "@/types";

export const superadminService = {
  // Create new admin
  createAdmin: async (data: CreateAdminRequest): Promise<User> => {
    const response = await api.post("/superadmin/create-admin", data);
    return response.data;
  },

  // Get all admins
  getAdmins: async (): Promise<User[]> => {
    const response = await api.get("/superadmin/admins");
    return response.data;
  },

  // Update admin status
  updateAdminStatus: async (
    id: string,
    data: UpdateAdminStatusRequest
  ): Promise<User> => {
    const response = await api.patch(`/superadmin/admin/${id}/status`, data);
    return response.data;
  },

  // Delete admin
  deleteAdmin: async (id: string): Promise<void> => {
    await api.delete(`/superadmin/admin/${id}`);
  },
};
