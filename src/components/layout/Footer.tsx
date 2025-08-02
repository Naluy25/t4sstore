import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, CreditCard } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  // Function to navigate to the FAQ section in the contact page
  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/faq');
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-8 pb-2 text-gray-600 dark:text-gray-300 font-tajawal text-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* وصف المتجر */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-lg font-heading font-bold mb-3 text-black dark:text-white">
              الفور<span className="text-primary">سيزون</span>
            </h2>
            <p className="mb-2 text-xs leading-relaxed">
              مقاطعة الفورسيزون أفضل سيرفر حياة واقعية وتمثيل وتقمص الادوار ويعد الاول عربياً في نظام الحماية ضد الغش ونظام لعب (ESX) ويعتمد على الخبرة والتجارة وإمتلاك المتاجر والمحطات والبيوت والفنادق والعديد من الأنظمة الممتعة المعززة للتمثيل انضم الان ومرحباً بك
            </p>
          </div>

          {/* فئات المنتجات مقسمة عمودين */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-base font-bold mb-3 text-black dark:text-white">فئات المنتجات</h3>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-1">
                <li><Link to="/category/cars" className="hover:text-primary transition">سيارات</Link></li>
                <li><Link to="/category/trucks" className="hover:text-primary transition">حمولات</Link></li>
                <li><Link to="/category/special-ids" className="hover:text-primary transition">ايديهات مميزة</Link></li>
                <li><Link to="/category/vip-membership" className="hover:text-primary transition">بطاقات مميزة</Link></li>
                <li><Link to="/category/packages" className="hover:text-primary transition">باكدجات</Link></li>
                </ul>
              <ul className="space-y-1">
                <li><Link to="/category/fuelshops" className="hover:text-primary transition">محطات الوقود</Link></li>
                <li><Link to="/category/stores" className="hover:text-primary transition">البقالات</Link></li>
                <li><Link to="/category/mworkshop" className="hover:text-primary transition">ورش التعديل</Link></li>
                <li><Link to="/category/other-services" className="hover:text-primary transition">خدمات اخرى</Link></li>
              </ul>
            </div>
          </div>

          {/* اتصل بنا ووسائل الدفع */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-2">
            <h3 className="text-base font-bold mb-3 text-black dark:text-white">اتصل بنا</h3>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-xs ltr:ml-2 rtl:mr-2 select-all">the4seasonmta@gmail</span>
            </div>
            <h3 className="text-base font-bold mb-3 text-black dark:text-white">وسائل الدفع</h3>
            <div className="grid grid-cols-3 gap-2 w-full mb-1">
              <div className="flex items-center gap-1"><CreditCard className="h-4 w-4 text-blue-700" /><span className="text-xs">تحويل بنكي</span></div>
              <div className="flex items-center gap-1"><svg className="h-4 w-4 text-blue-500" viewBox="0 0 32 32" fill="currentColor"><path d="M23.5 6.5c-1.1-1.2-2.7-1.8-4.7-1.8h-7.2c-.7 0-1.3.5-1.4 1.2l-3.7 23.1c-.1.5.3 1 .8 1h5.2l1.1-7.1v.1c.1-.7.7-1.2 1.4-1.2h2.2c5.2 0 9.2-2.1 10.4-8.1.6-2.7.1-4.6-1.1-5.9zM21.2 15.7c-1.1 5.1-5.1 5.1-8.2 5.1h-1.2l1.2-7.7h1.2c2.1 0 4.2 0 5.1 1.1.6.7.7 1.7.4 2.5zm2.7-7.2c-1.1-1.2-2.7-1.8-4.7-1.8h-7.2c-.7 0-1.3.5-1.4 1.2l-3.7 23.1c-.1.5.3 1 .8 1h5.2l1.1-7.1v.1c.1-.7.7-1.2 1.4-1.2h2.2c5.2 0 9.2-2.1 10.4-8.1.6-2.7.1-4.6-1.1-5.9z"/></svg><span className="text-xs">باي بال</span></div>
              <div className="flex items-center gap-1"><svg className="h-4 w-4 text-pink-500" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff">IN</text></svg><span className="text-xs">انستا باي</span></div>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full">
              <div className="flex items-center gap-1"><svg className="h-4 w-4 text-gray-900" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="4" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff"></text></svg><span className="text-xs">ابل باي</span></div>
              <div className="flex items-center gap-1"><svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="7" width="20" height="10" rx="3" /><rect x="6" y="11" width="4" height="2" rx="1" fill="#fff"/></svg><span className="text-xs">محفظة الكترونية</span></div>
              <div></div>
            </div>
          </div>
        </div>
        {/* حقوق النشر */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 pb-2 mt-2 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} الفور سيزون. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
