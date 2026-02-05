"use client";

import React from "react";

const MoreDetails = ({ product }) => {
  // Helper to filter out empty metadata values
  const specList = [
    { label: "CPU_CORES", value: product.metadata.cpuCores },
    { label: "CPU_TYPE", value: product?.cpuType },
    { label: "FRONT_CAMERA", value: product.metadata.cameraFront },
    { label: "BACK_CAMERA", value: product.metadata.cameraBack },
    { label: "BATTERY_UNIT", value: product.metadata.batteryCapacity },
    { label: "SCREEN_DIMENSIONS", value: product.metadata.screenSize },
    { label: "RESOLUTION", value: product.metadata.screenResolution },
    { label: "REFRESH_RATE", value: product.metadata.screenRefreshRate },
    { label: "PANEL_TYPE", value: product.metadata.screenType },
    { label: "PIXEL_DENSITY", value: product.metadata.pixelDensity },
    {
      label: "LOGISTICS_ESTIMATE",
      value: product.metadata.deliveryDays
        ? `${product.metadata.deliveryDays} DAYS`
        : null,
    },
    { label: "INVENTORY_STATUS", value: product.metadata.inStock },
    {
      label: "WARRANTY_POLICY",
      value: product.metadata.guarantee
        ? `${product.metadata.guarantee} YEAR(S)`
        : null,
    },
  ].filter((spec) => spec.value !== undefined && spec.value !== null);

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Narrative Description */}
        <div className="lg:col-span-4">
          <h2 className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium mb-6">
            Product_Description
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm font-light">
            {product.metadata.details}
          </p>
        </div>

        {/* Right Column: Technical Grid */}
        <div className="lg:col-span-8">
          <h2 className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium mb-6">
            Full_Technical_Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-gray-100">
            {specList.map((spec, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-5 border-b border-gray-50 group hover:bg-gray-50/50 transition-colors px-2"
              >
                <span className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">
                  {spec.label}
                </span>
                <span className="text-sm font-medium text-gray-900 tracking-tight">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Metadata */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-100"></div>
            <span className="text-[9px] tracking-[0.3em] text-gray-300 uppercase font-medium">
              End_Of_Spec_Sheet
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreDetails;
