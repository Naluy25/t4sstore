
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ChevronLeft, Shield, Lock, Eye, FileCheck } from "lucide-react";

const PrivacyPage = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-12 font-tajawal">
        <div className="container">
          {/* رأس الصفحة */}
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">سياسة الخصوصية</h1>
            <p className="text-gray-600 dark:text-gray-400">
              نلتزم بحماية خصوصيتك وبياناتك الشخصية
            </p>
          </div>
          
          {/* ميزات الخصوصية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-start">
              <div className="mr-4 text-primary">
                <Shield className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">حماية البيانات</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  نستخدم تقنيات التشفير المتقدمة لحماية معلوماتك الشخصية والمالية من الوصول غير المصرح به.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-start">
              <div className="mr-4 text-primary">
                <Lock className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">خصوصية التصفح</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  نحترم خصوصية تصفحك ولا نشارك بياناتك مع أطراف ثالثة دون موافقة صريحة منك.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-start">
              <div className="mr-4 text-primary">
                <Eye className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">شفافية البيانات</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  نوضح بشفافية كاملة كيفية استخدام بياناتك ويمكنك طلب حذفها في أي وقت.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-start">
              <div className="mr-4 text-primary">
                <FileCheck className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">الامتثال التنظيمي</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  نلتزم بجميع قوانين ولوائح حماية البيانات والخصوصية المعمول بها.
                </p>
              </div>
            </div>
          </div>
          
          {/* تفاصيل سياسة الخصوصية */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">مقدمة</h2>
                <p>
                  نحن في مارتكارت ("نحن"، "لنا") ملتزمون بحماية خصوصيتك. 
                  توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا للمعلومات التي تزودنا بها عند استخدام موقعنا الإلكتروني أو تطبيقنا.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">المعلومات التي نجمعها</h2>
                <p>
                  قد نجمع المعلومات التالية:
                </p>
                <ul className="list-disc mr-6">
                  <li>الاسم والعنوان وعنوان البريد الإلكتروني ورقم الهاتف</li>
                  <li>معلومات ديموغرافية مثل الرمز البريدي والتفضيلات والاهتمامات</li>
                  <li>معلومات أخرى ذات صلة بالاستبيانات والعروض</li>
                  <li>معلومات حول زياراتك لموقعنا بما في ذلك، على سبيل المثال لا الحصر، بيانات المرور، ونشاط التصفح، وما قمت بمشاهدته والبحث عنه، وأوقات الاستجابة للصفحة، وأخطاء التنزيل، ومدة الزيارات، ومعلومات التفاعل مع الصفحة</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">كيف نستخدم المعلومات المجمعة</h2>
                <p>
                  نستخدم هذه المعلومات لفهم احتياجاتك بشكل أفضل وتقديم خدمة أفضل، وعلى وجه التحديد للأسباب التالية:
                </p>
                <ul className="list-disc mr-6">
                  <li>الاحتفاظ بسجلات داخلية</li>
                  <li>تحسين منتجاتنا وخدماتنا</li>
                  <li>إرسال رسائل بريد إلكتروني ترويجية حول منتجات جديدة أو عروض خاصة أو معلومات أخرى نعتقد أنها قد تهمك</li>
                  <li>الاتصال بك لأغراض بحثية باستخدام البريد الإلكتروني أو الهاتف أو الفاكس أو البريد</li>
                  <li>تخصيص الموقع وفقًا لاهتماماتك</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">أمان</h2>
                <p>
                  نحن ملتزمون بضمان أمان معلوماتك. 
                  لمنع الوصول غير المصرح به أو الكشف عنها، وضعنا إجراءات مادية وإلكترونية وإدارية مناسبة للحفاظ على المعلومات التي نجمعها عبر الإنترنت وتأمينها.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">ملفات تعريف الارتباط</h2>
                <p>
                  ملف تعريف الارتباط (Cookies) هو ملف صغير يتم وضعه على جهاز الكمبيوتر الخاص بك لتمكيننا من تحليل عدد الزوار للموقع وكيفية استخدام الموقع. 
                  تساعدنا ملفات تعريف الارتباط على تحسين موقعنا لتقديم تجربة أفضل وأكثر ملاءمة لك.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">التحكم في معلوماتك الشخصية</h2>
                <p>
                  يمكنك اختيار تقييد جمع أو استخدام معلوماتك الشخصية بالطرق التالية:
                </p>
                <ul className="list-disc mr-6">
                  <li>عندما يُطلب منك ملء نموذج على الموقع، ابحث عن المربع الذي يمكنك النقر عليه للإشارة إلى أنك لا ترغب في استخدام المعلومات لأغراض التسويق المباشر</li>
                  <li>إذا كنت قد وافقت سابقًا على استخدام معلوماتك الشخصية للتسويق المباشر، يمكنك تغيير رأيك في أي وقت عن طريق الاتصال بنا</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">التغييرات على سياستنا</h2>
                <p>
                  قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر من خلال نشر نسخة جديدة على موقعنا. 
                  يجب عليك التحقق من هذه الصفحة من وقت لآخر للتأكد من أنك راضٍ عن أي تغييرات.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">اتصل بنا</h2>
                <p>
                  إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارساتنا المتعلقة بهذا الموقع، يرجى الاتصال بنا على privacy@martcart.com.
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

export default PrivacyPage;
