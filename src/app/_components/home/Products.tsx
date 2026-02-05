"use client";

import { useState } from "react";
import ProductCard from "../products/ProductCard";
import { Product } from "@/app/types";
import { products } from "@/app/data/data";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Products = () => {
  const tabs = [
    { slug: "all", label: "All Products" },
    { slug: "new", label: "New Arrivals" },
    { slug: "bestseller", label: "Best Sellers" },
    { slug: "featured", label: "Featured" },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [save, setSave] = useState<{ [key: number]: boolean }>({});

  const filteredProducts = products?.filter((product) => {
    if (activeTab === "new") return product.isNewArrival;
    if (activeTab === "featured") return product.isFeatured;
    if (activeTab === "bestseller") return product.isBestSeller;
    return true;
  });

  const onSave = (product: Product) => {
    setSave((prev) => ({ ...prev, [product.id]: !prev[product.id] }));
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-20 w-full">
      {/* Tab Navigation - Fully Responsive */}
      <div className="flex flex-col gap-6 mb-8 md:mb-12 md:flex-row md:items-center md:justify-between">
        {/* Tab List: Scrollable on Mobile, Fixed on Desktop */}
        <div className="w-full md:w-auto overflow-hidden">
          <div className="flex p-1 bg-slate-100 rounded-2xl overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex gap-1 min-w-full md:min-w-0">
              {tabs.map((tab) => (
                <button
                  key={tab.slug}
                  onClick={() => setActiveTab(tab.slug)}
                  className={`relative flex-1 md:flex-none px-5 py-2.5 text-xs md:text-sm font-bold transition-all duration-300 rounded-xl whitespace-nowrap ${
                    activeTab === tab.slug
                      ? "text-indigo-600"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {activeTab === tab.slug && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white shadow-sm border border-slate-200 rounded-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Item Counter: Aligned to the bottom-right on mobile */}
        <p className="text-slate-400 text-sm font-medium self-end md:self-auto">
          Showing{" "}
          <span className="text-slate-900 font-bold">
            {filteredProducts?.length}
          </span>{" "}
          items
        </p>
      </div>

      {/* Animated Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts?.slice(0, 8).map((product, idx) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <ProductCard
                id={product.id}
                imageSrc={product.imageSrc}
                name={product.name}
                price={product.price}
                discount={product.discount || 0}
                isFeatured={product.isFeatured || false}
                isBestSeller={product.isBestSeller || false}
                onSave={() => onSave(product)}
                save={!!save[product.id]}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Action */}
      <div className="mt-12 md:mt-20 flex justify-center">
        <Link
          href={"/products"}
          className="w-full md:w-auto px-10 py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default Products;
