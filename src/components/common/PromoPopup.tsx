
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface PromoPopupProps {
  onClose: (dontShowAgain?: boolean) => void;
}

const PromoPopup: React.FC<PromoPopupProps> = ({ onClose }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full overflow-hidden relative"
        >
          {/* زر الإغلاق */}
          <button
            onClick={() => onClose(dontShowAgain)}
            className="absolute top-2 left-2 p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* صورة العرض */}
          <div className="relative h-40 bg-gradient-to-r from-primary/80 to-blue-600/80 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h2 className="text-xl font-bold mb-2">عرض حصري لزوار موقعنا</h2>
              <p className="text-sm font-semibold">خصم 25% على جميع المنتجات</p>
            </div>
          </div>

          {/* محتوى العرض */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-center mb-4">عرض لفترة محدودة!</h3>
            <p className="text-center mb-6">
              استخدم الكود الترويجي أدناه واحصل على خصم 25% على جميع المنتجات. العرض صالح حتى نهاية الشهر!
            </p>

            {/* كود الخصم */}
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-center mb-6">
              <span className="font-mono font-bold text-lg select-all">SPECIAL25</span>
            </div>

            {/* أزرار الإجراء */}
            <div className="space-y-4">
              <Link to="/products" onClick={() => onClose(dontShowAgain)}>
                <Button className="w-full">تسوق الآن واستفد من العرض</Button>
              </Link>
              
              <div className="flex items-center space-x-2 justify-center mt-4">
                <Checkbox 
                  id="dontShowAgain" 
                  checked={dontShowAgain}
                  onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
                />
                <label 
                  htmlFor="dontShowAgain" 
                  className="text-sm text-gray-600 dark:text-gray-400 mr-2 cursor-pointer"
                >
                  عدم إظهار هذا العرض مرة أخرى
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PromoPopup;
