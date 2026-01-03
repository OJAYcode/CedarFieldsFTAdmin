"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Loader } from "@/components/ui/Loader";
import { hotelService } from "@/lib/hotel.service";
import { X } from "lucide-react";
import type { Hotel } from "@/types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/api";

export default function AdminHotel() {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amenityInput, setAmenityInput] = useState("");
  const [policyInput, setPolicyInput] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
    checkInTime: "",
    checkOutTime: "",
    policies: [] as string[],
    amenities: [] as string[],
  });

  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    try {
      const data = await hotelService.getHotel();
      setHotel(data);
      setFormData({
        name: data.name,
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        phone: data.phone,
        email: data.email,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        policies: data.policies,
        amenities: data.amenities,
      });
    } catch (error) {
      console.error("Error fetching hotel:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAmenity = () => {
    if (amenityInput.trim() && formData.amenities) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityInput.trim()],
      });
      setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (index: number) => {
    if (formData.amenities) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((_, i) => i !== index),
      });
    }
  };

  const handleAddPolicy = () => {
    if (policyInput.trim() && formData.policies) {
      setFormData({
        ...formData,
        policies: [...formData.policies, policyInput.trim()],
      });
      setPolicyInput("");
    }
  };

  const handleRemovePolicy = (index: number) => {
    if (formData.policies) {
      setFormData({
        ...formData,
        policies: formData.policies.filter((_, i) => i !== index),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (hotel) {
        await hotelService.updateHotel(formData);
        toast.success("Hotel information updated successfully");
      } else {
        await hotelService.createHotel(formData);
        toast.success("Hotel information created successfully");
      }
      fetchHotel();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <Loader />
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Hotel Settings
          </h1>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Hotel Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
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
                </div>
              </div>

              {/* Address */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Input
                      label="Street Address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="State/Province"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="ZIP/Postal Code"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Check-in/Check-out Times */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Check-in/Check-out Times
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Check-in Time"
                    type="time"
                    value={formData.checkInTime}
                    onChange={(e) =>
                      setFormData({ ...formData, checkInTime: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Check-out Time"
                    type="time"
                    value={formData.checkOutTime}
                    onChange={(e) =>
                      setFormData({ ...formData, checkOutTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Amenities
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
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
                  {formData.amenities &&
                    formData.amenities.map((amenity, index) => (
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

              {/* Policies */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Policies
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <Input
                    placeholder="Enter policy"
                    value={policyInput}
                    onChange={(e) => setPolicyInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAddPolicy}
                    className="w-full sm:w-auto"
                  >
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.policies &&
                    formData.policies.map((policy, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 bg-gray-50 rounded"
                      >
                        <span className="flex-1 text-sm">{policy}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePolicy(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
