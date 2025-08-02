
import React, { useState, useEffect, memo, useRef } from 'react';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = memo(({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  loading = 'lazy',
  placeholder = 'empty',
  onLoad,
  onError,
  objectFit = 'cover'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // استخدام التحميل الكسول للصور
  useEffect(() => {
    if (!priority && loading === 'lazy' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && imgRef.current) {
            const img = imgRef.current;
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
              // تحميل الصورة فقط عندما تصبح مرئية
              img.src = dataSrc;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      }, { rootMargin: '200px' }); // تحميل الصور قبل ظهورها بمسافة لتجنب التأخير
      
      if (imgRef.current) {
        observer.observe(imgRef.current);
      }
      
      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }
  }, [priority, loading]);
  
  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };
  
  const handleImageError = () => {
    setIsError(true);
    onError?.();
  };
  
  // تحسين URL الصورة
  const getOptimizedSrc = () => {
    // يمكن تحسين URL الصورة هنا عن طريق إضافة معلمات مثل حجم الصورة والجودة
    // في حالة استخدام CDN أو خدمة معالجة الصور
    return src;
  };
  
  // رسم صورة الخلفية المؤقتة عند التحميل
  const renderPlaceholder = () => {
    if (isLoaded || isError) return null;
    
    if (placeholder === 'blur') {
      return (
        <div
          className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse"
        />
      );
    }
    
    return (
      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800" />
    );
  };
  
  // عرض صورة خطأ في حالة الفشل
  const renderErrorState = () => {
    if (!isError) return null;
    
    return (
      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
    );
  };
  
  // تحديد فئة object-fit المناسبة
  const objectFitClass = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  }[objectFit];
  
  return (
    <div 
      className={`relative ${className}`} 
      style={{ width, height }}
    >
      {renderPlaceholder()}
      {renderErrorState()}
      <img
        ref={imgRef}
        src={priority || loading === 'eager' ? getOptimizedSrc() : undefined}
        data-src={priority || loading === 'eager' ? undefined : getOptimizedSrc()}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`transition-opacity duration-300 w-full h-full ${objectFitClass} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
});

ImageOptimizer.displayName = 'ImageOptimizer';

export default ImageOptimizer;
