"use client";

import { useState } from "react";
import { BreadcrumbWithCustomSeparator } from "../_components/products/Breadcrumbs";
import ProductCard from "../_components/products/ProductCard";
import { products } from "../data/data";
import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { PaginationDemo } from "../_components/products/Pagination";

const Products = () => {
  const filteredProducts = products;

  const [save, setSave] = useState<{ [key: number]: boolean }>({});

  const onSave = (product: Product) => {
    setSave((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
    console.log(`${product.name} saved?`, !save[product.id]);
  };

  return (
    <main>
      <section className="max-w-[1500px] px-4 md:px-16 lg:px-28 mx-auto w-full my-20 ">
        <div className="hidden lg:flex">
          <BreadcrumbWithCustomSeparator />
        </div>

        <div className="flex w-full items-center gap-6">
          <Button variant="outline" className="py-6 flex-1 rounded-sm">
            Filters <SlidersHorizontal />
          </Button>
          <Button variant="outline" className="py-6 flex-1 rounded-sm">
            By ratings <ChevronDown />
          </Button>
        </div>

        <div className="mt-10">
          <h2>
            Product result: <strong>{filteredProducts.length}</strong>
          </h2>
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
        </div>

        <div className="mt-5">
          <PaginationDemo />
        </div>
      </section>
    </main>
  );
};

export default Products;
