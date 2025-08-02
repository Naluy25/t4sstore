
import React, { useState, useEffect } from "react";

interface ImageMagnifierProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // معالج لتحميل الصورة
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={`relative font-tajawal image-container ${isLoaded ? 'image-loaded' : 'image-loading'}`}
      style={{
        width,
        height,
      }}
    >
      {/* حاوية الصورة مع تأثير لطيف عند التحميل */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-contain rounded-lg transition-opacity duration-300 ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};

export default ImageMagnifier;
