
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const TermsPage = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-12 font-tajawal">
        <div className="container">
          {/* رأس الصفحة */}
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">شروط الاستخدام</h1>
            <p className="text-gray-600 dark:text-gray-400">
              نرجو قراءة شروط الاستخدام بعناية قبل استخدام موقعنا أو خدماتنا
            </p>
          </div>
          
          {/* محتوى الشروط */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">1. مقدمة</h2>
                <p>
                  مرحباً بك في موقع مارتكارت ("الموقع")، المملوك والمُشغل من قبل شركة مارتكارت ("نحن"، "لنا"). 
                  باستخدامك للموقع، فإنك توافق على الالتزام بشروط الاستخدام التالية ("الشروط"). 
                  إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام الموقع.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">2. استخدام الموقع</h2>
                <p>
                  أنت توافق على استخدام الموقع فقط للأغراض القانونية وبطريقة لا تنتهك حقوق الآخرين أو تقيد استخدامهم للموقع. 
                  يجب ألا تستخدم الموقع بأي طريقة قد تتسبب في إتلاف الموقع أو إضعاف توافره أو إمكانية الوصول إليه.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">3. إنشاء الحساب</h2>
                <p>
                  لاستخدام بعض ميزات الموقع، قد تحتاج إلى إنشاء حساب. 
                  أنت مسؤول عن الحفاظ على سرية معلومات حسابك، بما في ذلك كلمة المرور، وعن جميع الأنشطة التي تحدث تحت حسابك. 
                  يجب أن تكون جميع المعلومات التي تقدمها عند إنشاء الحساب دقيقة وحديثة.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">4. عمليات الشراء والدفع</h2>
                <p>
                  عند إجراء عملية شراء من خلال الموقع، فإنك توافق على تقديم معلومات دفع دقيقة وكاملة. 
                  نحن نحتفظ بالحق في رفض أو إلغاء طلبك في أي وقت لأسباب تشمل، على سبيل المثال لا الحصر: توافر المنتج، وجود أخطاء في وصف المنتج أو سعره، أو مشكلات في معالجة الدفع.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">5. الملكية الفكرية</h2>
                <p>
                  الموقع وجميع المحتويات والميزات والوظائف المتاحة من خلاله هي ملك لنا أو للمرخصين لنا، ومحمية بموجب قوانين حقوق النشر والعلامات التجارية والملكية الفكرية الأخرى. 
                  لا يجوز نسخ أو توزيع أو نقل أو عرض أو بيع أو ترخيص أي جزء من الموقع دون إذن كتابي مسبق منا.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">6. سياسة الإرجاع</h2>
                <p>
                  يرجى الرجوع إلى سياسة الإرجاع الخاصة بنا للحصول على معلومات حول كيفية إرجاع المنتجات واسترداد الأموال.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">7. تقييد المسؤولية</h2>
                <p>
                  إلى أقصى حد يسمح به القانون، لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة أو تبعية تنشأ عن استخدامك للموقع أو أي منتجات تم شراؤها من خلال الموقع.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">8. التعديلات على الشروط</h2>
                <p>
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق. 
                  استمرارك في استخدام الموقع بعد إجراء أي تغييرات يشكل قبولاً منك لهذه التغييرات.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">9. القانون الحاكم</h2>
                <p>
                  تخضع هذه الشروط وتفسر وفقاً لقوانين المملكة العربية السعودية، دون اعتبار لمبادئ تنازع القوانين.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">10. اتصل بنا</h2>
                <p>
                  إذا كان لديك أي أسئلة حول شروط الاستخدام هذه، يرجى الاتصال بنا على info@martcart.com.
                </p>
                
                <p className="text-gray-500 mt-8">
                  تاريخ آخر تحديث: 1 أبريل 2023
                </p>
              </div>
            </div>
          </div>
          
          {/* رابط العودة */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-primary hover:underline">
              <ChevronLeft className="h-4 w-4 ml-1" />
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsPage;
