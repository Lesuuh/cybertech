import { Breadcrumbs } from "@/app/_components/products/Breadcrumbs";
import MoreDetails from "@/app/_components/products/MoreDetails";
import RelatedProducts from "@/app/_components/products/RelatedProducts";
import Reviews from "@/app/_components/products/Reviews";
import { products } from "@/app/data/data";
import { Button } from "@/components/ui/button";
import { getDiscountedPrice } from "@/lib/utils";

import {
  BatteryCharging,
  Camera,
  Monitor,
  Database,
  Cpu,
  Droplet,
  Wifi,
  Truck,
  Box,
  ShieldCheck,
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
      Icon: BatteryCharging,
    },
    { label: "Back Camera", value: product.cameraBack, Icon: Camera },
    { label: "Front Camera", value: product.cameraFront, Icon: Camera },
    { label: "Screen Size", value: product.screenSize, Icon: Monitor },
    { label: "Storage Space", value: product.storageSpace, Icon: Database },
    { label: "Operating System", value: product.operatingSystem, Icon: Cpu },
    { label: "Memory Space", value: product.memorySpace, Icon: Database },
    {
      label: "Water Resistance",
      value: product.waterResistance,
      Icon: Droplet,
    },
    { label: "Screen Type", value: product.screenType, Icon: Monitor },
    { label: "Network", value: product.network, Icon: Wifi },
    {
      label: "Screen Resolution",
      value: product.screenResolution,
      Icon: Monitor,
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
      <div className="grid grid-cols-1 bg-gray-50 lg:grid-cols-2 gap-12 items-center p-10">
        {/* Image */}
        <div className="w-full max-w-md mx-auto">
          <img
            src={product.imageSrc}
            alt={product.name}
            className="object-contain w-full rounded-md"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-extrabold">{product.name}</h1>

          <div className="flex items-center gap-4 text-3xl font-semibold">
            <span>${discountPrice.toFixed(2)}</span>
            {/* {product.discount > 0 && ( */}
            <del className="text-gray-500 text-2xl">
              ${product.price.toFixed(2)}
            </del>
            {/* )} */}
          </div>

          {/* Colors */}
          <div>
            <p className="font-medium mb-2">Available Colors:</p>
            <div className="flex gap-4">
              {colors.map((color, idx) => (
                <button
                  key={idx}
                  title={color}
                  aria-label={`Select color ${color}`}
                  style={{ backgroundColor: color }}
                  className="w-10 h-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                />
              ))}
            </div>
          </div>

          {/* Memory */}
          <div>
            <p className="font-medium mb-2">Memory Options:</p>
            <div className="flex gap-4 flex-wrap">
              {memoryOptions?.map((mem, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-24 py-3 text-gray-700 rounded-sm"
                >
                  {mem}
                </Button>
              ))}
            </div>
          </div>

          {/* Important details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredImportantDetails.map(({ label, value, Icon }, idx) => (
              <div
                key={idx}
                className="bg-gray-100 rounded-sm p-4 flex gap-2 items-center"
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="text-gray-800 text-sm font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Description */}
          <div>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Add to Cart / Wishlist */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Button
              variant="outline"
              className="flex-1 py-4 md:py-6 rounded-sm border border-gray-700"
            >
              Add to Wishlist
            </Button>
            <Button className="flex-1 py-4 md:py-6 rounded-sm bg-black text-white hover:bg-gray-900 transition">
              Add to Cart
            </Button>
          </div>

          {/* Delivery, Stock, Warranty */}

          <div className="grid grid-cols-3  sm:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 rounded-sm w-13 h-13 justify-center flex gap-2 items-center">
                <Truck className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Delivery</p>
                <p className="text-gray-800 text-sm font-semibold">
                  {product.deliveryDays} days
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-gray-200 rounded-sm w-13 h-13 justify-center flex gap-2 items-center">
                <Box className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">In Stock</p>
                <p className="text-gray-800 text-sm font-semibold">
                  {product.stock} items
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-gray-200 rounded-sm w-13 h-13 justify-center flex gap-2 items-center">
                <ShieldCheck className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Warranty</p>
                <p className="text-gray-800 text-sm font-semibold">
                  {product.warrantyYears} year
                  {product.warrantyYears > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
