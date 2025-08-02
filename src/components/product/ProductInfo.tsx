
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Check, Heart, Minus, Plus, Share2, ShoppingCart, 
  Star, Truck, Shield, History, Zap, ChevronLeft, ChevronRight,
  Copy
} from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProductRating from "./ProductRating";
import LoadingIndicator from "@/components/ui/loading-indicator";
import { allProducts } from "@/lib/mockData";

interface ProductInfoProps {
  product: Product;
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  handleAddToCart: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ 
  product, 
  quantity, 
  increaseQuantity, 
  decreaseQuantity, 
  handleAddToCart 
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isQuickBuying, setIsQuickBuying] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // وظيفة الشراء السريع
  const handleQuickBuy = async () => {
    if (!product.inStock) return;
    
    setIsQuickBuying(true);
    try {
      // إضافة المنتج إلى السلة
      addToCart(product, quantity);
      
      // إظهار رسالة تأكيد للمستخدم
      toast({
        title: "تم إضافة المنتج إلى السلة",
        description: "جاري الانتقال إلى صفحة إتمام الطلب...",
      });
      
      // تأخير بسيط لعرض التحميل
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // التوجيه إلى صفحة إتمام الطلب
      navigate("/checkout");
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إتمام عملية الشراء السريع، حاول مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsQuickBuying(false);
    }
  };
  
  // حساب نسبة الخصم
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
    
  // التنقل بين المنتجات
  const findAdjacentProducts = () => {
    const currentIndex = allProducts.findIndex(p => p.id === product.id);
    const prevProduct = currentIndex > 0 ? allProducts[currentIndex - 1] : null;
    const nextProduct = currentIndex < allProducts.length - 1 ? allProducts[currentIndex + 1] : null;
    
    return { prevProduct, nextProduct };
  };

  const { prevProduct, nextProduct } = findAdjacentProducts();
  
  // مشاركة المنتج
  const handleShareProduct = async () => {
    setIsSharing(true);
    try {
      const shareUrl = window.location.href;
      const shareText = `تحقق من هذا المنتج الرائع: ${product.name}`;
      
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "تم نسخ الرابط",
          description: "تم نسخ رابط المنتج، يمكنك مشاركته الآن",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };
  
  return (
    <div className="space-y-6 font-tajawal">
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        
        {/* التقييم */}
        <div className="flex items-center gap-1 mb-4">
          <ProductRating 
            rating={product.rating} 
            showValue 
          />
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-1">
            ({product.reviews} مراجعة)
          </span>
          <span className="mx-2 text-gray-400">|</span>
        </div>
        
        {/* السعر */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-500 dark:text-gray-400 line-through text-lg">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          
          {product.originalPrice && (
            <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs py-1 px-2 rounded-full">
              خصم {discountPercentage}%
            </span>
          )}
        </div>
        
        {/* حالة المخزون */}
        <div className="mb-6">
          {product.inStock ? (
            <span className="text-green-600 dark:text-green-400 text-sm flex items-center gap-1">
              <Check className="h-4 w-4" /> متوفر في المخزون
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1">
              <span className="h-4 w-4 inline-flex items-center justify-center">✗</span> غير متوفر حالياً
            </span>
          )}
        </div>
        
        {/* الوصف القصير */}
        <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
        
        {/* معلومات إضافية */}
        <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg mb-6">
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm">
              {/* يمكنك استخدام أيقونة نجمة أو تاج */}
              <Star className="h-4 w-4 text-primary" />
              <span>امتلك منتج من موقعنا لتكون مميز في مجتمعنا</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* خيارات الشراء */}
      {product.inStock && (
        <div className="space-y-4">
          {/* التحكم بالكمية */}
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">الكمية:</span>
            <div className="flex items-center">
              <button 
                onClick={decreaseQuantity} 
                className="h-10 w-10 rounded-r-md border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                disabled={quantity <= 1}
                aria-label="إنقاص الكمية"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="h-10 px-6 flex items-center justify-center border-t border-b border-gray-300 dark:border-gray-700 min-w-10 font-medium">
                {quantity}
              </div>
              <button 
                onClick={increaseQuantity} 
                className="h-10 w-10 rounded-l-md border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="زيادة الكمية"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* أزرار الشراء */}
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white hover:bg-primary/90 transition duration-300 flex items-center justify-center gap-2 py-6"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>إضافة إلى السلة</span>
            </Button>
            
            <Button 
              onClick={handleQuickBuy}
              disabled={isQuickBuying}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white transition duration-300 flex items-center justify-center gap-2 py-6"
            >
              {isQuickBuying ? (
                <>
                  <LoadingIndicator size="sm" color="white" />
                  <span>جاري التجهيز...</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>شراء سريع</span>
                </>
              )}
            </Button>
            
            <Button 
              onClick={() => toggleFavorite(product)}
              variant={isFavorite(product.id) ? "default" : "outline"}
              className={`min-w-14 h-14 rounded-full ${
                isFavorite(product.id) 
                  ? 'bg-primary text-white' 
                  : 'border border-gray-300 dark:border-gray-700'
              } hover:bg-primary hover:text-white transition duration-300 flex items-center justify-center`}
              aria-label={isFavorite(product.id) ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
            >
              <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-white' : ''}`} />
            </Button>
          </div>
        </div>
      )}
      
      {/* أزرار المشاركة والتنقل */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleShareProduct}
            variant="outline" 
            size="sm"
            className="flex items-center gap-2 text-sm"
            disabled={isSharing}
          >
            {isSharing ? <LoadingIndicator size="sm" /> : <Share2 className="h-4 w-4" />}
            <span>مشاركة</span>
          </Button>
          
          <Button 
            onClick={handleShareProduct}
            variant="ghost" 
            size="sm"
            className="flex items-center gap-2 text-sm"
          >
            <Copy className="h-4 w-4" />
            <span>نسخ الرابط</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {prevProduct && (
            <Button
              onClick={() => navigate(`/product/${prevProduct.id}`)}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              aria-label="المنتج السابق"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="hidden sm:inline-block">السابق</span>
            </Button>
          )}
          
          {nextProduct && (
            <Button
              onClick={() => navigate(`/product/${nextProduct.id}`)}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              aria-label="المنتج التالي"
            >
              <span className="hidden sm:inline-block">التالي</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
