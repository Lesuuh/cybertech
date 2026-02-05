"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/app/data/data";
import ProductCard from "@/app/_components/products/ProductCard";
import { Breadcrumbs } from "@/app/_components/products/Breadcrumbs";
import { SearchIcon, SlidersHorizontal } from "lucide-react";

// Using Suspense because useSearchParams() requires it in Next.js 13/14+
const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  // Filtering products based on name, category, or description
  const results = products.filter((product) =>
    product.name.toLowerCase().includes(query),
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Search Results" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Simple Filter Button */}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl hover:border-gray-900 transition-all">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-[10px] uppercase tracking-widest font-medium text-gray-900">
            Filter_Parameters
          </span>
        </button>
      </div>

      {/* Search Header */}
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <SearchIcon className="w-4 h-4 text-gray-300" />
          <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
            System Search Query
          </p>
        </div>
        <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-gray-900">
          {query ? `Results for "${query}"` : "All Hardware"}
        </h1>
        <p className="text-sm text-gray-400 mt-4 font-light">
          Registry found {results.length} matching units.
        </p>
      </header>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {results.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageSrc={product.imageSrc}
              name={product.name}
              price={product.price}
              discount={product.discount || 0}
              onSave={() => {}} // You can connect your save logic here
              save={false}
            />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center border border-dashed border-gray-100 rounded-[40px]">
          <p className="text-gray-400 font-light italic">
            Zero matches found in current inventory.
          </p>
          <button
            onClick={() => (window.location.href = "/products")}
            className="mt-6 text-[10px] uppercase tracking-widest border-b border-gray-900 pb-1"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
};

const SearchPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Suspense
        fallback={<div className="p-20 text-center">Scanning Registry...</div>}
      >
        <SearchResults />
      </Suspense>
    </main>
  );
};

export default SearchPage;
