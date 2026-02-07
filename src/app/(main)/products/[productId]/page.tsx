import * as React from "react";
import { Breadcrumbs } from "@/app/_components/products/Breadcrumbs";
import MoreDetails from "@/app/_components/products/MoreDetails";
import ProductDetailsClient from "@/app/_components/products/ProductDetailsClient";
import Reviews from "@/app/_components/products/Reviews";
import { getDiscountedPrice } from "@/lib/utils";
import { products } from "@/app/data/data";
import type { IconName } from "@/app/_components/products/ProductDetailsClient";

interface ImportantDetail {
  label: string;
  value: string | number | null | undefined;
  iconName: IconName;
}

// ✅ Updated to handle Promise params
const Product = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  // ✅ Await params before using it
  const { productId: productIdParam } = await params;
  const productId = Number(productIdParam);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
          System Error // 404
        </h2>
        <p className="text-gray-900 font-light">Object Not Found In Registry</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Inventory", href: "/products" },
    { label: product.name },
  ];

  const discountPrice = getDiscountedPrice(product);
  const colors: string[] = ["#000000", "#27272A", "#E4E4E7", "#3F3F46"];
  const memoryOptions: string[] | null =
    product.metadata.memorySpace?.split(",").map((s) => s.trim()) || null;

  const importantDetails: ImportantDetail[] = [
    {
      label: "Power Cell",
      value: product.metadata.batteryCapacity,
      iconName: "BatteryCharging",
    },
    {
      label: "Primary Optic",
      value: product.metadata.cameraBack,
      iconName: "Camera",
    },
    {
      label: "Front Optic",
      value: product.metadata.cameraFront,
      iconName: "Camera",
    },
    {
      label: "Display Scale",
      value: product.metadata.screenSize,
      iconName: "Monitor",
    },
    {
      label: "Data Volume",
      value: product.metadata.storageSpace,
      iconName: "Database",
    },
    {
      label: "Kernel OS",
      value: product.metadata.operatingSystem,
      iconName: "Cpu",
    },
    {
      label: "Network Protocol",
      value: product.metadata.network,
      iconName: "Wifi",
    },
    {
      label: "Resolution Native",
      value: product.metadata.screenResolution,
      iconName: "Monitor",
    },
  ];

  const filteredImportantDetails = importantDetails
    .filter((d) => d.value !== null && d.value !== undefined)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <nav className="mb-12 mt-10">
          <Breadcrumbs items={breadcrumbItems} />
        </nav>

        <section>
          <ProductDetailsClient
            product={product}
            discountPrice={discountPrice}
            colors={colors}
            memoryOptions={memoryOptions}
            importantDetails={filteredImportantDetails}
          />
        </section>

        <section className="border-t border-gray-50">
          <MoreDetails product={product} />
        </section>

        <section className="border-t border-gray-50 py-10">
          <Reviews productId={product.id} />
        </section>
      </div>
    </main>
  );
};

export default Product;
