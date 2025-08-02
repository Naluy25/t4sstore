import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { allProducts } from "@/lib/mockData";
import ProductCard from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-tajawal">
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
        {/* نتائج البحث */}
        <div className="container max-w-5xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-lg text-gray-500">لا توجد منتجات مطابقة لبحثك.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage; 