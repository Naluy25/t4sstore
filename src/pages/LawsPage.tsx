import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ShieldCheck } from "lucide-react";

const LAWS = [
  {
    title: "قوانين الحياة الجديدة - NLR",
    content: `في حال إغمائك بشكل كامل لا يمكنك الكلام أو فعل أي شيء، في حال تم إسعافك من قبل مسعفين تستطيع تذكر جميع الاحداث، في حال تم اسقاطك من قبل شخص و تم انعاشك من قبل مسعفين تستطيع تذكر جميع الاحداث، في حال اعطاك ابرة في العيادة الخاصة من احد اللاعبين الذين لديهم عداوة معك لا تستطيع تذكر أي شي حصل لك (منها العداوات او الاحداث)`
  },
  {
    title: "الباور جيمينج - PowerGaming",
    content: "يمنع القيام بأفعال غير منطقية أو خارقة للعادة أو استغلال الثغرات البرمجية لتحقيق مكاسب غير عادلة."
  },
  {
    title: "الخوف على الحياة - NVL",
    content: "يجب عليك إظهار الخوف على حياتك في المواقف الخطرة وعدم التصرف بشكل غير منطقي أو بطولي يعرض حياتك للخطر دون سبب منطقي."
  },
  {
    title: "الميتا جيمينج - Metagaming",
    content: "يمنع استخدام معلومات حصلت عليها خارج اللعبة (مثل الديسكورد أو البثوث) داخل اللعبة لتحقيق مكاسب أو اتخاذ قرارات."
  },
  {
    title: "القتل العشوائي - RDM",
    content: "يمنع قتل اللاعبين الآخرين دون سبب منطقي أو قصة واضحة أو تبرير مقبول داخل اللعبة."
  },
  {
    title: "قانون تقدير الحياة - NWL",
    content: "يجب عليك تقدير حياة الآخرين وعدم تعريضهم للخطر أو الإضرار بهم دون مبرر منطقي أو قصة داخل اللعبة."
  },
  {
    title: "القوانين العامة",
    content: "يجب احترام جميع اللاعبين والإدارة، ويمنع السب أو الشتم أو العنصرية أو أي تصرف غير لائق. الالتزام بجميع القوانين يضمن لك تجربة لعب ممتعة وآمنة."
  }
];

const LawsPage = () => {
  return (
    <MainLayout>
      <div className="bg-background min-h-screen py-16 font-tajawal flex justify-center items-start">
        <div className="w-full max-w-5xl mx-auto px-2 sm:px-6">
          <div className="mb-14 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-primary flex items-center justify-center gap-3">
              <ShieldCheck className="h-10 w-10 text-primary" />
              صفحة القوانين
            </h1>
            <p className="text-foreground max-w-2xl mx-auto text-lg mt-2">
              يرجى قراءة القوانين بعناية والالتزام بها لضمان تجربة لعب عادلة وآمنة للجميع.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LAWS.map((law, idx) => (
              <div key={idx} className="bg-gradient-to-br from-primary/5 to-white dark:to-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 flex flex-col gap-4 transition-transform hover:scale-[1.02] duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold text-primary">{law.title}</span>
                </div>
                <div className="text-gray-700 dark:text-gray-300 text-md leading-relaxed">
                  {law.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LawsPage;
