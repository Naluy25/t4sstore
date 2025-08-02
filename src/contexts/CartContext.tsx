import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  applyPromoCode: (code: string) => boolean;
  activePromoCode: string | null;
  finalTotal: number;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activePromoCode, setActivePromoCode] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
    
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${product.name} إلى سلة التسوق`,
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    
    toast({
      title: "تمت الإزالة من السلة",
      description: "تم حذف المنتج من سلة التسوق",
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "تم تفريغ السلة",
      description: "تم حذف جميع المنتجات من سلة التسوق",
    });
  };
  
  const applyPromoCode = (code: string) => {
    // جدول أكواد الخصم ونسبتها
    const promoCodes: { [key: string]: number } = {
    "SPECIAL25": 25,
    };

    if (promoCodes[code]) {
      setActivePromoCode(code);
      toast({
        title: "تم تطبيق كود الخصم",
        description: `تم تطبيق خصم ${promoCodes[code]}% على إجمالي طلبك`,
      });
      return true;
    }
    setActivePromoCode(null);
    toast({
      title: "كود الخصم غير صالح",
      description: "يرجى التحقق من الكود وإعادة المحاولة",
      variant: "destructive",
    });
    return false;
  };
  
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  // جدول أكواد الخصم ونسبتها
  const promoCodes: { [key: string]: number } = {
    "SPECIAL25": 25,
    "the4season": 50,
    "t4s-50": 50,
  };

  const discountPercent = activePromoCode && promoCodes[activePromoCode] ? promoCodes[activePromoCode] : 0;
  const finalTotal = discountPercent > 0
    ? subtotal * (1 - discountPercent / 100)
    : subtotal;
  
  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        itemCount, 
        subtotal,
        applyPromoCode,
        activePromoCode,
        finalTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
