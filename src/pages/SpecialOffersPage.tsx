import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { allProducts } from "@/lib/mockData";
import ProductCard from "@/components/product/ProductCard";
import { motion } from "framer-motion";
import { BadgePercent, Sparkles } from "lucide-react";

const SpecialOffersPage = () => {
  // عرض المنتجات التي عليها offer فقط
  const offerProducts = allProducts.filter(product => product.offer);

  // ترتيب المنتجات حسب نسبة الخصم (discount) إذا وجدت
  const sortedProducts = [...offerProducts].sort((a, b) => {
    const discountA = a.discount || 0;
    const discountB = b.discount || 0;
    return discountB - discountA;
  });

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
            <BadgePercent className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              العروض الخاصة
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            استفد من أفضل العروض والخصومات المميزة على المنتجات المختارة
          </p>
        </motion.div>

        {/* Banner for limited time offer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-primary/90 to-[#5400dd]/90 rounded-xl p-8 mb-12 text-white text-center relative overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          <Sparkles className="h-8 w-8 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">عرض خاص لفترة محدودة</h2>
          <p className="mb-4 text-lg">
            استفد من الخصومات الحصرية على المنتجات التي تحمل علامة العرض الخاص
          </p>
          <p className="text-sm text-white/80">العرض متجدد حسب المنتجات المختارة</p>
        </motion.div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => (
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
              لا توجد عروض متاحة حالياً. يرجى العودة لاحقاً!
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default SpecialOffersPage;
