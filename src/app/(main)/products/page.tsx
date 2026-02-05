"use client";

import { useEffect, useState } from "react";
import { Breadcrumbs } from "../../_components/products/Breadcrumbs";
import ProductCard from "../../_components/products/ProductCard";
import { Product } from "../../types";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react"; // Added X for closing
import { PaginationDemo } from "../../_components/products/Pagination";
import Sidebar from "../../_components/products/Sidebar";
import Spinner from "@/components/ui/Spinner";
import { products } from "@/app/data/data";

const Products = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

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
    { label: "Shop", href: "/products" },
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
      <section className="max-w-[1500px] px-4 md:px-8 lg:px-12 mx-auto w-full my-6 md:my-10">
        {/* Breadcrumbs - Hidden on small mobile to save space */}
        <div className="hidden sm:flex mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Mobile Filter Trigger & Result Count */}
        <div className="flex items-center justify-between py-4 border-b border-slate-100 lg:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 rounded-xl font-bold border-slate-200"
          >
            <SlidersHorizontal size={16} />
            Filters
          </Button>
          <p className="text-sm text-slate-500 font-medium">
            Results:{" "}
            <span className="text-black font-bold">
              {filteredProducts?.length}
            </span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mt-6 lg:mt-10">
          {/* Desktop Sidebar / Mobile Drawer Overlay */}
          <aside
            className={`
            fixed inset-0 z-50 bg-white p-6 transition-transform duration-300 lg:relative lg:inset-auto lg:z-0 lg:p-0 lg:translate-x-0 lg:w-64 lg:block
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          >
            {/* Mobile Header for Sidebar */}
            <div className="flex items-center justify-between mb-8 lg:hidden">
              <h2 className="text-xl font-black uppercase tracking-tighter">
                Filters
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X />
              </Button>
            </div>

            <Sidebar
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />

            {/* Mobile Apply Button */}
            <Button
              className="w-full mt-8 lg:hidden rounded-xl bg-black py-6"
              onClick={() => setIsSidebarOpen(false)}
            >
              Apply Filters
            </Button>
          </aside>

          {/* Product Feed */}
          <div className="flex-1">
            <div className="hidden lg:flex justify-end pb-6">
              <p className="text-slate-500 font-medium">
                Product result:{" "}
                <strong className="text-black font-black">
                  {filteredProducts?.length}
                </strong>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8">
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

            {/* Pagination Container */}
            <div className="mt-16 flex justify-center border-t border-slate-100 pt-10">
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
