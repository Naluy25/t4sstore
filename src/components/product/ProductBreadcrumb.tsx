import React from "react";
import { Link } from "react-router-dom";

interface ProductBreadcrumbProps {
  category: string;
  productName: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ category, productName }) => {
  const getCategoryName = (categoryId: string) => {
    switch (categoryId) {
      case 'cars': return 'سيارات';
      case 'loads': return 'حمولات';
      case 'hands': return 'ايديهات';
      case 'membership': return 'بطاقات عضوية';
      case 'packages': return 'باكدجات';
      default: return categoryId;
    }
  };

  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
      <Link to="/" className="hover:text-primary">الرئيسية</Link>
      <span className="mx-2">/</span>
      <Link to="/products" className="hover:text-primary">المنتجات</Link>
      <span className="mx-2">/</span>
      <Link 
        to={`/category/${category}`} 
        className="hover:text-primary"
      >
        {getCategoryName(category)}
      </Link>
      <span className="mx-2">/</span>
      <span className="text-gray-900 dark:text-white font-medium">
        {productName}
      </span>
    </nav>
  );
};

export default ProductBreadcrumb;
