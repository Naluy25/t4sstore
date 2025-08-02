
import React, { useState, useEffect, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageMagnifier from "./ImageMagnifier";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

// استخدام memo لمنع إعادة عرض المكون دون تغيير
const ProductGallery = memo(({ images, productName }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // تحسين وظيفة التغيير باستخدام useCallback
  const handleThumbnailClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // معالجة التحميل المسبق للصور
  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false)); // تعيين التحميل كمنتهي حتى لو فشلت بعض الصور
    };

    preloadImages();
  }, [images]);

  // تسهيل التنقل باستخدام لوحة المفاتيح
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleNext(); // العكس بسبب الاتجاه RTL
      } else if (event.key === "ArrowRight") {
        handlePrevious(); // العكس بسبب الاتجاه RTL
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrevious]);

  return (
    <div className="space-y-4 font-tajawal">
      {/* عرض الصورة الرئيسية */}
      <div className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 aspect-square">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : null}
        
        <ImageMagnifier 
          src={images[activeIndex]} 
          alt={`${productName} - ${activeIndex + 1}`}
          width="100%"
          height="100%"
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        />
        
        {/* أزرار التنقل */}
        <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
          <button
            onClick={handlePrevious}
            className="h-10 w-10 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center text-gray-700 dark:text-gray-200 shadow-md hover:bg-white dark:hover:bg-gray-800 focus:outline-none transform -translate-x-1/2 pointer-events-auto"
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="h-10 w-10 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center text-gray-700 dark:text-gray-200 shadow-md hover:bg-white dark:hover:bg-gray-800 focus:outline-none transform translate-x-1/2 pointer-events-auto"
            aria-label="الصورة التالية"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* الصور المصغرة */}
      <div className="flex overflow-x-auto scrollbar-hide space-x-2 space-x-reverse rtl:space-x-reverse">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all duration-200 focus:outline-none",
              activeIndex === index
                ? "ring-2 ring-primary"
                : "ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-600"
            )}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
});

// إضافة displayName لتسهيل التصحيح
ProductGallery.displayName = "ProductGallery";

export default ProductGallery;
