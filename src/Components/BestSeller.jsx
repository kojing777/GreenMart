import React from "react";
import ProductCart from "./ProductCart";
import { useAppContext } from "../Context/AppContext";

const BestSeller = () => {
  const { products, isLoading } = useAppContext();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-[slideUp_0.8s]">
          Best <span className="text-primary">Sellers</span> 
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our most loved products by customers
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-96 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products
            .filter((product) => product.inStock)
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 5)
            .map((product) => (
              <ProductCart key={product._id} product={product} />
            ))}
        </div>
      )}
    </section>
  );
};

export default BestSeller;