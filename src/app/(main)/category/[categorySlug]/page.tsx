"use client";

import React, { useState } from "react";
import { categories, products } from "@/app/data/data";
import { Breadcrumbs } from "@/app/_components/products/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/app/_components/products/ProductCard";
import { Product } from "@/app/types";

const CategoryPage = () => {
  const params = useParams();
  const categorySlug = params.categorySlug as string;
  const [save, setSave] = useState<{ [key: number]: boolean }>({});

  const category = categories.find((c) => c.slug === categorySlug);

  // 1. Filter products based on the category slug
  if (!category) {
    return <p className="text-center py-20">Category not found</p>;
  }

  // 2️⃣ Filter products by categoryId
  const filteredProducts = products.filter(
    (p) => p.categoryId === category?.id,
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Inventory", href: "/products" },
    { label: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) },
  ];

  const onSave = (product: Product) => {
    setSave((prev) => ({ ...prev, [product.id]: !prev[product.id] }));
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
        {/* Navigation & Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <Breadcrumbs items={breadcrumbItems} />

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl hover:border-gray-900 transition-all">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <span className="text-[10px] uppercase tracking-widest font-medium">
              Filter_System
            </span>
          </button>
        </div>

        {/* Category Header */}
        <header className="mb-16">
          <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-2">
            Category_Archive
          </p>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-gray-900 uppercase">
            {categorySlug}
          </h1>
          <p className="text-gray-500 mt-4 font-light italic">
            Displaying {filteredProducts.length} units found in registry.
          </p>
        </header>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.slice(0, 8).map((product, idx) => (
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
        ) : (
          <div className="py-20 text-center border border-dashed border-gray-200 rounded-[40px]">
            <p className="text-gray-400 font-light">
              No hardware found for this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;

// {filteredProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-[32px] overflow-hidden">
//             {filteredProducts.map((product) => (
//               <Link
//                 href={`/products/${product.id}`}
//                 key={product.id}
//                 className="group bg-white p-8 flex flex-col h-full hover:bg-gray-50/50 transition-colors"
//               >
//                 {/* Image Container */}
//                 <div className="relative aspect-square mb-8 overflow-hidden rounded-2xl bg-gray-50/50 p-6">
//                   <Image
//                     src={product.imageSrc}
//                     alt={product.name}
//                     fill
//                     className="object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
//                   />
//                 </div>

//                 {/* Product Info */}
//                 <div className="mt-auto">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-sm font-medium text-gray-900 uppercase tracking-tight leading-tight max-w-[70%]">
//                       {product.name}
//                     </h3>
//                     <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
//                   </div>
//                   <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-4">
//                     Ref_ID: {product.id}
//                   </p>
//                   <p className="text-lg font-medium tracking-tighter">
//                     ${product.price.toFixed(2)}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="py-20 text-center border border-dashed border-gray-200 rounded-[40px]">
//             <p className="text-gray-400 font-light">
//               No hardware found for this category.
//             </p>
//           </div>
//         )}
