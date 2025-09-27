"use client";

import ProductCard from "../products/ProductCard";
import { useState } from "react";
import { Product } from "@/app/types";
import { useProducts } from "@/services/useProducts";
import Spinner from "@/components/ui/Spinner";

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
    return <Spinner />;
  }

  if (error) return <p>Error loading products</p>;
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
