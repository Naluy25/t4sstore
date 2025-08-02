
import React from "react";
import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = "/og-image.png",
  keywords = [],
}) => {
  const siteUrl = window.location.origin;
  const currentUrl = canonicalUrl || window.location.href;

  return (
    <Helmet>
      {/* العنوان الأساسي */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* الكلمات المفتاحية */}
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      
      {/* الرابط الرئيسي */}
      <link rel="canonical" href={currentUrl} />
      
      {/* بيانات Open Graph */}
      <meta property="og:site_name" content="متجر الإلكترونيات" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      
      {/* بيانات Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* بيانات إضافية */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="robots" content="index, follow" />
      
      {/* إشارات إلى المتصفح للتحميل المسبق */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;
