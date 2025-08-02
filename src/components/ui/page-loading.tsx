
import React from "react";
import LoadingSpinner from "./loading-spinner";

interface PageLoadingProps {
  minHeight?: string;
}

const PageLoading: React.FC<PageLoadingProps> = ({ minHeight = "min-h-[80vh]" }) => {
  return (
    <div className={`${minHeight} flex items-center justify-center`}>
      <LoadingSpinner size="lg" variant="primary" />
    </div>
  );
};

export default PageLoading;
