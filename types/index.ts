export interface User {
  id: string;
  email: string;
  role: "superadmin" | "admin";
  status: "active" | "suspended";
  createdAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  checkInTime: string;
  checkOutTime: string;
  policies: string[];
  amenities: string[];
}

export interface Room {
  id: string;
  title: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  images: string[];
  amenities: string[];
  status: "available" | "unavailable";
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  bookingId: string;
  room: Room;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalRooms: number;
  availableRooms: number;
  unavailableRooms: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];
  recentBookings: Booking[];
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AvailabilityResponse {
  available: boolean;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateAdminRequest {
  email: string;
  password: string;
}

export interface CreateRoomRequest {
  title: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  images: string[];
  amenities: string[];
  status: "available" | "unavailable";
}

export interface CreateBookingRequest {
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}

export interface UpdateBookingStatusRequest {
  status: "pending" | "confirmed" | "cancelled";
}

export interface UpdateAdminStatusRequest {
  status: "active" | "suspended";
}
