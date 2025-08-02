
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const OptimizedProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
    toast({
      title: "تمت الإضافة للسلة",
      description: `تم إضافة "${product.name}" إلى سلة التسوق`,
    });
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleFavorite(product);
    toast({
      description: isFavorite(product.id) 
        ? `تمت إزالة "${product.name}" من المفضلة`
        : `تمت إضافة "${product.name}" إلى المفضلة`,
    });
  };
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group relative block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 performance-card overflow-hidden"
    >
      {/* شارة الخصم */}
      {product.originalPrice && (
        <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
        </div>
      )}
      
      {/* صورة المنتج */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 optimized-image",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
        />
        
        {/* أزرار العمليات */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
            aria-label="إضافة إلى السلة"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite(product.id)
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
            aria-label={isFavorite(product.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <Heart className={`h-5 w-5 ${isFavorite(product.id) ? "fill-white" : ""}`} />
          </button>
        </div>
      </div>
      
      {/* بيانات المنتج */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 truncate group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-primary">
              {product.price.toFixed(2)} ر.س
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 dark:text-gray-400 text-sm line-through">
                {product.originalPrice.toFixed(2)} ر.س
              </span>
            )}
          </div>
          
          {product.inStock ? (
            <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
              متوفر
            </span>
          ) : (
            <span className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
              نفذت الكمية
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default OptimizedProductCard;
