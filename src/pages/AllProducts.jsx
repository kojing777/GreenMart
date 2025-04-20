import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import ProductCart from "../Components/ProductCart";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext(); // Fixed typo: prodects -> products
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  return (
    <div className="mt-16 flex flex-col ">
      <p className="text-2xl font-medium uppercase">All Products</p>
      <div className="w-16 h-0.5 bg-primary rounded-full items-end"></div>

      <div className="grid sm:grid-cols-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-3 mt-6">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCart key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
