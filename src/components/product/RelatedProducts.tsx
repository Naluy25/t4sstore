
import React, { useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import { allProducts } from "@/lib/mockData";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId, category }) => {
  const relatedProducts = useMemo(() => {
    // استبعاد المنتج الحالي واختيار 4 منتجات من نفس الفئة
    return allProducts
      .filter(product => product.id !== currentProductId && product.category === category)
      .slice(0, 4);
  }, [currentProductId, category]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container">
        <h2 className="text-2xl font-heading font-bold mb-6">منتجات قد تعجبك</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
