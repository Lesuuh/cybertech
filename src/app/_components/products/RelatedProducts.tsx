"use client";

import { products } from "@/app/data/data";
import { Product } from "@/app/types";
import ProductCard from "./ProductCard";
import { useState } from "react";

const RelatedProducts = ({
  product: currentProduct,
}: {
  product: Product;
  onSave: (product: Product) => void;
  save: Record<number, boolean>; // assuming save is an object keyed by product id
}) => {
  const relatedProducts = products.filter((product) =>
    currentProduct?.relatedProducts?.includes(product.id)
  );

  const [save, setSave] = useState<{ [key: number]: boolean }>({});

  const onSave = (product: Product) => {
    setSave((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
    console.log(`${product.name} saved?`, !save[product.id]);
  };

  return (
    <section className="max-w-[1500px] px-4 md:px-16 lg:px-28 mx-auto w-full my-20 ">
      <h3 className="text-xl font-semibold mb-10">Related Products</h3>
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        
      >
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
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
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
