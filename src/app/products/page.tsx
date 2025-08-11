"use client";

import { useEffect, useState } from "react";
import { BreadcrumbWithCustomSeparator } from "../_components/products/Breadcrumbs";
import ProductCard from "../_components/products/ProductCard";
import { products } from "../data/data";
import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { PaginationDemo } from "../_components/products/Pagination";
import Sidebar from "../_components/products/Sidebar";

const Products = () => {
  const filteredProducts = products;
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageProduct = products.slice(startIndex, endIndex);

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
    setSave((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
    console.log(`${product.name} saved?`, !save[product.id]);
  };

  return (
    <main>
      <section className="max-w-[1500px]  px-4  mx-auto w-full my-10 ">
        <div className="hidden lg:flex">
          <BreadcrumbWithCustomSeparator />
        </div>

        <div className="flex lg:hidden w-full items-center gap-6">
          <Button variant="outline" className="py-6 flex-1 rounded-sm">
            Filters <SlidersHorizontal />
          </Button>
          <Button variant="outline" className="py-6 flex-1 rounded-sm">
            By ratings <ChevronDown />
          </Button>
        </div>

        <div className="mt-10">
          <div className="grid lg:grid-cols-4 mt-10 gap-8">
            {/* side bar */}
            <div>
              <Sidebar />
            </div>
            <div className="col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm">
                  Product result: <strong>{filteredProducts.length}</strong>
                </div>
                <Button
                  variant="outline"
                  className="py-6 rounded-sm min-w-[120px]"
                >
                  By ratings <ChevronDown />
                </Button>
              </div>
              <div className="grid  w-full  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pageProduct.slice(0, 8).map((product) => (
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
              <div className="mt-10 flex justify-center">
                <PaginationDemo
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              </div>
            </div>{" "}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;
