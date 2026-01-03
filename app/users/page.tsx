"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Loader } from "@/components/ui/Loader";
import { superadminService } from "@/lib/superadmin.service";
import { formatDate } from "@/lib/utils";
import { Plus, Trash2, Lock, Unlock } from "lucide-react";
import type { User } from "@/types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await superadminService.getAdmins();
      console.log("Users API response:", data);
      // Ensure data is an array
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data?.data && Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        console.error("API returned non-array data:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({ email: "", password: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await superadminService.createAdmin(formData);
      toast.success("Admin created successfully");
      handleCloseModal();
      fetchUsers();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (
    id: string,
    currentStatus: "active" | "suspended"
  ) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      await superadminService.updateAdminStatus(id, { status: newStatus });
      toast.success(
        `Admin ${
          newStatus === "active" ? "activated" : "suspended"
        } successfully`
      );
      fetchUsers();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;

    try {
      await superadminService.deleteAdmin(id);
      toast.success("Admin deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <ProtectedRoute requireSuperAdmin>
      <AdminLayout>
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Admin Users Management
            </h1>
            <Button
              variant="primary"
              onClick={handleOpenModal}
              className="w-full sm:w-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Admin
            </Button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.email}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          variant={
                            user.role === "superadmin" ? "info" : "default"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "active" ? "success" : "danger"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          {user.role !== "superadmin" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleToggleStatus(user.id, user.status)
                                }
                                title={
                                  user.status === "active"
                                    ? "Suspend"
                                    : "Activate"
                                }
                                className="w-full sm:w-auto"
                              >
                                {user.status === "active" ? (
                                  <Lock className="w-4 h-4" />
                                ) : (
                                  <Unlock className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(user.id)}
                                className="w-full sm:w-auto"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {users.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No admin users found</p>
                </div>
              )}
            </div>
          )}

          {/* Create Admin Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Create New Admin"
            size="md"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Min 8 characters, include uppercase, lowercase, and number"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                helperText="Must contain at least 8 characters with uppercase, lowercase, and number"
                required
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  isLoading={isSubmitting}
                >
                  Create Admin
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Modal>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
