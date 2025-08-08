"use client";

import { useState } from "react";
import ProductCard from "../products/ProductCard";
import { products } from "@/app/data/data";

const Products = () => {
  const tabs = [
    { slug: "new", label: "New Arrivals" },
    { slug: "bestseller", label: "Best Seller" },
    { slug: "featured", label: "Featured Products" },
  ];

  const [activeTab, setActiveTab] = useState("new");

  const setTab = (slug: string) => {
    setActiveTab(slug);
  };
  return (
    <section className="max-w-[1500px] mx-auto w-full my-20 ">
      <div className="space-x-5">
        {tabs.map((tab, idx) => (
          <button
            onClick={() => setTab(tab.slug)}
            key={idx}
            className={`cursor-pointer  text-sm ${
              activeTab === tab.slug
                ? "text-gray-900 underline"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid mt-10  w-full  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            imageSrc={product.imageSrc}
            name={product.name}
            price={product.price}
            onBuy={() => alert(`Purchased ${product.name}!`)}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;
