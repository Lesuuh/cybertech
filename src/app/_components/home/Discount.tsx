"use client";

import { useState } from "react";
import ProductCard from "../products/ProductCard";
import { Product } from "@/app/types";
import { products } from "@/app/data/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Discount = () => {
  const [save, setSave] = useState<{ [key: number]: boolean }>({});

  const discountedProducts = products
    ?.filter((product) => (product.discount ?? 0) > 0)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));

  const onSave = (product: Product) => {
    setSave((prev) => ({ ...prev, [product.id]: !prev[product.id] }));
  };

  return (
    <section className="max-w-[1400px] px-6 md:px-12 mx-auto w-full my-24">
      {/* Subtle Header */}
      <div className="flex justify-between items-end mb-10 pb-6 border-b border-gray-50">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
            <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
              Limited Opportunities
            </p>
          </div>
          <h2 className="text-xl md:text-2xl font-medium tracking-tight text-gray-900">
            Seasonal Adjustments{" "}
            <span className="text-gray-300 ml-2">— Up to 50%</span>
          </h2>
        </div>

        <Link
          href="/category/deals"
          className="group flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.15em]">
            View All
          </span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid w-full grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
      >
        {discountedProducts?.slice(0, 4).map((product) => (
          <div key={product.id} className="relative group">
            {/* Small Floating Tag */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-white/80 backdrop-blur-md px-2 py-0.5 border border-gray-100 rounded text-[9px] font-bold text-gray-900">
                -{product.discount}%
              </span>
            </div>

            <ProductCard
              id={product.id}
              imageSrc={product.imageSrc}
              name={product.name}
              price={product.price}
              discount={product.discount || 0}
              onSave={() => onSave(product)}
              save={!!save[product.id]}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Discount;
