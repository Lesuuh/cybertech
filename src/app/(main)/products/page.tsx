"use client";

import { useEffect, useState } from "react";
import { Breadcrumbs } from "../../_components/products/Breadcrumbs";
import ProductCard from "../../_components/products/ProductCard";
import { Product } from "../../types";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X} from "lucide-react";
import { PaginationDemo } from "../../_components/products/Pagination";
import Sidebar from "../../_components/products/Sidebar";
import { products } from "@/app/data/data";

const Products = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredProducts =
    selectedIds.length > 0
      ? products.filter((item) => selectedIds.includes(item.categoryId))
      : products;

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const pageProduct = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Inventory", href: "/products" },
  ];

  const [save, setSave] = useState<{ [key: number]: boolean }>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("savedProducts");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("savedProducts", JSON.stringify(save));
  }, [save]);

  const onSave = (product: Product) => {
    setSave((prev) => ({ ...prev, [product.id]: !prev[product.id] }));
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-[1600px] px-6 md:px-12 mx-auto w-full my-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-10 border-b border-gray-50 gap-6">
          <div className="space-y-4">
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-gray-900 uppercase">
              Hardware Archive
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <p className="hidden md:block text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
              Registry // {filteredProducts.length} Units Found
            </p>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 px-5 py-3 border border-gray-100 rounded-2xl hover:border-gray-900 transition-all"
            >
              <SlidersHorizontal size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Filter
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar / Filter Module */}
          <aside
            className={`
            fixed inset-0 z-50 bg-white p-8 transition-transform duration-500 lg:relative lg:inset-auto lg:z-0 lg:p-0 lg:translate-x-0 lg:w-64 lg:block
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          >
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between mb-12 lg:hidden">
              <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-bold">
                Adjust_Parameters
              </p>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="space-y-10">
              <Sidebar
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
            </div>

            {/* Mobile Footer Button */}
            <Button
              className="w-full mt-12 lg:hidden rounded-2xl bg-gray-900 py-7 text-[10px] uppercase tracking-[0.2em] font-bold"
              onClick={() => setIsSidebarOpen(false)}
            >
              Apply Changes
            </Button>
          </aside>

          {/* Product Feed */}
          <div className="flex-1">
            {/* Displaying Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-12">
              {pageProduct.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  imageSrc={product.imageSrc}
                  name={product.name}
                  price={product.price}
                  discount={product.discount || 0}
                  onSave={() => onSave(product)}
                  save={!!save[product.id]}
                />
              ))}
            </div>

            {/* Clean Pagination */}
            <div className="mt-24 pt-12 border-t border-gray-50 flex flex-col items-center gap-8">
              <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                Page {page} of {totalPages}
              </p>
              <PaginationDemo
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                  setPage(newPage);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;
