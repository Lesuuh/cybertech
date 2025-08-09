export type ProductCardProps = {
  id: number;
  imageSrc: string;
  name: string;
  price: number;
  discount?: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  onBuy: () => void;
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
  discount: number; // percentage discount, e.g. 10 means 10%
  isNewArrival: boolean;
  isFeatured: boolean;
  stock: number; // inventory count
  description?: string; // optional detailed description
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
