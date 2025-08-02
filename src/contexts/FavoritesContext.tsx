
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

type FavoritesContextType = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { toast } = useToast();
  
  // استرجاع المفضلة من التخزين المحلي عند تحميل الصفحة
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing favorites data:", error);
      }
    }
  }, []);
  
  // حفظ المفضلة في التخزين المحلي عند تغييرها
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  
  // إضافة منتج إلى المفضلة
  const addToFavorites = (product: Product) => {
    if (!isFavorite(product.id)) {
      setFavorites(prevFavorites => [...prevFavorites, product]);
      
      toast({
        title: "تمت الإضافة إلى المفضلة",
        description: `تمت إضافة ${product.name} إلى قائمة المفضلة`,
      });
    }
  };
  
  // إزالة منتج من المفضلة
  const removeFromFavorites = (productId: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== productId));
    
    toast({
      title: "تمت الإزالة من المفضلة",
      description: "تم حذف المنتج من قائمة المفضلة",
    });
  };
  
  // التحقق ما إذا كان المنتج في المفضلة
  const isFavorite = (productId: string) => {
    return favorites.some(item => item.id === productId);
  };
  
  // تبديل حالة المفضلة (إضافة إذا غير موجود، إزالة إذا موجود)
  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  
  // مسح جميع المفضلة
  const clearFavorites = () => {
    setFavorites([]);
    toast({
      title: "تم مسح المفضلة",
      description: "تم حذف جميع المنتجات من قائمة المفضلة",
    });
  };
  
  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addToFavorites, 
        removeFromFavorites, 
        isFavorite, 
        toggleFavorite, 
        clearFavorites 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
