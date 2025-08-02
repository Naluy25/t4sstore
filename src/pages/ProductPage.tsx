
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { allProducts } from "@/lib/mockData";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import { motion } from "framer-motion";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      // Find the product in our mock data
      const foundProduct = allProducts.find(p => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      }
      
      setLoading(false);
    };
    
    fetchProduct();
    // إعادة تعيين القيم الافتراضية عند تغيير المنتج
    setQuantity(1);
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [productId]);
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "تمت الإضافة إلى السلة",
        description: `تمت إضافة ${product.name} إلى سلة التسوق`,
      });
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container py-16 font-tajawal">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 w-1/3 mb-4 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 w-3/4 rounded"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 w-1/4 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-3/4 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!product) {
    return (
      <MainLayout>
        <div className="container py-16 text-center font-tajawal">
          <h1 className="text-3xl font-bold mb-4">المنتج غير موجود</h1>
          <p className="mb-6">عذراً، المنتج الذي تبحث عنه غير موجود</p>
          <Link 
            to="/products" 
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition duration-300 inline-block"
          >
            تصفح جميع المنتجات
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8 font-tajawal">
        <div className="container">
          {/* شريط التنقل */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <ProductBreadcrumb category={product.category} productName={product.name} />
          </motion.div>
          
          {/* تفاصيل المنتج */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* معرض الصور */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductGallery images={product.images} productName={product.name} />
            </motion.div>
            
            {/* معلومات المنتج */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ProductInfo 
                product={product}
                quantity={quantity}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                handleAddToCart={handleAddToCart}
              />
            </motion.div>
          </div>
        </div>
        
        {/* المنتجات ذات الصلة */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ProductPage;
