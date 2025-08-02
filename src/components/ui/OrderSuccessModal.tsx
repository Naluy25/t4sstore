import React from "react";

interface OrderSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 text-primary">تم استلام طلبك</h2>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-200">
          توجه الى ديسكورد المدينه وأفتح تذكرة موقع<br />وسيتم التواصل معك
        </p>
        <button
          onClick={onClose}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition"
        >
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
