
import React from "react";
import MainLayout from "@/components/layout/MainLayout";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          {/* رأس الصفحة */}
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">من نحن</h1>
            <p className="text-gray-600 dark:text-gray-400">
              تعرف على قصتنا ورؤيتنا ومهمتنا في توفير أفضل المنتجات الإلكترونية
            </p>
          </div>
          
          {/* قسم القصة */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="h-64 md:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&q=80" 
                    alt="قصتنا" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-10 flex items-center">
                  <div>
                    <h2 className="text-3xl font-heading font-bold mb-4">قصتنا</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      بدأت رحلتنا في عام 2012 بهدف بسيط: تقديم أفضل المنتجات الإلكترونية بأسعار معقولة وخدمة عملاء استثنائية. منذ ذلك الحين، نمينا لنصبح وجهة موثوقة للتسوق الإلكتروني.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      نؤمن بأن التكنولوجيا يجب أن تكون متاحة للجميع، ونعمل جاهدين لتحقيق هذه الرؤية من خلال توفير منتجات عالية الجودة وتجربة تسوق سلسة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* قسم القيم */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-heading font-bold mb-4">قيمنا</h2>
              <p className="text-gray-600 dark:text-gray-400">
                المبادئ التي توجه كل ما نقوم به
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">الجودة</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  نختار منتجاتنا بعناية ونضمن جودتها لتلبية توقعات عملائنا
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">العملاء أولاً</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  نضع عملائنا في قلب كل ما نقوم به ونسعى دائمًا لتقديم تجربة استثنائية
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">القيمة</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  نقدم منتجات عالية الجودة بأسعار تنافسية لضمان حصول عملائنا على أفضل قيمة
                </p>
              </div>
            </div>
          </div>
          
          {/* فريق العمل */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-heading font-bold mb-4">فريق العمل</h2>
              <p className="text-gray-600 dark:text-gray-400">
                تعرف على الأشخاص المتحمسين وراء متجرنا
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="أحمد محمد" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">أحمد محمد</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">المؤسس والرئيس التنفيذي</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="نورا علي" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">نورا علي</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">مديرة التسويق</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                <img 
                  src="https://randomuser.me/api/portraits/men/86.jpg" 
                  alt="خالد عمر" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">خالد عمر</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">مدير المنتجات</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                <img 
                  src="https://randomuser.me/api/portraits/women/66.jpg" 
                  alt="ليلى حسن" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">ليلى حسن</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">مديرة خدمة العملاء</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
