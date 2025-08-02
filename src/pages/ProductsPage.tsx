import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/product/ProductCard";
import { allProducts } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ProductsPage = () => {
  const [query, setQuery] = useState("");

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <MainLayout>
      {/* شريط البحث في الأعلى */}
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
      <div className="container py-12 font-tajawal">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-[#5400dd] bg-clip-text text-transparent">
            جميع المنتجات
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            تصفح مجموعتنا الواسعة من المنتجات عالية الجودة.
          </p>
        </motion.div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-lg text-gray-500">لا توجد منتجات مطابقة لبحثك.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
