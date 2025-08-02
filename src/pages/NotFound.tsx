
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="py-20 px-4 text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-heading font-bold mb-4">الصفحة غير موجودة</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو تغيير عنوانها.
        </p>
        <Link 
          to="/" 
          className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition duration-300 inline-block"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
