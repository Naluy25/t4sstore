import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Check, Eye, Package2, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal";
}

const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  const [isHovering, setIsHovering] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // حساب نسبة الخصم إذا كان هناك سعر أصلي
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${product.name} إلى سلة التسوق`,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
    toast({
      title: isFavorite(product.id) 
        ? "تمت الإزالة من المفضلة" 
        : "تمت الإضافة إلى المفضلة",
      description: isFavorite(product.id)
        ? `تمت إزالة ${product.name} من قائمة المفضلة`
        : `تمت إضافة ${product.name} إلى قائمة المفضلة`,
      variant: isFavorite(product.id) ? "default" : "default",
    });
  };

  // تغيير الصورة عند تحويم المؤشر
  const handleImageHover = () => {
    if (product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 1500);
      
      return () => clearInterval(interval);
    }
  };

  // التحكم في عدد صور المنتج
  const handleShowProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/product/${product.id}`;
  };

  if (variant === "compact") {
    return (
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to={`/product/${product.id}`} className="flex items-center p-3 h-full">
          <div className="flex-shrink-0 w-16 h-16 mr-3">
            <img 
              src={product.images && product.images.length > 0 ? product.images[0] : ""} 
              alt={product.name} 
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
            <div className="flex items-center mt-1">
              <span className="font-bold text-sm">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through ml-1">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "horizontal") {
    return (
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to={`/product/${product.id}`} className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/3 relative">
            <div className="aspect-square md:aspect-auto md:h-full overflow-hidden">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onMouseEnter={() => {
                  setIsHovering(true);
                  handleImageHover();
                }}
                onMouseLeave={() => setIsHovering(false)}
              />
            </div>
            {product.offer === true && product.discount && product.discount > 0 && (
              <Badge variant="destructive" className="absolute top-2 right-2">
                خصم {product.discount}%
              </Badge>
            )}
          </div>
          <div className="p-4 md:w-2/3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg hover:text-primary transition duration-300">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleFavorite}
                    className={`h-8 w-8 rounded-full ${isFavorite(product.id) ? 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'} flex items-center justify-center`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {product.description || "وصف المنتج غير متوفر حالياً."}
              </p>
              
              <div className="mb-3 flex flex-wrap gap-2">
                {product.features?.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                {product.inStock ? (
                  <Button
                    size="sm"
                    onClick={handleAddToCart}
                    className="flex items-center gap-1"
                  >
                    <ShoppingCart className="h-4 w-4" /> إضافة للسلة
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled
                    className="flex items-center gap-1"
                  >
                    نفذت الكمية
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleShowProduct}
                  className="flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" /> عرض
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }
  
  // Default variant
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100 dark:border-gray-700 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* صورة المنتج */}
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              src={product.images[currentImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => {
                setIsHovering(true);
                handleImageHover();
              }}
              onMouseLeave={() => setIsHovering(false)}
            />
          </AnimatePresence>
          
          {/* مؤشر تعدد الصور */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
              {product.images.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentImageIndex === index 
                      ? 'w-4 bg-white' 
                      : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* شارة الخصم */}
        {product.offer === true && product.discount && product.discount > 0 && (
          <motion.div 
            className="absolute top-2 right-2 z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="destructive" className="font-bold">
              خصم {product.discount}%
            </Badge>
          </motion.div>
        )}
        
        {/* شارة المنتج المميز */}
        {product.featured && (
          <motion.div 
            className="absolute top-2 left-2 z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-bold bg-[#2563eb] shadow-md">
              <svg className="h-4 w-4 fill-white text-white ml-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
              مميز
            </span>
          </motion.div>
        )}
        
        {/* أزرار الإجراءات */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm">
          <motion.button 
            className={`h-10 w-10 rounded-full ${isFavorite(product.id) ? 'bg-pink-600 text-white' : 'bg-white text-gray-800'} flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors duration-300`}
            aria-label="إضافة إلى قائمة الرغبات"
            onClick={handleToggleFavorite}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-white' : ''}`} />
          </motion.button>
          <motion.button 
            className="h-10 w-10 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="إضافة إلى سلة التسوق"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-5 w-5" />
          </motion.button>
          <motion.button 
            className="h-10 w-10 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="عرض التفاصيل"
            onClick={handleShowProduct}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="h-5 w-5" />
          </motion.button>
        </div>
      </Link>
      
      {/* معلومات المنتج */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block flex-grow">
          <h3 className="font-medium text-lg mb-1 line-clamp-1 hover:text-primary transition duration-300">
            {product.name}
          </h3>
        
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.rating} 
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              ({product.reviews})
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 min-h-[40px]">
            {product.description || "وصف المنتج غير متوفر حالياً."}
          </p>
        </Link>
        
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            {product.offer === true && product.discount && product.discount > 0 ? (
              <>
                <span className="font-bold text-xl">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* مؤشر المخزون وأزرار الإجراءات */}
          <div className="flex justify-between items-center">
            <div>
              {product.inStock ? (
                <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <Check className="h-3 w-3" /> متوفر
                  {product.stockCount && <span>({product.stockCount})</span>}
                </div>
              ) : (
                <span className="text-xs text-red-600 dark:text-red-400">غير متوفر حالياً</span>
              )}
            </div>
            
            {/* زر إضافة للسلة */}
            {product.inStock && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs px-2 py-1 hover:bg-primary hover:text-white transition-colors duration-300"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-3 w-3 mr-1" /> إضافة للسلة
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* سرعة الشحن أو ميزات خاصة */}
      
    </motion.div>
  );
};

export default ProductCard;
