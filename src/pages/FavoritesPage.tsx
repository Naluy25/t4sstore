
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/product/ProductCard";
import { useFavorites } from "@/contexts/FavoritesContext";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  
  // تمت إزالة حالة التحميل وتأثير الانتظار

  return (
    <MainLayout>
      <div className="container py-12 font-tajawal">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              المفضلة
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            جميع المنتجات التي قمت بحفظها في مكان واحد
          </p>
        </motion.div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product, index) => (
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
              لا توجد منتجات في المفضلة حالياً. إبدأ في إضافة منتجات الآن!
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default FavoritesPage;
