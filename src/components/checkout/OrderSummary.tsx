
import React, { memo } from "react";
import { ShoppingCart, CreditCard } from "lucide-react";
import { CartItem } from "@/types"; // Fixed import path
import { motion } from "framer-motion";

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = memo(({ cartItems, subtotal }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 pb-3 border-b">
          <ShoppingCart className="h-5 w-5 text-primary" />
          ملخص الطلب
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {cartItems.map((item) => (
            <div key={item.product.id} className="py-4 flex items-center justify-between group">
              <div className="flex gap-4 items-center">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded border border-gray-100 group-hover:border-primary transition-all">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform" 
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-base font-medium group-hover:text-primary transition-colors">{item.product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">الكمية: {item.quantity}</p>
                </div>
              </div>
              <p className="text-base font-medium text-primary">{(item.product.price * item.quantity).toFixed(2)} $</p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
          <div className="flex justify-between items-center text-base font-semibold">
            <p>الإجمالي</p>
            <p className="text-lg text-primary">{subtotal.toFixed(2)} $</p>
          </div>
        </div>
      </div>
      
      <div className="bg-primary/10 p-4 rounded-lg">
        <p className="text-sm flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          سيتم التواصل معك لتأكيد الطلب وتحديد طريقة الدفع بعد إرسال الطلب
        </p>
      </div>
    </motion.div>
  );
});

OrderSummary.displayName = 'OrderSummary';

export default OrderSummary;
