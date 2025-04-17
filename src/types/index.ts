
export interface Property {
  id: string;
  title: string;
  description: string;
  type: "FLAT" | "PG" | "HOSTEL";
  location: PropertyLocation;
  price: number;
  images: { url: string }[];
  amenities: string[];
  isActive: boolean;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Property-specific fields
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  furnishingType?: "FULLY_FURNISHED" | "SEMI_FURNISHED" | "UNFURNISHED";
  
  // PG/Hostel-specific fields
  gender?: "MALE" | "FEMALE" | "UNISEX";
  totalBeds?: number;
  
  // Common optional fields
  ratings?: number;
  numReviews?: number;
  rules?: string[];
  securityDeposit?: number;
  availableFrom?: Date;
}

export interface PropertyLocation {
  street?: string;
  city: string;
  state?: string;
  country?: string;
  zipCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  area?: string;
  address?: string;
  pincode?: string;
}

export type PropertyType = "FLAT" | "PG" | "HOSTEL";

export type Amenity = 
  | "WiFi" 
  | "AC" 
  | "Parking" 
  | "Laundry" 
  | "TV" 
  | "Fridge" 
  | "Kitchen" 
  | "Security" 
  | "Gym" 
  | "Swimming Pool" 
  | "Power Backup" 
  | "Study Table" 
  | "Lift" 
  | "CCTV" 
  | "Food" 
  | "Cleaning";
