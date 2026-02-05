export type ProductCardProps = {
  id: number;
  imageSrc: string;
  name: string;
  price: number;
  discount?: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  // onBuy: () => void;
  onSave: () => void;
  save: boolean;
};

// Single product type
export interface Product {
  id: number;
  categoryId: number;
  imageSrc: string;
  name: string;
  price: number;
  discount?: number;
  isNewArrival: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  stock: number;
  description: string;

  // Optional enriched fields:
  deliveryDays?: number;
  warrantyYears?: number; // warranty period in years
  cpuCores?: number | null;
  batteryCapacity?: string | null;
  screenSize?: number | null; // inches
  memorySpace?: string | null; // RAM + storage info
  cameraFront?: string | null;
  cameraBack?: string | null;
  microphone?: string | null;
  connectivity?: string | null;
  noiseCancellation?: string | null;
  frequencyResponse?: string | null;
  ports?: string | null;
  network?: string | null;
  sensors?: string[] | null;
  screenResolution?: string | null;
  screenRefreshRate?: string | number | null;
  screenType?: string | null;
  pixelDensity?: number | null;
  waterResistance?: string | null;
  controllersIncluded?: number | null;
  operatingSystem?: string | null;
  storageSpace?: string | null;
  relatedProducts?: number[]; // array of related product IDs
  details?: string[]; // array of additional details/specifications
}

// Category type
export interface Category {
  id: number;
  name: string;
  slug: string; // url-friendly string
}

// User type (basic)
export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Order item inside an order
export interface OrderItem {
  productId: number;
  quantity: number;
}

// Order type
export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalPrice: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string; // ISO date string
}

// Review type
export interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: number; // 1 to 5
  comment?: string;
  createdAt: string; // ISO date string
}

// Cart type (can be per user or guest)
export interface Cart {
  userId: number;
  items: OrderItem[];
}

// 🧩 Address type
export interface Address {
  id: string; // unique address ID (e.g., UUID or short ID)
  label: string; // e.g., "Home", "Office"
  street: string;
  city: string;
  state: string;
}

// 👤 Profile type
export interface Profile {
  id: string; // UUID from auth.users
  created_at: string; // ISO timestamp
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: number | null;
  agree_to_terms: boolean | null;
  newsletter: boolean | null;
  addresses: Address[]; // JSONB array
}

// 🏪 Zustand store interface
export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
}
