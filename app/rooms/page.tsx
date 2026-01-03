"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
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
import { Badge } from "@/components/ui/Badge";
import { Loader } from "@/components/ui/Loader";
import { roomService } from "@/lib/room.service";
import { formatCurrency } from "@/lib/utils";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { Room, CreateRoomRequest } from "@/types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/api";

export default function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageInput, setImageInput] = useState("");
  const [amenityInput, setAmenityInput] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState<CreateRoomRequest>({
    title: "",
    description: "",
    pricePerNight: 0,
    maxGuests: 1,
    images: [],
    amenities: [],
    status: "available",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await roomService.getRooms();
      console.log("Rooms API response:", data);
      // Backend returns: { success, count, data: { rooms: [...] } } or { success, data: [...] }
      if (Array.isArray(data)) {
        setRooms(data);
      } else if (data?.data && Array.isArray(data.data)) {
        setRooms(data.data);
      } else if (data?.data?.rooms && Array.isArray(data.data.rooms)) {
        setRooms(data.data.rooms);
      } else {
        console.error("API returned non-array data:", data);
        setRooms([]);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to fetch rooms");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (room?: Room) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        title: room.title,
        description: room.description,
        pricePerNight: room.pricePerNight,
        maxGuests: room.maxGuests,
        images: room.images,
        amenities: room.amenities,
        status: room.status,
      });
    } else {
      setEditingRoom(null);
      setFormData({
        title: "",
        description: "",
        pricePerNight: 0,
        maxGuests: 1,
        images: [],
        amenities: [],
        status: "available",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
    setImageInput("");
    setAmenityInput("");
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageInput.trim()],
      });
      setImageInput("");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    setUploadingImage(true);

    try {
      // Upload to Cloudinary
      const cloudinaryCloudName =
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "YOUR_CLOUD_NAME";
      const cloudinaryUploadPreset =
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
        "YOUR_UPLOAD_PRESET";

      const formDataToUpload = new FormData();
      formDataToUpload.append("file", file);
      formDataToUpload.append("upload_preset", cloudinaryUploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: "POST",
          body: formDataToUpload,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      // Add the Cloudinary URL to images
      setFormData({
        ...formData,
        images: [...formData.images, data.secure_url],
      });

      toast.success("Image uploaded successfully");
      // Reset the input
      e.target.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        "Failed to upload image. Please check your Cloudinary configuration."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleAddAmenity = () => {
    if (amenityInput.trim()) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityInput.trim()],
      });
      setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingRoom) {
        await roomService.updateRoom(editingRoom.id, formData);
        toast.success("Room updated successfully");
      } else {
        await roomService.createRoom(formData);
        toast.success("Room created successfully");
      }
      handleCloseModal();
      fetchRooms();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      await roomService.deleteRoom(id);
      toast.success("Room deleted successfully");
      fetchRooms();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Rooms Management
            </h1>
            <Button
              variant="primary"
              onClick={() => handleOpenModal()}
              className="w-full sm:w-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Room
            </Button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Price/Night</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Max Guests
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Status
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">
                        {room.title}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(room.pricePerNight)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {room.maxGuests}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={
                            room.status === "available" ? "success" : "danger"
                          }
                        >
                          {room.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenModal(room)}
                            className="w-full sm:w-auto"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(room.id)}
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

              {rooms.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No rooms found</p>
                </div>
              )}
            </div>
          )}

          {/* Create/Edit Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={editingRoom ? "Edit Room" : "Add New Room"}
            size="lg"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Room Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />

              <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Price Per Night"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.pricePerNight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricePerNight: parseFloat(e.target.value),
                    })
                  }
                  required
                />

                <Input
                  label="Max Guests"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.maxGuests}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxGuests: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <Select
                label="Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "available" | "unavailable",
                  })
                }
                options={[
                  { value: "available", label: "Available" },
                  { value: "unavailable", label: "Unavailable" },
                ]}
              />

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images
                </label>

                {/* File Upload Button */}
                <div className="mb-3">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      disabled={uploadingImage}
                      onClick={(e) => {
                        e.preventDefault();
                        e.currentTarget.previousElementSibling?.dispatchEvent(
                          new MouseEvent("click")
                        );
                      }}
                    >
                      {uploadingImage ? "Uploading..." : "Upload Image"}
                    </Button>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Images will be uploaded to Cloudinary. Max file size: 10MB.
                  </p>
                </div>

                {/* URL Input (Alternative) */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-600 mb-2">
                    Or enter image URL:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleAddImage}
                      className="w-full sm:w-auto"
                    >
                      Add URL
                    </Button>
                  </div>
                </div>

                {/* Image Preview List */}
                <div className="space-y-2">
                  {formData.images.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200"
                    >
                      {/* Image Thumbnail */}
                      <img
                        src={image}
                        alt={`Room image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect fill='%23ddd' width='64' height='64'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='12'%3EInvalid%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <span className="flex-1 text-sm truncate text-gray-700">
                        {image.startsWith("data:") ? "Uploaded Image" : image}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <Input
                    placeholder="Enter amenity"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAddAmenity}
                    className="w-full sm:w-auto"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(index)}
                        className="hover:text-primary-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  isLoading={isSubmitting}
                >
                  {editingRoom ? "Update Room" : "Create Room"}
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
