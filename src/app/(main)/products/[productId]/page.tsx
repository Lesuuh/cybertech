"use client";

import React from "react";
import { Breadcrumbs } from "@/app/_components/products/Breadcrumbs";
import MoreDetails from "@/app/_components/products/MoreDetails";
import ProductDetailsClient from "@/app/_components/products/ProductDetailsClient";
import Reviews from "@/app/_components/products/Reviews";
import Spinner from "@/components/ui/Spinner";

import type { IconName } from "@/app/_components/products/ProductDetailsClient";

interface ImportantDetail {
  label: string;
  value: string | number | null | undefined;
  iconName: IconName;
}

import { getDiscountedPrice } from "@/lib/utils";
import { products } from "@/app/data/data";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const Product = ({ params }: ProductPageProps) => {
  const { productId } = params;
  const product = products?.find((p) => p.id === Number(productId));

  // Placeholder states for your hook logic
  const isLoading = false;
  const error = false;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  if (error || !product) {
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

  // Refined palette for CyberTech
  const colors: string[] = [
    "#000000", // Onyx
    "#27272A", // Zinc
    "#E4E4E7", // Platinum
    "#3F3F46", // Steel
  ];

  const memoryOptions: string[] | null =
    product.metadata.memorySpace?.split(",").map((s) => s.trim()) || null;

  // Technical Detail Mapping
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
    .filter((detail) => detail.value !== null && detail.value !== undefined)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 ">
        {/* Navigation Trace */}
        <nav className="mb-12 mt-10">
          <Breadcrumbs items={breadcrumbItems} />
        </nav>

        {/* Primary Viewport: Image & Core Configurator */}
        <section className="">
          <ProductDetailsClient
            product={product}
            discountPrice={discountPrice}
            colors={colors}
            memoryOptions={memoryOptions}
            importantDetails={filteredImportantDetails}
          />
        </section>

        {/* Detailed Manifest: Tech Specs */}
        <section className="border-t border-gray-50 ">
          <MoreDetails product={product} />
        </section>

        {/* Feedback Log: Reviews */}
        <section className="border-t border-gray-50 py-10">
          <Reviews productId={product.id} />
        </section>
      </div>
    </main>
  );
};

export default Product;
