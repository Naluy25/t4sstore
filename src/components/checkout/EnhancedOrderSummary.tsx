
import React, { memo } from "react";
import { ShoppingCart, CreditCard, MapPin, Phone, Clock } from "lucide-react";
import { CartItem } from "@/types";
import { motion } from "framer-motion";
import ImageOptimizer from "../common/ImageOptimizer";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface EnhancedOrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  discount?: number;
  shipping?: number;
  taxes?: number;
  total?: number;
}

const EnhancedOrderSummary: React.FC<EnhancedOrderSummaryProps> = memo(({ 
  cartItems, 
  subtotal,
  discount = 0,
  shipping = 0,
  taxes = 0,
  total = subtotal - discount + shipping + taxes
}) => {
  const navigate = useNavigate();
  
  // حساب عدد العناصر في السلة
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          ملخص الطلب
        </h2>
        <span className="text-sm bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full">
          {itemCount} {itemCount === 1 ? 'منتج' : 'منتجات'}
        </span>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[350px] overflow-y-auto mb-4 pr-2 scrollbar-hide">
        {cartItems.map((item) => (
          <div key={item.product.id} className="py-4 flex items-center justify-between group transition-all hover:bg-gray-50 dark:hover:bg-gray-800 -mx-4 px-4 rounded-lg">
            <div className="flex gap-3 items-center">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 group-hover:border-primary transition-all">
                <ImageOptimizer 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-base font-medium group-hover:text-primary transition-colors line-clamp-1">{item.product.name}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 gap-2">
                  <span>{item.quantity} × {item.product.price.toFixed(2)} $</span>
                </div>
              </div>
            </div>
            <p className="text-base font-medium text-primary">{(item.product.price * item.quantity).toFixed(2)} $</p>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mt-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">المجموع الفرعي:</span>
            <span>{subtotal.toFixed(2)} $</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between items-center text-sm text-primary">
              <span>الخصم:</span>
              <span>- {discount.toFixed(2)} $</span>
            </div>
          )}
          
          {taxes > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">الضريبة (15%):</span>
              <span>{taxes.toFixed(2)} $</span>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
          <div className="flex justify-between items-center font-bold">
            <p>الإجمالي</p>
            <p className="text-lg text-primary">{total.toFixed(2)} $</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <div className="flex gap-3 items-center">
            <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">معلومات التسليم</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                يتم تسليم المنتج في حسابك بعد اتمام عملية الشراء
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex gap-3 items-center">
            <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">طرق الدفع المتاحة</h4>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                تحويل بنكي - باي بال - انستا باي - ابل باي - محفظة الكترونية
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Button
        onClick={() => navigate("/products")}
        variant="outline"
        className="w-full mt-6 border-primary/30 hover:bg-primary/10 hover:text-primary dark:border-primary/50 transition-all"
      >
        متابعة التسوق
      </Button>
    </motion.div>
  );
});

EnhancedOrderSummary.displayName = 'EnhancedOrderSummary';

export default EnhancedOrderSummary;
