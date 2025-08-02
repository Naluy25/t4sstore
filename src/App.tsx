import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeProvider';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { Toaster } from './components/ui/toaster';
import PromoPopup from './components/common/PromoPopup';
import './App.css';

// تحميل المكونات بشكل كسول لتحسين الأداء الأولي
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SpecialOffersPage = lazy(() => import('./pages/SpecialOffersPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ShippingPage = lazy(() => import('./pages/ShippingPage'));
const LawsPage = lazy(() => import('./pages/LawsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

// مكون التحميل
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-12 w-12 rounded-full bg-primary/20 mb-4"></div>
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

function App() {
  const [showPromo, setShowPromo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // تحديث عنوان الصفحة
    document.title = "متجر الفور سيزون | أفضل المنتجات بأفضل الأسعار";
    
    // تمييز أن التطبيق قد تم تحميله بالكامل
    const markAsLoaded = () => {
      if (document.readyState === 'complete') {
        setIsLoaded(true);
      }
    };

    // تحقق مما إذا كانت الصفحة محملة بالفعل
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', markAsLoaded);
      return () => window.removeEventListener('load', markAsLoaded);
    }
  }, []);

  useEffect(() => {
    // تأخير عرض النافذة المنبثقة لتحسين الأداء الأولي
    if (isLoaded) {
      const timer = setTimeout(() => {
        const hasClosedPromo = localStorage.getItem('hasClosedPromo');
        if (!hasClosedPromo) {
          setShowPromo(true);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  const handleClosePromo = (dontShowAgain = false) => {
    setShowPromo(false);
    if (dontShowAgain) {
      localStorage.setItem('hasClosedPromo', 'true');
    }
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/laws" element={<LawsPage />} />
                <Route path="/special-offers" element={<SpecialOffersPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
            {/* PromoPopup notification removed as requested */}
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
