import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Search, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import HeaderCart from "./HeaderCart";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    // إغلاق القائمة عند تغيير المسار
    setIsOpen(false);
  }, [location.pathname]);
  let carsMenuTimeout;
  let storesMenuTimeout;
  const [carsMenuOpen, setCarsMenuOpen] = useState(false);
  const [storesMenuOpen, setStoresMenuOpen] = useState(false);
  
  return (
    <header 
      className={`${isScrolled ? "py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "py-4 bg-white dark:bg-gray-900"} sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="container">
        <div className="flex justify-between items-center">
          {/* الشعار */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-tajawal font-bold flex items-center gap-2" style={{ color: '#2563eb' }}>
              متجر الفورسيزون
              <span className="inline-block align-middle cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="22" fill="#1877F2" stroke="#fff" strokeWidth="4"/>
                  <path d="M34.5 18.5L22 31L15.5 24.5" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </h1>
          </Link>
          
          {/* القائمة الرئيسية (عرض للشاشات الكبيرة) */}
          <nav className="hidden md:flex items-center space-x-0 mr-6 ml-auto font-tajawal">
            <Link to="/" className="text-gray-700 dark:text-gray-200 font-bold hover:text-[#2563eb] dark:hover:text-[#2563eb] transition-colors px-4 py-2">الرئيسية</Link>
            {/* قسم السيارات مع سهم لليمين */}
            <div className="relative" onMouseEnter={() => setCarsMenuOpen(true)} onMouseLeave={() => {
              clearTimeout(carsMenuTimeout);
              carsMenuTimeout = setTimeout(() => setCarsMenuOpen(false), 2000);
            }}>
              <span className="text-gray-700 dark:text-gray-200 font-bold px-4 py-2 cursor-pointer flex items-center gap-1 hover:text-[#2563eb] dark:hover:text-[#2563eb]">
                قسم السيارات
                <svg className="h-4 w-4 text-[#2563eb] ml-1 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </span>
              {carsMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg min-w-[220px] z-50 flex flex-col divide-y divide-[#2563eb]/30">
                  <Link to="/category/cars" className="flex items-center justify-between px-5 py-3 font-bold hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 rounded-t-lg text-right border-r-2 border-[#2563eb]">
                    <span className="font-bold text-black">مركبات المواطنين</span>
                    <svg className="h-4 w-4 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                  <Link to="/category/trucks" className="flex items-center justify-between px-5 py-3 font-bold hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 rounded-b-lg text-right border-r-2 border-[#2563eb]">
                    <span className="font-bold">شاحنات وحمولات كبيرة</span>
                    <svg className="h-4 w-4 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              )}
            </div>
            {/* المتاجر مع سهم للأسفل */}
            <div className="relative" onMouseEnter={() => setStoresMenuOpen(true)} onMouseLeave={() => {
              clearTimeout(storesMenuTimeout);
              storesMenuTimeout = setTimeout(() => setStoresMenuOpen(false), 2000);
            }}>
              <span className="text-gray-700 dark:text-gray-200 font-bold px-4 py-2 cursor-pointer flex items-center gap-1 hover:text-[#2563eb] dark:hover:text-[#2563eb]">
                المتاجر
                <svg className="h-4 w-4 text-[#2563eb] ml-1 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </span>
              {storesMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg min-w-[220px] z-50 flex flex-col divide-y divide-[#2563eb]/30">
                  <Link to="/category/fuelshops" className="flex items-center justify-between px-5 py-3 font-bold hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 rounded-t-lg text-right border-r-2 border-[#2563eb]">
                    <span className="font-bold text-black">محطات الوقود</span>
                    <svg className="h-4 w-4 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                  <Link to="/category/stores" className="flex items-center justify-between px-5 py-3 font-bold hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 text-right border-r-2 border-[#2563eb]">
                    <span className="font-bold">البقالات</span>
                    <svg className="h-4 w-4 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                  <Link to="/category/mworkshop" className="flex items-center justify-between px-5 py-3 font-bold hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 rounded-b-lg text-right border-r-2 border-[#2563eb]">
                    <span className="font-bold">ورش التعديل</span>
                    <svg className="h-4 w-4 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              )}
            </div>
            <Link to="/category/packages" className="text-gray-700 dark:text-gray-200 font-bold hover:text-[#2563eb] dark:hover:text-[#2563eb] transition-colors px-4 py-2">باكدجات</Link>
            <Link to="/category/vip-membership" className="text-gray-700 dark:text-gray-200 font-bold hover:text-[#2563eb] dark:hover:text-[#2563eb] transition-colors px-4 py-2">بطاقات مميزة</Link>
            <Link to="/category/other-services" className="text-gray-700 dark:text-gray-200 font-bold hover:text-[#2563eb] dark:hover:text-[#2563eb] transition-colors px-4 py-2">خدمات اخرى</Link>
            <Link to="/category/special-ids" className="text-gray-700 dark:text-gray-200 font-bold hover:text-[#2563eb] dark:hover:text-[#2563eb] transition-colors px-4 py-2">ايديهات مميزة</Link>
          </nav>
          
          {/* المنطقة اليمنى */}
          <div className="flex items-center gap-2">
            {/* أيقونة البحث */}
            <Link to="/products" className="p-2 hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </Link>
            {/* تبديل الوضع (مظلم/فاتح) */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:text-primary transition-colors"
              aria-label={theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع المظلم'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            {/* مكون سلة التسوق */}
            <HeaderCart />
            {/* زر القائمة للجوال */}
            <button className="p-2 md:hidden" onClick={toggleMenu} aria-label="قائمة">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* القائمة المنسدلة للجوال */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-0 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg font-tajawal">
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                الرئيسية
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                المنتجات
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                التصنيفات
              </Link>
              <Link 
                to="/special-offers" 
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2"
              >
                <BadgePercent className="h-4 w-4" />
                عروض خاصة
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                من نحن
              </Link>
              <Link 
                to="/laws" 
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                قوانين
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
