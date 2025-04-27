import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 animate-[slideUp_0.8s]">
          Shop by <span className="text-primary"> Category</span>
        </h2>
        <p className="text-lg text-gray-600 animate-[slideUp_1s]">
          Discover our curated collections
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5">
        {categories.slice(0, 7).map((category, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-[fadeIn_0.5s]"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
          >

            <div 
              className="h-40 flex flex-col items-center justify-center p-5 transition-all duration-500 group-hover:brightness-95"
              style={{ 
                backgroundColor: category.bgColor,
                borderRadius: '0.75rem'
              }}
            >
              <div className="relative w-20 h-20 mb-3">
                <img
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
                  src={category.image}
                  alt={category.text}
                />
                <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-700"></div>
              </div>
              <h3 className="text-base font-semibold text-center text-gray-800 group-hover:text-gray-900 transition-colors">
                {category.text}
              </h3>
            </div>
            
            <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            

            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Categories;