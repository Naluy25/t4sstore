
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    
    setIsSearching(true);
    
    // Simulate searching
    setTimeout(() => {
      setIsSearching(false);
      // Navigate to a fake order detail page or show results
      navigate(`/order/${orderNumber}`);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-heading font-bold mb-4">تتبع طلبك</h1>
            <p className="text-gray-600 dark:text-gray-400">
              أدخل رقم الطلب الخاص بك لمعرفة حالة طلبك وموقعه
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="أدخل رقم الطلب"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="pr-10 py-6 text-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6"
                disabled={isSearching}
              >
                {isSearching ? "جاري البحث..." : "تتبع الطلب"}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <h3 className="font-semibold mb-2">لا تملك رقم طلب؟</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                يمكنك العثور على رقم الطلب في رسالة البريد الإلكتروني لتأكيد الطلب
              </p>
              <Button variant="outline" onClick={() => navigate("/contact")}>
                تواصل مع خدمة العملاء
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderTracking;
