
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useParams } from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/product/ProductCard";
import { allProducts, categories } from "@/lib/mockData";
import { motion } from "framer-motion";
import PageLoading from "@/components/ui/page-loading";

// Define the parameter types correctly to satisfy TypeScript
type CategoryPageParams = {
  categoryId: string;
}

const CategoryPage = () => {
  // Use Record<string, string | undefined> type to satisfy the constraint
  const { categoryId } = useParams<Record<string, string>>();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Fetch products based on categoryId
    const filteredProducts = allProducts.filter(product => product.category === categoryId);
    setProducts(filteredProducts);

    // Fetch category name
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      setCategoryName(category.name);
    }

    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, [categoryId]);

  if (isLoading) {
    return (
      <MainLayout>
        <PageLoading />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-12 font-tajawal">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary">
            {categoryName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            اكتشف مجموعتنا المختارة من المنتجات في فئة {categoryName}
          </p>
        </motion.div>

        {/* شريط البحث الاحترافي */}
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm px-2 sm:px-0 py-6 mb-8">
          <div className="container max-w-2xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="ابحث عن منتج بالاسم أو الوصف..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="pr-12 py-4 text-lg shadow-md border-2 border-primary/30 focus:border-primary transition-all"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-6 w-6" />
            </div>
          </div>
        </div>

        {/* المنتجات */}
        {products.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
        ).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.filter(product =>
              product.name.toLowerCase().includes(query.toLowerCase()) ||
              (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
            ).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400">
              لا توجد منتجات في هذه الفئة حالياً.
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
