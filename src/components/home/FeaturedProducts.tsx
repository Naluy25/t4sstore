
import React from "react";
import ProductCard from "../product/ProductCard";
import { featuredProducts } from "@/lib/mockData";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold">منتجات مميزة</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              اكتشف أفضل منتجاتنا المختارة خصيصاً لك
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition duration-300">
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition duration-300">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/products" 
            className="inline-block px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md font-medium hover:border-primary hover:text-primary transition duration-300"
          >
            عرض جميع المنتجات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
