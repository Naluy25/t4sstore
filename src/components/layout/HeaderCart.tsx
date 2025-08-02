import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, X, Trash, Check, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger, 
  SheetFooter, 
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const HeaderCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, itemCount, subtotal, finalTotal, activePromoCode, applyPromoCode } = useCart();
  // احسب نسبة الخصم من السياق
  const discountPercent = activePromoCode ? 25 : 0;
  const { favorites } = useFavorites();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "تمت الإزالة من السلة",
      description: "تم حذف المنتج من سلة التسوق",
    });
  };

  const increaseQuantity = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const decreaseQuantity = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      handleRemoveItem(productId);
    }
  };

  const handleApplyPromoCode = () => {
    if (promoCode.trim()) {
      applyPromoCode(promoCode.trim());
      setPromoCode("");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Link to="/favorites" className="relative p-2 transition-transform hover:scale-110">
        <Heart className="h-6 w-6" />
        {favorites.length > 0 && (
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
            {favorites.length}
          </Badge>
        )}
      </Link>
      
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <button className="relative p-2 transition-transform hover:scale-110" aria-label="سلة التسوق">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <Badge variant="default" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                {itemCount}
              </Badge>
            )}
          </button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto" side="right">
          <SheetHeader className="mb-6 border-b pb-4">
            <SheetTitle className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              سلة التسوق
              {itemCount > 0 && (
                <Badge variant="outline" className="mr-2">
                  {itemCount} {itemCount === 1 ? 'منتج' : 'منتجات'}
                </Badge>
              )}
            </SheetTitle>
          </SheetHeader>
          
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ShoppingCart className="h-20 w-20 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">سلة التسوق فارغة</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  لم تقم بإضافة أي منتجات إلى سلة التسوق بعد
                </p>
                <SheetClose asChild>
                  <Button
                    onClick={() => navigate("/products")}
                    className="bg-primary hover:bg-primary/90 transition-all"
                    size="lg"
                  >
                    تصفح المنتجات
                  </Button>
                </SheetClose>
              </motion.div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto mb-4 pr-2">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-800 group"
                    >
                      <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0 border border-gray-100 group-hover:border-primary transition-all">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-all"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link 
                            to={`/product/${item.product.id}`} 
                            onClick={() => setIsCartOpen(false)}
                            className="font-medium text-sm mb-1 line-clamp-2 hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="حذف من السلة"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="text-sm text-primary font-semibold mb-2">
                          {item.product.price.toFixed(2)} $
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                            <button
                              onClick={() => decreaseQuantity(item.product.id, item.quantity)}
                              className="h-7 w-7 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-md transition-colors"
                              aria-label="تقليل الكمية"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="mx-2 min-w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.product.id, item.quantity)}
                              className="h-7 w-7 flex items-center justify-center text-gray-500 hover:text-green-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-md transition-colors"
                              aria-label="زيادة الكمية"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <div className="mr-auto text-sm font-medium">
                            {(item.product.price * item.quantity).toFixed(2)} $
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="mt-auto bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="أدخل كود الخصم"
                      className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700"
                    />
                    <Button 
                      onClick={handleApplyPromoCode}
                      variant="outline"
                      size="sm"
                    >
                      تطبيق
                    </Button>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">المجموع الفرعي:</span>
                    <span>{subtotal.toFixed(2)} $</span>
                  </div>

                  {/* خصم كود الخصم */}
                  {activePromoCode && discountPercent > 0 && subtotal > 0 && (
                    <div className="flex justify-between text-primary">
                      <span className="text-sm">الخصم ({discountPercent}%):</span>
                      <span>- {(subtotal * (discountPercent / 100)).toFixed(2)} $</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold">
                    <span>الإجمالي النهائي:</span>
                    <span className="text-primary">{finalTotal.toFixed(2)} $</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">عدد العناصر:</span>
                    <span>{itemCount}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1 border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 transition-colors"
                    onClick={() => clearCart()}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    تفريغ السلة
                  </Button>
                  
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 transition-colors"
                    onClick={handleCheckout}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    إتمام الطلب
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4 bg-white dark:bg-gray-800 p-2 rounded-md">
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HeaderCart;
