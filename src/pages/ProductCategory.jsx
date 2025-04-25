import React from 'react'
import { useAppContext } from '../Context/AppContext'
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCart from '../Components/ProductCart';

const ProductCategory = () => {
    const { products } = useAppContext();
    const { category } = useParams();

    const searchCategory = categories.find((item) => 
        item.path.toLowerCase() === category
    );

    // Filter products (with null check)
    const filteredProducts = searchCategory 
        ? products.filter((product) => 
            product.category.toLowerCase() === category
          )
        : [];

    return (
        <div className='mt-16 px-4'>
            {searchCategory && (
                <div className="flex flex-col items-start mb-8">
                    <p className='text-2xl font-medium'>{searchCategory.text}</p>
                    <div className='w-16 h-0.5 bg-primary rounded-full'></div>
                </div>
            )}
            
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
                    {filteredProducts.map((product) => (
                        <ProductCart key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center h-[60vh] gap-4'>
                    <p className='text-2xl font-medium'>No Products Found</p>
                    <p className="text-gray-500">
                        {searchCategory 
                            ? `No products in ${searchCategory.text} category`
                            : "Category not found"}
                    </p>
                </div>
            )}
        </div>
    )
}

export default ProductCategory