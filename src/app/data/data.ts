export const products = [
  {
    id: 1,
    categoryId: 1,
    imageSrc: "/images/apple_headphones-2.png",
    name: "Apple AirPods Max",
    price: 549.0,
    discount: 10, // 10% off
    isNewArrival: false,
    isFeatured: true,
    isBestSeller: true,
    stock: 25,
    description:
      "High-fidelity audio and active noise cancellation with spatial audio support.",
  },
  {
    id: 2,
    categoryId: 2,
    imageSrc: "/images/MacBook Pro.png",
    name: 'MacBook Pro 14"',
    price: 1999.0,
    discount: 0,
    isNewArrival: true,
    isFeatured: true,
    isBestSeller: true,
    stock: 10,
    description:
      "Powerful M2 Pro chip with brilliant Liquid Retina XDR display.",
  },
  {
    id: 3,
    categoryId: 3,
    imageSrc: "/images/PlayStation(1).png",
    name: "PlayStation 5",
    price: 499.0,
    discount: 5,
    isNewArrival: false,
    isFeatured: false,
    isBestSeller: true,
    stock: 0, // sold out
    description:
      "Next-gen gaming console with immersive 3D audio and ray tracing.",
  },
  {
    id: 4,
    categoryId: 4,
    imageSrc: "/images/galaxy-watch-6.png",
    name: "Samsung Galaxy Watch 6",
    price: 99.0,
    discount: 0,
    isNewArrival: true,
    isFeatured: false,
    isBestSeller: false,
    stock: 30,
    description:
      "Smartwatch with fitness tracking, AMOLED display, and long battery life.",
  },
  {
    id: 5,
    categoryId: 1,
    imageSrc: "/images/earbuds.png",
    name: "Galaxy Buds FE Graphite",
    price: 79.0,
    discount: 15,
    isNewArrival: false,
    isFeatured: true,
    isBestSeller: true,
    stock: 40,
    description:
      "True wireless earbuds with crystal clear sound and noise isolation.",
  },
  {
    id: 6,
    categoryId: 6,
    imageSrc: "/images/pocket-camera.png",
    name: "Blackmagic Pocket Cinema Camera 6k",
    price: 599.0,
    discount: 0,
    isNewArrival: false,
    isFeatured: false,
    isBestSeller: false,
    stock: 5,
    description:
      "Professional cinema camera with 6K resolution and wide dynamic range.",
  },
  {
    id: 7,
    categoryId: 5,
    imageSrc: "/images/tablet.png",
    name: "Android Tablet",
    price: 349.0,
    discount: 20,
    isNewArrival: true,
    isFeatured: true,
    isBestSeller: false,
    stock: 18,
    description:
      "Versatile Android tablet with vibrant display and smooth multitasking.",
  },
  {
    id: 8,
    categoryId: 4,
    imageSrc: "/images/apple-series-9.png",
    name: "Apple Series 6 Watch",
    price: 299.0,
    discount: 0,
    isNewArrival: false,
    isFeatured: false,
    isBestSeller: false,
    stock: 22,
    description:
      "Health and fitness-focused smartwatch with always-on Retina display.",
  },
  {
    id: 9,
    categoryId: 7,
    imageSrc: "/images/apple-vision-pro.png",
    name: 'Apple Vision Pro"',
    price: 899.0,
    discount: 10,
    isNewArrival: true,
    isFeatured: true,
    isBestSeller: true,
    stock: 12,
    description:
      "Mixed reality headset delivering immersive spatial experiences.",
  },
  {
    id: 10,
    categoryId: 7,
    imageSrc: "/images/Iphone 14 pro 1 (2).png",
    name: "Iphone 14 Pro",
    price: 1499.0,
    discount: 0,
    isNewArrival: false,
    isFeatured: true,
    isBestSeller: true,
    stock: 8,
    description:
      "Flagship smartphone with A16 Bionic chip and advanced camera system.",
  },
];

export const categories = [
  { id: 1, name: "Headphones", slug: "headphones" },
  { id: 2, name: "Laptops", slug: "laptops" },
  { id: 3, name: "Gaming Consoles", slug: "gaming-consoles" },
  { id: 4, name: "Watches", slug: "watches" },
  { id: 5, name: "Tablets", slug: "tablets" },
  { id: 6, name: "Cameras", slug: "cameras" },
  { id: 7, name: "Smartphones", slug: "smartphones" },
];

export const users = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    isAdmin: false,
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@example.com",
    isAdmin: true,
  },
];

export const orders = [
  {
    id: 1,
    userId: 1,
    items: [
      { productId: 2, quantity: 1 },
      { productId: 7, quantity: 2 },
    ],
    totalPrice: 2697, // sum of products * quantity
    status: "Processing", // Pending, Shipped, Delivered, Cancelled
    createdAt: "2025-08-08T12:00:00Z",
  },
];

export const reviews = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    rating: 5,
    comment: "Amazing sound quality and very comfortable!",
    createdAt: "2025-07-30T08:00:00Z",
  },
  {
    id: 2,
    productId: 10,
    userId: 2,
    rating: 4,
    comment: "Great phone but battery life could be better.",
    createdAt: "2025-08-01T14:30:00Z",
  },
];

export const carts = [
  {
    userId: 1,
    items: [
      { productId: 5, quantity: 1 },
      { productId: 8, quantity: 3 },
    ],
  },
];
