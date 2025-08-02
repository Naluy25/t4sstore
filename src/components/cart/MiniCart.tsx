
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { MinusCircle, PlusCircle, Trash2, ShoppingBag } from "lucide-react";

const MiniCart = ({ onClose }: { onClose: () => void }) => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">السلة فارغة</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
          لم تقم بإضافة أي منتجات إلى سلة التسوق.
        </p>
        <button 
          onClick={() => {
            navigate("/products");
            onClose();
          }}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition duration-300"
        >
          تصفح المنتجات
        </button>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="overflow-y-auto flex-grow">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {cartItems.map((item) => (
            <li key={item.product.id} className="py-4 px-4">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                  <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover object-center" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/product/${item.product.id}`}
                    onClick={onClose}
                    className="text-base font-medium hover:text-primary line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.product.price.toFixed(2)} $
                  </p>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="text-gray-500 hover:text-primary"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </button>
                    <span className="mx-2 text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-primary"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-medium">
                    {(item.product.price * item.quantity).toFixed(2)} $
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 mt-auto">
        <div className="flex justify-between text-base font-medium mb-4">
          <p>المجموع:</p>
          <p>{subtotal.toFixed(2)} $</p>
        </div>
        <button 
          onClick={handleCheckout}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition duration-300"
        >
          متابعة الطلب
        </button>
      </div>
    </div>
  );
};

export default MiniCart;
