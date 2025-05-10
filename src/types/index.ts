
// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member";
  avatar?: string;
  membershipType?: string;
  phone?: string;
  createdAt: string;
}

// Facility types
export interface Facility {
  id: string;
  name: string;
  type: "court" | "pool" | "gym" | "salon" | "other";
  description: string;
  image: string;
  capacity: number;
  pricePerHour: number;
  isAvailable: boolean;
}

// Reservation types
export interface Reservation {
  id: string;
  facilityId: string;
  userId: string;
  date: string; // ISO string
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  status: "pending" | "confirmed" | "canceled";
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  facility?: Facility;
  user?: User;
}

// Event types
export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  facilityId: string;
  date: string; // ISO string
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  capacity: number;
  registeredCount: number;
  imageUrl?: string;
  facility?: Facility;
}
