import { Product } from "@/app/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//truncate text
export function truncateText(text: string, maxLenght: number) {
  if (text.length <= maxLenght) return text;

  const truncatedText = text.slice(0, maxLenght);
  const lastSpaceIndex = truncatedText.lastIndexOf(" ");

  if (lastSpaceIndex === -1) {
    return truncatedText + "...";
  }

  return truncatedText.slice(0, maxLenght) + "...";
}

// get discounted price
export function getDiscountedPrice(product: Product) {
  if (product.discount && product.discount > 0) {
    return (product.price * (100 - product.discount)) / 100;
  }
  return product.price;
}

