
import React from "react";
import { CheckCircle2, Circle, CircleDashed, CreditCard, Package, Truck, ShoppingBasket } from "lucide-react";

interface CheckoutProgressProps {
  currentStep: number;
}

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, title: "السلة", icon: ShoppingBasket },
    { id: 2, title: "معلومات الشراء", icon: Package },
    { id: 3, title: "الدفع", icon: CreditCard },
    { id: 4, title: "تأكيد الطلب", icon: Truck },
  ];

  return (
    <div className="my-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* خطوة */}
            <div className="flex flex-col items-center">
              <div className={`
                rounded-full p-2.5 transition-all 
                ${step.id < currentStep 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
                  : step.id === currentStep 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800'}
              `}>
                {step.id < currentStep ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : step.id === currentStep ? (
                  <Circle className="h-6 w-6 fill-primary/20" />
                ) : (
                  <CircleDashed className="h-6 w-6" />
                )}
              </div>
              <span className={`
                mt-2 text-sm font-medium 
                ${step.id <= currentStep ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}
              `}>
                {step.title}
              </span>
            </div>

            {/* خط بين الخطوات */}
            {index < steps.length - 1 && (
              <div className={`
                h-0.5 flex-1 mx-2 
                ${index < currentStep - 1 
                  ? 'bg-green-400 dark:bg-green-600' 
                  : 'bg-gray-200 dark:bg-gray-700'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;
