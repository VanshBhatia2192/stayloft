
// Property Types
export type PropertyType = "FLAT" | "PG" | "HOSTEL";

export type Amenity = 
  | "WIFI" 
  | "AC" 
  | "FURNISHED" 
  | "GEYSER" 
  | "TV" 
  | "FRIDGE" 
  | "WASHING_MACHINE" 
  | "POWER_BACKUP" 
  | "PARKING" 
  | "SECURITY" 
  | "CCTV" 
  | "LIFT"
  | "FOOD" 
  | "CLEANING"
  | "ATTACHED_BATHROOM"
  | "GYM";

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyImage {
  id: string;
  url: string;
  isMain: boolean;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  securityDeposit?: number;
  location: PropertyLocation;
  amenities: Amenity[];
  images: PropertyImage[];
  rules?: string[];
  bedrooms?: number; // More relevant for flats
  bathrooms?: number;
  totalBeds?: number; // More relevant for PGs and hostels
  area?: number; // in sq. ft, more relevant for flats
  furnishingType?: "FULLY_FURNISHED" | "SEMI_FURNISHED" | "UNFURNISHED";
  availableFrom: Date;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  isActive: boolean;
  gender?: "MALE" | "FEMALE" | "UNISEX"; // For PGs and hostels
  ratings?: number;
  numReviews?: number;
}

// User Types
export type UserRole = "TENANT" | "OWNER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Booking Types
export type BookingStatus = 
  | "PENDING" 
  | "CONFIRMED" 
  | "CANCELLED" 
  | "COMPLETED"
  | "REJECTED";

export interface Booking {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: Date;
  endDate?: Date; // Optional for indefinite stays
  status: BookingStatus;
  totalAmount: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}
