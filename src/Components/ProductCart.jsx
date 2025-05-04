import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";

const ProductCart = ({ product, showPrice = true }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  if (!product) return null;

  const handleProductClick = () => {
    navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
    window.scrollTo(0, 0);
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className="relative border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          src={product.image[0]}
          alt={product.name}
          onError={(e) => {
            e.target.src = assets.placeholder_image;
          }}
        />
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            className="bg-white/90 text-primary px-4 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
            onClick={handleQuickViewClick}
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-500 text-sm capitalize">{product.category}</p>
        <h3 className="text-gray-800 font-semibold text-lg truncate mt-1">{product.name}</h3>

        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              className="w-4"
              src={i < (product.rating || 4) ? assets.star_icon : assets.star_dull_icon}
              alt={i < (product.rating || 4) ? "filled star" : "empty star"}
            />
          ))}
          <span className="text-gray-500 text-xs ml-1">({product.ratingCount || 24})</span>
        </div>

        {showPrice && (
          <div className="flex items-end justify-between mt-3">
            <div>
              <p className="text-xl font-bold text-primary">
                ${product.offerPrice || product.price}
              

              </p>
              {product.offerPrice && (
                <p className="text-gray-400 text-sm line-through">
                  ${product.price}
                </p>
              )}
            </div>

            <div 
              className="relative z-10" 
              onClick={(e) => e.stopPropagation()}
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary/10 hover:bg-primary/20 border border-primary/30 w-20 h-8 rounded-full text-primary font-medium transition-all duration-300 hover:shadow-md"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart" className="w-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-between w-24 h-8 bg-primary/10 rounded-full overflow-hidden border border-primary/20">
                  <button
                    className="w-8 h-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                    onClick={() => removeFromCart(product._id)}
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">{cartItems[product._id]}</span>
                  <button
                    className="w-8 h-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                    onClick={() => addToCart(product._id)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {product.offerPrice && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          SALE
        </div>
      )}
    </div>
  );
};

export default ProductCart;
