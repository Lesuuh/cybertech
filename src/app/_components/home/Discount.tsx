"use client";

import ProductCard from "../products/ProductCard";
import { useState } from "react";
import { Product } from "@/app/types";
import { useProducts } from "@/services/useProducts";

const Discount = () => {
  const { data: products, isLoading, error } = useProducts();
  const discountedProducts = products?.filter(
    (product) => product.discount > 0
  );

  const [save, setSave] = useState<{ [key: number]: boolean }>({});

  const onSave = (product: Product) => {
    setSave((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
    console.log(`${product.name} saved?`, !save[product.id]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-col py-10">
        <div className="w-10 h-10 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
        <p className="mt-5">Loading...</p>
      </div>
    );
  }
  return (
    <section className="max-w-[1500px] px-4 md:px-16 lg:px-28 mx-auto w-full my-20 ">
      <h2 className="text-2xl">Discounts up to -50%</h2>
      <div className="grid mt-10  w-full  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {discountedProducts?.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageSrc={product.imageSrc}
            name={product.name}
            price={product.price}
            discount={product.discount || 0}
            onBuy={() => alert(`Purchased ${product.name}!`)}
            onSave={() => onSave(product)}
            save={!!save[product.id]}
          />
        ))}
      </div>
    </section>
  );
};

export default Discount;
