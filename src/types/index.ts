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
  area?: string; // Adding the missing 'area' property
}
