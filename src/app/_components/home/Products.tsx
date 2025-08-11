"use client";

import { useState } from "react";
import ProductCard from "../products/ProductCard";
import { products } from "@/app/data/data";
import { Product } from "@/app/types";

const Products = () => {
  const tabs = [
    { slug: "all", label: "Products" },
    { slug: "new", label: "New Arrivals" },
    { slug: "bestseller", label: "Best Seller" },
    { slug: "featured", label: "Featured" },
  ];


  const [activeTab, setActiveTab] = useState("all");

  // Filtering products
  const filteredProducts = products.filter((product) => {
    if (activeTab === "new") return product.isNewArrival;
    if (activeTab === "featured") return product.isFeatured;
    if (activeTab === "bestseller") return product.isBestSeller;
    return true;
  });

  const [save, setSave] = useState<{ [key: number]: boolean }>({});

  const onSave = (product: Product) => {
    setSave((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
    console.log(`${product.name} saved?`, !save[product.id]);
  };

  const setTab = (slug: string) => {
    setActiveTab(slug);
  };

  return (
    <section className="max-w-[1500px] px-4 md:px-16 lg:px-28 mx-auto w-full my-20 ">
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
      <div className="grid mt-10  w-full  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageSrc={product.imageSrc}
            name={product.name}
            price={product.price}
            discount={product.discount || 0}
            isFeatured={product.isFeatured || false}
            isBestSeller={product.isBestSeller || false}
            onBuy={() => alert(`Purchased ${product.name}!`)}
            onSave={() => onSave(product)}
            save={!!save[product.id]}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;
