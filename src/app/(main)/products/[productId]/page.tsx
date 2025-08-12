import { Breadcrumbs } from "@/app/_components/products/Breadcrumbs";
import MoreDetails from "@/app/_components/products/MoreDetails";
import ProductDetailsClient from "@/app/_components/products/ProductDetailsClient";
import RelatedProducts from "@/app/_components/products/RelatedProducts";
import Reviews from "@/app/_components/products/Reviews";
import { products } from "@/app/data/data";
import { getDiscountedPrice } from "@/lib/utils";

import {
  BatteryCharging,
  Camera,
  Monitor,
  Database,
  Cpu,
  Droplet,
  Wifi,
} from "lucide-react";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const Product = async ({ params }: ProductPageProps) => {
  const { productId } = await params;
  const product = products.find((p) => p.id === Number(productId));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: product?.name },
  ];

  if (!product) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Product not found.
      </div>
    );
  }

  const discountPrice = getDiscountedPrice(product);
  const colors = [
    "#000000", // Black
    "#6B21A8", // Purple
    "#EF4444", // Red
    "#14B8A6", // Accent teal
    "#F3F4F6", // Light gray
  ];

  // Example memory options from data or fallback:
  const memoryOptions = product.memorySpace?.split(",").map((s) => s.trim());

  const importantDetails = [
    {
      label: "Battery Capacity",
      value: product.batteryCapacity,
      iconName: "BatteryCharging",
    },
    { label: "Back Camera", value: product.cameraBack, iconName: "Camera" },
    { label: "Front Camera", value: product.cameraFront, iconName: "Camera" },
    { label: "Screen Size", value: product.screenSize, iconName: "Monitor" },
    {
      label: "Storage Space",
      value: product.storageSpace,
      iconName: "Database",
    },
    {
      label: "Operating System",
      value: product.operatingSystem,
      iconName: "Cpu",
    },
    { label: "Memory Space", value: product.memorySpace, iconName: "Database" },
    {
      label: "Water Resistance",
      value: product.waterResistance,
      iconName: "Droplet",
    },
    { label: "Screen Type", value: product.screenType, iconName: "Monitor" },
    { label: "Network", value: product.network, iconName: "Wifi" },
    {
      label: "Screen Resolution",
      value: product.screenResolution,
      iconName: "Monitor",
    },
  ];

  const filteredImportantDetails = importantDetails
    .filter((detail) => detail.value !== null && detail.value !== undefined)
    .slice(0, 6);

  console.log(filteredImportantDetails);

  return (
    <section className="max-w-[1500px] bg-white mx-auto px-4 my-10">
      <div className="hidden lg:flex mb-10">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <ProductDetailsClient
        product={product}
        discountPrice={discountPrice}
        colors={colors}
        memoryOptions={memoryOptions}
        importantDetails={filteredImportantDetails}
      />

      {/* details */}
      <MoreDetails product={product} />

      {/* Reviews */}
      <Reviews productId={product.id} />

      {/* Related Products */}
      <RelatedProducts product={product} />
    </section>
  );
};

export default Product;
