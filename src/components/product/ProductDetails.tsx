
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductSpecs from "./ProductSpecs";
import { allProducts } from "@/lib/mockData";
import LoadingSpinner from "../ui/loading-spinner";

interface ProductDetailsProps {
  productId: string;
  category: string;
  productName: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, category, productName }) => {
  const [productDescription, setProductDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      setProductDescription(product.description);
    }
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(false), 500);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );
  }

  return (
    <Tabs defaultValue="details" className="w-full font-tajawal">
      <TabsList className="w-full mb-6 bg-gray-100/80 dark:bg-gray-800/80 p-1.5 rounded-xl backdrop-blur-sm">
        <TabsTrigger value="details" className="flex-1 py-2.5">وصف المنتج</TabsTrigger>
        <TabsTrigger value="specs" className="flex-1 py-2.5">المواصفات</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="bg-white dark:bg-gray-800/90 rounded-xl p-6 shadow-sm backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-6 text-primary">وصف المنتج</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {productDescription.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">{paragraph}</p>
          ))}
          </div>
      </TabsContent>
      
      <TabsContent value="specs">
        <ProductSpecs productId={productId} category={category} />
      </TabsContent>
    </Tabs>
  );
};

export default ProductDetails;
